import jwt from "jsonwebtoken";
export const maketoken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
    return token;
};
export const verifyToken = async (req, res, next) => {
    const token = req.signedCookies["auth_token"];
    if (!token || token.trim() === "") {
        return res.status(401).json({ message: "Token Dont exists" });
    }
    console.log(token);
    return new Promise((resolve, reject) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err, sucess) => {
            if (err) {
                reject(err.message);
                res.status(401).json({ message: "token expired" });
            }
            else {
                console.log("Token verified");
                resolve();
                res.locals.jwtData = sucess;
                return next();
            }
        });
    });
};
//# sourceMappingURL=token-manager.js.map