const jwt = require("jsonwebtoken");

const generateToken = (user) => {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "60m" });
};

module.exports = generateToken;
