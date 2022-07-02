import Sequelize, {Model} from 'sequelize';
import Post from "./post";

class Hashtag extends Model {
  id?: number;
  title?: string;
  createdAt?: Date;
  updatedAt?: Date;

  static initiate(sequelize: Sequelize.Sequelize) {
    Hashtag.init({
      title: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Hashtag',
      tableName: 'hashtags',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }
  
  static associate() {
    Hashtag.belongsToMany(Post, {through: 'PostHashtag'});
  }
}

export default Hashtag;

