export default class Form {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
        this.btn = document.querySelector('button');
        this.inputs = document.querySelectorAll('input');
        this.textareas = document.querySelectorAll('textarea');
        this.message = {
            loading: 'Загрузка...',
            success: 'Спасибо! Скоро мы с вами свяжемся!',
            failure: 'Что-то пошло не так...',
            input: 'Вы вошли',
            registration: 'Вы Зарегистрировались',
            booking: 'Вы забронировали',
            reviews: 'Спасибо, что оставили отзыв',
            recovery: 'Пароль восстановлен',
            cheack: 'Отлично! Телефон проверен',
            subscribe: 'Спасибо! вы будете получать уведомления',
            person: 'Информация изменена',
        };
        this.path = '../../server.php';
    }


    clearInputs() {
        this.inputs.forEach(item => {
            item.value = '';
        });
    }
    clearTextareas() {
        this.textareas.forEach(item => {
            item.value = '';
        });
    }

    checkMailInputs(){
        const mailInputs = document.querySelectorAll('[type="email"]');
    
        mailInputs.forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
                    e.preventDefault();
                }
            });
        });

        const nameInputs = document.querySelectorAll('[type="name"]');

        nameInputs.forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key.match(/[^а-яё]/ig)) {
                    e.preventDefault();
                }
            });
        });
    }

    initMask() {

        let setCursorPosition = (pos, elem) => {
            elem.focus();
            
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();

                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };

        function createMask(event) {
            let matrix = '+380 (__) __-__',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');

            if (def.length >= val.length) {
                val = def;
            }

            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });

            if (event.type === 'blur') {
                if (this.value.length == 2) {
                    this.value = '';
                }
            } else {
                setCursorPosition(this.value.length, this);
            }
        }

        let inputs = document.querySelectorAll('[type="phone"]');

        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        });
    }

    async postData(url, data) {
        let res = await fetch(url, {
            method: "POST",
            body: data
        });
    
        return await res.text();
    }

    init() {
        this.checkMailInputs();
        this.initMask();
        this.btn.disabled = false;

        this.forms.forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();

                let statusMessage = document.createElement('div');
                statusMessage.classList.add('statusMessages');
                item.parentNode.appendChild(statusMessage);

                statusMessage.textContent = this.message.loading;

                const formData = new FormData(item);

                this.postData(this.path, formData)
                    .then(res => {
                        console.log(res);
                        switch(true){
                            case item.classList.contains('entrance'):
                                statusMessage.textContent = this.message.input;
                                break;
                            case item.classList.contains('registr'):
                                statusMessage.textContent = this.message.registration;
                                break;
                            case item.classList.contains('subscribe'):
                                statusMessage.textContent = this.message.subscribe;
                                break;
                            case item.classList.contains('cheackPhone'):
                                statusMessage.textContent = this.message.cheack;
                                break;
                            case item.classList.contains('recovering'):
                                statusMessage.textContent = this.message.recovery;
                                break;
                            case item.classList.contains('reviews'):
                                statusMessage.textContent = this.message.reviews;
                                break;
                            case item.classList.contains('bookings'):
                                statusMessage.textContent = this.message.booking;
                                break;
                            case item.classList.contains('page__container-content-person'):
                                statusMessage.textContent = this.message.person;
                                break;
                            default:
                                statusMessage.textContent = this.message.success;
                                break;
                        }
                    })
                    .catch(() => {
                        statusMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        this.clearInputs();
                        this.clearTextareas();
                        this.btn.disabled = true;
                        setTimeout(() => {
                            statusMessage.remove();
                            this.btn.disabled = false;
                        }, 5000);
                    });
            });
        });
    }
}