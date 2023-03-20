import { newsData } from "./data.js";

renderCards();

document.addEventListener('click',(e) => {
    if(e.target.dataset.newsId){ // When heart icon was clicked
        handleLikeClick(e.target.dataset.newsId)
    }
    else if(e.target.dataset.removeNewsId){ // When close card was clicked
        e.target.closest('#news-card').style.display = "none";
    }
    else if(e.target.dataset.readNewsId){ // When read icons was clicked
        handleReadClick(e.target.dataset.readNewsId);
    }

})

document.querySelectorAll('#news-card').forEach(card => { // Hover card listener
    document.getElementById("close-btn-" + card.dataset.newsId).style.display = "none";
    

    card.addEventListener('mouseover', () =>{
        document.getElementById("close-btn-" + card.dataset.newsId).style.display = "inline";
        document.getElementById("image-box-" + card.dataset.newsId).style.boxShadow = "inset 0px 100px 100px -30px #192140";

        if(!newsData.find(news => news.id === parseInt(card.dataset.newsId)).isRead){
            document.getElementById("read-icon-" + card.dataset.newsId).style.display = "inline";
        }

    })

    card.addEventListener('mouseout', () =>{
        document.getElementById("close-btn-" + card.dataset.newsId).style.display = "none";
        document.getElementById("image-box-" + card.dataset.newsId).style.boxShadow = "none";

        if(!newsData.find(news => news.id === parseInt(card.dataset.newsId)).isRead){
            document.getElementById("read-icon-" + card.dataset.newsId).style.display = "none";
        }
    })
})


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

function handleReadClick(newsId){
    const newsObject = newsData.find(news => news.id === parseInt(newsId));
    newsObject.isRead = !newsObject.isRead;
    renderRead();
}

function renderRead(){

    newsData.forEach(news => {
        const readIcon = document.getElementById("read-icon-"+news.id);

        if(news.isRead){
            readIcon.style.display = "inline";
        }else{
            readIcon.style.display = "none"
        }
    })

}

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

function renderCards(){

    let feedHtml = "";

    newsData.forEach(news => {
        
        let isLikeClass = '';

        if(news.isLiked){
            isLikeClass = 'fa-solid';
        }else{
            isLikeClass = 'fa-regular';
        }

        feedHtml += `
<div class="news-card" id="news-card" data-news-id="${news.id}">
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
                <i class="fa-sharp ${isLikeClass} fa-heart" id="like-icon-${news.id}" data-news-id="${news.id}"></i>
                <span id="likes-count-${news.id}"></span>
            </div>
        </div>
    </div>
</div>
`;
    })

    document.getElementById('news-container').innerHTML = feedHtml;
    renderRead();
    renderLikes();

}