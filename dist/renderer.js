"use strict";
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
exports.defaultRenderCell = exports.TreeMapCell = exports.FlexTreeMapRecursor = exports.FlexTreeMapRenderer = exports.FixedTreeMapRenderer = void 0;
const react_1 = __importStar(require("react"));
const core_1 = require("@sj-treemap/core");
exports.FixedTreeMapRenderer = (0, react_1.memo)(function FixedTreeMapRenderer({ width, height, tree, cellRenderer }) {
    return (react_1.default.createElement(react_1.default.Fragment, null, (0, core_1.getRectFromTree)(width, height, tree).map((_a) => {
        var { key } = _a, rect = __rest(_a, ["key"]);
        return (react_1.default.createElement(exports.TreeMapCell, { key: key, dataIndex: key, style: Object.assign({ position: 'absolute' }, rect), cellRenderer: cellRenderer }));
    })));
});
exports.FlexTreeMapRenderer = (0, react_1.memo)(function FlexTreeMapRenderer(props) {
    return react_1.default.createElement(exports.FlexTreeMapRecursor, Object.assign({}, props, { remain: 1 }));
});
const FlexTreeMapRecursor = ({ tree, sideRatio, remain, divideContainer: DivideContainer, cellRenderer, }) => {
    if (!remain)
        return null;
    const width = 1;
    const height = sideRatio;
    const isHorizontal = width > height;
    const layerValueSum = tree.reduce((sum, { value }) => sum + value, 0);
    const newRemain = remain - layerValueSum;
    const newWidth = isHorizontal ? (width * newRemain) / remain : width;
    const newHeight = isHorizontal ? height : (height * newRemain) / remain;
    return (react_1.default.createElement(DivideContainer, { style: { display: 'flex', width: '100%', height: '100%', flexDirection: isHorizontal ? 'row' : 'column' } },
        react_1.default.createElement(DivideContainer, { style: {
                display: 'flex',
                flexDirection: isHorizontal ? 'column' : 'row',
                flexBasis: 0,
                flexGrow: layerValueSum / remain,
            } }, tree.map(({ value, key }) => (react_1.default.createElement(exports.TreeMapCell, { key: key, dataIndex: key, style: { flexBasis: 0, flexGrow: value / layerValueSum }, cellRenderer: cellRenderer })))),
        tree.next && (react_1.default.createElement(DivideContainer, { style: { display: 'flex', flexBasis: 0, flexGrow: newRemain / remain } },
            react_1.default.createElement(exports.FlexTreeMapRecursor, { tree: tree.next, sideRatio: newHeight / newWidth, remain: newRemain, divideContainer: DivideContainer, cellRenderer: cellRenderer })))));
};
exports.FlexTreeMapRecursor = FlexTreeMapRecursor;
const TreeMapCell = ({ dataIndex, style, cellRenderer }) => cellRenderer(dataIndex, style);
exports.TreeMapCell = TreeMapCell;
const defaultRenderCell = (style) => react_1.default.createElement("div", { style: Object.assign(Object.assign({}, style), style_defaultCell), "data-testid": "defaultRenderCell" });
exports.defaultRenderCell = defaultRenderCell;
const style_defaultCell = {
    border: 'solid black 1px',
    boxSizing: 'border-box',
};
