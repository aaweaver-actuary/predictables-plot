import React from 'react';
import PlotAPI from '../../../enums/PlotAPI.enum';

interface XAxisProps {
  canvasWidth: number;
  canvasHeight: number;
  position?: 'top' | 'bottom';
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  axisWidth?: number;
  axisColor?: string;
  axisStyle?: string;
  element?: PlotAPI;
}

const XAxis = ({
  canvasWidth,
  canvasHeight,
  position = 'bottom',
  marginLeft = 10,
  marginRight = 10,
  marginTop = 10,
  marginBottom = 10,
  axisWidth = 1,
  axisColor = 'black',
  axisStyle = 'solid',
  element = PlotAPI.SVG,
}: XAxisProps) => {
  const axisLine = {
    x1: marginLeft,
    y1: position === 'bottom' ? canvasHeight - marginBottom : marginTop,
    x2: canvasWidth - marginRight,
    y2: position === 'bottom' ? canvasHeight - marginBottom : marginTop,
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

export default XAxis;
