const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
require('dotenv').config();
exports.sendPassword = async (message) => {
    try {
        var transporter = nodemailer.createTransport(
            {
                service: "gmail",
                auth: {
                    user: process.env.EMAILNAME,
                    pass: process.env.EMAILPASSWORD,
                },
            }
        );
        transporter.use('compile', hbs({
            viewEngine: {
                name: "express-handlebars",
                defaultLayout: false,
            },
            viewPath: "./services/templates",
        }));
        let info = await transporter.sendMail(message);
    } catch (err) {
        console.log(err);
    }
};