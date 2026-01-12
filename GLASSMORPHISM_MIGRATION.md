# Migrating Existing Components to Glassmorphism

This guide shows you how to update your existing components to use the new glassmorphism design system.

## Quick Migration Examples

### Before & After: Card Component

#### Before (Traditional Dark Mode)
```tsx
<div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
  <h3 className="text-white font-semibold">Card Title</h3>
  <p className="text-gray-400">Card description</p>
</div>
```

#### After (Glassmorphism)
```tsx
<div className="glass-card p-6">
  <h3 className="text-high-emphasis font-semibold">Card Title</h3>
  <p className="text-medium-emphasis">Card description</p>
</div>
```

Or using the component:
```tsx
import { GlassCard } from '@/components/ui/GlassCard';

<GlassCard>
  <h3 className="text-high-emphasis font-semibold">Card Title</h3>
  <p className="text-medium-emphasis">Card description</p>
</GlassCard>
```

### Before & After: Button Component

#### Before
```tsx
<button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg">
  Click Me
</button>
```

#### After
```tsx
<button className="glass-button-primary">
  Click Me
</button>
```

Or using the component:
```tsx
import { GlassButton } from '@/components/ui/GlassCard';

<GlassButton variant="primary">
  Click Me
</GlassButton>
```

### Before & After: Input Field

#### Before
```tsx
<input 
  type="text"
  className="bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded"
  placeholder="Enter text..."
/>
```

#### After
```tsx
<input 
  type="text"
  className="glass-input w-full"
  placeholder="Enter text..."
/>
```

Or using the component:
```tsx
import { GlassInput } from '@/components/ui/GlassCard';

<GlassInput placeholder="Enter text..." />
```

## Updating Specific Components

### 1. QuestionList Component

Find cards like this:
```tsx
<div className="bg-card border rounded-lg p-4">
```

Replace with:
```tsx
<div className="glass-card p-4">
```

### 2. SkillTest Component

Update the main container:
```tsx
// Before
<div className="bg-background min-h-screen">

// After
<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
  <div className="glass-card max-w-4xl mx-auto p-8">
    {/* Content */}
  </div>
</div>
```

### 3. AdminLayout Component

Update the sidebar:
```tsx
// Before
<aside className="bg-gray-900 border-r border-gray-700">

// After
<aside className="glass-sidebar">
```

Update the navigation:
```tsx
// Before
<nav className="bg-gray-800 border-b border-gray-700">

// After
<nav className="glass-nav">
```

### 4. CodingQuestionCard Component

```tsx
// Before
<div className="bg-card border border-border rounded-xl p-6">
  <h3 className="text-foreground font-bold">Question</h3>
  <p className="text-muted-foreground">Description</p>
  <button className="bg-primary text-primary-foreground">Submit</button>
</div>

// After
<div className="glass-card p-6">
  <h3 className="text-high-emphasis font-bold">Question</h3>
  <p className="text-medium-emphasis">Description</p>
  <button className="glass-button-primary">Submit</button>
</div>
```

## Text Color Migration

Replace these text color classes:

| Before | After |
|--------|-------|
| `text-white` | `text-high-emphasis` |
| `text-foreground` | `text-high-emphasis` |
| `text-gray-400` | `text-medium-emphasis` |
| `text-muted-foreground` | `text-medium-emphasis` |
| `text-gray-500` | `text-disabled` |

## Background Migration

Replace these background classes:

| Before | After |
|--------|-------|
| `bg-gray-900` | `glass-card` or `glass-medium` |
| `bg-gray-800` | `glass-light` |
| `bg-card` | `glass-card` |
| `bg-background` | Keep for page background |

## Border Migration

Most glass components have built-in borders, so you can remove:
- `border border-gray-700`
- `border border-border`

The glass effect includes subtle borders automatically.

## Complete Component Example

Here's a full before/after of a feature card:

### Before
```tsx
export const FeatureCard = ({ title, description, icon: Icon }) => {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-orange-500 transition-all">
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-6 h-6 text-orange-500" />
        <h3 className="text-white font-semibold text-xl">{title}</h3>
      </div>
      <p className="text-gray-400 mb-4">{description}</p>
      <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg w-full">
        Learn More
      </button>
    </div>
  );
};
```

### After
```tsx
import { GlassCard, GlassButton } from '@/components/ui/GlassCard';

export const FeatureCard = ({ title, description, icon: Icon }) => {
  return (
    <GlassCard variant="medium" hover>
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-6 h-6 text-orange-500" />
        <h3 className="text-high-emphasis font-semibold text-xl">{title}</h3>
      </div>
      <p className="text-medium-emphasis mb-4">{description}</p>
      <GlassButton variant="primary" className="w-full">
        Learn More
      </GlassButton>
    </GlassCard>
  );
};
```

## Gradual Migration Strategy

You don't have to migrate everything at once. Here's a recommended approach:

### Phase 1: New Components
- Use glassmorphism for all new components
- Get familiar with the design system

### Phase 2: High-Impact Areas
- Update landing page
- Update main dashboard
- Update navigation/sidebar

### Phase 3: Forms & Inputs
- Update all form elements
- Update input fields
- Update buttons

### Phase 4: Cards & Lists
- Update question cards
- Update course cards
- Update list items

### Phase 5: Polish
- Update modals
- Update tooltips
- Update badges

## Testing Checklist

After migrating a component, verify:

- [ ] Text is readable (not too bright or too dim)
- [ ] Hover effects work smoothly
- [ ] Focus states are visible on inputs
- [ ] Component looks good on mobile
- [ ] Images are properly dimmed (if applicable)
- [ ] Borders are visible but subtle
- [ ] Blur effect doesn't impact performance

## Performance Tips

1. **Limit Blur Layers**: Don't stack too many blurred elements
2. **Use Appropriate Variants**: 
   - `glass-light` for less important content
   - `glass-strong` for modals and important cards
3. **Mobile Optimization**: The CSS automatically reduces blur on mobile
4. **Test on Lower-End Devices**: Backdrop blur can be intensive

## Common Issues & Solutions

### Issue: Text is too dim
**Solution**: Use `text-high-emphasis` instead of `text-medium-emphasis`

### Issue: Card doesn't stand out
**Solution**: Use `glass-card-accent` or `glass-strong` variant

### Issue: Blur looks weird
**Solution**: Ensure there's a background behind the glass element

### Issue: Performance issues
**Solution**: Reduce blur amount or use `glass-light` variant

## Need Help?

- Check `GLASSMORPHISM_GUIDE.md` for complete documentation
- View `GlassmorphismDemo.tsx` for live examples
- Inspect `src/styles/glassmorphism.css` for available classes

Happy migrating! ✨
