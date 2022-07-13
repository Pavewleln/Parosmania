const pagination = () =>{

    let table = document.querySelector('.products-wrapper');
    let items = document.querySelectorAll('.pagination li');

    let notesOnPage = 3;
    console.log(productArray);
    for(let item of items){
        item.addEventListener('click', function() {
            let pageNum = +this.innerHTML;

            let start = (pageNum - 1) * notesOnPage;
            let end = start + notesOnPage;

            let notes = productArray.slice(start, end);
            console.log(notes);

            for(let note of notes){
                let products = document.createElement('tr');
                table.appendChild(tr);

                let td;
            }
        });
    }
};

export default pagination;