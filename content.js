/**
 * 🗺️ content.js - FINAL SOLUTION
 *
 * This version implements the final logic:
 * Scenario 1 ("rome map"): ONLY the blue button is injected next to the city name (name itself is not a link).
 * Scenario 2 ("rome"): The blue button is injected next to the Knowledge Panel title.
 */

// --- SELECTORS ---
// Scenario 1: Minimized Map Area (e.g., "rome map")
const MINIMIZED_MAP_CONTAINER_SELECTOR = 'div[style*="min-width:100%"] > div:first-child';
const LOCATION_LINK_CLASS = 'maps-link-wrapper'; // Retained only for clarity, not used in injection now
const MINIMIZED_MAP_BUTTON_CLASS = 'minimized-map-button'; 

// Scenario 2: Knowledge Panel Title (e.g., "rome")
const KNOWLEDGE_PANEL_TITLE_SELECTOR = 'div[data-attrid="title"]';
const UNIVERSAL_BUTTON_CLASS = 'universal-map-button';

function createMapsUrl(location) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
}

// --- FEATURE 1: Create ONLY Full Map Button (SCENARIO 1) ---

function createLocationLink(mainDiv) {
    // Check if the primary button for this scenario is present
    const boldContainer = mainDiv.querySelector('b');
    if (!boldContainer || boldContainer.querySelector(`a.${MINIMIZED_MAP_BUTTON_CLASS}`)) {
        return;
    }
    
    const innerContentDiv = boldContainer.querySelector('div');
    if (!innerContentDiv) return;

    const locationNameElement = innerContentDiv.querySelector('div:first-child');
    if (!locationNameElement) return;

    const locationName = locationNameElement.textContent.trim();
    if (!locationName) return;

    const mapUrl = createMapsUrl(locationName);
    
    // --- PART 2: Inject Isolated Full Map Button ---

    const fullMapButton = document.createElement('a');
    fullMapButton.href = mapUrl;
    fullMapButton.target = '_blank';
    fullMapButton.className = MINIMIZED_MAP_BUTTON_CLASS; 
    fullMapButton.textContent = "Open Full Map";
    
    // Apply styling
    fullMapButton.style.display = 'inline-block';
    fullMapButton.style.padding = '4px 8px';
    fullMapButton.style.marginLeft = '10px';
    fullMapButton.style.background = '#4285F4'; 
    fullMapButton.style.color = 'white';
    fullMapButton.style.borderRadius = '4px';
    fullMapButton.style.textDecoration = 'none';
    fullMapButton.style.fontWeight = 'bold';
    fullMapButton.style.cursor = 'pointer';
    fullMapButton.style.whiteSpace = 'nowrap';

    // Inject the button next to the location name block 
    boldContainer.insertBefore(fullMapButton, innerContentDiv.nextSibling);

    console.log(`[Maps Redirect] ONLY 'Open Full Map' button injected (Scenario 1).`);
}

// --- FEATURE 2: Create Universal Map Button (SCENARIO 2) ---

function createUniversalMapButton() {
    // Check if the primary button for this scenario is present
    if (document.querySelector(`a.${UNIVERSAL_BUTTON_CLASS}`)) {
        return;
    }
    
    const titleElement = document.querySelector(KNOWLEDGE_PANEL_TITLE_SELECTOR);
    if (!titleElement) return;

    const locationName = titleElement.textContent.trim() || 'Location Search';
    const mapUrl = createMapsUrl(locationName);

    // 2. Create the new link element
    const fullMapButton = document.createElement('a');
    fullMapButton.href = mapUrl;
    fullMapButton.target = '_blank';
    fullMapButton.className = UNIVERSAL_BUTTON_CLASS; 
    fullMapButton.textContent = "Open Full Map"; 
    
    // 3. Apply styling to ensure it sits nicely next to the title text
    fullMapButton.style.display = 'inline-block';
    fullMapButton.style.padding = '4px 8px';
    fullMapButton.style.marginLeft = '12px';
    fullMapButton.style.background = '#4285F4'; 
    fullMapButton.style.color = 'white';
    fullMapButton.style.borderRadius = '4px';
    fullMapButton.style.textDecoration = 'none';
    fullMapButton.style.fontWeight = 'bold';
    fullMapButton.style.cursor = 'pointer';
    fullMapButton.style.fontSize = '14px'; 
    fullMapButton.style.whiteSpace = 'nowrap';

    // Inject the button directly after the title element itself
    titleElement.parentElement.insertBefore(fullMapButton, titleElement.nextSibling);

    console.log(`[Maps Redirect] Universal 'Open Full Map' button injected (Scenario 2).`);
}

// --- Main Observation Loop (Final) ---
function observeDOM() {
    // Observer must run until the required element for the current page is found.
    const observer = new MutationObserver((mutationsList, observer) => {
        // SCENARIO 1 CHECK: Is the Minimized Map container present?
        const mainDiv = document.querySelector(MINIMIZED_MAP_CONTAINER_SELECTOR);
        
        // SCENARIO 2 CHECK: Is the Universal Title container present?
        const titleElement = document.querySelector(KNOWLEDGE_PANEL_TITLE_SELECTOR);

        // --- Execute Logic ---

        // Logic for SCENARIO 1: If mainDiv is present, run Feature 1.
        if (mainDiv) {
            // If the element is not already added, create it
            if (!mainDiv.querySelector(`a.${MINIMIZED_MAP_BUTTON_CLASS}`)) {
                createLocationLink(mainDiv);
            }
            // If the element is now present, we are done with this page load.
            if (mainDiv.querySelector(`a.${MINIMIZED_MAP_BUTTON_CLASS}`)) {
                observer.disconnect(); 
                console.log("Observer disconnected. Scenario 1 element found.");
            }
        } 
        
        // Logic for SCENARIO 2: If mainDiv is NOT present BUT titleElement IS present, run Feature 2.
        else if (titleElement) {
            // If the element is not already added, create it
            if (!document.querySelector(`a.${UNIVERSAL_BUTTON_CLASS}`)) {
                createUniversalMapButton();
            }
             // If the element is now present, we are done with this page load.
            if (document.querySelector(`a.${UNIVERSAL_BUTTON_CLASS}`)) {
                observer.disconnect(); 
                console.log("Observer disconnected. Scenario 2 element found.");
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

// Start the process
observeDOM();