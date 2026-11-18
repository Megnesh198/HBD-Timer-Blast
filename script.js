// Background Floating Particles
const bgCanvas = document.getElementById('bg-canvas');
const bgCtx = bgCanvas.getContext('2d');
bgCanvas.width = window.innerWidth;
bgCanvas.height = window.innerHeight;

let spaceParticles = [];
for (let i = 0; i < 60; i++) {
    spaceParticles.push({
        x: Math.random() * bgCanvas.width,
        y: Math.random() * bgCanvas.height,
        size: Math.random() * 2 + 1,
        speedY: (Math.random() - 0.5) * 0.3,
        color: Math.random() > 0.5 ? '#00f5d4' : '#ff0a54'
    });
}

function animateBg() {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    spaceParticles.forEach(p => {
        p.y += p.speedY;
        if (p.y < 0) p.y = bgCanvas.height;
        if (p.y > bgCanvas.height) p.y = 0;
        bgCtx.fillStyle = p.color;
        bgCtx.beginPath();
        bgCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        bgCtx.fill();
    });
    requestAnimationFrame(animateBg);
}
animateBg();

// Target Date: 19 Nov 2026, 00:00:00
const targetTimestamp = new Date('November 19, 2026 00:00:00').getTime();
let celebrationAnimId = null;

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetTimestamp - now;

    if (distance <= 0) {
        document.getElementById('countdown-display').innerText = "00 : 00 : 00 : 00";
        document.getElementById('lock-status-text').innerText = "🎉 Time reached! Vault automatically unlocked!";
        document.getElementById('passcode-input').value = "1911";
        
        // Add glowing neon sparkles celebration class to the lock input box area
        document.getElementById('lock-section').classList.add('timer-celebrate-glow');

        if (!window.autoUnlocked) {
            window.autoUnlocked = true;
            triggerUnlockCelebration();
        }
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('countdown-display').innerText = 
        `${String(days).padStart(2, '0')}D : ${String(hours).padStart(2, '0')}H : ${String(minutes).padStart(2, '0')}M : ${String(seconds).padStart(2, '0')}S`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Verify Passcode
function verifyPasscode() {
    const inputVal = document.getElementById('passcode-input').value.trim();
    const correctCode = "1911";

    if (inputVal === correctCode) {
        triggerUnlockCelebration();
    } else {
        alert("❌ Galat passcode! Sahi code (1911) daaliye.");
    }
}

// Trigger Unlock Modal, Crackers & Audio Song Playback
function triggerUnlockCelebration() {
    const modal = document.getElementById('unlocked-modal');
    modal.style.display = 'flex';

    // Also trigger neon glow on lock section when unlocked via passcode
    document.getElementById('lock-section').classList.add('timer-celebrate-glow');

    // Initialize Scratch Card
    initScratchCard();

    // Play background song audio
    const vaultAudio = document.getElementById('vault-audio');
    vaultAudio.play().catch(e => console.log("Audio autoplay restricted."));

    // Fireworks Canvas Animation
    const canvas = document.getElementById('celebration-canvas');
    const ctxC = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    class FireworkParticle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 6 + 2;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.alpha = 1;
            this.decay = Math.random() * 0.015 + 0.01;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.08;
            this.alpha -= this.decay;
        }
        draw() {
            ctxC.save();
            ctxC.globalAlpha = this.alpha;
            ctxC.fillStyle = this.color;
            ctxC.beginPath();
            ctxC.arc(this.x, this.y, 3.5, 0, Math.PI * 2);
            ctxC.fill();
            ctxC.restore();
        }
    }

    function spawnFirework() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * (canvas.height * 0.6);
        const colors = ['#ff0055', '#ff4d6d', '#ffd166', '#00f5d4', '#7209b7'];
        const chosenColor = colors[Math.floor(Math.random() * colors.length)];
        for (let i = 0; i < 40; i++) {
            particles.push(new FireworkParticle(x, y, chosenColor));
        }
    }

    function animateCelebration() {
        ctxC.clearRect(0, 0, canvas.width, canvas.height);
        if (Math.random() < 0.08) spawnFirework();
        particles.forEach((p, index) => {
            p.update();
            p.draw();
            if (p.alpha <= 0) particles.splice(index, 1);
        });
        celebrationAnimId = requestAnimationFrame(animateCelebration);
    }
    animateCelebration();
}

// 1. 4-Years Memory Star Map Function
function showStarMemory(starId) {
    const display = document.getElementById('star-memory-display');
    const memories = {
        1: "⭐ <strong>Pehli Mulaqat & Pehli Baat:</strong> Jis din tum meri zindagi mein aayin, usi pal meri poori duniya badal gayi. Tumhari ek muskurahat ne mera dil hamesha ke liye jeet liya.",
        2: "🌟 <strong>4 Saal Ka Long-Distance Safar:</strong> Meelon ki doori aur intezar ke bawajood hamara pyaar har din aur gehra hota gaya. Har video call aur har message mere liye kisi khazane se kam nahi.",
        3: "✨ <strong>Hamare Sapne & Future:</strong> tum meri har jeet aur har khushi ki sabse badi wajah ho.",
        4: "💫 <strong>Forever Promise:</strong> Main waada karta hoon ki chahe waqt kaisa bhi ho, mera haath aur mera dil hamesha sirf tumhare saath rahega, Meghna! ❤️"
    };
    display.innerHTML = memories[starId];
}

// 2. Scratch-to-Reveal Gift Card Logic
function initScratchCard() {
    const canvas = document.getElementById('scratch-canvas');
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#05050a';
    ctx.font = 'bold 16px Segoe UI';
    ctx.textAlign = 'center';
    ctx.fillText('✨ SCRATCH HERE WITH FINGER ✨', canvas.width / 2, canvas.height / 2 + 5);

    let isDrawing = false;

    function scratch(x, y) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 22, 0, Math.PI * 2);
        ctx.fill();
    }

    canvas.addEventListener('mousedown', () => isDrawing = true);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        scratch(e.clientX - rect.left, e.clientY - rect.top);
    });

    canvas.addEventListener('touchstart', (e) => {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        scratch(touch.clientX - rect.left, touch.clientY - rect.top);
    });
    canvas.addEventListener('touchmove', (e) => {
        if (!isDrawing) return;
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        scratch(touch.clientX - rect.left, touch.clientY - rect.top);
    });
    canvas.addEventListener('touchend', () => isDrawing = false);
}

// 3. Future Time-Capsule Letters Function
function openTimeCapsule(year) {
    const box = document.getElementById('capsule-message-box');
    if (year === '2026') {
        box.innerHTML = "💌 <strong>19 Nov 2026 Paigham:</strong> Meri jaan, aaj hamare pyaar ke 7 saal aur tumhara yeh khaas din ek naye safar ki shuruat hai. Tum hamesha aise hi chamakti raho! ❤️";
    } else if (year === '2027') {
        box.innerHTML = "🔒 <strong>Time-Locked (19 Nov 2027):</strong> Sabr karo meri jaan! Yeh secret letter agle saal tumhare agle birthday par apne aap unlock hoga! 😘";
    } else if (year === '2030') {
        box.innerHTML = "🔒 <strong>Time-Locked (19 Nov 2030):</strong> Yeh hamare aane wale khoobsurat kal ke liye surakshit hai, jab hum hamesha ke liye ek saath honge! 💖";
    }
}

// 4. Virtual Cake Cutting
function cutCake() {
    document.getElementById('cake-display').innerText = "🎉 🗡️🎂 ✨ (Cake Cut Ho Gaya! Happy Birthday Meri Jaan Meghna!)";
}

// 5. Cyber Coupons
function redeemCoupon(el) {
    el.style.background = "#00f5d4";
    el.style.color = "#030308";
    if (!el.innerText.includes("✅")) {
        el.innerText += " ✅ (Claimed!)";
    }
}

// 6. Matrix Secret Decoder
function decodeMatrixMessage() {
    const secretMsg = "DECRYPTED: Meghna, tum meri zindagi ki sabse khoobsurat blessing ho. 4 saal se lekar hamesha tak, I Love You Endless! ❤️🚀";
    document.getElementById('matrix-text').innerText = secretMsg;
}

function closeWishModal() {
    document.getElementById('unlocked-modal').style.display = 'none';
    if (celebrationAnimId) cancelAnimationFrame(celebrationAnimId);
    
    const vaultAudio = document.getElementById('vault-audio');
    vaultAudio.pause();
    vaultAudio.currentTime = 0;
}