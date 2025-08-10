import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { generateChatCompletionValidator, validate } from "../utils/middleware.js";
import { deleteUserChats, generateChatCompletion, sendchatstoUser } from "../controllers/chat-controllers.js";
const chatRoute = Router();
chatRoute.post('/new', validate(generateChatCompletionValidator), verifyToken, generateChatCompletion);
chatRoute.get('/allchats', verifyToken, sendchatstoUser);
chatRoute.delete('/deletechats', verifyToken, deleteUserChats);
export default chatRoute;
//# sourceMappingURL=chat-router.js.map