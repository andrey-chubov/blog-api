import { Request, Response } from 'express'
import PostService from '../services/post.service';
import { ParamsDto } from '../dtos/params.dto';
import { IPost, PostDocument } from '../models/Post';


class PostController {
	async getAllPost(req: Request, res: Response, next) {
		try {
			const { limit, page } = req.query as unknown as ParamsDto;
			const postsData = await PostService.getAllPosts(page, limit);

			res.status(200).json(postsData);
		} catch (err) {
			next(err);
		}
	}

	async createPost(req: Request, res: Response,  next) {
		try {
			const postData: IPost = req.body;
			const files = req?.files || []
			
			// @ts-ignore
			postData.author = req.user.id
			const post: PostDocument = await PostService.createPost(postData, files)

			res.status(200).json(post);
		} catch (err) {
			next(err);
		}
	}

	async updatePost(req: Request, res: Response, next) {
		try {
			const postData: IPost = req.body;
			// @ts-ignore
			postData.author = req.user.id

			const post = await PostService.updatePost(
				req.params.id,
			  postData
			);

			res.status(200).json(post);
		} catch (err) {
			next(err);
		}
	}

	async deletePostById(req: Request, res: Response, next) {
		try {
			// @ts-ignore
			const author: string = req.user.id
			const postData = await PostService.deletePost(
				author,
				req.params.id
			);

			res.status(200).json(postData);
		} catch (err) {
			next(err);
		}
	}
}

export default new PostController();