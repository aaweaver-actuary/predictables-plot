import { createContext } from 'react';
import { DataTableContextType } from '../types/DataProvider.props';

// This will create a Context object.
// The context will be available to any children that call the useContext(DataContext) hook.
const DataContext = createContext<DataTableContextType>({
  dt: null,
  children: null,
});

export default DataContext;
