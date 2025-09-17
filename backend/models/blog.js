// ============================================================================
// BLOG MODEL
// ============================================================================
// This model defines the Blog entity for content management, including
// blog posts with titles, content, images, categories, and author relationships.
// ============================================================================

/**
 * Blog Model Definition
 * Defines the structure and relationships for blog posts in the system
 * 
 * @param {Object} sequelize - Sequelize instance
 * @param {Object} DataTypes - Sequelize data types
 * @returns {Object} Blog model
 */
module.exports = (sequelize, DataTypes) => {
  // ============================================================================
  // MODEL DEFINITION
  // ============================================================================
  const Blog = sequelize.define(
    'Blog',
    {
      // Primary key field
      id: { 
        type: DataTypes.INTEGER.UNSIGNED, 
        autoIncrement: true, 
        primaryKey: true,
        comment: 'Unique identifier for the blog post'
      },
      
      // Content fields
      title: { 
        type: DataTypes.STRING(250), 
        allowNull: false,
        comment: 'Title of the blog post'
      },
      
      content: { 
        type: DataTypes.TEXT, 
        allowNull: false,
        comment: 'Main content body of the blog post'
      },
      
      // Media and categorization fields
      imageRef: { 
        type: DataTypes.STRING(500), 
        allowNull: true,
        comment: 'Reference URL or path to the blog featured image'
      },
      
      category: { 
        type: DataTypes.STRING(120), 
        allowNull: true,
        comment: 'Category classification for the blog post'
      },
      
      // Author relationship field
      createdBy: { 
        type: DataTypes.INTEGER.UNSIGNED, 
        allowNull: false,
        comment: 'Foreign key reference to the user who created this blog'
      }
    },
    {
      tableName: 'blogs',
      comment: 'Blog posts and articles content'
    }
  );

  // ============================================================================
  // MODEL ASSOCIATIONS
  // ============================================================================
  /**
   * Define relationships between Blog and other models
   * Each blog belongs to a user (author)
   */
  Blog.associate = (models) => {
    Blog.belongsTo(models.User, { 
      foreignKey: 'createdBy', 
      as: 'author',
      onDelete: 'CASCADE'
    });
  };

  return Blog;
};