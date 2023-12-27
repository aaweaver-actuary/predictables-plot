import React from 'react';
import PlotAPI from '../enums/PlotAPI.enum';

const Plot = ({
  children,
  dt,
  x,
  y,
  name = '',
  width = 750,
  height = 500,
  element = PlotAPI.SVG,
  ...props
}) => {
  const plotID = `${`${name}${
    name !== '' ? '-plot-' : 'plot-'
  }`}${dt}-${x}-${y}`;
  return (
    <div
      className={`
      flex justify-center items-center
      w-[${width}px] h-[${height}px]
      border-gray-200 border-[2px]
      rounded-xl shadow-lg
      duration-200 ease-in-out transition-all
      hover:scale-[1.02]
      active:scale-[0.98]
      `}
      id={plotID}
      {...props}
    >
      {element === PlotAPI.SVG && (
        <svg width={width} height={height} {...props}>
          {children}
        </svg>
      )}
      {element === PlotAPI.CANVAS && (
        <canvas width={width} height={height} {...props}>
          {children}
        </canvas>
      )}
    </div>
  );
};
export default Plot;
