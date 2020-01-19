import {
    sidebar,
    close,
} from './store/store';

const closeEvent = () =>
{
    if(!sidebar.classList.contains('hidden'))
        sidebar.classList.add('hidden');
};

/**
 * Closes sidebar
 */
export default function()
{
    // On close button click
    close.onclick = closeEvent;
    // Close opened sidebar on empty space click
    document.body.onclick = closeEvent;
    // Prevent on body click that closes sidebar
    sidebar.onclick = e => e.stopPropagation();
}
