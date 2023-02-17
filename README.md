# `Treemap - React`

[TOC]

## Usage

### Basic

使用絕對座標繪圖法

```tsx
<FixedTreeMap 
    dataArray={testDatas} 
    getDataVolume={getDataVolume} 
    height={400}
    width={300}  
/>
```

使用 Flex 繪圖法

```tsx
<FlexTreeMap 
    dataArray={testDatas} 
    getDataVolume={getDataVolume} 
    height={400}
    width={300} 
/>
```

使用 autoSizer HOC 讓TreeMap自動填滿外部容器大小 (Fixed/Flex通用)

```tsx
const AutoSizeTreeMap = withAutoSizer<TestData>(FixedTreeMap);

<div style={containerStyle}>
    <AutoSizeTreeMap
        dataArray={testDatas} 
        getDataVolume={getDataVolume}
    />
</div>

const containerStyle = {
    position: 'relative',
    width: '50vw',
    height: '50vw',
};
```

示範資料格式、functional props

```tsx
type TestData = {
    title: string;
    value: number;
};

const getDataVolume = (data: TestData, index: number) => data.value;

const testDatas = [
    { title: 'A', value: 3 },
    { title: 'B', value: 4 },
    { title: 'C', value: 2 },
    { title: 'D', value: 1 },
    { title: 'E', value: 6 },
    { title: 'F', value: 2 },
    { title: 'G', value: 6 },
];
```

### Advanced

自訂cell的render方式 (Fixed/Flex通用)

```tsx
<FlexTreeMap 
    dataArray={testDatas} 
    getDataVolume={getDataVolume} 
    height={400}
    width={300}
    renderCell={myRenderCell} 
/>
```

使用自訂義元件包裹樹狀圖

```tsx
//絕對座標繪圖法
const MyFixedTreeMap = <DataType,>({
    dataArray,
    getDataVolume,
    height,
    width,
    renderCell = defaultRenderCell,
    className,
}: TreeMapProps<DataType>): ReactElement => {
    const cellRenderer = useCallback(
        (dataIndex: number, style: TreeMapStyle) => renderCell(style, dataArray[dataIndex], dataIndex),
        [renderCell, dataArray]
    );

    const tree = useTree(getDataVolume, dataArray, height / width);

    return(
        <MyContainer>
            {tree && <FixedTreeMapRenderer tree={tree} height={height} width={width} cellRenderer={cellRenderer} />}
        </MyContainer>
    );
};

//Flex 繪圖法
const MyFlexTreeMap = <DataType,>({
    dataArray,
    getDataVolume,
    height,
    width,
    renderCell = defaultRenderCell,
    className,
}: TreeMapProps<DataType>): ReactElement => {
    const cellRenderer = useCallback(
        (dataIndex: number, style: TreeMapStyle) => renderCell(style, dataArray[dataIndex], dataIndex),
        [renderCell, dataArray]
    );

    const sideRatio = height / width;
    const tree = useTree(getDataVolume, dataArray, sideRatio);

    return (
        <MyContainer>
            {tree && <FlexTreeMapRenderer tree={tree} sideRatio={sideRatio} cellRenderer={cellRenderer} divideContainer={MyDivideComponent} />}
        </MyContainer>
    );
};
```

## Hook

### useTree

樹狀結構運算結果，僅在輸入有更新時發生更新。

| 參數名 | 型態 | 必填 / 默認值 | 說明 |
| ------ | ------ | ------ | ------ |
| valueFetcher  | `ValueFetcher<DataType>`  | V | 讀取資料在樹狀圖中的比重
| dataArray     | `DataType[]`              | V | 資料陣列，內容可為任意型態
| sideRatio     | `number`                  | V | 樹狀圖整體高度 : 寬度的比值
| ------ | ------ | ------ | ------ |
| tree          | `TreeNode or undefined`   |   | 樹狀結構運算結果，當陣列為空或是sideRatio為0時，輸出undefined

## Component

### FixedTreeMap, FlexTreeMap

兩種元件使用不同繪圖法，每個元件中都存有一個 tree，只要長寬比、getDataVolume或dataArray任一有更動，tree就會更新。

Props: `TreeMapProps<DataType>`

| 欄位名 | 型態 | 必填 / 默認值 | 說明 |
| ------ | ------ | ------ | ------ |
| dataArray     | `DataType[]`              | V | 資料陣列，內容可為任意型態
| getDataVolume | `ValueFetcher<DataType>`  | V | 用以評估每格在樹狀圖中的比重
| width         | `number`                  | V | 樹狀圖整體寬度
| height        | `number`                  | V | 樹狀圖整體高度
| renderCell    | `RenderCell<DataType>`    | defaultRenderCell | 樹狀圖內部格位的renderer
| className     | `string`                  |   | 樹狀圖外容器的className
| style         | `TreeMapStyle`            |   | 樹狀圖外容器的style

## Renderer

### FixedTreeMapRenderer

**Memoed Component**  
僅render樹狀圖的內容，不包含外容器。

Props

| 欄位名 | 型態 | 必填 / 默認值 | 說明 |
| ------ | ------ | ------ | ------ |
| tree          | `TreeNode`            | V | 樹狀結構運算結果
| width         | `number`              | V | 樹狀圖整體寬度
| height        | `number`              | V | 樹狀圖整體高度
| cellRenderer  | `TreeMapCellRenderer` | V | 樹狀圖內部格位的renderer

### FlexTreeMapRenderer

**Memoed Component**  
僅render樹狀圖的內容，不包含外容器。

Props

| 欄位名 | 型態 | 必填 / 默認值 | 說明 |
| ------ | ------ | ------ | ------ |
| tree              | `TreeNode`                                    | V | 樹狀結構運算結果
| sideRatio         | `number`                                      | V | 樹狀圖整體高度 : 寬度的比值
| cellRenderer      | `TreeMapCellRenderer`                         | V | 樹狀圖內部格位的renderer
| divideContainer   | `React.ComponentType<DivideContainerProps>`   | V | 樹狀圖中，非資料格所使用的Flex容器元件，renderer將會傳入適當的style與children

### defaultRenderCell

默認使用的cellRenderer，僅繪出符合大小的黑色邊框的方塊，無任何內容

type: `RenderCell<any>`

## Types

### functionType: `RenderCell<DataType>`

FixedTreeMap, FlexTreeMap中renderCell的型態。

| 參數名 | 型態 | 必填 / 默認值 | 說明 |
| ------ | ------ | ------ | ------ |
| style     | `TreeMapStyle`            | V | 經樹狀圖計算後的style
| data      | `DataType`                | V | 該格所屬資料
| index     | `number`                  | V | 該格資料所屬序數
| ------ | ------ | ------ | ------ |
| return    | `ReactElement`            |   | 樹狀圖格位的繪圖結果

### functionType: `TreeMapCellRenderer`

FixedTreeMapRenderer, FlexTreeMapRenderer中renderCell的型態。

| 參數名 | 型態 | 必填 / 默認值 | 說明 |
| ------ | ------ | ------ | ------ |
| dataIndex | `number`                  | V | 該格資料所屬序數
| style     | `TreeMapStyle`            | V | 經樹狀圖計算後的style
| ------ | ------ | ------ | ------ |
| return    | `ReactElement or null`    |   | 樹狀圖格位的繪圖結果

### `TreeMapStyle`

TreeMap經計算後的style型態。

| 欄位名 | 型態 | 必填 / 默認值 | 說明 |
| ------ | ------ | ------ | ------ |
| display       | `'flex'`              |   | 僅在FlexTreeMapRenderer的divideContainer中賦予
| position      | `'absolute'`          |   | 在FixedTreeMap中的renderCell中賦予
| top           | `number`              |   | 在FixedTreeMap中的renderCell中賦予
| left          | `number`              |   | 在FixedTreeMap中的renderCell中賦予
| width         | `string or number`    |   | 在FlexTreeMapRenderer的divideContainer中賦予字串，而在FixedTreeMap中的renderCell賦予數值
| height        | `string or number`    |   | 在FlexTreeMapRenderer的divideContainer中賦予字串，而在FixedTreeMap中的renderCell賦予數值
| flexDirection | `'row' or 'column'`   |   | 僅在FlexTreeMapRenderer的divideContainer中賦予
| flexBasis     | `number`              |   | 在FlexTreeMap中的renderCell中賦予
| flexGrow      | `number`              |   | 在FlexTreeMap中的renderCell中賦予

### `DivideContainerProps`

FlexTreeMapRenderer中devideContainer所需的component props type。

| 欄位名 | 型態 | 必填 / 默認值 | 說明 |
| ------ | ------ | ------ | ------ |
| style         | `TreeMapStyle`        | V | 經樹狀圖計算後的style
| children      | `React.ReactNode`     | V | 下層樹狀結構

### functionType: `ValueFetcher<DataType>`

useTree獲取陣列資料的比重評估值的函數型態。

| 參數名 | 型態 | 必填 / 默認值 | 說明 |
| ------ | ------ | ------ | ------ |
| data      | `DataType`    | V | 資料
| index     | `number`      | V | 該資料所屬序數
| ------ | ------ | ------ | ------ |
| return    | `number`      |   | 回傳比重評估值
