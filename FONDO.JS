(function() {
    

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0

    var p = function(a) {
        var b = 0;
        return function() {
            return b < a.length ? {
                done: !1,
                value: a[b++]
            } : {
                done: !0
            }
        }
    }
      , r = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, d) {
        if (a == Array.prototype || a == Object.prototype)
            return a;
        a[b] = d.value;
        return a
    }
      , aa = function(a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var b = 0; b < a.length; ++b) {
            var d = a[b];
            if (d && d.Math == Math)
                return d
        }
        throw Error("Cannot find global object");
    }
      , t = aa(this)
      , u = function(a, b) {
        if (b)
            a: {
                var d = t;
                a = a.split(".");
                for (var f = 0; f < a.length - 1; f++) {
                    var e = a[f];
                    if (!(e in d))
                        break a;
                    d = d[e]
                }
                a = a[a.length - 1];
                f = d[a];
                b = b(f);
                b != f && null != b && r(d, a, {
                    configurable: !0,
                    writable: !0,
                    value: b
                })
            }
    };
    u("Symbol", function(a) {
        if (a)
            return a;
        var b = function(l, c) {
            this.P = l;
            r(this, "description", {
                configurable: !0,
                writable: !0,
                value: c
            })
        };
        b.prototype.toString = function() {
            return this.P
        }
        ;
        var d = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_"
          , f = 0
          , e = function(l) {
            if (this instanceof e)
                throw new TypeError("Symbol is not a constructor");
            return new b(d + (l || "") + "_" + f++,l)
        };
        return e
    });
    u("Symbol.iterator", function(a) {
        if (a)
            return a;
        a = Symbol("Symbol.iterator");
        for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), d = 0; d < b.length; d++) {
            var f = t[b[d]];
            "function" === typeof f && "function" != typeof f.prototype[a] && r(f.prototype, a, {
                configurable: !0,
                writable: !0,
                value: function() {
                    return ba(p(this))
                }
            })
        }
        return a
    });
    var ba = function(a) {
        a = {
            next: a
        };
        a[Symbol.iterator] = function() {
            return this
        }
        ;
        return a
    }
      , v = function(a) {
        var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
        if (b)
            return b.call(a);
        if ("number" == typeof a.length)
            return {
                next: p(a)
            };
        throw Error(String(a) + " is not an iterable or ArrayLike");
    };
    u("Promise", function(a) {
        function b() {
            this.g = null
        }
        function d(c) {
            return c instanceof e ? c : new e(function(g) {
                g(c)
            }
            )
        }
        if (a)
            return a;
        b.prototype.A = function(c) {
            if (null == this.g) {
                this.g = [];
                var g = this;
                this.B(function() {
                    g.T()
                })
            }
            this.g.push(c)
        }
        ;
        var f = t.setTimeout;
        b.prototype.B = function(c) {
            f(c, 0)
        }
        ;
        b.prototype.T = function() {
            for (; this.g && this.g.length; ) {
                var c = this.g;
                this.g = [];
                for (var g = 0; g < c.length; ++g) {
                    var h = c[g];
                    c[g] = null;
                    try {
                        h()
                    } catch (k) {
                        this.S(k)
                    }
                }
            }
            this.g = null
        }
        ;
        b.prototype.S = function(c) {
            this.B(function() {
                throw c;
            })
        }
        ;
        var e = function(c) {
            this.i = 0;
            this.j = void 0;
            this.h = [];
            this.K = !1;
            var g = this.s();
            try {
                c(g.resolve, g.reject)
            } catch (h) {
                g.reject(h)
            }
        };
        e.prototype.s = function() {
            function c(k) {
                return function(m) {
                    h || (h = !0,
                    k.call(g, m))
                }
            }
            var g = this
              , h = !1;
            return {
                resolve: c(this.Z),
                reject: c(this.v)
            }
        }
        ;
        e.prototype.Z = function(c) {
            if (c === this)
                this.v(new TypeError("A Promise cannot resolve to itself"));
            else if (c instanceof e)
                this.ba(c);
            else {
                a: switch (typeof c) {
                case "object":
                    var g = null != c;
                    break a;
                case "function":
                    g = !0;
                    break a;
                default:
                    g = !1
                }
                g ? this.Y(c) : this.I(c)
            }
        }
        ;
        e.prototype.Y = function(c) {
            var g = void 0;
            try {
                g = c.then
            } catch (h) {
                this.v(h);
                return
            }
            "function" == typeof g ? this.ca(g, c) : this.I(c)
        }
        ;
        e.prototype.v = function(c) {
            this.N(2, c)
        }
        ;
        e.prototype.I = function(c) {
            this.N(1, c)
        }
        ;
        e.prototype.N = function(c, g) {
            if (0 != this.i)
                throw Error("Cannot settle(" + c + ", " + g + "): Promise already settled in state" + this.i);
            this.i = c;
            this.j = g;
            2 === this.i && this.aa();
            this.U()
        }
        ;
        e.prototype.aa = function() {
            var c = this;
            f(function() {
                if (c.X()) {
                    var g = t.console;
                    "undefined" !== typeof g && g.error(c.j)
                }
            }, 1)
        }
        ;
        e.prototype.X = function() {
            if (this.K)
                return !1;
            var c = t.CustomEvent
              , g = t.Event
              , h = t.dispatchEvent;
            if ("undefined" === typeof h)
                return !0;
            "function" === typeof c ? c = new c("unhandledrejection",{
                cancelable: !0
            }) : "function" === typeof g ? c = new g("unhandledrejection",{
                cancelable: !0
            }) : (c = t.document.createEvent("CustomEvent"),
            c.initCustomEvent("unhandledrejection", !1, !0, c));
            c.promise = this;
            c.reason = this.j;
            return h(c)
        }
        ;
        e.prototype.U = function() {
            if (null != this.h) {
                for (var c = 0; c < this.h.length; ++c)
                    l.A(this.h[c]);
                this.h = null
            }
        }
        ;
        var l = new b;
        e.prototype.ba = function(c) {
            var g = this.s();
            c.l(g.resolve, g.reject)
        }
        ;
        e.prototype.ca = function(c, g) {
            var h = this.s();
            try {
                c.call(g, h.resolve, h.reject)
            } catch (k) {
                h.reject(k)
            }
        }
        ;
        e.prototype.then = function(c, g) {
            function h(n, q) {
                return "function" == typeof n ? function(B) {
                    try {
                        k(n(B))
                    } catch (C) {
                        m(C)
                    }
                }
                : q
            }
            var k, m, D = new e(function(n, q) {
                k = n;
                m = q
            }
            );
            this.l(h(c, k), h(g, m));
            return D
        }
        ;
        e.prototype.catch = function(c) {
            return this.then(void 0, c)
        }
        ;
        e.prototype.l = function(c, g) {
            function h() {
                switch (k.i) {
                case 1:
                    c(k.j);
                    break;
                case 2:
                    g(k.j);
                    break;
                default:
                    throw Error("Unexpected state: " + k.i);
                }
            }
            var k = this;
            null == this.h ? l.A(h) : this.h.push(h);
            this.K = !0
        }
        ;
        e.resolve = d;
        e.reject = function(c) {
            return new e(function(g, h) {
                h(c)
            }
            )
        }
        ;
        e.race = function(c) {
            return new e(function(g, h) {
                for (var k = v(c), m = k.next(); !m.done; m = k.next())
                    d(m.value).l(g, h)
            }
            )
        }
        ;
        e.all = function(c) {
            var g = v(c)
              , h = g.next();
            return h.done ? d([]) : new e(function(k, m) {
                function D(B) {
                    return function(C) {
                        n[B] = C;
                        q--;
                        0 == q && k(n)
                    }
                }
                var n = []
                  , q = 0;
                do
                    n.push(void 0),
                    q++,
                    d(h.value).l(D(n.length - 1), m),
                    h = g.next();
                while (!h.done)
            }
            )
        }
        ;
        return e
    });
    var ca = function(a, b) {
        a instanceof String && (a += "");
        var d = 0
          , f = !1
          , e = {
            next: function() {
                if (!f && d < a.length) {
                    var l = d++;
                    return {
                        value: b(l, a[l]),
                        done: !1
                    }
                }
                f = !0;
                return {
                    done: !0,
                    value: void 0
                }
            }
        };
        e[Symbol.iterator] = function() {
            return e
        }
        ;
        return e
    };
    u("Array.prototype.entries", function(a) {
        return a ? a : function() {
            return ca(this, function(b, d) {
                return [b, d]
            })
        }
    });
    var w = this || self
      , da = function(a, b) {
        a = a.split(".");
        var d = w;
        a[0]in d || "undefined" == typeof d.execScript || d.execScript("var " + a[0]);
        for (var f; a.length && (f = a.shift()); )
            a.length || void 0 === b ? d = d[f] && d[f] !== Object.prototype[f] ? d[f] : d[f] = {} : d[f] = b
    }
      , x = function(a, b) {
        function d() {}
        d.prototype = b.prototype;
        a.ga = b.prototype;
        a.prototype = new d;
        a.prototype.constructor = a;
        a.fa = function(f, e, l) {
            for (var c = Array(arguments.length - 2), g = 2; g < arguments.length; g++)
                c[g - 2] = arguments[g];
            return b.prototype[e].apply(f, c)
        }
    }
      , y = function(a) {
        return a
    };
    function z(a, b) {
        if (Error.captureStackTrace)
            Error.captureStackTrace(this, z);
        else {
            var d = Error().stack;
            d && (this.stack = d)
        }
        a && (this.message = String(a));
        void 0 !== b && (this.cause = b)
    }
    x(z, Error);
    z.prototype.name = "CustomError";
    function A(a, b) {
        a = a.split("%s");
        for (var d = "", f = a.length - 1, e = 0; e < f; e++)
            d += a[e] + (e < b.length ? b[e] : "%s");
        z.call(this, d + a[f])
    }
    x(A, z);
    A.prototype.name = "AssertionError";
    var E = function(a, b) {
        throw new A("Failure" + (a ? ": " + a : ""),Array.prototype.slice.call(arguments, 1));
    };
    var F;
    var I = function(a, b) {
        this.O = a === G && b || "";
        this.R = H
    };
    I.prototype.toString = function() {
        return "Const{" + this.O + "}"
    }
    ;
    var H = {}
      , G = {};
    var K = function(a, b) {
        this.M = b === J ? a : ""
    };
    K.prototype.toString = function() {
        return this.M + ""
    }
    ;
    var ea = function(a) {
        if (a instanceof K && a.constructor === K)
            return a.M;
        var b = typeof a;
        E("expected object of type TrustedResourceUrl, got '" + a + "' of type " + ("object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null"));
        return "type_error:TrustedResourceUrl"
    }
      , J = {};
    var L = function(a, b) {
        this.name = a;
        this.value = b
    };
    L.prototype.toString = function() {
        return this.name
    }
    ;
    var M = new L("OFF",Infinity), fa = new L("WARNING",900), ha = new L("CONFIG",700), N = function() {
        this.m = 0;
        this.clear()
    }, O;
    N.prototype.clear = function() {
        this.C = Array(this.m);
        this.F = -1;
        this.J = !1
    }
    ;
    var P = function(a, b, d) {
        this.reset(a || M, b, d, void 0, void 0)
    };
    P.prototype.reset = function() {}
    ;
    var Q = function(a, b) {
        this.level = null;
        this.V = [];
        this.parent = (void 0 === b ? null : b) || null;
        this.children = [];
        this.W = {
            u: function() {
                return a
            }
        }
    }, R = function(a) {
        if (a.level)
            return a.level;
        if (a.parent)
            return R(a.parent);
        E("Root logger has no level set.");
        return M
    }, ia = function(a, b) {
        for (; a; )
            a.V.forEach(function(d) {
                d(b)
            }),
            a = a.parent
    }, ja = function() {
        this.entries = {};
        var a = new Q("");
        a.level = ha;
        this.entries[""] = a
    }, S, T = function(a, b) {
        var d = a.entries[b];
        if (d)
            return d;
        d = T(a, b.slice(0, Math.max(b.lastIndexOf("."), 0)));
        var f = new Q(b,d);
        a.entries[b] = f;
        d.children.push(f);
        return f
    }, U = function() {
        S || (S = new ja);
        return S
    };
    /*

 SPDX-License-Identifier: Apache-2.0
*/
    var V = []
      , W = function(a) {
        var b;
        if (b = T(U(), "safevalues").W) {
            var d = "A URL with content '" + a + "' was sanitized away."
              , f = fa;
            if (a = b)
                if (a = b && f) {
                    a = f.value;
                    var e = b ? R(T(U(), b.u())) : M;
                    a = a >= e.value
                }
            if (a) {
                f = f || M;
                a = T(U(), b.u());
                "function" === typeof d && (d = d());
                O || (O = new N);
                e = O;
                b = b.u();
                if (0 < e.m) {
                    var l = (e.F + 1) % e.m;
                    e.F = l;
                    e.J ? (e = e.C[l],
                    e.reset(f, d, b),
                    b = e) : (e.J = l == e.m - 1,
                    b = e.C[l] = new P(f,d,b))
                } else
                    b = new P(f,d,b);
                ia(a, b)
            }
        }
    };
    -1 === V.indexOf(W) && V.push(W);
    function ka(a) {
        var b, d, f = null == (d = (b = (a.ownerDocument && a.ownerDocument.defaultView || window).document).querySelector) ? void 0 : d.call(b, "script[nonce]");
        (b = f ? f.nonce || f.getAttribute("nonce") || "" : "") && a.setAttribute("nonce", b)
    }
    ;var X = function(a) {
        var b;
        this.ea = b = void 0 === b ? window : b;
        a instanceof I && a.constructor === I && a.R === H ? a = a.O : (E("expected object of type Const, got '" + a + "'"),
        a = "type_error:Const");
        if (void 0 === F) {
            b = null;
            var d = w.trustedTypes;
            if (d && d.createPolicy)
                try {
                    b = d.createPolicy("goog#html", {
                        createHTML: y,
                        createScript: y,
                        createScriptURL: y
                    })
                } catch (f) {
                    w.console && w.console.error(f.message)
                }
            F = b
        }
        a = (b = F) ? b.createScriptURL(a) : a;
        this.da = new K(a,J);
        this.D = [];
        this.G = [];
        this.L = this.H = !1
    }
      , Y = function(a) {
        a.o.onload = function() {}
        ;
        a.o.onerror = function() {}
        ;
        a.o.onreadystatechange = function() {}
    }
      , la = function(a) {
        var b = a.ea.document
          , d = b.head || b.documentElement
          , f = b.createElement("script");
        a.o = f;
        f.async = !0;
        f.defer = !0;
        f.src = ea(a.da);
        ka(f);
        f.onload = f.onreadystatechange = function() {
            f.readyState && "loaded" != f.readyState && "complete" != f.readyState || (a.L = !0,
            Y(a),
            a.D.forEach(function(e) {
                return e()
            }))
        }
        ;
        f.onerror = function() {
            a.H = !0;
            Y(a);
            a.G.forEach(function(e) {
                return e()
            })
        }
        ;
        d.appendChild(f)
    };
    X.prototype.load = function(a, b) {
        this.L ? a() : this.D.push(a);
        this.H ? b() : this.G.push(b);
        this.o || la(this)
    }
    ;
    function Z(a, b) {
        var d = new X(a);
        da(b, function(f, e) {
            f = void 0 === f ? function() {}
            : f;
            e = void 0 === e ? function() {}
            : e;
            return new Promise(function(l, c) {
                d.load(function() {
                    l();
                    f()
                }, function() {
                    c();
                    e()
                })
            }
            )
        })
    }
    Z(new I(G,"https://www.gstatic.com/devops/connect/releases/devops-learning-tool-library_20230306_00_RC00/cloudshell/cloudshell.js"), "google.devops.tools.loadCloudShell");
    Z(new I(G,"https://www.gstatic.com/devops/connect/releases/devops-learning-tool-library_20230306_00_RC00/walkthrough/walkthrough.js"), "google.devops.tools.loadWalkthrough");
}
).call(this);
