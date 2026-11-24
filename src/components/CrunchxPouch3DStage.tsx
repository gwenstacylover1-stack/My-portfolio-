import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Box, MoveHorizontal } from 'lucide-react';

export interface CrunchxPouch3DStageProps {
  activeTabId?: string;
}

type FlavorId = 'peri-peri' | 'masala' | 'cream-herb';

interface FlavorConfig {
  id: FlavorId;
  pillLabel: string;
  packTitle: string;
  packSubtitle: string;
  heatLabel: string;
  storyLines: [string, string, string];
  foilHex: string;
  darkStop: string;
  midStop: string;
  brightStop: string;
  deepCorner: string;
  accentPrimary: string;
  accentSecondary: string;
  foilTint: string;
  rimLightHex: string;
  floorGlowHex: string;
  fleckColors: [string, string, string];
}

const FLAVORS: Record<FlavorId, FlavorConfig> = {
  'peri-peri': {
    id: 'peri-peri',
    pillLabel: 'Peri-Peri',
    packTitle: 'FIERY PERI-PERI',
    packSubtitle: "SMOKED BIRD'S EYE CHILI & CITRUS",
    heatLabel: 'VOLT 05',
    storyLines: [
      'Thick-cut heirloom potatoes kettle-cooked in',
      "micro batches and tumbled in fiery bird's eye",
      'peri-peri chili, charred lemon zest & sea salt.',
    ],
    foilHex: '#b81d24',
    darkStop: '#2A0508',
    midStop: '#8E1319',
    brightStop: '#B81D24',
    deepCorner: '#3D070C',
    accentPrimary: '#FF5760',
    accentSecondary: '#FFA64D',
    foilTint: '#FFF4F4',
    rimLightHex: '#FF3B47',
    floorGlowHex: '#B81D24',
    fleckColors: ['#FF3B47', '#F97316', '#FDE047'],
  },
  masala: {
    id: 'masala',
    pillLabel: 'Masala',
    packTitle: 'ROYAL MASALA',
    packSubtitle: 'TOASTED CUMIN, AMCHUR & SPICE',
    heatLabel: 'VOLT 03',
    storyLines: [
      'Thick-cut heirloom potatoes kettle-cooked in',
      'micro batches and dusted with roasted cumin,',
      'tangy amchur, smoked paprika & black salt.',
    ],
    foilHex: '#d98218',
    darkStop: '#2D1603',
    midStop: '#A85F0F',
    brightStop: '#D98218',
    deepCorner: '#422004',
    accentPrimary: '#FBBF24',
    accentSecondary: '#FDE68A',
    foilTint: '#FFF9EE',
    rimLightHex: '#F59E0B',
    floorGlowHex: '#D98218',
    fleckColors: ['#F59E0B', '#EF4444', '#FDE047'],
  },
  'cream-herb': {
    id: 'cream-herb',
    pillLabel: 'Cream & Herb',
    packTitle: 'CREAM & HERB',
    packSubtitle: 'WHIPPED SOUR CREAM & GARDEN CHIVES',
    heatLabel: 'VOLT 01',
    storyLines: [
      'Thick-cut heirloom potatoes kettle-cooked in',
      'micro batches and folded into tangy sour cream,',
      'crushed garden chives, garlic & cracked pepper.',
    ],
    foilHex: '#15803d',
    darkStop: '#041F0F',
    midStop: '#0F632E',
    brightStop: '#15803D',
    deepCorner: '#062B14',
    accentPrimary: '#4ADE80',
    accentSecondary: '#A7F3D0',
    foilTint: '#F2FFF6',
    rimLightHex: '#22C55E',
    floorGlowHex: '#15803D',
    fleckColors: ['#4ADE80', '#E2E8F0', '#16A34A'],
  },
};

const FLAVOR_LIST: FlavorConfig[] = [
  FLAVORS['peri-peri'],
  FLAVORS.masala,
  FLAVORS['cream-herb'],
];

/**
 * Draws the high-contrast CRUNCHX glossy metallic foil label + roughness map
 * onto the provided canvases so flavors swap in-place with zero GPU leak.
 */
function paintFrontFoilCanvases(
  albedoCanvas: HTMLCanvasElement,
  roughCanvas: HTMLCanvasElement,
  flavor: FlavorConfig,
) {
  const width = albedoCanvas.width;
  const height = albedoCanvas.height;
  const ctx = albedoCanvas.getContext('2d')!;
  const rctx = roughCanvas.getContext('2d')!;

  // Roughness base: glossy satin metallic foil (darker = glossier, lighter = matte)
  rctx.fillStyle = '#525252';
  rctx.fillRect(0, 0, width, height);

  // Rich metallic flavor foil gradient
  const baseGrad = ctx.createLinearGradient(0, 0, width, height);
  baseGrad.addColorStop(0, flavor.darkStop);
  baseGrad.addColorStop(0.32, flavor.brightStop);
  baseGrad.addColorStop(0.62, flavor.midStop);
  baseGrad.addColorStop(1, flavor.deepCorner);
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, width, height);

  // Metallic center highlight sheen
  const sheenGrad = ctx.createRadialGradient(
    width * 0.48,
    height * 0.36,
    40,
    width * 0.5,
    height * 0.45,
    width * 0.72,
  );
  sheenGrad.addColorStop(0, 'rgba(255, 255, 255, 0.24)');
  sheenGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.04)');
  sheenGrad.addColorStop(1, 'rgba(0, 0, 0, 0.46)');
  ctx.fillStyle = sheenGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle diagonal brushed foil micro-stripes
  ctx.save();
  for (let i = -height; i < width + height; i += 26) {
    ctx.strokeStyle =
      i % 52 === 0 ? 'rgba(255, 255, 255, 0.045)' : 'rgba(0, 0, 0, 0.045)';
    ctx.lineWidth = i % 104 === 0 ? 3 : 1;
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i - height * 0.52, height);
    ctx.stroke();
  }
  ctx.restore();

  // Dynamic geometric foil shards for premium D2C packaging silhouette
  ctx.save();
  const leftShard = ctx.createLinearGradient(0, 220, 450, 780);
  leftShard.addColorStop(0, 'rgba(255, 255, 255, 0.22)');
  leftShard.addColorStop(0.55, 'rgba(255, 255, 255, 0.05)');
  leftShard.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = leftShard;
  ctx.beginPath();
  ctx.moveTo(0, 260);
  ctx.lineTo(420, 500);
  ctx.lineTo(180, 910);
  ctx.lineTo(0, 790);
  ctx.closePath();
  ctx.fill();

  const rightShard = ctx.createLinearGradient(width, 280, 520, 980);
  rightShard.addColorStop(0, 'rgba(0, 0, 0, 0.32)');
  rightShard.addColorStop(0.6, 'rgba(0, 0, 0, 0.1)');
  rightShard.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = rightShard;
  ctx.beginPath();
  ctx.moveTo(width, 290);
  ctx.lineTo(560, 580);
  ctx.lineTo(830, 1040);
  ctx.lineTo(width, 890);
  ctx.closePath();
  ctx.fill();

  // Mirror glossy foil accents into roughness map
  rctx.fillStyle = '#262626';
  rctx.beginPath();
  rctx.moveTo(0, 260);
  rctx.lineTo(420, 500);
  rctx.lineTo(180, 910);
  rctx.lineTo(0, 790);
  rctx.closePath();
  rctx.fill();
  ctx.restore();

  // Architectural inner packaging frame
  const pad = 54;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(pad, 96, width - pad * 2, height - 186);

  // Corner foil L-ticks
  const tick = 36;
  ctx.lineWidth = 5;
  ctx.strokeStyle = flavor.accentSecondary;
  ctx.beginPath();
  ctx.moveTo(pad, 96 + tick);
  ctx.lineTo(pad, 96);
  ctx.lineTo(pad + tick, 96);
  ctx.moveTo(width - pad, height - 90 - tick);
  ctx.lineTo(width - pad, height - 90);
  ctx.lineTo(width - pad - tick, height - 90);
  ctx.stroke();

  ctx.strokeStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.moveTo(width - pad - tick, 96);
  ctx.lineTo(width - pad, 96);
  ctx.lineTo(width - pad, 96 + tick);
  ctx.moveTo(pad + tick, height - 90);
  ctx.lineTo(pad, height - 90);
  ctx.lineTo(pad, height - 90 - tick);
  ctx.stroke();

  // Top batch tag
  const cx = width / 2;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
  ctx.font = '700 26px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.textAlign = 'center';
  ctx.fillText('SMALL BATCH  •  KETTLE-COOKED', cx, 162);

  // Accent divider
  const lineGrad = ctx.createLinearGradient(130, 0, width - 130, 0);
  lineGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
  lineGrad.addColorStop(0.5, flavor.accentSecondary);
  lineGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.strokeStyle = lineGrad;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(130, 192);
  ctx.lineTo(width - 130, 192);
  ctx.stroke();

  // Center kettle crisp crest emblem
  const emblemY = 674;
  ctx.save();
  const darkDisc = ctx.createRadialGradient(cx, emblemY, 20, cx, emblemY, 275);
  darkDisc.addColorStop(0, 'rgba(7, 10, 18, 0.72)');
  darkDisc.addColorStop(0.7, 'rgba(7, 10, 18, 0.35)');
  darkDisc.addColorStop(1, 'rgba(7, 10, 18, 0)');
  ctx.fillStyle = darkDisc;
  ctx.beginPath();
  ctx.arc(cx, emblemY, 275, 0, Math.PI * 2);
  ctx.fill();

  // Outer hexagonal foil crest
  ctx.strokeStyle = flavor.accentSecondary;
  ctx.lineWidth = 4.5;
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3 - Math.PI / 6;
    const rx = cx + Math.cos(a) * 195;
    const ry = emblemY + Math.sin(a) * 195;
    if (i === 0) ctx.moveTo(rx, ry);
    else ctx.lineTo(rx, ry);
  }
  ctx.closePath();
  ctx.stroke();

  // Inner rotated white hex
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3;
    const rx = cx + Math.cos(a) * 158;
    const ry = emblemY + Math.sin(a) * 158;
    if (i === 0) ctx.moveTo(rx, ry);
    else ctx.lineTo(rx, ry);
  }
  ctx.closePath();
  ctx.stroke();

  // Stylized golden kettle crisp graphic
  const crispGrad = ctx.createLinearGradient(
    cx - 110,
    emblemY - 90,
    cx + 115,
    emblemY + 95,
  );
  crispGrad.addColorStop(0, '#FEF08A');
  crispGrad.addColorStop(0.38, '#F59E0B');
  crispGrad.addColorStop(0.76, '#B45309');
  crispGrad.addColorStop(1, '#78350F');
  ctx.fillStyle = crispGrad;
  ctx.beginPath();
  ctx.moveTo(cx - 98, emblemY - 12);
  ctx.bezierCurveTo(
    cx - 95,
    emblemY - 98,
    cx + 48,
    emblemY - 108,
    cx + 104,
    emblemY - 26,
  );
  ctx.bezierCurveTo(
    cx + 124,
    emblemY + 34,
    cx + 62,
    emblemY + 106,
    cx - 26,
    emblemY + 92,
  );
  ctx.bezierCurveTo(
    cx - 88,
    emblemY + 82,
    cx - 104,
    emblemY + 42,
    cx - 98,
    emblemY - 12,
  );
  ctx.closePath();
  ctx.fill();

  // Kettle crisp curl ridges
  ctx.strokeStyle = 'rgba(255, 251, 235, 0.45)';
  ctx.lineWidth = 5;
  for (let r = -54; r <= 54; r += 26) {
    ctx.beginPath();
    ctx.moveTo(cx - 66, emblemY + r - 12);
    ctx.quadraticCurveTo(cx, emblemY + r + 10, cx + 68, emblemY + r - 14);
    ctx.stroke();
  }

  // Flavor seasoning flecks
  const flecks: [number, number, string][] = [
    [-40, -28, flavor.fleckColors[0]],
    [20, -36, flavor.fleckColors[1]],
    [44, 8, flavor.fleckColors[0]],
    [-12, 24, flavor.fleckColors[2]],
    [-54, 18, flavor.fleckColors[0]],
    [26, 42, flavor.fleckColors[2]],
    [6, -6, flavor.fleckColors[1]],
  ];
  for (const [fx, fy, color] of flecks) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(cx + fx, emblemY + fy, 6.5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // HERO BRAND WORDMARK: "CRUNCHX"
  ctx.save();
  ctx.textBaseline = 'middle';
  ctx.font =
    '900 144px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.72)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 8;

  const prefix = 'CRUNCH';
  const suffix = 'X';
  const prefixW = ctx.measureText(prefix).width;
  const suffixW = ctx.measureText(suffix).width;
  const totalW = prefixW + suffixW;
  const startX = cx - totalW / 2;
  const titleY = 338;

  const chromeGrad = ctx.createLinearGradient(0, titleY - 72, 0, titleY + 72);
  chromeGrad.addColorStop(0, '#FFFFFF');
  chromeGrad.addColorStop(0.5, '#F1F5F9');
  chromeGrad.addColorStop(1, '#E2E8F0');

  ctx.textAlign = 'left';
  ctx.fillStyle = chromeGrad;
  ctx.fillText(prefix, startX, titleY);

  const xGrad = ctx.createLinearGradient(
    startX + prefixW,
    titleY - 68,
    startX + totalW,
    titleY + 68,
  );
  xGrad.addColorStop(0, '#FFFFFF');
  xGrad.addColorStop(0.45, flavor.accentSecondary);
  xGrad.addColorStop(1, flavor.accentPrimary);
  ctx.fillStyle = xGrad;
  ctx.fillText(suffix, startX + prefixW, titleY);

  ctx.shadowColor = 'transparent';
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
  ctx.strokeText(prefix, startX, titleY);

  // Glossy metallic stamp in roughness map for wordmark
  rctx.save();
  rctx.textAlign = 'left';
  rctx.textBaseline = 'middle';
  rctx.font = ctx.font;
  rctx.fillStyle = '#121212';
  rctx.fillText(prefix + suffix, startX, titleY);
  rctx.restore();
  ctx.restore();

  // Flavor subtitle under wordmark
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.font = '700 23px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText(flavor.packSubtitle, cx, 430);

  // High-contrast Flavor Pill Banner
  const pillW = 680;
  const pillH = 88;
  const pillX = cx - pillW / 2;
  const pillY = 934;
  ctx.save();
  ctx.fillStyle = 'rgba(5, 8, 16, 0.88)';
  ctx.beginPath();
  ctx.roundRect(pillX, pillY, pillW, pillH, 44);
  ctx.fill();

  ctx.strokeStyle = flavor.accentSecondary;
  ctx.lineWidth = 4.5;
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 38px system-ui, -apple-system, sans-serif';
  ctx.textBaseline = 'middle';
  ctx.fillText(flavor.packTitle, cx, pillY + pillH / 2 + 1);
  ctx.restore();

  rctx.fillStyle = '#181818';
  rctx.beginPath();
  rctx.roundRect(pillX, pillY, pillW, pillH, 44);
  rctx.fill();

  // Lower 3 spec columns
  const specsY = 1104;
  const specItems = [
    { label: 'TEXTURE', value: '2X KETTLE', color: '#FFFFFF' },
    { label: 'SPICE LVL', value: flavor.heatLabel, color: flavor.accentSecondary },
    { label: 'NET WT', value: '140g', color: '#FFFFFF' },
  ];
  const colW = (width - pad * 2 - 40) / 3;
  specItems.forEach((spec, idx) => {
    const sx = pad + 20 + colW * idx + colW / 2;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.72)';
    ctx.font = '600 20px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.fillText(spec.label, sx, specsY);

    ctx.fillStyle = spec.color;
    ctx.font = '800 30px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.fillText(spec.value, sx, specsY + 42);

    if (idx < 2) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(pad + 20 + colW * (idx + 1), specsY - 16);
      ctx.lineTo(pad + 20 + colW * (idx + 1), specsY + 56);
      ctx.stroke();
    }
  });

  // Footer metallic badge bar
  ctx.fillStyle = 'rgba(4, 6, 12, 0.56)';
  ctx.fillRect(pad + 24, 1212, width - (pad + 24) * 2, 72);
  ctx.fillStyle = '#F8FAFC';
  ctx.font = '600 22px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText('ZERO PALM OIL  ·  100% FOIL-LOCKED FRESHNESS', cx, 1250);
}

/**
 * Draws the matching flavor back-of-pouch canvas (center seam, story, nutrition table, barcode).
 */
function paintBackFoilCanvas(canvas: HTMLCanvasElement, flavor: FlavorConfig) {
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, flavor.darkStop);
  grad.addColorStop(0.5, flavor.midStop);
  grad.addColorStop(1, flavor.deepCorner);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Center fin-seam metallic shading
  const seamGrad = ctx.createLinearGradient(width / 2 - 24, 0, width / 2 + 24, 0);
  seamGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
  seamGrad.addColorStop(0.45, 'rgba(255, 255, 255, 0.14)');
  seamGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.45)');
  seamGrad.addColorStop(0.55, 'rgba(255, 255, 255, 0.1)');
  seamGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = seamGrad;
  ctx.fillRect(width / 2 - 24, 0, 48, height);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 72px system-ui, -apple-system, sans-serif';
  ctx.fillText('CRUNCHX', width / 2, 195);

  ctx.fillStyle = flavor.accentSecondary;
  ctx.font = '700 23px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText(`${flavor.packTitle}  //  SMALL BATCH`, width / 2, 246);

  // Story box
  ctx.fillStyle = 'rgba(4, 6, 12, 0.58)';
  ctx.beginPath();
  ctx.roundRect(96, 300, width - 192, 210, 24);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#F1F5F9';
  ctx.font = '600 26px system-ui, -apple-system, sans-serif';
  ctx.fillText(flavor.storyLines[0], width / 2, 372);
  ctx.fillText(flavor.storyLines[1], width / 2, 414);
  ctx.fillText(flavor.storyLines[2], width / 2, 456);

  // Nutrition profile
  const boxX = 116;
  const boxY = 568;
  const boxW = width - 232;
  const boxH = 440;
  ctx.fillStyle = 'rgba(4, 7, 15, 0.82)';
  ctx.beginPath();
  ctx.roundRect(boxX, boxY, boxW, boxH, 20);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.26)';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.textAlign = 'left';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 32px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText('NUTRITION PROFILE', boxX + 40, boxY + 64);

  ctx.textAlign = 'right';
  ctx.fillStyle = flavor.accentSecondary;
  ctx.font = '700 22px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText('PER 30g SERVING', boxX + boxW - 40, boxY + 64);

  const rows: [string, string][] = [
    ['ENERGY', '152 kcal'],
    ['TOTAL CARBOHYDRATE', '17.4 g'],
    ['DIETARY FIBER', '2.1 g'],
    ['PLANT PROTEIN', '2.4 g'],
    ['TRANS FAT', '0.0 g'],
    ['SODIUM', '185 mg'],
  ];
  rows.forEach(([label, val], idx) => {
    const ry = boxY + 128 + idx * 50;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(boxX + 36, ry - 26);
    ctx.lineTo(boxX + boxW - 36, ry - 26);
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#CBD5E1';
    ctx.font = '600 24px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.fillText(label, boxX + 40, ry);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 24px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.fillText(val, boxX + boxW - 40, ry);
  });

  // Barcode block
  const bcW = 360;
  const bcH = 110;
  const bcX = width / 2 - bcW / 2;
  const bcY = 1096;
  ctx.fillStyle = '#F8FAFC';
  ctx.beginPath();
  ctx.roundRect(bcX, bcY, bcW, bcH, 10);
  ctx.fill();

  ctx.fillStyle = '#070A12';
  let cursor = bcX + 26;
  const barPattern = [
    4, 2, 7, 3, 2, 6, 4, 2, 8, 3, 5, 2, 4, 6, 2, 5, 3, 7, 2, 4, 3, 6, 2, 5, 4,
    3, 6, 2, 4,
  ];
  barPattern.forEach((w, idx) => {
    if (cursor + w < bcX + bcW - 24) {
      ctx.fillRect(cursor, bcY + 16, w, bcH - 36);
    }
    cursor += w + (idx % 3 === 0 ? 5 : 4);
  });

  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '600 22px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText('CRUNCHXDEMO.PAGES.DEV', width / 2, 1266);
}

/**
 * Draws the side-gusset metallic foil canvas matching the active flavor.
 */
function paintGussetFoilCanvas(canvas: HTMLCanvasElement, flavor: FlavorConfig) {
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, width, 0);
  grad.addColorStop(0, flavor.brightStop);
  grad.addColorStop(0.42, flavor.midStop);
  grad.addColorStop(0.5, flavor.darkStop);
  grad.addColorStop(0.58, flavor.midStop);
  grad.addColorStop(1, flavor.brightStop);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.fillRect(width / 2 - 2, 120, 4, height - 240);

  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
  ctx.font = '700 24px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.fillText(`CRUNCHX  ·  ${flavor.packTitle}  ·  140g`, 0, -24);
  ctx.restore();
}

/**
 * Generates a pure white soft radial glow texture tinted dynamically via material.color
 * so the floor reflection glow smoothly transitions between flavors & X-ray mode.
 */
function createRadialGlowTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createRadialGradient(
    size / 2,
    size / 2,
    4,
    size / 2,
    size / 2,
    size / 2,
  );
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.92)');
  grad.addColorStop(0.32, 'rgba(255, 255, 255, 0.42)');
  grad.addColorStop(0.68, 'rgba(255, 255, 255, 0.1)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Generates a soft circular glow sprite texture for the ambient floating particles.
 */
function createParticleSpriteTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createRadialGradient(
    size / 2,
    size / 2,
    1,
    size / 2,
    size / 2,
    size / 2,
  );
  grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  grad.addColorStop(0.35, 'rgba(255, 255, 255, 0.65)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Sculpts a true volumetric stand-up foil snack pouch from a subdivided BoxGeometry.
 */
function createVolumetricPouchGeometry(
  width = 1.58,
  height = 2.16,
  depth = 0.66,
): THREE.BoxGeometry {
  const geo = new THREE.BoxGeometry(width, height, depth, 36, 52, 12);
  const pos = geo.attributes.position as THREE.BufferAttribute;

  const halfW = width / 2;
  const halfH = height / 2;
  const halfD = depth / 2;

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);

    const u = x / halfW;
    const v = y / halfH;
    const w = z / halfD;
    const t = (v + 1) * 0.5;

    const verticalSin = Math.sin(Math.PI * Math.min(1, Math.max(0, t)));
    const sealEnvelope = Math.pow(verticalSin, 0.68);
    const standupBelly = 1.0 + 0.28 * Math.exp(-Math.pow((t - 0.3) / 0.34, 2));

    const edgeFactor = Math.max(0, 1 - u * u * 0.94);
    const pillowCurve = Math.pow(edgeFactor, 0.52);

    const gussetThickness = 0.32 + 0.24 * (1 - t);
    const bodyDepthScale =
      sealEnvelope *
      standupBelly *
      (gussetThickness + (1 - gussetThickness) * pillowCurve);

    const minSeamRatio = 0.055;
    let zOut = w * (minSeamRatio + (1 - minSeamRatio) * bodyDepthScale) * halfD;

    const ripple =
      Math.sin(u * 4.5 + v * 3.1) *
      Math.cos(v * 6.2 - u * 2.2) *
      0.008 *
      sealEnvelope *
      (0.4 + 0.6 * Math.abs(u));
    zOut += Math.sign(w || 1) * ripple;

    let xOut = x * (1.03 - 0.045 * t + 0.025 * Math.sin(Math.PI * t));

    if (Math.abs(u) > 0.86) {
      const edgeWeight = (Math.abs(u) - 0.86) / 0.14;
      const centerDepthWeight = Math.exp(-Math.pow(w / 0.42, 2));
      const gussetFold =
        edgeWeight * centerDepthWeight * sealEnvelope * (0.085 + 0.055 * (1 - t));
      xOut -= Math.sign(u) * gussetFold;
    }

    pos.setXYZ(i, xOut, y, zOut);
  }

  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

/**
 * Creates a corrugated metallic crimp-seal strip geometry for top and bottom pouch edges.
 */
function createCrimpedSealGeometry(
  width: number,
  height: number,
  depth: number,
): THREE.BoxGeometry {
  const geo = new THREE.BoxGeometry(width, height, depth, 88, 4, 2);
  const pos = geo.attributes.position as THREE.BufferAttribute;

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);

    const ridge = Math.sin(x * 84) * 0.0075;
    const groove = Math.cos((y / (height / 2)) * Math.PI) * 0.003;
    pos.setZ(i, z + Math.sign(z || 1) * (ridge + groove));
  }

  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

/**
 * Creates a subtly curved saddle-shaped potato crisp geometry for the X-ray internal reveal.
 */
function createKettleCrispGeometry(): THREE.CircleGeometry {
  const geo = new THREE.CircleGeometry(0.32, 20);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = (x * x - y * y) * 0.72 + Math.sin(x * 9) * 0.015;
    pos.setXYZ(i, x * 1.15, y * 0.92, z);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

/**
 * Custom GLSL X-Ray Fresnel + animated vertical scanline shader material.
 */
function createXrayShaderMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uScanY: { value: 0 },
      uColor: { value: new THREE.Color('#00f5ff') },
    },
    vertexShader: `
      varying vec3 vNormalWorld;
      varying vec3 vViewDir;
      varying float vWorldY;

      void main() {
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldY = worldPos.y;
        vNormalWorld = normalize(mat3(modelMatrix) * normal);
        vViewDir = normalize(cameraPosition - worldPos.xyz);
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uScanY;
      uniform vec3 uColor;

      varying vec3 vNormalWorld;
      varying vec3 vViewDir;
      varying float vWorldY;

      void main() {
        float ndotv = abs(dot(normalize(vNormalWorld), normalize(vViewDir)));
        float fresnel = pow(1.0 - ndotv, 2.15);

        // Fine horizontal holographic scanlines
        float fineLines = 0.5 + 0.5 * sin(vWorldY * 54.0 - uTime * 3.5);
        float scanLineMask = mix(0.82, 1.18, fineLines);

        // Bright vertical laser sweep highlight synced to uScanY
        float distToScan = abs(vWorldY - uScanY);
        float laserBand = exp(-pow(distToScan / 0.14, 2.0));

        vec3 baseGlow = uColor * (0.28 + fresnel * 1.45) * scanLineMask;
        vec3 laserBoost = vec3(0.65, 1.0, 1.0) * laserBand * 1.35;
        vec3 color = baseGlow + laserBoost;

        float alpha = clamp(0.14 + fresnel * 0.62 + laserBand * 0.45, 0.12, 0.92);
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  });
}

function detectSoftwareWebGL(gl: WebGLRenderingContext | WebGL2RenderingContext): boolean {
  try {
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return false;
    const rendererStr = String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '');
    return /SwiftShader|llvmpipe|Software|Microsoft Basic Render|ANGLE.*Warp/i.test(
      rendererStr,
    );
  } catch {
    return false;
  }
}

export function CrunchxPouch3DStage({
  activeTabId = 'product-stage',
}: CrunchxPouch3DStageProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasHostRef = useRef<HTMLDivElement | null>(null);
  const activeTabRef = useRef(activeTabId);
  const [activeFlavorId, setActiveFlavorId] = useState<FlavorId>('peri-peri');
  const activeFlavorRef = useRef<FlavorId>('peri-peri');
  const applyFlavorRef = useRef<((flavor: FlavorConfig) => void) | null>(null);
  const [webglFailed, setWebglFailed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    activeTabRef.current = activeTabId;
  }, [activeTabId]);

  useEffect(() => {
    activeFlavorRef.current = activeFlavorId;
    applyFlavorRef.current?.(FLAVORS[activeFlavorId]);
  }, [activeFlavorId]);

  useEffect(() => {
    const container = containerRef.current;
    const canvasHost = canvasHostRef.current;
    if (!container || !canvasHost) return;

    let isSoftwareGl = false;
    try {
      const probeCanvas = document.createElement('canvas');
      const probeGl =
        probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
      if (!probeGl) {
        setWebglFailed(true);
        return;
      }
      isSoftwareGl = detectSoftwareWebGL(probeGl);
    } catch {
      setWebglFailed(true);
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglFailed(true);
      return;
    }

    const maxDpr = isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(maxDpr);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    canvasHost.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
    camera.position.set(0, 0.04, 6.2);
    camera.lookAt(0, -0.02, 0);

    // Procedural Studio RoomEnvironment for crisp metallic light streaks across foil
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    const envRenderTarget = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = envRenderTarget.texture;
    roomEnv.dispose();
    pmremGenerator.dispose();

    // Studio Lighting Setup
    const hemiLight = new THREE.HemisphereLight('#DCEEFF', '#0A0D1C', 0.65);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight('#FFFFFF', 2.2);
    keyLight.position.set(2.8, 3.6, 4.4);
    scene.add(keyLight);

    const initialFlavor = FLAVORS[activeFlavorRef.current];
    const rimLight = new THREE.DirectionalLight(initialFlavor.rimLightHex, 2.0);
    rimLight.position.set(-3.4, 1.8, -2.8);
    scene.add(rimLight);

    const cyanLight = new THREE.PointLight('#00f5ff', 7.5, 11, 1.7);
    cyanLight.position.set(-2.5, 1.0, 2.4);
    scene.add(cyanLight);

    const pinkLight = new THREE.PointLight('#ff2e97', 7.5, 11, 1.7);
    pinkLight.position.set(2.5, -0.8, 2.2);
    scene.add(pinkLight);

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const textures: THREE.Texture[] = [];

    // Reusable Offscreen Canvases for instant in-place flavor texture swaps
    const frontAlbedoCanvas = document.createElement('canvas');
    frontAlbedoCanvas.width = 1024;
    frontAlbedoCanvas.height = 1408;

    const frontRoughCanvas = document.createElement('canvas');
    frontRoughCanvas.width = 1024;
    frontRoughCanvas.height = 1408;

    const backCanvas = document.createElement('canvas');
    backCanvas.width = 1024;
    backCanvas.height = 1408;

    const gussetCanvas = document.createElement('canvas');
    gussetCanvas.width = 256;
    gussetCanvas.height = 1024;

    paintFrontFoilCanvases(frontAlbedoCanvas, frontRoughCanvas, initialFlavor);
    paintBackFoilCanvas(backCanvas, initialFlavor);
    paintGussetFoilCanvas(gussetCanvas, initialFlavor);

    const maxAnisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);

    const frontMap = new THREE.CanvasTexture(frontAlbedoCanvas);
    frontMap.colorSpace = THREE.SRGBColorSpace;
    const frontRoughMap = new THREE.CanvasTexture(frontRoughCanvas);
    const backMap = new THREE.CanvasTexture(backCanvas);
    backMap.colorSpace = THREE.SRGBColorSpace;
    const gussetMap = new THREE.CanvasTexture(gussetCanvas);
    gussetMap.colorSpace = THREE.SRGBColorSpace;
    const floorGlowMap = createRadialGlowTexture();
    const particleMap = createParticleSpriteTexture();

    [frontMap, frontRoughMap, backMap, gussetMap, floorGlowMap, particleMap].forEach(
      (tex) => {
        tex.anisotropy = maxAnisotropy;
        textures.push(tex);
      },
    );

    // Glossy Metallic Foil Materials
    const frontMaterial = new THREE.MeshPhysicalMaterial({
      map: frontMap,
      roughnessMap: frontRoughMap,
      color: new THREE.Color(initialFlavor.foilTint),
      metalness: 0.72,
      roughness: 0.36,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.96,
      envMapIntensity: 1.5,
    });

    const backMaterial = new THREE.MeshPhysicalMaterial({
      map: backMap,
      color: new THREE.Color(initialFlavor.foilTint),
      metalness: 0.74,
      roughness: 0.28,
      clearcoat: 0.95,
      clearcoatRoughness: 0.14,
      envMapIntensity: 1.4,
    });

    const gussetMaterial = new THREE.MeshPhysicalMaterial({
      map: gussetMap,
      color: new THREE.Color(initialFlavor.foilTint),
      metalness: 0.82,
      roughness: 0.24,
      clearcoat: 0.92,
      clearcoatRoughness: 0.14,
      envMapIntensity: 1.45,
    });

    const seamEdgeMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(initialFlavor.darkStop),
      metalness: 0.88,
      roughness: 0.22,
      clearcoat: 0.85,
      clearcoatRoughness: 0.14,
      envMapIntensity: 1.45,
    });

    const crimpMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#475569'),
      metalness: 0.95,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.09,
      envMapIntensity: 1.9,
    });

    const accentTrimMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#1E293B'),
      metalness: 0.9,
      roughness: 0.2,
      clearcoat: 0.8,
      envMapIntensity: 1.5,
    });

    const foilBodyMaterials: THREE.Material[] = [
      gussetMaterial,
      gussetMaterial,
      seamEdgeMaterial,
      seamEdgeMaterial,
      frontMaterial,
      backMaterial,
    ];

    // X-Ray Shader & Wireframe Materials
    const xrayShaderMat = createXrayShaderMaterial();
    const xrayWireMat = new THREE.MeshBasicMaterial({
      color: '#00f5ff',
      wireframe: true,
      transparent: true,
      opacity: 0.36,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const xrayCrimpMat = new THREE.MeshBasicMaterial({
      color: '#00f5ff',
      wireframe: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const xrayCrispMat = new THREE.MeshBasicMaterial({
      color: '#38BDF8',
      wireframe: true,
      transparent: true,
      opacity: 0.72,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const xrayCrispCoreMat = new THREE.MeshBasicMaterial({
      color: '#00f5ff',
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    materials.push(
      frontMaterial,
      backMaterial,
      gussetMaterial,
      seamEdgeMaterial,
      crimpMaterial,
      accentTrimMaterial,
      xrayShaderMat,
      xrayWireMat,
      xrayCrimpMat,
      xrayCrispMat,
      xrayCrispCoreMat,
    );

    // 1. VOLUMETRIC 3D FOIL POUCH GROUP
    const pouchPivot = new THREE.Group();
    pouchPivot.position.y = 0.06;
    scene.add(pouchPivot);

    const pouchGroup = new THREE.Group();
    pouchPivot.add(pouchGroup);

    const pouchWidth = 1.58;
    const pouchHeight = 2.16;
    const pouchDepth = 0.66;

    const pouchBodyGeo = createVolumetricPouchGeometry(
      pouchWidth,
      pouchHeight,
      pouchDepth,
    );
    geometries.push(pouchBodyGeo);

    const pouchBodyMesh = new THREE.Mesh<
      THREE.BoxGeometry,
      THREE.Material | THREE.Material[]
    >(pouchBodyGeo, foilBodyMaterials);
    pouchGroup.add(pouchBodyMesh);

    // Glowing Cyan Wireframe Shell (visible in Kettle X-Ray Scanner mode)
    const pouchWireMesh = new THREE.Mesh(pouchBodyGeo, xrayWireMat);
    pouchWireMesh.scale.set(1.008, 1.004, 1.012);
    pouchWireMesh.visible = false;
    pouchGroup.add(pouchWireMesh);

    // Internal Holographic Kettle Crisps revealed during X-Ray mode
    const xrayInnerGroup = new THREE.Group();
    xrayInnerGroup.visible = false;
    const crispGeo = createKettleCrispGeometry();
    geometries.push(crispGeo);
    const crispConfigs = [
      { pos: [-0.22, 0.34, 0.04], rot: [0.4, 0.5, 0.3], scale: 0.95 },
      { pos: [0.2, -0.05, -0.05], rot: [-0.5, 0.25, -0.6], scale: 1.05 },
      { pos: [-0.08, -0.48, 0.06], rot: [0.65, -0.4, 0.2], scale: 0.9 },
    ];
    crispConfigs.forEach((cfg) => {
      const crispWire = new THREE.Mesh(crispGeo, xrayCrispMat);
      crispWire.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
      crispWire.rotation.set(cfg.rot[0], cfg.rot[1], cfg.rot[2]);
      crispWire.scale.setScalar(cfg.scale);

      const crispFill = new THREE.Mesh(crispGeo, xrayCrispCoreMat);
      crispFill.position.copy(crispWire.position);
      crispFill.rotation.copy(crispWire.rotation);
      crispFill.scale.setScalar(cfg.scale * 0.98);
      xrayInnerGroup.add(crispWire, crispFill);
    });
    pouchGroup.add(xrayInnerGroup);

    // Top & Bottom Crimped Metallic Seal Strips
    const topCrimpGeo = createCrimpedSealGeometry(1.6, 0.15, 0.042);
    const bottomCrimpGeo = createCrimpedSealGeometry(1.63, 0.12, 0.046);
    geometries.push(topCrimpGeo, bottomCrimpGeo);

    const topCrimpMesh = new THREE.Mesh<THREE.BoxGeometry, THREE.Material>(
      topCrimpGeo,
      crimpMaterial,
    );
    topCrimpMesh.position.set(0, pouchHeight / 2 + 0.065, 0);
    pouchGroup.add(topCrimpMesh);

    const bottomCrimpMesh = new THREE.Mesh<THREE.BoxGeometry, THREE.Material>(
      bottomCrimpGeo,
      crimpMaterial,
    );
    bottomCrimpMesh.position.set(0, -pouchHeight / 2 - 0.05, 0);
    pouchGroup.add(bottomCrimpMesh);

    // Shoulder collar, zip rib, retail hang-hole & tear notches
    const collarGeo = new THREE.BoxGeometry(1.58, 0.025, 0.058);
    const zipRibGeo = new THREE.CylinderGeometry(0.011, 0.011, 1.5, 12);
    zipRibGeo.rotateZ(Math.PI / 2);
    const hangHoleGeo = new THREE.TorusGeometry(0.04, 0.0085, 10, 24);
    const notchGeo = new THREE.BoxGeometry(0.03, 0.017, 0.048);
    geometries.push(collarGeo, zipRibGeo, hangHoleGeo, notchGeo);

    const topCollar = new THREE.Mesh(collarGeo, accentTrimMaterial);
    topCollar.position.set(0, pouchHeight / 2 - 0.008, 0);
    const zipRibFront = new THREE.Mesh(zipRibGeo, crimpMaterial);
    zipRibFront.position.set(0, pouchHeight / 2 - 0.078, 0.078);
    const hangHole = new THREE.Mesh(hangHoleGeo, accentTrimMaterial);
    hangHole.position.set(0, pouchHeight / 2 + 0.068, 0.022);
    const leftNotch = new THREE.Mesh(notchGeo, accentTrimMaterial);
    leftNotch.position.set(-0.795, pouchHeight / 2 + 0.012, 0);
    leftNotch.rotation.z = 0.25;
    const rightNotch = new THREE.Mesh(notchGeo, accentTrimMaterial);
    rightNotch.position.set(0.795, pouchHeight / 2 + 0.012, 0);
    rightNotch.rotation.z = -0.25;

    const accentMeshes = [topCollar, zipRibFront, hangHole, leftNotch, rightNotch];
    pouchGroup.add(...accentMeshes);

    // 2. POLISHED TRANSLUCENT NEON 3D DEPTH RINGS (~18% tighter radii, never clipping card edges)
    const ringsGroup = new THREE.Group();
    ringsGroup.position.y = 0.06;
    scene.add(ringsGroup);

    // Neon Cyan Ring (#00f5ff, radius 1.41)
    const cyanRingGroup = new THREE.Group();
    cyanRingGroup.rotation.set(0.74, 0.22, -0.42);
    ringsGroup.add(cyanRingGroup);

    const cyanTorusGeo = new THREE.TorusGeometry(1.41, 0.013, 20, 128);
    const cyanHaloGeo = new THREE.TorusGeometry(1.41, 0.038, 16, 96);
    geometries.push(cyanTorusGeo, cyanHaloGeo);

    const cyanRingMat = new THREE.MeshBasicMaterial({
      color: '#00f5ff',
      transparent: true,
      opacity: 0.72,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const cyanHaloMat = new THREE.MeshBasicMaterial({
      color: '#00f5ff',
      transparent: true,
      opacity: 0.17,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    materials.push(cyanRingMat, cyanHaloMat);

    cyanRingGroup.add(
      new THREE.Mesh(cyanTorusGeo, cyanRingMat),
      new THREE.Mesh(cyanHaloGeo, cyanHaloMat),
    );

    const nodeGeo = new THREE.SphereGeometry(0.036, 16, 16);
    geometries.push(nodeGeo);
    const cyanNodeMat = new THREE.MeshBasicMaterial({
      color: '#00f5ff',
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    materials.push(cyanNodeMat);
    const cyanNode = new THREE.Mesh(nodeGeo, cyanNodeMat);
    cyanNode.position.set(1.41, 0, 0);
    cyanRingGroup.add(cyanNode);

    // Opposing Neon Magenta Ring (#ff2e97, radius 1.58)
    const pinkRingGroup = new THREE.Group();
    pinkRingGroup.rotation.set(-0.6, -0.32, 0.56);
    ringsGroup.add(pinkRingGroup);

    const pinkTorusGeo = new THREE.TorusGeometry(1.58, 0.012, 20, 128);
    const pinkHaloGeo = new THREE.TorusGeometry(1.58, 0.036, 16, 96);
    geometries.push(pinkTorusGeo, pinkHaloGeo);

    const pinkRingMat = new THREE.MeshBasicMaterial({
      color: '#ff2e97',
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const pinkHaloMat = new THREE.MeshBasicMaterial({
      color: '#ff2e97',
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const pinkNodeMat = new THREE.MeshBasicMaterial({
      color: '#ff2e97',
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    materials.push(pinkRingMat, pinkHaloMat, pinkNodeMat);

    pinkRingGroup.add(
      new THREE.Mesh(pinkTorusGeo, pinkRingMat),
      new THREE.Mesh(pinkHaloGeo, pinkHaloMat),
    );
    const pinkNode = new THREE.Mesh(nodeGeo, pinkNodeMat);
    pinkNode.position.set(-1.58, 0, 0);
    pinkRingGroup.add(pinkNode);

    // 3. ANIMATED VERTICAL X-RAY SCANLINE RING & LASER SHEET
    const scanGroup = new THREE.Group();
    scanGroup.visible = false;
    scene.add(scanGroup);

    const scanRingGeo = new THREE.TorusGeometry(1.06, 0.013, 16, 96);
    scanRingGeo.rotateX(Math.PI / 2);
    const scanSheetGeo = new THREE.CircleGeometry(1.05, 48);
    scanSheetGeo.rotateX(-Math.PI / 2);
    geometries.push(scanRingGeo, scanSheetGeo);

    const scanRingMat = new THREE.MeshBasicMaterial({
      color: '#00f5ff',
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const scanSheetMat = new THREE.MeshBasicMaterial({
      color: '#00f5ff',
      transparent: true,
      opacity: 0.14,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    materials.push(scanRingMat, scanSheetMat);

    scanGroup.add(
      new THREE.Mesh(scanRingGeo, scanRingMat),
      new THREE.Mesh(scanSheetGeo, scanSheetMat),
    );

    // 4. ~18 TINY SLOW-DRIFTING GLOWING AMBIENT PARTICLES
    const PARTICLE_COUNT = 18;
    const particlePositions = new Float32Array(PARTICLE_COUNT * 3);
    const particleColors = new Float32Array(PARTICLE_COUNT * 3);
    const particleMeta: {
      angle: number;
      radius: number;
      baseY: number;
      orbitSpeed: number;
      bobSpeed: number;
      phase: number;
    }[] = [];

    const pCyan = new THREE.Color('#00f5ff');
    const pPink = new THREE.Color('#ff2e97');
    const pSoft = new THREE.Color('#dbeafe');

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = (i / PARTICLE_COUNT) * Math.PI * 2 + (i % 3) * 0.45;
      const radius = 1.28 + ((i * 37) % 10) * 0.085;
      const baseY = -1.15 + ((i * 53) % 18) * 0.135;
      const orbitSpeed = (i % 2 === 0 ? 1 : -1) * (0.12 + (i % 4) * 0.035);
      const bobSpeed = 0.55 + (i % 5) * 0.14;
      const phase = i * 1.17;
      particleMeta.push({ angle, radius, baseY, orbitSpeed, bobSpeed, phase });

      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = baseY;
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius;

      const c = i % 3 === 0 ? pCyan : i % 3 === 1 ? pPink : pSoft;
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    const particlePosAttr = new THREE.BufferAttribute(particlePositions, 3);
    particleGeo.setAttribute('position', particlePosAttr);
    particleGeo.setAttribute(
      'color',
      new THREE.BufferAttribute(particleColors, 3),
    );
    geometries.push(particleGeo);

    const particleMat = new THREE.PointsMaterial({
      size: 0.095,
      map: particleMap,
      vertexColors: true,
      transparent: true,
      opacity: 0.78,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    materials.push(particleMat);

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 5. SOFT RADIAL FLOOR REFLECTION GLOW BENEATH POUCH
    const floorGlowGeo = new THREE.PlaneGeometry(3.4, 3.4);
    floorGlowGeo.rotateX(-Math.PI / 2);
    geometries.push(floorGlowGeo);

    const floorGlowMat = new THREE.MeshBasicMaterial({
      map: floorGlowMap,
      color: new THREE.Color(initialFlavor.floorGlowHex),
      transparent: true,
      opacity: 0.48,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    materials.push(floorGlowMat);

    const floorGlowMesh = new THREE.Mesh(floorGlowGeo, floorGlowMat);
    floorGlowMesh.position.set(0, -1.52, 0);
    scene.add(floorGlowMesh);

    // Dynamic flavor targets for smooth color transitions
    const targetRimColor = new THREE.Color(initialFlavor.rimLightHex);
    const targetFloorColor = new THREE.Color(initialFlavor.floorGlowHex);
    const targetFoilTint = new THREE.Color(initialFlavor.foilTint);
    const targetSeamColor = new THREE.Color(initialFlavor.darkStop);
    const xrayColor = new THREE.Color('#00f5ff');

    applyFlavorRef.current = (flavor: FlavorConfig) => {
      paintFrontFoilCanvases(frontAlbedoCanvas, frontRoughCanvas, flavor);
      paintBackFoilCanvas(backCanvas, flavor);
      paintGussetFoilCanvas(gussetCanvas, flavor);
      frontMap.needsUpdate = true;
      frontRoughMap.needsUpdate = true;
      backMap.needsUpdate = true;
      gussetMap.needsUpdate = true;

      targetRimColor.set(flavor.rimLightHex);
      targetFloorColor.set(flavor.floorGlowHex);
      targetFoilTint.set(flavor.foilTint);
      targetSeamColor.set(flavor.darkStop);
    };

    // Track current X-ray mode to toggle materials cleanly without per-frame reassignment
    let isCurrentlyXray = false;
    const setXrayMode = (enabled: boolean) => {
      if (enabled === isCurrentlyXray) return;
      isCurrentlyXray = enabled;

      if (enabled) {
        pouchBodyMesh.material = xrayShaderMat;
        topCrimpMesh.material = xrayCrimpMat;
        bottomCrimpMesh.material = xrayCrimpMat;
        accentMeshes.forEach((m) => {
          m.visible = false;
        });
        pouchWireMesh.visible = true;
        xrayInnerGroup.visible = true;
        scanGroup.visible = true;
      } else {
        pouchBodyMesh.material = foilBodyMaterials;
        topCrimpMesh.material = crimpMaterial;
        bottomCrimpMesh.material = crimpMaterial;
        accentMeshes.forEach((m) => {
          m.visible = true;
        });
        pouchWireMesh.visible = false;
        xrayInnerGroup.visible = false;
        scanGroup.visible = false;
      }
    };

    // Hero initial angle
    pouchPivot.rotation.y = -0.32;
    pouchPivot.rotation.x = 0.06;

    // Resize handling
    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Smooth 360° pointer/touch drag interactivity
    let dragging = false;
    let activePointerId: number | null = null;
    let lastPointerX = 0;
    let lastPointerY = 0;

    let targetRotY = pouchPivot.rotation.y;
    let currentRotY = pouchPivot.rotation.y;
    let targetRotX = pouchPivot.rotation.x;
    let currentRotX = pouchPivot.rotation.x;
    let dragVelocityY = 0;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      dragging = true;
      setIsDragging(true);
      activePointerId = e.pointerId;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      dragVelocityY = 0;
      try {
        renderer.domElement.setPointerCapture(e.pointerId);
      } catch {
        // Ignore if unsupported
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== activePointerId) return;
      const dx = e.clientX - lastPointerX;
      const dy = e.clientY - lastPointerY;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;

      const deltaY = dx * 0.0115;
      const deltaX = dy * 0.0065;
      targetRotY += deltaY;
      dragVelocityY = deltaY * 22;
      targetRotX = THREE.MathUtils.clamp(targetRotX + deltaX, -0.38, 0.38);
    };

    const endDrag = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== activePointerId) return;
      dragging = false;
      setIsDragging(false);
      activePointerId = null;
      try {
        renderer.domElement.releasePointerCapture(e.pointerId);
      } catch {
        // Ignore
      }
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('pointerdown', onPointerDown);
    domEl.addEventListener('pointermove', onPointerMove);
    domEl.addEventListener('pointerup', endDrag);
    domEl.addEventListener('pointercancel', endDrag);

    // Visibility, reduced motion & 60fps animation loop
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    let isVisible = true;
    let isDocumentVisible = !document.hidden;
    let disposed = false;
    let rafId = 0;
    let softwareTimer: number | null = null;
    let lastTime = performance.now();
    let elapsed = 0;

    const glContext = renderer.getContext();
    const isWebGL2 =
      typeof WebGL2RenderingContext !== 'undefined' &&
      glContext instanceof WebGL2RenderingContext;

    const scheduleNextFrame = (fn: () => void) => {
      if (disposed || !isVisible || !isDocumentVisible) return;

      if (!isSoftwareGl) {
        rafId = window.requestAnimationFrame(fn);
        return;
      }

      if (isWebGL2) {
        const gl2 = glContext as WebGL2RenderingContext;
        const sync = gl2.fenceSync(gl2.SYNC_GPU_COMMANDS_COMPLETE, 0);
        if (sync) {
          gl2.flush();
          const poll = () => {
            if (disposed) {
              gl2.deleteSync(sync);
              return;
            }
            const status = gl2.clientWaitSync(sync, 0, 0);
            if (status === gl2.TIMEOUT_EXPIRED) {
              softwareTimer = window.setTimeout(poll, 16);
              return;
            }
            gl2.deleteSync(sync);
            softwareTimer = window.setTimeout(fn, 80);
          };
          softwareTimer = window.setTimeout(poll, 16);
          return;
        }
      }
      softwareTimer = window.setTimeout(fn, 80);
    };

    const renderFrame = () => {
      if (disposed || !isVisible || !isDocumentVisible) return;

      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      elapsed += dt;

      const motionScale = prefersReducedMotion ? 0.15 : 1;
      const tab = activeTabRef.current;
      const isXrayTab = tab === 'xray-scanner';
      setXrayMode(isXrayTab);

      // Smoothly interpolate flavor tint, rim light & floor reflection glow
      const colorStep = 1 - Math.exp(-6 * dt);
      rimLight.color.lerp(isXrayTab ? xrayColor : targetRimColor, colorStep);
      floorGlowMat.color.lerp(isXrayTab ? xrayColor : targetFloorColor, colorStep);
      frontMaterial.color.lerp(targetFoilTint, colorStep);
      backMaterial.color.lerp(targetFoilTint, colorStep);
      gussetMaterial.color.lerp(targetFoilTint, colorStep);
      seamEdgeMaterial.color.lerp(targetSeamColor, colorStep);

      // Smooth Y-axis auto-rotation + release inertia
      if (!dragging) {
        dragVelocityY = THREE.MathUtils.damp(dragVelocityY, 0, 3.6, dt);
        const autoSpinSpeed = 0.44 * motionScale;
        targetRotY += (autoSpinSpeed + dragVelocityY) * dt;
        const restPitch = 0.06 + Math.sin(elapsed * 0.9) * 0.03 * motionScale;
        targetRotX = THREE.MathUtils.damp(targetRotX, restPitch, 2.8, dt);
      }

      currentRotY = THREE.MathUtils.damp(currentRotY, targetRotY, 10, dt);
      currentRotX = THREE.MathUtils.damp(currentRotX, targetRotX, 10, dt);

      pouchPivot.rotation.y = currentRotY;
      pouchPivot.rotation.x = currentRotX;
      pouchPivot.rotation.z = Math.sin(elapsed * 1.1) * 0.03 * motionScale;

      // Floating vertical bobbing
      const bobY = Math.sin(elapsed * 1.55) * 0.075 * motionScale;
      pouchPivot.position.y = 0.08 + bobY;

      // Soft floor reflection glow scales subtly with float height
      const glowScale = 1 - bobY * 0.7;
      floorGlowMesh.scale.set(glowScale, glowScale, 1);
      floorGlowMat.opacity = (isXrayTab ? 0.56 : 0.46) - bobY * 0.35;

      // Orbit translucent neon cyan & magenta 3D rings
      cyanRingGroup.rotation.z = -0.42 + elapsed * 0.46 * motionScale;
      cyanRingGroup.rotation.y = 0.22 + Math.sin(elapsed * 0.7) * 0.14 * motionScale;
      pinkRingGroup.rotation.z = 0.56 - elapsed * 0.36 * motionScale;
      pinkRingGroup.rotation.y = -0.32 + Math.cos(elapsed * 0.65) * 0.14 * motionScale;

      // Orbit animated cyan & pink point lights
      const lightAngle = elapsed * 0.95 * motionScale;
      cyanLight.position.set(
        Math.cos(lightAngle) * 3.0,
        1.1 + Math.sin(elapsed * 1.2) * 0.5,
        Math.sin(lightAngle) * 2.4 + 1.2,
      );
      pinkLight.position.set(
        Math.cos(lightAngle + Math.PI) * 3.0,
        -0.9 + Math.cos(elapsed * 1.1) * 0.5,
        Math.sin(lightAngle + Math.PI) * 2.4 + 1.2,
      );

      // Slow-drifting glowing particles around the pouch
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const meta = particleMeta[i];
        const a = meta.angle + elapsed * meta.orbitSpeed * motionScale;
        const yOffset = Math.sin(elapsed * meta.bobSpeed + meta.phase) * 0.14 * motionScale;
        particlePositions[i * 3] = Math.cos(a) * meta.radius;
        particlePositions[i * 3 + 1] = meta.baseY + yOffset;
        particlePositions[i * 3 + 2] = Math.sin(a) * meta.radius;
      }
      particlePosAttr.needsUpdate = true;

      // X-Ray Scanner vertical scanline animation & internal crisp float
      if (isXrayTab) {
        const scanY = 0.08 + Math.sin(elapsed * 2.15 * motionScale) * 1.06;
        xrayShaderMat.uniforms.uTime.value = elapsed;
        xrayShaderMat.uniforms.uScanY.value = scanY;
        scanGroup.position.y = scanY;
        scanGroup.rotation.y = elapsed * 0.9;
        xrayInnerGroup.rotation.y = -elapsed * 0.35 * motionScale;
      }

      // Frame cleanly on all card aspect ratios with zero ring clipping
      const aspect = camera.aspect || 1;
      const baseDist = aspect < 0.85 ? 7.2 : aspect < 1.1 ? 6.5 : 6.15;
      const targetZ = tab === 'product-stage' ? baseDist - 0.12 : baseDist;
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 4, dt);

      renderer.render(scene, camera);
      scheduleNextFrame(renderFrame);
    };

    const startLoop = () => {
      if (disposed || !isVisible || !isDocumentVisible) return;
      if (rafId) window.cancelAnimationFrame(rafId);
      if (softwareTimer !== null) window.clearTimeout(softwareTimer);
      lastTime = performance.now();
      renderFrame();
    };

    const stopLoop = () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
      if (softwareTimer !== null) {
        window.clearTimeout(softwareTimer);
        softwareTimer = null;
      }
    };

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const nextVisible = entries[0]?.isIntersecting ?? true;
        if (nextVisible === isVisible) return;
        isVisible = nextVisible;
        if (isVisible) startLoop();
        else stopLoop();
      },
      { threshold: 0.05 },
    );
    intersectionObserver.observe(container);

    const onVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
      if (isDocumentVisible) startLoop();
      else stopLoop();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    startLoop();

    return () => {
      disposed = true;
      applyFlavorRef.current = null;
      stopLoop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      domEl.removeEventListener('pointerdown', onPointerDown);
      domEl.removeEventListener('pointermove', onPointerMove);
      domEl.removeEventListener('pointerup', endDrag);
      domEl.removeEventListener('pointercancel', endDrag);

      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      envRenderTarget.dispose();
      renderer.dispose();
      if (domEl.parentNode === canvasHost) {
        canvasHost.removeChild(domEl);
      }
    };
  }, []);

  if (webglFailed) {
    return (
      <div className="flex h-full min-h-[360px] w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#0A1324] via-[#060912] to-[#140814] p-6 text-center">
        <Box className="h-12 w-12 text-[#00F0FF]" aria-hidden="true" />
        <span className="font-mono text-xs tracking-wider text-slate-300">
          CRUNCHX · 3D WEBGL STAGE
        </span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative h-full min-h-[360px] w-full select-none overflow-hidden bg-[radial-gradient(circle_at_50%_46%,rgba(14,26,52,0.92)_0%,rgba(6,10,20,0.98)_58%,#04060C_100%)] lg:min-h-[420px] ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={{ touchAction: 'pan-y' }}
      aria-label="Interactive 3D CRUNCHX foil snack pouch stage — drag horizontally to rotate 360 degrees"
    >
      {/* Isolated empty WebGL canvas mount */}
      <div ref={canvasHostRef} className="absolute inset-0 h-full w-full" />

      {/* Subtle corner studio vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_58%,rgba(4,6,12,0.72)_100%)]"
      />

      {/* Interactive 360° drag cue (top-right, no backdrop-blur over WebGL) */}
      <div className="pointer-events-none absolute right-4 top-4 z-10">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#04060C]/92 px-2.5 py-1 font-mono text-[10px] font-medium tracking-wider text-slate-300">
          <MoveHorizontal className="h-3 w-3 text-[#00F0FF]" aria-hidden="true" />
          <span>DRAG 360°</span>
        </span>
      </div>

      {/* Live Flavor Switcher Pills (bottom-left above the URL bar, solid translucent surfaces) */}
      <div
        role="group"
        aria-label="Select CRUNCHX foil flavor"
        onPointerDown={(e) => e.stopPropagation()}
        className="absolute bottom-[64px] left-4 right-4 z-20 flex flex-wrap items-center gap-1.5"
      >
        {FLAVOR_LIST.map((flavor) => {
          const isSelected = flavor.id === activeFlavorId;
          return (
            <button
              key={flavor.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setActiveFlavorId(flavor.id)}
              className={`inline-flex min-h-[30px] items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wide transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] ${
                isSelected
                  ? 'border-white/55 bg-[#090E1B]/95 text-white shadow-[0_0_14px_rgba(255,255,255,0.18)]'
                  : 'border-white/15 bg-[#04060C]/88 text-slate-300 hover:border-white/35 hover:text-white'
              }`}
            >
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 rounded-full"
                style={{
                  backgroundColor: flavor.foilHex,
                  boxShadow: isSelected ? `0 0 8px ${flavor.foilHex}` : 'none',
                }}
              />
              <span>{flavor.pillLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CrunchxPouch3DStage;
