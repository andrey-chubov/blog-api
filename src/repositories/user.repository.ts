import UserModel, { IUser } from '../models/User'

class UserRepository {
	async createUser (login: string, password: string) {
		return await UserModel.create({login, password})
	} 

	async findByLogin(login: string) {
		return await UserModel.findOne({ login });
	}

	async findById(id: string) {
		return await UserModel.findById(id)
	}


}

export default new UserRepository();