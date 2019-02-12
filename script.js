let slidesItem = document.querySelectorAll('.slide-item');
let indContainer = document.querySelector('.indicators');
let btnPausePlay = document.querySelector('#pause-play');
let btnPrev = document.querySelector('#prev');
let btnNext = document.querySelector('#next');
let currentSlide = 0;
let playStatus = true;
let timerId = null;
let timerInterval = 1000;

const FA_PAUSE = '<i class="fas fa-pause"></i>';
const FA_PLAY = '<i class="fas fa-play"></i>';
const SPACE = ' ';
const LEFT_ARROW = 'ArrowLeft';
const RIGTH_ARROW = 'ArrowRight';

indContainer.style.display = 'flex'; 
document.querySelector('.controls').style.display = 'block';

let goToSlide = (n) => {
	slidesItem[currentSlide].classList.toggle('active');
	currentSlide = (n + slidesItem.length) % slidesItem.length;
	slidesItem[currentSlide].classList.toggle('active');
}

let goToNextSlide = () => {
	goToSlide(currentSlide + 1);
}

let goToPrevSlide = () => {
	goToSlide(currentSlide - 1);
}

let startSlider = () => {
	timerId = setInterval(goToNextSlide, timerInterval);
}

let pauseSlideShow = () => {
	btnPausePlay.innerHTML = FA_PLAY;
	playStatus = !playStatus;
	clearInterval(timerId);
}

let playSlideShow = () => {
	btnPausePlay.innerHTML = FA_PAUSE;
	playStatus = !playStatus;
	startSlider();
}

let pausePlaySlideShow = () => {
	playStatus ? pauseSlideShow() : playSlideShow();
}

let clickPrevBtn = () => {
	pauseSlideShow();
	goToPrevSlide();
}

let clickNextBtn = () => {
	pauseSlideShow();
	goToNextSlide();
}

btnPausePlay.addEventListener('click', pausePlaySlideShow);
btnPrev.addEventListener('click', clickPrevBtn);
btnNext.addEventListener('click', clickNextBtn);

let keyControlsBtn = (e) => {
	if (e.key === SPACE) pausePlaySlideShow();
	if (e.key === LEFT_ARROW) clickPrevBtn();
	if (e.key === RIGTH_ARROW) clickNextBtn();
}

let clickIdicatorItem = (e) => {
	let target = e.target;
	if (target.classList.contains('indicator-item')) {
		pauseSlideShow();
		goToSlide(+target.getAttribute('data-slide-to'));
	}
}

document.addEventListener('keydown', keyControlsBtn);

indContainer.addEventListener('click', clickIdicatorItem);
