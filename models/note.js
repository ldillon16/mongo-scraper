var mongoose = require("mongoose");

// save a reference to the schema constructor
var Schema = mongoose.Schema;

// using the Schema constructor, create a new NoteSchema object (similar to a Sequelize model)
var NoteSchema = new Schema({

	title: {
		type: String,
		required: true
	},

	name: {
		type: String,
		required: true
	},

	body: {
		type: String,
		required: true
	}
});

// create our model from above schema (using mongoose's model method)
var Note = mongoose.model("Note", NoteSchema);

// export note model
module.exports = Note;