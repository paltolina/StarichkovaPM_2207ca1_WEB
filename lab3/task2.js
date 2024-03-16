// Функция delay, возвращающая промис, который сделает resolve() через N секунд
function delay(N) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, N * 1000);
    });
}

// Функция для получения имени первого репозитория на GitHub по имени пользователя
function getFirstRepo(username) {
    return fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const reposUrl = data.repos_url;
            return fetch(reposUrl);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(repos => {
            if (repos.length > 0) {
                return repos[0].name;
            } else {
                throw new Error('User has no repositories');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Пример использования функции delay
delay(3).then(() => console.log("Resolved after 3 seconds"));

// Пример использования функции getFirstRepo
getFirstRepo('octocat').then(repoName => {
    console.log(`First repository name: ${repoName}`);
});
