export const homeBlur = () => {
  const allPosts = document.querySelectorAll(".grid .post");
  allPosts.forEach(post => {
    post.classList.add("active");
  })
}
