import { getPostsData } from "./post-get.js";

export const createPostsNav = async () => {
    const pagination = await getPostsData();
    const postsNav = document.querySelector('.nav-list');
    let postNav = '';

    for (let i = 1; i <= pagination.pagination.pages; i++) {
        postNav += `
        <li>
            <a class="nav-link" href="index.html?page=${i}">Страница ${i}</a>
        </li>
        `;
        postsNav.innerHTML = postNav;
    }
}