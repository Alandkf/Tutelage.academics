// ============================================================================
// QUIZ CONFIGURATION MODEL
// ============================================================================
// Singleton settings table for quiz management (total questions, timer, etc.)

module.exports = (sequelize, DataTypes) => {
  const QuizConfiguration = sequelize.define('QuizConfiguration', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      comment: 'Unique identifier (singleton pattern: only 1 row)'
    },
    totalQuestions: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 30,
      comment: 'Total number of questions allowed across all sections'
    },
    timeLimitMinutes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 30,
      comment: 'Time limit in minutes for the entire quiz'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      comment: 'Whether the quiz is currently active/published'
    }
  }, {
    tableName: 'quiz_configurations',
    comment: 'Global quiz settings (singleton: only 1 active configuration)'
  });

  return QuizConfiguration; // ✅ Must return the model
};
