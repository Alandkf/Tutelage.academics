// ============================================================================
// APPROVAL CONTROLLER
// ============================================================================
// Admin-only endpoints to list, approve, and reject queued content changes
// requested by MAIN_MANAGER users. Applies updates/deletes across resources
// and keeps tag associations in sync via ResourceTag.
// ============================================================================

const { ApprovalRequest, Blog, Video, Audio, Reading, Writing, Speaking, Story, EslAudio, EslVideo, Tag, ResourceTag, User } = require('../models');
const { Op } = require('sequelize');
const { sendApprovalDecisionNotification } = require('../config/email');

// Map ApprovalRequest.resourceType to ResourceTag.resourceType (lowercase)
const joinTypeMap = {
  Blog: 'reading',    // Blog tags currently stored under 'reading' namespace
  Reading: 'reading',
  Writing: 'writing',
  Video: 'video',
  Audio: 'audio',
  Speaking: 'speaking',
  Story: 'story',
  EslVideo: 'video',
  EslAudio: 'audio'
};

// Choose model by resourceType
function getModelByType(type) {
  switch (type) {
    case 'Blog': return Blog;
    case 'Video': return Video;
    case 'Audio': return Audio;
    case 'Reading': return Reading;
    case 'Writing': return Writing;
    case 'Speaking': return Speaking;
    case 'Story': return Story;
    case 'EslAudio': return EslAudio;
    case 'EslVideo': return EslVideo;
    default: return null;
  }
}

// Create missing tags by name under appropriate namespace and then
// replace ResourceTag mappings for the resource.
async function applyTags(resourceType, resourceId, tagNames) {
  if (!Array.isArray(tagNames) || !tagNames.length) return;
  const ns = joinTypeMap[resourceType];
  const trimmed = tagNames.map(t => String(t).trim()).filter(Boolean);
  const existing = await Tag.findAll({ where: { name: { [Op.in]: trimmed } } });
  const map = new Map(existing.map(t => [t.name, t.id]));
  const toCreate = trimmed.filter(n => !map.has(n)).map(name => ({ name, namespace: ns }));
  if (toCreate.length) {
    const created = await Tag.bulkCreate(toCreate, { returning: true });
    created.forEach(t => map.set(t.name, t.id));
  }
  const tagIds = trimmed.map(n => map.get(n)).filter(Boolean);
  await ResourceTag.destroy({ where: { resourceType: ns, resourceId } });
  if (tagIds.length) {
    await ResourceTag.bulkCreate(tagIds.map(tagId => ({ resourceType: ns, resourceId, tagId })));
  }
}

// Filter payload to known fields per model
function pickUpdateFields(resourceType, payload) {
  const ALLOWED = {
    Blog: ['title', 'content', 'imageRef', 'category', 'description', 'level', 'pdf', 'taskPdf'],
    Video: ['title', 'videoRef', 'description', 'pdf', 'taskPdf', 'level'],
    Audio: ['title', 'description', 'transcript', 'audioRef', 'pdf', 'taskPdf', 'imageUrl', 'level'],
    Reading: ['title', 'content', 'description', 'pdf', 'taskPdf', 'imageUrl', 'level', 'tags'],
    Writing: ['title', 'content', 'description', 'pdf', 'taskPdf', 'imageUrl', 'level', 'tags'],
    Speaking: ['title', 'imageUrl', 'description', 'content', 'transcript', 'videoRef', 'pdf', 'taskPdf', 'level', 'tags'],
    Story: ['title', 'imageUrl', 'description', 'contentText', 'audioRef', 'pdf', 'taskPdf', 'wordCount', 'level', 'tags'],
    EslAudio: ['title', 'imageUrl', 'description', 'transcript', 'audioRef', 'pdf', 'taskPdf', 'level'],
    EslVideo: ['title', 'videoRef', 'description', 'pdf', 'taskPdf', 'thumbnailUrl', 'level', 'tags']
  };
  const allowed = ALLOWED[resourceType] || [];
  const out = {};
  for (const key of allowed) {
    if (payload[key] !== undefined) out[key] = payload[key];
  }
  return out;
}

// ============================================================================
// LIST APPROVALS (Admin)
// ============================================================================
exports.listApprovals = async (req, res) => {
  try {
    const { status = 'PENDING', resourceType } = req.query;
    const where = {};
    if (status && status !== 'ALL') where.status = status.toUpperCase();
    if (resourceType) where.resourceType = resourceType;

    const approvals = await ApprovalRequest.findAll({
      where,
      order: [['createdAt', 'DESC']],
      include: [
        { association: 'requester', attributes: ['id', 'name', 'email', 'role'] },
        { association: 'approver', attributes: ['id', 'name', 'email', 'role'] }
      ]
    });

    return res.status(200).json({ success: true, approvals });
  } catch (error) {
    console.error('❌ listApprovals error:', error);
    return res.status(500).json({ success: false, message: 'Server error listing approvals', error: error.message });
  }
};

// ============================================================================
// GET APPROVAL BY ID (Admin)
// ============================================================================
exports.getApprovalById = async (req, res) => {
  try {
    const { id } = req.params;
    const approval = await ApprovalRequest.findByPk(id, {
      include: [
        { association: 'requester', attributes: ['id', 'name', 'email', 'role'] },
        { association: 'approver', attributes: ['id', 'name', 'email', 'role'] }
      ]
    });
    if (!approval) return res.status(404).json({ success: false, message: 'Approval request not found' });
    return res.status(200).json({ success: true, approval });
  } catch (error) {
    console.error('❌ getApprovalById error:', error);
    return res.status(500).json({ success: false, message: 'Server error getting approval', error: error.message });
  }
};

// ============================================================================
// APPROVE REQUEST (Admin)
// ============================================================================
exports.approve = async (req, res) => {
  try {
    const { id } = req.params;
    const approval = await ApprovalRequest.findByPk(id);
    if (!approval) return res.status(404).json({ success: false, message: 'Approval request not found' });
    if (approval.status !== 'PENDING') {
      return res.status(400).json({ success: false, message: `Request already ${approval.status.toLowerCase()}` });
    }

    const Model = getModelByType(approval.resourceType);
    if (!Model) return res.status(400).json({ success: false, message: 'Unsupported resource type' });

    if (approval.action === 'DELETE') {
      // Clean up tags and delete resource
      const ns = joinTypeMap[approval.resourceType];
      await ResourceTag.destroy({ where: { resourceType: ns, resourceId: approval.resourceId } });
      const row = await Model.findByPk(approval.resourceId);
      if (row) await row.destroy();
    } else if (approval.action === 'UPDATE') {
      const payload = approval.payload || {};
      const fields = pickUpdateFields(approval.resourceType, payload);
      const row = await Model.findByPk(approval.resourceId);
      if (!row) {
        return res.status(404).json({ success: false, message: 'Target resource not found' });
      }
      await row.update(fields);
      if (Array.isArray(payload.tags)) {
        await applyTags(approval.resourceType, approval.resourceId, payload.tags);
      }
    } else if (approval.action === 'CREATE') {
      const payload = approval.payload || {};
      const fields = pickUpdateFields(approval.resourceType, payload);
      // Compute wordCount for Story if missing
      if (approval.resourceType === 'Story' && fields.wordCount == null && typeof fields.contentText === 'string') {
        fields.wordCount = fields.contentText.split(/\s+/).filter(Boolean).length;
      }
      // Ensure createdBy is set to requester
      fields.createdBy = fields.createdBy || approval.requestedBy;
      const created = await Model.create(fields);
      // Persist tags association if provided
      if (Array.isArray(payload.tags)) {
        await applyTags(approval.resourceType, created.id, payload.tags);
      }
      // Backfill resourceId on approval
      approval.resourceId = created.id;
    } else {
      return res.status(400).json({ success: false, message: 'Unsupported action' });
    }

    approval.status = 'APPROVED';
    approval.approvedBy = req.user.id;
    await approval.save();

    // Notify requester of decision
    try {
      const requester = await User.findByPk(approval.requestedBy);
      await sendApprovalDecisionNotification({
        resourceType: approval.resourceType,
        resourceId: approval.resourceId,
        action: approval.action,
        status: 'APPROVED',
        requesterEmail: requester?.email,
        approverName: req.user?.email,
        reason: null
      });
    } catch (notifyErr) {
      console.warn('⚠️ Failed to send approval decision email:', notifyErr?.message || notifyErr);
    }

    return res.status(200).json({ success: true, message: 'Approval applied successfully', approvalId: approval.id });
  } catch (error) {
    console.error('❌ approve error:', error);
    return res.status(500).json({ success: false, message: 'Server error approving request', error: error.message });
  }
};

// ============================================================================
// REJECT REQUEST (Admin)
// ============================================================================
exports.reject = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const approval = await ApprovalRequest.findByPk(id);
    if (!approval) return res.status(404).json({ success: false, message: 'Approval request not found' });
    if (approval.status !== 'PENDING') {
      return res.status(400).json({ success: false, message: `Request already ${approval.status.toLowerCase()}` });
    }

    approval.status = 'REJECTED';
    approval.approvedBy = req.user.id;
    approval.reason = reason || null;
    await approval.save();

    // Notify requester of decision
    try {
      const requester = await User.findByPk(approval.requestedBy);
      await sendApprovalDecisionNotification({
        resourceType: approval.resourceType,
        resourceId: approval.resourceId,
        action: approval.action,
        status: 'REJECTED',
        requesterEmail: requester?.email,
        approverName: req.user?.email,
        reason: approval.reason || null
      });
    } catch (notifyErr) {
      console.warn('⚠️ Failed to send rejection email:', notifyErr?.message || notifyErr);
    }

    return res.status(200).json({ success: true, message: 'Request rejected', approvalId: approval.id });
  } catch (error) {
    console.error('❌ reject error:', error);
    return res.status(500).json({ success: false, message: 'Server error rejecting request', error: error.message });
  }
};