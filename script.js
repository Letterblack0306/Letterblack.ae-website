// ===================================
// NAVIGATION
// ===================================
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Scroll effect on navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===================================
// SMOOTH SCROLLING
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// VIDEO MODAL
// ===================================
const playShowreelBtn = document.querySelector('.play-showreel-btn');
const videoModal = document.getElementById('videoModal');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');

function openVideoModal() {
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Load the showreel video
    const videoWrapper = document.querySelector('.video-wrapper');
    videoWrapper.innerHTML = `
        <video
            src="Showreel.mp4"
            controls
            autoplay
            style="width:100%;height:100%;border-radius:20px;"
        >
            Your browser does not support the video tag.
        </video>
    `;
}

function closeVideoModal() {
    videoModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Stop and remove video
    const videoWrapper = document.querySelector('.video-wrapper');
    videoWrapper.innerHTML = '<p class="modal-placeholder">Add your showreel video embed here</p>';
}

playShowreelBtn?.addEventListener('click', openVideoModal);
modalClose?.addEventListener('click', closeVideoModal);
modalOverlay?.addEventListener('click', closeVideoModal);

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('active')) {
        closeVideoModal();
    }
});



// ===================================
// SCROLL ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.stat-card, .portfolio-card, .process-card, .award-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)';
    observer.observe(el);
});

// ===================================
// PORTFOLIO VIDEO INTERACTIONS
// ===================================
document.querySelectorAll('.video-card').forEach(card => {
    const video = card.querySelector('video');
    const playBtn = card.querySelector('.view-project-btn');

    // Hover to play
    card.addEventListener('mouseenter', () => {
        if (video) {
            video.currentTime = 0;
            video.play().catch(e => console.log("Autoplay prevented", e));
        }
    });

    card.addEventListener('mouseleave', () => {
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    });

    // Click to Fullscreen
    if (playBtn) {
        playBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card click event if any
            if (video) {
                if (video.requestFullscreen) {
                    video.requestFullscreen();
                } else if (video.webkitRequestFullscreen) { /* Safari */
                    video.webkitRequestFullscreen();
                } else if (video.msRequestFullscreen) { /* IE11 */
                    video.msRequestFullscreen();
                }
                video.play();
                video.muted = false; // Unmute for fullscreen
            }
        });
    }
});

// ===================================
// INITIALIZE
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Page load animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    console.log('Letterblack website loaded successfully');
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===================================
// FULL GALLERY LOGIC
// ===================================
const videoLinks = [
    "https://video.wixstatic.com/video/aa5b1a_0adae2b8ab264c8097f94e0820d95d14/1080p/mp4/file.mp4",
    "https://video.wixstatic.com/video/aa5b1a_bf2fab820b7248419f4c926efa501bb4/1080p/mp4/file.mp4",
    "https://video.wixstatic.com/video/aa5b1a_10668c4aefca431293baa75d0dba75e5/1080p/mp4/file.mp4",
    "https://video.wixstatic.com/video/aa5b1a_fff4d51e909847f697e96133afea4d4c/1080p/mp4/file.mp4",
    "https://video.wixstatic.com/video/aa5b1a_c5ed35286bf34c89baa9c13a2bacacc7/480p/mp4/file.mp4",
    "https://video.wixstatic.com/video/aa5b1a_c4ade64e643346068e78aa93d97795f9/1080p/mp4/file.mp4",
    "https://video.wixstatic.com/video/aa5b1a_2a7a50b1693f457f9f65aa22a55f7929/1080p/mp4/file.mp4",
    "https://video.wixstatic.com/video/aa5b1a_474c0b7fd3fe4bd8bd154926398e0375/720p/mp4/file.mp4",
    "https://video.wixstatic.com/video/aa5b1a_c955eeb661f64ce8b43194eb46f3c445/1080p/mp4/file.mp4",
    "https://video.wixstatic.com/video/aa5b1a_07e12776f8f9490dbb97b9bdc8d45b4f/1080p/mp4/file.mp4",
    "https://video.wixstatic.com/video/aa5b1a_644e953c70ef4326907e3e5fd8638051/1080p/mp4/file.mp4",
    "https://video.wixstatic.com/video/aa5b1a_95446f47fc734899b4d8dd15cd7a404c/480p/mp4/file.mp4",
    "https://video.wixstatic.com/video/aa5b1a_a462845cd2f343fa895033d1c6271037/720p/mp4/file.mp4",
    "https://video.wixstatic.com/video/aa5b1a_41cefc6446264435b1741b2a2480a1c7/1080p/mp4/file.mp4",
    "https://video.wixstatic.com/video/aa5b1a_e3a92006122d4c29915d1203c4707c38/720p/mp4/file.mp4",
    "https://video.wixstatic.com/video/aa5b1a_cb3828d940be4a40a95ed16ff3ba4c70/1080p/mp4/file.mp4",
    "https://video.wixstatic.com/video/aa5b1a_e6ff8772a7204da898e8f34b44e5c35a/1080p/mp4/file.mp4",
    "https://video.wixstatic.com/video/aa5b1a_ec49ebf75f324199872a3984f4de7347/1080p/mp4/file.mp4",
    "https://video.wixstatic.com/video/aa5b1a_265132b1ef434256912b60f3c80332f5/1080p/mp4/file.mp4",
    "https://video.wixstatic.com/video/aa5b1a_77304112080d4d61abe94282977d1b7b/1080p/mp4/file.mp4",
    "https://video.wixstatic.com/video/aa5b1a_f843934ea5ff49feb8edb9e3f70cadb7/1080p/mp4/file.mp4",
    "https://video.wixstatic.com/video/aa5b1a_8f149b59c56b4c37ba7af237748cde45/1080p/mp4/file.mp4"
];

const seeAllBtn = document.querySelector('.see-all-btn');
const galleryOverlay = document.getElementById('gallery-overlay');
const galleryClose = document.querySelector('.gallery-close');
const galleryGrid = document.getElementById('gallery-grid');
let galleryPopulated = false;

function populateGallery() {
    if (galleryPopulated) return;
    
    videoLinks.forEach(url => {
        const card = document.createElement('div');
        card.className = 'portfolio-card video-card';
        card.innerHTML = `
            <div class="card-video-wrapper">
                <video loop muted playsinline>
                    <source src="${url}" type="video/mp4">
                </video>
                <div class="card-overlay">
                    <button class="view-project-btn">Play Fullscreen</button>
                </div>
            </div>
        `;
        galleryGrid.appendChild(card);
        
        // Add listeners to new card
        attachVideoEvents(card);
    });
    
    galleryPopulated = true;
}

function attachVideoEvents(card) {
    const video = card.querySelector('video');
    const playBtn = card.querySelector('.view-project-btn');

    card.addEventListener('mouseenter', () => {
        if (video) {
            video.currentTime = 0;
            video.play().catch(e => {});
        }
    });

    card.addEventListener('mouseleave', () => {
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    });

    if (playBtn) {
        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (video) {
                if (video.requestFullscreen) video.requestFullscreen();
                else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
                
                video.play();
                video.muted = false;
            }
        });
    }
}

// Open Gallery
seeAllBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    populateGallery();
    galleryOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close Gallery
galleryClose?.addEventListener('click', () => {
    galleryOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});
