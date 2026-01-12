import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				pacifico: ['Pacifico', 'cursive'],
			},
			backdropBlur: {
				xs: '2px',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#00A693', // Teal-500
					foreground: '#ffffff',
					glow: 'hsl(var(--primary-glow))'
				},
				teal: {
					50: '#f0ffff',
					100: '#e0ffff',
					200: '#b3e6e6',
					300: '#80d4d4',
					400: '#4db8b8',
					500: '#008080', // 008080
					600: '#01796F', // 01796F
					700: '#00A693', // 00A693
					800: '#004953', // 004953
					900: '#003d3d',
				},
				peach: {
					50: '#fef7ed',
					100: '#fdedd3',
					200: '#fbd9a5',
					300: '#f8c06d',
					400: '#f5a332',
					500: '#f2850a',
					600: '#e36a00',
					700: '#bc4e00',
					800: '#963e00',
					900: '#7a3200',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
				},
				chat: {
					user: 'hsl(var(--chat-user))',
					ai: 'hsl(var(--chat-ai))',
					'user-foreground': 'hsl(var(--chat-user-foreground))',
					'ai-foreground': 'hsl(var(--chat-ai-foreground))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'slide-in-left': {
					'0%': { transform: 'translateX(-100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'pulse-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 20px hsl(var(--primary) / 0.3)' 
					},
					'50%': { 
						boxShadow: '0 0 40px hsl(var(--primary) / 0.6)' 
					}
				},
				'typing': {
					'0%, 60%': { opacity: '0.3' },
					'30%': { opacity: '1' }
				},
				'show-step-item': {
					from: {
						transform: 'scale(0.2)',
						opacity: '0'
					},
					to: {
						transform: 'scale(1)',
						opacity: '1',
						visibility: 'visible'
					}
				},
				'moveline': {
					to: {
						strokeDashoffset: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'slide-in-left': 'slide-in-left 0.3s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'typing': 'typing 1.4s infinite',
				'moveline': 'moveline 4s linear forwards',
				'show-step-item': 'show-step-item 0.2s forwards',
				'spin-slow': 'spin 3s linear infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
