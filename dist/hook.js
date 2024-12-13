"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTree = void 0;
const core_1 = require("@sj-treemap/core");
const react_1 = require("react");
function useTree(valueFetcher, dataArray, sideRatio) {
    return (0, react_1.useMemo)(() => (0, core_1.getTree)(sideRatio, dataArray.map((data, index) => valueFetcher(data, index))), [valueFetcher, sideRatio, dataArray]);
}
exports.useTree = useTree;
