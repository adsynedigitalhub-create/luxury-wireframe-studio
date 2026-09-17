import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { Layers, Eye, RefreshCw, Sparkles, Sun, Moon, Maximize2 } from 'lucide-react';

export const ThreeArchitectureBuilding = ({ onExploreClick }) => {
  const mountRef = useRef(null);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [nightMode, setNightMode] = useState(true);
  const [isAssembling, setIsAssembling] = useState(false);
  const [constructionPhase, setConstructionPhase] = useState('LOD-400 COMPLETE');
  const sceneElementsRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08090d, 0.015);

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 560;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 18, 48);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Root Building Group
    const buildingGroup = new THREE.Group();
    scene.add(buildingGroup);

    // 1. Foundation Ground Blueprint Grid
    const gridHelper = new THREE.GridHelper(60, 40, 0xf05a36, 0x1e2433);
    gridHelper.position.y = -12;
    scene.add(gridHelper);

    // Concentric Blueprint Rings
    const ringGeo = new THREE.RingGeometry(12, 12.2, 48);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xf05a36, side: THREE.DoubleSide, opacity: 0.35, transparent: true });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = -11.9;
    scene.add(ringMesh);

    // Outer Ring
    const ringGeo2 = new THREE.RingGeometry(22, 22.2, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x4a5568, side: THREE.DoubleSide, opacity: 0.25, transparent: true });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = Math.PI / 2;
    ringMesh2.position.y = -11.95;
    scene.add(ringMesh2);

    // 2. Multi-tier Parametric Skyscraper Structure
    const tiers = [];
    const floorPlates = [];
    const diagridLines = [];
    const numFloors = 28;
    const towerBaseY = -12;
    const floorHeight = 1.1;

    // Core shaft
    const coreGeo = new THREE.BoxGeometry(4.5, numFloors * floorHeight, 4.5);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x161a24,
      metalness: 0.85,
      roughness: 0.25,
      wireframe: false
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.y = towerBaseY + (numFloors * floorHeight) / 2;
    buildingGroup.add(coreMesh);
    tiers.push(coreMesh);

    // Floor plates & Diagrid Facet rings
    for (let i = 0; i < numFloors; i++) {
      // Tapering parametric curve
      const progress = i / numFloors;
      const taper = Math.cos(progress * Math.PI * 0.45);
      const twist = progress * 0.4;
      const sizeW = Math.max(3.5, 14 * taper);
      const sizeD = Math.max(3.5, 11 * taper);

      // Floor slab
      const slabGeo = new THREE.BoxGeometry(sizeW, 0.22, sizeD);
      const slabMat = new THREE.MeshStandardMaterial({
        color: i % 4 === 0 ? 0xf05a36 : 0x242a38,
        metalness: 0.9,
        roughness: 0.2,
        emissive: i % 4 === 0 ? 0x4a180a : 0x000000,
        emissiveIntensity: 0.4
      });
      const slab = new THREE.Mesh(slabGeo, slabMat);
      slab.position.y = towerBaseY + i * floorHeight;
      slab.rotation.y = twist;
      buildingGroup.add(slab);
      floorPlates.push(slab);

      // Glass perimeter envelope
      if (i < numFloors - 1) {
        const glassGeo = new THREE.BoxGeometry(sizeW * 0.98, floorHeight, sizeD * 0.98);
        const glassMat = new THREE.MeshPhysicalMaterial({
          color: 0x90cdf4,
          metalness: 0.1,
          roughness: 0.05,
          transmission: 0.75,
          transparent: true,
          opacity: 0.45
        });
        const glassMesh = new THREE.Mesh(glassGeo, glassMat);
        glassMesh.position.y = towerBaseY + i * floorHeight + floorHeight / 2;
        glassMesh.rotation.y = twist;
        buildingGroup.add(glassMesh);
        tiers.push(glassMesh);

        // Edge wireframe highlight
        const edges = new THREE.EdgesGeometry(glassGeo);
        const lineMat = new THREE.LineBasicMaterial({
          color: i % 3 === 0 ? 0xf05a36 : 0x4fd1c5,
          transparent: true,
          opacity: 0.7
        });
        const wireframe = new THREE.LineSegments(edges, lineMat);
        wireframe.position.copy(glassMesh.position);
        wireframe.rotation.copy(glassMesh.rotation);
        buildingGroup.add(wireframe);
        diagridLines.push(wireframe);
      }
    }

    // 3. Spire & Beacon Pinnacle
    const spireGeo = new THREE.ConeGeometry(0.8, 8, 8);
    const spireMat = new THREE.MeshStandardMaterial({
      color: 0xf05a36,
      metalness: 0.95,
      roughness: 0.1,
      emissive: 0xf05a36,
      emissiveIntensity: 0.6
    });
    const spireMesh = new THREE.Mesh(spireGeo, spireMat);
    spireMesh.position.y = towerBaseY + numFloors * floorHeight + 4;
    buildingGroup.add(spireMesh);
    tiers.push(spireMesh);

    // Glowing Beacon Light at the top
    const beaconLight = new THREE.PointLight(0xf05a36, 3, 25);
    beaconLight.position.y = towerBaseY + numFloors * floorHeight + 8;
    buildingGroup.add(beaconLight);

    // 4. Floating Construction Coordinates / Dust Particles
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let p = 0; p < particleCount * 3; p += 3) {
      particlePositions[p] = (Math.random() - 0.5) * 40;
      particlePositions[p + 1] = towerBaseY + Math.random() * (numFloors * floorHeight + 10);
      particlePositions[p + 2] = (Math.random() - 0.5) * 40;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xf05a36,
      size: 0.35,
      transparent: true,
      opacity: 0.6
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight1.position.set(25, 40, 25);
    scene.add(dirLight1);

    const orangeLight = new THREE.PointLight(0xf05a36, 4, 60);
    orangeLight.position.set(-20, 15, 20);
    scene.add(orangeLight);

    const blueRimLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    blueRimLight.position.set(-25, -5, -25);
    scene.add(blueRimLight);

    // Save refs for interactions
    sceneElementsRef.current = {
      scene,
      camera,
      renderer,
      buildingGroup,
      floorPlates,
      tiers,
      diagridLines,
      coreMesh,
      spireMesh,
      beaconLight,
      ambientLight,
      dirLight1,
      particleSystem
    };

    // 6. Interactive Mouse Parallax Tilt
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
      targetRotationY = x * 0.6;
      targetRotationX = y * 0.3;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // 7. Initial Assembly Construction Animation (Zero to Completed Building)
    const runAssemblyAnimation = () => {
      setIsAssembling(true);
      setConstructionPhase('01: FOUNDATION BED');

      // Hide all floor plates initially
      floorPlates.forEach((slab, idx) => {
        slab.scale.set(0.01, 0.01, 0.01);
        slab.position.y = towerBaseY;
      });
      coreMesh.scale.set(0.1, 0.01, 0.1);
      spireMesh.scale.set(0.01, 0.01, 0.01);
      diagridLines.forEach(line => (line.visible = false));

      const tl = gsap.timeline({
        onComplete: () => {
          setIsAssembling(false);
          setConstructionPhase('LOD-400 PARAMETRIC COMPLETE');
        }
      });

      // Core rises
      tl.to(coreMesh.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1.2,
        ease: 'power2.out',
        onStart: () => setConstructionPhase('02: CENTRAL SHEAR CORE')
      });

      // Floor plates sequence bottom-up
      floorPlates.forEach((slab, idx) => {
        tl.to(
          slab.position,
          {
            y: towerBaseY + idx * floorHeight,
            duration: 0.08,
            ease: 'power1.out'
          },
          `-=${idx === 0 ? 0 : 0.04}`
        );
        tl.to(
          slab.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.12,
            ease: 'back.out(1.4)'
          },
          `-=${0.06}`
        );
        if (idx === Math.floor(numFloors / 2)) {
          tl.call(() => setConstructionPhase('03: MID-LEVEL CANTILEVER PLATES'));
        }
      });

      // Show Diagrid Facet shell & Spire
      tl.call(() => {
        setConstructionPhase('04: STRUCTURAL DIAGRID FACET');
        diagridLines.forEach(line => (line.visible = true));
      });

      tl.to(spireMesh.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
        onStart: () => setConstructionPhase('05: PINNACLE SPIRE & BEACON')
      });
    };

    // Run once on load
    runAssemblyAnimation();

    // 8. Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous slow yaw rotation + mouse parallax damping
      buildingGroup.rotation.y += 0.003;
      buildingGroup.rotation.y += (targetRotationY - buildingGroup.rotation.y) * 0.05;
      buildingGroup.rotation.x += (targetRotationX - buildingGroup.rotation.x) * 0.05;

      // Pulse Beacon
      beaconLight.intensity = 2.5 + Math.sin(elapsedTime * 4) * 1.5;

      // Float Particles
      const positions = particleSystem.geometry.attributes.position.array;
      for (let p = 1; p < positions.length; p += 3) {
        positions[p] += 0.03;
        if (positions[p] > towerBaseY + numFloors * floorHeight + 12) {
          positions[p] = towerBaseY;
        }
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      container.innerHTML = '';
    };
  }, []);

  // Wireframe toggle handler
  const handleToggleWireframe = () => {
    const nextMode = !wireframeMode;
    setWireframeMode(nextMode);
    if (!sceneElementsRef.current) return;
    const { tiers, coreMesh } = sceneElementsRef.current;
    tiers.forEach(mesh => {
      if (mesh.material) mesh.material.wireframe = nextMode;
    });
    if (coreMesh && coreMesh.material) coreMesh.material.wireframe = nextMode;
  };

  // Day / Night lighting toggle
  const handleToggleLighting = () => {
    const nextNight = !nightMode;
    setNightMode(nextNight);
    if (!sceneElementsRef.current) return;
    const { scene, ambientLight, dirLight1 } = sceneElementsRef.current;
    if (nextNight) {
      scene.fog.color.setHex(0x08090d);
      ambientLight.intensity = 0.7;
      dirLight1.intensity = 1.8;
      dirLight1.color.setHex(0xffffff);
    } else {
      scene.fog.color.setHex(0x1a202c);
      ambientLight.intensity = 1.6;
      dirLight1.intensity = 2.8;
      dirLight1.color.setHex(0xfff3e0);
    }
  };

  // Trigger Re-assembly
  const handleReassemble = () => {
    if (isAssembling || !sceneElementsRef.current) return;
    const { floorPlates, coreMesh, spireMesh, diagridLines } = sceneElementsRef.current;
    setIsAssembling(true);
    setConstructionPhase('01: EXCAVATION & SUB-STRUCTURE');

    floorPlates.forEach((slab) => {
      slab.scale.set(0.01, 0.01, 0.01);
      slab.position.y = -12;
    });
    coreMesh.scale.set(0.1, 0.01, 0.1);
    spireMesh.scale.set(0.01, 0.01, 0.01);
    diagridLines.forEach(line => (line.visible = false));

    const tl = gsap.timeline({
      onComplete: () => {
        setIsAssembling(false);
        setConstructionPhase('LOD-400 PARAMETRIC COMPLETE');
      }
    });

    tl.to(coreMesh.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 1.0,
      ease: 'power2.out',
      onStart: () => setConstructionPhase('02: SLIPFORM CORE CASTING')
    });

    floorPlates.forEach((slab, idx) => {
      tl.to(
        slab.position,
        {
          y: -12 + idx * 1.1,
          duration: 0.07,
          ease: 'power1.out'
        },
        `-=${idx === 0 ? 0 : 0.035}`
      );
      tl.to(
        slab.scale,
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.1,
          ease: 'back.out(1.3)'
        },
        `-=${0.05}`
      );
      if (idx === 14) {
        tl.call(() => setConstructionPhase('03: PARAMETRIC FLOOR TAPER'));
      }
    });

    tl.call(() => {
      setConstructionPhase('04: STRUCTURAL DIAGRID ENVELOPE');
      diagridLines.forEach(line => (line.visible = true));
    });

    tl.to(spireMesh.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
      onStart: () => setConstructionPhase('05: TOPPING OUT CROWN SPIRE')
    });
  };

  return (
    <div className="relative w-full h-full min-h-[520px] lg:min-h-[620px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#0e1118]/80 to-[#07080b]/95 border border-[#1f2636] shadow-2xl flex flex-col justify-between p-4 sm:p-6 backdrop-blur-xl">
      {/* Top HUD Overlay Bar */}
      <div className="flex items-center justify-between z-10 select-none">
        <div className="flex items-center space-x-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f05a36] animate-ping" />
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-[10px] text-white/90 font-bold uppercase tracking-widest">
                THREE.JS WEBGL ENGINE
              </span>
              <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#f05a36]/20 border border-[#f05a36]/40 text-[#f05a36] font-semibold">
                PROCEDURAL 3D
              </span>
            </div>
            <div className="font-mono text-[9px] text-gray-400 mt-0.5">
              STATE: <span className="text-[#f05a36] font-bold">{constructionPhase}</span>
            </div>
          </div>
        </div>

        {/* HUD Quick Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleReassemble}
            disabled={isAssembling}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#f05a36]/20 border border-white/10 hover:border-[#f05a36]/50 text-gray-300 hover:text-white font-mono text-[10px] transition disabled:opacity-50 shadow-sm"
            title="Re-run 3D building growth assembly animation"
          >
            <RefreshCw className={`w-3 h-3 text-[#f05a36] ${isAssembling ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Assemble</span>
          </button>

          <button
            onClick={handleToggleWireframe}
            className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border font-mono text-[10px] transition shadow-sm ${
              wireframeMode
                ? 'bg-[#f05a36] border-[#f05a36] text-white font-bold'
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-gray-300'
            }`}
            title="Toggle Wireframe X-Ray Mesh"
          >
            <Layers className="w-3 h-3" />
            <span className="hidden sm:inline">{wireframeMode ? 'Wireframe ON' : 'Wireframe'}</span>
          </button>

          <button
            onClick={handleToggleLighting}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition"
            title={nightMode ? 'Switch to Daylight Environment' : 'Switch to Dark Obsidian Night'}
          >
            {nightMode ? <Moon className="w-3.5 h-3.5 text-[#f05a36]" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
          </button>
        </div>
      </div>

      {/* Center 3D Interactive WebGL Canvas */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0"
        title="Move cursor over canvas to interactively rotate and tilt the 3D building model"
      />

      {/* Bottom HUD Metrics & Coordinates */}
      <div className="z-10 select-none flex flex-col sm:flex-row sm:items-end justify-between gap-3 pt-4 border-t border-white/5 pointer-events-none">
        <div className="flex items-center space-x-4 font-mono text-[10px] text-gray-400">
          <div>
            <span className="text-gray-500 block text-[8px]">HEIGHT:</span>
            <span className="text-white font-semibold">324.8 METERS</span>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div>
            <span className="text-gray-500 block text-[8px]">TYPOLOGY:</span>
            <span className="text-[#f05a36] font-semibold">DIAGRID ROTATION</span>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div>
            <span className="text-gray-500 block text-[8px]">COORDINATES:</span>
            <span className="text-white font-semibold">47.3769° N, 8.5417° E</span>
          </div>
        </div>

        <div className="pointer-events-auto">
          <span className="font-mono text-[9px] text-gray-400 bg-black/60 px-2.5 py-1 rounded-full border border-white/10 flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Mouse Drag / Parallax Active</span>
          </span>
        </div>
      </div>
    </div>
  );
};
