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
        /*
        if (!item._vertical) {
            items[i].w = width;
        } else {
            items[i].w = Math.floor(size.x * 25/100);
        }

        items[i].h = height;
        */
       items[i].w = 1920;
       items[i].h = 1080;
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

    links.push("https://images.wallpaperscraft.com/image/spikelets_dark_glare_148432_3840x2160.jpg");
    links.push("https://images.wallpaperscraft.com/image/town_coast_aerial_view_148434_3840x2160.jpg");
    links.push("https://images.wallpaperscraft.com/image/mountains_peaks_fog_148414_3840x2160.jpg");
    links.push("https://images.wallpaperscraft.com/image/hand_light_bright_148410_3840x2160.jpg");

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
        bgOpacity: 0.8,
        getThumbBoundsFn: function(index) {

            // find thumbnail element
            var thumbnail = document.querySelectorAll('.post-img-display img')[index];
            console.log(thumbnail);
        
            // get window scroll Y
            var pageYScroll = window.pageYOffset || document.documentElement.scrollTop; 
            // optionally get horizontal scroll
        
            // get position of element relative to viewport
            var rect = thumbnail.getBoundingClientRect(); 
        
            // w = width
            return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
        
        
            // Good guide on how to get element coordinates:
            // http://javascript.info/tutorial/coordinates
        }
    };

    let gallery = new PhotoSwipe(pswp, PhotoSwipeUI_Default, items, options);
    gallery.listen('shareLinkClick', function(e, target) {
        if (target.innerHTML === 'Download image') {
        }
        console.log(e);
        console.log(target);
        e.prevetDefault();
    });
    gallery.init();

}