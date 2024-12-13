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
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAutoSizer = exports.FlexTreeMap = exports.FixedTreeMap = void 0;
const react_1 = __importStar(require("react"));
const hook_1 = require("./hook");
const renderer_1 = require("./renderer");
const FixedTreeMap = ({ dataArray, getDataVolume, renderCell = renderer_1.defaultRenderCell, height, width, className, style, }) => {
    const cellRenderer = (0, react_1.useCallback)((dataIndex, style) => renderCell(style, dataArray[dataIndex], dataIndex), [renderCell, dataArray]);
    const sideRatio = width && height ? +(height / width).toFixed(3) : 0;
    const tree = (0, hook_1.useTree)(getDataVolume, dataArray, sideRatio);
    return (react_1.default.createElement("div", { className: className, style: Object.assign({ width, height, position: 'relative' }, style), "data-testid": "FixedTreeMap-outer" }, tree && react_1.default.createElement(renderer_1.FixedTreeMapRenderer, { tree: tree, width: width, height: height, cellRenderer: cellRenderer })));
};
exports.FixedTreeMap = FixedTreeMap;
const FlexTreeMap = ({ dataArray, getDataVolume, renderCell = renderer_1.defaultRenderCell, height, width, className, style, }) => {
    const cellRenderer = (0, react_1.useCallback)((dataIndex, style) => renderCell(style, dataArray[dataIndex], dataIndex), [renderCell, dataArray]);
    const sideRatio = width && height ? +(height / width).toFixed(3) : 0;
    const tree = (0, hook_1.useTree)(getDataVolume, dataArray, sideRatio);
    return (react_1.default.createElement("div", { className: className, style: Object.assign({ width, height }, style), "data-testid": "FlexTreeMap-outer" }, tree && react_1.default.createElement(renderer_1.FlexTreeMapRenderer, { tree: tree, sideRatio: sideRatio, cellRenderer: cellRenderer, divideContainer: Divider })));
};
exports.FlexTreeMap = FlexTreeMap;
const Divider = ({ children, style }) => react_1.default.createElement("div", { style: style }, children);
const withAutoSizer = (WrappedComponent) => {
    return function AutoSizeTreeMap(props) {
        const resizerRef = (0, react_1.useRef)(null);
        const [size, setSize] = (0, react_1.useState)({ width: 0, height: 0 });
        const height = (0, react_1.useDeferredValue)(size.height);
        const width = (0, react_1.useDeferredValue)(size.width);
        (0, react_1.useEffect)(() => {
            const observer = new ResizeObserver(([entry]) => setSize(entry.contentRect));
            resizerRef.current && observer.observe(resizerRef.current);
            return () => observer.disconnect();
        }, []);
        return (react_1.default.createElement("div", { style: style_AutoSizer, ref: resizerRef, "data-testid": "withAutoSizer-outer" },
            react_1.default.createElement(WrappedComponent, Object.assign({}, props, { width: width, height: height }))));
    };
};
exports.withAutoSizer = withAutoSizer;
const style_AutoSizer = {
    width: '100%',
    height: '100%',
};
