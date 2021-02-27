import React, { useState } from "react";
import "./Post.css";
function Post({
	username,
	location,
	image,
	description,
	date,
	dblikes,
	postId,
	fetchpost,
}) {
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"June",
		"July",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const D = date.slice(8, 10);
	const M = months[parseInt(date.slice(5, 7)) - 1];
	const Y = date.slice(0, 4);
	const [likes, setLikes] = useState(dblikes);
	const [likestatus, setLikeStatus] = useState(false);
	const [Dropopen, setDropOpen] = useState(false);
	const [InfoStatus, setInfoStatus] = useState(false);
	const handleLikes = (likes) => {
		if (!likestatus) {
			setLikeStatus(true);
			setLikes(likes + 1);
			const url = "https://mediaconnect.herokuapp.com/like/" + `${postId}`;
			console.log(url);
			console.log(likes);
			fetch(url, {
				method: "PUT",
				body: { likes },
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
				});
			console.log(postId);
		}
	};
	/* const handleDelete = (id) => {
		console.log("in handle Delete Function ");
		fetch("https://media-connect.herokuapp.com/delete/" + `${id}`, {
			method: "delete",
		})
			.then((res) => {
				fetchpost();
				res.json();
			})
			.catch((err) => {
				console.log(err);
			});
		console.log("delete post");
	}; */

	return (
		<div className="">
			<div className="post">
				<div className="post__header">
					{/* {header--> username + location + moreIcon} */}
					<div className="post__headerInfo">
						<h3>{username}</h3>
						<p>{location}</p>
					</div>
					<img
						className="post__headerMoreIcon"
						src="/moreIcon.png"
						alt="moreIcon"
						onClick={() => {
							setDropOpen(!Dropopen);
							setInfoStatus(false);
						}}
					/>
					{Dropopen && (
						<div className="dropdown">
							<ul>
								<li onClick={() => setInfoStatus(!InfoStatus)}>Info</li>
								<li className="post__delete" onClick={() => fetchpost(postId)}>
									Delete
								</li>
							</ul>
						</div>
					)}
					{InfoStatus && (
						<div className="dropdown">
							<ul>
								<li>Author---{username}</li>
								<li>likes----{likes}</li>
								<li>DOP------{D + " " + M}</li>
							</ul>
						</div>
					)}
					{/* <Dropdown drop="down">
						<Dropdown.Toggle
							className="dropdown__button"
							variant="success"
							id="dropdown-basic"
						>
							<img
								className="post__headerMoreIcon"
								src="/moreIcon.png"
								alt="moreIcon"
							/>
						</Dropdown.Toggle>

						<Dropdown.Menu className="dropdown__menu">
							<Dropdown.Item
								style={{ textDecoration: "none" }}
								className="dropdown__item"
								onClick={() => handleDelete(postId)}
							>
								Delete
							</Dropdown.Item>
							<br />
							<Dropdown.Item
								style={{ textDecoration: "none" }}
								className="dropdown__item"
							>
								Update
							</Dropdown.Item>
							<br />
							<Dropdown.Item
								style={{ textDecoration: "none" }}
								className="dropdown__item"
							>
								More
							</Dropdown.Item>
							<br />
						</Dropdown.Menu>
					</Dropdown> */}
				</div>
				{/* {postBody--> Image} */}
				<img
					className="post__image"
					src={"https://mediaconnect.herokuapp.com/" + image}
					alt="loading"
				/>
				<div className="post__footer">
					{/* {post footer --> hearticon+shareIcon+date+likes+Caption} */}
					<div className="post__footerUpper">
						<div className="post__footerUpper-Icons">
							<img
								className="post__footerUpper-heartIcon"
								src={!likestatus ? "/heartIcon.png" : "/heartIcon2.png"}
								alt="heartIcon"
								onClick={() => handleLikes(likes)}
							/>
							<img
								className="post__footerUpper-shareIcon"
								src="/shareIcon.png"
								alt="shareIcon"
							/>
						</div>
						<div className="date">{D + " " + M + " " + Y}</div>
					</div>
					<div className="post__footerMiddle">
						<p>{likes} likes</p>
					</div>
					<h4 className="post__caption">{description}</h4>
				</div>
			</div>
		</div>
	);
}

export default Post;
