import { Router } from "express";
import userRoute from "./user-router.js";
import chatRoute from "./chat-router.js";
const appRouter = Router();
appRouter.use("/user",userRoute); // domain/api/v1/user
appRouter.use("/chat",chatRoute);
export default appRouter;