// ============================================================================
// USER MODEL
// ============================================================================
// This model defines the User entity for the application, including
// authentication fields, role management, and content creation relationships.
// ============================================================================

/**
 * User Model Definition
 * Defines the structure and relationships for user accounts in the system
 * 
 * @param {Object} sequelize - Sequelize instance
 * @param {Object} DataTypes - Sequelize data types
 * @returns {Object} User model
 */
module.exports = (sequelize, DataTypes) => {
  // ============================================================================
  // MODEL DEFINITION
  // ============================================================================
  const User = sequelize.define(
    'User',
    {
      // Primary key field
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        comment: 'Unique identifier for the user'
      },
      
      // User identification fields
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
        comment: 'Full name of the user'
      },
      
      // Authentication fields
      email: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
        comment: 'Unique email address for authentication'
      },
      
      passwordHash: {
        type: DataTypes.STRING(300),
        allowNull: false,
        comment: 'Hashed password for secure authentication'
      },
      
      // Authorization field
      role: {
        type: DataTypes.ENUM('MAIN_MANAGER', 'ADMIN'),
        allowNull: false,
        defaultValue: 'ADMIN',
        comment: 'User role determining access permissions'
      }
    },
    {
      tableName: 'users',
      comment: 'User accounts and authentication information'
    }
  );

  // ============================================================================
  // MODEL ASSOCIATIONS
  // ============================================================================
  /**
   * Define relationships between User and other models
   * Users can create multiple content items (blogs, audios, videos, courses, tests)
   */
  User.associate = (models) => {
    // Content creation relationships
    User.hasMany(models.Blog, { 
      foreignKey: 'createdBy', 
      as: 'blogs',
      onDelete: 'CASCADE'
    });
    
    User.hasMany(models.Audio, { 
      foreignKey: 'createdBy', 
      as: 'audios',
      onDelete: 'CASCADE'
    });
    
    User.hasMany(models.Video, { 
      foreignKey: 'createdBy', 
      as: 'videos',
      onDelete: 'CASCADE'
    });
    
    User.hasMany(models.Course, { 
      foreignKey: 'createdBy', 
      as: 'courses',
      onDelete: 'CASCADE'
    });
    
    User.hasMany(models.Test, { 
      foreignKey: 'createdBy', 
      as: 'tests',
      onDelete: 'CASCADE'
    });
  };

  return User;
};