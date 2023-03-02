import { prefix } from './utils';
var HighlightElement = (function () {
    function HighlightElement(app) {
        this.app = app;
        this.app = app;
        this.el = null;
    }
    HighlightElement.prototype.show = function (step) {
        if (!this.el) {
            this.createEl();
        }
        var left = 0, top = 0, width = 0, height = 0;
        if (step.element) {
            var rect = step.element.getBoundingClientRect();
            var padding = this.app.options.padding;
            left = rect.left + window.pageXOffset - padding;
            top = rect.top + window.pageYOffset - padding;
            width = rect.width + padding * 2;
            height = rect.height + padding * 2;
        }
        else {
            left = window.innerWidth / 2 + window.pageXOffset;
            top = window.innerHeight / 2 + window.pageYOffset;
            width = 0;
            height = 0;
        }
        this.el.style.left = left + 'px';
        this.el.style.top = top + 'px';
        this.el.style.width = width + 'px';
        this.el.style.height = height + 'px';
    };
    HighlightElement.prototype.createEl = function () {
        var _a = this.app.options, boxShadowColor = _a.boxShadowColor, transition = _a.transition, borderRadius = _a.borderRadius, highlightElClass = _a.highlightElClass, zIndex = _a.zIndex;
        this.el = document.createElement('div');
        this.el.className = prefix + 'highlight-el';
        this.el.style.cssText = "\n        box-shadow: 0 0 0 5000px ".concat(boxShadowColor, ";\n        border-radius: ").concat(borderRadius, ";\n        transition: ").concat(transition, ";\n        z-index: ").concat(zIndex, ";\n    ");
        if (highlightElClass) {
            this.el.classList.add(highlightElClass);
        }
        document.body.appendChild(this.el);
    };
    HighlightElement.prototype.removeEl = function () {
        if (this.el) {
            document.body.removeChild(this.el);
            this.el = null;
        }
    };
    return HighlightElement;
}());
export default HighlightElement;
