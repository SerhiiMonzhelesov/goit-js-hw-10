import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { fetchBreeds, fetchCat } from "./cat-api";

const elements = {
    selectBreeds: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader'),
    errorMessage: document.querySelector('.error'),
    cardCat: document.querySelector('.cat-info'),
    backdrop: document.querySelector('.backdrop')
};

elements.selectBreeds.hidden = true;
elements.errorMessage.hidden = true;

fetchBreeds()
    .then((data) => {
        elements.selectBreeds.innerHTML = createMarkupBreeds(data);
        new SlimSelect({
            select: '.breed-select'
        });
        elements.selectBreeds.hidden = false;
        elements.backdrop.classList.toggle('is-hidden')
    })
    .catch(error => {
        elements.errorMessage.hidden = false;
        Report.failure(
            'ERROR LOADING',
            'TRY RELOADING THE PAGE',
            'OK',
        );
        elements.backdrop.classList.toggle('is-hidden');
    });

function createMarkupBreeds(arr) {
    return arr.map(({ id, name }) => {
        return `<option value="${id}">${name}</option>`;
    }).join('');
};

elements.selectBreeds.addEventListener('change', handlerSelectCat);

function handlerSelectCat(event) {
    fetchCat(event.target.value)
        .then((data) => {
            elements.cardCat.innerHTML = createCardMarkup(data);
            elements.cardCat.classList.add('js-card-style')
        })
        .catch(error => {
            Report.failure(
                'ERROR LOADING',
                'TRY AGAIN OR SELECT ANOTHER CAT',
                'OK',
            )
        });
};

function createCardMarkup(arr) {
    return arr.map(({ url, breeds: [{ name, description, temperament }] }) => {
        return `<img src="${url}" alt="cat breed ${name}" width="100%">
      <h3>Breed:</h3><p>${name}</p><h4>Description:</h4><p>${description}</p>
      <h5>Temperament:</h5><p>${temperament}</p>`
    }).join();
};