exports.signup = function (req, res) {
	res.render("signup")
}

exports.signin = function (req, res) {
	res.render("signin")
}

exports.profile = function (req, res) {
	// console.log(req.user)
	res.render("profile", req.user)
}

exports.grvTest = function (req, res) {
	res.render("grv-test", req.user)
}

exports.antTest = function (req, res) {
	console.log(req.user)
	res.render("ant-test", req.user)
}

exports.logout = function (req, res) {
	req.session.destroy(function (err) {
		if (err) {
			throw err
		}
		res.redirect("/")
	})
}
