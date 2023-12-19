import React from 'react';
import DataTable from '../data/DataTable';

/**
 * @interface DataProviderProps
 * The properties of the DataProvider component.
 */
export default interface DataProviderProps {
  /**
   * @property dt
   * @type {DataTable}
   * @description The instance of the DataTable.
   */
  dt?: DataTable;

  /**
   * @property children
   * @type {React.ReactNode}
   * @description The children of the DataProvider component.
   */
  children?: React.ReactNode;
}

// Create an interface for the context value
export interface DataTableContextType {
  dt?: DataTable | null;
  dt1?: DataTable;
  children?: React.ReactNode;
}

// Create an interface for the provider
export interface DataTableProviderType {
  dt?: DataTable | null;
  dt1?: DataTable;
  children: React.ReactNode;
}
