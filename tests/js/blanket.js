function insertHelpers(e, t, n) {
    function i(t) {
        n[e.range[0]] = t;
        for (var r = e.range[0] + 1; r < e.range[1]; r++)
            n[r] = ""
    }
    if (!e.range)
        return;
    e.parent = t,
        e.source = function() {
            return n.slice(e.range[0], e.range[1]).join("")
        }
    ;
    if (e.update && typeof e.update == "object") {
        var r = e.update;
        Object.keys(r).forEach(function(e) {
            i[e] = r[e]
        }),
            e.update = i
    } else
        e.update = i
}
typeof QUnit != "undefined" && (QUnit.config.autostart = !1),
    function(e) {
        "use strict";
        function y(e, t) {
            if (!e)
                throw new Error("ASSERT: " + t)
        }
        function b(e, t) {
            return a.slice(e, t)
        }
        function w(e) {
            return "0123456789".indexOf(e) >= 0
        }
        function E(e) {
            return "0123456789abcdefABCDEF".indexOf(e) >= 0
        }
        function S(e) {
            return "01234567".indexOf(e) >= 0
        }
        function x(e) {
            return e === " " || e === "	" || e === "" || e === "\f" || e === "\u00a0" || e.charCodeAt(0) >= 5760 && "\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\ufeff".indexOf(e) >= 0
        }
        function T(e) {
            return e === "\n" || e === "\r" || e === "\u2028" || e === "\u2029"
        }
        function N(e) {
            return e === "$" || e === "_" || e === "\\" || e >= "a" && e <= "z" || e >= "A" && e <= "Z" || e.charCodeAt(0) >= 128 && o.NonAsciiIdentifierStart.test(e)
        }
        function C(e) {
            return e === "$" || e === "_" || e === "\\" || e >= "a" && e <= "z" || e >= "A" && e <= "Z" || e >= "0" && e <= "9" || e.charCodeAt(0) >= 128 && o.NonAsciiIdentifierPart.test(e)
        }
        function k(e) {
            return ["class", "enum", "export", "extends", "import", "super"].indexOf(e) >= 0
        }
        function L(e) {
            return ["implements", "interface", "package", "private", "protected", "public", "static", "yield", "let"].indexOf(e) >= 0
        }
        function A(e) {
            return e === "eval" || e === "arguments"
        }
        function O(e) {
            if (f && L(e))
                return !0;
            switch (e.length) {
                case 2:
                    return e === "if" || e === "in" || e === "do";
                case 3:
                    return e === "var" || e === "for" || e === "new" || e === "try" || e === "let";
                case 4:
                    return e === "this" || e === "else" || e === "case" || e === "void" || e === "with" || e === "enum";
                case 5:
                    return e === "while" || e === "break" || e === "catch" || e === "throw" || e === "const" || e === "yield" || e === "class" || e === "super";
                case 6:
                    return e === "return" || e === "typeof" || e === "delete" || e === "switch" || e === "export" || e === "import";
                case 7:
                    return e === "default" || e === "finally" || e === "extends";
                case 8:
                    return e === "function" || e === "continue" || e === "debugger";
                case 10:
                    return e === "instanceof";
                default:
                    return !1
            }
        }
        function M() {
            var e, t, n;
            t = !1,
                n = !1;
            while (l < p) {
                e = a[l];
                if (n)
                    e = a[l++],
                    T(e) && (n = !1,
                    e === "\r" && a[l] === "\n" && ++l,
                        ++c,
                        h = l);
                else if (t)
                    T(e) ? (e === "\r" && a[l + 1] === "\n" && ++l,
                        ++c,
                        ++l,
                        h = l,
                    l >= p && X({}, s.UnexpectedToken, "ILLEGAL")) : (e = a[l++],
                    l >= p && X({}, s.UnexpectedToken, "ILLEGAL"),
                    e === "*" && (e = a[l],
                    e === "/" && (++l,
                        t = !1)));
                else if (e === "/") {
                    e = a[l + 1];
                    if (e === "/")
                        l += 2,
                            n = !0;
                    else {
                        if (e !== "*")
                            break;
                        l += 2,
                            t = !0,
                        l >= p && X({}, s.UnexpectedToken, "ILLEGAL")
                    }
                } else if (x(e))
                    ++l;
                else {
                    if (!T(e))
                        break;
                    ++l,
                    e === "\r" && a[l] === "\n" && ++l,
                        ++c,
                        h = l
                }
            }
        }
        function _(e) {
            var t, n, r, i = 0;
            n = e === "u" ? 4 : 2;
            for (t = 0; t < n; ++t) {
                if (!(l < p && E(a[l])))
                    return "";
                r = a[l++],
                    i = i * 16 + "0123456789abcdef".indexOf(r.toLowerCase())
            }
            return String.fromCharCode(i)
        }
        function D() {
            var e, t, n, r;
            e = t = a[l++],
            e === "\\" && (a[l] !== "u" && X({}, s.UnexpectedToken, "ILLEGAL"),
                ++l,
                n = l,
                e = _("u"),
                e ? ((e === "\\" || !N(e)) && X({}, s.UnexpectedToken, "ILLEGAL"),
                    t = e) : (l = n,
                    t = "u"));
            while (l < p) {
                e = a[l];
                if (!C(e))
                    break;
                ++l,
                    t += e,
                e === "\\" && (t = t.substr(0, t.length - 1),
                a[l] !== "u" && X({}, s.UnexpectedToken, "ILLEGAL"),
                    ++l,
                    n = l,
                    e = _("u"),
                    e ? ((e === "\\" || !C(e)) && X({}, s.UnexpectedToken, "ILLEGAL"),
                        t += e) : (l = n,
                        t += "u"))
            }
            return t
        }
        function P() {
            var e, t;
            e = l++;
            while (l < p) {
                t = a[l];
                if (t === "\\")
                    return l = e,
                        D();
                if (!C(t))
                    break;
                ++l
            }
            return b(e, l)
        }
        function H() {
            var e, n, r;
            return e = l,
            N(a[l]) || X({}, s.UnexpectedToken, "ILLEGAL"),
                n = a[l] === "\\" ? D() : P(),
                n.length === 1 ? r = t.Identifier : O(n) ? r = t.Keyword : n === "null" ? r = t.NullLiteral : n === "true" || n === "false" ? r = t.BooleanLiteral : r = t.Identifier,
            {
                type: r,
                value: n,
                lineNumber: c,
                lineStart: h,
                range: [e, l]
            }
        }
        function B() {
            var e = l, n = a[l], r, i, o;
            if (n === "." || n === "(" || n === ")" || n === ";" || n === "," || n === "{" || n === "}" || n === "[" || n === "]" || n === ":" || n === "?" || n === "~")
                return ++l,
                {
                    type: t.Punctuator,
                    value: n,
                    lineNumber: c,
                    lineStart: h,
                    range: [e, l]
                };
            r = a[l + 1],
                i = a[l + 2],
                o = a[l + 3];
            if (n === ">" && r === ">" && i === ">" && o === "=")
                return l += 4,
                {
                    type: t.Punctuator,
                    value: ">>>=",
                    lineNumber: c,
                    lineStart: h,
                    range: [e, l]
                };
            if (n === "=" && r === "=" && i === "=")
                return l += 3,
                {
                    type: t.Punctuator,
                    value: "===",
                    lineNumber: c,
                    lineStart: h,
                    range: [e, l]
                };
            if (n === "!" && r === "=" && i === "=")
                return l += 3,
                {
                    type: t.Punctuator,
                    value: "!==",
                    lineNumber: c,
                    lineStart: h,
                    range: [e, l]
                };
            if (n === ">" && r === ">" && i === ">")
                return l += 3,
                {
                    type: t.Punctuator,
                    value: ">>>",
                    lineNumber: c,
                    lineStart: h,
                    range: [e, l]
                };
            if (n === "<" && r === "<" && i === "=")
                return l += 3,
                {
                    type: t.Punctuator,
                    value: "<<=",
                    lineNumber: c,
                    lineStart: h,
                    range: [e, l]
                };
            if (n === ">" && r === ">" && i === "=")
                return l += 3,
                {
                    type: t.Punctuator,
                    value: ">>=",
                    lineNumber: c,
                    lineStart: h,
                    range: [e, l]
                };
            if (n === r && "+-<>&|".indexOf(n) >= 0 && "+-<>&|".indexOf(r) >= 0)
                return l += 2,
                {
                    type: t.Punctuator,
                    value: n + r,
                    lineNumber: c,
                    lineStart: h,
                    range: [e, l]
                };
            if ("<>=!+-*%&|^/".indexOf(n) >= 0)
                return ++l,
                r === "=" && (++l,
                    n += r),
                {
                    type: t.Punctuator,
                    value: n,
                    lineNumber: c,
                    lineStart: h,
                    range: [e, l]
                };
            X({}, s.UnexpectedToken, "ILLEGAL")
        }
        function j() {
            var e, n, r;
            r = a[l],
                y(w(r) || r === ".", "Numeric literal must start with a decimal digit or a decimal point"),
                n = l,
                e = "";
            if (r !== ".") {
                e = a[l++],
                    r = a[l];
                if (e === "0") {
                    if (r === "x" || r === "X") {
                        e += a[l++];
                        while (l < p) {
                            r = a[l];
                            if (!E(r))
                                break;
                            e += a[l++]
                        }
                        return e.length <= 2 && X({}, s.UnexpectedToken, "ILLEGAL"),
                        l < p && (r = a[l],
                        N(r) && X({}, s.UnexpectedToken, "ILLEGAL")),
                        {
                            type: t.NumericLiteral,
                            value: parseInt(e, 16),
                            lineNumber: c,
                            lineStart: h,
                            range: [n, l]
                        }
                    }
                    if (S(r)) {
                        e += a[l++];
                        while (l < p) {
                            r = a[l];
                            if (!S(r))
                                break;
                            e += a[l++]
                        }
                        return l < p && (r = a[l],
                        (N(r) || w(r)) && X({}, s.UnexpectedToken, "ILLEGAL")),
                        {
                            type: t.NumericLiteral,
                            value: parseInt(e, 8),
                            octal: !0,
                            lineNumber: c,
                            lineStart: h,
                            range: [n, l]
                        }
                    }
                    w(r) && X({}, s.UnexpectedToken, "ILLEGAL")
                }
                while (l < p) {
                    r = a[l];
                    if (!w(r))
                        break;
                    e += a[l++]
                }
            }
            if (r === ".") {
                e += a[l++];
                while (l < p) {
                    r = a[l];
                    if (!w(r))
                        break;
                    e += a[l++]
                }
            }
            if (r === "e" || r === "E") {
                e += a[l++],
                    r = a[l];
                if (r === "+" || r === "-")
                    e += a[l++];
                r = a[l];
                if (w(r)) {
                    e += a[l++];
                    while (l < p) {
                        r = a[l];
                        if (!w(r))
                            break;
                        e += a[l++]
                    }
                } else
                    r = "character " + r,
                    l >= p && (r = "<end>"),
                        X({}, s.UnexpectedToken, "ILLEGAL")
            }
            return l < p && (r = a[l],
            N(r) && X({}, s.UnexpectedToken, "ILLEGAL")),
            {
                type: t.NumericLiteral,
                value: parseFloat(e),
                lineNumber: c,
                lineStart: h,
                range: [n, l]
            }
        }
        function F() {
            var e = "", n, r, i, o, u, f, d = !1;
            n = a[l],
                y(n === "'" || n === '"', "String literal must starts with a quote"),
                r = l,
                ++l;
            while (l < p) {
                i = a[l++];
                if (i === n) {
                    n = "";
                    break
                }
                if (i === "\\") {
                    i = a[l++];
                    if (!T(i))
                        switch (i) {
                            case "n":
                                e += "\n";
                                break;
                            case "r":
                                e += "\r";
                                break;
                            case "t":
                                e += "	";
                                break;
                            case "u":
                            case "x":
                                f = l,
                                    u = _(i),
                                    u ? e += u : (l = f,
                                        e += i);
                                break;
                            case "b":
                                e += "\b";
                                break;
                            case "f":
                                e += "\f";
                                break;
                            case "v":
                                e += "";
                                break;
                            default:
                                S(i) ? (o = "01234567".indexOf(i),
                                o !== 0 && (d = !0),
                                l < p && S(a[l]) && (d = !0,
                                    o = o * 8 + "01234567".indexOf(a[l++]),
                                "0123".indexOf(i) >= 0 && l < p && S(a[l]) && (o = o * 8 + "01234567".indexOf(a[l++]))),
                                    e += String.fromCharCode(o)) : e += i
                        }
                    else
                        ++c,
                        i === "\r" && a[l] === "\n" && ++l
                } else {
                    if (T(i))
                        break;
                    e += i
                }
            }
            return n !== "" && X({}, s.UnexpectedToken, "ILLEGAL"),
            {
                type: t.StringLiteral,
                value: e,
                octal: d,
                lineNumber: c,
                lineStart: h,
                range: [r, l]
            }
        }
        function I() {
            var e, t, n, r, i, o, u = !1, f, c = !1;
            v = null ,
                M(),
                n = l,
                t = a[l],
                y(t === "/", "Regular expression literal must start with a slash"),
                e = a[l++];
            while (l < p) {
                t = a[l++],
                    e += t;
                if (u)
                    t === "]" && (u = !1);
                else if (t === "\\")
                    t = a[l++],
                    T(t) && X({}, s.UnterminatedRegExp),
                        e += t;
                else {
                    if (t === "/") {
                        c = !0;
                        break
                    }
                    t === "[" ? u = !0 : T(t) && X({}, s.UnterminatedRegExp)
                }
            }
            c || X({}, s.UnterminatedRegExp),
                r = e.substr(1, e.length - 2),
                i = "";
            while (l < p) {
                t = a[l];
                if (!C(t))
                    break;
                ++l;
                if (t === "\\" && l < p) {
                    t = a[l];
                    if (t === "u") {
                        ++l,
                            f = l,
                            t = _("u");
                        if (t) {
                            i += t;
                            for (e += "\\u"; f < l; ++f)
                                e += a[f]
                        } else
                            l = f,
                                i += "u",
                                e += "\\u"
                    } else
                        e += "\\"
                } else
                    i += t,
                        e += t
            }
            try {
                o = new RegExp(r,i)
            } catch (h) {
                X({}, s.InvalidRegExp)
            }
            return z(),
            {
                literal: e,
                value: o,
                range: [n, l]
            }
        }
        function q(e) {
            return e.type === t.Identifier || e.type === t.Keyword || e.type === t.BooleanLiteral || e.type === t.NullLiteral
        }
        function R() {
            var e;
            return M(),
                l >= p ? {
                    type: t.EOF,
                    lineNumber: c,
                    lineStart: h,
                    range: [l, l]
                } : (e = a[l],
                    N(e) ? H() : e === "." ? w(a[l + 1]) ? j() : B() : e === "'" || e === '"' ? F() : w(e) ? j() : B())
        }
        function U() {
            var e;
            return e = v,
                l = e.range[1],
                c = e.lineNumber,
                h = e.lineStart,
                v = R(),
                l = e.range[1],
                c = e.lineNumber,
                h = e.lineStart,
                e
        }
        function z() {
            var e, t, n;
            e = l,
                t = c,
                n = h,
                v = R(),
                l = e,
                c = t,
                h = n
        }
        function W() {
            var e, t, n, r;
            return e = l,
                t = c,
                n = h,
                M(),
                r = c !== t,
                l = e,
                c = t,
                h = n,
                r
        }
        function X(e, t) {
            var n, r = Array.prototype.slice.call(arguments, 2), i = t.replace(/%(\d)/g, function(e, t) {
                return r[t] || ""
            });
            throw typeof e.lineNumber == "number" ? (n = new Error("Line " + e.lineNumber + ": " + i),
                n.index = e.range[0],
                n.lineNumber = e.lineNumber,
                n.column = e.range[0] - h + 1) : (n = new Error("Line " + c + ": " + i),
                n.index = l,
                n.lineNumber = c,
                n.column = l - h + 1),
                n
        }
        function V() {
            try {
                X.apply(null , arguments)
            } catch (e) {
                if (!g.errors)
                    throw e;
                g.errors.push(e)
            }
        }
        function $(e) {
            e.type === t.EOF && X(e, s.UnexpectedEOS),
            e.type === t.NumericLiteral && X(e, s.UnexpectedNumber),
            e.type === t.StringLiteral && X(e, s.UnexpectedString),
            e.type === t.Identifier && X(e, s.UnexpectedIdentifier);
            if (e.type === t.Keyword) {
                if (k(e.value))
                    X(e, s.UnexpectedReserved);
                else if (f && L(e.value)) {
                    V(e, s.StrictReservedWord);
                    return
                }
                X(e, s.UnexpectedToken, e.value)
            }
            X(e, s.UnexpectedToken, e.value)
        }
        function J(e) {
            var n = U();
            (n.type !== t.Punctuator || n.value !== e) && $(n)
        }
        function K(e) {
            var n = U();
            (n.type !== t.Keyword || n.value !== e) && $(n)
        }
        function Q(e) {
            return v.type === t.Punctuator && v.value === e
        }
        function G(e) {
            return v.type === t.Keyword && v.value === e
        }
        function Y() {
            var e;
            return v.type !== t.Punctuator ? !1 : (e = v.value,
            e === "=" || e === "*=" || e === "/=" || e === "%=" || e === "+=" || e === "-=" || e === "<<=" || e === ">>=" || e === ">>>=" || e === "&=" || e === "^=" || e === "|=")
        }
        function Z() {
            var e;
            if (a[l] === ";") {
                U();
                return
            }
            e = c,
                M();
            if (c !== e)
                return;
            if (Q(";")) {
                U();
                return
            }
            v.type !== t.EOF && !Q("}") && $(v)
        }
        function et(e) {
            return e.type === r.Identifier || e.type === r.MemberExpression
        }
        function tt() {
            var e = [];
            J("[");
            while (!Q("]"))
                Q(",") ? (U(),
                    e.push(null )) : (e.push(Et()),
                Q("]") || J(","));
            return J("]"),
                d.createArrayExpression(e)
        }
        function nt(e, t) {
            var n, r;
            return n = f,
                r = Jt(),
            t && f && A(e[0].name) && V(t, s.StrictParamName),
                f = n,
                d.createFunctionExpression(null , e, [], r)
        }
        function rt() {
            var e = U();
            return e.type === t.StringLiteral || e.type === t.NumericLiteral ? (f && e.octal && V(e, s.StrictOctalLiteral),
                d.createLiteral(e)) : d.createIdentifier(e.value)
        }
        function it() {
            var e, n, r, i, s;
            e = v;
            if (e.type === t.Identifier)
                return r = rt(),
                    e.value === "get" && !Q(":") ? (n = rt(),
                        J("("),
                        J(")"),
                        i = nt([]),
                        d.createProperty("get", n, i)) : e.value === "set" && !Q(":") ? (n = rt(),
                        J("("),
                        e = v,
                    e.type !== t.Identifier && $(U()),
                        s = [Nt()],
                        J(")"),
                        i = nt(s, e),
                        d.createProperty("set", n, i)) : (J(":"),
                        i = Et(),
                        d.createProperty("init", r, i));
            if (e.type !== t.EOF && e.type !== t.Punctuator)
                return n = rt(),
                    J(":"),
                    i = Et(),
                    d.createProperty("init", n, i);
            $(e)
        }
        function st() {
            var e = [], t, n, o, u = {}, a = String;
            J("{");
            while (!Q("}"))
                t = it(),
                    t.key.type === r.Identifier ? n = t.key.name : n = a(t.key.value),
                    o = t.kind === "init" ? i.Data : t.kind === "get" ? i.Get : i.Set,
                    Object.prototype.hasOwnProperty.call(u, n) ? (u[n] === i.Data ? f && o === i.Data ? V({}, s.StrictDuplicateProperty) : o !== i.Data && V({}, s.AccessorDataProperty) : o === i.Data ? V({}, s.AccessorDataProperty) : u[n] & o && V({}, s.AccessorGetSet),
                        u[n] |= o) : u[n] = o,
                    e.push(t),
                Q("}") || J(",");
            return J("}"),
                d.createObjectExpression(e)
        }
        function ot() {
            var e;
            return J("("),
                e = St(),
                J(")"),
                e
        }
        function ut() {
            var e, n;
            e = v.type;
            if (e === t.Identifier)
                return d.createIdentifier(U().value);
            if (e === t.StringLiteral || e === t.NumericLiteral)
                return f && v.octal && V(v, s.StrictOctalLiteral),
                    d.createLiteral(U());
            if (e === t.Keyword) {
                if (G("this"))
                    return U(),
                        d.createThisExpression();
                if (G("function"))
                    return Gt()
            }
            return e === t.BooleanLiteral ? (n = U(),
                n.value = n.value === "true",
                d.createLiteral(n)) : e === t.NullLiteral ? (n = U(),
                n.value = null ,
                d.createLiteral(n)) : Q("[") ? tt() : Q("{") ? st() : Q("(") ? ot() : Q("/") || Q("/=") ? d.createLiteral(I()) : $(U())
        }
        function at() {
            var e = [];
            J("(");
            if (!Q(")"))
                while (l < p) {
                    e.push(Et());
                    if (Q(")"))
                        break;
                    J(",")
                }
            return J(")"),
                e
        }
        function ft() {
            var e = U();
            return q(e) || $(e),
                d.createIdentifier(e.value)
        }
        function lt() {
            return J("."),
                ft()
        }
        function ct() {
            var e;
            return J("["),
                e = St(),
                J("]"),
                e
        }
        function ht() {
            var e, t;
            return K("new"),
                e = dt(),
                t = Q("(") ? at() : [],
                d.createNewExpression(e, t)
        }
        function pt() {
            var e, t, n;
            e = G("new") ? ht() : ut();
            while (Q(".") || Q("[") || Q("("))
                Q("(") ? (t = at(),
                    e = d.createCallExpression(e, t)) : Q("[") ? (n = ct(),
                    e = d.createMemberExpression("[", e, n)) : (n = lt(),
                    e = d.createMemberExpression(".", e, n));
            return e
        }
        function dt() {
            var e, t;
            e = G("new") ? ht() : ut();
            while (Q(".") || Q("["))
                Q("[") ? (t = ct(),
                    e = d.createMemberExpression("[", e, t)) : (t = lt(),
                    e = d.createMemberExpression(".", e, t));
            return e
        }
        function vt() {
            var e = pt(), n;
            return v.type !== t.Punctuator ? e : ((Q("++") || Q("--")) && !W() && (f && e.type === r.Identifier && A(e.name) && V({}, s.StrictLHSPostfix),
            et(e) || X({}, s.InvalidLHSInAssignment),
                n = U(),
                e = d.createPostfixExpression(n.value, e)),
                e)
        }
        function mt() {
            var e, n;
            return v.type !== t.Punctuator && v.type !== t.Keyword ? vt() : Q("++") || Q("--") ? (e = U(),
                n = mt(),
            f && n.type === r.Identifier && A(n.name) && V({}, s.StrictLHSPrefix),
            et(n) || X({}, s.InvalidLHSInAssignment),
                d.createUnaryExpression(e.value, n)) : Q("+") || Q("-") || Q("~") || Q("!") ? (e = U(),
                n = mt(),
                d.createUnaryExpression(e.value, n)) : G("delete") || G("void") || G("typeof") ? (e = U(),
                n = mt(),
                n = d.createUnaryExpression(e.value, n),
            f && n.operator === "delete" && n.argument.type === r.Identifier && V({}, s.StrictDelete),
                n) : vt()
        }
        function gt(e, n) {
            var r = 0;
            if (e.type !== t.Punctuator && e.type !== t.Keyword)
                return 0;
            switch (e.value) {
                case "||":
                    r = 1;
                    break;
                case "&&":
                    r = 2;
                    break;
                case "|":
                    r = 3;
                    break;
                case "^":
                    r = 4;
                    break;
                case "&":
                    r = 5;
                    break;
                case "==":
                case "!=":
                case "===":
                case "!==":
                    r = 6;
                    break;
                case "<":
                case ">":
                case "<=":
                case ">=":
                case "instanceof":
                    r = 7;
                    break;
                case "in":
                    r = n ? 7 : 0;
                    break;
                case "<<":
                case ">>":
                case ">>>":
                    r = 8;
                    break;
                case "+":
                case "-":
                    r = 9;
                    break;
                case "*":
                case "/":
                case "%":
                    r = 11;
                    break;
                default:
            }
            return r
        }
        function yt(e) {
            var t = e.pop()
                , n = e.pop().value
                , r = e.pop();
            n === "||" || n === "&&" ? e.push(d.createLogicalExpression(n, r, t)) : e.push(d.createBinaryExpression(n, r, t))
        }
        function bt() {
            var e, t, n, r, i;
            r = m.allowIn,
                m.allowIn = !0,
                e = mt(),
                t = v,
                n = gt(t, r);
            if (n === 0)
                return e;
            t.prec = n,
                U(),
                i = [e, t, mt()];
            while ((n = gt(v, r)) > 0) {
                while (i.length > 2 && n <= i[i.length - 2].prec)
                    yt(i);
                t = U(),
                    t.prec = n,
                    i.push(t),
                    i.push(mt())
            }
            while (i.length > 1)
                yt(i);
            return m.allowIn = r,
                i[0]
        }
        function wt() {
            var e, t, n, r;
            return e = bt(),
            Q("?") && (U(),
                t = m.allowIn,
                m.allowIn = !0,
                n = Et(),
                m.allowIn = t,
                J(":"),
                r = Et(),
                e = d.createConditionalExpression(e, n, r)),
                e
        }
        function Et() {
            var e, t, n;
            return e = v,
                t = wt(),
                Y() ? (et(t) || X({}, s.InvalidLHSInAssignment),
                f && t.type === r.Identifier && A(t.name) && V(e, s.StrictLHSAssignment),
                    e = U(),
                    n = Et(),
                    d.createAssignmentExpression(e.value, t, n)) : t
        }
        function St() {
            var e = Et();
            if (Q(",")) {
                e = d.createSequenceExpression([e]);
                while (l < p) {
                    if (!Q(","))
                        break;
                    U(),
                        e.expressions.push(Et())
                }
            }
            return e
        }
        function xt() {
            var e = [], t;
            while (l < p) {
                if (Q("}"))
                    break;
                t = Yt();
                if (typeof t == "undefined")
                    break;
                e.push(t)
            }
            return e
        }
        function Tt() {
            var e;
            return J("{"),
                e = xt(),
                J("}"),
                d.createBlockStatement(e)
        }
        function Nt() {
            var e = U();
            return e.type !== t.Identifier && $(e),
                d.createIdentifier(e.value)
        }
        function Ct(e) {
            var t = Nt()
                , n = null ;
            return f && A(t.name) && V({}, s.StrictVarName),
                e === "const" ? (J("="),
                    n = Et()) : Q("=") && (U(),
                    n = Et()),
                d.createVariableDeclarator(t, n)
        }
        function kt(e) {
            var t = [];
            while (l < p) {
                t.push(Ct(e));
                if (!Q(","))
                    break;
                U()
            }
            return t
        }
        function Lt() {
            var e;
            return K("var"),
                e = kt(),
                Z(),
                d.createVariableDeclaration(e, "var")
        }
        function At(e) {
            var t;
            return K(e),
                t = kt(e),
                Z(),
                d.createVariableDeclaration(t, e)
        }
        function Ot() {
            return J(";"),
                d.createEmptyStatement()
        }
        function Mt() {
            var e = St();
            return Z(),
                d.createExpressionStatement(e)
        }
        function _t() {
            var e, t, n;
            return K("if"),
                J("("),
                e = St(),
                J(")"),
                t = $t(),
                G("else") ? (U(),
                    n = $t()) : n = null ,
                d.createIfStatement(e, t, n)
        }
        function Dt() {
            var e, t, n;
            return K("do"),
                n = m.inIteration,
                m.inIteration = !0,
                e = $t(),
                m.inIteration = n,
                K("while"),
                J("("),
                t = St(),
                J(")"),
            Q(";") && U(),
                d.createDoWhileStatement(e, t)
        }
        function Pt() {
            var e, t, n;
            return K("while"),
                J("("),
                e = St(),
                J(")"),
                n = m.inIteration,
                m.inIteration = !0,
                t = $t(),
                m.inIteration = n,
                d.createWhileStatement(e, t)
        }
        function Ht() {
            var e = U()
                , t = kt();
            return d.createVariableDeclaration(t, e.value)
        }
        function Bt() {
            var e, t, n, r, i, o, u;
            return e = t = n = null ,
                K("for"),
                J("("),
                Q(";") ? U() : (G("var") || G("let") ? (m.allowIn = !1,
                    e = Ht(),
                    m.allowIn = !0,
                e.declarations.length === 1 && G("in") && (U(),
                    r = e,
                    i = St(),
                    e = null )) : (m.allowIn = !1,
                    e = St(),
                    m.allowIn = !0,
                G("in") && (et(e) || X({}, s.InvalidLHSInForIn),
                    U(),
                    r = e,
                    i = St(),
                    e = null )),
                typeof r == "undefined" && J(";")),
            typeof r == "undefined" && (Q(";") || (t = St()),
                J(";"),
            Q(")") || (n = St())),
                J(")"),
                u = m.inIteration,
                m.inIteration = !0,
                o = $t(),
                m.inIteration = u,
                typeof r == "undefined" ? d.createForStatement(e, t, n, o) : d.createForInStatement(r, i, o)
        }
        function jt() {
            var e = null ;
            return K("continue"),
                a[l] === ";" ? (U(),
                m.inIteration || X({}, s.IllegalContinue),
                    d.createContinueStatement(null )) : W() ? (m.inIteration || X({}, s.IllegalContinue),
                    d.createContinueStatement(null )) : (v.type === t.Identifier && (e = Nt(),
                Object.prototype.hasOwnProperty.call(m.labelSet, e.name) || X({}, s.UnknownLabel, e.name)),
                    Z(),
                e === null && !m.inIteration && X({}, s.IllegalContinue),
                    d.createContinueStatement(e))
        }
        function Ft() {
            var e = null ;
            return K("break"),
                a[l] === ";" ? (U(),
                !m.inIteration && !m.inSwitch && X({}, s.IllegalBreak),
                    d.createBreakStatement(null )) : W() ? (!m.inIteration && !m.inSwitch && X({}, s.IllegalBreak),
                    d.createBreakStatement(null )) : (v.type === t.Identifier && (e = Nt(),
                Object.prototype.hasOwnProperty.call(m.labelSet, e.name) || X({}, s.UnknownLabel, e.name)),
                    Z(),
                e === null && !m.inIteration && !m.inSwitch && X({}, s.IllegalBreak),
                    d.createBreakStatement(e))
        }
        function It() {
            var e = null ;
            return K("return"),
            m.inFunctionBody || V({}, s.IllegalReturn),
                a[l] === " " && N(a[l + 1]) ? (e = St(),
                    Z(),
                    d.createReturnStatement(e)) : W() ? d.createReturnStatement(null ) : (Q(";") || !Q("}") && v.type !== t.EOF && (e = St()),
                    Z(),
                    d.createReturnStatement(e))
        }
        function qt() {
            var e, t;
            return f && V({}, s.StrictModeWith),
                K("with"),
                J("("),
                e = St(),
                J(")"),
                t = $t(),
                d.createWithStatement(e, t)
        }
        function Rt() {
            var e, t = [], n;
            G("default") ? (U(),
                e = null ) : (K("case"),
                e = St()),
                J(":");
            while (l < p) {
                if (Q("}") || G("default") || G("case"))
                    break;
                n = $t();
                if (typeof n == "undefined")
                    break;
                t.push(n)
            }
            return d.createSwitchCase(e, t)
        }
        function Ut() {
            var e, t, n, r, i;
            K("switch"),
                J("("),
                e = St(),
                J(")"),
                J("{");
            if (Q("}"))
                return U(),
                    d.createSwitchStatement(e);
            t = [],
                r = m.inSwitch,
                m.inSwitch = !0,
                i = !1;
            while (l < p) {
                if (Q("}"))
                    break;
                n = Rt(),
                n.test === null && (i && X({}, s.MultipleDefaultsInSwitch),
                    i = !0),
                    t.push(n)
            }
            return m.inSwitch = r,
                J("}"),
                d.createSwitchStatement(e, t)
        }
        function zt() {
            var e;
            return K("throw"),
            W() && X({}, s.NewlineAfterThrow),
                e = St(),
                Z(),
                d.createThrowStatement(e)
        }
        function Wt() {
            var e, t;
            return K("catch"),
                J("("),
            Q(")") || (e = St(),
            f && e.type === r.Identifier && A(e.name) && V({}, s.StrictCatchVariable)),
                J(")"),
                t = Tt(),
                d.createCatchClause(e, t)
        }
        function Xt() {
            var e, t = [], n = null ;
            return K("try"),
                e = Tt(),
            G("catch") && t.push(Wt()),
            G("finally") && (U(),
                n = Tt()),
            t.length === 0 && !n && X({}, s.NoCatchOrFinally),
                d.createTryStatement(e, [], t, n)
        }
        function Vt() {
            return K("debugger"),
                Z(),
                d.createDebuggerStatement()
        }
        function $t() {
            var e = v.type, n, i;
            e === t.EOF && $(v);
            if (e === t.Punctuator)
                switch (v.value) {
                    case ";":
                        return Ot();
                    case "{":
                        return Tt();
                    case "(":
                        return Mt();
                    default:
                }
            if (e === t.Keyword)
                switch (v.value) {
                    case "break":
                        return Ft();
                    case "continue":
                        return jt();
                    case "debugger":
                        return Vt();
                    case "do":
                        return Dt();
                    case "for":
                        return Bt();
                    case "function":
                        return Qt();
                    case "if":
                        return _t();
                    case "return":
                        return It();
                    case "switch":
                        return Ut();
                    case "throw":
                        return zt();
                    case "try":
                        return Xt();
                    case "var":
                        return Lt();
                    case "while":
                        return Pt();
                    case "with":
                        return qt();
                    default:
                }
            return n = St(),
                n.type === r.Identifier && Q(":") ? (U(),
                Object.prototype.hasOwnProperty.call(m.labelSet, n.name) && X({}, s.Redeclaration, "Label", n.name),
                    m.labelSet[n.name] = !0,
                    i = $t(),
                    delete m.labelSet[n.name],
                    d.createLabeledStatement(n, i)) : (Z(),
                    d.createExpressionStatement(n))
        }
        function Jt() {
            var e, n = [], i, o, u, a, c, h, g;
            J("{");
            while (l < p) {
                if (v.type !== t.StringLiteral)
                    break;
                i = v,
                    e = Yt(),
                    n.push(e);
                if (e.expression.type !== r.Literal)
                    break;
                o = b(i.range[0] + 1, i.range[1] - 1),
                    o === "use strict" ? (f = !0,
                    u && V(u, s.StrictOctalLiteral)) : !u && i.octal && (u = i)
            }
            a = m.labelSet,
                c = m.inIteration,
                h = m.inSwitch,
                g = m.inFunctionBody,
                m.labelSet = {},
                m.inIteration = !1,
                m.inSwitch = !1,
                m.inFunctionBody = !0;
            while (l < p) {
                if (Q("}"))
                    break;
                e = Yt();
                if (typeof e == "undefined")
                    break;
                n.push(e)
            }
            return J("}"),
                m.labelSet = a,
                m.inIteration = c,
                m.inSwitch = h,
                m.inFunctionBody = g,
                d.createBlockStatement(n)
        }
        function Kt(e) {
            var t, n = [], r, i, o, u;
            J("(");
            if (!Q(")")) {
                o = {};
                while (l < p) {
                    r = v,
                        t = Nt(),
                        f ? (A(r.value) && (i = r,
                            u = s.StrictParamName),
                        Object.prototype.hasOwnProperty.call(o, r.value) && (i = r,
                            u = s.StrictParamDupe)) : e || (A(r.value) ? (e = r,
                            u = s.StrictParamName) : L(r.value) ? (e = r,
                            u = s.StrictReservedWord) : Object.prototype.hasOwnProperty.call(o, r.value) && (e = r,
                            u = s.StrictParamDupe)),
                        n.push(t),
                        o[t.name] = !0;
                    if (Q(")"))
                        break;
                    J(",")
                }
            }
            return J(")"),
            {
                params: n,
                stricted: i,
                firstRestricted: e,
                message: u
            }
        }
        function Qt() {
            var e, t = [], n, r, i, o, u, a, l;
            return K("function"),
                r = v,
                e = Nt(),
                f ? A(r.value) && V(r, s.StrictFunctionName) : A(r.value) ? (u = r,
                    a = s.StrictFunctionName) : L(r.value) && (u = r,
                    a = s.StrictReservedWord),
                o = Kt(u),
                t = o.params,
                i = o.stricted,
                u = o.firstRestricted,
            o.message && (a = o.message),
                l = f,
                n = Jt(),
            f && u && X(u, a),
            f && i && V(i, a),
                f = l,
                d.createFunctionDeclaration(e, t, [], n)
        }
        function Gt() {
            var e, t = null , n, r, i, o, u = [], a, l;
            return K("function"),
            Q("(") || (e = v,
                t = Nt(),
                f ? A(e.value) && V(e, s.StrictFunctionName) : A(e.value) ? (r = e,
                    i = s.StrictFunctionName) : L(e.value) && (r = e,
                    i = s.StrictReservedWord)),
                o = Kt(r),
                u = o.params,
                n = o.stricted,
                r = o.firstRestricted,
            o.message && (i = o.message),
                l = f,
                a = Jt(),
            f && r && X(r, i),
            f && n && V(n, i),
                f = l,
                d.createFunctionExpression(t, u, [], a)
        }
        function Yt() {
            if (v.type === t.Keyword)
                switch (v.value) {
                    case "const":
                    case "let":
                        return At(v.value);
                    case "function":
                        return Qt();
                    default:
                        return $t()
                }
            if (v.type !== t.EOF)
                return $t()
        }
        function Zt() {
            var e, n = [], i, o, u;
            while (l < p) {
                i = v;
                if (i.type !== t.StringLiteral)
                    break;
                e = Yt(),
                    n.push(e);
                if (e.expression.type !== r.Literal)
                    break;
                o = b(i.range[0] + 1, i.range[1] - 1),
                    o === "use strict" ? (f = !0,
                    u && V(u, s.StrictOctalLiteral)) : !u && i.octal && (u = i)
            }
            while (l < p) {
                e = Yt();
                if (typeof e == "undefined")
                    break;
                n.push(e)
            }
            return n
        }
        function en() {
            var e;
            return f = !1,
                z(),
                e = Zt(),
                d.createProgram(e)
        }
        function tn(e, t, n, r, i) {
            y(typeof n == "number", "Comment must have valid position");
            if (g.comments.length > 0 && g.comments[g.comments.length - 1].range[1] > n)
                return;
            g.comments.push({
                type: e,
                value: t,
                range: [n, r],
                loc: i
            })
        }
        function nn() {
            var e, t, n, r, i, o;
            e = "",
                i = !1,
                o = !1;
            while (l < p) {
                t = a[l];
                if (o)
                    t = a[l++],
                        T(t) ? (n.end = {
                            line: c,
                            column: l - h - 1
                        },
                            o = !1,
                            tn("Line", e, r, l - 1, n),
                        t === "\r" && a[l] === "\n" && ++l,
                            ++c,
                            h = l,
                            e = "") : l >= p ? (o = !1,
                            e += t,
                            n.end = {
                                line: c,
                                column: p - h
                            },
                            tn("Line", e, r, p, n)) : e += t;
                else if (i)
                    T(t) ? (t === "\r" && a[l + 1] === "\n" ? (++l,
                        e += "\r\n") : e += t,
                        ++c,
                        ++l,
                        h = l,
                    l >= p && X({}, s.UnexpectedToken, "ILLEGAL")) : (t = a[l++],
                    l >= p && X({}, s.UnexpectedToken, "ILLEGAL"),
                        e += t,
                    t === "*" && (t = a[l],
                    t === "/" && (e = e.substr(0, e.length - 1),
                        i = !1,
                        ++l,
                        n.end = {
                            line: c,
                            column: l - h
                        },
                        tn("Block", e, r, l, n),
                        e = "")));
                else if (t === "/") {
                    t = a[l + 1];
                    if (t === "/")
                        n = {
                            start: {
                                line: c,
                                column: l - h
                            }
                        },
                            r = l,
                            l += 2,
                            o = !0,
                        l >= p && (n.end = {
                            line: c,
                            column: l - h
                        },
                            o = !1,
                            tn("Line", e, r, l, n));
                    else {
                        if (t !== "*")
                            break;
                        r = l,
                            l += 2,
                            i = !0,
                            n = {
                                start: {
                                    line: c,
                                    column: l - h - 2
                                }
                            },
                        l >= p && X({}, s.UnexpectedToken, "ILLEGAL")
                    }
                } else if (x(t))
                    ++l;
                else {
                    if (!T(t))
                        break;
                    ++l,
                    t === "\r" && a[l] === "\n" && ++l,
                        ++c,
                        h = l
                }
            }
        }
        function rn() {
            var e, t, n, r = [];
            for (e = 0; e < g.comments.length; ++e)
                t = g.comments[e],
                    n = {
                        type: t.type,
                        value: t.value
                    },
                g.range && (n.range = t.range),
                g.loc && (n.loc = t.loc),
                    r.push(n);
            g.comments = r
        }
        function sn() {
            var e, r, i, s, o;
            return M(),
                e = l,
                r = {
                    start: {
                        line: c,
                        column: l - h
                    }
                },
                i = g.advance(),
                r.end = {
                    line: c,
                    column: l - h
                },
            i.type !== t.EOF && (s = [i.range[0], i.range[1]],
                o = b(i.range[0], i.range[1]),
                g.tokens.push({
                    type: n[i.type],
                    value: o,
                    range: s,
                    loc: r
                })),
                i
        }
        function on() {
            var e, t, n, r;
            return M(),
                e = l,
                t = {
                    start: {
                        line: c,
                        column: l - h
                    }
                },
                n = g.scanRegExp(),
                t.end = {
                    line: c,
                    column: l - h
                },
            g.tokens.length > 0 && (r = g.tokens[g.tokens.length - 1],
            r.range[0] === e && r.type === "Punctuator" && (r.value === "/" || r.value === "/=") && g.tokens.pop()),
                g.tokens.push({
                    type: "RegularExpression",
                    value: n.literal,
                    range: [e, l],
                    loc: t
                }),
                n
        }
        function un() {
            var e, t, n, r = [];
            for (e = 0; e < g.tokens.length; ++e)
                t = g.tokens[e],
                    n = {
                        type: t.type,
                        value: t.value
                    },
                g.range && (n.range = t.range),
                g.loc && (n.loc = t.loc),
                    r.push(n);
            g.tokens = r
        }
        function an() {
            var e = {};
            return e.range = [l, l],
                e.loc = {
                    start: {
                        line: c,
                        column: l - h
                    },
                    end: {
                        line: c,
                        column: l - h
                    }
                },
                e.end = function() {
                    this.range[1] = l,
                        this.loc.end.line = c,
                        this.loc.end.column = l - h
                }
                ,
                e.applyGroup = function(e) {
                    g.range && (e.groupRange = [this.range[0], this.range[1]]),
                    g.loc && (e.groupLoc = {
                        start: {
                            line: this.loc.start.line,
                            column: this.loc.start.column
                        },
                        end: {
                            line: this.loc.end.line,
                            column: this.loc.end.column
                        }
                    })
                }
                ,
                e.apply = function(e) {
                    g.range && (e.range = [this.range[0], this.range[1]]),
                    g.loc && (e.loc = {
                        start: {
                            line: this.loc.start.line,
                            column: this.loc.start.column
                        },
                        end: {
                            line: this.loc.end.line,
                            column: this.loc.end.column
                        }
                    })
                }
                ,
                e
        }
        function fn() {
            var e, t;
            return M(),
                e = an(),
                J("("),
                t = St(),
                J(")"),
                e.end(),
                e.applyGroup(t),
                t
        }
        function ln() {
            var e, t, n;
            M(),
                e = an(),
                t = G("new") ? ht() : ut();
            while (Q(".") || Q("["))
                Q("[") ? (n = ct(),
                    t = d.createMemberExpression("[", t, n),
                    e.end(),
                    e.apply(t)) : (n = lt(),
                    t = d.createMemberExpression(".", t, n),
                    e.end(),
                    e.apply(t));
            return t
        }
        function cn() {
            var e, t, n, r;
            M(),
                e = an(),
                t = G("new") ? ht() : ut();
            while (Q(".") || Q("[") || Q("("))
                Q("(") ? (n = at(),
                    t = d.createCallExpression(t, n),
                    e.end(),
                    e.apply(t)) : Q("[") ? (r = ct(),
                    t = d.createMemberExpression("[", t, r),
                    e.end(),
                    e.apply(t)) : (r = lt(),
                    t = d.createMemberExpression(".", t, r),
                    e.end(),
                    e.apply(t));
            return t
        }
        function hn(e) {
            var t, n, r;
            t = Object.prototype.toString.apply(e) === "[object Array]" ? [] : {};
            for (n in e)
                e.hasOwnProperty(n) && n !== "groupRange" && n !== "groupLoc" && (r = e[n],
                    r === null || typeof r != "object" || r instanceof RegExp ? t[n] = r : t[n] = hn(r));
            return t
        }
        function pn(e, t) {
            return function(n) {
                function i(e) {
                    return e.type === r.LogicalExpression || e.type === r.BinaryExpression
                }
                function s(n) {
                    var r, o;
                    i(n.left) && s(n.left),
                    i(n.right) && s(n.right),
                    e && (n.left.groupRange || n.right.groupRange ? (r = n.left.groupRange ? n.left.groupRange[0] : n.left.range[0],
                        o = n.right.groupRange ? n.right.groupRange[1] : n.right.range[1],
                        n.range = [r, o]) : typeof n.range == "undefined" && (r = n.left.range[0],
                        o = n.right.range[1],
                        n.range = [r, o])),
                    t && (n.left.groupLoc || n.right.groupLoc ? (r = n.left.groupLoc ? n.left.groupLoc.start : n.left.loc.start,
                        o = n.right.groupLoc ? n.right.groupLoc.end : n.right.loc.end,
                        n.loc = {
                            start: r,
                            end: o
                        }) : typeof n.loc == "undefined" && (n.loc = {
                        start: n.left.loc.start,
                        end: n.right.loc.end
                    }))
                }
                return function() {
                    var r, o;
                    return M(),
                        r = an(),
                        o = n.apply(null , arguments),
                        r.end(),
                    e && typeof o.range == "undefined" && r.apply(o),
                    t && typeof o.loc == "undefined" && r.apply(o),
                    i(o) && s(o),
                        o
                }
            }
        }
        function dn() {
            var e;
            g.comments && (g.skipComment = M,
                M = nn);
            if (g.range || g.loc)
                g.parseGroupExpression = ot,
                    g.parseLeftHandSideExpression = dt,
                    g.parseLeftHandSideExpressionAllowCall = pt,
                    ot = fn,
                    dt = ln,
                    pt = cn,
                    e = pn(g.range, g.loc),
                    g.parseAssignmentExpression = Et,
                    g.parseBinaryExpression = bt,
                    g.parseBlock = Tt,
                    g.parseFunctionSourceElements = Jt,
                    g.parseCatchClause = Wt,
                    g.parseComputedMember = ct,
                    g.parseConditionalExpression = wt,
                    g.parseConstLetDeclaration = At,
                    g.parseExpression = St,
                    g.parseForVariableDeclaration = Ht,
                    g.parseFunctionDeclaration = Qt,
                    g.parseFunctionExpression = Gt,
                    g.parseNewExpression = ht,
                    g.parseNonComputedProperty = ft,
                    g.parseObjectProperty = it,
                    g.parseObjectPropertyKey = rt,
                    g.parsePostfixExpression = vt,
                    g.parsePrimaryExpression = ut,
                    g.parseProgram = en,
                    g.parsePropertyFunction = nt,
                    g.parseStatement = $t,
                    g.parseSwitchCase = Rt,
                    g.parseUnaryExpression = mt,
                    g.parseVariableDeclaration = Ct,
                    g.parseVariableIdentifier = Nt,
                    Et = e(g.parseAssignmentExpression),
                    bt = e(g.parseBinaryExpression),
                    Tt = e(g.parseBlock),
                    Jt = e(g.parseFunctionSourceElements),
                    Wt = e(g.parseCatchClause),
                    ct = e(g.parseComputedMember),
                    wt = e(g.parseConditionalExpression),
                    At = e(g.parseConstLetDeclaration),
                    St = e(g.parseExpression),
                    Ht = e(g.parseForVariableDeclaration),
                    Qt = e(g.parseFunctionDeclaration),
                    Gt = e(g.parseFunctionExpression),
                    dt = e(dt),
                    ht = e(g.parseNewExpression),
                    ft = e(g.parseNonComputedProperty),
                    it = e(g.parseObjectProperty),
                    rt = e(g.parseObjectPropertyKey),
                    vt = e(g.parsePostfixExpression),
                    ut = e(g.parsePrimaryExpression),
                    en = e(g.parseProgram),
                    nt = e(g.parsePropertyFunction),
                    $t = e(g.parseStatement),
                    Rt = e(g.parseSwitchCase),
                    mt = e(g.parseUnaryExpression),
                    Ct = e(g.parseVariableDeclaration),
                    Nt = e(g.parseVariableIdentifier);
            typeof g.tokens != "undefined" && (g.advance = R,
                g.scanRegExp = I,
                R = sn,
                I = on)
        }
        function vn() {
            typeof g.skipComment == "function" && (M = g.skipComment);
            if (g.range || g.loc)
                Et = g.parseAssignmentExpression,
                    bt = g.parseBinaryExpression,
                    Tt = g.parseBlock,
                    Jt = g.parseFunctionSourceElements,
                    Wt = g.parseCatchClause,
                    ct = g.parseComputedMember,
                    wt = g.parseConditionalExpression,
                    At = g.parseConstLetDeclaration,
                    St = g.parseExpression,
                    Ht = g.parseForVariableDeclaration,
                    Qt = g.parseFunctionDeclaration,
                    Gt = g.parseFunctionExpression,
                    ot = g.parseGroupExpression,
                    dt = g.parseLeftHandSideExpression,
                    pt = g.parseLeftHandSideExpressionAllowCall,
                    ht = g.parseNewExpression,
                    ft = g.parseNonComputedProperty,
                    it = g.parseObjectProperty,
                    rt = g.parseObjectPropertyKey,
                    ut = g.parsePrimaryExpression,
                    vt = g.parsePostfixExpression,
                    en = g.parseProgram,
                    nt = g.parsePropertyFunction,
                    $t = g.parseStatement,
                    Rt = g.parseSwitchCase,
                    mt = g.parseUnaryExpression,
                    Ct = g.parseVariableDeclaration,
                    Nt = g.parseVariableIdentifier;
            typeof g.scanRegExp == "function" && (R = g.advance,
                I = g.scanRegExp)
        }
        function mn(e) {
            var t = e.length, n = [], r;
            for (r = 0; r < t; ++r)
                n[r] = e.charAt(r);
            return n
        }
        function gn(e, t) {
            var n, r = {};
            for (n in e)
                e.hasOwnProperty(n) && (r[n] = e[n]);
            for (n in t)
                t.hasOwnProperty(n) && (r[n] = t[n]);
            return r
        }
        function yn(e, t) {
            var n, r;
            r = String,
            typeof e != "string" && !(e instanceof String) && (e = r(e)),
                d = u,
                a = e,
                l = 0,
                c = a.length > 0 ? 1 : 0,
                h = 0,
                p = a.length,
                v = null ,
                m = {
                    allowIn: !0,
                    labelSet: {},
                    inFunctionBody: !1,
                    inIteration: !1,
                    inSwitch: !1
                },
                g = {},
            typeof t != "undefined" && (g.range = typeof t.range == "boolean" && t.range,
                g.loc = typeof t.loc == "boolean" && t.loc,
            typeof t.tokens == "boolean" && t.tokens && (g.tokens = []),
            typeof t.comment == "boolean" && t.comment && (g.comments = []),
            typeof t.tolerant == "boolean" && t.tolerant && (g.errors = [])),
            p > 0 && typeof a[0] == "undefined" && (e instanceof String && (a = e.valueOf()),
            typeof a[0] == "undefined" && (a = mn(e))),
                dn();
            try {
                n = en(),
                typeof g.comments != "undefined" && (rn(),
                    n.comments = g.comments),
                typeof g.tokens != "undefined" && (un(),
                    n.tokens = g.tokens),
                typeof g.errors != "undefined" && (n.errors = g.errors);
                if (g.range || g.loc)
                    n.body = hn(n.body)
            } catch (i) {
                throw i
            } finally {
                vn(),
                    g = {}
            }
            return n
        }
        var t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g;
        t = {
            BooleanLiteral: 1,
            EOF: 2,
            Identifier: 3,
            Keyword: 4,
            NullLiteral: 5,
            NumericLiteral: 6,
            Punctuator: 7,
            StringLiteral: 8
        },
            n = {},
            n[t.BooleanLiteral] = "Boolean",
            n[t.EOF] = "<end>",
            n[t.Identifier] = "Identifier",
            n[t.Keyword] = "Keyword",
            n[t.NullLiteral] = "Null",
            n[t.NumericLiteral] = "Numeric",
            n[t.Punctuator] = "Punctuator",
            n[t.StringLiteral] = "String",
            r = {
                AssignmentExpression: "AssignmentExpression",
                ArrayExpression: "ArrayExpression",
                BlockStatement: "BlockStatement",
                BinaryExpression: "BinaryExpression",
                BreakStatement: "BreakStatement",
                CallExpression: "CallExpression",
                CatchClause: "CatchClause",
                ConditionalExpression: "ConditionalExpression",
                ContinueStatement: "ContinueStatement",
                DoWhileStatement: "DoWhileStatement",
                DebuggerStatement: "DebuggerStatement",
                EmptyStatement: "EmptyStatement",
                ExpressionStatement: "ExpressionStatement",
                ForStatement: "ForStatement",
                ForInStatement: "ForInStatement",
                FunctionDeclaration: "FunctionDeclaration",
                FunctionExpression: "FunctionExpression",
                Identifier: "Identifier",
                IfStatement: "IfStatement",
                Literal: "Literal",
                LabeledStatement: "LabeledStatement",
                LogicalExpression: "LogicalExpression",
                MemberExpression: "MemberExpression",
                NewExpression: "NewExpression",
                ObjectExpression: "ObjectExpression",
                Program: "Program",
                Property: "Property",
                ReturnStatement: "ReturnStatement",
                SequenceExpression: "SequenceExpression",
                SwitchStatement: "SwitchStatement",
                SwitchCase: "SwitchCase",
                ThisExpression: "ThisExpression",
                ThrowStatement: "ThrowStatement",
                TryStatement: "TryStatement",
                UnaryExpression: "UnaryExpression",
                UpdateExpression: "UpdateExpression",
                VariableDeclaration: "VariableDeclaration",
                VariableDeclarator: "VariableDeclarator",
                WhileStatement: "WhileStatement",
                WithStatement: "WithStatement"
            },
            i = {
                Data: 1,
                Get: 2,
                Set: 4
            },
            s = {
                UnexpectedToken: "Unexpected token %0",
                UnexpectedNumber: "Unexpected number",
                UnexpectedString: "Unexpected string",
                UnexpectedIdentifier: "Unexpected identifier",
                UnexpectedReserved: "Unexpected reserved word",
                UnexpectedEOS: "Unexpected end of input",
                NewlineAfterThrow: "Illegal newline after throw",
                InvalidRegExp: "Invalid regular expression",
                UnterminatedRegExp: "Invalid regular expression: missing /",
                InvalidLHSInAssignment: "Invalid left-hand side in assignment",
                InvalidLHSInForIn: "Invalid left-hand side in for-in",
                MultipleDefaultsInSwitch: "More than one default clause in switch statement",
                NoCatchOrFinally: "Missing catch or finally after try",
                UnknownLabel: "Undefined label '%0'",
                Redeclaration: "%0 '%1' has already been declared",
                IllegalContinue: "Illegal continue statement",
                IllegalBreak: "Illegal break statement",
                IllegalReturn: "Illegal return statement",
                StrictModeWith: "Strict mode code may not include a with statement",
                StrictCatchVariable: "Catch variable may not be eval or arguments in strict mode",
                StrictVarName: "Variable name may not be eval or arguments in strict mode",
                StrictParamName: "Parameter name eval or arguments is not allowed in strict mode",
                StrictParamDupe: "Strict mode function may not have duplicate parameter names",
                StrictFunctionName: "Function name may not be eval or arguments in strict mode",
                StrictOctalLiteral: "Octal literals are not allowed in strict mode.",
                StrictDelete: "Delete of an unqualified identifier in strict mode.",
                StrictDuplicateProperty: "Duplicate data property in object literal not allowed in strict mode",
                AccessorDataProperty: "Object literal may not have data and accessor property with the same name",
                AccessorGetSet: "Object literal may not have multiple get/set accessors with the same name",
                StrictLHSAssignment: "Assignment to eval or arguments is not allowed in strict mode",
                StrictLHSPostfix: "Postfix increment/decrement may not have eval or arguments operand in strict mode",
                StrictLHSPrefix: "Prefix increment/decrement may not have eval or arguments operand in strict mode",
                StrictReservedWord: "Use of future reserved word in strict mode"
            },
            o = {
                NonAsciiIdentifierStart: new RegExp("[\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]"),
                NonAsciiIdentifierPart: new RegExp("[\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0300-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u0483-\u0487\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u05d0-\u05ea\u05f0-\u05f2\u0610-\u061a\u0620-\u0669\u066e-\u06d3\u06d5-\u06dc\u06df-\u06e8\u06ea-\u06fc\u06ff\u0710-\u074a\u074d-\u07b1\u07c0-\u07f5\u07fa\u0800-\u082d\u0840-\u085b\u08a0\u08a2-\u08ac\u08e4-\u08fe\u0900-\u0963\u0966-\u096f\u0971-\u0977\u0979-\u097f\u0981-\u0983\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bc-\u09c4\u09c7\u09c8\u09cb-\u09ce\u09d7\u09dc\u09dd\u09df-\u09e3\u09e6-\u09f1\u0a01-\u0a03\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a59-\u0a5c\u0a5e\u0a66-\u0a75\u0a81-\u0a83\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abc-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ad0\u0ae0-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3c-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5c\u0b5d\u0b5f-\u0b63\u0b66-\u0b6f\u0b71\u0b82\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd0\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c58\u0c59\u0c60-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbc-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0cde\u0ce0-\u0ce3\u0ce6-\u0cef\u0cf1\u0cf2\u0d02\u0d03\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d-\u0d44\u0d46-\u0d48\u0d4a-\u0d4e\u0d57\u0d60-\u0d63\u0d66-\u0d6f\u0d7a-\u0d7f\u0d82\u0d83\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e01-\u0e3a\u0e40-\u0e4e\u0e50-\u0e59\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb9\u0ebb-\u0ebd\u0ec0-\u0ec4\u0ec6\u0ec8-\u0ecd\u0ed0-\u0ed9\u0edc-\u0edf\u0f00\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e-\u0f47\u0f49-\u0f6c\u0f71-\u0f84\u0f86-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1049\u1050-\u109d\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u135d-\u135f\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176c\u176e-\u1770\u1772\u1773\u1780-\u17d3\u17d7\u17dc\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1820-\u1877\u1880-\u18aa\u18b0-\u18f5\u1900-\u191c\u1920-\u192b\u1930-\u193b\u1946-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u19d0-\u19d9\u1a00-\u1a1b\u1a20-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1aa7\u1b00-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1bf3\u1c00-\u1c37\u1c40-\u1c49\u1c4d-\u1c7d\u1cd0-\u1cd2\u1cd4-\u1cf6\u1d00-\u1de6\u1dfc-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u200c\u200d\u203f\u2040\u2054\u2071\u207f\u2090-\u209c\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d7f-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2de0-\u2dff\u2e2f\u3005-\u3007\u3021-\u302f\u3031-\u3035\u3038-\u303c\u3041-\u3096\u3099\u309a\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua62b\ua640-\ua66f\ua674-\ua67d\ua67f-\ua697\ua69f-\ua6f1\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua827\ua840-\ua873\ua880-\ua8c4\ua8d0-\ua8d9\ua8e0-\ua8f7\ua8fb\ua900-\ua92d\ua930-\ua953\ua960-\ua97c\ua980-\ua9c0\ua9cf-\ua9d9\uaa00-\uaa36\uaa40-\uaa4d\uaa50-\uaa59\uaa60-\uaa76\uaa7a\uaa7b\uaa80-\uaac2\uaadb-\uaadd\uaae0-\uaaef\uaaf2-\uaaf6\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabea\uabec\uabed\uabf0-\uabf9\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\ufe70-\ufe74\ufe76-\ufefc\uff10-\uff19\uff21-\uff3a\uff3f\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]")
            },
        typeof "esprima"[0] == "undefined" && (b = function(t, n) {
                return a.slice(t, n).join("")
            }
        ),
            u = {
                name: "SyntaxTree",
                createArrayExpression: function(e) {
                    return {
                        type: r.ArrayExpression,
                        elements: e
                    }
                },
                createAssignmentExpression: function(e, t, n) {
                    return {
                        type: r.AssignmentExpression,
                        operator: e,
                        left: t,
                        right: n
                    }
                },
                createBinaryExpression: function(e, t, n) {
                    return {
                        type: r.BinaryExpression,
                        operator: e,
                        left: t,
                        right: n
                    }
                },
                createBlockStatement: function(e) {
                    return {
                        type: r.BlockStatement,
                        body: e
                    }
                },
                createBreakStatement: function(e) {
                    return {
                        type: r.BreakStatement,
                        label: e
                    }
                },
                createCallExpression: function(e, t) {
                    return {
                        type: r.CallExpression,
                        callee: e,
                        arguments: t
                    }
                },
                createCatchClause: function(e, t) {
                    return {
                        type: r.CatchClause,
                        param: e,
                        body: t
                    }
                },
                createConditionalExpression: function(e, t, n) {
                    return {
                        type: r.ConditionalExpression,
                        test: e,
                        consequent: t,
                        alternate: n
                    }
                },
                createContinueStatement: function(e) {
                    return {
                        type: r.ContinueStatement,
                        label: e
                    }
                },
                createDebuggerStatement: function() {
                    return {
                        type: r.DebuggerStatement
                    }
                },
                createDoWhileStatement: function(e, t) {
                    return {
                        type: r.DoWhileStatement,
                        body: e,
                        test: t
                    }
                },
                createEmptyStatement: function() {
                    return {
                        type: r.EmptyStatement
                    }
                },
                createExpressionStatement: function(e) {
                    return {
                        type: r.ExpressionStatement,
                        expression: e
                    }
                },
                createForStatement: function(e, t, n, i) {
                    return {
                        type: r.ForStatement,
                        init: e,
                        test: t,
                        update: n,
                        body: i
                    }
                },
                createForInStatement: function(e, t, n) {
                    return {
                        type: r.ForInStatement,
                        left: e,
                        right: t,
                        body: n,
                        each: !1
                    }
                },
                createFunctionDeclaration: function(e, t, n, i) {
                    return {
                        type: r.FunctionDeclaration,
                        id: e,
                        params: t,
                        defaults: n,
                        body: i,
                        rest: null ,
                        generator: !1,
                        expression: !1
                    }
                },
                createFunctionExpression: function(e, t, n, i) {
                    return {
                        type: r.FunctionExpression,
                        id: e,
                        params: t,
                        defaults: n,
                        body: i,
                        rest: null ,
                        generator: !1,
                        expression: !1
                    }
                },
                createIdentifier: function(e) {
                    return {
                        type: r.Identifier,
                        name: e
                    }
                },
                createIfStatement: function(e, t, n) {
                    return {
                        type: r.IfStatement,
                        test: e,
                        consequent: t,
                        alternate: n
                    }
                },
                createLabeledStatement: function(e, t) {
                    return {
                        type: r.LabeledStatement,
                        label: e,
                        body: t
                    }
                },
                createLiteral: function(e) {
                    return {
                        type: r.Literal,
                        value: e.value,
                        raw: b(e.range[0], e.range[1])
                    }
                },
                createLogicalExpression: function(e, t, n) {
                    return {
                        type: r.LogicalExpression,
                        operator: e,
                        left: t,
                        right: n
                    }
                },
                createMemberExpression: function(e, t, n) {
                    return {
                        type: r.MemberExpression,
                        computed: e === "[",
                        object: t,
                        property: n
                    }
                },
                createNewExpression: function(e, t) {
                    return {
                        type: r.NewExpression,
                        callee: e,
                        arguments: t
                    }
                },
                createObjectExpression: function(e) {
                    return {
                        type: r.ObjectExpression,
                        properties: e
                    }
                },
                createPostfixExpression: function(e, t) {
                    return {
                        type: r.UpdateExpression,
                        operator: e,
                        argument: t,
                        prefix: !1
                    }
                },
                createProgram: function(e) {
                    return {
                        type: r.Program,
                        body: e
                    }
                },
                createProperty: function(e, t, n) {
                    return {
                        type: r.Property,
                        key: t,
                        value: n,
                        kind: e
                    }
                },
                createReturnStatement: function(e) {
                    return {
                        type: r.ReturnStatement,
                        argument: e
                    }
                },
                createSequenceExpression: function(e) {
                    return {
                        type: r.SequenceExpression,
                        expressions: e
                    }
                },
                createSwitchCase: function(e, t) {
                    return {
                        type: r.SwitchCase,
                        test: e,
                        consequent: t
                    }
                },
                createSwitchStatement: function(e, t) {
                    return {
                        type: r.SwitchStatement,
                        discriminant: e,
                        cases: t
                    }
                },
                createThisExpression: function() {
                    return {
                        type: r.ThisExpression
                    }
                },
                createThrowStatement: function(e) {
                    return {
                        type: r.ThrowStatement,
                        argument: e
                    }
                },
                createTryStatement: function(e, t, n, i) {
                    return {
                        type: r.TryStatement,
                        block: e,
                        guardedHandlers: t,
                        handlers: n,
                        finalizer: i
                    }
                },
                createUnaryExpression: function(e, t) {
                    return e === "++" || e === "--" ? {
                        type: r.UpdateExpression,
                        operator: e,
                        argument: t,
                        prefix: !0
                    } : {
                        type: r.UnaryExpression,
                        operator: e,
                        argument: t
                    }
                },
                createVariableDeclaration: function(e, t) {
                    return {
                        type: r.VariableDeclaration,
                        declarations: e,
                        kind: t
                    }
                },
                createVariableDeclarator: function(e, t) {
                    return {
                        type: r.VariableDeclarator,
                        id: e,
                        init: t
                    }
                },
                createWhileStatement: function(e, t) {
                    return {
                        type: r.WhileStatement,
                        test: e,
                        body: t
                    }
                },
                createWithStatement: function(e, t) {
                    return {
                        type: r.WithStatement,
                        object: e,
                        body: t
                    }
                }
            },
            e.version = "1.1.0-dev",
            e.parse = yn,
            e.Syntax = function() {
                var e, t = {};
                typeof Object.create == "function" && (t = Object.create(null ));
                for (e in r)
                    r.hasOwnProperty(e) && (t[e] = r[e]);
                return typeof Object.freeze == "function" && Object.freeze(t),
                    t
            }()
    }(typeof exports == "undefined" ? esprima = {} : exports);
var parse = (typeof exports == "undefined" ? esprima : require("./esprima")).parse;
(typeof exports == "undefined" ? window : exports).falafel = function(e, t, n, r) {
    typeof t == "function" && (n = t,
        t = {}),
    typeof e == "object" && (t = e,
        e = t.source,
        delete t.source),
        e = e || t.source,
        t.range = !0,
    typeof e != "string" && (e = String(e));
    var i = parse(e, t)
        , s = {
        chunks: e.split(""),
        toString: function() {
            return s.chunks.join("")
        },
        inspect: function() {
            return s.toString()
        }
    }
        , o = 0;
    return function u(e, t) {
        insertHelpers(e, t, s.chunks),
            Object.keys(e).forEach(function(t) {
                if (t === "parent")
                    return;
                var n = e[t];
                Array.isArray(n) ? n.forEach(function(t) {
                    t && typeof t.type == "string" && u(t, e)
                }) : n && typeof n.type == "string" && (insertHelpers(n, e, s.chunks),
                    u(n, e))
            }),
            n(e, r)
    }(i, undefined),
        s
}
;
var inBrowser = typeof window != "undefined" && this === window
    , parseAndModify = inBrowser ? window.falafel : require("./lib/falafel").falafel;
(inBrowser ? window : exports).blanket = function() {
    var e = ["ExpressionStatement", "BreakStatement", "ContinueStatement", "VariableDeclaration", "ReturnStatement", "ThrowStatement", "TryStatement", "FunctionDeclaration", "IfStatement", "WhileStatement", "DoWhileStatement", "ForStatement", "ForInStatement", "SwitchStatement", "WithStatement"], t = ["IfStatement", "WhileStatement", "DoWhileStatement", "ForStatement", "ForInStatement", "WithStatement"], n = inBrowser ? "window._$blanket" : "_$jscoverage", r, i = Math.floor(Math.random() * 1e3), s = {}, o = {
        reporter: null ,
        adapter: null ,
        filter: null ,
        orderedLoading: !0,
        loader: null ,
        ignoreScriptError: !1,
        existingRequireJS: !1,
        autoStart: !1,
        timeout: 180,
        ignoreCors: !1,
        branchTracking: !1,
        sourceURL: !1,
        debug: !1
    };
    return inBrowser && typeof window.blanket != "undefined" && (r = window.blanket.noConflict()),
        _blanket = {
            noConflict: function() {
                return r ? r : _blanket
            },
            _getCopyNumber: function() {
                return i
            },
            extend: function(e) {
                _blanket._extend(_blanket, e)
            },
            _extend: function(e, t) {
                if (t)
                    for (var n in t)
                        e[n]instanceof Object && typeof e[n] != "function" ? _blanket._extend(e[n], t[n]) : e[n] = t[n]
            },
            options: function(e, t) {
                if (typeof e != "string")
                    _blanket._extend(o, e);
                else {
                    if (typeof t == "undefined")
                        return o[e];
                    o[e] = t
                }
            },
            instrument: function(e, t) {
                var n = e.inputFile
                    , r = e.inputFileName
                    , i = _blanket._prepareSource(n);
                _blanket._trackingArraySetup = [];
                var s = parseAndModify(n, {
                    loc: !0,
                    comment: !0
                }, _blanket._addTracking, r);
                s = _blanket._trackingSetup(r, i) + s,
                _blanket.options("sourceURL") && (s += "\n//@ sourceURL=" + r.replace("http://", "")),
                _blanket.options("debug") && console.log("BLANKET-Instrumented file: " + r),
                    t(s)
            },
            _trackingArraySetup: [],
            _branchingArraySetup: [],
            _prepareSource: function(e) {
                return e.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/(\r\n|\n|\r)/gm, "\n").split("\n")
            },
            _trackingSetup: function(e, t) {
                var r = _blanket.options("branchTracking")
                    , i = t.join("',\n'")
                    , s = "";
                return s += "if (typeof " + n + " === 'undefined') " + n + " = {};\n",
                r && (s += "var _$branchFcn=function(f,l,c,r){ ",
                    s += n + "[f].branchData[l][c].push(r);",
                    s += "return r;};\n"),
                    s += "if (typeof " + n + "['" + e + "'] === 'undefined'){",
                    s += n + "['" + e + "']=[];\n",
                r && (s += n + "['" + e + "'].branchData=[];\n"),
                    s += n + "['" + e + "'].source=['" + i + "'];\n",
                    _blanket._trackingArraySetup.sort(function(e, t) {
                        return parseInt(e, 10) > parseInt(t, 10)
                    }).forEach(function(t) {
                        s += n + "['" + e + "'][" + t + "]=0;\n"
                    }),
                r && _blanket._branchingArraySetup.sort(function(e, t) {
                    return e.line > t.line
                }).sort(function(e, t) {
                    return e.column > t.column
                }).forEach(function(t) {
                    t.file === e && (s += "if (typeof " + n + "['" + e + "'].branchData[" + t.line + "] === 'undefined'){\n",
                        s += n + "['" + e + "'].branchData[" + t.line + "]=[];\n",
                        s += "}",
                        s += n + "['" + e + "'].branchData[" + t.line + "][" + t.column + "] = [];\n",
                        s += n + "['" + e + "'].branchData[" + t.line + "][" + t.column + "].consequent = " + JSON.stringify(t.consequent) + ";\n",
                        s += n + "['" + e + "'].branchData[" + t.line + "][" + t.column + "].alternate = " + JSON.stringify(t.alternate) + ";\n")
                }),
                    s += "}",
                    s
            },
            _blockifyIf: function(e) {
                if (t.indexOf(e.type) > -1) {
                    var n = e.consequent || e.body
                        , r = e.alternate;
                    r && r.type !== "BlockStatement" && r.update("{\n" + r.source() + "}\n"),
                    n && n.type !== "BlockStatement" && n.update("{\n" + n.source() + "}\n")
                }
            },
            _trackBranch: function(e, t) {
                var n = e.loc.start.line
                    , r = e.loc.start.column;
                _blanket._branchingArraySetup.push({
                    line: n,
                    column: r,
                    file: t,
                    consequent: e.consequent.loc,
                    alternate: e.alternate.loc
                });
                var i = e.source()
                    , s = "_$branchFcn('" + t + "'," + n + "," + r + "," + i.slice(0, i.indexOf("?")) + ")" + i.slice(i.indexOf("?"));
                e.update(s)
            },
            _addTracking: function(t, r) {
                _blanket._blockifyIf(t);
                if (e.indexOf(t.type) > -1 && t.parent.type !== "LabeledStatement") {
                    if (t.type === "VariableDeclaration" && (t.parent.type === "ForStatement" || t.parent.type === "ForInStatement"))
                        return;
                    if (!t.loc || !t.loc.start)
                        throw new Error("The instrumenter encountered a node with no location: " + Object.keys(t));
                    t.update(n + "['" + r + "'][" + t.loc.start.line + "]++;\n" + t.source()),
                        _blanket._trackingArraySetup.push(t.loc.start.line)
                } else
                    _blanket.options("branchTracking") && t.type === "ConditionalExpression" && _blanket._trackBranch(t, r)
            },
            setupCoverage: function() {
                s.instrumentation = "blanket",
                    s.stats = {
                        suites: 0,
                        tests: 0,
                        passes: 0,
                        pending: 0,
                        failures: 0,
                        start: new Date
                    }
            },
            _checkIfSetup: function() {
                if (!s.stats)
                    throw new Error("You must call blanket.setupCoverage() first.")
            },
            onTestStart: function() {
                _blanket.options("debug") && console.log("BLANKET-Test event started"),
                    this._checkIfSetup(),
                    s.stats.tests++,
                    s.stats.pending++
            },
            onTestDone: function(e, t) {
                this._checkIfSetup(),
                    t === e ? s.stats.passes++ : s.stats.failures++,
                    s.stats.pending--
            },
            onModuleStart: function() {
                this._checkIfSetup(),
                    s.stats.suites++
            },
            onTestsDone: function() {
                _blanket.options("debug") && console.log("BLANKET-Test event done"),
                    this._checkIfSetup(),
                    s.stats.end = new Date,
                    inBrowser ? this.report(s) : (delete _$jscoverage.branchFcn,
                        this.options("reporter").call(this, s))
            }
        },
        _blanket
}(),
    function(e) {
        var t = e.options;
        e.extend({
            outstandingRequireFiles: [],
            options: function(n, r) {
                var i = {};
                if (typeof n != "string")
                    t(n),
                        i = n;
                else {
                    if (typeof r == "undefined")
                        return t(n);
                    t(n, r),
                        i[n] = r
                }
                i.adapter && e._loadFile(i.adapter),
                i.loader && e._loadFile(i.loader)
            },
            requiringFile: function(t, n) {
                typeof t == "undefined" ? e.outstandingRequireFiles = [] : typeof n == "undefined" ? e.outstandingRequireFiles.push(t) : e.outstandingRequireFiles.splice(e.outstandingRequireFiles.indexOf(t), 1)
            },
            requireFilesLoaded: function() {
                return e.outstandingRequireFiles.length === 0
            },
            showManualLoader: function() {
                if (document.getElementById("blanketLoaderDialog"))
                    return;
                var e = "<div class='blanketDialogOverlay'>";
                e += "&nbsp;</div>",
                    e += "<div class='blanketDialogVerticalOffset'>",
                    e += "<div class='blanketDialogBox'>",
                    e += "<b>Error:</b> Blanket.js encountered a cross origin request error while instrumenting the source files.  ",
                    e += "<br><br>This is likely caused by the source files being referenced locally (using the file:// protocol). ",
                    e += "<br><br>Some solutions include <a href='http://askubuntu.com/questions/160245/making-google-chrome-option-allow-file-access-from-files-permanent' target='_blank'>starting Chrome with special flags</a>, <a target='_blank' href='https://github.com/remy/servedir'>running a server locally</a>, or using a browser without these CORS restrictions (Safari).",
                    e += "<br>",
                typeof FileReader != "undefined" && (e += "<br>Or, try the experimental loader.  When prompted, simply click on the directory containing all the source files you want covered.",
                    e += "<a href='javascript:document.getElementById(\"fileInput\").click();'>Start Loader</a>",
                    e += "<input type='file' type='application/x-javascript' accept='application/x-javascript' webkitdirectory id='fileInput' multiple onchange='window.blanket.manualFileLoader(this.files)' style='visibility:hidden;position:absolute;top:-50;left:-50'/>"),
                    e += "<br><span style='float:right;cursor:pointer;'  onclick=document.getElementById('blanketLoaderDialog').style.display='none';>Close</span>",
                    e += "<div style='clear:both'></div>",
                    e += "</div></div>";
                var t = ".blanketDialogWrapper {";
                t += "display:block;",
                    t += "position:fixed;",
                    t += "z-index:40001; }",
                    t += ".blanketDialogOverlay {",
                    t += "position:fixed;",
                    t += "width:100%;",
                    t += "height:100%;",
                    t += "background-color:black;",
                    t += "opacity:.5; ",
                    t += "-ms-filter:'progid:DXImageTransform.Microsoft.Alpha(Opacity=50)'; ",
                    t += "filter:alpha(opacity=50); ",
                    t += "z-index:40001; }",
                    t += ".blanketDialogVerticalOffset { ",
                    t += "position:fixed;",
                    t += "top:30%;",
                    t += "width:100%;",
                    t += "z-index:40002; }",
                    t += ".blanketDialogBox { ",
                    t += "width:405px; ",
                    t += "position:relative;",
                    t += "margin:0 auto;",
                    t += "background-color:white;",
                    t += "padding:10px;",
                    t += "border:1px solid black; }";
                var n = document.createElement("style");
                n.innerHTML = t,
                    document.head.appendChild(n);
                var r = document.createElement("div");
                r.id = "blanketLoaderDialog",
                    r.className = "blanketDialogWrapper",
                    r.innerHTML = e,
                    document.body.insertBefore(r, document.body.firstChild)
            },
            manualFileLoader: function(e) {
                function o(e) {
                    var t = new FileReader;
                    t.onload = s,
                        t.readAsText(e)
                }
                var t = Array.prototype.slice;
                e = t.call(e).filter(function(e) {
                    return e.type !== ""
                });
                var n = e.length - 1
                    , r = 0
                    , i = {};
                sessionStorage.blanketSessionLoader && (i = JSON.parse(sessionStorage.blanketSessionLoader));
                var s = function(t) {
                    var s = t.currentTarget.result
                        , u = e[r]
                        , a = u.webkitRelativePath && u.webkitRelativePath !== "" ? u.webkitRelativePath : u.name;
                    i[a] = s,
                        r++,
                        r === n ? (sessionStorage.setItem("blanketSessionLoader", JSON.stringify(i)),
                            document.location.reload()) : o(e[r])
                };
                o(e[r])
            },
            _loadFile: function(e) {
                if (typeof e != "undefined") {
                    var t = new XMLHttpRequest;
                    t.open("GET", e, !1),
                        t.send();
                    var n = document.createElement("script");
                    n.type = "text/javascript",
                        n.text = t.responseText,
                        (document.body || document.getElementsByTagName("head")[0]).appendChild(n)
                }
            },
            hasAdapter: function(t) {
                return e.options("adapter") !== null
            },
            report: function(t) {
                document.getElementById("blanketLoaderDialog") || (e.blanketSession = null ),
                    t.files = window._$blanket,
                typeof t.files.branchFcn != "undefined" && delete t.files.branchFcn;
                if (e.options("reporter"))
                    require([e.options("reporter").replace(".js", "")], function(e) {
                        e(t)
                    });
                else {
                    if (typeof e.defaultReporter != "function")
                        throw new Error("no reporter defined.");
                    e.defaultReporter(t)
                }
            },
            _bindStartTestRunner: function(e, t) {
                e ? e(t) : window.addEventListener("load", t, !1)
            },
            _loadSourceFiles: function(t) {
                function n(e) {
                    var t = Object.create(Object.getPrototypeOf(e))
                        , n = Object.getOwnPropertyNames(e);
                    return n.forEach(function(n) {
                        var r = Object.getOwnPropertyDescriptor(e, n);
                        Object.defineProperty(t, n, r)
                    }),
                        t
                }
                e.options("debug") && console.log("BLANKET-Collecting page scripts");
                var r = e.utils.collectPageScripts();
                if (r.length === 0)
                    t();
                else {
                    sessionStorage.blanketSessionLoader && (e.blanketSession = JSON.parse(sessionStorage.blanketSessionLoader));
                    var i = {
                        paths: {},
                        shim: {},
                        waitSeconds: e.options("timeout")
                    }
                        , s = {
                        deps: []
                    }
                        , o = e.options("orderedLoading")
                        , u = [];
                    r.forEach(function(e, t) {
                        var r = "blanket_" + t;
                        u.push(r),
                            i.paths[r] = e,
                        o && (t > 0 && (i.shim[r] = n(s)),
                            s.deps = [r])
                    }),
                        require.config(i);
                    var a = u;
                    require(a, function() {
                        t()
                    })
                }
            },
            beforeStartTestRunner: function(t) {
                t = t || {},
                    t.checkRequirejs = typeof t.checkRequirejs == "undefined" ? !0 : t.checkRequirejs,
                    t.callback = t.callback || function() {}
                    ,
                    t.coverage = typeof t.coverage == "undefined" ? !0 : t.coverage,
                    t.coverage ? e._bindStartTestRunner(t.bindEvent, function() {
                        e._loadSourceFiles(function() {
                            var n = function() {
                                return t.condition ? t.condition() : e.requireFilesLoaded()
                            }
                                , r = function() {
                                n() ? (e.options("debug") && console.log("BLANKET-All files loaded, init start test runner callback."),
                                    t.callback()) : setTimeout(r, 13)
                            };
                            r()
                        })
                    }) : t.callback()
            },
            utils: {
                qualifyURL: function(e) {
                    var t = document.createElement("a");
                    return t.href = e,
                        t.href
                }
            }
        })
    }(blanket);
if (typeof requirejs != "undefined")
    blanket.options("existingRequireJS", !0);
else {
    typeof window["define"] != "undefined" && (window.__blanket_old_define = window.define,
        window.define = void 0);
    var requirejs, require, define;
    (function(W) {
        function D(e) {
            return M.call(e) === "[object Function]"
        }
        function E(e) {
            return M.call(e) === "[object Array]"
        }
        function t(e, t) {
            if (e) {
                var n;
                for (n = 0; n < e.length; n += 1)
                    if (e[n] && t(e[n], n, e))
                        break
            }
        }
        function N(e, t) {
            if (e) {
                var n;
                for (n = e.length - 1; n > -1; n -= 1)
                    if (e[n] && t(e[n], n, e))
                        break
            }
        }
        function A(e, t) {
            for (var n in e)
                if (e.hasOwnProperty(n) && t(e[n], n))
                    break
        }
        function O(e, t, n, r) {
            return t && A(t, function(t, i) {
                if (n || !F.call(e, i))
                    r && typeof t != "string" ? (e[i] || (e[i] = {}),
                        O(e[i], t, n, r)) : e[i] = t
            }),
                e
        }
        function r(e, t) {
            return function() {
                return t.apply(e, arguments)
            }
        }
        function X(e) {
            if (!e)
                return e;
            var n = W;
            return t(e.split("."), function(e) {
                n = n[e]
            }),
                n
        }
        function G(e, t, n, r) {
            return t = Error(t + "\nhttp://requirejs.org/docs/errors.html#" + e),
                t.requireType = e,
                t.requireModules = r,
            n && (t.originalError = n),
                t
        }
        function ba() {
            return H && H.readyState === "interactive" ? H : (N(document.getElementsByTagName("script"), function(e) {
                if (e.readyState === "interactive")
                    return H = e
            }),
                H)
        }
        var g, s, u, y, q, B, H, I, Y, Z, ca = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg, da = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g, $ = /\.js$/, ea = /^\.\//;
        s = Object.prototype;
        var M = s.toString
            , F = s.hasOwnProperty
            , fa = Array.prototype.splice
            , v = typeof window != "undefined" && !!navigator && !!document
            , aa = !v && typeof importScripts != "undefined"
            , ga = v && navigator.platform === "PLAYSTATION 3" ? /^complete$/ : /^(complete|loaded)$/
            , R = typeof opera != "undefined" && opera.toString() === "[object Opera]"
            , w = {}
            , n = {}
            , P = []
            , J = !1;
        if (typeof define == "undefined") {
            if (typeof requirejs != "undefined") {
                if (D(requirejs))
                    return;
                n = requirejs,
                    requirejs = void 0
            }
            typeof require != "undefined" && !D(require) && (n = require,
                require = void 0),
                g = requirejs = function(e, t, n, r) {
                    var i, s = "_";
                    return !E(e) && typeof e != "string" && (i = e,
                        E(t) ? (e = t,
                            t = n,
                            n = r) : e = []),
                    i && i.context && (s = i.context),
                    (r = w[s]) || (r = w[s] = g.s.newContext(s)),
                    i && r.configure(i),
                        r.require(e, t, n)
                }
                ,
                g.config = function(e) {
                    return g(e)
                }
                ,
                g.nextTick = typeof setTimeout != "undefined" ? function(e) {
                    setTimeout(e, 4)
                }
                    : function(e) {
                    e()
                }
                ,
            require || (require = g),
                g.version = "2.1.1",
                g.jsExtRegExp = /^\/|:|\?|\.js$/,
                g.isBrowser = v,
                s = g.s = {
                    contexts: w,
                    newContext: function(e) {
                        function n(e, t, n) {
                            var r, i, s, o, u, a, f, l = t && t.split("/");
                            r = l;
                            var c = N.map
                                , h = c && c["*"];
                            if (e && e.charAt(0) === ".")
                                if (t) {
                                    r = N.pkgs[t] ? l = [t] : l.slice(0, l.length - 1),
                                        t = e = r.concat(e.split("/"));
                                    for (r = 0; t[r]; r += 1)
                                        if (i = t[r],
                                            i === ".")
                                            t.splice(r, 1),
                                                r -= 1;
                                        else if (i === "..") {
                                            if (r === 1 && (t[2] === ".." || t[0] === ".."))
                                                break;
                                            r > 0 && (t.splice(r - 1, 2),
                                                r -= 2)
                                        }
                                    r = N.pkgs[t = e[0]],
                                        e = e.join("/"),
                                    r && e === t + "/" + r.main && (e = t)
                                } else
                                    e.indexOf("./") === 0 && (e = e.substring(2));
                            if (n && (l || h) && c) {
                                t = e.split("/");
                                for (r = t.length; r > 0; r -= 1) {
                                    s = t.slice(0, r).join("/");
                                    if (l)
                                        for (i = l.length; i > 0; i -= 1)
                                            if (n = c[l.slice(0, i).join("/")])
                                                if (n = n[s]) {
                                                    o = n,
                                                        u = r;
                                                    break
                                                }
                                    if (o)
                                        break;
                                    !a && h && h[s] && (a = h[s],
                                        f = r)
                                }
                                !o && a && (o = a,
                                    u = f),
                                o && (t.splice(0, u, o),
                                    e = t.join("/"))
                            }
                            return e
                        }
                        function i(e) {
                            v && t(document.getElementsByTagName("script"), function(t) {
                                if (t.getAttribute("data-requiremodule") === e && t.getAttribute("data-requirecontext") === S.contextName)
                                    return t.parentNode.removeChild(t),
                                        !0
                            })
                        }
                        function s(e) {
                            var t = N.paths[e];
                            if (t && E(t) && t.length > 1)
                                return i(e),
                                    t.shift(),
                                    S.require.undef(e),
                                    S.require([e]),
                                    !0
                        }
                        function o(e) {
                            var t, n = e ? e.indexOf("!") : -1;
                            return n > -1 && (t = e.substring(0, n),
                                e = e.substring(n + 1, e.length)),
                                [t, e]
                        }
                        function u(e, t, r, i) {
                            var s, u, a = null , f = t ? t.name : null , l = e, c = !0, h = "";
                            return e || (c = !1,
                                e = "_@r" + (B += 1)),
                                e = o(e),
                                a = e[0],
                                e = e[1],
                            a && (a = n(a, f, i),
                                u = M[a]),
                            e && (a ? h = u && u.normalize ? u.normalize(e, function(e) {
                                return n(e, f, i)
                            }) : n(e, f, i) : (h = n(e, f, i),
                                e = o(h),
                                a = e[0],
                                h = e[1],
                                r = !0,
                                s = S.nameToUrl(h))),
                                r = a && !u && !r ? "_unnormalized" + (j += 1) : "",
                            {
                                prefix: a,
                                name: h,
                                parentMap: t,
                                unnormalized: !!r,
                                url: s,
                                originalName: l,
                                isDefine: c,
                                id: (a ? a + "!" + h : h) + r
                            }
                        }
                        function a(e) {
                            var t = e.id
                                , n = C[t];
                            return n || (n = C[t] = new S.Module(e)),
                                n
                        }
                        function f(e, t, n) {
                            var r = e.id
                                , i = C[r];
                            F.call(M, r) && (!i || i.defineEmitComplete) ? t === "defined" && n(M[r]) : a(e).on(t, n)
                        }
                        function l(e, n) {
                            var r = e.requireModules
                                , i = !1;
                            n ? n(e) : (t(r, function(t) {
                                if (t = C[t])
                                    t.error = e,
                                    t.events.error && (i = !0,
                                        t.emit("error", e))
                            }),
                                !i) && g.onError(e)
                        }
                        function c() {
                            P.length && (fa.apply(L, [L.length - 1, 0].concat(P)),
                                P = [])
                        }
                        function h(e, n, r) {
                            var i = e.map.id;
                            e.error ? e.emit("error", e.error) : (n[i] = !0,
                                t(e.depMaps, function(t, i) {
                                    var s = t.id
                                        , o = C[s];
                                    o && !e.depMatched[i] && !r[s] && (n[s] ? (e.defineDep(i, M[s]),
                                        e.check()) : h(o, n, r))
                                }),
                                r[i] = !0)
                        }
                        function p() {
                            var e, n, r, o, u = (r = N.waitSeconds * 1e3) && S.startTime + r < (new Date).getTime(), a = [], f = [], c = !1, d = !0;
                            if (!b) {
                                b = !0,
                                    A(C, function(t) {
                                        e = t.map,
                                            n = e.id;
                                        if (t.enabled && (e.isDefine || f.push(t),
                                                !t.error))
                                            if (!t.inited && u)
                                                s(n) ? c = o = !0 : (a.push(n),
                                                    i(n));
                                            else if (!t.inited && t.fetched && e.isDefine && (c = !0,
                                                    !e.prefix))
                                                return d = !1
                                    });
                                if (u && a.length)
                                    return r = G("timeout", "Load timeout for modules: " + a, null , a),
                                        r.contextName = S.contextName,
                                        l(r);
                                d && t(f, function(e) {
                                    h(e, {}, {})
                                }),
                                (!u || o) && c && (v || aa) && !T && (T = setTimeout(function() {
                                    T = 0,
                                        p()
                                }, 50)),
                                    b = !1
                            }
                        }
                        function d(e) {
                            a(u(e[0], null , !0)).init(e[1], e[2])
                        }
                        function m(e) {
                            var e = e.currentTarget || e.srcElement
                                , t = S.onScriptLoad;
                            return e.detachEvent && !R ? e.detachEvent("onreadystatechange", t) : e.removeEventListener("load", t, !1),
                                t = S.onScriptError,
                            e.detachEvent && !R || e.removeEventListener("error", t, !1),
                            {
                                node: e,
                                id: e && e.getAttribute("data-requiremodule")
                            }
                        }
                        function y() {
                            var e;
                            for (c(); L.length; ) {
                                if (e = L.shift(),
                                    e[0] === null )
                                    return l(G("mismatch", "Mismatched anonymous define() module: " + e[e.length - 1]));
                                d(e)
                            }
                        }
                        var b, w, S, x, T, N = {
                            waitSeconds: 7,
                            baseUrl: "./",
                            paths: {},
                            pkgs: {},
                            shim: {},
                            map: {},
                            config: {}
                        }, C = {}, k = {}, L = [], M = {}, _ = {}, B = 1, j = 1;
                        return x = {
                            require: function(e) {
                                return e.require ? e.require : e.require = S.makeRequire(e.map)
                            },
                            exports: function(e) {
                                e.usingExports = !0;
                                if (e.map.isDefine)
                                    return e.exports ? e.exports : e.exports = M[e.map.id] = {}
                            },
                            module: function(e) {
                                return e.module ? e.module : e.module = {
                                    id: e.map.id,
                                    uri: e.map.url,
                                    config: function() {
                                        return N.config && N.config[e.map.id] || {}
                                    },
                                    exports: M[e.map.id]
                                }
                            }
                        },
                            w = function(e) {
                                this.events = k[e.id] || {},
                                    this.map = e,
                                    this.shim = N.shim[e.id],
                                    this.depExports = [],
                                    this.depMaps = [],
                                    this.depMatched = [],
                                    this.pluginMaps = {},
                                    this.depCount = 0
                            }
                            ,
                            w.prototype = {
                                init: function(e, t, n, i) {
                                    i = i || {},
                                    this.inited || (this.factory = t,
                                        n ? this.on("error", n) : this.events.error && (n = r(this, function(e) {
                                            this.emit("error", e)
                                        })),
                                        this.depMaps = e && e.slice(0),
                                        this.errback = n,
                                        this.inited = !0,
                                        this.ignore = i.ignore,
                                        i.enabled || this.enabled ? this.enable() : this.check())
                                },
                                defineDep: function(e, t) {
                                    this.depMatched[e] || (this.depMatched[e] = !0,
                                        this.depCount -= 1,
                                        this.depExports[e] = t)
                                },
                                fetch: function() {
                                    if (!this.fetched) {
                                        this.fetched = !0,
                                            S.startTime = (new Date).getTime();
                                        var e = this.map;
                                        if (!this.shim)
                                            return e.prefix ? this.callPlugin() : this.load();
                                        S.makeRequire(this.map, {
                                            enableBuildCallback: !0
                                        })(this.shim.deps || [], r(this, function() {
                                            return e.prefix ? this.callPlugin() : this.load()
                                        }))
                                    }
                                },
                                load: function() {
                                    var e = this.map.url;
                                    _[e] || (_[e] = !0,
                                        S.load(this.map.id, e))
                                },
                                check: function() {
                                    if (this.enabled && !this.enabling) {
                                        var e, t, n = this.map.id;
                                        t = this.depExports;
                                        var r = this.exports
                                            , i = this.factory;
                                        if (this.inited) {
                                            if (this.error)
                                                this.emit("error", this.error);
                                            else if (!this.defining) {
                                                this.defining = !0;
                                                if (this.depCount < 1 && !this.defined) {
                                                    if (D(i)) {
                                                        if (this.events.error)
                                                            try {
                                                                r = S.execCb(n, i, t, r)
                                                            } catch (s) {
                                                                e = s
                                                            }
                                                        else
                                                            r = S.execCb(n, i, t, r);
                                                        this.map.isDefine && ((t = this.module) && t.exports !== void 0 && t.exports !== this.exports ? r = t.exports : r === void 0 && this.usingExports && (r = this.exports));
                                                        if (e)
                                                            return e.requireMap = this.map,
                                                                e.requireModules = [this.map.id],
                                                                e.requireType = "define",
                                                                l(this.error = e)
                                                    } else
                                                        r = i;
                                                    this.exports = r,
                                                    this.map.isDefine && !this.ignore && (M[n] = r,
                                                        g.onResourceLoad) && g.onResourceLoad(S, this.map, this.depMaps),
                                                        delete C[n],
                                                        this.defined = !0
                                                }
                                                this.defining = !1,
                                                this.defined && !this.defineEmitted && (this.defineEmitted = !0,
                                                    this.emit("defined", this.exports),
                                                    this.defineEmitComplete = !0)
                                            }
                                        } else
                                            this.fetch()
                                    }
                                },
                                callPlugin: function() {
                                    var e = this.map
                                        , t = e.id
                                        , i = u(e.prefix);
                                    this.depMaps.push(i),
                                        f(i, "defined", r(this, function(i) {
                                            var s, o;
                                            o = this.map.name;
                                            var c = this.map.parentMap ? this.map.parentMap.name : null
                                                , h = S.makeRequire(e.parentMap, {
                                                enableBuildCallback: !0,
                                                skipMap: !0
                                            });
                                            if (this.map.unnormalized) {
                                                if (i.normalize && (o = i.normalize(o, function(e) {
                                                            return n(e, c, !0)
                                                        }) || ""),
                                                        i = u(e.prefix + "!" + o, this.map.parentMap),
                                                        f(i, "defined", r(this, function(e) {
                                                            this.init([], function() {
                                                                return e
                                                            }, null , {
                                                                enabled: !0,
                                                                ignore: !0
                                                            })
                                                        })),
                                                        o = C[i.id])
                                                    this.depMaps.push(i),
                                                    this.events.error && o.on("error", r(this, function(e) {
                                                        this.emit("error", e)
                                                    })),
                                                        o.enable()
                                            } else
                                                s = r(this, function(e) {
                                                    this.init([], function() {
                                                        return e
                                                    }, null , {
                                                        enabled: !0
                                                    })
                                                }),
                                                    s.error = r(this, function(e) {
                                                        this.inited = !0,
                                                            this.error = e,
                                                            e.requireModules = [t],
                                                            A(C, function(e) {
                                                                e.map.id.indexOf(t + "_unnormalized") === 0 && delete C[e.map.id]
                                                            }),
                                                            l(e)
                                                    }),
                                                    s.fromText = r(this, function(t, n) {
                                                        var r = e.name
                                                            , i = u(r)
                                                            , o = J;
                                                        n && (t = n),
                                                        o && (J = !1),
                                                            a(i);
                                                        try {
                                                            g.exec(t)
                                                        } catch (f) {
                                                            throw Error("fromText eval for " + r + " failed: " + f)
                                                        }
                                                        o && (J = !0),
                                                            this.depMaps.push(i),
                                                            S.completeLoad(r),
                                                            h([r], s)
                                                    }),
                                                    i.load(e.name, h, s, N)
                                        })),
                                        S.enable(i, this),
                                        this.pluginMaps[i.id] = i
                                },
                                enable: function() {
                                    this.enabling = this.enabled = !0,
                                        t(this.depMaps, r(this, function(e, t) {
                                            var n, i;
                                            if (typeof e == "string") {
                                                e = u(e, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap),
                                                    this.depMaps[t] = e;
                                                if (n = x[e.id]) {
                                                    this.depExports[t] = n(this);
                                                    return
                                                }
                                                this.depCount += 1,
                                                    f(e, "defined", r(this, function(e) {
                                                        this.defineDep(t, e),
                                                            this.check()
                                                    })),
                                                this.errback && f(e, "error", this.errback)
                                            }
                                            n = e.id,
                                                i = C[n],
                                            !x[n] && i && !i.enabled && S.enable(e, this)
                                        })),
                                        A(this.pluginMaps, r(this, function(e) {
                                            var t = C[e.id];
                                            t && !t.enabled && S.enable(e, this)
                                        })),
                                        this.enabling = !1,
                                        this.check()
                                },
                                on: function(e, t) {
                                    var n = this.events[e];
                                    n || (n = this.events[e] = []),
                                        n.push(t)
                                },
                                emit: function(e, n) {
                                    t(this.events[e], function(e) {
                                        e(n)
                                    }),
                                    e === "error" && delete this.events[e]
                                }
                            },
                            S = {
                                config: N,
                                contextName: e,
                                registry: C,
                                defined: M,
                                urlFetched: _,
                                defQueue: L,
                                Module: w,
                                makeModuleMap: u,
                                nextTick: g.nextTick,
                                configure: function(e) {
                                    e.baseUrl && e.baseUrl.charAt(e.baseUrl.length - 1) !== "/" && (e.baseUrl += "/");
                                    var n = N.pkgs
                                        , r = N.shim
                                        , i = {
                                        paths: !0,
                                        config: !0,
                                        map: !0
                                    };
                                    A(e, function(e, t) {
                                        i[t] ? t === "map" ? O(N[t], e, !0, !0) : O(N[t], e, !0) : N[t] = e
                                    }),
                                    e.shim && (A(e.shim, function(e, t) {
                                        E(e) && (e = {
                                            deps: e
                                        }),
                                        e.exports && !e.exportsFn && (e.exportsFn = S.makeShimExports(e)),
                                            r[t] = e
                                    }),
                                        N.shim = r),
                                    e.packages && (t(e.packages, function(e) {
                                        e = typeof e == "string" ? {
                                            name: e
                                        } : e,
                                            n[e.name] = {
                                                name: e.name,
                                                location: e.location || e.name,
                                                main: (e.main || "main").replace(ea, "").replace($, "")
                                            }
                                    }),
                                        N.pkgs = n),
                                        A(C, function(e, t) {
                                            !e.inited && !e.map.unnormalized && (e.map = u(t))
                                        }),
                                    (e.deps || e.callback) && S.require(e.deps || [], e.callback)
                                },
                                makeShimExports: function(e) {
                                    return function() {
                                        var t;
                                        return e.init && (t = e.init.apply(W, arguments)),
                                        t || X(e.exports)
                                    }
                                },
                                makeRequire: function(t, r) {
                                    function i(n, s, o) {
                                        var f, c;
                                        return r.enableBuildCallback && s && D(s) && (s.__requireJsBuild = !0),
                                            typeof n == "string" ? D(s) ? l(G("requireargs", "Invalid require call"), o) : t && x[n] ? x[n](C[t.id]) : g.get ? g.get(S, n, t) : (f = u(n, t, !1, !0),
                                                f = f.id,
                                                F.call(M, f) ? M[f] : l(G("notloaded", 'Module name "' + f + '" has not been loaded yet for context: ' + e + (t ? "" : ". Use require([])")))) : (y(),
                                                S.nextTick(function() {
                                                    y(),
                                                        c = a(u(null , t)),
                                                        c.skipMap = r.skipMap,
                                                        c.init(n, s, o, {
                                                            enabled: !0
                                                        }),
                                                        p()
                                                }),
                                                i)
                                    }
                                    return r = r || {},
                                        O(i, {
                                            isBrowser: v,
                                            toUrl: function(e) {
                                                var r = e.lastIndexOf(".")
                                                    , i = null ;
                                                return r !== -1 && (i = e.substring(r, e.length),
                                                    e = e.substring(0, r)),
                                                    S.nameToUrl(n(e, t && t.id, !0), i)
                                            },
                                            defined: function(e) {
                                                return e = u(e, t, !1, !0).id,
                                                    F.call(M, e)
                                            },
                                            specified: function(e) {
                                                return e = u(e, t, !1, !0).id,
                                                F.call(M, e) || F.call(C, e)
                                            }
                                        }),
                                    t || (i.undef = function(e) {
                                            c();
                                            var n = u(e, t, !0)
                                                , r = C[e];
                                            delete M[e],
                                                delete _[n.url],
                                                delete k[e],
                                            r && (r.events.defined && (k[e] = r.events),
                                                delete C[e])
                                        }
                                    ),
                                        i
                                },
                                enable: function(e) {
                                    C[e.id] && a(e).enable()
                                },
                                completeLoad: function(e) {
                                    var t, n, r = N.shim[e] || {}, i = r.exports;
                                    for (c(); L.length; ) {
                                        n = L.shift();
                                        if (n[0] === null ) {
                                            n[0] = e;
                                            if (t)
                                                break;
                                            t = !0
                                        } else
                                            n[0] === e && (t = !0);
                                        d(n)
                                    }
                                    n = C[e];
                                    if (!t && !M[e] && n && !n.inited) {
                                        if (N.enforceDefine && (!i || !X(i))) {
                                            if (s(e))
                                                return;
                                            return l(G("nodefine", "No define call for " + e, null , [e]))
                                        }
                                        d([e, r.deps || [], r.exportsFn])
                                    }
                                    p()
                                },
                                nameToUrl: function(e, t) {
                                    var n, r, i, s, o, u;
                                    if (g.jsExtRegExp.test(e))
                                        s = e + (t || "");
                                    else {
                                        n = N.paths,
                                            r = N.pkgs,
                                            s = e.split("/");
                                        for (o = s.length; o > 0; o -= 1) {
                                            if (u = s.slice(0, o).join("/"),
                                                    i = r[u],
                                                    u = n[u]) {
                                                E(u) && (u = u[0]),
                                                    s.splice(0, o, u);
                                                break
                                            }
                                            if (i) {
                                                n = e === i.name ? i.location + "/" + i.main : i.location,
                                                    s.splice(0, o, n);
                                                break
                                            }
                                        }
                                        s = s.join("/"),
                                            s += t || (/\?/.test(s) ? "" : ".js"),
                                            s = (s.charAt(0) === "/" || s.match(/^[\w\+\.\-]+:/) ? "" : N.baseUrl) + s
                                    }
                                    return N.urlArgs ? s + ((s.indexOf("?") === -1 ? "?" : "&") + N.urlArgs) : s
                                },
                                load: function(e, t) {
                                    g.load(S, e, t)
                                },
                                execCb: function(e, t, n, r) {
                                    return t.apply(r, n)
                                },
                                onScriptLoad: function(e) {
                                    if (e.type === "load" || ga.test((e.currentTarget || e.srcElement).readyState))
                                        H = null ,
                                            e = m(e),
                                            S.completeLoad(e.id)
                                },
                                onScriptError: function(e) {
                                    var t = m(e);
                                    if (!s(t.id))
                                        return l(G("scripterror", "Script error", e, [t.id]))
                                }
                            },
                            S.require = S.makeRequire(),
                            S
                    }
                },
                g({}),
                t(["toUrl", "undef", "defined", "specified"], function(e) {
                    g[e] = function() {
                        var t = w._;
                        return t.require[e].apply(t, arguments)
                    }
                }),
            v && (u = s.head = document.getElementsByTagName("head")[0],
                y = document.getElementsByTagName("base")[0]) && (u = s.head = y.parentNode),
                g.onError = function(e) {
                    throw e
                }
                ,
                g.load = function(e, t, n) {
                    var r = e && e.config || {}, i;
                    if (v)
                        return i = r.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script"),
                            i.type = r.scriptType || "text/javascript",
                            i.charset = "utf-8",
                            i.async = !0,
                            i.setAttribute("data-requirecontext", e.contextName),
                            i.setAttribute("data-requiremodule", t),
                            i.attachEvent && !(i.attachEvent.toString && i.attachEvent.toString().indexOf("[native code") < 0) && !R ? (J = !0,
                                i.attachEvent("onreadystatechange", e.onScriptLoad)) : (i.addEventListener("load", e.onScriptLoad, !1),
                                i.addEventListener("error", e.onScriptError, !1)),
                            i.src = n,
                            I = i,
                            y ? u.insertBefore(i, y) : u.appendChild(i),
                            I = null ,
                            i;
                    aa && (importScripts(n),
                        e.completeLoad(t))
                }
                ,
            v && N(document.getElementsByTagName("script"), function(e) {
                u || (u = e.parentNode);
                if (q = e.getAttribute("data-main"))
                    return n.baseUrl || (B = q.split("/"),
                        Y = B.pop(),
                        Z = B.length ? B.join("/") + "/" : "./",
                        n.baseUrl = Z,
                        q = Y),
                        q = q.replace($, ""),
                        n.deps = n.deps ? n.deps.concat(q) : [q],
                        !0
            }),
                define = function(e, t, n) {
                    var r, i;
                    typeof e != "string" && (n = t,
                        t = e,
                        e = null ),
                    E(t) || (n = t,
                        t = []),
                    !t.length && D(n) && n.length && (n.toString().replace(ca, "").replace(da, function(e, n) {
                        t.push(n)
                    }),
                        t = (n.length === 1 ? ["require"] : ["require", "exports", "module"]).concat(t)),
                    J && (r = I || ba()) && (e || (e = r.getAttribute("data-requiremodule")),
                        i = w[r.getAttribute("data-requirecontext")]),
                        (i ? i.defQueue : P).push([e, t, n])
                }
                ,
                define.amd = {
                    jQuery: !0
                },
                g.exec = function(b) {
                    return eval(b)
                }
                ,
                g(n)
        }
    })(this)
}
typeof window["__blanket_old_define"] != "undefined" && (window.define = window.__blanket_old_define),
    blanket.defaultReporter = function(e) {
        function l(e) {
            var t = document.getElementById(e);
            t.style.display === "block" ? t.style.display = "none" : t.style.display = "block"
        }
        function d(e) {
            return e.replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/\>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&apos;")
        }
        function v(e, t) {
            return typeof e == "undefined" || typeof e === null ? !1 : e.indexOf(t) > -1
        }
        function g(e, t, n, r, i) {
            var s = ""
                , o = "";
            if (m.length > 0) {
                s += "<span class='" + (v(m[0][1], m[0][1].consequent === m[0][0]) ? "branchOkay" : "branchWarning") + "'>";
                if (m[0][0].end.line === i) {
                    s += d(t.slice(0, m[0][0].end.column)) + "</span>",
                        t = t.slice(m[0][0].end.column),
                        m.shift();
                    if (m.length > 0) {
                        s += "<span class='" + (v(m[0][1], !1) ? "branchOkay" : "branchWarning") + "'>";
                        if (m[0][0].end.line === i) {
                            s += d(t.slice(0, m[0][0].end.column)) + "</span>",
                                t = t.slice(m[0][0].end.column),
                                m.shift();
                            if (!n)
                                return {
                                    src: s + d(t),
                                    cols: n
                                }
                        } else {
                            if (!n)
                                return {
                                    src: s + d(t) + "</span>",
                                    cols: n
                                };
                            o = "</span>"
                        }
                    } else if (!n)
                        return {
                            src: s + d(t),
                            cols: n
                        }
                } else {
                    if (!n)
                        return {
                            src: s + d(t) + "</span>",
                            cols: n
                        };
                    o = "</span>"
                }
            }
            var u = n[e]
                , a = u.consequent;
            if (a.start.line > i)
                m.unshift([u.alternate, u]),
                    m.unshift([a, u]),
                    t = d(t);
            else {
                var f = "<span class='" + (v(u, !0) ? "branchOkay" : "branchWarning") + "'>";
                s += d(t.slice(0, a.start.column - r)) + f;
                if (n.length > e + 1 && n[e + 1].consequent.start.line === i && n[e + 1].consequent.start.column - r < n[e].consequent.end.column - r) {
                    var l = g(e + 1, t.slice(a.start.column - r, a.end.column - r), n, a.start.column - r, i);
                    s += l.src,
                        n = l.cols,
                        n[e + 1] = n[e + 2],
                        n.length--
                } else
                    s += d(t.slice(a.start.column - r, a.end.column - r));
                s += "</span>";
                var c = u.alternate;
                if (c.start.line > i)
                    s += d(t.slice(a.end.column - r)),
                        m.unshift([c, u]);
                else {
                    s += d(t.slice(a.end.column - r, c.start.column - r)),
                        f = "<span class='" + (v(u, !1) ? "branchOkay" : "branchWarning") + "'>",
                        s += f;
                    if (n.length > e + 1 && n[e + 1].consequent.start.line === i && n[e + 1].consequent.start.column - r < n[e].alternate.end.column - r) {
                        var h = g(e + 1, t.slice(c.start.column - r, c.end.column - r), n, c.start.column - r, i);
                        s += h.src,
                            n = h.cols,
                            n[e + 1] = n[e + 2],
                            n.length--
                    } else
                        s += d(t.slice(c.start.column - r, c.end.column - r));
                    s += "</span>",
                        s += d(t.slice(c.end.column - r)),
                        t = s
                }
            }
            return {
                src: t + o,
                cols: n
            }
        }
        var t = "#blanket-main {margin:2px;background:#EEE;color:#333;clear:both;font-family:'Helvetica Neue Light', 'HelveticaNeue-Light', 'Helvetica Neue', Calibri, Helvetica, Arial, sans-serif; font-size:17px;} #blanket-main a {color:#333;text-decoration:none;}  #blanket-main a:hover {text-decoration:underline;} .blanket {margin:0;padding:5px;clear:both;border-bottom: 1px solid #FFFFFF;} .bl-error {color:red;}.bl-success {color:#5E7D00;} .bl-file{width:auto;} .bl-cl{float:left;} .blanket div.rs {margin-left:50px; width:150px; float:right} .bl-nb {padding-right:10px;} #blanket-main a.bl-logo {color: #EB1764;cursor: pointer;font-weight: bold;text-decoration: none} .bl-source{ overflow-x:scroll; background-color: #FFFFFF; border: 1px solid #CBCBCB; color: #363636; margin: 25px 20px; width: 80%;} .bl-source div{white-space: pre;font-family: monospace;} .bl-source > div > span:first-child{background-color: #EAEAEA;color: #949494;display: inline-block;padding: 0 10px;text-align: center;width: 30px;} .bl-source .miss{background-color:#e6c3c7} .bl-source span.branchWarning{color:#000;background-color:yellow;} .bl-source span.branchOkay{color:#000;background-color:transparent;}", n = 60, r = document.head, i = 0, s = document.body, o, u = Object.keys(e.files).some(function(t) {
            return typeof e.files[t].branchData != "undefined"
        }), a = "<div id='blanket-main'><div class='blanket bl-title'><div class='bl-cl bl-file'><a href='http://migrii.github.com/blanket/' target='_blank' class='bl-logo'>Blanket.js</a> results</div><div class='bl-cl rs'>Coverage (%)</div><div class='bl-cl rs'>Covered/Total Smts.</div>" + (u ? "<div class='bl-cl rs'>Covered/Total Branches</div>" : "") + "<div style='clear:both;'></div></div>", f = "<div class='blanket {{statusclass}}'><div class='bl-cl bl-file'><span class='bl-nb'>{{fileNumber}}.</span><a href='javascript:blanket_toggleSource(\"file-{{fileNumber}}\")'>{{file}}</a></div><div class='bl-cl rs'>{{percentage}} %</div><div class='bl-cl rs'>{{numberCovered}}/{{totalSmts}}</div>" + (u ? "<div class='bl-cl rs'>{{passedBranches}}/{{totalBranches}}</div>" : "") + "<div id='file-{{fileNumber}}' class='bl-source' style='display:none;'>{{source}}</div><div style='clear:both;'></div></div>", c = document.createElement("script");
        c.type = "text/javascript",
            c.text = l.toString().replace("function " + l.name, "function blanket_toggleSource"),
            s.appendChild(c);
        var h = function(e, t) {
            return Math.round(e / t * 100 * 100) / 100
        }
            , p = function(e, t, n) {
            var r = document.createElement(e);
            r.innerHTML = n,
                t.appendChild(r)
        }
            , m = []
            , y = function(e) {
            return typeof e != "undefined"
        }
            , b = e.files;
        for (var w in b) {
            i++;
            var E = b[w], S = 0, x = 0, T = [], N, C = [];
            for (N = 0; N < E.source.length; N += 1) {
                var k = E.source[N];
                if (m.length > 0 || typeof E.branchData != "undefined")
                    if (typeof E.branchData[N + 1] != "undefined") {
                        var L = E.branchData[N + 1].filter(y)
                            , A = 0;
                        k = g(A, k, L, 0, N + 1).src
                    } else
                        m.length ? k = g(0, k, null , 0, N + 1).src : k = d(k);
                else
                    k = d(k);
                var O = "";
                E[N + 1] ? (x += 1,
                    S += 1,
                    O = "hit") : E[N + 1] === 0 && (S++,
                    O = "miss"),
                    T[N + 1] = "<div class='" + O + "'><span class=''>" + (N + 1) + "</span>" + k + "</div>"
            }
            var M = 0
                , _ = 0;
            if (typeof E.branchData != "undefined")
                for (var D = 0; D < E.branchData.length; D++)
                    if (typeof E.branchData[D] != "undefined")
                        for (var P = 0; P < E.branchData[D].length; P++)
                            typeof E.branchData[D][P] != "undefined" && (M++,
                            E.branchData[D][P].indexOf(!0) > -1 && E.branchData[D][P].indexOf(!1) > -1 && _++);
            var H = h(x, S)
                , B = f.replace("{{file}}", w).replace("{{percentage}}", H).replace("{{numberCovered}}", x).replace(/\{\{fileNumber\}\}/g, i).replace("{{totalSmts}}", S).replace("{{totalBranches}}", M).replace("{{passedBranches}}", _).replace("{{source}}", T.join(" "));
            H < n ? B = B.replace("{{statusclass}}", "bl-error") : B = B.replace("{{statusclass}}", "bl-success"),
                a += B
        }
        a += "</div>",
            p("style", r, t),
            document.getElementById("blanket-main") ? document.getElementById("blanket-main").innerHTML = a.slice(23, -6) : p("div", s, a)
    }
    ,
    function() {
        var e = {}
            , t = Array.prototype.slice
            , n = t.call(document.scripts);
        t.call(n[n.length - 1].attributes).forEach(function(t) {
            t.nodeName === "data-cover-only" && (e.filter = t.nodeValue),
            t.nodeName === "data-cover-never" && (e.antifilter = t.nodeValue),
            t.nodeName === "data-cover-reporter" && (e.reporter = t.nodeValue),
            t.nodeName === "data-cover-adapter" && (e.adapter = t.nodeValue),
            t.nodeName === "data-cover-loader" && (e.loader = t.nodeValue),
            t.nodeName === "data-cover-timeout" && (e.timeout = t.nodeValue);
            if (t.nodeName === "data-cover-flags") {
                var n = " " + t.nodeValue + " ";
                n.indexOf(" unordered ") > -1 && (e.order = !1),
                n.indexOf(" ignoreError ") > -1 && (e.ignoreScriptError = !0),
                n.indexOf(" autoStart ") > -1 && (e.autoStart = !0),
                n.indexOf(" ignoreCors ") > -1 && (e.ignoreCors = !0),
                n.indexOf(" branchTracking ") > -1 && (e.branchTracking = !0),
                n.indexOf(" sourceURL ") > -1 && (e.sourceURL = !0),
                n.indexOf(" debug ") > -1 && (e.debug = !0)
            }
        }),
            blanket.options(e)
    }(),
    function(e) {
        e.extend({
            utils: {
                normalizeBackslashes: function(e) {
                    return e.replace(/\\/g, "/")
                },
                matchPatternAttribute: function(t, n) {
                    if (typeof n == "string") {
                        if (n.indexOf("[") === 0) {
                            var r = n.slice(1, n.length - 1).split(",");
                            return r.some(function(n) {
                                return e.utils.matchPatternAttribute(t, e.utils.normalizeBackslashes(n.slice(1, -1)))
                            })
                        }
                        if (n.indexOf("//") === 0) {
                            var i = n.slice(2, n.lastIndexOf("/"))
                                , s = n.slice(n.lastIndexOf("/") + 1)
                                , o = new RegExp(i,s);
                            return o.test(t)
                        }
                        return n.indexOf("#") === 0 ? window[n.slice(1)].call(window, t) : t.indexOf(e.utils.normalizeBackslashes(n)) > -1
                    }
                    if (n instanceof Array)
                        return n.some(function(n) {
                            return e.utils.matchPatternAttribute(t, n)
                        });
                    if (n instanceof RegExp)
                        return n.test(t);
                    if (typeof n == "function")
                        return n.call(window, t)
                },
                blanketEval: function(e) {
                    return (window.execScript || function(e) {
                            window.eval.call(window, e)
                        }
                    )(e)
                },
                collectPageScripts: function() {
                    var t = Array.prototype.slice
                        , n = t.call(document.scripts)
                        , r = []
                        , i = []
                        , s = e.options("filter");
                    if (s != null ) {
                        var o = e.options("antifilter");
                        r = t.call(document.scripts).filter(function(n) {
                            return t.call(n.attributes).filter(function(t) {
                                    return t.nodeName === "src" && e.utils.matchPatternAttribute(t.nodeValue, s) && (typeof o == "undefined" || !e.utils.matchPatternAttribute(t.nodeValue, o))
                                }).length === 1
                        })
                    } else
                        r = t.call(document.querySelectorAll("script[data-cover]"));
                    return i = r.map(function(n) {
                        return e.utils.qualifyURL(t.call(n.attributes).filter(function(e) {
                            return e.nodeName === "src"
                        })[0].nodeValue).replace(".js", "")
                    }),
                    s || e.options("filter", "['" + i.join("','") + "']"),
                        i
                }
            }
        }),
            e.utils.oldloader = requirejs.load,
            requirejs.load = function(t, n, r) {
                e.requiringFile(r),
                    requirejs.cget(r, function(i) {
                        var s = e.options("filter")
                            , o = e.options("antifilter");
                        typeof o != "undefined" && e.utils.matchPatternAttribute(r.replace(".js", ""), o) ? (e.utils.oldloader(t, n, r),
                        e.options("debug") && console.log("BLANKET-File will never be instrumented:" + r),
                            e.requiringFile(r, !0)) : e.utils.matchPatternAttribute(r.replace(".js", ""), s) ? (e.options("debug") && console.log("BLANKET-Attempting instrument of:" + r),
                            e.instrument({
                                inputFile: i,
                                inputFileName: r
                            }, function(i) {
                                try {
                                    e.utils.blanketEval(i),
                                        t.completeLoad(n),
                                        e.requiringFile(r, !0)
                                } catch (s) {
                                    if (!e.options("ignoreScriptError"))
                                        throw new Error("Error parsing instrumented code: " + s);
                                    e.options("debug") && console.log("BLANKET-There was an error loading the file:" + r),
                                        t.completeLoad(n),
                                        e.requiringFile(r, !0)
                                }
                            })) : (e.options("debug") && console.log("BLANKET-Loading (without instrumenting) the file:" + r),
                            e.utils.oldloader(t, n, r),
                            e.requiringFile(r, !0))
                    }, function(t) {
                        throw e.requiringFile(),
                            t
                    })
            }
            ,
            requirejs.createXhr = function() {
                var e, t, n;
                if (typeof XMLHttpRequest != "undefined")
                    return new XMLHttpRequest;
                if (typeof ActiveXObject != "undefined")
                    for (t = 0; t < 3; t += 1) {
                        n = progIds[t];
                        try {
                            e = new ActiveXObject(n)
                        } catch (r) {}
                        if (e) {
                            progIds = [n];
                            break
                        }
                    }
                return e
            }
            ,
            requirejs.cget = function(t, n, r, i) {
                var s = !1;
                if (e.blanketSession) {
                    var o = Object.keys(e.blanketSession);
                    for (var u = 0; u < o.length; u++) {
                        var a = o[u];
                        if (t.indexOf(a) > -1) {
                            n(e.blanketSession[a]),
                                s = !0;
                            return
                        }
                    }
                }
                if (!s) {
                    var f = requirejs.createXhr();
                    f.open("GET", t, !0),
                    i && i(f, t),
                        f.onreadystatechange = function(e) {
                            var i, s;
                            f.readyState === 4 && (i = f.status,
                                i > 399 && i < 600 ? (s = new Error(t + " HTTP status: " + i),
                                    s.xhr = f,
                                    r(s)) : n(f.responseText))
                        }
                    ;
                    try {
                        f.send(null )
                    } catch (l) {
                        if (!l.code || l.code !== 101 && l.code !== 1012 || e.options("ignoreCors") !== !1)
                            throw l;
                        e.showManualLoader()
                    }
                }
            }
    }(blanket),
    function() {
        if (typeof QUnit != "undefined") {
            var e = function() {
                return window.QUnit.config.queue.length > 0 && blanket.noConflict().requireFilesLoaded()
            };
            QUnit.config.urlConfig[0].tooltip ? (QUnit.config.urlConfig.push({
                id: "coverage",
                label: "Enable coverage",
                tooltip: "Enable code coverage."
            }),
                QUnit.urlParams.coverage || blanket.options("autoStart") ? (QUnit.begin(function() {
                    blanket.noConflict().setupCoverage()
                }),
                    QUnit.done(function(e, t) {
                        blanket.noConflict().onTestsDone()
                    }),
                    QUnit.moduleStart(function(e) {
                        blanket.noConflict().onModuleStart()
                    }),
                    QUnit.testStart(function(e) {
                        blanket.noConflict().onTestStart()
                    }),
                    QUnit.testDone(function(e) {
                        blanket.noConflict().onTestDone(e.total, e.passed)
                    }),
                    blanket.noConflict().beforeStartTestRunner({
                        condition: e,
                        callback: function() {
                            (!blanket.options("existingRequireJS") || !!blanket.options("autoStart")) && QUnit.start()
                        }
                    })) : blanket.noConflict().beforeStartTestRunner({
                    condition: e,
                    callback: function() {
                        (!blanket.options("existingRequireJS") || !!blanket.options("autoStart")) && QUnit.start()
                    },
                    coverage: !1
                })) : (QUnit.begin = function() {
                blanket.noConflict().setupCoverage()
            }
                ,
                QUnit.done = function(e, t) {
                    blanket.noConflict().onTestsDone()
                }
                ,
                QUnit.moduleStart = function(e) {
                    blanket.noConflict().onModuleStart()
                }
                ,
                QUnit.testStart = function(e) {
                    blanket.noConflict().onTestStart()
                }
                ,
                QUnit.testDone = function(e) {
                    blanket.noConflict().onTestDone(e.total, e.passed)
                }
                ,
                blanket.beforeStartTestRunner({
                    condition: e,
                    callback: QUnit.start
                }))
        }
    }();
