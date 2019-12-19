export class CommitCard {
    constructor(date, photo, name, email, note) {
        this.cardElement = this.commitCardRender(date, photo, name, email, note);
    }

    commitCardRender(dateValue, photoValue, nameValue, emailValue, noteValue) {

        const commitCard = document.createElement('li');
        commitCard.classList.add('slider-card');
        commitCard.classList.add('glide__slide');
        commitCard.setAttribute('onclick', "location.href = 'https://github.com/yourniceshot/news-diploma-project/commits/level-1'");
    
        const cardPhoto = document.createElement('img');
        cardPhoto.classList.add('slider-card__photo');
        cardPhoto.setAttribute('alt', 'user photo');
        cardPhoto.setAttribute('src', photoValue);
    
        const cardUser = document.createElement('div');
        cardUser.classList.add('slider-card__user');

        const cardDate = document.createElement('span');
        cardDate.classList.add('slider-card__date');
        cardDate.textContent = dateValue;
        
        const cardName = document.createElement('span');
        cardName.classList.add('slider-card__name');
        cardName.textContent = nameValue;
    
        const cardNote = document.createElement('p');
        cardNote.classList.add('slider-card__article');
        cardNote.textContent = noteValue;
    
        const cardEmail = document.createElement('span');
        cardEmail.classList.add('slider-card__email');
        cardEmail.textContent = emailValue;

        const cardUserInfo = document.createElement('div');
        cardUserInfo.classList.add('slider-card__user-info');
    
        commitCard.appendChild(cardDate);
        commitCard.appendChild(cardUser);
        cardUser.appendChild(cardPhoto);
        cardUser.appendChild(cardUserInfo);
        cardUserInfo.appendChild(cardName);
        cardUserInfo.appendChild(cardEmail);
        commitCard.appendChild(cardNote);
    
        return commitCard;
    }
}