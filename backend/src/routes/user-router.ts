import { Router } from "express";
import { getallUsers,getLogin,getSignup, logoutuser, VerifyUser } from "../controllers/user-controllers.js";
import {loginvalidator, signupvalidator,validate} from"../utils/middleware.js";
import { verifyToken } from "../utils/token-manager.js";
const userRoute = Router();
userRoute.get("/",getallUsers)
userRoute.post("/signup",validate(signupvalidator),getSignup)
userRoute.post("/login",validate(loginvalidator),getLogin)
userRoute.get("/auth-status",verifyToken,VerifyUser)
userRoute.get("/logout",verifyToken,logoutuser)
export default userRoute;