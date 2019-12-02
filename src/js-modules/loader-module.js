export const loader = document.querySelector('.search-process');

export function renderLoading(isLoading) {
    if(isLoading) {
        loader.style.display = "block";
    } else {
        loader.style.display = "none";
    }
}