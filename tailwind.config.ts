import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lab/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontWeight: {
  			normal: 'var(--font-weight-normal)',
  			medium: 'var(--font-weight-medium)',
  			semibold: 'var(--font-weight-semibold)',
  			bold: 'var(--font-weight-bold)',
  		},
  		zIndex: {
  			dropdown: 'var(--z-dropdown)',
  			modal: 'var(--z-modal)',
  			tooltip: 'var(--z-tooltip)',
  			toast: 'var(--z-toast)',
  		},
  		boxShadow: {
  			raised: 'var(--elevation-raised)',
  			'raised-hover': 'var(--elevation-raised-hover)',
  		},
  		keyframes: {
  			"exploding-heart-fade": {
  				to: { opacity: "0" },
  			},
  			"exploding-heart-from-center": {
  				from: { transform: "translate(0px, 0px)" },
  			},
  		},
  		animation: {
  			"exploding-heart-particle":
  				"exploding-heart-fade var(--fade-duration) forwards, exploding-heart-from-center 500ms",
  		},
  	}
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [
    require("tailwindcss-animate"),
    function hoverableVariant({
      addVariant,
    }: {
      addVariant: (name: string, definition: string) => void
    }) {
      addVariant("hoverable", "@media (hover: hover)")
    },
  ],
} satisfies Config;
