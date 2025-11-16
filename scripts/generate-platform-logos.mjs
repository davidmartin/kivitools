#!/usr/bin/env node

/**
 * Script para generar logos SVG simples de plataformas
 * Estos logos se usarán en las tarjetas de plataforma en la página principal
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const platforms = [
    {
        name: 'tiktok',
        icon: '🎵',
        color: '#EE1D52',
        gradient: 'linear-gradient(135deg, #EE1D52 0%, #69C9D0 100%)',
    },
    {
        name: 'instagram',
        icon: '📸',
        color: '#E4405F',
        gradient: 'linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #FCAF45 100%)',
    },
    {
        name: 'twitter',
        icon: '🐦',
        color: '#1DA1F2',
        gradient: 'linear-gradient(135deg, #1DA1F2 0%, #0A7BC1 100%)',
    },
    {
        name: 'snapchat',
        icon: '👻',
        color: '#FFFC00',
        gradient: 'linear-gradient(135deg, #FFFC00 0%, #FCD116 100%)',
    },
    {
        name: 'youtube',
        icon: '🎥',
        color: '#FF0000',
        gradient: 'linear-gradient(135deg, #FF0000 0%, #CC0000 100%)',
    },
    {
        name: 'reddit',
        icon: '🔴',
        color: '#FF4500',
        gradient: 'linear-gradient(135deg, #FF4500 0%, #D93B00 100%)',
    },
    {
        name: 'discord',
        icon: '💬',
        color: '#5865F2',
        gradient: 'linear-gradient(135deg, #5865F2 0%, #4752C4 100%)',
    },
    {
        name: 'twitch',
        icon: '🎮',
        color: '#9146FF',
        gradient: 'linear-gradient(135deg, #9146FF 0%, #772CE8 100%)',
    },
    {
        name: 'suno',
        icon: '🎵',
        color: '#8B5CF6',
        gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    },
];

const outputDir = path.join(__dirname, '..', 'public', 'platforms');

// Crear directorio si no existe
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

platforms.forEach((platform) => {
    const svg = `<svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-${platform.name}" x1="0%" y1="0%" x2="100%" y2="100%">
      ${platform.gradient.match(/linear-gradient\(135deg, (.+)\)/)[1]
            .split(', ')
            .map((color, i) => {
                const [c, percentage] = color.split(' ');
                return `<stop offset="${percentage || (i === 0 ? '0%' : '100%')}" style="stop-color:${c};stop-opacity:1" />`;
            })
            .join('\n      ')}
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="24" fill="url(#grad-${platform.name})"/>
  <text x="60" y="80" font-size="60" text-anchor="middle" fill="white">${platform.icon}</text>
</svg>`;

    const filePath = path.join(outputDir, `${platform.name}.svg`);
    fs.writeFileSync(filePath, svg);
    console.log(`✅ Generated ${platform.name}.svg`);
});

console.log(`\n🎉 All platform logos generated in ${outputDir}`);
