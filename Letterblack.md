Letterblack.ae – Website Rebuild & Hosting Plan
This document outlines the steps to recreate the Letterblack portfolio website currently hosted on Framer. The new version will be a static yet dynamic-feeling site, with Git-based media hosting, dynamic content control, and full flexibility for future updates.
1. Project Vision
- Host the site independently with custom domain: letterblack.ae
- Maintain the elegant interactive design of Framer
- Add dynamic components (videos, animated sections, interactive gallery)
- Use GitHub for free media hosting (images, videos)
- Retain control over layout and content without relying on Framer
2. Recommended Tech Stack
- HTML/CSS/JS or React for frontend (React recommended for modular components)
- TailwindCSS or custom SCSS for styling
- GitHub for version control and media hosting
- Free hosting options:
  - GitHub Pages (best for static sites)
  - Cloudflare Pages (with CI/CD)
  - Vercel (for React/Next.js, free tier supports custom domains)
- Custom Domain Management: Connect 'letterblack.ae' via DNS settings
3. Site Structure & Pages
- Home: Brand intro, logo animation, tagline
- Work: Portfolio gallery (linked to GitHub-hosted images/videos)
- About: Personal intro, journey, mission
- Contact: Contact form, social links
- Footer: Legal, newsletter (optional)
4. Hosting Images & Videos with GitHub
- Upload videos and images to a public GitHub repo (e.g., 'letterblack-assets')
- Use the 'raw.githubusercontent.com' direct file link format
- Example:
  https://raw.githubusercontent.com/yourusername/letterblack-assets/main/videos/intro.mp4
- Use these links directly in your video/image components
5. Dynamic Components Suggestions
- Smooth scroll-triggered animations (GSAP or Framer Motion)
- Video player with GitHub-sourced videos (custom JS or React Player)
- Expandable portfolio project cards (click to reveal details/video)
- Animated intro (SVG logo morph, text fade-in)
- Contact form powered by Formspree or Google Forms
6. Deployment Instructions
- Push code to GitHub repository
- Use GitHub Pages:
  1. Go to repo Settings > Pages
  2. Select 'main' branch, root directory
  3. Save and GitHub will generate a live link
- Use Vercel (alternative):
  1. Connect GitHub repo
  2. Set framework (React/Next.js or Static)
  3. Add 'letterblack.ae' domain in settings
  4. Update DNS records at domain provider
7. Content Update Workflow
- To update projects, add new media to GitHub repo
- Update portfolio data JSON or HTML blocks
- Re-deploy site via Vercel or GitHub Actions
- No-code option: Integrate Netlify CMS or a markdown-based static CMS
8. Final Notes & Enhancements
- Free, scalable, and modular alternative to Framer
- Full creative control and custom animations
- GitHub provides free versioning, media hosting, and rollback
- Future expansion: Add blog, password-protected sections, AI portfolio preview tools
