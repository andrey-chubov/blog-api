import { body } from "express-validator";
import ResultValidation from "./resultValidation";

class UserValidation {
	registrationValidate = [
		body("login")
			.isString()
			.trim()
			.notEmpty()
			.withMessage("Empty string")
			.matches(/^[a-zA-Z0-9а-яА-Я]{6,}$/, "i")
			.withMessage("Login must have not less length 6 symbols"),
		body("password")
			.isString()
			.trim()
			.notEmpty()
			.withMessage("Empty string")
			.matches(/^(?=.*[a-z])(?=.*[0-9])[0-9a-z\d@$.!%*#?&,(+)?~%]{6,}$/, "i")
			.withMessage(
				"Password must have not less length 6 symbols and only english words and one or more numbers"
			),
		ResultValidation.resultValidation,
	];

	loginValidate = [
		body("login")
			.isString()
			.trim()
			.notEmpty()
			.withMessage("Empty string"),
		body("password")
			.isString()
			.trim()
			.notEmpty()
			.withMessage("Empty string"),
		ResultValidation.resultValidation,
	];
}

export default new UserValidation();