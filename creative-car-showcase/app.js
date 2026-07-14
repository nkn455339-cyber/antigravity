// -------------------------------------------------------------
// AETHER MOTORS - INTERACTIVE LOGIC & ANIMATIONS
// -------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // DATA SYSTEMS
  // ==========================================
  
  const vehicleData = {
    apex: {
      name: 'APEX ONE',
      badge: 'HYPERCLASS ELECTRIC',
      desc: 'An absolute track monster engineered for road legality. The Apex One utilizes quad solid-state motors and active floor-effect aerodynamics to rewrite performance standards.',
      drag: '0.19 Cd',
      weight: '1,680 KG',
      accel: 1.74, // 0-60 in seconds
      range: 520,  // max range in miles
      speed: 265,  // top speed in mph
      power: 1900, // horsepower
      image: 'images/apex_hypercar.jpg',
      features: [
        { icon: '⚡', title: 'Quad Motor Torque Vectoring', desc: 'Instant power delivery to all wheels independently.' },
        { icon: '🌀', title: 'Active Ground Effects', desc: 'Underbody tunnels generate downforce without drag penalty.' }
      ]
    },
    aether: {
      name: 'AETHER GT',
      badge: 'LUXURY GRAND TOURER',
      desc: 'The ultimate grand tourer designed for trans-continental journeys. Combining an intelligent active suspension cabin with long-range solar glass charging panels.',
      drag: '0.21 Cd',
      weight: '1,920 KG',
      accel: 2.95,
      range: 750,
      speed: 210,
      power: 1200,
      image: 'images/aether_gt.jpg',
      features: [
        { icon: '☀️', title: 'Solar Glass Roof Panels', desc: 'Replenish up to 45 miles of range daily under sunlight.' },
        { icon: '☁️', title: 'Active Acoustic Ride', desc: 'Electromagnetic suspension absorbs road imperfections dynamically.' }
      ]
    },
    helios: {
      name: 'HELIOS SUV',
      badge: 'SOLAR UTILITY VEHICLE',
      desc: 'An expedition-grade solar vehicle combining supreme off-road ruggedness with first-class lounge comfort. Built with a biological air-filter cabin.',
      drag: '0.29 Cd',
      weight: '2,350 KG',
      accel: 4.10,
      range: 640,
      speed: 165,
      power: 950,
      image: 'images/helios_suv.jpg',
      features: [
        { icon: '🏔️', title: 'Bio-Chassis Construction', desc: 'Eco-sustainable light alloys providing robust rollover protection.' },
        { icon: '🏕️', title: 'Expandable Solar Wings', desc: 'Retractable panels deliver auxiliary power when stationary.' }
      ]
    }
  };

  const accentColors = {
    blue: { primary: '#00f3ff', glow: 'rgba(0, 243, 255, 0.35)', name: 'Cyber Blue Accent Active' },
    red: { primary: '#ff0055', glow: 'rgba(255, 0, 85, 0.35)', name: 'Lava Red Accent Active' },
    gold: { primary: '#ffb700', glow: 'rgba(255, 183, 0, 0.35)', name: 'Solar Gold Accent Active' },
    green: { primary: '#39ff14', glow: 'rgba(57, 255, 20, 0.35)', name: 'Acid Green Accent Active' }
  };

  // State Variables
  let currentModel = 'apex';
  let currentColor = 'blue';

  // ==========================================
  // DOM ELEMENTS
  // ==========================================
  
  // Navbar
  const navbar = document.getElementById('main-nav');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  
  // Model Showcase
  const tabButtons = document.querySelectorAll('.tab-btn');
  const badgeDisplay = document.getElementById('model-badge');
  const nameDisplay = document.getElementById('model-name-display');
  const descDisplay = document.getElementById('model-desc-display');
  const featuresDisplay = document.getElementById('model-features-display');
  const mainImage = document.getElementById('showcase-main-image');
  const dragDisplay = document.getElementById('drag-coeff-value');
  const weightDisplay = document.getElementById('weight-value');
  const colorNameText = document.getElementById('color-name-text');
  
  // Spec Gauges
  const accelGauge = document.getElementById('accel-gauge');
  const accelVal = document.getElementById('accel-value');
  const rangeBar = document.getElementById('range-bar');
  const rangeVal = document.getElementById('range-value');
  const speedBar = document.getElementById('speed-bar');
  const speedVal = document.getElementById('speed-value');
  const powerBar = document.getElementById('power-bar');
  const powerVal = document.getElementById('power-value');
  
  // Color Swatches
  const showcaseSwatches = document.querySelectorAll('#color-swatches-container .swatch');
  const formSwatches = document.querySelectorAll('#form-color-swatches-selector .form-swatch');

  // Simulator
  const simVehicleSelect = document.getElementById('sim-vehicle-select');
  const simModeButtons = document.querySelectorAll('.mode-toggle-btn');
  const simToggleAero = document.getElementById('toggle-aero');
  const simToggleRegen = document.getElementById('toggle-regen');
  const simToggleLaunch = document.getElementById('toggle-launch');
  const simBatterySlider = document.getElementById('battery-slider');
  const simBatteryValue = document.getElementById('battery-slider-value');
  
  const simOutputAccel = document.getElementById('sim-output-accel');
  const simOutputRange = document.getElementById('sim-output-range');
  const simOutputPower = document.getElementById('sim-output-power');
  const simOutputDrag = document.getElementById('sim-output-drag');
  
  const simSubAccel = document.getElementById('sim-sub-accel');
  const simSubRange = document.getElementById('sim-sub-range');
  const simSubPower = document.getElementById('sim-sub-power');
  const simSubDrag = document.getElementById('sim-sub-drag');
  
  const torqueCanvas = document.getElementById('torqueChart');

  // Cockpit Hotspots
  const hotspots = document.querySelectorAll('.hotspot');
  const tooltipCard = document.getElementById('hotspot-tooltip-card');
  const tooltipTitle = document.getElementById('tooltip-title-text');
  const tooltipDesc = document.getElementById('tooltip-desc-text');
  const tooltipClose = document.getElementById('tooltip-close-action');
  
  // Configurator Form
  const formElement = document.getElementById('vehicle-configurator-form');
  const formModelSelect = document.getElementById('form-model');
  const formTrimSelect = document.getElementById('form-trim');
  const priceBase = document.getElementById('price-base');
  const priceUpgrades = document.getElementById('price-upgrades');
  const priceTotal = document.getElementById('price-total');
  const priceDeposit = document.getElementById('price-deposit');
  const formSuccessView = document.getElementById('form-success-view');
  const formResetBtn = document.getElementById('form-reset-btn');

  // ==========================================
  // NAVIGATION ACTIONS
  // ==========================================
  
  // Scroll Listener for Navbar tinting
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  mobileToggle.addEventListener('click', () => {
    navbar.classList.toggle('mobile-menu-active');
  });

  // Close Mobile Menu on Link Click
  document.querySelectorAll('.nav-link, .nav-btn').forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('mobile-menu-active');
    });
  });

  // ==========================================
  // ACCENT COLOR CONTROLLERS
  // ==========================================
  
  function applyColorTheme(colorKey) {
    currentColor = colorKey;
    const theme = accentColors[colorKey];
    
    // Set custom CSS variables on :root
    document.documentElement.style.setProperty('--accent-color', theme.primary);
    document.documentElement.style.setProperty('--accent-glow', theme.glow);
    
    // Update descriptive text
    colorNameText.textContent = theme.name;
    
    // Update active swatch class on all swatches
    showcaseSwatches.forEach(swatch => {
      if (swatch.dataset.color === colorKey) {
        swatch.classList.add('active');
      } else {
        swatch.classList.remove('active');
      }
    });

    formSwatches.forEach(swatch => {
      if (swatch.dataset.color === colorKey) {
        swatch.classList.add('active');
      } else {
        swatch.classList.remove('active');
      }
    });

    // Update current active visual elements tint (canvas path color is updated dynamically in draw loop)
  }

  showcaseSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      applyColorTheme(swatch.dataset.color);
    });
  });

  formSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      applyColorTheme(swatch.dataset.color);
    });
  });

  // ==========================================
  // VEHICLE SHOWCASE LOGIC
  // ==========================================
  
  function updateModelShowcase(modelKey) {
    currentModel = modelKey;
    const data = vehicleData[modelKey];
    
    // Update buttons
    tabButtons.forEach(btn => {
      if (btn.dataset.model === modelKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    
    // Fade out text elements briefly before swapping
    const textEls = [badgeDisplay, nameDisplay, descDisplay, featuresDisplay, dragDisplay, weightDisplay];
    textEls.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(5px)';
      el.style.transition = 'all 0.2s';
    });

    // Fade out image
    mainImage.style.opacity = '0.3';
    mainImage.style.transform = 'scale(0.97)';
    mainImage.style.transition = 'all 0.3s';

    setTimeout(() => {
      // Swap content details
      badgeDisplay.textContent = data.badge;
      nameDisplay.textContent = data.name;
      descDisplay.textContent = data.desc;
      dragDisplay.textContent = data.drag;
      weightDisplay.textContent = data.weight;
      
      // Features bullets render
      featuresDisplay.innerHTML = data.features.map(f => `
        <div class="bullet-item">
          <span class="bullet-icon">${f.icon}</span>
          <div>
            <strong>${f.title}</strong>
            <p>${f.desc}</p>
          </div>
        </div>
      `).join('');
      
      // Update image
      mainImage.src = data.image;
      mainImage.alt = `${data.name} Visual`;
      
      // Animate them back in
      textEls.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
      mainImage.style.opacity = '1';
      mainImage.style.transform = 'scale(1)';

      // Animate Gauges & Bars
      animateSpecGauges(data);

      // Sync form selector if not already configured
      if (formModelSelect.value !== modelKey) {
        formModelSelect.value = modelKey;
        calculateFormPrice();
      }
      
      // Sync simulator selector
      if (simVehicleSelect.value !== modelKey) {
        simVehicleSelect.value = modelKey;
        runPerformanceSimulation();
      }
    }, 250);
  }

  function animateSpecGauges(data) {
    // 1. Circular Acceleration Gauge
    // Circumference is 251. Math range: 1.0s (full/0 offset) to 5.0s (empty/251 offset)
    // Map acceleration 1.74s - 4.10s to progress offset
    const maxA = 5.0;
    const minA = 1.0;
    const accelPercentage = 1 - ((data.accel - minA) / (maxA - minA));
    const offset = 251 - (251 * Math.min(Math.max(accelPercentage, 0), 1));
    
    accelGauge.style.strokeDashoffset = offset;
    accelVal.textContent = `${data.accel.toFixed(2)}s`;
    
    // 2. Range Bar
    const rangePercent = (data.range / 800) * 100;
    rangeBar.style.width = `${rangePercent}%`;
    rangeVal.textContent = `${data.range} MILES`;
    
    // 3. Speed Bar
    const speedPercent = (data.speed / 300) * 100;
    speedBar.style.width = `${speedPercent}%`;
    speedVal.textContent = `${data.speed} MPH`;
    
    // 4. Power Bar
    const powerPercent = (data.power / 2000) * 100;
    powerBar.style.width = `${powerPercent}%`;
    powerVal.textContent = `${data.power} HP`;
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      updateModelShowcase(btn.dataset.model);
    });
  });

  // Initialize Showcase spec gauges
  animateSpecGauges(vehicleData.apex);

  // ==========================================
  // PERFORMANCE SIMULATOR
  // ==========================================
  
  let currentSimMode = 'sport';

  // Listeners
  simVehicleSelect.addEventListener('change', () => {
    // Sync fleet showcase
    updateModelShowcase(simVehicleSelect.value);
    runPerformanceSimulation();
  });

  simModeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      simModeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSimMode = btn.dataset.mode;
      runPerformanceSimulation();
    });
  });

  [simToggleAero, simToggleRegen, simToggleLaunch].forEach(el => {
    el.addEventListener('change', runPerformanceSimulation);
  });

  simBatterySlider.addEventListener('input', () => {
    simBatteryValue.textContent = `${simBatterySlider.value}%`;
    runPerformanceSimulation();
  });

  // Simulation Logic
  function runPerformanceSimulation() {
    const base = vehicleData[simVehicleSelect.value];
    
    let simulatedAccel = base.accel;
    let simulatedRange = base.range;
    let simulatedPower = base.power;
    
    // Extract base drag coefficient numerical value
    let simulatedDrag = parseFloat(base.drag);

    // Apply Drive Modes
    switch (currentSimMode) {
      case 'comfort':
        simSubPower.textContent = 'Standard Power Curve Active';
        simSubAccel.textContent = 'Normal launch parameters';
        break;
      case 'sport':
        simulatedPower *= 1.15;
        simulatedRange *= 0.90;
        simulatedAccel *= 0.92;
        simSubPower.textContent = 'Throttle Mapping Heightened (+15% HP)';
        simSubAccel.textContent = 'Engine overclocked (+8% Acceleration)';
        break;
      case 'track':
        simulatedPower *= 1.30;
        simulatedRange *= 0.75;
        simulatedAccel *= 0.85;
        simSubPower.textContent = 'Max Unlocked Track Output (+30% HP)';
        simSubAccel.textContent = 'Ultimate Launch Response';
        break;
      case 'range':
        simulatedPower *= 0.85;
        simulatedRange *= 1.20;
        simulatedAccel *= 1.15;
        simSubPower.textContent = 'Power Caps Deployed (-15% HP)';
        simSubAccel.textContent = 'Efficiency-focused motor mapping';
        break;
    }

    // Apply Sub-systems
    if (simToggleAero.checked) {
      simulatedDrag -= 0.03;
      simulatedRange += base.range * 0.05;
      simSubDrag.textContent = 'Active spoiler & chassis vents deployed';
    } else {
      simSubDrag.textContent = 'Sub-systems bypassed';
    }

    if (simToggleRegen.checked) {
      simulatedRange += base.range * 0.15;
      simSubRange.textContent = 'Heavy energy harvest on decelerations (+15% range)';
    } else {
      simSubRange.textContent = 'Standard freewheel coasting';
    }

    if (simToggleLaunch.checked) {
      simulatedAccel *= 0.95;
      simSubAccel.textContent += ' | Battery pre-heated';
    }

    // Battery Cap State factor
    const batteryMultiplier = parseInt(simBatterySlider.value) / 100;
    simulatedRange *= batteryMultiplier;

    // Turtle mode below 20%
    if (batteryMultiplier < 0.20) {
      simulatedPower *= 0.60;
      simSubPower.textContent = 'CRITICAL BATTERY: Core Power Restricting (Turtle Mode)';
    }

    // Display numbers dynamically (with safety checks)
    animateNumericText(simOutputAccel, simulatedAccel, 's', 2);
    animateNumericText(simOutputRange, Math.round(simulatedRange), ' MILES', 0);
    animateNumericText(simOutputPower, Math.round(simulatedPower), ' HP', 0);
    animateNumericText(simOutputDrag, simulatedDrag, ' Cd', 2);
  }

  // Smooth ticking helper
  function animateNumericText(element, targetVal, suffix = '', decimals = 0) {
    const currentVal = parseFloat(element.textContent);
    if (isNaN(currentVal) || currentVal === targetVal) {
      element.textContent = `${targetVal.toFixed(decimals)}${suffix}`;
      return;
    }

    const steps = 15;
    let stepCount = 0;
    const diff = targetVal - currentVal;
    
    function tick() {
      stepCount++;
      const currentStepVal = currentVal + (diff * (stepCount / steps));
      element.textContent = `${currentStepVal.toFixed(decimals)}${suffix}`;
      
      if (stepCount < steps) {
        requestAnimationFrame(tick);
      } else {
        element.textContent = `${targetVal.toFixed(decimals)}${suffix}`;
      }
    }
    
    requestAnimationFrame(tick);
  }

  // ==========================================
  // CUSTOM CANVAS TORQUE GRAPH (VISUALIZER)
  // ==========================================
  
  const ctx = torqueCanvas.getContext('2d');
  let animationFrameId;

  // Wave physics config based on state
  let waveSettings = {
    frequency: 0.015,
    amplitude: 30,
    speed: 0.15,
    phase: 0
  };

  function updateWaveSettings() {
    switch (currentSimMode) {
      case 'comfort':
        waveSettings.frequency = 0.012;
        waveSettings.amplitude = 25;
        waveSettings.speed = 0.08;
        break;
      case 'sport':
        waveSettings.frequency = 0.025;
        waveSettings.amplitude = 40;
        waveSettings.speed = 0.16;
        break;
      case 'track':
        waveSettings.frequency = 0.038;
        waveSettings.amplitude = 52;
        waveSettings.speed = 0.26;
        break;
      case 'range':
        waveSettings.frequency = 0.008;
        waveSettings.amplitude = 15;
        waveSettings.speed = 0.04;
        break;
    }
  }

  function drawTorqueWave() {
    updateWaveSettings();
    
    // Clear canvas
    ctx.clearRect(0, 0, torqueCanvas.width, torqueCanvas.height);
    
    // Canvas dimensions
    const width = torqueCanvas.width;
    const height = torqueCanvas.height;
    const centerY = height / 2;

    // Draw grid background helper lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let i = 20; i < width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    for (let j = 20; j < height; j += 30) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(width, j);
      ctx.stroke();
    }

    // Active wave drawing
    ctx.beginPath();
    ctx.lineWidth = 3;
    
    // Use current accent color theme for drawing line
    const theme = accentColors[currentColor];
    ctx.strokeStyle = theme.primary;
    
    // Wave gradient fill
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, theme.primary);
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    // Plot mathematical sine curve
    for (let x = 0; x < width; x++) {
      // Modulate amplitude at endpoints for premium fluid design
      const endpointFade = Math.sin((x / width) * Math.PI);
      const y = centerY + Math.sin(x * waveSettings.frequency + waveSettings.phase) * waveSettings.amplitude * endpointFade;
      
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Wave Fill area
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = theme.glow;
    ctx.fill();

    // Shift wave phase for sliding animation
    waveSettings.phase += waveSettings.speed;

    // Loop
    animationFrameId = requestAnimationFrame(drawTorqueWave);
  }

  // Start Canvas animation
  drawTorqueWave();

  // Run initial simulator outputs recalculation
  runPerformanceSimulation();

  // ==========================================
  // DIGITAL COCKPIT TOUR HOTSPOTS
  // ==========================================
  
  hotspots.forEach(hotspot => {
    hotspot.addEventListener('click', (e) => {
      e.stopPropagation(); // Avoid immediately closing via doc-level click
      
      const title = hotspot.dataset.title;
      const desc = hotspot.dataset.desc;
      
      // Update Tooltip details
      tooltipTitle.textContent = title;
      tooltipDesc.textContent = desc;

      // Position tooltip near clicked node
      const wrapperRect = document.getElementById('cockpit-tour-wrapper').getBoundingClientRect();
      const nodeRect = hotspot.getBoundingClientRect();
      
      // Offset percentages based relative coords
      const topPct = parseFloat(hotspot.style.top);
      const leftPct = parseFloat(hotspot.style.left);

      // Deciding placing direction based on space available
      if (leftPct > 55) {
        tooltipCard.style.left = `calc(${leftPct}% - 300px)`;
      } else {
        tooltipCard.style.left = `calc(${leftPct}% + 40px)`;
      }

      if (topPct > 70) {
        tooltipCard.style.top = `calc(${topPct}% - 120px)`;
      } else {
        tooltipCard.style.top = `${topPct}%`;
      }

      // Activate tooltip
      tooltipCard.classList.add('active');
    });
  });

  // Tooltip Close Action
  tooltipClose.addEventListener('click', (e) => {
    e.stopPropagation();
    tooltipCard.classList.remove('active');
  });

  // Document Close Tooltip click
  document.addEventListener('click', () => {
    tooltipCard.classList.remove('active');
  });

  // ==========================================
  // SCROLL-REVEAL & SCROLL INDICATOR LINK
  // ==========================================
  
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // Scroll Down Indicator Link Click
  const scrollIndicator = document.getElementById('scroll-down-indicator');
  scrollIndicator.addEventListener('click', () => {
    document.getElementById('models').scrollIntoView({ behavior: 'smooth' });
  });

  // ==========================================
  // RESERVATION / CONFIGURATOR FORM
  // ==========================================
  
  function calculateFormPrice() {
    const selectedModelOpt = formModelSelect.options[formModelSelect.selectedIndex];
    const selectedTrimOpt = formTrimSelect.options[formTrimSelect.selectedIndex];
    
    const baseCost = parseInt(selectedModelOpt.dataset.price);
    const trimCost = parseInt(selectedTrimOpt.dataset.price);
    const totalCost = baseCost + trimCost;

    priceBase.textContent = `$${baseCost.toLocaleString()}`;
    priceUpgrades.textContent = `$${trimCost.toLocaleString()}`;
    priceTotal.textContent = `$${totalCost.toLocaleString()}`;

    // Update fleet showcase selection if user changes model in pre-order form
    const modelKey = formModelSelect.value;
    if (modelKey !== currentModel) {
      updateModelShowcase(modelKey);
    }
  }

  formModelSelect.addEventListener('change', calculateFormPrice);
  formTrimSelect.addEventListener('change', calculateFormPrice);

  // Form Submission
  formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Check validation
    if (formElement.checkValidity()) {
      formSuccessView.classList.add('active');
    }
  });

  // Reset Success screen to configure another
  formResetBtn.addEventListener('click', () => {
    formSuccessView.classList.remove('active');
    formElement.reset();
    calculateFormPrice();
  });

});
