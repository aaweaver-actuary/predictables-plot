import pointProps from '../../types/Point.props';
// import Dot from './points/Dot.point';
// import Square from './points/Square.point';
// import Triangle from './points/Triangle.point';
// import Diamond from './points/Diamond.point';
// import Star from './points/Star.point';
// import Cross from './points/Cross.point';

/**
 * @component Point
 * A point on a coordinate plane. This is a primative component from which other components or plots can be built.
 *
 * @param x - the x coordinate of the center of the point
 * @param y - the y coordinate of the center of the point
 * @param type - the type of the point. Defaults to circle. Other options include square, triangle, and diamond.
 * @param radius - the radius of the point in pixels. Defaults to 3. Has no effect unless type is circle.
 * @param sideLength - the side length of the point in pixels. Defaults to 3. Has no effect unless type is square, triangle, diamond, star, cross
 * @param strokeColor - the color of the edge of the point. Defaults to no color.
 * @param strokeWidth - the width of the edge of the point in pixels. Defaults to 1.
 * @param fillColor - the color of the fill of the point. Defaults to black.
 * @param opacity - the opacity of the point. Defaults to 1.
 * @returns A point on a coordinate plane. This is a primative component from which other components or plots can be built.
 * @example
 * <Point x={10} y={10} />
 * This will render a point at the coordinates (10, 10).
 * @example
 * <Point x={10} y={10} type="square" />
 * This will render a square point at the coordinates (10, 10).
 * @example
 * <Point x={10} y={10} type="triangle" />
 * This will render a triangle point at the coordinates (10, 10).
 * @example
 * <Point x={10} y={10} type="diamond" />
 * This will render a diamond point at the coordinates (10, 10).
 * @example
 * <Point x={10} y={10} type="star" />
 * This will render a star point at the coordinates (10, 10).
 * @example
 * <Point x={10} y={10} type="cross" />
 * This will render a cross point at the coordinates (10, 10).
 */
const Point = ({
  x,
  y,
  type = 'circle',
  radius = 6,
  sideLength = 6,
  strokeColor = '',
  strokeWidth = 1,
  fillColor = 'black',
  opacity = 1,
}: pointProps) => {
  const pointStyle = {
    stroke: strokeColor,
    strokeWidth: strokeWidth,
    fill: fillColor,
    opacity: opacity,
  };

  const pointStyleNoOutline = {
    stroke: 'none',
    strokeWidth: 0,
    fill: fillColor,
    opacity: opacity,
  };

  // Raise an error if the style is not one of the supported styles
  if (
    !['circle', 'square', 'triangle', 'diamond', 'star', 'cross', 'x'].includes(
      type,
    )
  ) {
    throw new Error(`The style ${type} is not supported.`);
  }

  const rightTri45 = (sideLength: number) => {
    return sideLength * Math.sin(Math.PI / 4);
  };

  return (
    <>
      {/* Circle */}
      {type === 'circle' && (
        <circle
          cx={x}
          cy={y}
          r={radius}
          style={pointStyle}
          aria-label="Circle Point Shape"
        />
      )}
      {/* Square */}
      {type === 'square' && (
        <rect
          x={x - sideLength / 2}
          y={y - sideLength / 2}
          width={sideLength}
          height={sideLength}
          style={pointStyle}
          aria-label="Square Point Shape"
        />
      )}
      {/* Triangle */}
      {type === 'triangle' && (
        <polygon
          points={`${x},${y - sideLength / 2} ${x + sideLength / 2},${
            y + sideLength / 2
          } ${x - sideLength / 2},${y + sideLength / 2}`}
          style={pointStyle}
          aria-label="Triangle Point Shape"
        />
      )}
      {/* Diamond */}
      {type === 'diamond' && (
        <polygon
          points={`${x},${y + rightTri45(sideLength / 2)} ${
            x + rightTri45(sideLength / 2)
          },${y} ${x},${y - rightTri45(sideLength / 2)} ${
            x - rightTri45(sideLength / 2)
          },${y}`}
          style={pointStyle}
          aria-label="Diamond Point Shape"
        />
      )}
      {/* Star */}
      {type === 'star' && (
        <polygon
          points={`${x},${y - sideLength / 2} ${x + sideLength / 2},${
            y + sideLength / 2
          } ${x},${y} ${x - sideLength / 2},${y + sideLength / 2}`}
          style={pointStyle}
          aria-label="Star Point Shape"
        />
      )}
      {/* Cross */}
      {type === 'cross' && (
        <g aria-label="Cross Point Shape">
          <g style={pointStyle}>
            <rect
              x={x - sideLength / 2}
              y={y - sideLength / 10}
              width={sideLength}
              height={sideLength / 5}
            ></rect>
            <rect
              x={x - sideLength / 10}
              y={y - sideLength / 2}
              width={sideLength / 5}
              height={sideLength}
            ></rect>
          </g>
          <g style={pointStyleNoOutline}>
            <rect
              x={x - sideLength / 2}
              y={y - sideLength / 10}
              width={sideLength}
              height={sideLength / 5}
            ></rect>
            <rect
              x={x - sideLength / 10}
              y={y - sideLength / 2}
              width={sideLength / 5}
              height={sideLength}
            ></rect>
          </g>
        </g>
      )}
      {/* X */}
      {/* {type === 'x' && (
        <line
          x1={x - sideLength / 2}
          y1={y - sideLength / 2}
          x2={x + sideLength / 2}
          y2={y + sideLength / 2}
          style={pointStyle}
          aria-label="X Point Shape"
        />
      )} */}
    </>
  );
};

export default Point;
