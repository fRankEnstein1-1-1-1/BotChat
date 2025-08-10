import Users from "../models/user.js";
import { getGeminiModel } from "../config/geminiconfig.js";
export async function generateChatCompletion(req, res, next) {
    try {
        const { message } = req.body;
        const user = await Users.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: "unable to detect user" });
        }
        const history = user.chats.map((chatItem) => ({
            role: chatItem.roles === "user" ? "user" : "model", // Map roles if necessary, Gemini uses "user" and "model"
            parts: [{ text: chatItem.content }],
        }));
        user.chats.push({ content: message, roles: "user" }); // FIX IS HERE: Use 'roles' plural
        // Get the Gemini model instance
        const model = getGeminiModel();
        // Start a chat session with the model
        const chatSession = model.startChat({
            history: history, // Pass the transformed history
        });
        // Send the new message to Gemini and get the response
        const result = await chatSession.sendMessage(message);
        const responseText = result.response.text();
        user.chats.push({ content: responseText, roles: "model" }); // Gemini's responses typically come as "model" role
        await user.save();
        res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.error("Error in generateChatCompletion:", error);
        res.status(500).json({ message: "Something went wrong!" });
    }
}
export const sendchatstoUser = async (req, res, next) => {
    try {
        const signedUser = await Users.findById(res.locals.jwtData.id); // Get user by ID from JWT data
        if (!signedUser) {
            return res.status(401).json({ message: 'Token invalid or user not found' }); // More specific message
        }
        if (signedUser._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({ message: 'Permission denied: User ID mismatch' });
        }
        res.status(200).json({ chats: signedUser.chats });
    }
    catch (error) {
        console.error("Error during token verification:", error); // Use console.error
        // If the error is due to an invalid/expired token, handle it appropriately in your token middleware
        return res.status(500).json({ message: "Error verifying authentication status." });
    }
};
export const deleteUserChats = async (req, res, next) => {
    try {
        const signedUser = await Users.findById(res.locals.jwtData.id); // Get user by ID from JWT data
        if (!signedUser) {
            return res.status(401).json({ message: 'Token invalid or user not found' }); // More specific message
        }
        if (signedUser._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({ message: 'Permission denied: User ID mismatch' });
        }
        //@ts-ignore
        signedUser.chats = [];
        signedUser.save();
        res.status(200).json({ message: "Sucessfully Deleted" });
    }
    catch (error) {
        console.error("Error during token verification:", error); // Use console.error
        // If the error is due to an invalid/expired token, handle it appropriately in your token middleware
        return res.status(500).json({ message: "Error verifying authentication status." });
    }
};
//# sourceMappingURL=chat-controllers.js.map