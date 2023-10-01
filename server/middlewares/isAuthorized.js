const jwt = require("jsonwebtoken");
const config = require("../config");

const isAuthorized = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    if (token) {
        try {
            const decoded = jwt.verify(token, config.SECRET_KEY);

            req.userId = decoded.userId;
            req.userLogin = decoded.userLogin;

            next();
        } catch (err) {
            return res.status(403).json({ message: "Access denied" });
        }
    } else {
        return res.status(401).json({ message: "Not authorized" });
    }
}

module.exports = isAuthorized;