'use client';
import { useEffect, useRef } from 'react';
import styles from './CinematicLayer.module.css';

export default function CinematicLayer() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationId: number;
    let renderer: any, scene: any, camera: any, particles: any, geometry: any, material: any;

    const init = async () => {
      const THREE = await import('three');
      const mount = mountRef.current;
      if (!mount) return;

      // Scene setup
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 6;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      // Particle system — warm orange + white bokeh
      const count = 1200;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);

      const orangeColor = new THREE.Color(0xf97316);
      const warmWhite = new THREE.Color(0xfff0d0);
      const deepAmber = new THREE.Color(0xff6b00);

      for (let i = 0; i < count; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 24;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

        const colorChoice = Math.random();
        let c = colorChoice < 0.5 ? orangeColor : colorChoice < 0.8 ? warmWhite : deepAmber;
        colors[i * 3]     = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;

        sizes[i] = Math.random() * 3 + 0.5;
      }

      geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      // Circular soft bokeh texture
      const canvas = document.createElement('canvas');
      canvas.width = 64; canvas.height = 64;
      const ctx = canvas.getContext('2d')!;
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.3, 'rgba(255,255,255,0.6)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
      const texture = new THREE.CanvasTexture(canvas);

      material = new THREE.PointsMaterial({
        size: 0.08,
        map: texture,
        vertexColors: true,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      });

      particles = new THREE.Points(geometry, material);
      scene.add(particles);

      // Mouse parallax
      let mouseX = 0, mouseY = 0;
      let targetX = 0, targetY = 0;

      const onMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 1.5;
        mouseY = -(e.clientY / window.innerHeight - 0.5) * 1.5;
      };
      window.addEventListener('mousemove', onMouseMove);

      // Animation loop with sine-wave oscillations
      let time = 0;
      const posArray = geometry.attributes.position.array as Float32Array;
      const originalPositions = new Float32Array(posArray);

      const animate = () => {
        animationId = requestAnimationFrame(animate);
        time += 0.003;

        // Sine-wave float per particle
        for (let i = 0; i < count; i++) {
          posArray[i * 3 + 1] = originalPositions[i * 3 + 1] +
            Math.sin(time + originalPositions[i * 3] * 0.5) * 0.15;
          posArray[i * 3] = originalPositions[i * 3] +
            Math.cos(time * 0.7 + originalPositions[i * 3 + 2] * 0.3) * 0.08;
        }
        geometry.attributes.position.needsUpdate = true;

        // Smooth mouse parallax
        targetX += (mouseX - targetX) * 0.04;
        targetY += (mouseY - targetY) * 0.04;
        camera.position.x = targetX * 0.6;
        camera.position.y = targetY * 0.4;

        // Slow rotation
        particles.rotation.y = time * 0.015;
        particles.rotation.x = time * 0.008;

        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', handleResize);
      };
    };

    init();

    return () => {
      cancelAnimationFrame(animationId);
      if (geometry) geometry.dispose();
      if (material) material.dispose();
      if (renderer) {
        renderer.dispose();
        if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return <div ref={mountRef} className={styles.canvas} />;
}
