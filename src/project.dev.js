window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  ActiveRegisterForm: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a2d016RRQ1NzI3R9JoKBLKh", "ActiveRegisterForm");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        registerForm: cc.Layout,
        richText: cc.RichText,
        laBel: cc.Label
      },
      activeRegisterForm: function activeRegisterForm() {
        this.node.active = false;
        this.registerForm.node.active = true;
        this.richText.node.active = true;
        this.laBel.node.active = true;
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  1: [ function(require, module, exports) {
    function EventEmitter() {
      this._events = this._events || {};
      this._maxListeners = this._maxListeners || void 0;
    }
    module.exports = EventEmitter;
    EventEmitter.EventEmitter = EventEmitter;
    EventEmitter.prototype._events = void 0;
    EventEmitter.prototype._maxListeners = void 0;
    EventEmitter.defaultMaxListeners = 10;
    EventEmitter.prototype.setMaxListeners = function(n) {
      if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError("n must be a positive number");
      this._maxListeners = n;
      return this;
    };
    EventEmitter.prototype.emit = function(type) {
      var er, handler, len, args, i, listeners;
      this._events || (this._events = {});
      if ("error" === type && (!this._events.error || isObject(this._events.error) && !this._events.error.length)) {
        er = arguments[1];
        if (er instanceof Error) throw er;
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ")");
        err.context = er;
        throw err;
      }
      handler = this._events[type];
      if (isUndefined(handler)) return false;
      if (isFunction(handler)) switch (arguments.length) {
       case 1:
        handler.call(this);
        break;

       case 2:
        handler.call(this, arguments[1]);
        break;

       case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;

       default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
      } else if (isObject(handler)) {
        args = Array.prototype.slice.call(arguments, 1);
        listeners = handler.slice();
        len = listeners.length;
        for (i = 0; i < len; i++) listeners[i].apply(this, args);
      }
      return true;
    };
    EventEmitter.prototype.addListener = function(type, listener) {
      var m;
      if (!isFunction(listener)) throw TypeError("listener must be a function");
      this._events || (this._events = {});
      this._events.newListener && this.emit("newListener", type, isFunction(listener.listener) ? listener.listener : listener);
      this._events[type] ? isObject(this._events[type]) ? this._events[type].push(listener) : this._events[type] = [ this._events[type], listener ] : this._events[type] = listener;
      if (isObject(this._events[type]) && !this._events[type].warned) {
        m = isUndefined(this._maxListeners) ? EventEmitter.defaultMaxListeners : this._maxListeners;
        if (m && m > 0 && this._events[type].length > m) {
          this._events[type].warned = true;
          console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[type].length);
          "function" === typeof console.trace && console.trace();
        }
      }
      return this;
    };
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    EventEmitter.prototype.once = function(type, listener) {
      if (!isFunction(listener)) throw TypeError("listener must be a function");
      var fired = false;
      function g() {
        this.removeListener(type, g);
        if (!fired) {
          fired = true;
          listener.apply(this, arguments);
        }
      }
      g.listener = listener;
      this.on(type, g);
      return this;
    };
    EventEmitter.prototype.removeListener = function(type, listener) {
      var list, position, length, i;
      if (!isFunction(listener)) throw TypeError("listener must be a function");
      if (!this._events || !this._events[type]) return this;
      list = this._events[type];
      length = list.length;
      position = -1;
      if (list === listener || isFunction(list.listener) && list.listener === listener) {
        delete this._events[type];
        this._events.removeListener && this.emit("removeListener", type, listener);
      } else if (isObject(list)) {
        for (i = length; i-- > 0; ) if (list[i] === listener || list[i].listener && list[i].listener === listener) {
          position = i;
          break;
        }
        if (position < 0) return this;
        if (1 === list.length) {
          list.length = 0;
          delete this._events[type];
        } else list.splice(position, 1);
        this._events.removeListener && this.emit("removeListener", type, listener);
      }
      return this;
    };
    EventEmitter.prototype.removeAllListeners = function(type) {
      var key, listeners;
      if (!this._events) return this;
      if (!this._events.removeListener) {
        0 === arguments.length ? this._events = {} : this._events[type] && delete this._events[type];
        return this;
      }
      if (0 === arguments.length) {
        for (key in this._events) {
          if ("removeListener" === key) continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = {};
        return this;
      }
      listeners = this._events[type];
      if (isFunction(listeners)) this.removeListener(type, listeners); else if (listeners) while (listeners.length) this.removeListener(type, listeners[listeners.length - 1]);
      delete this._events[type];
      return this;
    };
    EventEmitter.prototype.listeners = function(type) {
      var ret;
      ret = this._events && this._events[type] ? isFunction(this._events[type]) ? [ this._events[type] ] : this._events[type].slice() : [];
      return ret;
    };
    EventEmitter.prototype.listenerCount = function(type) {
      if (this._events) {
        var evlistener = this._events[type];
        if (isFunction(evlistener)) return 1;
        if (evlistener) return evlistener.length;
      }
      return 0;
    };
    EventEmitter.listenerCount = function(emitter, type) {
      return emitter.listenerCount(type);
    };
    function isFunction(arg) {
      return "function" === typeof arg;
    }
    function isNumber(arg) {
      return "number" === typeof arg;
    }
    function isObject(arg) {
      return "object" === typeof arg && null !== arg;
    }
    function isUndefined(arg) {
      return void 0 === arg;
    }
  }, {} ],
  ListVIew: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "87f5cy3pOBEhYrIazf/2IXs", "ListVIew");
    "use strict";
    var Emitter = require("mEmitter");
    var Register = require("RegisterUser");
    var users = [];
    cc.Class({
      extends: cc.Component,
      properties: {
        content: cc.Node,
        items: cc.Prefab
      },
      onLoad: function onLoad() {
        Emitter.instance = new Emitter();
        Emitter.instance.registerEvent("listuser", this.listUser, this);
      },
      onEnable: function onEnable() {
        this.addListView();
      },
      listUser: function listUser(value) {
        users = value;
        cc.log(users);
      },
      addListView: function addListView() {
        this.content.removeAllChildren();
        for (var i = 0; i < users.length; i++) {
          var item = cc.instantiate(this.items);
          item.parent = this.content;
          item.y = -30 - 60 * i;
          item.getChildByName("item").getComponent(cc.Label).string = users[i].username;
          this.content.height += 10;
        }
      },
      resizeFont: function resizeFont(slide) {
        var childrenContent = this.content.getChildByName("itemLayout")._parent._children;
        for (var i = 0; i < childrenContent.length; i++) childrenContent[i].getChildByName("item").getComponent(cc.Label).fontSize = 10 + .125 * slide.progress * 64;
      },
      deleteListView: function deleteListView() {
        this.content.removeAllChildren();
        this.content.height = 220;
        users = [];
      },
      start: function start() {},
      update: function update(dt) {}
    });
    cc._RF.pop();
  }, {
    RegisterUser: "RegisterUser",
    mEmitter: "mEmitter"
  } ],
  LoadingRegister: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5f03c0umApHt7NijznyNUCi", "LoadingRegister");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        registerProgressBar: cc.ProgressBar,
        listViewLayout: cc.Layout
      },
      onLoad: function onLoad() {
        this.registerProgressBar.progress = 0;
      },
      start: function start() {},
      update: function update() {
        if (1 == Math.floor(this.registerProgressBar.progress)) {
          this.node.active = false;
          return this.listViewLayout.node.active = true;
        }
        this.registerProgressBar.progress += .015;
      }
    });
    cc._RF.pop();
  }, {} ],
  RegisterUser: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ef3e4XZHB1DRp2IZKprdXZv", "RegisterUser");
    "use strict";
    var Emitter = require("mEmitter");
    var user = cc.Class({
      username: "",
      password: "",
      email: ""
    });
    var users = [];
    module.exports = users;
    cc.Class({
      extends: cc.Component,
      properties: {
        username: {
          default: null,
          type: cc.EditBox
        },
        password: {
          default: null,
          type: cc.EditBox
        },
        email: {
          default: null,
          type: cc.EditBox
        },
        layoutListView: cc.Layout,
        layoutRegister: cc.Layout,
        loadingProgressBar: cc.Layout,
        richText: cc.RichText,
        laBel: cc.Label
      },
      onLoad: function onLoad() {},
      addUser: function addUser() {
        this.node.active = true;
        if (!(this.username.string || this.password.string || this.email.string)) return alert("Please try enter your information!");
        if (!this.username.string) return alert("Please enter your username!");
        if (!this.password.string) return alert("Please enter your password!");
        if (!this.email.string) return alert("Please enter your email!");
        if (!this.checkEmail()) return alert("Wrong email!");
        var newUser = new user();
        newUser.username = this.username.string;
        newUser.password = this.password.string;
        newUser.email = this.email.string;
        users.push(newUser);
        this.showUser();
        this.loadingRegister();
        this.returnDataListView();
        this.clearEditBox();
      },
      clearEditBox: function clearEditBox() {
        this.username.string = "";
        this.password.string = "";
        this.email.string = "";
      },
      returnDataListView: function returnDataListView() {
        this.layoutListView.node.active = true;
        Emitter.instance.emit("listuser", users);
        this.layoutListView.node.active = false;
      },
      checkEmail: function checkEmail() {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9-]+)$/;
        if (this.email.string.match(validRegex)) return true;
        return false;
      },
      loadingRegister: function loadingRegister() {
        this.layoutRegister.node.active = false;
        this.richText.node.active = false;
        this.laBel.node.active = false;
        this.loadingProgressBar.node.active = true;
      },
      showUser: function showUser() {
        cc.log("username:" + this.username.string);
        cc.log("password:" + this.password.string);
        cc.log("email:" + this.email.string);
      },
      resetData: function resetData(value) {
        users = value;
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {
    mEmitter: "mEmitter"
  } ],
  ReturnRegister: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "08024Qa2WtBPJ/pd7olom0P", "ReturnRegister");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        listViewLayout: cc.Layout,
        registerForm: cc.Layout,
        registerRichTest: cc.RichText,
        registerLabel: cc.Label
      },
      returnRegister: function returnRegister() {
        this.listViewLayout.node.active = false;
        this.registerForm.node.active = true;
        this.registerRichTest.node.active = true;
        this.registerLabel.node.active = true;
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  mEmitter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c08305X92JCnoSVwSSmyFjY", "mEmitter");
    "use strict";
    var _createClass = function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          "value" in descriptor && (descriptor.writable = true);
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        protoProps && defineProperties(Constructor.prototype, protoProps);
        staticProps && defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    var EventEmitter = require("events");
    var mEmitter = function() {
      function mEmitter() {
        _classCallCheck(this, mEmitter);
        this._emiter = new EventEmitter();
        this._emiter.setMaxListeners(100);
      }
      _createClass(mEmitter, [ {
        key: "emit",
        value: function emit() {
          var _emiter;
          (_emiter = this._emiter).emit.apply(_emiter, arguments);
        }
      }, {
        key: "registerEvent",
        value: function registerEvent(event, listener) {
          this._emiter.on(event, listener);
        }
      }, {
        key: "registerOnce",
        value: function registerOnce(event, listener) {
          this._emiter.once(event, listener);
        }
      }, {
        key: "removeEvent",
        value: function removeEvent(event, listener) {
          this._emiter.removeListener(event, listener);
        }
      }, {
        key: "destroy",
        value: function destroy() {
          this._emiter.removeAllListeners();
          this._emiter = null;
          mEmitter.instance = null;
        }
      } ]);
      return mEmitter;
    }();
    mEmitter.instance = null;
    module.exports = mEmitter;
    cc._RF.pop();
  }, {
    events: 1
  } ]
}, {}, [ "ActiveRegisterForm", "ListVIew", "LoadingRegister", "RegisterUser", "ReturnRegister", "mEmitter" ]);