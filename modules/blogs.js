const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;
var Schema = mongoose.Schema;
var blogSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number,
  },
});
var Blog = mongoose.model("Blog", blogSchema);
module.exports=Blog;