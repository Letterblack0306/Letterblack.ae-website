# Letterblack – AI-Driven VFX & Motion Graphics Studio

A dynamic, interactive website for Letterblack VFX & Motion Graphics Studio based in Dubai, featuring premium animations and scroll effects inspired by the original Framer design.

## 🎯 Features

### Interactive Components

1. **Hero Section**
   - Animated split title: "LETTER" + "BLACK"
   - Fade-in animations with staggered timing
   - Play Showreel CTA button with modal
   - Scroll indicator with pulse animation

2. **Navigation**
   - Fixed navbar with scroll blur effect
   - Smooth scroll to sections
   - Responsive mobile hamburger menu
   - Hover animations on links

3. **Stats Section**
   - Animated stat cards (13+ years, 25+ clients, 276+ projects)
   - Scroll-triggered fade-in animations
   - Hover lift effects

4. **Featured Portfolio**
   - Grid layout with project cards
   - Hover overlay with "View Project" button
   - Image zoom on hover
   - Project categories and titles
   - Actual project images from the Framer site

5. **Process Section**
   - Three-step process cards (Pre-Production, Production, Post-Production)
   - Number badges with opacity effects
   - Hover animations and transforms

6. **3D Client Sphere**
   - Interactive 3D sphere with client names
   - Drag to rotate (mouse + touch support)
   - Auto-rotation when idle
   - Depth-based opacity and gradients
   - Responsive to screen size

7. **Contact Section**
   - Premium CTA button with hover effects
   - Direct email link to hello@letterblack.ae

8. **Video Modal**
   - Full-screen video modal for showreel
   - Backdrop blur effect
   - ESC key and click-outside to close
   - Ready for video embed

### Design Features

- **Typography**: Syne for headings, Inter for body text
- **Color Scheme**: Dark theme (#0d0d0d) with white text
- **Animations**: Fade-in, slide-in, scale transforms
- **Scroll Effects**: Intersection Observer for element reveals
- **Responsive**: Mobile-first design with breakpoints
- **Performance**: Debounced resize events, optimized animations

## 🚀 Quick Start

### Prerequisites
- Node.js installed (for http-server)

### Installation

1. Clone or download the project
2. Navigate to the project directory
3. Run the development server:

```bash
npm run dev
```

The site will open at `http://localhost:8080`

## 📁 File Structure

```
letterblack-website/
├── index.html              # Main HTML structure
├── styles.css              # Complete styling and animations
├── script.js               # Interactive components and 3D sphere
├── package.json            # NPM configuration
├── README.md               # This file
└── Letterblack – AI-Driven VFX & Motion Graphics Studio_files/
    └── [project images]    # Portfolio project images
```

## 🎨 Customization

### Update Projects

Edit the portfolio cards in `index.html`:

```html
<div class="portfolio-card">
    <div class="card-image">
        <img src="your-image.jpg" alt="Project Name">
        <div class="card-overlay">
            <button class="view-project-btn">View Project</button>
        </div>
    </div>
    <div class="card-info">
        <h3 class="card-title">Your Project Title</h3>
        <p class="card-category">Project Category</p>
    </div>
</div>
```

### Update Client Names

Edit the `clients` array in `script.js`:

```javascript
const clients = [
    'CLIENT 1', 'CLIENT 2', 'CLIENT 3',
    // Add up to 15 clients
];
```

### Add Video Embed

Replace the video modal placeholder in `script.js`:

```javascript
function openVideoModal() {
    videoModal.classList.add('active');
    // Add iframe or video player here
    document.querySelector('.video-wrapper').innerHTML = `
        <iframe src="your-video-url" 
                frameborder="0" 
                allowfullscreen
                style="width:100%;height:100%;border-radius:20px;">
        </iframe>
    `;
}
```

### Modify Colors

Update CSS variables in `styles.css`:

```css
:root {
    --color-bg: #0d0d0d;
    --color-bg-dark: #080808;
    --color-text: #ffffff;
    --color-text-dim: rgba(255, 255, 255, 0.7);
    --color-border: rgba(255, 255, 255, 0.1);
}
```

## 🎬 Interactive Features

### 3D Client Sphere
- **Desktop**: Click and drag to rotate
- **Mobile**: Touch and drag to rotate
- **Auto**: Automatically rotates when idle

### Scroll Animations
- Elements fade in and slide up as you scroll
- Stats, portfolio cards, and process cards all animate
- Smooth transitions with easing

### Video Modal
- Click "PLAY SHOWREEL" to open modal
- Press ESC or click outside to close
- Ready for YouTube, Vimeo, or custom video embed

## 📱 Responsive Breakpoints

- **Desktop**: 1400px+ (full features)
- **Tablet**: 768px - 1399px (adjusted grid)
- **Mobile**: < 768px (single column, hamburger menu)

## 🔧 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox, Animations
- **JavaScript**: Vanilla JS (no frameworks)
- **Canvas API**: For 3D client sphere
- **Intersection Observer**: For scroll animations

## 📊 Performance

- Debounced resize events
- RequestAnimationFrame for smooth animations
- Lazy loading ready
- Optimized for 60fps animations

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📧 Contact

For questions or support:
- **Email**: hello@letterblack.ae
- **Instagram**: @letterblack.ae
- **Location**: Dubai, UAE

## 📝 License

© 2024 Letterblack. All rights reserved.

---

**Built with ❤️ by the Letterblack team**
