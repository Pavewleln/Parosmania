export default class Burger {
    constructor(){
        this.burgerMenu = document.querySelector('.header nav.navbar .navbar-toggler');
        this.orderMenu = document.querySelector('.vacansy');
    }
    init(){
        this.openBurger();
        this.closeBurger();
        this.closeOrder();
    }
    openBurger(){
        this.burgerMenu.addEventListener('click', () =>{
                document.body.style.overflow = "hidden";
        }); 
    }
    closeBurger(){
        this.burgerMenu.addEventListener('click', () =>{
            if(this.burgerMenu.classList.contains('collapsed')){
                document.body.style.overflow = "";
            }
        });    
    }
    closeOrder(){
        this.orderMenu.addEventListener('click', () =>{
            this.closeBurger();
            this.burgerMenu.click();
        });
    }
}