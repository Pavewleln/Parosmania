import Slider from './slider.js';

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, autoplay) {
        super(container, next, prev, activeClass, autoplay);
    }

    nextSlide() {
        if (this.slides[1].tagName == "BUTTON" && this.slides[2].tagName == "BUTTON") {
            this.container.appendChild(this.slides[0]); // Slide
            this.container.appendChild(this.slides[1]); // Btn
            this.container.appendChild(this.slides[2]); // Btn

        } else {
            this.container.appendChild(this.slides[0]);
        }
    }

    bindTriggers() {
        this.next.addEventListener('click', () => this.nextSlide());

        this.prev.addEventListener('click', () => {

            for (let i = this.slides.length - 1; i > 0; i--) {
                if (this.slides[i].tagName !== "BUTTON") {
                    let active = this.slides[i];
                    this.container.insertBefore(active, this.slides[0]);
                    break;
                }
            }

           
        });
    }

    init() {
        try {
            this.bindTriggers();

            if (this.autoplay) {
                setInterval(() => this.nextSlide(), 5000);
            }
        } catch(e){}
    }
}