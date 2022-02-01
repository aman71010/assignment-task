import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err, data) => {
            if(err) {
                return res.status(403).json("Token is not Valid");
            }
            req.data = data;
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated!");
    }
};

export const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.data.isAdmin){
            next();
        } else {
            res.status(403).json("you are not allowed!");
        }
    });
};