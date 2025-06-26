const baseUrl = 'https://json-server-nca7.onrender.com/posts'

function main() {
    displayPosts();
    addNewPostListener();
    addCancelButtonListener();
}

// runs after everything has loaded
document.addEventListener("DOMContentLoaded", main)

// gets blog posts from server
function displayPosts() {
    fetch(baseUrl)    
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
    .catch(err => console.error("Error Loading Posts:", err));
}

    function handlePostClick(postId) {
        fetch(`${baseUrl}/${postId}`)
            .then(res => res.json())
            .then(post => {
                const postDiv = document.getElementById("post-detail")
                postDiv.innerHTML = `
                    <h2 class = "text-3xl font-bold mb-2">${post.title}</h2>
                    <img src = "${post.image}" alt="${post.title}" class= "w-full h-64 object-cover rounded mb-4">
                    <p class= "text-sm text-gray-500 mb-1">By ${post.author} &bull; ${post.date} </p>
                    <p class= "text-base">${post.content}</p>

                `;
            })
            .catch(err => console.error("Error loading post details:", err));     
        }

function addNewPostListener() {
    const form = document.getElementById("post-form");
    form.addEventListener("submit", function(event) {
        event.preventDefault(); //prevents the page from refreshing

        // get values from form fields
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const image = document.getElementById("image").value;
        const content = document.getElementById("content").value;

        // create a new post object
        const newPost = {
            title: title,
            author: author,
            image: image,
            content: content,
        };

         // send the new post to the server
        fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(newPost)
    })
    .then(function(response) {
        return response.json();
    })
        .then(function(addedPost) {
        displayPosts();
        handlePostClick(addedPost.id);
        form.reset();
    })
    .catch(function(error) {
        console.log("Error adding new post:", error)
    });
    })
    };

    function addCancelButtonListener() {
        const cancelBtn = document.querySelector("button[type='button']");
        const form = document.getElementById("post-form");
        const postDetail = document.getElementById("post-detail");

        cancelBtn.addEventListener("click", function () {
            form.reset();
            postDetail.innerHTML = `<h2 class= "text-xl font-semibold mb-2 text-gray-500">SELECT A POST TO VIEW ITS DETAILS</h2>`
        });
    }

    
