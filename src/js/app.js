// ========================================================================================================================================================================================================================================================
/* Подключаем файлы со своим кодом */
window['FLS'] = true;
import "../scss/style.scss";
import tabs from "./modules/tabs.js";
import modals from './modules/modal.js';
import Burger from './modules/menu-burger.js';
import Form from './modules/forms.js';
import readImage from './modules/fileread.js';
import katalog from './modules/katalog.js';
import MiniSlider from './modules/sliderMenu.js';
import menuProducts from './modules/menuProducts.js';

//============================================================================================================================================================================================================================================

window.addEventListener('DOMContentLoaded', () =>{
    tabs('.tabs-info-slider', '.tabs-info-block', '.info-content', 'active-class-tabs-green' );
    tabs('.tabs-info', '.tabs-form-info', '.content-form', 'active-class-checked');
    tabs('.page__container-tabs-content', '.tabs-info', '.content-profile', 'active-class-tab-profile', 'flex');
    tabs('.title-sliders', '.title-slides', '.block-slide', 'active-title-slide');
    modals();
    new Burger().init();
    new Form('form').init();
    readImage('inputfile', {accept: ['.png', '.jpg', '.jpeg', '.gif']}, '.photo');
    katalog('.products-wrapper');
    const menuSlider = new MiniSlider({
        container: '.page__container-menu-slider',
        prev: '.page__container-menu .prev__arrow',
        next: '.page__container-menu .next__arrow',
        autoplay: true
    });
    menuSlider.init();
    menuProducts();
});