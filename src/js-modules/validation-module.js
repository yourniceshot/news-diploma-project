const searchField = document.querySelector('.form__input');
const searchBttn = document.querySelector('.form__button');
const searchError = document.querySelector('.form__input-error');

searchField.addEventListener('input', function(){
    if(searchField.value.length !== 0) {
        searchBttn.removeAttribute('disabled');
        searchError.style.display = "none";
    } else {
        searchBttn.setAttribute('disabled', true);
        searchError.style.display = "block";
    }
});