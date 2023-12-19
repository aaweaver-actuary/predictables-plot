/**
 * @interface pointProps
 * The properties of a point primative. Shown below.
 */
export default interface pointProps {
  x: number;
  y: number;
  type?: string;
  radius?: number;
  sideLength?: number;
  strokeColor?: string;
  strokeWidth?: number;
  fillColor?: string;
  opacity?: number;
}
