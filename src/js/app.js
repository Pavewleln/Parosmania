// ========================================================================================================================================================================================================================================================
/* Подключаем файлы со своим кодом */
window['FLS'] = true;
import "../scss/style.scss";
import tabs from "./modules/tabs.js";
import modals from './modules/modal.js';
import Burger from './modules/menu-burger.js';

//============================================================================================================================================================================================================================================

window.addEventListener('DOMContentLoaded', () =>{
    tabs('.tabs-info-slider', '.tabs-info-block', '.info-content', 'active-class-tabs-green' );
    tabs('.tabs-info', '.tabs-form-info', '.content-form', 'active-class-checked');
    tabs('.page__container-tabs-content', '.tabs-info', '.content-profile', 'active-class-tab-profile', 'flex');
    modals();
    new Burger().init();
});






































































































