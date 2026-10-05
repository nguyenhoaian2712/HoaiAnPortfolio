/* ==========================================================================
   ALICE IN WONDERLAND INTERACTIVE PORTFOLIO - JAVASCRIPT ENGINE
   Featuring: Web Audio Synthesizer, Particle Canvas, Interactive Rabbit Hole,
   Cheshire Cat AI Simulator, Mad Hatter Tea Party & Queen of Hearts Cards.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMagicCanvas();
  initCustomCursor();
  initWebAudioSystem();
  initRabbitHoleEntrance();
  initLivePocketWatch();
  initLanguageSwitcher();
  initCheshireCatAndAISimulator();
  initMadHatterTeaParty();
  initQueenOfHeartsMiniGame();
  initContactAndCopyActions();
  init3DCardTilt();
});

/* ==========================================================================
   1. PROCEDURAL WEB AUDIO SYNTHESIZER (FAIRYTALE LULLABY & SFX)
   ========================================================================== */
let audioCtx = null;
let isMusicPlaying = false;
let isSfxEnabled = true;
let musicInterval = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Procedural Fairytale Music Box Synthesizer (Celesta / Music Box Waltz)
const fairytaleMelody = [
  { note: 523.25, dur: 0.5 }, // C5
  { note: 659.25, dur: 0.5 }, // E5
  { note: 783.99, dur: 0.5 }, // G5
  { note: 987.77, dur: 1.0 }, // B5
  { note: 880.00, dur: 0.5 }, // A5
  { note: 659.25, dur: 0.5 }, // E5
  { note: 698.46, dur: 0.5 }, // F5
  { note: 880.00, dur: 1.0 }, // A5
  { note: 783.99, dur: 0.5 }, // G5
  { note: 587.33, dur: 0.5 }, // D5
  { note: 659.25, dur: 0.5 }, // E5
  { note: 523.25, dur: 1.2 }  // C5
];

let melodyIndex = 0;

function playMusicBoxNote(freq, duration = 0.5) {
  if (!isMusicPlaying) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Bell / Celesta harmonic
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2.01, ctx.currentTime);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration * 2.2);

    gain2.gain.setValueAtTime(0.03, ctx.currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration * 1.5);

    osc.connect(gain);
    osc2.connect(gain2);
    gain.connect(ctx.destination);
    gain2.connect(ctx.destination);

    osc.start();
    osc2.start();
    osc.stop(ctx.currentTime + duration * 2.5);
    osc2.stop(ctx.currentTime + duration * 2.0);
  } catch (e) {
    console.warn('Audio Context Error:', e);
  }
}

function startWonderlandMusic() {
  isMusicPlaying = true;
  melodyIndex = 0;
  playNextNote();
}

function playNextNote() {
  if (!isMusicPlaying) return;
  const current = fairytaleMelody[melodyIndex];
  playMusicBoxNote(current.note, current.dur);
  
  melodyIndex = (melodyIndex + 1) % fairytaleMelody.length;
  musicInterval = setTimeout(playNextNote, current.dur * 750);
}

function stopWonderlandMusic() {
  isMusicPlaying = false;
  if (musicInterval) clearTimeout(musicInterval);
}

// Sound FX: Magic Chime
function playMagicChime() {
  if (!isSfxEnabled) return;
  try {
    const ctx = getAudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.85);
      }, idx * 60);
    });
  } catch (e) {}
}

// Sound FX: Bubble Cork Pop
function playPopSound() {
  if (!isSfxEnabled) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch (e) {}
}

function initWebAudioSystem() {
  const audioBtn = document.getElementById('audio-toggle-btn');
  const sfxBtn = document.getElementById('sfx-toggle-btn');

  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      getAudioContext();
      if (!isMusicPlaying) {
        startWonderlandMusic();
        audioBtn.classList.add('playing');
        audioBtn.querySelector('.sound-label').textContent = 'Âm Nhạc: Đang Bật';
        showToast('🎶 Đang phát nhạc nền Xứ Sở Thần Tiên!');
      } else {
        stopWonderlandMusic();
        audioBtn.classList.remove('playing');
        audioBtn.querySelector('.sound-label').textContent = 'Wonderland Lo-fi';
        showToast('🔇 Đã tắt nhạc nền.');
      }
    });
  }

  if (sfxBtn) {
    sfxBtn.addEventListener('click', () => {
      isSfxEnabled = !isSfxEnabled;
      sfxBtn.classList.toggle('active', isSfxEnabled);
      sfxBtn.querySelector('.sfx-label').textContent = isSfxEnabled ? 'SFX: Bật' : 'SFX: Tắt';
      if (isSfxEnabled) {
        playMagicChime();
        showToast('✨ Đã bật hiệu ứng âm thanh ma thuật!');
      } else {
        showToast('🔇 Đã tắt hiệu ứng âm thanh.');
      }
    });
  }
}

/* ==========================================================================
   2. MAGIC CANVAS PARTICLE SYSTEM (SPARKLES, CARDS, TEA LEAVES, WATCHES)
   ========================================================================= */
function initMagicCanvas() {
  const canvas = document.getElementById('magic-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const symbols = ['✨', '♠', '♥', '♦', '♣', '🍃', '⭐', '☕', '🗝️'];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -30;
      this.size = Math.random() * 14 + 10;
      this.speedY = Math.random() * 0.8 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.6;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 1.5;
      this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
      this.opacity = Math.random() * 0.45 + 0.15;
      this.color = this.symbol === '♥' || this.symbol === '♦' ? '#ff4081' : 
                   this.symbol === '🍃' ? '#69f0ae' : '#ffd166';
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.rotation += this.rotationSpeed;
      if (this.y > height + 40 || this.x < -40 || this.x > width + 40) {
        this.reset();
      }
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = this.opacity;
      ctx.font = `${this.size}px serif`;
      ctx.fillStyle = this.color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.symbol, 0, 0);
      ctx.restore();
    }
  }

  for (let i = 0; i < 45; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(animate);
  }
  animate();
}

/* ==========================================================================
   3. CUSTOM CURSOR & SPARKLE TRAILS
   ========================================================================== */
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  if (!cursor || window.innerWidth < 768) return;

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  document.addEventListener('click', (e) => {
    createClickSparkle(e.clientX, e.clientY);
  });
}

function createClickSparkle(x, y) {
  for (let i = 0; i < 6; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'click-sparkle-fx';
    sparkle.textContent = ['✨', '⭐', '🌸', '💫'][Math.floor(Math.random() * 4)];
    sparkle.style.position = 'fixed';
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '99999';
    sparkle.style.fontSize = '1.2rem';
    sparkle.style.transition = 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)';

    const angle = (Math.PI * 2 / 6) * i;
    const dist = Math.random() * 40 + 20;
    const destX = Math.cos(angle) * dist;
    const destY = Math.sin(angle) * dist;

    document.body.appendChild(sparkle);

    requestAnimationFrame(() => {
      sparkle.style.transform = `translate(${destX}px, ${destY}px) scale(0)`;
      sparkle.style.opacity = '0';
    });

    setTimeout(() => sparkle.remove(), 650);
  }
}

/* ==========================================================================
   4. SECTION A: THE RABBIT HOLE INTRO ENTRANCE
   ========================================================================== */
function initRabbitHoleEntrance() {
  const introSection = document.getElementById('rabbit-hole-intro');
  const mainHub = document.getElementById('wonderland-main');
  const mainNav = document.getElementById('main-nav');
  const drinkMePotion = document.getElementById('drink-me-potion');
  const eatMeCake = document.getElementById('eat-me-cake');
  const portalReturnBtn = document.getElementById('portal-return-btn');

  function enterWonderland(itemType) {
    playPopSound();
    playMagicChime();
    
    // Auto-start music on first interaction
    if (!isMusicPlaying) {
      startWonderlandMusic();
      const audioBtn = document.getElementById('audio-toggle-btn');
      if (audioBtn) {
        audioBtn.classList.add('playing');
        audioBtn.querySelector('.sound-label').textContent = 'Âm Nhạc: Đang Bật';
      }
    }

    introSection.classList.add('shrink-fade-out');

    setTimeout(() => {
      introSection.style.display = 'none';
      mainHub.classList.remove('hidden');
      if (mainNav) mainNav.classList.add('visible');

      window.scrollTo({ top: 0, behavior: 'smooth' });

      showToast(itemType === 'drink' 
        ? '💧 Bạn đã uống Lọ Thần Dược và sẵn sàng khám phá portfolio!' 
        : '🎂 Bạn đã nếm Chiếc Bánh Ngọt và bước vào thế giới diệu kỳ!');
    }, 900);
  }

  if (drinkMePotion) {
    drinkMePotion.addEventListener('click', () => enterWonderland('drink'));
  }
  if (eatMeCake) {
    eatMeCake.addEventListener('click', () => enterWonderland('cake'));
  }

  if (portalReturnBtn) {
    portalReturnBtn.addEventListener('click', () => {
      playMagicChime();
      introSection.style.display = 'flex';
      requestAnimationFrame(() => {
        introSection.classList.remove('shrink-fade-out');
        mainHub.classList.add('hidden');
      });
    });
  }

  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('href').substring(1);
      const targetSec = document.getElementById(targetId);
      if (targetSec) {
        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');
        targetSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        playPopSound();
      }
    });
  });
}

/* ==========================================================================
   5. WHITE RABBIT LIVE POCKET WATCH & TIME SYNC
   ========================================================================== */
function initLivePocketWatch() {
  const clockEl = document.getElementById('live-pocket-time');
  const dateEl = document.getElementById('live-pocket-date');

  function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    if (clockEl) {
      clockEl.textContent = `${hours}:${minutes}:${seconds}`;
    }

    if (dateEl) {
      const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
      const dayName = days[now.getDay()];
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = now.getFullYear();
      dateEl.textContent = `${dayName}, Ngày ${day}/${month}/${year}`;
    }
  }

  updateTime();
  setInterval(updateTime, 1000);

  const cvBtn = document.getElementById('download-cv-btn');
  if (cvBtn) {
    cvBtn.addEventListener('click', () => {
      playMagicChime();
      window.print();
    });
  }
}

/* ==========================================================================
   6. MULTI-LANGUAGE GREETING SWITCHER
   ========================================================================== */
function initLanguageSwitcher() {
  const langTabs = document.querySelectorAll('.lang-pill');
  const greetingDisplay = document.getElementById('greeting-text');

  const greetings = {
    vi: '"Chào bạn! Tôi là Hoài An. Tôi luôn chủ động, trách nhiệm và sẵn sàng học hỏi để tạo ra giá trị thiết thực trong mỗi dự án."',
    fr: '"Bonjour ! Je m\'appelle Hoài An, étudiante en Français Commercial à l\'ESCE. Dynamique, créative et toujours prête à relever de nouveaux défis !"',
    en: '"Hello! I am Hoai An, a proactive & creative student from Foreign Trade University. Ready to bring innovation, dedication, and value to your team!"'
  };

  langTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      playPopSound();
      langTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const lang = tab.getAttribute('data-lang');
      
      greetingDisplay.style.opacity = '0';
      setTimeout(() => {
        greetingDisplay.textContent = greetings[lang];
        greetingDisplay.style.opacity = '1';
      }, 200);
    });
  });
}

/* ==========================================================================
   7. CHESHIRE CAT INTERACTIVE EYES & AI SIMULATOR
   ========================================================================== */
function initCheshireCatAndAISimulator() {
  const catWidget = document.getElementById('cheshire-cat-interactive');
  const skillOrbs = document.querySelectorAll('.skill-orb');
  const aiPromptChips = document.querySelectorAll('.ai-chip-prompt');
  const aiResponseBox = document.getElementById('ai-response-box');

  skillOrbs.forEach(orb => {
    orb.addEventListener('mouseenter', () => {
      playPopSound();
      if (catWidget) {
        catWidget.style.transform = 'scale(1.12) rotate(-5deg)';
        catWidget.style.boxShadow = '0 0 40px #ffd166, 0 0 20px #e91e63';
      }
    });
    orb.addEventListener('mouseleave', () => {
      if (catWidget) {
        catWidget.style.transform = 'scale(1) rotate(0deg)';
        catWidget.style.boxShadow = '';
      }
    });
  });

  const aiAnswers = {
    fit: '💡 <strong>Trợ lý AI phân tích:</strong> Hoài An sở hữu tư duy làm việc chủ động, tinh thần trách nhiệm cao và khả năng học hỏi nhanh. Cô ấy kết hợp nhuần nhuyễn giữa chứng chỉ quốc tế MOS (2021-2022), kỹ năng thiết kế & chỉnh sửa (Illustrator, Canva, CapCut) cùng khả năng ứng dụng các mô hình AI hiện đại để nâng cao hiệu suất công việc.',
    experience: '🎪 <strong>Trợ lý AI phân tích:</strong> Hoài An có kinh nghiệm phong phú trong việc lập kế hoạch, điều phối dự án, quản trị cộng đồng Group K65 FTU với 14.000+ thành viên (14K) và xử lý dữ liệu tuyển sinh. Đặc biệt trên cương vị là Chủ tịch CLB Diễn đàn Sinh viên FTU Forum, cô đã trực tiếp chỉ đạo và tổ chức thành công Ngày Hội Tuyển Sinh FTU 2026.',
    french: '🇫🇷 <strong>Trợ lý AI phân tích:</strong> Hoài An là sinh viên chuyên ngành Tiếng Pháp Thương Mại tại Trường Đại học Ngoại thương (2023 - Hiện tại). Cô có nền tảng ngoại ngữ vững vàng, khả năng giao tiếp và xử lý văn bản thương mại chuyên sâu bằng tiếng Pháp.'
  };

  aiPromptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      playMagicChime();
      const qKey = chip.getAttribute('data-q');
      aiPromptChips.forEach(c => c.style.borderColor = '');
      chip.style.borderColor = '#ffd166';

      aiResponseBox.innerHTML = '<span class="ai-pulse"></span> <em>Mèo Cheshire đang tổng hợp thông tin...</em>';

      setTimeout(() => {
        aiResponseBox.innerHTML = `<p class="ai-text-reply">${aiAnswers[qKey]}</p>`;
      }, 350);
    });
  });
}

/* ==========================================================================
   8. MAD HATTER TEA PARTY (TIMELINE FILTERS & INTERACTIVE TEACUPS)
   ========================================================================== */
function initMadHatterTeaParty() {
  const filterBtns = document.querySelectorAll('.tea-filter-btn');
  const teaNodes = document.querySelectorAll('.tea-node');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playPopSound();
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      teaNodes.forEach(node => {
        if (filter === 'all' || node.classList.contains(filter)) {
          node.classList.remove('hidden-filter');
          node.style.opacity = '0';
          setTimeout(() => node.style.opacity = '1', 150);
        } else {
          node.classList.add('hidden-filter');
        }
      });
    });
  });

  const cups = document.querySelectorAll('.teacup-visual');
  cups.forEach(cup => {
    cup.addEventListener('click', () => {
      playMagicChime();
      cup.style.transform = 'scale(1.3) rotate(30deg)';
      setTimeout(() => {
        cup.style.transform = '';
      }, 400);
      showToast('🫖 Tách trà vừa rót ra một câu chuyện trải nghiệm ý nghĩa!');
    });
  });
}

/* ==========================================================================
   9. QUEEN OF HEARTS MINI-GAME (PAINT THE ROSES RED)
   ========================================================================== */
function initQueenOfHeartsMiniGame() {
  const roses = document.querySelectorAll('.rose-item');
  const countDisplay = document.getElementById('rose-count');
  const gameMsg = document.getElementById('rose-game-msg');
  let paintedCount = 0;

  roses.forEach(rose => {
    rose.addEventListener('click', () => {
      if (!rose.classList.contains('painted-red')) {
        playPopSound();
        rose.classList.add('painted-red');
        rose.textContent = '🌹';
        paintedCount++;
        if (countDisplay) countDisplay.textContent = paintedCount;

        if (paintedCount === 5) {
          playMagicChime();
          if (gameMsg) {
            gameMsg.innerHTML = '🎉 <strong>Tuyệt vời!</strong> Tất cả đóa hoa hồng trong vườn đã được tô điểm sắc đỏ rực rỡ!';
            gameMsg.style.color = '#ff4081';
          }
          showToast('👑 Nữ Hoàng Cơ gửi lời khen ngợi sự tỉ mỉ của bạn!');
        }
      }
    });
  });
}

/* ==========================================================================
   10. CONTACT FORM, INSTANT COPY & TOAST NOTIFICATIONS
   ========================================================================== */
function initContactAndCopyActions() {
  const copyables = document.querySelectorAll('.copyable');
  copyables.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const text = el.getAttribute('data-copy');
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          playPopSound();
          showToast(`📋 Đã sao chép: "${text}" vào bộ nhớ tạm!`);
        });
      }
    });
  });

  const form = document.getElementById('magic-contact-form');
  const notice = document.getElementById('form-success-notice');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      playMagicChime();

      const name = document.getElementById('sender-name').value;
      const subject = document.getElementById('sender-subject').value;

      if (notice) {
        notice.classList.remove('hidden');
        notice.innerHTML = `🎉 Cảm ơn <strong>${name}</strong>! Thông điệp về "<em>${subject}</em>" đã được đóng chai và gửi tới Hoài An.`;
      }

      form.reset();
      showToast('💌 Thông điệp ma thuật đã được gửi thành công!');
    });
  }
}

function showToast(message) {
  const toast = document.getElementById('magic-toast');
  if (!toast) return;
  const msgEl = toast.querySelector('.toast-msg');
  if (msgEl) msgEl.innerHTML = message;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ==========================================================================
   11. 3D CARD TILT EFFECT
   ========================================================================== */
function init3DCardTilt() {
  const tiltCards = document.querySelectorAll('[data-tilt]');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}
