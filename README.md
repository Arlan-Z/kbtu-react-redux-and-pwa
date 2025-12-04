
# React HW

## Requirements

1. Add a valid manifest.json.
    - Name  
    - Short_name  
    - Start_url  
    - display: "standalone"  
    - theme_color + background_color  
    - icons (192×192 and 512×512)  
    - Manifest must be linked in index.html.

2. Register a Service Worker.
    - Register /service-worker.js from main.jsx.
    - Log success/error.
    - SW must control the page after reload.

3. Pre-cache the App Shell. In the install event, cache:
    - /index.html
    - built JS/CSS files
    - images/icons
    - any files needed to load the layout offline

4. Offline Support. When offline:
    - App shell must load
    - React Router navigation must work
    - API calls must show cached data (if any) or an offline message

5. Runtime Caching for Public API.
    - Cache list + details API responses using:
        - network-first  
        - or stale-while-revalidate
    - Do not cache private or authenticated endpoints.

6. Offline Fallback.
    - For navigation requests (mode: navigate), return cached /index.html.
    - Only cache public assets and public API calls.
