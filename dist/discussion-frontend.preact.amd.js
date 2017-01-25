define(function () { 'use strict';

function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
  return returnValue;
}
function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var reactProptypesProd = createCommonjsModule(function (module) {
module.exports = {};
});

function VNode$1(nodeName, attributes, children) {
	this.nodeName = nodeName;

	this.attributes = attributes;

	this.children = children;

	this.key = attributes && attributes.key;
}

var options = {};

function extend$1(obj, props) {
	if (props) {
		for (var i in props) {
			if (props[i] !== undefined) {
				obj[i] = props[i];
			}
		}
	}
	return obj;
}

function clone(obj) {
	return extend$1({}, obj);
}

function delve(obj, key) {
	for (var p = key.split('.'), i = 0; i < p.length && obj; i++) {
		obj = obj[p[i]];
	}
	return obj;
}

function toArray$1(obj, offset) {
	return [].slice.call(obj, offset);
}

function isFunction(obj) {
	return 'function' === typeof obj;
}

function isString(obj) {
	return 'string' === typeof obj;
}

function empty(x) {
	return x === undefined || x === null;
}

function falsey(value) {
	return value === false || empty(value);
}

function hashToClassName(c) {
	var str = '';
	for (var prop in c) {
		if (c[prop]) {
			if (str) str += ' ';
			str += prop;
		}
	}
	return str;
}

var lcCache = {};
var toLowerCase = function toLowerCase(s) {
	return lcCache[s] || (lcCache[s] = s.toLowerCase());
};

var resolved = typeof Promise !== 'undefined' && Promise.resolve();
var defer = resolved ? function (f) {
	resolved.then(f);
} : setTimeout;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass$1 = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get$1 = function get$1(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$1(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set$1 = function set$1(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set$1(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var SHARED_TEMP_ARRAY = [];

function h(nodeName, attributes, firstChild) {
	var len = arguments.length,
	    children = void 0,
	    arr = void 0,
	    lastSimple = void 0;

	if (len > 2) {
		var type = typeof firstChild === 'undefined' ? 'undefined' : _typeof(firstChild);
		if (len === 3 && type !== 'object' && type !== 'function') {
			if (!falsey(firstChild)) {
				children = [String(firstChild)];
			}
		} else {
			children = [];
			for (var i = 2; i < len; i++) {
				var _p = arguments[i];
				if (falsey(_p)) continue;
				if (_p.join) arr = _p;else (arr = SHARED_TEMP_ARRAY)[0] = _p;
				for (var j = 0; j < arr.length; j++) {
					var child = arr[j],
					    simple = !(falsey(child) || isFunction(child) || child instanceof VNode$1);
					if (simple && !isString(child)) child = String(child);
					if (simple && lastSimple) {
						children[children.length - 1] += child;
					} else if (!falsey(child)) {
						children.push(child);
						lastSimple = simple;
					}
				}
			}
		}
	} else if (attributes && attributes.children) {
		return h(nodeName, attributes, attributes.children);
	}

	if (attributes) {
		if (attributes.children) {
			delete attributes.children;
		}

		if (!isFunction(nodeName)) {
			if ('className' in attributes) {
				attributes.class = attributes.className;
				delete attributes.className;
			}

			lastSimple = attributes.class;
			if (lastSimple && !isString(lastSimple)) {
				attributes.class = hashToClassName(lastSimple);
			}
		}
	}

	var p = new VNode$1(nodeName, attributes || undefined, children);

	if (options.vnode) options.vnode(p);

	return p;
}

function cloneElement$1(vnode, props) {
	return h(vnode.nodeName, extend$1(clone(vnode.attributes), props), arguments.length > 2 ? toArray$1(arguments, 2) : vnode.children);
}

var NO_RENDER = 0;
var SYNC_RENDER = 1;
var FORCE_RENDER = 2;
var ASYNC_RENDER = 3;

var EMPTY = {};

var ATTR_KEY = typeof Symbol !== 'undefined' ? Symbol.for('preactattr') : '__preactattr_';

var NON_DIMENSION_PROPS = {
	boxFlex: 1, boxFlexGroup: 1, columnCount: 1, fillOpacity: 1, flex: 1, flexGrow: 1,
	flexPositive: 1, flexShrink: 1, flexNegative: 1, fontWeight: 1, lineClamp: 1, lineHeight: 1,
	opacity: 1, order: 1, orphans: 1, strokeOpacity: 1, widows: 1, zIndex: 1, zoom: 1
};

var NON_BUBBLING_EVENTS = { blur: 1, error: 1, focus: 1, load: 1, resize: 1, scroll: 1 };

function createLinkedState(component, key, eventPath) {
	var path = key.split('.'),
	    p0 = path[0];
	return function (e) {
		var t = e && e.currentTarget || this,
		    s = component.state,
		    obj = s,
		    v = void 0,
		    i = void 0;
		if (isString(eventPath)) {
			v = delve(e, eventPath);
		} else {
			v = t.nodeName ? (t.nodeName + t.type).match(/^input(check|rad)/i) ? t.checked : t.value : e;
		}
		if (path.length > 1) {
			for (i = 0; i < path.length - 1; i++) {
				obj = obj[path[i]] || (obj[path[i]] = {});
			}
			obj[path[i]] = v;
			v = s[p0];
		}
		component.setState(defineProperty({}, p0, v));
	};
}

var items = [];
var itemsOffline = [];

function enqueueRender(component) {
	if (items.push(component) !== 1) return;

	(options.debounceRendering || defer)(rerender);
}

function rerender() {
	if (!items.length) return;

	var currentItems = items,
	    p = void 0;

	items = itemsOffline;
	itemsOffline = currentItems;

	while (p = currentItems.pop()) {
		if (p._dirty) renderComponent(p);
	}
}

function isFunctionalComponent(vnode) {
  var nodeName = vnode && vnode.nodeName;
  return nodeName && isFunction(nodeName) && !(nodeName.prototype && nodeName.prototype.render);
}

function buildFunctionalComponent(vnode, context) {
  return vnode.nodeName(getNodeProps(vnode), context || EMPTY);
}

function ensureNodeData(node, data) {
	return node[ATTR_KEY] || (node[ATTR_KEY] = data || {});
}

function getNodeType(node) {
	if (node instanceof Text) return 3;
	if (node instanceof Element) return 1;
	return 0;
}

function removeNode(node) {
	var p = node.parentNode;
	if (p) p.removeChild(node);
}

function setAccessor(node, name, value, old, isSvg) {
	ensureNodeData(node)[name] = value;

	if (name === 'key' || name === 'children' || name === 'innerHTML') return;

	if (name === 'class' && !isSvg) {
		node.className = value || '';
	} else if (name === 'style') {
		if (!value || isString(value) || isString(old)) {
			node.style.cssText = value || '';
		}
		if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
			if (!isString(old)) {
				for (var i in old) {
					if (!(i in value)) node.style[i] = '';
				}
			}
			for (var _i in value) {
				node.style[_i] = typeof value[_i] === 'number' && !NON_DIMENSION_PROPS[_i] ? value[_i] + 'px' : value[_i];
			}
		}
	} else if (name === 'dangerouslySetInnerHTML') {
		if (value) node.innerHTML = value.__html;
	} else if (name[0] == 'o' && name[1] == 'n') {
		var l = node._listeners || (node._listeners = {});
		name = toLowerCase(name.substring(2));

		if (value) {
			if (!l[name]) node.addEventListener(name, eventProxy, !!NON_BUBBLING_EVENTS[name]);
		} else if (l[name]) {
			node.removeEventListener(name, eventProxy, !!NON_BUBBLING_EVENTS[name]);
		}
		l[name] = value;
	} else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
		setProperty(node, name, empty(value) ? '' : value);
		if (falsey(value)) node.removeAttribute(name);
	} else {
		var ns = isSvg && name.match(/^xlink\:?(.+)/);
		if (falsey(value)) {
			if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', toLowerCase(ns[1]));else node.removeAttribute(name);
		} else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' && !isFunction(value)) {
			if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', toLowerCase(ns[1]), value);else node.setAttribute(name, value);
		}
	}
}

function setProperty(node, name, value) {
	try {
		node[name] = value;
	} catch (e) {}
}

function eventProxy(e) {
	return this._listeners[e.type](options.event && options.event(e) || e);
}

function getRawNodeAttributes(node) {
	var attrs = {};
	for (var i = node.attributes.length; i--;) {
		attrs[node.attributes[i].name] = node.attributes[i].value;
	}
	return attrs;
}

function isSameNodeType(node, vnode) {
	if (isString(vnode)) {
		return getNodeType(node) === 3;
	}
	if (isString(vnode.nodeName)) {
		return isNamedNode(node, vnode.nodeName);
	}
	if (isFunction(vnode.nodeName)) {
		return node._componentConstructor === vnode.nodeName || isFunctionalComponent(vnode);
	}
}

function isNamedNode(node, nodeName) {
	return node.normalizedNodeName === nodeName || toLowerCase(node.nodeName) === toLowerCase(nodeName);
}

function getNodeProps(vnode) {
	var defaultProps = vnode.nodeName.defaultProps,
	    props = clone(defaultProps || vnode.attributes);

	if (defaultProps) extend$1(props, vnode.attributes);

	if (vnode.children) props.children = vnode.children;

	return props;
}

var nodes = {};

function collectNode(node) {
	removeNode(node);
	if (getNodeType(node) !== 1) return;
	cleanNode(node);
	var name = toLowerCase(node.nodeName),
	    list = nodes[name];
	if (list) list.push(node);else nodes[name] = [node];
}

function createNode(nodeName, isSvg) {
	var name = toLowerCase(nodeName),
	    node = nodes[name] && nodes[name].pop() || (isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName));
	ensureNodeData(node);
	node.normalizedNodeName = name;
	return node;
}

function cleanNode(node) {

	ensureNodeData(node, getRawNodeAttributes(node));

	node._component = node._componentConstructor = null;
}

var mounts = [];

var diffLevel = 0;

var isSvgMode = false;

function flushMounts() {
	var c = void 0;
	while (c = mounts.pop()) {
		if (c.componentDidMount) c.componentDidMount();
	}
}

function diff(dom, vnode, context, mountAll, parent, rootComponent) {
	diffLevel++;
	var ret = idiff(dom, vnode, context, mountAll, rootComponent);
	if (parent && ret.parentNode !== parent) parent.appendChild(ret);
	if (! --diffLevel) flushMounts();
	return ret;
}

function idiff(dom, vnode, context, mountAll, rootComponent) {
	var originalAttributes = vnode && vnode.attributes;

	while (isFunctionalComponent(vnode)) {
		vnode = buildFunctionalComponent(vnode, context);
	}

	if (empty(vnode)) {
		vnode = '';
		if (rootComponent) {
			if (dom) {
				if (dom.nodeType === 8) return dom;
				recollectNodeTree(dom);
			}
			return document.createComment(vnode);
		}
	}

	if (isString(vnode)) {
		if (dom) {
			if (getNodeType(dom) === 3 && dom.parentNode) {
				dom.nodeValue = vnode;
				return dom;
			}
			recollectNodeTree(dom);
		}
		return document.createTextNode(vnode);
	}

	var out = dom,
	    nodeName = vnode.nodeName,
	    prevSvgMode = isSvgMode;

	if (isFunction(nodeName)) {
		return buildComponentFromVNode(dom, vnode, context, mountAll);
	}

	if (!isString(nodeName)) {
		nodeName = String(nodeName);
	}

	isSvgMode = nodeName === 'svg' ? true : nodeName === 'foreignObject' ? false : isSvgMode;

	if (!dom) {
		out = createNode(nodeName, isSvgMode);
	} else if (!isNamedNode(dom, nodeName)) {
		out = createNode(nodeName, isSvgMode);

		while (dom.firstChild) {
			out.appendChild(dom.firstChild);
		}
		recollectNodeTree(dom);
	}

	if (vnode.children && vnode.children.length === 1 && typeof vnode.children[0] === 'string' && out.childNodes.length === 1 && out.firstChild instanceof Text) {
		out.firstChild.nodeValue = vnode.children[0];
	} else if (vnode.children || out.firstChild) {
		innerDiffNode(out, vnode.children, context, mountAll);
	}

	diffAttributes(out, vnode.attributes);

	if (originalAttributes && originalAttributes.ref) {
		(out[ATTR_KEY].ref = originalAttributes.ref)(out);
	}

	isSvgMode = prevSvgMode;

	return out;
}

function innerDiffNode(dom, vchildren, context, mountAll) {
	var originalChildren = dom.childNodes,
	    children = [],
	    keyed = {},
	    keyedLen = 0,
	    min = 0,
	    len = originalChildren.length,
	    childrenLen = 0,
	    vlen = vchildren && vchildren.length,
	    j = void 0,
	    c = void 0,
	    vchild = void 0,
	    child = void 0;

	if (len) {
		for (var i = 0; i < len; i++) {
			var _child = originalChildren[i],
			    key = vlen ? (c = _child._component) ? c.__key : (c = _child[ATTR_KEY]) ? c.key : null : null;
			if (key || key === 0) {
				keyedLen++;
				keyed[key] = _child;
			} else {
				children[childrenLen++] = _child;
			}
		}
	}

	if (vlen) {
		for (var _i = 0; _i < vlen; _i++) {
			vchild = vchildren[_i];
			child = null;

			var _key = vchild.key;
			if (!empty(_key)) {
				if (keyedLen && _key in keyed) {
					child = keyed[_key];
					keyed[_key] = undefined;
					keyedLen--;
				}
			} else if (!child && min < childrenLen) {
					for (j = min; j < childrenLen; j++) {
						c = children[j];
						if (c && isSameNodeType(c, vchild)) {
							child = c;
							children[j] = undefined;
							if (j === childrenLen - 1) childrenLen--;
							if (j === min) min++;
							break;
						}
					}
					if (!child && min < childrenLen && isFunction(vchild.nodeName) && mountAll) {
						child = children[min];
						children[min++] = undefined;
					}
				}

			child = idiff(child, vchild, context, mountAll);

			if (child !== originalChildren[_i]) {
				dom.insertBefore(child, originalChildren[_i] || null);
			}
		}
	}

	if (keyedLen) {
		for (var _i2 in keyed) {
			if (keyed[_i2]) {
				children[min = childrenLen++] = keyed[_i2];
			}
		}
	}

	if (min < childrenLen) {
		removeOrphanedChildren(children);
	}
}

function removeOrphanedChildren(children, unmountOnly) {
	for (var i = children.length; i--;) {
		var child = children[i];
		if (child) {
			recollectNodeTree(child, unmountOnly);
		}
	}
}

function recollectNodeTree(node, unmountOnly) {

	var component = node._component;
	if (component) {
		unmountComponent(component, !unmountOnly);
	} else {
		if (node[ATTR_KEY] && node[ATTR_KEY].ref) node[ATTR_KEY].ref(null);

		if (!unmountOnly) {
			collectNode(node);
		}

		if (node.childNodes && node.childNodes.length) {
			removeOrphanedChildren(node.childNodes, unmountOnly);
		}
	}
}

function diffAttributes(dom, attrs) {
	var old = dom[ATTR_KEY] || getRawNodeAttributes(dom);

	for (var name in old) {
		if (!attrs || !(name in attrs)) {
			setAccessor(dom, name, null, old[name], isSvgMode);
		}
	}

	if (attrs) {
		for (var _name in attrs) {
			if (!(_name in old) || attrs[_name] != old[_name] || (_name === 'value' || _name === 'checked') && attrs[_name] != dom[_name]) {
				setAccessor(dom, _name, attrs[_name], old[_name], isSvgMode);
			}
		}
	}
}

var components = {};

function collectComponent(component) {
	var name = component.constructor.name,
	    list = components[name];
	if (list) list.push(component);else components[name] = [component];
}

function createComponent(Ctor, props, context) {
	var inst = new Ctor(props, context),
	    list = components[Ctor.name];
	inst.props = props;
	inst.context = context;
	if (list) {
		for (var i = list.length; i--;) {
			if (list[i].constructor === Ctor) {
				inst.nextBase = list[i].nextBase;
				list.splice(i, 1);
				break;
			}
		}
	}
	return inst;
}

function triggerComponentRender(component) {
	if (!component._dirty) {
		component._dirty = true;
		enqueueRender(component);
	}
}

function setComponentProps(component, props, opts, context, mountAll) {
	var b = component.base;
	if (component._disableRendering) return;
	component._disableRendering = true;

	if (component.__ref = props.ref) delete props.ref;
	if (component.__key = props.key) delete props.key;

	if (empty(b) || mountAll) {
		if (component.componentWillMount) component.componentWillMount();
	} else if (component.componentWillReceiveProps) {
		component.componentWillReceiveProps(props, context);
	}

	if (context && context !== component.context) {
		if (!component.prevContext) component.prevContext = component.context;
		component.context = context;
	}

	if (!component.prevProps) component.prevProps = component.props;
	component.props = props;

	component._disableRendering = false;

	if (opts !== NO_RENDER) {
		if (opts === SYNC_RENDER || options.syncComponentUpdates !== false || !b) {
			renderComponent(component, SYNC_RENDER, mountAll);
		} else {
			triggerComponentRender(component);
		}
	}

	if (component.__ref) component.__ref(component);
}

function renderComponent(component, opts, mountAll) {
	if (component._disableRendering) return;

	var skip = void 0,
	    rendered = void 0,
	    props = component.props,
	    state = component.state,
	    context = component.context,
	    previousProps = component.prevProps || props,
	    previousState = component.prevState || state,
	    previousContext = component.prevContext || context,
	    isUpdate = component.base,
	    initialBase = isUpdate || component.nextBase,
	    initialChildComponent = component._component;

	if (isUpdate) {
		component.props = previousProps;
		component.state = previousState;
		component.context = previousContext;
		if (opts !== FORCE_RENDER && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === false) {
			skip = true;
		} else if (component.componentWillUpdate) {
			component.componentWillUpdate(props, state, context);
		}
		component.props = props;
		component.state = state;
		component.context = context;
	}

	component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
	component._dirty = false;

	if (!skip) {
		if (component.render) rendered = component.render(props, state, context);

		if (component.getChildContext) {
			context = extend$1(clone(context), component.getChildContext());
		}

		while (isFunctionalComponent(rendered)) {
			rendered = buildFunctionalComponent(rendered, context);
		}

		var childComponent = rendered && rendered.nodeName,
		    toUnmount = void 0,
		    base = void 0;

		if (isFunction(childComponent) && childComponent.prototype.render) {

			var inst = initialChildComponent,
			    childProps = getNodeProps(rendered);

			if (inst && inst.constructor === childComponent) {
				setComponentProps(inst, childProps, SYNC_RENDER, context);
			} else {
				toUnmount = inst;
				inst = createComponent(childComponent, childProps, context);
				inst.nextBase = inst.nextBase || mountAll && initialBase;
				inst._parentComponent = component;
				component._component = inst;
				setComponentProps(inst, childProps, NO_RENDER, context);
				renderComponent(inst, SYNC_RENDER);
			}

			base = inst.base;
		} else {
			var cbase = initialBase;

			toUnmount = initialChildComponent;
			if (toUnmount) {
				cbase = component._component = null;
			}

			if (initialBase || opts === SYNC_RENDER) {
				if (cbase) cbase._component = null;
				base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true);
			}
		}

		if (initialBase && base !== initialBase) {
			var baseParent = initialBase.parentNode;
			if (baseParent && base !== baseParent) {
				baseParent.replaceChild(base, initialBase);
			}

			if (!toUnmount && component._parentComponent) {
				initialBase._component = null;
				recollectNodeTree(initialBase);
			}
		}

		if (toUnmount) {
			unmountComponent(toUnmount, base !== initialBase);
		}

		component.base = base;
		if (base) {
			var componentRef = component,
			    t = component;
			while (t = t._parentComponent) {
				componentRef = t;
			}
			base._component = componentRef;
			base._componentConstructor = componentRef.constructor;
		}
	}

	if (!isUpdate || mountAll) {
		mounts.unshift(component);
		if (!diffLevel) flushMounts();
	} else if (!skip && component.componentDidUpdate) {
		component.componentDidUpdate(previousProps, previousState, previousContext);
	}

	var cb = component._renderCallbacks,
	    fn = void 0;
	if (cb) while (fn = cb.pop()) {
		fn.call(component);
	}return rendered;
}

function buildComponentFromVNode(dom, vnode, context, mountAll) {
	var c = dom && dom._component,
	    oldDom = dom,
	    isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
	    isOwner = isDirectOwner,
	    props = getNodeProps(vnode);
	while (c && !isOwner && (c = c._parentComponent)) {
		isOwner = c.constructor === vnode.nodeName;
	}

	if (isOwner && (!mountAll || c._component)) {
		setComponentProps(c, props, ASYNC_RENDER, context, mountAll);
		dom = c.base;
	} else {
		if (c && !isDirectOwner) {
			unmountComponent(c, true);
			dom = oldDom = null;
		}

		c = createComponent(vnode.nodeName, props, context);
		if (dom && !c.nextBase) c.nextBase = dom;
		setComponentProps(c, props, SYNC_RENDER, context, mountAll);
		dom = c.base;

		if (oldDom && dom !== oldDom) {
			oldDom._component = null;
			recollectNodeTree(oldDom);
		}
	}

	return dom;
}

function unmountComponent(component, remove) {
	var base = component.base;

	component._disableRendering = true;

	if (component.componentWillUnmount) component.componentWillUnmount();

	component.base = null;

	var inner = component._component;
	if (inner) {
		unmountComponent(inner, remove);
	} else if (base) {
		if (base[ATTR_KEY] && base[ATTR_KEY].ref) base[ATTR_KEY].ref(null);

		component.nextBase = base;

		if (remove) {
			removeNode(base);
			collectComponent(component);
		}
		removeOrphanedChildren(base.childNodes, !remove);
	}

	if (component.__ref) component.__ref(null);
	if (component.componentDidUnmount) component.componentDidUnmount();
}

function Component$1(props, context) {
	this._dirty = true;

	this._disableRendering = false;

	this.prevState = this.prevProps = this.prevContext = this.base = this.nextBase = this._parentComponent = this._component = this.__ref = this.__key = this._linkedStates = this._renderCallbacks = null;

	this.context = context;

	this.props = props;

	this.state = this.getInitialState && this.getInitialState() || {};
}

extend$1(Component$1.prototype, {
	linkState: function linkState(key, eventPath) {
		var c = this._linkedStates || (this._linkedStates = {}),
		    cacheKey = key + '|' + eventPath;
		return c[cacheKey] || (c[cacheKey] = createLinkedState(this, key, eventPath));
	},
	setState: function setState(state, callback) {
		var s = this.state;
		if (!this.prevState) this.prevState = clone(s);
		extend$1(s, isFunction(state) ? state(s, this.props) : state);
		if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
		triggerComponentRender(this);
	},
	forceUpdate: function forceUpdate() {
		renderComponent(this, FORCE_RENDER);
	},
	render: function render() {
		return null;
	}
});

function render$2(vnode, parent, merge) {
  return diff(merge, vnode, {}, false, parent);
}

var ELEMENTS = 'a abbr address area article aside audio b base bdi bdo big blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr circle clipPath defs ellipse g image line linearGradient mask path pattern polygon polyline radialGradient rect stop svg text tspan'.split(' ');

var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;

var AUTOBIND_BLACKLIST = {
	constructor: 1,
	render: 1,
	shouldComponentUpdate: 1,
	componentWillReceiveProps: 1,
	componentWillUpdate: 1,
	componentDidUpdate: 1,
	componentWillMount: 1,
	componentDidMount: 1,
	componentWillUnmount: 1,
	componentDidUnmount: 1
};

var BYPASS_HOOK = {};

var DEV = 'undefined' !== 'undefined' && process.env && 'production' !== 'production';

var EmptyComponent = function EmptyComponent() {
	return null;
};

var VNode = h('').constructor;
VNode.prototype.$$typeof = REACT_ELEMENT_TYPE;

Object.defineProperty(VNode.prototype, 'type', {
	get: function get() {
		return this.nodeName;
	},
	set: function set(v) {
		this.nodeName = v;
	},

	configurable: true
});

Object.defineProperty(VNode.prototype, 'props', {
	get: function get() {
		return this.attributes;
	},
	set: function set(v) {
		this.attributes = v;
	},

	configurable: true
});

var oldVnodeHook = options.vnode;
options.vnode = function (vnode) {
	var a = vnode.attributes,
	    tag = vnode.nodeName;
	if (!a) a = vnode.attributes = {};

	if (typeof tag === 'function') {
		var isCompat = tag[COMPONENT_WRAPPER_KEY] === true,
		    p = tag;
		if (!isCompat) {
			do {
				if (p instanceof Component$$1) {
					isCompat = true;
					break;
				}
			} while ((p = p.prototype) && p !== Function && p !== Object);
		}

		if (isCompat) {
			normalizeVNode(vnode);

			if (tag.defaultProps) {
				for (var i in tag.defaultProps) {
					if (tag.defaultProps.hasOwnProperty(i) && a[i] == null) {
						a[i] = tag.defaultProps[i];
					}
				}
			}
		}
	}

	if (Object.isExtensible && !Object.isExtensible(a)) {
		a = extend({}, a, true);
	}
	a.children = vnode.children;
	if (oldVnodeHook) oldVnodeHook(vnode);
};

function render$1(vnode, parent, callback) {
	var prev = parent._preactCompatRendered;

	if (prev && prev.parentNode !== parent) prev = null;

	if (!prev) prev = parent.children[0];

	for (var i = parent.childNodes.length; i--;) {
		if (parent.childNodes[i] !== prev) {
			parent.removeChild(parent.childNodes[i]);
		}
	}

	var out = render$2(vnode, parent, prev);
	parent._preactCompatRendered = out;
	if (typeof callback === 'function') callback();
	return out && out._component || out.base;
}

var ContextProvider = function () {
	function ContextProvider() {
		classCallCheck(this, ContextProvider);
	}

	createClass$1(ContextProvider, [{
		key: 'getChildContext',
		value: function getChildContext() {
			return this.props.context;
		}
	}, {
		key: 'render',
		value: function render$1(props) {
			return props.children[0];
		}
	}]);
	return ContextProvider;
}();

var ARR = [];

var Children = {
	map: function map(children, fn, ctx) {
		children = Children.toArray(children);
		if (ctx && ctx !== children) fn = fn.bind(ctx);
		return children.map(fn);
	},
	forEach: function forEach(children, fn, ctx) {
		children = Children.toArray(children);
		if (ctx && ctx !== children) fn = fn.bind(ctx);
		children.forEach(fn);
	},
	count: function count(children) {
		children = Children.toArray(children);
		return children.length;
	},
	only: function only(children) {
		children = Children.toArray(children);
		if (children.length !== 1) throw new Error('Children.only() expects only one child.');
		return children[0];
	},
	toArray: function toArray(children) {
		return Array.isArray && Array.isArray(children) ? children : ARR.concat(children);
	}
};

var currentComponent = void 0;

function createFactory(type) {
	return createElement.bind(null, type);
}

var DOM = {};
for (var i = ELEMENTS.length; i--;) {
	DOM[ELEMENTS[i]] = createFactory(ELEMENTS[i]);
}

function upgradeToVNodes(arr, offset) {
	for (var _i = offset || 0; _i < arr.length; _i++) {
		var obj = arr[_i];
		if (Array.isArray(obj)) {
			upgradeToVNodes(obj);
		} else if (obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && !isValidElement(obj) && (obj.props && obj.type || obj.attributes && obj.nodeName || obj.children)) {
			arr[_i] = createElement(obj.type || obj.nodeName, obj.props || obj.attributes, obj.children);
		}
	}
}

function isStatelessComponent(c) {
	return typeof c === 'function' && !(c.prototype && c.prototype.render);
}

var COMPONENT_WRAPPER_KEY = typeof Symbol !== 'undefined' ? Symbol.for('__preactCompatWrapper') : '__preactCompatWrapper';

function wrapStatelessComponent(WrappedComponent) {
	return function StatelessComponent(props, context) {
		propsHook.call(WrappedComponent, props, context);
		return WrappedComponent(props, context);
	};
}

function statelessComponentHook(Ctor) {
	var Wrapped = Ctor[COMPONENT_WRAPPER_KEY];
	if (Wrapped) return Wrapped === true ? Ctor : Wrapped;

	Wrapped = wrapStatelessComponent(Ctor);

	Object.defineProperty(Wrapped, COMPONENT_WRAPPER_KEY, { configurable: true, value: true });
	Wrapped.displayName = Ctor.displayName;
	Wrapped.propTypes = Ctor.propTypes;
	Wrapped.defaultProps = Ctor.defaultProps;

	Object.defineProperty(Ctor, COMPONENT_WRAPPER_KEY, { configurable: true, value: Wrapped });

	return Wrapped;
}

function createElement() {
	for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		args[_key] = arguments[_key];
	}

	upgradeToVNodes(args, 2);
	return normalizeVNode(h.apply(undefined, args));
}

function normalizeVNode(vnode) {
	applyClassName(vnode);

	if (isStatelessComponent(vnode.nodeName)) {
		vnode.nodeName = statelessComponentHook(vnode.nodeName);
	}

	var ref = vnode.attributes && vnode.attributes.ref,
	    type = ref && (typeof ref === 'undefined' ? 'undefined' : _typeof(ref));
	if (currentComponent && (type === 'string' || type === 'number')) {
		vnode.attributes.ref = createStringRefProxy(ref, currentComponent);
	}

	applyEventNormalization(vnode);

	return vnode;
}

function isValidElement(element) {
	return element && (element instanceof VNode || element.$$typeof === REACT_ELEMENT_TYPE);
}

function createStringRefProxy(name, component) {
	return component._refProxies[name] || (component._refProxies[name] = function (resolved) {
		if (component && component.refs) {
			component.refs[name] = resolved;
			if (resolved === null) {
				delete component._refProxies[name];
				component = null;
			}
		}
	});
}

function applyEventNormalization(_ref) {
	var nodeName = _ref.nodeName;
	var attributes = _ref.attributes;

	if (!attributes || typeof nodeName !== 'string') return;
	var props = {};
	for (var _i2 in attributes) {
		props[_i2.toLowerCase()] = _i2;
	}
	if (props.onchange) {
		nodeName = nodeName.toLowerCase();
		var attr = nodeName === 'input' && String(attributes.type).toLowerCase() === 'checkbox' ? 'onclick' : 'oninput',
		    normalized = props[attr] || attr;
		if (!attributes[normalized]) {
			attributes[normalized] = multihook(attributes[props[attr]], attributes[props.onchange]);
		}
	}
}

function applyClassName(_ref2) {
	var attributes = _ref2.attributes;

	if (!attributes) return;
	var cl = attributes.className || attributes.class;
	if (cl) attributes.className = cl;
}

function extend(base, props, all) {
	for (var key in props) {
		if (all === true || props[key] != null) {
			base[key] = props[key];
		}
	}
	return base;
}

function F() {}

function collateMixins(mixins) {
	var keyed = {};
	for (var _i3 = 0; _i3 < mixins.length; _i3++) {
		var mixin = mixins[_i3];
		for (var key in mixin) {
			if (mixin.hasOwnProperty(key) && typeof mixin[key] === 'function') {
				(keyed[key] || (keyed[key] = [])).push(mixin[key]);
			}
		}
	}
	return keyed;
}

function applyMixins(inst, mixins) {
	for (var key in mixins) {
		if (mixins.hasOwnProperty(key)) {
			inst[key] = multihook.apply(undefined, toConsumableArray(mixins[key].concat(inst[key] || key)));
		}
	}
}

function bindAll(ctx) {
	for (var _i4 in ctx) {
		var v = ctx[_i4];
		if (typeof v === 'function' && !v.__bound && !AUTOBIND_BLACKLIST.hasOwnProperty(_i4)) {
			(ctx[_i4] = v.bind(ctx)).__bound = true;
		}
	}
}

function callMethod(ctx, m, args) {
	if (typeof m === 'string') {
		m = ctx.constructor.prototype[m];
	}
	if (typeof m === 'function') {
		return m.apply(ctx, args);
	}
}

function multihook() {
	var hooks = arguments;
	return function () {
		var ret = void 0;
		for (var _i5 = 0; _i5 < hooks.length; _i5++) {
			var r = callMethod(this, hooks[_i5], arguments);
			if (r !== undefined) ret = r;
		}
		return ret;
	};
}

function newComponentHook(props, context) {
	propsHook.call(this, props, context);
	this.componentWillReceiveProps = multihook(propsHook, this.componentWillReceiveProps || 'componentWillReceiveProps');
	this.render = multihook(propsHook, beforeRender, this.render || 'render', afterRender);
}

function propsHook(props, context) {
	if (!props) return;

	var c = props.children;
	if (Array.isArray(c) && c.length === 1) {
		props.children = c[0];

		if (props.children && _typeof(props.children) === 'object') {
			props.children.length = 1;
			props.children[0] = props.children;
		}
	}

	if (DEV) {
		var ctor = typeof this === 'function' ? this : this.constructor,
		    propTypes = this.propTypes || ctor.propTypes;
		if (propTypes) {
			for (var prop in propTypes) {
				if (propTypes.hasOwnProperty(prop) && typeof propTypes[prop] === 'function') {
					var displayName = this.displayName || ctor.name;
					var err = propTypes[prop](props, prop, displayName, 'prop');
					if (err) console.error(new Error(err.message || err));
				}
			}
		}
	}
}

function beforeRender(props) {
	currentComponent = this;
}

function afterRender() {
	if (currentComponent === this) {
		currentComponent = null;
	}
}

function Component$$1(props, context, opts) {
	Component$1.call(this, props, context);
	this.refs = {};
	this._refProxies = {};
	if (opts !== BYPASS_HOOK) {
		newComponentHook.call(this, props, context);
	}
}
Component$$1.prototype = new Component$1();
extend(Component$$1.prototype, {
	constructor: Component$$1,

	isReactComponent: {},

	getDOMNode: function getDOMNode() {
		return this.base;
	},
	isMounted: function isMounted() {
		return !!this.base;
	}
});

var styles = __$styleInject("/* Comment palette*/\n\n._count_m2a02_3 {\n    font-weight: bold;\n    color: #767676;\n}\n",{"count":"_count_m2a02_3"});

var CommentCount = function CommentCount(_ref) {
    var count = _ref.count;

    if (count) {
        return createElement(
            "h2",
            { className: "container__meta__title" },
            "comments ",
            createElement(
                "span",
                { className: styles.count },
                "(",
                count,
                ")"
            )
        );
    } else {
        return createElement(
            "h2",
            { className: "container__meta__title" },
            "comments"
        );
    }
};

var styleHelpers = __$styleInject("/* Comment palette*/\n\n._underline_1lj47_3 {\n    text-decoration: none !important;\n    border-bottom: 1px solid #dcdcdc;\n    transition: border-color 0.15s ease-out;\n}\n\n._underline_1lj47_3:hover, ._underline_1lj47_3:focus {\n    border-color: #6e99b3;\n}\n\n._underline_1lj47_3:active {\n    border-color: #4bc6df;\n}\n\n._error_1lj47_18 {\n    margin-top: 0.5rem;\n    color: #d61d00;\n}\n\n._borderBox_1lj47_23 {\n    box-sizing: border-box;\n}\n",{"underline":"_underline_1lj47_3","error":"_error_1lj47_18","borderBox":"_borderBox_1lj47_23"});

var styles$1 = __$styleInject("/* Comment palette*/\n\n._container_tywwu_6 {\n    font-family: \"Guardian Text Sans Web\",\"Helvetica Neue\",Helvetica,Arial,\"Lucida Grande\",sans-serif;\n}\n\n@media (min-width: 980px) {\n    ._container_tywwu_6 {\n        width: 160px;\n    }\n}\n\n._author_tywwu_16 {\n    font-size: 0.875rem;\n    line-height: 1.375rem;\n\n    overflow: hidden;\n    padding-right: 0.3125rem;\n    font-weight: bold;\n    text-overflow: ellipsis;\n}\n\n@media (min-width: 740px) {\n    ._author_tywwu_16 {\n        display: block;\n    }\n}\n\n._label_tywwu_31 {\n    font-size: 0.875rem;\n    line-height: 1.375rem;\n\n    color: #767676;\n}\n\n._avatarWrapper_tywwu_37 {\n    margin-right: 0.5rem;\n    margin-top: 0.125rem;\n}\n\n@media (max-width: 740px) {\n    ._avatarWrapper_tywwu_37 {\n        display: none;\n    }\n}\n\n@media (max-width: 980px) {\n    ._avatarWrapper_tywwu_37 {\n        float: left;\n    }\n}\n\n._avatarImage_tywwu_54 {\n    width: 36px;\n    height: 36px;\n    border-radius: 1000px;\n}\n\n@media (min-width: 980px) {\n    ._avatarImage_tywwu_54 {\n        width: 60px;\n        height: 60px;\n    }\n}\n",{"container":"_container_tywwu_6","author":"_author_tywwu_16","label":"_label_tywwu_31","avatarWrapper":"_avatarWrapper_tywwu_37","avatarImage":"_avatarImage_tywwu_54"});

function join() {
    for (var _len = arguments.length, paths = Array(_len), _key = 0; _key < _len; _key++) {
        paths[_key] = arguments[_key];
    }

    return paths.join('/').replace(/([^:])\/+/g, '$1/');
}

var Avatar = function Avatar(_ref) {
    var avatarImagesHost = _ref.avatarImagesHost;
    var displayName = _ref.displayName;
    var userId = _ref.userId;

    var avatarSrc = join(avatarImagesHost, 'user/', userId || 'undefined');

    return createElement(
        'div',
        { className: styles$1.container },
        createElement(
            'span',
            { className: styles$1.avatarWrapper },
            createElement('img', { className: styles$1.avatarImage, alt: '', src: avatarSrc })
        ),
        createElement(
            'div',
            { className: styleHelpers.borderBox },
            createElement(
                'span',
                { className: styles$1.label },
                'Signed in as'
            ),
            ' ',
            createElement(
                'span',
                { className: styles$1.author },
                displayName
            )
        )
    );
};

var Identity = function Identity(_ref) {
    var anonymous = _ref.anonymous;
    var avatarImagesHost = _ref.avatarImagesHost;
    var closed = _ref.closed;
    var loading = _ref.loading;
    var profile = _ref.profile;
    var profileUrl = _ref.profileUrl;
    var profileClientId = _ref.profileClientId;

    if (loading) {
        return null;
    } else if (anonymous || !profile) {
        var signIn = profileUrl + '/signin?INTCMP=DOTCOM_COMMENTS_SIGNIN' + (profileClientId ? '&clientId=' + profileClientId : '');
        var register = profileUrl + '/register?INTCMP=DOTCOM_COMMENTS_REG' + (profileClientId ? '&clientId=' + profileClientId : '');
        return createElement(
            'p',
            { className: 'container__meta__item' },
            createElement(
                'a',
                { className: styleHelpers.underline, href: signIn },
                'Sign in'
            ),
            ' ',
            'or',
            ' ',
            createElement(
                'a',
                { className: styleHelpers.underline, href: register },
                'create your Guardian account'
            ),
            ' ',
            'to join the discussion.'
        );
    } else if (closed) {
        return createElement(
            'p',
            { className: 'container__meta__item' },
            'This discussion is closed for comments.'
        );
    } else if ((profile.privateFields || {}).canPostComment === false) {
        return createElement(
            'p',
            { className: ['container__meta__item', styleHelpers.error].join(' ') },
            'Commenting has been disabled for this account (',
            createElement(
                'a',
                { href: '/community-faqs#321a' },
                'why?'
            ),
            ')'
        );
    } else {
        return createElement(Avatar, { avatarImagesHost: avatarImagesHost, userId: profile.userId, displayName: profile.displayName });
    }
};

var DiscussionView = function DiscussionView(_ref) {
    var anonymous = _ref.anonymous;
    var avatarImagesHost = _ref.avatarImagesHost;
    var children = _ref.children;
    var closed = _ref.closed;
    var commentsCount = _ref.commentsCount;
    var loading = _ref.loading;
    var profile = _ref.profile;
    var profileUrl = _ref.profileUrl;
    var profileClientId = _ref.profileClientId;

    return createElement(
        'div',
        { className: 'container__meta' },
        createElement(CommentCount, { count: commentsCount }),
        createElement(Identity, {
            anonymous: anonymous,
            avatarImagesHost: avatarImagesHost,
            closed: closed,
            loading: loading,
            profile: profile,
            profileUrl: profileUrl,
            profileClientId: profileClientId
        }),
        children
    );
};

var index$2 = createCommonjsModule(function (module) {
function E() {}

E.prototype = {
  on: function on(name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function once(name, callback, ctx) {
    var self = this;
    function listener() {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    }

    listener._ = callback;
    return this.on(name, listener, ctx);
  },

  emit: function emit(name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function off(name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback) liveEvents.push(evts[i]);
      }
    }

    liveEvents.length ? e[name] = liveEvents : delete e[name];

    return this;
  }
};

module.exports = E;
});

var mediator = new index$2();

var Discussion = function (_React$Component) {
    inherits(Discussion, _React$Component);

    function Discussion(props) {
        classCallCheck(this, Discussion);

        var _this = possibleConstructorReturn(this, (Discussion.__proto__ || Object.getPrototypeOf(Discussion)).call(this, props));

        _this.state = {
            anonymous: true,
            commentsCount: 0,
            loading: true,
            profile: null
        };
        _this.api = _this.props.api;
        return _this;
    }

    createClass$1(Discussion, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.getCommentCount();
            this.getUser();
        }
    }, {
        key: 'getCommentCount',
        value: function getCommentCount() {
            var _this2 = this;

            var id = this.props.id;


            this.api.commentCount(id).then(function (counts) {
                var value = counts[id] || 0;
                _this2.setState({ commentsCount: value }, function () {
                    mediator.emit('comment-count', value);
                });
            });
        }
    }, {
        key: 'getUser',
        value: function getUser() {
            var _this3 = this;

            var _props = this.props;
            var user$$1 = _props.user;
            var userFromCookie = _props.userFromCookie;

            if (userFromCookie) {
                this.api.userProfile().then(function (profile) {
                    _this3.setState({ profile: profile, anonymous: false, loading: false });
                });
            } else if (user$$1) {
                this.setState({ profile: user$$1, anonymous: false, loading: false });
            } else {
                this.setState({ anonymous: true, loading: false });
            }
        }
    }, {
        key: 'whenLoaded',
        value: function whenLoaded(condition, component) {
            if (condition && this.state.loading === false) {
                return component;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props;
            var avatarImagesHost = _props2.avatarImagesHost;
            var id = _props2.id;
            var closed = _props2.closed;
            var profileUrl = _props2.profileUrl;
            var profileClientId = _props2.profileClientId;


            return createElement(DiscussionView, _extends({}, this.state, {
                avatarImagesHost: avatarImagesHost,
                id: id,
                closed: closed,
                profileUrl: profileUrl,
                profileClientId: profileClientId
            }));
        }
    }]);
    return Discussion;
}(Component$$1);

(function (self) {
  'use strict';

  if (self.fetch) {
    return;
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && function () {
      try {
        new Blob();
        return true;
      } catch (e) {
        return false;
      }
    }(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name');
    }
    return name.toLowerCase();
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value;
  }

  function iteratorFor(items) {
    var iterator = {
      next: function next() {
        var value = items.shift();
        return { done: value === undefined, value: value };
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function () {
        return iterator;
      };
    }

    return iterator;
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function (value, name) {
        this.append(name, value);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function (name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function (name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var list = this.map[name];
    if (!list) {
      list = [];
      this.map[name] = list;
    }
    list.push(value);
  };

  Headers.prototype['delete'] = function (name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function (name) {
    var values = this.map[normalizeName(name)];
    return values ? values[0] : null;
  };

  Headers.prototype.getAll = function (name) {
    return this.map[normalizeName(name)] || [];
  };

  Headers.prototype.has = function (name) {
    return this.map.hasOwnProperty(normalizeName(name));
  };

  Headers.prototype.set = function (name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)];
  };

  Headers.prototype.forEach = function (callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function (name) {
      this.map[name].forEach(function (value) {
        callback.call(thisArg, value, name, this);
      }, this);
    }, this);
  };

  Headers.prototype.keys = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push(name);
    });
    return iteratorFor(items);
  };

  Headers.prototype.values = function () {
    var items = [];
    this.forEach(function (value) {
      items.push(value);
    });
    return iteratorFor(items);
  };

  Headers.prototype.entries = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items);
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'));
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function (resolve, reject) {
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function () {
        reject(reader.error);
      };
    });
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    return fileReaderReady(reader);
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    reader.readAsText(blob);
    return fileReaderReady(reader);
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function (body) {
      this._bodyInit = body;
      if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (!body) {
        this._bodyText = '';
      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {} else {
        throw new Error('unsupported BodyInit type');
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function () {
        var rejected = consumed(this);
        if (rejected) {
          return rejected;
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob);
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob');
        } else {
          return Promise.resolve(new Blob([this._bodyText]));
        }
      };

      this.arrayBuffer = function () {
        return this.blob().then(readBlobAsArrayBuffer);
      };

      this.text = function () {
        var rejected = consumed(this);
        if (rejected) {
          return rejected;
        }

        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob);
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text');
        } else {
          return Promise.resolve(this._bodyText);
        }
      };
    } else {
      this.text = function () {
        var rejected = consumed(this);
        return rejected ? rejected : Promise.resolve(this._bodyText);
      };
    }

    if (support.formData) {
      this.formData = function () {
        return this.text().then(decode);
      };
    }

    this.json = function () {
      return this.text().then(JSON.parse);
    };

    return this;
  }

  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method;
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;
    if (Request.prototype.isPrototypeOf(input)) {
      if (input.bodyUsed) {
        throw new TypeError('Already read');
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      if (!body) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = input;
    }

    this.credentials = options.credentials || this.credentials || 'omit';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests');
    }
    this._initBody(body);
  }

  Request.prototype.clone = function () {
    return new Request(this);
  };

  function decode(body) {
    var form = new FormData();
    body.trim().split('&').forEach(function (bytes) {
      if (bytes) {
        var split = bytes.split('=');
        var name = split.shift().replace(/\+/g, ' ');
        var value = split.join('=').replace(/\+/g, ' ');
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
    return form;
  }

  function headers(xhr) {
    var head = new Headers();
    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n');
    pairs.forEach(function (header) {
      var split = header.trim().split(':');
      var key = split.shift().trim();
      var value = split.join(':').trim();
      head.append(key, value);
    });
    return head;
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = options.statusText;
    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function () {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    });
  };

  Response.error = function () {
    var response = new Response(null, { status: 0, statusText: '' });
    response.type = 'error';
    return response;
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function (url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code');
    }

    return new Response(null, { status: status, headers: { location: url } });
  };

  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;

  self.fetch = function (input, init) {
    return new Promise(function (resolve, reject) {
      var request;
      if (Request.prototype.isPrototypeOf(input) && !init) {
        request = input;
      } else {
        request = new Request(input, init);
      }

      var xhr = new XMLHttpRequest();

      function responseURL() {
        if ('responseURL' in xhr) {
          return xhr.responseURL;
        }

        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
          return xhr.getResponseHeader('X-Request-URL');
        }

        return;
      }

      xhr.onload = function () {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: headers(xhr),
          url: responseURL()
        };
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function () {
        reject(new TypeError('Network request failed'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function (value, name) {
        xhr.setRequestHeader(name, value);
      });

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    });
  };
  self.fetch.polyfill = true;
})(typeof self !== 'undefined' ? self : undefined);

function inject(Promise) {
    function json(path) {
        return fetch(path, {
            mode: 'cors'
        }).then(function (resp) {
            return resp.ok ? resp.json() : Promise.reject(new Error('fetch error: ' + resp.statusText));
        });
    }

    function jsonp(path) {
        return new Promise(function (resolve, reject) {
            var jsonpCallback = 'jp_' + Math.floor(Math.random() * 100) + new Date().getTime();
            var jsonpPath = [path, 'callback=' + jsonpCallback].join(path.indexOf('?') === -1 ? '?' : '&');
            window[jsonpCallback] = resolve;
            var script = document.createElement('script');
            script.src = jsonpPath;
            script.onerror = function () {
                reject(new Error('JSONP network error on ' + jsonpPath));
            };
            document.head.appendChild(script);
        });
    }

    return { json: json, jsonp: jsonp };
}

function create$1(_ref) {
    var apiHost = _ref.apiHost;
    var net = _ref.net;
    var Promise = _ref.Promise;

    var defaultNet = inject(Promise);
    var _net$json = net.json;
    var json = _net$json === undefined ? defaultNet.json : _net$json;
    var _net$jsonp = net.jsonp;
    var jsonp = _net$jsonp === undefined ? defaultNet.jsonp : _net$jsonp;


    function commentCount() {
        for (var _len = arguments.length, ids = Array(_len), _key = 0; _key < _len; _key++) {
            ids[_key] = arguments[_key];
        }

        var url = join(apiHost, 'getCommentCounts' + '?short-urls=' + ids.join(','));
        return json(url).catch(function (ex) {
            mediator.emit('error', 'comments-count', ex);
            throw ex;
        });
    }

    function userProfile() {
        var id = arguments.length <= 0 || arguments[0] === undefined ? 'me' : arguments[0];

        var url = join(apiHost, '/profile/' + id);
        return jsonp(url).then(function (response) {
            if (response.status !== 'ok') {
                throw new Error('Invalid user profile status: ' + response.status);
            } else {
                return response.userProfile;
            }
        }).catch(function (ex) {
            mediator.emit('error', 'user-profile', ex);
            throw ex;
        });
    }

    return {
        commentCount: commentCount,
        userProfile: userProfile
    };
}

function create$$1(_ref) {
    var apiHost = _ref.apiHost;
    var avatarImagesHost = _ref.avatarImagesHost;
    var closed = _ref.closed;
    var discussionId = _ref.discussionId;
    var element = _ref.element;
    var _ref$net = _ref.net;
    var net = _ref$net === undefined ? {} : _ref$net;
    var profileUrl = _ref.profileUrl;
    var profileClientId = _ref.profileClientId;
    var user = _ref.user;
    var userFromCookie = _ref.userFromCookie;
    var _ref$Promise = _ref.Promise;
    var Promise = _ref$Promise === undefined ? window.Promise : _ref$Promise;

    var api = create$1({ apiHost: apiHost, net: net, Promise: Promise });

    var component = createElement(Discussion, {
        id: discussionId,
        api: api,
        avatarImagesHost: avatarImagesHost,
        profileUrl: profileUrl,
        profileClientId: profileClientId,
        closed: closed,
        user: user,
        userFromCookie: userFromCookie
    });

    return new Promise(function (resolve) {
        render$1(component, element, function () {
            return resolve(mediator);
        });
    });
}

return create$$1;

});
//# sourceMappingURL=discussion-frontend.preact.amd.js.map
