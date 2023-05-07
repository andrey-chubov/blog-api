import mongoose from 'mongoose'

export interface IUser {
	login: string
	password: string
}

export type UserDocument = IUser & mongoose.Document

const UserSchema = new mongoose.Schema<UserDocument>({
	login: {
		type: String,
		unique: true, 
		required: [true, 'Введите логин']
	},
	password: {
		type: String,
		required: [true, 'Введите пароль']
	}
})

export default mongoose.model<UserDocument>('User', UserSchema)