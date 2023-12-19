import PlotAPI from '../../../enums/PlotAPI.enum';

interface DotProps {
  x: number;
  y: number;
  radius: number;
  pointStyle: any;
  element?: PlotAPI;
}

const Dot = ({ x, y, radius, pointStyle, element = PlotAPI.SVG }: DotProps) => {
  return (
    <>
      {element === PlotAPI.SVG && (
        <circle
          cx={x}
          cy={y}
          r={radius}
          style={pointStyle}
          aria-label="Circle Point Shape"
        />
      )}
      {element === PlotAPI.CANVAS &&
        // todo: canvas implementation
        true}
    </>
  );
};

export default Dot;
