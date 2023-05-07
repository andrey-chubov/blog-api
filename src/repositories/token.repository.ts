import TokenModel from '../models/Token';

class TokenRepository {
	async getTokenByUser(user: string) {
		return await TokenModel.findOne({user})
	}

	async createToken(id: string, refreshToken: string) {
		return await TokenModel.create({user: id, refreshToken})
	}

	async removeToken(refreshToken: string) {
		return await TokenModel.deleteOne({refreshToken})
	}

	async getToken(refreshToken: string) {
		return await TokenModel.findOne({ refreshToken })
	} 

}

export default new TokenRepository();