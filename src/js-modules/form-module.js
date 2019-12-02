import { api } from './api-module.js';
import { CardList } from './cards-module.js';
const form = document.querySelector('.searcher__form');
const formInput = form.elements.request;
const newsList = document.querySelector('.cards-container__grid');
import { renderLoading } from './loader-module.js';
const noResultBlock = document.querySelector('.no-results');
const cardsContainer = document.querySelector('.cards-container');

form.addEventListener('submit', function(event){
    event.preventDefault();
    renderLoading(true);
    let cardList;
    api.newsSearching(formInput.value, 2019-11-20, 2019-11-25)
    .then((data) => {
        if (data.articles.length !== 0) {
            cardList = new CardList(newsList, data);
            cardsContainer.style.display = "flex";
        } else {
            cardsContainer.style.display = "none";
            noResultBlock.style.display = "block";
        }
    })
    .catch((err) => console.log(err))
    .finally(() => {
        renderLoading(false);
    });
});