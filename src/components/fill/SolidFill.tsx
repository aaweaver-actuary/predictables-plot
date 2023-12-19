import React from 'react';
import SolidFillProps from '../../types/SolidFill.props';

/**
 * @component
 * @name SolidFill
 * @description SolidFill component to apply SolidFill styles to child SVG elements.
 * @param {object} props - The props for the component.
 * @param {string} props.strokeColor - The SolidFill stroke color.
 * @param {number} props.strokeWidth - The SolidFill stroke width.
 * @param {string} props.fillColor - The SolidFill color to apply.
 * @param {boolean} [props.overwrite=false] - Whether to overwrite existing SolidFill styles on children.
 * @param {number} [props.opacity=1] - The SolidFill opacity.
 * @param {React.ReactNode} props.children - The child elements to apply the SolidFill to.
 *
 * @returns React component with applied SolidFill styles.
 */
const SolidFill = ({
  strokeColor = '',
  strokeWidth = 0,
  fillColor = 'black',
  overwrite = false,
  opacity = 1,
  children,
}: SolidFillProps) => {
  const applySolidFillToChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    const newProps: any = {};
    if (overwrite || !child.props.SolidFill) {
      newProps.fillColor = fillColor;
    }
    if (overwrite || child.props.SolidFillOpacity === undefined) {
      newProps.SolidFillOpacity = opacity;
    }
    if (overwrite || child.props.SolidFillStrokeColor === undefined) {
      newProps.strokeColor = strokeColor;
    }
    if (overwrite || child.props.SolidFillStrokeWidth === undefined) {
      newProps.strokeWidth = strokeWidth;
    }

    return React.cloneElement(child, newProps);
  });

  return <>{applySolidFillToChildren}</>;
};

export default SolidFill;
