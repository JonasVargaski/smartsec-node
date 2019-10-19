module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'user_devices',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        situation: {
          type: Sequelize.ENUM,
          values: ['active', 'inactive'],
          defaultValue: 'active',
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER,
          references: { model: 'users', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT',
          allowNull: false,
          unique: 'user_device_unique',
        },
        device_id: {
          type: Sequelize.INTEGER,
          references: { model: 'devices', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT',
          allowNull: false,
          unique: 'user_device_unique',
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        uniqueKeys: {
          user_device_unique: {
            fields: ['user_id', 'device_id'],
          },
        },
      }
    );
  },

  down: queryInterface => {
    return queryInterface.dropTable('user_devices');
  },
};
