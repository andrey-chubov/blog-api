import config from '../config';
import UserService from '../services/user.service';
import { Request, Response } from 'express'


class UserController {
	async registration(req: Request, res: Response, next){
		try {
			const { login, password } = req.body;

			const userData = await UserService.registration(login, password);
			res.cookie("refreshToken", userData.refreshToken, config.REFRESH_PARAMETR);
			res.cookie("accessToken", userData.accessToken, config.ACCESS_PARAMETR);

			res.json(userData);
		} catch (err) {
			next(err);
		}
	}

	async login(req: Request, res: Response, next) {
		try {
			const { login, password } = req.body;

			const userData = await UserService.login(login, password);
			res.cookie("refreshToken", userData.refreshToken, config.REFRESH_PARAMETR);
			res.cookie("accessToken", userData.accessToken, config.ACCESS_PARAMETR);

			res.json(userData);
		} catch (err) {
			next(err);
		}
	}

	async logout(req: Request, res: Response, next) {

		try {
			const { refreshToken } = req.cookies;

			const token = await UserService.logout(refreshToken);
			res.clearCookie("refreshToken");
			res.clearCookie("accessToken");

			res.json(token);
		} catch (err) {
			next(err);
		}
	}

	async refresh(req: Request, res: Response, next) {

		try {
			const { refreshToken } = req.cookies;

			const userData = await UserService.refresh(refreshToken);
			res.cookie("refreshToken", userData.refreshToken, config.REFRESH_PARAMETR);
			res.cookie("accessToken", userData.accessToken, config.ACCESS_PARAMETR);

			res.json(userData);
		} catch (err) {
			next(err);
		}
	}
}

export default new UserController();
