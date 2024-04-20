const token = "IGQWRQOWp3Q3BQZA2t1ZAjE1X1ZAJM1M0dG0zN2RGeUtHaGlyNU1oWTAxQW9BeE9QWWN3a3NSSjRUT0xSMkdSeGhqUzg0QUl3bFlkLXJEeFczZAzM0bFB3V1VFb1laeWRRSEhYcWJadjBmeEt5YVlVLURZALWE2MC02c2cZD";
const instaApiBaseUrl =`https://graph.instagram.com`;


document.addEventListener("DOMContentLoaded", async function(){
    const postContainer = document.getElementById('post-container');
    const diegoId = "6854500444651451";
    
    const posts = await getPosts();
    const users = await getUsers();
    const instaPosts = await getInstaPosts(diegoId);
    const instaPostsList = [];

    for(let post of instaPosts.data){
        let postData = await getInstaPostById(post.id);
        instaPostsList.push(postData);
    }

    instaPostsList.sort((post1, post2) => post2.timestamp - post1.timestamp);

    //API => INSTAGRAM BASIC API
    instaPostsList.forEach(post => {
        generateInstaPostHTML(post, postContainer);
    });
    
    //API => JSONPLACEHOLDER
    posts.forEach(post => {
        const user = users.find(user => user.id === post.userId);
        generatePostHTML(post, user, postContainer);
    });
});

async function getPosts(){
    return await fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json());
}

async function getUsers(){
    return await fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json());
}

async function getInstaPosts(userId){
    return await fetch(`${instaApiBaseUrl}/v19.0/${userId}/media?access_token=${token}`)
      .then(response => response.json());
}

async function getInstaPostById(postId){
    return await fetch(`${instaApiBaseUrl}/${postId}?fields=id,media_type,media_url,username,timestamp,caption&access_token=${token}`)
      .then(response => response.json());
}

function generateInstaPostHTML(postData, container){
    const postHTML = document.createElement("div");
    postHTML.classList.add("single-post");

    let formattedTime = getPostTimeTillNow(postData.timestamp);

    postHTML.appendChild(generatePostHeaderHTML(postData.username, formattedTime));
    postHTML.appendChild(generatePostContentHTML(postData.caption, postData.media_url));
    postHTML.appendChild(generatePostFooterHTML());

    container.appendChild(postHTML);
}

function generatePostHTML(post, user, container) {
    const postHTML = document.createElement("div");
    postHTML.classList.add("single-post");

    postHTML.appendChild(generatePostHeaderHTML(user.username, ""));
    postHTML.appendChild(generatePostContentHTML(post.body, ""));
    postHTML.appendChild(generatePostFooterHTML());

    container.appendChild(postHTML);
}

function generatePostHeaderHTML(username, timeTillNow) {
    const postHeader = document.createElement('div');
    postHeader.classList.add('post-header');

    const userInfo = document.createElement('div');
    userInfo.classList.add('user-info');

    const userImage = document.createElement('div');
    userImage.classList.add('user-image');
    userInfo.appendChild(userImage);

    const mainUsername = document.createElement('div');
    mainUsername.classList.add('main-username');
    const userLink = document.createElement('a');
    userLink.classList.add('userlink');
    userLink.href = '#';
    userLink.textContent = username;
    mainUsername.appendChild(userLink);
    userInfo.appendChild(mainUsername);

    postHeader.appendChild(userInfo);

    const actionsAndDate = document.createElement('div');
    actionsAndDate.classList.add('actions-and-date');

    const uploadDate = document.createElement('p');
    uploadDate.classList.add('upload-date');
    uploadDate.textContent = timeTillNow;
    actionsAndDate.appendChild(uploadDate);

    const actionBtn = document.createElement('div');
    actionBtn.classList.add('action-btn');
    const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgIcon.setAttribute('width', '16');
    svgIcon.setAttribute('height', '16');
    svgIcon.setAttribute('fill', 'currentColor');
    svgIcon.setAttribute('viewBox', '0 0 16 16');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3');
    svgIcon.appendChild(path);
    actionBtn.appendChild(svgIcon);
    actionsAndDate.appendChild(actionBtn);

    postHeader.appendChild(actionsAndDate);

    return postHeader;
}

function generatePostContentHTML(postBody, postImage) {
    const postContent = document.createElement('div');
    postContent.classList.add('post-content');

    const postText = document.createElement('p');
    postText.classList.add('post-text');
    postText.textContent = postBody;
    postContent.appendChild(postText);

    const postImageContainer = document.createElement('div');
    postImageContainer.classList.add('post-image');
    const image = document.createElement('img');
    image.src = postImage;
    postImageContainer.appendChild(image);
    postContent.appendChild(postImageContainer);

    const actionsMenu = document.createElement('div');
    actionsMenu.classList.add('actions-menu');

    //first action item
    const firstActionItem = document.createElement('div');
    firstActionItem.classList.add('action-item');
    const firstSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    firstSvg.classList.add('action-icon');
    firstSvg.setAttribute('width', '26');
    firstSvg.setAttribute('height', '26');
    firstSvg.setAttribute('fill', 'currentColor');
    firstSvg.setAttribute('viewBox', '0 0 16 16');
    const firstPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    firstPath.setAttribute('d', 'm8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15');
    firstSvg.appendChild(firstPath);
    firstActionItem.appendChild(firstSvg);
    actionsMenu.appendChild(firstActionItem);

    //second action item
    const secondActionItem = document.createElement('div');
    secondActionItem.classList.add('action-item');
    const secondSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    secondSvg.classList.add('action-icon');
    secondSvg.setAttribute('width', '26');
    secondSvg.setAttribute('height', '26');
    secondSvg.setAttribute('fill', 'currentColor');
    secondSvg.setAttribute('viewBox', '0 0 16 16');
    const secondPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    secondPath.setAttribute('d', 'M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z');
    secondSvg.appendChild(secondPath);
    secondActionItem.appendChild(secondSvg);
    actionsMenu.appendChild(secondActionItem);

    //third action item
    const thirdActionItem = document.createElement('div');
    thirdActionItem.classList.add('action-item');
    const thirdSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    thirdSvg.classList.add('action-icon');
    thirdSvg.setAttribute('width', '26');
    thirdSvg.setAttribute('height', '26');
    thirdSvg.setAttribute('fill', 'currentColor');
    thirdSvg.setAttribute('viewBox', '0 0 16 16');
    const thirdPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    thirdPath.setAttribute('d', 'M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105');
    thirdSvg.appendChild(thirdPath);
    thirdActionItem.appendChild(thirdSvg);
    actionsMenu.appendChild(thirdActionItem);

    postContent.appendChild(actionsMenu);

    return postContent;
}

function generatePostFooterHTML() {
    const postFooter = document.createElement('div');
    postFooter.classList.add('post-footer', 'pointed');

    const usersFooterImages = document.createElement('div');
    usersFooterImages.classList.add('users-footer-images');
    const userFooterImage = document.createElement('div');
    userFooterImage.classList.add('user-footer-image');

    usersFooterImages.appendChild(userFooterImage);
    postFooter.appendChild(usersFooterImages);

    const repliesNumber = document.createElement('div');
    repliesNumber.classList.add('replies-number');
    repliesNumber.textContent = '10 Risposte';
    postFooter.appendChild(repliesNumber);

    const separator = document.createElement('div');
    separator.textContent = ' · ';
    postFooter.appendChild(separator);

    const viewActivitiesLink = document.createElement('div');
    viewActivitiesLink.classList.add('view-activities-action', 'hover-underlined');
    viewActivitiesLink.textContent = 'Visualizza attività';
    postFooter.appendChild(viewActivitiesLink);

    return postFooter;
}

function getPostTimeTillNow(time){
    const timestamp = Date.parse(time);

    let timeTillNow = Date.now() - timestamp;

    let minutes = Math.floor(timeTillNow / 60000);

    let formattedTime;
    if (minutes < 60) {
        formattedTime = minutes + " min";
    } else {
        let hours = Math.floor(minutes / 60);
        //let remainingMinutes = minutes % 60;
        if (hours < 24) {
            formattedTime = hours + " h " /*+ remainingMinutes + " min"*/;
        } else {
            let days = Math.floor(hours / 24);
            if (days > 10) {
                const postDate = new Date(timestamp);
                const options = { day: 'numeric', month: 'long', year: 'numeric' };
                formattedTime = postDate.toLocaleDateString('it-IT', options);
            } else {
                formattedTime = days + " d";
            }
        }
    }

    return formattedTime;
}