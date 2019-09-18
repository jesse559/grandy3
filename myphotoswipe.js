// Post Views
let postDisplayDivs = document.querySelectorAll('.post-img-display');
for (let i = 0; i < postDisplayDivs.length; i++) {
    postDisplayDivs[i].addEventListener('click', postDisplayClick);
}

function getViewportSize() {
    let win = window,
        doc = document,
        docElem = doc.documentElement,
        body = doc.getElementsByTagName('body')[0],
        _x = win.innerWidth || docElem.clientWidth || body.clientWidth,
        _y = win.innerHeight|| docElem.clientHeight|| body.clientHeight;

    return { x: _x, y: _y};
}

function setImageSize(items) {
    let size = getViewportSize();
    let width = Math.floor(size.x * (80/100));
    let height = Math.floor(size.y * (80/100));

    items.forEach((item, i) => {
        if (!item._vertical) {
            items[i].w = width;
        } else {
            items[i].w = Math.floor(size.x * 25/100);
        }

        items[i].h = height;
    });
}

function getPostImage(postDiv) {
    let el = postDiv;
    while (el = el.firstElementChild) {
        if (el.nodeName == 'IMG') {
            return el;
        }
    }

    return null;
}

function postDisplayClick(e) {
    let target = e.target;
    let postImgDisplay;

    let clickedImage = getPostImage(target);

    // get div.post-img-display
    let tmp = target;
    while (tmp) {
        if (tmp.classList.contains('post-img-display')) {
            postImgDisplay = tmp;
            break;
        }

        tmp = tmp.parentElement;
    }

    let imgDivs = postImgDisplay.querySelectorAll('img');
    let links = [];

    for (let i = 0; i < imgDivs.length; i++) {
        links.push(imgDivs[i].src);
    }

    let items = [];

    links.forEach(element => {
        let item = {
            src: element
        }

        items.push(item);
    });

    let pswp = document.querySelector('.pswp');

    setImageSize(items);

    let index = 0;
    items.forEach((item, i) => {
        if (item.src == clickedImage.src) {
            index = i;
        }
    });

    let options = {
        index: index,
        closeOnScroll: false,
    };

    let gallery = new PhotoSwipe(pswp, PhotoSwipeUI_Default, items, options);
    gallery.init();

}