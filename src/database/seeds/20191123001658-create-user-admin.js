const bcrypt = require('bcryptjs');

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          name: 'Administrador',
          email: 'admin@smartsec.com',
          password_hash: bcrypt.hashSync('123456', 8),
          situation: 'active',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),
  down: queryInterface => queryInterface.bulkDelete('users', null, {}),
};
