import { createInterFont } from '@tamagui/font-inter';
import { almaraiFace } from './font-face';

export const headingFont = createInterFont(
  {
    size: {
      6: 15,
    },
    transform: {
      6: 'uppercase',
      7: 'none',
    },
    weight: {
      3: '500',
      4: '700',
    },
    face: almaraiFace,
  },
  {
    sizeSize: (size) => size,
    sizeLineHeight: (fontSize) => fontSize + 4,
  }
);

export const bodyFont = createInterFont(
  {
    face: almaraiFace,
  },
  {
    sizeSize: (size) => Math.round(size * 1.1),
    sizeLineHeight: (size) => size + 5,
  }
);
