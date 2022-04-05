const jwt = require("jsonwebtoken");

    exports.verifyToken = (req, res, next) => {
        let token = req.headers["token"];
        if (!token) return res.send({message: "Brak tokenu"});
        jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
            if (err) {
                return res.send({message: "Nieautoryzowany użytkownik", err: err});
            }
            req.user_id = decoded.user_id;
            req.role = decoded.role;
            next();
        });
    };

exports.isAdmin = (req, res, next) => {
    if (req.role === "ADMIN") {
        next();
    } else {
        res.status(403).json({error: "Odmowa dostępu"})
    }
}
