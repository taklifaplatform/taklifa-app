type Theme = {
  accentBackground: string;
  accentColor: string;
  background0: string;
  background025: string;
  background05: string;
  background075: string;
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
  color0: string;
  color025: string;
  color05: string;
  color075: string;
  background: string;
  backgroundHover: string;
  backgroundPress: string;
  backgroundFocus: string;
  borderColor: string;
  borderColorHover: string;
  borderColorPress: string;
  borderColorFocus: string;
  color: string;
  colorHover: string;
  colorPress: string;
  colorFocus: string;
  colorTransparent: string;
  placeholderColor: string;
  outlineColor: string;
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

}

function t(a: [number, number][]) {
  let res: Record<string,string> = {}
  for (const [ki, vi] of a) {
    res[ks[ki] as string] = vs[vi] as string
  }
  return res as Theme
}
const vs = [
  'hsl(210, 98.8%, 94.0%)',
  'hsl(214, 65.8%, 17.9%)',
  'rgba(255,255,255,0)',
  'rgba(255,255,255,0.25)',
  'rgba(255,255,255,0.5)',
  'rgba(255,255,255,0.75)',
  '#fff',
  '#fed441',
  '#FFEEB2',
  '#feca16',
  '#ffc300',
  '#e9b501',
  '#be9401',
  'hsl(0, 0%, 56.1%)',
  'hsl(0, 0%, 50.3%)',
  'hsl(0, 0%, 42.5%)',
  'hsl(0, 0%, 9.0%)',
  'rgba(10,10,10,0)',
  'rgba(10,10,10,0.25)',
  'rgba(10,10,10,0.5)',
  'rgba(10,10,10,0.75)',
  'hsl(206, 100%, 99.2%)',
  'hsl(210, 100%, 98.0%)',
  'hsl(209, 100%, 96.5%)',
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
  'rgba(0,0,0,0.085)',
  'rgba(0,0,0,0.04)',
  '#050505',
  '#151515',
  '#191919',
  '#232323',
  '#323232',
  '#424242',
  '#494949',
  '#545454',
  '#626262',
  '#a5a5a5',
  'hsl(212, 35.0%, 9.2%)',
  'hsl(216, 50.0%, 11.8%)',
  'hsl(214, 59.4%, 15.3%)',
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
  'hsla(24, 70.0%, 99.0%, 0.25)',
  'hsla(24, 70.0%, 99.0%, 0.5)',
  'hsla(24, 70.0%, 99.0%, 0.75)',
  'hsla(24, 94.0%, 50.0%, 0)',
  'hsla(24, 94.0%, 50.0%, 0.25)',
  'hsla(24, 94.0%, 50.0%, 0.5)',
  'hsla(24, 94.0%, 50.0%, 0.75)',
  'hsla(60, 54.0%, 98.5%, 0)',
  'hsla(60, 54.0%, 98.5%, 0.25)',
  'hsla(60, 54.0%, 98.5%, 0.5)',
  'hsla(60, 54.0%, 98.5%, 0.75)',
  'hsla(53, 92.0%, 50.0%, 0)',
  'hsla(53, 92.0%, 50.0%, 0.25)',
  'hsla(53, 92.0%, 50.0%, 0.5)',
  'hsla(53, 92.0%, 50.0%, 0.75)',
  'hsla(136, 50.0%, 98.9%, 0)',
  'hsla(136, 50.0%, 98.9%, 0.25)',
  'hsla(136, 50.0%, 98.9%, 0.5)',
  'hsla(136, 50.0%, 98.9%, 0.75)',
  'hsla(151, 55.0%, 41.5%, 0)',
  'hsla(151, 55.0%, 41.5%, 0.25)',
  'hsla(151, 55.0%, 41.5%, 0.5)',
  'hsla(151, 55.0%, 41.5%, 0.75)',
  'hsla(206, 100%, 99.2%, 0)',
  'hsla(206, 100%, 99.2%, 0.25)',
  'hsla(206, 100%, 99.2%, 0.5)',
  'hsla(206, 100%, 99.2%, 0.75)',
  'hsla(206, 100%, 50.0%, 0)',
  'hsla(206, 100%, 50.0%, 0.25)',
  'hsla(206, 100%, 50.0%, 0.5)',
  'hsla(206, 100%, 50.0%, 0.75)',
  'hsla(280, 65.0%, 99.4%, 0)',
  'hsla(280, 65.0%, 99.4%, 0.25)',
  'hsla(280, 65.0%, 99.4%, 0.5)',
  'hsla(280, 65.0%, 99.4%, 0.75)',
  'hsla(272, 51.0%, 54.0%, 0)',
  'hsla(272, 51.0%, 54.0%, 0.25)',
  'hsla(272, 51.0%, 54.0%, 0.5)',
  'hsla(272, 51.0%, 54.0%, 0.75)',
  'hsla(322, 100%, 99.4%, 0)',
  'hsla(322, 100%, 99.4%, 0.25)',
  'hsla(322, 100%, 99.4%, 0.5)',
  'hsla(322, 100%, 99.4%, 0.75)',
  'hsla(322, 65.0%, 54.5%, 0)',
  'hsla(322, 65.0%, 54.5%, 0.25)',
  'hsla(322, 65.0%, 54.5%, 0.5)',
  'hsla(322, 65.0%, 54.5%, 0.75)',
  'hsla(359, 100%, 99.4%, 0)',
  'hsla(359, 100%, 99.4%, 0.25)',
  'hsla(359, 100%, 99.4%, 0.5)',
  'hsla(359, 100%, 99.4%, 0.75)',
  'hsla(358, 75.0%, 59.0%, 0)',
  'hsla(358, 75.0%, 59.0%, 0.25)',
  'hsla(358, 75.0%, 59.0%, 0.5)',
  'hsla(358, 75.0%, 59.0%, 0.75)',
  'hsla(0, 0%, 99.0%, 0)',
  'hsla(0, 0%, 99.0%, 0.25)',
  'hsla(0, 0%, 99.0%, 0.5)',
  'hsla(0, 0%, 99.0%, 0.75)',
  'hsla(0, 0%, 56.1%, 0)',
  'hsla(0, 0%, 56.1%, 0.25)',
  'hsla(0, 0%, 56.1%, 0.5)',
  'hsla(0, 0%, 56.1%, 0.75)',
  'hsla(30, 70.0%, 7.2%, 0)',
  'hsla(30, 70.0%, 7.2%, 0.25)',
  'hsla(30, 70.0%, 7.2%, 0.5)',
  'hsla(30, 70.0%, 7.2%, 0.75)',
  'hsla(45, 100%, 5.5%, 0)',
  'hsla(45, 100%, 5.5%, 0.25)',
  'hsla(45, 100%, 5.5%, 0.5)',
  'hsla(45, 100%, 5.5%, 0.75)',
  'hsla(146, 30.0%, 7.4%, 0)',
  'hsla(146, 30.0%, 7.4%, 0.25)',
  'hsla(146, 30.0%, 7.4%, 0.5)',
  'hsla(146, 30.0%, 7.4%, 0.75)',
  'hsla(212, 35.0%, 9.2%, 0)',
  'hsla(212, 35.0%, 9.2%, 0.25)',
  'hsla(212, 35.0%, 9.2%, 0.5)',
  'hsla(212, 35.0%, 9.2%, 0.75)',
  'hsla(284, 20.0%, 9.6%, 0)',
  'hsla(284, 20.0%, 9.6%, 0.25)',
  'hsla(284, 20.0%, 9.6%, 0.5)',
  'hsla(284, 20.0%, 9.6%, 0.75)',
  'hsla(318, 25.0%, 9.6%, 0)',
  'hsla(318, 25.0%, 9.6%, 0.25)',
  'hsla(318, 25.0%, 9.6%, 0.5)',
  'hsla(318, 25.0%, 9.6%, 0.75)',
  'hsla(353, 23.0%, 9.8%, 0)',
  'hsla(353, 23.0%, 9.8%, 0.25)',
  'hsla(353, 23.0%, 9.8%, 0.5)',
  'hsla(353, 23.0%, 9.8%, 0.75)',
  'hsla(0, 0%, 8.5%, 0)',
  'hsla(0, 0%, 8.5%, 0.25)',
  'hsla(0, 0%, 8.5%, 0.5)',
  'hsla(0, 0%, 8.5%, 0.75)',
  'hsla(0, 0%, 43.9%, 0)',
  'hsla(0, 0%, 43.9%, 0.25)',
  'hsla(0, 0%, 43.9%, 0.5)',
  'hsla(0, 0%, 43.9%, 0.75)',
  'rgba(0,0,0,0.5)',
  'rgba(0,0,0,0.8)',
]

const ks = [
'accentBackground',
'accentColor',
'background0',
'background025',
'background05',
'background075',
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
'color0',
'color025',
'color05',
'color075',
'background',
'backgroundHover',
'backgroundPress',
'backgroundFocus',
'borderColor',
'borderColorHover',
'borderColorPress',
'borderColorFocus',
'color',
'colorHover',
'colorPress',
'colorFocus',
'colorTransparent',
'placeholderColor',
'outlineColor',
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
'shadowColorFocus']


const n1 = t([[0, 0],[1, 1],[2, 2],[3, 3],[4, 4],[5, 5],[6, 6],[7, 7],[8, 8],[9, 7],[10, 9],[11, 10],[12, 11],[13, 12],[14, 13],[15, 14],[16, 15],[17, 16],[18, 17],[19, 18],[20, 19],[21, 20],[22, 6],[23, 5],[24, 7],[25, 7],[26, 7],[27, 8],[28, 9],[29, 7],[30, 16],[31, 15],[32, 16],[33, 15],[34, 17],[35, 13],[36, 18],[37, 21],[38, 22],[39, 23],[40, 0],[41, 24],[42, 25],[43, 26],[44, 27],[45, 28],[46, 29],[47, 30],[48, 31],[49, 32],[50, 33],[51, 34],[52, 35],[53, 36],[54, 37],[55, 38],[56, 39],[57, 13],[58, 40],[59, 41],[60, 16],[61, 42],[62, 43],[63, 44],[64, 45],[65, 46],[66, 47],[67, 48],[68, 49],[69, 50],[70, 51],[71, 52],[72, 53],[73, 54],[74, 55],[75, 56],[76, 57],[77, 58],[78, 59],[79, 60],[80, 61],[81, 62],[82, 63],[83, 64],[84, 65],[85, 66],[86, 67],[87, 68],[88, 69],[89, 70],[90, 71],[91, 72],[92, 73],[93, 74],[94, 75],[95, 76],[96, 77],[97, 78],[98, 79],[99, 80],[100, 81],[101, 82],[102, 83],[103, 84],[104, 85],[105, 86],[106, 87],[107, 88],[108, 89],[109, 90],[110, 91],[111, 92],[112, 93],[113, 94],[114, 95],[115, 96],[116, 97],[117, 98],[118, 99],[119, 100],[120, 101],[121, 102],[122, 103],[123, 104],[124, 105],[125, 106],[126, 107],[127, 108],[128, 109],[129, 110],[130, 111],[131, 112],[132, 113],[133, 114],[134, 114],[135, 115],[136, 115]])

export const light = n1
const n2 = t([[0, 1],[1, 0],[2, 17],[3, 18],[4, 19],[5, 20],[6, 116],[7, 117],[8, 118],[9, 119],[10, 9],[11, 120],[12, 121],[13, 122],[14, 123],[15, 124],[16, 125],[17, 6],[18, 2],[19, 3],[20, 4],[21, 5],[22, 116],[23, 117],[24, 20],[25, 20],[26, 119],[27, 9],[28, 118],[29, 119],[30, 6],[31, 125],[32, 6],[33, 125],[34, 2],[35, 123],[36, 3],[37, 126],[38, 127],[39, 128],[40, 1],[41, 129],[42, 130],[43, 131],[44, 132],[45, 28],[46, 133],[47, 134],[48, 135],[49, 136],[50, 137],[51, 138],[52, 139],[53, 140],[54, 141],[55, 142],[56, 143],[57, 144],[58, 145],[59, 146],[60, 35],[61, 147],[62, 148],[63, 149],[64, 150],[65, 151],[66, 152],[67, 153],[68, 154],[69, 50],[70, 155],[71, 156],[72, 157],[73, 158],[74, 159],[75, 160],[76, 161],[77, 162],[78, 163],[79, 164],[80, 165],[81, 62],[82, 166],[83, 167],[84, 168],[85, 169],[86, 170],[87, 171],[88, 172],[89, 173],[90, 174],[91, 175],[92, 176],[93, 74],[94, 177],[95, 178],[96, 179],[97, 180],[98, 181],[99, 182],[100, 183],[101, 184],[102, 185],[103, 186],[104, 187],[105, 86],[106, 188],[107, 189],[108, 190],[109, 191],[110, 192],[111, 193],[112, 194],[113, 195],[114, 196],[115, 197],[116, 198],[117, 98],[118, 199],[119, 200],[120, 201],[121, 202],[122, 203],[123, 204],[124, 205],[125, 206],[126, 207],[127, 208],[128, 209],[129, 110],[130, 210],[131, 211],[132, 212],[133, 213],[134, 213],[135, 214],[136, 214]])

export const dark = n2
const n3 = t([[0, 66],[1, 77],[2, 215],[3, 216],[4, 217],[5, 218],[6, 54],[7, 55],[8, 56],[9, 57],[10, 58],[11, 59],[12, 60],[13, 61],[14, 62],[15, 63],[16, 64],[17, 65],[18, 219],[19, 220],[20, 221],[21, 222],[22, 54],[23, 218],[24, 55],[25, 55],[26, 57],[27, 56],[28, 58],[29, 57],[30, 65],[31, 64],[32, 65],[33, 64],[34, 219],[35, 62],[36, 220]])

export const light_orange = n3
const n4 = t([[0, 21],[1, 31],[2, 223],[3, 224],[4, 225],[5, 226],[6, 102],[7, 103],[8, 104],[9, 105],[10, 106],[11, 107],[12, 108],[13, 109],[14, 110],[15, 111],[16, 112],[17, 113],[18, 227],[19, 228],[20, 229],[21, 230],[22, 102],[23, 226],[24, 103],[25, 103],[26, 105],[27, 104],[28, 106],[29, 105],[30, 113],[31, 112],[32, 113],[33, 112],[34, 227],[35, 110],[36, 228]])

export const light_yellow = n4
const n5 = t([[0, 54],[1, 65],[2, 231],[3, 232],[4, 233],[5, 234],[6, 42],[7, 43],[8, 44],[9, 45],[10, 46],[11, 47],[12, 48],[13, 49],[14, 50],[15, 51],[16, 52],[17, 53],[18, 235],[19, 236],[20, 237],[21, 238],[22, 42],[23, 234],[24, 43],[25, 43],[26, 45],[27, 44],[28, 46],[29, 45],[30, 53],[31, 52],[32, 53],[33, 52],[34, 235],[35, 50],[36, 236]])

export const light_green = n5
const n6 = t([[0, 32],[1, 16],[2, 239],[3, 240],[4, 241],[5, 242],[6, 21],[7, 22],[8, 23],[9, 0],[10, 24],[11, 25],[12, 26],[13, 27],[14, 28],[15, 29],[16, 30],[17, 31],[18, 243],[19, 244],[20, 245],[21, 246],[22, 21],[23, 242],[24, 22],[25, 22],[26, 0],[27, 23],[28, 24],[29, 0],[30, 31],[31, 30],[32, 31],[33, 30],[34, 243],[35, 28],[36, 244]])

export const light_blue = n6
const n7 = t([[0, 90],[1, 101],[2, 247],[3, 248],[4, 249],[5, 250],[6, 78],[7, 79],[8, 80],[9, 81],[10, 82],[11, 83],[12, 84],[13, 85],[14, 86],[15, 87],[16, 88],[17, 89],[18, 251],[19, 252],[20, 253],[21, 254],[22, 78],[23, 250],[24, 79],[25, 79],[26, 81],[27, 80],[28, 82],[29, 81],[30, 89],[31, 88],[32, 89],[33, 88],[34, 251],[35, 86],[36, 252]])

export const light_purple = n7
const n8 = t([[0, 78],[1, 89],[2, 255],[3, 256],[4, 257],[5, 258],[6, 66],[7, 67],[8, 68],[9, 69],[10, 70],[11, 71],[12, 72],[13, 73],[14, 74],[15, 75],[16, 76],[17, 77],[18, 259],[19, 260],[20, 261],[21, 262],[22, 66],[23, 258],[24, 67],[25, 67],[26, 69],[27, 68],[28, 70],[29, 69],[30, 77],[31, 76],[32, 77],[33, 76],[34, 259],[35, 74],[36, 260]])

export const light_pink = n8
const n9 = t([[0, 102],[1, 113],[2, 263],[3, 264],[4, 265],[5, 266],[6, 90],[7, 91],[8, 92],[9, 93],[10, 94],[11, 95],[12, 96],[13, 97],[14, 98],[15, 99],[16, 100],[17, 101],[18, 267],[19, 268],[20, 269],[21, 270],[22, 90],[23, 266],[24, 91],[25, 91],[26, 93],[27, 92],[28, 94],[29, 93],[30, 101],[31, 100],[32, 101],[33, 100],[34, 267],[35, 98],[36, 268]])

export const light_red = n9
const n10 = t([[0, 42],[1, 53],[2, 271],[3, 272],[4, 273],[5, 274],[6, 32],[7, 33],[8, 34],[9, 35],[10, 36],[11, 37],[12, 38],[13, 39],[14, 13],[15, 40],[16, 41],[17, 16],[18, 275],[19, 276],[20, 277],[21, 278],[22, 32],[23, 274],[24, 33],[25, 33],[26, 35],[27, 34],[28, 36],[29, 35],[30, 16],[31, 41],[32, 16],[33, 41],[34, 275],[35, 13],[36, 276]])

export const light_gray = n10
const n11 = t([[0, 66],[1, 77],[2, 279],[3, 280],[4, 281],[5, 282],[6, 158],[7, 159],[8, 160],[9, 161],[10, 162],[11, 163],[12, 164],[13, 165],[14, 62],[15, 166],[16, 167],[17, 168],[18, 219],[19, 220],[20, 221],[21, 222],[22, 158],[23, 159],[24, 282],[25, 282],[26, 161],[27, 162],[28, 160],[29, 161],[30, 168],[31, 167],[32, 168],[33, 167],[34, 219],[35, 62],[36, 220]])

export const dark_orange = n11
const n12 = t([[0, 21],[1, 31],[2, 283],[3, 284],[4, 285],[5, 286],[6, 202],[7, 203],[8, 204],[9, 205],[10, 206],[11, 207],[12, 208],[13, 209],[14, 110],[15, 210],[16, 211],[17, 212],[18, 227],[19, 228],[20, 229],[21, 230],[22, 202],[23, 203],[24, 286],[25, 286],[26, 205],[27, 206],[28, 204],[29, 205],[30, 212],[31, 211],[32, 212],[33, 211],[34, 227],[35, 110],[36, 228]])

export const dark_yellow = n12
const n13 = t([[0, 54],[1, 65],[2, 287],[3, 288],[4, 289],[5, 290],[6, 147],[7, 148],[8, 149],[9, 150],[10, 151],[11, 152],[12, 153],[13, 154],[14, 50],[15, 155],[16, 156],[17, 157],[18, 235],[19, 236],[20, 237],[21, 238],[22, 147],[23, 148],[24, 290],[25, 290],[26, 150],[27, 151],[28, 149],[29, 150],[30, 157],[31, 156],[32, 157],[33, 156],[34, 235],[35, 50],[36, 236]])

export const dark_green = n13
const n14 = t([[0, 32],[1, 16],[2, 291],[3, 292],[4, 293],[5, 294],[6, 126],[7, 127],[8, 128],[9, 1],[10, 129],[11, 130],[12, 131],[13, 132],[14, 28],[15, 133],[16, 134],[17, 135],[18, 243],[19, 244],[20, 245],[21, 246],[22, 126],[23, 127],[24, 294],[25, 294],[26, 1],[27, 129],[28, 128],[29, 1],[30, 135],[31, 134],[32, 135],[33, 134],[34, 243],[35, 28],[36, 244]])

export const dark_blue = n14
const n15 = t([[0, 90],[1, 101],[2, 295],[3, 296],[4, 297],[5, 298],[6, 180],[7, 181],[8, 182],[9, 183],[10, 184],[11, 185],[12, 186],[13, 187],[14, 86],[15, 188],[16, 189],[17, 190],[18, 251],[19, 252],[20, 253],[21, 254],[22, 180],[23, 181],[24, 298],[25, 298],[26, 183],[27, 184],[28, 182],[29, 183],[30, 190],[31, 189],[32, 190],[33, 189],[34, 251],[35, 86],[36, 252]])

export const dark_purple = n15
const n16 = t([[0, 78],[1, 89],[2, 299],[3, 300],[4, 301],[5, 302],[6, 169],[7, 170],[8, 171],[9, 172],[10, 173],[11, 174],[12, 175],[13, 176],[14, 74],[15, 177],[16, 178],[17, 179],[18, 259],[19, 260],[20, 261],[21, 262],[22, 169],[23, 170],[24, 302],[25, 302],[26, 172],[27, 173],[28, 171],[29, 172],[30, 179],[31, 178],[32, 179],[33, 178],[34, 259],[35, 74],[36, 260]])

export const dark_pink = n16
const n17 = t([[0, 102],[1, 113],[2, 303],[3, 304],[4, 305],[5, 306],[6, 191],[7, 192],[8, 193],[9, 194],[10, 195],[11, 196],[12, 197],[13, 198],[14, 98],[15, 199],[16, 200],[17, 201],[18, 267],[19, 268],[20, 269],[21, 270],[22, 191],[23, 192],[24, 306],[25, 306],[26, 194],[27, 195],[28, 193],[29, 194],[30, 201],[31, 200],[32, 201],[33, 200],[34, 267],[35, 98],[36, 268]])

export const dark_red = n17
const n18 = t([[0, 42],[1, 53],[2, 307],[3, 308],[4, 309],[5, 310],[6, 136],[7, 137],[8, 138],[9, 139],[10, 140],[11, 141],[12, 142],[13, 143],[14, 144],[15, 145],[16, 146],[17, 35],[18, 311],[19, 312],[20, 313],[21, 314],[22, 136],[23, 137],[24, 310],[25, 310],[26, 139],[27, 140],[28, 138],[29, 139],[30, 35],[31, 146],[32, 35],[33, 146],[34, 311],[35, 144],[36, 312]])

export const dark_gray = n18
const n19 = t([[30, 15],[31, 14],[32, 15],[33, 14]])

export const light_alt1 = n19
const n20 = t([[30, 14],[31, 13],[32, 14],[33, 13]])

export const light_alt2 = n20
const n21 = t([[22, 7],[23, 8],[24, 9],[25, 9],[26, 11],[27, 10],[29, 11],[28, 12]])

export const light_active = n21
export const light_surface3 = n21
export const light_Button = n21
export const light_SliderTrackActive = n21
export const light_active_SliderTrackActive = n21
const n22 = t([[22, 7],[23, 6],[24, 8],[25, 8],[26, 9],[27, 7],[29, 9],[28, 10]])

export const light_surface1 = n22
export const light_ListItem = n22
export const light_SelectTrigger = n22
export const light_Card = n22
export const light_Progress = n22
export const light_TooltipArrow = n22
export const light_SliderTrack = n22
export const light_Input = n22
export const light_TextArea = n22
export const light_active_ListItem = n22
export const light_active_Progress = n22
export const light_active_TooltipArrow = n22
export const light_active_SliderTrack = n22
const n23 = t([[22, 8],[23, 7],[24, 7],[25, 7],[26, 10],[27, 9],[29, 10],[28, 11]])

export const light_surface2 = n23
export const light_Checkbox = n23
export const light_Switch = n23
export const light_TooltipContent = n23
export const light_RadioGroupItem = n23
const n24 = t([[22, 10],[23, 10],[24, 11],[25, 11],[26, 10],[27, 10],[29, 11],[28, 11]])

export const light_surface4 = n24
export const light_active_SelectTrigger = n24
export const light_active_Card = n24
export const light_active_Button = n24
export const light_active_Checkbox = n24
export const light_active_Switch = n24
export const light_active_TooltipContent = n24
export const light_active_RadioGroupItem = n24
export const light_active_Input = n24
export const light_active_TextArea = n24
const n25 = t([[30, 125],[31, 124],[32, 125],[33, 124]])

export const dark_alt1 = n25
const n26 = t([[30, 124],[31, 123],[32, 124],[33, 123]])

export const dark_alt2 = n26
const n27 = t([[22, 119],[23, 9],[24, 118],[25, 118],[26, 121],[27, 122],[29, 121],[28, 120]])

export const dark_active = n27
export const dark_surface3 = n27
export const dark_Button = n27
export const dark_SliderTrackActive = n27
export const dark_active_SliderTrackActive = n27
const n28 = t([[22, 117],[23, 118],[24, 116],[25, 116],[26, 9],[27, 120],[29, 9],[28, 119]])

export const dark_surface1 = n28
export const dark_ListItem = n28
export const dark_SelectTrigger = n28
export const dark_Card = n28
export const dark_Progress = n28
export const dark_TooltipArrow = n28
export const dark_SliderTrack = n28
export const dark_Input = n28
export const dark_TextArea = n28
export const dark_active_ListItem = n28
export const dark_active_Progress = n28
export const dark_active_TooltipArrow = n28
export const dark_active_SliderTrack = n28
const n29 = t([[22, 118],[23, 119],[24, 117],[25, 117],[26, 120],[27, 121],[29, 120],[28, 9]])

export const dark_surface2 = n29
export const dark_Checkbox = n29
export const dark_Switch = n29
export const dark_TooltipContent = n29
export const dark_RadioGroupItem = n29
const n30 = t([[22, 120],[23, 120],[24, 9],[25, 9],[26, 120],[27, 120],[29, 9],[28, 9]])

export const dark_surface4 = n30
export const dark_active_SelectTrigger = n30
export const dark_active_Card = n30
export const dark_active_Button = n30
export const dark_active_Checkbox = n30
export const dark_active_Switch = n30
export const dark_active_TooltipContent = n30
export const dark_active_RadioGroupItem = n30
export const dark_active_Input = n30
export const dark_active_TextArea = n30
const n31 = t([[30, 64],[31, 63],[32, 64],[33, 63]])

export const light_orange_alt1 = n31
const n32 = t([[30, 63],[31, 62],[32, 63],[33, 62]])

export const light_orange_alt2 = n32
const n33 = t([[22, 57],[23, 56],[24, 58],[25, 58],[26, 60],[27, 59],[29, 60],[28, 61]])

export const light_orange_active = n33
export const light_orange_surface3 = n33
export const light_orange_Button = n33
export const light_orange_SliderTrackActive = n33
export const light_orange_active_SliderTrackActive = n33
const n34 = t([[22, 55],[23, 54],[24, 56],[25, 56],[26, 58],[27, 57],[29, 58],[28, 59]])

export const light_orange_surface1 = n34
export const light_orange_ListItem = n34
export const light_orange_SelectTrigger = n34
export const light_orange_Card = n34
export const light_orange_Progress = n34
export const light_orange_TooltipArrow = n34
export const light_orange_SliderTrack = n34
export const light_orange_Input = n34
export const light_orange_TextArea = n34
export const light_orange_active_ListItem = n34
export const light_orange_active_Progress = n34
export const light_orange_active_TooltipArrow = n34
export const light_orange_active_SliderTrack = n34
const n35 = t([[22, 56],[23, 55],[24, 57],[25, 57],[26, 59],[27, 58],[29, 59],[28, 60]])

export const light_orange_surface2 = n35
export const light_orange_Checkbox = n35
export const light_orange_Switch = n35
export const light_orange_TooltipContent = n35
export const light_orange_RadioGroupItem = n35
const n36 = t([[22, 59],[23, 59],[24, 60],[25, 60],[26, 59],[27, 59],[29, 60],[28, 60]])

export const light_orange_surface4 = n36
export const light_orange_active_SelectTrigger = n36
export const light_orange_active_Card = n36
export const light_orange_active_Button = n36
export const light_orange_active_Checkbox = n36
export const light_orange_active_Switch = n36
export const light_orange_active_TooltipContent = n36
export const light_orange_active_RadioGroupItem = n36
export const light_orange_active_Input = n36
export const light_orange_active_TextArea = n36
const n37 = t([[30, 112],[31, 111],[32, 112],[33, 111]])

export const light_yellow_alt1 = n37
const n38 = t([[30, 111],[31, 110],[32, 111],[33, 110]])

export const light_yellow_alt2 = n38
const n39 = t([[22, 105],[23, 104],[24, 106],[25, 106],[26, 108],[27, 107],[29, 108],[28, 109]])

export const light_yellow_active = n39
export const light_yellow_surface3 = n39
export const light_yellow_Button = n39
export const light_yellow_SliderTrackActive = n39
export const light_yellow_active_SliderTrackActive = n39
const n40 = t([[22, 103],[23, 102],[24, 104],[25, 104],[26, 106],[27, 105],[29, 106],[28, 107]])

export const light_yellow_surface1 = n40
export const light_yellow_ListItem = n40
export const light_yellow_SelectTrigger = n40
export const light_yellow_Card = n40
export const light_yellow_Progress = n40
export const light_yellow_TooltipArrow = n40
export const light_yellow_SliderTrack = n40
export const light_yellow_Input = n40
export const light_yellow_TextArea = n40
export const light_yellow_active_ListItem = n40
export const light_yellow_active_Progress = n40
export const light_yellow_active_TooltipArrow = n40
export const light_yellow_active_SliderTrack = n40
const n41 = t([[22, 104],[23, 103],[24, 105],[25, 105],[26, 107],[27, 106],[29, 107],[28, 108]])

export const light_yellow_surface2 = n41
export const light_yellow_Checkbox = n41
export const light_yellow_Switch = n41
export const light_yellow_TooltipContent = n41
export const light_yellow_RadioGroupItem = n41
const n42 = t([[22, 107],[23, 107],[24, 108],[25, 108],[26, 107],[27, 107],[29, 108],[28, 108]])

export const light_yellow_surface4 = n42
export const light_yellow_active_SelectTrigger = n42
export const light_yellow_active_Card = n42
export const light_yellow_active_Button = n42
export const light_yellow_active_Checkbox = n42
export const light_yellow_active_Switch = n42
export const light_yellow_active_TooltipContent = n42
export const light_yellow_active_RadioGroupItem = n42
export const light_yellow_active_Input = n42
export const light_yellow_active_TextArea = n42
const n43 = t([[30, 52],[31, 51],[32, 52],[33, 51]])

export const light_green_alt1 = n43
const n44 = t([[30, 51],[31, 50],[32, 51],[33, 50]])

export const light_green_alt2 = n44
const n45 = t([[22, 45],[23, 44],[24, 46],[25, 46],[26, 48],[27, 47],[29, 48],[28, 49]])

export const light_green_active = n45
export const light_green_surface3 = n45
export const light_green_Button = n45
export const light_green_SliderTrackActive = n45
export const light_green_active_SliderTrackActive = n45
const n46 = t([[22, 43],[23, 42],[24, 44],[25, 44],[26, 46],[27, 45],[29, 46],[28, 47]])

export const light_green_surface1 = n46
export const light_green_ListItem = n46
export const light_green_SelectTrigger = n46
export const light_green_Card = n46
export const light_green_Progress = n46
export const light_green_TooltipArrow = n46
export const light_green_SliderTrack = n46
export const light_green_Input = n46
export const light_green_TextArea = n46
export const light_green_active_ListItem = n46
export const light_green_active_Progress = n46
export const light_green_active_TooltipArrow = n46
export const light_green_active_SliderTrack = n46
const n47 = t([[22, 44],[23, 43],[24, 45],[25, 45],[26, 47],[27, 46],[29, 47],[28, 48]])

export const light_green_surface2 = n47
export const light_green_Checkbox = n47
export const light_green_Switch = n47
export const light_green_TooltipContent = n47
export const light_green_RadioGroupItem = n47
const n48 = t([[22, 47],[23, 47],[24, 48],[25, 48],[26, 47],[27, 47],[29, 48],[28, 48]])

export const light_green_surface4 = n48
export const light_green_active_SelectTrigger = n48
export const light_green_active_Card = n48
export const light_green_active_Button = n48
export const light_green_active_Checkbox = n48
export const light_green_active_Switch = n48
export const light_green_active_TooltipContent = n48
export const light_green_active_RadioGroupItem = n48
export const light_green_active_Input = n48
export const light_green_active_TextArea = n48
const n49 = t([[30, 30],[31, 29],[32, 30],[33, 29]])

export const light_blue_alt1 = n49
const n50 = t([[30, 29],[31, 28],[32, 29],[33, 28]])

export const light_blue_alt2 = n50
const n51 = t([[22, 0],[23, 23],[24, 24],[25, 24],[26, 26],[27, 25],[29, 26],[28, 27]])

export const light_blue_active = n51
export const light_blue_surface3 = n51
export const light_blue_Button = n51
export const light_blue_SliderTrackActive = n51
export const light_blue_active_SliderTrackActive = n51
const n52 = t([[22, 22],[23, 21],[24, 23],[25, 23],[26, 24],[27, 0],[29, 24],[28, 25]])

export const light_blue_surface1 = n52
export const light_blue_ListItem = n52
export const light_blue_SelectTrigger = n52
export const light_blue_Card = n52
export const light_blue_Progress = n52
export const light_blue_TooltipArrow = n52
export const light_blue_SliderTrack = n52
export const light_blue_Input = n52
export const light_blue_TextArea = n52
export const light_blue_active_ListItem = n52
export const light_blue_active_Progress = n52
export const light_blue_active_TooltipArrow = n52
export const light_blue_active_SliderTrack = n52
const n53 = t([[22, 23],[23, 22],[24, 0],[25, 0],[26, 25],[27, 24],[29, 25],[28, 26]])

export const light_blue_surface2 = n53
export const light_blue_Checkbox = n53
export const light_blue_Switch = n53
export const light_blue_TooltipContent = n53
export const light_blue_RadioGroupItem = n53
const n54 = t([[22, 25],[23, 25],[24, 26],[25, 26],[26, 25],[27, 25],[29, 26],[28, 26]])

export const light_blue_surface4 = n54
export const light_blue_active_SelectTrigger = n54
export const light_blue_active_Card = n54
export const light_blue_active_Button = n54
export const light_blue_active_Checkbox = n54
export const light_blue_active_Switch = n54
export const light_blue_active_TooltipContent = n54
export const light_blue_active_RadioGroupItem = n54
export const light_blue_active_Input = n54
export const light_blue_active_TextArea = n54
const n55 = t([[30, 88],[31, 87],[32, 88],[33, 87]])

export const light_purple_alt1 = n55
const n56 = t([[30, 87],[31, 86],[32, 87],[33, 86]])

export const light_purple_alt2 = n56
const n57 = t([[22, 81],[23, 80],[24, 82],[25, 82],[26, 84],[27, 83],[29, 84],[28, 85]])

export const light_purple_active = n57
export const light_purple_surface3 = n57
export const light_purple_Button = n57
export const light_purple_SliderTrackActive = n57
export const light_purple_active_SliderTrackActive = n57
const n58 = t([[22, 79],[23, 78],[24, 80],[25, 80],[26, 82],[27, 81],[29, 82],[28, 83]])

export const light_purple_surface1 = n58
export const light_purple_ListItem = n58
export const light_purple_SelectTrigger = n58
export const light_purple_Card = n58
export const light_purple_Progress = n58
export const light_purple_TooltipArrow = n58
export const light_purple_SliderTrack = n58
export const light_purple_Input = n58
export const light_purple_TextArea = n58
export const light_purple_active_ListItem = n58
export const light_purple_active_Progress = n58
export const light_purple_active_TooltipArrow = n58
export const light_purple_active_SliderTrack = n58
const n59 = t([[22, 80],[23, 79],[24, 81],[25, 81],[26, 83],[27, 82],[29, 83],[28, 84]])

export const light_purple_surface2 = n59
export const light_purple_Checkbox = n59
export const light_purple_Switch = n59
export const light_purple_TooltipContent = n59
export const light_purple_RadioGroupItem = n59
const n60 = t([[22, 83],[23, 83],[24, 84],[25, 84],[26, 83],[27, 83],[29, 84],[28, 84]])

export const light_purple_surface4 = n60
export const light_purple_active_SelectTrigger = n60
export const light_purple_active_Card = n60
export const light_purple_active_Button = n60
export const light_purple_active_Checkbox = n60
export const light_purple_active_Switch = n60
export const light_purple_active_TooltipContent = n60
export const light_purple_active_RadioGroupItem = n60
export const light_purple_active_Input = n60
export const light_purple_active_TextArea = n60
const n61 = t([[30, 76],[31, 75],[32, 76],[33, 75]])

export const light_pink_alt1 = n61
const n62 = t([[30, 75],[31, 74],[32, 75],[33, 74]])

export const light_pink_alt2 = n62
const n63 = t([[22, 69],[23, 68],[24, 70],[25, 70],[26, 72],[27, 71],[29, 72],[28, 73]])

export const light_pink_active = n63
export const light_pink_surface3 = n63
export const light_pink_Button = n63
export const light_pink_SliderTrackActive = n63
export const light_pink_active_SliderTrackActive = n63
const n64 = t([[22, 67],[23, 66],[24, 68],[25, 68],[26, 70],[27, 69],[29, 70],[28, 71]])

export const light_pink_surface1 = n64
export const light_pink_ListItem = n64
export const light_pink_SelectTrigger = n64
export const light_pink_Card = n64
export const light_pink_Progress = n64
export const light_pink_TooltipArrow = n64
export const light_pink_SliderTrack = n64
export const light_pink_Input = n64
export const light_pink_TextArea = n64
export const light_pink_active_ListItem = n64
export const light_pink_active_Progress = n64
export const light_pink_active_TooltipArrow = n64
export const light_pink_active_SliderTrack = n64
const n65 = t([[22, 68],[23, 67],[24, 69],[25, 69],[26, 71],[27, 70],[29, 71],[28, 72]])

export const light_pink_surface2 = n65
export const light_pink_Checkbox = n65
export const light_pink_Switch = n65
export const light_pink_TooltipContent = n65
export const light_pink_RadioGroupItem = n65
const n66 = t([[22, 71],[23, 71],[24, 72],[25, 72],[26, 71],[27, 71],[29, 72],[28, 72]])

export const light_pink_surface4 = n66
export const light_pink_active_SelectTrigger = n66
export const light_pink_active_Card = n66
export const light_pink_active_Button = n66
export const light_pink_active_Checkbox = n66
export const light_pink_active_Switch = n66
export const light_pink_active_TooltipContent = n66
export const light_pink_active_RadioGroupItem = n66
export const light_pink_active_Input = n66
export const light_pink_active_TextArea = n66
const n67 = t([[30, 100],[31, 99],[32, 100],[33, 99]])

export const light_red_alt1 = n67
const n68 = t([[30, 99],[31, 98],[32, 99],[33, 98]])

export const light_red_alt2 = n68
const n69 = t([[22, 93],[23, 92],[24, 94],[25, 94],[26, 96],[27, 95],[29, 96],[28, 97]])

export const light_red_active = n69
export const light_red_surface3 = n69
export const light_red_Button = n69
export const light_red_SliderTrackActive = n69
export const light_red_active_SliderTrackActive = n69
const n70 = t([[22, 91],[23, 90],[24, 92],[25, 92],[26, 94],[27, 93],[29, 94],[28, 95]])

export const light_red_surface1 = n70
export const light_red_ListItem = n70
export const light_red_SelectTrigger = n70
export const light_red_Card = n70
export const light_red_Progress = n70
export const light_red_TooltipArrow = n70
export const light_red_SliderTrack = n70
export const light_red_Input = n70
export const light_red_TextArea = n70
export const light_red_active_ListItem = n70
export const light_red_active_Progress = n70
export const light_red_active_TooltipArrow = n70
export const light_red_active_SliderTrack = n70
const n71 = t([[22, 92],[23, 91],[24, 93],[25, 93],[26, 95],[27, 94],[29, 95],[28, 96]])

export const light_red_surface2 = n71
export const light_red_Checkbox = n71
export const light_red_Switch = n71
export const light_red_TooltipContent = n71
export const light_red_RadioGroupItem = n71
const n72 = t([[22, 95],[23, 95],[24, 96],[25, 96],[26, 95],[27, 95],[29, 96],[28, 96]])

export const light_red_surface4 = n72
export const light_red_active_SelectTrigger = n72
export const light_red_active_Card = n72
export const light_red_active_Button = n72
export const light_red_active_Checkbox = n72
export const light_red_active_Switch = n72
export const light_red_active_TooltipContent = n72
export const light_red_active_RadioGroupItem = n72
export const light_red_active_Input = n72
export const light_red_active_TextArea = n72
const n73 = t([[30, 41],[31, 40],[32, 41],[33, 40]])

export const light_gray_alt1 = n73
const n74 = t([[30, 40],[31, 13],[32, 40],[33, 13]])

export const light_gray_alt2 = n74
const n75 = t([[22, 35],[23, 34],[24, 36],[25, 36],[26, 38],[27, 37],[29, 38],[28, 39]])

export const light_gray_active = n75
export const light_gray_surface3 = n75
export const light_gray_Button = n75
export const light_gray_SliderTrackActive = n75
export const light_gray_active_SliderTrackActive = n75
const n76 = t([[22, 33],[23, 32],[24, 34],[25, 34],[26, 36],[27, 35],[29, 36],[28, 37]])

export const light_gray_surface1 = n76
export const light_gray_ListItem = n76
export const light_gray_SelectTrigger = n76
export const light_gray_Card = n76
export const light_gray_Progress = n76
export const light_gray_TooltipArrow = n76
export const light_gray_SliderTrack = n76
export const light_gray_Input = n76
export const light_gray_TextArea = n76
export const light_gray_active_ListItem = n76
export const light_gray_active_Progress = n76
export const light_gray_active_TooltipArrow = n76
export const light_gray_active_SliderTrack = n76
const n77 = t([[22, 34],[23, 33],[24, 35],[25, 35],[26, 37],[27, 36],[29, 37],[28, 38]])

export const light_gray_surface2 = n77
export const light_gray_Checkbox = n77
export const light_gray_Switch = n77
export const light_gray_TooltipContent = n77
export const light_gray_RadioGroupItem = n77
const n78 = t([[22, 37],[23, 37],[24, 38],[25, 38],[26, 37],[27, 37],[29, 38],[28, 38]])

export const light_gray_surface4 = n78
export const light_gray_active_SelectTrigger = n78
export const light_gray_active_Card = n78
export const light_gray_active_Button = n78
export const light_gray_active_Checkbox = n78
export const light_gray_active_Switch = n78
export const light_gray_active_TooltipContent = n78
export const light_gray_active_RadioGroupItem = n78
export const light_gray_active_Input = n78
export const light_gray_active_TextArea = n78
const n79 = t([[30, 167],[31, 166],[32, 167],[33, 166]])

export const dark_orange_alt1 = n79
const n80 = t([[30, 166],[31, 62],[32, 166],[33, 62]])

export const dark_orange_alt2 = n80
const n81 = t([[22, 161],[23, 162],[24, 160],[25, 160],[26, 164],[27, 165],[29, 164],[28, 163]])

export const dark_orange_active = n81
export const dark_orange_surface3 = n81
export const dark_orange_Button = n81
export const dark_orange_SliderTrackActive = n81
export const dark_orange_active_SliderTrackActive = n81
const n82 = t([[22, 159],[23, 160],[24, 158],[25, 158],[26, 162],[27, 163],[29, 162],[28, 161]])

export const dark_orange_surface1 = n82
export const dark_orange_ListItem = n82
export const dark_orange_SelectTrigger = n82
export const dark_orange_Card = n82
export const dark_orange_Progress = n82
export const dark_orange_TooltipArrow = n82
export const dark_orange_SliderTrack = n82
export const dark_orange_Input = n82
export const dark_orange_TextArea = n82
export const dark_orange_active_ListItem = n82
export const dark_orange_active_Progress = n82
export const dark_orange_active_TooltipArrow = n82
export const dark_orange_active_SliderTrack = n82
const n83 = t([[22, 160],[23, 161],[24, 159],[25, 159],[26, 163],[27, 164],[29, 163],[28, 162]])

export const dark_orange_surface2 = n83
export const dark_orange_Checkbox = n83
export const dark_orange_Switch = n83
export const dark_orange_TooltipContent = n83
export const dark_orange_RadioGroupItem = n83
const n84 = t([[22, 163],[23, 163],[24, 162],[25, 162],[26, 163],[27, 163],[29, 162],[28, 162]])

export const dark_orange_surface4 = n84
export const dark_orange_active_SelectTrigger = n84
export const dark_orange_active_Card = n84
export const dark_orange_active_Button = n84
export const dark_orange_active_Checkbox = n84
export const dark_orange_active_Switch = n84
export const dark_orange_active_TooltipContent = n84
export const dark_orange_active_RadioGroupItem = n84
export const dark_orange_active_Input = n84
export const dark_orange_active_TextArea = n84
const n85 = t([[30, 211],[31, 210],[32, 211],[33, 210]])

export const dark_yellow_alt1 = n85
const n86 = t([[30, 210],[31, 110],[32, 210],[33, 110]])

export const dark_yellow_alt2 = n86
const n87 = t([[22, 205],[23, 206],[24, 204],[25, 204],[26, 208],[27, 209],[29, 208],[28, 207]])

export const dark_yellow_active = n87
export const dark_yellow_surface3 = n87
export const dark_yellow_Button = n87
export const dark_yellow_SliderTrackActive = n87
export const dark_yellow_active_SliderTrackActive = n87
const n88 = t([[22, 203],[23, 204],[24, 202],[25, 202],[26, 206],[27, 207],[29, 206],[28, 205]])

export const dark_yellow_surface1 = n88
export const dark_yellow_ListItem = n88
export const dark_yellow_SelectTrigger = n88
export const dark_yellow_Card = n88
export const dark_yellow_Progress = n88
export const dark_yellow_TooltipArrow = n88
export const dark_yellow_SliderTrack = n88
export const dark_yellow_Input = n88
export const dark_yellow_TextArea = n88
export const dark_yellow_active_ListItem = n88
export const dark_yellow_active_Progress = n88
export const dark_yellow_active_TooltipArrow = n88
export const dark_yellow_active_SliderTrack = n88
const n89 = t([[22, 204],[23, 205],[24, 203],[25, 203],[26, 207],[27, 208],[29, 207],[28, 206]])

export const dark_yellow_surface2 = n89
export const dark_yellow_Checkbox = n89
export const dark_yellow_Switch = n89
export const dark_yellow_TooltipContent = n89
export const dark_yellow_RadioGroupItem = n89
const n90 = t([[22, 207],[23, 207],[24, 206],[25, 206],[26, 207],[27, 207],[29, 206],[28, 206]])

export const dark_yellow_surface4 = n90
export const dark_yellow_active_SelectTrigger = n90
export const dark_yellow_active_Card = n90
export const dark_yellow_active_Button = n90
export const dark_yellow_active_Checkbox = n90
export const dark_yellow_active_Switch = n90
export const dark_yellow_active_TooltipContent = n90
export const dark_yellow_active_RadioGroupItem = n90
export const dark_yellow_active_Input = n90
export const dark_yellow_active_TextArea = n90
const n91 = t([[30, 156],[31, 155],[32, 156],[33, 155]])

export const dark_green_alt1 = n91
const n92 = t([[30, 155],[31, 50],[32, 155],[33, 50]])

export const dark_green_alt2 = n92
const n93 = t([[22, 150],[23, 151],[24, 149],[25, 149],[26, 153],[27, 154],[29, 153],[28, 152]])

export const dark_green_active = n93
export const dark_green_surface3 = n93
export const dark_green_Button = n93
export const dark_green_SliderTrackActive = n93
export const dark_green_active_SliderTrackActive = n93
const n94 = t([[22, 148],[23, 149],[24, 147],[25, 147],[26, 151],[27, 152],[29, 151],[28, 150]])

export const dark_green_surface1 = n94
export const dark_green_ListItem = n94
export const dark_green_SelectTrigger = n94
export const dark_green_Card = n94
export const dark_green_Progress = n94
export const dark_green_TooltipArrow = n94
export const dark_green_SliderTrack = n94
export const dark_green_Input = n94
export const dark_green_TextArea = n94
export const dark_green_active_ListItem = n94
export const dark_green_active_Progress = n94
export const dark_green_active_TooltipArrow = n94
export const dark_green_active_SliderTrack = n94
const n95 = t([[22, 149],[23, 150],[24, 148],[25, 148],[26, 152],[27, 153],[29, 152],[28, 151]])

export const dark_green_surface2 = n95
export const dark_green_Checkbox = n95
export const dark_green_Switch = n95
export const dark_green_TooltipContent = n95
export const dark_green_RadioGroupItem = n95
const n96 = t([[22, 152],[23, 152],[24, 151],[25, 151],[26, 152],[27, 152],[29, 151],[28, 151]])

export const dark_green_surface4 = n96
export const dark_green_active_SelectTrigger = n96
export const dark_green_active_Card = n96
export const dark_green_active_Button = n96
export const dark_green_active_Checkbox = n96
export const dark_green_active_Switch = n96
export const dark_green_active_TooltipContent = n96
export const dark_green_active_RadioGroupItem = n96
export const dark_green_active_Input = n96
export const dark_green_active_TextArea = n96
const n97 = t([[30, 134],[31, 133],[32, 134],[33, 133]])

export const dark_blue_alt1 = n97
const n98 = t([[30, 133],[31, 28],[32, 133],[33, 28]])

export const dark_blue_alt2 = n98
const n99 = t([[22, 1],[23, 129],[24, 128],[25, 128],[26, 131],[27, 132],[29, 131],[28, 130]])

export const dark_blue_active = n99
export const dark_blue_surface3 = n99
export const dark_blue_Button = n99
export const dark_blue_SliderTrackActive = n99
export const dark_blue_active_SliderTrackActive = n99
const n100 = t([[22, 127],[23, 128],[24, 126],[25, 126],[26, 129],[27, 130],[29, 129],[28, 1]])

export const dark_blue_surface1 = n100
export const dark_blue_ListItem = n100
export const dark_blue_SelectTrigger = n100
export const dark_blue_Card = n100
export const dark_blue_Progress = n100
export const dark_blue_TooltipArrow = n100
export const dark_blue_SliderTrack = n100
export const dark_blue_Input = n100
export const dark_blue_TextArea = n100
export const dark_blue_active_ListItem = n100
export const dark_blue_active_Progress = n100
export const dark_blue_active_TooltipArrow = n100
export const dark_blue_active_SliderTrack = n100
const n101 = t([[22, 128],[23, 1],[24, 127],[25, 127],[26, 130],[27, 131],[29, 130],[28, 129]])

export const dark_blue_surface2 = n101
export const dark_blue_Checkbox = n101
export const dark_blue_Switch = n101
export const dark_blue_TooltipContent = n101
export const dark_blue_RadioGroupItem = n101
const n102 = t([[22, 130],[23, 130],[24, 129],[25, 129],[26, 130],[27, 130],[29, 129],[28, 129]])

export const dark_blue_surface4 = n102
export const dark_blue_active_SelectTrigger = n102
export const dark_blue_active_Card = n102
export const dark_blue_active_Button = n102
export const dark_blue_active_Checkbox = n102
export const dark_blue_active_Switch = n102
export const dark_blue_active_TooltipContent = n102
export const dark_blue_active_RadioGroupItem = n102
export const dark_blue_active_Input = n102
export const dark_blue_active_TextArea = n102
const n103 = t([[30, 189],[31, 188],[32, 189],[33, 188]])

export const dark_purple_alt1 = n103
const n104 = t([[30, 188],[31, 86],[32, 188],[33, 86]])

export const dark_purple_alt2 = n104
const n105 = t([[22, 183],[23, 184],[24, 182],[25, 182],[26, 186],[27, 187],[29, 186],[28, 185]])

export const dark_purple_active = n105
export const dark_purple_surface3 = n105
export const dark_purple_Button = n105
export const dark_purple_SliderTrackActive = n105
export const dark_purple_active_SliderTrackActive = n105
const n106 = t([[22, 181],[23, 182],[24, 180],[25, 180],[26, 184],[27, 185],[29, 184],[28, 183]])

export const dark_purple_surface1 = n106
export const dark_purple_ListItem = n106
export const dark_purple_SelectTrigger = n106
export const dark_purple_Card = n106
export const dark_purple_Progress = n106
export const dark_purple_TooltipArrow = n106
export const dark_purple_SliderTrack = n106
export const dark_purple_Input = n106
export const dark_purple_TextArea = n106
export const dark_purple_active_ListItem = n106
export const dark_purple_active_Progress = n106
export const dark_purple_active_TooltipArrow = n106
export const dark_purple_active_SliderTrack = n106
const n107 = t([[22, 182],[23, 183],[24, 181],[25, 181],[26, 185],[27, 186],[29, 185],[28, 184]])

export const dark_purple_surface2 = n107
export const dark_purple_Checkbox = n107
export const dark_purple_Switch = n107
export const dark_purple_TooltipContent = n107
export const dark_purple_RadioGroupItem = n107
const n108 = t([[22, 185],[23, 185],[24, 184],[25, 184],[26, 185],[27, 185],[29, 184],[28, 184]])

export const dark_purple_surface4 = n108
export const dark_purple_active_SelectTrigger = n108
export const dark_purple_active_Card = n108
export const dark_purple_active_Button = n108
export const dark_purple_active_Checkbox = n108
export const dark_purple_active_Switch = n108
export const dark_purple_active_TooltipContent = n108
export const dark_purple_active_RadioGroupItem = n108
export const dark_purple_active_Input = n108
export const dark_purple_active_TextArea = n108
const n109 = t([[30, 178],[31, 177],[32, 178],[33, 177]])

export const dark_pink_alt1 = n109
const n110 = t([[30, 177],[31, 74],[32, 177],[33, 74]])

export const dark_pink_alt2 = n110
const n111 = t([[22, 172],[23, 173],[24, 171],[25, 171],[26, 175],[27, 176],[29, 175],[28, 174]])

export const dark_pink_active = n111
export const dark_pink_surface3 = n111
export const dark_pink_Button = n111
export const dark_pink_SliderTrackActive = n111
export const dark_pink_active_SliderTrackActive = n111
const n112 = t([[22, 170],[23, 171],[24, 169],[25, 169],[26, 173],[27, 174],[29, 173],[28, 172]])

export const dark_pink_surface1 = n112
export const dark_pink_ListItem = n112
export const dark_pink_SelectTrigger = n112
export const dark_pink_Card = n112
export const dark_pink_Progress = n112
export const dark_pink_TooltipArrow = n112
export const dark_pink_SliderTrack = n112
export const dark_pink_Input = n112
export const dark_pink_TextArea = n112
export const dark_pink_active_ListItem = n112
export const dark_pink_active_Progress = n112
export const dark_pink_active_TooltipArrow = n112
export const dark_pink_active_SliderTrack = n112
const n113 = t([[22, 171],[23, 172],[24, 170],[25, 170],[26, 174],[27, 175],[29, 174],[28, 173]])

export const dark_pink_surface2 = n113
export const dark_pink_Checkbox = n113
export const dark_pink_Switch = n113
export const dark_pink_TooltipContent = n113
export const dark_pink_RadioGroupItem = n113
const n114 = t([[22, 174],[23, 174],[24, 173],[25, 173],[26, 174],[27, 174],[29, 173],[28, 173]])

export const dark_pink_surface4 = n114
export const dark_pink_active_SelectTrigger = n114
export const dark_pink_active_Card = n114
export const dark_pink_active_Button = n114
export const dark_pink_active_Checkbox = n114
export const dark_pink_active_Switch = n114
export const dark_pink_active_TooltipContent = n114
export const dark_pink_active_RadioGroupItem = n114
export const dark_pink_active_Input = n114
export const dark_pink_active_TextArea = n114
const n115 = t([[30, 200],[31, 199],[32, 200],[33, 199]])

export const dark_red_alt1 = n115
const n116 = t([[30, 199],[31, 98],[32, 199],[33, 98]])

export const dark_red_alt2 = n116
const n117 = t([[22, 194],[23, 195],[24, 193],[25, 193],[26, 197],[27, 198],[29, 197],[28, 196]])

export const dark_red_active = n117
export const dark_red_surface3 = n117
export const dark_red_Button = n117
export const dark_red_SliderTrackActive = n117
export const dark_red_active_SliderTrackActive = n117
const n118 = t([[22, 192],[23, 193],[24, 191],[25, 191],[26, 195],[27, 196],[29, 195],[28, 194]])

export const dark_red_surface1 = n118
export const dark_red_ListItem = n118
export const dark_red_SelectTrigger = n118
export const dark_red_Card = n118
export const dark_red_Progress = n118
export const dark_red_TooltipArrow = n118
export const dark_red_SliderTrack = n118
export const dark_red_Input = n118
export const dark_red_TextArea = n118
export const dark_red_active_ListItem = n118
export const dark_red_active_Progress = n118
export const dark_red_active_TooltipArrow = n118
export const dark_red_active_SliderTrack = n118
const n119 = t([[22, 193],[23, 194],[24, 192],[25, 192],[26, 196],[27, 197],[29, 196],[28, 195]])

export const dark_red_surface2 = n119
export const dark_red_Checkbox = n119
export const dark_red_Switch = n119
export const dark_red_TooltipContent = n119
export const dark_red_RadioGroupItem = n119
const n120 = t([[22, 196],[23, 196],[24, 195],[25, 195],[26, 196],[27, 196],[29, 195],[28, 195]])

export const dark_red_surface4 = n120
export const dark_red_active_SelectTrigger = n120
export const dark_red_active_Card = n120
export const dark_red_active_Button = n120
export const dark_red_active_Checkbox = n120
export const dark_red_active_Switch = n120
export const dark_red_active_TooltipContent = n120
export const dark_red_active_RadioGroupItem = n120
export const dark_red_active_Input = n120
export const dark_red_active_TextArea = n120
const n121 = t([[30, 146],[31, 145],[32, 146],[33, 145]])

export const dark_gray_alt1 = n121
const n122 = t([[30, 145],[31, 144],[32, 145],[33, 144]])

export const dark_gray_alt2 = n122
const n123 = t([[22, 139],[23, 140],[24, 138],[25, 138],[26, 142],[27, 143],[29, 142],[28, 141]])

export const dark_gray_active = n123
export const dark_gray_surface3 = n123
export const dark_gray_Button = n123
export const dark_gray_SliderTrackActive = n123
export const dark_gray_active_SliderTrackActive = n123
const n124 = t([[22, 137],[23, 138],[24, 136],[25, 136],[26, 140],[27, 141],[29, 140],[28, 139]])

export const dark_gray_surface1 = n124
export const dark_gray_ListItem = n124
export const dark_gray_SelectTrigger = n124
export const dark_gray_Card = n124
export const dark_gray_Progress = n124
export const dark_gray_TooltipArrow = n124
export const dark_gray_SliderTrack = n124
export const dark_gray_Input = n124
export const dark_gray_TextArea = n124
export const dark_gray_active_ListItem = n124
export const dark_gray_active_Progress = n124
export const dark_gray_active_TooltipArrow = n124
export const dark_gray_active_SliderTrack = n124
const n125 = t([[22, 138],[23, 139],[24, 137],[25, 137],[26, 141],[27, 142],[29, 141],[28, 140]])

export const dark_gray_surface2 = n125
export const dark_gray_Checkbox = n125
export const dark_gray_Switch = n125
export const dark_gray_TooltipContent = n125
export const dark_gray_RadioGroupItem = n125
const n126 = t([[22, 141],[23, 141],[24, 140],[25, 140],[26, 141],[27, 141],[29, 140],[28, 140]])

export const dark_gray_surface4 = n126
export const dark_gray_active_SelectTrigger = n126
export const dark_gray_active_Card = n126
export const dark_gray_active_Button = n126
export const dark_gray_active_Checkbox = n126
export const dark_gray_active_Switch = n126
export const dark_gray_active_TooltipContent = n126
export const dark_gray_active_RadioGroupItem = n126
export const dark_gray_active_Input = n126
export const dark_gray_active_TextArea = n126
const n127 = t([[30, 7],[31, 6],[32, 8],[33, 8],[22, 16],[23, 15],[24, 16],[25, 15],[26, 14],[27, 13],[29, 12],[28, 11]])

export const light_SwitchThumb = n127
export const light_SliderThumb = n127
export const light_Tooltip = n127
export const light_ProgressIndicator = n127
const n128 = t([[22, 315]])

export const light_SheetOverlay = n128
export const light_DialogOverlay = n128
export const light_ModalOverlay = n128
export const light_orange_SheetOverlay = n128
export const light_orange_DialogOverlay = n128
export const light_orange_ModalOverlay = n128
export const light_yellow_SheetOverlay = n128
export const light_yellow_DialogOverlay = n128
export const light_yellow_ModalOverlay = n128
export const light_green_SheetOverlay = n128
export const light_green_DialogOverlay = n128
export const light_green_ModalOverlay = n128
export const light_blue_SheetOverlay = n128
export const light_blue_DialogOverlay = n128
export const light_blue_ModalOverlay = n128
export const light_purple_SheetOverlay = n128
export const light_purple_DialogOverlay = n128
export const light_purple_ModalOverlay = n128
export const light_pink_SheetOverlay = n128
export const light_pink_DialogOverlay = n128
export const light_pink_ModalOverlay = n128
export const light_red_SheetOverlay = n128
export const light_red_DialogOverlay = n128
export const light_red_ModalOverlay = n128
export const light_gray_SheetOverlay = n128
export const light_gray_DialogOverlay = n128
export const light_gray_ModalOverlay = n128
export const light_active_SheetOverlay = n128
export const light_active_DialogOverlay = n128
export const light_active_ModalOverlay = n128
export const light_orange_active_SheetOverlay = n128
export const light_orange_active_DialogOverlay = n128
export const light_orange_active_ModalOverlay = n128
export const light_yellow_active_SheetOverlay = n128
export const light_yellow_active_DialogOverlay = n128
export const light_yellow_active_ModalOverlay = n128
export const light_green_active_SheetOverlay = n128
export const light_green_active_DialogOverlay = n128
export const light_green_active_ModalOverlay = n128
export const light_blue_active_SheetOverlay = n128
export const light_blue_active_DialogOverlay = n128
export const light_blue_active_ModalOverlay = n128
export const light_purple_active_SheetOverlay = n128
export const light_purple_active_DialogOverlay = n128
export const light_purple_active_ModalOverlay = n128
export const light_pink_active_SheetOverlay = n128
export const light_pink_active_DialogOverlay = n128
export const light_pink_active_ModalOverlay = n128
export const light_red_active_SheetOverlay = n128
export const light_red_active_DialogOverlay = n128
export const light_red_active_ModalOverlay = n128
export const light_gray_active_SheetOverlay = n128
export const light_gray_active_DialogOverlay = n128
export const light_gray_active_ModalOverlay = n128
const n129 = t([[30, 117],[31, 118],[32, 116],[33, 116],[22, 6],[23, 125],[24, 6],[25, 125],[26, 124],[27, 123],[29, 122],[28, 121]])

export const dark_SwitchThumb = n129
export const dark_SliderThumb = n129
export const dark_Tooltip = n129
export const dark_ProgressIndicator = n129
const n130 = t([[22, 316]])

export const dark_SheetOverlay = n130
export const dark_DialogOverlay = n130
export const dark_ModalOverlay = n130
export const dark_orange_SheetOverlay = n130
export const dark_orange_DialogOverlay = n130
export const dark_orange_ModalOverlay = n130
export const dark_yellow_SheetOverlay = n130
export const dark_yellow_DialogOverlay = n130
export const dark_yellow_ModalOverlay = n130
export const dark_green_SheetOverlay = n130
export const dark_green_DialogOverlay = n130
export const dark_green_ModalOverlay = n130
export const dark_blue_SheetOverlay = n130
export const dark_blue_DialogOverlay = n130
export const dark_blue_ModalOverlay = n130
export const dark_purple_SheetOverlay = n130
export const dark_purple_DialogOverlay = n130
export const dark_purple_ModalOverlay = n130
export const dark_pink_SheetOverlay = n130
export const dark_pink_DialogOverlay = n130
export const dark_pink_ModalOverlay = n130
export const dark_red_SheetOverlay = n130
export const dark_red_DialogOverlay = n130
export const dark_red_ModalOverlay = n130
export const dark_gray_SheetOverlay = n130
export const dark_gray_DialogOverlay = n130
export const dark_gray_ModalOverlay = n130
export const dark_active_SheetOverlay = n130
export const dark_active_DialogOverlay = n130
export const dark_active_ModalOverlay = n130
export const dark_orange_active_SheetOverlay = n130
export const dark_orange_active_DialogOverlay = n130
export const dark_orange_active_ModalOverlay = n130
export const dark_yellow_active_SheetOverlay = n130
export const dark_yellow_active_DialogOverlay = n130
export const dark_yellow_active_ModalOverlay = n130
export const dark_green_active_SheetOverlay = n130
export const dark_green_active_DialogOverlay = n130
export const dark_green_active_ModalOverlay = n130
export const dark_blue_active_SheetOverlay = n130
export const dark_blue_active_DialogOverlay = n130
export const dark_blue_active_ModalOverlay = n130
export const dark_purple_active_SheetOverlay = n130
export const dark_purple_active_DialogOverlay = n130
export const dark_purple_active_ModalOverlay = n130
export const dark_pink_active_SheetOverlay = n130
export const dark_pink_active_DialogOverlay = n130
export const dark_pink_active_ModalOverlay = n130
export const dark_red_active_SheetOverlay = n130
export const dark_red_active_DialogOverlay = n130
export const dark_red_active_ModalOverlay = n130
export const dark_gray_active_SheetOverlay = n130
export const dark_gray_active_DialogOverlay = n130
export const dark_gray_active_ModalOverlay = n130
const n131 = t([[30, 55],[31, 54],[32, 56],[33, 56],[22, 65],[23, 64],[24, 65],[25, 64],[26, 63],[27, 62],[29, 61],[28, 60]])

export const light_orange_SwitchThumb = n131
export const light_orange_SliderThumb = n131
export const light_orange_Tooltip = n131
export const light_orange_ProgressIndicator = n131
const n132 = t([[30, 103],[31, 102],[32, 104],[33, 104],[22, 113],[23, 112],[24, 113],[25, 112],[26, 111],[27, 110],[29, 109],[28, 108]])

export const light_yellow_SwitchThumb = n132
export const light_yellow_SliderThumb = n132
export const light_yellow_Tooltip = n132
export const light_yellow_ProgressIndicator = n132
const n133 = t([[30, 43],[31, 42],[32, 44],[33, 44],[22, 53],[23, 52],[24, 53],[25, 52],[26, 51],[27, 50],[29, 49],[28, 48]])

export const light_green_SwitchThumb = n133
export const light_green_SliderThumb = n133
export const light_green_Tooltip = n133
export const light_green_ProgressIndicator = n133
const n134 = t([[30, 22],[31, 21],[32, 23],[33, 23],[22, 31],[23, 30],[24, 31],[25, 30],[26, 29],[27, 28],[29, 27],[28, 26]])

export const light_blue_SwitchThumb = n134
export const light_blue_SliderThumb = n134
export const light_blue_Tooltip = n134
export const light_blue_ProgressIndicator = n134
const n135 = t([[30, 79],[31, 78],[32, 80],[33, 80],[22, 89],[23, 88],[24, 89],[25, 88],[26, 87],[27, 86],[29, 85],[28, 84]])

export const light_purple_SwitchThumb = n135
export const light_purple_SliderThumb = n135
export const light_purple_Tooltip = n135
export const light_purple_ProgressIndicator = n135
const n136 = t([[30, 67],[31, 66],[32, 68],[33, 68],[22, 77],[23, 76],[24, 77],[25, 76],[26, 75],[27, 74],[29, 73],[28, 72]])

export const light_pink_SwitchThumb = n136
export const light_pink_SliderThumb = n136
export const light_pink_Tooltip = n136
export const light_pink_ProgressIndicator = n136
const n137 = t([[30, 91],[31, 90],[32, 92],[33, 92],[22, 101],[23, 100],[24, 101],[25, 100],[26, 99],[27, 98],[29, 97],[28, 96]])

export const light_red_SwitchThumb = n137
export const light_red_SliderThumb = n137
export const light_red_Tooltip = n137
export const light_red_ProgressIndicator = n137
const n138 = t([[30, 33],[31, 32],[32, 34],[33, 34],[22, 16],[23, 41],[24, 16],[25, 41],[26, 40],[27, 13],[29, 39],[28, 38]])

export const light_gray_SwitchThumb = n138
export const light_gray_SliderThumb = n138
export const light_gray_Tooltip = n138
export const light_gray_ProgressIndicator = n138
const n139 = t([[30, 159],[31, 160],[32, 158],[33, 158],[22, 168],[23, 167],[24, 168],[25, 167],[26, 166],[27, 62],[29, 165],[28, 164]])

export const dark_orange_SwitchThumb = n139
export const dark_orange_SliderThumb = n139
export const dark_orange_Tooltip = n139
export const dark_orange_ProgressIndicator = n139
const n140 = t([[30, 203],[31, 204],[32, 202],[33, 202],[22, 212],[23, 211],[24, 212],[25, 211],[26, 210],[27, 110],[29, 209],[28, 208]])

export const dark_yellow_SwitchThumb = n140
export const dark_yellow_SliderThumb = n140
export const dark_yellow_Tooltip = n140
export const dark_yellow_ProgressIndicator = n140
const n141 = t([[30, 148],[31, 149],[32, 147],[33, 147],[22, 157],[23, 156],[24, 157],[25, 156],[26, 155],[27, 50],[29, 154],[28, 153]])

export const dark_green_SwitchThumb = n141
export const dark_green_SliderThumb = n141
export const dark_green_Tooltip = n141
export const dark_green_ProgressIndicator = n141
const n142 = t([[30, 127],[31, 128],[32, 126],[33, 126],[22, 135],[23, 134],[24, 135],[25, 134],[26, 133],[27, 28],[29, 132],[28, 131]])

export const dark_blue_SwitchThumb = n142
export const dark_blue_SliderThumb = n142
export const dark_blue_Tooltip = n142
export const dark_blue_ProgressIndicator = n142
const n143 = t([[30, 181],[31, 182],[32, 180],[33, 180],[22, 190],[23, 189],[24, 190],[25, 189],[26, 188],[27, 86],[29, 187],[28, 186]])

export const dark_purple_SwitchThumb = n143
export const dark_purple_SliderThumb = n143
export const dark_purple_Tooltip = n143
export const dark_purple_ProgressIndicator = n143
const n144 = t([[30, 170],[31, 171],[32, 169],[33, 169],[22, 179],[23, 178],[24, 179],[25, 178],[26, 177],[27, 74],[29, 176],[28, 175]])

export const dark_pink_SwitchThumb = n144
export const dark_pink_SliderThumb = n144
export const dark_pink_Tooltip = n144
export const dark_pink_ProgressIndicator = n144
const n145 = t([[30, 192],[31, 193],[32, 191],[33, 191],[22, 201],[23, 200],[24, 201],[25, 200],[26, 199],[27, 98],[29, 198],[28, 197]])

export const dark_red_SwitchThumb = n145
export const dark_red_SliderThumb = n145
export const dark_red_Tooltip = n145
export const dark_red_ProgressIndicator = n145
const n146 = t([[30, 137],[31, 138],[32, 136],[33, 136],[22, 35],[23, 146],[24, 35],[25, 146],[26, 145],[27, 144],[29, 143],[28, 142]])

export const dark_gray_SwitchThumb = n146
export const dark_gray_SliderThumb = n146
export const dark_gray_Tooltip = n146
export const dark_gray_ProgressIndicator = n146
const n147 = t([[30, 7],[31, 6],[32, 8],[33, 8],[22, 14],[23, 13],[24, 14],[25, 13],[26, 12],[27, 11],[29, 10],[28, 9]])

export const light_active_SwitchThumb = n147
export const light_active_SliderThumb = n147
export const light_active_Tooltip = n147
export const light_active_ProgressIndicator = n147
const n148 = t([[30, 117],[31, 118],[32, 116],[33, 116],[22, 124],[23, 123],[24, 124],[25, 123],[26, 122],[27, 121],[29, 120],[28, 9]])

export const dark_active_SwitchThumb = n148
export const dark_active_SliderThumb = n148
export const dark_active_Tooltip = n148
export const dark_active_ProgressIndicator = n148
const n149 = t([[30, 55],[31, 54],[32, 56],[33, 56],[22, 63],[23, 62],[24, 63],[25, 62],[26, 61],[27, 60],[29, 59],[28, 58]])

export const light_orange_active_SwitchThumb = n149
export const light_orange_active_SliderThumb = n149
export const light_orange_active_Tooltip = n149
export const light_orange_active_ProgressIndicator = n149
const n150 = t([[30, 103],[31, 102],[32, 104],[33, 104],[22, 111],[23, 110],[24, 111],[25, 110],[26, 109],[27, 108],[29, 107],[28, 106]])

export const light_yellow_active_SwitchThumb = n150
export const light_yellow_active_SliderThumb = n150
export const light_yellow_active_Tooltip = n150
export const light_yellow_active_ProgressIndicator = n150
const n151 = t([[30, 43],[31, 42],[32, 44],[33, 44],[22, 51],[23, 50],[24, 51],[25, 50],[26, 49],[27, 48],[29, 47],[28, 46]])

export const light_green_active_SwitchThumb = n151
export const light_green_active_SliderThumb = n151
export const light_green_active_Tooltip = n151
export const light_green_active_ProgressIndicator = n151
const n152 = t([[30, 22],[31, 21],[32, 23],[33, 23],[22, 29],[23, 28],[24, 29],[25, 28],[26, 27],[27, 26],[29, 25],[28, 24]])

export const light_blue_active_SwitchThumb = n152
export const light_blue_active_SliderThumb = n152
export const light_blue_active_Tooltip = n152
export const light_blue_active_ProgressIndicator = n152
const n153 = t([[30, 79],[31, 78],[32, 80],[33, 80],[22, 87],[23, 86],[24, 87],[25, 86],[26, 85],[27, 84],[29, 83],[28, 82]])

export const light_purple_active_SwitchThumb = n153
export const light_purple_active_SliderThumb = n153
export const light_purple_active_Tooltip = n153
export const light_purple_active_ProgressIndicator = n153
const n154 = t([[30, 67],[31, 66],[32, 68],[33, 68],[22, 75],[23, 74],[24, 75],[25, 74],[26, 73],[27, 72],[29, 71],[28, 70]])

export const light_pink_active_SwitchThumb = n154
export const light_pink_active_SliderThumb = n154
export const light_pink_active_Tooltip = n154
export const light_pink_active_ProgressIndicator = n154
const n155 = t([[30, 91],[31, 90],[32, 92],[33, 92],[22, 99],[23, 98],[24, 99],[25, 98],[26, 97],[27, 96],[29, 95],[28, 94]])

export const light_red_active_SwitchThumb = n155
export const light_red_active_SliderThumb = n155
export const light_red_active_Tooltip = n155
export const light_red_active_ProgressIndicator = n155
const n156 = t([[30, 33],[31, 32],[32, 34],[33, 34],[22, 40],[23, 13],[24, 40],[25, 13],[26, 39],[27, 38],[29, 37],[28, 36]])

export const light_gray_active_SwitchThumb = n156
export const light_gray_active_SliderThumb = n156
export const light_gray_active_Tooltip = n156
export const light_gray_active_ProgressIndicator = n156
const n157 = t([[30, 159],[31, 160],[32, 158],[33, 158],[22, 166],[23, 62],[24, 166],[25, 62],[26, 165],[27, 164],[29, 163],[28, 162]])

export const dark_orange_active_SwitchThumb = n157
export const dark_orange_active_SliderThumb = n157
export const dark_orange_active_Tooltip = n157
export const dark_orange_active_ProgressIndicator = n157
const n158 = t([[30, 203],[31, 204],[32, 202],[33, 202],[22, 210],[23, 110],[24, 210],[25, 110],[26, 209],[27, 208],[29, 207],[28, 206]])

export const dark_yellow_active_SwitchThumb = n158
export const dark_yellow_active_SliderThumb = n158
export const dark_yellow_active_Tooltip = n158
export const dark_yellow_active_ProgressIndicator = n158
const n159 = t([[30, 148],[31, 149],[32, 147],[33, 147],[22, 155],[23, 50],[24, 155],[25, 50],[26, 154],[27, 153],[29, 152],[28, 151]])

export const dark_green_active_SwitchThumb = n159
export const dark_green_active_SliderThumb = n159
export const dark_green_active_Tooltip = n159
export const dark_green_active_ProgressIndicator = n159
const n160 = t([[30, 127],[31, 128],[32, 126],[33, 126],[22, 133],[23, 28],[24, 133],[25, 28],[26, 132],[27, 131],[29, 130],[28, 129]])

export const dark_blue_active_SwitchThumb = n160
export const dark_blue_active_SliderThumb = n160
export const dark_blue_active_Tooltip = n160
export const dark_blue_active_ProgressIndicator = n160
const n161 = t([[30, 181],[31, 182],[32, 180],[33, 180],[22, 188],[23, 86],[24, 188],[25, 86],[26, 187],[27, 186],[29, 185],[28, 184]])

export const dark_purple_active_SwitchThumb = n161
export const dark_purple_active_SliderThumb = n161
export const dark_purple_active_Tooltip = n161
export const dark_purple_active_ProgressIndicator = n161
const n162 = t([[30, 170],[31, 171],[32, 169],[33, 169],[22, 177],[23, 74],[24, 177],[25, 74],[26, 176],[27, 175],[29, 174],[28, 173]])

export const dark_pink_active_SwitchThumb = n162
export const dark_pink_active_SliderThumb = n162
export const dark_pink_active_Tooltip = n162
export const dark_pink_active_ProgressIndicator = n162
const n163 = t([[30, 192],[31, 193],[32, 191],[33, 191],[22, 199],[23, 98],[24, 199],[25, 98],[26, 198],[27, 197],[29, 196],[28, 195]])

export const dark_red_active_SwitchThumb = n163
export const dark_red_active_SliderThumb = n163
export const dark_red_active_Tooltip = n163
export const dark_red_active_ProgressIndicator = n163
const n164 = t([[30, 137],[31, 138],[32, 136],[33, 136],[22, 145],[23, 144],[24, 145],[25, 144],[26, 143],[27, 142],[29, 141],[28, 140]])

export const dark_gray_active_SwitchThumb = n164
export const dark_gray_active_SliderThumb = n164
export const dark_gray_active_Tooltip = n164
export const dark_gray_active_ProgressIndicator = n164