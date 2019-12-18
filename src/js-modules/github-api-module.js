class GitHubApi {
    constructor(url, key){
        this.url = url;
        this.key = key;
    }

    getCommits(){
        return fetch(`${this.url}/repos/yourniceshot/news-project/commits`, {
            headers: {
              authorization: this.key,
              'Content-Type': 'application/json'
            }
          })
        
          .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
          })
    }
}

export const gitHubApi = new GitHubApi('https://api.github.com', 'ac0b9bd1315737836df414d225e86d32374fc687');