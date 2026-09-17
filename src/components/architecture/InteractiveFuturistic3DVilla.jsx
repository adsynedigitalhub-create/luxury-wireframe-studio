import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export function InteractiveFuturistic3DVilla({ onSelectPart }) {
  const mountRef = useRef(null);
  
  // Interactive UI State
  const [renderMode, setRenderMode] = useState('photoreal'); // 'photoreal' | 'lidar' | 'xray'
  const [activePreset, setActivePreset] = useState('overview');
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [lidarActive, setLidarActive] = useState(true);
  const [fps, setFps] = useState(60);
  const [selectedElement, setSelectedElement] = useState('Main Cantilever Pavilion');

  // Internal Three.js references
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const buildingGroupRef = useRef(null);
  const materialsMapRef = useRef({});
  const lidarPlaneRef = useRef(null);
  const targetCameraPosRef = useRef(new THREE.Vector3(18, 12, 22));
  const targetLookAtRef = useRef(new THREE.Vector3(0, 3, 0));
  const controlsRef = useRef({
    isDragging: false,
    prevMouseX: 0,
    prevMouseY: 0,
    spherical: { radius: 28, theta: Math.PI / 4, phi: Math.PI / 3 }
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0c10);
    scene.fog = new THREE.FogExp2(0x0a0c10, 0.018);
    sceneRef.current = scene;

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(18, 12, 22);
    camera.lookAt(0, 3, 0);
    cameraRef.current = camera;

    // 3. High Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff8ee, 2.2);
    sunLight.position.set(25, 35, 20);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 100;
    const d = 25;
    sunLight.shadow.camera.left = -d;
    sunLight.shadow.camera.right = d;
    sunLight.shadow.camera.top = d;
    sunLight.shadow.camera.bottom = -d;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    // Warm Interior Point Lights (Fireplace & Living Salon)
    const fireplaceLight = new THREE.PointLight(0xf05a36, 3.5, 16);
    fireplaceLight.position.set(0, 2.5, 0);
    scene.add(fireplaceLight);

    const poolLight = new THREE.PointLight(0x00f0ff, 2.5, 14);
    poolLight.position.set(6, 0.5, 6);
    scene.add(poolLight);

    // 5. Ground Grid & Coordinate Plane
    const gridHelper = new THREE.GridHelper(60, 60, 0xf05a36, 0x1f2633);
    gridHelper.position.y = -0.05;
    scene.add(gridHelper);

    // Glowing Radar Circles on Ground
    const radarGeo = new THREE.RingGeometry(12, 12.15, 64);
    const radarMat = new THREE.MeshBasicMaterial({ color: 0xf05a36, side: THREE.DoubleSide, transparent: true, opacity: 0.35 });
    const radarMesh = new THREE.Mesh(radarGeo, radarMat);
    radarMesh.rotation.x = Math.PI / 2;
    radarMesh.position.y = 0.01;
    scene.add(radarMesh);

    // 6. Procedural Luxury Architectural Villa Hierarchy
    const buildingGroup = new THREE.Group();
    buildingGroupRef.current = buildingGroup;
    scene.add(buildingGroup);

    // Material Library
    const mats = {
      // Photoreal Mode
      travertine: new THREE.MeshStandardMaterial({ color: 0xd8d2c4, roughness: 0.55, metalness: 0.05 }),
      basalt: new THREE.MeshStandardMaterial({ color: 0x1c1e24, roughness: 0.7, metalness: 0.15 }),
      glass: new THREE.MeshPhysicalMaterial({
        color: 0xaaddee,
        transparent: true,
        opacity: 0.35,
        roughness: 0.1,
        metalness: 0.1,
        transmission: 0.85,
        ior: 1.5
      }),
      water: new THREE.MeshStandardMaterial({
        color: 0x00a8cc,
        roughness: 0.1,
        metalness: 0.8,
        transparent: true,
        opacity: 0.75
      }),
      wood: new THREE.MeshStandardMaterial({ color: 0x3d271d, roughness: 0.8 }),
      interior: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 }),
      
      // LiDAR Holographic Wireframe Mode
      lidarWire: new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true }),
      lidarAccent: new THREE.MeshBasicMaterial({ color: 0xf05a36, wireframe: true }),
      lidarPoint: new THREE.PointsMaterial({ color: 0x00ffff, size: 0.08 }),

      // X-Ray Mode
      xrayMat: new THREE.MeshBasicMaterial({
        color: 0x00ff88,
        wireframe: true,
        transparent: true,
        opacity: 0.4
      })
    };
    materialsMapRef.current = mats;

    // Building Elements
    // --- Foundation Platform ---
    const podiumGeo = new THREE.BoxGeometry(24, 0.8, 20);
    const podiumMesh = new THREE.Mesh(podiumGeo, mats.basalt);
    podiumMesh.position.set(0, 0.4, 0);
    podiumMesh.receiveShadow = true;
    podiumMesh.userData = { name: 'Ground Podium & Basalt Foundation' };
    buildingGroup.add(podiumMesh);

    // --- Swimming Pool Basin ---
    const poolGeo = new THREE.BoxGeometry(10, 0.2, 5);
    const poolMesh = new THREE.Mesh(poolGeo, mats.water);
    poolMesh.position.set(5.5, 0.82, 5);
    poolMesh.userData = { name: 'Heated Infinity Reflection Pool' };
    buildingGroup.add(poolMesh);

    // --- Ground Floor Living Pavilion ---
    const livingGeo = new THREE.BoxGeometry(11, 3.8, 12);
    const livingMesh = new THREE.Mesh(livingGeo, mats.travertine);
    livingMesh.position.set(-4, 2.7, 0);
    livingMesh.castShadow = true;
    livingMesh.receiveShadow = true;
    livingMesh.userData = { name: 'Sunken Living Salon & Dining Atrium' };
    buildingGroup.add(livingMesh);

    // --- Ground Floor Glass Facade ---
    const glassGeo = new THREE.BoxGeometry(10.8, 3.4, 0.15);
    const glassMesh = new THREE.Mesh(glassGeo, mats.glass);
    glassMesh.position.set(-4, 2.7, 6.05);
    glassMesh.userData = { name: 'Triple Low-Iron Glazed Facade' };
    buildingGroup.add(glassMesh);

    // --- Upper Floating Cantilever Floor (Projects 6m over Pool!) ---
    const cantileverGeo = new THREE.BoxGeometry(16, 3.6, 9);
    const cantileverMesh = new THREE.Mesh(cantileverGeo, mats.travertine);
    cantileverMesh.position.set(1.5, 6.4, 1.5);
    cantileverMesh.castShadow = true;
    cantileverMesh.receiveShadow = true;
    cantileverMesh.userData = { name: 'Post-Tensioned Master Cantilever' };
    buildingGroup.add(cantileverMesh);

    // --- Upper Floor Glass Balcony ---
    const upperGlassGeo = new THREE.BoxGeometry(15.8, 3.2, 0.15);
    const upperGlassMesh = new THREE.Mesh(upperGlassGeo, mats.glass);
    upperGlassMesh.position.set(1.5, 6.4, 6.05);
    upperGlassMesh.userData = { name: 'Cantilever Master Panoramic Glass' };
    buildingGroup.add(upperGlassMesh);

    // --- Structural Concrete Support Columns ---
    const colGeo = new THREE.CylinderGeometry(0.35, 0.35, 4.6, 16);
    const col1 = new THREE.Mesh(colGeo, mats.basalt);
    col1.position.set(7.5, 3.1, -1.5);
    col1.castShadow = true;
    buildingGroup.add(col1);

    const col2 = new THREE.Mesh(colGeo, mats.basalt);
    col2.position.set(7.5, 3.1, 4.5);
    col2.castShadow = true;
    buildingGroup.add(col2);

    // --- Rooftop Pergola & Timber Slats ---
    const pergolaGeo = new THREE.BoxGeometry(12, 0.25, 7);
    const pergolaMesh = new THREE.Mesh(pergolaGeo, mats.wood);
    pergolaMesh.position.set(0, 8.4, 1.5);
    pergolaMesh.castShadow = true;
    pergolaMesh.userData = { name: 'Architectural Timber Solar Trellis' };
    buildingGroup.add(pergolaMesh);

    // 7. Dynamic LiDAR Laser Scanning Plane
    const lidarGeo = new THREE.PlaneGeometry(30, 26);
    const lidarMat = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
    const lidarPlane = new THREE.Mesh(lidarGeo, lidarMat);
    lidarPlane.rotation.x = Math.PI / 2;
    lidarPlane.position.y = 0;
    scene.add(lidarPlane);
    lidarPlaneRef.current = lidarPlane;

    // 8. Interactive Mouse Drag & Orbit Mechanics
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let spherical = { radius: 30, theta: 0.8, phi: 1.1 };

    const updateCameraFromSpherical = () => {
      spherical.phi = Math.max(0.1, Math.min(Math.PI / 2 - 0.05, spherical.phi));
      spherical.radius = Math.max(10, Math.min(65, spherical.radius));

      const x = spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
      const y = spherical.radius * Math.cos(spherical.phi);
      const z = spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);

      targetCameraPosRef.current.set(x, y, z);
    };

    const onMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      setIsAutoRotating(false);
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      spherical.theta -= deltaX * 0.008;
      spherical.phi -= deltaY * 0.008;
      updateCameraFromSpherical();
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e) => {
      spherical.radius += e.deltaY * 0.03;
      updateCameraFromSpherical();
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domEl.addEventListener('wheel', onWheel, { passive: true });

    // Touch support for mobile devices
    let touchStartDist = 0;
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
        setIsAutoRotating(false);
      }
    };
    const onTouchMove = (e) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - prevMouseX;
        const deltaY = e.touches[0].clientY - prevMouseY;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;

        spherical.theta -= deltaX * 0.01;
        spherical.phi -= deltaY * 0.01;
        updateCameraFromSpherical();
      }
    };
    const onTouchEnd = () => { isDragging = false; };
    domEl.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 9. Animation Loop (60 FPS)
    let animationFrameId;
    let clock = new THREE.Clock();
    let frameCount = 0;
    let lastFpsTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // FPS Measurement
      frameCount++;
      const now = performance.now();
      if (now - lastFpsTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastFpsTime = now;
      }

      // Auto Rotation
      if (isAutoRotating && !isDragging) {
        spherical.theta += 0.0035;
        updateCameraFromSpherical();
      }

      // Smooth Camera LERP to Target
      camera.position.lerp(targetCameraPosRef.current, 0.065);
      camera.lookAt(targetLookAtRef.current);

      // LiDAR Laser Beam Elevation Oscillation
      if (lidarPlaneRef.current) {
        lidarPlaneRef.current.position.y = 4.2 + Math.sin(elapsedTime * 1.8) * 4.2;
      }

      // Radar Ring Rotation
      radarMesh.rotation.z = elapsedTime * 0.2;

      // Fireplace Flicker
      fireplaceLight.intensity = 3.2 + Math.sin(elapsedTime * 8) * 0.45;

      renderer.render(scene, camera);
    };
    animate();

    // 10. Handle Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domEl.removeEventListener('wheel', onWheel);
      domEl.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isAutoRotating]);

  // Handle Render Mode Switch (Photoreal vs LiDAR vs X-Ray)
  useEffect(() => {
    if (!buildingGroupRef.current || !materialsMapRef.current) return;
    const group = buildingGroupRef.current;
    const mats = materialsMapRef.current;

    group.traverse((child) => {
      if (child.isMesh) {
        if (renderMode === 'lidar') {
          child.material = child.userData.name?.includes('Glazed') ? mats.lidarAccent : mats.lidarWire;
        } else if (renderMode === 'xray') {
          child.material = mats.xrayMat;
        } else {
          // Photoreal restoration
          if (child.userData.name?.includes('Glazed')) child.material = mats.glass;
          else if (child.userData.name?.includes('Pool')) child.material = mats.water;
          else if (child.userData.name?.includes('Podium')) child.material = mats.basalt;
          else if (child.userData.name?.includes('Trellis')) child.material = mats.wood;
          else child.material = mats.travertine;
        }
      }
    });

    if (lidarPlaneRef.current) {
      lidarPlaneRef.current.visible = renderMode !== 'photoreal';
    }
  }, [renderMode]);

  // Handle Camera Presets
  const setCameraPreset = (presetKey) => {
    setActivePreset(presetKey);
    setIsAutoRotating(false);

    const presets = {
      overview: { pos: new THREE.Vector3(18, 14, 22), look: new THREE.Vector3(0, 3, 0) },
      cantilever: { pos: new THREE.Vector3(12, 3.5, 12), look: new THREE.Vector3(1.5, 6, 1.5) },
      pool: { pos: new THREE.Vector3(14, 2.2, 8), look: new THREE.Vector3(2, 2, 2) },
      interior: { pos: new THREE.Vector3(-3, 3, 4), look: new THREE.Vector3(-4, 3, 0) },
      topdown: { pos: new THREE.Vector3(0.01, 35, 0), look: new THREE.Vector3(0, 0, 0) }
    };

    const target = presets[presetKey] || presets.overview;
    targetCameraPosRef.current.copy(target.pos);
    targetLookAtRef.current.copy(target.look);
  };

  return (
    <div className="relative w-full h-full min-h-[650px] lg:min-h-[750px] bg-[#090b10] select-none overflow-hidden rounded-2xl border border-white/15 shadow-2xl">
      
      {/* 3D WebGL Canvas Viewport */}
      <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* TOP FUTURISTIC HUD TELEMETRY BAR */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono bg-black/70 border border-white/15 px-4 py-2.5 rounded-xl backdrop-blur-md">
        <div className="flex items-center space-x-3 text-white/90">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-bold text-white tracking-widest uppercase">REAL-TIME WEBGL // BIM 4D</span>
          <span className="text-white/40">|</span>
          <span className="text-emerald-400 font-bold">{fps} FPS</span>
        </div>

        {/* Live Structural Telemetry */}
        <div className="hidden md:flex items-center space-x-6 text-[11px] text-white/70">
          <span>CANTILEVER MOMENT: <strong className="text-white">1,840 kN·m</strong></span>
          <span>DEFLECTION: <strong className="text-[#f05a36]">2.1 mm</strong></span>
          <span>LIDAR SCAN FREQ: <strong className="text-cyan-400">840 THz</strong></span>
        </div>

        {/* Auto Rotation Toggle */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`px-3 py-1 rounded-lg text-[10px] uppercase font-bold border transition ${
              isAutoRotating
                ? 'border-emerald-400/50 bg-emerald-500/20 text-emerald-300'
                : 'border-white/20 bg-white/5 text-white/60 hover:text-white'
            }`}
          >
            {isAutoRotating ? 'Auto Orbit: ON' : 'Auto Orbit: OFF'}
          </button>
        </div>
      </div>

      {/* LEFT FLOATING CONTROL: SHADER RENDER MODES */}
      <div className="absolute top-20 left-4 z-20 space-y-2 bg-black/75 border border-white/15 p-3 rounded-xl backdrop-blur-md max-w-[190px]">
        <span className="block text-[10px] font-mono uppercase tracking-widest text-[#f05a36] font-bold">
          RENDER SHADER MODE
        </span>
        <div className="space-y-1.5 pt-1">
          <button
            onClick={() => setRenderMode('photoreal')}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition flex items-center justify-between ${
              renderMode === 'photoreal'
                ? 'bg-[#f05a36] text-white font-bold shadow-[0_0_15px_rgba(240,90,54,0.4)]'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>Photoreal PBR</span>
            {renderMode === 'photoreal' && <span>●</span>}
          </button>

          <button
            onClick={() => setRenderMode('lidar')}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition flex items-center justify-between ${
              renderMode === 'lidar'
                ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(0,255,255,0.4)]'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>LiDAR Wireframe</span>
            {renderMode === 'lidar' && <span>●</span>}
          </button>

          <button
            onClick={() => setRenderMode('xray')}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition flex items-center justify-between ${
              renderMode === 'xray'
                ? 'bg-emerald-500 text-black font-bold shadow-[0_0_15px_rgba(0,255,136,0.4)]'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>Structural X-Ray</span>
            {renderMode === 'xray' && <span>●</span>}
          </button>
        </div>
      </div>

      {/* RIGHT FLOATING CONTROL: 3D CAMERA WAYPOINTS */}
      <div className="absolute top-20 right-4 z-20 space-y-2 bg-black/75 border border-white/15 p-3 rounded-xl backdrop-blur-md max-w-[190px]">
        <span className="block text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
          CAMERA WAYPOINTS
        </span>
        <div className="space-y-1.5 pt-1">
          {[
            { id: 'overview', label: '360° Overview' },
            { id: 'cantilever', label: 'Floating Cantilever' },
            { id: 'pool', label: 'Infinity Pool Deck' },
            { id: 'interior', label: 'Living Salon Interior' },
            { id: 'topdown', label: '2D Floorplan Top' }
          ].map((preset) => (
            <button
              key={preset.id}
              onClick={() => setCameraPreset(preset.id)}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition flex items-center justify-between ${
                activePreset === preset.id
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{preset.label}</span>
              {activePreset === preset.id && <span>&rarr;</span>}
            </button>
          ))}
        </div>
      </div>

      {/* BOTTOM FLOATING CONTROL HINT & COORDINATES */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono bg-black/80 border border-white/15 px-4 py-2.5 rounded-xl backdrop-blur-md">
        <div className="flex items-center space-x-2 text-white/80">
          <span className="text-[#f05a36] font-bold">🖱️ INTERACTIVE MOUSE:</span>
          <span>Click & Drag to Orbit 360° &bull; Scroll Wheel to Zoom In/Out</span>
        </div>
        <div className="flex items-center space-x-3 text-[11px] text-cyan-300">
          <span>LAT: 47.3769° N</span>
          <span>&bull;</span>
          <span>LON: 8.5417° E</span>
          <span>&bull;</span>
          <span>ELEV: +408m</span>
        </div>
      </div>

    </div>
  );
}
