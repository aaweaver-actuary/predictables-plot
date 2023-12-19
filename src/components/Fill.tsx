import FillProps from '../types/Fill.props';
import SolidFill from './fill/SolidFill';

/**
 * @component
 * @name Fill
 * @description Fill component to apply fill styles to child SVG elements.
 * @param {object} props - The props for the component.
 * @param {string} props.type - The type of fill to apply. Currently supported types are `solid`. Defaults to `solid`. Plans to include: `linear`, `radial`, `pattern`.
 * @param {string} props.strokeColor - The stroke color to apply to the children when the type is `solid`.
 * @param {number} props.strokeWidth - The stroke width to apply to the children when the type is `solid`.
 * @param {string} props.opacity - The fill opacity to apply to the children when the type is `solid`.
 * @param {string} props.fillColor - The fill color to apply to the children when the type is `solid`.
 * @param {number} [props.opacity=1] - The fill opacity to apply to the children when the type is `solid`.
 
* @param {boolean} [props.overwrite=false] - Whether to overwrite existing fill styles on children.
 * @param {React.ReactNode} props.children - The child elements to apply the fill to.
 *
 * @returns React component with applied fill styles.
 */
const Fill = ({
  type = 'solid',
  strokeColor = '',
  strokeWidth = 0,

  fillColor = 'black',

  opacity = 1,
  overwrite = false,
  children,
}: FillProps) => {
  return (
    type === 'solid' && (
      <SolidFill
        strokeColor={strokeColor}
        strokeWidth={strokeWidth}
        fillColor={fillColor}
        overwrite={overwrite}
        opacity={opacity}
      >
        {children}
      </SolidFill>
    )
  );
};

export default Fill;
