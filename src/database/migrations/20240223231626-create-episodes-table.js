'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('episodes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      }, 
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      synopsis: {
        allowNull: false,
        type: Sequelize.DataTypes.TEXT
      },
      order: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      video_url: {
        type: Sequelize.DataTypes.STRING
      },
      seconds_long: {
        type: Sequelize.DataTypes.INTEGER
      },
      course_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        refereces: {model: 'courses', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      created_at: {
        type: Sequelize.DataTypes.DATE
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('episodes')
  }
};
