import Router from "express";
import { checkToken } from '../middlewares/auth.middelware';
import PostController from '../controllers/post.controller';
import PostValidation from '../middlewares/postValidation';


const router = Router();

router.get(
	"/",
	PostController.getAllPost
);
router.post(
	"/",
	checkToken,
	PostValidation.postValidate,
	PostController.createPost
);
router.patch(
	"/:id/",
	checkToken,
	PostValidation.postValidate,
	PostController.updatePost
);
router.delete(
	"/:id/",
	checkToken,
	PostController.deletePostById
);

export default router;