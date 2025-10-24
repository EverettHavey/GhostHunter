document.addEventListener('DOMContentLoaded', () => {
    const readingElement = document.getElementById('reading');
    const greenLed = document.getElementById('led-green');
    const yellowLed = document.getElementById('led-yellow');
    const redLed = document.getElementById('led-red');
    
    // Initial base reading for the 'background' EMF noise
    let currentReading = 0.5; 
    
    // Variables for the simulated 'Ghost' event
    let ghostNearby = false;
    let ghostIntensity = 0; // How strong the simulated 'ghost' signal is
    
    const BASE_FLUCTUATION = 0.5; // Normal background noise fluctuation
    const GHOST_EFFECT_MAX = 10.0; // Max reading when 'ghost' is active
    
    function updateMeter() {
        let fluctuation;
        
        // 1. Simulate Normal EMF Fluctuation
        // Add a small random change (positive or negative) to the base reading
        fluctuation = (Math.random() * BASE_FLUCTUATION) - (BASE_FLUCTUATION / 2);
        currentReading = Math.max(0, currentReading + fluctuation * 0.1); // Keep reading non-negative
        
        // 2. Simulate 'Ghost' Effect
        if (ghostNearby) {
            // Increase the 'ghost' intensity slowly towards a maximum
            ghostIntensity = Math.min(GHOST_EFFECT_MAX, ghostIntensity + Math.random() * 0.5); 
        } else {
            // Decrease the 'ghost' intensity back to zero
            ghostIntensity = Math.max(0, ghostIntensity - Math.random() * 0.3);
        }
        
        // Add the ghost intensity to the current reading
        let finalReading = currentReading + ghostIntensity;
        
        // 3. Update the Display (formatted to one decimal place)
        readingElement.textContent = finalReading.toFixed(1);
        
        // 4. Update the Status Lights and Color based on the final reading
        updateLights(finalReading);
    }
    
    function updateLights(reading) {
        // Reset all lights
        greenLed.classList.remove('active');
        yellowLed.classList.remove('active');
        redLed.classList.remove('active');
        
        // Reset color
        readingElement.style.color = '#00ff00'; // Default green
        
        if (reading < 2.0) {
            // Low/Normal reading
            greenLed.classList.add('active');
            
        } else if (reading >= 2.0 && reading < 5.0) {
            // Elevated reading (Warning)
            yellowLed.classList.add('active');
            readingElement.style.color = '#ffff00'; // Yellow
            
        } else {
            // High reading (Activity detected!)
            redLed.classList.add('active');
            readingElement.style.color = '#ff0000'; // Red
            
            // Add a subtle flicker/vibration effect on the reading text for high activity
            readingElement.style.textShadow = `0 0 ${Math.random() * 10 + 5}px #ff0000`;
        }
    }
    
    // Set a recurring interval for the meter update (fast, like a real meter)
    setInterval(updateMeter, 100); // Update every 100 milliseconds

    // --- Simulated 'Ghost' Event Trigger ---
    
    function simulateGhostEvent() {
        // Toggle the ghost status randomly to simulate it coming and going
        if (!ghostNearby) {
            // 20% chance to start a 'ghost' event if one isn't happening
            if (Math.random() < 0.2) { 
                ghostNearby = true;
                // Keep the event active for a random duration (e.g., 5 to 15 seconds)
                const duration = Math.random() * 10000 + 5000;
                console.log(`Ghost activity started for ${duration / 1000} seconds!`);
                
                setTimeout(() => {
                    ghostNearby = false;
                    console.log('Ghost activity fading...');
                }, duration);
            }
        }
    }

    // Check for a new ghost event every few seconds
    setInterval(simulateGhostEvent, 3000); 

    // Initial setup for the base reading color
    updateLights(currentReading);
});