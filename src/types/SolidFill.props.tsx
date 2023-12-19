export default interface SolidFillProps {
  strokeColor?: string;
  strokeWidth?: number;
  fillColor?: string;
  overwrite?: boolean;
  opacity?: number;
  children: React.ReactNode;
}
