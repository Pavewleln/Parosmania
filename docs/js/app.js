(() => {
    "use strict";
    const tabs = (header, trigger, content, activeClass, display = "block") => {
        const headerTab = document.querySelector(header), tabsTrigger = document.querySelectorAll(trigger), contentTabs = document.querySelectorAll(content);
        function hideContent() {
            contentTabs.forEach((content => {
                content.style.display = "none";
            }));
            tabsTrigger.forEach((tab => {
                tab.classList.remove(activeClass);
            }));
        }
        function showContent(i = 0) {
            try {
                contentTabs[i].style.display = display;
            } catch (e) {}
            try {
                tabsTrigger[i].classList.add(activeClass);
            } catch (e) {}
        }
        hideContent();
        showContent();
        try {
            headerTab.addEventListener("click", (e => {
                e.preventDefault();
                if (e.target && (e.target.classList.contains(trigger.replace(/\./, "")) || e.target.parentNode.classList.contains(trigger.replace(/\./, "")))) tabsTrigger.forEach(((tab, i) => {
                    if (e.target == tab || e.target.parentNode == tab) {
                        hideContent();
                        showContent(i);
                    }
                }));
            }));
        } catch (e) {}
    };
    const modules_tabs = tabs;
    const modals = () => {
        let btnPressed = false;
        function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
            const trigger = document.querySelectorAll(triggerSelector), modal = document.querySelector(modalSelector), close = document.querySelector(closeSelector), windows = document.querySelectorAll("[data-modal]"), scroll = calcScroll();
            trigger.forEach((item => {
                item.addEventListener("click", (e => {
                    if (e.target) e.preventDefault();
                    btnPressed = true;
                    if (destroy) item.remove();
                    windows.forEach((item => {
                        item.style.display = "none";
                        item.classList.add("animated", "fadeIn");
                    }));
                    modal.style.display = "flex";
                    document.body.style.overflow = "hidden";
                    document.body.style.marginRight = `${scroll}px`;
                }));
            }));
            close.addEventListener("click", (() => {
                windows.forEach((item => {
                    item.style.display = "none";
                }));
                modal.style.display = "none";
                document.body.style.overflow = "";
                document.body.style.marginRight = `0px`;
            }));
            modal.addEventListener("click", (e => {
                if (e.target === modal) {
                    windows.forEach((item => {
                        item.style.display = "none";
                    }));
                    modal.style.display = "none";
                    document.body.style.overflow = "";
                    document.body.style.marginRight = `0px`;
                }
            }));
        }
        function calcScroll() {
            let div = document.createElement("div");
            div.style.width = "50px";
            div.style.height = "50px";
            div.style.overflowY = "scroll";
            div.style.visibility = "hidden";
            document.body.appendChild(div);
            let scrollWidth = div.offsetWidth - div.clientWidth;
            div.remove();
            return scrollWidth;
        }
        function openByScroll(selector) {
            window.addEventListener("scroll", (() => {
                let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
                if (!btnPressed && window.pageYOffset + document.documentElement.clientHeight >= scrollHeight) document.querySelector(selector).click();
            }));
        }
        bindModal(".vacansy", ".popup-booking", ".popup-booking .popup__close");
        bindModal(".profile", ".popup-input", ".popup-input .popup__close");
        bindModal(".reestablish", ".popup-recovery", ".popup-recovery .popup__close");
        bindModal(".registration", ".popup-registration", ".popup-registration .popup__close");
        bindModal(".subsribe", ".popup-subscription", ".popup-subscription .popup__close");
        bindModal(".registration-completed", ".popup-cheack-phone", ".popup-cheack-phone .popup__close");
        bindModal(".cancel", ".popup-input", ".popup-input .popup__close");
        openByScroll(".subsribe");
    };
    const modal = modals;
    class Burger {
        constructor() {
            this.burgerMenu = document.querySelector(".header nav.navbar .navbar-toggler");
            this.orderMenu = document.querySelector(".vacansy");
        }
        init() {
            this.openBurger();
            this.closeBurger();
            this.closeOrder();
        }
        openBurger() {
            this.burgerMenu.addEventListener("click", (() => {
                document.body.style.overflow = "hidden";
            }));
        }
        closeBurger() {
            this.burgerMenu.addEventListener("click", (() => {
                if (this.burgerMenu.classList.contains("collapsed")) document.body.style.overflow = "";
            }));
        }
        closeOrder() {
            this.orderMenu.addEventListener("click", (() => {
                this.closeBurger();
                this.burgerMenu.click();
            }));
        }
    }
    class Form {
        constructor(forms) {
            this.forms = document.querySelectorAll(forms);
            this.btn = document.querySelector("button");
            this.inputs = document.querySelectorAll("input");
            this.textareas = document.querySelectorAll("textarea");
            this.message = {
                loading: "Загрузка...",
                success: "Спасибо! Скоро мы с вами свяжемся!",
                failure: "Что-то пошло не так...",
                input: "Вы вошли",
                registration: "Вы Зарегистрировались",
                booking: "Вы забронировали",
                reviews: "Спасибо, что оставили отзыв",
                recovery: "Пароль восстановлен",
                cheack: "Отлично! Телефон проверен",
                subscribe: "Спасибо! вы будете получать уведомления",
                person: "Информация изменена"
            };
            this.path = "../../server.php";
        }
        clearInputs() {
            this.inputs.forEach((item => {
                item.value = "";
            }));
        }
        clearTextareas() {
            this.textareas.forEach((item => {
                item.value = "";
            }));
        }
        checkMailInputs() {
            const mailInputs = document.querySelectorAll('[type="email"]');
            mailInputs.forEach((input => {
                input.addEventListener("keypress", (function(e) {
                    if (e.key.match(/[^a-z 0-9 @ \.]/gi)) e.preventDefault();
                }));
            }));
            const nameInputs = document.querySelectorAll('[type="name"]');
            nameInputs.forEach((input => {
                input.addEventListener("keypress", (function(e) {
                    if (e.key.match(/[^а-яё]/gi)) e.preventDefault();
                }));
            }));
        }
        initMask() {
            let setCursorPosition = (pos, elem) => {
                elem.focus();
                if (elem.setSelectionRange) elem.setSelectionRange(pos, pos); else if (elem.createTextRange) {
                    let range = elem.createTextRange();
                    range.collapse(true);
                    range.moveEnd("character", pos);
                    range.moveStart("character", pos);
                    range.select();
                }
            };
            function createMask(event) {
                let matrix = "+380 (__) __-__", i = 0, def = matrix.replace(/\D/g, ""), val = this.value.replace(/\D/g, "");
                if (def.length >= val.length) val = def;
                this.value = matrix.replace(/./g, (function(a) {
                    return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
                }));
                if ("blur" === event.type) {
                    if (2 == this.value.length) this.value = "";
                } else setCursorPosition(this.value.length, this);
            }
            let inputs = document.querySelectorAll('[type="phone"]');
            inputs.forEach((input => {
                input.addEventListener("input", createMask);
                input.addEventListener("focus", createMask);
                input.addEventListener("blur", createMask);
            }));
        }
        async postData(url, data) {
            let res = await fetch(url, {
                method: "POST",
                body: data
            });
            return await res.text();
        }
        init() {
            this.checkMailInputs();
            this.initMask();
            this.btn.disabled = false;
            this.forms.forEach((item => {
                item.addEventListener("submit", (e => {
                    e.preventDefault();
                    let statusMessage = document.createElement("div");
                    statusMessage.classList.add("statusMessages");
                    item.parentNode.appendChild(statusMessage);
                    statusMessage.textContent = this.message.loading;
                    const formData = new FormData(item);
                    this.postData(this.path, formData).then((res => {
                        console.log(res);
                        switch (true) {
                          case item.classList.contains("entrance"):
                            statusMessage.textContent = this.message.input;
                            break;

                          case item.classList.contains("registr"):
                            statusMessage.textContent = this.message.registration;
                            break;

                          case item.classList.contains("subscribe"):
                            statusMessage.textContent = this.message.subscribe;
                            break;

                          case item.classList.contains("cheackPhone"):
                            statusMessage.textContent = this.message.cheack;
                            break;

                          case item.classList.contains("recovering"):
                            statusMessage.textContent = this.message.recovery;
                            break;

                          case item.classList.contains("reviews"):
                            statusMessage.textContent = this.message.reviews;
                            break;

                          case item.classList.contains("bookings"):
                            statusMessage.textContent = this.message.booking;
                            break;

                          case item.classList.contains("page__container-content-person"):
                            statusMessage.textContent = this.message.person;
                            break;

                          default:
                            statusMessage.textContent = this.message.success;
                            break;
                        }
                    })).catch((() => {
                        statusMessage.textContent = this.message.failure;
                    })).finally((() => {
                        this.clearInputs();
                        this.clearTextareas();
                        this.btn.disabled = true;
                        setTimeout((() => {
                            statusMessage.remove();
                            this.btn.disabled = false;
                        }), 5e3);
                    }));
                }));
            }));
        }
    }
    const readImage = (selector, options = {}, block) => {
        const input = document.getElementById(selector);
        const blockimg = document.querySelector(block);
        try {
            input.addEventListener("change", (event => {
                console.log(event.target.files);
                if (!event.target.files.length) return;
                const files = Array.from(event.target.files);
                files.forEach((file => {
                    console.log(file);
                    if (!file.type.match("image")) return;
                    const reader = new FileReader;
                    reader.onload = ev => {
                        console.log(ev.target.result);
                        blockimg.insertAdjacentHTML("afterbegin", `<img src="${ev.target.result}" />`);
                    };
                    reader.readAsDataURL(file);
                }));
            }));
        } catch (e) {}
        try {
            if (options.accept && Array.isArray(options.accept)) input.setAttribute("accept", options.accept.join(","));
        } catch (e) {}
    };
    const fileread = readImage;
    const katalog = container => {
        const productsContainer = document.querySelector(container);
        let items = document.querySelectorAll(".pagination li");
        let notesOnPage = 8;
        getProducts();
        async function getProducts() {
            const response = await fetch("./products.json");
            const productArray = await response.json();
            renderProducts(productArray);
            console.log(productArray);
        }
        function renderProducts(productArray) {
            productsContainer.innerHTML = "";
            for (let item of items) item.addEventListener("click", (function(e) {
                e.preventDefault();
                let pageNum = +this.innerHTML;
                let start = (pageNum - 1) * notesOnPage;
                let end = start + notesOnPage;
                let notes = productArray.slice(start, end);
                console.log(notes);
                productArray.forEach((item => {
                    const productHTML = `\n                    <div class="product" data-id="${item.id}">\n                        <div class="product-img">\n                            <img src="${item.imgSrc}" alt="">\n                        </div>\n                        <a href="./description.html" class="product-title">\n                            ${item.title}\n                        </a>\n                        <div class="product-description">\n                            ${item.description}\n                        </div>\n                        <div class="product-rating">\n                            ${item.rating}\n                        </div>\n                        <div class="product-price">\n                            <b><span>${item.price}</span>₽/кг</b> <span>За 500гр.</span>\n                        </div>\n                        <a href="" class="product-to-basket">В корзину</a>\n                    </div>\n                    `;
                    productsContainer.insertAdjacentHTML("beforeend", productHTML);
                }));
            }));
        }
    };
    const modules_katalog = katalog;
    class Slider {
        constructor({container = null, btns = null, next = null, prev = null, dots = null, sliders = null, activeClass = "", animate, autoplay} = {}) {
            this.container = document.querySelector(container);
            try {
                this.slides = this.container.children;
            } catch (e) {}
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
    class MiniSlider extends Slider {
        constructor(container, next, prev, activeClass, autoplay) {
            super(container, next, prev, activeClass, autoplay);
        }
        nextSlide() {
            if ("BUTTON" == this.slides[1].tagName && "BUTTON" == this.slides[2].tagName) {
                this.container.appendChild(this.slides[0]);
                this.container.appendChild(this.slides[1]);
                this.container.appendChild(this.slides[2]);
            } else this.container.appendChild(this.slides[0]);
        }
        bindTriggers() {
            this.next.addEventListener("click", (() => this.nextSlide()));
            this.prev.addEventListener("click", (() => {
                for (let i = this.slides.length - 1; i > 0; i--) if ("BUTTON" !== this.slides[i].tagName) {
                    let active = this.slides[i];
                    this.container.insertBefore(active, this.slides[0]);
                    break;
                }
            }));
        }
        init() {
            try {
                this.bindTriggers();
                if (this.autoplay) setInterval((() => this.nextSlide()), 5e3);
            } catch (e) {}
        }
    }
    const menuProducts = () => {
        const trigger = document.querySelectorAll("[data-slide]");
        trigger.forEach((btn => {
            btn.addEventListener("click", (e => {
                e.preventDefault();
                btn.classList.toggle("active-class-checked");
            }));
        }));
    };
    const modules_menuProducts = menuProducts;
    window["FLS"] = true;
    window.addEventListener("DOMContentLoaded", (() => {
        modules_tabs(".tabs-info-slider", ".tabs-info-block", ".info-content", "active-class-tabs-green");
        modules_tabs(".tabs-info", ".tabs-form-info", ".content-form", "active-class-checked");
        modules_tabs(".page__container-tabs-content", ".tabs-info", ".content-profile", "active-class-tab-profile", "flex");
        modules_tabs(".title-sliders", ".title-slides", ".block-slide", "active-title-slide");
        modal();
        (new Burger).init();
        new Form("form").init();
        fileread("inputfile", {
            accept: [ ".png", ".jpg", ".jpeg", ".gif" ]
        }, ".photo");
        modules_katalog(".products-wrapper");
        const menuSlider = new MiniSlider({
            container: ".page__container-menu-slider",
            prev: ".page__container-menu .prev__arrow",
            next: ".page__container-menu .next__arrow",
            autoplay: false
        });
        menuSlider.init();
        modules_menuProducts();
    }));
})();