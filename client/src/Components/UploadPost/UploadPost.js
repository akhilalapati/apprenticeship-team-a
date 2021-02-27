import React, { useState } from "react";
import "./UploadPost.css";
import Header from "../Header/Header";
import { useHistory } from "react-router-dom";

function UploadPost() {
	const [filename, setFileName] = useState("");
	const [Author, setAuthor] = useState("");
	const [Location, setLocation] = useState("");
	const [Description, setDescription] = useState("");
	const [file, setFile] = useState("");
	const history = useHistory();
	const handleBrowse = (e) => {
		setFile(e.target.files[0]);
		setFileName(e.target.files[0].name);
		console.log(e.target.files[0]);
	};
	const ChangeAut = (e) => {
		setAuthor(e.target.value);
	};
	const ChangeLoca = (e) => {
		setLocation(e.target.value);
	};
	const ChangeDesc = (e) => {
		setDescription(e.target.value);
	};

	const postDetails = async (e) => {
		console.log("clicked");
		const data = new FormData();
		data.append("image", file);
		data.append("description", Description);
		data.append("username", Author);
		data.append("location", Location);
		fetch("https://mediaconnect.herokuapp.com/post", {
			method: "POST",
			body: data,
		})
			.then(() => {
				history.push("/posts");
			})
			.then((data) => {
				console.log(data);
			});

		// setAuthor("");
		// setFile("");
		// setFile("");
		// // setAuthor("");
		// setLocation("");
		// setDescription("");
	};

	const navigate = async (e) => {
		history.push("/posts");
	};

	return (
		<div>
			<Header />
			<div className="display">
				{/* <form action="/upload" method="post" encType="multipart/form-data"> */}
				<div className="imageurl">
					<input
						className="text"
						placeholder="Choose file"
						value={filename}
						readOnly
					/>
					<input
						type="file"
						className="browse"
						name="image"
						id="image"
						onChange={handleBrowse}
						hidden
					/>
					<label className="Filelabel" htmlFor="image">
						Browse
					</label>
				</div>

				<div className="middle">
					<input
						className="text1"
						placeholder="Author"
						name="username"
						onChange={ChangeAut}
					/>
					<input
						className="text2"
						placeholder="Location"
						name="location"
						onChange={ChangeLoca}
					/>
				</div>

				<div className="end">
					<input
						className="text3"
						placeholder="Description"
						name="description"
						onChange={ChangeDesc}
					/>
				</div>

				{/* <div>
					<ActivePost
						postDetails={postDetails()}
						Image={filename}
						Author={Author}
						Location={Location}
						Description={Description}
					/>
				</div> */}
				<div className="Activepost">
					<button
						type="submit"
						onClick={() => {
							postDetails();
						}}
						className={
							Author !== "" &&
							Location !== "" &&
							Description !== "" &&
							filename !== ""
								? "Activepostbutton"
								: "postbutton"
						}
						disabled={
							Author !== "" &&
							Location !== "" &&
							Description !== "" &&
							filename !== ""
								? false
								: true
						}
					>
						Post
					</button>
				</div>
				{/* </form> */}
			</div>
		</div>
	);
}

export default UploadPost;
