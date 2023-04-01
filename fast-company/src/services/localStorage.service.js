const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";

export function setTokens({ idToken, refreshToken, expiresIn = 3600 }) {
    const expiresDate = new Date().getTime() + expiresIn * 1000; // Получаем time stamp времени истечения рока годности idToken
    localStorage.setItem(TOKEN_KEY, idToken); // сохраняем в LS все токены, полученные в результате запроса на сервер
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
};

export function getAccesToken() { // метод получения ключа по запросу
    return localStorage.getItem(TOKEN_KEY);
};

export function getRefreshToken() { // метод получения ключа по запросу
    return localStorage.getItem(REFRESH_KEY);
};

export function getExpiresDateToken() { // метод получения ключа по запросу
    return localStorage.getItem(EXPIRES_KEY);
};

const localStorageService = {
    setTokens,
    getAccesToken,
    getRefreshToken,
    getExpiresDateToken
};

export default localStorageService;
