(async function() {
    const postNav = document.querySelector('.nav-list');
    const postPage = document.querySelector('.comments-container');

    if (postNav) {
        createPostsNav();
        createPostsList();
    }

    if (postPage) {
        createPostPage();
        createPostComment();
    }
}());

async function getPostsData() {
    const pageParams = new URLSearchParams(location.search);
    const postPage = pageParams.get('page');

    const response = await fetch(`https://gorest.co.in/public-api/posts?page=${postPage === null ? 1 : postPage}`);
    const result = await response.json();

    console.log(result)
    return {
        posts: result.data,
        pagination: result.meta.pagination,
    }
}

async function createPostsList() {

    const posts = await getPostsData();
    const postsList = document.querySelector('.posts-list');
    let postItem = '';

    for (let i = 0; i < posts.posts.length; i++) {
        postItem += `
        <li>
            <a class="post-list-link" href="post.html?id=${posts.posts[i].id}">Сатья${i + 1}</a>
        </li>`;

        postsList.innerHTML = postItem;
    }
}

async function createPostPage() {
    const postPage = document.querySelector('.post-block');
    const pageParams = new URLSearchParams(location.search);
    const postId = pageParams.get('id');
    const response = await fetch(`https://gorest.co.in/public-api/posts/${postId}`);
    const result = await response.json();
    const post = result.data;

    postPage.innerHTML = `
    <div class="card">
        <div class="card-body">
            <h1 class="card-title">${post.title}</h1>
            <p class="class-text">${post.body}</p>
        </div>
    </div>`;
}

async function createPostsNav(){
    const pagination = await getPostsData();
    const postsNav = document.querySelector('.nav-list');
    let postNav = '';

    for (let i = 1; i <= pagination.pagination.pages; i++) {
        postNav += `
        <li>
            <a class="nav-link" href="index.html?page=${i}">Страница ${i}</a>
        </li>`;
        postsNav.innerHTML = postNav;
    }
}

async function createPostComment() {

    const commentContainer = document.querySelector('.comments-block');
    let postComment = '';

    const pageParams = new URLSearchParams(location.search);
    const postId = pageParams.get('id');

    const response = await fetch(`https://gorest.co.in/public-api/comments?post_id=${postId}`);
    const result = await response.json();
    const comment = result.data;

    comment.map(item => {
        postComment = `
        <div class="card">
            <div class="card-header">${item.email}</div>
            <div class="card-body">
                <h1 class="card-title">${item.name}</h1>
                <p class="class-text">${item.body}</p>
            </div>
        </div>`;
        commentContainer.innerHTML = postComment;
    })
}
