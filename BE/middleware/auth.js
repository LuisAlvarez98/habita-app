const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
	const bearerToken = req.headers.authorization;

	if (bearerToken === undefined) {
		res.statusMessage = "Please provide a valid auth token";
		return res.status(401).end();
	}

	const token = bearerToken.split(" ")[1];
	if (!token) {
		res.statusMessage = "Please provide a valid auth token";
		return res.status(401).end();
	}

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
};

module.exports = auth;
