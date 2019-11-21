fetch('https://newsapi.org/v2/everything?', {
    headers: {
        'X-Api-Key': '4d914ea2fc164949aef0bab90a4c40e5',
    }
})
.then(res => res.json())
.then((res) => {
    console.log(res)
})