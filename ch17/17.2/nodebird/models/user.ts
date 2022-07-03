import Sequelize, {Model} from 'sequelize';
import Post from './post';

class User extends Model {
  id?: number;
  email?: string;
  nick?: string;
  password?: string;
  provider?: string;
  snsId?: string;
  createdAt?: Date;
  updatedAt?: Date;

  static initiate(sequelize: Sequelize.Sequelize) {
    User.init({
      email: {
        type: Sequelize.STRING(40),
        allowNull: true,
        unique: true,
      },
      nick: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      provider: {
        type: Sequelize.ENUM('local', 'kakao'),
        allowNull: false,
        defaultValue: 'local',
      },
      snsId: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  
  static associate() {
    User.hasMany(Post);
    User.belongsToMany(User, {
      foreignKey: 'followingId',
      as: 'Followers',
      through: 'Follow',
    });
    User.belongsToMany(User, {
      foreignKey: 'followerId',
      as: 'Followings',
      through: 'Follow',
    });
  }
}

export default User;
