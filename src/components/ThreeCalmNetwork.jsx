"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeCalmNetwork({
  className = "",
  count = 72,
  neighbors = 2,
  radius = 2.2,
  color = "#7E2E3B",      
  lineColor = "#3A1320", 
  pointSizePx = 2.6,      
  pointOpacity = 0.85,
  lineOpacity = 0.30,     
  speed = 0.05,
  offsetX = 0.35,         
}) {
  const wrapRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const prefersReduced = typeof window !== "undefined"
      && window.matchMedia
      && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.setSize(wrap.clientWidth || 800, wrap.clientHeight || 560);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    wrap.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      (wrap.clientWidth || 800) / (wrap.clientHeight || 560),
      0.1,
      100
    );
    camera.position.set(0, 0, 6);

    const group = new THREE.Group();
    group.position.x = offsetX; 
    scene.add(group);

    const makeDotTexture = () => {
      const c = document.createElement("canvas");
      const s = 64;
      c.width = c.height = s;
      const ctx = c.getContext("2d");
      const g = ctx.createRadialGradient(s/2, s/2, 0, s/2, s/2, s/2);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, s, s);
      const tex = new THREE.CanvasTexture(c);
      tex.generateMipmaps = true;
      return tex;
    };
    const dotTex = makeDotTexture();

    const fibonacciSphere = (n, r) => {
      const pts = [];
      const golden = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < n; i++) {
        const y = 1 - (i / (n - 1)) * 2;
        const rad = Math.sqrt(1 - y * y);
        const theta = golden * i;
        const x = Math.cos(theta) * rad;
        const z = Math.sin(theta) * rad;
        pts.push(new THREE.Vector3(x, y, z).multiplyScalar(r));
      }
      return pts;
    };

    const base = fibonacciSphere(count, radius);
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i*3+0] = base[i].x;
      positions[i*3+1] = base[i].y;
      positions[i*3+2] = base[i].z;
    }
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const pointsMat = new THREE.PointsMaterial({
      color,
      map: dotTex,
      transparent: true,
      opacity: pointOpacity,
      alphaTest: 0.05,
      depthWrite: false,
      sizeAttenuation: true, 
    });

    const points = new THREE.Points(pointsGeo, pointsMat);
    group.add(points);

    const updatePointSize = () => {
      const pr = renderer.getPixelRatio();
      const hPx = renderer.domElement.height; 
      const hCSSpx = hPx / pr;
      const vFov = THREE.MathUtils.degToRad(camera.fov);
      const worldH = 2 * Math.tan(vFov / 2) * camera.position.z;
      const pxToWorld = worldH / hCSSpx;
      pointsMat.size = pointSizePx * pxToWorld;
      pointsMat.needsUpdate = true;
    };
    updatePointSize();

    const pairs = new Set();
    for (let i = 0; i < count; i++) {
      const dists = [];
      for (let j = 0; j < count; j++) {
        if (i === j) continue;
        dists.push({ j, d: base[i].distanceTo(base[j]) });
      }
      dists.sort((a, b) => a.d - b.d);
      for (let k = 0; k < neighbors; k++) {
        const j = dists[k].j;
        const a = Math.min(i, j), b = Math.max(i, j);
        pairs.add(`${a}-${b}`);
      }
    }
    const pairList = Array.from(pairs).map(s => s.split("-").map(Number));

    const linePositions = new Float32Array(pairList.length * 2 * 3);
    let idx = 0;
    for (const [a, b] of pairList) {
      const av = base[a], bv = base[b];
      linePositions[idx++] = av.x; linePositions[idx++] = av.y; linePositions[idx++] = av.z;
      linePositions[idx++] = bv.x; linePositions[idx++] = bv.y; linePositions[idx++] = bv.z;
    }
    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const linesMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(lineColor), 
      transparent: true,
      opacity: lineOpacity,            
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(linesGeo, linesMat);
    group.add(lines);

    let last = performance.now();
    const baseSpeed = prefersReduced ? speed * 0.25 : speed;
    const breatheAmp = prefersReduced ? 0 : 0.012; 

    const loop = () => {
      rafRef.current = requestAnimationFrame(loop);
      const now = performance.now();
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;

      const t = now * 0.001;

      group.rotation.y += baseSpeed * 0.12 * dt;
      group.rotation.x += baseSpeed * 0.05 * dt;

      const s = 1 + Math.sin(t * 0.5) * breatheAmp;
      group.scale.set(s, s, s);

      renderer.render(scene, camera);
    };
    loop();

    const onResize = () => {
      const w = wrap.clientWidth || 800;
      const h = wrap.clientHeight || 560;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      updatePointSize(); 
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(wrap);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      pointsGeo.dispose();
      linesGeo.dispose();
      pointsMat.dispose();
      linesMat.dispose();
      dotTex.dispose();
      renderer.dispose();
      if (wrap.contains(renderer.domElement)) wrap.removeChild(renderer.domElement);
    };
  }, [count, neighbors, radius, color, lineColor, pointSizePx, pointOpacity, lineOpacity, speed, offsetX]);

  return (
    <div
      ref={wrapRef}
      className={`pointer-events-none ${className}`}
      style={{ minHeight: 560 }}
      aria-hidden
    />
  );
}
