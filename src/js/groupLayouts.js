import {
    svg,
    layout,
    layoutLines,
    layoutData,
} from './store/store';

/**
 * Groups layouts
 */
export default function()
{
    layout.appendChild(layoutLines);
    layout.appendChild(layoutData);
    svg.appendChild(layout);
}
