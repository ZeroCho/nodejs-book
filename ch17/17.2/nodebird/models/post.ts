import Sequelize, {Model} from 'sequelize';
import User from "./user";
import Hashtag from "./hashtag";

class Post extends Model {
  id?: number;
  content?: string;
  img?: string;
  createdAt?: Date;
  updatedAt?: Date;

  static associate() {
    Post.belongsTo(User);
    Post.belongsToMany(Hashtag, { through: 'PostHashtag' });
  }

  static initiate(sequelize: Sequelize.Sequelize) {
    Post.init({
      content: {
        type: Sequelize.STRING(140),
        allowNull: false,
      },
      img: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Post',
      tableName: 'posts',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }
}

export default Post;
