import mongoose from 'mongoose'
import UserDto from '../dtos/user.dto'

export interface IPost {
	message: string
	author: string | object
	media?: Array<string> | Array<object>
}

export type PostDocument = IPost & mongoose.Document

const PostSchema = new mongoose.Schema<PostDocument>({
	message: {
		type: String,
		required: [true, 'Введите сообщение поста']
	},
	author: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: true
	},
	media: {
		type: [String],
		required: false
	}
}, { timestamps: true })


export default mongoose.model<PostDocument>('Post', PostSchema)