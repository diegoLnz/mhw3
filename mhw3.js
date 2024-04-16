document.addEventListener("DOMContentLoaded", async function(){
    const posts = await getPosts();
    const users = await getUsers();

    
    
});

async function getPosts(){
    return await fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json());
}

async function getUsers(){
    return await fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json());
}