import { PostDocument } from '../models/Post';

export class PostsDto {
	data: PostDocument[];
	paginationCount: number;
}
