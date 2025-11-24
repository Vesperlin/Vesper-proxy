"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // src/adapter/renderer.ts
  function getRendererByVNodeId(renderers, id) {
    for (const r3 of renderers.values()) {
      if (r3.getVNodeById(id) !== null)
        return r3;
    }
    return null;
  }

  // src/shells/shared/utils.ts
  function debounce(callback, wait) {
    let timeout = null;
    return (...args) => {
      const next = () => callback(...args);
      clearTimeout(timeout);
      timeout = setTimeout(next, wait);
    };
  }
  function throttle(callback, wait) {
    let running = false;
    return (...args) => {
      if (!running) {
        callback(...args);
        running = true;
        setTimeout(() => {
          running = false;
          callback(...args);
        }, wait);
      }
    };
  }
  function copyToClipboard(text) {
    const dom = document.createElement("textarea");
    dom.textContent = text;
    document.body.appendChild(dom);
    dom.select();
    document.execCommand("copy");
    dom.blur();
    document.body.removeChild(dom);
  }

  // src/adapter/adapter/picker.ts
  function createPicker(window2, renderers, onHover, onStop) {
    let picking = false;
    let lastId = -1;
    let lastTarget = null;
    function clicker(e4) {
      e4.preventDefault();
      e4.stopPropagation();
      stop();
    }
    function listener(e4) {
      e4.preventDefault();
      e4.stopPropagation();
      if (picking && e4.target != null && lastTarget !== e4.target) {
        let id = lastId;
        for (const r3 of renderers.values()) {
          id = r3.findVNodeIdForDom(e4.target);
          if (id > -1 && lastId !== id) {
            onHover(id);
            break;
          }
        }
        lastTarget = e4.target;
        lastId = id;
      }
    }
    function onMouseEvent(e4) {
      e4.preventDefault();
      e4.stopPropagation();
    }
    const onScroll = debounce(() => {
      onHover(-1);
      lastId = -1;
      lastTarget = null;
    }, 16);
    function start() {
      if (!picking) {
        lastId = -1;
        picking = true;
        window2.addEventListener("mousedown", onMouseEvent, true);
        window2.addEventListener("mousemove", listener, true);
        window2.addEventListener("mouseup", onMouseEvent, true);
        window2.addEventListener("click", clicker, true);
        document.addEventListener("scroll", onScroll, true);
      }
    }
    function stop() {
      if (picking) {
        lastId = -1;
        picking = false;
        onStop();
        window2.removeEventListener("mousedown", onMouseEvent, true);
        window2.removeEventListener("mousemove", listener, true);
        window2.removeEventListener("mouseup", onMouseEvent, true);
        window2.removeEventListener("click", clicker, true);
        document.removeEventListener("scroll", onScroll);
      }
    }
    return { start, stop };
  }

  // node_modules/preact/dist/preact.module.js
  var n;
  var l;
  var t;
  var u;
  var i;
  var r;
  var o;
  var e;
  var f;
  var c;
  var s;
  var a;
  var h;
  var p = {};
  var v = [];
  var y = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  var d = Array.isArray;
  function w(n3, l5) {
    for (var t5 in l5)
      n3[t5] = l5[t5];
    return n3;
  }
  function g(n3) {
    n3 && n3.parentNode && n3.parentNode.removeChild(n3);
  }
  function _(l5, t5, u4) {
    var i4, r3, o4, e4 = {};
    for (o4 in t5)
      "key" == o4 ? i4 = t5[o4] : "ref" == o4 ? r3 = t5[o4] : e4[o4] = t5[o4];
    if (arguments.length > 2 && (e4.children = arguments.length > 3 ? n.call(arguments, 2) : u4), "function" == typeof l5 && null != l5.defaultProps)
      for (o4 in l5.defaultProps)
        void 0 === e4[o4] && (e4[o4] = l5.defaultProps[o4]);
    return m(l5, e4, i4, r3, null);
  }
  function m(n3, u4, i4, r3, o4) {
    var e4 = { type: n3, props: u4, key: i4, ref: r3, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o4 ? ++t : o4, __i: -1, __u: 0 };
    return null == o4 && null != l.vnode && l.vnode(e4), e4;
  }
  function k(n3) {
    return n3.children;
  }
  function x(n3, l5) {
    this.props = n3, this.context = l5;
  }
  function S(n3, l5) {
    if (null == l5)
      return n3.__ ? S(n3.__, n3.__i + 1) : null;
    for (var t5; l5 < n3.__k.length; l5++)
      if (null != (t5 = n3.__k[l5]) && null != t5.__e)
        return t5.__e;
    return "function" == typeof n3.type ? S(n3) : null;
  }
  function C(n3) {
    var l5, t5;
    if (null != (n3 = n3.__) && null != n3.__c) {
      for (n3.__e = n3.__c.base = null, l5 = 0; l5 < n3.__k.length; l5++)
        if (null != (t5 = n3.__k[l5]) && null != t5.__e) {
          n3.__e = n3.__c.base = t5.__e;
          break;
        }
      return C(n3);
    }
  }
  function M(n3) {
    (!n3.__d && (n3.__d = true) && i.push(n3) && !$.__r++ || r !== l.debounceRendering) && ((r = l.debounceRendering) || o)($);
  }
  function $() {
    for (var n3, t5, u4, r3, o4, f4, c4, s5 = 1; i.length; )
      i.length > s5 && i.sort(e), n3 = i.shift(), s5 = i.length, n3.__d && (u4 = void 0, o4 = (r3 = (t5 = n3).__v).__e, f4 = [], c4 = [], t5.__P && ((u4 = w({}, r3)).__v = r3.__v + 1, l.vnode && l.vnode(u4), O(t5.__P, u4, r3, t5.__n, t5.__P.namespaceURI, 32 & r3.__u ? [o4] : null, f4, null == o4 ? S(r3) : o4, !!(32 & r3.__u), c4), u4.__v = r3.__v, u4.__.__k[u4.__i] = u4, z(f4, u4, c4), u4.__e != o4 && C(u4)));
    $.__r = 0;
  }
  function I(n3, l5, t5, u4, i4, r3, o4, e4, f4, c4, s5) {
    var a4, h4, y4, d4, w4, g3, _4 = u4 && u4.__k || v, m4 = l5.length;
    for (f4 = P(t5, l5, _4, f4, m4), a4 = 0; a4 < m4; a4++)
      null != (y4 = t5.__k[a4]) && (h4 = -1 === y4.__i ? p : _4[y4.__i] || p, y4.__i = a4, g3 = O(n3, y4, h4, i4, r3, o4, e4, f4, c4, s5), d4 = y4.__e, y4.ref && h4.ref != y4.ref && (h4.ref && q(h4.ref, null, y4), s5.push(y4.ref, y4.__c || d4, y4)), null == w4 && null != d4 && (w4 = d4), 4 & y4.__u || h4.__k === y4.__k ? f4 = A(y4, f4, n3) : "function" == typeof y4.type && void 0 !== g3 ? f4 = g3 : d4 && (f4 = d4.nextSibling), y4.__u &= -7);
    return t5.__e = w4, f4;
  }
  function P(n3, l5, t5, u4, i4) {
    var r3, o4, e4, f4, c4, s5 = t5.length, a4 = s5, h4 = 0;
    for (n3.__k = new Array(i4), r3 = 0; r3 < i4; r3++)
      null != (o4 = l5[r3]) && "boolean" != typeof o4 && "function" != typeof o4 ? (f4 = r3 + h4, (o4 = n3.__k[r3] = "string" == typeof o4 || "number" == typeof o4 || "bigint" == typeof o4 || o4.constructor == String ? m(null, o4, null, null, null) : d(o4) ? m(k, { children: o4 }, null, null, null) : void 0 === o4.constructor && o4.__b > 0 ? m(o4.type, o4.props, o4.key, o4.ref ? o4.ref : null, o4.__v) : o4).__ = n3, o4.__b = n3.__b + 1, e4 = null, -1 !== (c4 = o4.__i = L(o4, t5, f4, a4)) && (a4--, (e4 = t5[c4]) && (e4.__u |= 2)), null == e4 || null === e4.__v ? (-1 == c4 && (i4 > s5 ? h4-- : i4 < s5 && h4++), "function" != typeof o4.type && (o4.__u |= 4)) : c4 != f4 && (c4 == f4 - 1 ? h4-- : c4 == f4 + 1 ? h4++ : (c4 > f4 ? h4-- : h4++, o4.__u |= 4))) : n3.__k[r3] = null;
    if (a4)
      for (r3 = 0; r3 < s5; r3++)
        null != (e4 = t5[r3]) && 0 == (2 & e4.__u) && (e4.__e == u4 && (u4 = S(e4)), B(e4, e4));
    return u4;
  }
  function A(n3, l5, t5) {
    var u4, i4;
    if ("function" == typeof n3.type) {
      for (u4 = n3.__k, i4 = 0; u4 && i4 < u4.length; i4++)
        u4[i4] && (u4[i4].__ = n3, l5 = A(u4[i4], l5, t5));
      return l5;
    }
    n3.__e != l5 && (l5 && n3.type && !t5.contains(l5) && (l5 = S(n3)), t5.insertBefore(n3.__e, l5 || null), l5 = n3.__e);
    do {
      l5 = l5 && l5.nextSibling;
    } while (null != l5 && 8 == l5.nodeType);
    return l5;
  }
  function L(n3, l5, t5, u4) {
    var i4, r3, o4 = n3.key, e4 = n3.type, f4 = l5[t5];
    if (null === f4 && null == n3.key || f4 && o4 == f4.key && e4 === f4.type && 0 == (2 & f4.__u))
      return t5;
    if (u4 > (null != f4 && 0 == (2 & f4.__u) ? 1 : 0))
      for (i4 = t5 - 1, r3 = t5 + 1; i4 >= 0 || r3 < l5.length; ) {
        if (i4 >= 0) {
          if ((f4 = l5[i4]) && 0 == (2 & f4.__u) && o4 == f4.key && e4 === f4.type)
            return i4;
          i4--;
        }
        if (r3 < l5.length) {
          if ((f4 = l5[r3]) && 0 == (2 & f4.__u) && o4 == f4.key && e4 === f4.type)
            return r3;
          r3++;
        }
      }
    return -1;
  }
  function T(n3, l5, t5) {
    "-" == l5[0] ? n3.setProperty(l5, null == t5 ? "" : t5) : n3[l5] = null == t5 ? "" : "number" != typeof t5 || y.test(l5) ? t5 : t5 + "px";
  }
  function j(n3, l5, t5, u4, i4) {
    var r3;
    n:
      if ("style" == l5)
        if ("string" == typeof t5)
          n3.style.cssText = t5;
        else {
          if ("string" == typeof u4 && (n3.style.cssText = u4 = ""), u4)
            for (l5 in u4)
              t5 && l5 in t5 || T(n3.style, l5, "");
          if (t5)
            for (l5 in t5)
              u4 && t5[l5] === u4[l5] || T(n3.style, l5, t5[l5]);
        }
      else if ("o" == l5[0] && "n" == l5[1])
        r3 = l5 != (l5 = l5.replace(f, "$1")), l5 = l5.toLowerCase() in n3 || "onFocusOut" == l5 || "onFocusIn" == l5 ? l5.toLowerCase().slice(2) : l5.slice(2), n3.l || (n3.l = {}), n3.l[l5 + r3] = t5, t5 ? u4 ? t5.t = u4.t : (t5.t = c, n3.addEventListener(l5, r3 ? a : s, r3)) : n3.removeEventListener(l5, r3 ? a : s, r3);
      else {
        if ("http://www.w3.org/2000/svg" == i4)
          l5 = l5.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if ("width" != l5 && "height" != l5 && "href" != l5 && "list" != l5 && "form" != l5 && "tabIndex" != l5 && "download" != l5 && "rowSpan" != l5 && "colSpan" != l5 && "role" != l5 && "popover" != l5 && l5 in n3)
          try {
            n3[l5] = null == t5 ? "" : t5;
            break n;
          } catch (n4) {
          }
        "function" == typeof t5 || (null == t5 || false === t5 && "-" != l5[4] ? n3.removeAttribute(l5) : n3.setAttribute(l5, "popover" == l5 && 1 == t5 ? "" : t5));
      }
  }
  function F(n3) {
    return function(t5) {
      if (this.l) {
        var u4 = this.l[t5.type + n3];
        if (null == t5.u)
          t5.u = c++;
        else if (t5.u < u4.t)
          return;
        return u4(l.event ? l.event(t5) : t5);
      }
    };
  }
  function O(n3, t5, u4, i4, r3, o4, e4, f4, c4, s5) {
    var a4, h4, p5, v5, y4, _4, m4, b2, S2, C3, M2, $2, P2, A3, H, L2, T3, j3 = t5.type;
    if (void 0 !== t5.constructor)
      return null;
    128 & u4.__u && (c4 = !!(32 & u4.__u), o4 = [f4 = t5.__e = u4.__e]), (a4 = l.__b) && a4(t5);
    n:
      if ("function" == typeof j3)
        try {
          if (b2 = t5.props, S2 = "prototype" in j3 && j3.prototype.render, C3 = (a4 = j3.contextType) && i4[a4.__c], M2 = a4 ? C3 ? C3.props.value : a4.__ : i4, u4.__c ? m4 = (h4 = t5.__c = u4.__c).__ = h4.__E : (S2 ? t5.__c = h4 = new j3(b2, M2) : (t5.__c = h4 = new x(b2, M2), h4.constructor = j3, h4.render = D), C3 && C3.sub(h4), h4.props = b2, h4.state || (h4.state = {}), h4.context = M2, h4.__n = i4, p5 = h4.__d = true, h4.__h = [], h4._sb = []), S2 && null == h4.__s && (h4.__s = h4.state), S2 && null != j3.getDerivedStateFromProps && (h4.__s == h4.state && (h4.__s = w({}, h4.__s)), w(h4.__s, j3.getDerivedStateFromProps(b2, h4.__s))), v5 = h4.props, y4 = h4.state, h4.__v = t5, p5)
            S2 && null == j3.getDerivedStateFromProps && null != h4.componentWillMount && h4.componentWillMount(), S2 && null != h4.componentDidMount && h4.__h.push(h4.componentDidMount);
          else {
            if (S2 && null == j3.getDerivedStateFromProps && b2 !== v5 && null != h4.componentWillReceiveProps && h4.componentWillReceiveProps(b2, M2), !h4.__e && (null != h4.shouldComponentUpdate && false === h4.shouldComponentUpdate(b2, h4.__s, M2) || t5.__v == u4.__v)) {
              for (t5.__v != u4.__v && (h4.props = b2, h4.state = h4.__s, h4.__d = false), t5.__e = u4.__e, t5.__k = u4.__k, t5.__k.some(function(n4) {
                n4 && (n4.__ = t5);
              }), $2 = 0; $2 < h4._sb.length; $2++)
                h4.__h.push(h4._sb[$2]);
              h4._sb = [], h4.__h.length && e4.push(h4);
              break n;
            }
            null != h4.componentWillUpdate && h4.componentWillUpdate(b2, h4.__s, M2), S2 && null != h4.componentDidUpdate && h4.__h.push(function() {
              h4.componentDidUpdate(v5, y4, _4);
            });
          }
          if (h4.context = M2, h4.props = b2, h4.__P = n3, h4.__e = false, P2 = l.__r, A3 = 0, S2) {
            for (h4.state = h4.__s, h4.__d = false, P2 && P2(t5), a4 = h4.render(h4.props, h4.state, h4.context), H = 0; H < h4._sb.length; H++)
              h4.__h.push(h4._sb[H]);
            h4._sb = [];
          } else
            do {
              h4.__d = false, P2 && P2(t5), a4 = h4.render(h4.props, h4.state, h4.context), h4.state = h4.__s;
            } while (h4.__d && ++A3 < 25);
          h4.state = h4.__s, null != h4.getChildContext && (i4 = w(w({}, i4), h4.getChildContext())), S2 && !p5 && null != h4.getSnapshotBeforeUpdate && (_4 = h4.getSnapshotBeforeUpdate(v5, y4)), L2 = a4, null != a4 && a4.type === k && null == a4.key && (L2 = N(a4.props.children)), f4 = I(n3, d(L2) ? L2 : [L2], t5, u4, i4, r3, o4, e4, f4, c4, s5), h4.base = t5.__e, t5.__u &= -161, h4.__h.length && e4.push(h4), m4 && (h4.__E = h4.__ = null);
        } catch (n4) {
          if (t5.__v = null, c4 || null != o4)
            if (n4.then) {
              for (t5.__u |= c4 ? 160 : 128; f4 && 8 == f4.nodeType && f4.nextSibling; )
                f4 = f4.nextSibling;
              o4[o4.indexOf(f4)] = null, t5.__e = f4;
            } else
              for (T3 = o4.length; T3--; )
                g(o4[T3]);
          else
            t5.__e = u4.__e, t5.__k = u4.__k;
          l.__e(n4, t5, u4);
        }
      else
        null == o4 && t5.__v == u4.__v ? (t5.__k = u4.__k, t5.__e = u4.__e) : f4 = t5.__e = V(u4.__e, t5, u4, i4, r3, o4, e4, c4, s5);
    return (a4 = l.diffed) && a4(t5), 128 & t5.__u ? void 0 : f4;
  }
  function z(n3, t5, u4) {
    for (var i4 = 0; i4 < u4.length; i4++)
      q(u4[i4], u4[++i4], u4[++i4]);
    l.__c && l.__c(t5, n3), n3.some(function(t6) {
      try {
        n3 = t6.__h, t6.__h = [], n3.some(function(n4) {
          n4.call(t6);
        });
      } catch (n4) {
        l.__e(n4, t6.__v);
      }
    });
  }
  function N(n3) {
    return "object" != typeof n3 || null == n3 ? n3 : d(n3) ? n3.map(N) : w({}, n3);
  }
  function V(t5, u4, i4, r3, o4, e4, f4, c4, s5) {
    var a4, h4, v5, y4, w4, _4, m4, b2 = i4.props, k3 = u4.props, x3 = u4.type;
    if ("svg" == x3 ? o4 = "http://www.w3.org/2000/svg" : "math" == x3 ? o4 = "http://www.w3.org/1998/Math/MathML" : o4 || (o4 = "http://www.w3.org/1999/xhtml"), null != e4) {
      for (a4 = 0; a4 < e4.length; a4++)
        if ((w4 = e4[a4]) && "setAttribute" in w4 == !!x3 && (x3 ? w4.localName == x3 : 3 == w4.nodeType)) {
          t5 = w4, e4[a4] = null;
          break;
        }
    }
    if (null == t5) {
      if (null == x3)
        return document.createTextNode(k3);
      t5 = document.createElementNS(o4, x3, k3.is && k3), c4 && (l.__m && l.__m(u4, e4), c4 = false), e4 = null;
    }
    if (null === x3)
      b2 === k3 || c4 && t5.data === k3 || (t5.data = k3);
    else {
      if (e4 = e4 && n.call(t5.childNodes), b2 = i4.props || p, !c4 && null != e4)
        for (b2 = {}, a4 = 0; a4 < t5.attributes.length; a4++)
          b2[(w4 = t5.attributes[a4]).name] = w4.value;
      for (a4 in b2)
        if (w4 = b2[a4], "children" == a4)
          ;
        else if ("dangerouslySetInnerHTML" == a4)
          v5 = w4;
        else if (!(a4 in k3)) {
          if ("value" == a4 && "defaultValue" in k3 || "checked" == a4 && "defaultChecked" in k3)
            continue;
          j(t5, a4, null, w4, o4);
        }
      for (a4 in k3)
        w4 = k3[a4], "children" == a4 ? y4 = w4 : "dangerouslySetInnerHTML" == a4 ? h4 = w4 : "value" == a4 ? _4 = w4 : "checked" == a4 ? m4 = w4 : c4 && "function" != typeof w4 || b2[a4] === w4 || j(t5, a4, w4, b2[a4], o4);
      if (h4)
        c4 || v5 && (h4.__html === v5.__html || h4.__html === t5.innerHTML) || (t5.innerHTML = h4.__html), u4.__k = [];
      else if (v5 && (t5.innerHTML = ""), I("template" === u4.type ? t5.content : t5, d(y4) ? y4 : [y4], u4, i4, r3, "foreignObject" == x3 ? "http://www.w3.org/1999/xhtml" : o4, e4, f4, e4 ? e4[0] : i4.__k && S(i4, 0), c4, s5), null != e4)
        for (a4 = e4.length; a4--; )
          g(e4[a4]);
      c4 || (a4 = "value", "progress" == x3 && null == _4 ? t5.removeAttribute("value") : void 0 !== _4 && (_4 !== t5[a4] || "progress" == x3 && !_4 || "option" == x3 && _4 !== b2[a4]) && j(t5, a4, _4, b2[a4], o4), a4 = "checked", void 0 !== m4 && m4 !== t5[a4] && j(t5, a4, m4, b2[a4], o4));
    }
    return t5;
  }
  function q(n3, t5, u4) {
    try {
      if ("function" == typeof n3) {
        var i4 = "function" == typeof n3.__u;
        i4 && n3.__u(), i4 && null == t5 || (n3.__u = n3(t5));
      } else
        n3.current = t5;
    } catch (n4) {
      l.__e(n4, u4);
    }
  }
  function B(n3, t5, u4) {
    var i4, r3;
    if (l.unmount && l.unmount(n3), (i4 = n3.ref) && (i4.current && i4.current !== n3.__e || q(i4, null, t5)), null != (i4 = n3.__c)) {
      if (i4.componentWillUnmount)
        try {
          i4.componentWillUnmount();
        } catch (n4) {
          l.__e(n4, t5);
        }
      i4.base = i4.__P = null;
    }
    if (i4 = n3.__k)
      for (r3 = 0; r3 < i4.length; r3++)
        i4[r3] && B(i4[r3], t5, u4 || "function" != typeof n3.type);
    u4 || g(n3.__e), n3.__c = n3.__ = n3.__e = void 0;
  }
  function D(n3, l5, t5) {
    return this.constructor(n3, t5);
  }
  function E(t5, u4, i4) {
    var r3, o4, e4, f4;
    u4 == document && (u4 = document.documentElement), l.__ && l.__(t5, u4), o4 = (r3 = "function" == typeof i4) ? null : i4 && i4.__k || u4.__k, e4 = [], f4 = [], O(u4, t5 = (!r3 && i4 || u4).__k = _(k, null, [t5]), o4 || p, p, u4.namespaceURI, !r3 && i4 ? [i4] : o4 ? null : u4.firstChild ? n.call(u4.childNodes) : null, e4, !r3 && i4 ? i4 : o4 ? o4.__e : u4.firstChild, r3, f4), z(e4, t5, f4);
  }
  function K(n3) {
    function l5(n4) {
      var t5, u4;
      return this.getChildContext || (t5 = /* @__PURE__ */ new Set(), (u4 = {})[l5.__c] = this, this.getChildContext = function() {
        return u4;
      }, this.componentWillUnmount = function() {
        t5 = null;
      }, this.shouldComponentUpdate = function(n5) {
        this.props.value !== n5.value && t5.forEach(function(n6) {
          n6.__e = true, M(n6);
        });
      }, this.sub = function(n5) {
        t5.add(n5);
        var l6 = n5.componentWillUnmount;
        n5.componentWillUnmount = function() {
          t5 && t5.delete(n5), l6 && l6.call(n5);
        };
      }), n4.children;
    }
    return l5.__c = "__cC" + h++, l5.__ = n3, l5.Provider = l5.__l = (l5.Consumer = function(n4, l6) {
      return n4.children(l6);
    }).contextType = l5, l5;
  }
  n = v.slice, l = { __e: function(n3, l5, t5, u4) {
    for (var i4, r3, o4; l5 = l5.__; )
      if ((i4 = l5.__c) && !i4.__)
        try {
          if ((r3 = i4.constructor) && null != r3.getDerivedStateFromError && (i4.setState(r3.getDerivedStateFromError(n3)), o4 = i4.__d), null != i4.componentDidCatch && (i4.componentDidCatch(n3, u4 || {}), o4 = i4.__d), o4)
            return i4.__E = i4;
        } catch (l6) {
          n3 = l6;
        }
    throw n3;
  } }, t = 0, u = function(n3) {
    return null != n3 && null == n3.constructor;
  }, x.prototype.setState = function(n3, l5) {
    var t5;
    t5 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = w({}, this.state), "function" == typeof n3 && (n3 = n3(w({}, t5), this.props)), n3 && w(t5, n3), null != n3 && this.__v && (l5 && this._sb.push(l5), M(this));
  }, x.prototype.forceUpdate = function(n3) {
    this.__v && (this.__e = true, n3 && this.__h.push(n3), M(this));
  }, x.prototype.render = k, i = [], o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e = function(n3, l5) {
    return n3.__v.__b - l5.__v.__b;
  }, $.__r = 0, f = /(PointerCapture)$|Capture$/i, c = 0, s = F(false), a = F(true), h = 0;

  // src/constants.ts
  var DevtoolsToClient = "preact-devtools-to-client";
  var PageHookName = "preact-page-hook";
  var PROFILE_RELOAD = "preact-devtools_profile-and-reload";
  var STATS_RELOAD = "preact-devtools_stats-and-reload";

  // src/adapter/dom.ts
  function getNearestElement(dom) {
    return dom.nodeType === 3 /* Text */ ? dom.parentNode : dom;
  }
  function px2Int(input) {
    return input ? +input.replace(/px/, "") : 0;
  }
  function measureNode(dom) {
    const s5 = window.getComputedStyle(dom);
    const r3 = dom.getBoundingClientRect();
    return {
      top: r3.top + window.scrollY,
      left: r3.left + window.scrollX,
      bounds: {
        top: r3.top + r3.height <= 0,
        bottom: r3.top >= window.innerHeight,
        left: r3.left + r3.width <= 0,
        right: r3.left >= window.innerWidth
      },
      boxSizing: s5.boxSizing,
      width: Math.round(r3.width * 100) / 100,
      height: Math.round(r3.height * 100) / 100,
      marginTop: px2Int(s5.marginTop),
      marginRight: px2Int(s5.marginRight),
      marginBottom: px2Int(s5.marginBottom),
      marginLeft: px2Int(s5.marginLeft),
      borderTop: px2Int(s5.borderTopWidth),
      borderRight: px2Int(s5.borderRightWidth),
      borderBottom: px2Int(s5.borderBottomWidth),
      borderLeft: px2Int(s5.borderLeftWidth),
      paddingTop: px2Int(s5.paddingTop),
      paddingRight: px2Int(s5.paddingRight),
      paddingBottom: px2Int(s5.paddingBottom),
      paddingLeft: px2Int(s5.paddingLeft)
    };
  }
  function mergeMeasure(a4, b2) {
    const top = Math.min(a4.top, b2.top);
    const left = Math.min(a4.left, b2.left);
    const height = Math.max(a4.top + a4.height, b2.top + b2.height) - top;
    const width = Math.max(a4.left + a4.width, b2.left + b2.width) - left;
    return {
      boxSizing: a4.boxSizing,
      top,
      left,
      bounds: {
        top: top + height <= window.scrollY,
        bottom: top >= window.scrollY + window.innerHeight,
        left: left + width <= window.scrollX,
        right: left >= window.scrollX + window.innerWidth
      },
      width,
      height,
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0,
      borderTop: 0,
      borderRight: 0,
      borderBottom: 0,
      borderLeft: 0,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0
    };
  }

  // node_modules/htm/dist/htm.module.js
  var n2 = function(t5, s5, r3, e4) {
    var u4;
    s5[0] = 0;
    for (var h4 = 1; h4 < s5.length; h4++) {
      var p5 = s5[h4++], a4 = s5[h4] ? (s5[0] |= p5 ? 1 : 2, r3[s5[h4++]]) : s5[++h4];
      3 === p5 ? e4[0] = a4 : 4 === p5 ? e4[1] = Object.assign(e4[1] || {}, a4) : 5 === p5 ? (e4[1] = e4[1] || {})[s5[++h4]] = a4 : 6 === p5 ? e4[1][s5[++h4]] += a4 + "" : p5 ? (u4 = t5.apply(a4, n2(t5, a4, r3, ["", null])), e4.push(u4), a4[0] ? s5[0] |= 2 : (s5[h4 - 2] = 0, s5[h4] = u4)) : e4.push(a4);
    }
    return e4;
  };
  var t2 = /* @__PURE__ */ new Map();
  function htm_module_default(s5) {
    var r3 = t2.get(this);
    return r3 || (r3 = /* @__PURE__ */ new Map(), t2.set(this, r3)), (r3 = n2(this, r3.get(s5) || (r3.set(s5, r3 = function(n3) {
      for (var t5, s6, r4 = 1, e4 = "", u4 = "", h4 = [0], p5 = function(n4) {
        1 === r4 && (n4 || (e4 = e4.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? h4.push(0, n4, e4) : 3 === r4 && (n4 || e4) ? (h4.push(3, n4, e4), r4 = 2) : 2 === r4 && "..." === e4 && n4 ? h4.push(4, n4, 0) : 2 === r4 && e4 && !n4 ? h4.push(5, 0, true, e4) : r4 >= 5 && ((e4 || !n4 && 5 === r4) && (h4.push(r4, 0, e4, s6), r4 = 6), n4 && (h4.push(r4, n4, 0, s6), r4 = 6)), e4 = "";
      }, a4 = 0; a4 < n3.length; a4++) {
        a4 && (1 === r4 && p5(), p5(a4));
        for (var l5 = 0; l5 < n3[a4].length; l5++)
          t5 = n3[a4][l5], 1 === r4 ? "<" === t5 ? (p5(), h4 = [h4], r4 = 3) : e4 += t5 : 4 === r4 ? "--" === e4 && ">" === t5 ? (r4 = 1, e4 = "") : e4 = t5 + e4[0] : u4 ? t5 === u4 ? u4 = "" : e4 += t5 : '"' === t5 || "'" === t5 ? u4 = t5 : ">" === t5 ? (p5(), r4 = 1) : r4 && ("=" === t5 ? (r4 = 5, s6 = e4, e4 = "") : "/" === t5 && (r4 < 5 || ">" === n3[a4][l5 + 1]) ? (p5(), 3 === r4 && (h4 = h4[0]), r4 = h4, (h4 = h4[0]).push(2, 0, r4), r4 = 0) : " " === t5 || "	" === t5 || "\n" === t5 || "\r" === t5 ? (p5(), r4 = 2) : e4 += t5), 3 === r4 && "!--" === e4 && (r4 = 4, h4 = h4[0]);
      }
      return p5(), h4;
    }(s5)), r3), arguments, [])).length > 1 ? r3 : r3[0];
  }

  // node_modules/htm/preact/index.module.js
  var m2 = htm_module_default.bind(_);

  // src/view/components/Highlighter.module-virtual.css
  var Highlighter_module_virtual_exports = {};
  __export(Highlighter_module_virtual_exports, {
    border: () => border,
    content: () => content,
    fixed: () => fixed,
    fixedBottom: () => fixedBottom,
    fixedLeft: () => fixedLeft,
    fixedRight: () => fixedRight,
    fixedTop: () => fixedTop,
    footer: () => footer,
    label: () => label,
    margin: () => margin,
    outerContainer: () => outerContainer,
    root: () => root,
    value: () => value
  });
  var fixedRight = "Gzzm1W_fixedRight";
  var fixedBottom = "Gzzm1W_fixedBottom";
  var root = "Gzzm1W_root";
  var fixedLeft = "Gzzm1W_fixedLeft";
  var border = "Gzzm1W_border";
  var fixed = "Gzzm1W_fixed";
  var content = "Gzzm1W_content";
  var label = "Gzzm1W_label";
  var value = "Gzzm1W_value";
  var margin = "Gzzm1W_margin";
  var footer = "Gzzm1W_footer";
  var fixedTop = "Gzzm1W_fixedTop";
  var outerContainer = "Gzzm1W_outerContainer";

  // src/view/components/Highlighter.tsx
  function css2Border(top, right, bottom, left) {
    return `
		border-top-width: ${top}px;
		border-right-width: ${right}px;
		border-bottom-width: ${bottom}px;
		border-left-width: ${left}px;
	`;
  }
  var style = Highlighter_module_virtual_exports;
  function Highlighter(props) {
    const {
      width,
      height,
      boxSizing,
      top,
      left,
      bounds
    } = props;
    const isOutOfBounds = bounds.bottom || bounds.left || bounds.right || bounds.top;
    return m2`<div class=${root} data-testid="highlight" style=${`top: ${top}px; left: ${left}px;`}><div class=${margin} style=${`width: ${width}px; height: ${height}px; ${css2Border(props.marginTop, props.marginRight, props.marginBottom, props.marginLeft)}`}><div class=${border} style=${css2Border(props.borderTop, props.borderRight, props.borderBottom, props.borderLeft)}><div class=${content} style=${`${css2Border(props.paddingTop, props.paddingRight, props.paddingBottom, props.paddingLeft)} ${boxSizing === "content-box" ? `height: calc(100% - ${props.paddingTop + props.paddingBottom}px); width: calc(100% - ${props.paddingLeft + props.paddingRight}px);` : ""}`}/></div></div><span class=${`${footer} ${isOutOfBounds ? fixed : ""} ${bounds.left && !bounds.right ? fixedLeft : ""} ${bounds.right ? fixedRight : ""} ${bounds.top && !bounds.bottom ? fixedTop : ""}  ${bounds.bottom ? fixedBottom : ""}`}><span class=${label} data-testid="highlighter-label">${props.label}</span> | <span class=${value}>${width}px</span> × <span class=${value}>${height}px</span></span></div>`;
  }

  // src/adapter/adapter/highlight.ts
  function createHightlighter(getRendererByVnodeId) {
    let highlightRef = null;
    function destroyHighlight() {
      if (highlightRef) {
        document.body.removeChild(highlightRef);
      }
      highlightRef = null;
    }
    function highlight(id) {
      const renderer = getRendererByVnodeId(id);
      if (!renderer) {
        return destroyHighlight();
      }
      const vnode = renderer.getVNodeById(id);
      if (!vnode) {
        return destroyHighlight();
      }
      const dom = renderer.findDomForVNode(id);
      if (dom != null) {
        if (highlightRef == null) {
          highlightRef = document.createElement("div");
          highlightRef.id = "preact-devtools-highlighter";
          highlightRef.className = style.outerContainer;
          document.body.appendChild(highlightRef);
        }
        let [first, last] = dom;
        if (first === null)
          return;
        const node = getNearestElement(first);
        const nodeEnd = last ? getNearestElement(last) : null;
        if (node != null) {
          let label2 = renderer.getDisplayName(vnode);
          const lastOpenIdx = label2.lastIndexOf("(");
          const firstCloseIdx = label2.indexOf(")");
          if (lastOpenIdx > -1 && lastOpenIdx < firstCloseIdx) {
            label2 = label2.slice(lastOpenIdx + 1, firstCloseIdx) || "Anonymous";
          }
          let size = measureNode(node);
          if (nodeEnd !== null) {
            const sizeLast = measureNode(nodeEnd);
            size = mergeMeasure(size, sizeLast);
          }
          if (document !== first?.ownerDocument) {
            let iframe;
            const iframes = Array.from(document.querySelectorAll("iframe"));
            for (let i4 = 0; i4 < iframes.length; i4++) {
              const w4 = iframes[i4].contentWindow;
              if (w4 && w4.document === first?.ownerDocument) {
                iframe = iframes[i4];
                break;
              }
            }
            if (iframe) {
              const sizeIframe = measureNode(iframe);
              size.top += sizeIframe.top;
              size.left += sizeIframe.left;
            }
          }
          let height = size.height;
          let width = size.width;
          if (size.boxSizing === "border-box") {
            height += size.marginTop + size.marginBottom;
            width += size.marginLeft + size.marginRight;
          }
          E(
            _(Highlighter, {
              label: label2,
              ...size,
              top: size.top - size.marginTop,
              left: size.left - size.marginLeft,
              height,
              width
            }),
            highlightRef
          );
        }
      }
    }
    return { highlight, destroy: destroyHighlight };
  }

  // src/adapter/adapter/filter.ts
  var DEFAULT_FIlTERS = {
    regex: [],
    type: /* @__PURE__ */ new Set(["dom", "fragment", "root", "hoc", "textSignal"])
  };
  function parseFilters(raw) {
    const type = /* @__PURE__ */ new Set();
    if (raw.type.fragment)
      type.add("fragment");
    if (raw.type.dom)
      type.add("dom");
    if (raw.type.hoc)
      type.add("hoc");
    if (raw.type.root)
      type.add("root");
    if (raw.type.textSignal)
      type.add("textSignal");
    return {
      regex: raw.regex.filter((x3) => x3.enabled).map((x3) => new RegExp(x3.value, "gi")),
      type
    };
  }

  // src/adapter/shared/utils.ts
  function getSignalTextName(name) {
    return name === "_st" ? "__TextSignal" : name;
  }
  function traverse(vnode, fn, bindings) {
    fn(vnode);
    const children = bindings.getActualChildren(vnode);
    for (let i4 = 0; i4 < children.length; i4++) {
      const child = children[i4];
      if (child != null) {
        traverse(child, fn, bindings);
        fn(child);
      }
    }
  }
  function newRootData(id, node) {
    return { id, node };
  }
  function sortRoots(searchRoot, roots) {
    const map = /* @__PURE__ */ new Map();
    const walking = /* @__PURE__ */ new Set();
    walking.add(searchRoot);
    for (let i4 = 0; i4 < roots.length; i4++) {
      let node = roots[i4].node;
      if (!map.has(node)) {
        map.set(node, []);
      }
      map.get(node).push(roots[i4].id);
      while (node !== null && node !== searchRoot) {
        if (walking.has(node))
          break;
        walking.add(node);
        node = node.parentNode;
      }
    }
    const stack = [searchRoot];
    let out = [];
    let item;
    while ((item = stack.pop()) !== void 0) {
      if (!walking.has(item))
        continue;
      if (item.nodeName !== "IFRAME") {
        const len = item.childNodes.length;
        for (let i4 = 0; i4 < len; i4++) {
          stack.push(item.childNodes[len - i4 - 1]);
        }
      }
      const found = map.get(item);
      if (found !== void 0) {
        out = out.concat(found);
      }
    }
    return out;
  }

  // src/adapter/adapter/adapter.ts
  function createAdapter(port, profiler, renderers) {
    const { listen, send, listenToPage } = port;
    const forAll = (fn) => {
      for (const r3 of renderers.values()) {
        fn(r3);
      }
    };
    const highlight = createHightlighter(
      (id) => getRendererByVNodeId(renderers, id)
    );
    const inspect = (id) => {
      const data = getRendererByVNodeId(renderers, id)?.inspect(id);
      if (data) {
        send("inspect-result", data);
      }
    };
    const picker = createPicker(
      window,
      renderers,
      (id) => {
        highlight.highlight(id);
        if (id > -1) {
          inspect(id);
          send("select-node", id);
        }
      },
      () => {
        send("stop-picker", null);
        highlight.destroy();
      }
    );
    listen("start-picker", () => picker.start());
    listen("stop-picker", () => picker.stop());
    listen("copy", (value2) => {
      try {
        const data = JSON.stringify(value2, null, 2);
        copyToClipboard(data);
      } catch (err) {
        console.log(err);
      }
    });
    listen("inspect", (id) => {
      if (id === null)
        return;
      const res = getRendererByVNodeId(renderers, id)?.findDomForVNode(id);
      if (res && res.length > 0) {
        window.__PREACT_DEVTOOLS__.$0 = res[0];
      }
      inspect(id);
    });
    listen("log", (e4) => {
      getRendererByVNodeId(renderers, e4.id)?.log(e4.id, e4.children);
    });
    listen("highlight", (id) => {
      if (id == null)
        highlight.destroy();
      else
        highlight.highlight(id);
    });
    listen("disconnect", () => {
      highlight.destroy();
    });
    const update2 = (data) => {
      const { id, type, path, value: value2 } = data;
      getRendererByVNodeId(renderers, id)?.update(
        id,
        type,
        path.split(".").slice(1),
        value2
      );
      inspect(id);
    };
    listenToPage("root-order-page", () => {
      let roots = [];
      renderers.forEach((r3) => {
        const m4 = r3.getRootMappings();
        roots = roots.concat(m4);
      });
      const sorted = sortRoots(document.body, roots);
      send("root-order", sorted);
    });
    listen("update-prop", (data) => update2({ ...data, type: "props" }));
    listen("update-state", (data) => update2({ ...data, type: "state" }));
    listen("update-context", (data) => update2({ ...data, type: "context" }));
    listen("update-signal", (data) => {
      getRendererByVNodeId(renderers, data.id)?.updateSignal?.(
        data.id,
        +data.path.replace("root.", "").replace(".value", ""),
        data.value
      );
    });
    listen("update-hook", (data) => {
      if (!data.meta)
        return;
      getRendererByVNodeId(renderers, data.id)?.updateHook?.(
        data.id,
        data.meta.index,
        data.value
      );
    });
    listen("update-filter", (data) => {
      const filters = parseFilters(data);
      forAll((r3) => r3.applyFilters(filters));
    });
    listen("refresh", () => forAll((r3) => r3.refresh?.()));
    listen("start-profiling", (options) => {
      profiler.isProfiling = true;
      profiler.captureRenderReasons = !!options && !!options.captureRenderReasons;
    });
    listen("stop-profiling", () => {
      profiler.isProfiling = false;
    });
    listen("reload-and-profile", (options) => {
      window.localStorage.setItem(PROFILE_RELOAD, JSON.stringify(options));
      try {
        window.location.reload();
      } catch (err) {
        console.error("Preact Devtools was not able to reload the current page.");
        console.log(err);
      }
    });
    listen("start-stats-recording", () => {
      profiler.recordStats = true;
    });
    listen("stop-stats-recording", () => {
      profiler.recordStats = false;
    });
    listen("reload-and-record-stats", () => {
      window.localStorage.setItem(STATS_RELOAD, "true");
      try {
        window.location.reload();
      } catch (err) {
        console.error("Preact Devtools was not able to reload the current page.");
        console.log(err);
      }
    });
    listen("start-highlight-updates", () => {
      profiler.highlightUpdates = true;
    });
    listen("stop-highlight-updates", () => {
      profiler.highlightUpdates = false;
      profiler.updateRects.clear();
      profiler.pendingHighlightUpdates.clear();
    });
    listen("load-host-selection", () => {
      const hook = window.__PREACT_DEVTOOLS__;
      const selected = hook.$0;
      if (selected) {
        forAll((r3) => {
          const id = r3.findVNodeIdForDom(selected);
          if (id > -1) {
            send("select-node", id);
          }
        });
      }
    });
    listen("view-source", (id) => {
      const vnode = getRendererByVNodeId(renderers, id)?.getVNodeById(id);
      const hook = window.__PREACT_DEVTOOLS__;
      if (vnode && typeof vnode.type === "function") {
        const { type } = vnode;
        hook.$type = type && type.prototype && type.prototype.render ? type.prototype.render : type;
      } else {
        hook.$type = null;
      }
    });
    listen("suspend", (data) => {
      getRendererByVNodeId(renderers, data.id)?.suspend?.(data.id, data.active);
    });
  }

  // src/adapter/protocol/string-table.ts
  function getStringId(table, input) {
    if (input === null)
      return 0;
    if (!table.has(input)) {
      table.set("" + input, table.size + 1);
    }
    return table.get(input);
  }
  var encoded = /* @__PURE__ */ new Map();
  var toCodePoint = (s5) => s5.codePointAt(0) || 124;
  function encode(input) {
    if (!encoded.has(input)) {
      encoded.set(input, input.split("").map(toCodePoint));
    }
    return encoded.get(input);
  }
  function flushTable(table) {
    const ops = [0];
    table.forEach((_4, k3) => {
      ops[0] += k3.length + 1;
      ops.push(k3.length, ...encode(k3));
    });
    return ops;
  }

  // node_modules/@preact/signals-core/dist/signals-core.module.js
  var i2 = Symbol.for("preact-signals");
  function t3() {
    if (!(s2 > 1)) {
      var i4, t5 = false;
      while (void 0 !== h2) {
        var r3 = h2;
        h2 = void 0;
        f2++;
        while (void 0 !== r3) {
          var o4 = r3.o;
          r3.o = void 0;
          r3.f &= -3;
          if (!(8 & r3.f) && c2(r3))
            try {
              r3.c();
            } catch (r4) {
              if (!t5) {
                i4 = r4;
                t5 = true;
              }
            }
          r3 = o4;
        }
      }
      f2 = 0;
      s2--;
      if (t5)
        throw i4;
    } else
      s2--;
  }
  var o2 = void 0;
  var h2 = void 0;
  var s2 = 0;
  var f2 = 0;
  var v2 = 0;
  function e2(i4) {
    if (void 0 !== o2) {
      var t5 = i4.n;
      if (void 0 === t5 || t5.t !== o2) {
        t5 = { i: 0, S: i4, p: o2.s, n: void 0, t: o2, e: void 0, x: void 0, r: t5 };
        if (void 0 !== o2.s)
          o2.s.n = t5;
        o2.s = t5;
        i4.n = t5;
        if (32 & o2.f)
          i4.S(t5);
        return t5;
      } else if (-1 === t5.i) {
        t5.i = 0;
        if (void 0 !== t5.n) {
          t5.n.p = t5.p;
          if (void 0 !== t5.p)
            t5.p.n = t5.n;
          t5.p = o2.s;
          t5.n = void 0;
          o2.s.n = t5;
          o2.s = t5;
        }
        return t5;
      }
    }
  }
  function u2(i4) {
    this.v = i4;
    this.i = 0;
    this.n = void 0;
    this.t = void 0;
  }
  u2.prototype.brand = i2;
  u2.prototype.h = function() {
    return true;
  };
  u2.prototype.S = function(i4) {
    if (this.t !== i4 && void 0 === i4.e) {
      i4.x = this.t;
      if (void 0 !== this.t)
        this.t.e = i4;
      this.t = i4;
    }
  };
  u2.prototype.U = function(i4) {
    if (void 0 !== this.t) {
      var t5 = i4.e, r3 = i4.x;
      if (void 0 !== t5) {
        t5.x = r3;
        i4.e = void 0;
      }
      if (void 0 !== r3) {
        r3.e = t5;
        i4.x = void 0;
      }
      if (i4 === this.t)
        this.t = r3;
    }
  };
  u2.prototype.subscribe = function(i4) {
    var t5 = this;
    return E2(function() {
      var r3 = t5.value, n3 = o2;
      o2 = void 0;
      try {
        i4(r3);
      } finally {
        o2 = n3;
      }
    });
  };
  u2.prototype.valueOf = function() {
    return this.value;
  };
  u2.prototype.toString = function() {
    return this.value + "";
  };
  u2.prototype.toJSON = function() {
    return this.value;
  };
  u2.prototype.peek = function() {
    var i4 = o2;
    o2 = void 0;
    try {
      return this.value;
    } finally {
      o2 = i4;
    }
  };
  Object.defineProperty(u2.prototype, "value", { get: function() {
    var i4 = e2(this);
    if (void 0 !== i4)
      i4.i = this.i;
    return this.v;
  }, set: function(i4) {
    if (i4 !== this.v) {
      if (f2 > 100)
        throw new Error("Cycle detected");
      this.v = i4;
      this.i++;
      v2++;
      s2++;
      try {
        for (var r3 = this.t; void 0 !== r3; r3 = r3.x)
          r3.t.N();
      } finally {
        t3();
      }
    }
  } });
  function d2(i4) {
    return new u2(i4);
  }
  function c2(i4) {
    for (var t5 = i4.s; void 0 !== t5; t5 = t5.n)
      if (t5.S.i !== t5.i || !t5.S.h() || t5.S.i !== t5.i)
        return true;
    return false;
  }
  function a2(i4) {
    for (var t5 = i4.s; void 0 !== t5; t5 = t5.n) {
      var r3 = t5.S.n;
      if (void 0 !== r3)
        t5.r = r3;
      t5.S.n = t5;
      t5.i = -1;
      if (void 0 === t5.n) {
        i4.s = t5;
        break;
      }
    }
  }
  function l2(i4) {
    var t5 = i4.s, r3 = void 0;
    while (void 0 !== t5) {
      var o4 = t5.p;
      if (-1 === t5.i) {
        t5.S.U(t5);
        if (void 0 !== o4)
          o4.n = t5.n;
        if (void 0 !== t5.n)
          t5.n.p = o4;
      } else
        r3 = t5;
      t5.S.n = t5.r;
      if (void 0 !== t5.r)
        t5.r = void 0;
      t5 = o4;
    }
    i4.s = r3;
  }
  function y2(i4) {
    u2.call(this, void 0);
    this.x = i4;
    this.s = void 0;
    this.g = v2 - 1;
    this.f = 4;
  }
  (y2.prototype = new u2()).h = function() {
    this.f &= -3;
    if (1 & this.f)
      return false;
    if (32 == (36 & this.f))
      return true;
    this.f &= -5;
    if (this.g === v2)
      return true;
    this.g = v2;
    this.f |= 1;
    if (this.i > 0 && !c2(this)) {
      this.f &= -2;
      return true;
    }
    var i4 = o2;
    try {
      a2(this);
      o2 = this;
      var t5 = this.x();
      if (16 & this.f || this.v !== t5 || 0 === this.i) {
        this.v = t5;
        this.f &= -17;
        this.i++;
      }
    } catch (i5) {
      this.v = i5;
      this.f |= 16;
      this.i++;
    }
    o2 = i4;
    l2(this);
    this.f &= -2;
    return true;
  };
  y2.prototype.S = function(i4) {
    if (void 0 === this.t) {
      this.f |= 36;
      for (var t5 = this.s; void 0 !== t5; t5 = t5.n)
        t5.S.S(t5);
    }
    u2.prototype.S.call(this, i4);
  };
  y2.prototype.U = function(i4) {
    if (void 0 !== this.t) {
      u2.prototype.U.call(this, i4);
      if (void 0 === this.t) {
        this.f &= -33;
        for (var t5 = this.s; void 0 !== t5; t5 = t5.n)
          t5.S.U(t5);
      }
    }
  };
  y2.prototype.N = function() {
    if (!(2 & this.f)) {
      this.f |= 6;
      for (var i4 = this.t; void 0 !== i4; i4 = i4.x)
        i4.t.N();
    }
  };
  Object.defineProperty(y2.prototype, "value", { get: function() {
    if (1 & this.f)
      throw new Error("Cycle detected");
    var i4 = e2(this);
    this.h();
    if (void 0 !== i4)
      i4.i = this.i;
    if (16 & this.f)
      throw this.v;
    return this.v;
  } });
  function w2(i4) {
    return new y2(i4);
  }
  function _2(i4) {
    var r3 = i4.u;
    i4.u = void 0;
    if ("function" == typeof r3) {
      s2++;
      var n3 = o2;
      o2 = void 0;
      try {
        r3();
      } catch (t5) {
        i4.f &= -2;
        i4.f |= 8;
        g2(i4);
        throw t5;
      } finally {
        o2 = n3;
        t3();
      }
    }
  }
  function g2(i4) {
    for (var t5 = i4.s; void 0 !== t5; t5 = t5.n)
      t5.S.U(t5);
    i4.x = void 0;
    i4.s = void 0;
    _2(i4);
  }
  function p2(i4) {
    if (o2 !== this)
      throw new Error("Out-of-order effect");
    l2(this);
    o2 = i4;
    this.f &= -2;
    if (8 & this.f)
      g2(this);
    t3();
  }
  function b(i4) {
    this.x = i4;
    this.u = void 0;
    this.s = void 0;
    this.o = void 0;
    this.f = 32;
  }
  b.prototype.c = function() {
    var i4 = this.S();
    try {
      if (8 & this.f)
        return;
      if (void 0 === this.x)
        return;
      var t5 = this.x();
      if ("function" == typeof t5)
        this.u = t5;
    } finally {
      i4();
    }
  };
  b.prototype.S = function() {
    if (1 & this.f)
      throw new Error("Cycle detected");
    this.f |= 1;
    this.f &= -9;
    _2(this);
    a2(this);
    s2++;
    var i4 = o2;
    o2 = this;
    return p2.bind(this, i4);
  };
  b.prototype.N = function() {
    if (!(2 & this.f)) {
      this.f |= 2;
      this.o = h2;
      h2 = this;
    }
  };
  b.prototype.d = function() {
    this.f |= 8;
    if (!(1 & this.f))
      g2(this);
  };
  function E2(i4) {
    var t5 = new b(i4);
    try {
      t5.c();
    } catch (i5) {
      t5.d();
      throw i5;
    }
    return t5.d.bind(t5);
  }

  // node_modules/preact/hooks/dist/hooks.module.js
  var t4;
  var r2;
  var u3;
  var i3;
  var o3 = 0;
  var f3 = [];
  var c3 = l;
  var e3 = c3.__b;
  var a3 = c3.__r;
  var v3 = c3.diffed;
  var l3 = c3.__c;
  var m3 = c3.unmount;
  var s3 = c3.__;
  function p3(n3, t5) {
    c3.__h && c3.__h(r2, n3, o3 || t5), o3 = 0;
    var u4 = r2.__H || (r2.__H = { __: [], __h: [] });
    return n3 >= u4.__.length && u4.__.push({}), u4.__[n3];
  }
  function _3(n3, u4) {
    var i4 = p3(t4++, 4);
    !c3.__s && C2(i4.__H, u4) && (i4.__ = n3, i4.u = u4, r2.__h.push(i4));
  }
  function A2(n3) {
    return o3 = 5, T2(function() {
      return { current: n3 };
    }, []);
  }
  function T2(n3, r3) {
    var u4 = p3(t4++, 7);
    return C2(u4.__H, r3) && (u4.__ = n3(), u4.__H = r3, u4.__h = n3), u4.__;
  }
  function x2(n3) {
    var u4 = r2.context[n3.__c], i4 = p3(t4++, 9);
    return i4.c = n3, u4 ? (null == i4.__ && (i4.__ = true, u4.sub(r2)), u4.props.value) : n3.__;
  }
  function j2() {
    for (var n3; n3 = f3.shift(); )
      if (n3.__P && n3.__H)
        try {
          n3.__H.__h.forEach(z2), n3.__H.__h.forEach(B2), n3.__H.__h = [];
        } catch (t5) {
          n3.__H.__h = [], c3.__e(t5, n3.__v);
        }
  }
  c3.__b = function(n3) {
    r2 = null, e3 && e3(n3);
  }, c3.__ = function(n3, t5) {
    n3 && t5.__k && t5.__k.__m && (n3.__m = t5.__k.__m), s3 && s3(n3, t5);
  }, c3.__r = function(n3) {
    a3 && a3(n3), t4 = 0;
    var i4 = (r2 = n3.__c).__H;
    i4 && (u3 === r2 ? (i4.__h = [], r2.__h = [], i4.__.forEach(function(n4) {
      n4.__N && (n4.__ = n4.__N), n4.u = n4.__N = void 0;
    })) : (i4.__h.forEach(z2), i4.__h.forEach(B2), i4.__h = [], t4 = 0)), u3 = r2;
  }, c3.diffed = function(n3) {
    v3 && v3(n3);
    var t5 = n3.__c;
    t5 && t5.__H && (t5.__H.__h.length && (1 !== f3.push(t5) && i3 === c3.requestAnimationFrame || ((i3 = c3.requestAnimationFrame) || w3)(j2)), t5.__H.__.forEach(function(n4) {
      n4.u && (n4.__H = n4.u), n4.u = void 0;
    })), u3 = r2 = null;
  }, c3.__c = function(n3, t5) {
    t5.some(function(n4) {
      try {
        n4.__h.forEach(z2), n4.__h = n4.__h.filter(function(n5) {
          return !n5.__ || B2(n5);
        });
      } catch (r3) {
        t5.some(function(n5) {
          n5.__h && (n5.__h = []);
        }), t5 = [], c3.__e(r3, n4.__v);
      }
    }), l3 && l3(n3, t5);
  }, c3.unmount = function(n3) {
    m3 && m3(n3);
    var t5, r3 = n3.__c;
    r3 && r3.__H && (r3.__H.__.forEach(function(n4) {
      try {
        z2(n4);
      } catch (n5) {
        t5 = n5;
      }
    }), r3.__H = void 0, t5 && c3.__e(t5, r3.__v));
  };
  var k2 = "function" == typeof requestAnimationFrame;
  function w3(n3) {
    var t5, r3 = function() {
      clearTimeout(u4), k2 && cancelAnimationFrame(t5), setTimeout(n3);
    }, u4 = setTimeout(r3, 100);
    k2 && (t5 = requestAnimationFrame(r3));
  }
  function z2(n3) {
    var t5 = r2, u4 = n3.__c;
    "function" == typeof u4 && (n3.__c = void 0, u4()), r2 = t5;
  }
  function B2(n3) {
    var t5 = r2;
    n3.__c = n3.__(), r2 = t5;
  }
  function C2(n3, t5) {
    return !n3 || n3.length !== t5.length || t5.some(function(t6, r3) {
      return t6 !== n3[r3];
    });
  }

  // node_modules/@preact/signals/dist/signals.module.js
  var v4;
  var s4;
  function l4(i4, n3) {
    l[i4] = n3.bind(null, l[i4] || function() {
    });
  }
  function d3(i4) {
    if (s4)
      s4();
    s4 = i4 && i4.S();
  }
  function h3(i4) {
    var r3 = this, f4 = i4.data, o4 = useSignal(f4);
    o4.value = f4;
    var e4 = T2(function() {
      var i5 = r3.__v;
      while (i5 = i5.__)
        if (i5.__c) {
          i5.__c.__$f |= 4;
          break;
        }
      r3.__$u.c = function() {
        var i6, t5 = r3.__$u.S(), f5 = e4.value;
        t5();
        if (u(f5) || 3 !== (null == (i6 = r3.base) ? void 0 : i6.nodeType)) {
          r3.__$f |= 1;
          r3.setState({});
        } else
          r3.base.data = f5;
      };
      return w2(function() {
        var i6 = o4.value.value;
        return 0 === i6 ? 0 : true === i6 ? "" : i6 || "";
      });
    }, []);
    return e4.value;
  }
  h3.displayName = "_st";
  Object.defineProperties(u2.prototype, { constructor: { configurable: true, value: void 0 }, type: { configurable: true, value: h3 }, props: { configurable: true, get: function() {
    return { data: this };
  } }, __b: { configurable: true, value: 1 } });
  l4("__b", function(i4, r3) {
    if ("string" == typeof r3.type) {
      var n3, t5 = r3.props;
      for (var f4 in t5)
        if ("children" !== f4) {
          var o4 = t5[f4];
          if (o4 instanceof u2) {
            if (!n3)
              r3.__np = n3 = {};
            n3[f4] = o4;
            t5[f4] = o4.peek();
          }
        }
    }
    i4(r3);
  });
  l4("__r", function(i4, r3) {
    d3();
    var n3, t5 = r3.__c;
    if (t5) {
      t5.__$f &= -2;
      if (void 0 === (n3 = t5.__$u))
        t5.__$u = n3 = function(i5) {
          var r4;
          E2(function() {
            r4 = this;
          });
          r4.c = function() {
            t5.__$f |= 1;
            t5.setState({});
          };
          return r4;
        }();
    }
    v4 = t5;
    d3(n3);
    i4(r3);
  });
  l4("__e", function(i4, r3, n3, t5) {
    d3();
    v4 = void 0;
    i4(r3, n3, t5);
  });
  l4("diffed", function(i4, r3) {
    d3();
    v4 = void 0;
    var n3;
    if ("string" == typeof r3.type && (n3 = r3.__e)) {
      var t5 = r3.__np, f4 = r3.props;
      if (t5) {
        var o4 = n3.U;
        if (o4)
          for (var e4 in o4) {
            var u4 = o4[e4];
            if (void 0 !== u4 && !(e4 in t5)) {
              u4.d();
              o4[e4] = void 0;
            }
          }
        else
          n3.U = o4 = {};
        for (var a4 in t5) {
          var c4 = o4[a4], s5 = t5[a4];
          if (void 0 === c4) {
            c4 = p4(n3, a4, s5, f4);
            o4[a4] = c4;
          } else
            c4.o(s5, f4);
        }
      }
    }
    i4(r3);
  });
  function p4(i4, r3, n3, t5) {
    var f4 = r3 in i4 && void 0 === i4.ownerSVGElement, o4 = d2(n3);
    return { o: function(i5, r4) {
      o4.value = i5;
      t5 = r4;
    }, d: E2(function() {
      var n4 = o4.value.value;
      if (t5[r3] !== n4) {
        t5[r3] = n4;
        if (f4)
          i4[r3] = n4;
        else if (n4)
          i4.setAttribute(r3, n4);
        else
          i4.removeAttribute(r3);
      }
    }) };
  }
  l4("unmount", function(i4, r3) {
    if ("string" == typeof r3.type) {
      var n3 = r3.__e;
      if (n3) {
        var t5 = n3.U;
        if (t5) {
          n3.U = void 0;
          for (var f4 in t5) {
            var o4 = t5[f4];
            if (o4)
              o4.d();
          }
        }
      }
    } else {
      var e4 = r3.__c;
      if (e4) {
        var u4 = e4.__$u;
        if (u4) {
          e4.__$u = void 0;
          u4.d();
        }
      }
    }
    i4(r3);
  });
  l4("__h", function(i4, r3, n3, t5) {
    if (t5 < 3 || 9 === t5)
      r3.__$f |= 2;
    i4(r3, n3, t5);
  });
  x.prototype.shouldComponentUpdate = function(i4, r3) {
    var n3 = this.__$u, t5 = n3 && void 0 !== n3.s;
    for (var f4 in r3)
      return true;
    if (this.__f || "boolean" == typeof this.u && true === this.u) {
      if (!(t5 || 2 & this.__$f || 4 & this.__$f))
        return true;
      if (1 & this.__$f)
        return true;
    } else {
      if (!(t5 || 4 & this.__$f))
        return true;
      if (3 & this.__$f)
        return true;
    }
    for (var o4 in i4)
      if ("__source" !== o4 && i4[o4] !== this.props[o4])
        return true;
    for (var e4 in this.props)
      if (!(e4 in i4))
        return true;
    return false;
  };
  function useSignal(i4) {
    return T2(function() {
      return d2(i4);
    }, []);
  }

  // src/adapter/shared/stats.ts
  function getChildCountIdx(count) {
    return count > 4 ? 4 : count;
  }
  function updateDiffStats(stats, diff, childCount) {
    const idx = getChildCountIdx(childCount);
    if (diff === 1 /* KEYED */) {
      stats.keyed[idx]++;
    } else if (diff === 2 /* UNKEYED */) {
      stats.unkeyed[idx]++;
    } else if (diff === 3 /* MIXED */) {
      stats.mixed[idx]++;
    }
  }
  function updateOpStats(stats, kind, vnode, bindings) {
    if (bindings.isComponent(vnode)) {
      stats[kind].components++;
    } else if (bindings.isElement(vnode)) {
      stats[kind].elements++;
    } else {
      stats[kind].text++;
    }
  }
  function createStats() {
    return {
      roots: [0, 0, 0, 0, 0],
      classComponents: [0, 0, 0, 0, 0],
      functionComponents: [0, 0, 0, 0, 0],
      fragments: [0, 0, 0, 0, 0],
      forwardRef: [0, 0, 0, 0, 0],
      memo: [0, 0, 0, 0, 0],
      suspense: [0, 0, 0, 0, 0],
      elements: [0, 0, 0, 0, 0],
      text: 0,
      keyed: [0, 0, 0, 0, 0],
      unkeyed: [0, 0, 0, 0, 0],
      mixed: [0, 0, 0, 0, 0],
      mounts: { components: 0, elements: 0, text: 0 },
      unmounts: { components: 0, elements: 0, text: 0 },
      updates: { components: 0, elements: 0, text: 0 },
      singleChildType: {
        roots: 0,
        classComponents: 0,
        functionComponents: 0,
        fragments: 0,
        forwardRef: 0,
        memo: 0,
        suspense: 0,
        elements: 0,
        text: 0
      }
    };
  }
  function stats2ops(stats, out) {
    out.push(7 /* COMMIT_STATS */);
    pushStatsChildren(out, stats.roots);
    pushStatsChildren(out, stats.classComponents);
    pushStatsChildren(out, stats.functionComponents);
    pushStatsChildren(out, stats.fragments);
    pushStatsChildren(out, stats.forwardRef);
    pushStatsChildren(out, stats.memo);
    pushStatsChildren(out, stats.suspense);
    pushStatsChildren(out, stats.elements);
    out.push(stats.text);
    pushStatsChildren(out, stats.keyed);
    pushStatsChildren(out, stats.unkeyed);
    pushStatsChildren(out, stats.mixed);
    out.push(stats.mounts.components);
    out.push(stats.mounts.elements);
    out.push(stats.mounts.text);
    out.push(stats.updates.components);
    out.push(stats.updates.elements);
    out.push(stats.updates.text);
    out.push(stats.unmounts.components);
    out.push(stats.unmounts.elements);
    out.push(stats.unmounts.text);
    out.push(stats.singleChildType.roots);
    out.push(stats.singleChildType.classComponents);
    out.push(stats.singleChildType.functionComponents);
    out.push(stats.singleChildType.fragments);
    out.push(stats.singleChildType.forwardRef);
    out.push(stats.singleChildType.memo);
    out.push(stats.singleChildType.suspense);
    out.push(stats.singleChildType.elements);
    out.push(stats.singleChildType.text);
  }
  function pushStatsChildren(out, stats) {
    out.push(stats[0]);
    out.push(stats[1]);
    out.push(stats[2]);
    out.push(stats[3]);
    out.push(stats[4]);
  }
  function getDiffType(child, prev) {
    if (prev !== 3 /* MIXED */) {
      if (child.key != null) {
        return prev === 0 /* UNKNOWN */ || prev === 1 /* KEYED */ ? 1 /* KEYED */ : 3 /* MIXED */;
      } else {
        return prev === 0 /* UNKNOWN */ || prev === 2 /* UNKEYED */ ? 2 /* UNKEYED */ : 3 /* MIXED */;
      }
    }
    return prev;
  }
  function recordComponentStats(config, bindings, stats, vnode, children) {
    const childrenLen = children.length;
    const idx = getChildCountIdx(childrenLen);
    if (bindings.isComponent(vnode)) {
      if (vnode.type === config.Fragment) {
        stats.fragments[idx]++;
      } else if (vnode.type.prototype && vnode.type.prototype.render) {
        stats.classComponents[idx]++;
      } else {
        stats.functionComponents[idx]++;
      }
    } else if (bindings.isElement(vnode)) {
      stats.elements[idx]++;
    } else {
      stats.text++;
    }
    const devType = getDevtoolsType(vnode, bindings);
    switch (devType) {
      case 4 /* ForwardRef */:
        stats.forwardRef[idx]++;
        break;
      case 5 /* Memo */:
        stats.memo[idx]++;
        break;
      case 6 /* Suspense */:
        stats.suspense[idx]++;
        break;
    }
    if (childrenLen === 1) {
      const child = children[0];
      if (child != null) {
        if (typeof child.type === "function") {
          if (child.type.prototype && child.type.prototype.render) {
            stats.singleChildType.classComponents++;
          } else {
            if (child.type === config.Fragment) {
              stats.singleChildType.fragments++;
            } else {
              const childType = getDevtoolsType(child, bindings);
              switch (childType) {
                case 4 /* ForwardRef */:
                  stats.singleChildType.forwardRef++;
                  break;
                case 5 /* Memo */:
                  stats.singleChildType.memo++;
                  break;
                case 6 /* Suspense */:
                  stats.singleChildType.suspense++;
                  break;
              }
            }
            stats.singleChildType.functionComponents++;
          }
        } else if (child.type !== null) {
          stats.singleChildType.elements++;
        } else {
          stats.singleChildType.text++;
        }
      }
    }
  }

  // src/adapter/protocol/events.ts
  function flush(commit) {
    const { rootId, unmountIds, operations, strings, stats } = commit;
    if (unmountIds.length === 0 && operations.length === 0)
      return;
    const msg = [rootId, ...flushTable(strings)];
    if (unmountIds.length > 0) {
      msg.push(3 /* REMOVE_VNODE */, unmountIds.length, ...unmountIds);
    }
    for (let i4 = 0; i4 < operations.length; i4++) {
      msg.push(operations[i4]);
    }
    if (stats !== null) {
      stats2ops(stats, msg);
    }
    return { type: "operation_v2", data: msg };
  }

  // src/view/store/react-bindings.ts
  var WindowCtx = K(null);
  var AppCtx = K(null);
  var EmitCtx = K(() => null);

  // src/view/components/utils.ts
  function useResize(fn, args, init = false) {
    const win = x2(WindowCtx) || window;
    _3(() => {
      if (init)
        fn();
      const fn2 = throttle(fn, 60);
      win.addEventListener("resize", fn2);
      return () => {
        win.removeEventListener("resize", fn2);
      };
    }, [...args, init]);
  }

  // src/view/components/CanvasHighlight/CanvasHighlight.module-virtual.css
  var root2 = "ybl9jW_root";

  // src/view/components/CanvasHighlight/CanvasHighlight.tsx
  function CanvasHighlight() {
    const ref = A2(null);
    useResize(() => {
      if (ref.current) {
        ref.current.width = window.innerWidth;
        ref.current.height = window.innerHeight;
      }
    }, []);
    return m2`<canvas class=${root2} ref=${ref} width=${window.innerWidth} height=${window.innerHeight}/>`;
  }

  // src/adapter/adapter/highlightUpdates.ts
  var DISPLAY_DURATION = 250;
  var MAX_DISPLAY_DURATION = 3e3;
  var OUTLINE_COLOR = "#f0f0f0";
  var COLORS = [
    "#37afa9",
    "#63b19e",
    "#80b393",
    "#97b488",
    "#abb67d",
    "#beb771",
    "#cfb965",
    "#dfba57",
    "#efbb49",
    "#febc38"
  ];
  function measureUpdate(updates, dom) {
    const data = updates.get(dom);
    const rect = dom.getBoundingClientRect();
    const now = performance.now();
    const expirationTime = data ? Math.min(
      now + MAX_DISPLAY_DURATION,
      data.expirationTime + DISPLAY_DURATION
    ) : now + DISPLAY_DURATION;
    updates.set(dom, {
      expirationTime,
      height: rect.height,
      width: rect.width,
      x: rect.x,
      y: rect.y,
      count: data ? data.count + 1 : 1
    });
  }
  function drawRect(ctx, data) {
    const colorIndex = Math.min(COLORS.length - 1, data.count - 1);
    ctx.lineWidth = 1;
    ctx.strokeStyle = OUTLINE_COLOR;
    ctx.strokeRect(data.x - 1, data.y - 1, data.width + 2, data.height + 2);
    ctx.lineWidth = 1;
    ctx.strokeStyle = OUTLINE_COLOR;
    ctx.strokeRect(data.x + 1, data.y + 1, data.width - 2, data.height - 2);
    ctx.strokeStyle = COLORS[colorIndex];
    ctx.lineWidth = 1;
    ctx.strokeRect(data.x, data.y, data.width, data.height);
  }
  var timer;
  var container = null;
  var canvas = null;
  function destroyCanvas() {
    if (container) {
      E(null, container);
      container.remove();
      container = null;
      canvas = null;
    }
  }
  function draw(updates) {
    if (!canvas || !canvas.getContext)
      return;
    if (timer)
      clearTimeout(timer);
    const ctx = canvas.getContext("2d");
    if (!ctx)
      return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const now = performance.now();
    let nextRedraw = Number.MAX_SAFE_INTEGER;
    updates.forEach((data, key) => {
      if (data.expirationTime < now) {
        updates.delete(key);
      } else {
        drawRect(ctx, data);
        nextRedraw = Math.min(nextRedraw, data.expirationTime);
      }
    });
    if (nextRedraw !== Number.MAX_SAFE_INTEGER) {
      timer = setTimeout(() => draw(updates), nextRedraw - now);
    } else {
      destroyCanvas();
    }
  }
  function startDrawing(updateRects) {
    if (!canvas) {
      container = document.createElement("div");
      container.id = "preact-devtools-highlight-updates";
      document.body.appendChild(container);
      E(_(CanvasHighlight, null), container);
      canvas = container.querySelector("canvas");
    }
    draw(updateRects);
  }

  // src/adapter/shared/serialize.ts
  function serializeVNode(x3, config, bindings) {
    if (bindings.isVNode(x3)) {
      return {
        type: "vnode",
        name: bindings.getPropsVNodeDisplayName(x3, config)
      };
    }
    return null;
  }
  function isSignal(x3) {
    return x3 !== null && typeof x3 === "object" && typeof x3.peek === "function" && "value" in x3;
  }
  function isReadOnlySignal(signal) {
    return signal._r === true || "g" in signal && typeof signal.x === "function";
  }
  function sortStrings(a4, b2) {
    return a4.localeCompare(b2);
  }
  function jsonify(data, getVNode, seen) {
    if (seen.has(data)) {
      return "[[Circular]]";
    }
    if (data !== null && typeof data === "object") {
      seen.add(data);
    }
    if (typeof Element !== "undefined" && data instanceof Element) {
      return {
        type: "html",
        name: `<${data.localName} />`
      };
    }
    const vnode = getVNode(data);
    if (vnode != null)
      return vnode;
    if (isSignal(data)) {
      return {
        type: "signal",
        name: isReadOnlySignal(data) ? "computed Signal" : "Signal",
        value: jsonify(data.peek(), getVNode, seen)
      };
    }
    if (Array.isArray(data)) {
      return data.map((x3) => jsonify(x3, getVNode, seen));
    }
    switch (typeof data) {
      case "string":
        return data.length > 300 ? data.slice(300) : data;
      case "bigint":
        return {
          type: "bigint",
          value: data.toString(10)
        };
      case "function": {
        return {
          type: "function",
          name: data.displayName || data.name || "anonymous"
        };
      }
      case "symbol": {
        return {
          type: "symbol",
          name: data.toString()
        };
      }
      case "object": {
        if (data === null)
          return null;
        else if (data instanceof window.Blob) {
          return {
            type: "blob",
            name: "Blob"
          };
        } else if (data instanceof Set) {
          return {
            type: "set",
            name: "Set",
            entries: Array.from(data.values()).map(
              (item) => jsonify(item, getVNode, seen)
            )
          };
        } else if (data instanceof Map) {
          return {
            type: "map",
            name: "Map",
            entries: Array.from(data.entries()).map((entry) => {
              return [
                jsonify(entry[0], getVNode, seen),
                jsonify(entry[1], getVNode, seen)
              ];
            })
          };
        }
        const out = {};
        Object.keys(data).sort(sortStrings).forEach((key) => {
          out[key] = jsonify(data[key], getVNode, seen);
        });
        return out;
      }
      default:
        return data;
    }
  }
  function isEditable(x3) {
    switch (typeof x3) {
      case "string":
      case "number":
      case "boolean":
      case "bigint":
        return true;
      default:
        return false;
    }
  }
  function clone(value2) {
    if (Array.isArray(value2))
      return value2.slice();
    if (value2 !== null && typeof value2 === "object") {
      if (value2 instanceof Set)
        return new Set(value2);
      if (value2 instanceof Map)
        return new Map(value2);
      return { ...value2 };
    }
    return value2;
  }
  function setInCopy(obj, path, value2, idx = 0) {
    if (idx >= path.length)
      return value2;
    if (path[path.length - 1] === "value" && maybeSetSignal(obj, path, value2)) {
      return obj;
    }
    const updated = clone(obj);
    if (obj instanceof Set) {
      const oldValue = Array.from(obj)[+path[idx]];
      updated.delete(oldValue);
      updated.add(setInCopy(oldValue, path, value2, idx + 1));
    } else if (obj instanceof Map) {
      const oldEntry = Array.from(obj)[+path[idx]];
      const isKey = +path[idx + 1] === 0;
      if (isKey) {
        updated.delete(oldEntry[0]);
        updated.set(setInCopy(oldEntry[0], path, value2, idx + 2), oldEntry[1]);
      } else {
        updated.delete(oldEntry[0]);
        updated.set(oldEntry[0], setInCopy(oldEntry[1], path, value2, idx + 2));
      }
    } else {
      const key = path[idx];
      updated[key] = setInCopy(obj[key], path, value2, idx + 1);
    }
    return updated;
  }
  function serialize(config, bindings, data) {
    return jsonify(
      data,
      (node) => serializeVNode(node, config, bindings),
      /* @__PURE__ */ new Set()
    );
  }
  function setIn(obj, path, value2) {
    const last = path.pop();
    const parent = path.reduce((acc, attr) => acc ? acc[attr] : null, obj);
    if (parent && last) {
      parent[last] = value2;
    }
  }
  function maybeSetSignal(obj, path, value2) {
    let current = obj;
    for (let i4 = 0; i4 < path.length; i4++) {
      if (isSignal(current)) {
        current.value = value2;
        return true;
      }
      current = current[path[i4]];
    }
    return false;
  }
  function cleanProps(props) {
    if (typeof props === "string" || !props)
      return null;
    const out = {};
    for (const key in props) {
      if (key === "__source" || key === "__self")
        continue;
      out[key] = props[key];
    }
    if (!Object.keys(out).length)
      return null;
    return out;
  }
  var reg = /__cC\d+/;
  function cleanContext(context) {
    const res = {};
    for (const key in context) {
      if (reg.test(key))
        continue;
      res[key] = context[key];
    }
    if (Object.keys(res).length == 0)
      return null;
    return res;
  }

  // src/adapter/shared/idMapper.ts
  function createIdMappingState(initial, getInstance3) {
    return {
      instToId: /* @__PURE__ */ new Map(),
      idToVNode: /* @__PURE__ */ new Map(),
      idToInst: /* @__PURE__ */ new Map(),
      nextId: initial,
      getInstance: getInstance3
    };
  }
  function getVNodeById(state, id) {
    return state.idToVNode.get(id) || null;
  }
  function hasVNodeId(state, vnode) {
    return vnode != null && state.instToId.has(state.getInstance(vnode));
  }
  function getVNodeId(state, vnode) {
    if (vnode == null)
      return -1;
    const inst = state.getInstance(vnode);
    return state.instToId.get(inst) || -1;
  }
  function getOrCreateVNodeId(state, vnode) {
    const id = getVNodeId(state, vnode);
    if (id !== -1)
      return id;
    return createVNodeId(state, vnode);
  }
  function updateVNodeId(state, id, vnode) {
    const inst = state.getInstance(vnode);
    state.idToInst.set(id, inst);
    state.idToVNode.set(id, vnode);
  }
  function removeVNodeId(state, vnode) {
    if (hasVNodeId(state, vnode)) {
      const id = getVNodeId(state, vnode);
      state.idToInst.delete(id);
      state.idToVNode.delete(id);
    }
    const inst = state.getInstance(vnode);
    state.instToId.delete(inst);
  }
  function createVNodeId(state, vnode) {
    const id = state.nextId++;
    const inst = state.getInstance(vnode);
    state.instToId.set(inst, id);
    state.idToInst.set(id, inst);
    state.idToVNode.set(id, vnode);
    return id;
  }

  // src/adapter/shared/renderReasons.ts
  function createReason(type, items) {
    return { type, items };
  }
  function getChangedKeys(a4, b2) {
    const changed = [];
    let key;
    for (key in a4) {
      if (!(key in b2) || a4[key] !== b2[key]) {
        changed.push(key);
      }
    }
    for (key in b2) {
      if (!(key in a4)) {
        changed.push(key);
      }
    }
    return changed;
  }

  // src/adapter/shared/traverse.ts
  function getHocName(name) {
    const idx = name.indexOf("(");
    if (idx === -1)
      return null;
    const wrapper = name.slice(0, idx);
    return wrapper ? wrapper : null;
  }
  function addHocs(commit, id, hocs) {
    if (hocs.length > 0) {
      commit.operations.push(8 /* HOC_NODES */, id, hocs.length);
      for (let i4 = 0; i4 < hocs.length; i4++) {
        const stringId = getStringId(commit.strings, hocs[i4]);
        commit.operations.push(stringId);
      }
    }
  }
  function detectHocs(commit, name, id, hocs) {
    const hocName = getHocName(name);
    if (name.startsWith("ForwardRef")) {
      const idx = name.indexOf("(");
      name = name.slice(idx + 1, -1) || "Anonymous";
      addHocs(commit, id, hocs);
      hocs = [];
    } else {
      if (hocName) {
        hocs = [...hocs, hocName];
      } else {
        addHocs(commit, id, hocs);
        hocs = [];
      }
    }
    return { name, hocs };
  }
  function isTextNode(dom) {
    return dom != null && dom.nodeType === 3 /* Text */;
  }
  function updateHighlight(profiler, vnode, bindings) {
    if (profiler.highlightUpdates && bindings.isComponent(vnode)) {
      const stack = [vnode];
      let item;
      let dom;
      while ((item = stack.shift()) !== void 0) {
        if (item === null)
          continue;
        if (!bindings.isComponent(item)) {
          dom = bindings.getDom(item);
          break;
        }
        stack.push(...bindings.getActualChildren(item));
      }
      if (dom === null || dom === void 0)
        return;
      if (isTextNode(dom)) {
        dom = dom.parentNode;
      }
      if (dom && !profiler.pendingHighlightUpdates.has(dom)) {
        profiler.pendingHighlightUpdates.add(dom);
        measureUpdate(profiler.updateRects, dom);
      }
    }
  }
  function getFilteredChildren(vnode, filters, config, helpers) {
    const children = helpers.getActualChildren(vnode);
    const stack = children.slice();
    const out = [];
    let child;
    while (stack.length) {
      child = stack.pop();
      if (child != null) {
        if (!shouldFilter(child, filters, config, helpers)) {
          out.push(child);
        } else {
          const nextChildren = helpers.getActualChildren(child);
          if (nextChildren.length > 0) {
            stack.push(...nextChildren.slice());
          }
        }
      }
    }
    return out.reverse();
  }
  function shouldFilter(vnode, filters, config, bindings) {
    if (bindings.isTextVNode(vnode)) {
      return true;
    }
    if (vnode.type === config.Fragment && filters.type.has("fragment")) {
      const parent2 = bindings.getVNodeParent(vnode);
      if (parent2 != null)
        return true;
      return false;
    } else if (bindings.isElement(vnode) && filters.type.has("dom")) {
      return true;
    }
    if (filters.type.has("hoc")) {
      const name = bindings.getDisplayName(vnode, config);
      if (name.indexOf("(") > -1 && !name.startsWith("ForwardRef")) {
        return true;
      }
    }
    if (filters.type.has("textSignal")) {
      const name = getSignalTextName(bindings.getDisplayName(vnode, config));
      if (name === "__TextSignal")
        return true;
    }
    if (filters.regex.length > 0) {
      const name = getSignalTextName(bindings.getDisplayName(vnode, config));
      return filters.regex.some((r3) => {
        r3.lastIndex = 0;
        return r3.test(name);
      });
    }
    const parent = bindings.getVNodeParent(vnode);
    if (parent !== null && bindings.isSuspenseVNode(parent) && bindings.isPortal(vnode)) {
      return true;
    }
    return false;
  }
  function mount(ids, commit, owners, vnode, ownerId, ancestorId, filters, domCache, config, profiler, hocs, bindings, timingsByVNode, renderReasonPre) {
    if (commit.stats !== null) {
      updateOpStats(commit.stats, "mounts", vnode, bindings);
    }
    const root3 = bindings.isRoot(vnode, config);
    const skip = shouldFilter(vnode, filters, config, bindings);
    let name = getSignalTextName(bindings.getDisplayName(vnode, config));
    if (filters.type.has("hoc")) {
      const hocName = getHocName(name);
      if (hocName) {
        hocs = [...hocs, hocName];
        if (name.startsWith("ForwardRef")) {
          const idx = name.indexOf("(");
          name = name.slice(idx + 1, -1) || "Anonymous";
        }
      }
    }
    if (root3 || !skip) {
      const id = getOrCreateVNodeId(ids, vnode);
      if (root3) {
        commit.operations.push(1 /* ADD_ROOT */, id);
      }
      if (!root3) {
        const maybeOwner = owners.get(vnode);
        if (maybeOwner !== void 0 && !bindings.isRoot(maybeOwner, config)) {
          const maybeOwnerId = getVNodeId(ids, maybeOwner);
          ownerId = maybeOwnerId !== -1 ? maybeOwnerId : ownerId;
        }
      }
      commit.operations.push(
        2 /* ADD_VNODE */,
        id,
        getDevtoolsType(vnode, bindings),
        ancestorId,
        ownerId,
        getStringId(commit.strings, name),
        vnode.key ? getStringId(commit.strings, vnode.key) : 0,
        (timingsByVNode.start.get(vnode) || 0) * 1e3,
        (timingsByVNode.end.get(vnode) || 0) * 1e3
      );
      if (ownerId === -1 && !root3) {
        ownerId = id;
      }
      if (hocs.length > 0) {
        addHocs(commit, id, hocs);
        hocs = [];
        ownerId = id;
      }
      if (profiler.isProfiling && profiler.captureRenderReasons) {
        commit.operations.push(6 /* RENDER_REASON */, id, 1 /* MOUNT */, 0);
      }
      updateHighlight(profiler, vnode, bindings);
      ancestorId = id;
    }
    if (skip && !bindings.isComponent(vnode)) {
      const dom = bindings.getDom(vnode);
      if (dom)
        domCache.set(dom, vnode);
    }
    let diff = 0 /* UNKNOWN */;
    let childCount = 0;
    const children = bindings.getActualChildren(vnode);
    for (let i4 = 0; i4 < children.length; i4++) {
      const child = children[i4];
      if (child != null) {
        if (commit.stats !== null) {
          diff = getDiffType(child, diff);
          childCount++;
        }
        mount(
          ids,
          commit,
          owners,
          child,
          ownerId,
          ancestorId,
          filters,
          domCache,
          config,
          profiler,
          hocs,
          bindings,
          timingsByVNode,
          renderReasonPre
        );
      }
    }
    if (commit.stats !== null) {
      updateDiffStats(commit.stats, diff, childCount);
      recordComponentStats(config, bindings, commit.stats, vnode, children);
    }
  }
  function resetChildren(commit, ids, id, vnode, filters, config, helpers) {
    const children = helpers.getActualChildren(vnode);
    if (!children.length)
      return;
    const next = getFilteredChildren(vnode, filters, config, helpers);
    let forceReorder = false;
    if (helpers.isSuspenseVNode(vnode)) {
      forceReorder = true;
    }
    if (!forceReorder && next.length < 2)
      return;
    commit.operations.push(
      5 /* REORDER_CHILDREN */,
      id,
      next.length,
      ...next.map((x3) => getVNodeId(ids, x3))
    );
  }
  function update(ids, commit, owners, vnode, ownerId, ancestorId, filters, domCache, config, profiler, hocs, bindings, timingsByVNode, renderReasonPre) {
    if (commit.stats !== null) {
      updateOpStats(commit.stats, "updates", vnode, bindings);
    }
    let diff = 0 /* UNKNOWN */;
    const skip = shouldFilter(vnode, filters, config, bindings);
    if (skip) {
      const id2 = getVNodeId(ids, vnode);
      if (filters.type.has("hoc")) {
        const name2 = bindings.getDisplayName(vnode, config);
        const res = detectHocs(commit, name2, id2, hocs);
        hocs = res.hocs;
      }
      let childCount2 = 0;
      const children2 = bindings.getActualChildren(vnode);
      for (let i4 = 0; i4 < children2.length; i4++) {
        const child = children2[i4];
        if (child != null) {
          if (commit.stats !== null) {
            diff = getDiffType(child, diff);
            childCount2++;
          }
          update(
            ids,
            commit,
            owners,
            child,
            ownerId,
            ancestorId,
            filters,
            domCache,
            config,
            profiler,
            hocs,
            bindings,
            timingsByVNode,
            renderReasonPre
          );
        }
      }
      if (commit.stats !== null) {
        updateDiffStats(commit.stats, diff, childCount2);
        recordComponentStats(config, bindings, commit.stats, vnode, children2);
      }
      return;
    }
    if (!hasVNodeId(ids, vnode)) {
      mount(
        ids,
        commit,
        owners,
        vnode,
        ownerId,
        ancestorId,
        filters,
        domCache,
        config,
        profiler,
        hocs,
        bindings,
        timingsByVNode,
        renderReasonPre
      );
      return;
    }
    const id = getVNodeId(ids, vnode);
    const oldVNode = getVNodeById(ids, id);
    updateVNodeId(ids, id, vnode);
    const didRender = timingsByVNode.end.has(vnode);
    if (!didRender) {
      return;
    }
    const name = getSignalTextName(bindings.getDisplayName(vnode, config));
    if (filters.type.has("hoc")) {
      const res = detectHocs(commit, name, id, hocs);
      hocs = res.hocs;
    }
    commit.operations.push(
      4 /* UPDATE_VNODE_TIMINGS */,
      id,
      (timingsByVNode.start.get(vnode) || 0) * 1e3,
      (timingsByVNode.end.get(vnode) || 0) * 1e3
    );
    if (profiler.isProfiling && profiler.captureRenderReasons) {
      const reason = renderReasonPre !== null ? renderReasonPre.get(vnode) || null : bindings.getRenderReasonPost(
        ids,
        bindings,
        timingsByVNode,
        oldVNode,
        vnode
      );
      if (reason !== null) {
        const count = reason.items ? reason.items.length : 0;
        commit.operations.push(6 /* RENDER_REASON */, id, reason.type, count);
        if (reason.items && count > 0) {
          commit.operations.push(
            ...reason.items.map((str) => getStringId(commit.strings, str))
          );
        }
      }
    }
    updateHighlight(profiler, vnode, bindings);
    const oldChildren = oldVNode ? bindings.getActualChildren(oldVNode).map((v5) => v5 && getVNodeId(ids, v5)) : [];
    let shouldReorder = false;
    let childCount = 0;
    const children = bindings.getActualChildren(vnode);
    for (let i4 = 0; i4 < children.length; i4++) {
      const child = children[i4];
      if (child == null) {
        const oldChildId = oldChildren[i4];
        if (oldChildId != null) {
          commit.unmountIds.push(oldChildId);
        }
      } else if (hasVNodeId(ids, child) || shouldFilter(child, filters, config, bindings)) {
        if (commit.stats !== null) {
          diff = getDiffType(child, diff);
          childCount++;
        }
        update(
          ids,
          commit,
          owners,
          child,
          ownerId,
          id,
          filters,
          domCache,
          config,
          profiler,
          hocs,
          bindings,
          timingsByVNode,
          renderReasonPre
        );
        shouldReorder = true;
      } else {
        if (commit.stats !== null) {
          diff = getDiffType(child, diff);
          childCount++;
        }
        mount(
          ids,
          commit,
          owners,
          child,
          ownerId,
          id,
          filters,
          domCache,
          config,
          profiler,
          hocs,
          bindings,
          timingsByVNode,
          renderReasonPre
        );
        shouldReorder = true;
      }
    }
    if (commit.stats !== null) {
      updateDiffStats(commit.stats, diff, childCount);
      recordComponentStats(config, bindings, commit.stats, vnode, children);
    }
    if (shouldReorder) {
      resetChildren(commit, ids, id, vnode, filters, config, bindings);
    }
  }
  function findClosestNonFilteredParent(ids, helpers, vnode) {
    let parentId = -1;
    let parent = helpers.getVNodeParent(vnode);
    while (parent !== null) {
      parentId = getVNodeId(ids, parent);
      if (parentId !== -1) {
        break;
      }
      parent = helpers.getVNodeParent(parent);
    }
    return parentId;
  }
  function createCommit(ids, roots, owners, vnode, filters, domCache, config, profiler, helpers, timingsByVNode, renderReasonPre) {
    const commit = {
      operations: [],
      rootId: -1,
      strings: /* @__PURE__ */ new Map(),
      unmountIds: [],
      renderReasons: /* @__PURE__ */ new Map(),
      stats: profiler.recordStats ? createStats() : null
    };
    let parentId = -1;
    let ownerId = -1;
    const isNew = !hasVNodeId(ids, vnode);
    if (helpers.isRoot(vnode, config)) {
      const children = helpers.getActualChildren(vnode);
      if (commit.stats !== null) {
        const childrenLen = children.length;
        commit.stats.roots[childrenLen > 4 ? 4 : childrenLen]++;
      }
      parentId = -1;
      if (children.length > 0 && helpers.isVNode(children[0])) {
        const child = children[0];
        if (roots.has(child)) {
          const dom = roots.get(child);
          roots.delete(child);
          roots.set(vnode, dom);
        }
      }
    } else {
      parentId = findClosestNonFilteredParent(ids, helpers, vnode);
      if (!isNew) {
        ownerId = shouldFilter(vnode, filters, config, helpers) ? parentId : getVNodeId(ids, vnode);
      }
    }
    if (isNew) {
      mount(
        ids,
        commit,
        owners,
        vnode,
        ownerId,
        parentId,
        filters,
        domCache,
        config,
        profiler,
        [],
        helpers,
        timingsByVNode,
        renderReasonPre
      );
    } else {
      update(
        ids,
        commit,
        owners,
        vnode,
        ownerId,
        parentId,
        filters,
        domCache,
        config,
        profiler,
        [],
        helpers,
        timingsByVNode,
        renderReasonPre
      );
    }
    let rootId = getVNodeId(ids, vnode);
    if (rootId === -1) {
      rootId = findClosestNonFilteredParent(ids, helpers, vnode);
    }
    commit.rootId = rootId;
    return commit;
  }

  // node_modules/errorstacks/dist/esm/index.mjs
  function createRawFrame(raw) {
    return {
      column: -1,
      fileName: "",
      line: -1,
      name: "",
      raw,
      sourceColumn: -1,
      sourceFileName: "",
      sourceLine: -1,
      type: ""
    };
  }
  var FIREFOX_WEBKIT = /([^@]+|^)@(.*):(\d+):(\d+)/;
  var WEBKIT_ADDRESS_UNNAMED = /^(http(s)?:\/\/.*):(\d+):(\d+)$/;
  var WEBKIT_NATIVE_UNNAMED = "[native code]";
  function parsWebkit(str) {
    if (str.includes(WEBKIT_NATIVE_UNNAMED)) {
      return {
        line: -1,
        column: -1,
        type: "native",
        fileName: "",
        name: "",
        raw: str,
        sourceColumn: -1,
        sourceFileName: "",
        sourceLine: -1
      };
    }
    var match = str.match(WEBKIT_ADDRESS_UNNAMED);
    if (match) {
      var line = match[3] ? +match[3] : -1;
      var column = match[4] ? +match[4] : -1;
      var fileName = match[1] ? match[1] : "";
      return {
        line,
        column,
        type: "",
        fileName,
        name: "",
        raw: str,
        sourceColumn: -1,
        sourceFileName: "",
        sourceLine: -1
      };
    }
    return createRawFrame(str);
  }
  function parseFirefoxWebkit(lines) {
    return lines.map(function(str) {
      var match = str.match(FIREFOX_WEBKIT);
      if (!match) {
        return parsWebkit(str);
      }
      var line = match[3] ? +match[3] : -1;
      var column = match[4] ? +match[4] : -1;
      var fileName = match[2] ? match[2] : "";
      return {
        line,
        column,
        type: match[0] ? "" : "native",
        fileName,
        name: (match[1] || "").trim(),
        raw: str,
        sourceColumn: -1,
        sourceFileName: "",
        sourceLine: -1
      };
    });
  }
  var CHROME_MAPPED = /(.*?):(\d+):(\d+)(\s<-\s(.+):(\d+):(\d+))?/;
  function parseMapped(frame, maybeMapped) {
    var match = maybeMapped.match(CHROME_MAPPED);
    if (match) {
      frame.fileName = match[1];
      frame.line = +match[2];
      frame.column = +match[3];
      if (match[5])
        frame.sourceFileName = match[5];
      if (match[6])
        frame.sourceLine = +match[6];
      if (match[7])
        frame.sourceColumn = +match[7];
    }
  }
  var CHROME_IE_NATIVE_NO_LINE = /^at\s(<.*>)$/;
  var CHROME_IE_NATIVE = /^\s*at\s(<.*>):(\d+):(\d+)$/;
  var CHROME_IE_FUNCTION = /^at\s(.*)\s\((.*)\)$/;
  var CHROME_IE_FUNCTION_WITH_CALL = /^([\w\W]*)\s\((.*)\)/;
  var CHROME_IE_DETECTOR = /\s*at\s.+/;
  var CHROME_BLANK = /\s*at\s(.*):(\d+):(\d+)$/;
  function parseChromeIe(lines) {
    var start = lines.findIndex(function(line) {
      return CHROME_IE_DETECTOR.test(line);
    });
    if (start === -1) {
      return [];
    }
    var frames = [];
    for (var i4 = start; i4 < lines.length; i4++) {
      var str = lines[i4].replace(/^\s+|\s+$/g, "");
      var frame = createRawFrame(lines[i4]);
      var nativeNoLine = str.match(CHROME_IE_NATIVE_NO_LINE);
      if (nativeNoLine) {
        frame.fileName = nativeNoLine[1];
        frame.type = "native";
        frames.push(frame);
        continue;
      }
      var native = str.match(CHROME_IE_NATIVE);
      if (native) {
        frame.fileName = native[1];
        frame.type = "native";
        if (native[2])
          frame.line = +native[2];
        if (native[3])
          frame.column = +native[3];
        frames.push(frame);
        continue;
      }
      var withFn = str.match(CHROME_IE_FUNCTION);
      if (withFn) {
        frame.name = withFn[1];
        parseMapped(frame, withFn[2]);
        frames.push(frame);
        continue;
      }
      var blank = str.match(CHROME_BLANK);
      if (blank) {
        frame.fileName = blank[1];
        frame.line = +blank[2];
        frame.column = +blank[3];
        parseMapped(frame, blank[1] + ":" + blank[2] + ":" + blank[3]);
        frames.push(frame);
        continue;
      }
      var withFnCall = str.match(CHROME_IE_FUNCTION_WITH_CALL);
      if (withFnCall) {
        frame.name = withFnCall[1];
        parseMapped(frame, withFnCall[2]);
        frames.push(frame);
        continue;
      }
      frames.push(frame);
    }
    return frames;
  }
  function parseStackTrace(stack) {
    if (!stack)
      return [];
    var lines = stack.split("\n").filter(Boolean);
    if (lines.some(function(line) {
      return CHROME_IE_DETECTOR.test(line);
    })) {
      return parseChromeIe(lines);
    }
    return parseFirefoxWebkit(lines);
  }

  // src/view/components/sidebar/inspect/parseProps.ts
  function parseProps(data, path, limit, depth = 0, name = path, out = /* @__PURE__ */ new Map(), forceReadonly = false) {
    if (depth >= limit) {
      out.set(path, {
        depth,
        name,
        id: path,
        type: "string",
        editable: false,
        value: "\u2026",
        children: [],
        meta: null
      });
      return out;
    }
    if (Array.isArray(data)) {
      const children = [];
      out.set(path, {
        depth,
        name,
        id: path,
        type: "array",
        editable: false,
        value: data,
        children,
        meta: null
      });
      data.forEach((item, i4) => {
        const childPath = `${path}.${i4}`;
        children.push(childPath);
        parseProps(item, childPath, limit, depth + 1, "" + i4, out, forceReadonly);
      });
    } else if (typeof data === "object") {
      if (data === null) {
        out.set(path, {
          depth,
          name,
          id: path,
          type: "null",
          editable: false,
          value: data,
          children: [],
          meta: null
        });
      } else {
        const keys = Object.keys(data);
        const maybeCustom = keys.length === 2;
        const maybeCollection = keys.length === 3;
        if (maybeCustom && typeof data.name === "string" && data.type === "function") {
          out.set(path, {
            depth,
            name,
            id: path,
            type: "function",
            editable: false,
            value: data,
            children: [],
            meta: null
          });
        } else if (maybeCustom && typeof data.value === "string" && data.type === "bigint") {
          out.set(path, {
            depth,
            name,
            id: path,
            type: "bigint",
            editable: !forceReadonly,
            value: data,
            children: [],
            meta: null
          });
        } else if (maybeCustom && typeof data.name === "string" && data.type === "vnode") {
          out.set(path, {
            depth,
            name,
            id: path,
            type: "vnode",
            editable: false,
            value: data,
            children: [],
            meta: null
          });
        } else if (maybeCollection && typeof data.name === "string" && data.type === "set") {
          const children = [];
          const node = {
            depth,
            name,
            id: path,
            type: "set",
            editable: false,
            value: data,
            children,
            meta: null
          };
          data.entries.forEach((item, i4) => {
            const childPath = `${path}.${i4}`;
            children.push(childPath);
            parseProps(
              item,
              childPath,
              limit,
              depth + 1,
              "" + i4,
              out,
              forceReadonly
            );
          });
          out.set(path, node);
        } else if (maybeCollection && typeof data.name === "string" && data.type === "map") {
          const children = [];
          const node = {
            depth,
            name,
            id: path,
            type: "map",
            editable: false,
            value: data,
            children,
            meta: null
          };
          data.entries.forEach((item, i4) => {
            const childPath = `${path}.${i4}`;
            children.push(childPath);
            parseProps(
              item,
              childPath,
              limit,
              depth + 1,
              "" + i4,
              out,
              forceReadonly
            );
          });
          out.set(path, node);
        } else if (maybeCustom && typeof data.name === "string" && data.type === "blob") {
          out.set(path, {
            depth,
            name,
            id: path,
            type: "blob",
            editable: false,
            value: data,
            children: [],
            meta: null
          });
        } else if (maybeCustom && typeof data.name === "string" && data.type === "symbol") {
          out.set(path, {
            depth,
            name,
            id: path,
            type: "symbol",
            editable: false,
            value: data,
            children: [],
            meta: null
          });
        } else if (maybeCustom && typeof data.name === "string" && data.type === "html") {
          out.set(path, {
            depth,
            name,
            id: path,
            type: "html",
            editable: false,
            value: data,
            children: [],
            meta: null
          });
        } else if (maybeCollection && typeof data.name === "string" && data.type === "signal") {
          const children = [];
          const isEditable2 = data.name === "Signal";
          const node = {
            depth,
            name,
            id: path,
            type: "signal",
            editable: isEditable2,
            value: data,
            children,
            meta: null
          };
          const childPath = `${path}.value`;
          children.push(childPath);
          out.set(path, node);
          parseProps(
            data.value,
            childPath,
            limit,
            depth + 1,
            "value",
            out,
            !isEditable2
          );
        } else {
          const node = {
            depth,
            name,
            id: path,
            type: "object",
            editable: false,
            value: data,
            children: [],
            meta: null
          };
          out.set(path, node);
          Object.keys(data).forEach((key) => {
            const nextPath = `${path}.${key}`;
            node.children.push(nextPath);
            parseProps(
              data[key],
              nextPath,
              limit,
              depth + 1,
              key,
              out,
              forceReadonly
            );
          });
          out.set(path, node);
        }
      }
    } else {
      const type = typeof data;
      out.set(path, {
        depth,
        name,
        id: path,
        type,
        editable: type !== "undefined" && data !== "[[Circular]]" && !forceReadonly,
        value: data,
        children: [],
        meta: null
      });
    }
    return out;
  }

  // src/view/components/tree/windowing.ts
  function flattenChildren(tree, id, isCollapsed) {
    const out = [];
    const visited = /* @__PURE__ */ new Set();
    const stack = [id];
    while (stack.length > 0) {
      const item = stack.pop();
      if (item == null)
        continue;
      const node = tree.get(item);
      if (!node)
        continue;
      if (!visited.has(node.id)) {
        out.push(node.id);
        visited.add(node.id);
        if (!isCollapsed(node.id)) {
          for (let i4 = node.children.length; i4--; ) {
            stack.push(node.children[i4]);
          }
        }
      }
    }
    return out;
  }

  // src/adapter/shared/hooks.ts
  var HookType = /* @__PURE__ */ ((HookType2) => {
    HookType2[HookType2["useState"] = 1] = "useState";
    HookType2[HookType2["useReducer"] = 2] = "useReducer";
    HookType2[HookType2["useEffect"] = 3] = "useEffect";
    HookType2[HookType2["useLayoutEffect"] = 4] = "useLayoutEffect";
    HookType2[HookType2["useRef"] = 5] = "useRef";
    HookType2[HookType2["useImperativeHandle"] = 6] = "useImperativeHandle";
    HookType2[HookType2["useMemo"] = 7] = "useMemo";
    HookType2[HookType2["useCallback"] = 8] = "useCallback";
    HookType2[HookType2["useContext"] = 9] = "useContext";
    HookType2[HookType2["useErrorBoundary"] = 10] = "useErrorBoundary";
    HookType2[HookType2["useDebugValue"] = 11] = "useDebugValue";
    HookType2[HookType2["custom"] = 99] = "custom";
    HookType2[HookType2["devtoolsParent"] = 9999] = "devtoolsParent";
    return HookType2;
  })(HookType || {});
  var hookLog = [];
  var inspectingHooks = false;
  var ancestorName = "unknown";
  var debugValues = /* @__PURE__ */ new Map();
  var debugNames = [];
  function addHookName(name) {
    if (!inspectingHooks)
      return;
    debugNames.push(String(name));
  }
  function addDebugValue(value2) {
    if (!inspectingHooks)
      return;
    const last = hookLog.pop();
    const location = last.stack.reverse().slice(0, -1).map((x3) => x3.name === "root" ? x3.name : `${x3.location}.${x3.name}`).join(".");
    debugValues.set(location, value2);
  }
  var ignoreNext = false;
  function addHookStack(type) {
    if (!inspectingHooks || ignoreNext) {
      ignoreNext = false;
      return;
    }
    if (type === 10 /* useErrorBoundary */) {
      ignoreNext = true;
    }
    const oldLimit = Error.stackTraceLimit;
    Error.stackTraceLimit = 1e3;
    const err = new Error();
    let stack = err.stack ? parseStackTrace(err.stack) : [];
    const ancestorIdx = stack.findIndex((x3) => x3.name === ancestorName);
    if (ancestorIdx > -1 && stack.length > 0) {
      let trim = type === 11 /* useDebugValue */ ? 2 : 3;
      if (type === 1 /* useState */ || type === 6 /* useImperativeHandle */ || type === 8 /* useCallback */ || type === 5 /* useRef */) {
        trim += 1;
      }
      stack = stack.slice(trim, ancestorIdx);
    }
    const normalized = [];
    for (let i4 = 0; i4 < stack.length; i4++) {
      if (i4 === stack.length - 1) {
        normalized.push({ name: "root", location: "root" });
        continue;
      }
      const frame = stack[i4];
      const next = stack[i4 + 1];
      normalized.push({
        name: frame.name,
        location: `${next.fileName.replace(window.origin, "")}:${next.line}:${next.column}`
      });
    }
    hookLog.push({ type, stack: normalized });
    Error.stackTraceLimit = oldLimit;
  }
  function parseHookData(config, data, vnode, userHookNames, bindings) {
    const tree = /* @__PURE__ */ new Map();
    const root3 = {
      children: [],
      depth: 0,
      name: "root",
      editable: false,
      id: "root",
      type: "object",
      value: null,
      meta: null
    };
    tree.set("root", root3);
    const out = [root3];
    data.forEach((hook, hookIdx) => {
      const type = HookType[hook.type];
      let parentId = "root";
      for (let i4 = hook.stack.length - 2; i4 >= 0; i4--) {
        const frame = hook.stack[i4];
        const isNative = i4 === 0;
        const id = `${parentId}.${frame.location}.${frame.name}`;
        if (!tree.has(id)) {
          let value2 = "__preact_empty__";
          let editable = false;
          let children = [];
          let nodeType = "undefined";
          const depth = hook.stack.length - i4 - 1;
          let name = isNative ? type : frame.name;
          if (isNative && userHookNames.length > 0 && (hook.type === 1 /* useState */ || hook.type === 5 /* useRef */ || hook.type === 7 /* useMemo */ || hook.type === 2 /* useReducer */)) {
            name = `${name} ${userHookNames.pop()}`;
          }
          if (debugValues.has(id)) {
            value2 = serialize(config, bindings, debugValues.get(id));
          }
          const hookValueTree = [];
          if (isNative) {
            const s5 = bindings.getHookState(vnode, hookIdx, hook.type);
            const rawValue = Array.isArray(s5) ? s5[0] : s5;
            value2 = serialize(config, bindings, rawValue);
            if (typeof rawValue === "object" && !(rawValue instanceof Element)) {
              const valueTree = parseProps(value2, id, 8, 1, name);
              children = valueTree.get(id).children;
              const flat = flattenChildren(valueTree, id, () => false).slice(1);
              for (let j3 = 0; j3 < flat.length; j3++) {
                const data2 = valueTree.get(flat[j3]);
                hookValueTree.push(data2);
              }
              if (hookValueTree.length > 1) {
                nodeType = hookValueTree[0].type;
              }
            }
            editable = (hook.type === 1 /* useState */ || hook.type === 2 /* useReducer */) && isEditable(rawValue);
          }
          const item = {
            children,
            depth,
            editable,
            id,
            name,
            type: nodeType,
            meta: isNative ? {
              index: hookIdx,
              type
            } : frame.name,
            value: value2,
            index: hookIdx
          };
          tree.set(id, item);
          out.push(item);
          if (tree.has(parentId)) {
            tree.get(parentId).children.push(id);
          }
          if (hookValueTree.length) {
            hookValueTree.forEach((v5) => {
              tree.set(v5.id, v5);
              out.push(v5);
            });
          }
        }
        parentId = id;
      }
    });
    return out;
  }
  function inspectHooks(config, options, vnode, helpers) {
    inspectingHooks = true;
    hookLog = [];
    debugValues.clear();
    debugNames = [];
    ancestorName = parseStackTrace(new Error().stack)[0].name;
    const c4 = helpers.getComponent(vnode);
    const isClass = vnode.type.prototype && vnode.type.prototype.render;
    options._skipEffects = options.__s = true;
    const prevConsole = {};
    for (const method in console) {
      try {
        prevConsole[method] = console[method];
        console[method] = () => void 0;
      } catch (error) {
      }
    }
    let pendingValues = null;
    let statefulHooks = null;
    try {
      const hooks = helpers.getComponentHooks(vnode);
      if (hooks === null)
        return [];
      statefulHooks = helpers.getStatefulHooks(vnode);
      if (statefulHooks !== null) {
        pendingValues = statefulHooks.map((s5) => helpers.getPendingHookValue(s5));
      }
      const dummy = {
        props: c4.props,
        context: c4.context,
        state: {},
        __hooks: hooks,
        __H: hooks,
        __v: null
      };
      const renderHook = options.__r || options._render;
      if (renderHook) {
        const dummyVNode = _("div", null);
        dummyVNode._component = dummy;
        dummyVNode.__c = dummy;
        dummy.__v = dummyVNode;
        dummyVNode.data = {
          __hooks: hooks,
          __H: hooks
        };
        renderHook(dummyVNode, null);
      }
      if (isClass) {
        c4.render.call(dummy, dummy.props, dummy.state);
      } else {
        if (c4.constructor === Object) {
          vnode.type.call(dummy, dummy.props, dummy.context);
        } else {
          c4.constructor.call(dummy, dummy.props, dummy.context);
        }
      }
      const diffedHook = options.diffed;
      if (diffedHook)
        diffedHook(vnode);
    } catch (error) {
    } finally {
      if (pendingValues !== null && statefulHooks !== null) {
        pendingValues.forEach((original, i4) => {
          if (original !== void 0) {
            helpers.setPendingHookValue(statefulHooks[i4], original);
          }
        });
      }
      for (const method in prevConsole) {
        try {
          console[method] = prevConsole[method];
        } catch (error) {
        }
      }
      options._skipEffects = options.__s = false;
    }
    const parsed = hookLog.length ? parseHookData(config, hookLog, vnode, [...debugNames].reverse(), helpers) : null;
    debugNames = [];
    inspectingHooks = false;
    ancestorName = "unknown";
    hookLog = [];
    return parsed;
  }

  // src/adapter/shared/inspectVNode.ts
  function inspectVNode(ids, config, bindings, options, id, supportsHooks, version) {
    const vnode = getVNodeById(ids, id);
    if (!vnode)
      return null;
    const c4 = bindings.getComponent(vnode);
    const hasState = bindings.isComponent(vnode) && c4 != null && typeof c4.state === "object" && c4.state != null && Object.keys(c4.state).length > 0;
    const isSignalTextNode = typeof vnode.type === "function" && vnode.type.displayName === "_st";
    const hasHooks = c4 != null && !isSignalTextNode && bindings.getComponentHooks(vnode) != null;
    const hooks = supportsHooks && hasHooks ? inspectHooks(config, options, vnode, bindings) : null;
    const context = c4 != null ? serialize(config, bindings, cleanContext(c4.context)) : null;
    const props = vnode.type !== null ? serialize(config, bindings, cleanProps(vnode.props)) : null;
    const state = hasState ? serialize(config, bindings, c4.state) : null;
    const signals = c4 != null && "__$u" in c4 ? inspectSignalSubscriptions(config, bindings, c4.__$u.s) : null;
    let suspended = false;
    let canSuspend = false;
    let item = vnode;
    while (item) {
      if (bindings.isSuspenseVNode(item)) {
        canSuspend = true;
        const res = bindings.getSuspendedState(item);
        if (res !== null) {
          suspended = res;
        }
        break;
      }
      item = bindings.getVNodeParent(item);
    }
    return {
      context,
      canSuspend,
      key: vnode.key || null,
      hooks: supportsHooks ? hooks : !supportsHooks && hasHooks ? [] : null,
      id,
      name: getSignalTextName(bindings.getDisplayName(vnode, config)),
      props,
      state,
      signals,
      type: getDevtoolsType(vnode, bindings),
      suspended,
      version
    };
  }
  function inspectSignalSubscriptions(config, bindings, node) {
    const out = {};
    let i4 = 0;
    const seen = /* @__PURE__ */ new Set();
    while (node !== null && node !== void 0 && !seen.has(node)) {
      seen.add(node);
      out[i4] = serialize(config, bindings, node.S);
      node = node.n;
      i4++;
    }
    return i4 > 0 ? out : null;
  }

  // src/adapter/10/renderReason.ts
  function getRenderReasonPost(ids, bindings, timings, old, next) {
    if (old === null) {
      return next !== null ? createReason(1 /* MOUNT */, null) : null;
    } else if (next === null) {
      return null;
    } else if (typeof old.type === "function" && old.type === next.type) {
      const c4 = bindings.getComponent(next);
      if (c4 !== null) {
        const hooks = bindings.getStatefulHooks(next);
        if (hooks !== null && Array.isArray(c4._oldHookValues)) {
          const hooksChanged = [];
          for (let i4 = 0; i4 < hooks.length; i4++) {
            if (bindings.isUseReducerOrState(hooks[i4]) && c4._oldHookValues[i4] !== bindings.getStatefulHookValue(hooks[i4])) {
              hooksChanged.push(String(i4));
            }
          }
          if (hooksChanged.length > 0) {
            return createReason(5 /* HOOKS_CHANGED */, hooksChanged);
          }
        }
        const prevState = c4._prevState;
        if (prevState != null && prevState !== c4.state) {
          return createReason(
            4 /* STATE_CHANGED */,
            getChangedKeys(prevState, c4.state)
          );
        } else if (prevState === void 0 && c4.state !== void 0 && Object.keys(c4.state).length > 0) {
          return createReason(4 /* STATE_CHANGED */, null);
        }
      }
    }
    if (old.props !== next.props) {
      const propsChanged = getChangedKeys(old.props, next.props);
      if (propsChanged.length > 0) {
        return createReason(3 /* PROPS_CHANGED */, propsChanged);
      }
    }
    const parent = bindings.getVNodeParent(next);
    if (parent != null && (timings.start.get(next) || 0) >= (timings.start.get(parent) || 0) && (timings.end.get(next) || 0) <= (timings.end.get(parent) || 0)) {
      return createReason(2 /* PARENT_UPDATE */, null);
    }
    return createReason(6 /* FORCE_UPDATE */, null);
  }

  // src/adapter/10/bindings.ts
  function getVNodeParent(vnode) {
    return vnode._parent || vnode.__ || vnode.__p || null;
  }
  function isRoot(vnode, config) {
    return getVNodeParent(vnode) == null && vnode.type === config.Fragment;
  }
  function getComponent(node) {
    return node._component || node.__c || null;
  }
  function getDom(vnode) {
    return vnode._dom || vnode.__e || null;
  }
  function hasDom(x3) {
    return x3 != null && ("_dom" in x3 || "__e" in x3);
  }
  function isSuspenseVNode(vnode) {
    const c4 = getComponent(vnode);
    return c4 != null && !!(c4._childDidSuspend || c4.__c);
  }
  function getComponentHooks(vnode) {
    const c4 = getComponent(vnode);
    if (!c4)
      return null;
    return c4.__hooks || c4.__H || null;
  }
  function getStatefulHooks(vnode) {
    const hooks = getComponentHooks(vnode);
    return hooks !== null ? hooks._list || hooks.__ || hooks.i || null : null;
  }
  function isUseReducerOrState(hookState) {
    return !!hookState._component || !!hookState.__c;
  }
  function getStatefulHookValue(hookState) {
    if (hookState !== null) {
      const value2 = hookState._value || hookState.__ || null;
      if (value2 !== null && Array.isArray(value2)) {
        return value2[0];
      }
    }
    return null;
  }
  function getPendingHookValue(state) {
    if (state.__pendingValue !== void 0) {
      return state.__pendingValue;
    } else if (state.__V !== void 0) {
      return state.__V;
    } else if (state.o !== void 0) {
      return state.o;
    }
    return void 0;
  }
  function setPendingHookValue(state, value2) {
    if ("__pendingValue" in state) {
      state.__pendingValue = value2;
    } else if ("__V" in state) {
      state.__V = value2;
    } else if ("o" in state) {
      state.o = value2;
    }
  }
  function getHookState(vnode, index, type) {
    const c4 = getComponent(vnode);
    if (c4 === null)
      return null;
    const list = getStatefulHooks(vnode);
    if (list && list[index]) {
      if (type === 9 /* useContext */) {
        const context = list[index]._context || list[index].__c || list[index].c;
        const provider = c4.context[context._id] || c4.context[context.__c];
        return provider ? provider.props.value : context._defaultValue || context.__;
      }
      let value2;
      const state = list[index];
      if ("_value" in state) {
        value2 = state._value;
      } else if ("__" in state) {
        value2 = state.__;
      } else {
        value2 = getPendingHookValue(list[index]);
      }
      if (type === 5 /* useRef */) {
        return value2.current;
      } else if (type === 10 /* useErrorBoundary */ && !value2) {
        return "__preact_empty__";
      }
      return value2;
    }
    return [];
  }
  function getActualChildren(vnode) {
    return vnode._children || vnode.__k || [];
  }
  function getDisplayName(vnode, config) {
    const { type } = vnode;
    if (type === config.Fragment)
      return "Fragment";
    else if (typeof type === "function") {
      const c4 = getComponent(vnode);
      if (c4 !== null) {
        if (c4.constructor) {
          const ct = c4.constructor.contextType;
          if (ct && ct.Consumer === type) {
            const name = ct.displayName ? ct.displayName + "." : "";
            return `${name}Consumer`;
          }
        }
        if (c4.sub) {
          const ctx = type._contextRef || ("__l" in type ? type.__l : type.__);
          if (ctx) {
            const name = ctx.displayName ? ctx.displayName + "." : "";
            return `${name}Provider`;
          }
        }
        if (isSuspenseVNode(vnode)) {
          return "Suspense";
        }
        if (type === config.Component) {
          return "Component";
        }
      }
      return type.displayName || type.name || "Anonymous";
    } else if (typeof type === "string")
      return type;
    return "#text";
  }
  function getNextState(c4) {
    return c4._nextState || c4.__s || null;
  }
  function setNextState(c4, value2) {
    return c4._nextState = c4.__s = value2;
  }
  function getSuspenseStateKey(c4) {
    if ("_suspended" in c4.state) {
      return "_suspended";
    } else if ("__e" in c4.state) {
      return "__e";
    }
    const keys = Object.keys(c4.state);
    if (keys.length > 0) {
      return keys[0];
    }
    return null;
  }
  function getSuspendedState(vnode) {
    const c4 = getComponent(vnode);
    if (c4) {
      const key = getSuspenseStateKey(c4);
      if (key) {
        return !!c4._nextState[key];
      }
    }
    return null;
  }
  function isTextVNode(vnode) {
    return vnode !== null && vnode.type === null;
  }
  function createSuspenseState(vnode, suspended) {
    const c4 = getComponent(vnode);
    const key = getSuspenseStateKey(c4);
    if (c4 && key) {
      return { [key]: suspended };
    }
    return {};
  }
  function getInstance(vnode) {
    if (typeof vnode.type === "function") {
      return getComponent(vnode);
    }
    return getDom(vnode);
  }
  function isComponent(vnode) {
    return vnode !== null && typeof vnode.type === "function";
  }
  function isVNode(x3) {
    return x3 != null && x3.type !== void 0 && hasDom(x3);
  }
  function isElement(vnode) {
    return typeof vnode.type === "string";
  }
  function isPortal(vnode) {
    return false;
  }
  var bindingsV10 = {
    isRoot,
    getDisplayName,
    getPropsVNodeDisplayName: getDisplayName,
    getActualChildren,
    getDom,
    isTextVNode,
    getInstance,
    createSuspenseState,
    getComponent,
    getComponentHooks,
    getHookState,
    getPendingHookValue,
    setPendingHookValue,
    getVNodeParent,
    isComponent,
    isElement,
    isSuspenseVNode,
    getSuspendedState,
    isVNode,
    setNextState,
    isPortal,
    getStatefulHookValue,
    getStatefulHooks,
    isUseReducerOrState,
    getRenderReasonPost
  };

  // src/adapter/10/log.ts
  function logVNode(ids, config, id, children) {
    const vnode = getVNodeById(ids, id);
    if (vnode == null) {
      console.warn(`Could not find vnode with id ${id}`);
      return;
    }
    const display = getDisplayName(vnode, config);
    const name = display === "#text" ? display : `<${display || "Component"} />`;
    console.group(`LOG %c${name}`, "color: #ea88fd; font-weight: normal");
    console.log("props:", vnode.props);
    const c4 = getComponent(vnode);
    if (c4 != null) {
      console.log("state:", c4.state);
    }
    console.log("vnode:", vnode);
    console.log("devtools id:", id);
    console.log("devtools children:", children);
    console.groupEnd();
  }

  // src/view/components/sidebar/inspect/serializeProps.ts
  function isSerializedBigint(value2) {
    return typeof value2 === "object" && value2 !== null && Object.keys(value2).length === 2 && "type" in value2 && value2.type === "bigint" && "value" in value2 && typeof value2.value === "string";
  }

  // src/adapter/shared/renderer.ts
  var memoReg = /^Memo\(/;
  var forwardRefReg = /^ForwardRef\(/;
  function getDevtoolsType(vnode, bindings) {
    if (bindings.isComponent(vnode)) {
      const name = vnode.type.displayName || "";
      if (memoReg.test(name))
        return 5 /* Memo */;
      if (forwardRefReg.test(name))
        return 4 /* ForwardRef */;
      if (bindings.isSuspenseVNode(vnode))
        return 6 /* Suspense */;
      if (bindings.isPortal(vnode))
        return 9 /* Portal */;
      return vnode.type.prototype && vnode.type.prototype.render ? 2 /* ClassComponent */ : 3 /* FunctionComponent */;
    }
    return 1 /* Element */;
  }
  function createRenderer(port, config, options, supports, profiler, filters, ids, bindings, roots, version) {
    let currentUnmounts = [];
    let prevOwners = /* @__PURE__ */ new Map();
    let rootSize = roots.size;
    const domToVNode = /* @__PURE__ */ new WeakMap();
    let unmountStats = {
      components: 0,
      elements: 0,
      text: 0
    };
    function onUnmount(vnode) {
      if (profiler.recordStats) {
        if (bindings.isComponent(vnode)) {
          unmountStats.components++;
        } else if (bindings.isElement(vnode)) {
          unmountStats.elements++;
        } else {
          unmountStats.text++;
        }
      }
      if (!shouldFilter(vnode, filters, config, bindings)) {
        if (hasVNodeId(ids, vnode)) {
          currentUnmounts.push(getVNodeId(ids, vnode));
        }
      }
      if (!bindings.isComponent(vnode)) {
        const dom = bindings.getDom(vnode);
        if (dom != null)
          domToVNode.delete(dom);
      }
      removeVNodeId(ids, vnode);
    }
    const inspect = (id) => {
      return inspectVNode(
        ids,
        config,
        bindings,
        options,
        id,
        supports.hooks,
        version
      );
    };
    return {
      clear() {
        roots.forEach((dom, vnode) => {
          onUnmount(vnode);
        });
      },
      getRootMappings() {
        return Array.from(roots.entries()).map((entry) => {
          return newRootData(getVNodeId(ids, entry[0]), entry[1]);
        });
      },
      getVNodeById: (id) => getVNodeById(ids, id),
      getDisplayName(vnode) {
        return bindings.getDisplayName(vnode, config);
      },
      log: (id, children) => logVNode(ids, config, id, children),
      inspect,
      findDomForVNode(id) {
        const vnode = getVNodeById(ids, id);
        if (!vnode)
          return null;
        let first = null;
        let last = null;
        let stack = [vnode];
        let item;
        while ((item = stack.shift()) !== void 0) {
          if (item === null)
            continue;
          if (!bindings.isComponent(item)) {
            first = bindings.getDom(item);
            break;
          }
          stack.push(...bindings.getActualChildren(item));
        }
        if (first !== null) {
          stack = [vnode];
          while ((item = stack.pop()) !== void 0) {
            if (item === null)
              continue;
            if (!bindings.isComponent(item)) {
              last = bindings.getDom(item);
              break;
            }
            stack.push(...bindings.getActualChildren(item));
          }
        }
        return [first, first === last ? null : last];
      },
      findVNodeIdForDom(node) {
        const vnode = domToVNode.get(node);
        if (vnode) {
          if (shouldFilter(vnode, filters, config, bindings)) {
            let p5 = vnode;
            let found = null;
            while ((p5 = bindings.getVNodeParent(p5)) != null) {
              if (!shouldFilter(p5, filters, config, bindings)) {
                found = p5;
                break;
              }
            }
            if (found != null) {
              return getVNodeId(ids, found);
            }
          } else {
            return getVNodeId(ids, vnode);
          }
        }
        return -1;
      },
      refresh() {
        this.applyFilters(filters);
      },
      applyFilters(nextFilters) {
        const queue = [];
        roots.forEach((dom, root3) => {
          const rootId = getVNodeId(ids, root3);
          unmountStats = {
            components: 0,
            elements: 0,
            text: 0
          };
          traverse(root3, (vnode) => this.onUnmount(vnode), bindings);
          const commit = {
            operations: [],
            rootId,
            strings: /* @__PURE__ */ new Map(),
            unmountIds: currentUnmounts,
            stats: profiler.recordStats ? createStats() : null
          };
          if (commit.stats !== null) {
            commit.stats.unmounts = unmountStats;
          }
          const unmounts = flush(commit);
          if (unmounts) {
            currentUnmounts = [];
            queue.push(unmounts);
          }
        });
        filters.regex = nextFilters.regex;
        filters.type = nextFilters.type;
        roots.forEach((dom, root3) => {
          const commit = createCommit(
            ids,
            roots,
            prevOwners,
            root3,
            filters,
            domToVNode,
            config,
            profiler,
            bindings,
            { start: /* @__PURE__ */ new Map(), end: /* @__PURE__ */ new Map() },
            null
          );
          const ev = flush(commit);
          if (!ev)
            return;
          queue.push(ev);
        });
        queue.forEach((ev) => port.send(ev.type, ev.data));
        port.send("root-order-page", null);
      },
      onCommit(vnode, owners, timingsByVNode, renderReasonPre) {
        const commit = createCommit(
          ids,
          roots,
          owners,
          vnode,
          filters,
          domToVNode,
          config,
          profiler,
          bindings,
          timingsByVNode,
          renderReasonPre
        );
        prevOwners = owners;
        timingsByVNode.start.clear();
        timingsByVNode.end.clear();
        if (commit.stats !== null) {
          commit.stats.unmounts = unmountStats;
          unmountStats = {
            components: 0,
            elements: 0,
            text: 0
          };
        }
        commit.unmountIds.push(...currentUnmounts);
        currentUnmounts = [];
        const ev = flush(commit);
        if (!ev)
          return;
        if (profiler.updateRects.size > 0) {
          startDrawing(profiler.updateRects);
          profiler.pendingHighlightUpdates.clear();
        }
        port.send(ev.type, ev.data);
        if (rootSize !== roots.size) {
          rootSize = roots.size;
          port.send("root-order-page", null);
        }
      },
      onUnmount,
      update(id, type, path, value2) {
        if (isSerializedBigint(value2)) {
          value2 = BigInt(value2.value);
        }
        const vnode = getVNodeById(ids, id);
        if (vnode !== null) {
          if (bindings.isComponent(vnode)) {
            const c4 = bindings.getComponent(vnode);
            if (c4) {
              if (type === "props") {
                vnode.props = setInCopy(
                  vnode.props || {},
                  path.slice(),
                  value2
                );
              } else if (type === "state") {
                const res = setInCopy(
                  c4.state || {},
                  path.slice(),
                  value2
                );
                bindings.setNextState(c4, res);
              } else if (type === "context") {
                setIn(c4.context || {}, path.slice(), value2);
              }
              c4.forceUpdate();
            }
          }
        }
      },
      updateHook(id, index, value2) {
        if (isSerializedBigint(value2)) {
          value2 = BigInt(value2.value);
        }
        const vnode = getVNodeById(ids, id);
        if (vnode !== null && bindings.isComponent(vnode)) {
          const c4 = bindings.getComponent(vnode);
          if (c4) {
            const s5 = bindings.getHookState(vnode, index);
            s5[0] = value2;
            c4.forceUpdate();
          }
        }
      },
      updateSignal(id, index, value2) {
        if (isSerializedBigint(value2)) {
          value2 = BigInt(value2.value);
        }
        const vnode = getVNodeById(ids, id);
        if (vnode !== null && bindings.isComponent(vnode)) {
          const c4 = bindings.getComponent(vnode);
          if (c4 !== null && "__$u" in c4) {
            let node = c4.__$u.s;
            let i4 = 0;
            const seen = /* @__PURE__ */ new Set();
            while (node !== null && node !== void 0 && !seen.has(node)) {
              if (i4 === index) {
                node.S.value = value2;
                return;
              }
              seen.add(node);
              node = node.n;
              i4++;
            }
          }
        }
      },
      suspend(id, active) {
        let vnode = getVNodeById(ids, id);
        while (vnode !== null) {
          if (bindings.isSuspenseVNode(vnode)) {
            const c4 = bindings.getComponent(vnode);
            if (c4) {
              c4.setState(bindings.createSuspenseState(vnode, active));
            }
            let nearest = vnode;
            while (nearest && shouldFilter(nearest, filters, config, bindings)) {
              nearest = bindings.getVNodeParent(nearest);
            }
            if (nearest && hasVNodeId(ids, nearest)) {
              const nearestId = getVNodeId(ids, nearest);
              if (id !== nearestId) {
                const inspectData = inspect(nearestId);
                if (inspectData) {
                  inspectData.suspended = active;
                  port.send("inspect-result", inspectData);
                }
              }
            }
            break;
          }
          vnode = bindings.getVNodeParent(vnode);
        }
      }
    };
  }

  // src/adapter/marks.ts
  var markName = (s5) => `\u269B ${s5}`;
  var supportsPerformance = globalThis.performance && typeof globalThis.performance.getEntriesByName === "function";
  function recordMark(s5) {
    if (supportsPerformance) {
      performance.mark(markName(s5));
    }
  }
  function endMark(nodeName) {
    if (supportsPerformance) {
      const name = markName(nodeName);
      const start = `${name}_diff`;
      const end = `${name}_diffed`;
      try {
        performance.mark(end);
        performance.measure(name, start, end);
        performance.clearMarks(start);
        performance.clearMarks(end);
      } catch (e4) {
      }
    }
  }

  // src/adapter/shared/timings.ts
  function createVNodeTimings() {
    return {
      start: /* @__PURE__ */ new Map(),
      end: /* @__PURE__ */ new Map()
    };
  }

  // src/adapter/10/options.ts
  function trackPrevState(Ctor) {
    const setState = Ctor.prototype.setState;
    Ctor.prototype.setState = function(update2, callback) {
      const nextState = getNextState(this);
      const s5 = nextState !== this.state && nextState || setNextState(this, Object.assign({}, this.state));
      this._prevState = Object.assign({}, s5);
      return setState.call(this, update2, callback);
    };
  }
  function setupOptionsV10(options, renderer, roots, config) {
    if (config.Component) {
      trackPrevState(config.Component);
    }
    let timings = createVNodeTimings();
    const owners = /* @__PURE__ */ new Map();
    let ownerStack = [];
    const o4 = options;
    const prevVNodeHook = options.vnode;
    const prevCommitRoot = o4._commit || o4.__c;
    const prevRoot = o4._root || o4.__;
    const prevBeforeUnmount = options.unmount;
    const prevBeforeDiff = o4._diff || o4.__b;
    const prevRender = o4._render || o4.__r;
    const prevAfterDiff = options.diffed;
    let prevHook = o4._hook || o4.__h;
    let prevUseDebugValue = options.useDebugValue;
    let prevHookName = options.useDebugName;
    const skipEffects = o4._skipEffects || o4.__s;
    setTimeout(() => {
      prevHook = o4._hook || o4.__h;
      prevUseDebugValue = options.useDebugValue;
      prevHookName = options._addHookName || options.__a;
      o4._hook = o4.__h = (c4, index, type) => {
        if (type) {
          addHookStack(type);
        }
        if (!options._skipEffects && !options.__s) {
          if (prevHook)
            prevHook(c4, index, type);
        }
      };
      options.useDebugValue = (value2) => {
        addHookStack(11 /* useDebugValue */);
        addDebugValue(value2);
        if (prevUseDebugValue)
          prevUseDebugValue(value2);
      };
      options._addHookName = options.__a = (name) => {
        addHookName(name);
        if (prevHookName)
          prevHookName(name);
      };
    }, 100);
    options.vnode = (vnode) => {
      if (ownerStack.length > 0 && typeof vnode.type === "function" && vnode.type !== config.Fragment) {
        owners.set(vnode, ownerStack[ownerStack.length - 1]);
      }
      if (prevVNodeHook)
        prevVNodeHook(vnode);
    };
    o4._diff = o4.__b = (vnode) => {
      if (typeof vnode.type === "function") {
        const name = getDisplayName(vnode, config);
        recordMark(`${name}_diff`);
        const c4 = getComponent(vnode);
        const s5 = getStatefulHooks(vnode);
        if (s5 !== null && c4 !== null) {
          if (!c4._oldHookValues) {
            c4._oldHookValues = new Array(s5.length).fill(void 0);
          }
          for (let i4 = 0; i4 < s5.length; i4++) {
            const value2 = getStatefulHookValue(s5[i4]);
            c4._oldHookValues[i4] = value2;
          }
        }
      }
      if (vnode.type !== null) {
        timings.start.set(vnode, performance.now());
      }
      if (prevBeforeDiff != null)
        prevBeforeDiff(vnode);
    };
    o4._render = o4.__r = (vnode, parent) => {
      if (!skipEffects && typeof vnode.type === "function" && vnode.type !== config.Fragment) {
        ownerStack.push(vnode);
      }
      if (prevRender != null)
        prevRender(vnode, parent);
    };
    options.diffed = (vnode) => {
      if (typeof vnode.type === "function") {
        if (vnode.type !== config.Fragment) {
          ownerStack.pop();
        }
        endMark(getDisplayName(vnode, config));
      }
      if (vnode.type !== null) {
        timings.end.set(vnode, performance.now());
      }
      if (prevAfterDiff)
        prevAfterDiff(vnode);
    };
    const userRootToContainer = /* @__PURE__ */ new Map();
    o4._commit = o4.__c = (vnode, queue) => {
      if (prevCommitRoot)
        prevCommitRoot(vnode, queue);
      if (vnode == null)
        return;
      if (isRoot(vnode, config)) {
        const children = getActualChildren(vnode);
        if (children.length > 0) {
          const dom = userRootToContainer.get(children[0]);
          if (dom) {
            roots.set(vnode, dom);
          }
        }
      }
      const tmpTimings = timings;
      ownerStack = [];
      timings = createVNodeTimings();
      renderer.onCommit(vnode, owners, tmpTimings, null);
    };
    o4._root = o4.__ = (vnode, parent) => {
      if (parent === null) {
        userRootToContainer.delete(vnode);
      } else {
        const treeParent = "Node" in globalThis && parent instanceof Node ? parent : parent.parentNode;
        userRootToContainer.set(vnode, treeParent);
      }
      if (prevRoot)
        prevRoot(vnode, parent);
    };
    options.unmount = (vnode) => {
      if (prevBeforeUnmount)
        prevBeforeUnmount(vnode);
      if (vnode.type !== null) {
        timings.start.delete(vnode);
        timings.end.delete(vnode);
      }
      owners.delete(vnode);
      renderer.onUnmount(vnode);
    };
    return () => {
      options.unmount = prevBeforeUnmount;
      o4._commit = o4.__c = prevCommitRoot;
      options.diffed = prevAfterDiff;
      o4._diff = o4.__b = prevBeforeDiff;
      options.vnode = prevVNodeHook;
      o4._hook = o4.__h = prevHook;
      options.useDebugValue = prevUseDebugValue;
    };
  }

  // src/adapter/parse-semverish.ts
  var MAJOR = 1;
  var MINOR = 2;
  var PATCH = 3;
  var PRERELEASE = 5;
  var PRERELEASE_TAG = 5;
  var PRERELEASE_VERSION = 6;
  var REGEXP_SEMVERISH = /^(\d+)\.(\d+)\.(\d+)(-([\w_-]+)(?:\.(\d+))?)?$/i;
  function parseSemverish(version) {
    const match = version.match(REGEXP_SEMVERISH);
    if (match) {
      let preRelease = void 0;
      if (match[PRERELEASE]) {
        preRelease = {
          tag: match[PRERELEASE_TAG],
          version: match[PRERELEASE_VERSION] !== void 0 ? +match[PRERELEASE_VERSION] : -1
        };
      }
      return {
        major: +match[MAJOR],
        minor: +match[MINOR],
        patch: +match[PATCH],
        preRelease
      };
    }
    return null;
  }

  // src/adapter/11/bindings.ts
  var TYPE_TEXT = 1 << 0;
  var TYPE_ELEMENT = 1 << 1;
  var TYPE_CLASS = 1 << 2;
  var TYPE_FUNCTION = 1 << 3;
  var TYPE_ROOT = 1 << 4;
  var TYPE_DOM = TYPE_TEXT | TYPE_ELEMENT;
  var TYPE_COMPONENT = TYPE_CLASS | TYPE_FUNCTION | TYPE_ROOT;
  function isComponent2(internal) {
    return (internal.flags & TYPE_COMPONENT) > 0;
  }
  function isInternal(x3) {
    return x3 !== null && typeof x3 === "object" && (typeof x3.__v === "number" || typeof x3._vnodeId === "number");
  }
  function isTextInternal(internal) {
    return (internal.flags & TYPE_TEXT) > 0;
  }
  function getComponentHooks2(internal) {
    const data = internal.data;
    if (data == null)
      return null;
    return data.__hooks || data.__H || null;
  }
  function isSuspenseVNode2(internal) {
    const c4 = getComponent2(internal);
    return c4 != null && !!(c4._childDidSuspend || c4.__c);
  }
  function getSuspenseStateKey2(c4) {
    if ("_suspended" in c4.state) {
      return "_suspended";
    } else if ("__e" in c4.state) {
      return "__e";
    }
    const keys = Object.keys(c4.state);
    if (keys.length > 0) {
      return keys[0];
    }
    return null;
  }
  function getPropsVNodeDisplayName(vnode, config) {
    const { type } = vnode;
    if (typeof type === "function") {
      if (type === config.Fragment)
        return "Fragment";
      const ct = type.contextType;
      if (ct && ct.Consumer === type && ct.displayName) {
        return `${ct.displayName}.Consumer`;
      }
      const ctx = type._contextRef || type.__;
      if (ctx && ctx.displayName) {
        return `${ctx.displayName}.Provider`;
      }
      if (type.prototype && (typeof type.prototype.__c === "function" || typeof type.prototype._childDidSuspend === "function")) {
        return "Suspense";
      } else if ("__P" in vnode.props || "_parentDom" in vnode.props) {
        return "Portal";
      }
      return type.displayName || type.name || "Anonymous";
    } else if (typeof type === "string") {
      return vnode.type;
    }
    return "#text";
  }
  function getDisplayName2(internal, config) {
    const { flags, type } = internal;
    if (flags & TYPE_COMPONENT) {
      if (type === config.Fragment)
        return "Fragment";
      const ct = type.contextType;
      if (ct && ct.Consumer === type && ct.displayName) {
        return `${ct.displayName}.Consumer`;
      }
      const ctx = type._contextRef || type.__;
      if (ctx && ctx.displayName) {
        return `${ctx.displayName}.Provider`;
      }
      if (isSuspenseVNode2(internal)) {
        return "Suspense";
      } else if (isPortal2(internal)) {
        return "Portal";
      }
      return type.displayName || type.name || "Anonymous";
    } else if (flags & TYPE_ELEMENT) {
      return internal.type;
    }
    return "#text";
  }
  function getActualChildren2(internal) {
    return internal._children || internal.__k || [];
  }
  function getComponent2(node) {
    return node._component || node.__c || null;
  }
  function isElement2(node) {
    return (node.flags & TYPE_ELEMENT) > 0;
  }
  function getNextState2(c4) {
    return c4._nextState || c4.__s || null;
  }
  function setNextState2(c4, value2) {
    return c4._nextState = c4.__s = value2;
  }
  function getDom2(internal) {
    return internal._dom || internal.__e || null;
  }
  function getVNodeParent2(internal) {
    return internal._parent || internal.__ || null;
  }
  function isRoot2(internal, config) {
    return getVNodeParent2(internal) == null && internal.type === config.Fragment;
  }
  function getStatefulHooks2(internal) {
    const hooks = getComponentHooks2(internal);
    return hooks !== null ? hooks._list || hooks.__ || null : null;
  }
  function isUseReducerOrState2(hookState) {
    return !!hookState._internal || !!hookState.__i;
  }
  function getStatefulHookValue2(hookState) {
    if (hookState !== null) {
      const value2 = hookState._value || hookState.__ || null;
      if (value2 !== null && Array.isArray(value2)) {
        return value2[0];
      }
    }
    return null;
  }
  function getHookState2(internal, index, type) {
    const c4 = getComponent2(internal);
    if (c4 === null)
      return [];
    const list = getStatefulHooks2(internal);
    if (list && list[index]) {
      if (type === 9 /* useContext */) {
        const context = list[index]._context || list[index].__c || list[index].c;
        const provider = c4.context[context._id] || c4.context[context.__c];
        return provider ? provider.props.value : context._defaultValue || context.__;
      }
      const value2 = getPendingHookValue2(list[index]);
      if (type === 5 /* useRef */) {
        return value2[0].current;
      } else if (type === 10 /* useErrorBoundary */ && !value2) {
        return "__preact_empty__";
      }
      return value2;
    }
    return [];
  }
  function getPendingHookValue2(state) {
    return state._value !== void 0 ? state._value : state.__;
  }
  function setPendingHookValue2(state, value2) {
    if ("_value" in state) {
      state._value = value2;
    } else {
      state.__ = value2;
    }
  }
  function createSuspenseState2(vnode, suspended) {
    const c4 = getComponent2(vnode);
    const key = getSuspenseStateKey2(c4);
    if (c4 && key) {
      return { [key]: suspended };
    }
    return {};
  }
  function getSuspendedState2(internal) {
    const c4 = getComponent2(internal);
    if (c4) {
      const key = getSuspenseStateKey2(c4);
      if (key) {
        return !!c4._nextState[key];
      }
    }
    return null;
  }
  var getInstance2 = (x3) => x3;
  function isPortal2(internal) {
    return "__P" in internal.props || "_parentDom" in internal.props;
  }
  function getVNodeId2(vnode) {
    return vnode._vnodeId || vnode.__v || 0;
  }
  var bindingsV11 = {
    isRoot: isRoot2,
    getDisplayName: getDisplayName2,
    getPropsVNodeDisplayName,
    getActualChildren: getActualChildren2,
    getDom: getDom2,
    isTextVNode: isTextInternal,
    getInstance: getInstance2,
    createSuspenseState: createSuspenseState2,
    getComponent: getComponent2,
    getComponentHooks: getComponentHooks2,
    getHookState: getHookState2,
    getPendingHookValue: getPendingHookValue2,
    setPendingHookValue: setPendingHookValue2,
    getVNodeParent: getVNodeParent2,
    isComponent: isComponent2,
    isElement: isElement2,
    isSuspenseVNode: isSuspenseVNode2,
    isVNode: isInternal,
    getSuspendedState: getSuspendedState2,
    setNextState: setNextState2,
    isPortal: isPortal2,
    getStatefulHookValue: getStatefulHookValue2,
    getStatefulHooks: getStatefulHooks2,
    isUseReducerOrState: isUseReducerOrState2,
    getRenderReasonPost() {
      return null;
    }
  };

  // src/adapter/11/renderReason.ts
  function getRenderReasonPre(timings, internal, oldData) {
    if (isComponent2(internal) && internal.type === oldData.type) {
      const c4 = getComponent2(internal);
      if (c4 !== null) {
        const hooks = getStatefulHooks2(internal);
        if (hooks !== null) {
          for (let i4 = 0; i4 < hooks.length; i4++) {
            if (isUseReducerOrState2(hooks[i4]) && hooks[i4]._oldValue !== getStatefulHookValue2(hooks[i4])) {
              return createReason(5 /* HOOKS_CHANGED */, null);
            }
          }
        }
        const prevState = c4._prevState;
        if (prevState != null && prevState !== c4.state) {
          return createReason(
            4 /* STATE_CHANGED */,
            getChangedKeys(prevState, c4.state)
          );
        } else if (prevState === void 0 && c4.state !== void 0 && Object.keys(c4.state).length > 0) {
          return createReason(4 /* STATE_CHANGED */, null);
        }
      }
    }
    if (internal.props !== oldData.props) {
      const propsChanged = getChangedKeys(internal.props, oldData.props);
      if (propsChanged.length > 0) {
        return createReason(3 /* PROPS_CHANGED */, propsChanged);
      }
    }
    const parent = getVNodeParent2(internal);
    if (parent != null) {
      if (parent != null && (timings.start.get(internal) || 0) >= (timings.start.get(parent) || 0) && (timings.end.get(internal) || 0) <= (timings.end.get(parent) || 0)) {
        return createReason(2 /* PARENT_UPDATE */, null);
      }
    }
    return createReason(6 /* FORCE_UPDATE */, null);
  }

  // src/adapter/11/options.ts
  function trackPrevState2(Ctor) {
    const setState = Ctor.prototype.setState;
    Ctor.prototype.setState = function(update2, callback) {
      const nextState = getNextState2(this);
      const s5 = nextState !== this.state && nextState || setNextState2(this, Object.assign({}, this.state));
      this._prevState = Object.assign({}, s5);
      return setState.call(this, update2, callback);
    };
  }
  function getParentDom(internal) {
    return internal.props?._parentDom || internal.props?.__P || null;
  }
  function setupOptionsV11(options, renderer, roots, config, profiler) {
    if (config.Component) {
      trackPrevState2(config.Component);
    }
    const timings = createVNodeTimings();
    let renderReasons = /* @__PURE__ */ new Map();
    let reasonTmpData = /* @__PURE__ */ new Map();
    const vnodeIdToOwner = /* @__PURE__ */ new Map();
    const owners = /* @__PURE__ */ new Map();
    let ownerStack = [];
    const o4 = options;
    const prevVNodeHook = options.vnode;
    const prevInternalHook = options._internal || o4.__i;
    const prevCommitRoot = o4._commit || o4.__c;
    const prevBeforeUnmount = options.unmount;
    const prevBeforeDiff = o4._diff || o4.__b;
    const prevRender = o4._render || o4.__r;
    const prevAfterDiff = options.diffed;
    let prevHook = o4._hook || o4.__h;
    let prevUseDebugValue = options.useDebugValue;
    let prevHookName = options.useDebugName;
    const skipEffects = o4._skipEffects || o4.__s;
    setTimeout(() => {
      prevHook = o4._hook || o4.__h;
      prevUseDebugValue = options.useDebugValue;
      prevHookName = options._addHookName || options.__a;
      o4._hook = o4.__h = (internal, index, type) => {
        if (type) {
          addHookStack(type);
        }
        if (!options._skipEffects && !options.__s) {
          if (prevHook)
            prevHook(internal, index, type);
        }
      };
      options.useDebugValue = (value2) => {
        addHookStack(11 /* useDebugValue */);
        addDebugValue(value2);
        if (prevUseDebugValue)
          prevUseDebugValue(value2);
      };
      options._addHookName = options.__a = (name) => {
        addHookName(name);
        if (prevHookName)
          prevHookName(name);
      };
    }, 100);
    options.vnode = (vnode) => {
      if (ownerStack.length > 0 && typeof vnode.type === "function" && vnode.type !== config.Fragment) {
        vnodeIdToOwner.set(getVNodeId2(vnode), ownerStack[ownerStack.length - 1]);
      }
      if (prevVNodeHook)
        prevVNodeHook(vnode);
    };
    options._internal = options.__i = (internal, vnode) => {
      const owner = vnodeIdToOwner.get(getVNodeId2(internal));
      if (owner) {
        owners.set(internal, owner);
      }
      if (prevInternalHook)
        prevInternalHook(internal, vnode);
    };
    o4._diff = o4.__b = (internal, vnode) => {
      if (internal.flags & TYPE_COMPONENT) {
        timings.start.set(internal, performance.now());
        const name = getDisplayName2(internal, config);
        recordMark(`${name}_diff`);
        if (vnode != null) {
          const internalId = getVNodeId2(internal);
          const vnodeId = getVNodeId2(vnode);
          if (internalId !== vnodeId) {
            const owner = vnodeIdToOwner.get(internalId);
            if (owner) {
              vnodeIdToOwner.set(vnodeId, owner);
            }
            vnodeIdToOwner.delete(internalId);
          }
        }
        if (profiler.captureRenderReasons) {
          if (internal === null) {
            if (vnode != null) {
              renderReasons.set(internal, createReason(1 /* MOUNT */, null));
            }
          } else if (vnode != null) {
            reasonTmpData.set(internal, {
              type: vnode.type,
              props: internal.props
            });
          }
        }
      }
      if (prevBeforeDiff != null)
        prevBeforeDiff(internal);
    };
    o4._render = o4.__r = (internal) => {
      if (!skipEffects && internal.flags & TYPE_COMPONENT && internal.type !== config.Fragment) {
        ownerStack.push(internal);
      }
      if (prevRender != null)
        prevRender(internal);
    };
    options.diffed = (internal) => {
      if (internal.flags & TYPE_COMPONENT) {
        if (internal.type !== config.Fragment) {
          ownerStack.pop();
        }
        timings.end.set(internal, performance.now());
        endMark(getDisplayName2(internal, config));
        if (profiler.captureRenderReasons) {
          const old = reasonTmpData.get(internal);
          if (old != null) {
            const reason = getRenderReasonPre(timings, internal, old);
            if (reason !== null) {
              renderReasons.set(internal, reason);
            }
          }
          const s5 = getStatefulHooks2(internal);
          if (s5 && Array.isArray(s5) && s5.length > 0) {
            const internal2 = s5[0]._internal || s5[0].__i;
            if (internal2 !== void 0 && getComponent2(internal2)) {
              s5[0]._oldValue = getStatefulHookValue2(s5[0]);
            }
          }
        }
      }
      if (prevAfterDiff)
        prevAfterDiff(internal);
    };
    o4._commit = o4.__c = (internal, queue) => {
      if (prevCommitRoot)
        prevCommitRoot(internal, queue);
      if (internal == null)
        return;
      if (isRoot2(internal, config)) {
        const dom = getParentDom(internal);
        if (dom) {
          roots.set(internal, dom);
        }
      }
      ownerStack = [];
      renderer.onCommit(internal, owners, timings, renderReasons);
      if (profiler.captureRenderReasons) {
        renderReasons = /* @__PURE__ */ new Map();
        reasonTmpData = /* @__PURE__ */ new Map();
      }
    };
    options.unmount = (internal) => {
      if (prevBeforeUnmount)
        prevBeforeUnmount(internal);
      vnodeIdToOwner.delete(getVNodeId2(internal));
      owners.delete(internal);
      timings.start.delete(internal);
      timings.end.delete(internal);
      renderer.onUnmount(internal);
    };
    return () => {
      options.unmount = prevBeforeUnmount;
      o4._commit = o4.__c = prevCommitRoot;
      o4._diff = o4.__b = prevBeforeDiff;
      o4._render = o4.__r = prevRender;
      options.diffed = prevAfterDiff;
      options._internal = prevVNodeHook;
      o4._hook = o4.__h = prevHook;
      o4.vnode = prevVNodeHook;
      o4._internal = o4.__i = prevInternalHook;
      options.useDebugValue = prevUseDebugValue;
    };
  }

  // src/adapter/adapter/profiler.ts
  function newProfiler() {
    return {
      highlightUpdates: false,
      updateRects: /* @__PURE__ */ new Map(),
      pendingHighlightUpdates: /* @__PURE__ */ new Set(),
      captureRenderReasons: false,
      isProfiling: false,
      recordStats: false,
      filterCommitsUnder: false
    };
  }

  // src/adapter/hook.ts
  function createHook(port) {
    const { listen, send } = port;
    const renderers = /* @__PURE__ */ new Map();
    let uid = 0;
    let status = "disconnected";
    const profiler = newProfiler();
    const filters = DEFAULT_FIlTERS;
    const init = () => {
      createAdapter(port, profiler, renderers);
      status = "pending";
      listen("init", () => {
        status = "connected";
      });
      send("init", null);
    };
    const attachRenderer = (renderer, supports) => {
      if (status === "disconnected") {
        init();
      }
      renderers.set(++uid, renderer);
      send("attach", {
        id: uid,
        supportsProfiling: !!supports.profiling,
        supportsRenderReasons: !!supports.renderReasons,
        supportsHooks: !!supports.hooks
      });
      const profilerOptions = window.localStorage.getItem(PROFILE_RELOAD);
      if (profilerOptions !== null) {
        window.localStorage.removeItem(PROFILE_RELOAD);
        const options = JSON.parse(profilerOptions);
        profiler.isProfiling = true;
        profiler.captureRenderReasons = !!options?.captureRenderReasons;
      }
      const statsOptions = window.localStorage.getItem(STATS_RELOAD);
      if (statsOptions !== null) {
        window.localStorage.removeItem(STATS_RELOAD);
        profiler.recordStats = true;
      }
      return uid;
    };
    window.addEventListener("pagehide", () => {
      renderers.forEach((r3) => {
        if (r3.clear)
          r3.clear();
      });
    });
    window.addEventListener("message", (e4) => {
      if (renderers.size > 0 && e4.data && e4.data.codesandbox && e4.data.type === "compile") {
        renderers.forEach((r3) => {
          if (r3.clear)
            r3.clear();
        });
      }
    });
    return {
      $0: null,
      $type: null,
      renderers,
      get connected() {
        return status === "connected";
      },
      set connected(_4) {
        console.warn("Mutating __PREACT_DEVTOOLS__.connected is deprecated.");
      },
      emit: port.send,
      listen: () => {
        console.error("__PREACT_DEVTOOLS__.listen() is deprecated.");
      },
      attachPreact: (version, options, config) => {
        if (status === "disconnected") {
          init();
        }
        const preactVersionMatch = parseSemverish(version);
        if (!preactVersionMatch) {
          console.error(
            `[PREACT DEVTOOLS] Could not parse preact version ${version}`
          );
          return -1;
        }
        const namespace = Math.floor(Math.random() * 2 ** 32);
        const roots = /* @__PURE__ */ new Map();
        if (preactVersionMatch.major == 10) {
          const supports = {
            renderReasons: !!config.Component,
            hooks: preactVersionMatch.minor === 4 && preactVersionMatch.patch >= 1 || preactVersionMatch.minor > 4,
            profiling: true
          };
          const idMapper = createIdMappingState(
            namespace,
            bindingsV10.getInstance
          );
          const renderer = createRenderer(
            port,
            config,
            options,
            supports,
            profiler,
            filters,
            idMapper,
            bindingsV10,
            roots,
            version
          );
          setupOptionsV10(options, renderer, roots, config);
          return attachRenderer(renderer, supports);
        } else if (preactVersionMatch.major === 11) {
          const idMapper = createIdMappingState(
            namespace,
            bindingsV11.getInstance
          );
          const renderer = createRenderer(
            port,
            config,
            options,
            { hooks: true, renderReasons: true },
            profiler,
            filters,
            idMapper,
            bindingsV11,
            roots,
            version
          );
          setupOptionsV11(options, renderer, roots, config, profiler);
          return attachRenderer(renderer, {
            hooks: true,
            renderReasons: true,
            profiling: true
          });
        }
        console.error(
          `[PREACT DEVTOOLS] No devtools adapter exists for preact version "${version}". This is likely a bug in devtools.`
        );
        return -1;
      },
      attach: (renderer) => attachRenderer(renderer, { renderReasons: false }),
      detach: (id) => renderers.delete(id)
    };
  }

  // src/adapter/adapter/port.ts
  function listenToDevtools(ctx, type, callback) {
    ctx.addEventListener("message", (e4) => {
      if (e4.source === window && e4.data.source === DevtoolsToClient) {
        const data = e4.data;
        if (data.type === type)
          callback(data.data);
      }
    });
  }
  function listenToPageHook(ctx, type, callback) {
    ctx.addEventListener("message", (e4) => {
      if (e4.source === window && e4.data.source === PageHookName) {
        const data = e4.data;
        if (data.type === type)
          callback(data.data);
      }
    });
  }
  function sendToDevtools(ctx, type, data) {
    ctx.postMessage(
      {
        source: PageHookName,
        type,
        data
      },
      "*"
    );
  }
  function createPortForHook(ctx) {
    return {
      send: (type, message) => sendToDevtools(ctx, type, message),
      listen: (type, callback) => listenToDevtools(ctx, type, callback),
      listenToPage: (type, callback) => listenToPageHook(ctx, type, callback)
    };
  }

  // src/shells/shared/installHook.ts
  window.__PREACT_DEVTOOLS__ = createHook(createPortForHook(window));
})();
