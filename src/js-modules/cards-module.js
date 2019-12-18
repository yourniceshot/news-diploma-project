import { monthList } from './time-module.js';
import { showMoreBtn } from './form-module.js';

class Card {
    constructor(image, date, title, article, source, url) {
        this.cardElement = this.cardRender(image, date, title, article, source, url)
    }

    cardRender(imageValue, dateValue, titleValue, articleValue, sourceValue, urlValue) {

        const newsCard = document.createElement('div');
        newsCard.classList.add('card');
        newsCard.classList.add('cards-container__card');
        newsCard.setAttribute('onclick', `location.href = "${urlValue}"`);
    
        const cardImage = document.createElement('img');
        cardImage.classList.add('card__image');
        cardImage.setAttribute('src', imageValue);
        cardImage.setAttribute('alt', 'Здесь должно было быть изображение от новостного сервиса :(');
    
        const cardTexts = document.createElement('div');
        cardTexts.classList.add('card__texts');

        const cardDate = document.createElement('span');
        cardDate.classList.add('card__date');
        cardDate.textContent = dateValue;
        
        const cardTitle = document.createElement('h4');
        cardTitle.classList.add('card__title');
        cardTitle.textContent = titleValue;
    
        const cardArticle = document.createElement('p');
        cardArticle.classList.add('card__article');
        cardArticle.textContent = articleValue;
    
        const cardSource = document.createElement('div');
        cardSource.classList.add('card__source');
        cardSource.textContent = sourceValue;
    
        newsCard.appendChild(cardImage);
        newsCard.appendChild(cardTexts);
        cardTexts.appendChild(cardDate);
        cardTexts.appendChild(cardTitle);
        cardTexts.appendChild(cardArticle);
        cardTexts.appendChild(cardSource);
    
        return newsCard;
    }
}

export class CardList {
    constructor(container, cards) {
        this.container = container;
        this.cards = cards;
        this.render();
    }

    addCard(image, date, title, article, source, url) {
        const { cardElement } = new Card(image, date, title, article, source, url);
        this.container.appendChild(cardElement);
    }

    render() {
        this.cards.articles.forEach((card) => {
            const dateToFormat = new Date(card.publishedAt);
            const year = dateToFormat.getFullYear();
            const month = dateToFormat.getMonth();
            const date = dateToFormat.getDate();
            const finalDate = `${date} ${monthList[month]}, ${year}`;

            const titleToCut = card.title;
            let titleFormatted = titleToCut.slice(0,45);
            let titleTransformed = titleFormatted.split(' ');
            titleTransformed.splice(titleTransformed.length-1,1);
            titleFormatted = titleTransformed.join(' ');
            const finalTitle = titleFormatted+'...';

            const textToCut = card.description;
            let textFormatted = textToCut.slice(0,140);
            let textTransformed = textFormatted.split(' ');
            textTransformed.splice(textTransformed.length-1,1);
            textFormatted = textTransformed.join(' ');
            const finalText = textFormatted+'...';

            localStorage.setItem('date', dateToFormat);
            this.addCard(card.urlToImage, finalDate, finalTitle, finalText, card.source.name, card.url);
            CardList.showRenderCard();
        })
    }

    static showRenderCard() {
        showMoreBtn.addEventListener("click", CardList.showMore);
        const cards = document.querySelectorAll(".cards-container__card");
    
        for (let i = 0; i <= 2; i++) {
          if (cards[i]) {
            cards[i].classList.add("cards-opened");
          }
        }
    }
    
    static showMore(event) {
        event.preventDefault();
    
        const on = document.querySelectorAll(".cards-opened");
        let next = on[on.length - 1].nextElementSibling;
        let index = 0;
        const step = 3;
    
        while (index < step) {
          if (next) {
            next.classList.add("cards-opened");
            next = next.nextElementSibling;
            index++;
          } else {
            showMoreBtn.style.display = "none";
            break;
          }
        }
    }
}