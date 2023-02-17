import { CSSProperties, ReactElement } from 'react';
export declare const FixedTreeMap: <DataType>({ dataArray, getDataVolume, renderCell, sideRatio, width, className, style, }: TreeMapProps<DataType>) => ReactElement | null;
export declare const FlexTreeMap: <DataType>({ dataArray, getDataVolume, renderCell, sideRatio, width, className, style, }: TreeMapProps<DataType>) => ReactElement | null;
export declare type TreeMapProps<DataType> = {
    dataArray: DataType[];
    getDataVolume: (data: DataType, index: number) => number;
    sideRatio: number;
    width: number;
    renderCell: (data: DataType, index: number, style: CSSProperties) => ReactElement;
    className?: string;
    style?: CSSProperties;
};
