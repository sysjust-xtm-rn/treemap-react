export declare function useTree<T>(valueFetcher: ValueFetcher<T>, dataArray: T[], sideRatio: number): import("@sj-treemap/core").TreeNode | undefined;
export declare type ValueFetcher<T> = (data: T, index: number) => number;
