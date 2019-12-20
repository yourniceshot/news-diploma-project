import { monthesList } from './time-module.js';
import { showMoreBtn } from './form-module.js';
import { Card } from './cards-module.js';

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
            const finalDate = `${date} ${monthesList[month]}, ${year}`;

            const titleToCut = card.title;
            let titleFormatted = titleToCut.slice(0,45);
            let titleTransformed = titleFormatted.split(' ');
            titleTransformed.splice(titleTransformed.length-1,1);
            titleFormatted = titleTransformed.join(' ');
            const finalTitle = titleFormatted+'...';

            const textToCut = card.description;
            if (textToCut !== null){
              let textFormatted = textToCut.slice(0,140);
              let textTransformed = textFormatted.split(' ');
              textTransformed.splice(textTransformed.length-1,1);
              textFormatted = textTransformed.join(' ');
              const finalText = textFormatted+'...';
              this.addCard(card.urlToImage, finalDate, finalTitle, finalText, card.source.name, card.url);
            } else {
              const textPlaceholder = ' ';
              this.addCard(card.urlToImage, finalDate, finalTitle, textPlaceholder, card.source.name, card.url);
            }

            localStorage.setItem('date', dateToFormat);
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
    
        const cardsOpened = document.querySelectorAll(".cards-opened");
        let next = cardsOpened[cardsOpened.length - 1].nextElementSibling;
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