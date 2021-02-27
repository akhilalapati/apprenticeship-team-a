import React, { useState, useEffect } from "react";
import "./InstagramPage.css";
import Post from "../Post/Post";
import Header from "../Header/Header";
function InstagramPage() {
	const [posts, setPosts] = useState([]);
	const [Loading, setLoading] = useState(false);

	/* async function callAPI() {
		const res = await fetch("http://localhost:9000/post");
		res.json();
		return res.json();

	}

	useEffect( () => {

		const posts = callAPI();

		await fetch("http://localhost:9000/post")
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				console.log(result.postData.length);
				setPosts(result.postData);
				setLoading(true);
			});
	}, []); */

	async function fetchposts() {
		setPosts([]);
		const res = await fetch("https://media-connect.herokuapp.com/post");
		res.json().then((res) => setPosts(res.postData), setLoading(true));
	}
	useEffect(() => {
		fetchposts();
	}, []);

	const handleDelete = (id) => {
		console.log("in handle delete function");
		fetch("https://media-connect.herokuapp.com/delete/" + `${id}`, {
			method: "delete",
		})
			.then(fetchposts())
			.catch((err) => {
				console.log(err);
			});
		console.log("delete post");
		fetchposts();
		console.log("setting data to other variable /outside/ ");
	};
	let postsArray = [...posts];
	if (!Loading || postsArray.length === 0) {
		return (
			<div>
				<Header />
				<h3 className="post__Loading">
					<i>Loading.....</i>
				</h3>
			</div>
		);
	}
	return (
		<div>
			<Header />
			<div className="InstaPagePosts">
				{postsArray.map((post) => (

					<Post
						key={post.id}
						username={post.username}
						location={post.location}
						image={post.image}
						description={post.description}
						date={post.timestamp}
						dblikes={post.likes}
						postId={post._id}
						fetchpost={handleDelete}
					/>
				))}
			</div>
		</div>
	);
}
export default InstagramPage;
