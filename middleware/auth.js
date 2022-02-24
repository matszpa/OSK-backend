const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    let token = req.headers["token"];

    if (!token) return res.send({message: "there is no token"});

    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
        if (err) {
            return res.send({message: "Unauthorized", err: err});
        }
        req.user_id = decoded.user_id;
        req.role = decoded.role;
        next();
    });
};
