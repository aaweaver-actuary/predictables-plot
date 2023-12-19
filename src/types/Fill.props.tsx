export default interface FillProps {
  type?:
    | 'solid'
    | 'linear'
    | 'radial'
    | 'pattern'
    | 'colorscale'
    | 'image'
    | 'none';
  strokeColor?: string;
  strokeWidth?: number;
  fillColor?: string;
  overwrite?: boolean;
  opacity?: number;
  children: React.ReactNode;
}
