export default class Slider {
    constructor({container = null,
        btns = null,
        next = null, 
        prev = null,
        dots = null,
        sliders = null,
        activeClass = '',
        animate,
        autoplay } = {}){
        this.container = document.querySelector(container);
        try {this.slides = this.container.children;} catch(e){}
        this.btns = document.querySelectorAll(btns);
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        this.dots = document.querySelectorAll(dots);
        this.sliders = document.querySelectorAll(sliders);
        this.activeClass = activeClass;
        this.animate = animate;
        this.autoplay = autoplay;
        this.slideIndex = 1;
    }
}