import React from 'react';
import PlotAPI from '../../../enums/PlotAPI.enum';
import DataSeries from "../../../data/DataSeries";
"

interface YAxisProps {
  ds: DataSeries;
  canvasWidth: number;
  canvasHeight: number;
  position?: 'left' | 'right';
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  axisWidth?: number;
  axisColor?: string;
  axisStyle?: string;
  element?: PlotAPI;
}

const YAxis = ({
  ds,
  canvasWidth,
  canvasHeight,
  position = 'left',
  marginLeft = 10,
  marginRight = 10,
  marginTop = 10,
  marginBottom = 10,
  axisWidth = 1,
  axisColor = 'black',
  axisStyle = 'solid',
  element = PlotAPI.SVG,
}: YAxisProps) => {
  const [min, max] = ds.dataRange();
  const axisLine = {
    x1: position === 'left' ? marginLeft : canvasWidth - marginRight,
    y1: marginTop,
    x2: position === 'left' ? marginLeft : canvasWidth - marginRight,
    y2: canvasHeight - marginBottom,
    color: axisColor,
    width: axisWidth,
    style: axisStyle,
  };
  return (
    <>
      {element === PlotAPI.SVG && (
        <line
          x1={axisLine.x1}
          y1={axisLine.y1}
          x2={axisLine.x2}
          y2={axisLine.y2}
          stroke={axisLine.color}
          strokeWidth={axisLine.width}
          strokeDasharray={axisLine.style}
        />
      )}
      {element === PlotAPI.CANVAS && (
        <script type="text/javascript">
          {`alert('Trying to draw a canvas line')`}
        </script>
      )}
    </>
  );
};

export default YAxis;
