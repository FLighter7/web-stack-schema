import data from '../data/data';

import {
    svg,
    sidebar,
} from './js/store/store';
import groupLayouts  from './js/groupLayouts';
import closeSidebar  from './js/closeSidebar';
import draw          from './js/draw';
import Layout        from './js/elements/Layout';
import updateContent from './js/updateContent';

// Add transition for sidebar
sidebar.classList.add('animated');
// Group layouts
groupLayouts();
// Set close sidebar event
closeSidebar();
// Draw nodes and lines
data.forEach(draw);
// Init layout
new Layout(svg).onNodeClick(updateContent);
