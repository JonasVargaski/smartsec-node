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

  static associate(models) {
    // this.belongsToMany(models.UserDevice, {
    //   foreignKey: 'user_id',
    //   through: 'user_device',
    //   as: 'users',
    // });
    this.hasMany(models.UserDevice, { foreignKey: 'device_id', as: 'users' });
  }
}

export default Device;
