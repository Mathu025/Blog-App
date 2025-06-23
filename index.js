function main() {
    displayPosts();
    addNewPostListener();
}

// runs after everything has loaded
document.addEventListener("DOMContentLoaded", main)

// gets blog posts from server
function displayPosts() {
    fetch("http://localhost:3000/posts")    
        .then(function(response) {
            return response.json(); // converts the response to JSON
        })
        .then(function(posts) {
            // where we want to show the posts
            const postList = document.getElementById("post-list")
            // clear anything that may be there
            postList.innerHTML = "";

            // go through each post one by one
            posts.forEach(function(post) {
                // create  a list item for the post
                const postItem = document.createElement("li")
                postItem.className = "cursor-pointer border rounded p-2"

                postItem.innerHTML = `
                    <h3 class="font-semibold">${post.title}</h3>
                    <img src="${post.image}" alt="${post.title}" class= "w-full h-32 rounded mt-1">
                `;
                //click to show post details
                postItem.addEventListener("click", () => handlePostClick(post.id));
                postList.appendChild(postItem);
        });
    })
    .catch(err => console.error("Error Loading Posts"))
}
