import PostModel, { IPost, PostDocument } from '../models/Post'
import FileService from './files.service'
import { PostsDto } from '../dtos/posts.dto'
import PostRepository from '../repositories/post.repository'
import ApiError from '../exceptions/error'
import UserService from './user.service'
import config from '../config'

class PostService {
  async getAllPosts(
    page = config.defaultPagePagination,
    limit = config.defaultLimitPagination
  ): Promise<PostsDto> {
    const lengthArray = await PostRepository.countPosts();

    if (page > Math.ceil(lengthArray / limit)) {
      throw ApiError.BadRequest('Wrong page');
    }

    const data = await PostRepository.getAllPosts(page, limit);

    return { data, paginationCount: Math.ceil(lengthArray / limit) };
  }

  async countDocuments(): Promise<number> {
    return PostModel.countDocuments();
  }

  async createPost(
    postData: IPost,
    files,
  ): Promise<PostDocument> {
    const filesMedia = files?.media || [];
    const media: Array<string> = await FileService.getMediaPath(filesMedia);

    return await PostRepository.createPost({ ...postData, media });
  }

  async deletePost(author: string, _id: string): Promise<object> {
    return PostRepository.deletePost(author, _id);
  }

  async updatePost(
    id: string,
    postData: IPost,
  ): Promise<PostDocument> {
    return PostRepository.updatePost(id, postData)
  }

  async getPost(id: string): Promise<PostDocument> {
    return PostRepository.getPost(id);
  }
}

export default new PostService()