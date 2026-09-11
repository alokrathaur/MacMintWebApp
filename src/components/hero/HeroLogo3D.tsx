import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface HeroLogo3DProps {
  onCleanStateChange?: (cleaned: boolean) => void;
}

export const HeroLogo3D: React.FC<HeroLogo3DProps> = ({ onCleanStateChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [isCleaned, setIsCleaned] = useState<boolean>(false);

  useEffect(() => {
    // Check WebGL support & reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setHasWebGL(false);
      return;
    }

    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 460;
    const height = container.clientHeight || 460;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 1000);
    camera.position.z = 4.8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // High quality lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight.position.set(4, 5, 6);
    scene.add(dirLight);

    const mintRimLight = new THREE.PointLight(0x4fd1b5, 2.5, 12);
    mintRimLight.position.set(-3, -2, 3);
    scene.add(mintRimLight);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Load REAL High-Resolution Logo from root / assets
    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load("/assets/insideLogo.png", (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      logoMaterial.needsUpdate = true;
    });

    // 3D Front Plane with authentic 3D insideLogo texture
    const logoGeometry = new THREE.PlaneGeometry(2.6, 2.6);
    const logoMaterial = new THREE.MeshBasicMaterial({
      map: logoTexture,
      transparent: true,
      alphaTest: 0.02,
      depthWrite: true,
      side: THREE.FrontSide,
    });
    const logoMesh = new THREE.Mesh(logoGeometry, logoMaterial);
    logoMesh.position.set(0, 0, 0);
    mainGroup.add(logoMesh);

    // Soft depth shadow silhouette slightly behind the logo for genuine 3D separation
    const shadowGeom = new THREE.PlaneGeometry(2.55, 2.55);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: logoTexture,
      transparent: true,
      color: 0x011f1a,
      opacity: 0.28,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeom, shadowMat);
    shadowMesh.position.set(0.04, -0.05, -0.05);
    mainGroup.add(shadowMesh);

    // Digital Clutter Elements
    const clutterCount = 18;
    const clutterMeshes: {
      mesh: THREE.Mesh;
      speed: number;
      orbitAngle: number;
      orbitRadius: number;
      orbitY: number;
    }[] = [];

    const clutterGeometries = [
      new THREE.BoxGeometry(0.18, 0.14, 0.04),
      new THREE.BoxGeometry(0.14, 0.18, 0.04),
      new THREE.OctahedronGeometry(0.09, 0),
    ];

    const clutterColors = [0x94a3b8, 0x64748b, 0x087f73, 0x4fd1b5, 0x38bdf8];

    for (let i = 0; i < clutterCount; i++) {
      const geom = clutterGeometries[i % clutterGeometries.length];
      const mat = new THREE.MeshStandardMaterial({
        color: clutterColors[i % clutterColors.length],
        roughness: 0.4,
        metalness: 0.2,
        transparent: true,
        opacity: 0.85,
      });

      const mesh = new THREE.Mesh(geom, mat);
      const angle = (i / clutterCount) * Math.PI * 2 + (Math.random() * 0.4);
      const radiusDist = 1.9 + Math.random() * 0.6;
      const yOffset = (Math.random() - 0.5) * 1.5;

      mesh.position.set(Math.cos(angle) * radiusDist, yOffset, Math.sin(angle) * radiusDist * 0.5);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

      mainGroup.add(mesh);
      clutterMeshes.push({
        mesh,
        speed: 0.5 + Math.random() * 0.5,
        orbitAngle: angle,
        orbitRadius: radiusDist,
        orbitY: yOffset,
      });
    }

    // Cleaning sweep ring
    const sweepGeom = new THREE.RingGeometry(0.1, 0.2, 64);
    const sweepMat = new THREE.MeshBasicMaterial({
      color: 0x4fd1b5,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const sweepMesh = new THREE.Mesh(sweepGeom, sweepMat);
    sweepMesh.position.z = 0.06;
    mainGroup.add(sweepMesh);

    // Mouse Parallax (limited to subtle 5-8 degrees)
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = x * 0.22;
      targetRotX = -y * 0.22;
    };

    const handleMouseLeave = () => {
      targetRotX = 0;
      targetRotY = 0;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let cycleTime = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Gentle floating / breathing in sync
      const breath = Math.sin(time * 1.4) * 0.05;
      logoMesh.position.y = breath;
      shadowMesh.position.y = -0.05 + breath;

      // Cursor tilt interpolation
      mainGroup.rotation.x += (targetRotX - mainGroup.rotation.x) * 0.05;
      mainGroup.rotation.y += (targetRotY - mainGroup.rotation.y) * 0.05;

      // Clutter cycle: 7 seconds
      cycleTime += delta;
      const cycleProg = (cycleTime % 7.0) / 7.0;

      if (cycleProg < 0.45) {
        // Stage 1: Digital clutter moves gently
        const t = cycleProg / 0.45;
        sweepMat.opacity = 0;
        sweepMesh.scale.set(0.1, 0.1, 0.1);

        clutterMeshes.forEach((c, idx) => {
          c.orbitAngle += delta * 0.4 * c.speed;
          const currentRad = THREE.MathUtils.lerp(c.orbitRadius, 1.4, t * 0.35);
          c.mesh.position.x = Math.cos(c.orbitAngle) * currentRad;
          c.mesh.position.z = Math.sin(c.orbitAngle) * currentRad * 0.4;
          c.mesh.position.y = c.orbitY + Math.sin(time * 2 + idx) * 0.08;
          (c.mesh.material as THREE.MeshStandardMaterial).opacity = 0.85;
          c.mesh.scale.set(1, 1, 1);
        });

        if (isCleaned) {
          setIsCleaned(false);
          onCleanStateChange?.(false);
        }
      } else if (cycleProg < 0.65) {
        // Stage 2: Mint cleaning sweep expands
        const t = (cycleProg - 0.45) / 0.2;
        sweepMesh.scale.set(t * 16, t * 16, 1);
        sweepMat.opacity = Math.sin(t * Math.PI) * 0.85;

        // Clutter dissolves
        clutterMeshes.forEach((c) => {
          const fade = Math.max(0, 1 - t * 1.5);
          (c.mesh.material as THREE.MeshStandardMaterial).opacity = fade * 0.85;
          const s = Math.max(0.01, 1 - t * 0.8);
          c.mesh.scale.set(s, s, s);
        });
      } else {
        // Stage 3: Clean state
        sweepMat.opacity = 0;
        clutterMeshes.forEach((c) => {
          (c.mesh.material as THREE.MeshStandardMaterial).opacity = 0;
          c.mesh.scale.set(0.001, 0.001, 0.001);
        });

        if (!isCleaned) {
          setIsCleaned(true);
          onCleanStateChange?.(true);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      logoGeometry.dispose();
      logoMaterial.dispose();
      shadowGeom.dispose();
      shadowMat.dispose();
      logoTexture.dispose();
      sweepGeom.dispose();
      sweepMat.dispose();
      clutterMeshes.forEach((c) => {
        c.mesh.geometry.dispose();
        (c.mesh.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[480px] h-[420px] md:h-[480px] mx-auto flex items-center justify-center cursor-pointer select-none"
    >
      {/* Subtle Mint Glow Backdrop */}
      <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-mint-400/25 to-mint-200/35 blur-3xl pointer-events-none transform -translate-y-2" />

      {/* Fallback Static Presentation */}
      {!hasWebGL && (
        <div className="relative z-10 flex flex-col items-center justify-center transition-transform duration-500 hover:scale-[1.03]">
          <div className="w-52 h-52 md:w-60 md:h-60 flex items-center justify-center">
            <img
              src="/assets/insideLogo.png"
              alt="MacMint Official Logo"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Live Clutter -> Clean Result Floating Badge: 80 GB Reclaimed */}
      <div
        className={`absolute bottom-4 sm:bottom-6 right-4 sm:right-8 z-20 flex items-center gap-2.5 px-4 py-2 rounded-full shadow-lg border backdrop-blur-md transition-all duration-500 ${
          isCleaned
            ? "bg-white/95 dark:bg-surface-darkSurface/95 border-mint-500/40 text-mint-700 dark:text-mint-300 scale-100 opacity-100"
            : "bg-white/80 dark:bg-surface-darkSurface/80 border-slate-200/60 dark:border-slate-800/60 text-slate-600 dark:text-slate-300 opacity-90"
        }`}
      >
        <div
          className={`w-2 h-2 rounded-full ${
            isCleaned ? "bg-mint-500 animate-ping" : "bg-amber-400"
          }`}
        />
        <div className="text-xs font-semibold tracking-tight">
          {isCleaned ? (
            <span>
              <strong className="text-mint-600 dark:text-mint-400 font-bold">80 GB Reclaimed</strong> · Mac Refreshed
            </span>
          ) : (
            <span>Scanning Digital Clutter...</span>
          )}
        </div>
      </div>
    </div>
  );
};
