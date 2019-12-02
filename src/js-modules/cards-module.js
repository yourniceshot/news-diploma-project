class Card {
    constructor(image, date, title, article, source) {
        this.cardElement = this.cardRender(image, date, title, article, source)
    }

    cardRender(imageValue, dateValue, titleValue, articleValue, sourceValue) {

        const newsCard = document.createElement('div');
        newsCard.classList.add('card');
        newsCard.classList.add('cards-container__card');
    
        const cardImage = document.createElement('img');
        cardImage.classList.add('card__image');
        cardImage.setAttribute('src', imageValue);
    
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

    addCard(image, date, title, article, source) {
        const { cardElement } = new Card(image, date, title, article, source);
        this.container.appendChild(cardElement);
    }

    render() {
        this.cards.articles.forEach((card) => {
            this.addCard(card.urlToImage, card.publishedAt, card.title, card.description, card.source.name);
        })
    }
}