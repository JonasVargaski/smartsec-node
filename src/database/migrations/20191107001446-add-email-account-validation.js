module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('users', 'validation_hash', {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      }),
      queryInterface.addColumn('users', 'situation', {
        type: Sequelize.ENUM,
        values: ['active', 'inactive', 'confirmation'],
        defaultValue: 'confirmation',
        allowNull: false,
        comment: 'User status. "Active" "Inactive" "Confirmation"',
      }),
    ]);
  },

  down: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn('users', 'validation_hash'),
      queryInterface.removeColumn('users', 'situation'),
      queryInterface.sequelize.query(
        'DROP TYPE IF EXISTS "enum_users_situation";'
      ),
    ]);
  },
};
