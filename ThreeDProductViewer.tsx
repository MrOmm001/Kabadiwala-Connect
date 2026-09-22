import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Layers, ZoomIn, ZoomOut, Box, Sparkles, Compass, Eye } from 'lucide-react';

interface ThreeDProductViewerProps {
  modelType?: 'tv' | 'cables' | 'dishtv' | 'phone' | 'pcb' | 'motor' | 'battery' | string;
  autoRotate?: boolean;
  className?: string;
  height?: string;
  interactive?: boolean;
  showHud?: boolean;
}

export const ThreeDProductViewer: React.FC<ThreeDProductViewerProps> = ({
  modelType = 'tv',
  autoRotate: initialAutoRotate = true,
  className = '',
  height = 'h-72 sm:h-96',
  interactive = true,
  showHud = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(initialAutoRotate);
  const [explodedView, setExplodedView] = useState(false);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [activeLayerInfo, setActiveLayerInfo] = useState<string>('All Assemblies Intact');
  const [rotationCoords, setRotationCoords] = useState<{ x: number; y: number }>({ x: 15, y: 35 });

  // Refs for scene interaction
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const partsRef = useRef<{ mesh: THREE.Object3D; originalPos: THREE.Vector3; explodedPos: THREE.Vector3; label: string }[]>([]);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const animFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 320;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.5, 4.5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f59b, 1.8);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x00d2ff, 1.4);
    dirLight2.position.set(-5, -3, -4);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffb800, 1.2, 10);
    pointLight.position.set(0, 2, 2);
    scene.add(pointLight);

    // 5. Procedural Grid / Turntable Ring
    const gridGroup = new THREE.Group();
    const gridHelper = new THREE.GridHelper(6, 20, 0x00f59b, 0x133827);
    gridHelper.position.y = -1.2;
    gridGroup.add(gridHelper);

    // Turntable glowing rings
    const ringGeo = new THREE.RingGeometry(1.6, 1.63, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f59b, side: THREE.DoubleSide, transparent: true, opacity: 0.6 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = -1.19;
    gridGroup.add(ringMesh);

    scene.add(gridGroup);

    // 6. Build procedural 3D model according to requested modelType
    const modelGroup = new THREE.Group();
    groupRef.current = modelGroup;
    partsRef.current = [];

    const copperMaterial = new THREE.MeshStandardMaterial({
      color: 0xd97736,
      metalness: 0.9,
      roughness: 0.25,
    });

    const darkPlasticMaterial = new THREE.MeshStandardMaterial({
      color: 0x18241e,
      roughness: 0.6,
      metalness: 0.2,
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x4aa382,
      transmission: 0.7,
      opacity: 0.9,
      transparent: true,
      roughness: 0.15,
      ior: 1.5,
    });

    const neonEmeraldMaterial = new THREE.MeshStandardMaterial({
      color: 0x00f59b,
      emissive: 0x00a86b,
      emissiveIntensity: 0.6,
      roughness: 0.3,
    });

    const steelMaterial = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.85,
      roughness: 0.3,
    });

    const goldPinMaterial = new THREE.MeshStandardMaterial({
      color: 0xffb800,
      metalness: 0.95,
      roughness: 0.2,
    });

    if (modelType === 'tv') {
      // 1. CRT Body (Dark casing)
      const caseGeo = new THREE.BoxGeometry(2.0, 1.5, 1.4);
      const caseMesh = new THREE.Mesh(caseGeo, darkPlasticMaterial);
      partsRef.current.push({
        mesh: caseMesh,
        originalPos: new THREE.Vector3(0, 0, 0),
        explodedPos: new THREE.Vector3(0, 0, -1.0),
        label: 'Rear Casing & Flyback Shield',
      });
      modelGroup.add(caseMesh);

      // 2. CRT Front Glass Screen
      const screenGeo = new THREE.BoxGeometry(1.6, 1.2, 0.2);
      const screenMesh = new THREE.Mesh(screenGeo, glassMaterial);
      screenMesh.position.set(0, 0, 0.75);
      partsRef.current.push({
        mesh: screenMesh,
        originalPos: new THREE.Vector3(0, 0, 0.75),
        explodedPos: new THREE.Vector3(0, 0, 1.4),
        label: 'Phosphor Glass Faceplate (12kg Lead-Silicate)',
      });
      modelGroup.add(screenMesh);

      // 3. Copper Deflection Yoke Coil
      const yokeGeo = new THREE.TorusGeometry(0.35, 0.12, 16, 32);
      const yokeMesh = new THREE.Mesh(yokeGeo, copperMaterial);
      yokeMesh.position.set(0, 0, -0.2);
      partsRef.current.push({
        mesh: yokeMesh,
        originalPos: new THREE.Vector3(0, 0, -0.2),
        explodedPos: new THREE.Vector3(0, 1.1, 0),
        label: 'High-Purity Copper Deflection Yoke (1.4kg Cu)',
      });
      modelGroup.add(yokeMesh);

      // 4. Internal Electronics Chassis
      const pcbGeo = new THREE.BoxGeometry(1.4, 0.08, 1.0);
      const pcbMesh = new THREE.Mesh(pcbGeo, neonEmeraldMaterial);
      pcbMesh.position.set(0, -0.6, 0);
      partsRef.current.push({
        mesh: pcbMesh,
        originalPos: new THREE.Vector3(0, -0.6, 0),
        explodedPos: new THREE.Vector3(0, -1.2, 0),
        label: 'Power Supply & Transistor Motherboard',
      });
      modelGroup.add(pcbMesh);

    } else if (modelType === 'cables') {
      // Coiled Heavy Armored Copper Cables
      const outerJacketGeo = new THREE.TorusGeometry(1.1, 0.28, 24, 64);
      const outerJacketMesh = new THREE.Mesh(outerJacketGeo, darkPlasticMaterial);
      partsRef.current.push({
        mesh: outerJacketMesh,
        originalPos: new THREE.Vector3(0, 0, 0),
        explodedPos: new THREE.Vector3(0, 0, 0.8),
        label: 'Heavy PVC Outer Insulation Sheath',
      });
      modelGroup.add(outerJacketMesh);

      // Steel Armoring Ring
      const armorGeo = new THREE.TorusGeometry(1.05, 0.22, 20, 48);
      const armorMesh = new THREE.Mesh(armorGeo, steelMaterial);
      partsRef.current.push({
        mesh: armorMesh,
        originalPos: new THREE.Vector3(0, 0, 0),
        explodedPos: new THREE.Vector3(0, 0, 0),
        label: 'Galvanized Steel Armor Wire Mesh',
      });
      modelGroup.add(armorMesh);

      // Core Pure Copper Bundles
      const copperCoreGeo = new THREE.TorusGeometry(1.0, 0.16, 24, 64);
      const copperCoreMesh = new THREE.Mesh(copperCoreGeo, copperMaterial);
      partsRef.current.push({
        mesh: copperCoreMesh,
        originalPos: new THREE.Vector3(0, 0, 0),
        explodedPos: new THREE.Vector3(0, 0, -0.9),
        label: '98.5% Pure Electrolytic Copper Conductors (38kg Lot)',
      });
      modelGroup.add(copperCoreMesh);

    } else if (modelType === 'dishtv') {
      // DishTV Parabolic Reflector
      const dishGeo = new THREE.CylinderGeometry(1.3, 0.9, 0.25, 48, 1, true);
      const dishMesh = new THREE.Mesh(dishGeo, steelMaterial);
      dishMesh.rotation.x = Math.PI / 3;
      partsRef.current.push({
        mesh: dishMesh,
        originalPos: new THREE.Vector3(0, 0, 0),
        explodedPos: new THREE.Vector3(0, 0, -0.8),
        label: 'Galvanized Steel Parabolic Shell (Recycle / Solar Cooker)',
      });
      modelGroup.add(dishMesh);

      // LNB Support Arm
      const armGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.4, 16);
      const armMesh = new THREE.Mesh(armGeo, steelMaterial);
      armMesh.position.set(0, -0.4, 0.7);
      armMesh.rotation.x = -Math.PI / 4;
      partsRef.current.push({
        mesh: armMesh,
        originalPos: new THREE.Vector3(0, -0.4, 0.7),
        explodedPos: new THREE.Vector3(0, -0.9, 1.0),
        label: 'Structural Cantilever Support Arm',
      });
      modelGroup.add(armMesh);

      // LNB Horn Receiver Head
      const lnbGeo = new THREE.CylinderGeometry(0.12, 0.18, 0.35, 24);
      const lnbMesh = new THREE.Mesh(lnbGeo, neonEmeraldMaterial);
      lnbMesh.position.set(0, 0.1, 1.1);
      lnbMesh.rotation.x = Math.PI / 2;
      partsRef.current.push({
        mesh: lnbMesh,
        originalPos: new THREE.Vector3(0, 0.1, 1.1),
        explodedPos: new THREE.Vector3(0, 0.8, 1.4),
        label: 'Ku-Band LNB Receiver (Aluminum & RF Circuit)',
      });
      modelGroup.add(lnbMesh);

    } else if (modelType === 'phone') {
      // Old Smartphone (Refurbish candidate)
      // 1. OLED Display Front Glass
      const screenGeo = new THREE.BoxGeometry(1.0, 2.0, 0.05);
      const screenMesh = new THREE.Mesh(screenGeo, glassMaterial);
      partsRef.current.push({
        mesh: screenMesh,
        originalPos: new THREE.Vector3(0, 0, 0.12),
        explodedPos: new THREE.Vector3(0, 0, 1.0),
        label: 'Touch Digitizer & Display Glass (Replace to Refurbish)',
      });
      modelGroup.add(screenMesh);

      // 2. Main Logic Board with Gold Contacts
      const boardGeo = new THREE.BoxGeometry(0.85, 0.85, 0.05);
      const boardMesh = new THREE.Mesh(boardGeo, neonEmeraldMaterial);
      boardMesh.position.set(0, 0.45, 0);
      partsRef.current.push({
        mesh: boardMesh,
        originalPos: new THREE.Vector3(0, 0.45, 0),
        explodedPos: new THREE.Vector3(0, 0.9, 0),
        label: 'Healthy Exynos Motherboard (100% Functional Board)',
      });
      modelGroup.add(boardMesh);

      // 3. Lithium-Cobalt Battery Cell
      const battGeo = new THREE.BoxGeometry(0.8, 0.95, 0.08);
      const battMat = new THREE.MeshStandardMaterial({ color: 0x00d2ff, metalness: 0.7, roughness: 0.3 });
      const battMesh = new THREE.Mesh(battGeo, battMat);
      battMesh.position.set(0, -0.45, 0);
      partsRef.current.push({
        mesh: battMesh,
        originalPos: new THREE.Vector3(0, -0.45, 0),
        explodedPos: new THREE.Vector3(0, -0.9, 0),
        label: '4000mAh Battery Cell (Replace for Instant +₹2,000 Resale)',
      });
      modelGroup.add(battMesh);

      // 4. Aluminum Midframe & Rear Cover
      const frameGeo = new THREE.BoxGeometry(1.04, 2.04, 0.06);
      const frameMesh = new THREE.Mesh(frameGeo, darkPlasticMaterial);
      partsRef.current.push({
        mesh: frameMesh,
        originalPos: new THREE.Vector3(0, 0, -0.1),
        explodedPos: new THREE.Vector3(0, 0, -0.8),
        label: 'Precision Chassis Body Frame',
      });
      modelGroup.add(frameMesh);

    } else {
      // Default: Motherboard PCB
      const boardGeo = new THREE.BoxGeometry(2.2, 0.08, 1.8);
      const boardMesh = new THREE.Mesh(boardGeo, neonEmeraldMaterial);
      partsRef.current.push({
        mesh: boardMesh,
        originalPos: new THREE.Vector3(0, 0, 0),
        explodedPos: new THREE.Vector3(0, -0.4, 0),
        label: 'Multilayer FR-4 Substrate with Embedded Copper Traces',
      });
      modelGroup.add(boardMesh);

      // Gold pins / RAM slots
      const ramGeo = new THREE.BoxGeometry(0.1, 0.3, 1.4);
      const ramMesh = new THREE.Mesh(ramGeo, goldPinMaterial);
      ramMesh.position.set(0.6, 0.15, 0);
      partsRef.current.push({
        mesh: ramMesh,
        originalPos: new THREE.Vector3(0.6, 0.15, 0),
        explodedPos: new THREE.Vector3(0.9, 0.5, 0),
        label: 'Gold-Plated DIMM RAM Edge Connector Sockets',
      });
      modelGroup.add(ramMesh);

      // CPU Socket / Heatsink
      const cpuGeo = new THREE.BoxGeometry(0.6, 0.25, 0.6);
      const cpuMesh = new THREE.Mesh(cpuGeo, copperMaterial);
      cpuMesh.position.set(-0.4, 0.15, 0);
      partsRef.current.push({
        mesh: cpuMesh,
        originalPos: new THREE.Vector3(-0.4, 0.15, 0),
        explodedPos: new THREE.Vector3(-0.4, 0.8, 0),
        label: 'Electrolytic Copper Heatsink & Processor BGA Array',
      });
      modelGroup.add(cpuMesh);
    }

    scene.add(modelGroup);

    // 7. Mouse / Touch Drag Rotation Handlers
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !groupRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      groupRef.current.rotation.y += deltaX * 0.008;
      groupRef.current.rotation.x += deltaY * 0.008;

      setRotationCoords({
        x: Math.round(groupRef.current.rotation.x * (180 / Math.PI)) % 360,
        y: Math.round(groupRef.current.rotation.y * (180 / Math.PI)) % 360,
      });

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || !groupRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      groupRef.current.rotation.y += deltaX * 0.008;
      groupRef.current.rotation.x += deltaY * 0.008;

      setRotationCoords({
        x: Math.round(groupRef.current.rotation.x * (180 / Math.PI)) % 360,
        y: Math.round(groupRef.current.rotation.y * (180 / Math.PI)) % 360,
      });

      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    dom.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    // 8. Animation Loop
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      if (autoRotate && groupRef.current && !isDraggingRef.current) {
        groupRef.current.rotation.y += 0.008;
        setRotationCoords((prev) => ({
          ...prev,
          y: Math.round(groupRef.current!.rotation.y * (180 / Math.PI)) % 360,
        }));
      }

      // Exploded View Interpolation
      partsRef.current.forEach((part) => {
        const targetPos = explodedView ? part.explodedPos : part.originalPos;
        part.mesh.position.lerp(targetPos, 0.08);
      });

      renderer.render(scene, camera);
    };
    animate();

    // 9. Resize Observer
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      resizeObserver.disconnect();
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      dom.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      renderer.dispose();
      if (container.contains(dom)) container.removeChild(dom);
    };
  }, [modelType, explodedView]);

  // Wireframe toggle effect
  useEffect(() => {
    if (!partsRef.current) return;
    partsRef.current.forEach((part) => {
      if (part.mesh instanceof THREE.Mesh && part.mesh.material) {
        if (Array.isArray(part.mesh.material)) {
          part.mesh.material.forEach((m) => (m.wireframe = wireframeMode));
        } else {
          part.mesh.material.wireframe = wireframeMode;
        }
      }
    });
  }, [wireframeMode]);

  const handleZoom = (factor: number) => {
    if (!cameraRef.current) return;
    cameraRef.current.position.multiplyScalar(factor);
  };

  const resetCamera = () => {
    if (!cameraRef.current || !groupRef.current) return;
    cameraRef.current.position.set(0, 1.5, 4.5);
    cameraRef.current.lookAt(0, 0, 0);
    groupRef.current.rotation.set(0, 0, 0);
    setRotationCoords({ x: 0, y: 0 });
  };

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl bg-gradient-to-b from-[#0B1B14] to-[#050C08] border border-emerald-900/40 ${height} ${className}`}>
      {/* 3D Canvas Mount Point */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Hologram Floor Accent Lines */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,245,155,0.08)_0%,transparent_70%)]" />

      {/* HUD Info Badges */}
      {showHud && (
        <>
          <div className="absolute top-3 left-3 flex flex-col gap-1 pointer-events-none">
            <div className="flex items-center gap-2 bg-[#06120C]/90 border border-emerald-500/40 backdrop-blur-md px-3 py-1.2 rounded-full text-xs font-mono-code text-emerald-400 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>3D DIGITAL TWIN • PROCEDURAL CAD</span>
            </div>
            <div className="text-[11px] text-slate-400 bg-black/60 backdrop-blur-sm px-2.5 py-0.5 rounded-md font-mono-code border border-emerald-950">
              YAW: {rotationCoords.y}° | PITCH: {rotationCoords.x}°
            </div>
          </div>

          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              title="Toggle Auto Spin"
              className={`p-2 rounded-lg border text-xs font-medium backdrop-blur-md transition-all ${
                autoRotate
                  ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300'
                  : 'bg-black/50 border-emerald-900/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <RotateCw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={() => setExplodedView(!explodedView)}
              title="Exploded Disassembly View"
              className={`flex items-center gap-1.5 px-3 py-1.8 rounded-lg border text-xs font-medium backdrop-blur-md transition-all ${
                explodedView
                  ? 'bg-amber-500/25 border-amber-500/60 text-amber-300'
                  : 'bg-black/50 border-emerald-900/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span className="hidden sm:inline">{explodedView ? 'Joined' : 'Explode'}</span>
            </button>

            <button
              onClick={() => setWireframeMode(!wireframeMode)}
              title="Toggle Wireframe CAD"
              className={`p-2 rounded-lg border text-xs font-medium backdrop-blur-md transition-all ${
                wireframeMode
                  ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300'
                  : 'bg-black/50 border-emerald-900/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Box className="w-4 h-4" />
            </button>
          </div>
        </>
      )}

      {/* Layer breakdown chips when exploded */}
      {explodedView && (
        <div className="absolute bottom-12 left-3 right-3 flex flex-wrap gap-1.5 pointer-events-auto">
          {partsRef.current.map((part, idx) => (
            <button
              key={idx}
              onClick={() => setActiveLayerInfo(part.label)}
              className="text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-full bg-black/80 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-950/70 transition-colors backdrop-blur-md"
            >
              {part.label}
            </button>
          ))}
        </div>
      )}

      {/* Bottom Controls Bar */}
      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between pointer-events-auto">
        <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-emerald-400" />
          <span className="truncate max-w-[200px] sm:max-w-xs">{activeLayerInfo}</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => handleZoom(0.85)}
            title="Zoom In"
            className="p-1.5 rounded-md bg-black/60 hover:bg-emerald-950/80 border border-emerald-900/60 text-slate-300 transition-colors"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleZoom(1.15)}
            title="Zoom Out"
            className="p-1.5 rounded-md bg-black/60 hover:bg-emerald-950/80 border border-emerald-900/60 text-slate-300 transition-colors"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={resetCamera}
            title="Reset View"
            className="p-1.5 rounded-md bg-black/60 hover:bg-emerald-950/80 border border-emerald-900/60 text-slate-300 transition-colors"
          >
            <Compass className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
