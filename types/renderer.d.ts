import { ComponentType, FC, PropsWithChildren, ReactElement } from 'react';
import { TreeNode } from '@sj-treemap/core';
import { RenderCell } from './component';
declare type Props_FixedTreeMapRenderer = {
    tree: TreeNode;
    width: number;
    height: number;
    cellRenderer: TreeMapCellRenderer;
};
export declare const FixedTreeMapRenderer: FC<Props_FixedTreeMapRenderer>;
declare type Props_FlexTreeMapRenderer = {
    tree: TreeNode;
    sideRatio: number;
    cellRenderer: TreeMapCellRenderer;
    divideContainer: ComponentType<DivideContainerProps>;
};
export declare const FlexTreeMapRenderer: FC<Props_FlexTreeMapRenderer>;
declare type Props_FlexTreeMapRecursor = {
    remain: number;
} & Props_FlexTreeMapRenderer;
export declare const FlexTreeMapRecursor: FC<Props_FlexTreeMapRecursor>;
declare type Props_TreeMapCell = {
    dataIndex: number;
    style: TreeMapStyle;
    cellRenderer: TreeMapCellRenderer;
};
export declare const TreeMapCell: FC<Props_TreeMapCell>;
export declare const defaultRenderCell: RenderCell<any>;
export declare type TreeMapStyle = {
    display?: 'flex';
    position?: 'absolute';
    top?: number;
    left?: number;
    width?: string | number;
    height?: string | number;
    flexDirection?: 'row' | 'column';
    flexBasis?: number;
    flexGrow?: number;
};
export declare type TreeMapCellRenderer = (dataIndex: number, style: TreeMapStyle) => ReactElement | null;
export declare type DivideContainerProps = PropsWithChildren<{
    style: TreeMapStyle;
}>;
export {};
