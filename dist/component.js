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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlexTreeMap = exports.FixedTreeMap = void 0;
var react_1 = __importStar(require("react"));
var renderer_1 = require("./renderer");
var FixedTreeMap = function (_a) {
    var dataArray = _a.dataArray, getDataVolume = _a.getDataVolume, renderCell = _a.renderCell, sideRatio = _a.sideRatio, width = _a.width, className = _a.className, style = _a.style;
    var fetchValue = (0, react_1.useCallback)(function (dataIndex) {
        var data = dataArray[dataIndex];
        return data && getDataVolume(data, dataIndex);
    }, [getDataVolume, dataArray]);
    var cellRenderer = (0, react_1.useCallback)(function (dataIndex, style) { return renderCell(dataArray[dataIndex], dataIndex, style); }, [renderCell, dataArray]);
    var tree = (0, renderer_1.useTree)(sideRatio, fetchValue);
    return (react_1.default.createElement("div", { className: className, style: __assign({ width: width, height: sideRatio * width, position: 'relative' }, style) }, tree && react_1.default.createElement(renderer_1.FixedTreeMapRenderer, { tree: tree, width: width, sideRatio: sideRatio, cellRenderer: cellRenderer })));
};
exports.FixedTreeMap = FixedTreeMap;
var FlexTreeMap = function (_a) {
    var dataArray = _a.dataArray, getDataVolume = _a.getDataVolume, renderCell = _a.renderCell, sideRatio = _a.sideRatio, width = _a.width, className = _a.className, style = _a.style;
    var fetchValue = (0, react_1.useCallback)(function (dataIndex) {
        var data = dataArray[dataIndex];
        return data && getDataVolume(data, dataIndex);
    }, [getDataVolume, dataArray]);
    var cellRenderer = (0, react_1.useCallback)(function (dataIndex, style) { return renderCell(dataArray[dataIndex], dataIndex, style); }, [renderCell, dataArray]);
    var tree = (0, renderer_1.useTree)(sideRatio, fetchValue);
    return (react_1.default.createElement("div", { className: className, style: __assign({ width: width, height: sideRatio * width }, style) }, tree && react_1.default.createElement(renderer_1.FlexTreeMapRenderer, { tree: tree, sideRatio: sideRatio, cellRenderer: cellRenderer, DivideContainer: Divider })));
};
exports.FlexTreeMap = FlexTreeMap;
var Divider = function (_a) {
    var children = _a.children, style = _a.style;
    return react_1.default.createElement("div", { style: style }, children);
};
