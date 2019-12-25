import "./vendor/normalize.css";
import "./about-page.css";
import "../node_modules/@glidejs/glide/dist/css/glide.core.min.css";
import "../node_modules/@glidejs/glide/dist/css/glide.theme.min.css";
import "./js-modules/github-api-module.js";
import "./js-modules/commits-module.js";
import "./js-modules/commits-list-module.js";
const commitsContainer = document.querySelector('.commits__slider');
import { gitHubApi } from './js-modules/github-api-module.js';
import { CommitsList } from './js-modules/commits-list-module.js';

let commitsList;
gitHubApi.getCommits() 
.then((result) => {
    commitsList = new CommitsList(commitsContainer, result)
    console.log(result);
})
.catch((err) => console.log(err));