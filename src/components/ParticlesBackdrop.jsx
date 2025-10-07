"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function OrbitsBackdrop({
  className = "",
  color = "#3A1320",
  rings = 4,
  pointsPerRing = 90,
  innerRadius = 0.9,
  ringGap = 0.7,
  baseSpeed = 0.08,      
  opacity = 0.28,
  size = 0.05,           
  centerX = -1.6,        
  centerY = 0,
}) {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const groupRef = useRef(null);
  const rafRef = useRef(0);
  const resizeObsRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 6;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    Object.assign(renderer.domElement.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
      display: "block",
      WebkitMaskImage:
        "radial-gradient(62% 62% at 28% 50%, #000 52%, rgba(0,0,0,0) 76%)",
      maskImage:
        "radial-gradient(62% 62% at 28% 50%, #000 52%, rgba(0,0,0,0) 76%)",
    });
    rendererRef.current = renderer;
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    group.position.set(centerX, centerY, 0);
    groupRef.current = group;
    scene.add(group);

    const material = new THREE.PointsMaterial({
      color,
      size,
      sizeAttenuation: true,
      transparent: true,
      opacity,
      depthWrite: false,
    });

    for (let r = 0; r < rings; r++) {
      const radius = innerRadius + r * ringGap;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(pointsPerRing * 3);

      for (let i = 0; i < pointsPerRing; i++) {
        const t = (i / pointsPerRing) * Math.PI * 2;
        positions[i * 3 + 0] = radius * Math.cos(t);
        positions[i * 3 + 1] = radius * Math.sin(t);
        positions[i * 3 + 2] = (Math.random() - 0.5) * 0.25; 
      }
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const points = new THREE.Points(geometry, material.clone());
      points.material.opacity = opacity * (0.92 - r * 0.07);
      points.userData.speed = (r % 2 === 0 ? 1 : -1) * baseSpeed * (1 + r * 0.22);

      group.add(points);
    }

    const onResize = () => {
      const w = mount.clientWidth || window.innerWidth;
      const h = mount.clientHeight || Math.max(1, window.innerHeight * 0.6);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    onResize();
    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(onResize);
      ro.observe(mount);
      resizeObsRef.current = ro;
    } else {
      window.addEventListener("resize", onResize);
    }

    const start = performance.now();
    const animate = () => {
      const t = (performance.now() - start) / 1000;

      group.children.forEach((ring, idx) => {
        const s = ring.userData.speed || baseSpeed;
        ring.rotation.z = t * s;
        const k = 1 + 0.015 * Math.sin(t * 0.9 + idx);
        ring.scale.set(k, k, 1);
      });

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (resizeObsRef.current) {
        resizeObsRef.current.disconnect();
        resizeObsRef.current = null;
      } else {
        window.removeEventListener("resize", onResize);
      }
      group.children.forEach((ring) => {
        ring.geometry?.dispose?.();
        ring.material?.dispose?.();
      });
      scene.remove(group);
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [baseSpeed, centerX, centerY, color, innerRadius, opacity, pointsPerRing, ringGap, rings, size]);

  return (
    <div
      ref={mountRef}
      className={"pointer-events-none " + className}
      style={{ position: "absolute" }}
    />
  );
}
