import DataTable from '../data/DataTable';
import PlotAPI from '../enums/PlotAPI.enum';

export default interface PlotProps {
  children: React.ReactNode;
  dt: DataTable;
  x: number;
  y: number;
  plotName?: string;
  canvasWidth?: number;
  canvasHeight?: number;
  element?: PlotAPI;
}
