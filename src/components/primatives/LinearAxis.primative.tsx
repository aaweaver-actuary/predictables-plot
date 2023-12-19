import React, { useContext } from 'react';
import DataContext from '../../data/DataContext';
import DataSeries from '../../data/DataSeries';
import DataTable from '../../data/DataTable';
import Line from './Line.primative';

/**
 * @component
 * @name LinearAxis
 * @description LinearAxis component to create x and y axes for a plot.
 * @param {object} props - The props for the component.
 * @param {DataSeries|string} props.x - The x-axis DataSeries or the name of the column for the x-axis.
 * @param {DataSeries|string} props.y - The y-axis DataSeries or the name of the column for the y-axis.
 * @param {string} props.xPosition - The position of the x-axis: 'top', 'bottom', or 'center'.
 * @param {string} props.yPosition - The position of the y-axis: 'left', 'right', or 'center'.
 * @param {marginLeft} props.marginLeft - The left margin of the plot
 * @param {marginRight} props.marginRight - The right margin of the plot
 * @param {marginTop} props.marginTop - The top margin of the plot
 * @param {marginBottom} props.marginBottom - The bottom margin of the plot
 * @param {boolean} [props.secondaryAxis=false] - Whether to add a secondary axis on the opposite side.
 *
 * @returns {React.ReactNode} The SVG group element containing the axes.
 */
const LinearAxis = ({
  x,
  y,
  canvasWidth = 100,
  canvasHeight = 100,
  xPosition = 'bottom',
  yPosition = 'left',
  marginLeft = 10,
  marginRight = 10,
  marginTop = 10,
  marginBottom = 10,
  secondaryAxis = false,
}) => {
  const { dt } = useContext(DataContext);

  // Function to get DataSeries from DataTable or use the provided one
  const getAxisDataSeries = (axis: DataSeries | string) => {
    if (axis instanceof DataSeries) {
      return axis;
    } else if (typeof axis === 'string' && dt) {
      return dt.col(axis);
    }
    throw new Error(
      'Axis must be a DataSeries instance or a string column name',
    );
  };

  const xAxisData = getAxisDataSeries(x);
  const yAxisData = getAxisDataSeries(y);

  const xAxisLine = {
    x1: marginLeft,
    y1: marginTop,
    x2: marginLeft, // replace with actual length based on scale
    y2: marginTop,
    color: 'black', // replace with axis color based on theme or prop
    width: 1, // replace with axis line width based on prop
  };

  const yAxisLine = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 100, // replace with actual length based on scale
    color: 'black', // replace with axis color based on theme or prop
    width: 1, // replace with axis line width based on prop
  };

  return (
    <g>
      {/* Render the x-axis */}
      {/* Render the y-axis */}
      {/* Optionally render secondary axes if secondaryAxis is true */}
    </g>
  );
};

export default LinearAxis;
