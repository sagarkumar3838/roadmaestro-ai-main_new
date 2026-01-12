/**
 * Glassmorphism Design Demo Component
 * 
 * This component showcases the glassmorphism design system
 * with various examples of glass panels, cards, buttons, and inputs.
 */

import { useState } from 'react';
import { Sparkles, Code, Palette, Zap } from 'lucide-react';

export const GlassmorphismDemo = () => {
  const [activeTab, setActiveTab] = useState<'cards' | 'buttons' | 'inputs'>('cards');

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="glass-card max-w-6xl mx-auto p-8 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-orange-500" />
          <h1 className="text-4xl font-bold text-high-emphasis">
            Glassmorphism Design System
          </h1>
        </div>
        <p className="text-medium-emphasis text-lg">
          Modern frosted glass UI components for dark mode interfaces
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="glass-nav max-w-6xl mx-auto p-2 mb-8 rounded-xl flex gap-2">
        <button
          onClick={() => setActiveTab('cards')}
          className={`glass-button flex-1 ${
            activeTab === 'cards' ? 'glass-button-primary' : ''
          }`}
        >
          <Palette className="w-4 h-4 inline mr-2" />
          Cards
        </button>
        <button
          onClick={() => setActiveTab('buttons')}
          className={`glass-button flex-1 ${
            activeTab === 'buttons' ? 'glass-button-primary' : ''
          }`}
        >
          <Zap className="w-4 h-4 inline mr-2" />
          Buttons
        </button>
        <button
          onClick={() => setActiveTab('inputs')}
          className={`glass-button flex-1 ${
            activeTab === 'inputs' ? 'glass-button-primary' : ''
          }`}
        >
          <Code className="w-4 h-4 inline mr-2" />
          Inputs
        </button>
      </div>

      {/* Content Area */}
      <div className="max-w-6xl mx-auto">
        {activeTab === 'cards' && <CardsDemo />}
        {activeTab === 'buttons' && <ButtonsDemo />}
        {activeTab === 'inputs' && <InputsDemo />}
      </div>
    </div>
  );
};

const CardsDemo = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Light Glass Card */}
    <div className="glass-light p-6 rounded-xl">
      <h3 className="text-xl font-semibold text-high-emphasis mb-2">
        Light Glass
      </h3>
      <p className="text-medium-emphasis mb-4">
        Subtle transparency with minimal blur effect
      </p>
      <div className="glass-badge">50% opacity</div>
    </div>

    {/* Medium Glass Card */}
    <div className="glass-medium p-6 rounded-xl">
      <h3 className="text-xl font-semibold text-high-emphasis mb-2">
        Medium Glass
      </h3>
      <p className="text-medium-emphasis mb-4">
        Standard glassmorphism with balanced blur
      </p>
      <div className="glass-badge">70% opacity</div>
    </div>

    {/* Strong Glass Card */}
    <div className="glass-strong p-6 rounded-xl">
      <h3 className="text-xl font-semibold text-high-emphasis mb-2">
        Strong Glass
      </h3>
      <p className="text-medium-emphasis mb-4">
        More opaque for important content areas
      </p>
      <div className="glass-badge">85% opacity</div>
    </div>

    {/* Interactive Glass Card */}
    <div className="glass-card p-6">
      <h3 className="text-xl font-semibold text-high-emphasis mb-2">
        Interactive Card
      </h3>
      <p className="text-medium-emphasis mb-4">
        Hover to see the elevation effect
      </p>
      <div className="glass-badge-success">Hover me!</div>
    </div>

    {/* Accent Glass Card */}
    <div className="glass-card-accent p-6">
      <h3 className="text-xl font-semibold text-high-emphasis mb-2">
        Accent Card
      </h3>
      <p className="text-medium-emphasis mb-4">
        With colored border and glow effect
      </p>
      <div className="glass-badge-warning">Featured</div>
    </div>

    {/* Ultra Glass Card */}
    <div className="glass-ultra p-6 rounded-xl">
      <h3 className="text-xl font-semibold text-high-emphasis mb-2">
        Ultra Glass
      </h3>
      <p className="text-medium-emphasis mb-4">
        Maximum blur for dramatic effect
      </p>
      <div className="glass-badge">24px blur</div>
    </div>
  </div>
);

const ButtonsDemo = () => (
  <div className="glass-card p-8">
    <h2 className="text-2xl font-bold text-high-emphasis mb-6">
      Button Variants
    </h2>

    <div className="space-y-6">
      {/* Primary Buttons */}
      <div>
        <h3 className="text-lg font-semibold text-high-emphasis mb-3">
          Primary Actions
        </h3>
        <div className="flex flex-wrap gap-4">
          <button className="glass-button-primary">
            Get Started
          </button>
          <button className="glass-button-primary">
            <Sparkles className="w-4 h-4 inline mr-2" />
            With Icon
          </button>
          <button className="glass-button-primary" disabled>
            Disabled
          </button>
        </div>
      </div>

      {/* Secondary Buttons */}
      <div>
        <h3 className="text-lg font-semibold text-high-emphasis mb-3">
          Secondary Actions
        </h3>
        <div className="flex flex-wrap gap-4">
          <button className="glass-button">
            Learn More
          </button>
          <button className="glass-button">
            <Code className="w-4 h-4 inline mr-2" />
            View Code
          </button>
          <button className="glass-button">
            Cancel
          </button>
        </div>
      </div>

      {/* Badge Examples */}
      <div>
        <h3 className="text-lg font-semibold text-high-emphasis mb-3">
          Status Badges
        </h3>
        <div className="flex flex-wrap gap-3">
          <span className="glass-badge">Default</span>
          <span className="glass-badge-success">Success</span>
          <span className="glass-badge-warning">Warning</span>
          <span className="glass-badge-error">Error</span>
        </div>
      </div>
    </div>
  </div>
);

const InputsDemo = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className="glass-card p-8">
      <h2 className="text-2xl font-bold text-high-emphasis mb-6">
        Form Elements
      </h2>

      <div className="space-y-6">
        {/* Text Input */}
        <div>
          <label className="block text-high-emphasis font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="glass-input w-full"
          />
          <p className="text-disabled text-sm mt-1">
            We'll never share your email with anyone else.
          </p>
        </div>

        {/* Textarea */}
        <div>
          <label className="block text-high-emphasis font-medium mb-2">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            rows={4}
            className="glass-input w-full resize-none"
          />
        </div>

        {/* Text Hierarchy Example */}
        <div className="glass-light p-4 rounded-lg">
          <h3 className="text-high-emphasis font-semibold mb-2">
            Text Hierarchy (87% opacity)
          </h3>
          <p className="text-medium-emphasis mb-2">
            Secondary text with 60% opacity for body content
          </p>
          <p className="text-disabled">
            Disabled text with 38% opacity for inactive elements
          </p>
        </div>

        {/* Divider */}
        <div className="glass-divider my-6" />

        {/* Submit Button */}
        <button className="glass-button-primary w-full">
          Submit Form
        </button>
      </div>
    </div>
  );
};

export default GlassmorphismDemo;
