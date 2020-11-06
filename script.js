let items = document.querySelectorAll('.item');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
    currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
    isEnabled = false;
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('active', direction)
    })
}

function showItem(direction) {

    items[currentItem].classList.add('next', direction);
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('next', direction)
        this.classList.add('active')
        isEnabled = true
    })

}

function previousItem(n) {
    hideItem('to-right')
    changeCurrentItem(n - 1)
    showItem('from-left')
}

document.querySelector('.control.left').addEventListener('click', function() {
    if (isEnabled) {
        previousItem(currentItem)
    }
})

function nextItem(n) {
    hideItem('to-left')
    changeCurrentItem(n + 1)
    showItem('from-right')
}

document.querySelector('.control.right').addEventListener('click', function() {
    if (isEnabled) {
        nextItem(currentItem)
    }
})

const swipedetect = (el) => {
    let surface = el;
    let startX = 0;
    let startY = 0;
    let distX = 0;
    let distY = 0;

    let startTime = 0;
    let elapsedTime = 0;

    let threshold = 150;
    let restraint = 100;
    let allowedTime = 300;

    surface.addEventListener('mousedown', function(e) {
        startX = e.pageX;
        startY = e.pageY;
        startTime = new Date().getTime();
        e.preventDefault();
    });

    surface.addEventListener('mouseup', function(e) {
        distX = e.pageX - startX;
        distY = e.pageY - startY;
        elapsedTime = new Date().getTime() - startTime;

        if (elapsedTime <= allowedTime) {
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                if (distX > 0) {
                    if (isEnabled) {
                        previousItem(currentItem);
                    }
                } else {
                    if (isEnabled) {
                        nextItem(currentItem);
                    }
                }
            }
        }
        e.preventDefault();
    });
}

const touchdetect = (el) => {
    let surface = el;
    let startX = 0;
    let startY = 0;
    let distX = 0;
    let distY = 0;

    let startTime = 0;
    let elapsedTime = 0;

    let threshold = 150;
    let restraint = 100;
    let allowedTime = 300;

    surface.addEventListener('touchstart', function(e) {
        console.log(e);
        startX = e.changedTouches[0].pageX;
        startY = e.changedTouches[0].pageY;
        startTime = new Date().getTime();
        e.preventDefault();
    });

    surface.addEventListener('touchmove', function(e) {
        e.preventDefault();
    });


    surface.addEventListener('touchend', function(e) {
        distX = e.changedTouches[0].pageX - startX;
        distY = e.changedTouches[0].pageY - startY;
        elapsedTime = new Date().getTime() - startTime;

        if (elapsedTime <= allowedTime) {
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                if (distX > 0) {
                    if (isEnabled) {
                        previousItem(currentItem);
                    }
                } else {
                    if (isEnabled) {
                        nextItem(currentItem);
                    }
                }
            }
        }

        e.preventDefault();
    });
}

let el = document.querySelector('.carousel');
swipedetect(el);
touchdetect(el);