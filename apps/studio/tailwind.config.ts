import type { Config } from 'tailwindcss';
import sharedConfig from '@photomagic/tailwind-config';

const config: Config = {
  content: [
    // App-level relative paths (when cwd is apps/studio)
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/design-language/src/**/*.{js,ts,jsx,tsx,mdx}',

    // Monorepo root relative paths (when cwd is repository root)
    './apps/studio/app/**/*.{js,ts,jsx,tsx,mdx}',
    './apps/studio/components/**/*.{js,ts,jsx,tsx,mdx}',
    './packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
    './packages/design-language/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  presets: [sharedConfig],
};

export default config;
