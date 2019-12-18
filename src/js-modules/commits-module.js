const commitsContainer = document.querySelector('.commits__slider');
import { gitHubApi } from './github-api-module.js';
import Glide from '../../node_modules/@glidejs/glide';
import { monthList } from './time-module.js';

class CommitCard {
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

class CommitsList {
    constructor(container, data) {
        this.container = container;
        this.data = data;
        this.render();
    }

    addCommit(date, photo, name, email, note) {
        const { cardElement } = new CommitCard(date, photo, name, email, note);
        this.container.appendChild(cardElement);
    }

    render() {
        this.data.forEach((item) => {
            const dateToFormat = new Date(item.commit.committer.date);
            const year = dateToFormat.getFullYear();
            const month = dateToFormat.getMonth();
            const date = dateToFormat.getDate();
            const finalDate = `${date} ${monthList[month]}, ${year}`;

            this.addCommit(finalDate, item.author.avatar_url, item.commit.committer.name, item.commit.committer.email, item.commit.message);
            CommitsList.createGlide();
        })
    }

    static createGlide() {
        const glide = new Glide('.glide', {
            type: 'slider',
            startAt: 1,
            focusAt: 'center',
            perView: 3,
            gap: 16,
            autoplay: false,
            rewind: false,
            peek: 88,
            breakpoints: {
                1000: {
                    perView: 2
                },
                800: {
                    perView: 2,
                    peek: 50,
                    focusAt: 1
                },
                600: {
                    perView: 1,
                    peek: 88
                },
                450: {
                    perView: 1,
                    peek: 30
                },
                360: {
                    perView: 1,
                    peek: 10
                }
            }
        });
        glide.mount();
    }
}

let commitsList;
gitHubApi.getCommits() 
.then((result) => {
    commitsList = new CommitsList(commitsContainer, result)
    console.log(result);
})
.catch((err) => console.log(err));