var mongoose = require("mongoose");
var Note = require("./note");

// save a reference to the schema constructor
var Schema = mongoose.Schema;

// using the Schema constructor, create a new UserSchema object (similar to a Sequelize model)
var ArticleSchema = new Schema({

	title: {
		type: String,
		required: true
	},

	summary: {
		type: String,
		required: true
	},

	link: {
		type: String,
		required: true
	},

	saved: {
		type: Boolean,
		default: false
	},

	note: {
		type: Schema.Types.ObjectId,
		ref: "Note"
	}
});

// creats our model from the above schema -- using mongoose's model method
var Articles = mongoose.model("Articles", ArticleSchema);

// export Article model
module.exports = Articles;