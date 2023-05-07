import { Request, Response } from 'express'
import UserDto from '../dtos/user.dto';
import ApiError from '../exceptions/error';
import TokenService from '../services/token.service';

export const checkToken = (req: Request, res: Response, next) => {
	const accessToken = req.cookies.accessToken;

	if (!accessToken) {
		return next(ApiError.UnathorizedError());
	}

	const userData = TokenService.validateAccessToken(accessToken) as UserDto;

	if (!userData) {
		return next(ApiError.UnathorizedError());
	}
  // @ts-ignore
	req.user = userData;
	next();

};