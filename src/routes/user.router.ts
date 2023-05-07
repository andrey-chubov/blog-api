import Router from "express";
import UserController from "../controllers/user.controller";
import UserValidation from '../middlewares/userValidation';

const router = Router();

router.post(
	"/registration",
	UserValidation.registrationValidate,
	UserController.registration
);
router.post(
	"/login",
	UserValidation.loginValidate,
	UserController.login
);
router.get("/logout", UserController.logout);
router.get("/refresh", UserController.refresh);

export default router;