/**
 *  Layout
 */
export default class
{
    /**
     * @param {SVGSVGElement} svg
     */
    constructor(svg)
    {
        this._svg       = svg;
        this._group     = this._svg.lastElementChild;

        this._scale     = 10;
        this._translate = {x: 0, y: 0};
        this._maxOffset = 10;
        this._moved     = null;

        this._setEventScale();
        this._setEventTranslate();
    }

    /**
     *  Updates layout view
     */
    _updateTransform()
    {
        const scale      = this._scale / 10,
              translateX = Math.round(this._translate.x / scale),
              translateY = Math.round(this._translate.y / scale);
        this._group.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
    }

    /**
     *  Zoom in/out on wheel
     */
    _setEventScale()
    {
        this._svg.onwheel = e =>
        {
            let scale = this._scale + (e.deltaY < 0 ? 1 : -1);
            (scale <= 2)   && (scale = 2);
            (scale >= 100) && (scale = 100);
            this._scale = scale;
            this._updateTransform();
        };
    }

    /**
     *  Drag & Drop
     */
    _setEventTranslate()
    {
        document.onmouseup = () => (this._group.onmousemove = null);
        this._group.onmousedown = e =>
        {
            // Left mouse only
            if(e.which !== 1)
                return;
            const beforeMove = {x: e.clientX, y: e.clientY};
            let offset = {...beforeMove};
            this._moved = false;
            this._group.onmousemove = e =>
            {
                if(offset)
                {
                    if(    Math.abs(e.clientX - offset.x) <= this._maxOffset
                        && Math.abs(e.clientY - offset.y) <= this._maxOffset )
                        return;
                    this._moved = true;
                    offset      = null;
                }
                this._translate.x += e.clientX - beforeMove.x;
                this._translate.y += e.clientY - beforeMove.y;
                beforeMove.x = e.clientX;
                beforeMove.y = e.clientY;
                this._updateTransform();
            };
        };
    }

    /**
     *  On one node click
     */
    onNodeClick(callback)
    {
        this._svg.onclick = e =>
        {
            // Is valid target
            const targetClass   = e.target.getAttribute('class') || '',
                  isValidTarget = ['node', 'circle', 'text'].some(c => targetClass.includes(c));
            if(!isValidTarget)
                return;
            // Prevent on body click that closes sidebar
            e.stopPropagation();
            // Is group node
            const node      = e.target.parentNode,
                  nodeClass = node.getAttribute('class') || '';
            if(!nodeClass.includes('animated'))
                return;
            // Prevent sidebar opening after layout moving
            if(this._moved)
                return;
            // Callback
            callback(node);
        };
    }
}
