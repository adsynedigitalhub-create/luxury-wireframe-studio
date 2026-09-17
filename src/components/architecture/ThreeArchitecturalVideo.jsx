import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export const ThreeArchitecturalVideo = ({ onPhaseChange }) => {
  const mountRef = useRef(null);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);

  // Phases data matching the images
  const phases = [
    {
      id: 'phase-01-blueprint',
      title: '01. CAD BLUEPRINT & ELEVATION DRAFTING',
      subtitle: 'AXIS A-C • STRUCTURAL 3D WIREFRAME • 1:100 DIMENSIONS',
      image: '/images/architecture/arch_phase1_blueprint.jpg'
    },
    {
      id: 'phase-02-construction',
      title: '02. ACTIVE CONSTRUCTION & STEEL REBAR',
      subtitle: 'TOWER CRANE ASSEMBLY • REINFORCED CONCRETE • SCAFFOLDING',
      image: '/images/architecture/arch_phase2_construction.jpg'
    },
    {
      id: 'phase-03-reality',
      title: '03. FINISHED LUXURY ARCHITECTURAL REALITY',
      subtitle: 'TRAVERTINE LIMESTONE • CANTILEVER GLASS • SUNLIT POOL',
      image: '/images/architecture/arch_phase3_reality.jpg'
    }
  ];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();
    const textures = phases.map(p => textureLoader.load(p.image));

    // Plane Geometry to fit screen
    const planeGeo = new THREE.PlaneGeometry(36, 20.25, 32, 32);

    // 3 Material layers for automatic crossfade
    const planes = textures.map((tex, idx) => {
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        opacity: idx === 0 ? 1 : 0
      });
      const mesh = new THREE.Mesh(planeGeo, mat);
      mesh.position.z = -idx * 0.05;
      scene.add(mesh);
      return mesh;
    });

    // Ambient Blueprint Grid Lines floating subtly in 3D
    const gridHelper = new THREE.GridHelper(50, 50, 0xf05a36, 0xe2e8f0);
    gridHelper.rotation.x = Math.PI / 2.3;
    gridHelper.position.z = -2;
    gridHelper.material.opacity = 0.08;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // 3D Parallax on Mouse Move
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseX = x;
      mouseY = y;
      targetRotationY = x * 0.06;
      targetRotationX = y * 0.04;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Automatic Sequential Video Timeline (Zero Buttons!)
    let activeIdx = 0;
    const durationPerPhase = 4.5;
    const transitionDuration = 1.4;

    const loopTimeline = gsap.timeline({ repeat: -1 });

    // Phase 1 -> Phase 2 -> Phase 3 -> Phase 1
    phases.forEach((_, i) => {
      const nextIdx = (i + 1) % phases.length;

      loopTimeline
        .to({}, { duration: durationPerPhase })
        .call(() => {
          activeIdx = nextIdx;
          setCurrentPhaseIndex(nextIdx);
          if (onPhaseChange) onPhaseChange(phases[nextIdx]);
        })
        .to(planes[i].material, {
          opacity: 0,
          duration: transitionDuration,
          ease: 'power2.inOut'
        })
        .to(
          planes[nextIdx].material,
          {
            opacity: 1,
            duration: transitionDuration,
            ease: 'power2.inOut'
          },
          `<`
        );
    });

    // Animation Loop
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Subtle continuous camera drift + mouse tilt
      camera.rotation.y += (targetRotationY - camera.rotation.y) * 0.05;
      camera.rotation.x += (targetRotationX - camera.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
      loopTimeline.kill();
      renderer.dispose();
      container.innerHTML = '';
    };
  }, []);

  const activePhase = phases[currentPhaseIndex];

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {/* Three.js WebGL 3D Canvas (Full-Bleed, Zero Boxes) */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Subtle Ambient Vignette Overlay (Magazine Editorial Ivory Gradient) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#fcfbf9]/85 via-[#fcfbf9]/20 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#fcfbf9] via-transparent to-[#fcfbf9]/30 pointer-events-none" />

      {/* Top Architectural Phase Status Indicator (Floating, No Box) */}
      <div className="absolute top-28 right-6 lg:right-12 z-20 pointer-events-none hidden sm:flex items-center space-x-3">
        <span className="w-2.5 h-2.5 rounded-full bg-[#f05a36] animate-ping" />
        <div className="text-right">
          <span className="font-mono text-[10px] text-[#f05a36] font-bold tracking-[0.25em] uppercase block">
            LIVE ARCHITECTURAL TIMELAPSE
          </span>
          <span className="font-serif text-xs text-[#1f242e] font-bold block">
            {activePhase.title}
          </span>
          <span className="font-mono text-[9px] text-gray-500 block">
            {activePhase.subtitle}
          </span>
        </div>
      </div>

      {/* Bottom Architectural Progress Indicator Line (Floating, Zero Buttons) */}
      <div className="absolute bottom-6 left-6 right-6 lg:left-12 lg:right-12 z-20 pointer-events-none flex items-center justify-between border-t border-[#1f242e]/10 pt-3">
        <div className="flex items-center space-x-8 font-mono text-[10px] text-gray-500 tracking-wider">
          <span className={`transition duration-500 ${currentPhaseIndex === 0 ? 'text-[#f05a36] font-bold' : ''}`}>
            01. CAD BLUEPRINT
          </span>
          <span className="text-gray-300">➔</span>
          <span className={`transition duration-500 ${currentPhaseIndex === 1 ? 'text-[#f05a36] font-bold' : ''}`}>
            02. TOWER CRANE & CONSTRUCTION
          </span>
          <span className="text-gray-300">➔</span>
          <span className={`transition duration-500 ${currentPhaseIndex === 2 ? 'text-[#f05a36] font-bold' : ''}`}>
            03. FINISHED LUXURY VILLA
          </span>
        </div>

        <div className="font-mono text-[9px] text-gray-400">
          AUTONOMOUS 3D WEBGL TIMELAPSE
        </div>
      </div>
    </div>
  );
};
