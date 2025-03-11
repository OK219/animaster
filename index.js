addListeners();

let heartBeat;
function addListeners() {
    document.getElementById('fadeInPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            animaster().fadeIn(block, 5000);
        });

    document.getElementById('fadeInReset')
    .addEventListener('click', function () {
        const block = document.getElementById('fadeInBlock');
        animaster().fadeInReset(block);
    });

    document.getElementById('movePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            animaster().move(block, 1000, {x: 100, y: 10});
        });

    document.getElementById('moveReset')
    .addEventListener('click', function () {
        const block = document.getElementById('moveBlock');
        animaster().moveReset(block);
    });

    document.getElementById('scalePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
            animaster().scale(block, 1000, 1.25);
        });

    document.getElementById('scaleReset')
    .addEventListener('click', function () {
        const block = document.getElementById('scaleBlock');
        animaster().scaleReset(block);
    });
    
    document.getElementById('fadeOutPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            animaster().fadeOut(block, 5000);
        });
    document.getElementById('fadeOutReset')
    .addEventListener('click', function () {
        const block = document.getElementById('fadeOutBlock');
        animaster().fadeOutReset(block);
    });

    document.getElementById('moveAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            animaster().moveAndHide(block, 5000);
        });

    document.getElementById('moveAndHideReset')
    .addEventListener('click', function () {
        const block = document.getElementById('moveAndHideBlock');
        animaster().moveAndHideReset(block);
    });

    document.getElementById('showAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('showAndHideBlock');
            animaster().showAndHide(block, 5000);
        });

    document.getElementById('heartBeatingPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('heartBeatingBlock');
            heartBeat = animaster().heartBeating(block)
        });
    document.getElementById('heartBeatingStop')
    .addEventListener('click', function () {
        const block = document.getElementById('heartBeatingBlock');
        heartBeat.stop();
    });
}

/**
 * Блок плавно появляется из прозрачного.
 * @param element — HTMLElement, который надо анимировать
 * @param duration — Продолжительность анимации в миллисекундах
 */


/**
 * Функция, передвигающая элемент
 * @param element — HTMLElement, который надо анимировать
 * @param duration — Продолжительность анимации в миллисекундах
 * @param translation — объект с полями x и y, обозначающими смещение блока
 */


/**
 * Функция, увеличивающая/уменьшающая элемент
 * @param element — HTMLElement, который надо анимировать
 * @param duration — Продолжительность анимации в миллисекундах
 * @param ratio — во сколько раз увеличить/уменьшить. Чтобы уменьшить, нужно передать значение меньше 1
 */


function getTransform(translation, ratio) {
    const result = [];
    if (translation) {
        result.push(`translate(${translation.x}px,${translation.y}px)`);
    }
    if (ratio) {
        result.push(`scale(${ratio})`);
    }
    return result.join(' ');
}

function animaster() {
    return {
        move: function move(element, duration, translation) {
            element.style.transitionDuration = `${duration}ms`;
            element.style.transform = getTransform(translation, null);
        },

        moveReset: function(element) {
            element.style.transitionDuration = null;
            element.style.transform = null;
        },

        scale: function scale(element, duration, ratio) {
            element.style.transitionDuration = `${duration}ms`;
            element.style.transform = getTransform(null, ratio);
        },

        scaleReset: function(element) {
            element.style.transitionDuration = null;
            element.style.transform = null;
        },

        fadeIn: function fadeIn(element, duration) {
            element.style.transitionDuration = `${duration}ms`;
            element.classList.remove('hide');
            element.classList.add('show');
        },

        fadeInReset: function(element) {
            element.style.transitionDuration = null;
            element.classList.add('hide');
            element.classList.remove('show');
        },

        fadeOut: function fadeOut(element, duration) {
            element.style.transitionDuration = `${duration}ms`;
            element.classList.remove('show');
            element.classList.add('hide');
        },

        fadeOutReset: function fadeOut(element) {
            element.style.transitionDuration = null;
            element.classList.add('show');
            element.classList.remove('hide');
        },

        moveAndHide: function moveAndHide(element, duration) {
            this.move(element, duration * 2/5, {x: 100, y: 20});
            setTimeout(() => {
                this.fadeOut(element, duration * 3/5);
            }, duration * 2/5);
        },

        moveAndHideReset: function moveAndHide(element, duration) {
            this.move(element, 0, {x: 0, y: 0});
            this.fadeIn(element, 0);
        },

        showAndHide: function showAndHide(element, duration) {
            this.fadeIn(element, duration * 1/3);
            setTimeout(() => {
                this.fadeOut(element, duration * 1/3);
            }, duration * 2/3);
        },
        

        heartBeating: function heartBeating(element) {
            const interval = setInterval(() => {
                this.scale(element, 500, 1.4);
                setTimeout(() => {
                    this.scale(element, 500, 1);
                }, 500);
            }, 1000); 
            return {
                stop: () => {
                    clearInterval(interval); 
                }
            };
        }
    }
}