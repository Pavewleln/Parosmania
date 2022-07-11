const readImage =(selector, options = {}, block) =>{
    const input = document.getElementById(selector);
    const blockimg = document.querySelector(block);
    input.addEventListener('change', (event) =>{
        console.log(event.target.files);
        if(!event.target.files.length){
            return
        }
        const files =Array.from(event.target.files);

        files.forEach(file =>{
            console.log(file);
            if(!file.type.match('image')){
                return
            }
            const reader = new FileReader();

            reader.onload = ev =>{
                console.log(ev.target.result);
                blockimg.insertAdjacentHTML('afterbegin', `<img src="${ev.target.result}" />`)
            };
            reader.readAsDataURL(file);
        });
    });

    if(options.accept && Array.isArray(options.accept)){
        input.setAttribute('accept', options.accept.join(','));
    }       
};
export default readImage;