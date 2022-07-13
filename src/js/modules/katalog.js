const katalog = (container) =>{
    const productsContainer = document.querySelector(container);
    let items = document.querySelectorAll('.pagination li');
    let notesOnPage = 8;

    getProducts();

    async function getProducts(){
        const response = await fetch('./products.json');

        const productArray = await response.json(); 
        renderProducts(productArray);
        console.log(productArray);
    }

    
    function renderProducts(productArray){
        productsContainer.innerHTML = '';
        for(let item of items){
            item.addEventListener('click', function(e) {
                e.preventDefault();
                let pageNum = +this.innerHTML;
    
                let start = (pageNum - 1) * notesOnPage;
                let end = start + notesOnPage;
    
                let notes = productArray.slice(start, end);
                console.log(notes);
                productArray.forEach(item =>{
                    const productHTML = `
                    <div class="product" data-id="${item.id}">
                        <div class="product-img">
                            <img src="${item.imgSrc}" alt="">
                        </div>
                        <a href="./description.html" class="product-title">
                            ${item.title}
                        </a>
                        <div class="product-description">
                            ${item.description}
                        </div>
                        <div class="product-rating">
                            ${item.rating}
                        </div>
                        <div class="product-price">
                            <b><span>${item.price}</span>₽/кг</b> <span>За 500гр.</span>
                        </div>
                        <a href="" class="product-to-basket">В корзину</a>
                    </div>
                    `;
                    
                    productsContainer.insertAdjacentHTML('beforeend', productHTML);
                   
                });
                
            });
        }
    }
};
   
export default katalog;