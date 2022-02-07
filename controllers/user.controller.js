const db = require("../database/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.userLogin = async (req, res) => {
  try {
    const user = await db.user.findOne({ where: { email: req.body.email } });

    if (!user) res.status(400).json({ message: "Nie znaleziono uzytkownika" });
    console.log(req.body);
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      res.status(403).json({ message: "Złe hasło" });
    } else {
      const token = jwt.sign(
        { user_id: user.id, role: user.role },
        process.env.TOKEN_KEY,
        {
          expiresIn: 86400,
        }
      );
      res.status(200).json({ token: token, userInfo: user });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.newUser = async (req, res) => {
  var user = req.body;
  try {
    if (await db.user.findOne({ where: { email: user.email } }))
      res
        .status(409)
        .json({ message: "Uzytkownik o takim adresie juz istnieje" });
    user.password = await bcrypt.hash(user.password, 10);
    const createdUser = await db.user.create(user);
    delete createdUser.password;
    const token = jwt.sign(
      { user_id: createdUser.id, role: createdUser.role },
      process.env.TOKEN_KEY,
      {
        expiresIn: 86400,
      }
    );
    res.status(200).json({ toke: token, userInfo: createdUser });
  } catch (err) {
    res.send(err);
  }
};
