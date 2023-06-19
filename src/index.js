import { fetchBreeds } from "./js/cat-api";

const elements = {
    selectBreeds: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader'),
    errorMessage: document.querySelector('.error'),
    cardCat: document.querySelector('.cat-info'),
};

console.log(fetchBreeds());

fetchBreeds().then((data) => {
    console.log(data);
    elements.errorMessage.hidden = true;
    elements.selectBreeds.innerHTML = createMarkupBreeds(data);
}).catch(error => console.log('ERROR axaxaxa'));

function createMarkupBreeds(arr) {
    return arr.map(({ id, name }) => {
        return `<option value="${id}">${name}</option>`;
    }).join('');
};




