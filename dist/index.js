var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import HighlightElement from './src/HighlightElement';
import InfoElement from './src/InfoElement';
import { scrollAncestorToElement, elementIsInView } from './src/utils';
import { addCss, removeCss } from './src/css';
import EventEmitter from 'eventemitter3';
var defaultOptions = {
    padding: 10,
    margin: 10,
    boxShadowColor: 'rgba(0, 0, 0, 0.5)',
    transition: 'all 0.3s ease-out',
    borderRadius: '5px',
    highlightElClass: '',
    backgroundColor: '#fff',
    infoElClass: '',
    prevText: '上一步',
    nextText: '下一步',
    completeText: '完成',
    showIndicator: true,
    zIndex: 9999,
    useCustomInfo: false,
    getCustomInfoEl: null,
    steps: []
};
var NoviceGuide = (function (_super) {
    __extends(NoviceGuide, _super);
    function NoviceGuide(options) {
        var _this = _super.call(this) || this;
        _this.options = options;
        _this.options = Object.assign(defaultOptions, options);
        _this.steps = [];
        _this.currentStepIndex = -1;
        _this.highlightElement = new HighlightElement(_this);
        _this.infoElement = new InfoElement(_this);
        _this.initSteps();
        return _this;
    }
    NoviceGuide.prototype.initSteps = function () {
        var _this = this;
        this.options.steps.forEach(function (step) {
            _this.steps.push(__assign(__assign({}, step), { element: typeof step.element === 'string'
                    ? document.querySelector(step.element)
                    : step.element }));
        });
    };
    NoviceGuide.prototype.start = function () {
        if (this.steps.length <= 0)
            return;
        if (!this.addedCss) {
            addCss();
            this.addedCss = true;
        }
        this.next();
    };
    NoviceGuide.prototype.next = function () {
        this.emit('before-step-change', this.currentStepIndex);
        if (this.currentStepIndex + 1 >= this.steps.length) {
            return this.done();
        }
        this.currentStepIndex++;
        this.to(this.currentStepIndex);
    };
    NoviceGuide.prototype.prev = function () {
        this.emit('before-step-change', this.currentStepIndex);
        if (this.currentStepIndex - 1 < 0) {
            return;
        }
        this.currentStepIndex--;
        this.to(this.currentStepIndex);
    };
    NoviceGuide.prototype.jump = function (stepIndex) {
        this.currentStepIndex = stepIndex;
        this.to(stepIndex);
    };
    NoviceGuide.prototype.to = function (stepIndex) {
        return __awaiter(this, void 0, void 0, function () {
            var currentStep, rect, windowHeight;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentStep = this.steps[stepIndex];
                        if (currentStep.element) {
                            scrollAncestorToElement(currentStep.element);
                            rect = currentStep.element.getBoundingClientRect();
                            windowHeight = window.innerHeight;
                            if (!elementIsInView(currentStep.element)) {
                                window.scrollBy(0, rect.top - (windowHeight - rect.height) / 2);
                            }
                        }
                        this.highlightElement.show(currentStep);
                        return [4, this.infoElement.show(currentStep)];
                    case 1:
                        _a.sent();
                        this.emit('after-step-change', stepIndex);
                        return [2];
                }
            });
        });
    };
    NoviceGuide.prototype.done = function () {
        this.emit('before-step-change', this.currentStepIndex);
        this.highlightElement.removeEl();
        this.infoElement.removeEl();
        removeCss();
        this.addedCss = false;
        this.currentStepIndex = -1;
        this.emit('after-step-change', this.currentStepIndex);
        this.emit('done');
    };
    NoviceGuide.prototype.isFirstStep = function () {
        return this.currentStepIndex <= 0;
    };
    NoviceGuide.prototype.isLastStep = function () {
        return this.currentStepIndex >= this.steps.length - 1;
    };
    return NoviceGuide;
}(EventEmitter));
export default NoviceGuide;
