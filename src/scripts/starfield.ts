import * as THREE from 'three';

const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

export function initStarfield() {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.getElementById('webgl') as HTMLCanvasElement | null;
  if (!canvas) return;

  const hero = canvas.closest('section') || canvas.parentElement;
  if (!hero) return;

  let animationFrameId: number;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 2000);
  camera.position.z = 420;

  function createLayer(n: number, spread: number, size: number, color: number, opacity: number) {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * spread;
      pos[i + 1] = (Math.random() - 0.5) * spread * 0.55;
      pos[i + 2] = (Math.random() - 0.5) * spread * 0.4;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      color,
      size,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    return new THREE.Points(geo, mat);
  }

  const l1 = createLayer(2200, 1600, 1.0, 0xffffff, 0.4);
  const l2 = createLayer(600, 1100, 1.8, 0xc4d0ff, 0.32);
  const l3 = createLayer(140, 800, 3.2, 0x2dd4bf, 0.5);
  scene.add(l1, l2, l3);

  let mx = 0;
  let my = 0;
  let tx = 0;
  let ty = 0;
  let t = 0;

  const onMouseMove = (e: MouseEvent) => {
    mx = (e.clientX / window.innerWidth - 0.5) * 22;
    my = (e.clientY / window.innerHeight - 0.5) * -12;
  };
  window.addEventListener('mousemove', onMouseMove, { passive: true });

  const resize = () => {
    const w = hero.clientWidth || window.innerWidth;
    const h = hero.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize);

  function tick() {
    animationFrameId = requestAnimationFrame(tick);
    if (document.hidden) return;

    t += 0.0004;
    l1.rotation.y = t * 0.35;
    l2.rotation.y = t * 0.65;
    l3.rotation.y = t * 1.0;
    l1.rotation.x = t * 0.12;
    l3.rotation.x = t * 0.22;

    tx = lerp(tx, mx, 0.035);
    ty = lerp(ty, my, 0.035);
    camera.position.x = tx;
    camera.position.y = ty;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }
  tick();

  return () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('resize', resize);
    renderer.dispose();
  };
}

export function initFilmGrain() {
  if (typeof window === 'undefined') return;
  const c = document.getElementById('grain') as HTMLCanvasElement | null;
  if (!c) return;

  const ctx = c.getContext('2d');
  if (!ctx) return;

  let w = (c.width = window.innerWidth);
  let h = (c.height = window.innerHeight);
  let frame = 0;
  let animId: number;

  const resize = () => {
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
  };
  window.addEventListener('resize', resize);

  function tick() {
    animId = requestAnimationFrame(tick);
    if (document.hidden) return;
    if (frame++ % 3 !== 0) return;

    const img = ctx.createImageData(w, h);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      d[i] = d[i + 1] = d[i + 2] = v;
      d[i + 3] = (Math.random() * 22) | 0;
    }
    ctx.putImageData(img, 0, 0);
  }
  tick();

  return () => {
    cancelAnimationFrame(animId);
    window.removeEventListener('resize', resize);
  };
}
