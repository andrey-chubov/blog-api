import UserDto from '../dtos/user.dto';
import jwt from "jsonwebtoken";
import config from '../config';
import TokenRepository from '../repositories/token.repository';

class TokenService {
	generateTokens(payload: UserDto) {

		const accessToken = jwt.sign(payload, config.access_key, {
			expiresIn: "30m",
		});
		const refreshToken =  jwt.sign(payload, config.refresh_key, {
			expiresIn: "30d",
		});

		return {
			accessToken,
			refreshToken,
		}
	}

	async saveToken(userId: string, refreshToken: string) {
		const tokenData = await TokenRepository.getTokenByUser(userId);

		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save();
		}

		const token = await TokenRepository.createToken(userId, refreshToken );

		return token;
	}

	async removeToken(refreshToken: string) {
		const tokenData = await TokenRepository.removeToken( refreshToken );

		return tokenData;
	}

	validateAccessToken(token: string) {
		try {
			const userData = jwt.verify(token, config.access_key);

			return userData;
		} catch (error) {
			return null;
		}
	}

	validateRefreshToken(token: string){
		try {
			const userData = jwt.verify(token, config.refresh_key);

			return userData;
		} catch (error) {
			return null;
		}
	}

	async findToken(refreshToken: string) {
		const tokenData = await TokenRepository.getToken( refreshToken );

		return tokenData;
	}
}

export default new TokenService();