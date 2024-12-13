import React, { ComponentType, FC, ReactElement } from 'react';
import { ValueFetcher } from './hook';
import { TreeMapStyle } from './renderer';
export declare const FixedTreeMap: <DataType>({ dataArray, getDataVolume, renderCell, height, width, className, style, }: TreeMapProps<DataType>) => ReactElement | null;
export declare const FlexTreeMap: <DataType>({ dataArray, getDataVolume, renderCell, height, width, className, style, }: TreeMapProps<DataType>) => ReactElement | null;
export declare const withAutoSizer: <DataType>(WrappedComponent: React.ComponentType<TreeMapProps<DataType>>) => React.FC<Omit<TreeMapProps<DataType>, "width" | "height">>;
export declare type RenderCell<T> = (style: TreeMapStyle, data: T, index: number) => ReactElement;
export declare type TreeMapProps<DataType> = {
    dataArray: DataType[];
    getDataVolume: ValueFetcher<DataType>;
    height: number;
    width: number;
    renderCell?: RenderCell<DataType>;
    className?: string;
    style?: TreeMapStyle;
};
