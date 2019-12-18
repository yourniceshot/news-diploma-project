const analyticsTitle = document.querySelector('.analytics-main__title');
const newsPerWeek = document.getElementById('amount1');
const titlesPerWeek = document.getElementById('amount2');
const lsRequest = localStorage.getItem('request');
import { weekDayList } from './time-module.js';
const storageParsed = JSON.parse(localStorage.getItem('news'));
import { monthesForDiagramm } from './time-module.js';
const diagrammDate = document.querySelector('.analytics__info-date');

(function setTitle() {
    analyticsTitle.textContent = `Вы спросили: «${lsRequest}»`;
})();

(function setAmountTitles(){
    const storageParsed = JSON.parse(localStorage.getItem('articles'));
    titlesPerWeek.textContent = storageParsed.totalResults;
})();

(function setAmountNews(){
    newsPerWeek.textContent = storageParsed.totalResults;
})();

class Statistics {
    constructor(word, data) {
      this.word = word;
      this.data = data;
      this.perDay();
    }
  
    perDay() {
      const articlesPerDay = {};
  
      this.data.articles.forEach(element => {
        const date = new Date(element.publishedAt.substring(0, 10)).getDate();
  
        if (date in articlesPerDay) {
          articlesPerDay[date]++;
        } else {
          articlesPerDay[date] = 1;
        }
      });
  
      this.toDiagramm(articlesPerDay);
    }
  
    toDiagramm(articlesPerDay) {
      const weekAgo = new Date(new Date().getTime() - 518400000);
  
      for (let i = 0; i <= 6; i++) {
        const dayMs = i * 24 * 60 * 60 * 1000;
        const date = new Date(weekAgo.getTime() + dayMs);
        const day = date.getDate();
        const wday = weekDayList[`${date.getDay()}`].toLowerCase();
  
        document.querySelector(`.day-${i}`).textContent = `${day}, ${wday}`;
  
        if (day in articlesPerDay) {
          const widthOfPercent = (articlesPerDay[`${day}`]);
  
          document.querySelector(`.bar-${i}`).style.width = `${widthOfPercent}%`;
          document.querySelector(`.bar-${i}`).textContent = `${articlesPerDay[`${day}`]}`;
        } else {
          document.querySelector(`.bar-${i}`).style.width = '0';
        }
      }
    }

    setMonthToDiagramm() {
        const dateToFormat = new Date(localStorage.getItem('date'));
        const month = dateToFormat.getMonth();
        const finalMonth = `${monthesForDiagramm[month]}`;
        diagrammDate.textContent = `Дата (${finalMonth})`;
    }
}

const statistics = new Statistics(lsRequest, storageParsed);
statistics.setMonthToDiagramm();