document.querySelectorAll(".post-footer").forEach(post => {
	const postId = post.dataset.postId;
	const ratings = post.querySelectorAll(".like");
	const likeRating = ratings[0];

	ratings.forEach(rating => {
		const button = rating.querySelector(".post-rating-button");
		const count = rating.querySelector(".post-rating-count");

		button.addEventListener("click", async () => {
			if (rating.classList.contains("like-selected")) {
				return;
			}

			count.textContent = Number(count.textContent) + 1;

			ratings.forEach(rating => {
				if (rating.classList.contains("like-selected")) {
					const count = rating.querySelector(".post-rating-count");

					count.textContent = Math.max(0, Number(count.textContent) - 1);
					rating.classList.remove("like-selected");
				}
			});

			rating.classList.add("like-selected");

			const likeOrDislike = likeRating === rating ? "like" : "dislike";
			const response = await fetch(`/posts/${postId}/${likeOrDislike}`);
			const body = await response.json();
		});
	});
});