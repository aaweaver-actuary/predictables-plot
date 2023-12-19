import React from 'react';
import DataContext from './DataContext';
import DataProviderProps from '../types/DataProvider.props';
import DataTable from './DataTable';
import DataSeries from './DataSeries';
import { defaultData } from './defaultData';

const readDefault = () => {
  const dat = defaultData;
  const keys = Object.keys(dat[0]);
  const data = buildData(keys, dat);
  return data;
};

const buildData = (keys: string[], data: any) => {
  let outData: any = [];
  keys.forEach((key: string, i: number) => {
    let dataArr: any[] = [];
    data.forEach((datum: any) => {
      // Ensure the key exists in the datum and push its value
      if (datum.hasOwnProperty(key)) {
        dataArr.push(datum[key]);
      }
    });
    let ds = new DataSeries({ values: dataArr, name: key });
    outData.push(ds);
  });

  let outData2 = new DataTable(outData);

  return outData2;
};

/**
 * @component
 * @name DataProvider
 * @description DataProvider component to pass a DataTable around using context.
 * @param {object} props - The props for the component.
 * @param {DataTable} props.dt - The instance of the DataTable.
 * @param {React.ReactNode} props.children - The child components that may consume the DataTable.
 * @returns {React.ReactNode} The provider component.
 */
const DataProvider = ({ dt, children }: DataProviderProps) => {
  const dt1: DataTable = dt ? dt : readDefault();
  return (
    <DataContext.Provider value={{ dt1, children }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
