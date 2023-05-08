import { validationResult } from "express-validator";

class ResultValidation {
	resultValidation = (req, res, next) => {
		const error = validationResult(req).array();

		if (error.length) {
			return res.json({ error: error[0].msg });
		}

		next();
	};
}

export default new ResultValidation();