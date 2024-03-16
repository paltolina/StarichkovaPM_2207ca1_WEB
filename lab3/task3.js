class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new HttpError(response);
      }
    })
}

// Запрашивается логин, пока github не вернёт существующего пользователя.
async function getGithubUser() {
  let name = prompt("Введите логин?", "iliakan");

  while (true) {
    try {
      const user = await loadJson(`https://api.github.com/users/${name}`);
      if (user.name !== null) {
        alert(`Полное имя: ${user.name}.`);
        return user;
      } else {
        alert("Пользователь не указал своё полное имя.");
      }
    } catch (err) {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("Такого пользователя не существует, пожалуйста, повторите ввод.");
        name = prompt("Введите логин?", "iliakan");
      } else {
        throw err;
      }
    }
  }
}

getGithubUser();
