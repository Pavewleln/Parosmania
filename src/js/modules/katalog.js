    const productsContainer = document.querySelector('.products-wrapper');

    getProducts();

    async function getProducts(){
        const response = await fetch('../server/products.json');

        const productArray = await response.json(); 
        renderProducts(productArray);
        console.log(productArray);
    }

    function renderProducts(productArray){
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
                    <div class='rating-result'>
                        <span class='active'></span>	
                        <span class='active'></span>    
                        <span class='active'></span>  
                        <span></span>    
                        <span></span>
                    </div>
                </div>
                <div class="product-price">
                    <b><span>${item.price}</span>₽/кг</b> <span>За 500гр.</span>
                </div>
                <a href="" class="product-to-basket">В корзину</a>
            </div>
            `;
            productsContainer.insertAdjacentHTML('beforeend', productHTML);
        });
    }