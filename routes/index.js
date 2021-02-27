const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		// Uploads is the Upload_folder_name
		cb(null, "public/uploads");
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + "-" + Date.now() + ".jpg");
	},
});

var upload = multer({ storage: storage });

router.get("/post", function (req, res) {
	Post.find()
		.then((result) => {
			res.status(200).json({
				postData: result,
			});
			console.log(result);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
});
/* 
router.get("/post", (req, res) => {
	Post.find({}, (err, items) => {
		if (err) {
			console.log(err);
			res.status(500).send("An error occurred", err);
		} else {
			res.render("index", { items: items });
		}
	});
}); */

router.post("/post", upload.single("image"), (req, res, next) => {
	var imageFile = req.file.filename;
	var imagePath = req.file.path.replace("public", "");
	console.log(imagePath);
	var obj = {
		username: req.body.username,
		description: req.body.description,
		location: req.body.location,
		image: imagePath,
		// "../uploads/" + imageFile,
		// {
		// 	data: fs.readFileSync(
		// path.join(__dirname + "./../uploads/" + req.file.filename),
		// 	),
		// 	contentType: "image/png",
		// 	// url: "/" + imageFile,
		// },
	};
	Post.create(obj, (err, item) => {
		if (err) {
			console.log(err);
		} else {
			// item.save();
			res.redirect("/post");
		}
	});
});

/* create post */
// router.post("/post", function (req, res) {
// 	var got = {
// 		username: req.body.username,
// 		location: req.body.location,
// 		image: req.body.image,
// 		description: req.body.description,
// 	};
// 	/*console.log(got,req.body)*/
// 	var Details = new Post(got);
// 	Details.save()
// 		.then(() => console.log("post is saved"))
// 		.catch((err) => console.log(err));
// 	res.redirect("/posts");
// });

/* getiing post from db */

router.put("/like/:id", async function (req, res, next) {
	const changeLikes = await Post.findById(req.params.id);
	changeLikes.likes = changeLikes.likes + 1;
	await changeLikes.save();
});

router.delete("/delete/:id", async function (req, res, next) {
	const id = req.params.id;
	await Post.findByIdAndDelete(id).then((res) => {
		res.json().status(200);
	});
});

module.exports = router;
