class Api {
    constructor(baseUrl, apiKey){
        this.baseUrl = baseUrl;
        this.apiKey = apiKey
    }

    async newsSearching(request, dateFrom, dateTo) {
        await fetch(
            `${this.baseUrl}` +
            `q=${request}&` +
            `from=${dateFrom}&` +
            `to=${dateTo}&` +
            "sortBy=popularity&" +
            "language=ru&" +
            "pageSize=100&" +
            `apiKey=${this.apiKey}`
        );
    }
}

const api = new Api('https://newsapi.org/v2/everything?', '4d914ea2fc164949aef0bab90a4c40e5');
api.newsSearching('Лес', '2019-11-20', '2019-11-22');