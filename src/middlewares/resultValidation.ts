import { validationResult } from "express-validator";

class ResultValidation {
	resultValidation = (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).json("Validation Error");
		} else {
			next();
		}
	};
}

export default new ResultValidation();