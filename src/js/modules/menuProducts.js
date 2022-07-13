const menuProducts = () =>{
    const trigger = document.querySelectorAll('[data-slide]');

    trigger.forEach(btn =>{
        btn.addEventListener('click', (e)=>{
            e.preventDefault();
            btn.classList.toggle('active-class-checked');
        });
        
    });
};
export default menuProducts;