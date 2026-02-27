
// // Function to get coordinates for each state
// function getStateCoordinates(state) {
//     const coordinates = {
//         'AL': { x: 1400, y: 830 },  // Alabama
//         'AK': { x: 300, y: 970 },   // Alaska
//         'AZ': { x: 510, y: 730 },   // Arizona
//         'AR': { x: 1180, y: 760 },  // Arkansas
//         'CA': { x: 250, y: 570 },   // California
//         'CO': { x: 740, y: 560 },   // Colorado
//         'CT': { x: 1850, y: 420 },  // Connecticut
//         'DE': { x: 1800, y: 515 },  // Delaware
//         'DC': { x: 1790, y: 550 },  // Washington DC
//         'FL': { x: 1600, y: 990 },  // Florida
//         'GA': { x: 1510, y: 820 },  // Georgia
//         'HI': { x: 650, y: 1110 },  // Hawaii
//         'ID': { x: 500, y: 320 },   // Idaho
//         'IL': { x: 1290, y: 520 },  // Illinois
//         'IN': { x: 1390, y: 520 },  // Indiana
//         'IA': { x: 1150, y: 440 },  // Iowa
//         'KS': { x: 980, y: 600 },   // Kansas
//         'KY': { x: 1440, y: 620 },  // Kentucky
//         'LA': { x: 1190, y: 910 },  // Louisiana
//         'ME': { x: 1860, y: 190 },  // Maine
//         'MD': { x: 1800, y: 570 },  // Maryland
//         'MA': { x: 1890, y: 310 },  // Massachusetts
//         'MI': { x: 1410, y: 370 },  // Michigan
//         'MN': { x: 1100, y: 260 },  // Minnesota
//         'MS': { x: 1290, y: 840 },  // Mississippi
//         'MO': { x: 1170, y: 600 },  // Missouri
//         'MT': { x: 660, y: 200 },   // Montana
//         'NE': { x: 950, y: 470 },   // Nebraska
//         'NV': { x: 380, y: 480 },   // Nevada
//         'NH': { x: 1770, y: 170 },  // New Hampshire
//         'NJ': { x: 1810, y: 460 },  // New Jersey
//         'NM': { x: 700, y: 750 },   // New Mexico
//         'NY': { x: 1700, y: 330 },  // New York
//         'NC': { x: 1650, y: 680 },  // North Carolina
//         'ND': { x: 930, y: 210 },   // North Dakota
//         'OH': { x: 1490, y: 490 },  // Ohio
//         'OK': { x: 1020, y: 730 },  // Oklahoma
//         'OR': { x: 310, y: 270 },   // Oregon
//         'PA': { x: 1650, y: 440 },  // Pennsylvania
//         'RI': { x: 1900, y: 400 },  // Rhode Island
//         'SC': { x: 1600, y: 760 },  // South Carolina
//         'SD': { x: 930, y: 340 },   // South Dakota
//         'TN': { x: 1400, y: 700 },  // Tennessee
//         'TX': { x: 960, y: 910 },   // Texas
//         'UT': { x: 550, y: 530 },   // Utah
//         'VT': { x: 1710, y: 190 },  // Vermont
//         'VA': { x: 1650, y: 590 },  // Virginia
//         'WA': { x: 350, y: 130 },   // Washington
//         'WV': { x: 1560, y: 560 },  // West Virginia
//         'WI': { x: 1260, y: 330 },  // Wisconsin
//         'WY': { x: 690, y: 380 }    // Wyoming
//     };
    
//     // Handle states with multiple states (like GA/SC)
//     if (state.includes('/')) {
//         const states = state.split('/');
//         // Use the first state for positioning
//         return coordinates[states[0].trim()] || { x: 0, y: 0 };
//     }
    
//     return coordinates[state] || { x: 0, y: 0 };
// }

// // Function to convert SVG coordinates to screen coordinates
// function getScreenPosition(svgX, svgY) {
//     const svg = document.querySelector('.cst_usa_map_wrapper svg');
//     if (!svg) return { x: 0, y: 0 };
    
//     // Create a point in SVG coordinate system
//     const point = svg.createSVGPoint();
//     point.x = svgX;
//     point.y = svgY;
    
//     // Convert to screen coordinates
//     const screenPoint = point.matrixTransform(svg.getScreenCTM());
    
//     return {
//         x: screenPoint.x,
//         y: screenPoint.y
//     };
// }

// // Function to setup pin interactions
// function setupPinInteractions() {
//     // Select all pins
//     const pins = document.querySelectorAll('.cst_pin');
    
//     pins.forEach(pin => {
//         const icon = pin.querySelector('.cst_pin_icon');
//         const popup = pin.querySelector('.modal-card-popup');
//         const closeBtn = pin.querySelector('.popup-cross-btn');
        
//         // Skip if this pin already has listeners
//         if (pin.hasAttribute('data-listener-attached')) return;
//         pin.setAttribute('data-listener-attached', 'true');

//         // Click on the pin
//         pin.addEventListener('click', (e) => {
//             e.stopPropagation();
            
//             // Get pin position
//             const pinRect = pin.getBoundingClientRect();
            
//             // Remove active class from all pin icons and hide all popups
//             document.querySelectorAll('.cst_pin_icon.active').forEach(i => i.classList.remove('active'));
//             document.querySelectorAll('.modal-card-popup.visible').forEach(p => p.classList.remove('visible'));
            
//             // Remove any temporary positioned popups
//             document.querySelectorAll('.modal-card-popup.positioned').forEach(p => {
//                 p.classList.remove('positioned');
//                 p.style.position = '';
//                 p.style.top = '';
//                 p.style.left = '';
//                 p.style.transform = '';
//             });

//             // Add active to this pin's icon
//             if (icon) icon.classList.add('active');
            
//             // Position and show this pin's popup
//             if (popup) {
//                 // Clone the popup for absolute positioning
//                 const popupClone = popup.cloneNode(true);
//                 popupClone.classList.add('visible', 'positioned');
//                 popupClone.style.position = 'fixed';
//                 popupClone.style.top = (pinRect.top - 300) + 'px'; // Position above the pin
//                 popupClone.style.left = (pinRect.left + (pinRect.width / 2) - 130) + 'px'; // Center horizontally (260/2 = 130)
//                 popupClone.style.transform = 'none';
//                 popupClone.style.zIndex = '100000';
                
//                 // Add close button functionality to clone
//                 const cloneCloseBtn = popupClone.querySelector('.popup-cross-btn');
//                 if (cloneCloseBtn) {
//                     cloneCloseBtn.addEventListener('click', (e) => {
//                         e.stopPropagation();
//                         popupClone.remove();
//                         if (icon) icon.classList.remove('active');
//                     });
//                 }
                
//                 document.body.appendChild(popupClone);
//             }
//         });

//         // Click on the original close button (if exists)
//         if (closeBtn) {
//             closeBtn.addEventListener('click', (e) => {
//                 e.stopPropagation();
//                 if (icon) icon.classList.remove('active');
                
//                 // Remove any positioned popups for this pin
//                 document.querySelectorAll('.modal-card-popup.positioned').forEach(p => p.remove());
//             });
//         }
//     });
    
//     // Click outside to close all popups
//     document.addEventListener('click', (e) => {
//         if (!e.target.closest('.cst_pin') && !e.target.closest('.modal-card-popup.positioned')) {
//             document.querySelectorAll('.cst_pin_icon.active').forEach(i => i.classList.remove('active'));
//             document.querySelectorAll('.modal-card-popup.positioned').forEach(p => p.remove());
//         }
//     });
// }

// // Function to place pins on the map
// function placePinsOnMap() {
//     // Get the SVG element
//     const svg = document.querySelector('.cst_usa_map_wrapper svg');
//     if (!svg) return;
    
//     // Clear any existing pin groups
//     document.querySelectorAll('.pin-group').forEach(g => g.remove());
    
//     // Get all pins
//     const pins = document.querySelectorAll('.cst_pin.cst_properties');
    
//     pins.forEach(pin => {
//         // Get the state from data-name attribute
//         const stateName = pin.getAttribute('data-name');
        
//         // Get coordinates for this state
//         const coords = getStateCoordinates(stateName);
        
//         // Create a group to hold the pin
//         const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
//         g.setAttribute("class", "pin-group");
//         g.setAttribute("transform", `translate(${coords.x - 10}, ${coords.y - 10})`);
        
//         // Create a circle as the visual pin (more reliable than foreignObject)
//         const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//         circle.setAttribute("cx", "10");
//         circle.setAttribute("cy", "10");
//         circle.setAttribute("r", "15");
//         circle.setAttribute("fill", "#4AB5BD");
//         circle.setAttribute("stroke", "#ffffff");
//         circle.setAttribute("stroke-width", "2");
//         circle.setAttribute("class", "svg-pin");
//         circle.setAttribute("data-state", stateName);
        
//         // Add click handler to circle
//         circle.addEventListener('click', (e) => {
//             e.stopPropagation();
            
//             // Get screen position of the circle
//             const screenPos = getScreenPosition(coords.x, coords.y);
            
//             // Remove all active classes and popups
//             document.querySelectorAll('.svg-pin.active').forEach(p => p.classList.remove('active'));
//             document.querySelectorAll('.modal-card-popup.positioned').forEach(p => p.remove());
            
//             // Add active class to this pin
//             circle.classList.add('active');
            
//             // Create and show popup
//             const popupClone = pin.querySelector('.modal-card-popup').cloneNode(true);
//             popupClone.classList.add('visible', 'positioned');
//             popupClone.style.position = 'fixed';
//             popupClone.style.top = (screenPos.y - 300) + 'px';
//             popupClone.style.left = (screenPos.x - 130) + 'px';
//             popupClone.style.transform = 'none';
//             popupClone.style.zIndex = '100000';
            
//             // Add close button functionality
//             const cloneCloseBtn = popupClone.querySelector('.popup-cross-btn');
//             if (cloneCloseBtn) {
//                 cloneCloseBtn.addEventListener('click', (e) => {
//                     e.stopPropagation();
//                     popupClone.remove();
//                     circle.classList.remove('active');
//                 });
//             }
            
//             document.body.appendChild(popupClone);
//         });
        
//         g.appendChild(circle);
//         svg.appendChild(g);
//     });
    
//     // Hide the original pins wrapper
//     const pinsWrapper = document.querySelector('.cst_pins_wrapper');
//     if (pinsWrapper) {
//         pinsWrapper.style.display = 'none';
//     }
// }

// // Function to adjust pin positions for multiple pins in same state
// function adjustPinPositions() {
//     const pinGroups = document.querySelectorAll('.pin-group');
//     const stateGroups = {};
    
//     // Group pins by state
//     pinGroups.forEach(group => {
//         const circle = group.querySelector('circle');
//         if (circle) {
//             const state = circle.getAttribute('data-state');
//             if (!stateGroups[state]) {
//                 stateGroups[state] = [];
//             }
//             stateGroups[state].push(group);
//         }
//     });
    
//     // Adjust positions for states with multiple pins
//     Object.keys(stateGroups).forEach(state => {
//         if (stateGroups[state].length > 1) {
//             const baseCoords = getStateCoordinates(state);
//             stateGroups[state].forEach((group, index) => {
//                 // Spread pins in a small circle around the base position
//                 const angle = (index * (360 / stateGroups[state].length)) * (Math.PI / 180);
//                 const radius = 35;
//                 const offsetX = Math.cos(angle) * radius;
//                 const offsetY = Math.sin(angle) * radius;
                
//                 group.setAttribute('transform', `translate(${baseCoords.x - 10 + offsetX}, ${baseCoords.y - 10 + offsetY})`);
//             });
//         }
//     });
// }

// // Initialize when DOM is loaded
// document.addEventListener('DOMContentLoaded', function() {
//     placePinsOnMap();
//     adjustPinPositions();
// });

// // Handle window resize
// window.addEventListener('resize', function() {
//     // Close all popups on resize to avoid misalignment
//     document.querySelectorAll('.modal-card-popup.positioned').forEach(p => p.remove());
//     document.querySelectorAll('.svg-pin.active').forEach(p => p.classList.remove('active'));
// });

// // Also run after a short delay to ensure everything is loaded
// setTimeout(function() {
//     if (!document.querySelector('.pin-group')) {
//         placePinsOnMap();
//         adjustPinPositions();
//     }
// }, 500);




// // // Function to convert SVG coordinates to screen coordinates
// function svgToScreen(svgX, svgY) {
//     const svg = document.querySelector('#svg');
//     if (!svg) return { x: svgX, y: svgY };
    
//     const point = svg.createSVGPoint();
//     point.x = svgX;
//     point.y = svgY;
    
//     const ctm = svg.getScreenCTM();
//     if (!ctm) return { x: svgX, y: svgY };
    
//     const screenPoint = point.matrixTransform(ctm);
//     const wrapper = document.querySelector('.cst_usa_map_wrapper');
//     const wrapperRect = wrapper.getBoundingClientRect();
    
//     return {
//         x: screenPoint.x - wrapperRect.left,
//         y: screenPoint.y - wrapperRect.top
//     };
// }

// // Function to get center point of a state path
// function getStateCenter(stateId) {
//     const statePath = document.querySelector(`path[data-id="${stateId}"]`);
//     if (!statePath) return null;
    
//     const bbox = statePath.getBBox();
//     const svgCenterX = bbox.x + (bbox.width / 2);
//     const svgCenterY = bbox.y + (bbox.height / 2);
    
//     return svgToScreen(svgCenterX, svgCenterY);
// }

// // Function to position pins on their states
// function positionPins() {
//     const pins = document.querySelectorAll('.cst_pin');
//     const wrapper = document.querySelector('.cst_usa_map_wrapper');
    
//     if (!wrapper) return;
    
//     pins.forEach(pin => {
//         const stateId = pin.getAttribute('data-name');
//         const center = getStateCenter(stateId);
        
//         if (center) {
//             pin.style.position = 'absolute';
//             pin.style.left = center.x + 'px';
//             pin.style.top = center.y + 'px';
//             pin.style.transform = 'translate(-50%, -50%)';
            
//             // Store coordinates for popup positioning
//             pin.dataset.x = center.x;
//             pin.dataset.y = center.y;
//         }
//     });
// }

// // Popup functionality
// function initPopups() {
//     const pins = document.querySelectorAll('.cst_pin');
//     const closeButtons = document.querySelectorAll('.popup-cross-btn');
    
//     // Close any open popup
//     function closeAllPopups() {
//         document.querySelectorAll('.modal-card-popup.visible').forEach(popup => {
//             popup.classList.remove('visible');
//         });
//         document.querySelectorAll('.cst_pin_icon.active').forEach(icon => {
//             icon.classList.remove('active');
//         });
//     }
    
//     // Open popup for specific pin
//     function openPopup(pin) {
//         // Close any other open popups first
//         closeAllPopups();
        
//         const popup = pin.querySelector('.modal-card-popup');
//         const icon = pin.querySelector('.cst_pin_icon');
        
//         if (popup && icon) {
//             popup.classList.add('visible');
//             icon.classList.add('active');
            
//             // Position the popup relative to the pin
//             positionPopup(pin);
//         }
//     }
    
//     // Position popup relative to its pin
//     function positionPopup(pin) {
//         const popup = pin.querySelector('.modal-card-popup');
//         if (!popup) return;
        
//         // Remove any existing positioned class
//         popup.classList.remove('positioned');
        
//         // Get pin position
//         const pinRect = pin.getBoundingClientRect();
//         const wrapper = document.querySelector('.cst_usa_map_wrapper');
//         const wrapperRect = wrapper.getBoundingClientRect();
        
//         // Calculate position relative to viewport for fixed positioning
//         const viewportX = pinRect.left;
//         const viewportY = pinRect.top - 284 - 10; // 284px is popup height, 10px gap
        
//         // Check if popup would go off screen
//         if (viewportY < 10) {
//             // Position below if not enough space above
//             popup.style.top = (pinRect.height + 20) + 'px';
//             popup.style.left = '50%';
//             popup.style.transform = 'translateX(-50%)';
//         } else {
//             // Position above
//             popup.style.top = '-284px';
//             popup.style.left = '50%';
//             popup.style.transform = 'translateX(-50%)';
//         }
//     }
    
//     // Add click handlers to pins
//     pins.forEach(pin => {
//         pin.addEventListener('click', function(e) {
//             e.stopPropagation();
//             openPopup(this);
//         });
//     });
    
//     // Add click handlers to close buttons
//     closeButtons.forEach(btn => {
//         btn.addEventListener('click', function(e) {
//             e.stopPropagation();
//             closeAllPopups();
//         });
//     });
    
//     // Close popup when clicking outside
//     document.addEventListener('click', function(e) {
//         if (!e.target.closest('.cst_pin') && !e.target.closest('.modal-card-popup')) {
//             closeAllPopups();
//         }
//     });
    
//     // Reposition popups on scroll/resize
//     window.addEventListener('scroll', function() {
//         const visiblePopup = document.querySelector('.modal-card-popup.visible');
//         if (visiblePopup) {
//             const pin = visiblePopup.closest('.cst_pin');
//             if (pin) positionPopup(pin);
//         }
//     });
    
//     window.addEventListener('resize', function() {
//         const visiblePopup = document.querySelector('.modal-card-popup.visible');
//         if (visiblePopup) {
//             const pin = visiblePopup.closest('.cst_pin');
//             if (pin) positionPopup(pin);
//         }
//     });
// }

// // Initialize everything
// document.addEventListener('DOMContentLoaded', function() {
//     positionPins();
//     initPopups();
// });

// window.addEventListener('resize', positionPins);
// window.addEventListener('scroll', positionPins);

// if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', function() {
//         positionPins();
//         initPopups();
//     });
// } else {
//     positionPins();
//     initPopups();
// }





// Function to convert SVG coordinates to screen coordinates
function svgToScreen(svgX, svgY) {
    const svg = document.querySelector('#svg');
    if (!svg) return { x: svgX, y: svgY };
    
    const point = svg.createSVGPoint();
    point.x = svgX;
    point.y = svgY;
    
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: svgX, y: svgY };
    
    const screenPoint = point.matrixTransform(ctm);
    const wrapper = document.querySelector('.cst_usa_map_wrapper');
    const wrapperRect = wrapper.getBoundingClientRect();
    
    return {
        x: screenPoint.x - wrapperRect.left,
        y: screenPoint.y - wrapperRect.top
    };
}

// Function to get center point of a state path
function getStateCenter(stateId) {
    const statePath = document.querySelector(`path[data-id="${stateId}"]`);
    if (!statePath) return null;
    
    const bbox = statePath.getBBox();
    const svgCenterX = bbox.x + (bbox.width / 2);
    const svgCenterY = bbox.y + (bbox.height / 2);
    
    return svgToScreen(svgCenterX, svgCenterY);
}

// Function to position pins in a circular pattern for states with multiple pins
function positionPins() {
    const pins = document.querySelectorAll('.cst_pin');
    const wrapper = document.querySelector('.cst_usa_map_wrapper');
    
    if (!wrapper) return;
    
    // Group pins by state
    const pinsByState = new Map();
    pins.forEach(pin => {
        const stateId = pin.getAttribute('data-name');
        if (!pinsByState.has(stateId)) {
            pinsByState.set(stateId, []);
        }
        pinsByState.get(stateId).push(pin);
    });
    
    // Position pins for each state
    pinsByState.forEach((statePins, stateId) => {
        const center = getStateCenter(stateId);
        if (!center) return;
        
        const totalPins = statePins.length;
        
        // If only one pin, place it at the center
        if (totalPins === 1) {
            const pin = statePins[0];
            pin.style.position = 'absolute';
            pin.style.left = center.x + 'px';
            pin.style.top = center.y + 'px';
            pin.style.transform = 'translate(-50%, -50%)';
            
            // Store coordinates for popup positioning
            pin.dataset.x = center.x;
            pin.dataset.y = center.y;
            return;
        }
        
        // For multiple pins, arrange them in a circle
        const radius = 8; // Distance from center (adjust as needed)
        
        statePins.forEach((pin, index) => {
            // Calculate angle for this pin (evenly spaced around the circle)
            const angle = (index / totalPins) * (2 * Math.PI); // Full circle in radians
            
            // Calculate offset from center
            const offsetX = Math.cos(angle) * radius;
            const offsetY = Math.sin(angle) * radius;
            
            // Position the pin
            pin.style.position = 'absolute';
            pin.style.left = (center.x + offsetX) + 'px';
            pin.style.top = (center.y + offsetY) + 'px';
            pin.style.transform = 'translate(-50%, -50%)';
            
            // Store coordinates for popup positioning
            pin.dataset.x = center.x + offsetX;
            pin.dataset.y = center.y + offsetY;
            
            // Store additional data for debugging/styling
            pin.dataset.pinIndex = index;
            pin.dataset.totalPins = totalPins;
            pin.dataset.angle = angle;
        });
    });
}

// Alternative: Staggered circular pattern (multiple rings for many pins)
function positionPinsWithMultipleRings() {
    const pins = document.querySelectorAll('.cst_pin');
    const wrapper = document.querySelector('.cst_usa_map_wrapper');
    
    if (!wrapper) return;
    
    
    // Group pins by state
    const pinsByState = new Map();
    pins.forEach(pin => {
        const stateId = pin.getAttribute('data-name');
        if (!pinsByState.has(stateId)) {
            pinsByState.set(stateId, []);
        }
        pinsByState.get(stateId).push(pin);
    });
    
    // Position pins for each state
    pinsByState.forEach((statePins, stateId) => {
        const center = getStateCenter(stateId);
        if (!center) return;
        
        const totalPins = statePins.length;
        
        // If only one pin, place it at the center
        if (totalPins === 1) {
            const pin = statePins[0];
            pin.style.position = 'absolute';
            pin.style.left = center.x + 'px';
            pin.style.top = center.y + 'px';
            pin.style.transform = 'translate(-50%, -50%)';
            
            pin.dataset.x = center.x;
            pin.dataset.y = center.y;
            return;
        }
        
        // Calculate number of rings needed
        const maxPinsPerRing = 8; // Maximum pins in outer ring
        const rings = Math.ceil(totalPins / maxPinsPerRing);
        
        statePins.forEach((pin, globalIndex) => {
            let ringIndex = 0;
            let pinsInCurrentRing = 0;
            let pinsProcessed = 0;
            
            // Determine which ring this pin belongs to
            for (let ring = 0; ring < rings; ring++) {
                const pinsInRing = Math.min(maxPinsPerRing, totalPins - pinsProcessed);
                if (globalIndex < pinsProcessed + pinsInRing) {
                    ringIndex = ring;
                    pinsInCurrentRing = pinsInRing;
                    break;
                }
                pinsProcessed += pinsInRing;
            }
            
            // Calculate position within its ring
            const indexInRing = globalIndex - pinsProcessed;
            const radius = 30 + (ringIndex * 25); // Increasing radius for outer rings
            const angle = (indexInRing / pinsInCurrentRing) * (2 * Math.PI);
            
            // Add offset to stagger rings
            if (ringIndex > 0) {
                // Offset angles in outer rings to avoid overlapping with inner rings
                const offsetAngle = (ringIndex * Math.PI) / pinsInCurrentRing;
                angle += offsetAngle;
            }
            
            const offsetX = Math.cos(angle) * radius;
            const offsetY = Math.sin(angle) * radius;
            
            // Position the pin
            pin.style.position = 'absolute';
            pin.style.left = (center.x + offsetX) + 'px';
            pin.style.top = (center.y + offsetY) + 'px';
            pin.style.transform = 'translate(-50%, -50%)';
            
            // Store coordinates for popup positioning
            pin.dataset.x = center.x + offsetX;
            pin.dataset.y = center.y + offsetY;
            pin.dataset.pinIndex = globalIndex;
            pin.dataset.totalPins = totalPins;
            pin.dataset.ring = ringIndex;
        });
    });
}

// Popup functionality (updated to handle circular positioned pins)
function initPopups() {
    const pins = document.querySelectorAll('.cst_pin');
    const closeButtons = document.querySelectorAll('.popup-cross-btn');
    
    // Close any open popup
    function closeAllPopups() {
        document.querySelectorAll('.modal-card-popup.visible').forEach(popup => {
            popup.classList.remove('visible');
        });
        document.querySelectorAll('.cst_pin_icon.active').forEach(icon => {
            icon.classList.remove('active');
        });
    }
    
    // Open popup for specific pin
    function openPopup(pin) {
        // Close any other open popups first
        closeAllPopups();
        
        const popup = pin.querySelector('.modal-card-popup');
        const icon = pin.querySelector('.cst_pin_icon');
        
        if (popup && icon) {
            popup.classList.add('visible');
            icon.classList.add('active');
            
            // Position the popup relative to the pin
            positionPopup(pin);
        }
    }
    
    // Position popup relative to its pin (updated to handle circular positioning)
    function positionPopup(pin) {
        const popup = pin.querySelector('.modal-card-popup');
        if (!popup) return;
        
        // Remove any existing positioned class
        popup.classList.remove('positioned');
        
        // Get pin position
        const pinRect = pin.getBoundingClientRect();
        
        // Calculate position relative to viewport for fixed positioning
        const viewportY = pinRect.top - 284 - 10; // 284px is popup height, 10px gap
        
        // Check if popup would go off screen
        if (viewportY < 10) {
            // Position below if not enough space above
            popup.style.top = (pinRect.height + 20) + 'px';
            popup.style.left = '50%';
            popup.style.transform = 'translateX(-50%)';
        } else {
            // Position above
            popup.style.top = '-284px';
            popup.style.left = '50%';
            popup.style.transform = 'translateX(-50%)';
        }
    }
    
    // Add click handlers to pins
    pins.forEach(pin => {
        // Remove existing listener to avoid duplicates
        pin.removeEventListener('click', openPopup);
        pin.addEventListener('click', function(e) {
            e.stopPropagation();
            openPopup(this);
        });
    });
    
    // Add click handlers to close buttons
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeAllPopups();
        });
    });
    
    // Close popup when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.cst_pin') && !e.target.closest('.modal-card-popup')) {
            closeAllPopups();
        }
    });
    
    // Reposition popups on scroll/resize
    window.addEventListener('scroll', function() {
        const visiblePopup = document.querySelector('.modal-card-popup.visible');
        if (visiblePopup) {
            const pin = visiblePopup.closest('.cst_pin');
            if (pin) positionPopup(pin);
        }
    });
    
    window.addEventListener('resize', function() {
        const visiblePopup = document.querySelector('.modal-card-popup.visible');
        if (visiblePopup) {
            const pin = visiblePopup.closest('.cst_pin');
            if (pin) positionPopup(pin);
        }
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    // Use the standard circular pattern
    positionPins();
    // OR use the multiple rings pattern for many pins (uncomment if needed)
    // positionPinsWithMultipleRings();
    initPopups();
});

window.addEventListener('resize', function() {
    positionPins();
    // If using multiple rings, uncomment the line below
    // positionPinsWithMultipleRings();
});

window.addEventListener('scroll', function() {
    positionPins();
    // If using multiple rings, uncomment the line below
    // positionPinsWithMultipleRings();
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        positionPins();
        initPopups();
    });
} else {
    positionPins();
    initPopups();
}
