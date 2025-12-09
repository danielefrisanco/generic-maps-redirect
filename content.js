/**
 * 🗺️ content.js - Final Robust Version
 *
 * Targets the map snippet's location name based on its unique structure (style and <b> tag)
 * and wraps the content in a link to Google Maps.
 */

// A highly stable selector for the main content block that contains the location info.
// This targets the DIV that is the first child of the DIV with the inline style min-width:100%.
const MAIN_INFO_CONTAINER_SELECTOR = 'div[style*="min-width:100%"] > div:first-child';
const LINK_CLASS = 'maps-link-wrapper';

/**
 * Creates the Google Maps URL for the given location.
 * @param {string} location - The location name for the map query.
 * @returns {string} The full Google Maps URL.
 */
function createMapsUrl(location) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
}

/**
 * Finds the location name element and modifies the DOM to create a link.
 * @param {HTMLElement} mainDiv - The main container element.
 */
function createLink(mainDiv) {
    // Check if the link has already been created
    if (mainDiv.querySelector(`a.${LINK_CLASS}`)) {
        return;
    }

    // 1. Find the <b> tag, which wraps the city name and address.
    const boldContainer = mainDiv.querySelector('b');
    if (!boldContainer) {
        return; 
    }
    
    // 2. The immediate child of <b> holds the city and address info.
    const innerContentDiv = boldContainer.querySelector('div');
    if (!innerContentDiv) {
        return;
    }

    // 3. The location name is the text content of the first nested div (e.g., "Trento").
    // We grab the text content from the first child div of innerContentDiv.
    const locationNameElement = innerContentDiv.querySelector('div:first-child');
    if (!locationNameElement) {
         return;
    }

    const locationName = locationNameElement.textContent.trim();
    if (!locationName) {
        return;
    }

    const mapUrl = createMapsUrl(locationName);
    
    // 4. Create the new anchor element
    const linkElement = document.createElement('a');
    linkElement.href = mapUrl;
    linkElement.target = '_blank'; // Open in a new tab
    linkElement.className = LINK_CLASS; 
    
    // 5. Move all children of the innerContentDiv (city name + address) into the new link
    while (innerContentDiv.firstChild) {
        linkElement.appendChild(innerContentDiv.firstChild);
    }
    
    // 6. Replace the old content inside innerContentDiv with the new link
    innerContentDiv.appendChild(linkElement);

    // Apply styling to show it's clickable
    linkElement.style.textDecoration = 'none'; 
    linkElement.style.color = 'inherit';
    linkElement.style.cursor = 'pointer';

    console.log(`[Generic Maps Redirect] Link created for: ${locationName}`);
}

/**
 * Observes the DOM for the map snippet to appear, as it's loaded dynamically.
 */
function observeDOM() {
    // Start observing immediately
    const observer = new MutationObserver((mutationsList, observer) => {
        // Find the main information container using the stable attribute selector
        const mainDiv = document.querySelector(MAIN_INFO_CONTAINER_SELECTOR);
        
        if (mainDiv) {
            // We found the stable parent structure. Now try to create the link.
            createLink(mainDiv);
            
            // If the link was successfully created, stop observing.
            if (mainDiv.querySelector(`a.${LINK_CLASS}`)) {
                 observer.disconnect(); 
            }
        }
    });

    // Start observing the entire document body for changes
    observer.observe(document.body, { childList: true, subtree: true });
}

// Start the process
observeDOM();