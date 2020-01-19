import marked from 'marked';
import {
    loader,
    content,
    transition,
} from './store/store';

let currentNode = null;// choosed node

/**
 *  Server request to get a new content
 *  @param {string} id
 */
const updateFromServer = async id =>
{
    const res = await fetch(`data/${id}/README.md`);
    content.innerHTML = res.ok
                        ? marked( await res.text() )
                        : 'Не удалось загрузить ресурс. Пожалуйста, попробуйте ещё раз';
    // Open all links in a new tab
    const links = content.getElementsByTagName('a');
    for(const link of links)
    {
        link.target = '_blank';
        link.rel    = 'nofollow noopener noreferrer';
    }
    loader.classList.add('hidden');    // hide loader
    content.classList.remove('hidden');// show content
};

/**
 *  @param {SVGSVGElement} node
 */
export default function(node)
{
    const id = node.dataset.id;

    /**
     * Focus on node and remove old focus
     */
    currentNode && currentNode.classList.remove('focused');
    node.classList.add('focused');
    currentNode = node;

    /**
     * Fetch markdown file by id and set it to content
     */
    // Open sidebar
    sidebar.classList.remove('hidden');
    // Prevent loading previously loaded content
    if(sidebar.dataset.id === id)
        return;
    // Save this content id for the action above
    sidebar.dataset.id = id;
    // On the first click there are no content in the sidebar
    // But then content exists, so hide it and show loader
    if(content.innerHTML)
    {
        content.classList.add('hidden');  // hide content
        loader.classList.remove('hidden');// show loader
        setTimeout(() => updateFromServer(id), transition * 1000);// make a request after animation
    }
    else
        updateFromServer(id);// make a request immediately
}
