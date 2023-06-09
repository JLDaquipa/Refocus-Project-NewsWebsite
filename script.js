import { newsData } from "./data.js";

renderCards();

document.addEventListener('click',(e) => {
    if(e.target.dataset.newsId){ // When heart icon was clicked
        handleLikeClick(e.target.dataset.newsId);
    }
    else if(e.target.dataset.removeNewsId){ // When close card was clicked
        e.target.closest('#news-card').style.display = "none";
    }
    else if(e.target.dataset.readNewsId){ // When read icons was clicked
        handleReadClick(e.target.dataset.readNewsId);
    }

})

document.querySelectorAll('#news-card').forEach(card => { // Hover cards listener
    document.getElementById("close-btn-" + card.dataset.newsId).style.display = "none";
    

    card.addEventListener('mouseover', () => { // Hover in
        document.getElementById("close-btn-" + card.dataset.newsId).style.display = "inline";
        document.getElementById("image-box-" + card.dataset.newsId).style.boxShadow = "inset 0px 100px 100px -30px #192140";

        if(!newsData.find(news => news.id === parseInt(card.dataset.newsId)).isRead){
            document.getElementById("read-icon-" + card.dataset.newsId).style.display = "inline";
        }

    })

    card.addEventListener('mouseout', () => { // Hover out
        document.getElementById("close-btn-" + card.dataset.newsId).style.display = "none";
        document.getElementById("image-box-" + card.dataset.newsId).style.boxShadow = "none";

        if(!newsData.find(news => news.id === parseInt(card.dataset.newsId)).isRead){
            document.getElementById("read-icon-" + card.dataset.newsId).style.display = "none";
        }
    })
})

// Function that handles events where user click the heart icon on cards
function handleLikeClick(newsId){ 

    const newsObject = newsData.find(news => news.id === parseInt(newsId));

    if(!newsObject.isLiked){
        newsObject.likes++;
    }else{
        newsObject.likes--;
    }

    newsObject.isLiked = !newsObject.isLiked;
    renderLikes();
}

// Function that handles events where users click the read check icon on cards
function handleReadClick(newsId){
    const newsObject = newsData.find(news => news.id === parseInt(newsId));
    newsObject.isRead = !newsObject.isRead;
    renderRead();
}

// Function that renders likes count and heart icon on cards 
function renderLikes(){
    newsData.forEach(news => {
        const heartIcon = document.getElementById("like-icon-"+news.id);

        if(news.isLiked){
            heartIcon.classList.replace("fa-regular", "fa-solid");
        }else{
            heartIcon.classList.replace("fa-solid","fa-regular");
        }
        document.getElementById("likes-count-" + news.id).textContent = news.likes;
    })
}

// Function that renders check icon on cards that's already been read
function renderRead(){
    newsData.forEach(news => {
        const readIcon = document.getElementById("read-icon-"+news.id);

        if(news.isRead){
            readIcon.style.display = "inline";
        }else{
            readIcon.style.display = "none";
        }
    })
}

// Renders all cards to DOM function
function renderCards(){
    let feedHtml = "";

    newsData.forEach(news => {
        feedHtml += `
<div class="news-card" id="news-card" data-news-id="${news.id}">
    <article>
        <i class="fa-regular fa-circle-xmark close-btn" id="close-btn-${news.id}" data-remove-news-id="${news.id}"></i>
        <div class="image-box" id="image-box-${news.id}"><img class="image" src="images/${news.image}" alt="News Banner Image"></div>
        <div class="card-content">
            <i class="fa-regular fa-circle-check read-icon" id="read-icon-${news.id}" data-read-news-id="${news.id}"></i>
            <h1 class="card-title">${news.title}</h1>
            <div class="card-elem">
                <div class="card-date">
                    <span id="card-date">${news.date}</span>
                </div>
                <div class="heart">
                    <i class="fa-sharp fa-regular fa-heart" id="like-icon-${news.id}" data-news-id="${news.id}"></i>
                    <span id="likes-count-${news.id}"></span>
                </div>
            </div>
        </div>
    </article>
</div>`;
})
    document.getElementById('news-container').innerHTML = feedHtml;
    renderRead();
    renderLikes();
}