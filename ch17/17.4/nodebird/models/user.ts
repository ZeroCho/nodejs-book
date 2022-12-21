import Sequelize, {
  CreationOptional, InferAttributes, InferCreationAttributes, Model,
  BelongsToManyAddAssociationMixin,
  NonAttribute,
} from 'sequelize';
import Post from './post';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare nick: string;
  declare password: CreationOptional<string>;
  declare provider: CreationOptional<string>;
  declare snsId: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  declare Followers?: NonAttribute<User[]>;
  declare Followings?: NonAttribute<User[]>;
  declare addFollowing: BelongsToManyAddAssociationMixin<User, number>;

  static initiate(sequelize: Sequelize.Sequelize) {
    User.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
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
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      deletedAt: Sequelize.DATE,
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
    // User.hasMany(Post);
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
