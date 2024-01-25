window.addEventListener('DOMContentLoaded', () => {
    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade')
        })

        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active')
        })
    }

    function showTabContent(i = 0) { // значение по умолчанию, если в функцию ничего не передается
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active')
    }

    hideTabContent();
    showTabContent(0);

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((tab, i) => {
                if (target == tab) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    })

    // Timer 
    const deadline = '2024-05-11';

    function getTimeRemaining(end) {
        let days , hours, minutes, seconds;
        const t = Date.parse(end) - Date.parse(new Date());
    
        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0; 
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor((t / (1000 * 60 * 60)) %  24);
            minutes = Math.floor((t / 1000 / 60) % 60); 
            seconds = Math.floor((t / 1000) % 60); 
        }

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function getZiro(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');
        timeInterval = setInterval(updateClock, 1000);

        updateClock()

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.textContent = getZiro(t.days);
            hours.textContent = getZiro(t.hours);
            minutes.textContent = getZiro(t.minutes);
            seconds.textContent = getZiro(t.seconds);

            if(t.total  <= 0) {
                clearInterval(timeInterval)
            }
        }
    }

    setClock('.timer', deadline )

    // Modal 

    const modalOpenBtns = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');
    const modalCloseBtn = document.querySelector('.modal__close')

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
    
        //отмена скролла страницы во время открытого модального окна
        document.body.style.overflow = 'hidden'

        clearInterval(modalTimer)
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show', 'fade')

        //возвращение скролла страницы во время открытого модального окна
        document.body.style.overflow = ''
    }

    modalOpenBtns.forEach((btn) => {
        btn.addEventListener('click',  openModal) 
    }) 

    modalCloseBtn.addEventListener('click', () => {
        closeModal()
    })

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
           closeModal()
        }
    })

    document.addEventListener('keydown', (e) => {
        e.preventDefault();
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    })


    const modalTimer = setTimeout(openModal, 3000)

    function showModalByScroll() {
                                   //видимая часть клиенту на момент скролла
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal()
            window.removeEventListener('scroll', showModalByScroll)
        }
    }

    window.addEventListener('scroll', showModalByScroll )


    class MenuCard {
        constructor(picture, alt, title, description, price, parentSelector, ...classes ) {
            this.picture = picture;
            this.alt = alt; 
            this.title = title;
            this.description = description;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.transfer = 3;
            this.changeToBLR();
        }

        changeToBLR() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item'
                element.classList.add(element)
            } else {
                this.classes.forEach(className =>  element.classList.add(className));
            }
            element.innerHTML = `
                <img src=${this.picture} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    } 

    new MenuCard(
        "img/tabs/vegy.jpg",
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        90,
        '.menu .container',
        'menu__item'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        'elite',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        170,
        '.menu .container',
        'menu__item'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        'post',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        120,
        '.menu .container',
        'menu__item'
    ).render();

});