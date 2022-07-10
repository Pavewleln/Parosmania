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
    window["FLS"] = true;
    window.addEventListener("DOMContentLoaded", (() => {
        modules_tabs(".tabs-info-slider", ".tabs-info-block", ".info-content", "active-class-tabs-green");
        modules_tabs(".tabs-info", ".tabs-form-info", ".content-form", "active-class-checked");
        modules_tabs(".page__container-tabs-content", ".tabs-info", ".content-profile", "active-class-tab-profile", "flex");
        modal();
        (new Burger).init();
    }));
})();