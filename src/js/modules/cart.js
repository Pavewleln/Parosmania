

// Отслеживаем клик на странице
window.addEventListener('click', function (event) {
    // Div внутри корзины, в который мы добавляем товары
        const cartWrapper =  document.querySelector('.product-slider');
	// Проверяем что клик был совершен по кнопке "Добавить в корзину"
	if (event.target.hasAttribute('data-cart')) {
        event.preventDefault(); 
		// Находим карточку с товаром, внутри котрой был совершен клик
		const card = event.target.closest('.product');

		// Собираем данные с этого товара и записываем их в единый объект productInfo
		const productInfo = {
			id: card.dataset.id,
			imgSrc: card.querySelector('[product-image]').getAttribute('src'),
			title: card.querySelector('.product-title').innerText,
			price: card.querySelector('.price-products').innerText,
			counter: card.querySelector('[data-counter]').innerText,
		};

		// Проверять если ли уже такой товар в корзине
		// const itemInCart = cartWrapper.querySelectorAll(`[data-id="${productInfo.id}"]`);

		// Если товар есть в корзине
		// if (itemInCart) {
		// 	const counterElement = itemInCart.querySelector('[data-counter]');
		// 	counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);
		// } else {
			// Если товара нет в корзине

			// Собранные данные подставим в шаблон для товара в корзине
			const cartItemHTML = `
            <div class="product-slider-block" data-id="${productInfo.id}">
                <a href=""><img src="img/secondary-icons/cross-close.svg" alt=""></a>
                <div class="photo-product">
                    <img src="${productInfo.imgSrc}" alt="">
                </div>
                <span class="name-product">${productInfo.title}</span>
                <div class="price-kol">
                    <div class="price-kol__prev btn-kol" data-action="minus">
                        -
                    </div>
                    <span data-counter>${productInfo.counter}</span>
                    <div class="price-kol__next btn-kol" data-action="plus">
                        +
                    </div>
                </div>
                <div class="price">
                    <span>${productInfo.price}</span>
                </div>
            </div>`

			// Отобразим товар в корзине
			try{cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);}catch(e){}
		// }

		// Сбрасываем счетчик добавленного товара на "1"
		card.querySelector('[data-counter]').innerText = '1';

		// Отображение статуса корзины Пустая / Полная
		// toggleCartStatus();

		// Пересчет общей стоимости товаров в корзине
		// calcCartPriceAndDelivery();
	}
});
