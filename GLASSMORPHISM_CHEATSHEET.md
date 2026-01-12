# Glassmorphism Quick Reference

## 🎨 Glass Panel Classes

```css
glass-light      /* 50% opacity, 8px blur - Subtle */
glass-medium     /* 70% opacity, 12px blur - Standard */
glass-strong     /* 85% opacity, 16px blur - Prominent */
glass-ultra      /* 60% opacity, 24px blur - Dramatic */
```

## 🃏 Card Components

```html
<!-- Standard interactive card -->
<div class="glass-card p-6">...</div>

<!-- Card with accent border -->
<div class="glass-card-accent p-6">...</div>
```

## 🔘 Buttons

```html
<!-- Primary action -->
<button class="glass-button-primary">Click Me</button>

<!-- Secondary action -->
<button class="glass-button">Cancel</button>
```

## 📝 Form Elements

```html
<!-- Text input -->
<input class="glass-input w-full" type="text" />

<!-- Textarea -->
<textarea class="glass-input w-full resize-none"></textarea>
```

## 🏷️ Badges

```html
<span class="glass-badge">Default</span>
<span class="glass-badge-success">Success</span>
<span class="glass-badge-warning">Warning</span>
<span class="glass-badge-error">Error</span>
```

## 🧭 Navigation

```html
<!-- Top navigation -->
<nav class="glass-nav p-4">...</nav>

<!-- Sidebar -->
<aside class="glass-sidebar p-6">...</aside>
```

## 🪟 Modals & Overlays

```html
<!-- Modal -->
<div class="glass-modal p-8 rounded-2xl">...</div>

<!-- Backdrop overlay -->
<div class="glass-overlay fixed inset-0">...</div>
```

## 📄 Text Hierarchy

```html
<!-- High emphasis (87% opacity) -->
<h1 class="text-high-emphasis">Heading</h1>

<!-- Medium emphasis (60% opacity) -->
<p class="text-medium-emphasis">Body text</p>

<!-- Disabled (38% opacity) -->
<span class="text-disabled">Helper text</span>
```

## 🎭 React Components

```tsx
import { 
  GlassCard, 
  GlassButton, 
  GlassInput, 
  GlassBadge 
} from '@/components/ui/GlassCard';

// Card
<GlassCard variant="medium" hover>
  Content
</GlassCard>

// Button
<GlassButton variant="primary">
  Click Me
</GlassButton>

// Input
<GlassInput 
  type="email" 
  placeholder="Email" 
/>

// Badge
<GlassBadge variant="success">
  Active
</GlassBadge>
```

## 🎨 Color Variables

```css
/* Dark Mode Colors */
--background: #121418        /* Very dark grey */
--foreground: #EBEBEB        /* Off-white */
--primary: #F97316           /* Orange accent */
--glass-bg: rgba(30,33,41,0.7)
--glass-border: rgba(255,255,255,0.1)
```

## 🖼️ Image Handling

```html
<!-- Auto-dimmed in dark mode -->
<img src="photo.jpg" alt="Photo" />

<!-- No filter applied -->
<img src="logo.png" class="glass-image-no-filter" />
```

## ✨ Common Patterns

### Feature Card
```tsx
<div className="glass-card p-6">
  <Icon className="w-8 h-8 text-orange-500 mb-4" />
  <h3 className="text-high-emphasis font-semibold mb-2">
    Title
  </h3>
  <p className="text-medium-emphasis mb-4">
    Description
  </p>
  <button className="glass-button-primary w-full">
    Action
  </button>
</div>
```

### Stats Card
```tsx
<div className="glass-card-accent p-6">
  <div className="flex justify-between items-start mb-4">
    <div>
      <h3 className="text-high-emphasis">Metric</h3>
      <p className="text-medium-emphasis text-sm">Period</p>
    </div>
    <span className="glass-badge-success">+12%</span>
  </div>
  <div className="text-3xl font-bold text-high-emphasis">
    1,234
  </div>
</div>
```

### Form Section
```tsx
<div className="glass-card p-8">
  <h2 className="text-2xl font-bold text-high-emphasis mb-6">
    Form Title
  </h2>
  
  <div className="space-y-4">
    <div>
      <label className="block text-high-emphasis mb-2">
        Label
      </label>
      <input className="glass-input w-full" />
      <p className="text-disabled text-sm mt-1">
        Helper text
      </p>
    </div>
    
    <button className="glass-button-primary w-full">
      Submit
    </button>
  </div>
</div>
```

### Navigation Bar
```tsx
<nav className="glass-nav p-4">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-6">
      <Logo />
      <button className="glass-button">Home</button>
      <button className="glass-button">About</button>
    </div>
    <button className="glass-button-primary">
      Sign In
    </button>
  </div>
</nav>
```

## 🎯 Quick Tips

✅ **DO**
- Use `text-high-emphasis` for headings
- Use `text-medium-emphasis` for body text
- Layer glass elements for depth
- Test on mobile devices

❌ **DON'T**
- Use pure black (#000) or pure white (#FFF)
- Stack too many blur layers
- Forget hover states
- Ignore accessibility

## 📱 Responsive

Blur automatically reduces on mobile for performance:
```css
@media (max-width: 768px) {
  /* All glass elements use 8px blur */
}
```

## ♿ Accessibility

```css
/* Respects user preferences */
@media (prefers-reduced-motion: reduce) {
  /* Transitions disabled */
}

@media (prefers-contrast: high) {
  /* Borders more visible */
}
```

## 🔗 Resources

- Full Guide: `GLASSMORPHISM_GUIDE.md`
- Migration: `GLASSMORPHISM_MIGRATION.md`
- Demo: `src/components/GlassmorphismDemo.tsx`
- Styles: `src/styles/glassmorphism.css`
- Components: `src/components/ui/GlassCard.tsx`
