import Sequelize, { Model } from 'sequelize';

class Device extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        serial: Sequelize.STRING,
        password: Sequelize.STRING,
        situation: {
          type: Sequelize.ENUM,
          values: ['active', 'inactive', 'blocked'],
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Device;
