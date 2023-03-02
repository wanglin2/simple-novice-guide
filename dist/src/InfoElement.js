var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { loadImage, prefix } from './utils';
var HighlightElement = (function () {
    function HighlightElement(app) {
        this.app = app;
        this.app = app;
        this.el = null;
        this.app.on('after-step-change', this.onStepChange.bind(this));
    }
    HighlightElement.prototype.show = function (step) {
        return __awaiter(this, void 0, void 0, function () {
            var el, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.app.options.useCustomInfo && this.app.options.getCustomInfoEl)) return [3, 2];
                        return [4, this.app.options.getCustomInfoEl(step)];
                    case 1:
                        el = _a.sent();
                        res = this.getInfoRect(step, el);
                        el.style.left = res.left + 'px';
                        el.style.top = res.top + 'px';
                        return [3, 4];
                    case 2: return [4, this.showInnerInfo(step)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    HighlightElement.prototype.showInnerInfo = function (step) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.el) {
                            this.createEl();
                        }
                        if (!step.img) return [3, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, loadImage(step.img)];
                    case 2:
                        _a.sent();
                        return [3, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3, 4];
                    case 4:
                        this.el.innerHTML = this.createHTML(step);
                        res = this.getInfoRect(step, this.el);
                        this.el.style.left = res.left + 'px';
                        this.el.style.top = res.top + 'px';
                        return [2];
                }
            });
        });
    };
    HighlightElement.prototype.getInfoRect = function (step, el) {
        if (step.element) {
            return this.computeInfoPosition(step, el);
        }
        else {
            var rect = el.getBoundingClientRect();
            return {
                left: (window.innerWidth - rect.width) / 2 + window.pageXOffset,
                top: (window.innerHeight - rect.height) / 2 + window.pageYOffset
            };
        }
    };
    HighlightElement.prototype.createHTML = function (step) {
        var _this = this;
        var _a = this.app.options, prevText = _a.prevText, nextText = _a.nextText, showIndicator = _a.showIndicator;
        return "\n    <div class=\"".concat(prefix, "info-el-header\">\n      <div class=\"").concat(prefix, "info-el-title\">").concat(step.title || '', "</div>\n      <div class=\"").concat(prefix, "info-el-close\" data-type=\"close\">\u00D7</div>\n    </div>\n    <div class=\"").concat(prefix, "info-el-info\">\n      ").concat(step.img
            ? "<img class=\"".concat(prefix, "info-el-info-img\" src=\"").concat(step.img, "\" />")
            : '', "\n      <div class=\"").concat(prefix, "info-el-info-text\">").concat(step.text || '', "</div>\n    </div>\n    <div class=\"").concat(prefix, "info-el-indicator\">\n      ").concat(showIndicator
            ? this.app.steps
                .map(function (_, index) {
                return "<div class=\"".concat(prefix, "info-el-indicator-item ").concat(index === _this.app.currentStepIndex ? 'active' : '', "\" data-type=\"indicator\" data-index=\"").concat(index, "\"></div>");
            })
                .join('\n')
            : '', "\n    </div>\n    <div class=\"").concat(prefix, "info-el-btn-group\">\n      <div class=\"").concat(prefix, "info-el-btn ").concat(prefix, "info-el-btn-prev ").concat(this.app.isFirstStep() ? 'disabled' : '', "\" data-type=\"prev\">").concat(prevText, "</div>\n      <div class=\"").concat(prefix, "info-el-btn ").concat(prefix, "info-el-btn-next\" data-type=\"next\">").concat(nextText, "</div>\n    </div>\n  ");
    };
    HighlightElement.prototype.createEl = function () {
        var _a = this.app.options, padding = _a.padding, borderRadius = _a.borderRadius, backgroundColor = _a.backgroundColor, infoElClass = _a.infoElClass, zIndex = _a.zIndex;
        this.el = document.createElement('div');
        this.el.className = prefix + 'info-el';
        this.el.style.cssText = "\n      background-color: ".concat(backgroundColor, "; \n      padding: ").concat(padding, "px;\n      border-radius: ").concat(borderRadius, ";\n      z-index: ").concat(zIndex, ";\n    ");
        if (infoElClass) {
            this.el.classList.add(infoElClass);
        }
        document.body.appendChild(this.el);
        this.el.addEventListener('click', this.onClick.bind(this));
    };
    HighlightElement.prototype.onClick = function (e) {
        var type = e.target.getAttribute('data-type');
        switch (type) {
            case 'close':
                this.app.done();
                break;
            case 'prev':
                this.app.prev();
                break;
            case 'next':
                this.app.next();
                break;
            case 'indicator':
                var index = e.target.getAttribute('data-index');
                if (!Number.isNaN(Number(index))) {
                    this.app.jump(Number(index));
                }
                break;
            default:
                break;
        }
    };
    HighlightElement.prototype.removeEl = function () {
        if (this.el) {
            document.body.removeChild(this.el);
            this.el = null;
        }
    };
    HighlightElement.prototype.onStepChange = function (stepIndex) {
        var _a = this.app.options, nextText = _a.nextText, completeText = _a.completeText, useCustomInfo = _a.useCustomInfo;
        if (useCustomInfo)
            return;
        var prevEl = document.querySelector(".".concat(prefix, "info-el-btn-prev"));
        var nextEl = document.querySelector(".".concat(prefix, "info-el-btn-next"));
        prevEl.classList.remove('disabled');
        nextEl.textContent = nextText;
        if (this.app.isFirstStep()) {
            prevEl.classList.add('disabled');
        }
        if (this.app.isLastStep()) {
            nextEl.textContent = completeText;
        }
        var indicatorEls = Array.from(document.querySelectorAll(".".concat(prefix, "info-el-indicator-item")));
        indicatorEls.forEach(function (item) {
            if (item.classList.contains('active')) {
                item.classList.remove('active');
            }
        });
        if (indicatorEls[stepIndex]) {
            indicatorEls[stepIndex].classList.add('active');
        }
    };
    HighlightElement.prototype.computeInfoPosition = function (step, el) {
        var _a = this.app.options, padding = _a.padding, margin = _a.margin;
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var windowPageXOffset = window.pageXOffset;
        var windowPageYOffset = window.pageYOffset;
        var rect = step.element.getBoundingClientRect();
        var infoRect = el.getBoundingClientRect();
        var left = 0;
        var top = 0;
        var adjustLeft = function () {
            if (windowWidth - rect.left - padding >= infoRect.width) {
                return rect.left - padding + windowPageXOffset;
            }
            else if (rect.right + padding >= infoRect.width) {
                return rect.right + padding - infoRect.width + windowPageXOffset;
            }
            else {
                return (windowWidth - infoRect.width) / 2 + windowPageXOffset;
            }
        };
        var adjustTop = function () {
            if (windowHeight - rect.top - padding >= infoRect.height) {
                return rect.top - padding + windowPageYOffset;
            }
            else if (rect.bottom + padding >= infoRect.height) {
                return rect.bottom + padding - infoRect.height + windowPageYOffset;
            }
            else {
                return (windowHeight - infoRect.height) / 2 + windowPageYOffset;
            }
        };
        if (rect.bottom + padding + margin + infoRect.height <= windowHeight &&
            infoRect.width <= windowWidth) {
            left = adjustLeft();
            top = rect.bottom + padding + margin + windowPageYOffset;
        }
        else if (rect.top - padding - margin >= infoRect.height &&
            infoRect.width <= windowWidth) {
            left = adjustLeft();
            top = rect.top - padding - margin - infoRect.height + windowPageYOffset;
        }
        else if (rect.left - padding - margin >= infoRect.width &&
            infoRect.height <= windowHeight) {
            left = rect.left - padding - margin - infoRect.width + windowPageXOffset;
            top = adjustTop();
        }
        else if (rect.right + padding + margin + infoRect.width <= windowWidth &&
            infoRect.height <= windowHeight) {
            left = rect.right + padding + margin + windowPageXOffset;
            top = adjustTop();
        }
        else {
            var totalHeightLessThenWindow = rect.height + padding * 2 + margin + infoRect.height <= windowHeight;
            if (totalHeightLessThenWindow &&
                Math.max(rect.width + padding * 2, infoRect.width) <= windowWidth) {
                var newTop = (windowHeight -
                    (rect.height + padding * 2 + margin + infoRect.height)) /
                    2;
                window.scrollBy(0, rect.top - newTop);
            }
            else {
            }
            left = adjustLeft();
            top = rect.bottom + padding + margin + windowPageYOffset;
        }
        return {
            left: left,
            top: top
        };
    };
    return HighlightElement;
}());
export default HighlightElement;
