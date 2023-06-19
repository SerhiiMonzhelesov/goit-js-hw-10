const BASE_URL = 'https://api.thecatapi.com/v1';
const RESOURSE = '/breeds';
const API_KEY = 'live_1yg9qODu4yV9MglnZAshOsC3MU3jMs7B2uLAwCvuWWNGCWPQR7RIr7cBASyTb7xg ';


function fetchBreeds() {
    const url = `${BASE_URL}${RESOURSE}?api_key=${API_KEY}`;
    
    return fetch(url).then((response) => {
        if (!response.ok) {
            throw new Error(error)
        }
        return response.json();
    });
};

function fetchCat() {
    
};


export { fetchBreeds };