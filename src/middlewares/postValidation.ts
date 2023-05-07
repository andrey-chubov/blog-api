import { body } from "express-validator";
import ResultValidation from './resultValidation';
class PostValidation {
	postValidate = [
		body("message")
			.isString()
			.withMessage("Task text should be string")
			.trim()
			.notEmpty()
			.withMessage("Empty string"),
		ResultValidation.resultValidation,
	];
}

export default new PostValidation();