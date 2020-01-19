import {createElement} from '../store/store';

export default class Line
{
    constructor(
        center,
        {
            x: x1,
            y: y1,
            r: r1,
        },
        {
            x: x2,
            y: y2,
            r: r2,
        },
    )
    {
        const {start, end} = this.getPoints({x1, y1, r1, x2, y2, r2}),
              line         = createElement('line',
              {
                class: 'line',
                x1: center.x + start.x,
                y1: center.y + start.y,
                x2: center.x + end.x,
                y2: center.y + end.y,
                'marker-end': 'url(#arrow)',
              });
        return line;
    }

    getPoints({
        x1, y1, r1,
        x2, y2, r2,
    })
    {
        const diffX = x2 - x1,
              diffY = y2 - y1,
              a     = Math.abs(diffX),
              b     = Math.abs(diffY);
        // Special angles
        if([diffX, diffY].includes(0))
        {
            // 90 & 270
            if(!diffX)
            {
                return {
                    start: {x: x1, y: y1 + (diffY > 0 ? r1 : -r1)},
                    end:   {x: x2, y: y2 + (diffY > 0 ? -r2 : r2)},
                }
            }
            // 0 & 180
            if(!diffY)
            {
                return {
                    start: {y: y1, x: x1 + (diffX > 0 ? r1 : -r1)},
                    end:   {y: y2, x: x2 + (diffX > 0 ? -r2 : r2)},
                }
            }
        }
        // Other angles
        else
        {
            const angles = this.getAngles(a, b),
                  angle = angles.B;
            return {
                start: this.findPointThroughSector({x1, x2, y1, y2, angle, r: r1}),
                end: this.findPointThroughSector({
                    x1: x2,
                    y1: y2,
                    x2: x1,
                    y2: y1,
                    angle,
                    r: r2,
                }),
            }
        }
    }

    /**
     * Finds angles of a triangle
     * @param {number} a
     * @param {number} b
     * 
     * @return { {A: number, B: number, C: number} }
     */
    getAngles(a, b)
    {
        const c = Math.sqrt( Math.pow(a, 2) + Math.pow(b, 2) ),// hypotenuse
              A = 180 * Math.acos( (b * b + c * c - a * a) / (2 * b * c) ) / Math.PI,
              B = 180 * Math.acos( (a * a + c * c - b * b) / (2 * a * c) ) / Math.PI,
              C = 180 * Math.acos( (a * a + b * b - c * c) / (2 * a * b) ) / Math.PI;
        return {A, B, C};
    }

    findPointThroughSector({x1, y1, x2, y2, angle, r})
    {
        // Try to get points
        let pointX = 0,
            pointY = y1;
        // Right
        if(x2 > x1)
        {
            pointX = x1 + r;
            angle = y2 < y1
                        ? -angle// top (0-90)
                        : angle;// bottom (270-360)
        }
        // Left
        else
        {
            pointX = x1 - r;
            angle = y2 < y1
                        ? angle  // top (90-180)
                        : -angle;// bottom (180-270)
        }
        return this.findPoint({
            centerX: x1,
            centerY: y1,
            pointX,
            pointY,
            angle,
        });
    }

    /**
     * Gets coordinates of the point on the arc
     * 
     * @typedef {O}
     * @property {number} centerX // center X of the circle
     * @property {number} centerY // center Y of the circle
     * @property {number} pointX  // some point X on the circle
     * @property {number} pointY  // some point Y on the circle
     * @property {number} angle
     * 
     * @param {O} args
     * 
     * @return { {x: number, y: number} }
     */
    findPoint({centerX, centerY, pointX, pointY, angle})
    {
        const angleRad = angle * Math.PI / 180,
              rx  = pointX - centerX,
              ry  = pointY - centerY,
              cos = Math.cos(angleRad),
              sin = Math.sin(angleRad),
              x   = centerX + rx * cos - ry * sin,
              y   = centerY + rx * sin + ry * cos;
        return {x, y};
    }
}
