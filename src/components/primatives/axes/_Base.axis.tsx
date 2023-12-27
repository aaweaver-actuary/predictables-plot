import React from 'react';
import PlotAPI from '../../../enums/PlotAPI.enum';
import DataSeries from '../../../data/DataSeries';

interface AxisProps {
  ds: DataSeries;
  canvasWidth: number;
  canvasHeight: number;
  name?: string;
  position?: 'left' | 'right' | 'top' | 'bottom';
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  axisWidth?: number;
  axisColor?: string;
  axisStyle?: string;
  direction?: 'horizontal' | 'vertical';
  element?: PlotAPI;
  maxTicks?: number;
}

const BaseAxis = ({
  ds,
  canvasWidth,
  canvasHeight,
  name = '',
  position = 'left',
  marginLeft = 10,
  marginRight = 10,
  marginTop = 10,
  marginBottom = 10,
  axisWidth = 1,
  axisColor = 'black',
  axisStyle = 'solid',
  direction = 'horizontal',
  element = PlotAPI.SVG,
  maxTicks = 20,
}: AxisProps) => {
  const [min, max] = ds.dataRange();
  const N = ds.data()?.length;

  const nTicksIfMultiples = (m: number): number => {
    return Math.ceil(N / m) * m;
  };

  const nTicks = (mt: number = maxTicks): number => {
    if (mt < 1) {
      throw new Error('maxTicks must be greater than 0.');
    }
    let checking: boolean = true;
    let M: number[] = [
      0.001, 0.0025, 0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2, 5, 10, 20,
      25, 50, 100, 200, 250, 500, 1000,
    ];
    let nTicksOut: number = 0;
    M.map((m) => {
      if (checking) {
        if (nTicksIfMultiples(m) <= mt) {
          checking = false;
          nTicksOut = nTicksIfMultiples(m);
        } else {
          nTicksOut = nTicksIfMultiples(m);
        }
        nTicksOut = nTicksIfMultiples(m);
      }
      return nTicksOut;
    });
    return nTicksOut;
  };

  const axisLine = {
    x1:
      direction === 'horizontal'
        ? marginLeft
        : position === 'left'
          ? marginLeft
          : canvasWidth - marginRight,
    y1:
      direction === 'horizontal'
        ? position === 'top'
          ? marginTop
          : canvasHeight - marginBottom
        : marginTop,
    x2:
      direction === 'horizontal'
        ? canvasWidth - marginRight
        : position === 'left'
          ? marginLeft
          : canvasWidth - marginRight,
    y2:
      direction === 'horizontal'
        ? position === 'top'
          ? marginTop
          : canvasHeight - marginBottom
        : marginTop,
    color: axisColor,
    width: axisWidth,
    style: axisStyle,
  };

  const buildID = () => {
    if (name === '') {
      return `${ds.name}-${direction}-axis`;
    } else {
      return `${name}-${direction}-axis`;
    }
  };
  const id = buildID();
  return (
    <>
      {element === PlotAPI.SVG && (
        <g>
          {/* axis line */}
          <line
            x1={axisLine.x1}
            y1={axisLine.y1}
            x2={axisLine.x2}
            y2={axisLine.y2}
            stroke={axisLine.color}
            strokeWidth={axisLine.width}
            strokeDasharray={axisLine.style}
          />

          {/* axis ticks */}
          {direction === 'horizontal'
            ? Array.from({ length: nTicks() }, (_, i) => {
                const x =
                  marginLeft +
                  (i / (nTicks() - 1)) *
                    (canvasWidth - marginRight - marginLeft);
                return (
                  <line
                    key={i}
                    x1={x}
                    y1={axisLine.y1}
                    x2={x}
                    y2={axisLine.y1 + 5}
                    stroke={axisLine.color}
                    strokeWidth={axisLine.width}
                    strokeDasharray={axisLine.style}
                  />
                );
              })
            : Array.from({ length: nTicks() }, (_, i) => {
                const y =
                  marginTop +
                  (i / (nTicks() - 1)) *
                    (canvasHeight - marginBottom - marginTop);
                return (
                  <line
                    key={i}
                    x1={axisLine.x1}
                    y1={y}
                    x2={axisLine.x1 - 5}
                    y2={y}
                    stroke={axisLine.color}
                    strokeWidth={axisLine.width}
                    strokeDasharray={axisLine.style}
                  />
                );
              })}
        </g>
      )}
      {element === PlotAPI.CANVAS && (
        <script type="text/javascript">
          {`alert('Trying to draw a canvas line')`}
        </script>
      )}
    </>
  );
};

export default BaseAxis;
