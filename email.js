const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");
const ejs = require("ejs");
const path = require("path");
require("dotenv").config();

const transport = nodemailer.createTransport(
	nodemailerSendgrid({
		apiKey: process.env.SENGRID_API_KEY,
	})
);

const sendEmail = (data) => {
	ejs.renderFile(path.join(__dirname, "emailTemplate.ejs"), data).then((result) => {
		let date = new Date();
		transport.sendMail({
			from: "Boxe Depozitare <noreply@boxe-depozitare.ro>",
			to: "boxedepozitare@gmail.com",
			replyTo: data.email,
			subject: `Notificare ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
			html: result,
		});
	});
};

module.exports = sendEmail;

module.exports = sendEmail;
