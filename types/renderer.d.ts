import React, { ComponentType, CSSProperties, FC, PropsWithChildren, ReactElement } from 'react';
import { getTree, TreeNode, getRectFromTree } from '@sj-treemap/core';
export { getTree, getRectFromTree };
export type { TreeNode } from '@sj-treemap/core';
declare type ValueFetcher = (dataIndex: number) => number | null | undefined;
export declare function useTree(sideRatio: number, valueFetcher: ValueFetcher): TreeNode | undefined;
declare type Props_FixedTreeMapRenderer = TreeMapRendererProps;
export declare const FixedTreeMapRenderer: FC<Props_FixedTreeMapRenderer>;
declare type Props_FlexTreeMapRenderer = {
    DivideContainer: ComponentType<DivideContainerProps>;
} & Omit<TreeMapRendererProps, 'width'>;
export declare const FlexTreeMapRenderer: FC<Props_FlexTreeMapRenderer>;
declare type Props_FlexTreeMapRecursor = {
    remain: number;
} & Props_FlexTreeMapRenderer;
export declare const FlexTreeMapRecursor: FC<Props_FlexTreeMapRecursor>;
declare type Props_TreeMapCell = {
    dataIndex: number;
    style: React.CSSProperties;
    cellRenderer: TreeMapCellRenderer;
};
export declare const TreeMapCell: FC<Props_TreeMapCell>;
export declare type TreeMapRendererProps = {
    tree: TreeNode;
    width: number;
    sideRatio: number;
    cellRenderer: TreeMapCellRenderer;
};
export declare type TreeMapCellRenderer = (dataIndex: number, style: CSSProperties) => ReactElement | null;
export declare type DivideContainerProps = PropsWithChildren<{
    style: CSSProperties;
}>;
