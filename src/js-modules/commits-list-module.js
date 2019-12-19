const commitsContainer = document.querySelector('.commits__slider');
import { gitHubApi } from './github-api-module.js';
import Glide from '../../node_modules/@glidejs/glide';
import { monthList } from './time-module.js';
import { CommitCard } from './commits-module.js';

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