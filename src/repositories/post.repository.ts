import config from '../config';
import PostModel, { IPost, PostDocument } from '../models/Post';

class PostRepository {
	async createPost(post: IPost): Promise<PostDocument>  {
    return await PostModel.create(post);
  }

  async countPosts(): Promise<number> {
    return PostModel.countDocuments();
  }

	async getAllPosts(page: number, limit: number): Promise<PostDocument[]>  {
    if (page < 1) {
      page = config.defaultPagePagination
    }
    return PostModel.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
  }

	async deletePost(author: string, _id: string): Promise<object> {
    return PostModel.deleteOne({ author, _id })
  }

	async updatePost(_id: string, post: IPost): Promise<PostDocument>  {
    return await PostModel.findOneAndUpdate({ author: post.author, _id},
      {
        $set: {
          message: post.message
        }
      },
      { returnOriginal: false });
  }

	async getPost(id: string): Promise<PostDocument> {
		return await PostModel.findById(id);
	}
}

export default new PostRepository();
