// 1. Cyber-Core Smooth Mouse Tracker (بيشتغل على اللاب بس عشان اختفيناه في الموبايل)
const core = document.getElementById("cyber-core");
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let coreX = mouseX;
let coreY = mouseY;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCore() {
    coreX += (mouseX - coreX - 50) * 0.08;
    coreY += (mouseY - coreY - 50) * 0.08;
    
    if(core) {
        core.style.transform = `translate(${coreX}px, ${coreY}px)`;
    }
    requestAnimationFrame(animateCore);
}
animateCore();

// 2. 3D Tilt Effect
document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20; 
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)`;
    });
});

// 3. Theme Toggle Logic
function toggleTheme() {
    const body = document.body;
    body.classList.toggle("light");
    
    const currentTheme = body.classList.contains("light") ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
}

if(localStorage.getItem('theme') === 'light') {
    document.body.classList.add("light");
} else {
    document.body.classList.remove("light");
}

// 4. Live Clock Updates
function updateStatus() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    
    const navTime = document.getElementById('nav-time');
    if(navTime) navTime.textContent = timeString;
}
setInterval(updateStatus, 1000);
updateStatus();

// 5. Scroll Spy & Navigation
function scrollToPage(id) {
    const element = document.getElementById(id);
    if(element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}

const scrollContainer = document.querySelector('.scroll-container');
scrollContainer.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const dockItems = document.querySelectorAll('.dock-item');
    
    sections.forEach(sec => {
        const top = scrollContainer.scrollTop;
        const offset = sec.offsetTop - (window.innerHeight / 2);
        
        if (top >= offset) {
            const id = sec.getAttribute('id');
            
            dockItems.forEach(item => {
                if(item.getAttribute('data-section') === id) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
            
            const revealElement = sec.querySelector('.reveal');
            if(revealElement) revealElement.classList.add('active');
        }
    });
});

window.onload = () => {
    const firstReveal = document.querySelector('.reveal');
    if(firstReveal) firstReveal.classList.add('active');
};