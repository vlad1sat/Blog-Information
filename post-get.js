export const getPostsData = async () => {
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
