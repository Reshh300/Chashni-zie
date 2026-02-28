const memories = [
    { 
        title: "Mere mann ki baat", 
        img: "https://i.postimg.cc/SJcmDC0K/image.jpg", 
        text: "Honestly, tum bahut mast ho, and you’re such a lovely part of my life, na~ 💕" 
    },
    { 
        title: "You and Me", 
        img: "https://i.postimg.cc/Fdf4cJgN/image.jpg", 
        text: "tum kitti cute si ho bey ✨. 🎀" 
    },
    { 
        title: "Your smile", 
        img: "https://i.postimg.cc/YGJwxqbH/image.jpg", 
        text: "Lately, I feel happier seeing your smile than seeing my own.💗" 
    },
    { 
        title: "Jalebi & Chashni", 
        img: "https://i.postimg.cc/3dQT4NkX/image.jpg", 
        text: "😁 ole. ole. " 
    },
    { 
        title: "My Lovely", 
        img: "https://i.postimg.cc/ft6hvTBW/image.jpg", 
        text: "You are the loveliness I find in everything I love and care these days" 
    },
    { 
        title: "Always You", 
        img: "https://i.postimg.cc/N5vc9FK4/image.jpg", 
        text: "The image attached is a vector art I made for you~ yeah I suck at colouring ( for better quality, whatapp pe dekhna)" 
    }
];

const finalLetter = `My ( chashni baby )  Chikni,

Happy Birthday! 🎂
 
 I hope this made you smile today.

Love u. ❤️`;

let currentPage = 0; 
let memoryIdx = 0;
let isTypewriting = false;

const bgMusic = document.getElementById('bg-music');
const voiceMsg = document.getElementById('voice-message');
const audioStatus = document.getElementById('audio-status');

// Page Navigation Logic
document.getElementById('app-container').addEventListener('click', (e) => {
    if (e.target.id === 'music-toggle' || e.target.id === 'open-gift-trigger' || e.target.closest('.card')) return;

    if (currentPage === 0) {
        currentPage = 1;
        document.getElementById('page-start').classList.remove('active');
        document.getElementById('page-story').classList.add('active');
        bgMusic.play();
        updateMemory();
    } else if (currentPage === 1 && !isTypewriting) {
        if (memoryIdx < memories.length - 1) {
            memoryIdx++;
            updateMemory();
        } else {
            currentPage = 2;
            document.getElementById('page-story').classList.remove('active');
            document.getElementById('page-final').classList.add('active');
        }
    }
});

function updateMemory() {
    const data = memories[memoryIdx];
    const imgEl = document.getElementById('story-img');
    const textEl = document.getElementById('story-text');
    
    imgEl.style.opacity = 0;
    setTimeout(() => {
        imgEl.src = data.img;
        imgEl.onload = () => imgEl.style.opacity = 1;
        document.getElementById('story-title').innerText = data.title;
        textEl.innerText = "";
        typeWriter(data.text, textEl, 0);
        document.getElementById('progress-bar').style.width = `${((memoryIdx + 1) / memories.length) * 100}%`;
    }, 300);
}

function typeWriter(text, element, i) {
    if (i === 0) isTypewriting = true;
    if (i < text.length) {
        element.innerHTML += text.charAt(i);
        setTimeout(() => typeWriter(text, element, i + 1), 40);
    } else {
        isTypewriting = false;
    }
}

// FINAL GIFT OPENING LOGIC
document.getElementById('open-gift-trigger').addEventListener('click', () => {
    document.getElementById('final-overlay').classList.remove('hidden');
    const letterEl = document.getElementById('letter-text');
    letterEl.innerText = "";
    typeWriter(finalLetter, letterEl, 0);
    
    // --- THE FIX: Stop background music and play voice message ---
    bgMusic.pause(); // Music stops completely
    bgMusic.currentTime = 0; // Resets music to the beginning
    
    voiceMsg.play().catch(() => audioStatus.innerText = "Click Play Again to hear me!");
    
    startConfetti();
});

document.getElementById('voice-retry').addEventListener('click', () => {
    voiceMsg.currentTime = 0;
    voiceMsg.play();
    audioStatus.innerText = "Playing voice message...";
});

// Close Overlay logic
document.querySelector('.close-overlay').addEventListener('click', () => {
    document.getElementById('final-overlay').classList.add('hidden');
    voiceMsg.pause();
    // Optional: music remains stopped as requested
});

document.getElementById('music-toggle').addEventListener('click', () => {
    bgMusic.paused ? bgMusic.play() : bgMusic.pause();
});

function startConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let particles = Array.from({ length: 60 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 4 + 2,
        c: `hsl(${Math.random() * 360}, 100%, 75%)`,
        v: Math.random() * 2 + 1
    }));
    function draw() {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.fillStyle = p.c;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
            p.y += p.v; if(p.y > canvas.height) p.y = -10;
        });
        requestAnimationFrame(draw);
    }
    draw();
}