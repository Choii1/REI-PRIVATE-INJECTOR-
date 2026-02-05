document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ENTER OVERLAY LOGIC (MUSIC START) ---
    const overlay = document.getElementById('enter-overlay');
    const audio = document.getElementById('bgMusic');
    
    // Set volume to 50%
    audio.volume = 0.5;

    // When user clicks the black screen
    overlay.addEventListener('click', () => {
        // Play Music
        audio.play().catch(error => {
            console.log("Audio play failed:", error);
        });
        
        // Fade out overlay
        overlay.style.opacity = '0';
        
        // Remove it from page after fade
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 800);
    });

    // --- 2. CURSOR GLOW EFFECT ---
    const glow = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', (e) => {
        glow.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
    });

    // --- 3. MODAL LOGIC (FREE KEY) ---
    const modal = document.getElementById("keyModal");
    const btn = document.getElementById("freeKeyBtn");
    const closeSpan = document.getElementsByClassName("close-modal")[0];

    btn.onclick = () => modal.style.display = "flex";
    closeSpan.onclick = () => modal.style.display = "none";
    window.onclick = (e) => {
        if (e.target == modal) modal.style.display = "none";
    };

    // --- 4. TILT EFFECT FOR CARDS ---
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            card.style.transform = `perspective(1000px) rotateX(${y / -15}deg) rotateY(${x / 15}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

});

// --- 5. COPY KEY FUNCTION ---
function copyKey() {
    const copyText = document.getElementById("keyInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value).then(() => {
        const status = document.getElementById("copyStatus");
        status.innerText = "COPIED TO CLIPBOARD";
        status.style.color = "#00ff88";
    });
}
