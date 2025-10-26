// ============================================================================
// LANDING SECTION MODEL
// ============================================================================
// This model defines the LandingSection entity for the homepage hero content,
// including an image URL (hosted), title, subtitle, and author relationship.
// ============================================================================

module.exports = (sequelize, DataTypes) => {
  const LandingSection = sequelize.define(
    'LandingSection',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        comment: 'Unique identifier for the landing section entry'
      },
      imageUrl: {
        type: DataTypes.STRING(500),
        allowNull: false,
        comment: 'Hosted image URL used for the landing hero section'
      },
      title: {
        type: DataTypes.STRING(250),
        allowNull: false,
        comment: 'Main headline text for the landing hero section'
      },
      subtitle: {
        type: DataTypes.STRING(500),
        allowNull: false,
        comment: 'Supporting subheadline text for the landing hero section'
      },
      createdBy: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        comment: 'Foreign key reference to the user who created this entry'
      }
    },
    {
      tableName: 'landing_sections',
      comment: 'Landing page hero section entries'
    }
  );

  LandingSection.associate = (models) => {
    LandingSection.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'author',
      onDelete: 'CASCADE'
    });
  };

  return LandingSection;
};