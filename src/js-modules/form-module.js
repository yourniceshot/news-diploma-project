import { api } from './api-module.js';
import { CardList } from './cards-module.js';
export const form = document.querySelector('.searcher__form');
export const formInput = form.elements.request;
import { renderLoading } from './loader-module.js';
const noResultBlock = document.querySelector('.no-results');
export const cardsContainer = document.querySelector('.cards-container__grid-container');
const errorMessage = document.querySelector('.error-message');
const linkToAnalytics = document.querySelector('.cards-container__link-container');
const cardListTitle = document.querySelector('.cards-container__header');
const cardBlock = document.querySelector('.cards-container');
import { dateTo } from './time-module.js';
import { dateFrom } from './time-module.js';
export const newsList = document.querySelector('.cards-container__grid');
export const showMoreBtn = document.querySelector('.cards-container__button');

form.addEventListener('submit', function(event){
    event.preventDefault();
    renderLoading(true);
    cardBlock.style.display = "flex";
    cardListTitle.style.display = "flex";
    newsList.innerHTML = '';
    noResultBlock.style.display = "none";
    errorMessage.style.display = "none";
    linkToAnalytics.style.display = "none";
    let cardList;
    localStorage.setItem('request', formInput.value);
    api.newsSearching(formInput.value, dateFrom.toISOString(), dateTo.toISOString())
    .then((data) => {
        const dataToStorage = JSON.stringify(data);
        localStorage.setItem("articles", dataToStorage);

        if (data.articles.length == 0) {
            cardsContainer.style.display = "none";
            noResultBlock.style.display = "block";
            cardListTitle.style.display = "none";
            showMoreBtn.style.display = "none";
            
        } else if (data.articles.length <= 3) {
            cardList = new CardList(newsList, data);
            cardsContainer.style.display = "flex";
            linkToAnalytics.style.display = "flex";
            showMoreBtn.style.display = "none";
        }
        else if (data.articles.length > 3) {
            cardsContainer.style.display = "flex";
            linkToAnalytics.style.display = "flex";            
            showMoreBtn.style.display = "block";
            cardList = new CardList(newsList, data);
        }
    })
    .catch((err) => {
        console.log(err);
        errorMessage.style.display = "block";
        cardListTitle.style.display = "none";
    })
    .finally(() => {
        renderLoading(false);
    });

    api.newsSearchingWhole(formInput.value, dateFrom.toISOString(), dateTo.toISOString()) 
    .then((result) => {
        const resultToStorage = JSON.stringify(result);
        localStorage.setItem('news', resultToStorage);
    })
    .catch((err) => {
        console.log(err);
    })
});