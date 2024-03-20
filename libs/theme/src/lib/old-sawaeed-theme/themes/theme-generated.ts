type Theme = {
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
  color6: string;
  color7: string;
  color8: string;
  color9: string;
  color10: string;
  color11: string;
  color12: string;
  background: string;
  backgroundHover: string;
  backgroundPress: string;
  backgroundFocus: string;
  backgroundStrong: string;
  backgroundTransparent: string;
  color: string;
  colorHover: string;
  colorPress: string;
  colorFocus: string;
  colorTransparent: string;
  borderColor: string;
  borderColorHover: string;
  borderColorFocus: string;
  borderColorPress: string;
  placeholderColor: string;
  blue1: string;
  blue2: string;
  blue3: string;
  blue4: string;
  blue5: string;
  blue6: string;
  blue7: string;
  blue8: string;
  blue9: string;
  blue10: string;
  blue11: string;
  blue12: string;
  gray1: string;
  gray2: string;
  gray3: string;
  gray4: string;
  gray5: string;
  gray6: string;
  gray7: string;
  gray8: string;
  gray9: string;
  gray10: string;
  gray11: string;
  gray12: string;
  green1: string;
  green2: string;
  green3: string;
  green4: string;
  green5: string;
  green6: string;
  green7: string;
  green8: string;
  green9: string;
  green10: string;
  green11: string;
  green12: string;
  orange1: string;
  orange2: string;
  orange3: string;
  orange4: string;
  orange5: string;
  orange6: string;
  orange7: string;
  orange8: string;
  orange9: string;
  orange10: string;
  orange11: string;
  orange12: string;
  pink1: string;
  pink2: string;
  pink3: string;
  pink4: string;
  pink5: string;
  pink6: string;
  pink7: string;
  pink8: string;
  pink9: string;
  pink10: string;
  pink11: string;
  pink12: string;
  purple1: string;
  purple2: string;
  purple3: string;
  purple4: string;
  purple5: string;
  purple6: string;
  purple7: string;
  purple8: string;
  purple9: string;
  purple10: string;
  purple11: string;
  purple12: string;
  red1: string;
  red2: string;
  red3: string;
  red4: string;
  red5: string;
  red6: string;
  red7: string;
  red8: string;
  red9: string;
  red10: string;
  red11: string;
  red12: string;
  yellow1: string;
  yellow2: string;
  yellow3: string;
  yellow4: string;
  yellow5: string;
  yellow6: string;
  yellow7: string;
  yellow8: string;
  yellow9: string;
  yellow10: string;
  yellow11: string;
  yellow12: string;
  shadowColor: string;
  shadowColorHover: string;
  shadowColorPress: string;
  shadowColorFocus: string;
};

function t(a) {
  let res: Record<string, string> = {};
  for (const [ki, vi] of a) {
    // @ts-ignore
    res[ks[ki]] = vs[vi];
  }
  return res;
}
const vs = [
  '#fff',
  '#F6F6F6',
  '#FFEEB2',
  '#fed441',
  '#feca16',
  '#ffc300',
  '#e9b501',
  '#be9401',
  '#E0E0E0',
  '#757575',
  '#211F1F',
  'hsl(0, 0%, 9.0%)',
  'rgba(255,255,255,0)',
  'rgba(10,10,10,0)',
  'hsl(206, 100%, 99.2%)',
  'hsl(210, 100%, 98.0%)',
  'hsl(209, 100%, 96.5%)',
  'hsl(210, 98.8%, 94.0%)',
  'hsl(209, 95.0%, 90.1%)',
  'hsl(209, 81.2%, 84.5%)',
  'hsl(208, 77.5%, 76.9%)',
  'hsl(206, 81.9%, 65.3%)',
  'hsl(206, 100%, 50.0%)',
  'hsl(208, 100%, 47.3%)',
  'hsl(211, 100%, 43.2%)',
  'hsl(211, 100%, 15.0%)',
  'hsl(0, 0%, 99.0%)',
  'hsl(0, 0%, 97.3%)',
  'hsl(0, 0%, 95.1%)',
  'hsl(0, 0%, 93.0%)',
  'hsl(0, 0%, 90.9%)',
  'hsl(0, 0%, 88.7%)',
  'hsl(0, 0%, 85.8%)',
  'hsl(0, 0%, 78.0%)',
  'hsl(0, 0%, 56.1%)',
  'hsl(0, 0%, 52.3%)',
  'hsl(0, 0%, 43.5%)',
  'hsl(136, 50.0%, 98.9%)',
  'hsl(138, 62.5%, 96.9%)',
  'hsl(139, 55.2%, 94.5%)',
  'hsl(140, 48.7%, 91.0%)',
  'hsl(141, 43.7%, 86.0%)',
  'hsl(143, 40.3%, 79.0%)',
  'hsl(146, 38.5%, 69.0%)',
  'hsl(151, 40.2%, 54.1%)',
  'hsl(151, 55.0%, 41.5%)',
  'hsl(152, 57.5%, 37.6%)',
  'hsl(153, 67.0%, 28.5%)',
  'hsl(155, 40.0%, 14.0%)',
  'hsl(24, 70.0%, 99.0%)',
  'hsl(24, 83.3%, 97.6%)',
  'hsl(24, 100%, 95.3%)',
  'hsl(25, 100%, 92.2%)',
  'hsl(25, 100%, 88.2%)',
  'hsl(25, 100%, 82.8%)',
  'hsl(24, 100%, 75.3%)',
  'hsl(24, 94.5%, 64.3%)',
  'hsl(24, 94.0%, 50.0%)',
  'hsl(24, 100%, 46.5%)',
  'hsl(24, 100%, 37.0%)',
  'hsl(15, 60.0%, 17.0%)',
  'hsl(322, 100%, 99.4%)',
  'hsl(323, 100%, 98.4%)',
  'hsl(323, 86.3%, 96.5%)',
  'hsl(323, 78.7%, 94.2%)',
  'hsl(323, 72.2%, 91.1%)',
  'hsl(323, 66.3%, 86.6%)',
  'hsl(323, 62.0%, 80.1%)',
  'hsl(323, 60.3%, 72.4%)',
  'hsl(322, 65.0%, 54.5%)',
  'hsl(322, 63.9%, 50.7%)',
  'hsl(322, 75.0%, 46.0%)',
  'hsl(320, 70.0%, 13.5%)',
  'hsl(280, 65.0%, 99.4%)',
  'hsl(276, 100%, 99.0%)',
  'hsl(276, 83.1%, 97.0%)',
  'hsl(275, 76.4%, 94.7%)',
  'hsl(275, 70.8%, 91.8%)',
  'hsl(274, 65.4%, 87.8%)',
  'hsl(273, 61.0%, 81.7%)',
  'hsl(272, 60.0%, 73.5%)',
  'hsl(272, 51.0%, 54.0%)',
  'hsl(272, 46.8%, 50.3%)',
  'hsl(272, 50.0%, 45.8%)',
  'hsl(272, 66.0%, 16.0%)',
  'hsl(359, 100%, 99.4%)',
  'hsl(359, 100%, 98.6%)',
  'hsl(360, 100%, 96.8%)',
  'hsl(360, 97.9%, 94.8%)',
  'hsl(360, 90.2%, 91.9%)',
  'hsl(360, 81.7%, 87.8%)',
  'hsl(359, 74.2%, 81.7%)',
  'hsl(359, 69.5%, 74.3%)',
  'hsl(358, 75.0%, 59.0%)',
  'hsl(358, 69.4%, 55.2%)',
  'hsl(358, 65.0%, 48.7%)',
  'hsl(354, 50.0%, 14.6%)',
  'hsl(60, 54.0%, 98.5%)',
  'hsl(52, 100%, 95.5%)',
  'hsl(55, 100%, 90.9%)',
  'hsl(54, 100%, 86.6%)',
  'hsl(52, 97.9%, 82.0%)',
  'hsl(50, 89.4%, 76.1%)',
  'hsl(47, 80.4%, 68.0%)',
  'hsl(48, 100%, 46.1%)',
  'hsl(53, 92.0%, 50.0%)',
  'hsl(50, 100%, 48.5%)',
  'hsl(42, 100%, 29.0%)',
  'hsl(40, 55.0%, 13.5%)',
  'rgba(0,0,0,0.066)',
  'rgba(0,0,0,0.02)',
  '#050505',
  '#151515',
  '#191919',
  '#232323',
  '#282828',
  '#323232',
  '#424242',
  '#494949',
  '#545454',
  '#626262',
  '#a5a5a5',
  'hsl(212, 35.0%, 9.2%)',
  'hsl(216, 50.0%, 11.8%)',
  'hsl(214, 59.4%, 15.3%)',
  'hsl(214, 65.8%, 17.9%)',
  'hsl(213, 71.2%, 20.2%)',
  'hsl(212, 77.4%, 23.1%)',
  'hsl(211, 85.1%, 27.4%)',
  'hsl(211, 89.7%, 34.1%)',
  'hsl(209, 100%, 60.6%)',
  'hsl(210, 100%, 66.1%)',
  'hsl(206, 98.0%, 95.8%)',
  'hsl(0, 0%, 8.5%)',
  'hsl(0, 0%, 11.0%)',
  'hsl(0, 0%, 13.6%)',
  'hsl(0, 0%, 15.8%)',
  'hsl(0, 0%, 17.9%)',
  'hsl(0, 0%, 20.5%)',
  'hsl(0, 0%, 24.3%)',
  'hsl(0, 0%, 31.2%)',
  'hsl(0, 0%, 43.9%)',
  'hsl(0, 0%, 49.4%)',
  'hsl(0, 0%, 62.8%)',
  'hsl(146, 30.0%, 7.4%)',
  'hsl(155, 44.2%, 8.4%)',
  'hsl(155, 46.7%, 10.9%)',
  'hsl(154, 48.4%, 12.9%)',
  'hsl(154, 49.7%, 14.9%)',
  'hsl(154, 50.9%, 17.6%)',
  'hsl(153, 51.8%, 21.8%)',
  'hsl(151, 51.7%, 28.4%)',
  'hsl(151, 49.3%, 46.5%)',
  'hsl(151, 50.0%, 53.2%)',
  'hsl(137, 72.0%, 94.0%)',
  'hsl(30, 70.0%, 7.2%)',
  'hsl(28, 100%, 8.4%)',
  'hsl(26, 91.1%, 11.6%)',
  'hsl(25, 88.3%, 14.1%)',
  'hsl(24, 87.6%, 16.6%)',
  'hsl(24, 88.6%, 19.8%)',
  'hsl(24, 92.4%, 24.0%)',
  'hsl(25, 100%, 29.0%)',
  'hsl(24, 100%, 58.5%)',
  'hsl(24, 100%, 62.2%)',
  'hsl(24, 97.0%, 93.2%)',
  'hsl(318, 25.0%, 9.6%)',
  'hsl(319, 32.2%, 11.6%)',
  'hsl(319, 41.0%, 16.0%)',
  'hsl(320, 45.4%, 18.7%)',
  'hsl(320, 49.0%, 21.1%)',
  'hsl(321, 53.6%, 24.4%)',
  'hsl(321, 61.1%, 29.7%)',
  'hsl(322, 74.9%, 37.5%)',
  'hsl(323, 72.8%, 59.2%)',
  'hsl(325, 90.0%, 66.4%)',
  'hsl(322, 90.0%, 95.8%)',
  'hsl(284, 20.0%, 9.6%)',
  'hsl(283, 30.0%, 11.8%)',
  'hsl(281, 37.5%, 16.5%)',
  'hsl(280, 41.2%, 20.0%)',
  'hsl(279, 43.8%, 23.3%)',
  'hsl(277, 46.4%, 27.5%)',
  'hsl(275, 49.3%, 34.6%)',
  'hsl(272, 52.1%, 45.9%)',
  'hsl(273, 57.3%, 59.1%)',
  'hsl(275, 80.0%, 71.0%)',
  'hsl(279, 75.0%, 95.7%)',
  'hsl(353, 23.0%, 9.8%)',
  'hsl(357, 34.4%, 12.0%)',
  'hsl(356, 43.4%, 16.4%)',
  'hsl(356, 47.6%, 19.2%)',
  'hsl(356, 51.1%, 21.9%)',
  'hsl(356, 55.2%, 25.9%)',
  'hsl(357, 60.2%, 31.8%)',
  'hsl(358, 65.0%, 40.4%)',
  'hsl(358, 85.3%, 64.0%)',
  'hsl(358, 100%, 69.5%)',
  'hsl(351, 89.0%, 96.0%)',
  'hsl(45, 100%, 5.5%)',
  'hsl(46, 100%, 6.7%)',
  'hsl(45, 100%, 8.7%)',
  'hsl(45, 100%, 10.4%)',
  'hsl(47, 100%, 12.1%)',
  'hsl(49, 100%, 14.3%)',
  'hsl(49, 90.3%, 18.4%)',
  'hsl(50, 100%, 22.0%)',
  'hsl(54, 100%, 68.0%)',
  'hsl(48, 100%, 47.0%)',
  'hsl(53, 100%, 91.0%)',
  'rgba(0,0,0,0.3)',
  'rgba(0,0,0,0.2)',
  'hsla(24, 70.0%, 99.0%, 0)',
  'hsla(15, 60.0%, 17.0%, 0)',
  'hsla(60, 54.0%, 98.5%, 0)',
  'hsla(40, 55.0%, 13.5%, 0)',
  'hsla(136, 50.0%, 98.9%, 0)',
  'hsla(155, 40.0%, 14.0%, 0)',
  'hsla(206, 100%, 99.2%, 0)',
  'hsla(211, 100%, 15.0%, 0)',
  'hsla(280, 65.0%, 99.4%, 0)',
  'hsla(272, 66.0%, 16.0%, 0)',
  'hsla(322, 100%, 99.4%, 0)',
  'hsla(320, 70.0%, 13.5%, 0)',
  'hsla(359, 100%, 99.4%, 0)',
  'hsla(354, 50.0%, 14.6%, 0)',
  'hsla(30, 70.0%, 7.2%, 0)',
  'hsla(24, 97.0%, 93.2%, 0)',
  'hsla(45, 100%, 5.5%, 0)',
  'hsla(53, 100%, 91.0%, 0)',
  'hsla(146, 30.0%, 7.4%, 0)',
  'hsla(137, 72.0%, 94.0%, 0)',
  'hsla(212, 35.0%, 9.2%, 0)',
  'hsla(206, 98.0%, 95.8%, 0)',
  'hsla(284, 20.0%, 9.6%, 0)',
  'hsla(279, 75.0%, 95.7%, 0)',
  'hsla(318, 25.0%, 9.6%, 0)',
  'hsla(322, 90.0%, 95.8%, 0)',
  'hsla(353, 23.0%, 9.8%, 0)',
  'hsla(351, 89.0%, 96.0%, 0)',
  'rgba(0,0,0,0.5)',
  'rgba(0,0,0,0.9)',
  'transparent',
];

const ks = [
  'color1',
  'color2',
  'color3',
  'color4',
  'color5',
  'color6',
  'color7',
  'color8',
  'color9',
  'color10',
  'color11',
  'color12',
  'background',
  'backgroundHover',
  'backgroundPress',
  'backgroundFocus',
  'backgroundStrong',
  'backgroundTransparent',
  'color',
  'colorHover',
  'colorPress',
  'colorFocus',
  'colorTransparent',
  'borderColor',
  'borderColorHover',
  'borderColorFocus',
  'borderColorPress',
  'placeholderColor',
  'blue1',
  'blue2',
  'blue3',
  'blue4',
  'blue5',
  'blue6',
  'blue7',
  'blue8',
  'blue9',
  'blue10',
  'blue11',
  'blue12',
  'gray1',
  'gray2',
  'gray3',
  'gray4',
  'gray5',
  'gray6',
  'gray7',
  'gray8',
  'gray9',
  'gray10',
  'gray11',
  'gray12',
  'green1',
  'green2',
  'green3',
  'green4',
  'green5',
  'green6',
  'green7',
  'green8',
  'green9',
  'green10',
  'green11',
  'green12',
  'orange1',
  'orange2',
  'orange3',
  'orange4',
  'orange5',
  'orange6',
  'orange7',
  'orange8',
  'orange9',
  'orange10',
  'orange11',
  'orange12',
  'pink1',
  'pink2',
  'pink3',
  'pink4',
  'pink5',
  'pink6',
  'pink7',
  'pink8',
  'pink9',
  'pink10',
  'pink11',
  'pink12',
  'purple1',
  'purple2',
  'purple3',
  'purple4',
  'purple5',
  'purple6',
  'purple7',
  'purple8',
  'purple9',
  'purple10',
  'purple11',
  'purple12',
  'red1',
  'red2',
  'red3',
  'red4',
  'red5',
  'red6',
  'red7',
  'red8',
  'red9',
  'red10',
  'red11',
  'red12',
  'yellow1',
  'yellow2',
  'yellow3',
  'yellow4',
  'yellow5',
  'yellow6',
  'yellow7',
  'yellow8',
  'yellow9',
  'yellow10',
  'yellow11',
  'yellow12',
  'shadowColor',
  'shadowColorHover',
  'shadowColorPress',
  'shadowColorFocus',
];

const n1 = t([
  [0, 0],
  [1, 1],
  [2, 2],
  [3, 3],
  [4, 4],
  [5, 5],
  [6, 6],
  [7, 7],
  [8, 8],
  [9, 9],
  [10, 10],
  [11, 11],
  [12, 1],
  [13, 2],
  [14, 3],
  [15, 4],
  [16, 0],
  [17, 12],
  [18, 11],
  [19, 10],
  [20, 11],
  [21, 10],
  [22, 13],
  [23, 4],
  [24, 5],
  [25, 3],
  [26, 4],
  [27, 8],
  [28, 14],
  [29, 15],
  [30, 16],
  [31, 17],
  [32, 18],
  [33, 19],
  [34, 20],
  [35, 21],
  [36, 22],
  [37, 23],
  [38, 24],
  [39, 25],
  [40, 26],
  [41, 27],
  [42, 28],
  [43, 29],
  [44, 30],
  [45, 31],
  [46, 32],
  [47, 33],
  [48, 34],
  [49, 35],
  [50, 36],
  [51, 11],
  [52, 37],
  [53, 38],
  [54, 39],
  [55, 40],
  [56, 41],
  [57, 42],
  [58, 43],
  [59, 44],
  [60, 45],
  [61, 46],
  [62, 47],
  [63, 48],
  [64, 49],
  [65, 50],
  [66, 51],
  [67, 52],
  [68, 53],
  [69, 54],
  [70, 55],
  [71, 56],
  [72, 57],
  [73, 58],
  [74, 59],
  [75, 60],
  [76, 61],
  [77, 62],
  [78, 63],
  [79, 64],
  [80, 65],
  [81, 66],
  [82, 67],
  [83, 68],
  [84, 69],
  [85, 70],
  [86, 71],
  [87, 72],
  [88, 73],
  [89, 74],
  [90, 75],
  [91, 76],
  [92, 77],
  [93, 78],
  [94, 79],
  [95, 80],
  [96, 81],
  [97, 82],
  [98, 83],
  [99, 84],
  [100, 85],
  [101, 86],
  [102, 87],
  [103, 88],
  [104, 89],
  [105, 90],
  [106, 91],
  [107, 92],
  [108, 93],
  [109, 94],
  [110, 95],
  [111, 96],
  [112, 97],
  [113, 98],
  [114, 99],
  [115, 100],
  [116, 101],
  [117, 102],
  [118, 103],
  [119, 104],
  [120, 105],
  [121, 106],
  [122, 107],
  [123, 108],
  [124, 109],
  [125, 109],
  [126, 110],
  [127, 110],
]) as Theme;

export const light = n1 as Theme;
const n2 = t([
  [0, 111],
  [1, 112],
  [2, 113],
  [3, 114],
  [4, 115],
  [5, 116],
  [6, 117],
  [7, 118],
  [8, 119],
  [9, 120],
  [10, 121],
  [11, 0],
  [12, 112],
  [13, 113],
  [14, 114],
  [15, 115],
  [16, 111],
  [17, 13],
  [18, 0],
  [19, 121],
  [20, 0],
  [21, 121],
  [22, 12],
  [23, 115],
  [24, 116],
  [25, 114],
  [26, 115],
  [27, 119],
  [28, 122],
  [29, 123],
  [30, 124],
  [31, 125],
  [32, 126],
  [33, 127],
  [34, 128],
  [35, 129],
  [36, 22],
  [37, 130],
  [38, 131],
  [39, 132],
  [40, 133],
  [41, 134],
  [42, 135],
  [43, 136],
  [44, 137],
  [45, 138],
  [46, 139],
  [47, 140],
  [48, 141],
  [49, 142],
  [50, 143],
  [51, 29],
  [52, 144],
  [53, 145],
  [54, 146],
  [55, 147],
  [56, 148],
  [57, 149],
  [58, 150],
  [59, 151],
  [60, 45],
  [61, 152],
  [62, 153],
  [63, 154],
  [64, 155],
  [65, 156],
  [66, 157],
  [67, 158],
  [68, 159],
  [69, 160],
  [70, 161],
  [71, 162],
  [72, 57],
  [73, 163],
  [74, 164],
  [75, 165],
  [76, 166],
  [77, 167],
  [78, 168],
  [79, 169],
  [80, 170],
  [81, 171],
  [82, 172],
  [83, 173],
  [84, 69],
  [85, 174],
  [86, 175],
  [87, 176],
  [88, 177],
  [89, 178],
  [90, 179],
  [91, 180],
  [92, 181],
  [93, 182],
  [94, 183],
  [95, 184],
  [96, 81],
  [97, 185],
  [98, 186],
  [99, 187],
  [100, 188],
  [101, 189],
  [102, 190],
  [103, 191],
  [104, 192],
  [105, 193],
  [106, 194],
  [107, 195],
  [108, 93],
  [109, 196],
  [110, 197],
  [111, 198],
  [112, 199],
  [113, 200],
  [114, 201],
  [115, 202],
  [116, 203],
  [117, 204],
  [118, 205],
  [119, 206],
  [120, 105],
  [121, 207],
  [122, 208],
  [123, 209],
  [124, 210],
  [125, 210],
  [126, 211],
  [127, 211],
]) as Theme;

export const dark = n2 as Theme;
const n3 = t([
  [0, 49],
  [1, 50],
  [2, 51],
  [3, 52],
  [4, 53],
  [5, 54],
  [6, 56],
  [7, 57],
  [8, 58],
  [9, 59],
  [10, 60],
  [11, 11],
  [12, 50],
  [13, 51],
  [14, 52],
  [15, 53],
  [16, 49],
  [17, 212],
  [18, 11],
  [19, 60],
  [20, 11],
  [21, 60],
  [22, 213],
  [23, 52],
  [24, 53],
  [25, 52],
  [26, 52],
  [27, 58],
]) as Theme;

export const light_orange = n3 as Theme;
const n4 = t([
  [0, 97],
  [1, 98],
  [2, 99],
  [3, 100],
  [4, 101],
  [5, 102],
  [6, 104],
  [7, 105],
  [8, 106],
  [9, 107],
  [10, 108],
  [11, 11],
  [12, 98],
  [13, 99],
  [14, 100],
  [15, 101],
  [16, 97],
  [17, 214],
  [18, 11],
  [19, 108],
  [20, 11],
  [21, 108],
  [22, 215],
  [23, 100],
  [24, 101],
  [25, 100],
  [26, 100],
  [27, 106],
]) as Theme;

export const light_yellow = n4 as Theme;
const n5 = t([
  [0, 37],
  [1, 38],
  [2, 39],
  [3, 40],
  [4, 41],
  [5, 42],
  [6, 44],
  [7, 45],
  [8, 46],
  [9, 47],
  [10, 48],
  [11, 11],
  [12, 38],
  [13, 39],
  [14, 40],
  [15, 41],
  [16, 37],
  [17, 216],
  [18, 11],
  [19, 48],
  [20, 11],
  [21, 48],
  [22, 217],
  [23, 40],
  [24, 41],
  [25, 40],
  [26, 40],
  [27, 46],
]) as Theme;

export const light_green = n5 as Theme;
const n6 = t([
  [0, 14],
  [1, 15],
  [2, 16],
  [3, 17],
  [4, 18],
  [5, 19],
  [6, 21],
  [7, 22],
  [8, 23],
  [9, 24],
  [10, 25],
  [11, 11],
  [12, 15],
  [13, 16],
  [14, 17],
  [15, 18],
  [16, 14],
  [17, 218],
  [18, 11],
  [19, 25],
  [20, 11],
  [21, 25],
  [22, 219],
  [23, 17],
  [24, 18],
  [25, 17],
  [26, 17],
  [27, 23],
]) as Theme;

export const light_blue = n6 as Theme;
const n7 = t([
  [0, 73],
  [1, 74],
  [2, 75],
  [3, 76],
  [4, 77],
  [5, 78],
  [6, 80],
  [7, 81],
  [8, 82],
  [9, 83],
  [10, 84],
  [11, 11],
  [12, 74],
  [13, 75],
  [14, 76],
  [15, 77],
  [16, 73],
  [17, 220],
  [18, 11],
  [19, 84],
  [20, 11],
  [21, 84],
  [22, 221],
  [23, 76],
  [24, 77],
  [25, 76],
  [26, 76],
  [27, 82],
]) as Theme;

export const light_purple = n7 as Theme;
const n8 = t([
  [0, 61],
  [1, 62],
  [2, 63],
  [3, 64],
  [4, 65],
  [5, 66],
  [6, 68],
  [7, 69],
  [8, 70],
  [9, 71],
  [10, 72],
  [11, 11],
  [12, 62],
  [13, 63],
  [14, 64],
  [15, 65],
  [16, 61],
  [17, 222],
  [18, 11],
  [19, 72],
  [20, 11],
  [21, 72],
  [22, 223],
  [23, 64],
  [24, 65],
  [25, 64],
  [26, 64],
  [27, 70],
]) as Theme;

export const light_pink = n8 as Theme;
const n9 = t([
  [0, 85],
  [1, 86],
  [2, 87],
  [3, 88],
  [4, 89],
  [5, 90],
  [6, 92],
  [7, 93],
  [8, 94],
  [9, 95],
  [10, 96],
  [11, 11],
  [12, 86],
  [13, 87],
  [14, 88],
  [15, 89],
  [16, 85],
  [17, 224],
  [18, 11],
  [19, 96],
  [20, 11],
  [21, 96],
  [22, 225],
  [23, 88],
  [24, 89],
  [25, 88],
  [26, 88],
  [27, 94],
]) as Theme;

export const light_red = n9 as Theme;
const n10 = t([
  [0, 155],
  [1, 156],
  [2, 157],
  [3, 158],
  [4, 159],
  [5, 160],
  [6, 162],
  [7, 57],
  [8, 163],
  [9, 164],
  [10, 165],
  [11, 0],
  [12, 156],
  [13, 157],
  [14, 158],
  [15, 159],
  [16, 155],
  [17, 226],
  [18, 0],
  [19, 165],
  [20, 0],
  [21, 165],
  [22, 227],
  [23, 159],
  [24, 160],
  [25, 158],
  [26, 159],
  [27, 163],
]) as Theme;

export const dark_orange = n10 as Theme;
const n11 = t([
  [0, 199],
  [1, 200],
  [2, 201],
  [3, 202],
  [4, 203],
  [5, 204],
  [6, 206],
  [7, 105],
  [8, 207],
  [9, 208],
  [10, 209],
  [11, 0],
  [12, 200],
  [13, 201],
  [14, 202],
  [15, 203],
  [16, 199],
  [17, 228],
  [18, 0],
  [19, 209],
  [20, 0],
  [21, 209],
  [22, 229],
  [23, 203],
  [24, 204],
  [25, 202],
  [26, 203],
  [27, 207],
]) as Theme;

export const dark_yellow = n11 as Theme;
const n12 = t([
  [0, 144],
  [1, 145],
  [2, 146],
  [3, 147],
  [4, 148],
  [5, 149],
  [6, 151],
  [7, 45],
  [8, 152],
  [9, 153],
  [10, 154],
  [11, 0],
  [12, 145],
  [13, 146],
  [14, 147],
  [15, 148],
  [16, 144],
  [17, 230],
  [18, 0],
  [19, 154],
  [20, 0],
  [21, 154],
  [22, 231],
  [23, 148],
  [24, 149],
  [25, 147],
  [26, 148],
  [27, 152],
]) as Theme;

export const dark_green = n12 as Theme;
const n13 = t([
  [0, 122],
  [1, 123],
  [2, 124],
  [3, 125],
  [4, 126],
  [5, 127],
  [6, 129],
  [7, 22],
  [8, 130],
  [9, 131],
  [10, 132],
  [11, 0],
  [12, 123],
  [13, 124],
  [14, 125],
  [15, 126],
  [16, 122],
  [17, 232],
  [18, 0],
  [19, 132],
  [20, 0],
  [21, 132],
  [22, 233],
  [23, 126],
  [24, 127],
  [25, 125],
  [26, 126],
  [27, 130],
]) as Theme;

export const dark_blue = n13 as Theme;
const n14 = t([
  [0, 177],
  [1, 178],
  [2, 179],
  [3, 180],
  [4, 181],
  [5, 182],
  [6, 184],
  [7, 81],
  [8, 185],
  [9, 186],
  [10, 187],
  [11, 0],
  [12, 178],
  [13, 179],
  [14, 180],
  [15, 181],
  [16, 177],
  [17, 234],
  [18, 0],
  [19, 187],
  [20, 0],
  [21, 187],
  [22, 235],
  [23, 181],
  [24, 182],
  [25, 180],
  [26, 181],
  [27, 185],
]) as Theme;

export const dark_purple = n14 as Theme;
const n15 = t([
  [0, 166],
  [1, 167],
  [2, 168],
  [3, 169],
  [4, 170],
  [5, 171],
  [6, 173],
  [7, 69],
  [8, 174],
  [9, 175],
  [10, 176],
  [11, 0],
  [12, 167],
  [13, 168],
  [14, 169],
  [15, 170],
  [16, 166],
  [17, 236],
  [18, 0],
  [19, 176],
  [20, 0],
  [21, 176],
  [22, 237],
  [23, 170],
  [24, 171],
  [25, 169],
  [26, 170],
  [27, 174],
]) as Theme;

export const dark_pink = n15 as Theme;
const n16 = t([
  [0, 188],
  [1, 189],
  [2, 190],
  [3, 191],
  [4, 192],
  [5, 193],
  [6, 195],
  [7, 93],
  [8, 196],
  [9, 197],
  [10, 198],
  [11, 0],
  [12, 189],
  [13, 190],
  [14, 191],
  [15, 192],
  [16, 188],
  [17, 238],
  [18, 0],
  [19, 198],
  [20, 0],
  [21, 198],
  [22, 239],
  [23, 192],
  [24, 193],
  [25, 191],
  [26, 192],
  [27, 196],
]) as Theme;

export const dark_red = n16 as Theme;
const n17 = t([[12, 240]]) as Theme;

export const light_SheetOverlay = n17 as Theme;
export const light_DialogOverlay = n17 as Theme;
export const light_ModalOverlay = n17 as Theme;
export const light_orange_SheetOverlay = n17 as Theme;
export const light_orange_DialogOverlay = n17 as Theme;
export const light_orange_ModalOverlay = n17 as Theme;
export const light_yellow_SheetOverlay = n17 as Theme;
export const light_yellow_DialogOverlay = n17 as Theme;
export const light_yellow_ModalOverlay = n17 as Theme;
export const light_green_SheetOverlay = n17 as Theme;
export const light_green_DialogOverlay = n17 as Theme;
export const light_green_ModalOverlay = n17 as Theme;
export const light_blue_SheetOverlay = n17 as Theme;
export const light_blue_DialogOverlay = n17 as Theme;
export const light_blue_ModalOverlay = n17 as Theme;
export const light_purple_SheetOverlay = n17 as Theme;
export const light_purple_DialogOverlay = n17 as Theme;
export const light_purple_ModalOverlay = n17 as Theme;
export const light_pink_SheetOverlay = n17 as Theme;
export const light_pink_DialogOverlay = n17 as Theme;
export const light_pink_ModalOverlay = n17 as Theme;
export const light_red_SheetOverlay = n17 as Theme;
export const light_red_DialogOverlay = n17 as Theme;
export const light_red_ModalOverlay = n17 as Theme;
export const light_alt1_SheetOverlay = n17 as Theme;
export const light_alt1_DialogOverlay = n17 as Theme;
export const light_alt1_ModalOverlay = n17 as Theme;
export const light_alt2_SheetOverlay = n17 as Theme;
export const light_alt2_DialogOverlay = n17 as Theme;
export const light_alt2_ModalOverlay = n17 as Theme;
export const light_active_SheetOverlay = n17 as Theme;
export const light_active_DialogOverlay = n17 as Theme;
export const light_active_ModalOverlay = n17 as Theme;
export const light_orange_alt1_SheetOverlay = n17 as Theme;
export const light_orange_alt1_DialogOverlay = n17 as Theme;
export const light_orange_alt1_ModalOverlay = n17 as Theme;
export const light_orange_alt2_SheetOverlay = n17 as Theme;
export const light_orange_alt2_DialogOverlay = n17 as Theme;
export const light_orange_alt2_ModalOverlay = n17 as Theme;
export const light_orange_active_SheetOverlay = n17 as Theme;
export const light_orange_active_DialogOverlay = n17 as Theme;
export const light_orange_active_ModalOverlay = n17 as Theme;
export const light_yellow_alt1_SheetOverlay = n17 as Theme;
export const light_yellow_alt1_DialogOverlay = n17 as Theme;
export const light_yellow_alt1_ModalOverlay = n17 as Theme;
export const light_yellow_alt2_SheetOverlay = n17 as Theme;
export const light_yellow_alt2_DialogOverlay = n17 as Theme;
export const light_yellow_alt2_ModalOverlay = n17 as Theme;
export const light_yellow_active_SheetOverlay = n17 as Theme;
export const light_yellow_active_DialogOverlay = n17 as Theme;
export const light_yellow_active_ModalOverlay = n17 as Theme;
export const light_green_alt1_SheetOverlay = n17 as Theme;
export const light_green_alt1_DialogOverlay = n17 as Theme;
export const light_green_alt1_ModalOverlay = n17 as Theme;
export const light_green_alt2_SheetOverlay = n17 as Theme;
export const light_green_alt2_DialogOverlay = n17 as Theme;
export const light_green_alt2_ModalOverlay = n17 as Theme;
export const light_green_active_SheetOverlay = n17 as Theme;
export const light_green_active_DialogOverlay = n17 as Theme;
export const light_green_active_ModalOverlay = n17 as Theme;
export const light_blue_alt1_SheetOverlay = n17 as Theme;
export const light_blue_alt1_DialogOverlay = n17 as Theme;
export const light_blue_alt1_ModalOverlay = n17 as Theme;
export const light_blue_alt2_SheetOverlay = n17 as Theme;
export const light_blue_alt2_DialogOverlay = n17 as Theme;
export const light_blue_alt2_ModalOverlay = n17 as Theme;
export const light_blue_active_SheetOverlay = n17 as Theme;
export const light_blue_active_DialogOverlay = n17 as Theme;
export const light_blue_active_ModalOverlay = n17 as Theme;
export const light_purple_alt1_SheetOverlay = n17 as Theme;
export const light_purple_alt1_DialogOverlay = n17 as Theme;
export const light_purple_alt1_ModalOverlay = n17 as Theme;
export const light_purple_alt2_SheetOverlay = n17 as Theme;
export const light_purple_alt2_DialogOverlay = n17 as Theme;
export const light_purple_alt2_ModalOverlay = n17 as Theme;
export const light_purple_active_SheetOverlay = n17 as Theme;
export const light_purple_active_DialogOverlay = n17 as Theme;
export const light_purple_active_ModalOverlay = n17 as Theme;
export const light_pink_alt1_SheetOverlay = n17 as Theme;
export const light_pink_alt1_DialogOverlay = n17 as Theme;
export const light_pink_alt1_ModalOverlay = n17 as Theme;
export const light_pink_alt2_SheetOverlay = n17 as Theme;
export const light_pink_alt2_DialogOverlay = n17 as Theme;
export const light_pink_alt2_ModalOverlay = n17 as Theme;
export const light_pink_active_SheetOverlay = n17 as Theme;
export const light_pink_active_DialogOverlay = n17 as Theme;
export const light_pink_active_ModalOverlay = n17 as Theme;
export const light_red_alt1_SheetOverlay = n17 as Theme;
export const light_red_alt1_DialogOverlay = n17 as Theme;
export const light_red_alt1_ModalOverlay = n17 as Theme;
export const light_red_alt2_SheetOverlay = n17 as Theme;
export const light_red_alt2_DialogOverlay = n17 as Theme;
export const light_red_alt2_ModalOverlay = n17 as Theme;
export const light_red_active_SheetOverlay = n17 as Theme;
export const light_red_active_DialogOverlay = n17 as Theme;
export const light_red_active_ModalOverlay = n17 as Theme;
const n18 = t([[12, 241]]) as Theme;

export const dark_SheetOverlay = n18 as Theme;
export const dark_DialogOverlay = n18 as Theme;
export const dark_ModalOverlay = n18 as Theme;
export const dark_orange_SheetOverlay = n18 as Theme;
export const dark_orange_DialogOverlay = n18 as Theme;
export const dark_orange_ModalOverlay = n18 as Theme;
export const dark_yellow_SheetOverlay = n18 as Theme;
export const dark_yellow_DialogOverlay = n18 as Theme;
export const dark_yellow_ModalOverlay = n18 as Theme;
export const dark_green_SheetOverlay = n18 as Theme;
export const dark_green_DialogOverlay = n18 as Theme;
export const dark_green_ModalOverlay = n18 as Theme;
export const dark_blue_SheetOverlay = n18 as Theme;
export const dark_blue_DialogOverlay = n18 as Theme;
export const dark_blue_ModalOverlay = n18 as Theme;
export const dark_purple_SheetOverlay = n18 as Theme;
export const dark_purple_DialogOverlay = n18 as Theme;
export const dark_purple_ModalOverlay = n18 as Theme;
export const dark_pink_SheetOverlay = n18 as Theme;
export const dark_pink_DialogOverlay = n18 as Theme;
export const dark_pink_ModalOverlay = n18 as Theme;
export const dark_red_SheetOverlay = n18 as Theme;
export const dark_red_DialogOverlay = n18 as Theme;
export const dark_red_ModalOverlay = n18 as Theme;
export const dark_alt1_SheetOverlay = n18 as Theme;
export const dark_alt1_DialogOverlay = n18 as Theme;
export const dark_alt1_ModalOverlay = n18 as Theme;
export const dark_alt2_SheetOverlay = n18 as Theme;
export const dark_alt2_DialogOverlay = n18 as Theme;
export const dark_alt2_ModalOverlay = n18 as Theme;
export const dark_active_SheetOverlay = n18 as Theme;
export const dark_active_DialogOverlay = n18 as Theme;
export const dark_active_ModalOverlay = n18 as Theme;
export const dark_orange_alt1_SheetOverlay = n18 as Theme;
export const dark_orange_alt1_DialogOverlay = n18 as Theme;
export const dark_orange_alt1_ModalOverlay = n18 as Theme;
export const dark_orange_alt2_SheetOverlay = n18 as Theme;
export const dark_orange_alt2_DialogOverlay = n18 as Theme;
export const dark_orange_alt2_ModalOverlay = n18 as Theme;
export const dark_orange_active_SheetOverlay = n18 as Theme;
export const dark_orange_active_DialogOverlay = n18 as Theme;
export const dark_orange_active_ModalOverlay = n18 as Theme;
export const dark_yellow_alt1_SheetOverlay = n18 as Theme;
export const dark_yellow_alt1_DialogOverlay = n18 as Theme;
export const dark_yellow_alt1_ModalOverlay = n18 as Theme;
export const dark_yellow_alt2_SheetOverlay = n18 as Theme;
export const dark_yellow_alt2_DialogOverlay = n18 as Theme;
export const dark_yellow_alt2_ModalOverlay = n18 as Theme;
export const dark_yellow_active_SheetOverlay = n18 as Theme;
export const dark_yellow_active_DialogOverlay = n18 as Theme;
export const dark_yellow_active_ModalOverlay = n18 as Theme;
export const dark_green_alt1_SheetOverlay = n18 as Theme;
export const dark_green_alt1_DialogOverlay = n18 as Theme;
export const dark_green_alt1_ModalOverlay = n18 as Theme;
export const dark_green_alt2_SheetOverlay = n18 as Theme;
export const dark_green_alt2_DialogOverlay = n18 as Theme;
export const dark_green_alt2_ModalOverlay = n18 as Theme;
export const dark_green_active_SheetOverlay = n18 as Theme;
export const dark_green_active_DialogOverlay = n18 as Theme;
export const dark_green_active_ModalOverlay = n18 as Theme;
export const dark_blue_alt1_SheetOverlay = n18 as Theme;
export const dark_blue_alt1_DialogOverlay = n18 as Theme;
export const dark_blue_alt1_ModalOverlay = n18 as Theme;
export const dark_blue_alt2_SheetOverlay = n18 as Theme;
export const dark_blue_alt2_DialogOverlay = n18 as Theme;
export const dark_blue_alt2_ModalOverlay = n18 as Theme;
export const dark_blue_active_SheetOverlay = n18 as Theme;
export const dark_blue_active_DialogOverlay = n18 as Theme;
export const dark_blue_active_ModalOverlay = n18 as Theme;
export const dark_purple_alt1_SheetOverlay = n18 as Theme;
export const dark_purple_alt1_DialogOverlay = n18 as Theme;
export const dark_purple_alt1_ModalOverlay = n18 as Theme;
export const dark_purple_alt2_SheetOverlay = n18 as Theme;
export const dark_purple_alt2_DialogOverlay = n18 as Theme;
export const dark_purple_alt2_ModalOverlay = n18 as Theme;
export const dark_purple_active_SheetOverlay = n18 as Theme;
export const dark_purple_active_DialogOverlay = n18 as Theme;
export const dark_purple_active_ModalOverlay = n18 as Theme;
export const dark_pink_alt1_SheetOverlay = n18 as Theme;
export const dark_pink_alt1_DialogOverlay = n18 as Theme;
export const dark_pink_alt1_ModalOverlay = n18 as Theme;
export const dark_pink_alt2_SheetOverlay = n18 as Theme;
export const dark_pink_alt2_DialogOverlay = n18 as Theme;
export const dark_pink_alt2_ModalOverlay = n18 as Theme;
export const dark_pink_active_SheetOverlay = n18 as Theme;
export const dark_pink_active_DialogOverlay = n18 as Theme;
export const dark_pink_active_ModalOverlay = n18 as Theme;
export const dark_red_alt1_SheetOverlay = n18 as Theme;
export const dark_red_alt1_DialogOverlay = n18 as Theme;
export const dark_red_alt1_ModalOverlay = n18 as Theme;
export const dark_red_alt2_SheetOverlay = n18 as Theme;
export const dark_red_alt2_DialogOverlay = n18 as Theme;
export const dark_red_alt2_ModalOverlay = n18 as Theme;
export const dark_red_active_SheetOverlay = n18 as Theme;
export const dark_red_active_DialogOverlay = n18 as Theme;
export const dark_red_active_ModalOverlay = n18 as Theme;
const n19 = t([
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 8],
  [8, 9],
  [9, 10],
  [10, 11],
  [11, 11],
  [12, 2],
  [13, 3],
  [14, 4],
  [15, 5],
  [16, 1],
  [17, 0],
  [18, 10],
  [19, 9],
  [20, 10],
  [21, 9],
  [22, 11],
  [23, 5],
  [24, 6],
  [25, 4],
  [26, 5],
  [27, 7],
]) as Theme;

export const light_alt1 = n19 as Theme;
const n20 = t([
  [0, 2],
  [1, 3],
  [2, 4],
  [3, 5],
  [4, 6],
  [5, 7],
  [6, 8],
  [7, 9],
  [8, 10],
  [9, 11],
  [10, 11],
  [11, 11],
  [12, 3],
  [13, 4],
  [14, 5],
  [15, 6],
  [16, 2],
  [17, 1],
  [18, 9],
  [19, 8],
  [20, 9],
  [21, 8],
  [22, 10],
  [23, 6],
  [24, 7],
  [25, 5],
  [26, 6],
  [27, 6],
]) as Theme;

export const light_alt2 = n20 as Theme;
const n21 = t([
  [0, 3],
  [1, 4],
  [2, 5],
  [3, 6],
  [4, 7],
  [5, 8],
  [6, 9],
  [7, 10],
  [8, 11],
  [9, 13],
  [10, 13],
  [11, 13],
  [12, 4],
  [13, 5],
  [14, 6],
  [15, 7],
  [16, 3],
  [17, 2],
  [19, 7],
  [20, 8],
  [21, 7],
  [22, 9],
  [23, 7],
  [24, 8],
  [25, 6],
  [26, 7],
  [27, 5],
]) as Theme;

export const light_active = n21 as Theme;
const n22 = t([
  [0, 112],
  [1, 113],
  [2, 114],
  [3, 115],
  [4, 116],
  [5, 117],
  [6, 118],
  [7, 119],
  [8, 120],
  [9, 121],
  [10, 0],
  [11, 0],
  [12, 113],
  [13, 114],
  [14, 115],
  [15, 116],
  [16, 112],
  [17, 111],
  [18, 121],
  [19, 120],
  [20, 121],
  [21, 120],
  [22, 0],
  [23, 116],
  [24, 117],
  [25, 115],
  [26, 116],
  [27, 118],
]) as Theme;

export const dark_alt1 = n22 as Theme;
const n23 = t([
  [0, 113],
  [1, 114],
  [2, 115],
  [3, 116],
  [4, 117],
  [5, 118],
  [6, 119],
  [7, 120],
  [8, 121],
  [9, 0],
  [10, 0],
  [11, 0],
  [12, 114],
  [13, 115],
  [14, 116],
  [15, 117],
  [16, 113],
  [17, 112],
  [18, 120],
  [19, 119],
  [20, 120],
  [21, 119],
  [22, 121],
  [23, 117],
  [24, 118],
  [25, 116],
  [26, 117],
  [27, 117],
]) as Theme;

export const dark_alt2 = n23 as Theme;
const n24 = t([
  [0, 114],
  [1, 115],
  [2, 116],
  [3, 117],
  [4, 118],
  [5, 119],
  [6, 120],
  [7, 121],
  [8, 0],
  [9, 12],
  [10, 12],
  [11, 12],
  [12, 115],
  [13, 116],
  [14, 117],
  [15, 118],
  [16, 114],
  [17, 113],
  [19, 118],
  [20, 119],
  [21, 118],
  [22, 120],
  [23, 118],
  [24, 119],
  [25, 117],
  [26, 118],
  [27, 116],
]) as Theme;

export const dark_active = n24 as Theme;
const n25 = t([
  [0, 50],
  [1, 51],
  [2, 52],
  [3, 53],
  [4, 54],
  [5, 56],
  [6, 57],
  [7, 58],
  [8, 59],
  [9, 60],
  [10, 11],
  [11, 11],
  [12, 51],
  [13, 52],
  [14, 53],
  [15, 54],
  [16, 50],
  [17, 49],
  [18, 60],
  [19, 59],
  [20, 60],
  [21, 59],
  [22, 11],
  [23, 53],
  [24, 54],
  [25, 53],
  [26, 53],
  [27, 57],
]) as Theme;

export const light_orange_alt1 = n25 as Theme;
const n26 = t([
  [0, 51],
  [1, 52],
  [2, 53],
  [3, 54],
  [4, 56],
  [5, 57],
  [6, 58],
  [7, 59],
  [8, 60],
  [9, 11],
  [10, 11],
  [11, 11],
  [12, 52],
  [13, 53],
  [14, 54],
  [15, 56],
  [16, 51],
  [17, 50],
  [18, 59],
  [19, 58],
  [20, 59],
  [21, 58],
  [22, 60],
  [23, 54],
  [24, 56],
  [25, 54],
  [26, 54],
  [27, 56],
]) as Theme;

export const light_orange_alt2 = n26 as Theme;
const n27 = t([
  [0, 52],
  [1, 53],
  [2, 54],
  [3, 56],
  [4, 57],
  [5, 58],
  [6, 59],
  [7, 60],
  [8, 11],
  [9, 213],
  [10, 213],
  [11, 213],
  [12, 53],
  [13, 54],
  [14, 56],
  [15, 57],
  [16, 52],
  [17, 51],
  [19, 57],
  [20, 58],
  [21, 57],
  [22, 59],
  [23, 56],
  [24, 57],
  [25, 56],
  [26, 56],
  [27, 54],
]) as Theme;

export const light_orange_active = n27 as Theme;
const n28 = t([
  [0, 98],
  [1, 99],
  [2, 100],
  [3, 101],
  [4, 102],
  [5, 104],
  [6, 105],
  [7, 106],
  [8, 107],
  [9, 108],
  [10, 11],
  [11, 11],
  [12, 99],
  [13, 100],
  [14, 101],
  [15, 102],
  [16, 98],
  [17, 97],
  [18, 108],
  [19, 107],
  [20, 108],
  [21, 107],
  [22, 11],
  [23, 101],
  [24, 102],
  [25, 101],
  [26, 101],
  [27, 105],
]) as Theme;

export const light_yellow_alt1 = n28 as Theme;
const n29 = t([
  [0, 99],
  [1, 100],
  [2, 101],
  [3, 102],
  [4, 104],
  [5, 105],
  [6, 106],
  [7, 107],
  [8, 108],
  [9, 11],
  [10, 11],
  [11, 11],
  [12, 100],
  [13, 101],
  [14, 102],
  [15, 104],
  [16, 99],
  [17, 98],
  [18, 107],
  [19, 106],
  [20, 107],
  [21, 106],
  [22, 108],
  [23, 102],
  [24, 104],
  [25, 102],
  [26, 102],
  [27, 104],
]) as Theme;

export const light_yellow_alt2 = n29 as Theme;
const n30 = t([
  [0, 100],
  [1, 101],
  [2, 102],
  [3, 104],
  [4, 105],
  [5, 106],
  [6, 107],
  [7, 108],
  [8, 11],
  [9, 215],
  [10, 215],
  [11, 215],
  [12, 101],
  [13, 102],
  [14, 104],
  [15, 105],
  [16, 100],
  [17, 99],
  [19, 105],
  [20, 106],
  [21, 105],
  [22, 107],
  [23, 104],
  [24, 105],
  [25, 104],
  [26, 104],
  [27, 102],
]) as Theme;

export const light_yellow_active = n30 as Theme;
const n31 = t([
  [0, 38],
  [1, 39],
  [2, 40],
  [3, 41],
  [4, 42],
  [5, 44],
  [6, 45],
  [7, 46],
  [8, 47],
  [9, 48],
  [10, 11],
  [11, 11],
  [12, 39],
  [13, 40],
  [14, 41],
  [15, 42],
  [16, 38],
  [17, 37],
  [18, 48],
  [19, 47],
  [20, 48],
  [21, 47],
  [22, 11],
  [23, 41],
  [24, 42],
  [25, 41],
  [26, 41],
  [27, 45],
]) as Theme;

export const light_green_alt1 = n31 as Theme;
const n32 = t([
  [0, 39],
  [1, 40],
  [2, 41],
  [3, 42],
  [4, 44],
  [5, 45],
  [6, 46],
  [7, 47],
  [8, 48],
  [9, 11],
  [10, 11],
  [11, 11],
  [12, 40],
  [13, 41],
  [14, 42],
  [15, 44],
  [16, 39],
  [17, 38],
  [18, 47],
  [19, 46],
  [20, 47],
  [21, 46],
  [22, 48],
  [23, 42],
  [24, 44],
  [25, 42],
  [26, 42],
  [27, 44],
]) as Theme;

export const light_green_alt2 = n32 as Theme;
const n33 = t([
  [0, 40],
  [1, 41],
  [2, 42],
  [3, 44],
  [4, 45],
  [5, 46],
  [6, 47],
  [7, 48],
  [8, 11],
  [9, 217],
  [10, 217],
  [11, 217],
  [12, 41],
  [13, 42],
  [14, 44],
  [15, 45],
  [16, 40],
  [17, 39],
  [19, 45],
  [20, 46],
  [21, 45],
  [22, 47],
  [23, 44],
  [24, 45],
  [25, 44],
  [26, 44],
  [27, 42],
]) as Theme;

export const light_green_active = n33 as Theme;
const n34 = t([
  [0, 15],
  [1, 16],
  [2, 17],
  [3, 18],
  [4, 19],
  [5, 21],
  [6, 22],
  [7, 23],
  [8, 24],
  [9, 25],
  [10, 11],
  [11, 11],
  [12, 16],
  [13, 17],
  [14, 18],
  [15, 19],
  [16, 15],
  [17, 14],
  [18, 25],
  [19, 24],
  [20, 25],
  [21, 24],
  [22, 11],
  [23, 18],
  [24, 19],
  [25, 18],
  [26, 18],
  [27, 22],
]) as Theme;

export const light_blue_alt1 = n34 as Theme;
const n35 = t([
  [0, 16],
  [1, 17],
  [2, 18],
  [3, 19],
  [4, 21],
  [5, 22],
  [6, 23],
  [7, 24],
  [8, 25],
  [9, 11],
  [10, 11],
  [11, 11],
  [12, 17],
  [13, 18],
  [14, 19],
  [15, 21],
  [16, 16],
  [17, 15],
  [18, 24],
  [19, 23],
  [20, 24],
  [21, 23],
  [22, 25],
  [23, 19],
  [24, 21],
  [25, 19],
  [26, 19],
  [27, 21],
]) as Theme;

export const light_blue_alt2 = n35 as Theme;
const n36 = t([
  [0, 17],
  [1, 18],
  [2, 19],
  [3, 21],
  [4, 22],
  [5, 23],
  [6, 24],
  [7, 25],
  [8, 11],
  [9, 219],
  [10, 219],
  [11, 219],
  [12, 18],
  [13, 19],
  [14, 21],
  [15, 22],
  [16, 17],
  [17, 16],
  [19, 22],
  [20, 23],
  [21, 22],
  [22, 24],
  [23, 21],
  [24, 22],
  [25, 21],
  [26, 21],
  [27, 19],
]) as Theme;

export const light_blue_active = n36 as Theme;
const n37 = t([
  [0, 74],
  [1, 75],
  [2, 76],
  [3, 77],
  [4, 78],
  [5, 80],
  [6, 81],
  [7, 82],
  [8, 83],
  [9, 84],
  [10, 11],
  [11, 11],
  [12, 75],
  [13, 76],
  [14, 77],
  [15, 78],
  [16, 74],
  [17, 73],
  [18, 84],
  [19, 83],
  [20, 84],
  [21, 83],
  [22, 11],
  [23, 77],
  [24, 78],
  [25, 77],
  [26, 77],
  [27, 81],
]) as Theme;

export const light_purple_alt1 = n37 as Theme;
const n38 = t([
  [0, 75],
  [1, 76],
  [2, 77],
  [3, 78],
  [4, 80],
  [5, 81],
  [6, 82],
  [7, 83],
  [8, 84],
  [9, 11],
  [10, 11],
  [11, 11],
  [12, 76],
  [13, 77],
  [14, 78],
  [15, 80],
  [16, 75],
  [17, 74],
  [18, 83],
  [19, 82],
  [20, 83],
  [21, 82],
  [22, 84],
  [23, 78],
  [24, 80],
  [25, 78],
  [26, 78],
  [27, 80],
]) as Theme;

export const light_purple_alt2 = n38 as Theme;
const n39 = t([
  [0, 76],
  [1, 77],
  [2, 78],
  [3, 80],
  [4, 81],
  [5, 82],
  [6, 83],
  [7, 84],
  [8, 11],
  [9, 221],
  [10, 221],
  [11, 221],
  [12, 77],
  [13, 78],
  [14, 80],
  [15, 81],
  [16, 76],
  [17, 75],
  [19, 81],
  [20, 82],
  [21, 81],
  [22, 83],
  [23, 80],
  [24, 81],
  [25, 80],
  [26, 80],
  [27, 78],
]) as Theme;

export const light_purple_active = n39 as Theme;
const n40 = t([
  [0, 62],
  [1, 63],
  [2, 64],
  [3, 65],
  [4, 66],
  [5, 68],
  [6, 69],
  [7, 70],
  [8, 71],
  [9, 72],
  [10, 11],
  [11, 11],
  [12, 63],
  [13, 64],
  [14, 65],
  [15, 66],
  [16, 62],
  [17, 61],
  [18, 72],
  [19, 71],
  [20, 72],
  [21, 71],
  [22, 11],
  [23, 65],
  [24, 66],
  [25, 65],
  [26, 65],
  [27, 69],
]) as Theme;

export const light_pink_alt1 = n40 as Theme;
const n41 = t([
  [0, 63],
  [1, 64],
  [2, 65],
  [3, 66],
  [4, 68],
  [5, 69],
  [6, 70],
  [7, 71],
  [8, 72],
  [9, 11],
  [10, 11],
  [11, 11],
  [12, 64],
  [13, 65],
  [14, 66],
  [15, 68],
  [16, 63],
  [17, 62],
  [18, 71],
  [19, 70],
  [20, 71],
  [21, 70],
  [22, 72],
  [23, 66],
  [24, 68],
  [25, 66],
  [26, 66],
  [27, 68],
]) as Theme;

export const light_pink_alt2 = n41 as Theme;
const n42 = t([
  [0, 64],
  [1, 65],
  [2, 66],
  [3, 68],
  [4, 69],
  [5, 70],
  [6, 71],
  [7, 72],
  [8, 11],
  [9, 223],
  [10, 223],
  [11, 223],
  [12, 65],
  [13, 66],
  [14, 68],
  [15, 69],
  [16, 64],
  [17, 63],
  [19, 69],
  [20, 70],
  [21, 69],
  [22, 71],
  [23, 68],
  [24, 69],
  [25, 68],
  [26, 68],
  [27, 66],
]) as Theme;

export const light_pink_active = n42 as Theme;
const n43 = t([
  [0, 86],
  [1, 87],
  [2, 88],
  [3, 89],
  [4, 90],
  [5, 92],
  [6, 93],
  [7, 94],
  [8, 95],
  [9, 96],
  [10, 11],
  [11, 11],
  [12, 87],
  [13, 88],
  [14, 89],
  [15, 90],
  [16, 86],
  [17, 85],
  [18, 96],
  [19, 95],
  [20, 96],
  [21, 95],
  [22, 11],
  [23, 89],
  [24, 90],
  [25, 89],
  [26, 89],
  [27, 93],
]) as Theme;

export const light_red_alt1 = n43 as Theme;
const n44 = t([
  [0, 87],
  [1, 88],
  [2, 89],
  [3, 90],
  [4, 92],
  [5, 93],
  [6, 94],
  [7, 95],
  [8, 96],
  [9, 11],
  [10, 11],
  [11, 11],
  [12, 88],
  [13, 89],
  [14, 90],
  [15, 92],
  [16, 87],
  [17, 86],
  [18, 95],
  [19, 94],
  [20, 95],
  [21, 94],
  [22, 96],
  [23, 90],
  [24, 92],
  [25, 90],
  [26, 90],
  [27, 92],
]) as Theme;

export const light_red_alt2 = n44 as Theme;
const n45 = t([
  [0, 88],
  [1, 89],
  [2, 90],
  [3, 92],
  [4, 93],
  [5, 94],
  [6, 95],
  [7, 96],
  [8, 11],
  [9, 225],
  [10, 225],
  [11, 225],
  [12, 89],
  [13, 90],
  [14, 92],
  [15, 93],
  [16, 88],
  [17, 87],
  [19, 93],
  [20, 94],
  [21, 93],
  [22, 95],
  [23, 92],
  [24, 93],
  [25, 92],
  [26, 92],
  [27, 90],
]) as Theme;

export const light_red_active = n45 as Theme;
const n46 = t([
  [0, 156],
  [1, 157],
  [2, 158],
  [3, 159],
  [4, 160],
  [5, 162],
  [6, 57],
  [7, 163],
  [8, 164],
  [9, 165],
  [10, 0],
  [11, 0],
  [12, 157],
  [13, 158],
  [14, 159],
  [15, 160],
  [16, 156],
  [17, 155],
  [18, 165],
  [19, 164],
  [20, 165],
  [21, 164],
  [22, 0],
  [23, 160],
  [24, 162],
  [25, 159],
  [26, 160],
  [27, 57],
]) as Theme;

export const dark_orange_alt1 = n46 as Theme;
const n47 = t([
  [0, 157],
  [1, 158],
  [2, 159],
  [3, 160],
  [4, 162],
  [5, 57],
  [6, 163],
  [7, 164],
  [8, 165],
  [9, 0],
  [10, 0],
  [11, 0],
  [12, 158],
  [13, 159],
  [14, 160],
  [15, 162],
  [16, 157],
  [17, 156],
  [18, 164],
  [19, 163],
  [20, 164],
  [21, 163],
  [22, 165],
  [23, 162],
  [24, 57],
  [25, 160],
  [26, 162],
  [27, 162],
]) as Theme;

export const dark_orange_alt2 = n47 as Theme;
const n48 = t([
  [0, 158],
  [1, 159],
  [2, 160],
  [3, 162],
  [4, 57],
  [5, 163],
  [6, 164],
  [7, 165],
  [8, 0],
  [9, 227],
  [10, 227],
  [11, 227],
  [12, 159],
  [13, 160],
  [14, 162],
  [15, 57],
  [16, 158],
  [17, 157],
  [19, 57],
  [20, 163],
  [21, 57],
  [22, 164],
  [23, 57],
  [24, 163],
  [25, 162],
  [26, 57],
  [27, 160],
]) as Theme;

export const dark_orange_active = n48 as Theme;
const n49 = t([
  [0, 200],
  [1, 201],
  [2, 202],
  [3, 203],
  [4, 204],
  [5, 206],
  [6, 105],
  [7, 207],
  [8, 208],
  [9, 209],
  [10, 0],
  [11, 0],
  [12, 201],
  [13, 202],
  [14, 203],
  [15, 204],
  [16, 200],
  [17, 199],
  [18, 209],
  [19, 208],
  [20, 209],
  [21, 208],
  [22, 0],
  [23, 204],
  [24, 206],
  [25, 203],
  [26, 204],
  [27, 105],
]) as Theme;

export const dark_yellow_alt1 = n49 as Theme;
const n50 = t([
  [0, 201],
  [1, 202],
  [2, 203],
  [3, 204],
  [4, 206],
  [5, 105],
  [6, 207],
  [7, 208],
  [8, 209],
  [9, 0],
  [10, 0],
  [11, 0],
  [12, 202],
  [13, 203],
  [14, 204],
  [15, 206],
  [16, 201],
  [17, 200],
  [18, 208],
  [19, 207],
  [20, 208],
  [21, 207],
  [22, 209],
  [23, 206],
  [24, 105],
  [25, 204],
  [26, 206],
  [27, 206],
]) as Theme;

export const dark_yellow_alt2 = n50 as Theme;
const n51 = t([
  [0, 202],
  [1, 203],
  [2, 204],
  [3, 206],
  [4, 105],
  [5, 207],
  [6, 208],
  [7, 209],
  [8, 0],
  [9, 229],
  [10, 229],
  [11, 229],
  [12, 203],
  [13, 204],
  [14, 206],
  [15, 105],
  [16, 202],
  [17, 201],
  [19, 105],
  [20, 207],
  [21, 105],
  [22, 208],
  [23, 105],
  [24, 207],
  [25, 206],
  [26, 105],
  [27, 204],
]) as Theme;

export const dark_yellow_active = n51 as Theme;
const n52 = t([
  [0, 145],
  [1, 146],
  [2, 147],
  [3, 148],
  [4, 149],
  [5, 151],
  [6, 45],
  [7, 152],
  [8, 153],
  [9, 154],
  [10, 0],
  [11, 0],
  [12, 146],
  [13, 147],
  [14, 148],
  [15, 149],
  [16, 145],
  [17, 144],
  [18, 154],
  [19, 153],
  [20, 154],
  [21, 153],
  [22, 0],
  [23, 149],
  [24, 151],
  [25, 148],
  [26, 149],
  [27, 45],
]) as Theme;

export const dark_green_alt1 = n52 as Theme;
const n53 = t([
  [0, 146],
  [1, 147],
  [2, 148],
  [3, 149],
  [4, 151],
  [5, 45],
  [6, 152],
  [7, 153],
  [8, 154],
  [9, 0],
  [10, 0],
  [11, 0],
  [12, 147],
  [13, 148],
  [14, 149],
  [15, 151],
  [16, 146],
  [17, 145],
  [18, 153],
  [19, 152],
  [20, 153],
  [21, 152],
  [22, 154],
  [23, 151],
  [24, 45],
  [25, 149],
  [26, 151],
  [27, 151],
]) as Theme;

export const dark_green_alt2 = n53 as Theme;
const n54 = t([
  [0, 147],
  [1, 148],
  [2, 149],
  [3, 151],
  [4, 45],
  [5, 152],
  [6, 153],
  [7, 154],
  [8, 0],
  [9, 231],
  [10, 231],
  [11, 231],
  [12, 148],
  [13, 149],
  [14, 151],
  [15, 45],
  [16, 147],
  [17, 146],
  [19, 45],
  [20, 152],
  [21, 45],
  [22, 153],
  [23, 45],
  [24, 152],
  [25, 151],
  [26, 45],
  [27, 149],
]) as Theme;

export const dark_green_active = n54 as Theme;
const n55 = t([
  [0, 123],
  [1, 124],
  [2, 125],
  [3, 126],
  [4, 127],
  [5, 129],
  [6, 22],
  [7, 130],
  [8, 131],
  [9, 132],
  [10, 0],
  [11, 0],
  [12, 124],
  [13, 125],
  [14, 126],
  [15, 127],
  [16, 123],
  [17, 122],
  [18, 132],
  [19, 131],
  [20, 132],
  [21, 131],
  [22, 0],
  [23, 127],
  [24, 129],
  [25, 126],
  [26, 127],
  [27, 22],
]) as Theme;

export const dark_blue_alt1 = n55 as Theme;
const n56 = t([
  [0, 124],
  [1, 125],
  [2, 126],
  [3, 127],
  [4, 129],
  [5, 22],
  [6, 130],
  [7, 131],
  [8, 132],
  [9, 0],
  [10, 0],
  [11, 0],
  [12, 125],
  [13, 126],
  [14, 127],
  [15, 129],
  [16, 124],
  [17, 123],
  [18, 131],
  [19, 130],
  [20, 131],
  [21, 130],
  [22, 132],
  [23, 129],
  [24, 22],
  [25, 127],
  [26, 129],
  [27, 129],
]) as Theme;

export const dark_blue_alt2 = n56 as Theme;
const n57 = t([
  [0, 125],
  [1, 126],
  [2, 127],
  [3, 129],
  [4, 22],
  [5, 130],
  [6, 131],
  [7, 132],
  [8, 0],
  [9, 233],
  [10, 233],
  [11, 233],
  [12, 126],
  [13, 127],
  [14, 129],
  [15, 22],
  [16, 125],
  [17, 124],
  [19, 22],
  [20, 130],
  [21, 22],
  [22, 131],
  [23, 22],
  [24, 130],
  [25, 129],
  [26, 22],
  [27, 127],
]) as Theme;

export const dark_blue_active = n57 as Theme;
const n58 = t([
  [0, 178],
  [1, 179],
  [2, 180],
  [3, 181],
  [4, 182],
  [5, 184],
  [6, 81],
  [7, 185],
  [8, 186],
  [9, 187],
  [10, 0],
  [11, 0],
  [12, 179],
  [13, 180],
  [14, 181],
  [15, 182],
  [16, 178],
  [17, 177],
  [18, 187],
  [19, 186],
  [20, 187],
  [21, 186],
  [22, 0],
  [23, 182],
  [24, 184],
  [25, 181],
  [26, 182],
  [27, 81],
]) as Theme;

export const dark_purple_alt1 = n58 as Theme;
const n59 = t([
  [0, 179],
  [1, 180],
  [2, 181],
  [3, 182],
  [4, 184],
  [5, 81],
  [6, 185],
  [7, 186],
  [8, 187],
  [9, 0],
  [10, 0],
  [11, 0],
  [12, 180],
  [13, 181],
  [14, 182],
  [15, 184],
  [16, 179],
  [17, 178],
  [18, 186],
  [19, 185],
  [20, 186],
  [21, 185],
  [22, 187],
  [23, 184],
  [24, 81],
  [25, 182],
  [26, 184],
  [27, 184],
]) as Theme;

export const dark_purple_alt2 = n59 as Theme;
const n60 = t([
  [0, 180],
  [1, 181],
  [2, 182],
  [3, 184],
  [4, 81],
  [5, 185],
  [6, 186],
  [7, 187],
  [8, 0],
  [9, 235],
  [10, 235],
  [11, 235],
  [12, 181],
  [13, 182],
  [14, 184],
  [15, 81],
  [16, 180],
  [17, 179],
  [19, 81],
  [20, 185],
  [21, 81],
  [22, 186],
  [23, 81],
  [24, 185],
  [25, 184],
  [26, 81],
  [27, 182],
]) as Theme;

export const dark_purple_active = n60 as Theme;
const n61 = t([
  [0, 167],
  [1, 168],
  [2, 169],
  [3, 170],
  [4, 171],
  [5, 173],
  [6, 69],
  [7, 174],
  [8, 175],
  [9, 176],
  [10, 0],
  [11, 0],
  [12, 168],
  [13, 169],
  [14, 170],
  [15, 171],
  [16, 167],
  [17, 166],
  [18, 176],
  [19, 175],
  [20, 176],
  [21, 175],
  [22, 0],
  [23, 171],
  [24, 173],
  [25, 170],
  [26, 171],
  [27, 69],
]) as Theme;

export const dark_pink_alt1 = n61 as Theme;
const n62 = t([
  [0, 168],
  [1, 169],
  [2, 170],
  [3, 171],
  [4, 173],
  [5, 69],
  [6, 174],
  [7, 175],
  [8, 176],
  [9, 0],
  [10, 0],
  [11, 0],
  [12, 169],
  [13, 170],
  [14, 171],
  [15, 173],
  [16, 168],
  [17, 167],
  [18, 175],
  [19, 174],
  [20, 175],
  [21, 174],
  [22, 176],
  [23, 173],
  [24, 69],
  [25, 171],
  [26, 173],
  [27, 173],
]) as Theme;

export const dark_pink_alt2 = n62 as Theme;
const n63 = t([
  [0, 169],
  [1, 170],
  [2, 171],
  [3, 173],
  [4, 69],
  [5, 174],
  [6, 175],
  [7, 176],
  [8, 0],
  [9, 237],
  [10, 237],
  [11, 237],
  [12, 170],
  [13, 171],
  [14, 173],
  [15, 69],
  [16, 169],
  [17, 168],
  [19, 69],
  [20, 174],
  [21, 69],
  [22, 175],
  [23, 69],
  [24, 174],
  [25, 173],
  [26, 69],
  [27, 171],
]) as Theme;

export const dark_pink_active = n63 as Theme;
const n64 = t([
  [0, 189],
  [1, 190],
  [2, 191],
  [3, 192],
  [4, 193],
  [5, 195],
  [6, 93],
  [7, 196],
  [8, 197],
  [9, 198],
  [10, 0],
  [11, 0],
  [12, 190],
  [13, 191],
  [14, 192],
  [15, 193],
  [16, 189],
  [17, 188],
  [18, 198],
  [19, 197],
  [20, 198],
  [21, 197],
  [22, 0],
  [23, 193],
  [24, 195],
  [25, 192],
  [26, 193],
  [27, 93],
]) as Theme;

export const dark_red_alt1 = n64 as Theme;
const n65 = t([
  [0, 190],
  [1, 191],
  [2, 192],
  [3, 193],
  [4, 195],
  [5, 93],
  [6, 196],
  [7, 197],
  [8, 198],
  [9, 0],
  [10, 0],
  [11, 0],
  [12, 191],
  [13, 192],
  [14, 193],
  [15, 195],
  [16, 190],
  [17, 189],
  [18, 197],
  [19, 196],
  [20, 197],
  [21, 196],
  [22, 198],
  [23, 195],
  [24, 93],
  [25, 193],
  [26, 195],
  [27, 195],
]) as Theme;

export const dark_red_alt2 = n65 as Theme;
const n66 = t([
  [0, 191],
  [1, 192],
  [2, 193],
  [3, 195],
  [4, 93],
  [5, 196],
  [6, 197],
  [7, 198],
  [8, 0],
  [9, 239],
  [10, 239],
  [11, 239],
  [12, 192],
  [13, 193],
  [14, 195],
  [15, 93],
  [16, 191],
  [17, 190],
  [19, 93],
  [20, 196],
  [21, 93],
  [22, 197],
  [23, 93],
  [24, 196],
  [25, 195],
  [26, 93],
  [27, 193],
]) as Theme;

export const dark_red_active = n66 as Theme;
const n67 = t([
  [12, 0],
  [13, 1],
  [14, 2],
  [15, 3],
  [16, 0],
  [17, 0],
  [18, 11],
  [19, 10],
  [20, 11],
  [21, 10],
  [22, 11],
  [23, 3],
  [24, 4],
  [25, 2],
  [26, 3],
  [27, 9],
]) as Theme;

export const light_ListItem = n67 as Theme;
const n68 = t([
  [12, 2],
  [13, 3],
  [14, 4],
  [15, 5],
  [16, 1],
  [17, 0],
  [18, 11],
  [19, 10],
  [20, 11],
  [21, 10],
  [22, 11],
  [23, 5],
  [24, 6],
  [25, 4],
  [26, 5],
  [27, 7],
]) as Theme;

export const light_Card = n68 as Theme;
export const light_DrawerFrame = n68 as Theme;
export const light_Progress = n68 as Theme;
export const light_TooltipArrow = n68 as Theme;
const n69 = t([
  [12, 3],
  [13, 4],
  [14, 5],
  [15, 6],
  [16, 2],
  [17, 1],
  [18, 11],
  [19, 10],
  [20, 11],
  [21, 10],
  [22, 10],
  [23, 242],
  [24, 242],
  [25, 5],
  [26, 6],
  [27, 6],
]) as Theme;

export const light_Button = n69 as Theme;
const n70 = t([
  [12, 3],
  [13, 4],
  [14, 5],
  [15, 6],
  [16, 2],
  [17, 1],
  [18, 11],
  [19, 10],
  [20, 11],
  [21, 10],
  [22, 10],
  [23, 6],
  [24, 7],
  [25, 5],
  [26, 6],
  [27, 6],
]) as Theme;

export const light_Checkbox = n70 as Theme;
export const light_Switch = n70 as Theme;
export const light_TooltipContent = n70 as Theme;
export const light_SliderTrack = n70 as Theme;
const n71 = t([
  [12, 11],
  [13, 11],
  [14, 10],
  [15, 9],
  [16, 11],
  [17, 11],
  [18, 0],
  [19, 1],
  [20, 0],
  [21, 1],
  [22, 0],
  [23, 9],
  [24, 8],
  [25, 10],
  [26, 9],
  [27, 1],
]) as Theme;

export const light_SwitchThumb = n71 as Theme;
const n72 = t([
  [12, 8],
  [13, 7],
  [14, 6],
  [15, 5],
  [16, 9],
  [17, 10],
  [18, 0],
  [19, 1],
  [20, 0],
  [21, 1],
  [22, 1],
  [23, 5],
  [24, 4],
  [25, 6],
  [26, 5],
  [27, 5],
]) as Theme;

export const light_SliderTrackActive = n72 as Theme;
const n73 = t([
  [12, 10],
  [13, 9],
  [14, 8],
  [15, 7],
  [16, 11],
  [17, 13],
  [18, 0],
  [19, 1],
  [20, 0],
  [21, 1],
  [22, 12],
  [23, 7],
  [24, 6],
  [25, 8],
  [26, 7],
  [27, 3],
]) as Theme;

export const light_SliderThumb = n73 as Theme;
export const light_Tooltip = n73 as Theme;
export const light_ProgressIndicator = n73 as Theme;
const n74 = t([
  [12, 0],
  [13, 1],
  [14, 2],
  [15, 3],
  [16, 0],
  [17, 0],
  [18, 11],
  [19, 10],
  [20, 11],
  [21, 10],
  [22, 11],
  [23, 5],
  [24, 6],
  [25, 4],
  [26, 5],
  [27, 9],
]) as Theme;

export const light_Input = n74 as Theme;
export const light_TextArea = n74 as Theme;
const n75 = t([
  [12, 112],
  [13, 113],
  [14, 114],
  [15, 115],
  [16, 111],
  [17, 13],
  [18, 0],
  [19, 121],
  [20, 0],
  [21, 121],
  [22, 12],
  [23, 115],
  [24, 116],
  [25, 114],
  [26, 115],
  [27, 119],
]) as Theme;

export const dark_ListItem = n75 as Theme;
const n76 = t([
  [12, 113],
  [13, 114],
  [14, 115],
  [15, 116],
  [16, 112],
  [17, 111],
  [18, 0],
  [19, 121],
  [20, 0],
  [21, 121],
  [22, 0],
  [23, 116],
  [24, 117],
  [25, 115],
  [26, 116],
  [27, 118],
]) as Theme;

export const dark_Card = n76 as Theme;
export const dark_DrawerFrame = n76 as Theme;
export const dark_Progress = n76 as Theme;
export const dark_TooltipArrow = n76 as Theme;
const n77 = t([
  [12, 114],
  [13, 115],
  [14, 116],
  [15, 117],
  [16, 113],
  [17, 112],
  [18, 0],
  [19, 121],
  [20, 0],
  [21, 121],
  [22, 121],
  [23, 242],
  [24, 242],
  [25, 116],
  [26, 117],
  [27, 117],
]) as Theme;

export const dark_Button = n77 as Theme;
const n78 = t([
  [12, 114],
  [13, 115],
  [14, 116],
  [15, 117],
  [16, 113],
  [17, 112],
  [18, 0],
  [19, 121],
  [20, 0],
  [21, 121],
  [22, 121],
  [23, 117],
  [24, 118],
  [25, 116],
  [26, 117],
  [27, 117],
]) as Theme;

export const dark_Checkbox = n78 as Theme;
export const dark_Switch = n78 as Theme;
export const dark_TooltipContent = n78 as Theme;
export const dark_SliderTrack = n78 as Theme;
const n79 = t([
  [12, 0],
  [13, 0],
  [14, 121],
  [15, 120],
  [16, 0],
  [17, 0],
  [18, 111],
  [19, 112],
  [20, 111],
  [21, 112],
  [22, 111],
  [23, 120],
  [24, 119],
  [25, 121],
  [26, 120],
  [27, 112],
]) as Theme;

export const dark_SwitchThumb = n79 as Theme;
const n80 = t([
  [12, 119],
  [13, 118],
  [14, 117],
  [15, 116],
  [16, 120],
  [17, 121],
  [18, 111],
  [19, 112],
  [20, 111],
  [21, 112],
  [22, 112],
  [23, 116],
  [24, 115],
  [25, 117],
  [26, 116],
  [27, 116],
]) as Theme;

export const dark_SliderTrackActive = n80 as Theme;
const n81 = t([
  [12, 121],
  [13, 120],
  [14, 119],
  [15, 118],
  [16, 0],
  [17, 12],
  [18, 111],
  [19, 112],
  [20, 111],
  [21, 112],
  [22, 13],
  [23, 118],
  [24, 117],
  [25, 119],
  [26, 118],
  [27, 114],
]) as Theme;

export const dark_SliderThumb = n81 as Theme;
export const dark_Tooltip = n81 as Theme;
export const dark_ProgressIndicator = n81 as Theme;
const n82 = t([
  [12, 112],
  [13, 113],
  [14, 114],
  [15, 115],
  [16, 111],
  [17, 13],
  [18, 0],
  [19, 121],
  [20, 0],
  [21, 121],
  [22, 12],
  [23, 116],
  [24, 117],
  [25, 115],
  [26, 116],
  [27, 119],
]) as Theme;

export const dark_Input = n82 as Theme;
export const dark_TextArea = n82 as Theme;
const n83 = t([
  [12, 49],
  [13, 50],
  [14, 51],
  [15, 52],
  [16, 49],
  [17, 49],
  [18, 11],
  [19, 60],
  [20, 11],
  [21, 60],
  [22, 11],
  [23, 51],
  [24, 52],
  [25, 51],
  [26, 51],
  [27, 59],
]) as Theme;

export const light_orange_ListItem = n83 as Theme;
const n84 = t([
  [12, 51],
  [13, 52],
  [14, 53],
  [15, 54],
  [16, 50],
  [17, 49],
  [18, 11],
  [19, 60],
  [20, 11],
  [21, 60],
  [22, 11],
  [23, 53],
  [24, 54],
  [25, 53],
  [26, 53],
  [27, 57],
]) as Theme;

export const light_orange_Card = n84 as Theme;
export const light_orange_DrawerFrame = n84 as Theme;
export const light_orange_Progress = n84 as Theme;
export const light_orange_TooltipArrow = n84 as Theme;
const n85 = t([
  [12, 52],
  [13, 53],
  [14, 54],
  [15, 56],
  [16, 51],
  [17, 50],
  [18, 11],
  [19, 60],
  [20, 11],
  [21, 60],
  [22, 60],
  [23, 242],
  [24, 242],
  [25, 54],
  [26, 54],
  [27, 56],
]) as Theme;

export const light_orange_Button = n85 as Theme;
const n86 = t([
  [12, 52],
  [13, 53],
  [14, 54],
  [15, 56],
  [16, 51],
  [17, 50],
  [18, 11],
  [19, 60],
  [20, 11],
  [21, 60],
  [22, 60],
  [23, 54],
  [24, 56],
  [25, 54],
  [26, 54],
  [27, 56],
]) as Theme;

export const light_orange_Checkbox = n86 as Theme;
export const light_orange_Switch = n86 as Theme;
export const light_orange_TooltipContent = n86 as Theme;
export const light_orange_SliderTrack = n86 as Theme;
const n87 = t([
  [12, 11],
  [13, 11],
  [14, 60],
  [15, 59],
  [16, 11],
  [17, 11],
  [18, 49],
  [19, 50],
  [20, 49],
  [21, 50],
  [22, 49],
  [23, 60],
  [24, 59],
  [25, 60],
  [26, 60],
  [27, 50],
]) as Theme;

export const light_orange_SwitchThumb = n87 as Theme;
const n88 = t([
  [12, 58],
  [13, 57],
  [14, 56],
  [15, 54],
  [16, 59],
  [17, 60],
  [18, 49],
  [19, 50],
  [20, 49],
  [21, 50],
  [22, 50],
  [23, 56],
  [24, 54],
  [25, 56],
  [26, 56],
  [27, 54],
]) as Theme;

export const light_orange_SliderTrackActive = n88 as Theme;
const n89 = t([
  [12, 60],
  [13, 59],
  [14, 58],
  [15, 57],
  [16, 11],
  [17, 213],
  [18, 49],
  [19, 50],
  [20, 49],
  [21, 50],
  [22, 212],
  [23, 58],
  [24, 57],
  [25, 58],
  [26, 58],
  [27, 52],
]) as Theme;

export const light_orange_SliderThumb = n89 as Theme;
export const light_orange_Tooltip = n89 as Theme;
export const light_orange_ProgressIndicator = n89 as Theme;
const n90 = t([
  [12, 49],
  [13, 50],
  [14, 51],
  [15, 52],
  [16, 49],
  [17, 49],
  [18, 11],
  [19, 60],
  [20, 11],
  [21, 60],
  [22, 11],
  [23, 53],
  [24, 54],
  [25, 53],
  [26, 53],
  [27, 59],
]) as Theme;

export const light_orange_Input = n90 as Theme;
export const light_orange_TextArea = n90 as Theme;
const n91 = t([
  [12, 97],
  [13, 98],
  [14, 99],
  [15, 100],
  [16, 97],
  [17, 97],
  [18, 11],
  [19, 108],
  [20, 11],
  [21, 108],
  [22, 11],
  [23, 99],
  [24, 100],
  [25, 99],
  [26, 99],
  [27, 107],
]) as Theme;

export const light_yellow_ListItem = n91 as Theme;
const n92 = t([
  [12, 99],
  [13, 100],
  [14, 101],
  [15, 102],
  [16, 98],
  [17, 97],
  [18, 11],
  [19, 108],
  [20, 11],
  [21, 108],
  [22, 11],
  [23, 101],
  [24, 102],
  [25, 101],
  [26, 101],
  [27, 105],
]) as Theme;

export const light_yellow_Card = n92 as Theme;
export const light_yellow_DrawerFrame = n92 as Theme;
export const light_yellow_Progress = n92 as Theme;
export const light_yellow_TooltipArrow = n92 as Theme;
const n93 = t([
  [12, 100],
  [13, 101],
  [14, 102],
  [15, 104],
  [16, 99],
  [17, 98],
  [18, 11],
  [19, 108],
  [20, 11],
  [21, 108],
  [22, 108],
  [23, 242],
  [24, 242],
  [25, 102],
  [26, 102],
  [27, 104],
]) as Theme;

export const light_yellow_Button = n93 as Theme;
const n94 = t([
  [12, 100],
  [13, 101],
  [14, 102],
  [15, 104],
  [16, 99],
  [17, 98],
  [18, 11],
  [19, 108],
  [20, 11],
  [21, 108],
  [22, 108],
  [23, 102],
  [24, 104],
  [25, 102],
  [26, 102],
  [27, 104],
]) as Theme;

export const light_yellow_Checkbox = n94 as Theme;
export const light_yellow_Switch = n94 as Theme;
export const light_yellow_TooltipContent = n94 as Theme;
export const light_yellow_SliderTrack = n94 as Theme;
const n95 = t([
  [12, 11],
  [13, 11],
  [14, 108],
  [15, 107],
  [16, 11],
  [17, 11],
  [18, 97],
  [19, 98],
  [20, 97],
  [21, 98],
  [22, 97],
  [23, 108],
  [24, 107],
  [25, 108],
  [26, 108],
  [27, 98],
]) as Theme;

export const light_yellow_SwitchThumb = n95 as Theme;
const n96 = t([
  [12, 106],
  [13, 105],
  [14, 104],
  [15, 102],
  [16, 107],
  [17, 108],
  [18, 97],
  [19, 98],
  [20, 97],
  [21, 98],
  [22, 98],
  [23, 104],
  [24, 102],
  [25, 104],
  [26, 104],
  [27, 102],
]) as Theme;

export const light_yellow_SliderTrackActive = n96 as Theme;
const n97 = t([
  [12, 108],
  [13, 107],
  [14, 106],
  [15, 105],
  [16, 11],
  [17, 215],
  [18, 97],
  [19, 98],
  [20, 97],
  [21, 98],
  [22, 214],
  [23, 106],
  [24, 105],
  [25, 106],
  [26, 106],
  [27, 100],
]) as Theme;

export const light_yellow_SliderThumb = n97 as Theme;
export const light_yellow_Tooltip = n97 as Theme;
export const light_yellow_ProgressIndicator = n97 as Theme;
const n98 = t([
  [12, 97],
  [13, 98],
  [14, 99],
  [15, 100],
  [16, 97],
  [17, 97],
  [18, 11],
  [19, 108],
  [20, 11],
  [21, 108],
  [22, 11],
  [23, 101],
  [24, 102],
  [25, 101],
  [26, 101],
  [27, 107],
]) as Theme;

export const light_yellow_Input = n98 as Theme;
export const light_yellow_TextArea = n98 as Theme;
const n99 = t([
  [12, 37],
  [13, 38],
  [14, 39],
  [15, 40],
  [16, 37],
  [17, 37],
  [18, 11],
  [19, 48],
  [20, 11],
  [21, 48],
  [22, 11],
  [23, 39],
  [24, 40],
  [25, 39],
  [26, 39],
  [27, 47],
]) as Theme;

export const light_green_ListItem = n99 as Theme;
const n100 = t([
  [12, 39],
  [13, 40],
  [14, 41],
  [15, 42],
  [16, 38],
  [17, 37],
  [18, 11],
  [19, 48],
  [20, 11],
  [21, 48],
  [22, 11],
  [23, 41],
  [24, 42],
  [25, 41],
  [26, 41],
  [27, 45],
]) as Theme;

export const light_green_Card = n100 as Theme;
export const light_green_DrawerFrame = n100 as Theme;
export const light_green_Progress = n100 as Theme;
export const light_green_TooltipArrow = n100 as Theme;
const n101 = t([
  [12, 40],
  [13, 41],
  [14, 42],
  [15, 44],
  [16, 39],
  [17, 38],
  [18, 11],
  [19, 48],
  [20, 11],
  [21, 48],
  [22, 48],
  [23, 242],
  [24, 242],
  [25, 42],
  [26, 42],
  [27, 44],
]) as Theme;

export const light_green_Button = n101 as Theme;
const n102 = t([
  [12, 40],
  [13, 41],
  [14, 42],
  [15, 44],
  [16, 39],
  [17, 38],
  [18, 11],
  [19, 48],
  [20, 11],
  [21, 48],
  [22, 48],
  [23, 42],
  [24, 44],
  [25, 42],
  [26, 42],
  [27, 44],
]) as Theme;

export const light_green_Checkbox = n102 as Theme;
export const light_green_Switch = n102 as Theme;
export const light_green_TooltipContent = n102 as Theme;
export const light_green_SliderTrack = n102 as Theme;
const n103 = t([
  [12, 11],
  [13, 11],
  [14, 48],
  [15, 47],
  [16, 11],
  [17, 11],
  [18, 37],
  [19, 38],
  [20, 37],
  [21, 38],
  [22, 37],
  [23, 48],
  [24, 47],
  [25, 48],
  [26, 48],
  [27, 38],
]) as Theme;

export const light_green_SwitchThumb = n103 as Theme;
const n104 = t([
  [12, 46],
  [13, 45],
  [14, 44],
  [15, 42],
  [16, 47],
  [17, 48],
  [18, 37],
  [19, 38],
  [20, 37],
  [21, 38],
  [22, 38],
  [23, 44],
  [24, 42],
  [25, 44],
  [26, 44],
  [27, 42],
]) as Theme;

export const light_green_SliderTrackActive = n104 as Theme;
const n105 = t([
  [12, 48],
  [13, 47],
  [14, 46],
  [15, 45],
  [16, 11],
  [17, 217],
  [18, 37],
  [19, 38],
  [20, 37],
  [21, 38],
  [22, 216],
  [23, 46],
  [24, 45],
  [25, 46],
  [26, 46],
  [27, 40],
]) as Theme;

export const light_green_SliderThumb = n105 as Theme;
export const light_green_Tooltip = n105 as Theme;
export const light_green_ProgressIndicator = n105 as Theme;
const n106 = t([
  [12, 37],
  [13, 38],
  [14, 39],
  [15, 40],
  [16, 37],
  [17, 37],
  [18, 11],
  [19, 48],
  [20, 11],
  [21, 48],
  [22, 11],
  [23, 41],
  [24, 42],
  [25, 41],
  [26, 41],
  [27, 47],
]) as Theme;

export const light_green_Input = n106 as Theme;
export const light_green_TextArea = n106 as Theme;
const n107 = t([
  [12, 14],
  [13, 15],
  [14, 16],
  [15, 17],
  [16, 14],
  [17, 14],
  [18, 11],
  [19, 25],
  [20, 11],
  [21, 25],
  [22, 11],
  [23, 16],
  [24, 17],
  [25, 16],
  [26, 16],
  [27, 24],
]) as Theme;

export const light_blue_ListItem = n107 as Theme;
const n108 = t([
  [12, 16],
  [13, 17],
  [14, 18],
  [15, 19],
  [16, 15],
  [17, 14],
  [18, 11],
  [19, 25],
  [20, 11],
  [21, 25],
  [22, 11],
  [23, 18],
  [24, 19],
  [25, 18],
  [26, 18],
  [27, 22],
]) as Theme;

export const light_blue_Card = n108 as Theme;
export const light_blue_DrawerFrame = n108 as Theme;
export const light_blue_Progress = n108 as Theme;
export const light_blue_TooltipArrow = n108 as Theme;
const n109 = t([
  [12, 17],
  [13, 18],
  [14, 19],
  [15, 21],
  [16, 16],
  [17, 15],
  [18, 11],
  [19, 25],
  [20, 11],
  [21, 25],
  [22, 25],
  [23, 242],
  [24, 242],
  [25, 19],
  [26, 19],
  [27, 21],
]) as Theme;

export const light_blue_Button = n109 as Theme;
const n110 = t([
  [12, 17],
  [13, 18],
  [14, 19],
  [15, 21],
  [16, 16],
  [17, 15],
  [18, 11],
  [19, 25],
  [20, 11],
  [21, 25],
  [22, 25],
  [23, 19],
  [24, 21],
  [25, 19],
  [26, 19],
  [27, 21],
]) as Theme;

export const light_blue_Checkbox = n110 as Theme;
export const light_blue_Switch = n110 as Theme;
export const light_blue_TooltipContent = n110 as Theme;
export const light_blue_SliderTrack = n110 as Theme;
const n111 = t([
  [12, 11],
  [13, 11],
  [14, 25],
  [15, 24],
  [16, 11],
  [17, 11],
  [18, 14],
  [19, 15],
  [20, 14],
  [21, 15],
  [22, 14],
  [23, 25],
  [24, 24],
  [25, 25],
  [26, 25],
  [27, 15],
]) as Theme;

export const light_blue_SwitchThumb = n111 as Theme;
const n112 = t([
  [12, 23],
  [13, 22],
  [14, 21],
  [15, 19],
  [16, 24],
  [17, 25],
  [18, 14],
  [19, 15],
  [20, 14],
  [21, 15],
  [22, 15],
  [23, 21],
  [24, 19],
  [25, 21],
  [26, 21],
  [27, 19],
]) as Theme;

export const light_blue_SliderTrackActive = n112 as Theme;
const n113 = t([
  [12, 25],
  [13, 24],
  [14, 23],
  [15, 22],
  [16, 11],
  [17, 219],
  [18, 14],
  [19, 15],
  [20, 14],
  [21, 15],
  [22, 218],
  [23, 23],
  [24, 22],
  [25, 23],
  [26, 23],
  [27, 17],
]) as Theme;

export const light_blue_SliderThumb = n113 as Theme;
export const light_blue_Tooltip = n113 as Theme;
export const light_blue_ProgressIndicator = n113 as Theme;
const n114 = t([
  [12, 14],
  [13, 15],
  [14, 16],
  [15, 17],
  [16, 14],
  [17, 14],
  [18, 11],
  [19, 25],
  [20, 11],
  [21, 25],
  [22, 11],
  [23, 18],
  [24, 19],
  [25, 18],
  [26, 18],
  [27, 24],
]) as Theme;

export const light_blue_Input = n114 as Theme;
export const light_blue_TextArea = n114 as Theme;
const n115 = t([
  [12, 73],
  [13, 74],
  [14, 75],
  [15, 76],
  [16, 73],
  [17, 73],
  [18, 11],
  [19, 84],
  [20, 11],
  [21, 84],
  [22, 11],
  [23, 75],
  [24, 76],
  [25, 75],
  [26, 75],
  [27, 83],
]) as Theme;

export const light_purple_ListItem = n115 as Theme;
const n116 = t([
  [12, 75],
  [13, 76],
  [14, 77],
  [15, 78],
  [16, 74],
  [17, 73],
  [18, 11],
  [19, 84],
  [20, 11],
  [21, 84],
  [22, 11],
  [23, 77],
  [24, 78],
  [25, 77],
  [26, 77],
  [27, 81],
]) as Theme;

export const light_purple_Card = n116 as Theme;
export const light_purple_DrawerFrame = n116 as Theme;
export const light_purple_Progress = n116 as Theme;
export const light_purple_TooltipArrow = n116 as Theme;
const n117 = t([
  [12, 76],
  [13, 77],
  [14, 78],
  [15, 80],
  [16, 75],
  [17, 74],
  [18, 11],
  [19, 84],
  [20, 11],
  [21, 84],
  [22, 84],
  [23, 242],
  [24, 242],
  [25, 78],
  [26, 78],
  [27, 80],
]) as Theme;

export const light_purple_Button = n117 as Theme;
const n118 = t([
  [12, 76],
  [13, 77],
  [14, 78],
  [15, 80],
  [16, 75],
  [17, 74],
  [18, 11],
  [19, 84],
  [20, 11],
  [21, 84],
  [22, 84],
  [23, 78],
  [24, 80],
  [25, 78],
  [26, 78],
  [27, 80],
]) as Theme;

export const light_purple_Checkbox = n118 as Theme;
export const light_purple_Switch = n118 as Theme;
export const light_purple_TooltipContent = n118 as Theme;
export const light_purple_SliderTrack = n118 as Theme;
const n119 = t([
  [12, 11],
  [13, 11],
  [14, 84],
  [15, 83],
  [16, 11],
  [17, 11],
  [18, 73],
  [19, 74],
  [20, 73],
  [21, 74],
  [22, 73],
  [23, 84],
  [24, 83],
  [25, 84],
  [26, 84],
  [27, 74],
]) as Theme;

export const light_purple_SwitchThumb = n119 as Theme;
const n120 = t([
  [12, 82],
  [13, 81],
  [14, 80],
  [15, 78],
  [16, 83],
  [17, 84],
  [18, 73],
  [19, 74],
  [20, 73],
  [21, 74],
  [22, 74],
  [23, 80],
  [24, 78],
  [25, 80],
  [26, 80],
  [27, 78],
]) as Theme;

export const light_purple_SliderTrackActive = n120 as Theme;
const n121 = t([
  [12, 84],
  [13, 83],
  [14, 82],
  [15, 81],
  [16, 11],
  [17, 221],
  [18, 73],
  [19, 74],
  [20, 73],
  [21, 74],
  [22, 220],
  [23, 82],
  [24, 81],
  [25, 82],
  [26, 82],
  [27, 76],
]) as Theme;

export const light_purple_SliderThumb = n121 as Theme;
export const light_purple_Tooltip = n121 as Theme;
export const light_purple_ProgressIndicator = n121 as Theme;
const n122 = t([
  [12, 73],
  [13, 74],
  [14, 75],
  [15, 76],
  [16, 73],
  [17, 73],
  [18, 11],
  [19, 84],
  [20, 11],
  [21, 84],
  [22, 11],
  [23, 77],
  [24, 78],
  [25, 77],
  [26, 77],
  [27, 83],
]) as Theme;

export const light_purple_Input = n122 as Theme;
export const light_purple_TextArea = n122 as Theme;
const n123 = t([
  [12, 61],
  [13, 62],
  [14, 63],
  [15, 64],
  [16, 61],
  [17, 61],
  [18, 11],
  [19, 72],
  [20, 11],
  [21, 72],
  [22, 11],
  [23, 63],
  [24, 64],
  [25, 63],
  [26, 63],
  [27, 71],
]) as Theme;

export const light_pink_ListItem = n123 as Theme;
const n124 = t([
  [12, 63],
  [13, 64],
  [14, 65],
  [15, 66],
  [16, 62],
  [17, 61],
  [18, 11],
  [19, 72],
  [20, 11],
  [21, 72],
  [22, 11],
  [23, 65],
  [24, 66],
  [25, 65],
  [26, 65],
  [27, 69],
]) as Theme;

export const light_pink_Card = n124 as Theme;
export const light_pink_DrawerFrame = n124 as Theme;
export const light_pink_Progress = n124 as Theme;
export const light_pink_TooltipArrow = n124 as Theme;
const n125 = t([
  [12, 64],
  [13, 65],
  [14, 66],
  [15, 68],
  [16, 63],
  [17, 62],
  [18, 11],
  [19, 72],
  [20, 11],
  [21, 72],
  [22, 72],
  [23, 242],
  [24, 242],
  [25, 66],
  [26, 66],
  [27, 68],
]) as Theme;

export const light_pink_Button = n125 as Theme;
const n126 = t([
  [12, 64],
  [13, 65],
  [14, 66],
  [15, 68],
  [16, 63],
  [17, 62],
  [18, 11],
  [19, 72],
  [20, 11],
  [21, 72],
  [22, 72],
  [23, 66],
  [24, 68],
  [25, 66],
  [26, 66],
  [27, 68],
]) as Theme;

export const light_pink_Checkbox = n126 as Theme;
export const light_pink_Switch = n126 as Theme;
export const light_pink_TooltipContent = n126 as Theme;
export const light_pink_SliderTrack = n126 as Theme;
const n127 = t([
  [12, 11],
  [13, 11],
  [14, 72],
  [15, 71],
  [16, 11],
  [17, 11],
  [18, 61],
  [19, 62],
  [20, 61],
  [21, 62],
  [22, 61],
  [23, 72],
  [24, 71],
  [25, 72],
  [26, 72],
  [27, 62],
]) as Theme;

export const light_pink_SwitchThumb = n127 as Theme;
const n128 = t([
  [12, 70],
  [13, 69],
  [14, 68],
  [15, 66],
  [16, 71],
  [17, 72],
  [18, 61],
  [19, 62],
  [20, 61],
  [21, 62],
  [22, 62],
  [23, 68],
  [24, 66],
  [25, 68],
  [26, 68],
  [27, 66],
]) as Theme;

export const light_pink_SliderTrackActive = n128 as Theme;
const n129 = t([
  [12, 72],
  [13, 71],
  [14, 70],
  [15, 69],
  [16, 11],
  [17, 223],
  [18, 61],
  [19, 62],
  [20, 61],
  [21, 62],
  [22, 222],
  [23, 70],
  [24, 69],
  [25, 70],
  [26, 70],
  [27, 64],
]) as Theme;

export const light_pink_SliderThumb = n129 as Theme;
export const light_pink_Tooltip = n129 as Theme;
export const light_pink_ProgressIndicator = n129 as Theme;
const n130 = t([
  [12, 61],
  [13, 62],
  [14, 63],
  [15, 64],
  [16, 61],
  [17, 61],
  [18, 11],
  [19, 72],
  [20, 11],
  [21, 72],
  [22, 11],
  [23, 65],
  [24, 66],
  [25, 65],
  [26, 65],
  [27, 71],
]) as Theme;

export const light_pink_Input = n130 as Theme;
export const light_pink_TextArea = n130 as Theme;
const n131 = t([
  [12, 85],
  [13, 86],
  [14, 87],
  [15, 88],
  [16, 85],
  [17, 85],
  [18, 11],
  [19, 96],
  [20, 11],
  [21, 96],
  [22, 11],
  [23, 87],
  [24, 88],
  [25, 87],
  [26, 87],
  [27, 95],
]) as Theme;

export const light_red_ListItem = n131 as Theme;
const n132 = t([
  [12, 87],
  [13, 88],
  [14, 89],
  [15, 90],
  [16, 86],
  [17, 85],
  [18, 11],
  [19, 96],
  [20, 11],
  [21, 96],
  [22, 11],
  [23, 89],
  [24, 90],
  [25, 89],
  [26, 89],
  [27, 93],
]) as Theme;

export const light_red_Card = n132 as Theme;
export const light_red_DrawerFrame = n132 as Theme;
export const light_red_Progress = n132 as Theme;
export const light_red_TooltipArrow = n132 as Theme;
const n133 = t([
  [12, 88],
  [13, 89],
  [14, 90],
  [15, 92],
  [16, 87],
  [17, 86],
  [18, 11],
  [19, 96],
  [20, 11],
  [21, 96],
  [22, 96],
  [23, 242],
  [24, 242],
  [25, 90],
  [26, 90],
  [27, 92],
]) as Theme;

export const light_red_Button = n133 as Theme;
const n134 = t([
  [12, 88],
  [13, 89],
  [14, 90],
  [15, 92],
  [16, 87],
  [17, 86],
  [18, 11],
  [19, 96],
  [20, 11],
  [21, 96],
  [22, 96],
  [23, 90],
  [24, 92],
  [25, 90],
  [26, 90],
  [27, 92],
]) as Theme;

export const light_red_Checkbox = n134 as Theme;
export const light_red_Switch = n134 as Theme;
export const light_red_TooltipContent = n134 as Theme;
export const light_red_SliderTrack = n134 as Theme;
const n135 = t([
  [12, 11],
  [13, 11],
  [14, 96],
  [15, 95],
  [16, 11],
  [17, 11],
  [18, 85],
  [19, 86],
  [20, 85],
  [21, 86],
  [22, 85],
  [23, 96],
  [24, 95],
  [25, 96],
  [26, 96],
  [27, 86],
]) as Theme;

export const light_red_SwitchThumb = n135 as Theme;
const n136 = t([
  [12, 94],
  [13, 93],
  [14, 92],
  [15, 90],
  [16, 95],
  [17, 96],
  [18, 85],
  [19, 86],
  [20, 85],
  [21, 86],
  [22, 86],
  [23, 92],
  [24, 90],
  [25, 92],
  [26, 92],
  [27, 90],
]) as Theme;

export const light_red_SliderTrackActive = n136 as Theme;
const n137 = t([
  [12, 96],
  [13, 95],
  [14, 94],
  [15, 93],
  [16, 11],
  [17, 225],
  [18, 85],
  [19, 86],
  [20, 85],
  [21, 86],
  [22, 224],
  [23, 94],
  [24, 93],
  [25, 94],
  [26, 94],
  [27, 88],
]) as Theme;

export const light_red_SliderThumb = n137 as Theme;
export const light_red_Tooltip = n137 as Theme;
export const light_red_ProgressIndicator = n137 as Theme;
const n138 = t([
  [12, 85],
  [13, 86],
  [14, 87],
  [15, 88],
  [16, 85],
  [17, 85],
  [18, 11],
  [19, 96],
  [20, 11],
  [21, 96],
  [22, 11],
  [23, 89],
  [24, 90],
  [25, 89],
  [26, 89],
  [27, 95],
]) as Theme;

export const light_red_Input = n138 as Theme;
export const light_red_TextArea = n138 as Theme;
const n139 = t([
  [12, 156],
  [13, 157],
  [14, 158],
  [15, 159],
  [16, 155],
  [17, 226],
  [18, 0],
  [19, 165],
  [20, 0],
  [21, 165],
  [22, 227],
  [23, 159],
  [24, 160],
  [25, 158],
  [26, 159],
  [27, 163],
]) as Theme;

export const dark_orange_ListItem = n139 as Theme;
const n140 = t([
  [12, 157],
  [13, 158],
  [14, 159],
  [15, 160],
  [16, 156],
  [17, 155],
  [18, 0],
  [19, 165],
  [20, 0],
  [21, 165],
  [22, 0],
  [23, 160],
  [24, 162],
  [25, 159],
  [26, 160],
  [27, 57],
]) as Theme;

export const dark_orange_Card = n140 as Theme;
export const dark_orange_DrawerFrame = n140 as Theme;
export const dark_orange_Progress = n140 as Theme;
export const dark_orange_TooltipArrow = n140 as Theme;
const n141 = t([
  [12, 158],
  [13, 159],
  [14, 160],
  [15, 162],
  [16, 157],
  [17, 156],
  [18, 0],
  [19, 165],
  [20, 0],
  [21, 165],
  [22, 165],
  [23, 242],
  [24, 242],
  [25, 160],
  [26, 162],
  [27, 162],
]) as Theme;

export const dark_orange_Button = n141 as Theme;
const n142 = t([
  [12, 158],
  [13, 159],
  [14, 160],
  [15, 162],
  [16, 157],
  [17, 156],
  [18, 0],
  [19, 165],
  [20, 0],
  [21, 165],
  [22, 165],
  [23, 162],
  [24, 57],
  [25, 160],
  [26, 162],
  [27, 162],
]) as Theme;

export const dark_orange_Checkbox = n142 as Theme;
export const dark_orange_Switch = n142 as Theme;
export const dark_orange_TooltipContent = n142 as Theme;
export const dark_orange_SliderTrack = n142 as Theme;
const n143 = t([
  [12, 0],
  [13, 0],
  [14, 165],
  [15, 164],
  [16, 0],
  [17, 0],
  [18, 155],
  [19, 156],
  [20, 155],
  [21, 156],
  [22, 155],
  [23, 164],
  [24, 163],
  [25, 165],
  [26, 164],
  [27, 156],
]) as Theme;

export const dark_orange_SwitchThumb = n143 as Theme;
const n144 = t([
  [12, 163],
  [13, 57],
  [14, 162],
  [15, 160],
  [16, 164],
  [17, 165],
  [18, 155],
  [19, 156],
  [20, 155],
  [21, 156],
  [22, 156],
  [23, 160],
  [24, 159],
  [25, 162],
  [26, 160],
  [27, 160],
]) as Theme;

export const dark_orange_SliderTrackActive = n144 as Theme;
const n145 = t([
  [12, 165],
  [13, 164],
  [14, 163],
  [15, 57],
  [16, 0],
  [17, 227],
  [18, 155],
  [19, 156],
  [20, 155],
  [21, 156],
  [22, 226],
  [23, 57],
  [24, 162],
  [25, 163],
  [26, 57],
  [27, 158],
]) as Theme;

export const dark_orange_SliderThumb = n145 as Theme;
export const dark_orange_Tooltip = n145 as Theme;
export const dark_orange_ProgressIndicator = n145 as Theme;
const n146 = t([
  [12, 156],
  [13, 157],
  [14, 158],
  [15, 159],
  [16, 155],
  [17, 226],
  [18, 0],
  [19, 165],
  [20, 0],
  [21, 165],
  [22, 227],
  [23, 160],
  [24, 162],
  [25, 159],
  [26, 160],
  [27, 163],
]) as Theme;

export const dark_orange_Input = n146 as Theme;
export const dark_orange_TextArea = n146 as Theme;
const n147 = t([
  [12, 200],
  [13, 201],
  [14, 202],
  [15, 203],
  [16, 199],
  [17, 228],
  [18, 0],
  [19, 209],
  [20, 0],
  [21, 209],
  [22, 229],
  [23, 203],
  [24, 204],
  [25, 202],
  [26, 203],
  [27, 207],
]) as Theme;

export const dark_yellow_ListItem = n147 as Theme;
const n148 = t([
  [12, 201],
  [13, 202],
  [14, 203],
  [15, 204],
  [16, 200],
  [17, 199],
  [18, 0],
  [19, 209],
  [20, 0],
  [21, 209],
  [22, 0],
  [23, 204],
  [24, 206],
  [25, 203],
  [26, 204],
  [27, 105],
]) as Theme;

export const dark_yellow_Card = n148 as Theme;
export const dark_yellow_DrawerFrame = n148 as Theme;
export const dark_yellow_Progress = n148 as Theme;
export const dark_yellow_TooltipArrow = n148 as Theme;
const n149 = t([
  [12, 202],
  [13, 203],
  [14, 204],
  [15, 206],
  [16, 201],
  [17, 200],
  [18, 0],
  [19, 209],
  [20, 0],
  [21, 209],
  [22, 209],
  [23, 242],
  [24, 242],
  [25, 204],
  [26, 206],
  [27, 206],
]) as Theme;

export const dark_yellow_Button = n149 as Theme;
const n150 = t([
  [12, 202],
  [13, 203],
  [14, 204],
  [15, 206],
  [16, 201],
  [17, 200],
  [18, 0],
  [19, 209],
  [20, 0],
  [21, 209],
  [22, 209],
  [23, 206],
  [24, 105],
  [25, 204],
  [26, 206],
  [27, 206],
]) as Theme;

export const dark_yellow_Checkbox = n150 as Theme;
export const dark_yellow_Switch = n150 as Theme;
export const dark_yellow_TooltipContent = n150 as Theme;
export const dark_yellow_SliderTrack = n150 as Theme;
const n151 = t([
  [12, 0],
  [13, 0],
  [14, 209],
  [15, 208],
  [16, 0],
  [17, 0],
  [18, 199],
  [19, 200],
  [20, 199],
  [21, 200],
  [22, 199],
  [23, 208],
  [24, 207],
  [25, 209],
  [26, 208],
  [27, 200],
]) as Theme;

export const dark_yellow_SwitchThumb = n151 as Theme;
const n152 = t([
  [12, 207],
  [13, 105],
  [14, 206],
  [15, 204],
  [16, 208],
  [17, 209],
  [18, 199],
  [19, 200],
  [20, 199],
  [21, 200],
  [22, 200],
  [23, 204],
  [24, 203],
  [25, 206],
  [26, 204],
  [27, 204],
]) as Theme;

export const dark_yellow_SliderTrackActive = n152 as Theme;
const n153 = t([
  [12, 209],
  [13, 208],
  [14, 207],
  [15, 105],
  [16, 0],
  [17, 229],
  [18, 199],
  [19, 200],
  [20, 199],
  [21, 200],
  [22, 228],
  [23, 105],
  [24, 206],
  [25, 207],
  [26, 105],
  [27, 202],
]) as Theme;

export const dark_yellow_SliderThumb = n153 as Theme;
export const dark_yellow_Tooltip = n153 as Theme;
export const dark_yellow_ProgressIndicator = n153 as Theme;
const n154 = t([
  [12, 200],
  [13, 201],
  [14, 202],
  [15, 203],
  [16, 199],
  [17, 228],
  [18, 0],
  [19, 209],
  [20, 0],
  [21, 209],
  [22, 229],
  [23, 204],
  [24, 206],
  [25, 203],
  [26, 204],
  [27, 207],
]) as Theme;

export const dark_yellow_Input = n154 as Theme;
export const dark_yellow_TextArea = n154 as Theme;
const n155 = t([
  [12, 145],
  [13, 146],
  [14, 147],
  [15, 148],
  [16, 144],
  [17, 230],
  [18, 0],
  [19, 154],
  [20, 0],
  [21, 154],
  [22, 231],
  [23, 148],
  [24, 149],
  [25, 147],
  [26, 148],
  [27, 152],
]) as Theme;

export const dark_green_ListItem = n155 as Theme;
const n156 = t([
  [12, 146],
  [13, 147],
  [14, 148],
  [15, 149],
  [16, 145],
  [17, 144],
  [18, 0],
  [19, 154],
  [20, 0],
  [21, 154],
  [22, 0],
  [23, 149],
  [24, 151],
  [25, 148],
  [26, 149],
  [27, 45],
]) as Theme;

export const dark_green_Card = n156 as Theme;
export const dark_green_DrawerFrame = n156 as Theme;
export const dark_green_Progress = n156 as Theme;
export const dark_green_TooltipArrow = n156 as Theme;
const n157 = t([
  [12, 147],
  [13, 148],
  [14, 149],
  [15, 151],
  [16, 146],
  [17, 145],
  [18, 0],
  [19, 154],
  [20, 0],
  [21, 154],
  [22, 154],
  [23, 242],
  [24, 242],
  [25, 149],
  [26, 151],
  [27, 151],
]) as Theme;

export const dark_green_Button = n157 as Theme;
const n158 = t([
  [12, 147],
  [13, 148],
  [14, 149],
  [15, 151],
  [16, 146],
  [17, 145],
  [18, 0],
  [19, 154],
  [20, 0],
  [21, 154],
  [22, 154],
  [23, 151],
  [24, 45],
  [25, 149],
  [26, 151],
  [27, 151],
]) as Theme;

export const dark_green_Checkbox = n158 as Theme;
export const dark_green_Switch = n158 as Theme;
export const dark_green_TooltipContent = n158 as Theme;
export const dark_green_SliderTrack = n158 as Theme;
const n159 = t([
  [12, 0],
  [13, 0],
  [14, 154],
  [15, 153],
  [16, 0],
  [17, 0],
  [18, 144],
  [19, 145],
  [20, 144],
  [21, 145],
  [22, 144],
  [23, 153],
  [24, 152],
  [25, 154],
  [26, 153],
  [27, 145],
]) as Theme;

export const dark_green_SwitchThumb = n159 as Theme;
const n160 = t([
  [12, 152],
  [13, 45],
  [14, 151],
  [15, 149],
  [16, 153],
  [17, 154],
  [18, 144],
  [19, 145],
  [20, 144],
  [21, 145],
  [22, 145],
  [23, 149],
  [24, 148],
  [25, 151],
  [26, 149],
  [27, 149],
]) as Theme;

export const dark_green_SliderTrackActive = n160 as Theme;
const n161 = t([
  [12, 154],
  [13, 153],
  [14, 152],
  [15, 45],
  [16, 0],
  [17, 231],
  [18, 144],
  [19, 145],
  [20, 144],
  [21, 145],
  [22, 230],
  [23, 45],
  [24, 151],
  [25, 152],
  [26, 45],
  [27, 147],
]) as Theme;

export const dark_green_SliderThumb = n161 as Theme;
export const dark_green_Tooltip = n161 as Theme;
export const dark_green_ProgressIndicator = n161 as Theme;
const n162 = t([
  [12, 145],
  [13, 146],
  [14, 147],
  [15, 148],
  [16, 144],
  [17, 230],
  [18, 0],
  [19, 154],
  [20, 0],
  [21, 154],
  [22, 231],
  [23, 149],
  [24, 151],
  [25, 148],
  [26, 149],
  [27, 152],
]) as Theme;

export const dark_green_Input = n162 as Theme;
export const dark_green_TextArea = n162 as Theme;
const n163 = t([
  [12, 123],
  [13, 124],
  [14, 125],
  [15, 126],
  [16, 122],
  [17, 232],
  [18, 0],
  [19, 132],
  [20, 0],
  [21, 132],
  [22, 233],
  [23, 126],
  [24, 127],
  [25, 125],
  [26, 126],
  [27, 130],
]) as Theme;

export const dark_blue_ListItem = n163 as Theme;
const n164 = t([
  [12, 124],
  [13, 125],
  [14, 126],
  [15, 127],
  [16, 123],
  [17, 122],
  [18, 0],
  [19, 132],
  [20, 0],
  [21, 132],
  [22, 0],
  [23, 127],
  [24, 129],
  [25, 126],
  [26, 127],
  [27, 22],
]) as Theme;

export const dark_blue_Card = n164 as Theme;
export const dark_blue_DrawerFrame = n164 as Theme;
export const dark_blue_Progress = n164 as Theme;
export const dark_blue_TooltipArrow = n164 as Theme;
const n165 = t([
  [12, 125],
  [13, 126],
  [14, 127],
  [15, 129],
  [16, 124],
  [17, 123],
  [18, 0],
  [19, 132],
  [20, 0],
  [21, 132],
  [22, 132],
  [23, 242],
  [24, 242],
  [25, 127],
  [26, 129],
  [27, 129],
]) as Theme;

export const dark_blue_Button = n165 as Theme;
const n166 = t([
  [12, 125],
  [13, 126],
  [14, 127],
  [15, 129],
  [16, 124],
  [17, 123],
  [18, 0],
  [19, 132],
  [20, 0],
  [21, 132],
  [22, 132],
  [23, 129],
  [24, 22],
  [25, 127],
  [26, 129],
  [27, 129],
]) as Theme;

export const dark_blue_Checkbox = n166 as Theme;
export const dark_blue_Switch = n166 as Theme;
export const dark_blue_TooltipContent = n166 as Theme;
export const dark_blue_SliderTrack = n166 as Theme;
const n167 = t([
  [12, 0],
  [13, 0],
  [14, 132],
  [15, 131],
  [16, 0],
  [17, 0],
  [18, 122],
  [19, 123],
  [20, 122],
  [21, 123],
  [22, 122],
  [23, 131],
  [24, 130],
  [25, 132],
  [26, 131],
  [27, 123],
]) as Theme;

export const dark_blue_SwitchThumb = n167 as Theme;
const n168 = t([
  [12, 130],
  [13, 22],
  [14, 129],
  [15, 127],
  [16, 131],
  [17, 132],
  [18, 122],
  [19, 123],
  [20, 122],
  [21, 123],
  [22, 123],
  [23, 127],
  [24, 126],
  [25, 129],
  [26, 127],
  [27, 127],
]) as Theme;

export const dark_blue_SliderTrackActive = n168 as Theme;
const n169 = t([
  [12, 132],
  [13, 131],
  [14, 130],
  [15, 22],
  [16, 0],
  [17, 233],
  [18, 122],
  [19, 123],
  [20, 122],
  [21, 123],
  [22, 232],
  [23, 22],
  [24, 129],
  [25, 130],
  [26, 22],
  [27, 125],
]) as Theme;

export const dark_blue_SliderThumb = n169 as Theme;
export const dark_blue_Tooltip = n169 as Theme;
export const dark_blue_ProgressIndicator = n169 as Theme;
const n170 = t([
  [12, 123],
  [13, 124],
  [14, 125],
  [15, 126],
  [16, 122],
  [17, 232],
  [18, 0],
  [19, 132],
  [20, 0],
  [21, 132],
  [22, 233],
  [23, 127],
  [24, 129],
  [25, 126],
  [26, 127],
  [27, 130],
]) as Theme;

export const dark_blue_Input = n170 as Theme;
export const dark_blue_TextArea = n170 as Theme;
const n171 = t([
  [12, 178],
  [13, 179],
  [14, 180],
  [15, 181],
  [16, 177],
  [17, 234],
  [18, 0],
  [19, 187],
  [20, 0],
  [21, 187],
  [22, 235],
  [23, 181],
  [24, 182],
  [25, 180],
  [26, 181],
  [27, 185],
]) as Theme;

export const dark_purple_ListItem = n171 as Theme;
const n172 = t([
  [12, 179],
  [13, 180],
  [14, 181],
  [15, 182],
  [16, 178],
  [17, 177],
  [18, 0],
  [19, 187],
  [20, 0],
  [21, 187],
  [22, 0],
  [23, 182],
  [24, 184],
  [25, 181],
  [26, 182],
  [27, 81],
]) as Theme;

export const dark_purple_Card = n172 as Theme;
export const dark_purple_DrawerFrame = n172 as Theme;
export const dark_purple_Progress = n172 as Theme;
export const dark_purple_TooltipArrow = n172 as Theme;
const n173 = t([
  [12, 180],
  [13, 181],
  [14, 182],
  [15, 184],
  [16, 179],
  [17, 178],
  [18, 0],
  [19, 187],
  [20, 0],
  [21, 187],
  [22, 187],
  [23, 242],
  [24, 242],
  [25, 182],
  [26, 184],
  [27, 184],
]) as Theme;

export const dark_purple_Button = n173 as Theme;
const n174 = t([
  [12, 180],
  [13, 181],
  [14, 182],
  [15, 184],
  [16, 179],
  [17, 178],
  [18, 0],
  [19, 187],
  [20, 0],
  [21, 187],
  [22, 187],
  [23, 184],
  [24, 81],
  [25, 182],
  [26, 184],
  [27, 184],
]) as Theme;

export const dark_purple_Checkbox = n174 as Theme;
export const dark_purple_Switch = n174 as Theme;
export const dark_purple_TooltipContent = n174 as Theme;
export const dark_purple_SliderTrack = n174 as Theme;
const n175 = t([
  [12, 0],
  [13, 0],
  [14, 187],
  [15, 186],
  [16, 0],
  [17, 0],
  [18, 177],
  [19, 178],
  [20, 177],
  [21, 178],
  [22, 177],
  [23, 186],
  [24, 185],
  [25, 187],
  [26, 186],
  [27, 178],
]) as Theme;

export const dark_purple_SwitchThumb = n175 as Theme;
const n176 = t([
  [12, 185],
  [13, 81],
  [14, 184],
  [15, 182],
  [16, 186],
  [17, 187],
  [18, 177],
  [19, 178],
  [20, 177],
  [21, 178],
  [22, 178],
  [23, 182],
  [24, 181],
  [25, 184],
  [26, 182],
  [27, 182],
]) as Theme;

export const dark_purple_SliderTrackActive = n176 as Theme;
const n177 = t([
  [12, 187],
  [13, 186],
  [14, 185],
  [15, 81],
  [16, 0],
  [17, 235],
  [18, 177],
  [19, 178],
  [20, 177],
  [21, 178],
  [22, 234],
  [23, 81],
  [24, 184],
  [25, 185],
  [26, 81],
  [27, 180],
]) as Theme;

export const dark_purple_SliderThumb = n177 as Theme;
export const dark_purple_Tooltip = n177 as Theme;
export const dark_purple_ProgressIndicator = n177 as Theme;
const n178 = t([
  [12, 178],
  [13, 179],
  [14, 180],
  [15, 181],
  [16, 177],
  [17, 234],
  [18, 0],
  [19, 187],
  [20, 0],
  [21, 187],
  [22, 235],
  [23, 182],
  [24, 184],
  [25, 181],
  [26, 182],
  [27, 185],
]) as Theme;

export const dark_purple_Input = n178 as Theme;
export const dark_purple_TextArea = n178 as Theme;
const n179 = t([
  [12, 167],
  [13, 168],
  [14, 169],
  [15, 170],
  [16, 166],
  [17, 236],
  [18, 0],
  [19, 176],
  [20, 0],
  [21, 176],
  [22, 237],
  [23, 170],
  [24, 171],
  [25, 169],
  [26, 170],
  [27, 174],
]) as Theme;

export const dark_pink_ListItem = n179 as Theme;
const n180 = t([
  [12, 168],
  [13, 169],
  [14, 170],
  [15, 171],
  [16, 167],
  [17, 166],
  [18, 0],
  [19, 176],
  [20, 0],
  [21, 176],
  [22, 0],
  [23, 171],
  [24, 173],
  [25, 170],
  [26, 171],
  [27, 69],
]) as Theme;

export const dark_pink_Card = n180 as Theme;
export const dark_pink_DrawerFrame = n180 as Theme;
export const dark_pink_Progress = n180 as Theme;
export const dark_pink_TooltipArrow = n180 as Theme;
const n181 = t([
  [12, 169],
  [13, 170],
  [14, 171],
  [15, 173],
  [16, 168],
  [17, 167],
  [18, 0],
  [19, 176],
  [20, 0],
  [21, 176],
  [22, 176],
  [23, 242],
  [24, 242],
  [25, 171],
  [26, 173],
  [27, 173],
]) as Theme;

export const dark_pink_Button = n181 as Theme;
const n182 = t([
  [12, 169],
  [13, 170],
  [14, 171],
  [15, 173],
  [16, 168],
  [17, 167],
  [18, 0],
  [19, 176],
  [20, 0],
  [21, 176],
  [22, 176],
  [23, 173],
  [24, 69],
  [25, 171],
  [26, 173],
  [27, 173],
]) as Theme;

export const dark_pink_Checkbox = n182 as Theme;
export const dark_pink_Switch = n182 as Theme;
export const dark_pink_TooltipContent = n182 as Theme;
export const dark_pink_SliderTrack = n182 as Theme;
const n183 = t([
  [12, 0],
  [13, 0],
  [14, 176],
  [15, 175],
  [16, 0],
  [17, 0],
  [18, 166],
  [19, 167],
  [20, 166],
  [21, 167],
  [22, 166],
  [23, 175],
  [24, 174],
  [25, 176],
  [26, 175],
  [27, 167],
]) as Theme;

export const dark_pink_SwitchThumb = n183 as Theme;
const n184 = t([
  [12, 174],
  [13, 69],
  [14, 173],
  [15, 171],
  [16, 175],
  [17, 176],
  [18, 166],
  [19, 167],
  [20, 166],
  [21, 167],
  [22, 167],
  [23, 171],
  [24, 170],
  [25, 173],
  [26, 171],
  [27, 171],
]) as Theme;

export const dark_pink_SliderTrackActive = n184 as Theme;
const n185 = t([
  [12, 176],
  [13, 175],
  [14, 174],
  [15, 69],
  [16, 0],
  [17, 237],
  [18, 166],
  [19, 167],
  [20, 166],
  [21, 167],
  [22, 236],
  [23, 69],
  [24, 173],
  [25, 174],
  [26, 69],
  [27, 169],
]) as Theme;

export const dark_pink_SliderThumb = n185 as Theme;
export const dark_pink_Tooltip = n185 as Theme;
export const dark_pink_ProgressIndicator = n185 as Theme;
const n186 = t([
  [12, 167],
  [13, 168],
  [14, 169],
  [15, 170],
  [16, 166],
  [17, 236],
  [18, 0],
  [19, 176],
  [20, 0],
  [21, 176],
  [22, 237],
  [23, 171],
  [24, 173],
  [25, 170],
  [26, 171],
  [27, 174],
]) as Theme;

export const dark_pink_Input = n186 as Theme;
export const dark_pink_TextArea = n186 as Theme;
const n187 = t([
  [12, 189],
  [13, 190],
  [14, 191],
  [15, 192],
  [16, 188],
  [17, 238],
  [18, 0],
  [19, 198],
  [20, 0],
  [21, 198],
  [22, 239],
  [23, 192],
  [24, 193],
  [25, 191],
  [26, 192],
  [27, 196],
]) as Theme;

export const dark_red_ListItem = n187 as Theme;
const n188 = t([
  [12, 190],
  [13, 191],
  [14, 192],
  [15, 193],
  [16, 189],
  [17, 188],
  [18, 0],
  [19, 198],
  [20, 0],
  [21, 198],
  [22, 0],
  [23, 193],
  [24, 195],
  [25, 192],
  [26, 193],
  [27, 93],
]) as Theme;

export const dark_red_Card = n188 as Theme;
export const dark_red_DrawerFrame = n188 as Theme;
export const dark_red_Progress = n188 as Theme;
export const dark_red_TooltipArrow = n188 as Theme;
const n189 = t([
  [12, 191],
  [13, 192],
  [14, 193],
  [15, 195],
  [16, 190],
  [17, 189],
  [18, 0],
  [19, 198],
  [20, 0],
  [21, 198],
  [22, 198],
  [23, 242],
  [24, 242],
  [25, 193],
  [26, 195],
  [27, 195],
]) as Theme;

export const dark_red_Button = n189 as Theme;
const n190 = t([
  [12, 191],
  [13, 192],
  [14, 193],
  [15, 195],
  [16, 190],
  [17, 189],
  [18, 0],
  [19, 198],
  [20, 0],
  [21, 198],
  [22, 198],
  [23, 195],
  [24, 93],
  [25, 193],
  [26, 195],
  [27, 195],
]) as Theme;

export const dark_red_Checkbox = n190 as Theme;
export const dark_red_Switch = n190 as Theme;
export const dark_red_TooltipContent = n190 as Theme;
export const dark_red_SliderTrack = n190 as Theme;
const n191 = t([
  [12, 0],
  [13, 0],
  [14, 198],
  [15, 197],
  [16, 0],
  [17, 0],
  [18, 188],
  [19, 189],
  [20, 188],
  [21, 189],
  [22, 188],
  [23, 197],
  [24, 196],
  [25, 198],
  [26, 197],
  [27, 189],
]) as Theme;

export const dark_red_SwitchThumb = n191 as Theme;
const n192 = t([
  [12, 196],
  [13, 93],
  [14, 195],
  [15, 193],
  [16, 197],
  [17, 198],
  [18, 188],
  [19, 189],
  [20, 188],
  [21, 189],
  [22, 189],
  [23, 193],
  [24, 192],
  [25, 195],
  [26, 193],
  [27, 193],
]) as Theme;

export const dark_red_SliderTrackActive = n192 as Theme;
const n193 = t([
  [12, 198],
  [13, 197],
  [14, 196],
  [15, 93],
  [16, 0],
  [17, 239],
  [18, 188],
  [19, 189],
  [20, 188],
  [21, 189],
  [22, 238],
  [23, 93],
  [24, 195],
  [25, 196],
  [26, 93],
  [27, 191],
]) as Theme;

export const dark_red_SliderThumb = n193 as Theme;
export const dark_red_Tooltip = n193 as Theme;
export const dark_red_ProgressIndicator = n193 as Theme;
const n194 = t([
  [12, 189],
  [13, 190],
  [14, 191],
  [15, 192],
  [16, 188],
  [17, 238],
  [18, 0],
  [19, 198],
  [20, 0],
  [21, 198],
  [22, 239],
  [23, 193],
  [24, 195],
  [25, 192],
  [26, 193],
  [27, 196],
]) as Theme;

export const dark_red_Input = n194 as Theme;
export const dark_red_TextArea = n194 as Theme;
const n195 = t([
  [12, 1],
  [13, 2],
  [14, 3],
  [15, 4],
  [16, 0],
  [17, 0],
  [18, 10],
  [19, 9],
  [20, 10],
  [21, 9],
  [22, 11],
  [23, 4],
  [24, 5],
  [25, 3],
  [26, 4],
  [27, 8],
]) as Theme;

export const light_alt1_ListItem = n195 as Theme;
const n196 = t([
  [12, 3],
  [13, 4],
  [14, 5],
  [15, 6],
  [16, 2],
  [17, 1],
  [18, 10],
  [19, 9],
  [20, 10],
  [21, 9],
  [22, 10],
  [23, 6],
  [24, 7],
  [25, 5],
  [26, 6],
  [27, 6],
]) as Theme;

export const light_alt1_Card = n196 as Theme;
export const light_alt1_DrawerFrame = n196 as Theme;
export const light_alt1_Progress = n196 as Theme;
export const light_alt1_TooltipArrow = n196 as Theme;
const n197 = t([
  [12, 4],
  [13, 5],
  [14, 6],
  [15, 7],
  [16, 3],
  [17, 2],
  [18, 10],
  [19, 9],
  [20, 10],
  [21, 9],
  [22, 9],
  [23, 242],
  [24, 242],
  [25, 6],
  [26, 7],
  [27, 5],
]) as Theme;

export const light_alt1_Button = n197 as Theme;
const n198 = t([
  [12, 4],
  [13, 5],
  [14, 6],
  [15, 7],
  [16, 3],
  [17, 2],
  [18, 10],
  [19, 9],
  [20, 10],
  [21, 9],
  [22, 9],
  [23, 7],
  [24, 8],
  [25, 6],
  [26, 7],
  [27, 5],
]) as Theme;

export const light_alt1_Checkbox = n198 as Theme;
export const light_alt1_Switch = n198 as Theme;
export const light_alt1_TooltipContent = n198 as Theme;
export const light_alt1_SliderTrack = n198 as Theme;
const n199 = t([
  [12, 11],
  [13, 10],
  [14, 9],
  [15, 8],
  [16, 11],
  [17, 11],
  [18, 1],
  [19, 2],
  [20, 1],
  [21, 2],
  [22, 0],
  [23, 8],
  [24, 7],
  [25, 9],
  [26, 8],
  [27, 2],
]) as Theme;

export const light_alt1_SwitchThumb = n199 as Theme;
const n200 = t([
  [12, 7],
  [13, 6],
  [14, 5],
  [15, 4],
  [16, 8],
  [17, 9],
  [18, 1],
  [19, 2],
  [20, 1],
  [21, 2],
  [22, 2],
  [23, 4],
  [24, 3],
  [25, 5],
  [26, 4],
  [27, 6],
]) as Theme;

export const light_alt1_SliderTrackActive = n200 as Theme;
const n201 = t([
  [12, 9],
  [13, 8],
  [14, 7],
  [15, 6],
  [16, 10],
  [17, 11],
  [18, 1],
  [19, 2],
  [20, 1],
  [21, 2],
  [22, 0],
  [23, 6],
  [24, 5],
  [25, 7],
  [26, 6],
  [27, 4],
]) as Theme;

export const light_alt1_SliderThumb = n201 as Theme;
export const light_alt1_Tooltip = n201 as Theme;
export const light_alt1_ProgressIndicator = n201 as Theme;
const n202 = t([
  [12, 1],
  [13, 2],
  [14, 3],
  [15, 4],
  [16, 0],
  [17, 0],
  [18, 10],
  [19, 9],
  [20, 10],
  [21, 9],
  [22, 11],
  [23, 6],
  [24, 7],
  [25, 5],
  [26, 6],
  [27, 8],
]) as Theme;

export const light_alt1_Input = n202 as Theme;
export const light_alt1_TextArea = n202 as Theme;
const n203 = t([
  [12, 2],
  [13, 3],
  [14, 4],
  [15, 5],
  [16, 1],
  [17, 0],
  [18, 9],
  [19, 8],
  [20, 9],
  [21, 8],
  [22, 11],
  [23, 5],
  [24, 6],
  [25, 4],
  [26, 5],
  [27, 7],
]) as Theme;

export const light_alt2_ListItem = n203 as Theme;
const n204 = t([
  [12, 4],
  [13, 5],
  [14, 6],
  [15, 7],
  [16, 3],
  [17, 2],
  [18, 9],
  [19, 8],
  [20, 9],
  [21, 8],
  [22, 9],
  [23, 7],
  [24, 8],
  [25, 6],
  [26, 7],
  [27, 5],
]) as Theme;

export const light_alt2_Card = n204 as Theme;
export const light_alt2_DrawerFrame = n204 as Theme;
export const light_alt2_Progress = n204 as Theme;
export const light_alt2_TooltipArrow = n204 as Theme;
const n205 = t([
  [12, 5],
  [13, 6],
  [14, 7],
  [15, 8],
  [16, 4],
  [17, 3],
  [18, 9],
  [19, 8],
  [20, 9],
  [21, 8],
  [22, 8],
  [23, 242],
  [24, 242],
  [25, 7],
  [26, 8],
  [27, 4],
]) as Theme;

export const light_alt2_Button = n205 as Theme;
const n206 = t([
  [12, 5],
  [13, 6],
  [14, 7],
  [15, 8],
  [16, 4],
  [17, 3],
  [18, 9],
  [19, 8],
  [20, 9],
  [21, 8],
  [22, 8],
  [23, 8],
  [24, 9],
  [25, 7],
  [26, 8],
  [27, 4],
]) as Theme;

export const light_alt2_Checkbox = n206 as Theme;
export const light_alt2_Switch = n206 as Theme;
export const light_alt2_TooltipContent = n206 as Theme;
export const light_alt2_SliderTrack = n206 as Theme;
const n207 = t([
  [12, 10],
  [13, 9],
  [14, 8],
  [15, 7],
  [16, 11],
  [17, 11],
  [18, 2],
  [19, 3],
  [20, 2],
  [21, 3],
  [22, 0],
  [23, 7],
  [24, 6],
  [25, 8],
  [26, 7],
  [27, 3],
]) as Theme;

export const light_alt2_SwitchThumb = n207 as Theme;
const n208 = t([
  [12, 6],
  [13, 5],
  [14, 4],
  [15, 3],
  [16, 7],
  [17, 8],
  [18, 2],
  [19, 3],
  [20, 2],
  [21, 3],
  [22, 3],
  [23, 3],
  [24, 2],
  [25, 4],
  [26, 3],
  [27, 7],
]) as Theme;

export const light_alt2_SliderTrackActive = n208 as Theme;
const n209 = t([
  [12, 8],
  [13, 7],
  [14, 6],
  [15, 5],
  [16, 9],
  [17, 10],
  [18, 2],
  [19, 3],
  [20, 2],
  [21, 3],
  [22, 1],
  [23, 5],
  [24, 4],
  [25, 6],
  [26, 5],
  [27, 5],
]) as Theme;

export const light_alt2_SliderThumb = n209 as Theme;
export const light_alt2_Tooltip = n209 as Theme;
export const light_alt2_ProgressIndicator = n209 as Theme;
const n210 = t([
  [12, 2],
  [13, 3],
  [14, 4],
  [15, 5],
  [16, 1],
  [17, 0],
  [18, 9],
  [19, 8],
  [20, 9],
  [21, 8],
  [22, 11],
  [23, 7],
  [24, 8],
  [25, 6],
  [26, 7],
  [27, 7],
]) as Theme;

export const light_alt2_Input = n210 as Theme;
export const light_alt2_TextArea = n210 as Theme;
const n211 = t([
  [12, 3],
  [13, 4],
  [14, 5],
  [15, 6],
  [16, 2],
  [17, 1],
  [19, 7],
  [20, 8],
  [21, 7],
  [22, 10],
  [23, 6],
  [24, 7],
  [25, 5],
  [26, 6],
  [27, 6],
]) as Theme;

export const light_active_ListItem = n211 as Theme;
const n212 = t([
  [12, 5],
  [13, 6],
  [14, 7],
  [15, 8],
  [16, 4],
  [17, 3],
  [19, 7],
  [20, 8],
  [21, 7],
  [22, 8],
  [23, 8],
  [24, 9],
  [25, 7],
  [26, 8],
  [27, 4],
]) as Theme;

export const light_active_Card = n212 as Theme;
export const light_active_DrawerFrame = n212 as Theme;
export const light_active_Progress = n212 as Theme;
export const light_active_TooltipArrow = n212 as Theme;
const n213 = t([
  [12, 6],
  [13, 7],
  [14, 8],
  [15, 9],
  [16, 5],
  [17, 4],
  [19, 7],
  [20, 8],
  [21, 7],
  [22, 7],
  [23, 242],
  [24, 242],
  [25, 8],
  [26, 9],
  [27, 3],
]) as Theme;

export const light_active_Button = n213 as Theme;
const n214 = t([
  [12, 6],
  [13, 7],
  [14, 8],
  [15, 9],
  [16, 5],
  [17, 4],
  [19, 7],
  [20, 8],
  [21, 7],
  [22, 7],
  [23, 9],
  [24, 10],
  [25, 8],
  [26, 9],
  [27, 3],
]) as Theme;

export const light_active_Checkbox = n214 as Theme;
export const light_active_Switch = n214 as Theme;
export const light_active_TooltipContent = n214 as Theme;
export const light_active_SliderTrack = n214 as Theme;
const n215 = t([
  [12, 9],
  [13, 8],
  [14, 7],
  [15, 6],
  [16, 10],
  [17, 11],
  [19, 4],
  [20, 3],
  [21, 4],
  [22, 0],
  [23, 6],
  [24, 5],
  [25, 7],
  [26, 6],
  [27, 4],
]) as Theme;

export const light_active_SwitchThumb = n215 as Theme;
const n216 = t([
  [12, 5],
  [13, 4],
  [14, 3],
  [15, 2],
  [16, 6],
  [17, 7],
  [19, 4],
  [20, 3],
  [21, 4],
  [22, 4],
  [23, 2],
  [24, 1],
  [25, 3],
  [26, 2],
  [27, 8],
]) as Theme;

export const light_active_SliderTrackActive = n216 as Theme;
const n217 = t([
  [12, 7],
  [13, 6],
  [14, 5],
  [15, 4],
  [16, 8],
  [17, 9],
  [19, 4],
  [20, 3],
  [21, 4],
  [22, 2],
  [23, 4],
  [24, 3],
  [25, 5],
  [26, 4],
  [27, 6],
]) as Theme;

export const light_active_SliderThumb = n217 as Theme;
export const light_active_Tooltip = n217 as Theme;
export const light_active_ProgressIndicator = n217 as Theme;
const n218 = t([
  [12, 3],
  [13, 4],
  [14, 5],
  [15, 6],
  [16, 2],
  [17, 1],
  [19, 7],
  [20, 8],
  [21, 7],
  [22, 10],
  [23, 8],
  [24, 9],
  [25, 7],
  [26, 8],
  [27, 6],
]) as Theme;

export const light_active_Input = n218 as Theme;
export const light_active_TextArea = n218 as Theme;
const n219 = t([
  [12, 113],
  [13, 114],
  [14, 115],
  [15, 116],
  [16, 112],
  [17, 111],
  [18, 121],
  [19, 120],
  [20, 121],
  [21, 120],
  [22, 0],
  [23, 116],
  [24, 117],
  [25, 115],
  [26, 116],
  [27, 118],
]) as Theme;

export const dark_alt1_ListItem = n219 as Theme;
const n220 = t([
  [12, 114],
  [13, 115],
  [14, 116],
  [15, 117],
  [16, 113],
  [17, 112],
  [18, 121],
  [19, 120],
  [20, 121],
  [21, 120],
  [22, 121],
  [23, 117],
  [24, 118],
  [25, 116],
  [26, 117],
  [27, 117],
]) as Theme;

export const dark_alt1_Card = n220 as Theme;
export const dark_alt1_DrawerFrame = n220 as Theme;
export const dark_alt1_Progress = n220 as Theme;
export const dark_alt1_TooltipArrow = n220 as Theme;
const n221 = t([
  [12, 115],
  [13, 116],
  [14, 117],
  [15, 118],
  [16, 114],
  [17, 113],
  [18, 121],
  [19, 120],
  [20, 121],
  [21, 120],
  [22, 120],
  [23, 242],
  [24, 242],
  [25, 117],
  [26, 118],
  [27, 116],
]) as Theme;

export const dark_alt1_Button = n221 as Theme;
const n222 = t([
  [12, 115],
  [13, 116],
  [14, 117],
  [15, 118],
  [16, 114],
  [17, 113],
  [18, 121],
  [19, 120],
  [20, 121],
  [21, 120],
  [22, 120],
  [23, 118],
  [24, 119],
  [25, 117],
  [26, 118],
  [27, 116],
]) as Theme;

export const dark_alt1_Checkbox = n222 as Theme;
export const dark_alt1_Switch = n222 as Theme;
export const dark_alt1_TooltipContent = n222 as Theme;
export const dark_alt1_SliderTrack = n222 as Theme;
const n223 = t([
  [12, 0],
  [13, 121],
  [14, 120],
  [15, 119],
  [16, 0],
  [17, 0],
  [18, 112],
  [19, 113],
  [20, 112],
  [21, 113],
  [22, 111],
  [23, 119],
  [24, 118],
  [25, 120],
  [26, 119],
  [27, 113],
]) as Theme;

export const dark_alt1_SwitchThumb = n223 as Theme;
const n224 = t([
  [12, 118],
  [13, 117],
  [14, 116],
  [15, 115],
  [16, 119],
  [17, 120],
  [18, 112],
  [19, 113],
  [20, 112],
  [21, 113],
  [22, 113],
  [23, 115],
  [24, 114],
  [25, 116],
  [26, 115],
  [27, 117],
]) as Theme;

export const dark_alt1_SliderTrackActive = n224 as Theme;
const n225 = t([
  [12, 120],
  [13, 119],
  [14, 118],
  [15, 117],
  [16, 121],
  [17, 0],
  [18, 112],
  [19, 113],
  [20, 112],
  [21, 113],
  [22, 111],
  [23, 117],
  [24, 116],
  [25, 118],
  [26, 117],
  [27, 115],
]) as Theme;

export const dark_alt1_SliderThumb = n225 as Theme;
export const dark_alt1_Tooltip = n225 as Theme;
export const dark_alt1_ProgressIndicator = n225 as Theme;
const n226 = t([
  [12, 113],
  [13, 114],
  [14, 115],
  [15, 116],
  [16, 112],
  [17, 111],
  [18, 121],
  [19, 120],
  [20, 121],
  [21, 120],
  [22, 0],
  [23, 117],
  [24, 118],
  [25, 116],
  [26, 117],
  [27, 118],
]) as Theme;

export const dark_alt1_Input = n226 as Theme;
export const dark_alt1_TextArea = n226 as Theme;
const n227 = t([
  [12, 114],
  [13, 115],
  [14, 116],
  [15, 117],
  [16, 113],
  [17, 112],
  [18, 120],
  [19, 119],
  [20, 120],
  [21, 119],
  [22, 121],
  [23, 117],
  [24, 118],
  [25, 116],
  [26, 117],
  [27, 117],
]) as Theme;

export const dark_alt2_ListItem = n227 as Theme;
const n228 = t([
  [12, 115],
  [13, 116],
  [14, 117],
  [15, 118],
  [16, 114],
  [17, 113],
  [18, 120],
  [19, 119],
  [20, 120],
  [21, 119],
  [22, 120],
  [23, 118],
  [24, 119],
  [25, 117],
  [26, 118],
  [27, 116],
]) as Theme;

export const dark_alt2_Card = n228 as Theme;
export const dark_alt2_DrawerFrame = n228 as Theme;
export const dark_alt2_Progress = n228 as Theme;
export const dark_alt2_TooltipArrow = n228 as Theme;
const n229 = t([
  [12, 116],
  [13, 117],
  [14, 118],
  [15, 119],
  [16, 115],
  [17, 114],
  [18, 120],
  [19, 119],
  [20, 120],
  [21, 119],
  [22, 119],
  [23, 242],
  [24, 242],
  [25, 118],
  [26, 119],
  [27, 115],
]) as Theme;

export const dark_alt2_Button = n229 as Theme;
const n230 = t([
  [12, 116],
  [13, 117],
  [14, 118],
  [15, 119],
  [16, 115],
  [17, 114],
  [18, 120],
  [19, 119],
  [20, 120],
  [21, 119],
  [22, 119],
  [23, 119],
  [24, 120],
  [25, 118],
  [26, 119],
  [27, 115],
]) as Theme;

export const dark_alt2_Checkbox = n230 as Theme;
export const dark_alt2_Switch = n230 as Theme;
export const dark_alt2_TooltipContent = n230 as Theme;
export const dark_alt2_SliderTrack = n230 as Theme;
const n231 = t([
  [12, 121],
  [13, 120],
  [14, 119],
  [15, 118],
  [16, 0],
  [17, 0],
  [18, 113],
  [19, 114],
  [20, 113],
  [21, 114],
  [22, 111],
  [23, 118],
  [24, 117],
  [25, 119],
  [26, 118],
  [27, 114],
]) as Theme;

export const dark_alt2_SwitchThumb = n231 as Theme;
const n232 = t([
  [12, 117],
  [13, 116],
  [14, 115],
  [15, 114],
  [16, 118],
  [17, 119],
  [18, 113],
  [19, 114],
  [20, 113],
  [21, 114],
  [22, 114],
  [23, 114],
  [24, 113],
  [25, 115],
  [26, 114],
  [27, 118],
]) as Theme;

export const dark_alt2_SliderTrackActive = n232 as Theme;
const n233 = t([
  [12, 119],
  [13, 118],
  [14, 117],
  [15, 116],
  [16, 120],
  [17, 121],
  [18, 113],
  [19, 114],
  [20, 113],
  [21, 114],
  [22, 112],
  [23, 116],
  [24, 115],
  [25, 117],
  [26, 116],
  [27, 116],
]) as Theme;

export const dark_alt2_SliderThumb = n233 as Theme;
export const dark_alt2_Tooltip = n233 as Theme;
export const dark_alt2_ProgressIndicator = n233 as Theme;
const n234 = t([
  [12, 114],
  [13, 115],
  [14, 116],
  [15, 117],
  [16, 113],
  [17, 112],
  [18, 120],
  [19, 119],
  [20, 120],
  [21, 119],
  [22, 121],
  [23, 118],
  [24, 119],
  [25, 117],
  [26, 118],
  [27, 117],
]) as Theme;

export const dark_alt2_Input = n234 as Theme;
export const dark_alt2_TextArea = n234 as Theme;
const n235 = t([
  [12, 115],
  [13, 116],
  [14, 117],
  [15, 118],
  [16, 114],
  [17, 113],
  [19, 118],
  [20, 119],
  [21, 118],
  [22, 120],
  [23, 118],
  [24, 119],
  [25, 117],
  [26, 118],
  [27, 116],
]) as Theme;

export const dark_active_ListItem = n235 as Theme;
const n236 = t([
  [12, 116],
  [13, 117],
  [14, 118],
  [15, 119],
  [16, 115],
  [17, 114],
  [19, 118],
  [20, 119],
  [21, 118],
  [22, 119],
  [23, 119],
  [24, 120],
  [25, 118],
  [26, 119],
  [27, 115],
]) as Theme;

export const dark_active_Card = n236 as Theme;
export const dark_active_DrawerFrame = n236 as Theme;
export const dark_active_Progress = n236 as Theme;
export const dark_active_TooltipArrow = n236 as Theme;
const n237 = t([
  [12, 117],
  [13, 118],
  [14, 119],
  [15, 120],
  [16, 116],
  [17, 115],
  [19, 118],
  [20, 119],
  [21, 118],
  [22, 118],
  [23, 242],
  [24, 242],
  [25, 119],
  [26, 120],
  [27, 114],
]) as Theme;

export const dark_active_Button = n237 as Theme;
const n238 = t([
  [12, 117],
  [13, 118],
  [14, 119],
  [15, 120],
  [16, 116],
  [17, 115],
  [19, 118],
  [20, 119],
  [21, 118],
  [22, 118],
  [23, 120],
  [24, 121],
  [25, 119],
  [26, 120],
  [27, 114],
]) as Theme;

export const dark_active_Checkbox = n238 as Theme;
export const dark_active_Switch = n238 as Theme;
export const dark_active_TooltipContent = n238 as Theme;
export const dark_active_SliderTrack = n238 as Theme;
const n239 = t([
  [12, 120],
  [13, 119],
  [14, 118],
  [15, 117],
  [16, 121],
  [17, 0],
  [19, 115],
  [20, 114],
  [21, 115],
  [22, 111],
  [23, 117],
  [24, 116],
  [25, 118],
  [26, 117],
  [27, 115],
]) as Theme;

export const dark_active_SwitchThumb = n239 as Theme;
const n240 = t([
  [12, 116],
  [13, 115],
  [14, 114],
  [15, 113],
  [16, 117],
  [17, 118],
  [19, 115],
  [20, 114],
  [21, 115],
  [22, 115],
  [23, 113],
  [24, 112],
  [25, 114],
  [26, 113],
  [27, 119],
]) as Theme;

export const dark_active_SliderTrackActive = n240 as Theme;
const n241 = t([
  [12, 118],
  [13, 117],
  [14, 116],
  [15, 115],
  [16, 119],
  [17, 120],
  [19, 115],
  [20, 114],
  [21, 115],
  [22, 113],
  [23, 115],
  [24, 114],
  [25, 116],
  [26, 115],
  [27, 117],
]) as Theme;

export const dark_active_SliderThumb = n241 as Theme;
export const dark_active_Tooltip = n241 as Theme;
export const dark_active_ProgressIndicator = n241 as Theme;
const n242 = t([
  [12, 115],
  [13, 116],
  [14, 117],
  [15, 118],
  [16, 114],
  [17, 113],
  [19, 118],
  [20, 119],
  [21, 118],
  [22, 120],
  [23, 119],
  [24, 120],
  [25, 118],
  [26, 119],
  [27, 116],
]) as Theme;

export const dark_active_Input = n242 as Theme;
export const dark_active_TextArea = n242 as Theme;
const n243 = t([
  [12, 50],
  [13, 51],
  [14, 52],
  [15, 53],
  [16, 49],
  [17, 49],
  [18, 60],
  [19, 59],
  [20, 60],
  [21, 59],
  [22, 11],
  [23, 52],
  [24, 53],
  [25, 52],
  [26, 52],
  [27, 58],
]) as Theme;

export const light_orange_alt1_ListItem = n243 as Theme;
const n244 = t([
  [12, 52],
  [13, 53],
  [14, 54],
  [15, 56],
  [16, 51],
  [17, 50],
  [18, 60],
  [19, 59],
  [20, 60],
  [21, 59],
  [22, 60],
  [23, 54],
  [24, 56],
  [25, 54],
  [26, 54],
  [27, 56],
]) as Theme;

export const light_orange_alt1_Card = n244 as Theme;
export const light_orange_alt1_DrawerFrame = n244 as Theme;
export const light_orange_alt1_Progress = n244 as Theme;
export const light_orange_alt1_TooltipArrow = n244 as Theme;
const n245 = t([
  [12, 53],
  [13, 54],
  [14, 56],
  [15, 57],
  [16, 52],
  [17, 51],
  [18, 60],
  [19, 59],
  [20, 60],
  [21, 59],
  [22, 59],
  [23, 242],
  [24, 242],
  [25, 56],
  [26, 56],
  [27, 54],
]) as Theme;

export const light_orange_alt1_Button = n245 as Theme;
const n246 = t([
  [12, 53],
  [13, 54],
  [14, 56],
  [15, 57],
  [16, 52],
  [17, 51],
  [18, 60],
  [19, 59],
  [20, 60],
  [21, 59],
  [22, 59],
  [23, 56],
  [24, 57],
  [25, 56],
  [26, 56],
  [27, 54],
]) as Theme;

export const light_orange_alt1_Checkbox = n246 as Theme;
export const light_orange_alt1_Switch = n246 as Theme;
export const light_orange_alt1_TooltipContent = n246 as Theme;
export const light_orange_alt1_SliderTrack = n246 as Theme;
const n247 = t([
  [12, 11],
  [13, 60],
  [14, 59],
  [15, 58],
  [16, 11],
  [17, 11],
  [18, 50],
  [19, 51],
  [20, 50],
  [21, 51],
  [22, 49],
  [23, 59],
  [24, 58],
  [25, 59],
  [26, 59],
  [27, 51],
]) as Theme;

export const light_orange_alt1_SwitchThumb = n247 as Theme;
const n248 = t([
  [12, 57],
  [13, 56],
  [14, 54],
  [15, 53],
  [16, 58],
  [17, 59],
  [18, 50],
  [19, 51],
  [20, 50],
  [21, 51],
  [22, 51],
  [23, 54],
  [24, 53],
  [25, 54],
  [26, 54],
  [27, 56],
]) as Theme;

export const light_orange_alt1_SliderTrackActive = n248 as Theme;
const n249 = t([
  [12, 59],
  [13, 58],
  [14, 57],
  [15, 56],
  [16, 60],
  [17, 11],
  [18, 50],
  [19, 51],
  [20, 50],
  [21, 51],
  [22, 49],
  [23, 57],
  [24, 56],
  [25, 57],
  [26, 57],
  [27, 53],
]) as Theme;

export const light_orange_alt1_SliderThumb = n249 as Theme;
export const light_orange_alt1_Tooltip = n249 as Theme;
export const light_orange_alt1_ProgressIndicator = n249 as Theme;
const n250 = t([
  [12, 50],
  [13, 51],
  [14, 52],
  [15, 53],
  [16, 49],
  [17, 49],
  [18, 60],
  [19, 59],
  [20, 60],
  [21, 59],
  [22, 11],
  [23, 54],
  [24, 56],
  [25, 54],
  [26, 54],
  [27, 58],
]) as Theme;

export const light_orange_alt1_Input = n250 as Theme;
export const light_orange_alt1_TextArea = n250 as Theme;
const n251 = t([
  [12, 51],
  [13, 52],
  [14, 53],
  [15, 54],
  [16, 50],
  [17, 49],
  [18, 59],
  [19, 58],
  [20, 59],
  [21, 58],
  [22, 11],
  [23, 53],
  [24, 54],
  [25, 53],
  [26, 53],
  [27, 57],
]) as Theme;

export const light_orange_alt2_ListItem = n251 as Theme;
const n252 = t([
  [12, 53],
  [13, 54],
  [14, 56],
  [15, 57],
  [16, 52],
  [17, 51],
  [18, 59],
  [19, 58],
  [20, 59],
  [21, 58],
  [22, 59],
  [23, 56],
  [24, 57],
  [25, 56],
  [26, 56],
  [27, 54],
]) as Theme;

export const light_orange_alt2_Card = n252 as Theme;
export const light_orange_alt2_DrawerFrame = n252 as Theme;
export const light_orange_alt2_Progress = n252 as Theme;
export const light_orange_alt2_TooltipArrow = n252 as Theme;
const n253 = t([
  [12, 54],
  [13, 56],
  [14, 57],
  [15, 58],
  [16, 53],
  [17, 52],
  [18, 59],
  [19, 58],
  [20, 59],
  [21, 58],
  [22, 58],
  [23, 242],
  [24, 242],
  [25, 57],
  [26, 57],
  [27, 53],
]) as Theme;

export const light_orange_alt2_Button = n253 as Theme;
const n254 = t([
  [12, 54],
  [13, 56],
  [14, 57],
  [15, 58],
  [16, 53],
  [17, 52],
  [18, 59],
  [19, 58],
  [20, 59],
  [21, 58],
  [22, 58],
  [23, 57],
  [24, 58],
  [25, 57],
  [26, 57],
  [27, 53],
]) as Theme;

export const light_orange_alt2_Checkbox = n254 as Theme;
export const light_orange_alt2_Switch = n254 as Theme;
export const light_orange_alt2_TooltipContent = n254 as Theme;
export const light_orange_alt2_SliderTrack = n254 as Theme;
const n255 = t([
  [12, 60],
  [13, 59],
  [14, 58],
  [15, 57],
  [16, 11],
  [17, 11],
  [18, 51],
  [19, 52],
  [20, 51],
  [21, 52],
  [22, 49],
  [23, 58],
  [24, 57],
  [25, 58],
  [26, 58],
  [27, 52],
]) as Theme;

export const light_orange_alt2_SwitchThumb = n255 as Theme;
const n256 = t([
  [12, 56],
  [13, 54],
  [14, 53],
  [15, 52],
  [16, 57],
  [17, 58],
  [18, 51],
  [19, 52],
  [20, 51],
  [21, 52],
  [22, 52],
  [23, 53],
  [24, 52],
  [25, 53],
  [26, 53],
  [27, 57],
]) as Theme;

export const light_orange_alt2_SliderTrackActive = n256 as Theme;
const n257 = t([
  [12, 58],
  [13, 57],
  [14, 56],
  [15, 54],
  [16, 59],
  [17, 60],
  [18, 51],
  [19, 52],
  [20, 51],
  [21, 52],
  [22, 50],
  [23, 56],
  [24, 54],
  [25, 56],
  [26, 56],
  [27, 54],
]) as Theme;

export const light_orange_alt2_SliderThumb = n257 as Theme;
export const light_orange_alt2_Tooltip = n257 as Theme;
export const light_orange_alt2_ProgressIndicator = n257 as Theme;
const n258 = t([
  [12, 51],
  [13, 52],
  [14, 53],
  [15, 54],
  [16, 50],
  [17, 49],
  [18, 59],
  [19, 58],
  [20, 59],
  [21, 58],
  [22, 11],
  [23, 56],
  [24, 57],
  [25, 56],
  [26, 56],
  [27, 57],
]) as Theme;

export const light_orange_alt2_Input = n258 as Theme;
export const light_orange_alt2_TextArea = n258 as Theme;
const n259 = t([
  [12, 52],
  [13, 53],
  [14, 54],
  [15, 56],
  [16, 51],
  [17, 50],
  [19, 57],
  [20, 58],
  [21, 57],
  [22, 60],
  [23, 54],
  [24, 56],
  [25, 54],
  [26, 54],
  [27, 56],
]) as Theme;

export const light_orange_active_ListItem = n259 as Theme;
const n260 = t([
  [12, 54],
  [13, 56],
  [14, 57],
  [15, 58],
  [16, 53],
  [17, 52],
  [19, 57],
  [20, 58],
  [21, 57],
  [22, 58],
  [23, 57],
  [24, 58],
  [25, 57],
  [26, 57],
  [27, 53],
]) as Theme;

export const light_orange_active_Card = n260 as Theme;
export const light_orange_active_DrawerFrame = n260 as Theme;
export const light_orange_active_Progress = n260 as Theme;
export const light_orange_active_TooltipArrow = n260 as Theme;
const n261 = t([
  [12, 56],
  [13, 57],
  [14, 58],
  [15, 59],
  [16, 54],
  [17, 53],
  [19, 57],
  [20, 58],
  [21, 57],
  [22, 57],
  [23, 242],
  [24, 242],
  [25, 58],
  [26, 58],
  [27, 52],
]) as Theme;

export const light_orange_active_Button = n261 as Theme;
const n262 = t([
  [12, 56],
  [13, 57],
  [14, 58],
  [15, 59],
  [16, 54],
  [17, 53],
  [19, 57],
  [20, 58],
  [21, 57],
  [22, 57],
  [23, 58],
  [24, 59],
  [25, 58],
  [26, 58],
  [27, 52],
]) as Theme;

export const light_orange_active_Checkbox = n262 as Theme;
export const light_orange_active_Switch = n262 as Theme;
export const light_orange_active_TooltipContent = n262 as Theme;
export const light_orange_active_SliderTrack = n262 as Theme;
const n263 = t([
  [12, 59],
  [13, 58],
  [14, 57],
  [15, 56],
  [16, 60],
  [17, 11],
  [19, 53],
  [20, 52],
  [21, 53],
  [22, 49],
  [23, 57],
  [24, 56],
  [25, 57],
  [26, 57],
  [27, 53],
]) as Theme;

export const light_orange_active_SwitchThumb = n263 as Theme;
const n264 = t([
  [12, 54],
  [13, 53],
  [14, 52],
  [15, 51],
  [16, 56],
  [17, 57],
  [19, 53],
  [20, 52],
  [21, 53],
  [22, 53],
  [23, 52],
  [24, 51],
  [25, 52],
  [26, 52],
  [27, 58],
]) as Theme;

export const light_orange_active_SliderTrackActive = n264 as Theme;
const n265 = t([
  [12, 57],
  [13, 56],
  [14, 54],
  [15, 53],
  [16, 58],
  [17, 59],
  [19, 53],
  [20, 52],
  [21, 53],
  [22, 51],
  [23, 54],
  [24, 53],
  [25, 54],
  [26, 54],
  [27, 56],
]) as Theme;

export const light_orange_active_SliderThumb = n265 as Theme;
export const light_orange_active_Tooltip = n265 as Theme;
export const light_orange_active_ProgressIndicator = n265 as Theme;
const n266 = t([
  [12, 52],
  [13, 53],
  [14, 54],
  [15, 56],
  [16, 51],
  [17, 50],
  [19, 57],
  [20, 58],
  [21, 57],
  [22, 60],
  [23, 57],
  [24, 58],
  [25, 57],
  [26, 57],
  [27, 56],
]) as Theme;

export const light_orange_active_Input = n266 as Theme;
export const light_orange_active_TextArea = n266 as Theme;
const n267 = t([
  [12, 98],
  [13, 99],
  [14, 100],
  [15, 101],
  [16, 97],
  [17, 97],
  [18, 108],
  [19, 107],
  [20, 108],
  [21, 107],
  [22, 11],
  [23, 100],
  [24, 101],
  [25, 100],
  [26, 100],
  [27, 106],
]) as Theme;

export const light_yellow_alt1_ListItem = n267 as Theme;
const n268 = t([
  [12, 100],
  [13, 101],
  [14, 102],
  [15, 104],
  [16, 99],
  [17, 98],
  [18, 108],
  [19, 107],
  [20, 108],
  [21, 107],
  [22, 108],
  [23, 102],
  [24, 104],
  [25, 102],
  [26, 102],
  [27, 104],
]) as Theme;

export const light_yellow_alt1_Card = n268 as Theme;
export const light_yellow_alt1_DrawerFrame = n268 as Theme;
export const light_yellow_alt1_Progress = n268 as Theme;
export const light_yellow_alt1_TooltipArrow = n268 as Theme;
const n269 = t([
  [12, 101],
  [13, 102],
  [14, 104],
  [15, 105],
  [16, 100],
  [17, 99],
  [18, 108],
  [19, 107],
  [20, 108],
  [21, 107],
  [22, 107],
  [23, 242],
  [24, 242],
  [25, 104],
  [26, 104],
  [27, 102],
]) as Theme;

export const light_yellow_alt1_Button = n269 as Theme;
const n270 = t([
  [12, 101],
  [13, 102],
  [14, 104],
  [15, 105],
  [16, 100],
  [17, 99],
  [18, 108],
  [19, 107],
  [20, 108],
  [21, 107],
  [22, 107],
  [23, 104],
  [24, 105],
  [25, 104],
  [26, 104],
  [27, 102],
]) as Theme;

export const light_yellow_alt1_Checkbox = n270 as Theme;
export const light_yellow_alt1_Switch = n270 as Theme;
export const light_yellow_alt1_TooltipContent = n270 as Theme;
export const light_yellow_alt1_SliderTrack = n270 as Theme;
const n271 = t([
  [12, 11],
  [13, 108],
  [14, 107],
  [15, 106],
  [16, 11],
  [17, 11],
  [18, 98],
  [19, 99],
  [20, 98],
  [21, 99],
  [22, 97],
  [23, 107],
  [24, 106],
  [25, 107],
  [26, 107],
  [27, 99],
]) as Theme;

export const light_yellow_alt1_SwitchThumb = n271 as Theme;
const n272 = t([
  [12, 105],
  [13, 104],
  [14, 102],
  [15, 101],
  [16, 106],
  [17, 107],
  [18, 98],
  [19, 99],
  [20, 98],
  [21, 99],
  [22, 99],
  [23, 102],
  [24, 101],
  [25, 102],
  [26, 102],
  [27, 104],
]) as Theme;

export const light_yellow_alt1_SliderTrackActive = n272 as Theme;
const n273 = t([
  [12, 107],
  [13, 106],
  [14, 105],
  [15, 104],
  [16, 108],
  [17, 11],
  [18, 98],
  [19, 99],
  [20, 98],
  [21, 99],
  [22, 97],
  [23, 105],
  [24, 104],
  [25, 105],
  [26, 105],
  [27, 101],
]) as Theme;

export const light_yellow_alt1_SliderThumb = n273 as Theme;
export const light_yellow_alt1_Tooltip = n273 as Theme;
export const light_yellow_alt1_ProgressIndicator = n273 as Theme;
const n274 = t([
  [12, 98],
  [13, 99],
  [14, 100],
  [15, 101],
  [16, 97],
  [17, 97],
  [18, 108],
  [19, 107],
  [20, 108],
  [21, 107],
  [22, 11],
  [23, 102],
  [24, 104],
  [25, 102],
  [26, 102],
  [27, 106],
]) as Theme;

export const light_yellow_alt1_Input = n274 as Theme;
export const light_yellow_alt1_TextArea = n274 as Theme;
const n275 = t([
  [12, 99],
  [13, 100],
  [14, 101],
  [15, 102],
  [16, 98],
  [17, 97],
  [18, 107],
  [19, 106],
  [20, 107],
  [21, 106],
  [22, 11],
  [23, 101],
  [24, 102],
  [25, 101],
  [26, 101],
  [27, 105],
]) as Theme;

export const light_yellow_alt2_ListItem = n275 as Theme;
const n276 = t([
  [12, 101],
  [13, 102],
  [14, 104],
  [15, 105],
  [16, 100],
  [17, 99],
  [18, 107],
  [19, 106],
  [20, 107],
  [21, 106],
  [22, 107],
  [23, 104],
  [24, 105],
  [25, 104],
  [26, 104],
  [27, 102],
]) as Theme;

export const light_yellow_alt2_Card = n276 as Theme;
export const light_yellow_alt2_DrawerFrame = n276 as Theme;
export const light_yellow_alt2_Progress = n276 as Theme;
export const light_yellow_alt2_TooltipArrow = n276 as Theme;
const n277 = t([
  [12, 102],
  [13, 104],
  [14, 105],
  [15, 106],
  [16, 101],
  [17, 100],
  [18, 107],
  [19, 106],
  [20, 107],
  [21, 106],
  [22, 106],
  [23, 242],
  [24, 242],
  [25, 105],
  [26, 105],
  [27, 101],
]) as Theme;

export const light_yellow_alt2_Button = n277 as Theme;
const n278 = t([
  [12, 102],
  [13, 104],
  [14, 105],
  [15, 106],
  [16, 101],
  [17, 100],
  [18, 107],
  [19, 106],
  [20, 107],
  [21, 106],
  [22, 106],
  [23, 105],
  [24, 106],
  [25, 105],
  [26, 105],
  [27, 101],
]) as Theme;

export const light_yellow_alt2_Checkbox = n278 as Theme;
export const light_yellow_alt2_Switch = n278 as Theme;
export const light_yellow_alt2_TooltipContent = n278 as Theme;
export const light_yellow_alt2_SliderTrack = n278 as Theme;
const n279 = t([
  [12, 108],
  [13, 107],
  [14, 106],
  [15, 105],
  [16, 11],
  [17, 11],
  [18, 99],
  [19, 100],
  [20, 99],
  [21, 100],
  [22, 97],
  [23, 106],
  [24, 105],
  [25, 106],
  [26, 106],
  [27, 100],
]) as Theme;

export const light_yellow_alt2_SwitchThumb = n279 as Theme;
const n280 = t([
  [12, 104],
  [13, 102],
  [14, 101],
  [15, 100],
  [16, 105],
  [17, 106],
  [18, 99],
  [19, 100],
  [20, 99],
  [21, 100],
  [22, 100],
  [23, 101],
  [24, 100],
  [25, 101],
  [26, 101],
  [27, 105],
]) as Theme;

export const light_yellow_alt2_SliderTrackActive = n280 as Theme;
const n281 = t([
  [12, 106],
  [13, 105],
  [14, 104],
  [15, 102],
  [16, 107],
  [17, 108],
  [18, 99],
  [19, 100],
  [20, 99],
  [21, 100],
  [22, 98],
  [23, 104],
  [24, 102],
  [25, 104],
  [26, 104],
  [27, 102],
]) as Theme;

export const light_yellow_alt2_SliderThumb = n281 as Theme;
export const light_yellow_alt2_Tooltip = n281 as Theme;
export const light_yellow_alt2_ProgressIndicator = n281 as Theme;
const n282 = t([
  [12, 99],
  [13, 100],
  [14, 101],
  [15, 102],
  [16, 98],
  [17, 97],
  [18, 107],
  [19, 106],
  [20, 107],
  [21, 106],
  [22, 11],
  [23, 104],
  [24, 105],
  [25, 104],
  [26, 104],
  [27, 105],
]) as Theme;

export const light_yellow_alt2_Input = n282 as Theme;
export const light_yellow_alt2_TextArea = n282 as Theme;
const n283 = t([
  [12, 100],
  [13, 101],
  [14, 102],
  [15, 104],
  [16, 99],
  [17, 98],
  [19, 105],
  [20, 106],
  [21, 105],
  [22, 108],
  [23, 102],
  [24, 104],
  [25, 102],
  [26, 102],
  [27, 104],
]) as Theme;

export const light_yellow_active_ListItem = n283 as Theme;
const n284 = t([
  [12, 102],
  [13, 104],
  [14, 105],
  [15, 106],
  [16, 101],
  [17, 100],
  [19, 105],
  [20, 106],
  [21, 105],
  [22, 106],
  [23, 105],
  [24, 106],
  [25, 105],
  [26, 105],
  [27, 101],
]) as Theme;

export const light_yellow_active_Card = n284 as Theme;
export const light_yellow_active_DrawerFrame = n284 as Theme;
export const light_yellow_active_Progress = n284 as Theme;
export const light_yellow_active_TooltipArrow = n284 as Theme;
const n285 = t([
  [12, 104],
  [13, 105],
  [14, 106],
  [15, 107],
  [16, 102],
  [17, 101],
  [19, 105],
  [20, 106],
  [21, 105],
  [22, 105],
  [23, 242],
  [24, 242],
  [25, 106],
  [26, 106],
  [27, 100],
]) as Theme;

export const light_yellow_active_Button = n285 as Theme;
const n286 = t([
  [12, 104],
  [13, 105],
  [14, 106],
  [15, 107],
  [16, 102],
  [17, 101],
  [19, 105],
  [20, 106],
  [21, 105],
  [22, 105],
  [23, 106],
  [24, 107],
  [25, 106],
  [26, 106],
  [27, 100],
]) as Theme;

export const light_yellow_active_Checkbox = n286 as Theme;
export const light_yellow_active_Switch = n286 as Theme;
export const light_yellow_active_TooltipContent = n286 as Theme;
export const light_yellow_active_SliderTrack = n286 as Theme;
const n287 = t([
  [12, 107],
  [13, 106],
  [14, 105],
  [15, 104],
  [16, 108],
  [17, 11],
  [19, 101],
  [20, 100],
  [21, 101],
  [22, 97],
  [23, 105],
  [24, 104],
  [25, 105],
  [26, 105],
  [27, 101],
]) as Theme;

export const light_yellow_active_SwitchThumb = n287 as Theme;
const n288 = t([
  [12, 102],
  [13, 101],
  [14, 100],
  [15, 99],
  [16, 104],
  [17, 105],
  [19, 101],
  [20, 100],
  [21, 101],
  [22, 101],
  [23, 100],
  [24, 99],
  [25, 100],
  [26, 100],
  [27, 106],
]) as Theme;

export const light_yellow_active_SliderTrackActive = n288 as Theme;
const n289 = t([
  [12, 105],
  [13, 104],
  [14, 102],
  [15, 101],
  [16, 106],
  [17, 107],
  [19, 101],
  [20, 100],
  [21, 101],
  [22, 99],
  [23, 102],
  [24, 101],
  [25, 102],
  [26, 102],
  [27, 104],
]) as Theme;

export const light_yellow_active_SliderThumb = n289 as Theme;
export const light_yellow_active_Tooltip = n289 as Theme;
export const light_yellow_active_ProgressIndicator = n289 as Theme;
const n290 = t([
  [12, 100],
  [13, 101],
  [14, 102],
  [15, 104],
  [16, 99],
  [17, 98],
  [19, 105],
  [20, 106],
  [21, 105],
  [22, 108],
  [23, 105],
  [24, 106],
  [25, 105],
  [26, 105],
  [27, 104],
]) as Theme;

export const light_yellow_active_Input = n290 as Theme;
export const light_yellow_active_TextArea = n290 as Theme;
const n291 = t([
  [12, 38],
  [13, 39],
  [14, 40],
  [15, 41],
  [16, 37],
  [17, 37],
  [18, 48],
  [19, 47],
  [20, 48],
  [21, 47],
  [22, 11],
  [23, 40],
  [24, 41],
  [25, 40],
  [26, 40],
  [27, 46],
]) as Theme;

export const light_green_alt1_ListItem = n291 as Theme;
const n292 = t([
  [12, 40],
  [13, 41],
  [14, 42],
  [15, 44],
  [16, 39],
  [17, 38],
  [18, 48],
  [19, 47],
  [20, 48],
  [21, 47],
  [22, 48],
  [23, 42],
  [24, 44],
  [25, 42],
  [26, 42],
  [27, 44],
]) as Theme;

export const light_green_alt1_Card = n292 as Theme;
export const light_green_alt1_DrawerFrame = n292 as Theme;
export const light_green_alt1_Progress = n292 as Theme;
export const light_green_alt1_TooltipArrow = n292 as Theme;
const n293 = t([
  [12, 41],
  [13, 42],
  [14, 44],
  [15, 45],
  [16, 40],
  [17, 39],
  [18, 48],
  [19, 47],
  [20, 48],
  [21, 47],
  [22, 47],
  [23, 242],
  [24, 242],
  [25, 44],
  [26, 44],
  [27, 42],
]) as Theme;

export const light_green_alt1_Button = n293 as Theme;
const n294 = t([
  [12, 41],
  [13, 42],
  [14, 44],
  [15, 45],
  [16, 40],
  [17, 39],
  [18, 48],
  [19, 47],
  [20, 48],
  [21, 47],
  [22, 47],
  [23, 44],
  [24, 45],
  [25, 44],
  [26, 44],
  [27, 42],
]) as Theme;

export const light_green_alt1_Checkbox = n294 as Theme;
export const light_green_alt1_Switch = n294 as Theme;
export const light_green_alt1_TooltipContent = n294 as Theme;
export const light_green_alt1_SliderTrack = n294 as Theme;
const n295 = t([
  [12, 11],
  [13, 48],
  [14, 47],
  [15, 46],
  [16, 11],
  [17, 11],
  [18, 38],
  [19, 39],
  [20, 38],
  [21, 39],
  [22, 37],
  [23, 47],
  [24, 46],
  [25, 47],
  [26, 47],
  [27, 39],
]) as Theme;

export const light_green_alt1_SwitchThumb = n295 as Theme;
const n296 = t([
  [12, 45],
  [13, 44],
  [14, 42],
  [15, 41],
  [16, 46],
  [17, 47],
  [18, 38],
  [19, 39],
  [20, 38],
  [21, 39],
  [22, 39],
  [23, 42],
  [24, 41],
  [25, 42],
  [26, 42],
  [27, 44],
]) as Theme;

export const light_green_alt1_SliderTrackActive = n296 as Theme;
const n297 = t([
  [12, 47],
  [13, 46],
  [14, 45],
  [15, 44],
  [16, 48],
  [17, 11],
  [18, 38],
  [19, 39],
  [20, 38],
  [21, 39],
  [22, 37],
  [23, 45],
  [24, 44],
  [25, 45],
  [26, 45],
  [27, 41],
]) as Theme;

export const light_green_alt1_SliderThumb = n297 as Theme;
export const light_green_alt1_Tooltip = n297 as Theme;
export const light_green_alt1_ProgressIndicator = n297 as Theme;
const n298 = t([
  [12, 38],
  [13, 39],
  [14, 40],
  [15, 41],
  [16, 37],
  [17, 37],
  [18, 48],
  [19, 47],
  [20, 48],
  [21, 47],
  [22, 11],
  [23, 42],
  [24, 44],
  [25, 42],
  [26, 42],
  [27, 46],
]) as Theme;

export const light_green_alt1_Input = n298 as Theme;
export const light_green_alt1_TextArea = n298 as Theme;
const n299 = t([
  [12, 39],
  [13, 40],
  [14, 41],
  [15, 42],
  [16, 38],
  [17, 37],
  [18, 47],
  [19, 46],
  [20, 47],
  [21, 46],
  [22, 11],
  [23, 41],
  [24, 42],
  [25, 41],
  [26, 41],
  [27, 45],
]) as Theme;

export const light_green_alt2_ListItem = n299 as Theme;
const n300 = t([
  [12, 41],
  [13, 42],
  [14, 44],
  [15, 45],
  [16, 40],
  [17, 39],
  [18, 47],
  [19, 46],
  [20, 47],
  [21, 46],
  [22, 47],
  [23, 44],
  [24, 45],
  [25, 44],
  [26, 44],
  [27, 42],
]) as Theme;

export const light_green_alt2_Card = n300 as Theme;
export const light_green_alt2_DrawerFrame = n300 as Theme;
export const light_green_alt2_Progress = n300 as Theme;
export const light_green_alt2_TooltipArrow = n300 as Theme;
const n301 = t([
  [12, 42],
  [13, 44],
  [14, 45],
  [15, 46],
  [16, 41],
  [17, 40],
  [18, 47],
  [19, 46],
  [20, 47],
  [21, 46],
  [22, 46],
  [23, 242],
  [24, 242],
  [25, 45],
  [26, 45],
  [27, 41],
]) as Theme;

export const light_green_alt2_Button = n301 as Theme;
const n302 = t([
  [12, 42],
  [13, 44],
  [14, 45],
  [15, 46],
  [16, 41],
  [17, 40],
  [18, 47],
  [19, 46],
  [20, 47],
  [21, 46],
  [22, 46],
  [23, 45],
  [24, 46],
  [25, 45],
  [26, 45],
  [27, 41],
]) as Theme;

export const light_green_alt2_Checkbox = n302 as Theme;
export const light_green_alt2_Switch = n302 as Theme;
export const light_green_alt2_TooltipContent = n302 as Theme;
export const light_green_alt2_SliderTrack = n302 as Theme;
const n303 = t([
  [12, 48],
  [13, 47],
  [14, 46],
  [15, 45],
  [16, 11],
  [17, 11],
  [18, 39],
  [19, 40],
  [20, 39],
  [21, 40],
  [22, 37],
  [23, 46],
  [24, 45],
  [25, 46],
  [26, 46],
  [27, 40],
]) as Theme;

export const light_green_alt2_SwitchThumb = n303 as Theme;
const n304 = t([
  [12, 44],
  [13, 42],
  [14, 41],
  [15, 40],
  [16, 45],
  [17, 46],
  [18, 39],
  [19, 40],
  [20, 39],
  [21, 40],
  [22, 40],
  [23, 41],
  [24, 40],
  [25, 41],
  [26, 41],
  [27, 45],
]) as Theme;

export const light_green_alt2_SliderTrackActive = n304 as Theme;
const n305 = t([
  [12, 46],
  [13, 45],
  [14, 44],
  [15, 42],
  [16, 47],
  [17, 48],
  [18, 39],
  [19, 40],
  [20, 39],
  [21, 40],
  [22, 38],
  [23, 44],
  [24, 42],
  [25, 44],
  [26, 44],
  [27, 42],
]) as Theme;

export const light_green_alt2_SliderThumb = n305 as Theme;
export const light_green_alt2_Tooltip = n305 as Theme;
export const light_green_alt2_ProgressIndicator = n305 as Theme;
const n306 = t([
  [12, 39],
  [13, 40],
  [14, 41],
  [15, 42],
  [16, 38],
  [17, 37],
  [18, 47],
  [19, 46],
  [20, 47],
  [21, 46],
  [22, 11],
  [23, 44],
  [24, 45],
  [25, 44],
  [26, 44],
  [27, 45],
]) as Theme;

export const light_green_alt2_Input = n306 as Theme;
export const light_green_alt2_TextArea = n306 as Theme;
const n307 = t([
  [12, 40],
  [13, 41],
  [14, 42],
  [15, 44],
  [16, 39],
  [17, 38],
  [19, 45],
  [20, 46],
  [21, 45],
  [22, 48],
  [23, 42],
  [24, 44],
  [25, 42],
  [26, 42],
  [27, 44],
]) as Theme;

export const light_green_active_ListItem = n307 as Theme;
const n308 = t([
  [12, 42],
  [13, 44],
  [14, 45],
  [15, 46],
  [16, 41],
  [17, 40],
  [19, 45],
  [20, 46],
  [21, 45],
  [22, 46],
  [23, 45],
  [24, 46],
  [25, 45],
  [26, 45],
  [27, 41],
]) as Theme;

export const light_green_active_Card = n308 as Theme;
export const light_green_active_DrawerFrame = n308 as Theme;
export const light_green_active_Progress = n308 as Theme;
export const light_green_active_TooltipArrow = n308 as Theme;
const n309 = t([
  [12, 44],
  [13, 45],
  [14, 46],
  [15, 47],
  [16, 42],
  [17, 41],
  [19, 45],
  [20, 46],
  [21, 45],
  [22, 45],
  [23, 242],
  [24, 242],
  [25, 46],
  [26, 46],
  [27, 40],
]) as Theme;

export const light_green_active_Button = n309 as Theme;
const n310 = t([
  [12, 44],
  [13, 45],
  [14, 46],
  [15, 47],
  [16, 42],
  [17, 41],
  [19, 45],
  [20, 46],
  [21, 45],
  [22, 45],
  [23, 46],
  [24, 47],
  [25, 46],
  [26, 46],
  [27, 40],
]) as Theme;

export const light_green_active_Checkbox = n310 as Theme;
export const light_green_active_Switch = n310 as Theme;
export const light_green_active_TooltipContent = n310 as Theme;
export const light_green_active_SliderTrack = n310 as Theme;
const n311 = t([
  [12, 47],
  [13, 46],
  [14, 45],
  [15, 44],
  [16, 48],
  [17, 11],
  [19, 41],
  [20, 40],
  [21, 41],
  [22, 37],
  [23, 45],
  [24, 44],
  [25, 45],
  [26, 45],
  [27, 41],
]) as Theme;

export const light_green_active_SwitchThumb = n311 as Theme;
const n312 = t([
  [12, 42],
  [13, 41],
  [14, 40],
  [15, 39],
  [16, 44],
  [17, 45],
  [19, 41],
  [20, 40],
  [21, 41],
  [22, 41],
  [23, 40],
  [24, 39],
  [25, 40],
  [26, 40],
  [27, 46],
]) as Theme;

export const light_green_active_SliderTrackActive = n312 as Theme;
const n313 = t([
  [12, 45],
  [13, 44],
  [14, 42],
  [15, 41],
  [16, 46],
  [17, 47],
  [19, 41],
  [20, 40],
  [21, 41],
  [22, 39],
  [23, 42],
  [24, 41],
  [25, 42],
  [26, 42],
  [27, 44],
]) as Theme;

export const light_green_active_SliderThumb = n313 as Theme;
export const light_green_active_Tooltip = n313 as Theme;
export const light_green_active_ProgressIndicator = n313 as Theme;
const n314 = t([
  [12, 40],
  [13, 41],
  [14, 42],
  [15, 44],
  [16, 39],
  [17, 38],
  [19, 45],
  [20, 46],
  [21, 45],
  [22, 48],
  [23, 45],
  [24, 46],
  [25, 45],
  [26, 45],
  [27, 44],
]) as Theme;

export const light_green_active_Input = n314 as Theme;
export const light_green_active_TextArea = n314 as Theme;
const n315 = t([
  [12, 15],
  [13, 16],
  [14, 17],
  [15, 18],
  [16, 14],
  [17, 14],
  [18, 25],
  [19, 24],
  [20, 25],
  [21, 24],
  [22, 11],
  [23, 17],
  [24, 18],
  [25, 17],
  [26, 17],
  [27, 23],
]) as Theme;

export const light_blue_alt1_ListItem = n315 as Theme;
const n316 = t([
  [12, 17],
  [13, 18],
  [14, 19],
  [15, 21],
  [16, 16],
  [17, 15],
  [18, 25],
  [19, 24],
  [20, 25],
  [21, 24],
  [22, 25],
  [23, 19],
  [24, 21],
  [25, 19],
  [26, 19],
  [27, 21],
]) as Theme;

export const light_blue_alt1_Card = n316 as Theme;
export const light_blue_alt1_DrawerFrame = n316 as Theme;
export const light_blue_alt1_Progress = n316 as Theme;
export const light_blue_alt1_TooltipArrow = n316 as Theme;
const n317 = t([
  [12, 18],
  [13, 19],
  [14, 21],
  [15, 22],
  [16, 17],
  [17, 16],
  [18, 25],
  [19, 24],
  [20, 25],
  [21, 24],
  [22, 24],
  [23, 242],
  [24, 242],
  [25, 21],
  [26, 21],
  [27, 19],
]) as Theme;

export const light_blue_alt1_Button = n317 as Theme;
const n318 = t([
  [12, 18],
  [13, 19],
  [14, 21],
  [15, 22],
  [16, 17],
  [17, 16],
  [18, 25],
  [19, 24],
  [20, 25],
  [21, 24],
  [22, 24],
  [23, 21],
  [24, 22],
  [25, 21],
  [26, 21],
  [27, 19],
]) as Theme;

export const light_blue_alt1_Checkbox = n318 as Theme;
export const light_blue_alt1_Switch = n318 as Theme;
export const light_blue_alt1_TooltipContent = n318 as Theme;
export const light_blue_alt1_SliderTrack = n318 as Theme;
const n319 = t([
  [12, 11],
  [13, 25],
  [14, 24],
  [15, 23],
  [16, 11],
  [17, 11],
  [18, 15],
  [19, 16],
  [20, 15],
  [21, 16],
  [22, 14],
  [23, 24],
  [24, 23],
  [25, 24],
  [26, 24],
  [27, 16],
]) as Theme;

export const light_blue_alt1_SwitchThumb = n319 as Theme;
const n320 = t([
  [12, 22],
  [13, 21],
  [14, 19],
  [15, 18],
  [16, 23],
  [17, 24],
  [18, 15],
  [19, 16],
  [20, 15],
  [21, 16],
  [22, 16],
  [23, 19],
  [24, 18],
  [25, 19],
  [26, 19],
  [27, 21],
]) as Theme;

export const light_blue_alt1_SliderTrackActive = n320 as Theme;
const n321 = t([
  [12, 24],
  [13, 23],
  [14, 22],
  [15, 21],
  [16, 25],
  [17, 11],
  [18, 15],
  [19, 16],
  [20, 15],
  [21, 16],
  [22, 14],
  [23, 22],
  [24, 21],
  [25, 22],
  [26, 22],
  [27, 18],
]) as Theme;

export const light_blue_alt1_SliderThumb = n321 as Theme;
export const light_blue_alt1_Tooltip = n321 as Theme;
export const light_blue_alt1_ProgressIndicator = n321 as Theme;
const n322 = t([
  [12, 15],
  [13, 16],
  [14, 17],
  [15, 18],
  [16, 14],
  [17, 14],
  [18, 25],
  [19, 24],
  [20, 25],
  [21, 24],
  [22, 11],
  [23, 19],
  [24, 21],
  [25, 19],
  [26, 19],
  [27, 23],
]) as Theme;

export const light_blue_alt1_Input = n322 as Theme;
export const light_blue_alt1_TextArea = n322 as Theme;
const n323 = t([
  [12, 16],
  [13, 17],
  [14, 18],
  [15, 19],
  [16, 15],
  [17, 14],
  [18, 24],
  [19, 23],
  [20, 24],
  [21, 23],
  [22, 11],
  [23, 18],
  [24, 19],
  [25, 18],
  [26, 18],
  [27, 22],
]) as Theme;

export const light_blue_alt2_ListItem = n323 as Theme;
const n324 = t([
  [12, 18],
  [13, 19],
  [14, 21],
  [15, 22],
  [16, 17],
  [17, 16],
  [18, 24],
  [19, 23],
  [20, 24],
  [21, 23],
  [22, 24],
  [23, 21],
  [24, 22],
  [25, 21],
  [26, 21],
  [27, 19],
]) as Theme;

export const light_blue_alt2_Card = n324 as Theme;
export const light_blue_alt2_DrawerFrame = n324 as Theme;
export const light_blue_alt2_Progress = n324 as Theme;
export const light_blue_alt2_TooltipArrow = n324 as Theme;
const n325 = t([
  [12, 19],
  [13, 21],
  [14, 22],
  [15, 23],
  [16, 18],
  [17, 17],
  [18, 24],
  [19, 23],
  [20, 24],
  [21, 23],
  [22, 23],
  [23, 242],
  [24, 242],
  [25, 22],
  [26, 22],
  [27, 18],
]) as Theme;

export const light_blue_alt2_Button = n325 as Theme;
const n326 = t([
  [12, 19],
  [13, 21],
  [14, 22],
  [15, 23],
  [16, 18],
  [17, 17],
  [18, 24],
  [19, 23],
  [20, 24],
  [21, 23],
  [22, 23],
  [23, 22],
  [24, 23],
  [25, 22],
  [26, 22],
  [27, 18],
]) as Theme;

export const light_blue_alt2_Checkbox = n326 as Theme;
export const light_blue_alt2_Switch = n326 as Theme;
export const light_blue_alt2_TooltipContent = n326 as Theme;
export const light_blue_alt2_SliderTrack = n326 as Theme;
const n327 = t([
  [12, 25],
  [13, 24],
  [14, 23],
  [15, 22],
  [16, 11],
  [17, 11],
  [18, 16],
  [19, 17],
  [20, 16],
  [21, 17],
  [22, 14],
  [23, 23],
  [24, 22],
  [25, 23],
  [26, 23],
  [27, 17],
]) as Theme;

export const light_blue_alt2_SwitchThumb = n327 as Theme;
const n328 = t([
  [12, 21],
  [13, 19],
  [14, 18],
  [15, 17],
  [16, 22],
  [17, 23],
  [18, 16],
  [19, 17],
  [20, 16],
  [21, 17],
  [22, 17],
  [23, 18],
  [24, 17],
  [25, 18],
  [26, 18],
  [27, 22],
]) as Theme;

export const light_blue_alt2_SliderTrackActive = n328 as Theme;
const n329 = t([
  [12, 23],
  [13, 22],
  [14, 21],
  [15, 19],
  [16, 24],
  [17, 25],
  [18, 16],
  [19, 17],
  [20, 16],
  [21, 17],
  [22, 15],
  [23, 21],
  [24, 19],
  [25, 21],
  [26, 21],
  [27, 19],
]) as Theme;

export const light_blue_alt2_SliderThumb = n329 as Theme;
export const light_blue_alt2_Tooltip = n329 as Theme;
export const light_blue_alt2_ProgressIndicator = n329 as Theme;
const n330 = t([
  [12, 16],
  [13, 17],
  [14, 18],
  [15, 19],
  [16, 15],
  [17, 14],
  [18, 24],
  [19, 23],
  [20, 24],
  [21, 23],
  [22, 11],
  [23, 21],
  [24, 22],
  [25, 21],
  [26, 21],
  [27, 22],
]) as Theme;

export const light_blue_alt2_Input = n330 as Theme;
export const light_blue_alt2_TextArea = n330 as Theme;
const n331 = t([
  [12, 17],
  [13, 18],
  [14, 19],
  [15, 21],
  [16, 16],
  [17, 15],
  [19, 22],
  [20, 23],
  [21, 22],
  [22, 25],
  [23, 19],
  [24, 21],
  [25, 19],
  [26, 19],
  [27, 21],
]) as Theme;

export const light_blue_active_ListItem = n331 as Theme;
const n332 = t([
  [12, 19],
  [13, 21],
  [14, 22],
  [15, 23],
  [16, 18],
  [17, 17],
  [19, 22],
  [20, 23],
  [21, 22],
  [22, 23],
  [23, 22],
  [24, 23],
  [25, 22],
  [26, 22],
  [27, 18],
]) as Theme;

export const light_blue_active_Card = n332 as Theme;
export const light_blue_active_DrawerFrame = n332 as Theme;
export const light_blue_active_Progress = n332 as Theme;
export const light_blue_active_TooltipArrow = n332 as Theme;
const n333 = t([
  [12, 21],
  [13, 22],
  [14, 23],
  [15, 24],
  [16, 19],
  [17, 18],
  [19, 22],
  [20, 23],
  [21, 22],
  [22, 22],
  [23, 242],
  [24, 242],
  [25, 23],
  [26, 23],
  [27, 17],
]) as Theme;

export const light_blue_active_Button = n333 as Theme;
const n334 = t([
  [12, 21],
  [13, 22],
  [14, 23],
  [15, 24],
  [16, 19],
  [17, 18],
  [19, 22],
  [20, 23],
  [21, 22],
  [22, 22],
  [23, 23],
  [24, 24],
  [25, 23],
  [26, 23],
  [27, 17],
]) as Theme;

export const light_blue_active_Checkbox = n334 as Theme;
export const light_blue_active_Switch = n334 as Theme;
export const light_blue_active_TooltipContent = n334 as Theme;
export const light_blue_active_SliderTrack = n334 as Theme;
const n335 = t([
  [12, 24],
  [13, 23],
  [14, 22],
  [15, 21],
  [16, 25],
  [17, 11],
  [19, 18],
  [20, 17],
  [21, 18],
  [22, 14],
  [23, 22],
  [24, 21],
  [25, 22],
  [26, 22],
  [27, 18],
]) as Theme;

export const light_blue_active_SwitchThumb = n335 as Theme;
const n336 = t([
  [12, 19],
  [13, 18],
  [14, 17],
  [15, 16],
  [16, 21],
  [17, 22],
  [19, 18],
  [20, 17],
  [21, 18],
  [22, 18],
  [23, 17],
  [24, 16],
  [25, 17],
  [26, 17],
  [27, 23],
]) as Theme;

export const light_blue_active_SliderTrackActive = n336 as Theme;
const n337 = t([
  [12, 22],
  [13, 21],
  [14, 19],
  [15, 18],
  [16, 23],
  [17, 24],
  [19, 18],
  [20, 17],
  [21, 18],
  [22, 16],
  [23, 19],
  [24, 18],
  [25, 19],
  [26, 19],
  [27, 21],
]) as Theme;

export const light_blue_active_SliderThumb = n337 as Theme;
export const light_blue_active_Tooltip = n337 as Theme;
export const light_blue_active_ProgressIndicator = n337 as Theme;
const n338 = t([
  [12, 17],
  [13, 18],
  [14, 19],
  [15, 21],
  [16, 16],
  [17, 15],
  [19, 22],
  [20, 23],
  [21, 22],
  [22, 25],
  [23, 22],
  [24, 23],
  [25, 22],
  [26, 22],
  [27, 21],
]) as Theme;

export const light_blue_active_Input = n338 as Theme;
export const light_blue_active_TextArea = n338 as Theme;
const n339 = t([
  [12, 74],
  [13, 75],
  [14, 76],
  [15, 77],
  [16, 73],
  [17, 73],
  [18, 84],
  [19, 83],
  [20, 84],
  [21, 83],
  [22, 11],
  [23, 76],
  [24, 77],
  [25, 76],
  [26, 76],
  [27, 82],
]) as Theme;

export const light_purple_alt1_ListItem = n339 as Theme;
const n340 = t([
  [12, 76],
  [13, 77],
  [14, 78],
  [15, 80],
  [16, 75],
  [17, 74],
  [18, 84],
  [19, 83],
  [20, 84],
  [21, 83],
  [22, 84],
  [23, 78],
  [24, 80],
  [25, 78],
  [26, 78],
  [27, 80],
]) as Theme;

export const light_purple_alt1_Card = n340 as Theme;
export const light_purple_alt1_DrawerFrame = n340 as Theme;
export const light_purple_alt1_Progress = n340 as Theme;
export const light_purple_alt1_TooltipArrow = n340 as Theme;
const n341 = t([
  [12, 77],
  [13, 78],
  [14, 80],
  [15, 81],
  [16, 76],
  [17, 75],
  [18, 84],
  [19, 83],
  [20, 84],
  [21, 83],
  [22, 83],
  [23, 242],
  [24, 242],
  [25, 80],
  [26, 80],
  [27, 78],
]) as Theme;

export const light_purple_alt1_Button = n341 as Theme;
const n342 = t([
  [12, 77],
  [13, 78],
  [14, 80],
  [15, 81],
  [16, 76],
  [17, 75],
  [18, 84],
  [19, 83],
  [20, 84],
  [21, 83],
  [22, 83],
  [23, 80],
  [24, 81],
  [25, 80],
  [26, 80],
  [27, 78],
]) as Theme;

export const light_purple_alt1_Checkbox = n342 as Theme;
export const light_purple_alt1_Switch = n342 as Theme;
export const light_purple_alt1_TooltipContent = n342 as Theme;
export const light_purple_alt1_SliderTrack = n342 as Theme;
const n343 = t([
  [12, 11],
  [13, 84],
  [14, 83],
  [15, 82],
  [16, 11],
  [17, 11],
  [18, 74],
  [19, 75],
  [20, 74],
  [21, 75],
  [22, 73],
  [23, 83],
  [24, 82],
  [25, 83],
  [26, 83],
  [27, 75],
]) as Theme;

export const light_purple_alt1_SwitchThumb = n343 as Theme;
const n344 = t([
  [12, 81],
  [13, 80],
  [14, 78],
  [15, 77],
  [16, 82],
  [17, 83],
  [18, 74],
  [19, 75],
  [20, 74],
  [21, 75],
  [22, 75],
  [23, 78],
  [24, 77],
  [25, 78],
  [26, 78],
  [27, 80],
]) as Theme;

export const light_purple_alt1_SliderTrackActive = n344 as Theme;
const n345 = t([
  [12, 83],
  [13, 82],
  [14, 81],
  [15, 80],
  [16, 84],
  [17, 11],
  [18, 74],
  [19, 75],
  [20, 74],
  [21, 75],
  [22, 73],
  [23, 81],
  [24, 80],
  [25, 81],
  [26, 81],
  [27, 77],
]) as Theme;

export const light_purple_alt1_SliderThumb = n345 as Theme;
export const light_purple_alt1_Tooltip = n345 as Theme;
export const light_purple_alt1_ProgressIndicator = n345 as Theme;
const n346 = t([
  [12, 74],
  [13, 75],
  [14, 76],
  [15, 77],
  [16, 73],
  [17, 73],
  [18, 84],
  [19, 83],
  [20, 84],
  [21, 83],
  [22, 11],
  [23, 78],
  [24, 80],
  [25, 78],
  [26, 78],
  [27, 82],
]) as Theme;

export const light_purple_alt1_Input = n346 as Theme;
export const light_purple_alt1_TextArea = n346 as Theme;
const n347 = t([
  [12, 75],
  [13, 76],
  [14, 77],
  [15, 78],
  [16, 74],
  [17, 73],
  [18, 83],
  [19, 82],
  [20, 83],
  [21, 82],
  [22, 11],
  [23, 77],
  [24, 78],
  [25, 77],
  [26, 77],
  [27, 81],
]) as Theme;

export const light_purple_alt2_ListItem = n347 as Theme;
const n348 = t([
  [12, 77],
  [13, 78],
  [14, 80],
  [15, 81],
  [16, 76],
  [17, 75],
  [18, 83],
  [19, 82],
  [20, 83],
  [21, 82],
  [22, 83],
  [23, 80],
  [24, 81],
  [25, 80],
  [26, 80],
  [27, 78],
]) as Theme;

export const light_purple_alt2_Card = n348 as Theme;
export const light_purple_alt2_DrawerFrame = n348 as Theme;
export const light_purple_alt2_Progress = n348 as Theme;
export const light_purple_alt2_TooltipArrow = n348 as Theme;
const n349 = t([
  [12, 78],
  [13, 80],
  [14, 81],
  [15, 82],
  [16, 77],
  [17, 76],
  [18, 83],
  [19, 82],
  [20, 83],
  [21, 82],
  [22, 82],
  [23, 242],
  [24, 242],
  [25, 81],
  [26, 81],
  [27, 77],
]) as Theme;

export const light_purple_alt2_Button = n349 as Theme;
const n350 = t([
  [12, 78],
  [13, 80],
  [14, 81],
  [15, 82],
  [16, 77],
  [17, 76],
  [18, 83],
  [19, 82],
  [20, 83],
  [21, 82],
  [22, 82],
  [23, 81],
  [24, 82],
  [25, 81],
  [26, 81],
  [27, 77],
]) as Theme;

export const light_purple_alt2_Checkbox = n350 as Theme;
export const light_purple_alt2_Switch = n350 as Theme;
export const light_purple_alt2_TooltipContent = n350 as Theme;
export const light_purple_alt2_SliderTrack = n350 as Theme;
const n351 = t([
  [12, 84],
  [13, 83],
  [14, 82],
  [15, 81],
  [16, 11],
  [17, 11],
  [18, 75],
  [19, 76],
  [20, 75],
  [21, 76],
  [22, 73],
  [23, 82],
  [24, 81],
  [25, 82],
  [26, 82],
  [27, 76],
]) as Theme;

export const light_purple_alt2_SwitchThumb = n351 as Theme;
const n352 = t([
  [12, 80],
  [13, 78],
  [14, 77],
  [15, 76],
  [16, 81],
  [17, 82],
  [18, 75],
  [19, 76],
  [20, 75],
  [21, 76],
  [22, 76],
  [23, 77],
  [24, 76],
  [25, 77],
  [26, 77],
  [27, 81],
]) as Theme;

export const light_purple_alt2_SliderTrackActive = n352 as Theme;
const n353 = t([
  [12, 82],
  [13, 81],
  [14, 80],
  [15, 78],
  [16, 83],
  [17, 84],
  [18, 75],
  [19, 76],
  [20, 75],
  [21, 76],
  [22, 74],
  [23, 80],
  [24, 78],
  [25, 80],
  [26, 80],
  [27, 78],
]) as Theme;

export const light_purple_alt2_SliderThumb = n353 as Theme;
export const light_purple_alt2_Tooltip = n353 as Theme;
export const light_purple_alt2_ProgressIndicator = n353 as Theme;
const n354 = t([
  [12, 75],
  [13, 76],
  [14, 77],
  [15, 78],
  [16, 74],
  [17, 73],
  [18, 83],
  [19, 82],
  [20, 83],
  [21, 82],
  [22, 11],
  [23, 80],
  [24, 81],
  [25, 80],
  [26, 80],
  [27, 81],
]) as Theme;

export const light_purple_alt2_Input = n354 as Theme;
export const light_purple_alt2_TextArea = n354 as Theme;
const n355 = t([
  [12, 76],
  [13, 77],
  [14, 78],
  [15, 80],
  [16, 75],
  [17, 74],
  [19, 81],
  [20, 82],
  [21, 81],
  [22, 84],
  [23, 78],
  [24, 80],
  [25, 78],
  [26, 78],
  [27, 80],
]) as Theme;

export const light_purple_active_ListItem = n355 as Theme;
const n356 = t([
  [12, 78],
  [13, 80],
  [14, 81],
  [15, 82],
  [16, 77],
  [17, 76],
  [19, 81],
  [20, 82],
  [21, 81],
  [22, 82],
  [23, 81],
  [24, 82],
  [25, 81],
  [26, 81],
  [27, 77],
]) as Theme;

export const light_purple_active_Card = n356 as Theme;
export const light_purple_active_DrawerFrame = n356 as Theme;
export const light_purple_active_Progress = n356 as Theme;
export const light_purple_active_TooltipArrow = n356 as Theme;
const n357 = t([
  [12, 80],
  [13, 81],
  [14, 82],
  [15, 83],
  [16, 78],
  [17, 77],
  [19, 81],
  [20, 82],
  [21, 81],
  [22, 81],
  [23, 242],
  [24, 242],
  [25, 82],
  [26, 82],
  [27, 76],
]) as Theme;

export const light_purple_active_Button = n357 as Theme;
const n358 = t([
  [12, 80],
  [13, 81],
  [14, 82],
  [15, 83],
  [16, 78],
  [17, 77],
  [19, 81],
  [20, 82],
  [21, 81],
  [22, 81],
  [23, 82],
  [24, 83],
  [25, 82],
  [26, 82],
  [27, 76],
]) as Theme;

export const light_purple_active_Checkbox = n358 as Theme;
export const light_purple_active_Switch = n358 as Theme;
export const light_purple_active_TooltipContent = n358 as Theme;
export const light_purple_active_SliderTrack = n358 as Theme;
const n359 = t([
  [12, 83],
  [13, 82],
  [14, 81],
  [15, 80],
  [16, 84],
  [17, 11],
  [19, 77],
  [20, 76],
  [21, 77],
  [22, 73],
  [23, 81],
  [24, 80],
  [25, 81],
  [26, 81],
  [27, 77],
]) as Theme;

export const light_purple_active_SwitchThumb = n359 as Theme;
const n360 = t([
  [12, 78],
  [13, 77],
  [14, 76],
  [15, 75],
  [16, 80],
  [17, 81],
  [19, 77],
  [20, 76],
  [21, 77],
  [22, 77],
  [23, 76],
  [24, 75],
  [25, 76],
  [26, 76],
  [27, 82],
]) as Theme;

export const light_purple_active_SliderTrackActive = n360 as Theme;
const n361 = t([
  [12, 81],
  [13, 80],
  [14, 78],
  [15, 77],
  [16, 82],
  [17, 83],
  [19, 77],
  [20, 76],
  [21, 77],
  [22, 75],
  [23, 78],
  [24, 77],
  [25, 78],
  [26, 78],
  [27, 80],
]) as Theme;

export const light_purple_active_SliderThumb = n361 as Theme;
export const light_purple_active_Tooltip = n361 as Theme;
export const light_purple_active_ProgressIndicator = n361 as Theme;
const n362 = t([
  [12, 76],
  [13, 77],
  [14, 78],
  [15, 80],
  [16, 75],
  [17, 74],
  [19, 81],
  [20, 82],
  [21, 81],
  [22, 84],
  [23, 81],
  [24, 82],
  [25, 81],
  [26, 81],
  [27, 80],
]) as Theme;

export const light_purple_active_Input = n362 as Theme;
export const light_purple_active_TextArea = n362 as Theme;
const n363 = t([
  [12, 62],
  [13, 63],
  [14, 64],
  [15, 65],
  [16, 61],
  [17, 61],
  [18, 72],
  [19, 71],
  [20, 72],
  [21, 71],
  [22, 11],
  [23, 64],
  [24, 65],
  [25, 64],
  [26, 64],
  [27, 70],
]) as Theme;

export const light_pink_alt1_ListItem = n363 as Theme;
const n364 = t([
  [12, 64],
  [13, 65],
  [14, 66],
  [15, 68],
  [16, 63],
  [17, 62],
  [18, 72],
  [19, 71],
  [20, 72],
  [21, 71],
  [22, 72],
  [23, 66],
  [24, 68],
  [25, 66],
  [26, 66],
  [27, 68],
]) as Theme;

export const light_pink_alt1_Card = n364 as Theme;
export const light_pink_alt1_DrawerFrame = n364 as Theme;
export const light_pink_alt1_Progress = n364 as Theme;
export const light_pink_alt1_TooltipArrow = n364 as Theme;
const n365 = t([
  [12, 65],
  [13, 66],
  [14, 68],
  [15, 69],
  [16, 64],
  [17, 63],
  [18, 72],
  [19, 71],
  [20, 72],
  [21, 71],
  [22, 71],
  [23, 242],
  [24, 242],
  [25, 68],
  [26, 68],
  [27, 66],
]) as Theme;

export const light_pink_alt1_Button = n365 as Theme;
const n366 = t([
  [12, 65],
  [13, 66],
  [14, 68],
  [15, 69],
  [16, 64],
  [17, 63],
  [18, 72],
  [19, 71],
  [20, 72],
  [21, 71],
  [22, 71],
  [23, 68],
  [24, 69],
  [25, 68],
  [26, 68],
  [27, 66],
]) as Theme;

export const light_pink_alt1_Checkbox = n366 as Theme;
export const light_pink_alt1_Switch = n366 as Theme;
export const light_pink_alt1_TooltipContent = n366 as Theme;
export const light_pink_alt1_SliderTrack = n366 as Theme;
const n367 = t([
  [12, 11],
  [13, 72],
  [14, 71],
  [15, 70],
  [16, 11],
  [17, 11],
  [18, 62],
  [19, 63],
  [20, 62],
  [21, 63],
  [22, 61],
  [23, 71],
  [24, 70],
  [25, 71],
  [26, 71],
  [27, 63],
]) as Theme;

export const light_pink_alt1_SwitchThumb = n367 as Theme;
const n368 = t([
  [12, 69],
  [13, 68],
  [14, 66],
  [15, 65],
  [16, 70],
  [17, 71],
  [18, 62],
  [19, 63],
  [20, 62],
  [21, 63],
  [22, 63],
  [23, 66],
  [24, 65],
  [25, 66],
  [26, 66],
  [27, 68],
]) as Theme;

export const light_pink_alt1_SliderTrackActive = n368 as Theme;
const n369 = t([
  [12, 71],
  [13, 70],
  [14, 69],
  [15, 68],
  [16, 72],
  [17, 11],
  [18, 62],
  [19, 63],
  [20, 62],
  [21, 63],
  [22, 61],
  [23, 69],
  [24, 68],
  [25, 69],
  [26, 69],
  [27, 65],
]) as Theme;

export const light_pink_alt1_SliderThumb = n369 as Theme;
export const light_pink_alt1_Tooltip = n369 as Theme;
export const light_pink_alt1_ProgressIndicator = n369 as Theme;
const n370 = t([
  [12, 62],
  [13, 63],
  [14, 64],
  [15, 65],
  [16, 61],
  [17, 61],
  [18, 72],
  [19, 71],
  [20, 72],
  [21, 71],
  [22, 11],
  [23, 66],
  [24, 68],
  [25, 66],
  [26, 66],
  [27, 70],
]) as Theme;

export const light_pink_alt1_Input = n370 as Theme;
export const light_pink_alt1_TextArea = n370 as Theme;
const n371 = t([
  [12, 63],
  [13, 64],
  [14, 65],
  [15, 66],
  [16, 62],
  [17, 61],
  [18, 71],
  [19, 70],
  [20, 71],
  [21, 70],
  [22, 11],
  [23, 65],
  [24, 66],
  [25, 65],
  [26, 65],
  [27, 69],
]) as Theme;

export const light_pink_alt2_ListItem = n371 as Theme;
const n372 = t([
  [12, 65],
  [13, 66],
  [14, 68],
  [15, 69],
  [16, 64],
  [17, 63],
  [18, 71],
  [19, 70],
  [20, 71],
  [21, 70],
  [22, 71],
  [23, 68],
  [24, 69],
  [25, 68],
  [26, 68],
  [27, 66],
]) as Theme;

export const light_pink_alt2_Card = n372 as Theme;
export const light_pink_alt2_DrawerFrame = n372 as Theme;
export const light_pink_alt2_Progress = n372 as Theme;
export const light_pink_alt2_TooltipArrow = n372 as Theme;
const n373 = t([
  [12, 66],
  [13, 68],
  [14, 69],
  [15, 70],
  [16, 65],
  [17, 64],
  [18, 71],
  [19, 70],
  [20, 71],
  [21, 70],
  [22, 70],
  [23, 242],
  [24, 242],
  [25, 69],
  [26, 69],
  [27, 65],
]) as Theme;

export const light_pink_alt2_Button = n373 as Theme;
const n374 = t([
  [12, 66],
  [13, 68],
  [14, 69],
  [15, 70],
  [16, 65],
  [17, 64],
  [18, 71],
  [19, 70],
  [20, 71],
  [21, 70],
  [22, 70],
  [23, 69],
  [24, 70],
  [25, 69],
  [26, 69],
  [27, 65],
]) as Theme;

export const light_pink_alt2_Checkbox = n374 as Theme;
export const light_pink_alt2_Switch = n374 as Theme;
export const light_pink_alt2_TooltipContent = n374 as Theme;
export const light_pink_alt2_SliderTrack = n374 as Theme;
const n375 = t([
  [12, 72],
  [13, 71],
  [14, 70],
  [15, 69],
  [16, 11],
  [17, 11],
  [18, 63],
  [19, 64],
  [20, 63],
  [21, 64],
  [22, 61],
  [23, 70],
  [24, 69],
  [25, 70],
  [26, 70],
  [27, 64],
]) as Theme;

export const light_pink_alt2_SwitchThumb = n375 as Theme;
const n376 = t([
  [12, 68],
  [13, 66],
  [14, 65],
  [15, 64],
  [16, 69],
  [17, 70],
  [18, 63],
  [19, 64],
  [20, 63],
  [21, 64],
  [22, 64],
  [23, 65],
  [24, 64],
  [25, 65],
  [26, 65],
  [27, 69],
]) as Theme;

export const light_pink_alt2_SliderTrackActive = n376 as Theme;
const n377 = t([
  [12, 70],
  [13, 69],
  [14, 68],
  [15, 66],
  [16, 71],
  [17, 72],
  [18, 63],
  [19, 64],
  [20, 63],
  [21, 64],
  [22, 62],
  [23, 68],
  [24, 66],
  [25, 68],
  [26, 68],
  [27, 66],
]) as Theme;

export const light_pink_alt2_SliderThumb = n377 as Theme;
export const light_pink_alt2_Tooltip = n377 as Theme;
export const light_pink_alt2_ProgressIndicator = n377 as Theme;
const n378 = t([
  [12, 63],
  [13, 64],
  [14, 65],
  [15, 66],
  [16, 62],
  [17, 61],
  [18, 71],
  [19, 70],
  [20, 71],
  [21, 70],
  [22, 11],
  [23, 68],
  [24, 69],
  [25, 68],
  [26, 68],
  [27, 69],
]) as Theme;

export const light_pink_alt2_Input = n378 as Theme;
export const light_pink_alt2_TextArea = n378 as Theme;
const n379 = t([
  [12, 64],
  [13, 65],
  [14, 66],
  [15, 68],
  [16, 63],
  [17, 62],
  [19, 69],
  [20, 70],
  [21, 69],
  [22, 72],
  [23, 66],
  [24, 68],
  [25, 66],
  [26, 66],
  [27, 68],
]) as Theme;

export const light_pink_active_ListItem = n379 as Theme;
const n380 = t([
  [12, 66],
  [13, 68],
  [14, 69],
  [15, 70],
  [16, 65],
  [17, 64],
  [19, 69],
  [20, 70],
  [21, 69],
  [22, 70],
  [23, 69],
  [24, 70],
  [25, 69],
  [26, 69],
  [27, 65],
]) as Theme;

export const light_pink_active_Card = n380 as Theme;
export const light_pink_active_DrawerFrame = n380 as Theme;
export const light_pink_active_Progress = n380 as Theme;
export const light_pink_active_TooltipArrow = n380 as Theme;
const n381 = t([
  [12, 68],
  [13, 69],
  [14, 70],
  [15, 71],
  [16, 66],
  [17, 65],
  [19, 69],
  [20, 70],
  [21, 69],
  [22, 69],
  [23, 242],
  [24, 242],
  [25, 70],
  [26, 70],
  [27, 64],
]) as Theme;

export const light_pink_active_Button = n381 as Theme;
const n382 = t([
  [12, 68],
  [13, 69],
  [14, 70],
  [15, 71],
  [16, 66],
  [17, 65],
  [19, 69],
  [20, 70],
  [21, 69],
  [22, 69],
  [23, 70],
  [24, 71],
  [25, 70],
  [26, 70],
  [27, 64],
]) as Theme;

export const light_pink_active_Checkbox = n382 as Theme;
export const light_pink_active_Switch = n382 as Theme;
export const light_pink_active_TooltipContent = n382 as Theme;
export const light_pink_active_SliderTrack = n382 as Theme;
const n383 = t([
  [12, 71],
  [13, 70],
  [14, 69],
  [15, 68],
  [16, 72],
  [17, 11],
  [19, 65],
  [20, 64],
  [21, 65],
  [22, 61],
  [23, 69],
  [24, 68],
  [25, 69],
  [26, 69],
  [27, 65],
]) as Theme;

export const light_pink_active_SwitchThumb = n383 as Theme;
const n384 = t([
  [12, 66],
  [13, 65],
  [14, 64],
  [15, 63],
  [16, 68],
  [17, 69],
  [19, 65],
  [20, 64],
  [21, 65],
  [22, 65],
  [23, 64],
  [24, 63],
  [25, 64],
  [26, 64],
  [27, 70],
]) as Theme;

export const light_pink_active_SliderTrackActive = n384 as Theme;
const n385 = t([
  [12, 69],
  [13, 68],
  [14, 66],
  [15, 65],
  [16, 70],
  [17, 71],
  [19, 65],
  [20, 64],
  [21, 65],
  [22, 63],
  [23, 66],
  [24, 65],
  [25, 66],
  [26, 66],
  [27, 68],
]) as Theme;

export const light_pink_active_SliderThumb = n385 as Theme;
export const light_pink_active_Tooltip = n385 as Theme;
export const light_pink_active_ProgressIndicator = n385 as Theme;
const n386 = t([
  [12, 64],
  [13, 65],
  [14, 66],
  [15, 68],
  [16, 63],
  [17, 62],
  [19, 69],
  [20, 70],
  [21, 69],
  [22, 72],
  [23, 69],
  [24, 70],
  [25, 69],
  [26, 69],
  [27, 68],
]) as Theme;

export const light_pink_active_Input = n386 as Theme;
export const light_pink_active_TextArea = n386 as Theme;
const n387 = t([
  [12, 86],
  [13, 87],
  [14, 88],
  [15, 89],
  [16, 85],
  [17, 85],
  [18, 96],
  [19, 95],
  [20, 96],
  [21, 95],
  [22, 11],
  [23, 88],
  [24, 89],
  [25, 88],
  [26, 88],
  [27, 94],
]) as Theme;

export const light_red_alt1_ListItem = n387 as Theme;
const n388 = t([
  [12, 88],
  [13, 89],
  [14, 90],
  [15, 92],
  [16, 87],
  [17, 86],
  [18, 96],
  [19, 95],
  [20, 96],
  [21, 95],
  [22, 96],
  [23, 90],
  [24, 92],
  [25, 90],
  [26, 90],
  [27, 92],
]) as Theme;

export const light_red_alt1_Card = n388 as Theme;
export const light_red_alt1_DrawerFrame = n388 as Theme;
export const light_red_alt1_Progress = n388 as Theme;
export const light_red_alt1_TooltipArrow = n388 as Theme;
const n389 = t([
  [12, 89],
  [13, 90],
  [14, 92],
  [15, 93],
  [16, 88],
  [17, 87],
  [18, 96],
  [19, 95],
  [20, 96],
  [21, 95],
  [22, 95],
  [23, 242],
  [24, 242],
  [25, 92],
  [26, 92],
  [27, 90],
]) as Theme;

export const light_red_alt1_Button = n389 as Theme;
const n390 = t([
  [12, 89],
  [13, 90],
  [14, 92],
  [15, 93],
  [16, 88],
  [17, 87],
  [18, 96],
  [19, 95],
  [20, 96],
  [21, 95],
  [22, 95],
  [23, 92],
  [24, 93],
  [25, 92],
  [26, 92],
  [27, 90],
]) as Theme;

export const light_red_alt1_Checkbox = n390 as Theme;
export const light_red_alt1_Switch = n390 as Theme;
export const light_red_alt1_TooltipContent = n390 as Theme;
export const light_red_alt1_SliderTrack = n390 as Theme;
const n391 = t([
  [12, 11],
  [13, 96],
  [14, 95],
  [15, 94],
  [16, 11],
  [17, 11],
  [18, 86],
  [19, 87],
  [20, 86],
  [21, 87],
  [22, 85],
  [23, 95],
  [24, 94],
  [25, 95],
  [26, 95],
  [27, 87],
]) as Theme;

export const light_red_alt1_SwitchThumb = n391 as Theme;
const n392 = t([
  [12, 93],
  [13, 92],
  [14, 90],
  [15, 89],
  [16, 94],
  [17, 95],
  [18, 86],
  [19, 87],
  [20, 86],
  [21, 87],
  [22, 87],
  [23, 90],
  [24, 89],
  [25, 90],
  [26, 90],
  [27, 92],
]) as Theme;

export const light_red_alt1_SliderTrackActive = n392 as Theme;
const n393 = t([
  [12, 95],
  [13, 94],
  [14, 93],
  [15, 92],
  [16, 96],
  [17, 11],
  [18, 86],
  [19, 87],
  [20, 86],
  [21, 87],
  [22, 85],
  [23, 93],
  [24, 92],
  [25, 93],
  [26, 93],
  [27, 89],
]) as Theme;

export const light_red_alt1_SliderThumb = n393 as Theme;
export const light_red_alt1_Tooltip = n393 as Theme;
export const light_red_alt1_ProgressIndicator = n393 as Theme;
const n394 = t([
  [12, 86],
  [13, 87],
  [14, 88],
  [15, 89],
  [16, 85],
  [17, 85],
  [18, 96],
  [19, 95],
  [20, 96],
  [21, 95],
  [22, 11],
  [23, 90],
  [24, 92],
  [25, 90],
  [26, 90],
  [27, 94],
]) as Theme;

export const light_red_alt1_Input = n394 as Theme;
export const light_red_alt1_TextArea = n394 as Theme;
const n395 = t([
  [12, 87],
  [13, 88],
  [14, 89],
  [15, 90],
  [16, 86],
  [17, 85],
  [18, 95],
  [19, 94],
  [20, 95],
  [21, 94],
  [22, 11],
  [23, 89],
  [24, 90],
  [25, 89],
  [26, 89],
  [27, 93],
]) as Theme;

export const light_red_alt2_ListItem = n395 as Theme;
const n396 = t([
  [12, 89],
  [13, 90],
  [14, 92],
  [15, 93],
  [16, 88],
  [17, 87],
  [18, 95],
  [19, 94],
  [20, 95],
  [21, 94],
  [22, 95],
  [23, 92],
  [24, 93],
  [25, 92],
  [26, 92],
  [27, 90],
]) as Theme;

export const light_red_alt2_Card = n396 as Theme;
export const light_red_alt2_DrawerFrame = n396 as Theme;
export const light_red_alt2_Progress = n396 as Theme;
export const light_red_alt2_TooltipArrow = n396 as Theme;
const n397 = t([
  [12, 90],
  [13, 92],
  [14, 93],
  [15, 94],
  [16, 89],
  [17, 88],
  [18, 95],
  [19, 94],
  [20, 95],
  [21, 94],
  [22, 94],
  [23, 242],
  [24, 242],
  [25, 93],
  [26, 93],
  [27, 89],
]) as Theme;

export const light_red_alt2_Button = n397 as Theme;
const n398 = t([
  [12, 90],
  [13, 92],
  [14, 93],
  [15, 94],
  [16, 89],
  [17, 88],
  [18, 95],
  [19, 94],
  [20, 95],
  [21, 94],
  [22, 94],
  [23, 93],
  [24, 94],
  [25, 93],
  [26, 93],
  [27, 89],
]) as Theme;

export const light_red_alt2_Checkbox = n398 as Theme;
export const light_red_alt2_Switch = n398 as Theme;
export const light_red_alt2_TooltipContent = n398 as Theme;
export const light_red_alt2_SliderTrack = n398 as Theme;
const n399 = t([
  [12, 96],
  [13, 95],
  [14, 94],
  [15, 93],
  [16, 11],
  [17, 11],
  [18, 87],
  [19, 88],
  [20, 87],
  [21, 88],
  [22, 85],
  [23, 94],
  [24, 93],
  [25, 94],
  [26, 94],
  [27, 88],
]) as Theme;

export const light_red_alt2_SwitchThumb = n399 as Theme;
const n400 = t([
  [12, 92],
  [13, 90],
  [14, 89],
  [15, 88],
  [16, 93],
  [17, 94],
  [18, 87],
  [19, 88],
  [20, 87],
  [21, 88],
  [22, 88],
  [23, 89],
  [24, 88],
  [25, 89],
  [26, 89],
  [27, 93],
]) as Theme;

export const light_red_alt2_SliderTrackActive = n400 as Theme;
const n401 = t([
  [12, 94],
  [13, 93],
  [14, 92],
  [15, 90],
  [16, 95],
  [17, 96],
  [18, 87],
  [19, 88],
  [20, 87],
  [21, 88],
  [22, 86],
  [23, 92],
  [24, 90],
  [25, 92],
  [26, 92],
  [27, 90],
]) as Theme;

export const light_red_alt2_SliderThumb = n401 as Theme;
export const light_red_alt2_Tooltip = n401 as Theme;
export const light_red_alt2_ProgressIndicator = n401 as Theme;
const n402 = t([
  [12, 87],
  [13, 88],
  [14, 89],
  [15, 90],
  [16, 86],
  [17, 85],
  [18, 95],
  [19, 94],
  [20, 95],
  [21, 94],
  [22, 11],
  [23, 92],
  [24, 93],
  [25, 92],
  [26, 92],
  [27, 93],
]) as Theme;

export const light_red_alt2_Input = n402 as Theme;
export const light_red_alt2_TextArea = n402 as Theme;
const n403 = t([
  [12, 88],
  [13, 89],
  [14, 90],
  [15, 92],
  [16, 87],
  [17, 86],
  [19, 93],
  [20, 94],
  [21, 93],
  [22, 96],
  [23, 90],
  [24, 92],
  [25, 90],
  [26, 90],
  [27, 92],
]) as Theme;

export const light_red_active_ListItem = n403 as Theme;
const n404 = t([
  [12, 90],
  [13, 92],
  [14, 93],
  [15, 94],
  [16, 89],
  [17, 88],
  [19, 93],
  [20, 94],
  [21, 93],
  [22, 94],
  [23, 93],
  [24, 94],
  [25, 93],
  [26, 93],
  [27, 89],
]) as Theme;

export const light_red_active_Card = n404 as Theme;
export const light_red_active_DrawerFrame = n404 as Theme;
export const light_red_active_Progress = n404 as Theme;
export const light_red_active_TooltipArrow = n404 as Theme;
const n405 = t([
  [12, 92],
  [13, 93],
  [14, 94],
  [15, 95],
  [16, 90],
  [17, 89],
  [19, 93],
  [20, 94],
  [21, 93],
  [22, 93],
  [23, 242],
  [24, 242],
  [25, 94],
  [26, 94],
  [27, 88],
]) as Theme;

export const light_red_active_Button = n405 as Theme;
const n406 = t([
  [12, 92],
  [13, 93],
  [14, 94],
  [15, 95],
  [16, 90],
  [17, 89],
  [19, 93],
  [20, 94],
  [21, 93],
  [22, 93],
  [23, 94],
  [24, 95],
  [25, 94],
  [26, 94],
  [27, 88],
]) as Theme;

export const light_red_active_Checkbox = n406 as Theme;
export const light_red_active_Switch = n406 as Theme;
export const light_red_active_TooltipContent = n406 as Theme;
export const light_red_active_SliderTrack = n406 as Theme;
const n407 = t([
  [12, 95],
  [13, 94],
  [14, 93],
  [15, 92],
  [16, 96],
  [17, 11],
  [19, 89],
  [20, 88],
  [21, 89],
  [22, 85],
  [23, 93],
  [24, 92],
  [25, 93],
  [26, 93],
  [27, 89],
]) as Theme;

export const light_red_active_SwitchThumb = n407 as Theme;
const n408 = t([
  [12, 90],
  [13, 89],
  [14, 88],
  [15, 87],
  [16, 92],
  [17, 93],
  [19, 89],
  [20, 88],
  [21, 89],
  [22, 89],
  [23, 88],
  [24, 87],
  [25, 88],
  [26, 88],
  [27, 94],
]) as Theme;

export const light_red_active_SliderTrackActive = n408 as Theme;
const n409 = t([
  [12, 93],
  [13, 92],
  [14, 90],
  [15, 89],
  [16, 94],
  [17, 95],
  [19, 89],
  [20, 88],
  [21, 89],
  [22, 87],
  [23, 90],
  [24, 89],
  [25, 90],
  [26, 90],
  [27, 92],
]) as Theme;

export const light_red_active_SliderThumb = n409 as Theme;
export const light_red_active_Tooltip = n409 as Theme;
export const light_red_active_ProgressIndicator = n409 as Theme;
const n410 = t([
  [12, 88],
  [13, 89],
  [14, 90],
  [15, 92],
  [16, 87],
  [17, 86],
  [19, 93],
  [20, 94],
  [21, 93],
  [22, 96],
  [23, 93],
  [24, 94],
  [25, 93],
  [26, 93],
  [27, 92],
]) as Theme;

export const light_red_active_Input = n410 as Theme;
export const light_red_active_TextArea = n410 as Theme;
const n411 = t([
  [12, 157],
  [13, 158],
  [14, 159],
  [15, 160],
  [16, 156],
  [17, 155],
  [18, 165],
  [19, 164],
  [20, 165],
  [21, 164],
  [22, 0],
  [23, 160],
  [24, 162],
  [25, 159],
  [26, 160],
  [27, 57],
]) as Theme;

export const dark_orange_alt1_ListItem = n411 as Theme;
const n412 = t([
  [12, 158],
  [13, 159],
  [14, 160],
  [15, 162],
  [16, 157],
  [17, 156],
  [18, 165],
  [19, 164],
  [20, 165],
  [21, 164],
  [22, 165],
  [23, 162],
  [24, 57],
  [25, 160],
  [26, 162],
  [27, 162],
]) as Theme;

export const dark_orange_alt1_Card = n412 as Theme;
export const dark_orange_alt1_DrawerFrame = n412 as Theme;
export const dark_orange_alt1_Progress = n412 as Theme;
export const dark_orange_alt1_TooltipArrow = n412 as Theme;
const n413 = t([
  [12, 159],
  [13, 160],
  [14, 162],
  [15, 57],
  [16, 158],
  [17, 157],
  [18, 165],
  [19, 164],
  [20, 165],
  [21, 164],
  [22, 164],
  [23, 242],
  [24, 242],
  [25, 162],
  [26, 57],
  [27, 160],
]) as Theme;

export const dark_orange_alt1_Button = n413 as Theme;
const n414 = t([
  [12, 159],
  [13, 160],
  [14, 162],
  [15, 57],
  [16, 158],
  [17, 157],
  [18, 165],
  [19, 164],
  [20, 165],
  [21, 164],
  [22, 164],
  [23, 57],
  [24, 163],
  [25, 162],
  [26, 57],
  [27, 160],
]) as Theme;

export const dark_orange_alt1_Checkbox = n414 as Theme;
export const dark_orange_alt1_Switch = n414 as Theme;
export const dark_orange_alt1_TooltipContent = n414 as Theme;
export const dark_orange_alt1_SliderTrack = n414 as Theme;
const n415 = t([
  [12, 0],
  [13, 165],
  [14, 164],
  [15, 163],
  [16, 0],
  [17, 0],
  [18, 156],
  [19, 157],
  [20, 156],
  [21, 157],
  [22, 155],
  [23, 163],
  [24, 57],
  [25, 164],
  [26, 163],
  [27, 157],
]) as Theme;

export const dark_orange_alt1_SwitchThumb = n415 as Theme;
const n416 = t([
  [12, 57],
  [13, 162],
  [14, 160],
  [15, 159],
  [16, 163],
  [17, 164],
  [18, 156],
  [19, 157],
  [20, 156],
  [21, 157],
  [22, 157],
  [23, 159],
  [24, 158],
  [25, 160],
  [26, 159],
  [27, 162],
]) as Theme;

export const dark_orange_alt1_SliderTrackActive = n416 as Theme;
const n417 = t([
  [12, 164],
  [13, 163],
  [14, 57],
  [15, 162],
  [16, 165],
  [17, 0],
  [18, 156],
  [19, 157],
  [20, 156],
  [21, 157],
  [22, 155],
  [23, 162],
  [24, 160],
  [25, 57],
  [26, 162],
  [27, 159],
]) as Theme;

export const dark_orange_alt1_SliderThumb = n417 as Theme;
export const dark_orange_alt1_Tooltip = n417 as Theme;
export const dark_orange_alt1_ProgressIndicator = n417 as Theme;
const n418 = t([
  [12, 157],
  [13, 158],
  [14, 159],
  [15, 160],
  [16, 156],
  [17, 155],
  [18, 165],
  [19, 164],
  [20, 165],
  [21, 164],
  [22, 0],
  [23, 162],
  [24, 57],
  [25, 160],
  [26, 162],
  [27, 57],
]) as Theme;

export const dark_orange_alt1_Input = n418 as Theme;
export const dark_orange_alt1_TextArea = n418 as Theme;
const n419 = t([
  [12, 158],
  [13, 159],
  [14, 160],
  [15, 162],
  [16, 157],
  [17, 156],
  [18, 164],
  [19, 163],
  [20, 164],
  [21, 163],
  [22, 165],
  [23, 162],
  [24, 57],
  [25, 160],
  [26, 162],
  [27, 162],
]) as Theme;

export const dark_orange_alt2_ListItem = n419 as Theme;
const n420 = t([
  [12, 159],
  [13, 160],
  [14, 162],
  [15, 57],
  [16, 158],
  [17, 157],
  [18, 164],
  [19, 163],
  [20, 164],
  [21, 163],
  [22, 164],
  [23, 57],
  [24, 163],
  [25, 162],
  [26, 57],
  [27, 160],
]) as Theme;

export const dark_orange_alt2_Card = n420 as Theme;
export const dark_orange_alt2_DrawerFrame = n420 as Theme;
export const dark_orange_alt2_Progress = n420 as Theme;
export const dark_orange_alt2_TooltipArrow = n420 as Theme;
const n421 = t([
  [12, 160],
  [13, 162],
  [14, 57],
  [15, 163],
  [16, 159],
  [17, 158],
  [18, 164],
  [19, 163],
  [20, 164],
  [21, 163],
  [22, 163],
  [23, 242],
  [24, 242],
  [25, 57],
  [26, 163],
  [27, 159],
]) as Theme;

export const dark_orange_alt2_Button = n421 as Theme;
const n422 = t([
  [12, 160],
  [13, 162],
  [14, 57],
  [15, 163],
  [16, 159],
  [17, 158],
  [18, 164],
  [19, 163],
  [20, 164],
  [21, 163],
  [22, 163],
  [23, 163],
  [24, 164],
  [25, 57],
  [26, 163],
  [27, 159],
]) as Theme;

export const dark_orange_alt2_Checkbox = n422 as Theme;
export const dark_orange_alt2_Switch = n422 as Theme;
export const dark_orange_alt2_TooltipContent = n422 as Theme;
export const dark_orange_alt2_SliderTrack = n422 as Theme;
const n423 = t([
  [12, 165],
  [13, 164],
  [14, 163],
  [15, 57],
  [16, 0],
  [17, 0],
  [18, 157],
  [19, 158],
  [20, 157],
  [21, 158],
  [22, 155],
  [23, 57],
  [24, 162],
  [25, 163],
  [26, 57],
  [27, 158],
]) as Theme;

export const dark_orange_alt2_SwitchThumb = n423 as Theme;
const n424 = t([
  [12, 162],
  [13, 160],
  [14, 159],
  [15, 158],
  [16, 57],
  [17, 163],
  [18, 157],
  [19, 158],
  [20, 157],
  [21, 158],
  [22, 158],
  [23, 158],
  [24, 157],
  [25, 159],
  [26, 158],
  [27, 57],
]) as Theme;

export const dark_orange_alt2_SliderTrackActive = n424 as Theme;
const n425 = t([
  [12, 163],
  [13, 57],
  [14, 162],
  [15, 160],
  [16, 164],
  [17, 165],
  [18, 157],
  [19, 158],
  [20, 157],
  [21, 158],
  [22, 156],
  [23, 160],
  [24, 159],
  [25, 162],
  [26, 160],
  [27, 160],
]) as Theme;

export const dark_orange_alt2_SliderThumb = n425 as Theme;
export const dark_orange_alt2_Tooltip = n425 as Theme;
export const dark_orange_alt2_ProgressIndicator = n425 as Theme;
const n426 = t([
  [12, 158],
  [13, 159],
  [14, 160],
  [15, 162],
  [16, 157],
  [17, 156],
  [18, 164],
  [19, 163],
  [20, 164],
  [21, 163],
  [22, 165],
  [23, 57],
  [24, 163],
  [25, 162],
  [26, 57],
  [27, 162],
]) as Theme;

export const dark_orange_alt2_Input = n426 as Theme;
export const dark_orange_alt2_TextArea = n426 as Theme;
const n427 = t([
  [12, 159],
  [13, 160],
  [14, 162],
  [15, 57],
  [16, 158],
  [17, 157],
  [19, 57],
  [20, 163],
  [21, 57],
  [22, 164],
  [23, 57],
  [24, 163],
  [25, 162],
  [26, 57],
  [27, 160],
]) as Theme;

export const dark_orange_active_ListItem = n427 as Theme;
const n428 = t([
  [12, 160],
  [13, 162],
  [14, 57],
  [15, 163],
  [16, 159],
  [17, 158],
  [19, 57],
  [20, 163],
  [21, 57],
  [22, 163],
  [23, 163],
  [24, 164],
  [25, 57],
  [26, 163],
  [27, 159],
]) as Theme;

export const dark_orange_active_Card = n428 as Theme;
export const dark_orange_active_DrawerFrame = n428 as Theme;
export const dark_orange_active_Progress = n428 as Theme;
export const dark_orange_active_TooltipArrow = n428 as Theme;
const n429 = t([
  [12, 162],
  [13, 57],
  [14, 163],
  [15, 164],
  [16, 160],
  [17, 159],
  [19, 57],
  [20, 163],
  [21, 57],
  [22, 57],
  [23, 242],
  [24, 242],
  [25, 163],
  [26, 164],
  [27, 158],
]) as Theme;

export const dark_orange_active_Button = n429 as Theme;
const n430 = t([
  [12, 162],
  [13, 57],
  [14, 163],
  [15, 164],
  [16, 160],
  [17, 159],
  [19, 57],
  [20, 163],
  [21, 57],
  [22, 57],
  [23, 164],
  [24, 165],
  [25, 163],
  [26, 164],
  [27, 158],
]) as Theme;

export const dark_orange_active_Checkbox = n430 as Theme;
export const dark_orange_active_Switch = n430 as Theme;
export const dark_orange_active_TooltipContent = n430 as Theme;
export const dark_orange_active_SliderTrack = n430 as Theme;
const n431 = t([
  [12, 164],
  [13, 163],
  [14, 57],
  [15, 162],
  [16, 165],
  [17, 0],
  [19, 159],
  [20, 158],
  [21, 159],
  [22, 155],
  [23, 162],
  [24, 160],
  [25, 57],
  [26, 162],
  [27, 159],
]) as Theme;

export const dark_orange_active_SwitchThumb = n431 as Theme;
const n432 = t([
  [12, 160],
  [13, 159],
  [14, 158],
  [15, 157],
  [16, 162],
  [17, 57],
  [19, 159],
  [20, 158],
  [21, 159],
  [22, 159],
  [23, 157],
  [24, 156],
  [25, 158],
  [26, 157],
  [27, 163],
]) as Theme;

export const dark_orange_active_SliderTrackActive = n432 as Theme;
const n433 = t([
  [12, 57],
  [13, 162],
  [14, 160],
  [15, 159],
  [16, 163],
  [17, 164],
  [19, 159],
  [20, 158],
  [21, 159],
  [22, 157],
  [23, 159],
  [24, 158],
  [25, 160],
  [26, 159],
  [27, 162],
]) as Theme;

export const dark_orange_active_SliderThumb = n433 as Theme;
export const dark_orange_active_Tooltip = n433 as Theme;
export const dark_orange_active_ProgressIndicator = n433 as Theme;
const n434 = t([
  [12, 159],
  [13, 160],
  [14, 162],
  [15, 57],
  [16, 158],
  [17, 157],
  [19, 57],
  [20, 163],
  [21, 57],
  [22, 164],
  [23, 163],
  [24, 164],
  [25, 57],
  [26, 163],
  [27, 160],
]) as Theme;

export const dark_orange_active_Input = n434 as Theme;
export const dark_orange_active_TextArea = n434 as Theme;
const n435 = t([
  [12, 201],
  [13, 202],
  [14, 203],
  [15, 204],
  [16, 200],
  [17, 199],
  [18, 209],
  [19, 208],
  [20, 209],
  [21, 208],
  [22, 0],
  [23, 204],
  [24, 206],
  [25, 203],
  [26, 204],
  [27, 105],
]) as Theme;

export const dark_yellow_alt1_ListItem = n435 as Theme;
const n436 = t([
  [12, 202],
  [13, 203],
  [14, 204],
  [15, 206],
  [16, 201],
  [17, 200],
  [18, 209],
  [19, 208],
  [20, 209],
  [21, 208],
  [22, 209],
  [23, 206],
  [24, 105],
  [25, 204],
  [26, 206],
  [27, 206],
]) as Theme;

export const dark_yellow_alt1_Card = n436 as Theme;
export const dark_yellow_alt1_DrawerFrame = n436 as Theme;
export const dark_yellow_alt1_Progress = n436 as Theme;
export const dark_yellow_alt1_TooltipArrow = n436 as Theme;
const n437 = t([
  [12, 203],
  [13, 204],
  [14, 206],
  [15, 105],
  [16, 202],
  [17, 201],
  [18, 209],
  [19, 208],
  [20, 209],
  [21, 208],
  [22, 208],
  [23, 242],
  [24, 242],
  [25, 206],
  [26, 105],
  [27, 204],
]) as Theme;

export const dark_yellow_alt1_Button = n437 as Theme;
const n438 = t([
  [12, 203],
  [13, 204],
  [14, 206],
  [15, 105],
  [16, 202],
  [17, 201],
  [18, 209],
  [19, 208],
  [20, 209],
  [21, 208],
  [22, 208],
  [23, 105],
  [24, 207],
  [25, 206],
  [26, 105],
  [27, 204],
]) as Theme;

export const dark_yellow_alt1_Checkbox = n438 as Theme;
export const dark_yellow_alt1_Switch = n438 as Theme;
export const dark_yellow_alt1_TooltipContent = n438 as Theme;
export const dark_yellow_alt1_SliderTrack = n438 as Theme;
const n439 = t([
  [12, 0],
  [13, 209],
  [14, 208],
  [15, 207],
  [16, 0],
  [17, 0],
  [18, 200],
  [19, 201],
  [20, 200],
  [21, 201],
  [22, 199],
  [23, 207],
  [24, 105],
  [25, 208],
  [26, 207],
  [27, 201],
]) as Theme;

export const dark_yellow_alt1_SwitchThumb = n439 as Theme;
const n440 = t([
  [12, 105],
  [13, 206],
  [14, 204],
  [15, 203],
  [16, 207],
  [17, 208],
  [18, 200],
  [19, 201],
  [20, 200],
  [21, 201],
  [22, 201],
  [23, 203],
  [24, 202],
  [25, 204],
  [26, 203],
  [27, 206],
]) as Theme;

export const dark_yellow_alt1_SliderTrackActive = n440 as Theme;
const n441 = t([
  [12, 208],
  [13, 207],
  [14, 105],
  [15, 206],
  [16, 209],
  [17, 0],
  [18, 200],
  [19, 201],
  [20, 200],
  [21, 201],
  [22, 199],
  [23, 206],
  [24, 204],
  [25, 105],
  [26, 206],
  [27, 203],
]) as Theme;

export const dark_yellow_alt1_SliderThumb = n441 as Theme;
export const dark_yellow_alt1_Tooltip = n441 as Theme;
export const dark_yellow_alt1_ProgressIndicator = n441 as Theme;
const n442 = t([
  [12, 201],
  [13, 202],
  [14, 203],
  [15, 204],
  [16, 200],
  [17, 199],
  [18, 209],
  [19, 208],
  [20, 209],
  [21, 208],
  [22, 0],
  [23, 206],
  [24, 105],
  [25, 204],
  [26, 206],
  [27, 105],
]) as Theme;

export const dark_yellow_alt1_Input = n442 as Theme;
export const dark_yellow_alt1_TextArea = n442 as Theme;
const n443 = t([
  [12, 202],
  [13, 203],
  [14, 204],
  [15, 206],
  [16, 201],
  [17, 200],
  [18, 208],
  [19, 207],
  [20, 208],
  [21, 207],
  [22, 209],
  [23, 206],
  [24, 105],
  [25, 204],
  [26, 206],
  [27, 206],
]) as Theme;

export const dark_yellow_alt2_ListItem = n443 as Theme;
const n444 = t([
  [12, 203],
  [13, 204],
  [14, 206],
  [15, 105],
  [16, 202],
  [17, 201],
  [18, 208],
  [19, 207],
  [20, 208],
  [21, 207],
  [22, 208],
  [23, 105],
  [24, 207],
  [25, 206],
  [26, 105],
  [27, 204],
]) as Theme;

export const dark_yellow_alt2_Card = n444 as Theme;
export const dark_yellow_alt2_DrawerFrame = n444 as Theme;
export const dark_yellow_alt2_Progress = n444 as Theme;
export const dark_yellow_alt2_TooltipArrow = n444 as Theme;
const n445 = t([
  [12, 204],
  [13, 206],
  [14, 105],
  [15, 207],
  [16, 203],
  [17, 202],
  [18, 208],
  [19, 207],
  [20, 208],
  [21, 207],
  [22, 207],
  [23, 242],
  [24, 242],
  [25, 105],
  [26, 207],
  [27, 203],
]) as Theme;

export const dark_yellow_alt2_Button = n445 as Theme;
const n446 = t([
  [12, 204],
  [13, 206],
  [14, 105],
  [15, 207],
  [16, 203],
  [17, 202],
  [18, 208],
  [19, 207],
  [20, 208],
  [21, 207],
  [22, 207],
  [23, 207],
  [24, 208],
  [25, 105],
  [26, 207],
  [27, 203],
]) as Theme;

export const dark_yellow_alt2_Checkbox = n446 as Theme;
export const dark_yellow_alt2_Switch = n446 as Theme;
export const dark_yellow_alt2_TooltipContent = n446 as Theme;
export const dark_yellow_alt2_SliderTrack = n446 as Theme;
const n447 = t([
  [12, 209],
  [13, 208],
  [14, 207],
  [15, 105],
  [16, 0],
  [17, 0],
  [18, 201],
  [19, 202],
  [20, 201],
  [21, 202],
  [22, 199],
  [23, 105],
  [24, 206],
  [25, 207],
  [26, 105],
  [27, 202],
]) as Theme;

export const dark_yellow_alt2_SwitchThumb = n447 as Theme;
const n448 = t([
  [12, 206],
  [13, 204],
  [14, 203],
  [15, 202],
  [16, 105],
  [17, 207],
  [18, 201],
  [19, 202],
  [20, 201],
  [21, 202],
  [22, 202],
  [23, 202],
  [24, 201],
  [25, 203],
  [26, 202],
  [27, 105],
]) as Theme;

export const dark_yellow_alt2_SliderTrackActive = n448 as Theme;
const n449 = t([
  [12, 207],
  [13, 105],
  [14, 206],
  [15, 204],
  [16, 208],
  [17, 209],
  [18, 201],
  [19, 202],
  [20, 201],
  [21, 202],
  [22, 200],
  [23, 204],
  [24, 203],
  [25, 206],
  [26, 204],
  [27, 204],
]) as Theme;

export const dark_yellow_alt2_SliderThumb = n449 as Theme;
export const dark_yellow_alt2_Tooltip = n449 as Theme;
export const dark_yellow_alt2_ProgressIndicator = n449 as Theme;
const n450 = t([
  [12, 202],
  [13, 203],
  [14, 204],
  [15, 206],
  [16, 201],
  [17, 200],
  [18, 208],
  [19, 207],
  [20, 208],
  [21, 207],
  [22, 209],
  [23, 105],
  [24, 207],
  [25, 206],
  [26, 105],
  [27, 206],
]) as Theme;

export const dark_yellow_alt2_Input = n450 as Theme;
export const dark_yellow_alt2_TextArea = n450 as Theme;
const n451 = t([
  [12, 203],
  [13, 204],
  [14, 206],
  [15, 105],
  [16, 202],
  [17, 201],
  [19, 105],
  [20, 207],
  [21, 105],
  [22, 208],
  [23, 105],
  [24, 207],
  [25, 206],
  [26, 105],
  [27, 204],
]) as Theme;

export const dark_yellow_active_ListItem = n451 as Theme;
const n452 = t([
  [12, 204],
  [13, 206],
  [14, 105],
  [15, 207],
  [16, 203],
  [17, 202],
  [19, 105],
  [20, 207],
  [21, 105],
  [22, 207],
  [23, 207],
  [24, 208],
  [25, 105],
  [26, 207],
  [27, 203],
]) as Theme;

export const dark_yellow_active_Card = n452 as Theme;
export const dark_yellow_active_DrawerFrame = n452 as Theme;
export const dark_yellow_active_Progress = n452 as Theme;
export const dark_yellow_active_TooltipArrow = n452 as Theme;
const n453 = t([
  [12, 206],
  [13, 105],
  [14, 207],
  [15, 208],
  [16, 204],
  [17, 203],
  [19, 105],
  [20, 207],
  [21, 105],
  [22, 105],
  [23, 242],
  [24, 242],
  [25, 207],
  [26, 208],
  [27, 202],
]) as Theme;

export const dark_yellow_active_Button = n453 as Theme;
const n454 = t([
  [12, 206],
  [13, 105],
  [14, 207],
  [15, 208],
  [16, 204],
  [17, 203],
  [19, 105],
  [20, 207],
  [21, 105],
  [22, 105],
  [23, 208],
  [24, 209],
  [25, 207],
  [26, 208],
  [27, 202],
]) as Theme;

export const dark_yellow_active_Checkbox = n454 as Theme;
export const dark_yellow_active_Switch = n454 as Theme;
export const dark_yellow_active_TooltipContent = n454 as Theme;
export const dark_yellow_active_SliderTrack = n454 as Theme;
const n455 = t([
  [12, 208],
  [13, 207],
  [14, 105],
  [15, 206],
  [16, 209],
  [17, 0],
  [19, 203],
  [20, 202],
  [21, 203],
  [22, 199],
  [23, 206],
  [24, 204],
  [25, 105],
  [26, 206],
  [27, 203],
]) as Theme;

export const dark_yellow_active_SwitchThumb = n455 as Theme;
const n456 = t([
  [12, 204],
  [13, 203],
  [14, 202],
  [15, 201],
  [16, 206],
  [17, 105],
  [19, 203],
  [20, 202],
  [21, 203],
  [22, 203],
  [23, 201],
  [24, 200],
  [25, 202],
  [26, 201],
  [27, 207],
]) as Theme;

export const dark_yellow_active_SliderTrackActive = n456 as Theme;
const n457 = t([
  [12, 105],
  [13, 206],
  [14, 204],
  [15, 203],
  [16, 207],
  [17, 208],
  [19, 203],
  [20, 202],
  [21, 203],
  [22, 201],
  [23, 203],
  [24, 202],
  [25, 204],
  [26, 203],
  [27, 206],
]) as Theme;

export const dark_yellow_active_SliderThumb = n457 as Theme;
export const dark_yellow_active_Tooltip = n457 as Theme;
export const dark_yellow_active_ProgressIndicator = n457 as Theme;
const n458 = t([
  [12, 203],
  [13, 204],
  [14, 206],
  [15, 105],
  [16, 202],
  [17, 201],
  [19, 105],
  [20, 207],
  [21, 105],
  [22, 208],
  [23, 207],
  [24, 208],
  [25, 105],
  [26, 207],
  [27, 204],
]) as Theme;

export const dark_yellow_active_Input = n458 as Theme;
export const dark_yellow_active_TextArea = n458 as Theme;
const n459 = t([
  [12, 146],
  [13, 147],
  [14, 148],
  [15, 149],
  [16, 145],
  [17, 144],
  [18, 154],
  [19, 153],
  [20, 154],
  [21, 153],
  [22, 0],
  [23, 149],
  [24, 151],
  [25, 148],
  [26, 149],
  [27, 45],
]) as Theme;

export const dark_green_alt1_ListItem = n459 as Theme;
const n460 = t([
  [12, 147],
  [13, 148],
  [14, 149],
  [15, 151],
  [16, 146],
  [17, 145],
  [18, 154],
  [19, 153],
  [20, 154],
  [21, 153],
  [22, 154],
  [23, 151],
  [24, 45],
  [25, 149],
  [26, 151],
  [27, 151],
]) as Theme;

export const dark_green_alt1_Card = n460 as Theme;
export const dark_green_alt1_DrawerFrame = n460 as Theme;
export const dark_green_alt1_Progress = n460 as Theme;
export const dark_green_alt1_TooltipArrow = n460 as Theme;
const n461 = t([
  [12, 148],
  [13, 149],
  [14, 151],
  [15, 45],
  [16, 147],
  [17, 146],
  [18, 154],
  [19, 153],
  [20, 154],
  [21, 153],
  [22, 153],
  [23, 242],
  [24, 242],
  [25, 151],
  [26, 45],
  [27, 149],
]) as Theme;

export const dark_green_alt1_Button = n461 as Theme;
const n462 = t([
  [12, 148],
  [13, 149],
  [14, 151],
  [15, 45],
  [16, 147],
  [17, 146],
  [18, 154],
  [19, 153],
  [20, 154],
  [21, 153],
  [22, 153],
  [23, 45],
  [24, 152],
  [25, 151],
  [26, 45],
  [27, 149],
]) as Theme;

export const dark_green_alt1_Checkbox = n462 as Theme;
export const dark_green_alt1_Switch = n462 as Theme;
export const dark_green_alt1_TooltipContent = n462 as Theme;
export const dark_green_alt1_SliderTrack = n462 as Theme;
const n463 = t([
  [12, 0],
  [13, 154],
  [14, 153],
  [15, 152],
  [16, 0],
  [17, 0],
  [18, 145],
  [19, 146],
  [20, 145],
  [21, 146],
  [22, 144],
  [23, 152],
  [24, 45],
  [25, 153],
  [26, 152],
  [27, 146],
]) as Theme;

export const dark_green_alt1_SwitchThumb = n463 as Theme;
const n464 = t([
  [12, 45],
  [13, 151],
  [14, 149],
  [15, 148],
  [16, 152],
  [17, 153],
  [18, 145],
  [19, 146],
  [20, 145],
  [21, 146],
  [22, 146],
  [23, 148],
  [24, 147],
  [25, 149],
  [26, 148],
  [27, 151],
]) as Theme;

export const dark_green_alt1_SliderTrackActive = n464 as Theme;
const n465 = t([
  [12, 153],
  [13, 152],
  [14, 45],
  [15, 151],
  [16, 154],
  [17, 0],
  [18, 145],
  [19, 146],
  [20, 145],
  [21, 146],
  [22, 144],
  [23, 151],
  [24, 149],
  [25, 45],
  [26, 151],
  [27, 148],
]) as Theme;

export const dark_green_alt1_SliderThumb = n465 as Theme;
export const dark_green_alt1_Tooltip = n465 as Theme;
export const dark_green_alt1_ProgressIndicator = n465 as Theme;
const n466 = t([
  [12, 146],
  [13, 147],
  [14, 148],
  [15, 149],
  [16, 145],
  [17, 144],
  [18, 154],
  [19, 153],
  [20, 154],
  [21, 153],
  [22, 0],
  [23, 151],
  [24, 45],
  [25, 149],
  [26, 151],
  [27, 45],
]) as Theme;

export const dark_green_alt1_Input = n466 as Theme;
export const dark_green_alt1_TextArea = n466 as Theme;
const n467 = t([
  [12, 147],
  [13, 148],
  [14, 149],
  [15, 151],
  [16, 146],
  [17, 145],
  [18, 153],
  [19, 152],
  [20, 153],
  [21, 152],
  [22, 154],
  [23, 151],
  [24, 45],
  [25, 149],
  [26, 151],
  [27, 151],
]) as Theme;

export const dark_green_alt2_ListItem = n467 as Theme;
const n468 = t([
  [12, 148],
  [13, 149],
  [14, 151],
  [15, 45],
  [16, 147],
  [17, 146],
  [18, 153],
  [19, 152],
  [20, 153],
  [21, 152],
  [22, 153],
  [23, 45],
  [24, 152],
  [25, 151],
  [26, 45],
  [27, 149],
]) as Theme;

export const dark_green_alt2_Card = n468 as Theme;
export const dark_green_alt2_DrawerFrame = n468 as Theme;
export const dark_green_alt2_Progress = n468 as Theme;
export const dark_green_alt2_TooltipArrow = n468 as Theme;
const n469 = t([
  [12, 149],
  [13, 151],
  [14, 45],
  [15, 152],
  [16, 148],
  [17, 147],
  [18, 153],
  [19, 152],
  [20, 153],
  [21, 152],
  [22, 152],
  [23, 242],
  [24, 242],
  [25, 45],
  [26, 152],
  [27, 148],
]) as Theme;

export const dark_green_alt2_Button = n469 as Theme;
const n470 = t([
  [12, 149],
  [13, 151],
  [14, 45],
  [15, 152],
  [16, 148],
  [17, 147],
  [18, 153],
  [19, 152],
  [20, 153],
  [21, 152],
  [22, 152],
  [23, 152],
  [24, 153],
  [25, 45],
  [26, 152],
  [27, 148],
]) as Theme;

export const dark_green_alt2_Checkbox = n470 as Theme;
export const dark_green_alt2_Switch = n470 as Theme;
export const dark_green_alt2_TooltipContent = n470 as Theme;
export const dark_green_alt2_SliderTrack = n470 as Theme;
const n471 = t([
  [12, 154],
  [13, 153],
  [14, 152],
  [15, 45],
  [16, 0],
  [17, 0],
  [18, 146],
  [19, 147],
  [20, 146],
  [21, 147],
  [22, 144],
  [23, 45],
  [24, 151],
  [25, 152],
  [26, 45],
  [27, 147],
]) as Theme;

export const dark_green_alt2_SwitchThumb = n471 as Theme;
const n472 = t([
  [12, 151],
  [13, 149],
  [14, 148],
  [15, 147],
  [16, 45],
  [17, 152],
  [18, 146],
  [19, 147],
  [20, 146],
  [21, 147],
  [22, 147],
  [23, 147],
  [24, 146],
  [25, 148],
  [26, 147],
  [27, 45],
]) as Theme;

export const dark_green_alt2_SliderTrackActive = n472 as Theme;
const n473 = t([
  [12, 152],
  [13, 45],
  [14, 151],
  [15, 149],
  [16, 153],
  [17, 154],
  [18, 146],
  [19, 147],
  [20, 146],
  [21, 147],
  [22, 145],
  [23, 149],
  [24, 148],
  [25, 151],
  [26, 149],
  [27, 149],
]) as Theme;

export const dark_green_alt2_SliderThumb = n473 as Theme;
export const dark_green_alt2_Tooltip = n473 as Theme;
export const dark_green_alt2_ProgressIndicator = n473 as Theme;
const n474 = t([
  [12, 147],
  [13, 148],
  [14, 149],
  [15, 151],
  [16, 146],
  [17, 145],
  [18, 153],
  [19, 152],
  [20, 153],
  [21, 152],
  [22, 154],
  [23, 45],
  [24, 152],
  [25, 151],
  [26, 45],
  [27, 151],
]) as Theme;

export const dark_green_alt2_Input = n474 as Theme;
export const dark_green_alt2_TextArea = n474 as Theme;
const n475 = t([
  [12, 148],
  [13, 149],
  [14, 151],
  [15, 45],
  [16, 147],
  [17, 146],
  [19, 45],
  [20, 152],
  [21, 45],
  [22, 153],
  [23, 45],
  [24, 152],
  [25, 151],
  [26, 45],
  [27, 149],
]) as Theme;

export const dark_green_active_ListItem = n475 as Theme;
const n476 = t([
  [12, 149],
  [13, 151],
  [14, 45],
  [15, 152],
  [16, 148],
  [17, 147],
  [19, 45],
  [20, 152],
  [21, 45],
  [22, 152],
  [23, 152],
  [24, 153],
  [25, 45],
  [26, 152],
  [27, 148],
]) as Theme;

export const dark_green_active_Card = n476 as Theme;
export const dark_green_active_DrawerFrame = n476 as Theme;
export const dark_green_active_Progress = n476 as Theme;
export const dark_green_active_TooltipArrow = n476 as Theme;
const n477 = t([
  [12, 151],
  [13, 45],
  [14, 152],
  [15, 153],
  [16, 149],
  [17, 148],
  [19, 45],
  [20, 152],
  [21, 45],
  [22, 45],
  [23, 242],
  [24, 242],
  [25, 152],
  [26, 153],
  [27, 147],
]) as Theme;

export const dark_green_active_Button = n477 as Theme;
const n478 = t([
  [12, 151],
  [13, 45],
  [14, 152],
  [15, 153],
  [16, 149],
  [17, 148],
  [19, 45],
  [20, 152],
  [21, 45],
  [22, 45],
  [23, 153],
  [24, 154],
  [25, 152],
  [26, 153],
  [27, 147],
]) as Theme;

export const dark_green_active_Checkbox = n478 as Theme;
export const dark_green_active_Switch = n478 as Theme;
export const dark_green_active_TooltipContent = n478 as Theme;
export const dark_green_active_SliderTrack = n478 as Theme;
const n479 = t([
  [12, 153],
  [13, 152],
  [14, 45],
  [15, 151],
  [16, 154],
  [17, 0],
  [19, 148],
  [20, 147],
  [21, 148],
  [22, 144],
  [23, 151],
  [24, 149],
  [25, 45],
  [26, 151],
  [27, 148],
]) as Theme;

export const dark_green_active_SwitchThumb = n479 as Theme;
const n480 = t([
  [12, 149],
  [13, 148],
  [14, 147],
  [15, 146],
  [16, 151],
  [17, 45],
  [19, 148],
  [20, 147],
  [21, 148],
  [22, 148],
  [23, 146],
  [24, 145],
  [25, 147],
  [26, 146],
  [27, 152],
]) as Theme;

export const dark_green_active_SliderTrackActive = n480 as Theme;
const n481 = t([
  [12, 45],
  [13, 151],
  [14, 149],
  [15, 148],
  [16, 152],
  [17, 153],
  [19, 148],
  [20, 147],
  [21, 148],
  [22, 146],
  [23, 148],
  [24, 147],
  [25, 149],
  [26, 148],
  [27, 151],
]) as Theme;

export const dark_green_active_SliderThumb = n481 as Theme;
export const dark_green_active_Tooltip = n481 as Theme;
export const dark_green_active_ProgressIndicator = n481 as Theme;
const n482 = t([
  [12, 148],
  [13, 149],
  [14, 151],
  [15, 45],
  [16, 147],
  [17, 146],
  [19, 45],
  [20, 152],
  [21, 45],
  [22, 153],
  [23, 152],
  [24, 153],
  [25, 45],
  [26, 152],
  [27, 149],
]) as Theme;

export const dark_green_active_Input = n482 as Theme;
export const dark_green_active_TextArea = n482 as Theme;
const n483 = t([
  [12, 124],
  [13, 125],
  [14, 126],
  [15, 127],
  [16, 123],
  [17, 122],
  [18, 132],
  [19, 131],
  [20, 132],
  [21, 131],
  [22, 0],
  [23, 127],
  [24, 129],
  [25, 126],
  [26, 127],
  [27, 22],
]) as Theme;

export const dark_blue_alt1_ListItem = n483 as Theme;
const n484 = t([
  [12, 125],
  [13, 126],
  [14, 127],
  [15, 129],
  [16, 124],
  [17, 123],
  [18, 132],
  [19, 131],
  [20, 132],
  [21, 131],
  [22, 132],
  [23, 129],
  [24, 22],
  [25, 127],
  [26, 129],
  [27, 129],
]) as Theme;

export const dark_blue_alt1_Card = n484 as Theme;
export const dark_blue_alt1_DrawerFrame = n484 as Theme;
export const dark_blue_alt1_Progress = n484 as Theme;
export const dark_blue_alt1_TooltipArrow = n484 as Theme;
const n485 = t([
  [12, 126],
  [13, 127],
  [14, 129],
  [15, 22],
  [16, 125],
  [17, 124],
  [18, 132],
  [19, 131],
  [20, 132],
  [21, 131],
  [22, 131],
  [23, 242],
  [24, 242],
  [25, 129],
  [26, 22],
  [27, 127],
]) as Theme;

export const dark_blue_alt1_Button = n485 as Theme;
const n486 = t([
  [12, 126],
  [13, 127],
  [14, 129],
  [15, 22],
  [16, 125],
  [17, 124],
  [18, 132],
  [19, 131],
  [20, 132],
  [21, 131],
  [22, 131],
  [23, 22],
  [24, 130],
  [25, 129],
  [26, 22],
  [27, 127],
]) as Theme;

export const dark_blue_alt1_Checkbox = n486 as Theme;
export const dark_blue_alt1_Switch = n486 as Theme;
export const dark_blue_alt1_TooltipContent = n486 as Theme;
export const dark_blue_alt1_SliderTrack = n486 as Theme;
const n487 = t([
  [12, 0],
  [13, 132],
  [14, 131],
  [15, 130],
  [16, 0],
  [17, 0],
  [18, 123],
  [19, 124],
  [20, 123],
  [21, 124],
  [22, 122],
  [23, 130],
  [24, 22],
  [25, 131],
  [26, 130],
  [27, 124],
]) as Theme;

export const dark_blue_alt1_SwitchThumb = n487 as Theme;
const n488 = t([
  [12, 22],
  [13, 129],
  [14, 127],
  [15, 126],
  [16, 130],
  [17, 131],
  [18, 123],
  [19, 124],
  [20, 123],
  [21, 124],
  [22, 124],
  [23, 126],
  [24, 125],
  [25, 127],
  [26, 126],
  [27, 129],
]) as Theme;

export const dark_blue_alt1_SliderTrackActive = n488 as Theme;
const n489 = t([
  [12, 131],
  [13, 130],
  [14, 22],
  [15, 129],
  [16, 132],
  [17, 0],
  [18, 123],
  [19, 124],
  [20, 123],
  [21, 124],
  [22, 122],
  [23, 129],
  [24, 127],
  [25, 22],
  [26, 129],
  [27, 126],
]) as Theme;

export const dark_blue_alt1_SliderThumb = n489 as Theme;
export const dark_blue_alt1_Tooltip = n489 as Theme;
export const dark_blue_alt1_ProgressIndicator = n489 as Theme;
const n490 = t([
  [12, 124],
  [13, 125],
  [14, 126],
  [15, 127],
  [16, 123],
  [17, 122],
  [18, 132],
  [19, 131],
  [20, 132],
  [21, 131],
  [22, 0],
  [23, 129],
  [24, 22],
  [25, 127],
  [26, 129],
  [27, 22],
]) as Theme;

export const dark_blue_alt1_Input = n490 as Theme;
export const dark_blue_alt1_TextArea = n490 as Theme;
const n491 = t([
  [12, 125],
  [13, 126],
  [14, 127],
  [15, 129],
  [16, 124],
  [17, 123],
  [18, 131],
  [19, 130],
  [20, 131],
  [21, 130],
  [22, 132],
  [23, 129],
  [24, 22],
  [25, 127],
  [26, 129],
  [27, 129],
]) as Theme;

export const dark_blue_alt2_ListItem = n491 as Theme;
const n492 = t([
  [12, 126],
  [13, 127],
  [14, 129],
  [15, 22],
  [16, 125],
  [17, 124],
  [18, 131],
  [19, 130],
  [20, 131],
  [21, 130],
  [22, 131],
  [23, 22],
  [24, 130],
  [25, 129],
  [26, 22],
  [27, 127],
]) as Theme;

export const dark_blue_alt2_Card = n492 as Theme;
export const dark_blue_alt2_DrawerFrame = n492 as Theme;
export const dark_blue_alt2_Progress = n492 as Theme;
export const dark_blue_alt2_TooltipArrow = n492 as Theme;
const n493 = t([
  [12, 127],
  [13, 129],
  [14, 22],
  [15, 130],
  [16, 126],
  [17, 125],
  [18, 131],
  [19, 130],
  [20, 131],
  [21, 130],
  [22, 130],
  [23, 242],
  [24, 242],
  [25, 22],
  [26, 130],
  [27, 126],
]) as Theme;

export const dark_blue_alt2_Button = n493 as Theme;
const n494 = t([
  [12, 127],
  [13, 129],
  [14, 22],
  [15, 130],
  [16, 126],
  [17, 125],
  [18, 131],
  [19, 130],
  [20, 131],
  [21, 130],
  [22, 130],
  [23, 130],
  [24, 131],
  [25, 22],
  [26, 130],
  [27, 126],
]) as Theme;

export const dark_blue_alt2_Checkbox = n494 as Theme;
export const dark_blue_alt2_Switch = n494 as Theme;
export const dark_blue_alt2_TooltipContent = n494 as Theme;
export const dark_blue_alt2_SliderTrack = n494 as Theme;
const n495 = t([
  [12, 132],
  [13, 131],
  [14, 130],
  [15, 22],
  [16, 0],
  [17, 0],
  [18, 124],
  [19, 125],
  [20, 124],
  [21, 125],
  [22, 122],
  [23, 22],
  [24, 129],
  [25, 130],
  [26, 22],
  [27, 125],
]) as Theme;

export const dark_blue_alt2_SwitchThumb = n495 as Theme;
const n496 = t([
  [12, 129],
  [13, 127],
  [14, 126],
  [15, 125],
  [16, 22],
  [17, 130],
  [18, 124],
  [19, 125],
  [20, 124],
  [21, 125],
  [22, 125],
  [23, 125],
  [24, 124],
  [25, 126],
  [26, 125],
  [27, 22],
]) as Theme;

export const dark_blue_alt2_SliderTrackActive = n496 as Theme;
const n497 = t([
  [12, 130],
  [13, 22],
  [14, 129],
  [15, 127],
  [16, 131],
  [17, 132],
  [18, 124],
  [19, 125],
  [20, 124],
  [21, 125],
  [22, 123],
  [23, 127],
  [24, 126],
  [25, 129],
  [26, 127],
  [27, 127],
]) as Theme;

export const dark_blue_alt2_SliderThumb = n497 as Theme;
export const dark_blue_alt2_Tooltip = n497 as Theme;
export const dark_blue_alt2_ProgressIndicator = n497 as Theme;
const n498 = t([
  [12, 125],
  [13, 126],
  [14, 127],
  [15, 129],
  [16, 124],
  [17, 123],
  [18, 131],
  [19, 130],
  [20, 131],
  [21, 130],
  [22, 132],
  [23, 22],
  [24, 130],
  [25, 129],
  [26, 22],
  [27, 129],
]) as Theme;

export const dark_blue_alt2_Input = n498 as Theme;
export const dark_blue_alt2_TextArea = n498 as Theme;
const n499 = t([
  [12, 126],
  [13, 127],
  [14, 129],
  [15, 22],
  [16, 125],
  [17, 124],
  [19, 22],
  [20, 130],
  [21, 22],
  [22, 131],
  [23, 22],
  [24, 130],
  [25, 129],
  [26, 22],
  [27, 127],
]) as Theme;

export const dark_blue_active_ListItem = n499 as Theme;
const n500 = t([
  [12, 127],
  [13, 129],
  [14, 22],
  [15, 130],
  [16, 126],
  [17, 125],
  [19, 22],
  [20, 130],
  [21, 22],
  [22, 130],
  [23, 130],
  [24, 131],
  [25, 22],
  [26, 130],
  [27, 126],
]) as Theme;

export const dark_blue_active_Card = n500 as Theme;
export const dark_blue_active_DrawerFrame = n500 as Theme;
export const dark_blue_active_Progress = n500 as Theme;
export const dark_blue_active_TooltipArrow = n500 as Theme;
const n501 = t([
  [12, 129],
  [13, 22],
  [14, 130],
  [15, 131],
  [16, 127],
  [17, 126],
  [19, 22],
  [20, 130],
  [21, 22],
  [22, 22],
  [23, 242],
  [24, 242],
  [25, 130],
  [26, 131],
  [27, 125],
]) as Theme;

export const dark_blue_active_Button = n501 as Theme;
const n502 = t([
  [12, 129],
  [13, 22],
  [14, 130],
  [15, 131],
  [16, 127],
  [17, 126],
  [19, 22],
  [20, 130],
  [21, 22],
  [22, 22],
  [23, 131],
  [24, 132],
  [25, 130],
  [26, 131],
  [27, 125],
]) as Theme;

export const dark_blue_active_Checkbox = n502 as Theme;
export const dark_blue_active_Switch = n502 as Theme;
export const dark_blue_active_TooltipContent = n502 as Theme;
export const dark_blue_active_SliderTrack = n502 as Theme;
const n503 = t([
  [12, 131],
  [13, 130],
  [14, 22],
  [15, 129],
  [16, 132],
  [17, 0],
  [19, 126],
  [20, 125],
  [21, 126],
  [22, 122],
  [23, 129],
  [24, 127],
  [25, 22],
  [26, 129],
  [27, 126],
]) as Theme;

export const dark_blue_active_SwitchThumb = n503 as Theme;
const n504 = t([
  [12, 127],
  [13, 126],
  [14, 125],
  [15, 124],
  [16, 129],
  [17, 22],
  [19, 126],
  [20, 125],
  [21, 126],
  [22, 126],
  [23, 124],
  [24, 123],
  [25, 125],
  [26, 124],
  [27, 130],
]) as Theme;

export const dark_blue_active_SliderTrackActive = n504 as Theme;
const n505 = t([
  [12, 22],
  [13, 129],
  [14, 127],
  [15, 126],
  [16, 130],
  [17, 131],
  [19, 126],
  [20, 125],
  [21, 126],
  [22, 124],
  [23, 126],
  [24, 125],
  [25, 127],
  [26, 126],
  [27, 129],
]) as Theme;

export const dark_blue_active_SliderThumb = n505 as Theme;
export const dark_blue_active_Tooltip = n505 as Theme;
export const dark_blue_active_ProgressIndicator = n505 as Theme;
const n506 = t([
  [12, 126],
  [13, 127],
  [14, 129],
  [15, 22],
  [16, 125],
  [17, 124],
  [19, 22],
  [20, 130],
  [21, 22],
  [22, 131],
  [23, 130],
  [24, 131],
  [25, 22],
  [26, 130],
  [27, 127],
]) as Theme;

export const dark_blue_active_Input = n506 as Theme;
export const dark_blue_active_TextArea = n506 as Theme;
const n507 = t([
  [12, 179],
  [13, 180],
  [14, 181],
  [15, 182],
  [16, 178],
  [17, 177],
  [18, 187],
  [19, 186],
  [20, 187],
  [21, 186],
  [22, 0],
  [23, 182],
  [24, 184],
  [25, 181],
  [26, 182],
  [27, 81],
]) as Theme;

export const dark_purple_alt1_ListItem = n507 as Theme;
const n508 = t([
  [12, 180],
  [13, 181],
  [14, 182],
  [15, 184],
  [16, 179],
  [17, 178],
  [18, 187],
  [19, 186],
  [20, 187],
  [21, 186],
  [22, 187],
  [23, 184],
  [24, 81],
  [25, 182],
  [26, 184],
  [27, 184],
]) as Theme;

export const dark_purple_alt1_Card = n508 as Theme;
export const dark_purple_alt1_DrawerFrame = n508 as Theme;
export const dark_purple_alt1_Progress = n508 as Theme;
export const dark_purple_alt1_TooltipArrow = n508 as Theme;
const n509 = t([
  [12, 181],
  [13, 182],
  [14, 184],
  [15, 81],
  [16, 180],
  [17, 179],
  [18, 187],
  [19, 186],
  [20, 187],
  [21, 186],
  [22, 186],
  [23, 242],
  [24, 242],
  [25, 184],
  [26, 81],
  [27, 182],
]) as Theme;

export const dark_purple_alt1_Button = n509 as Theme;
const n510 = t([
  [12, 181],
  [13, 182],
  [14, 184],
  [15, 81],
  [16, 180],
  [17, 179],
  [18, 187],
  [19, 186],
  [20, 187],
  [21, 186],
  [22, 186],
  [23, 81],
  [24, 185],
  [25, 184],
  [26, 81],
  [27, 182],
]) as Theme;

export const dark_purple_alt1_Checkbox = n510 as Theme;
export const dark_purple_alt1_Switch = n510 as Theme;
export const dark_purple_alt1_TooltipContent = n510 as Theme;
export const dark_purple_alt1_SliderTrack = n510 as Theme;
const n511 = t([
  [12, 0],
  [13, 187],
  [14, 186],
  [15, 185],
  [16, 0],
  [17, 0],
  [18, 178],
  [19, 179],
  [20, 178],
  [21, 179],
  [22, 177],
  [23, 185],
  [24, 81],
  [25, 186],
  [26, 185],
  [27, 179],
]) as Theme;

export const dark_purple_alt1_SwitchThumb = n511 as Theme;
const n512 = t([
  [12, 81],
  [13, 184],
  [14, 182],
  [15, 181],
  [16, 185],
  [17, 186],
  [18, 178],
  [19, 179],
  [20, 178],
  [21, 179],
  [22, 179],
  [23, 181],
  [24, 180],
  [25, 182],
  [26, 181],
  [27, 184],
]) as Theme;

export const dark_purple_alt1_SliderTrackActive = n512 as Theme;
const n513 = t([
  [12, 186],
  [13, 185],
  [14, 81],
  [15, 184],
  [16, 187],
  [17, 0],
  [18, 178],
  [19, 179],
  [20, 178],
  [21, 179],
  [22, 177],
  [23, 184],
  [24, 182],
  [25, 81],
  [26, 184],
  [27, 181],
]) as Theme;

export const dark_purple_alt1_SliderThumb = n513 as Theme;
export const dark_purple_alt1_Tooltip = n513 as Theme;
export const dark_purple_alt1_ProgressIndicator = n513 as Theme;
const n514 = t([
  [12, 179],
  [13, 180],
  [14, 181],
  [15, 182],
  [16, 178],
  [17, 177],
  [18, 187],
  [19, 186],
  [20, 187],
  [21, 186],
  [22, 0],
  [23, 184],
  [24, 81],
  [25, 182],
  [26, 184],
  [27, 81],
]) as Theme;

export const dark_purple_alt1_Input = n514 as Theme;
export const dark_purple_alt1_TextArea = n514 as Theme;
const n515 = t([
  [12, 180],
  [13, 181],
  [14, 182],
  [15, 184],
  [16, 179],
  [17, 178],
  [18, 186],
  [19, 185],
  [20, 186],
  [21, 185],
  [22, 187],
  [23, 184],
  [24, 81],
  [25, 182],
  [26, 184],
  [27, 184],
]) as Theme;

export const dark_purple_alt2_ListItem = n515 as Theme;
const n516 = t([
  [12, 181],
  [13, 182],
  [14, 184],
  [15, 81],
  [16, 180],
  [17, 179],
  [18, 186],
  [19, 185],
  [20, 186],
  [21, 185],
  [22, 186],
  [23, 81],
  [24, 185],
  [25, 184],
  [26, 81],
  [27, 182],
]) as Theme;

export const dark_purple_alt2_Card = n516 as Theme;
export const dark_purple_alt2_DrawerFrame = n516 as Theme;
export const dark_purple_alt2_Progress = n516 as Theme;
export const dark_purple_alt2_TooltipArrow = n516 as Theme;
const n517 = t([
  [12, 182],
  [13, 184],
  [14, 81],
  [15, 185],
  [16, 181],
  [17, 180],
  [18, 186],
  [19, 185],
  [20, 186],
  [21, 185],
  [22, 185],
  [23, 242],
  [24, 242],
  [25, 81],
  [26, 185],
  [27, 181],
]) as Theme;

export const dark_purple_alt2_Button = n517 as Theme;
const n518 = t([
  [12, 182],
  [13, 184],
  [14, 81],
  [15, 185],
  [16, 181],
  [17, 180],
  [18, 186],
  [19, 185],
  [20, 186],
  [21, 185],
  [22, 185],
  [23, 185],
  [24, 186],
  [25, 81],
  [26, 185],
  [27, 181],
]) as Theme;

export const dark_purple_alt2_Checkbox = n518 as Theme;
export const dark_purple_alt2_Switch = n518 as Theme;
export const dark_purple_alt2_TooltipContent = n518 as Theme;
export const dark_purple_alt2_SliderTrack = n518 as Theme;
const n519 = t([
  [12, 187],
  [13, 186],
  [14, 185],
  [15, 81],
  [16, 0],
  [17, 0],
  [18, 179],
  [19, 180],
  [20, 179],
  [21, 180],
  [22, 177],
  [23, 81],
  [24, 184],
  [25, 185],
  [26, 81],
  [27, 180],
]) as Theme;

export const dark_purple_alt2_SwitchThumb = n519 as Theme;
const n520 = t([
  [12, 184],
  [13, 182],
  [14, 181],
  [15, 180],
  [16, 81],
  [17, 185],
  [18, 179],
  [19, 180],
  [20, 179],
  [21, 180],
  [22, 180],
  [23, 180],
  [24, 179],
  [25, 181],
  [26, 180],
  [27, 81],
]) as Theme;

export const dark_purple_alt2_SliderTrackActive = n520 as Theme;
const n521 = t([
  [12, 185],
  [13, 81],
  [14, 184],
  [15, 182],
  [16, 186],
  [17, 187],
  [18, 179],
  [19, 180],
  [20, 179],
  [21, 180],
  [22, 178],
  [23, 182],
  [24, 181],
  [25, 184],
  [26, 182],
  [27, 182],
]) as Theme;

export const dark_purple_alt2_SliderThumb = n521 as Theme;
export const dark_purple_alt2_Tooltip = n521 as Theme;
export const dark_purple_alt2_ProgressIndicator = n521 as Theme;
const n522 = t([
  [12, 180],
  [13, 181],
  [14, 182],
  [15, 184],
  [16, 179],
  [17, 178],
  [18, 186],
  [19, 185],
  [20, 186],
  [21, 185],
  [22, 187],
  [23, 81],
  [24, 185],
  [25, 184],
  [26, 81],
  [27, 184],
]) as Theme;

export const dark_purple_alt2_Input = n522 as Theme;
export const dark_purple_alt2_TextArea = n522 as Theme;
const n523 = t([
  [12, 181],
  [13, 182],
  [14, 184],
  [15, 81],
  [16, 180],
  [17, 179],
  [19, 81],
  [20, 185],
  [21, 81],
  [22, 186],
  [23, 81],
  [24, 185],
  [25, 184],
  [26, 81],
  [27, 182],
]) as Theme;

export const dark_purple_active_ListItem = n523 as Theme;
const n524 = t([
  [12, 182],
  [13, 184],
  [14, 81],
  [15, 185],
  [16, 181],
  [17, 180],
  [19, 81],
  [20, 185],
  [21, 81],
  [22, 185],
  [23, 185],
  [24, 186],
  [25, 81],
  [26, 185],
  [27, 181],
]) as Theme;

export const dark_purple_active_Card = n524 as Theme;
export const dark_purple_active_DrawerFrame = n524 as Theme;
export const dark_purple_active_Progress = n524 as Theme;
export const dark_purple_active_TooltipArrow = n524 as Theme;
const n525 = t([
  [12, 184],
  [13, 81],
  [14, 185],
  [15, 186],
  [16, 182],
  [17, 181],
  [19, 81],
  [20, 185],
  [21, 81],
  [22, 81],
  [23, 242],
  [24, 242],
  [25, 185],
  [26, 186],
  [27, 180],
]) as Theme;

export const dark_purple_active_Button = n525 as Theme;
const n526 = t([
  [12, 184],
  [13, 81],
  [14, 185],
  [15, 186],
  [16, 182],
  [17, 181],
  [19, 81],
  [20, 185],
  [21, 81],
  [22, 81],
  [23, 186],
  [24, 187],
  [25, 185],
  [26, 186],
  [27, 180],
]) as Theme;

export const dark_purple_active_Checkbox = n526 as Theme;
export const dark_purple_active_Switch = n526 as Theme;
export const dark_purple_active_TooltipContent = n526 as Theme;
export const dark_purple_active_SliderTrack = n526 as Theme;
const n527 = t([
  [12, 186],
  [13, 185],
  [14, 81],
  [15, 184],
  [16, 187],
  [17, 0],
  [19, 181],
  [20, 180],
  [21, 181],
  [22, 177],
  [23, 184],
  [24, 182],
  [25, 81],
  [26, 184],
  [27, 181],
]) as Theme;

export const dark_purple_active_SwitchThumb = n527 as Theme;
const n528 = t([
  [12, 182],
  [13, 181],
  [14, 180],
  [15, 179],
  [16, 184],
  [17, 81],
  [19, 181],
  [20, 180],
  [21, 181],
  [22, 181],
  [23, 179],
  [24, 178],
  [25, 180],
  [26, 179],
  [27, 185],
]) as Theme;

export const dark_purple_active_SliderTrackActive = n528 as Theme;
const n529 = t([
  [12, 81],
  [13, 184],
  [14, 182],
  [15, 181],
  [16, 185],
  [17, 186],
  [19, 181],
  [20, 180],
  [21, 181],
  [22, 179],
  [23, 181],
  [24, 180],
  [25, 182],
  [26, 181],
  [27, 184],
]) as Theme;

export const dark_purple_active_SliderThumb = n529 as Theme;
export const dark_purple_active_Tooltip = n529 as Theme;
export const dark_purple_active_ProgressIndicator = n529 as Theme;
const n530 = t([
  [12, 181],
  [13, 182],
  [14, 184],
  [15, 81],
  [16, 180],
  [17, 179],
  [19, 81],
  [20, 185],
  [21, 81],
  [22, 186],
  [23, 185],
  [24, 186],
  [25, 81],
  [26, 185],
  [27, 182],
]) as Theme;

export const dark_purple_active_Input = n530 as Theme;
export const dark_purple_active_TextArea = n530 as Theme;
const n531 = t([
  [12, 168],
  [13, 169],
  [14, 170],
  [15, 171],
  [16, 167],
  [17, 166],
  [18, 176],
  [19, 175],
  [20, 176],
  [21, 175],
  [22, 0],
  [23, 171],
  [24, 173],
  [25, 170],
  [26, 171],
  [27, 69],
]) as Theme;

export const dark_pink_alt1_ListItem = n531 as Theme;
const n532 = t([
  [12, 169],
  [13, 170],
  [14, 171],
  [15, 173],
  [16, 168],
  [17, 167],
  [18, 176],
  [19, 175],
  [20, 176],
  [21, 175],
  [22, 176],
  [23, 173],
  [24, 69],
  [25, 171],
  [26, 173],
  [27, 173],
]) as Theme;

export const dark_pink_alt1_Card = n532 as Theme;
export const dark_pink_alt1_DrawerFrame = n532 as Theme;
export const dark_pink_alt1_Progress = n532 as Theme;
export const dark_pink_alt1_TooltipArrow = n532 as Theme;
const n533 = t([
  [12, 170],
  [13, 171],
  [14, 173],
  [15, 69],
  [16, 169],
  [17, 168],
  [18, 176],
  [19, 175],
  [20, 176],
  [21, 175],
  [22, 175],
  [23, 242],
  [24, 242],
  [25, 173],
  [26, 69],
  [27, 171],
]) as Theme;

export const dark_pink_alt1_Button = n533 as Theme;
const n534 = t([
  [12, 170],
  [13, 171],
  [14, 173],
  [15, 69],
  [16, 169],
  [17, 168],
  [18, 176],
  [19, 175],
  [20, 176],
  [21, 175],
  [22, 175],
  [23, 69],
  [24, 174],
  [25, 173],
  [26, 69],
  [27, 171],
]) as Theme;

export const dark_pink_alt1_Checkbox = n534 as Theme;
export const dark_pink_alt1_Switch = n534 as Theme;
export const dark_pink_alt1_TooltipContent = n534 as Theme;
export const dark_pink_alt1_SliderTrack = n534 as Theme;
const n535 = t([
  [12, 0],
  [13, 176],
  [14, 175],
  [15, 174],
  [16, 0],
  [17, 0],
  [18, 167],
  [19, 168],
  [20, 167],
  [21, 168],
  [22, 166],
  [23, 174],
  [24, 69],
  [25, 175],
  [26, 174],
  [27, 168],
]) as Theme;

export const dark_pink_alt1_SwitchThumb = n535 as Theme;
const n536 = t([
  [12, 69],
  [13, 173],
  [14, 171],
  [15, 170],
  [16, 174],
  [17, 175],
  [18, 167],
  [19, 168],
  [20, 167],
  [21, 168],
  [22, 168],
  [23, 170],
  [24, 169],
  [25, 171],
  [26, 170],
  [27, 173],
]) as Theme;

export const dark_pink_alt1_SliderTrackActive = n536 as Theme;
const n537 = t([
  [12, 175],
  [13, 174],
  [14, 69],
  [15, 173],
  [16, 176],
  [17, 0],
  [18, 167],
  [19, 168],
  [20, 167],
  [21, 168],
  [22, 166],
  [23, 173],
  [24, 171],
  [25, 69],
  [26, 173],
  [27, 170],
]) as Theme;

export const dark_pink_alt1_SliderThumb = n537 as Theme;
export const dark_pink_alt1_Tooltip = n537 as Theme;
export const dark_pink_alt1_ProgressIndicator = n537 as Theme;
const n538 = t([
  [12, 168],
  [13, 169],
  [14, 170],
  [15, 171],
  [16, 167],
  [17, 166],
  [18, 176],
  [19, 175],
  [20, 176],
  [21, 175],
  [22, 0],
  [23, 173],
  [24, 69],
  [25, 171],
  [26, 173],
  [27, 69],
]) as Theme;

export const dark_pink_alt1_Input = n538 as Theme;
export const dark_pink_alt1_TextArea = n538 as Theme;
const n539 = t([
  [12, 169],
  [13, 170],
  [14, 171],
  [15, 173],
  [16, 168],
  [17, 167],
  [18, 175],
  [19, 174],
  [20, 175],
  [21, 174],
  [22, 176],
  [23, 173],
  [24, 69],
  [25, 171],
  [26, 173],
  [27, 173],
]) as Theme;

export const dark_pink_alt2_ListItem = n539 as Theme;
const n540 = t([
  [12, 170],
  [13, 171],
  [14, 173],
  [15, 69],
  [16, 169],
  [17, 168],
  [18, 175],
  [19, 174],
  [20, 175],
  [21, 174],
  [22, 175],
  [23, 69],
  [24, 174],
  [25, 173],
  [26, 69],
  [27, 171],
]) as Theme;

export const dark_pink_alt2_Card = n540 as Theme;
export const dark_pink_alt2_DrawerFrame = n540 as Theme;
export const dark_pink_alt2_Progress = n540 as Theme;
export const dark_pink_alt2_TooltipArrow = n540 as Theme;
const n541 = t([
  [12, 171],
  [13, 173],
  [14, 69],
  [15, 174],
  [16, 170],
  [17, 169],
  [18, 175],
  [19, 174],
  [20, 175],
  [21, 174],
  [22, 174],
  [23, 242],
  [24, 242],
  [25, 69],
  [26, 174],
  [27, 170],
]) as Theme;

export const dark_pink_alt2_Button = n541 as Theme;
const n542 = t([
  [12, 171],
  [13, 173],
  [14, 69],
  [15, 174],
  [16, 170],
  [17, 169],
  [18, 175],
  [19, 174],
  [20, 175],
  [21, 174],
  [22, 174],
  [23, 174],
  [24, 175],
  [25, 69],
  [26, 174],
  [27, 170],
]) as Theme;

export const dark_pink_alt2_Checkbox = n542 as Theme;
export const dark_pink_alt2_Switch = n542 as Theme;
export const dark_pink_alt2_TooltipContent = n542 as Theme;
export const dark_pink_alt2_SliderTrack = n542 as Theme;
const n543 = t([
  [12, 176],
  [13, 175],
  [14, 174],
  [15, 69],
  [16, 0],
  [17, 0],
  [18, 168],
  [19, 169],
  [20, 168],
  [21, 169],
  [22, 166],
  [23, 69],
  [24, 173],
  [25, 174],
  [26, 69],
  [27, 169],
]) as Theme;

export const dark_pink_alt2_SwitchThumb = n543 as Theme;
const n544 = t([
  [12, 173],
  [13, 171],
  [14, 170],
  [15, 169],
  [16, 69],
  [17, 174],
  [18, 168],
  [19, 169],
  [20, 168],
  [21, 169],
  [22, 169],
  [23, 169],
  [24, 168],
  [25, 170],
  [26, 169],
  [27, 69],
]) as Theme;

export const dark_pink_alt2_SliderTrackActive = n544 as Theme;
const n545 = t([
  [12, 174],
  [13, 69],
  [14, 173],
  [15, 171],
  [16, 175],
  [17, 176],
  [18, 168],
  [19, 169],
  [20, 168],
  [21, 169],
  [22, 167],
  [23, 171],
  [24, 170],
  [25, 173],
  [26, 171],
  [27, 171],
]) as Theme;

export const dark_pink_alt2_SliderThumb = n545 as Theme;
export const dark_pink_alt2_Tooltip = n545 as Theme;
export const dark_pink_alt2_ProgressIndicator = n545 as Theme;
const n546 = t([
  [12, 169],
  [13, 170],
  [14, 171],
  [15, 173],
  [16, 168],
  [17, 167],
  [18, 175],
  [19, 174],
  [20, 175],
  [21, 174],
  [22, 176],
  [23, 69],
  [24, 174],
  [25, 173],
  [26, 69],
  [27, 173],
]) as Theme;

export const dark_pink_alt2_Input = n546 as Theme;
export const dark_pink_alt2_TextArea = n546 as Theme;
const n547 = t([
  [12, 170],
  [13, 171],
  [14, 173],
  [15, 69],
  [16, 169],
  [17, 168],
  [19, 69],
  [20, 174],
  [21, 69],
  [22, 175],
  [23, 69],
  [24, 174],
  [25, 173],
  [26, 69],
  [27, 171],
]) as Theme;

export const dark_pink_active_ListItem = n547 as Theme;
const n548 = t([
  [12, 171],
  [13, 173],
  [14, 69],
  [15, 174],
  [16, 170],
  [17, 169],
  [19, 69],
  [20, 174],
  [21, 69],
  [22, 174],
  [23, 174],
  [24, 175],
  [25, 69],
  [26, 174],
  [27, 170],
]) as Theme;

export const dark_pink_active_Card = n548 as Theme;
export const dark_pink_active_DrawerFrame = n548 as Theme;
export const dark_pink_active_Progress = n548 as Theme;
export const dark_pink_active_TooltipArrow = n548 as Theme;
const n549 = t([
  [12, 173],
  [13, 69],
  [14, 174],
  [15, 175],
  [16, 171],
  [17, 170],
  [19, 69],
  [20, 174],
  [21, 69],
  [22, 69],
  [23, 242],
  [24, 242],
  [25, 174],
  [26, 175],
  [27, 169],
]) as Theme;

export const dark_pink_active_Button = n549 as Theme;
const n550 = t([
  [12, 173],
  [13, 69],
  [14, 174],
  [15, 175],
  [16, 171],
  [17, 170],
  [19, 69],
  [20, 174],
  [21, 69],
  [22, 69],
  [23, 175],
  [24, 176],
  [25, 174],
  [26, 175],
  [27, 169],
]) as Theme;

export const dark_pink_active_Checkbox = n550 as Theme;
export const dark_pink_active_Switch = n550 as Theme;
export const dark_pink_active_TooltipContent = n550 as Theme;
export const dark_pink_active_SliderTrack = n550 as Theme;
const n551 = t([
  [12, 175],
  [13, 174],
  [14, 69],
  [15, 173],
  [16, 176],
  [17, 0],
  [19, 170],
  [20, 169],
  [21, 170],
  [22, 166],
  [23, 173],
  [24, 171],
  [25, 69],
  [26, 173],
  [27, 170],
]) as Theme;

export const dark_pink_active_SwitchThumb = n551 as Theme;
const n552 = t([
  [12, 171],
  [13, 170],
  [14, 169],
  [15, 168],
  [16, 173],
  [17, 69],
  [19, 170],
  [20, 169],
  [21, 170],
  [22, 170],
  [23, 168],
  [24, 167],
  [25, 169],
  [26, 168],
  [27, 174],
]) as Theme;

export const dark_pink_active_SliderTrackActive = n552 as Theme;
const n553 = t([
  [12, 69],
  [13, 173],
  [14, 171],
  [15, 170],
  [16, 174],
  [17, 175],
  [19, 170],
  [20, 169],
  [21, 170],
  [22, 168],
  [23, 170],
  [24, 169],
  [25, 171],
  [26, 170],
  [27, 173],
]) as Theme;

export const dark_pink_active_SliderThumb = n553 as Theme;
export const dark_pink_active_Tooltip = n553 as Theme;
export const dark_pink_active_ProgressIndicator = n553 as Theme;
const n554 = t([
  [12, 170],
  [13, 171],
  [14, 173],
  [15, 69],
  [16, 169],
  [17, 168],
  [19, 69],
  [20, 174],
  [21, 69],
  [22, 175],
  [23, 174],
  [24, 175],
  [25, 69],
  [26, 174],
  [27, 171],
]) as Theme;

export const dark_pink_active_Input = n554 as Theme;
export const dark_pink_active_TextArea = n554 as Theme;
const n555 = t([
  [12, 190],
  [13, 191],
  [14, 192],
  [15, 193],
  [16, 189],
  [17, 188],
  [18, 198],
  [19, 197],
  [20, 198],
  [21, 197],
  [22, 0],
  [23, 193],
  [24, 195],
  [25, 192],
  [26, 193],
  [27, 93],
]) as Theme;

export const dark_red_alt1_ListItem = n555 as Theme;
const n556 = t([
  [12, 191],
  [13, 192],
  [14, 193],
  [15, 195],
  [16, 190],
  [17, 189],
  [18, 198],
  [19, 197],
  [20, 198],
  [21, 197],
  [22, 198],
  [23, 195],
  [24, 93],
  [25, 193],
  [26, 195],
  [27, 195],
]) as Theme;

export const dark_red_alt1_Card = n556 as Theme;
export const dark_red_alt1_DrawerFrame = n556 as Theme;
export const dark_red_alt1_Progress = n556 as Theme;
export const dark_red_alt1_TooltipArrow = n556 as Theme;
const n557 = t([
  [12, 192],
  [13, 193],
  [14, 195],
  [15, 93],
  [16, 191],
  [17, 190],
  [18, 198],
  [19, 197],
  [20, 198],
  [21, 197],
  [22, 197],
  [23, 242],
  [24, 242],
  [25, 195],
  [26, 93],
  [27, 193],
]) as Theme;

export const dark_red_alt1_Button = n557 as Theme;
const n558 = t([
  [12, 192],
  [13, 193],
  [14, 195],
  [15, 93],
  [16, 191],
  [17, 190],
  [18, 198],
  [19, 197],
  [20, 198],
  [21, 197],
  [22, 197],
  [23, 93],
  [24, 196],
  [25, 195],
  [26, 93],
  [27, 193],
]) as Theme;

export const dark_red_alt1_Checkbox = n558 as Theme;
export const dark_red_alt1_Switch = n558 as Theme;
export const dark_red_alt1_TooltipContent = n558 as Theme;
export const dark_red_alt1_SliderTrack = n558 as Theme;
const n559 = t([
  [12, 0],
  [13, 198],
  [14, 197],
  [15, 196],
  [16, 0],
  [17, 0],
  [18, 189],
  [19, 190],
  [20, 189],
  [21, 190],
  [22, 188],
  [23, 196],
  [24, 93],
  [25, 197],
  [26, 196],
  [27, 190],
]) as Theme;

export const dark_red_alt1_SwitchThumb = n559 as Theme;
const n560 = t([
  [12, 93],
  [13, 195],
  [14, 193],
  [15, 192],
  [16, 196],
  [17, 197],
  [18, 189],
  [19, 190],
  [20, 189],
  [21, 190],
  [22, 190],
  [23, 192],
  [24, 191],
  [25, 193],
  [26, 192],
  [27, 195],
]) as Theme;

export const dark_red_alt1_SliderTrackActive = n560 as Theme;
const n561 = t([
  [12, 197],
  [13, 196],
  [14, 93],
  [15, 195],
  [16, 198],
  [17, 0],
  [18, 189],
  [19, 190],
  [20, 189],
  [21, 190],
  [22, 188],
  [23, 195],
  [24, 193],
  [25, 93],
  [26, 195],
  [27, 192],
]) as Theme;

export const dark_red_alt1_SliderThumb = n561 as Theme;
export const dark_red_alt1_Tooltip = n561 as Theme;
export const dark_red_alt1_ProgressIndicator = n561 as Theme;
const n562 = t([
  [12, 190],
  [13, 191],
  [14, 192],
  [15, 193],
  [16, 189],
  [17, 188],
  [18, 198],
  [19, 197],
  [20, 198],
  [21, 197],
  [22, 0],
  [23, 195],
  [24, 93],
  [25, 193],
  [26, 195],
  [27, 93],
]) as Theme;

export const dark_red_alt1_Input = n562 as Theme;
export const dark_red_alt1_TextArea = n562 as Theme;
const n563 = t([
  [12, 191],
  [13, 192],
  [14, 193],
  [15, 195],
  [16, 190],
  [17, 189],
  [18, 197],
  [19, 196],
  [20, 197],
  [21, 196],
  [22, 198],
  [23, 195],
  [24, 93],
  [25, 193],
  [26, 195],
  [27, 195],
]) as Theme;

export const dark_red_alt2_ListItem = n563 as Theme;
const n564 = t([
  [12, 192],
  [13, 193],
  [14, 195],
  [15, 93],
  [16, 191],
  [17, 190],
  [18, 197],
  [19, 196],
  [20, 197],
  [21, 196],
  [22, 197],
  [23, 93],
  [24, 196],
  [25, 195],
  [26, 93],
  [27, 193],
]) as Theme;

export const dark_red_alt2_Card = n564 as Theme;
export const dark_red_alt2_DrawerFrame = n564 as Theme;
export const dark_red_alt2_Progress = n564 as Theme;
export const dark_red_alt2_TooltipArrow = n564 as Theme;
const n565 = t([
  [12, 193],
  [13, 195],
  [14, 93],
  [15, 196],
  [16, 192],
  [17, 191],
  [18, 197],
  [19, 196],
  [20, 197],
  [21, 196],
  [22, 196],
  [23, 242],
  [24, 242],
  [25, 93],
  [26, 196],
  [27, 192],
]) as Theme;

export const dark_red_alt2_Button = n565 as Theme;
const n566 = t([
  [12, 193],
  [13, 195],
  [14, 93],
  [15, 196],
  [16, 192],
  [17, 191],
  [18, 197],
  [19, 196],
  [20, 197],
  [21, 196],
  [22, 196],
  [23, 196],
  [24, 197],
  [25, 93],
  [26, 196],
  [27, 192],
]) as Theme;

export const dark_red_alt2_Checkbox = n566 as Theme;
export const dark_red_alt2_Switch = n566 as Theme;
export const dark_red_alt2_TooltipContent = n566 as Theme;
export const dark_red_alt2_SliderTrack = n566 as Theme;
const n567 = t([
  [12, 198],
  [13, 197],
  [14, 196],
  [15, 93],
  [16, 0],
  [17, 0],
  [18, 190],
  [19, 191],
  [20, 190],
  [21, 191],
  [22, 188],
  [23, 93],
  [24, 195],
  [25, 196],
  [26, 93],
  [27, 191],
]) as Theme;

export const dark_red_alt2_SwitchThumb = n567 as Theme;
const n568 = t([
  [12, 195],
  [13, 193],
  [14, 192],
  [15, 191],
  [16, 93],
  [17, 196],
  [18, 190],
  [19, 191],
  [20, 190],
  [21, 191],
  [22, 191],
  [23, 191],
  [24, 190],
  [25, 192],
  [26, 191],
  [27, 93],
]) as Theme;

export const dark_red_alt2_SliderTrackActive = n568 as Theme;
const n569 = t([
  [12, 196],
  [13, 93],
  [14, 195],
  [15, 193],
  [16, 197],
  [17, 198],
  [18, 190],
  [19, 191],
  [20, 190],
  [21, 191],
  [22, 189],
  [23, 193],
  [24, 192],
  [25, 195],
  [26, 193],
  [27, 193],
]) as Theme;

export const dark_red_alt2_SliderThumb = n569 as Theme;
export const dark_red_alt2_Tooltip = n569 as Theme;
export const dark_red_alt2_ProgressIndicator = n569 as Theme;
const n570 = t([
  [12, 191],
  [13, 192],
  [14, 193],
  [15, 195],
  [16, 190],
  [17, 189],
  [18, 197],
  [19, 196],
  [20, 197],
  [21, 196],
  [22, 198],
  [23, 93],
  [24, 196],
  [25, 195],
  [26, 93],
  [27, 195],
]) as Theme;

export const dark_red_alt2_Input = n570 as Theme;
export const dark_red_alt2_TextArea = n570 as Theme;
const n571 = t([
  [12, 192],
  [13, 193],
  [14, 195],
  [15, 93],
  [16, 191],
  [17, 190],
  [19, 93],
  [20, 196],
  [21, 93],
  [22, 197],
  [23, 93],
  [24, 196],
  [25, 195],
  [26, 93],
  [27, 193],
]) as Theme;

export const dark_red_active_ListItem = n571 as Theme;
const n572 = t([
  [12, 193],
  [13, 195],
  [14, 93],
  [15, 196],
  [16, 192],
  [17, 191],
  [19, 93],
  [20, 196],
  [21, 93],
  [22, 196],
  [23, 196],
  [24, 197],
  [25, 93],
  [26, 196],
  [27, 192],
]) as Theme;

export const dark_red_active_Card = n572 as Theme;
export const dark_red_active_DrawerFrame = n572 as Theme;
export const dark_red_active_Progress = n572 as Theme;
export const dark_red_active_TooltipArrow = n572 as Theme;
const n573 = t([
  [12, 195],
  [13, 93],
  [14, 196],
  [15, 197],
  [16, 193],
  [17, 192],
  [19, 93],
  [20, 196],
  [21, 93],
  [22, 93],
  [23, 242],
  [24, 242],
  [25, 196],
  [26, 197],
  [27, 191],
]) as Theme;

export const dark_red_active_Button = n573 as Theme;
const n574 = t([
  [12, 195],
  [13, 93],
  [14, 196],
  [15, 197],
  [16, 193],
  [17, 192],
  [19, 93],
  [20, 196],
  [21, 93],
  [22, 93],
  [23, 197],
  [24, 198],
  [25, 196],
  [26, 197],
  [27, 191],
]) as Theme;

export const dark_red_active_Checkbox = n574 as Theme;
export const dark_red_active_Switch = n574 as Theme;
export const dark_red_active_TooltipContent = n574 as Theme;
export const dark_red_active_SliderTrack = n574 as Theme;
const n575 = t([
  [12, 197],
  [13, 196],
  [14, 93],
  [15, 195],
  [16, 198],
  [17, 0],
  [19, 192],
  [20, 191],
  [21, 192],
  [22, 188],
  [23, 195],
  [24, 193],
  [25, 93],
  [26, 195],
  [27, 192],
]) as Theme;

export const dark_red_active_SwitchThumb = n575 as Theme;
const n576 = t([
  [12, 193],
  [13, 192],
  [14, 191],
  [15, 190],
  [16, 195],
  [17, 93],
  [19, 192],
  [20, 191],
  [21, 192],
  [22, 192],
  [23, 190],
  [24, 189],
  [25, 191],
  [26, 190],
  [27, 196],
]) as Theme;

export const dark_red_active_SliderTrackActive = n576 as Theme;
const n577 = t([
  [12, 93],
  [13, 195],
  [14, 193],
  [15, 192],
  [16, 196],
  [17, 197],
  [19, 192],
  [20, 191],
  [21, 192],
  [22, 190],
  [23, 192],
  [24, 191],
  [25, 193],
  [26, 192],
  [27, 195],
]) as Theme;

export const dark_red_active_SliderThumb = n577 as Theme;
export const dark_red_active_Tooltip = n577 as Theme;
export const dark_red_active_ProgressIndicator = n577 as Theme;
const n578 = t([
  [12, 192],
  [13, 193],
  [14, 195],
  [15, 93],
  [16, 191],
  [17, 190],
  [19, 93],
  [20, 196],
  [21, 93],
  [22, 197],
  [23, 196],
  [24, 197],
  [25, 93],
  [26, 196],
  [27, 193],
]) as Theme;

export const dark_red_active_Input = n578 as Theme;
export const dark_red_active_TextArea = n578 as Theme;
