import Router from "express";
import usersRoutes from "./user.router";
import postsRouter from "./post.router";

const router = Router();

router.use("/users", usersRoutes);
router.use("/posts", postsRouter);

export default router;