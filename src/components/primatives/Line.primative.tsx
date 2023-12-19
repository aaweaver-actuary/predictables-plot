import React from 'react';

/**
 * @component
 * @name Line
 * @description Line primitive component for drawing lines in SVG.
 * @param {object} props - The props for the component.
 * @param {number} props.x1 - The x-coordinate of the start of the line.
 * @param {number} props.y1 - The y-coordinate of the start of the line.
 * @param {number} props.x2 - The x-coordinate of the end of the line.
 * @param {number} props.y2 - The y-coordinate of the end of the line.
 * @param {string} props.color - The color of the line.
 * @param {number} props.width - The stroke width of the line.
 *
 * @returns {React.ReactNode} The SVG line element.
 */
const Line = ({ x1, y1, x2, y2, color = 'black', width = 1 }) => {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} />
  );
};

export default Line;
