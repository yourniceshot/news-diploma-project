export class Api {
    constructor(baseUrl, apiKey){
        this.baseUrl = baseUrl;
        this.apiKey = apiKey
    }

    async newsSearching(request, dateFrom, dateTo) {
        const res = await fetch(
            `${this.baseUrl}` +
            `qInTitle=${request}&` +
            `from=${dateFrom}&` +
            `to=${dateTo}&` +
            "sortBy=popularity&" +
            "language=ru&" +
            "pageSize=100&" +
            `apiKey=${this.apiKey}`
        )

        if (res.ok) {
            const json = await res.json();
            return json;
          } else {
            throw new Error(`Ошибка: ${res.status}`);
        }
    }

}

export const api = new Api('https://newsapi.org/v2/everything?', '4d914ea2fc164949aef0bab90a4c40e5');