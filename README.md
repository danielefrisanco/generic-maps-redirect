# 🗺️ Generic Map Link Chrome Extension

This Chrome extension enhances the Google Search experience by injecting an "Open Full Map" button directly into the search results for locations, ensuring you can quickly jump to the full, interactive map whenever location data is available.

---

## ✨ Features

This extension addresses the frustrating inconsistency of Google Search results by providing a reliable way to view the full map interface.

* **Universal Button Injection:** A high-visibility "Open Full Map" button is injected into the knowledge panel for city, place, and location searches.
* **Two Scenario Coverage:**
    1.  **Search with Map Widget (e.g., "Rome map"):** The button appears next to the city name in the minimal map container.
    2.  **Standard Knowledge Panel (e.g., "Rome"):** The button appears next to the main title heading, ensuring easy access even when the minimal map is not present.
* **Clean and Focused:** The extension is lightweight, runs only on Google search pages, and avoids creating unnecessary console spam.

---

## 🛠️ Installation

### 1. Download

1.  Clone this repository or download the source code zip file.
2.  Unzip the files into a dedicated folder (e.g., `generic-map-link-extension`).

### 2. Install in Chrome

1.  Open Chrome and navigate to `chrome://extensions`.
2.  Toggle **Developer mode** on (usually located in the top right corner).
3.  Click the **Load unpacked** button.
4.  Select the folder containing your extension files (e.g., `generic-map-link-extension`).

The extension is now active!

---

## ⚙️ How It Works

The core of the extension is the `content.js` script, which uses the **MutationObserver API** to watch for dynamic changes in the Google Search DOM (Document Object Model).

The logic is split into two distinct, non-conflicting scenarios:

1.  **Scenario 1 (Minimized Map Injector):**
    * **Target Selector:** `div[style*="min-width:100%"] > div:first-child`
    * **Action:** Injects the blue button next to the location name text within the map widget's container. The city name text itself remains untouched (not a link).

2.  **Scenario 2 (Universal Title Injector):**
    * **Target Selector:** `div[data-attrid="title"]`
    * **Action:** Injects the blue button immediately following the main Knowledge Panel title.

The observer disconnects immediately once the button for the appropriate scenario is successfully injected, ensuring minimal performance impact.

---

## 📝 Code Example (Styling)

The visual styling for the injected button is applied directly in the JavaScript for high visibility and consistency:

```javascript
fullMapButton.style.display = 'inline-block';
fullMapButton.style.padding = '4px 8px';
fullMapButton.style.marginLeft = '12px';
fullMapButton.style.background = '#4285F4'; // Google Blue
fullMapButton.style.color = 'white';
// ... other styles for text, border-radius, etc.