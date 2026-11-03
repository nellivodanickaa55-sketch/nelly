/* ================================================================
   js/fx3d.js — 3D-фон, своя сцена для каждой страницы
   index — золотой шёлк, stats — пыль и фигуры, portfolio — рамки,
   about — созвездие, contact — самолётики и глобус.
   Можно задать вручную: <body data-fx="about">
   ================================================================ */
(function(){
'use strict';
if (window.__fx3d) return;          // защита от двойного подключения
window.__fx3d = true;

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const mobile = matchMedia('(max-width: 768px)').matches;
const GOLD = 0xe9a568;
const GR = .914, GG = .647, GB = .408; // тот же золотой в долях 0..1
const rand = (a, b) => a + Math.random() * (b - a);
const wrap = (v, r) => ((v + r) % (2 * r) + 2 * r) % (2 * r) - r;

function pageTheme() {
  if (document.body.dataset.fx) return document.body.dataset.fx;
  const file = (location.pathname.split('/').pop() || '').toLowerCase();
  for (const name of ['stats', 'portfolio', 'about', 'contact']) {
    if (file.startsWith(name)) return name;
  }
  return 'home';
}

function load(cb) {
  if (window.THREE) return cb();
  const s = document.createElement('script');
  s.src = 'js/vendor/three.min.js';
  s.onload = cb;
  document.head.appendChild(s);
}

// Общая золотая пыль — объединяет все страницы в один стиль
function makeDust(T, n, size, opacity) {
  const pos = new Float32Array(n * 3);
  for (let i = 0; i < n * 3; i += 3) {
    pos[i] = rand(-15, 15); pos[i + 1] = rand(-15, 15); pos[i + 2] = rand(-7, 7);
  }
  const g = new T.BufferGeometry();
  g.setAttribute('position', new T.BufferAttribute(pos, 3));
  return new T.Points(g, new T.PointsMaterial({
    color: GOLD, size, transparent: true, opacity, depthWrite: false, blending: T.AdditiveBlending
  }));
}

const THEMES = {

  /* ---------- Статистика: пыль и каркасные фигуры ---------- */
  stats(T, scene) {
    const dust = makeDust(T, mobile ? 260 : 700, mobile ? .06 : .045, .55);
    scene.add(dust);
    const mat = new T.MeshBasicMaterial({ color: GOLD, wireframe: true, transparent: true, opacity: .16 });
    const k = mobile ? .55 : 1;
    const shapes = [
      [new T.TorusKnotGeometry(1.6, .42, mobile ? 64 : 120, mobile ? 8 : 12), [-7 * k, 3, -3]],
      [new T.OctahedronGeometry(1.5, 0),                                       [ 7 * k, -4, -2]],
      [new T.TorusGeometry(1.8, .04, 8, 90),                                   [ 6 * k, 6, -4]],
      [new T.IcosahedronGeometry(1.2, 1),                                      [-6 * k, -7, -3]]
    ].map(([geo, p], i) => {
      const m = new T.Mesh(geo, mat);
      m.position.set(p[0], p[1], p[2]);
      m.userData = { y: p[1], speed: .15 + i * .05, phase: i * 1.7 };
      scene.add(m);
      return m;
    });
    return (t, dt, sc) => {
      dust.rotation.y = t * .02 + sc * .0003;
      dust.rotation.x = sc * .0001;
      shapes.forEach(m => {
        const u = m.userData;
        m.rotation.x = t * u.speed;
        m.rotation.y = t * u.speed * .8;
        m.position.y = u.y + Math.sin(t * u.speed * 2 + u.phase) * .4;
      });
    };
  },

  /* ---------- Главная: золотой шёлк и орбитальные кольца ---------- */
  home(T, scene) {
    const dust = makeDust(T, mobile ? 120 : 300, mobile ? .05 : .04, .35);
    scene.add(dust);

    const COLS = mobile ? 70 : 130, ROWS = mobile ? 34 : 60;
    const W = mobile ? 22 : 36, D = 18, n = COLS * ROWS;
    const pos = new Float32Array(n * 3);
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
      const i = (r * COLS + c) * 3;
      pos[i] = (c / (COLS - 1) - .5) * W;
      pos[i + 2] = (r / (ROWS - 1) - .5) * D;
    }
    const geo = new T.BufferGeometry();
    geo.setAttribute('position', new T.BufferAttribute(pos, 3));
    const silk = new T.Points(geo, new T.PointsMaterial({
      color: GOLD, size: mobile ? .07 : .055, transparent: true, opacity: .55,
      depthWrite: false, blending: T.AdditiveBlending
    }));
    silk.position.set(0, -5, -3);
    silk.rotation.x = .38; // дальний край приподнят — полотно «лежит» в нижней части экрана
    scene.add(silk);

    const ringMat = new T.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: .22 });
    const ring1 = new T.Mesh(new T.TorusGeometry(4.2, .012, 6, 200), ringMat);
    const ring2 = new T.Mesh(new T.TorusGeometry(5.4, .008, 6, 200), ringMat);
    const halo = new T.Group();
    halo.add(ring1, ring2);
    halo.position.set(mobile ? 0 : 6.5, mobile ? 4 : 2.5, -7); // за фото в первом экране
    scene.add(halo);

    const attr = geo.attributes.position;
    return (t, dt, sc) => {
      for (let i = 0; i < n * 3; i += 3) {
        const x = pos[i], z = pos[i + 2];
        pos[i + 1] = Math.sin(x * .32 + t * .7) * .55
                   + Math.sin(z * .45 + t * .5) * .45
                   + Math.sin((x + z) * .18 - t * .35) * .35;
      }
      attr.needsUpdate = true;
      silk.position.y = -5 - sc * .0015;
      dust.rotation.y = t * .015;
      ring1.rotation.set(1.1 + Math.sin(t * .2) * .15, t * .12, 0);
      ring2.rotation.set(1.3, -t * .08, .4);
    };
  },

  /* ---------- Портфолио: парящие рамки фотографий ---------- */
  portfolio(T, scene) {
    const dust = makeDust(T, mobile ? 120 : 280, mobile ? .05 : .04, .3);
    scene.add(dust);

    const rect = (w, h) => [[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2]];
    const arch = (w, h) => {
      const top = h / 2 - w / 2;
      const pts = [[-w / 2, -h / 2], [w / 2, -h / 2]];
      for (let a = 0; a <= 24; a++) {
        const ang = a / 24 * Math.PI;
        pts.push([Math.cos(ang) * w / 2, top + Math.sin(ang) * w / 2]);
      }
      return pts;
    };

    const N = mobile ? 9 : 16, RX = mobile ? 5.5 : 12, RY = 13;
    const frames = [];
    for (let i = 0; i < N; i++) {
      const s = rand(.8, 1.6);
      const raw = i % 3 === 0 ? arch(2 * s, 2.8 * s) : rect(2 * s, (i % 2 ? 2.6 : 1.5) * s);
      const pts = raw.map(([x, y]) => new T.Vector3(x, y, 0));
      const z = rand(-10, -1);
      const depth = (z + 10) / 9; // 0 — далеко, 1 — близко
      const g = new T.Group();
      g.add(new T.LineLoop(new T.BufferGeometry().setFromPoints(pts),
        new T.LineBasicMaterial({ color: GOLD, transparent: true, opacity: .12 + depth * .25 })));
      if (i % 4 === 1) { // «стекло» внутри некоторых рамок
        const shape = new T.Shape(raw.map(([x, y]) => new T.Vector2(x, y)));
        g.add(new T.Mesh(new T.ShapeGeometry(shape), new T.MeshBasicMaterial({
          color: GOLD, transparent: true, opacity: .035, side: T.DoubleSide, depthWrite: false
        })));
      }
      g.position.set(rand(-RX, RX), rand(-RY, RY), z);
      g.userData = { y: g.position.y, speed: .25 + depth * .6, rot: rand(-.4, .4), ph: rand(0, 6.28) };
      scene.add(g);
      frames.push(g);
    }
    return (t, dt, sc) => {
      dust.rotation.y = t * .01;
      frames.forEach(g => {
        const u = g.userData;
        g.position.y = wrap(u.y + t * .12 * u.speed + sc * .004 * u.speed, RY);
        g.rotation.y = Math.sin(t * .3 + u.ph) * .35 + u.rot;
        g.rotation.z = Math.sin(t * .2 + u.ph) * .05;
      });
    };
  },

  /* ---------- Обо мне: созвездие ---------- */
  about(T, scene) {
    const dust = makeDust(T, mobile ? 100 : 220, .04, .25);
    scene.add(dust);

    const N = mobile ? 38 : 72, BX = mobile ? 6 : 13, BY = 8, MAXD = mobile ? 2.8 : 3.2;
    const pos = new Float32Array(N * 3), vel = [];
    for (let i = 0; i < N; i++) {
      pos[i * 3] = rand(-BX, BX); pos[i * 3 + 1] = rand(-BY, BY); pos[i * 3 + 2] = rand(-6, 1);
      vel.push([rand(-.25, .25), rand(-.25, .25), rand(-.1, .1)]);
    }
    const ng = new T.BufferGeometry();
    ng.setAttribute('position', new T.BufferAttribute(pos, 3));
    const nodes = new T.Points(ng, new T.PointsMaterial({
      color: GOLD, size: mobile ? .12 : .1, transparent: true, opacity: .9,
      depthWrite: false, blending: T.AdditiveBlending
    }));

    const MAXS = N * 8;
    const lp = new Float32Array(MAXS * 6), lc = new Float32Array(MAXS * 6);
    const lg = new T.BufferGeometry();
    lg.setAttribute('position', new T.BufferAttribute(lp, 3));
    lg.setAttribute('color', new T.BufferAttribute(lc, 3));
    const lines = new T.LineSegments(lg, new T.LineBasicMaterial({
      vertexColors: true, transparent: true, opacity: .55, depthWrite: false, blending: T.AdditiveBlending
    }));
    const net = new T.Group();
    net.add(nodes, lines);
    scene.add(net);

    const LIM = [[-BX, BX], [-BY, BY], [-6, 1]];
    return (t, dt, sc) => {
      for (let i = 0; i < N; i++) {
        for (let a = 0; a < 3; a++) {
          const k = i * 3 + a;
          pos[k] += vel[i][a] * dt;
          if (pos[k] < LIM[a][0] || pos[k] > LIM[a][1]) {
            vel[i][a] = -vel[i][a];
            pos[k] = Math.max(LIM[a][0], Math.min(LIM[a][1], pos[k]));
          }
        }
      }
      ng.attributes.position.needsUpdate = true;

      let s = 0;
      for (let i = 0; i < N && s < MAXS; i++) {
        for (let j = i + 1; j < N && s < MAXS; j++) {
          const a = i * 3, b = j * 3;
          const dx = pos[a] - pos[b], dy = pos[a + 1] - pos[b + 1], dz = pos[a + 2] - pos[b + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist >= MAXD) continue;
          const f = 1 - dist / MAXD, o = s * 6; // чем ближе точки, тем ярче линия
          lp[o] = pos[a]; lp[o + 1] = pos[a + 1]; lp[o + 2] = pos[a + 2];
          lp[o + 3] = pos[b]; lp[o + 4] = pos[b + 1]; lp[o + 5] = pos[b + 2];
          lc[o] = lc[o + 3] = GR * f; lc[o + 1] = lc[o + 4] = GG * f; lc[o + 2] = lc[o + 5] = GB * f;
          s++;
        }
      }
      lg.setDrawRange(0, s * 2);
      lg.attributes.position.needsUpdate = true;
      lg.attributes.color.needsUpdate = true;

      net.rotation.y = Math.sin(t * .1) * .2;
      net.position.y = sc * .002;
      dust.rotation.y = t * .01;
    };
  },

  /* ---------- Сотрудничество: бумажные самолётики и глобус ---------- */
  contact(T, scene) {
    const dust = makeDust(T, mobile ? 120 : 260, .045, .35);
    scene.add(dust);

    const globe = new T.Mesh(new T.IcosahedronGeometry(mobile ? 3.2 : 4, 2),
      new T.MeshBasicMaterial({ color: GOLD, wireframe: true, transparent: true, opacity: .07 }));
    globe.position.set(mobile ? 0 : 7, mobile ? -6 : -1.5, -7);
    scene.add(globe);

    // Самолётик, нос смотрит по +X: нос, левое крыло, правое крыло, хвост, киль
    const V = [[1.2, 0, 0], [-.7, .05, -.65], [-.7, .05, .65], [-.55, 0, 0], [-.7, -.32, 0]];
    const E = [[0, 1], [0, 2], [1, 3], [2, 3], [0, 3], [0, 4], [4, 3]];
    const planeGeo = new T.BufferGeometry().setFromPoints(
      E.flatMap(([a, b]) => [new T.Vector3(...V[a]), new T.Vector3(...V[b])]));

    const N = mobile ? 6 : 11, TRAIL = mobile ? 40 : 60, RX = mobile ? 8 : 17;
    const planes = [];
    for (let i = 0; i < N; i++) {
      const mesh = new T.LineSegments(planeGeo,
        new T.LineBasicMaterial({ color: GOLD, transparent: true, opacity: .75 }));
      mesh.scale.setScalar(rand(.35, .6));
      mesh.rotation.order = 'ZYX'; // сначала крен, потом курс, потом набор высоты

      const tp = new Float32Array(TRAIL * 3), tc = new Float32Array(TRAIL * 3);
      for (let k = 0; k < TRAIL; k++) { // шлейф гаснет к хвосту
        const f = (1 - k / TRAIL) * .6;
        tc[k * 3] = GR * f; tc[k * 3 + 1] = GG * f; tc[k * 3 + 2] = GB * f;
      }
      const tg = new T.BufferGeometry();
      tg.setAttribute('position', new T.BufferAttribute(tp, 3));
      tg.setAttribute('color', new T.BufferAttribute(tc, 3));
      const trail = new T.Line(tg, new T.LineBasicMaterial({
        vertexColors: true, transparent: true, depthWrite: false, blending: T.AdditiveBlending
      }));
      scene.add(mesh, trail);

      planes.push({ mesh, trail, tp, x: rand(-RX, RX), y0: rand(-8, 2), z: rand(-8, 0),
        speed: rand(1.2, 2.4), amp: rand(.4, 1.4), ph: rand(0, 6.28),
        climb: rand(.05, .18), yaw: rand(-.4, .4), ready: false });
    }

    return (t, dt, sc) => {
      globe.rotation.x = .3;
      globe.rotation.y = t * .06;
      dust.rotation.y = t * .012;
      planes.forEach(p => {
        p.x += p.speed * dt;
        if (p.x > RX + 2) { // улетел за край — новый заход слева
          p.x = -RX - 2; p.y0 = rand(-8, 2); p.z = rand(-8, 0); p.ready = false;
        }
        const y = p.y0 + (p.x + RX) * p.climb + Math.sin(p.x * .5 + p.ph) * p.amp;
        const slope = p.climb + Math.cos(p.x * .5 + p.ph) * .5 * p.amp;
        p.mesh.position.set(p.x, y, p.z);
        p.mesh.rotation.set(Math.sin(t * 1.5 + p.ph) * .25, p.yaw, Math.atan2(slope, 1));

        const tp = p.tp;
        if (!p.ready) { // шлейф стартует из точки самолётика, а не из центра экрана
          for (let k = 0; k < tp.length; k += 3) { tp[k] = p.x; tp[k + 1] = y; tp[k + 2] = p.z; }
          p.ready = true;
        }
        tp.copyWithin(3, 0, tp.length - 3);
        tp[0] = p.x; tp[1] = y; tp[2] = p.z;
        p.trail.geometry.attributes.position.needsUpdate = true;
      });
    };
  }
};

load(function () {
  const T = window.THREE;
  const build = THEMES[pageTheme()] || THEMES.home;

  const canvas = document.createElement('canvas');
  canvas.className = 'fx3d';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);

  let renderer;
  try {
    renderer = new T.WebGLRenderer({ canvas, alpha: true, antialias: !mobile, powerPreference: 'low-power' });
  } catch (e) { canvas.remove(); return; } // нет WebGL — сайт работает без 3D
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.25 : 1.75));

  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(60, 1, .1, 100);
  camera.position.z = 12;
  const update = build(T, scene);

  function resize() {
    renderer.setSize(innerWidth, innerHeight, false);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
  }
  addEventListener('resize', resize);
  resize();

  let mx = 0, my = 0;
  if (!mobile) addEventListener('mousemove', e => {
    mx = e.clientX / innerWidth - .5;
    my = e.clientY / innerHeight - .5;
  }, { passive: true });

  const clock = new T.Clock();
  let last = 0;
  function frame() {
    const t = clock.getElapsedTime();
    const dt = Math.min(t - last, .05); // после паузы вкладки без рывков
    last = t;
    update(t, dt, scrollY);
    camera.position.x += (mx * 1.5 - camera.position.x) * .04;
    camera.position.y += (-my * 1.5 - camera.position.y) * .04;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }

  let raf = null;
  const loop = () => { frame(); raf = requestAnimationFrame(loop); };
  const start = () => { if (!raf && !reduce) loop(); };
  const stop = () => { cancelAnimationFrame(raf); raf = null; };
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

  frame();
  start();
  requestAnimationFrame(() => canvas.classList.add('on'));
});
})();