export var prefix = 'simple-novice-guide-';
export var getScrollAncestor = function (el) {
    var style = window.getComputedStyle(el);
    var isAbsolute = style.position === 'absolute';
    var isFixed = style.position === 'fixed';
    var reg = /(auto|scroll)/;
    if (isFixed)
        return document.body;
    var parent = el.parentElement;
    while (parent) {
        style = window.getComputedStyle(parent);
        if (!(isAbsolute && style.position === 'static')) {
            if (reg.test(style.overflow + style.overflowX + style.overflowY)) {
                return parent;
            }
        }
        parent = parent.parentElement;
    }
    return document.body;
};
export var scrollAncestorToElement = function (el) {
    var parent = getScrollAncestor(el);
    if (parent === document.body)
        return;
    var parentRect = parent.getBoundingClientRect();
    var rect = el.getBoundingClientRect();
    parent.scrollTop = parent.scrollTop + rect.top - parentRect.top;
    scrollAncestorToElement(parent);
};
export var elementIsInView = function (el) {
    var rect = el.getBoundingClientRect();
    return (rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth);
};
export var loadImage = function (img) {
    return new Promise(function (resolve, reject) {
        var image = new Image();
        image.onload = resolve;
        image.onerror = reject;
        image.src = img;
    });
};
