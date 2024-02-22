(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.SimpleNoviceGuide = factory());
})(this, (function () { 'use strict';

    var prefix = 'simple-novice-guide-';
    var getScrollAncestor = function (el) {
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
    var scrollAncestorToElement = function (el) {
        var parent = getScrollAncestor(el);
        if (parent === document.body)
            return;
        var parentRect = parent.getBoundingClientRect();
        var rect = el.getBoundingClientRect();
        parent.scrollTop = parent.scrollTop + rect.top - parentRect.top;
        scrollAncestorToElement(parent);
    };
    var elementIsInView = function (el) {
        var rect = el.getBoundingClientRect();
        return (rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= window.innerHeight &&
            rect.right <= window.innerWidth);
    };
    var loadImage = function (img) {
        return new Promise(function (resolve, reject) {
            var image = new Image();
            image.onload = resolve;
            image.onerror = reject;
            image.src = img;
        });
    };

    var HighlightElement$1 = (function () {
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

    var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator$1 = (undefined && undefined.__generator) || function (thisArg, body) {
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
    var HighlightElement = (function () {
        function HighlightElement(app) {
            this.app = app;
            this.app = app;
            this.el = null;
            this.app.on('after-step-change', this.onStepChange.bind(this));
        }
        HighlightElement.prototype.show = function (step) {
            return __awaiter$1(this, void 0, void 0, function () {
                var el, res;
                return __generator$1(this, function (_a) {
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
            return __awaiter$1(this, void 0, void 0, function () {
                var error_1, res;
                return __generator$1(this, function (_a) {
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

    var styleEl = null;
    var addCss = function () {
        var cssText = '';
        cssText += "\n        .".concat(prefix, "highlight-el {\n            position: absolute;\n        }\n    ");
        cssText += "\n        .".concat(prefix, "info-el {\n            position: absolute;\n            min-width: 250px;\n            max-width: 300px;\n        }\n\n        .").concat(prefix, "info-el-header {\n            display: flex;\n            align-items: center;\n            justify-content: space-between;\n        }\n\n        .").concat(prefix, "info-el-title {\n            font-size: 18px;\n            margin: 0;\n            padding: 0;\n            font-weight: 700;\n        }\n\n        .").concat(prefix, "info-el-close {\n            cursor: pointer;\n            color: #616161;\n            font-size: 22px;\n            font-weight: 700;\n        }\n\n        .").concat(prefix, "info-el-info {\n            padding: 15px 0;\n        }\n\n        .").concat(prefix, "info-el-info-img {\n            width: 100%;\n        }\n\n        .").concat(prefix, "info-el-info-text {\n\n        }\n\n        .").concat(prefix, "info-el-indicator {\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            margin-bottom: 10px;\n        }\n\n        .").concat(prefix, "info-el-indicator-item {\n            width: 6px;\n            height: 6px;\n            background: #ccc;\n            transition: width .1s ease-in;\n            border-radius: 10px;\n            cursor: pointer;\n            margin: 0 2px;\n        }\n\n        .").concat(prefix, "info-el-indicator-item.active, .").concat(prefix, "info-el-indicator-item:hover {\n            width: 15px;\n            background: #999;\n        }\n\n        .").concat(prefix, "info-el-btn-group {\n            display: flex;\n            align-items: center;\n            justify-content: space-between;\n            border-top: 1px solid #e0e0e0;\n            padding-top: 10px;\n        }\n\n        .").concat(prefix, "info-el-btn {\n            width: 60px;\n            height: 35px;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            border: 1px solid #bdbdbd;\n            text-shadow: 1px 1px 0 #fff;\n            font-size: 14px;\n            color: #424242;\n            white-space: nowrap;\n            cursor: pointer;\n            background-color: #f4f4f4;\n            border-radius: 3px;\n        }\n\n        .").concat(prefix, "info-el-btn.disabled {\n            color: #9e9e9e;\n            border-color: #bdbdbd;\n            cursor: default;\n            background-color: #f4f4f4;\n        }\n\n        .").concat(prefix, "info-el-btn:hover {\n            border-color: #9e9e9e;\n            background-color: #e0e0e0;\n            color: #212121;\n        }\n\n        .").concat(prefix, "info-el-btn.disabled:hover {\n            color: #9e9e9e;\n            border-color: #bdbdbd;\n            cursor: default;\n            background-color: #f4f4f4;\n        }\n    ");
        styleEl = document.createElement('style');
        styleEl.innerHTML = cssText;
        document.head.appendChild(styleEl);
    };
    var removeCss = function () {
        if (styleEl) {
            document.head.removeChild(styleEl);
        }
    };

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var eventemitter3 = createCommonjsModule(function (module) {

    var has = Object.prototype.hasOwnProperty
      , prefix = '~';

    /**
     * Constructor to create a storage for our `EE` objects.
     * An `Events` instance is a plain object whose properties are event names.
     *
     * @constructor
     * @private
     */
    function Events() {}

    //
    // We try to not inherit from `Object.prototype`. In some engines creating an
    // instance in this way is faster than calling `Object.create(null)` directly.
    // If `Object.create(null)` is not supported we prefix the event names with a
    // character to make sure that the built-in object properties are not
    // overridden or used as an attack vector.
    //
    if (Object.create) {
      Events.prototype = Object.create(null);

      //
      // This hack is needed because the `__proto__` property is still inherited in
      // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
      //
      if (!new Events().__proto__) prefix = false;
    }

    /**
     * Representation of a single event listener.
     *
     * @param {Function} fn The listener function.
     * @param {*} context The context to invoke the listener with.
     * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
     * @constructor
     * @private
     */
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }

    /**
     * Add a listener for a given event.
     *
     * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
     * @param {(String|Symbol)} event The event name.
     * @param {Function} fn The listener function.
     * @param {*} context The context to invoke the listener with.
     * @param {Boolean} once Specify if the listener is a one-time listener.
     * @returns {EventEmitter}
     * @private
     */
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== 'function') {
        throw new TypeError('The listener must be a function');
      }

      var listener = new EE(fn, context || emitter, once)
        , evt = prefix ? prefix + event : event;

      if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
      else emitter._events[evt] = [emitter._events[evt], listener];

      return emitter;
    }

    /**
     * Clear event by name.
     *
     * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
     * @param {(String|Symbol)} evt The Event name.
     * @private
     */
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events();
      else delete emitter._events[evt];
    }

    /**
     * Minimal `EventEmitter` interface that is molded against the Node.js
     * `EventEmitter` interface.
     *
     * @constructor
     * @public
     */
    function EventEmitter() {
      this._events = new Events();
      this._eventsCount = 0;
    }

    /**
     * Return an array listing the events for which the emitter has registered
     * listeners.
     *
     * @returns {Array}
     * @public
     */
    EventEmitter.prototype.eventNames = function eventNames() {
      var names = []
        , events
        , name;

      if (this._eventsCount === 0) return names;

      for (name in (events = this._events)) {
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
      }

      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }

      return names;
    };

    /**
     * Return the listeners registered for a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @returns {Array} The registered listeners.
     * @public
     */
    EventEmitter.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event
        , handlers = this._events[evt];

      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];

      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }

      return ee;
    };

    /**
     * Return the number of listeners listening to a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @returns {Number} The number of listeners.
     * @public
     */
    EventEmitter.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event
        , listeners = this._events[evt];

      if (!listeners) return 0;
      if (listeners.fn) return 1;
      return listeners.length;
    };

    /**
     * Calls each of the listeners registered for a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @returns {Boolean} `true` if the event had listeners, else `false`.
     * @public
     */
    EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;

      if (!this._events[evt]) return false;

      var listeners = this._events[evt]
        , len = arguments.length
        , args
        , i;

      if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

        switch (len) {
          case 1: return listeners.fn.call(listeners.context), true;
          case 2: return listeners.fn.call(listeners.context, a1), true;
          case 3: return listeners.fn.call(listeners.context, a1, a2), true;
          case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }

        for (i = 1, args = new Array(len -1); i < len; i++) {
          args[i - 1] = arguments[i];
        }

        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length
          , j;

        for (i = 0; i < length; i++) {
          if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

          switch (len) {
            case 1: listeners[i].fn.call(listeners[i].context); break;
            case 2: listeners[i].fn.call(listeners[i].context, a1); break;
            case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
            case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
            default:
              if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
                args[j - 1] = arguments[j];
              }

              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }

      return true;
    };

    /**
     * Add a listener for a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @param {Function} fn The listener function.
     * @param {*} [context=this] The context to invoke the listener with.
     * @returns {EventEmitter} `this`.
     * @public
     */
    EventEmitter.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };

    /**
     * Add a one-time listener for a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @param {Function} fn The listener function.
     * @param {*} [context=this] The context to invoke the listener with.
     * @returns {EventEmitter} `this`.
     * @public
     */
    EventEmitter.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };

    /**
     * Remove the listeners of a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @param {Function} fn Only remove the listeners that match this function.
     * @param {*} context Only remove the listeners that have this context.
     * @param {Boolean} once Only remove one-time listeners.
     * @returns {EventEmitter} `this`.
     * @public
     */
    EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;

      if (!this._events[evt]) return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }

      var listeners = this._events[evt];

      if (listeners.fn) {
        if (
          listeners.fn === fn &&
          (!once || listeners.once) &&
          (!context || listeners.context === context)
        ) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (
            listeners[i].fn !== fn ||
            (once && !listeners[i].once) ||
            (context && listeners[i].context !== context)
          ) {
            events.push(listeners[i]);
          }
        }

        //
        // Reset the array, or remove it completely if we have no more listeners.
        //
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
      }

      return this;
    };

    /**
     * Remove all listeners, or those of the specified event.
     *
     * @param {(String|Symbol)} [event] The event name.
     * @returns {EventEmitter} `this`.
     * @public
     */
    EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;

      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }

      return this;
    };

    //
    // Alias methods names because people roll like that.
    //
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    EventEmitter.prototype.addListener = EventEmitter.prototype.on;

    //
    // Expose the prefix.
    //
    EventEmitter.prefixed = prefix;

    //
    // Allow `EventEmitter` to be imported as module namespace.
    //
    EventEmitter.EventEmitter = EventEmitter;

    //
    // Expose the module.
    //
    {
      module.exports = EventEmitter;
    }
    });

    var __extends = (undefined && undefined.__extends) || (function () {
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
    var __assign = (undefined && undefined.__assign) || function () {
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
    var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
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
            _this.highlightElement = new HighlightElement$1(_this);
            _this.infoElement = new HighlightElement(_this);
            _this.initSteps();
            return _this;
        }
        NoviceGuide.prototype.initSteps = function () {
            var _this = this;
            this.options.steps.forEach(function (step) {
                _this.steps.push(__assign({}, step));
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
                            currentStep.element =
                                typeof currentStep.element === 'string'
                                    ? document.querySelector(currentStep.element)
                                    : currentStep.element;
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
            this.highlightElement.removeEl();
            this.infoElement.removeEl();
            removeCss();
            this.addedCss = false;
            this.currentStepIndex = -1;
            this.emit('done');
        };
        NoviceGuide.prototype.isFirstStep = function () {
            return this.currentStepIndex <= 0;
        };
        NoviceGuide.prototype.isLastStep = function () {
            return this.currentStepIndex >= this.steps.length - 1;
        };
        return NoviceGuide;
    }(eventemitter3));

    return NoviceGuide;

}));
