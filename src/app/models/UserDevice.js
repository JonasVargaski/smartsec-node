import Sequelize, { Model } from 'sequelize';

class UserDevice extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        situation: Sequelize.ENUM('active', 'inactive'),
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Device, { foreignKey: 'device_id', as: 'device' });
  }
}

export default UserDevice;
