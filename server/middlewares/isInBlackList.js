const jwt = require("jsonwebtoken");
const config = require("../config");
const UserModel = require("../models/User");

const isInBlackList = async (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];

        if (token && token !== "null") {
            try {
                const decoded = jwt.verify(token, config.SECRET_KEY);

                const user = await UserModel.findOne(
                    {  
                        $or: [{login: req.params.login}, {_id: req.params.userId}],
                        black_list: {
                            $elemMatch: { user: decoded.userId }
                        }
                    }
                ); 

                if (user) {
                    return res.status(404).json({ message: "Access denied" });
                } else {
                    next();
                }
            } catch (err) {
                console.log(err);
                return res.status(500).json({ message: "Server errpr" });
            }
        } else {
            next();
        }
    } else {
        next();
    }
}

module.exports = isInBlackList;