const db = require("../database/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");
const emailService = require("../services/emailService");
const {Op} = require("sequelize");
exports.userLogin = async (req, res) => {
    console.log(req.body);
    try {
        const user = await db.user.findOne({where: {email: req.body.email}});

        if (!user) res.status(400).json({message: "Nie znaleziono uzytkownika"});
        console.log(req.body);
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) {
            res.status(403).json({message: "Złe hasło"});
        } else {
            const token = jwt.sign(
                {user_id: user.id, role: user.role},
                process.env.TOKEN_KEY,
                {
                    expiresIn: 86400,
                }
            );
            const userInfo = {
                username: user.username,
                role: user.role
            }
            res.status(200).json({token: token, userInfo: userInfo});
        }
    } catch (err) {
        res.status(500).json({message: err});
    }
};
exports.currentUser = async (req, res) => {
    try {
        const user = await db.user.findOne({
            attributes: ['firstName', 'role'],
            where: {id: req.user_id}
        });
        res.send(user)
    } catch (err) {
        res.send(err)
    }

}
exports.userInfo = async (req, res) => {
    try {
        var user = await db.user.findOne({
            attributes: {exclude: ['password']},
            where: {id: req.user_id}
        })
        res.send(user)
    } catch (err) {
        res.send(err)
    }
}
    exports.newUser = async (req, res) => {
        var user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            password: randomstring.generate({length: 8, charset: "alphabetic"}),
            email: req.body.email,
            role: req.body.role
        };
        let message = {
            to: req.body.email,
            subject: "Zostałeś dodany do OSK Drive",
            template: "passwordTemplate",
            context: {
                name: user.firstName,
                password: user.password
            }
        };
        try {
            if (await db.user.findOne({where: {email: user.email}}))
                return res.status(303)
                    .json({message: "Uzytkownik o takim adresie juz istnieje"});
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            const createdUser = await db.user.create(user);
            await emailService.sendPassword(message);
            if (user.role === "INSTRUCTOR") {
                var categories = req.body.categories.map((c) => {
                    return {
                        categoryId: c,
                        instructorId: createdUser.id
                    }
                })
                await db.instructor.bulkCreate(categories)
            }
            res.status(200).json({user: createdUser});
        } catch (err) {
            res.send(err);
        }
    };

exports.allUsers = async (req, res) => {
    try {
        var list = await db.user.findAll({
            attributes: {exclude: ['password']},
            where: {
                role: {
                    [Op.not]: "ADMIN"
                }
            }
        })
        res.send(list)
    } catch (err) {
        res.send(err)
    }
}


exports.changePassword = async (req, res) => {
    try {
        var user = await db.user.findOne({where: {id: req.user_id}});
        if (!user)
            res.send("Nie znaleziono uzytkownika")
        const validPass = await bcrypt.compare(req.body.old_password, user.password);
        if (!validPass) {
            res.status(403).json({message: "Złe hasło"});
        } else {
            const newpassword = await bcrypt.hash(req.body.new_password, 10);
            await user.set({password: newpassword})
            await user.save();
            res.status(204).json({message: "Pomyślnie zmieniono hasło"});
        }
    } catch (err) {
        res.send(err)
    }
}

exports.changeEmail = async (req, res) => {
    try {
        var user = await db.user.findOne({where: {id: req.user_id}});
        if (!user)
            res.json({message: "Nie znaleziono uzytkownika"})
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) {
            res.status(403).json({message: "Złe hasło"});
        } else {

            await user.set({email: req.body.new_email})
            await user.save();
            res.send({message: "Pomyślnie zmieniono email"});
        }

    } catch (err) {
        res.send(err)
    }
}

exports.changeProfileData = async (req, res) => {
    try {
        var user = await db.user.findOne({where: {id: req.user_id}});
        if (!user)
            res.json({message: "Nie znaleziono uzytkownika"})
        await user.set({firstName: req.body.firstName, lastName: req.body.lastName, phoneNumber: req.body.phoneNumber})
        await user.save();
        res.send(user);
    } catch (err) {
        res.send(err)
    }
}

exports.adminInfo = async (req, res) => {
    try {
        var user = await db.user.findOne({
            attributes: ['firstName', 'lastName', 'phoneNumber', 'email'],
            where: {role: "ADMIN"}
        });
        res.send(user);
    } catch (err) {
        res.send(err)
    }
}




