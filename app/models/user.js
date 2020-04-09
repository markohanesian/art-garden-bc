"use strict"

const bcrypt = require("bcrypt-nodejs")

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define("User", {
		firstName: DataTypes.STRING,
		lastName: DataTypes.STRING,
		email: DataTypes.STRING,
		password: {
			type: DataTypes.STRING,
			allowNull: 0,
		},
		createdAt: {
			type: DataTypes.DATETIME,
			allowNull: 0,
			defaultValue: DataTypes.CURRENT_TIMESTAMP,
		},
		// is_artist: {
		// 	type: DataTypes.BOOLEAN,
		// 	defaultValue: 0,
		// },
		// profileImg: {
		// 	type: DataTypes.STRING,
		// },
		// is_verified: {
		// 	type: DataTypes.BOOLEAN,
		// 	defaultValue: 0,
		// },
		// last_login: {
		// 	type: DataTypes.DATE,
		// },
	})

	User.prototype.isValidPassword = function (password) {
		console.log(this.password)
		return bcrypt.compareSync(password, this.password)
	}

	User.addHook("beforeCreate", user => {
		user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)
	})

	User.associate = models => {
		// Associating User with Requests
		// When a User is deleted, also deletes any associated Request(s)
		User.hasMany(models.Request, {
			onDelete: "cascade",
		})

		// Associating User with Artworks
		User.hasMany(models.Artwork, {
			onDelete: "cascade",
		})

		// Associating User with their Userdetails
		User.hasOne(models.Userdetail, {
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
		})
	}

	return User
}
