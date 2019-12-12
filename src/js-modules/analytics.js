const analyticsTitle = document.querySelector('.analytics-main__title');
const newsPerWeek = document.getElementById('amount1');
const titlesPerWeek = document.getElementById('amount2');

(function setTitle() {
    analyticsTitle.textContent = `Вы спросили: «${localStorage.getItem('request')}»`;
})();

(function setAmount(){
    const storageParsed = JSON.parse(localStorage.getItem('articles'));
    titlesPerWeek.textContent = storageParsed.articles.length;
})();