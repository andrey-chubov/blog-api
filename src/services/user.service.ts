import config from '../config';
import UserDto from '../dtos/user.dto';
import ApiError from '../exceptions/error';
import TokenService from './token.service';
import UserRepository from '../repositories/user.repository';
import bcrypt from "bcrypt";

class UserService {
	async registration(login: string, password: string) {
		const candidate = await UserRepository.findByLogin(login);

		if (candidate) {
			throw ApiError.BadRequest(
				`Пользователь с таким логином ${login} существует`
			);
		}

		const hashPassword = await bcrypt.hash(password, config.bcryptSalt);
		const user = await UserRepository.createUser( login, hashPassword );
		const userDto = new UserDto(user);
		const tokens = TokenService.generateTokens({...userDto});
		await TokenService.saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto };
	}

	async login(login: string, password: string) {
		const user = await UserRepository.findByLogin( login );

		if (!user) {
			throw ApiError.BadRequest("Пользователь с таким логином не найден");
		}

		const isPassEquals = await bcrypt.compare(password, user.password);

		if (!isPassEquals) {
			throw ApiError.BadRequest("Введён не верный пароль");
		}

		const userDto = new UserDto(user);
		const tokens = TokenService.generateTokens({ ...userDto });
		await TokenService.saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto };
	}

	async logout(refreshToken: string) {
		await TokenService.removeToken(refreshToken);
	}

	async refresh(refreshToken: string) {
		if (!refreshToken) {
			throw ApiError.UnathorizedError;
		}

		const userData = TokenService.validateRefreshToken(refreshToken) as UserDto;
		const tokenFromDb = await TokenService.findToken(refreshToken);

		if (!userData || !tokenFromDb) {
			throw ApiError.UnathorizedError;
		}

		const user = await UserRepository.findById(userData.id);
		const userDto = new UserDto(user);
		const tokens = TokenService.generateTokens({ ...userDto });
		await TokenService.saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto };
	}

	async getUserByLogin (login: string) {
		return await UserRepository.findByLogin(login);
	}

	async getUserById(id: string) {
		return await UserRepository.findById(id);
	}
}

export default new UserService();