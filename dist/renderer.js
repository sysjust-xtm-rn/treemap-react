"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeMapCell = exports.FlexTreeMapRecursor = exports.FlexTreeMapRenderer = exports.FixedTreeMapRenderer = exports.useTree = exports.getRectFromTree = exports.getTree = void 0;
var react_1 = __importStar(require("react"));
var core_1 = require("@sj-treemap/core");
Object.defineProperty(exports, "getTree", { enumerable: true, get: function () { return core_1.getTree; } });
Object.defineProperty(exports, "getRectFromTree", { enumerable: true, get: function () { return core_1.getRectFromTree; } });
function useTree(sideRatio, valueFetcher) {
    return (0, react_1.useMemo)(function () {
        var valueArray = [];
        for (var i = 0; true; i++) {
            var value = valueFetcher(i);
            if (!value || value <= 0)
                break;
            valueArray.push(value);
        }
        return (0, core_1.getTree)(sideRatio, valueArray);
    }, [valueFetcher, sideRatio]);
}
exports.useTree = useTree;
exports.FixedTreeMapRenderer = (0, react_1.memo)(function (_a) {
    var width = _a.width, sideRatio = _a.sideRatio, tree = _a.tree, cellRenderer = _a.cellRenderer;
    return (react_1.default.createElement(react_1.default.Fragment, null, (0, core_1.getRectFromTree)(width, sideRatio * width, tree).map(function (_a) {
        var key = _a.key, rect = __rest(_a, ["key"]);
        return (react_1.default.createElement(exports.TreeMapCell, { key: key, dataIndex: key, style: __assign({ position: 'absolute' }, rect), cellRenderer: cellRenderer }));
    })));
});
exports.FlexTreeMapRenderer = (0, react_1.memo)(function (_a) {
    var sideRatio = _a.sideRatio, restProps = __rest(_a, ["sideRatio"]);
    return (react_1.default.createElement(exports.FlexTreeMapRecursor, __assign({}, restProps, { sideRatio: sideRatio, remain: 1 })));
});
var FlexTreeMapRecursor = function (_a) {
    var tree = _a.tree, sideRatio = _a.sideRatio, remain = _a.remain, DivideContainer = _a.DivideContainer, cellRenderer = _a.cellRenderer;
    var width = 1;
    var height = sideRatio;
    var layerValueSum = tree.reduce(function (sum, _a) {
        var value = _a.value;
        return sum + value;
    }, 0);
    var newRemain = remain - layerValueSum;
    var newWidth = width > height ? (width * newRemain) / remain : width;
    var newHeight = width > height ? height : (height * newRemain) / remain;
    return (react_1.default.createElement(DivideContainer, { style: { display: 'flex', width: '100%', height: '100%', flexDirection: width > height ? 'row' : 'column' } },
        react_1.default.createElement(DivideContainer, { style: {
                display: 'flex',
                flexDirection: width > height ? 'column' : 'row',
                flexBasis: 0,
                flexGrow: layerValueSum / remain,
            } }, tree.map(function (_a) {
            var value = _a.value, key = _a.key;
            return (react_1.default.createElement(exports.TreeMapCell, { key: key, dataIndex: key, style: { flexBasis: 0, flexGrow: value / layerValueSum }, cellRenderer: cellRenderer }));
        })),
        tree.next && (react_1.default.createElement(DivideContainer, { style: { display: 'flex', flexBasis: 0, flexGrow: newRemain / remain } },
            react_1.default.createElement(exports.FlexTreeMapRecursor, { tree: tree.next, sideRatio: newHeight / newWidth, remain: newRemain, DivideContainer: DivideContainer, cellRenderer: cellRenderer })))));
};
exports.FlexTreeMapRecursor = FlexTreeMapRecursor;
var TreeMapCell = function (_a) {
    var dataIndex = _a.dataIndex, style = _a.style, cellRenderer = _a.cellRenderer;
    return cellRenderer(dataIndex, style);
};
exports.TreeMapCell = TreeMapCell;
