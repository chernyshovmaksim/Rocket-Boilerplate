import anime from 'animejs/lib/anime.es';

const copyright = document.querySelector('.wrapper__logo');

anime({
    targets: copyright,
    rotate: '-1turn',
    duration: 3200
});