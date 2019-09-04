let url_btns = document.getElementsByClassName('url-btn');

for (let item of url_btns) {
    on_hover(item, btn_link_hover);
    item.addEventListener('click', copy_url);
}

function copy_url(e){
    let target = e.target;
    let input = e.target.parentElement.querySelector('input[type=text]');

    copyTextToClipboard(input.value);
    input.select();
}

function on_hover(element, func) {
    element.addEventListener('mouseover', func);
    element.addEventListener('mouseout', func);
}

function btn_link_hover(e) {
    let target = e.target;
    let input = e.target.parentElement.querySelector('input[type=text]');
    if (input.classList.contains('focus')) {
        input.classList.remove('focus');
    } else {
        input.classList.add('focus');
    }

}

function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function () {
        console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}
