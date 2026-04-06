# 🤖 AI Engineer Portfolio — Skeleton

A **premium, dark-themed AI Engineer portfolio website** built as a structured skeleton ready for your personal content.

---

## 📁 Project Structure

```
Portfolio/
├── index.html              ← Main page (all sections)
├── css/
│   └── style.css           ← All styles + design tokens
├── js/
│   └── main.js             ← All interactivity + animations
├── assets/
│   ├── profile.jpg         ← ⬅ Add your profile photo here
│   ├── resume.pdf          ← ⬅ Add your resume here
│   └── projects/           ← ⬅ Add project screenshots here
│       ├── project-1.png
│       ├── project-2.png
│       └── ...
└── README.md
```

---

## ✏️ How to Customize

### 1. Global Placeholders to Replace (in `index.html`)

| Placeholder | Replace With |
|---|---|
| `[Your Name]` | Your full name |
| `[YN]` | Your initials (navbar logo) |
| `[Your tagline]` | Your personal tagline |
| `[your-username]` | Your GitHub username |
| `[your-linkedin]` | Your LinkedIn handle |
| `[your-email@domain.com]` | Your email address |

### 2. Profile Photo
- Drop your photo as `assets/profile.jpg`
- Any square/portrait image works; the CSS crops it automatically

### 3. Resume
- Drop your PDF as `assets/resume.pdf`
- The "Download Resume" button will serve it automatically

### 4. Typed Text Titles (`js/main.js`)
Look for:
```js
const words = [
  '[AI Systems]',
  '[Machine Learning Models]',
  ...
];
```
Replace the array items with your actual skills/roles.

### 5. Adding a New Project Card
In `index.html`, find any `<article class="project-card">` block,
duplicate it, and update:
- `id="project-N"` → unique number
- `data-category="ai-ml"` → one of: `ai-ml`, `nlp`, `cv`, `fullstack` (or add new ones)
- All placeholder text inside the card
- GitHub and Live Demo URLs

### 6. Skill Tags
Each `<span class="skill-tag">` has a `data-level` attribute:
- `data-level="expert"` → blue
- `data-level="advanced"` → purple
- `data-level="intermediate"` → cyan
- `data-level="beginner"` → grey

### 7. Contact Form
To make the form actually send emails, edit `js/main.js` and replace the simulation block in `initContactForm()` with:
- **EmailJS** — free, no backend needed
- **Formspree** — simple `fetch()` call
- **Your own backend endpoint**

### 8. Colors & Design Tokens
All colors are CSS custom properties in `css/style.css` under `:root { }`. Change them globally with a single edit:
```css
--clr-primary:   #5f8eff;   /* Accent blue */
--clr-secondary: #a855f7;   /* Accent purple */
--clr-bg:        #050a14;   /* Page background */
```

---

## 🚀 Running Locally

No build step needed — just open `index.html` in your browser, or use a simple dev server:

```bash
# Option 1: Python
python -m http.server 8080

# Option 2: Node (if installed)
npx serve .

# Option 3: VS Code
# Install the "Live Server" extension and click "Go Live"
```

---

## 🧩 Sections Checklist

| Section | Status |
|---|---|
| ✅ Navbar (sticky + mobile) | Done |
| ✅ Hero (typed text + code widget + particles) | Done |
| ✅ About (photo + stats) | Done |
| ✅ Skills (categorized + level tags) | Done |
| ✅ Projects (filterable cards) | Done |
| ✅ Experience + Education (timeline) | Done |
| ✅ Contact (links + form with validation) | Done |
| ✅ Footer (social links + copyright) | Done |
| ✅ Scroll-to-top button | Done |

---

## 📄 License
MIT — use freely for personal and commercial portfolios.
