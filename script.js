/* ───
   Project: Secret Birthday Gift
   Author: Zerox (@cipher-encrypted)
   GitHub: https://github.com/cipher-encrypted
─── */

/* ─── CLOCK DIAL TICKS & NUMERALS ─── */
(function initClockFace() {
  const tg = document.getElementById('clock-ticks');
  for (let i = 0; i < 60; i++) {
    const ang = (i * 6) * Math.PI / 180;
    const isMajor = (i % 5 === 0);
    const r1 = 126, r2 = isMajor ? 116 : 121;
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', 140 + r1 * Math.sin(ang));
    line.setAttribute('y1', 140 - r1 * Math.cos(ang));
    line.setAttribute('x2', 140 + r2 * Math.sin(ang));
    line.setAttribute('y2', 140 - r2 * Math.cos(ang));
    line.setAttribute('stroke-width', isMajor ? '1.8' : '0.8');
    line.setAttribute('opacity', isMajor ? '0.9' : '0.45');
    tg.appendChild(line);
  }

  const ng = document.getElementById('clock-numerals');
  const nums = ['XII','I','II','III','IV','V','VI','VII','VIII','IX','X','XI'];
  nums.forEach((num, idx) => {
    const ang = (idx * 30) * Math.PI / 180;
    const r = 100;
    const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    t.setAttribute('x', 140 + r * Math.sin(ang));
    t.setAttribute('y', 140 - r * Math.cos(ang));
    t.textContent = num;
    ng.appendChild(t);
  });
})();

/* ─── AUDIO MUTED (PER USER REQUEST) ─── */
function playTick() {}
function playKeyClick() {}
function playMidnightChime() {}

/* ─── INTIMATE CANDLELIGHT MOTES & ROSE PETALS ─── */
(function createBackground() {
  const bg = document.getElementById('bg-ambient');
  if (!bg || window.innerWidth < 768) return;
  for (let i = 0; i < 16; i++) {
    const m = document.createElement('div');
    m.className = 'candle-mote';
    const msz = Math.random() * 5 + 3;
    m.style.cssText = `width:${msz}px;height:${msz}px;left:${Math.random()*100}%;bottom:${Math.random()*25}%;--md:${Math.random()*5+6}s;--mdelay:-${Math.random()*6}s;`;
    bg.appendChild(m);
  }
  const colors = ['#8a1528','#6b0f1d','#a82035','#4f0b15'];
  for (let i = 0; i < 16; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.style.cssText = `left:${Math.random()*105}%;width:${Math.random()*12+10}px;height:${Math.random()*14+12}px;background:${colors[Math.floor(Math.random()*colors.length)]};--pd:${Math.random()*4+5}s;--pdelay:-${Math.random()*7}s;`;
    bg.appendChild(p);
  }
})();

/* ─── SHINCHAN PASSCODE VERIFICATION (4 DIGITS) ─── */
const TARGET_PASSCODE = "2010"; // 4-digit passcode for Vaishu (Sona)

const SHINCHAN_GIFS = {
  ask: "assets/shinchan-birthday.png",
  wrong: "assets/shinchan-wrong.png"
};

let enteredDigits = "";

function updateDateBoxes() {
  for (let i = 0; i < 4; i++) {
    const box = document.getElementById(`b${i}`);
    if (!box) continue;
    box.textContent = enteredDigits[i] || "";
    if (i === enteredDigits.length && enteredDigits.length < 4) {
      box.classList.add('active');
    } else {
      box.classList.remove('active');
    }
  }
}
updateDateBoxes();

function pressKey(num) {
  if (enteredDigits.length < 4) {
    enteredDigits += num;
    updateDateBoxes();
    if (enteredDigits.length === 4) {
      setTimeout(submitBirthdayDate, 220);
    }
  }
}

function deleteDigit() {
  if (enteredDigits.length > 0) {
    enteredDigits = enteredDigits.slice(0, -1);
    updateDateBoxes();
  }
}

function submitBirthdayDate() {
  const img = document.getElementById('shinchan-img');
  const txt = document.getElementById('quiz-text');
  const card = document.getElementById('quiz-card');
  const keypad = document.getElementById('keypad');
  const retryBtn = document.getElementById('retry-btn');

  if (enteredDigits.length < 4) {
    txt.textContent = "Please enter all 4 digits! ✨";
    card.classList.remove('shake');
    void card.offsetWidth;
    card.classList.add('shake');
    return;
  }

  if (enteredDigits === TARGET_PASSCODE) {
    // Correct Passcode (2005) - Directly transition to the Surprise Question Screen
    const danceGif = document.getElementById('dance-gif');
    if (danceGif) {
      danceGif.src = DANCE_GIF_URL;
    }
    const archText = document.getElementById('arch-text-path');
    if (archText) {
      archText.textContent = "I have made something for you";
    }
    const textEl = document.querySelector('.arched-text');
    if (textEl) {
      textEl.classList.remove('excited-mode');
    }
    // Animate curved title with Distinct Page 1 Wave In
    triggerTitleAnim('anim-wave-drop');

    const promptEl = document.getElementById('surprise-prompt');
    if (promptEl) {
      promptEl.style.display = 'block';
      promptEl.innerHTML = "Do you wanna see it, Sona? ✨";
      triggerElementAnim(promptEl, 'prompt-entrance-pop');
    }
    const danceWrap = document.querySelector('.dance-gif-wrap');
    if (danceWrap) {
      triggerElementAnim(danceWrap, 'gif-entrance-pop');
    }
    const btnGroup = document.querySelector('.surprise-btn-group');
    if (btnGroup) {
      btnGroup.innerHTML = `
        <button id="btn-yes" class="pill-btn yes-btn" onclick="handleChoice('yes')">
          <span class="btn-shine-tr"></span>
          <span class="btn-label">YES</span>
          <span class="btn-shine-bl"></span>
        </button>
        <button id="btn-no" class="pill-btn no-btn" onclick="handleChoice('no')">
          <span class="btn-shine-tr"></span>
          <span class="btn-label">NO</span>
          <span class="btn-shine-bl"></span>
        </button>
      `;
      triggerElementAnim(btnGroup, 'btn-entrance-bounce');
    }
    document.getElementById('quiz-screen').classList.remove('show');
    document.getElementById('quiz-screen').classList.add('hidden');
    const surpriseEl = document.getElementById('surprise-screen');
    if (surpriseEl) {
      surpriseEl.classList.remove('hidden-screen');
      surpriseEl.classList.add('show-screen');
    }
    launchConfetti();
    startBackgroundMusic();
  } else {
    // Wrong Passcode
    img.src = SHINCHAN_GIFS.wrong;
    txt.textContent = "Oops! Wrong Passcode! Try again, Sona! 🥺🌸";
    card.classList.remove('shake');
    void card.offsetWidth;
    card.classList.add('shake');
    keypad.classList.add('hidden-btn');
    retryBtn.classList.remove('hidden-btn');
  }
}

function resetQuiz() {
  enteredDigits = "";
  updateDateBoxes();
  const img = document.getElementById('shinchan-img');
  const txt = document.getElementById('quiz-text');
  const keypad = document.getElementById('keypad');
  const retryBtn = document.getElementById('retry-btn');

  img.src = SHINCHAN_GIFS.ask;
  txt.textContent = "Enter the 4-digit secret passcode 💖";
  keypad.classList.remove('hidden-btn');
  retryBtn.classList.add('hidden-btn');
}

function triggerTitleAnim(animClass) {
  const svg = document.querySelector('.curved-title-svg');
  if (!svg) return;
  svg.classList.remove('anim-wave-drop', 'anim-excited-bounce');
  svg.style.animation = 'none';
  void svg.offsetWidth;
  svg.style.animation = '';
  svg.classList.add(animClass);
}

function triggerElementAnim(el, animClass) {
  if (!el) return;
  el.classList.remove(animClass);
  el.style.animation = 'none';
  void el.offsetWidth;
  el.style.animation = '';
  el.classList.add(animClass);
}

/* ─── SURPRISE CHOICE INTERACTION (YES / NO) ─── */
const DANCE_GIF_URL = "assets/shinchan-dance.gif";
const PLEADING_GIF_URL = "assets/shinchan-pleading.gif";
const EXCITED_GIF_URL = "assets/shinchan-excited.gif";

function handleChoice(choice) {
  const danceGif = document.getElementById('dance-gif');

  if (choice === 'no') {
    if (danceGif) {
      danceGif.src = PLEADING_GIF_URL;
    }
    const promptEl = document.getElementById('surprise-prompt');
    if (promptEl) {
      promptEl.innerHTML = "Arey? Itni mehnat se banaya hai apni favourite ladki ke liye... chup-chaap YES dabao Sona! 😌✨";
      triggerElementAnim(promptEl, 'prompt-entrance-pop');
    }
    const noBtn = document.getElementById('btn-no');
    if (noBtn) {
      noBtn.style.animation = 'none';
      void noBtn.offsetWidth;
      noBtn.style.animation = 'cardShake 0.4s ease';
    }
    return;
  }

  // When choice === 'yes' -> Show "Are you really excited, Vaishu? 🌸" screen
  const archText = document.getElementById('arch-text-path');
  if (archText) {
    archText.textContent = "Are you really excited, Vaishu? 🌸";
  }
  const textEl = document.querySelector('.arched-text');
  if (textEl) {
    textEl.classList.add('excited-mode');
  }
  // Trigger Distinct Energetic Pop & Spring Bounce for "Are you really excited?"
  triggerTitleAnim('anim-excited-bounce');

  if (danceGif) {
    danceGif.src = EXCITED_GIF_URL;
  }
  const danceWrap = document.querySelector('.dance-gif-wrap');
  if (danceWrap) {
    triggerElementAnim(danceWrap, 'gif-entrance-pop');
  }
  const promptEl = document.getElementById('surprise-prompt');
  if (promptEl) {
    promptEl.innerHTML = "Say YES to open your mystery gifts! ✨💖";
    promptEl.style.display = 'block';
  }
  const btnGroup = document.querySelector('.surprise-btn-group');
  if (btnGroup) {
    btnGroup.innerHTML = `
      <button id="btn-excited-yes" class="pill-btn yes-btn" onclick="handleExcitedChoice()">
        <span class="btn-shine-tr"></span>
        <span class="btn-label">YES</span>
        <span class="btn-shine-bl"></span>
      </button>
      <button id="btn-excited-no" class="pill-btn no-btn" onclick="handleExcitedNo()">
        <span class="btn-shine-tr"></span>
        <span class="btn-label">NO</span>
        <span class="btn-shine-bl"></span>
      </button>
    `;
    triggerElementAnim(btnGroup, 'btn-entrance-bounce');
  }
}

function handleExcitedNo() {
  const danceGif = document.getElementById('dance-gif');
  if (danceGif) {
    danceGif.src = PLEADING_GIF_URL;
  }
  const promptEl = document.getElementById('surprise-prompt');
  if (promptEl) {
    promptEl.style.display = 'block';
    promptEl.innerHTML = "Nakhre toh dekho Madam ke! 🤭 Tumhare nakhre uthane ka haq sirf mera hai, ab jaldi YES karo! 💖";
    triggerElementAnim(promptEl, 'prompt-entrance-pop');
  }
  const noBtn = document.getElementById('btn-excited-no');
  if (noBtn) {
    noBtn.style.animation = 'none';
    void noBtn.offsetWidth;
    noBtn.style.animation = 'cardShake 0.4s ease';
  }
}

function handleExcitedChoice() {
  launchConfetti();
  const surpriseEl = document.getElementById('surprise-screen');
  const giftEl = document.getElementById('gift-screen');

  setTimeout(() => {
    if (surpriseEl) {
      surpriseEl.classList.remove('show-screen');
      surpriseEl.classList.add('hidden-screen');
    }
    if (giftEl) {
      giftEl.classList.remove('hidden-screen');
      giftEl.classList.add('show-screen');
      launchConfetti();
    }
  }, 400);
}

/* ─── CLOTHESLINE HANGING MEMORIES GALLERY (MATCHING REFERENCE IMAGE 2) ─── */
function openMemoriesModal() {
  pauseSakura();
  launchConfetti();
  const modal = document.getElementById('memories-modal');
  if (modal) {
    modal.classList.remove('hidden');
    const container = document.getElementById('memories-board-container');
    if (container) {
      container.style.animation = 'none';
      void container.offsetWidth;
      container.style.animation = 'clotheslineDropIn 0.55s cubic-bezier(0.34, 1.35, 0.64, 1)';
    }
    const track = document.getElementById('clothesline-photos-track');
    if (track) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }
}

function closeMemoriesModal() {
  const modal = document.getElementById('memories-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
  syncSakuraState();
}

function scrollClothesline(direction) {
  const track = document.getElementById('clothesline-photos-track');
  if (track) {
    const scrollAmount = 260 * direction;
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}

function focusHangingPhoto(el) {
  if (!el) return;
  launchConfetti();
  el.classList.add('active-sway');
  setTimeout(() => {
    el.classList.remove('active-sway');
  }, 1200);
}

/* ─── MAKE A WISH: BIRTHDAY CAKE (BOX 2) ─── */
let isWishMade = false;
let blownCandlesCount = 0;

/* ══════════════════════════════════════════════════════════════════════
   ★ 3D BIRTHDAY CAKE & MIC BLOW LOGIC ★
   ══════════════════════════════════════════════════════════════════════ */
let threeScene = null, threeCamera = null, threeRenderer = null, threeControls = null;
let threeCakeGroup = null, threeCandlesGroup = null, threeClock = null;
let threeFlameMeshes = [];
let threeFlameMaterials = [];
let threeCandleLights = [];
let threeSmokeSystems = [];
let is3DCakeInitialized = false;
let is3DAnimating = false;
let threeAnimFrameId = null;
let currentCakeView = '3d'; // '3d' or 'cartoon'

function switchCakeView(mode) {
  currentCakeView = mode;
  const stage3D = document.getElementById('three-cake-stage');
  const stage2D = document.getElementById('cake-stage');
  const btn3D = document.getElementById('view-3d-btn');
  const btn2D = document.getElementById('view-cartoon-btn');

  if (mode === '3d') {
    if (stage3D) stage3D.style.display = 'flex';
    if (stage2D) stage2D.style.display = 'none';
    if (btn3D) btn3D.classList.add('active');
    if (btn2D) btn2D.classList.remove('active');
    if (!is3DCakeInitialized) {
      init3DCake();
    } else {
      resume3DCake();
      setTimeout(onWindowResize3DCake, 50);
    }
  } else {
    pause3DCake();
    if (stage3D) stage3D.style.display = 'none';
    if (stage2D) stage2D.style.display = 'flex';
    if (btn3D) btn3D.classList.remove('active');
    if (btn2D) btn2D.classList.add('active');
  }
}

// Procedural Shader Material for realistic candle flames
function get3DFlameMaterial(isFront) {
  if (typeof THREE === 'undefined') return null;
  return new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      isExtinguished: { value: 0 }
    },
    vertexShader: `
      uniform float time;
      uniform float isExtinguished;
      varying vec2 vUv;
      varying float hValue;

      float random(in vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      float noise(in vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f*f*(3.0-2.0*f);
        return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      void main() {
        vUv = uv;
        vec3 pos = position;
        float flameStrength = 1.0 - isExtinguished * 0.95;
        pos *= vec3(0.85, 2.0 * flameStrength, 0.85);
        hValue = position.y;
        float posXZlen = length(position.xz);
        pos.y *= 1.0 + (cos((posXZlen + 0.25) * 3.1415926) * 0.25 + 
                       noise(vec2(0.0, time)) * 0.125 + 
                       noise(vec2(position.x + time, position.z + time)) * 0.5) * 
                       position.y * flameStrength;
        pos.x += noise(vec2(time * 2.0, (position.y - time) * 4.0)) * hValue * 0.03 * flameStrength;
        pos.z += noise(vec2((position.y - time) * 4.0, time * 2.0)) * hValue * 0.03 * flameStrength;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      varying float hValue;
      varying vec2 vUv;

      vec3 heatmapGradient(float t) {
        return clamp((pow(t, 1.5) * 0.8 + 0.2) * vec3(
          smoothstep(0.0, 0.35, t) + t * 0.5,
          smoothstep(0.5, 1.0, t),
          max(1.0 - t * 1.7, t * 7.0 - 6.0)
        ), 0.0, 1.0);
      }

      void main() {
        float v = abs(smoothstep(0.0, 0.4, hValue) - 1.0);
        float alpha = (1.0 - v) * 0.98;
        alpha -= 1.0 - smoothstep(1.0, 0.97, hValue);
        vec3 flameColor = heatmapGradient(smoothstep(0.0, 0.3, hValue)) * vec3(0.95, 0.95, 0.4);
        flameColor = mix(vec3(0.1, 0.2, 0.9), flameColor, smoothstep(0.0, 0.25, hValue));
        flameColor += vec3(1.0, 0.9, 0.5) * (1.25 - vUv.y);
        flameColor = mix(flameColor, vec3(0.66, 0.25, 0.02), smoothstep(0.95, 1.0, hValue));
        gl_FragColor = vec4(flameColor, alpha);
      }
    `,
    transparent: true,
    side: isFront ? THREE.FrontSide : THREE.BackSide
  });
}

// Procedural 3D Strawberry Mesh
function create3DStrawberry(isSimple = false) {
  const group = new THREE.Group();
  const seg = isSimple ? 10 : 20;
  const bodyGeo = new THREE.SphereGeometry(0.24, seg, seg, 0, Math.PI * 2, 0, Math.PI / 2);
  bodyGeo.scale(1, 1.45, 1);
  const bodyMat = new THREE.MeshPhongMaterial({
    color: 0xff2a55,
    shininess: 90,
    specular: 0x553333
  });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  if (!isSimple) body.castShadow = true;
  group.add(body);

  if (!isSimple) {
    const seedGeo = new THREE.SphereGeometry(0.015, 6, 6);
    const seedMat = new THREE.MeshBasicMaterial({ color: 0xffefb8 });
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const h = (i % 3) * 0.08 + 0.08;
      const r = 0.20 * (1 - h * 0.7);
      const seed = new THREE.Mesh(seedGeo, seedMat);
      seed.position.set(Math.cos(angle) * r, h, Math.sin(angle) * r);
      group.add(seed);
    }
  }

  const leafGeo = new THREE.ConeGeometry(0.12, 0.08, 5);
  const leafMat = new THREE.MeshPhongMaterial({ color: 0x2e7d32 });
  const leaf = new THREE.Mesh(leafGeo, leafMat);
  leaf.position.y = 0.36;
  leaf.rotation.x = Math.PI;
  group.add(leaf);
  return group;
}

// Procedural 3D Cream Drop
function create3DCreamDrop() {
  const group = new THREE.Group();
  const dropGeo = new THREE.SphereGeometry(0.09, 10, 10, 0, Math.PI * 2, 0, Math.PI / 2);
  const dropMat = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shininess: 40,
    specular: 0xffffff
  });
  const drop = new THREE.Mesh(dropGeo, dropMat);
  group.add(drop);

  const tipGeo = new THREE.ConeGeometry(0.045, 0.12, 6);
  const tip = new THREE.Mesh(tipGeo, dropMat);
  tip.position.y = 0.07;
  group.add(tip);
  return group;
}

// Procedural Wavy Cream Border
function create3DCreamBorder(radius, yPos, dropsCount, isMobile = false) {
  const group = new THREE.Group();
  const points = [];
  const count = isMobile ? 20 : 40;
  for (let i = 0; i <= count; i++) {
    const a = (i / count) * Math.PI * 2;
    const r = radius + 0.12;
    const wave = Math.sin(a * 8) * 0.035;
    points.push(new THREE.Vector3(Math.cos(a) * (r + wave), Math.sin(a * 10) * 0.02, Math.sin(a) * (r + wave)));
  }
  const curve = new THREE.CatmullRomCurve3(points);
  const tubeGeo = new THREE.TubeGeometry(curve, isMobile ? 32 : 80, 0.08, 6, false);
  const creamMat = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 40, specular: 0xffffff });
  const tubeMesh = new THREE.Mesh(tubeGeo, creamMat);
  tubeMesh.position.y = yPos;
  if (!isMobile) tubeMesh.castShadow = true;
  group.add(tubeMesh);

  const drops = isMobile ? Math.floor(dropsCount / 2) : dropsCount;
  for (let i = 0; i < drops; i++) {
    const a = (i / drops) * Math.PI * 2;
    const drop = create3DCreamDrop();
    drop.position.set(Math.cos(a) * (radius + 0.14), yPos - 0.03, Math.sin(a) * (radius + 0.14));
    drop.scale.setScalar(0.7 + Math.random() * 0.4);
    group.add(drop);
  }
  return group;
}

// Smoke particles for extinguished candle
function create3DSmoke() {
  const count = 28;
  const geom = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 0.15;
    positions[i * 3 + 1] = Math.random() * 0.3;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.15;
    sizes[i] = Math.random() * 0.18 + 0.08;
  }
  geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    color: 0xcccccc,
    size: 0.14,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const points = new THREE.Points(geom, mat);
  points.userData = { active: false, time: 0 };
  return points;
}

function init3DCake() {
  if (typeof THREE === 'undefined') {
    console.warn('Three.js not loaded, falling back to classic 2D');
    return;
  }
  const container = document.getElementById('three-canvas-wrap');
  if (!container) return;

  container.innerHTML = '';
  threeFlameMeshes = [];
  threeFlameMaterials = [];
  threeCandleLights = [];
  threeSmokeSystems = [];

  const isMobile = window.innerWidth < 768;
  const width = container.clientWidth || 800;
  const height = container.clientHeight || 500;

  threeScene = new THREE.Scene();
  threeCamera = new THREE.PerspectiveCamera(46, width / height, 0.1, 1000);
  threeCamera.position.set(0, 7.5, 13.5);

  threeRenderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' });
  threeRenderer.setSize(width, height);
  const maxPixelRatio = isMobile ? 1.0 : Math.min(window.devicePixelRatio || 1, 2);
  threeRenderer.setPixelRatio(maxPixelRatio);
  if (!isMobile) {
    threeRenderer.shadowMap.enabled = true;
    threeRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
  } else {
    threeRenderer.shadowMap.enabled = false;
  }
  container.appendChild(threeRenderer.domElement);

  if (typeof THREE.OrbitControls !== 'undefined') {
    threeControls = new THREE.OrbitControls(threeCamera, threeRenderer.domElement);
    threeControls.enableDamping = !isMobile;
    threeControls.dampingFactor = 0.08;
    threeControls.autoRotate = !isMobile;
    threeControls.autoRotateSpeed = 0.7;
    threeControls.minPolarAngle = Math.PI / 4;
    threeControls.maxPolarAngle = Math.PI / 2.08;
    threeControls.minDistance = 7;
    threeControls.maxDistance = 20;
    threeControls.target.set(0, 3.2, 0);
  }

  // Lighting
  const dirLight = new THREE.DirectionalLight(0xfff8f0, 0.85);
  dirLight.position.set(6, 12, 8);
  if (!isMobile) {
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
  }
  threeScene.add(dirLight);

  const ambLight = new THREE.AmbientLight(0xffedf2, isMobile ? 0.85 : 0.65);
  threeScene.add(ambLight);

  if (!isMobile) {
    const cakeFillLight = new THREE.PointLight(0xffebee, 0.45, 20);
    cakeFillLight.position.set(-6, 8, -6);
    threeScene.add(cakeFillLight);
  }

  // Cake Stand / Table Plate
  const plateSeg = isMobile ? 24 : 48;
  const plateGeo = new THREE.CylinderGeometry(4.2, 4.4, 0.35, plateSeg);
  plateGeo.translate(0, 0.18, 0);
  const plateMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.15,
    roughness: 0.25
  });
  const plateMesh = new THREE.Mesh(plateGeo, plateMat);
  if (!isMobile) plateMesh.receiveShadow = true;
  threeScene.add(plateMesh);

  // Gold rim on plate
  const goldRimGeo = new THREE.TorusGeometry(4.35, 0.06, 12, isMobile ? 32 : 64);
  goldRimGeo.rotateX(Math.PI / 2);
  goldRimGeo.translate(0, 0.36, 0);
  const goldMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.8, roughness: 0.2 });
  threeScene.add(new THREE.Mesh(goldRimGeo, goldMat));

  // Cake Main Group
  threeCakeGroup = new THREE.Group();
  threeScene.add(threeCakeGroup);

  const spongeColor = 0xF5D6BA;
  const spongeMat = new THREE.MeshPhongMaterial({ color: spongeColor, shininess: 12, flatShading: false });
  const creamMat = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 45, specular: 0xffffff });

  // ── Tier 1 (Base Tier) ──
  const tierSeg = isMobile ? 24 : 48;
  const t1Radius = 3.0, t1Height = 1.9;
  const t1Mesh = new THREE.Mesh(new THREE.CylinderGeometry(t1Radius, t1Radius, t1Height, tierSeg), spongeMat);
  t1Mesh.position.y = 0.35 + t1Height / 2;
  if (!isMobile) { t1Mesh.castShadow = true; t1Mesh.receiveShadow = true; }
  threeCakeGroup.add(t1Mesh);

  const t1Cream = new THREE.Mesh(new THREE.CylinderGeometry(t1Radius + 0.08, t1Radius + 0.08, 0.28, tierSeg), creamMat);
  t1Cream.position.y = 0.35 + t1Height + 0.14;
  if (!isMobile) t1Cream.castShadow = true;
  threeCakeGroup.add(t1Cream);
  threeCakeGroup.add(create3DCreamBorder(t1Radius, 0.35 + t1Height + 0.26, 24, isMobile));

  // ── Tier 2 (Middle Tier) ──
  const t2Radius = 2.2, t2Height = 1.4;
  const t2BaseY = 0.35 + t1Height + 0.28;
  const t2Mesh = new THREE.Mesh(new THREE.CylinderGeometry(t2Radius, t2Radius, t2Height, tierSeg), spongeMat);
  t2Mesh.position.y = t2BaseY + t2Height / 2;
  if (!isMobile) { t2Mesh.castShadow = true; t2Mesh.receiveShadow = true; }
  threeCakeGroup.add(t2Mesh);

  const t2Cream = new THREE.Mesh(new THREE.CylinderGeometry(t2Radius + 0.08, t2Radius + 0.08, 0.25, tierSeg), creamMat);
  t2Cream.position.y = t2BaseY + t2Height + 0.125;
  if (!isMobile) t2Cream.castShadow = true;
  threeCakeGroup.add(t2Cream);
  threeCakeGroup.add(create3DCreamBorder(t2Radius, t2BaseY + t2Height + 0.23, 18, isMobile));

  // ── Tier 3 (Top Tier) ──
  const t3Radius = 1.45, t3Height = 1.05;
  const t3BaseY = t2BaseY + t2Height + 0.25;
  const t3Mesh = new THREE.Mesh(new THREE.CylinderGeometry(t3Radius, t3Radius, t3Height, tierSeg), spongeMat);
  t3Mesh.position.y = t3BaseY + t3Height / 2;
  if (!isMobile) { t3Mesh.castShadow = true; t3Mesh.receiveShadow = true; }
  threeCakeGroup.add(t3Mesh);

  const t3Cream = new THREE.Mesh(new THREE.CylinderGeometry(t3Radius + 0.06, t3Radius + 0.06, 0.22, tierSeg), creamMat);
  t3Cream.position.y = t3BaseY + t3Height + 0.11;
  if (!isMobile) t3Cream.castShadow = true;
  threeCakeGroup.add(t3Cream);
  threeCakeGroup.add(create3DCreamBorder(t3Radius, t3BaseY + t3Height + 0.20, 14, isMobile));

  // ── 3D Strawberries on Tiers ──
  const bottomBerryCount = isMobile ? 5 : 8;
  for (let i = 0; i < bottomBerryCount; i++) {
    const a = (i / bottomBerryCount) * Math.PI * 2;
    const berry = create3DStrawberry(isMobile);
    berry.position.set(Math.cos(a) * (t1Radius - 0.35), t2BaseY + 0.18, Math.sin(a) * (t1Radius - 0.35));
    berry.rotation.y = a;
    berry.scale.setScalar(0.85);
    threeCakeGroup.add(berry);
  }
  const topBerryCount = isMobile ? 4 : 6;
  for (let i = 0; i < topBerryCount; i++) {
    const a = (i / topBerryCount) * Math.PI * 2;
    const berry = create3DStrawberry(isMobile);
    berry.position.set(Math.cos(a) * (t2Radius - 0.32), t3BaseY + 0.16, Math.sin(a) * (t2Radius - 0.32));
    berry.rotation.y = a;
    berry.scale.setScalar(0.75);
    threeCakeGroup.add(berry);
  }

  // ── 5 Candles on Top Tier ──
  threeCandlesGroup = new THREE.Group();
  threeCakeGroup.add(threeCandlesGroup);

  const candleTopY = t3BaseY + t3Height + 0.20;
  const candleRadiusRing = 0.95;
  const candleColors = [0xff4d6d, 0xffd166, 0x06d6a0, 0x118ab2, 0x9c27b0];

  // On mobile: 1 central PointLight for all candles instead of 5 separate point lights
  if (isMobile) {
    const centralCandleLight = new THREE.PointLight(0xff9e40, 1.4, 7.5, 2);
    centralCandleLight.position.set(0, candleTopY + 0.35, 0);
    threeCandlesGroup.add(centralCandleLight);
    threeCandleLights.push(centralCandleLight);
  }

  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    const candleGroup = new THREE.Group();
    const cx = Math.cos(angle) * candleRadiusRing;
    const cz = Math.sin(angle) * candleRadiusRing;
    candleGroup.position.set(cx, candleTopY, cz);

    const cHeight = 1.35;
    const cMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, cHeight, isMobile ? 12 : 24),
      new THREE.MeshStandardMaterial({ color: candleColors[i], roughness: 0.3, metalness: 0.1 })
    );
    cMesh.position.y = cHeight / 2;
    if (!isMobile) cMesh.castShadow = true;
    candleGroup.add(cMesh);

    const wick = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.015, 0.18, 6),
      new THREE.MeshBasicMaterial({ color: 0x222222 })
    );
    wick.position.y = cHeight + 0.08;
    candleGroup.add(wick);

    const flameGeo = new THREE.SphereGeometry(0.20, isMobile ? 12 : 24, isMobile ? 12 : 24);
    flameGeo.translate(0, 0.20, 0);
    const flameMat = get3DFlameMaterial(true);
    threeFlameMaterials.push(flameMat);

    const flameMesh = new THREE.Mesh(flameGeo, flameMat);
    flameMesh.position.y = cHeight + 0.12;
    candleGroup.add(flameMesh);
    threeFlameMeshes.push(flameMesh);

    if (!isMobile) {
      const candleLight = new THREE.PointLight(0xff9e40, 1.1, 4.5, 2);
      candleLight.position.y = cHeight + 0.25;
      candleGroup.add(candleLight);
      threeCandleLights.push(candleLight);

      const smoke = create3DSmoke();
      smoke.position.y = cHeight + 0.25;
      candleGroup.add(smoke);
      threeSmokeSystems.push(smoke);
    }

    threeCandlesGroup.add(candleGroup);
  }

  threeClock = new THREE.Clock();
  is3DCakeInitialized = true;
  is3DAnimating = true;
  animate3DCake();

  window.addEventListener('resize', onWindowResize3DCake);
}

function onWindowResize3DCake() {
  if (!threeCamera || !threeRenderer) return;
  const container = document.getElementById('three-canvas-wrap');
  if (!container) return;
  const width = container.clientWidth;
  const height = container.clientHeight;
  if (width === 0 || height === 0) return;
  const isMobile = window.innerWidth < 768;
  threeCamera.aspect = width / height;
  threeCamera.updateProjectionMatrix();
  threeRenderer.setSize(width, height);
  threeRenderer.setPixelRatio(isMobile ? 1.0 : Math.min(window.devicePixelRatio || 1, 2));
}

function pause3DCake() {
  is3DAnimating = false;
  if (threeAnimFrameId) {
    cancelAnimationFrame(threeAnimFrameId);
    threeAnimFrameId = null;
  }
}

function resume3DCake() {
  const cakeModal = document.getElementById('cake-modal');
  const catModal = document.getElementById('cat-video-modal');
  const animePopup = document.getElementById('anime-birthday-popup');

  // Only animate if Cake Modal is actually open and visible, and not covered by video or anime popup
  if (!cakeModal || cakeModal.classList.contains('hidden')) return;
  if (currentCakeView !== '3d') return;
  if (catModal && !catModal.classList.contains('hidden')) return;
  if (animePopup && !animePopup.classList.contains('hidden')) return;

  if (!is3DAnimating && is3DCakeInitialized) {
    is3DAnimating = true;
    if (threeClock) threeClock.getDelta();
    animate3DCake();
  }
}

function animate3DCake(timestamp) {
  if (!is3DAnimating) return;
  threeAnimFrameId = requestAnimationFrame(animate3DCake);

  const delta = threeClock ? threeClock.getDelta() : 0.016;
  const elapsedTime = threeClock ? threeClock.getElapsedTime() : 0;

  for (let i = 0; i < threeFlameMaterials.length; i++) {
    const mat = threeFlameMaterials[i];
    if (mat && mat.uniforms) {
      mat.uniforms.time.value = elapsedTime;
    }
  }

  for (let i = 0; i < threeCandleLights.length; i++) {
    const light = threeCandleLights[i];
    if (light && light.intensity > 0) {
      light.intensity = 1.0 + Math.sin(elapsedTime * 12 + i) * 0.18;
    }
  }

  for (let i = 0; i < threeSmokeSystems.length; i++) {
    const smoke = threeSmokeSystems[i];
    if (smoke && smoke.userData.active) {
      smoke.userData.time += delta;
      const pos = smoke.geometry.attributes.position.array;
      for (let p = 0; p < pos.length / 3; p++) {
        pos[p * 3 + 1] += delta * 0.45;
        pos[p * 3] += (Math.random() - 0.5) * delta * 0.08;
        pos[p * 3 + 2] += (Math.random() - 0.5) * delta * 0.08;
      }
      smoke.geometry.attributes.position.needsUpdate = true;
      if (smoke.userData.time > 2.8) {
        smoke.material.opacity = Math.max(0, smoke.material.opacity - delta * 0.4);
      }
    }
  }

  if (threeControls) {
    threeControls.update();
  }

  if (threeRenderer && threeScene && threeCamera) {
    threeRenderer.render(threeScene, threeCamera);
  }
}

// Click anywhere on 3D cake canvas to make a wish & blow out candles
function handle3DCakeCanvasClick(e) {
  blowOut3DCandles(e);
}

// Extinguish 3D Candles
function blowOut3DCandles(e) {
  if (e) e.stopPropagation();
  if (isWishMade) return;

  threeFlameMeshes.forEach(mesh => {
    mesh.scale.set(0.001, 0.001, 0.001);
  });

  threeFlameMaterials.forEach(mat => {
    if (mat && mat.uniforms) mat.uniforms.isExtinguished.value = 1.0;
  });

  threeCandleLights.forEach(light => {
    light.intensity = 0;
  });

  threeSmokeSystems.forEach(smoke => {
    smoke.userData.active = true;
    smoke.userData.time = 0;
    smoke.material.opacity = 0.65;
  });

  makeCakeWish();
}

/* Web Audio API Microphone Blow Detection */
let micAudioCtx = null;
let micStream = null;
let micAnalyser = null;
let micAnimFrame = null;
let isMicActive = false;

async function toggleMicBlow() {
  if (isMicActive) {
    stopMicBlow();
    return;
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    micStream = stream;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    micAudioCtx = new AudioContext();
    const source = micAudioCtx.createMediaStreamSource(stream);
    micAnalyser = micAudioCtx.createAnalyser();
    micAnalyser.fftSize = 512;
    micAnalyser.smoothingTimeConstant = 0.2;
    source.connect(micAnalyser);

    isMicActive = true;
    const btn = document.getElementById('mic-enable-btn');
    const label = document.getElementById('mic-btn-label');
    const meterWrap = document.getElementById('mic-meter-wrap');
    if (btn) btn.classList.add('active');
    if (label) label.textContent = 'Mic Active 🎤 (Blow!)';
    if (meterWrap) meterWrap.style.display = 'flex';

    monitorMicBlow();
  } catch (err) {
    console.warn('Microphone access denied or error:', err);
    alert('Microphone access was denied or not available. You can still tap the candles to blow them out! 🕯️✨');
    stopMicBlow();
  }
}

function stopMicBlow() {
  isMicActive = false;
  if (micAnimFrame) {
    cancelAnimationFrame(micAnimFrame);
    micAnimFrame = null;
  }
  if (micStream) {
    micStream.getTracks().forEach(track => track.stop());
    micStream = null;
  }
  if (micAudioCtx && micAudioCtx.state !== 'closed') {
    micAudioCtx.close().catch(() => {});
    micAudioCtx = null;
  }
  const btn = document.getElementById('mic-enable-btn');
  const label = document.getElementById('mic-btn-label');
  const meterWrap = document.getElementById('mic-meter-wrap');
  const meterBar = document.getElementById('mic-meter-bar');
  if (btn) btn.classList.remove('active');
  if (label) label.textContent = 'Enable Mic Blow';
  if (meterWrap) meterWrap.style.display = 'none';
  if (meterBar) meterBar.style.width = '0%';
}

function monitorMicBlow() {
  if (!isMicActive || !micAnalyser) return;
  const dataArray = new Uint8Array(micAnalyser.frequencyBinCount);
  micAnalyser.getByteFrequencyData(dataArray);

  // Focus on breath sound frequencies
  let sum = 0;
  for (let i = 0; i < dataArray.length; i++) {
    sum += dataArray[i];
  }
  const average = sum / dataArray.length;
  const percent = Math.min(100, Math.round((average / 85) * 100));
  const meterBar = document.getElementById('mic-meter-bar');
  if (meterBar) meterBar.style.width = `${percent}%`;

  // Blow threshold reached (approx 65%)
  if (percent >= 65 && !isWishMade) {
    stopMicBlow();
    blowOut3DCandles();
    return;
  }

  micAnimFrame = requestAnimationFrame(monitorMicBlow);
}

/* Anime Character Birthday Slide-Up Popup */
let catGifLoopTimer = null;

function restartCatCelebrationGif() {
  const catImg = document.getElementById('celebration-cat-img');
  if (catImg) {
    const currentSrc = catImg.getAttribute('src') || 'assets/cat-celebrate.gif';
    const cleanSrc = currentSrc.split('?')[0];
    catImg.src = cleanSrc + '?t=' + Date.now();
  }
}

function openAnimeBirthdayPopup() {
  pause3DCake();
  if (catGifLoopTimer) {
    clearInterval(catGifLoopTimer);
    catGifLoopTimer = null;
  }
  const popup = document.getElementById('anime-birthday-popup');
  if (popup) {
    popup.classList.remove('hidden');
    launchConfetti();
  }
}

function closeAnimeBirthdayPopup(skipResumeCake = false) {
  const popup = document.getElementById('anime-birthday-popup');
  if (popup) {
    popup.classList.add('hidden');
  }
  if (catGifLoopTimer) {
    clearInterval(catGifLoopTimer);
    catGifLoopTimer = null;
  }
  // Resume 3D cake if video modal is not open and not skipping
  if (!skipResumeCake) {
    const catModal = document.getElementById('cat-video-modal');
    if (!catModal || catModal.classList.contains('hidden')) {
      resume3DCake();
    }
  }
}

function openCakeModal() {
  pauseSakura();
  launchConfetti();
  resetCake();
  const modal = document.getElementById('cake-modal');
  if (modal) modal.classList.remove('hidden');

  if (currentCakeView === '3d') {
    if (!is3DCakeInitialized) {
      setTimeout(init3DCake, 80);
    } else {
      resume3DCake();
      setTimeout(onWindowResize3DCake, 80);
    }
  }
}

function closeCakeModal() {
  pause3DCake();
  stopMicBlow();
  closeAnimeBirthdayPopup();
  closeCatVideoModal();
  const modal = document.getElementById('cake-modal');
  if (modal) modal.classList.add('hidden');
  syncSakuraState();
}

function blowCandle(num, e) {
  if (e) e.stopPropagation();
  const flame = document.getElementById(`flame-${num}`);
  if (flame && !flame.classList.contains('extinguished')) {
    flame.classList.add('extinguished');
    blownCandlesCount++;
    if (blownCandlesCount >= 7) setTimeout(makeCakeWish, 300);
  }
}

function makeCakeWish(e) {
  if (isWishMade) return;
  isWishMade = true;

  // Stop mic blow if active
  stopMicBlow();

  // Extinguish 2D candles if in 2D mode
  for (let i = 1; i <= 7; i++) {
    const flame = document.getElementById(`flame-${i}`);
    if (flame) flame.classList.add('extinguished');
  }

  // Celebratory confetti burst
  launchConfetti();
  setTimeout(launchConfetti, 350);

  // Update top arched text on both 3D & 2D stages
  const threeHeading = document.getElementById('three-cake-heading');
  if (threeHeading) threeHeading.textContent = "HAPPY BIRTHDAY VAISHU! 🎉";

  const archText = document.getElementById('cake-arch-text');
  if (archText) {
    archText.textContent = "HAPPY BIRTHDAY VAISHU! 🌸";
    archText.setAttribute('font-size', '44');
    archText.setAttribute('letter-spacing', '2');
  }

  // Hide hint and show celebration ribbon on cake stage
  const hint = document.getElementById('cake-footer-hint');
  if (hint) hint.style.display = 'none';

  const banner = document.getElementById('cake-wish-banner');
  if (banner) banner.classList.remove('hidden');

  // Show celebratory corner stickers & cat GIF
  const stickers = document.getElementById('celebration-stickers');
  if (stickers) {
    stickers.classList.remove('hidden');
    const catImg = document.getElementById('celebration-cat-img');
    if (catImg) {
      // Ensure GIF starts and loops cleanly from frame 1
      const currentSrc = catImg.getAttribute('src') || 'assets/cat-celebrate.gif';
      const cleanSrc = currentSrc.split('?')[0];
      catImg.src = cleanSrc + '?t=' + Date.now();
    }
  }

  // Reveal Anime Character Slide-Up Birthday Popup
  setTimeout(() => {
    openAnimeBirthdayPopup();
  }, 400);
}

/* ─── CAT BIRTHDAY VIDEO POPUP MODAL LOGIC ─── */
let wasMusicPlayingBeforeCatVideo = false;

function openCatVideoModal() {
  // Explicitly hide cake modal so its WebGL canvas and SVG candles are completely unmounted from the compositor
  const cakeModal = document.getElementById('cake-modal');
  if (cakeModal) cakeModal.classList.add('hidden');

  // PAUSE Three.js 3D Cake render loop
  pause3DCake();
  // PAUSE Falling Sakura Petals canvas loop
  pauseSakura();
  // CLEAR Cat GIF reload interval from previous popup
  if (catGifLoopTimer) {
    clearInterval(catGifLoopTimer);
    catGifLoopTimer = null;
  }

  const modal = document.getElementById('cat-video-modal');
  if (!modal) return;
  modal.classList.remove('hidden');

  // Seamlessly pause background music if it was playing so cat video audio is crystal clear
  if (isMusicPlaying) {
    wasMusicPlayingBeforeCatVideo = true;
    stopBackgroundMusic();
  }

  playCatBirthdayVideo();
}

function playCatBirthdayVideo() {
  const video = document.getElementById('cat-birthday-video');
  const playIcon = document.getElementById('cat-play-overlay-icon');
  if (!video) return;

  const isMobile = window.innerWidth < 768 || ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

  if (isMobile) {
    video.muted = true;
    video.playsInline = true;
    updateCatSoundUI(true);
  } else {
    video.muted = false;
  }

  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      updateCatSoundUI(video.muted);
      if (playIcon) playIcon.classList.add('hidden');
    }).catch((err) => {
      console.warn('Video play attempt failed, retrying with muted fallback:', err);
      video.muted = true;
      video.playsInline = true;
      updateCatSoundUI(true);
      video.play().then(() => {
        if (playIcon) playIcon.classList.add('hidden');
      }).catch((playErr) => {
        console.warn('Video play blocked, revealing tap-to-play overlay:', playErr);
        if (playIcon) playIcon.classList.remove('hidden');
      });
    });
  }
}

function toggleCatVideoSound(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  const video = document.getElementById('cat-birthday-video');
  if (!video) return;

  video.muted = !video.muted;
  if (video.paused) {
    video.play().catch(err => console.log(err));
  }
  updateCatSoundUI(video.muted);
}

function updateCatSoundUI(isMuted) {
  const btn = document.getElementById('cat-sound-toggle-btn');
  const icon = document.getElementById('cat-sound-icon');
  const text = document.getElementById('cat-sound-text');
  if (!btn) return;

  if (isMuted) {
    btn.classList.add('muted-pulse');
    if (icon) icon.textContent = '🔇';
    if (text) text.textContent = 'Tap for Sound 🎵';
  } else {
    btn.classList.remove('muted-pulse');
    if (icon) icon.textContent = '🔊';
    if (text) text.textContent = 'Sound On';
  }
}

function toggleCatVideoPlay(e) {
  if (e) {
    if (e.target.closest && e.target.closest('#cat-sound-toggle-btn')) {
      return;
    }
  }
  const video = document.getElementById('cat-birthday-video');
  const playIcon = document.getElementById('cat-play-overlay-icon');
  if (!video) return;

  if (video.paused) {
    video.play().catch(err => console.log(err));
    if (playIcon) playIcon.classList.add('hidden');
  } else {
    video.pause();
    if (playIcon) playIcon.classList.remove('hidden');
  }
}

function closeCatVideoModal() {
  const modal = document.getElementById('cat-video-modal');
  if (modal) modal.classList.add('hidden');

  const video = document.getElementById('cat-birthday-video');
  if (video) {
    video.pause();
    try { video.currentTime = 0; } catch (e) {}
  }
  const playIcon = document.getElementById('cat-play-overlay-icon');
  if (playIcon) playIcon.classList.add('hidden');

  // Show cake modal again if closing video modal
  const cakeModal = document.getElementById('cake-modal');
  if (cakeModal) cakeModal.classList.remove('hidden');

  // Resume 3D cake if Cake Modal is open
  resume3DCake();
  syncSakuraState();

  // Resume background music if it was playing before
  if (wasMusicPlayingBeforeCatVideo) {
    wasMusicPlayingBeforeCatVideo = false;
    startBackgroundMusic();
  }
}

function handleCatVideoOverlayClick(e) {
  if (e.target.id === 'cat-video-modal') {
    closeCatVideoModal();
  }
}

function goToLetterFromCake() {
  closeCatVideoModal();
  closeCakeModal();
  openMysteryBox(3);
}

function resetCake() {
  closeCatVideoModal();
  closeAnimeBirthdayPopup();
  stopMicBlow();
  isWishMade = false;
  blownCandlesCount = 0;

  const stickers = document.getElementById('celebration-stickers');
  if (stickers) stickers.classList.add('hidden');

  // Relight 3D flames & reset smoke
  if (threeFlameMeshes && threeFlameMeshes.length > 0) {
    threeFlameMeshes.forEach(mesh => {
      mesh.scale.set(1, 1, 1);
    });
  }
  if (threeFlameMaterials && threeFlameMaterials.length > 0) {
    threeFlameMaterials.forEach(mat => {
      if (mat && mat.uniforms) mat.uniforms.isExtinguished.value = 0;
    });
  }
  if (threeCandleLights && threeCandleLights.length > 0) {
    threeCandleLights.forEach(light => {
      light.intensity = 1.1;
    });
  }
  if (threeSmokeSystems && threeSmokeSystems.length > 0) {
    threeSmokeSystems.forEach(smoke => {
      smoke.userData.active = false;
      smoke.userData.time = 0;
      smoke.material.opacity = 0;
    });
  }

  // Relight 2D flames
  for (let i = 1; i <= 7; i++) {
    const flame = document.getElementById(`flame-${i}`);
    if (flame) flame.classList.remove('extinguished');
  }

  const threeHeading = document.getElementById('three-cake-heading');
  if (threeHeading) threeHeading.textContent = "MAKE A WISH";

  const archText = document.getElementById('cake-arch-text');
  if (archText) archText.textContent = "MAKE A WISH";

  const hint = document.getElementById('cake-footer-hint');
  if (hint) hint.style.display = 'block';

  const banner = document.getElementById('cake-wish-banner');
  if (banner) banner.classList.add('hidden');
}

const MYSTERY_GIFTS = {
  1: {
    isMemories: true
  },
  2: {
    isCake: true
  },
  3: {
    icon: "👑",
    title: "Gift #3: Lifetime Happiness Pass",
    desc: "Unlimited hugs, endless laughter, and all your deepest birthday wishes coming true! 🎁💫💖"
  }
};

function openMysteryBox(boxNum) {
  if (boxNum === 1) {
    openMemoriesModal();
    return;
  }
  if (boxNum === 2) {
    openCakeModal();
    return;
  }
  if (boxNum === 3) {
    openLetterModal();
    return;
  }

  launchConfetti();
  const gift = MYSTERY_GIFTS[boxNum] || MYSTERY_GIFTS[3];
  
  const modal = document.getElementById('gift-modal');
  const iconEl = document.getElementById('gift-modal-icon');
  const titleEl = document.getElementById('gift-modal-title');
  const descEl = document.getElementById('gift-modal-desc');

  if (iconEl) iconEl.textContent = gift.icon;
  if (titleEl) titleEl.textContent = gift.title;
  if (descEl) descEl.textContent = gift.desc;

  if (modal) {
    modal.classList.remove('hidden');
  }
}

function closeGiftModal() {
  const modal = document.getElementById('gift-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
  syncSakuraState();
}

/* ─── SPECIAL BOX 3: LOVE & BIRTHDAY LETTER (TYPEWRITER ANIMATION) ─── */
const LETTER_SECTIONS = [
  {
    id: 'letter-headline-el',
    text: "Happy Birthday to the girl who\nowns my favourite smiles, Vaishu! ✨💖"
  },
  {
    id: 'letter-p1-el',
    text: "Sach kahu Sona, tumhari aadat si ho gayi hai. Mere sabse kharab din ko bhi sirf tumhari ek hasi ya ek aawaz pal bhar me theek kar deti hai. You make ordinary moments feel a little magical just by being in them."
  },
  {
    id: 'letter-p2-el',
    text: "Log kehte hain hum besties hain, par sach toh yeh hai ki tum mere liye usse kahin zyada khaas ho. Tumhare saare nakhre, tumhari har choti-badi khushi, aur tumhari har pagalpan wali baat meri favourite hai."
  },
  {
    id: 'letter-closing-el',
    text: "Happy Birthday once again, meri Sona! Aaj bhi, kal bhi, aur hamesha—main sirf tumhari side hu. 🌙❤️"
  }
];

let letterTypewriterTimer = null;
let isLetterTyping = false;

function revealKeepsakeButton() {
  const wrap = document.getElementById('keepsake-action-wrap');
  if (wrap) {
    wrap.classList.remove('hidden');
    wrap.style.display = 'flex';
  }
}

function renderLetterInstant() {
  if (letterTypewriterTimer) {
    clearTimeout(letterTypewriterTimer);
    letterTypewriterTimer = null;
  }
  isLetterTyping = false;
  LETTER_SECTIONS.forEach(sec => {
    const el = document.getElementById(sec.id);
    if (!el) return;
    el.innerHTML = sec.text.replace(/\n/g, '<br>');
  });
  const existingCursor = document.getElementById('letter-typing-cursor');
  if (existingCursor) existingCursor.remove();
  revealKeepsakeButton();
  restoreMusicVolume(0.75, 800);
}

function skipLetterTypewriter() {
  if (isLetterTyping) {
    renderLetterInstant();
  }
}

function startLetterTypewriter() {
  if (letterTypewriterTimer) {
    clearTimeout(letterTypewriterTimer);
    letterTypewriterTimer = null;
  }
  isLetterTyping = true;

  // Hide keepsake button at start of typing
  const wrap = document.getElementById('keepsake-action-wrap');
  if (wrap) {
    wrap.classList.add('hidden');
    wrap.style.display = 'none';
  }

  // Clear target containers
  LETTER_SECTIONS.forEach(sec => {
    const el = document.getElementById(sec.id);
    if (el) el.innerHTML = '';
  });

  // Create or reuse blinking neon cursor
  let cursorEl = document.getElementById('letter-typing-cursor');
  if (!cursorEl) {
    cursorEl = document.createElement('span');
    cursorEl.id = 'letter-typing-cursor';
    cursorEl.className = 'typewriter-cursor';
  }

  let secIndex = 0;
  let charIndex = 0;

  function typeNextChar() {
    if (!isLetterTyping) return;

    if (secIndex >= LETTER_SECTIONS.length) {
      isLetterTyping = false;
      revealKeepsakeButton();
      setTimeout(() => {
        if (cursorEl && cursorEl.parentNode) {
          cursorEl.style.transition = 'opacity 0.6s ease';
          cursorEl.style.opacity = '0';
          setTimeout(() => cursorEl.remove(), 600);
        }
      }, 1600);
      return;
    }

    const currentSection = LETTER_SECTIONS[secIndex];
    const el = document.getElementById(currentSection.id);
    const chars = Array.from(currentSection.text);

    // Subtle tactile haptic pulse at start of each paragraph on mobile
    if (charIndex === 0 && 'vibrate' in navigator) {
      try { navigator.vibrate([15, 60, 15]); } catch (e) {}
    }

    // Audio swell on final emotional closing line
    if (secIndex === LETTER_SECTIONS.length - 1 && charIndex === 0) {
      restoreMusicVolume(0.78, 1800);
    }

    if (charIndex < chars.length) {
      const ch = chars[charIndex];
      charIndex++;

      if (el) {
        if (ch === '\n') {
          el.appendChild(document.createElement('br'));
        } else {
          el.appendChild(document.createTextNode(ch));
        }
        el.appendChild(cursorEl);
      }

      // Natural emotional cadence (pause at punctuation/emojis)
      const delay = (ch === '.' || ch === '!' || ch === '?' || ch === '💖') ? 110 : (ch === ',' ? 50 : 16);
      letterTypewriterTimer = setTimeout(typeNextChar, delay);
    } else {
      secIndex++;
      charIndex = 0;
      letterTypewriterTimer = setTimeout(typeNextChar, 140);
    }
  }

  // Brief pause after polaroid drop before typing begins
  letterTypewriterTimer = setTimeout(typeNextChar, 380);
}

function openLetterModal() {
  pauseSakura();
  launchConfetti();
  // Audio ducking for intimate reading experience
  duckMusicVolume(0.26, 1200);

  const modal = document.getElementById('letter-modal');
  if (modal) {
    modal.classList.remove('hidden');
    const card = modal.querySelector('.letter-card-container');
    if (card) {
      card.classList.remove('animate-letter');
      void card.offsetWidth;
      card.classList.add('animate-letter');
    }
    // Launch dynamic live typewriter typing
    startLetterTypewriter();
  }
}

function closeLetterModal() {
  if (letterTypewriterTimer) {
    clearTimeout(letterTypewriterTimer);
    letterTypewriterTimer = null;
  }
  isLetterTyping = false;
  // Restore background music volume
  restoreMusicVolume(0.75, 400);

  const modal = document.getElementById('letter-modal');
  if (modal) modal.classList.add('hidden');
  syncSakuraState();
}

function handleLetterOverlayClick(e) {
  if (e.target.id === 'letter-modal' || e.target.classList.contains('letter-bg-backdrop')) {
    closeLetterModal();
  }
}

// Physical Keyboard Listener
window.addEventListener('keydown', (e) => {
  const letterModal = document.getElementById('letter-modal');
  if (letterModal && !letterModal.classList.contains('hidden')) {
    if (e.key === 'Escape') {
      closeLetterModal();
      return;
    }
  }

  const cakeModal = document.getElementById('cake-modal');
  if (cakeModal && !cakeModal.classList.contains('hidden')) {
    if (e.key === 'Escape') {
      closeCakeModal();
      return;
    } else if (e.key === ' ' || e.key === 'Enter') {
      makeCakeWish();
      return;
    }
  }

  const memModal = document.getElementById('memories-modal');
  if (memModal && !memModal.classList.contains('hidden')) {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      scrollClothesline(1);
      return;
    } else if (e.key === 'ArrowLeft') {
      scrollClothesline(-1);
      return;
    } else if (e.key === 'Escape') {
      closeMemoriesModal();
      return;
    }
  }

  if (!document.getElementById('quiz-screen').classList.contains('show')) return;
  if (e.key >= '0' && e.key <= '9') {
    pressKey(e.key);
  } else if (e.key === 'Backspace') {
    deleteDigit();
  } else if (e.key === 'Enter') {
    submitBirthdayDate();
  }
});

/* ─── STAGE COUNTDOWN CLOCK (5 SECONDS) ─── */
const hhEl = document.getElementById('hh');
const mmEl = document.getElementById('mm');
const ssEl = document.getElementById('ss');
const secHand = document.getElementById('second-hand');
const minHand = document.getElementById('minute-hand');
const hrHand = document.getElementById('hour-hand');

const pad = n => String(n).padStart(2, '0');
let countLeft = 5;
let countdownTimer = null;

function updateClock(h, m, s) {
  hhEl.textContent = pad(h);
  mmEl.textContent = pad(m);
  ssEl.textContent = pad(s);

  secHand.style.transform = `rotate(${s === 0 ? 360 : s * 6}deg)`;
  minHand.style.transform = `rotate(${(m + s / 60) * 6}deg)`;
  hrHand.style.transform  = `rotate(${((h % 12) + m / 60) * 30}deg)`;
}

function startCountdown() {
  countLeft = 5;
  updateClock(11, 59, 55);

  countdownTimer = setInterval(() => {
    countLeft--;
    if (countLeft > 0) {
      updateClock(11, 59, 60 - countLeft);
      playTick();
    } else {
      clearInterval(countdownTimer);
      updateClock(12, 0, 0);
      playMidnightChime();
      setTimeout(triggerMidnight, 700);
    }
  }, 1000);
}

/* ─── MIDNIGHT REVEAL ─── */
function triggerMidnight() {
  document.getElementById('midnight-burst').classList.add('flash');
  setTimeout(() => {
    document.getElementById('curtain-left').classList.add('open');
    document.getElementById('curtain-right').classList.add('open');
    document.getElementById('countdown-wrap').classList.add('hidden');
  }, 400);
  setTimeout(() => {
    document.getElementById('quiz-screen').classList.add('show');
  }, 1000);
}

/* ─── CONFETTI SYSTEM ─── */
let lastConfettiTime = 0;
function launchConfetti() {
  const isMobile = window.innerWidth < 768;
  const now = Date.now();
  if (isMobile && (now - lastConfettiTime < 600)) {
    return;
  }
  lastConfettiTime = now;

  const colors = ['#ff6b9d','#ffd700','#ff4db8','#00bcd4','#69f0ae','#ff5722'];
  const count = isMobile ? 14 : 60;

  // Clean up any stale confetti from previous burst
  const existing = document.querySelectorAll('.confetti-piece');
  if (existing.length > 40) {
    existing.forEach(el => el.remove());
  }

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const c = document.createElement('div');
    c.className = 'confetti-piece';
    const sz = Math.random() * 8 + 6;
    const dur = (Math.random() * 2 + 1.8).toFixed(2);
    const delay = (Math.random() * 0.6).toFixed(2);
    c.style.cssText = `left:${Math.random()*100}%;top:-20px;width:${sz}px;height:${sz}px;background:${colors[Math.floor(Math.random()*colors.length)]};border-radius:${Math.random()>.5?'50%':'3px'};--cf-d:${dur}s;--cf-delay:${delay}s;`;
    fragment.appendChild(c);

    // Auto-remove after animation completes to avoid DOM node memory leaks!
    setTimeout(() => {
      c.remove();
    }, (parseFloat(dur) + parseFloat(delay) + 0.2) * 1000);
  }

  document.body.appendChild(fragment);
}

/* ─── MOUSE TRAIL HEARTS ─── */
let lastTrail = 0;
document.addEventListener('mousemove', e => {
  // Completely disable on mobile/touch screens to avoid DOM spam and touch stutter
  if (window.innerWidth < 768 || ('ontouchstart' in window) || navigator.maxTouchPoints > 0) return;
  const now = Date.now();
  if (now - lastTrail < 120 || !document.getElementById('curtain-left').classList.contains('open')) return;
  lastTrail = now;
  const em = ['💜','💖','💗','💕','✨','🌸','💜'];
  const h = document.createElement('div');
  h.className = 'trail-heart';
  h.textContent = em[Math.floor(Math.random() * em.length)];
  h.style.left = (e.clientX - 10) + 'px';
  h.style.top = (e.clientY - 10) + 'px';
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 800);
});

/* ─── DREAMY FALLING SAKURA (CHERRY BLOSSOM) PETALS ─── */
let pauseSakura = () => {};
let resumeSakura = () => {};

function isAnyModalOpen() {
  const ids = ['cake-modal', 'memories-modal', 'letter-modal', 'gift-modal', 'cat-video-modal', 'anime-birthday-popup'];
  for (let i = 0; i < ids.length; i++) {
    const el = document.getElementById(ids[i]);
    if (el && !el.classList.contains('hidden')) return true;
  }
  const quiz = document.getElementById('quiz-screen');
  if (quiz && !quiz.classList.contains('hidden') && quiz.classList.contains('show')) return true;
  return false;
}

function syncSakuraState() {
  if (isAnyModalOpen()) {
    pauseSakura();
  } else {
    resumeSakura();
  }
}

(function initSakuraCanvas() {
  const canvas = document.getElementById('sakura-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const getTargetPetalsCount = () => (window.innerWidth < 768 ? 5 : 38);

  const petalColors = [
    'rgba(255, 183, 197, 0.85)',
    'rgba(248, 187, 208, 0.85)',
    'rgba(244, 143, 177, 0.8)',
    'rgba(252, 228, 236, 0.9)',
    'rgba(255, 209, 220, 0.85)',
    'rgba(216, 180, 254, 0.85)', // Borahae pastel lilac
    'rgba(192, 132, 252, 0.82)', // Borahae lavender
  ];

  function createPetal() {
    const isPurpleHeart = Math.random() < 0.22; // ~22% Borahae glowing purple hearts
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 7 + 8,
      speedY: Math.random() * 0.9 + 0.7,
      speedX: Math.random() * 0.7 - 0.2,
      swayOffset: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.02 + 0.015,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      flip: Math.random() * Math.PI,
      flipSpeed: Math.random() * 0.03 + 0.02,
      color: isPurpleHeart ? 'rgba(192, 132, 252, 0.95)' : petalColors[Math.floor(Math.random() * petalColors.length)],
      isHeart: isPurpleHeart,
    };
  }

  let petals = [];
  function adjustPetals() {
    const target = getTargetPetalsCount();
    while (petals.length < target) {
      petals.push(createPetal());
    }
    if (petals.length > target) {
      petals.length = target;
    }
  }
  adjustPetals();

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    adjustPetals();
  });

  function drawPetal(p) {
    if (p.isHeart) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.font = `${p.size * 1.25}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(168, 85, 247, 0.75)';
      ctx.shadowBlur = 10;
      ctx.fillText('💜', 0, 0);
      ctx.restore();
      return;
    }

    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 0.35, p.size * 0.7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return;
    }

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.scale(Math.cos(p.flip), 1);

    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-p.size * 0.5, -p.size * 0.4, -p.size * 0.5, -p.size, 0, -p.size * 1.3);
    ctx.bezierCurveTo(p.size * 0.5, -p.size, p.size * 0.5, -p.size * 0.4, 0, 0);
    ctx.fill();

    ctx.restore();
  }

  let isSakuraRunning = true;
  let sakuraAnimFrameId = null;

  function update() {
    if (!isSakuraRunning || window.innerWidth < 768) return;
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];
      p.y += p.speedY;
      p.x += Math.sin(p.swayOffset) * 0.75 + p.speedX;
      p.swayOffset += p.swaySpeed;
      p.rotation += p.rotationSpeed;
      p.flip += p.flipSpeed;

      if (p.y > height + 20) {
        p.y = -20;
        p.x = Math.random() * width;
      }
      if (p.x > width + 20) p.x = -20;
      if (p.x < -20) p.x = width + 20;

      drawPetal(p);
    }

    sakuraAnimFrameId = requestAnimationFrame(update);
  }

  pauseSakura = function() {
    if (isSakuraRunning) {
      isSakuraRunning = false;
      if (sakuraAnimFrameId) {
        cancelAnimationFrame(sakuraAnimFrameId);
        sakuraAnimFrameId = null;
      }
    }
  };

  resumeSakura = function() {
    if (window.innerWidth < 768) return;
    if (!isSakuraRunning) {
      isSakuraRunning = true;
      sakuraAnimFrameId = requestAnimationFrame(update);
    }
  };

  if (window.innerWidth >= 768) {
    sakuraAnimFrameId = requestAnimationFrame(update);
  }
})();

/* ─── DREAMY BACKGROUND AUDIO (VAAROON FOREVER) ─── */
let isMusicPlaying = false;
let bgAudio = null;

function initBgAudio() {
  if (!bgAudio) {
    bgAudio = new Audio('assets/vaaroon.mp3');
    bgAudio.loop = true;
    bgAudio.volume = 0.75;
    bgAudio.preload = 'auto';

    bgAudio.addEventListener('play', () => {
      isMusicPlaying = true;
      updateMusicButtonState(true);
    });

    bgAudio.addEventListener('pause', () => {
      if (!isMusicPlaying) {
        updateMusicButtonState(false);
      }
    });

    bgAudio.addEventListener('ended', () => {
      if (isMusicPlaying) {
        bgAudio.currentTime = 0;
        bgAudio.play().catch(e => console.warn('bgAudio loop:', e));
      }
    });
  }
  return bgAudio;
}

function startBackgroundMusic() {
  const audio = initBgAudio();
  if (!audio) return;

  isMusicPlaying = true;
  updateMusicButtonState(true);

  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      updateMusicButtonState(true);
    }).catch(err => {
      console.warn('Background audio autoplay prevented by browser gesture policy:', err);
      // Seamlessly activate on next user interaction touch/click
      const resumeOnGesture = () => {
        if (isMusicPlaying) {
          audio.play().catch(e => console.warn('Audio resume error:', e));
        }
        window.removeEventListener('click', resumeOnGesture);
        window.removeEventListener('touchstart', resumeOnGesture);
      };
      window.addEventListener('click', resumeOnGesture, { once: true });
      window.addEventListener('touchstart', resumeOnGesture, { once: true });
    });
  }
}

function stopBackgroundMusic() {
  isMusicPlaying = false;
  if (bgAudio) {
    try {
      bgAudio.pause();
    } catch (e) {
      console.warn('Audio pause error:', e);
    }
  }
  updateMusicButtonState(false);
}

function toggleBackgroundMusic() {
  if (isMusicPlaying) {
    stopBackgroundMusic();
  } else {
    startBackgroundMusic();
  }
}

function updateMusicButtonState(isPlaying) {
  const btn = document.getElementById('music-toggle-btn');
  if (!btn) return;
  if (isPlaying) {
    btn.classList.add('playing');
    btn.classList.remove('muted');
    btn.setAttribute('title', 'Mute Music 🌸');
  } else {
    btn.classList.remove('playing');
    btn.classList.add('muted');
    btn.setAttribute('title', 'Play Dreamy Music 🌸');
  }
}

// Bind music toggle button with safe event binding
(function bindMusicBtn() {
  const setupBtn = () => {
    const btn = document.getElementById('music-toggle-btn');
    if (btn) {
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleBackgroundMusic();
      };
      updateMusicButtonState(isMusicPlaying);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupBtn);
  } else {
    setupBtn();
  }
})();

/* ─── AUDIO DUCKING & SWELL CONTROLLER ─── */
let audioDuckInterval = null;

function duckMusicVolume(targetVol = 0.28, duration = 1000) {
  if (!bgAudio) return;
  if (audioDuckInterval) clearInterval(audioDuckInterval);
  const startVol = bgAudio.volume;
  const steps = 20;
  const stepTime = duration / steps;
  let currentStep = 0;
  audioDuckInterval = setInterval(() => {
    currentStep++;
    const progress = currentStep / steps;
    bgAudio.volume = Math.max(0.04, startVol + (targetVol - startVol) * progress);
    if (currentStep >= steps) {
      clearInterval(audioDuckInterval);
      audioDuckInterval = null;
    }
  }, stepTime);
}

function restoreMusicVolume(targetVol = 0.75, duration = 1200) {
  if (!bgAudio) return;
  if (audioDuckInterval) clearInterval(audioDuckInterval);
  const startVol = bgAudio.volume;
  const steps = 24;
  const stepTime = duration / steps;
  let currentStep = 0;
  audioDuckInterval = setInterval(() => {
    currentStep++;
    const progress = currentStep / steps;
    bgAudio.volume = Math.min(1.0, startVol + (targetVol - startVol) * progress);
    if (currentStep >= steps) {
      clearInterval(audioDuckInterval);
      audioDuckInterval = null;
    }
  }, stepTime);
}

/* ─── BTS 3D FLIP CARD & SECRET VOICE NOTE ─── */
let isBTSFlipped = false;
let voiceAudio = null;
let isVoicePlaying = false;

function handleBTSCardClick(event, container) {
  if (event.target.closest('#bts-voice-btn')) return;
  toggleBTSCardFlip();
}

function toggleBTSCardFlip() {
  const flipWrap = document.getElementById('bts-card-flip-wrap');
  if (!flipWrap) return;
  isBTSFlipped = !isBTSFlipped;
  if (isBTSFlipped) {
    flipWrap.classList.add('is-flipped');
    if ('vibrate' in navigator) { try { navigator.vibrate(25); } catch(e){} }
  } else {
    flipWrap.classList.remove('is-flipped');
    if (isVoicePlaying && voiceAudio) {
      voiceAudio.pause();
      isVoicePlaying = false;
      updateVoiceNoteUI(false);
      restoreMusicVolume(0.75, 400);
    }
  }
}

function toggleSecretVoiceNote(event) {
  if (event) event.stopPropagation();
  if (!voiceAudio) {
    voiceAudio = new Audio('assets/voice-note.mp3');
    voiceAudio.addEventListener('ended', () => {
      isVoicePlaying = false;
      updateVoiceNoteUI(false);
      restoreMusicVolume(0.75, 600);
      launchConfetti();
    });
    voiceAudio.addEventListener('error', (e) => {
      console.warn('Voice note audio notice:', e);
      isVoicePlaying = false;
      updateVoiceNoteUI(false);
      restoreMusicVolume(0.75, 200);
    });
  }

  if (isVoicePlaying) {
    voiceAudio.pause();
    isVoicePlaying = false;
    updateVoiceNoteUI(false);
    restoreMusicVolume(0.75, 400);
  } else {
    duckMusicVolume(0.08, 400);
    voiceAudio.currentTime = 0;
    voiceAudio.play().then(() => {
      isVoicePlaying = true;
      updateVoiceNoteUI(true);
      if ('vibrate' in navigator) { try { navigator.vibrate([20, 60, 20]); } catch(e){} }
    }).catch(err => {
      console.warn('Voice play policy block:', err);
      restoreMusicVolume(0.75, 200);
    });
  }
}

function updateVoiceNoteUI(playing) {
  const icon = document.getElementById('bts-play-icon');
  const label = document.getElementById('bts-voice-label');
  const waveform = document.getElementById('bts-sound-waveform');
  if (icon) icon.textContent = playing ? '⏸️' : '▶️';
  if (label) label.textContent = playing ? 'Pause Voice Note' : 'Play Voice Note';
  if (waveform) {
    if (playing) waveform.classList.add('is-playing');
    else waveform.classList.remove('is-playing');
  }
}

/* ─── KEEPSAKE CANVAS GENERATOR & INSTANT DOWNLOAD (BOX 3) ─── */
function downloadLetterKeepsake(event) {
  if (event) event.stopPropagation();
  const btn = document.getElementById('download-keepsake-btn');
  const toast = document.getElementById('keepsake-toast');
  if (btn) btn.innerHTML = '⏳ Generating Keepsake...';

  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext('2d');

  // Background deep royal purple gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1350);
  bgGrad.addColorStop(0, '#1c082b');
  bgGrad.addColorStop(0.5, '#2f1347');
  bgGrad.addColorStop(1, '#180724');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1080, 1350);

  // Outer decorative border
  ctx.strokeStyle = 'rgba(255, 192, 218, 0.65)';
  ctx.lineWidth = 14;
  ctx.strokeRect(36, 36, 1080 - 72, 1350 - 72);

  ctx.strokeStyle = 'rgba(216, 180, 254, 0.4)';
  ctx.lineWidth = 3;
  ctx.strokeRect(48, 48, 1080 - 96, 1350 - 96);

  // Decorative stars & sparkles
  ctx.fillStyle = 'rgba(255, 230, 150, 0.85)';
  ctx.font = '28px sans-serif';
  ctx.fillText('✨', 80, 110);
  ctx.fillText('⭐', 970, 110);
  ctx.fillText('🌸', 80, 1280);
  ctx.fillText('💜', 970, 1280);

  // Header Title
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fce7f3';
  ctx.font = 'bold 36px "Courier Prime", monospace';
  ctx.fillText('TO: SONA (VAISHU) 🌸✨', 540, 120);

  ctx.fillStyle = '#d8b4fe';
  ctx.font = 'italic 22px "Courier Prime", monospace';
  ctx.fillText('A Forever Keepsake • Birthday 2026', 540, 160);

  // Divider Line
  ctx.strokeStyle = 'rgba(244, 114, 182, 0.4)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(200, 190);
  ctx.lineTo(880, 190);
  ctx.stroke();

  // Load and draw polaroid photo
  const photoImg = new Image();
  photoImg.crossOrigin = 'anonymous';
  photoImg.onload = () => {
    drawKeepsakeContent(ctx, canvas, photoImg, btn, toast);
  };
  photoImg.onerror = () => {
    drawKeepsakeContent(ctx, canvas, null, btn, toast);
  };
  photoImg.src = 'assets/birthday-anime-character.jpg';
}

function drawKeepsakeContent(ctx, canvas, photoImg, btn, toast) {
  if (photoImg) {
    ctx.save();
    ctx.translate(540, 360);
    ctx.rotate(-0.02);
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0,0,0,0.45)';
    ctx.shadowBlur = 25;
    ctx.shadowOffsetY = 12;
    ctx.fillRect(-140, -130, 280, 290);
    ctx.shadowColor = 'transparent';

    ctx.drawImage(photoImg, -120, -110, 240, 200);

    ctx.font = '36px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🎀', 0, 135);
    ctx.restore();
  }

  // Draw Letter Paragraphs
  ctx.textAlign = 'left';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 22px "Courier Prime", monospace';
  ctx.shadowColor = 'rgba(0,0,0,0.6)';
  ctx.shadowBlur = 6;
  ctx.shadowOffsetY = 2;

  const letterLines = [
    'Happy Birthday to the girl who owns my favourite smiles, Vaishu! ✨💖',
    '',
    'Sach kahu Sona, tumhari aadat si ho gayi hai. Mere sabse kharab din',
    'ko bhi sirf tumhari ek hasi ya ek aawaz pal bhar me theek kar deti hai.',
    'You make ordinary moments feel a little magical just by being in them.',
    '',
    'Log kehte hain hum besties hain, par sach toh yeh hai ki tum mere',
    'liye usse kahin zyada khaas ho. Tumhare saare nakhre, tumhari har',
    'choti-badi khushi, aur tumhari har pagalpan wali baat meri favourite hai.',
    '',
    'Happy Birthday once again, meri Sona! Aaj bhi, kal bhi, aur hamesha—',
    'main sirf tumhari side hu. 🌙❤️'
  ];

  let textY = 560;
  const lineHeight = 38;
  letterLines.forEach((line) => {
    if (line.includes('Happy Birthday to the girl')) {
      ctx.fillStyle = '#ffe4e6';
      ctx.font = 'bold 26px "Courier Prime", monospace';
    } else if (line.includes('Happy Birthday once again')) {
      ctx.fillStyle = '#ffd1dc';
      ctx.font = 'bold 25px "Courier Prime", monospace';
    } else {
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px "Courier Prime", monospace';
    }
    ctx.fillText(line, 110, textY);
    textY += lineHeight;
  });

  // Footer signature
  ctx.shadowColor = 'transparent';
  ctx.textAlign = 'right';
  ctx.fillStyle = '#fbcfe8';
  ctx.font = 'italic bold 26px "Courier Prime", monospace';
  ctx.fillText('— With all my heart, Yuvraj 💖', 960, 1220);

  // Trigger download
  try {
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'Sona-Birthday-Keepsake.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    if (btn) btn.innerHTML = '✅ Saved! 📸';
    if (toast) {
      toast.textContent = 'Card saved to your downloads! 💌✨';
      toast.classList.remove('hidden');
      setTimeout(() => toast.classList.add('hidden'), 4000);
    }
    launchConfetti();
  } catch (err) {
    console.warn('Keepsake download notice:', err);
    if (btn) btn.innerHTML = '💌 Save Letter Card ✨';
  }
}

/* ─── KOREAN CAFÉ DIARY ✿ CHERRY BLOSSOM MEMORY BOOK ─── */
function downloadJourneyCollage(event) {
  if (event) event.stopPropagation();
  const btn = document.getElementById('download-journey-btn');
  const toast = document.getElementById('keepsake-toast');
  if (btn && btn.dataset.generating === 'true') return;
  if (btn) { btn.dataset.generating = 'true'; btn.innerHTML = '⏳ Crafting Memory Book...'; }

  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 2200;
  const ctx = canvas.getContext('2d');

  const loadImg = (src) => new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });

  const getQRCanvas = () => {
    if (typeof QRCode === 'undefined') return null;
    try {
      const wrap = document.createElement('div');
      wrap.style.cssText = 'position:fixed;left:-9999px;top:-9999px;visibility:hidden;';
      document.body.appendChild(wrap);
      new QRCode(wrap, {
        text: 'https://yuvraj2248.github.io/secret-birthday-gift/',
        width: 200, height: 200,
        colorDark: '#7a4a3a', colorLight: '#fdf6ee',
        correctLevel: QRCode.CorrectLevel.M
      });
      const qrEl = wrap.querySelector('canvas') || wrap.querySelector('img');
      if (!qrEl) { document.body.removeChild(wrap); return null; }
      const tmp = document.createElement('canvas');
      tmp.width = 200; tmp.height = 200;
      tmp.getContext('2d').drawImage(qrEl, 0, 0, 200, 200);
      document.body.removeChild(wrap);
      return tmp;
    } catch(e) { return null; }
  };

  const fontsTimeout = new Promise(resolve => setTimeout(resolve, 1500));
  const fontsReady = (document.fonts && document.fonts.ready)
    ? Promise.race([document.fonts.ready, fontsTimeout])
    : Promise.resolve();

  Promise.all([
    fontsReady,
    loadImg('assets/shinchan-birthday.png'),
    loadImg('assets/bts-photocard.jpg'),
    loadImg('assets/birthday-anime-character.jpg'),
    loadImg('assets/memory1.jpg'),
    loadImg('assets/memory2.jpg'),
    loadImg('assets/memory3.jpg'),
    loadImg('assets/memory4.jpg'),
    loadImg('assets/memory5.jpg')
  ]).then(([, shinchanImg, btsImg, anyaImg, m1, m2, m3, m4, m5]) => {
    const qrC = getQRCanvas();
    renderKoreanCafeCollage(ctx, canvas, { shinchanImg, btsImg, anyaImg, m1, m2, m3, m4, m5 }, btn, toast, qrC);
  }).catch(() => {
    renderKoreanCafeCollage(ctx, canvas, {}, btn, toast, null);
  });
}

function renderKoreanCafeCollage(ctx, canvas, imgs, btn, toast, qrCanvas) {
  const W = 1200, H = 2200;
  const { shinchanImg, btsImg, anyaImg, m1, m2, m3, m4, m5 } = imgs;

  /* ── HELPERS ── */

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function wrapText(text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '', cy = y;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      if (ctx.measureText(testLine).width > maxWidth && n > 0) {
        ctx.fillText(line.trim(), x, cy);
        line = words[n] + ' ';
        cy += lineHeight;
      } else { line = testLine; }
    }
    ctx.fillText(line.trim(), x, cy);
    return cy;
  }

  function drawCoffeeRing(x, y, r) {
    const outer = ctx.createRadialGradient(x, y, r * 0.74, x, y, r);
    outer.addColorStop(0, 'rgba(140,88,42,0.09)');
    outer.addColorStop(0.55, 'rgba(130,78,32,0.06)');
    outer.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = outer;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(118,72,28,0.12)'; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.arc(x, y, r * 0.87, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = 'rgba(128,78,30,0.07)'; ctx.lineWidth = 9;
    ctx.beginPath(); ctx.arc(x, y, r * 0.80, 0, Math.PI * 2); ctx.stroke();
  }

  function drawBlossom(x, y, size, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    const pColors = ['#f9beca', '#f4b2c2', '#fad0d8', '#f8c4cf', '#fac8d4'];
    for (let p = 0; p < 5; p++) {
      ctx.save();
      ctx.rotate((p * 72 + 10) * Math.PI / 180);
      ctx.beginPath();
      ctx.ellipse(0, -size * 0.52, size * 0.34, size * 0.52, 0, 0, Math.PI * 2);
      ctx.fillStyle = pColors[p];
      ctx.fill();
      ctx.restore();
    }
    ctx.beginPath(); ctx.arc(0, 0, size * 0.15, 0, Math.PI * 2);
    ctx.fillStyle = '#fde4ee'; ctx.fill();
    ctx.restore();
  }

  function drawPetal(x, y, sz, rot, alpha) {
    ctx.save(); ctx.globalAlpha = alpha;
    ctx.translate(x, y); ctx.rotate(rot);
    ctx.beginPath();
    ctx.ellipse(0, 0, sz * 0.36, sz * 0.82, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#f8c2ce'; ctx.fill();
    ctx.restore();
  }

  function drawBranch(x1, y1, x2, y2) {
    ctx.save();
    ctx.strokeStyle = 'rgba(182,136,116,0.36)';
    ctx.lineWidth = 2.2; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x1, y1);
    const mx = x1 + (x2 - x1) * 0.38, my = y1 + (y2 - y1) * 0.3;
    ctx.quadraticCurveTo(mx, my, x2, y2); ctx.stroke();
    const b1x = x1 + (x2 - x1) * 0.3, b1y = y1 + (y2 - y1) * 0.28;
    ctx.beginPath(); ctx.moveTo(b1x, b1y); ctx.lineTo(b1x - 34, b1y - 50); ctx.stroke();
    drawBlossom(b1x - 36, b1y - 54, 13, 0.48);
    const b2x = x1 + (x2 - x1) * 0.62, b2y = y1 + (y2 - y1) * 0.58;
    ctx.beginPath(); ctx.moveTo(b2x, b2y); ctx.lineTo(b2x + 32, b2y - 46); ctx.stroke();
    drawBlossom(b2x + 34, b2y - 50, 12, 0.46);
    drawBlossom(x2, y2, 15, 0.52);
    drawBlossom(x2 - 20, y2 - 16, 9, 0.36);
    ctx.restore();
  }

  function drawPolaroid(img, cx, cy, outerW, outerH, angleDeg, caption, tapeColor) {
    const angle = angleDeg * Math.PI / 180;
    const pad = 14, captionH = 64;
    const photoW = outerW - pad * 2;
    const photoH = outerH - pad - captionH;
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(angle);
    ctx.shadowColor = 'rgba(98,52,22,0.22)';
    ctx.shadowBlur = 22; ctx.shadowOffsetX = 5; ctx.shadowOffsetY = 8;
    ctx.fillStyle = '#fffef9';
    ctx.fillRect(-outerW / 2, -outerH / 2, outerW, outerH);
    ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0;
    ctx.fillStyle = '#ede4da';
    ctx.fillRect(-outerW / 2 + pad, -outerH / 2 + pad, photoW, photoH);
    if (img) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(-outerW / 2 + pad, -outerH / 2 + pad, photoW, photoH);
      ctx.clip();
      const ia = img.width / img.height, fa = photoW / photoH;
      let dw, dh, dx, dy;
      if (ia > fa) {
        dh = photoH; dw = dh * ia;
        dy = -outerH / 2 + pad; dx = -outerW / 2 + pad - (dw - photoW) / 2;
      } else {
        dw = photoW; dh = dw / ia;
        dx = -outerW / 2 + pad; dy = -outerH / 2 + pad - (dh - photoH) / 2;
      }
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    }
    ctx.strokeStyle = 'rgba(188,155,136,0.28)'; ctx.lineWidth = 1;
    ctx.strokeRect(-outerW / 2 + pad, -outerH / 2 + pad, photoW, photoH);
    ctx.fillStyle = '#9a7060';
    ctx.font = 'italic 17px "Courier Prime", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(caption, 0, -outerH / 2 + pad + photoH + captionH / 2 + 4, outerW - 16);
    if (tapeColor) {
      ctx.fillStyle = tapeColor; ctx.globalAlpha = 0.68;
      ctx.fillRect(-32, -outerH / 2 - 9, 64, 13);
      ctx.globalAlpha = 1;
    }
    ctx.restore();
  }

  function drawWaveform(x, y, w, h, color) {
    const bars = [0.40, 0.72, 0.90, 0.55, 1.00, 0.78, 0.48, 0.88, 0.62, 0.38,
                  0.92, 0.68, 0.52, 0.82, 0.96, 0.58, 0.44, 0.76, 0.91, 0.50,
                  0.68, 0.86, 0.58, 0.42];
    const bw = Math.max(3, Math.floor(w / bars.length) - 3);
    ctx.fillStyle = color;
    bars.forEach((bh, i) => {
      const barH = bh * h;
      ctx.globalAlpha = 0.62 + bh * 0.38;
      roundRect(x + i * (bw + 3), y + h - barH, bw, barH, 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  /* ── 1. IVORY PAPER BACKGROUND ── */
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0,   '#fdf7ef');
  bg.addColorStop(0.3, '#fdf1e8');
  bg.addColorStop(0.7, '#fcefe5');
  bg.addColorStop(1,   '#fdf5ec');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

  // Paper grain noise
  ctx.save();
  for (let i = 0; i < 9500; i++) {
    ctx.globalAlpha = Math.random() * 0.030 + 0.006;
    ctx.fillStyle = Math.random() > 0.45 ? '#8a5232' : '#c8af95';
    const nx = Math.random() * W, ny = Math.random() * H;
    const ns = Math.random() * 1.8 + 0.2;
    ctx.fillRect(nx, ny, ns, ns);
  }
  ctx.globalAlpha = 1; ctx.restore();

  /* ── 2. OUTER BORDER ── */
  ctx.strokeStyle = 'rgba(200,162,142,0.20)'; ctx.lineWidth = 2;
  ctx.strokeRect(34, 34, W - 68, H - 68);

  /* ── 3. WASHI TAPE TOP & BOTTOM ── */
  const tw1 = ctx.createLinearGradient(0, 0, W, 0);
  ['rgba(255,182,193,0.42)', 'rgba(255,210,222,0.36)', 'rgba(255,192,206,0.42)',
   'rgba(238,198,228,0.36)', 'rgba(255,182,193,0.42)'].forEach((c, i) => tw1.addColorStop(i / 4, c));
  ctx.fillStyle = tw1; ctx.fillRect(0, 0, W, 18);
  ctx.fillStyle = 'rgba(255,255,255,0.26)';
  for (let i = 9; i < W; i += 22) { ctx.beginPath(); ctx.arc(i, 9, 3.2, 0, Math.PI * 2); ctx.fill(); }

  const tw2 = ctx.createLinearGradient(0, H - 18, W, H);
  tw2.addColorStop(0, 'rgba(208,192,255,0.36)');
  tw2.addColorStop(0.5, 'rgba(192,212,255,0.32)');
  tw2.addColorStop(1, 'rgba(208,192,255,0.36)');
  ctx.fillStyle = tw2; ctx.fillRect(0, H - 18, W, 18);
  ctx.fillStyle = 'rgba(255,255,255,0.20)';
  for (let i = 9; i < W; i += 22) { ctx.beginPath(); ctx.arc(i, H - 9, 3.2, 0, Math.PI * 2); ctx.fill(); }

  /* ── 4. COFFEE RING STAINS ── */
  drawCoffeeRing(1022, 118, 74);
  drawCoffeeRing(168, H - 198, 57);

  /* ── 5. SCATTERED PETALS ── */
  const petals = [
    [76,152,9,0.28,0.52],[192,82,7,1.10,0.43],[1118,242,8,-0.48,0.47],
    [1068,395,6,0.82,0.37],[50,442,10,-0.32,0.43],[1148,715,7,1.18,0.39],
    [86,898,8,0.58,0.47],[1110,1064,6,-0.88,0.37],[56,1358,9,0.42,0.43],
    [1130,1495,7,-0.62,0.37],[106,1718,8,1.02,0.47],[1094,1788,6,0.32,0.37],
    [66,1988,10,-0.68,0.47],[546,65,7,0.88,0.37],[684,2122,8,-0.42,0.43],
    [288,128,6,0.50,0.34],[902,92,7,-0.70,0.34],[342,2055,6,0.60,0.37]
  ];
  petals.forEach(([px, py, ps, pr, pa]) => drawPetal(px, py, ps, pr, pa));

  drawBlossom(50, 86, 18, 0.37); drawBlossom(1150, 112, 15, 0.33);
  drawBlossom(48, H - 118, 18, 0.37); drawBlossom(1150, H - 100, 15, 0.33);

  /* ── 6. FLORAL BRANCHES ── */
  drawBranch(36, 345, 28, 608);
  drawBranch(1164, 906, 1174, 1128);
  drawBranch(32, 1462, 40, 1658);
  drawBranch(1168, 1772, 1158, 1938);

  /* ── 7. HEADER ── */
  ctx.textAlign = 'center';

  ctx.fillStyle = '#b09080';
  ctx.font = '700 20px "Courier Prime", monospace';
  ctx.fillText('✦   A  L I T T L E  M E M O R Y  B O O K   ✦', W / 2, 76);

  ctx.fillStyle = '#7a4838';
  ctx.font = '700 64px "Great Vibes", cursive';
  ctx.fillText('A little universe, just for you ♡', W / 2, 150);

  ctx.fillStyle = '#c09078';
  ctx.font = 'italic 400 22px "Courier Prime", monospace';
  ctx.fillText('a birthday journey made of little moments', W / 2, 188);

  ctx.strokeStyle = 'rgba(198,155,135,0.36)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(172, 210); ctx.lineTo(524, 210); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(676, 210); ctx.lineTo(1028, 210); ctx.stroke();
  drawBlossom(600, 210, 14, 0.52);
  drawBlossom(550, 210, 8, 0.36); drawBlossom(650, 210, 8, 0.36);

  /* ── 8. POLAROID GALLERY (2 ROWS x 3 COLUMNS) ── */
  drawPolaroid(m1,  215, 432, 310, 378, -4.0, 'waku waku! her day 🎂',        'rgba(255,182,193,0.65)');
  drawPolaroid(m2,  600, 448, 310, 378, +2.5, 'smiles & surprises 🎁',        'rgba(210,194,255,0.65)');
  drawPolaroid(m3,  985, 425, 310, 378, -2.2, 'bestie adventures 🎈',         'rgba(174,216,252,0.65)');

  drawPolaroid(m4,  215, 855, 310, 378, +3.5, 'make a magical wish 🕯️',       'rgba(188,228,204,0.65)');
  drawPolaroid(m5,  600, 862, 310, 378, -2.5, 'always by your side 🌸',       'rgba(255,182,193,0.65)');
  drawPolaroid(btsImg, 985, 848, 310, 378, +1.8, 'borahae sona! 💜✨',        'rgba(216,198,255,0.65)');

  /* ── 9. SHINCHAN MINI CAMEO ── */
  const shinY = 1086;
  ctx.save();
  ctx.shadowColor = 'rgba(98,52,22,0.10)'; ctx.shadowBlur = 12; ctx.shadowOffsetY = 4;
  ctx.fillStyle = '#fffef9';
  roundRect(496, shinY, 208, 88, 7); ctx.fill();
  ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0;
  ctx.strokeStyle = 'rgba(208,172,152,0.20)'; ctx.lineWidth = 1;
  roundRect(496, shinY, 208, 88, 7); ctx.stroke();
  ctx.restore();

  if (shinchanImg) {
    ctx.save();
    ctx.beginPath(); roundRect(500, shinY + 4, 78, 80, 5); ctx.clip();
    ctx.drawImage(shinchanImg, 500, shinY + 4, 78, 80);
    ctx.restore();
  }
  ctx.fillStyle = '#9a7060'; ctx.font = 'italic 16px "Courier Prime", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('the vault keeper 🎭', 588, shinY + 28);
  ctx.fillStyle = '#c0a090'; ctx.font = '14px "Courier Prime", monospace';
  ctx.fillText('passcode: [ * ][ * ][ * ][ * ]', 588, shinY + 50);
  ctx.fillStyle = '#d4b8a8'; ctx.fillText('✦ our little secret ✦', 596, shinY + 70);
  ctx.fillStyle = 'rgba(255,182,193,0.55)'; ctx.fillRect(540, shinY - 8, 56, 11);

  /* ── 10. LETTER INSERT ── */
  const lx = 58, ly = 1202, lw = 1084, lh = 575;

  ctx.save();
  ctx.shadowColor = 'rgba(98,52,22,0.11)'; ctx.shadowBlur = 26; ctx.shadowOffsetY = 10;
  ctx.fillStyle = '#fffef9';
  roundRect(lx, ly, lw, lh, 7); ctx.fill();
  ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0;
  ctx.strokeStyle = 'rgba(198,165,145,0.18)'; ctx.lineWidth = 1.5;
  roundRect(lx, ly, lw, lh, 7); ctx.stroke();

  // Left accent bar
  const barG = ctx.createLinearGradient(0, ly, 0, ly + lh);
  barG.addColorStop(0, '#f4a6bc'); barG.addColorStop(0.5, '#d49ebe'); barG.addColorStop(1, '#bfaedf');
  ctx.fillStyle = barG; roundRect(lx, ly, 7, lh, 4); ctx.fill();
  ctx.restore();

  // Ruled lines
  ctx.strokeStyle = 'rgba(206,178,166,0.15)'; ctx.lineWidth = 1;
  for (let li = 0; li < 15; li++) {
    const lineY = ly + 98 + li * 32;
    ctx.beginPath(); ctx.moveTo(lx + 26, lineY); ctx.lineTo(lx + lw - 22, lineY); ctx.stroke();
  }

  // Tiny washi tape on top of letter
  ctx.fillStyle = 'rgba(215,198,255,0.55)'; ctx.fillRect(lx + lw - 220, ly - 8, 58, 11);
  ctx.fillStyle = 'rgba(255,182,193,0.50)'; ctx.fillRect(lx + 82, ly - 8, 48, 11);

  // Letter title
  ctx.fillStyle = '#8a4858';
  ctx.font = '700 31px "Great Vibes", cursive';
  ctx.textAlign = 'left';
  ctx.fillText('✉️  a little note, from the heart', lx + 28, ly + 56);

  ctx.strokeStyle = 'rgba(198,145,158,0.26)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(lx + 28, ly + 72); ctx.lineTo(lx + lw - 28, ly + 72); ctx.stroke();

  // Small anyaImg polaroid inside letter, top-right
  if (anyaImg) {
    ctx.save();
    ctx.translate(lx + lw - 95, ly + 152); ctx.rotate(0.045);
    ctx.shadowColor = 'rgba(98,52,22,0.18)'; ctx.shadowBlur = 12; ctx.shadowOffsetY = 5;
    ctx.fillStyle = '#fff'; ctx.fillRect(-46, -44, 100, 112);
    ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0;
    ctx.save(); ctx.beginPath(); ctx.rect(-46, -44, 100, 86); ctx.clip();
    ctx.drawImage(anyaImg, -46, -44, 100, 86); ctx.restore();
    ctx.fillStyle = '#9a7060'; ctx.font = 'italic 13px "Courier Prime", monospace';
    ctx.textAlign = 'center'; ctx.fillText('for you 🎀', 4, 52);
    ctx.restore();
    ctx.fillStyle = 'rgba(216,198,255,0.56)'; ctx.fillRect(lx + lw - 136, ly + 100, 46, 10);
  }

  // Letter body
  const ltW = anyaImg ? lw - 175 : lw - 60;
  const ltX = lx + 30;
  let ty = ly + 95;
  const lH = 32;

  ctx.fillStyle = '#7a5050'; ctx.font = '700 19px "Courier Prime", monospace';
  ctx.textAlign = 'left';
  ty = wrapText('Happy Birthday to the girl who owns my favourite smiles, Vaishu! ✨💖', ltX, ty, ltW, lH) + lH + 8;

  ctx.fillStyle = '#7a5e5a'; ctx.font = '400 17px "Courier Prime", monospace';
  ty = wrapText('Sach kahu Sona, tumhari aadat si ho gayi hai. Mere sabse kharab din ko bhi sirf tumhari ek hasi ya ek aawaz pal bhar me theek kar deti hai. You make ordinary moments feel magical just by being in them.', ltX, ty, ltW, lH) + Math.round(lH * 0.55);

  ty = wrapText('Log kehte hain hum besties hain, par sach toh yeh hai ki tum mere liye usse kahin zyada khaas ho. Tumhare saare nakhre, tumhari har choti-badi khushi, aur tumhari har pagalpan wali baat meri favourite hai.', ltX, ty, ltW, lH) + Math.round(lH * 0.52);

  ctx.fillStyle = '#9a5460'; ctx.font = 'italic 700 17px "Courier Prime", monospace';
  wrapText('Happy Birthday once again, meri Sona! Aaj bhi, kal bhi, aur hamesha — main sirf tumhari side hu. 🌙❤️', ltX, ty, ltW, lH);

  // Closing
  ctx.fillStyle = '#b06070'; ctx.font = '700 30px "Great Vibes", cursive';
  ctx.textAlign = 'right';
  ctx.fillText('— With all my love, Yuvraj  ♡', lx + lw - 28, ly + lh - 28);

  /* ── 11. MUSIC MOTIF ── */
  const musicY = 1820;

  ctx.save();
  ctx.fillStyle = 'rgba(250,241,236,0.88)';
  roundRect(60, musicY - 18, 510, 118, 8); ctx.fill();
  ctx.strokeStyle = 'rgba(206,174,158,0.20)'; ctx.lineWidth = 1;
  roundRect(60, musicY - 18, 510, 118, 8); ctx.stroke();
  ctx.restore();

  ctx.fillStyle = '#b09080'; ctx.font = 'italic 19px "Courier Prime", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('♪  Vaaroon — playing softly', 82, musicY + 14);
  ctx.fillStyle = '#c8ae9e'; ctx.font = '15px "Courier Prime", monospace';
  ctx.fillText('Anand Bhaskar  ·  Official Soundtrack', 82, musicY + 38);
  drawWaveform(82, musicY + 52, 458, 46, '#e49eae');

  /* ── 12. QR CODE (TILTED) ── */
  const qrCX = 944, qrCY = 1886;
  const qrSz = 168;

  ctx.save();
  ctx.translate(qrCX, qrCY);
  ctx.rotate(-0.13); // ~7.5° tilt

  // Polaroid-style frame
  ctx.shadowColor = 'rgba(98,52,22,0.20)'; ctx.shadowBlur = 16;
  ctx.shadowOffsetX = 4; ctx.shadowOffsetY = 7;
  ctx.fillStyle = '#fffef9';
  ctx.fillRect(-qrSz / 2 - 14, -qrSz / 2 - 14, qrSz + 28, qrSz + 58);
  ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0;
  ctx.strokeStyle = 'rgba(188,155,136,0.26)'; ctx.lineWidth = 1;
  ctx.strokeRect(-qrSz / 2 - 14, -qrSz / 2 - 14, qrSz + 28, qrSz + 58);

  if (qrCanvas) {
    ctx.drawImage(qrCanvas, -qrSz / 2, -qrSz / 2, qrSz, qrSz);
  } else {
    // Decorative fallback QR pattern
    const cell = qrSz / 13;
    const pat = [
      [1,1,1,1,1,1,1,0,0,1,0,1,0],[1,0,0,0,0,0,1,0,1,0,1,0,1],
      [1,0,1,1,1,0,1,0,0,1,0,1,0],[1,0,1,1,1,0,1,0,1,1,1,0,1],
      [1,0,1,1,1,0,1,0,0,0,1,0,0],[1,0,0,0,0,0,1,0,1,0,0,1,0],
      [1,1,1,1,1,1,1,0,0,1,0,0,1],[0,0,0,0,0,0,0,0,1,0,1,1,0],
      [0,1,1,0,1,0,1,1,0,1,0,0,1],[1,0,0,1,0,1,0,0,1,1,0,1,0],
      [0,1,0,1,1,0,1,1,0,0,1,0,1],[1,1,1,0,0,1,1,0,1,0,1,1,0],
      [0,0,1,1,0,0,1,0,0,1,0,0,1]
    ];
    ctx.fillStyle = '#fdf6ee';
    ctx.fillRect(-qrSz / 2, -qrSz / 2, qrSz, qrSz);
    ctx.fillStyle = '#7a4838';
    pat.forEach((row, ri) => row.forEach((v, ci) => {
      if (v) ctx.fillRect(-qrSz / 2 + ci * cell, -qrSz / 2 + ri * cell, cell - 0.5, cell - 0.5);
    }));
  }

  ctx.fillStyle = '#9a7060'; ctx.font = 'italic 14px "Courier Prime", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('visit the journal ↗', 0, qrSz / 2 + 30);

  // Washi on QR frame
  ctx.fillStyle = 'rgba(255,182,193,0.62)';
  ctx.fillRect(-28, -qrSz / 2 - 22, 56, 13);

  ctx.restore();

  // Scan hint beside QR
  ctx.save();
  ctx.translate(qrCX - qrSz / 2 - 58, qrCY - 20); ctx.rotate(-0.13);
  ctx.fillStyle = '#b09080'; ctx.font = 'italic 15px "Courier Prime", monospace';
  ctx.textAlign = 'right';
  ctx.fillText('scan to open →', 0, 0);
  ctx.fillText('the full birthday', 0, 22);
  ctx.fillText('experience ✨', 0, 44);
  ctx.restore();

  /* ── 13. BOTTOM SECTION ── */
  const botY = 2012;

  drawBranch(128, botY - 42, 208, botY + 62);
  drawBranch(1072, botY - 32, 995, botY + 58);

  drawBlossom(298, botY - 8, 11, 0.37); drawBlossom(922, botY + 2, 10, 0.34);
  drawBlossom(438, botY + 22, 9, 0.31); drawBlossom(782, botY + 16, 10, 0.33);

  ctx.strokeStyle = 'rgba(198,155,134,0.32)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(172, botY + 24); ctx.lineTo(468, botY + 24); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(732, botY + 24); ctx.lineTo(1028, botY + 24); ctx.stroke();
  drawBlossom(600, botY + 24, 15, 0.50);
  drawBlossom(504, botY + 24, 8, 0.36); drawBlossom(696, botY + 24, 8, 0.36);

  ctx.fillStyle = '#a07866'; ctx.font = 'italic 400 28px "Playfair Display", serif';
  ctx.textAlign = 'center';
  ctx.fillText('“Some little moments deserve to stay forever.”', W / 2, botY + 76);

  ctx.fillStyle = '#c4909a'; ctx.font = '700 38px "Great Vibes", cursive';
  ctx.fillText("🌸   Vaishu's Birthday, October 2026   🌸", W / 2, botY + 128);

  ctx.fillStyle = '#d4b6ae'; ctx.font = '18px monospace';
  ctx.fillText('·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·', W / 2, botY + 160);

  ctx.fillStyle = '#c0a896'; ctx.font = '400 15px "Courier Prime", monospace';
  ctx.fillText('made with love by Yuvraj  •  yuvraj2248.github.io/secret-birthday-gift', W / 2, botY + 186);

  /* ── 14. DOWNLOAD PNG ── */
  try {
    canvas.toBlob((blob) => {
      if (!blob) throw new Error('blob null');
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'Sona-Birthday-Memory-Book-2026.png';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 6000);
      if (btn) { btn.innerHTML = '✅ Memory Book Saved! 🌸'; btn.dataset.generating = 'false'; }
      if (toast) {
        toast.textContent = 'Korean Café Memory Book saved! 🌸💖';
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 4500);
      }
      launchConfetti();
    }, 'image/png');
  } catch (err) {
    console.warn('Collage error:', err);
    try {
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png'); a.download = 'Sona-Birthday-Memory-Book-2026.png';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    } catch(e2) { console.warn('Fallback failed:', e2); }
    if (btn) { btn.innerHTML = '🌸 Korean Café Memory Book 🌸'; btn.dataset.generating = 'false'; }
  }
}


/* ─── START ON LOAD ─── */
startCountdown();


