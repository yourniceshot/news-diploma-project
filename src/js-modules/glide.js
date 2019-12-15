import Glide from '../../node_modules/@glidejs/glide'

new Glide('.glide', {
    type: 'slider',
    startAt: 1,
    focusAt: 'center',
    perView: 3,
    gap: 16,
    autoplay: false,
    rewind: false,
    peek: 88,
    breakpoints: {
        1000: {
            perView: 2
        },
        800: {
            perView: 2,
            peek: 50,
            focusAt: 1
        },
        600: {
            perView: 1,
            peek: 88
        },
        450: {
            perView: 1,
            peek: 30
        },
        360: {
            perView: 1,
            peek: 10
        }
    }
}).mount();

