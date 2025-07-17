// @ts-nocheck
type Theme = {
  color: string;
  color0: string;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
  color6: string;
  color7: string;
  color8: string;
  color9: string;
  color05: string;
  color10: string;
  color11: string;
  color12: string;
  color025: string;
  color075: string;
  background: string;
  colorFocus: string;
  colorHover: string;
  colorPress: string;
  accentColor: string;
  background0: string;
  borderColor: string;
  background05: string;
  background025: string;
  background075: string;
  backgroundFocus: string;
  backgroundHover: string;
  backgroundPress: string;
  accentBackground: string;
  borderColorFocus: string;
  borderColorHover: string;
  borderColorPress: string;
  placeholderColor: string;

}

function t(a: [number, number][]) {
  let res: Record<string,string> = {}
  for (const [ki, vi] of a) {
    res[ks[ki] as string] = colors[vi] as string
  }
  return res as Theme
}
export const colors = [
  'hsla(100, 0%, 15%, 1)',
  'hsla(100, 0%, 10%, 1)',
  'hsla(100, 0%, 99%, 1)',
  'hsla(100, 0%, 93%, 1)',
  'hsla(100, 0%, 88%, 1)',
  'hsla(100, 0%, 82%, 1)',
  'hsla(100, 0%, 77%, 1)',
  'hsla(100, 0%, 72%, 1)',
  'hsla(100, 0%, 66%, 1)',
  'hsla(100, 0%, 61%, 1)',
  'hsla(100, 0%, 55%, 1)',
  'hsla(0, 0%, 10%, 0.5)',
  'hsla(100, 0%, 50%, 1)',
  'hsla(0, 0%, 10%, 0.75)',
  'hsla(0, 0%, 10%, 0.25)',
  'hsla(202, 76%, 0%, 1)',
  'hsla(0, 0%, 99%, 0.25)',
  'hsla(0, 0%, 99%, 0.75)',
  'hsla(0, 0%, 99%, 0.5)',
  'hsla(153, 71%, 20%, 1)',
  'hsla(100, 0%, 95%, 1)',
  'hsla(100, 0%, 14%, 1)',
  'hsla(100, 0%, 19%, 1)',
  'hsla(100, 0%, 23%, 1)',
  'hsla(100, 0%, 28%, 1)',
  'hsla(100, 0%, 32%, 1)',
  'hsla(100, 0%, 37%, 1)',
  'hsla(100, 0%, 41%, 1)',
  'hsla(100, 0%, 46%, 1)',
  'hsla(0, 0%, 95%, 0.5)',
  'hsla(0, 0%, 95%, 0.75)',
  'hsla(0, 0%, 95%, 0.25)',
  'hsla(48, 100%, 96%, 1)',
  'hsla(153, 71%, 54%, 1)',
  'hsla(0, 70%, 15%, 1)',
  'hsla(0, 70%, 10%, 1)',
  'hsla(0, 70%, 99%, 1)',
  'hsla(0, 70%, 93%, 1)',
  'hsla(0, 70%, 88%, 1)',
  'hsla(0, 70%, 82%, 1)',
  'hsla(0, 70%, 77%, 1)',
  'hsla(0, 70%, 72%, 1)',
  'hsla(0, 70%, 66%, 1)',
  'hsla(0, 70%, 61%, 1)',
  'hsla(0, 70%, 55%, 1)',
  'hsla(0, 69%, 10%, 0.5)',
  'hsla(0, 70%, 50%, 1)',
  'hsla(0, 69%, 10%, 0.75)',
  'hsla(0, 69%, 10%, 0.25)',
  'hsla(0, 60%, 99%, 0.25)',
  'hsla(0, 60%, 99%, 0.75)',
  'hsla(0, 60%, 99%, 0.5)',
  'hsla(48, 70%, 15%, 1)',
  'hsla(48, 70%, 10%, 1)',
  'hsla(48, 70%, 99%, 1)',
  'hsla(48, 70%, 93%, 1)',
  'hsla(48, 70%, 88%, 1)',
  'hsla(48, 70%, 82%, 1)',
  'hsla(48, 70%, 77%, 1)',
  'hsla(48, 70%, 72%, 1)',
  'hsla(48, 70%, 66%, 1)',
  'hsla(48, 70%, 61%, 1)',
  'hsla(48, 70%, 55%, 1)',
  'hsla(48, 69%, 10%, 0.5)',
  'hsla(48, 70%, 50%, 1)',
  'hsla(48, 69%, 10%, 0.75)',
  'hsla(48, 69%, 10%, 0.25)',
  'hsla(60, 60%, 99%, 0.25)',
  'hsla(60, 60%, 99%, 0.75)',
  'hsla(60, 60%, 99%, 0.5)',
  'hsla(153, 70%, 15%, 1)',
  'hsla(153, 70%, 10%, 1)',
  'hsla(153, 70%, 99%, 1)',
  'hsla(153, 70%, 93%, 1)',
  'hsla(153, 70%, 88%, 1)',
  'hsla(153, 70%, 82%, 1)',
  'hsla(153, 70%, 77%, 1)',
  'hsla(153, 70%, 72%, 1)',
  'hsla(153, 70%, 66%, 1)',
  'hsla(153, 70%, 61%, 1)',
  'hsla(153, 70%, 55%, 1)',
  'hsla(153, 69%, 10%, 0.5)',
  'hsla(153, 70%, 50%, 1)',
  'hsla(153, 69%, 10%, 0.75)',
  'hsla(153, 69%, 10%, 0.25)',
  'hsla(160, 60%, 99%, 0.25)',
  'hsla(160, 60%, 99%, 0.75)',
  'hsla(160, 60%, 99%, 0.5)',
  'hsla(0, 70%, 95%, 1)',
  'hsla(0, 70%, 14%, 1)',
  'hsla(0, 70%, 19%, 1)',
  'hsla(0, 70%, 23%, 1)',
  'hsla(0, 70%, 28%, 1)',
  'hsla(0, 70%, 32%, 1)',
  'hsla(0, 70%, 37%, 1)',
  'hsla(0, 70%, 41%, 1)',
  'hsla(0, 70%, 46%, 1)',
  'hsla(0, 69%, 95%, 0.5)',
  'hsla(0, 69%, 95%, 0.75)',
  'hsla(0, 69%, 95%, 0.25)',
  'hsla(48, 70%, 95%, 1)',
  'hsla(48, 70%, 14%, 1)',
  'hsla(48, 70%, 19%, 1)',
  'hsla(48, 70%, 23%, 1)',
  'hsla(48, 70%, 28%, 1)',
  'hsla(48, 70%, 32%, 1)',
  'hsla(48, 70%, 37%, 1)',
  'hsla(48, 70%, 41%, 1)',
  'hsla(48, 70%, 46%, 1)',
  'hsla(50, 69%, 95%, 0.5)',
  'hsla(50, 69%, 95%, 0.75)',
  'hsla(50, 69%, 95%, 0.25)',
  'hsla(153, 70%, 95%, 1)',
  'hsla(153, 70%, 14%, 1)',
  'hsla(153, 70%, 19%, 1)',
  'hsla(153, 70%, 23%, 1)',
  'hsla(153, 70%, 28%, 1)',
  'hsla(153, 70%, 32%, 1)',
  'hsla(153, 70%, 37%, 1)',
  'hsla(153, 70%, 41%, 1)',
  'hsla(153, 70%, 46%, 1)',
  'hsla(153, 69%, 95%, 0.5)',
  'hsla(153, 69%, 95%, 0.75)',
  'hsla(153, 69%, 95%, 0.25)',
  'hsla(202, 76%, 8%, 1)',
  'hsla(142, 70%, 49%, 1)',
  'hsla(142, 71%, 49%, 1)',
  'hsla(0, 0%, 0%, 0.5)',
  'hsla(148, 88%, 97%, 1)',
  'hsla(0, 0%, 0%, 0.75)',
  'hsla(0, 0%, 0%, 0.25)',
  'hsla(153, 71%, 20%, 0.25)',
  'hsla(153, 71%, 20%, 0.75)',
  'hsla(153, 71%, 20%, 0.5)',
  'hsla(153, 71%, 96%, 1)',
  'hsla(153, 71%, 85%, 1)',
  'hsla(153, 71%, 74%, 1)',
  'hsla(153, 71%, 53%, 1)',
  'hsla(153, 71%, 52%, 1)',
  'hsla(201, 76%, 8%, 0.5)',
  'hsla(153, 71%, 50%, 1)',
  'hsla(201, 76%, 8%, 0.75)',
  'hsla(201, 76%, 8%, 0.25)',
  'hsla(153, 71%, 54%, 0.25)',
  'hsla(153, 71%, 54%, 0.75)',
  'hsla(153, 71%, 54%, 0.5)',
  'rgba(0,0,0,0.5)',
  'rgba(0,0,0,0.9)',
  'hsla(0, 0%, 99%, 0)',
  'hsla(0, 0%, 10%, 0)',
  'hsla(0, 60%, 99%, 0)',
  'hsla(60, 60%, 99%, 0)',
  'hsla(160, 60%, 99%, 0)',
  'hsla(0, 69%, 10%, 0)',
  'hsla(48, 69%, 10%, 0)',
  'hsla(153, 69%, 10%, 0)',
  'hsla(153, 71%, 20%, 0)',
  'hsla(153, 71%, 54%, 0)',
]

const ks = [
'color',
'color0',
'color1',
'color2',
'color3',
'color4',
'color5',
'color6',
'color7',
'color8',
'color9',
'color05',
'color10',
'color11',
'color12',
'color025',
'color075',
'background',
'colorFocus',
'colorHover',
'colorPress',
'accentColor',
'background0',
'borderColor',
'background05',
'background025',
'background075',
'backgroundFocus',
'backgroundHover',
'backgroundPress',
'accentBackground',
'borderColorFocus',
'borderColorHover',
'borderColorPress',
'placeholderColor']


const n1 = t([[0, 0],[1, 1],[2, 2],[3, 3],[4, 4],[5, 5],[6, 6],[7, 7],[8, 8],[9, 9],[10, 10],[11, 11],[12, 12],[13, 0],[14, 1],[15, 13],[16, 14],[17, 2],[18, 12],[19, 12],[20, 0],[21, 15],[22, 16],[23, 5],[24, 17],[25, 18],[26, 2],[27, 5],[28, 3],[29, 4],[30, 19],[31, 7],[32, 6],[33, 6],[34, 12]])
const n2 = t([[0, 3],[1, 20],[2, 1],[3, 21],[4, 22],[5, 23],[6, 24],[7, 25],[8, 26],[9, 27],[10, 28],[11, 29],[12, 12],[13, 3],[14, 20],[15, 30],[16, 31],[17, 1],[18, 12],[19, 12],[20, 3],[21, 32],[22, 14],[23, 23],[24, 13],[25, 11],[26, 1],[27, 23],[28, 21],[29, 22],[30, 33],[31, 25],[32, 24],[33, 24],[34, 12]])
const n3 = t([[0, 34],[1, 35],[2, 36],[3, 37],[4, 38],[5, 39],[6, 40],[7, 41],[8, 42],[9, 43],[10, 44],[11, 45],[12, 46],[13, 34],[14, 35],[15, 47],[16, 48],[17, 36],[18, 46],[19, 46],[20, 34],[21, 15],[22, 49],[23, 39],[24, 50],[25, 51],[26, 36],[27, 39],[28, 37],[29, 38],[30, 19],[31, 41],[32, 40],[33, 40],[34, 46]])
const n4 = t([[0, 52],[1, 53],[2, 54],[3, 55],[4, 56],[5, 57],[6, 58],[7, 59],[8, 60],[9, 61],[10, 62],[11, 63],[12, 64],[13, 52],[14, 53],[15, 65],[16, 66],[17, 54],[18, 64],[19, 64],[20, 52],[21, 15],[22, 67],[23, 57],[24, 68],[25, 69],[26, 54],[27, 57],[28, 55],[29, 56],[30, 19],[31, 59],[32, 58],[33, 58],[34, 64]])
const n5 = t([[0, 70],[1, 71],[2, 72],[3, 73],[4, 74],[5, 75],[6, 76],[7, 77],[8, 78],[9, 79],[10, 80],[11, 81],[12, 82],[13, 70],[14, 71],[15, 83],[16, 84],[17, 72],[18, 82],[19, 82],[20, 70],[21, 15],[22, 85],[23, 75],[24, 86],[25, 87],[26, 72],[27, 75],[28, 73],[29, 74],[30, 19],[31, 77],[32, 76],[33, 76],[34, 82]])
const n6 = t([[0, 37],[1, 88],[2, 35],[3, 89],[4, 90],[5, 91],[6, 92],[7, 93],[8, 94],[9, 95],[10, 96],[11, 97],[12, 46],[13, 37],[14, 88],[15, 98],[16, 99],[17, 35],[18, 46],[19, 46],[20, 37],[21, 32],[22, 48],[23, 91],[24, 47],[25, 45],[26, 35],[27, 91],[28, 89],[29, 90],[30, 33],[31, 93],[32, 92],[33, 92],[34, 46]])
const n7 = t([[0, 55],[1, 100],[2, 53],[3, 101],[4, 102],[5, 103],[6, 104],[7, 105],[8, 106],[9, 107],[10, 108],[11, 109],[12, 64],[13, 55],[14, 100],[15, 110],[16, 111],[17, 53],[18, 64],[19, 64],[20, 55],[21, 32],[22, 66],[23, 103],[24, 65],[25, 63],[26, 53],[27, 103],[28, 101],[29, 102],[30, 33],[31, 105],[32, 104],[33, 104],[34, 64]])
const n8 = t([[0, 73],[1, 112],[2, 71],[3, 113],[4, 114],[5, 115],[6, 116],[7, 117],[8, 118],[9, 119],[10, 120],[11, 121],[12, 82],[13, 73],[14, 112],[15, 122],[16, 123],[17, 71],[18, 82],[19, 82],[20, 73],[21, 32],[22, 84],[23, 115],[24, 83],[25, 81],[26, 71],[27, 115],[28, 113],[29, 114],[30, 33],[31, 117],[32, 116],[33, 116],[34, 82]])
const n9 = t([[0, 124],[1, 15],[2, 19],[3, 32],[4, 19],[5, 125],[6, 19],[7, 126],[8, 126],[9, 126],[10, 19],[11, 127],[12, 128],[13, 124],[14, 15],[15, 129],[16, 130],[17, 19],[18, 128],[19, 128],[20, 124],[21, 15],[22, 131],[23, 125],[24, 132],[25, 133],[26, 19],[27, 125],[28, 32],[29, 19],[30, 19],[31, 126],[32, 19],[33, 19],[34, 128]])
const n10 = t([[0, 15],[1, 32],[2, 33],[3, 134],[4, 135],[5, 33],[6, 136],[7, 33],[8, 137],[9, 138],[10, 19],[11, 139],[12, 140],[13, 15],[14, 32],[15, 141],[16, 142],[17, 33],[18, 140],[19, 140],[20, 15],[21, 32],[22, 143],[23, 33],[24, 144],[25, 145],[26, 33],[27, 33],[28, 134],[29, 135],[30, 33],[31, 33],[32, 136],[33, 136],[34, 140]])
const n11 = t([[17, 146]])
const n12 = t([[17, 147]])
const n13 = t([[0, 124],[1, 15],[2, 19],[3, 32],[4, 19],[5, 125],[6, 19],[7, 126],[8, 126],[9, 126],[10, 19],[11, 127],[12, 128],[13, 124],[14, 15],[15, 129],[16, 130],[17, 125],[18, 128],[19, 128],[20, 124],[21, 15],[22, 131],[23, 126],[24, 132],[25, 133],[26, 19],[27, 126],[28, 19],[29, 126],[30, 19],[31, 19],[32, 126],[33, 126],[34, 128]])
const n14 = t([[0, 15],[1, 32],[2, 33],[3, 134],[4, 135],[5, 33],[6, 136],[7, 33],[8, 137],[9, 138],[10, 19],[11, 139],[12, 140],[13, 15],[14, 32],[15, 141],[16, 142],[17, 33],[18, 140],[19, 140],[20, 15],[21, 32],[22, 143],[23, 137],[24, 144],[25, 145],[26, 33],[27, 137],[28, 136],[29, 33],[30, 33],[31, 19],[32, 138],[33, 138],[34, 140]])
const n15 = t([[0, 0],[1, 0],[11, 13],[15, 1],[16, 11],[17, 3],[18, 12],[19, 12],[20, 0],[22, 18],[23, 6],[24, 2],[25, 17],[26, 3],[27, 6],[28, 4],[29, 5],[31, 8],[32, 7],[33, 7],[34, 10]])
const n16 = t([[0, 0],[1, 1],[11, 11],[15, 13],[16, 14],[17, 2],[18, 12],[19, 12],[20, 0],[21, 148],[22, 16],[23, 7],[24, 17],[25, 18],[26, 2],[27, 5],[28, 3],[29, 4],[30, 148],[31, 9],[32, 8],[33, 8],[34, 12]])
const n17 = t([[0, 0],[1, 12],[11, 1],[15, 0],[16, 13],[17, 4],[18, 12],[19, 12],[20, 0],[22, 17],[23, 7],[24, 3],[25, 2],[26, 4],[27, 7],[28, 5],[29, 6],[31, 9],[32, 8],[33, 8],[34, 9]])
const n18 = t([[0, 3],[1, 2],[11, 18],[15, 17],[16, 16],[17, 1],[18, 4],[19, 4],[20, 3],[21, 148],[22, 14],[23, 10],[24, 13],[25, 11],[26, 1],[27, 10],[28, 0],[29, 12],[30, 148],[31, 8],[32, 9],[33, 9],[34, 4]])
const n19 = t([[0, 3],[1, 4],[11, 2],[15, 3],[16, 17],[17, 12],[18, 4],[19, 4],[20, 3],[21, 148],[22, 13],[23, 8],[24, 0],[25, 1],[26, 12],[27, 8],[28, 10],[29, 9],[30, 148],[31, 6],[32, 7],[33, 7],[34, 6]])
const n20 = t([[0, 3],[1, 3],[11, 30],[15, 20],[16, 29],[17, 21],[18, 12],[19, 12],[20, 3],[22, 11],[23, 24],[24, 1],[25, 13],[26, 21],[27, 24],[28, 22],[29, 23],[31, 26],[32, 25],[33, 25],[34, 28]])
const n21 = t([[0, 3],[1, 20],[11, 29],[15, 30],[16, 31],[17, 1],[18, 12],[19, 12],[20, 3],[21, 149],[22, 14],[23, 25],[24, 13],[25, 11],[26, 1],[27, 23],[28, 21],[29, 22],[30, 149],[31, 27],[32, 26],[33, 26],[34, 12]])
const n22 = t([[0, 3],[1, 12],[11, 20],[15, 3],[16, 30],[17, 22],[18, 12],[19, 12],[20, 3],[22, 13],[23, 25],[24, 21],[25, 1],[26, 22],[27, 25],[28, 23],[29, 24],[31, 27],[32, 26],[33, 26],[34, 27]])
const n23 = t([[0, 21],[1, 1],[11, 11],[15, 13],[16, 14],[17, 20],[18, 22],[19, 22],[20, 21],[21, 149],[22, 31],[23, 28],[24, 30],[25, 29],[26, 20],[27, 28],[28, 3],[29, 12],[30, 149],[31, 26],[32, 27],[33, 27],[34, 22]])
const n24 = t([[0, 21],[1, 22],[11, 1],[15, 21],[16, 13],[17, 12],[18, 22],[19, 22],[20, 21],[21, 149],[22, 30],[23, 26],[24, 3],[25, 20],[26, 12],[27, 26],[28, 28],[29, 27],[30, 149],[31, 24],[32, 25],[33, 25],[34, 24]])
const n25 = t([[0, 34],[1, 34],[11, 47],[15, 35],[16, 45],[17, 37],[18, 46],[19, 46],[20, 34],[22, 51],[23, 40],[24, 36],[25, 50],[26, 37],[27, 40],[28, 38],[29, 39],[31, 42],[32, 41],[33, 41],[34, 44]])
const n26 = t([[0, 34],[1, 35],[11, 45],[15, 47],[16, 48],[17, 36],[18, 46],[19, 46],[20, 34],[21, 150],[22, 49],[23, 41],[24, 50],[25, 51],[26, 36],[27, 39],[28, 37],[29, 38],[30, 150],[31, 43],[32, 42],[33, 42],[34, 46]])
const n27 = t([[0, 34],[1, 46],[11, 35],[15, 34],[16, 47],[17, 38],[18, 46],[19, 46],[20, 34],[22, 50],[23, 41],[24, 37],[25, 36],[26, 38],[27, 41],[28, 39],[29, 40],[31, 43],[32, 42],[33, 42],[34, 43]])
const n28 = t([[0, 37],[1, 36],[11, 51],[15, 50],[16, 49],[17, 35],[18, 38],[19, 38],[20, 37],[21, 150],[22, 48],[23, 44],[24, 47],[25, 45],[26, 35],[27, 44],[28, 34],[29, 46],[30, 150],[31, 42],[32, 43],[33, 43],[34, 38]])
const n29 = t([[0, 37],[1, 38],[11, 36],[15, 37],[16, 50],[17, 46],[18, 38],[19, 38],[20, 37],[21, 150],[22, 47],[23, 42],[24, 34],[25, 35],[26, 46],[27, 42],[28, 44],[29, 43],[30, 150],[31, 40],[32, 41],[33, 41],[34, 40]])
const n30 = t([[0, 52],[1, 52],[11, 65],[15, 53],[16, 63],[17, 55],[18, 64],[19, 64],[20, 52],[22, 69],[23, 58],[24, 54],[25, 68],[26, 55],[27, 58],[28, 56],[29, 57],[31, 60],[32, 59],[33, 59],[34, 62]])
const n31 = t([[0, 52],[1, 53],[11, 63],[15, 65],[16, 66],[17, 54],[18, 64],[19, 64],[20, 52],[21, 151],[22, 67],[23, 59],[24, 68],[25, 69],[26, 54],[27, 57],[28, 55],[29, 56],[30, 151],[31, 61],[32, 60],[33, 60],[34, 64]])
const n32 = t([[0, 52],[1, 64],[11, 53],[15, 52],[16, 65],[17, 56],[18, 64],[19, 64],[20, 52],[22, 68],[23, 59],[24, 55],[25, 54],[26, 56],[27, 59],[28, 57],[29, 58],[31, 61],[32, 60],[33, 60],[34, 61]])
const n33 = t([[0, 55],[1, 54],[11, 69],[15, 68],[16, 67],[17, 53],[18, 56],[19, 56],[20, 55],[21, 151],[22, 66],[23, 62],[24, 65],[25, 63],[26, 53],[27, 62],[28, 52],[29, 64],[30, 151],[31, 60],[32, 61],[33, 61],[34, 56]])
const n34 = t([[0, 55],[1, 56],[11, 54],[15, 55],[16, 68],[17, 64],[18, 56],[19, 56],[20, 55],[21, 151],[22, 65],[23, 60],[24, 52],[25, 53],[26, 64],[27, 60],[28, 62],[29, 61],[30, 151],[31, 58],[32, 59],[33, 59],[34, 58]])
const n35 = t([[0, 70],[1, 70],[11, 83],[15, 71],[16, 81],[17, 73],[18, 82],[19, 82],[20, 70],[22, 87],[23, 76],[24, 72],[25, 86],[26, 73],[27, 76],[28, 74],[29, 75],[31, 78],[32, 77],[33, 77],[34, 80]])
const n36 = t([[0, 70],[1, 71],[11, 81],[15, 83],[16, 84],[17, 72],[18, 82],[19, 82],[20, 70],[21, 152],[22, 85],[23, 77],[24, 86],[25, 87],[26, 72],[27, 75],[28, 73],[29, 74],[30, 152],[31, 79],[32, 78],[33, 78],[34, 82]])
const n37 = t([[0, 70],[1, 82],[11, 71],[15, 70],[16, 83],[17, 74],[18, 82],[19, 82],[20, 70],[22, 86],[23, 77],[24, 73],[25, 72],[26, 74],[27, 77],[28, 75],[29, 76],[31, 79],[32, 78],[33, 78],[34, 79]])
const n38 = t([[0, 73],[1, 72],[11, 87],[15, 86],[16, 85],[17, 71],[18, 74],[19, 74],[20, 73],[21, 152],[22, 84],[23, 80],[24, 83],[25, 81],[26, 71],[27, 80],[28, 70],[29, 82],[30, 152],[31, 78],[32, 79],[33, 79],[34, 74]])
const n39 = t([[0, 73],[1, 74],[11, 72],[15, 73],[16, 86],[17, 82],[18, 74],[19, 74],[20, 73],[21, 152],[22, 83],[23, 78],[24, 70],[25, 71],[26, 82],[27, 78],[28, 80],[29, 79],[30, 152],[31, 76],[32, 77],[33, 77],[34, 76]])
const n40 = t([[0, 37],[1, 37],[11, 98],[15, 88],[16, 97],[17, 89],[18, 46],[19, 46],[20, 37],[22, 45],[23, 92],[24, 35],[25, 47],[26, 89],[27, 92],[28, 90],[29, 91],[31, 94],[32, 93],[33, 93],[34, 96]])
const n41 = t([[0, 37],[1, 88],[11, 97],[15, 98],[16, 99],[17, 35],[18, 46],[19, 46],[20, 37],[21, 153],[22, 48],[23, 93],[24, 47],[25, 45],[26, 35],[27, 91],[28, 89],[29, 90],[30, 153],[31, 95],[32, 94],[33, 94],[34, 46]])
const n42 = t([[0, 37],[1, 46],[11, 88],[15, 37],[16, 98],[17, 90],[18, 46],[19, 46],[20, 37],[22, 47],[23, 93],[24, 89],[25, 35],[26, 90],[27, 93],[28, 91],[29, 92],[31, 95],[32, 94],[33, 94],[34, 95]])
const n43 = t([[0, 89],[1, 35],[11, 45],[15, 47],[16, 48],[17, 88],[18, 90],[19, 90],[20, 89],[21, 153],[22, 99],[23, 96],[24, 98],[25, 97],[26, 88],[27, 96],[28, 37],[29, 46],[30, 153],[31, 94],[32, 95],[33, 95],[34, 90]])
const n44 = t([[0, 89],[1, 90],[11, 35],[15, 89],[16, 47],[17, 46],[18, 90],[19, 90],[20, 89],[21, 153],[22, 98],[23, 94],[24, 37],[25, 88],[26, 46],[27, 94],[28, 96],[29, 95],[30, 153],[31, 92],[32, 93],[33, 93],[34, 92]])
const n45 = t([[0, 55],[1, 55],[11, 110],[15, 100],[16, 109],[17, 101],[18, 64],[19, 64],[20, 55],[22, 63],[23, 104],[24, 53],[25, 65],[26, 101],[27, 104],[28, 102],[29, 103],[31, 106],[32, 105],[33, 105],[34, 108]])
const n46 = t([[0, 55],[1, 100],[11, 109],[15, 110],[16, 111],[17, 53],[18, 64],[19, 64],[20, 55],[21, 154],[22, 66],[23, 105],[24, 65],[25, 63],[26, 53],[27, 103],[28, 101],[29, 102],[30, 154],[31, 107],[32, 106],[33, 106],[34, 64]])
const n47 = t([[0, 55],[1, 64],[11, 100],[15, 55],[16, 110],[17, 102],[18, 64],[19, 64],[20, 55],[22, 65],[23, 105],[24, 101],[25, 53],[26, 102],[27, 105],[28, 103],[29, 104],[31, 107],[32, 106],[33, 106],[34, 107]])
const n48 = t([[0, 101],[1, 53],[11, 63],[15, 65],[16, 66],[17, 100],[18, 102],[19, 102],[20, 101],[21, 154],[22, 111],[23, 108],[24, 110],[25, 109],[26, 100],[27, 108],[28, 55],[29, 64],[30, 154],[31, 106],[32, 107],[33, 107],[34, 102]])
const n49 = t([[0, 101],[1, 102],[11, 53],[15, 101],[16, 65],[17, 64],[18, 102],[19, 102],[20, 101],[21, 154],[22, 110],[23, 106],[24, 55],[25, 100],[26, 64],[27, 106],[28, 108],[29, 107],[30, 154],[31, 104],[32, 105],[33, 105],[34, 104]])
const n50 = t([[0, 73],[1, 73],[11, 122],[15, 112],[16, 121],[17, 113],[18, 82],[19, 82],[20, 73],[22, 81],[23, 116],[24, 71],[25, 83],[26, 113],[27, 116],[28, 114],[29, 115],[31, 118],[32, 117],[33, 117],[34, 120]])
const n51 = t([[0, 73],[1, 112],[11, 121],[15, 122],[16, 123],[17, 71],[18, 82],[19, 82],[20, 73],[21, 155],[22, 84],[23, 117],[24, 83],[25, 81],[26, 71],[27, 115],[28, 113],[29, 114],[30, 155],[31, 119],[32, 118],[33, 118],[34, 82]])
const n52 = t([[0, 73],[1, 82],[11, 112],[15, 73],[16, 122],[17, 114],[18, 82],[19, 82],[20, 73],[22, 83],[23, 117],[24, 113],[25, 71],[26, 114],[27, 117],[28, 115],[29, 116],[31, 119],[32, 118],[33, 118],[34, 119]])
const n53 = t([[0, 113],[1, 71],[11, 81],[15, 83],[16, 84],[17, 112],[18, 114],[19, 114],[20, 113],[21, 155],[22, 123],[23, 120],[24, 122],[25, 121],[26, 112],[27, 120],[28, 73],[29, 82],[30, 155],[31, 118],[32, 119],[33, 119],[34, 114]])
const n54 = t([[0, 113],[1, 114],[11, 71],[15, 113],[16, 83],[17, 82],[18, 114],[19, 114],[20, 113],[21, 155],[22, 122],[23, 118],[24, 73],[25, 112],[26, 82],[27, 118],[28, 120],[29, 119],[30, 155],[31, 116],[32, 117],[33, 117],[34, 116]])
const n55 = t([[0, 124],[1, 124],[11, 129],[15, 15],[16, 127],[17, 32],[18, 128],[19, 128],[20, 124],[22, 133],[23, 19],[24, 19],[25, 132],[26, 32],[27, 19],[28, 19],[29, 125],[31, 126],[32, 126],[33, 126],[34, 19]])
const n56 = t([[0, 124],[1, 15],[11, 127],[15, 129],[16, 130],[17, 19],[18, 128],[19, 128],[20, 124],[21, 156],[22, 131],[23, 126],[24, 132],[25, 133],[26, 19],[27, 125],[28, 32],[29, 19],[30, 156],[31, 126],[32, 126],[33, 126],[34, 128]])
const n57 = t([[0, 32],[1, 19],[11, 133],[15, 132],[16, 131],[17, 15],[18, 19],[19, 19],[20, 32],[21, 156],[22, 130],[23, 19],[24, 129],[25, 127],[26, 15],[27, 19],[28, 124],[29, 128],[30, 156],[31, 126],[32, 126],[33, 126],[34, 19]])
const n58 = t([[0, 124],[1, 128],[11, 15],[15, 124],[16, 129],[17, 19],[18, 128],[19, 128],[20, 124],[22, 132],[23, 126],[24, 32],[25, 19],[26, 19],[27, 126],[28, 125],[29, 19],[31, 126],[32, 126],[33, 126],[34, 126]])
const n59 = t([[0, 32],[1, 19],[11, 19],[15, 32],[16, 132],[17, 128],[18, 19],[19, 19],[20, 32],[21, 156],[22, 129],[23, 126],[24, 124],[25, 15],[26, 128],[27, 126],[28, 19],[29, 126],[30, 156],[31, 19],[32, 126],[33, 126],[34, 19]])
const n60 = t([[0, 15],[1, 15],[11, 141],[15, 32],[16, 139],[17, 134],[18, 140],[19, 140],[20, 15],[22, 145],[23, 136],[24, 33],[25, 144],[26, 134],[27, 136],[28, 135],[29, 33],[31, 137],[32, 33],[33, 33],[34, 19]])
const n61 = t([[0, 15],[1, 32],[11, 139],[15, 141],[16, 142],[17, 33],[18, 140],[19, 140],[20, 15],[21, 157],[22, 143],[23, 33],[24, 144],[25, 145],[26, 33],[27, 33],[28, 134],[29, 135],[30, 157],[31, 138],[32, 137],[33, 137],[34, 140]])
const n62 = t([[0, 134],[1, 33],[11, 145],[15, 144],[16, 143],[17, 32],[18, 135],[19, 135],[20, 134],[21, 157],[22, 142],[23, 19],[24, 141],[25, 139],[26, 32],[27, 19],[28, 15],[29, 140],[30, 157],[31, 137],[32, 138],[33, 138],[34, 135]])
const n63 = t([[0, 15],[1, 140],[11, 32],[15, 15],[16, 141],[17, 135],[18, 140],[19, 140],[20, 15],[22, 144],[23, 33],[24, 134],[25, 33],[26, 135],[27, 33],[28, 33],[29, 136],[31, 138],[32, 137],[33, 137],[34, 138]])
const n64 = t([[0, 134],[1, 135],[11, 33],[15, 134],[16, 144],[17, 140],[18, 135],[19, 135],[20, 134],[21, 157],[22, 141],[23, 137],[24, 15],[25, 32],[26, 140],[27, 137],[28, 19],[29, 138],[30, 157],[31, 136],[32, 33],[33, 33],[34, 136]])

type ThemeNames =
 | 'light'
 | 'dark'
 | 'light_error'
 | 'light_warning'
 | 'light_success'
 | 'dark_error'
 | 'dark_warning'
 | 'dark_success'
 | 'light_accent'
 | 'light_error_accent'
 | 'light_warning_accent'
 | 'light_success_accent'
 | 'dark_accent'
 | 'dark_error_accent'
 | 'dark_warning_accent'
 | 'dark_success_accent'

export const themes: Record<ThemeNames, Theme> = {
  light: n1,
  dark: n2,
  light_error: n3,
  light_warning: n4,
  light_success: n5,
  dark_error: n6,
  dark_warning: n7,
  dark_success: n8,
  light_accent: n9,
  light_error_accent: n9,
  light_warning_accent: n9,
  light_success_accent: n9,
  dark_accent: n10,
  dark_error_accent: n10,
  dark_warning_accent: n10,
  dark_success_accent: n10,
  light_ModalOverlay: n11,
  light_SheetOverlay: n11,
  light_DialogOverlay: n11,
  light_error_ModalOverlay: n11,
  light_error_SheetOverlay: n11,
  light_error_DialogOverlay: n11,
  light_warning_ModalOverlay: n11,
  light_warning_SheetOverlay: n11,
  light_warning_DialogOverlay: n11,
  light_success_ModalOverlay: n11,
  light_success_SheetOverlay: n11,
  light_success_DialogOverlay: n11,
  light_accent_ModalOverlay: n11,
  light_accent_SheetOverlay: n11,
  light_accent_DialogOverlay: n11,
  light_error_accent_ModalOverlay: n11,
  light_error_accent_SheetOverlay: n11,
  light_error_accent_DialogOverlay: n11,
  light_warning_accent_ModalOverlay: n11,
  light_warning_accent_SheetOverlay: n11,
  light_warning_accent_DialogOverlay: n11,
  light_success_accent_ModalOverlay: n11,
  light_success_accent_SheetOverlay: n11,
  light_success_accent_DialogOverlay: n11,
  dark_ModalOverlay: n12,
  dark_SheetOverlay: n12,
  dark_DialogOverlay: n12,
  dark_error_ModalOverlay: n12,
  dark_error_SheetOverlay: n12,
  dark_error_DialogOverlay: n12,
  dark_warning_ModalOverlay: n12,
  dark_warning_SheetOverlay: n12,
  dark_warning_DialogOverlay: n12,
  dark_success_ModalOverlay: n12,
  dark_success_SheetOverlay: n12,
  dark_success_DialogOverlay: n12,
  dark_accent_ModalOverlay: n12,
  dark_accent_SheetOverlay: n12,
  dark_accent_DialogOverlay: n12,
  dark_error_accent_ModalOverlay: n12,
  dark_error_accent_SheetOverlay: n12,
  dark_error_accent_DialogOverlay: n12,
  dark_warning_accent_ModalOverlay: n12,
  dark_warning_accent_SheetOverlay: n12,
  dark_warning_accent_DialogOverlay: n12,
  dark_success_accent_ModalOverlay: n12,
  dark_success_accent_SheetOverlay: n12,
  dark_success_accent_DialogOverlay: n12,
  light_accent_Button: n13,
  light_accent_Switch: n13,
  dark_accent_Button: n14,
  dark_accent_Switch: n14,
  light_Card: n15,
  light_Progress: n15,
  light_DrawerFrame: n15,
  light_TooltipArrow: n15,
  light_Input: n16,
  light_Checkbox: n16,
  light_TextArea: n16,
  light_RadioGroupItem: n16,
  light_Button: n17,
  light_Switch: n17,
  light_SliderTrack: n17,
  light_TooltipContent: n17,
  light_Tooltip: n18,
  light_SliderThumb: n18,
  light_SwitchThumb: n18,
  light_ProgressIndicator: n18,
  light_SliderTrackActive: n19,
  dark_Card: n20,
  dark_Progress: n20,
  dark_DrawerFrame: n20,
  dark_TooltipArrow: n20,
  dark_Input: n21,
  dark_Checkbox: n21,
  dark_TextArea: n21,
  dark_RadioGroupItem: n21,
  dark_Button: n22,
  dark_Switch: n22,
  dark_SliderTrack: n22,
  dark_TooltipContent: n22,
  dark_Tooltip: n23,
  dark_SliderThumb: n23,
  dark_SwitchThumb: n23,
  dark_ProgressIndicator: n23,
  dark_SliderTrackActive: n24,
  light_error_Card: n25,
  light_error_Progress: n25,
  light_error_DrawerFrame: n25,
  light_error_TooltipArrow: n25,
  light_error_Input: n26,
  light_error_Checkbox: n26,
  light_error_TextArea: n26,
  light_error_RadioGroupItem: n26,
  light_error_Button: n27,
  light_error_Switch: n27,
  light_error_SliderTrack: n27,
  light_error_TooltipContent: n27,
  light_error_Tooltip: n28,
  light_error_SliderThumb: n28,
  light_error_SwitchThumb: n28,
  light_error_ProgressIndicator: n28,
  light_error_SliderTrackActive: n29,
  light_warning_Card: n30,
  light_warning_Progress: n30,
  light_warning_DrawerFrame: n30,
  light_warning_TooltipArrow: n30,
  light_warning_Input: n31,
  light_warning_Checkbox: n31,
  light_warning_TextArea: n31,
  light_warning_RadioGroupItem: n31,
  light_warning_Button: n32,
  light_warning_Switch: n32,
  light_warning_SliderTrack: n32,
  light_warning_TooltipContent: n32,
  light_warning_Tooltip: n33,
  light_warning_SliderThumb: n33,
  light_warning_SwitchThumb: n33,
  light_warning_ProgressIndicator: n33,
  light_warning_SliderTrackActive: n34,
  light_success_Card: n35,
  light_success_Progress: n35,
  light_success_DrawerFrame: n35,
  light_success_TooltipArrow: n35,
  light_success_Input: n36,
  light_success_Checkbox: n36,
  light_success_TextArea: n36,
  light_success_RadioGroupItem: n36,
  light_success_Button: n37,
  light_success_Switch: n37,
  light_success_SliderTrack: n37,
  light_success_TooltipContent: n37,
  light_success_Tooltip: n38,
  light_success_SliderThumb: n38,
  light_success_SwitchThumb: n38,
  light_success_ProgressIndicator: n38,
  light_success_SliderTrackActive: n39,
  dark_error_Card: n40,
  dark_error_Progress: n40,
  dark_error_DrawerFrame: n40,
  dark_error_TooltipArrow: n40,
  dark_error_Input: n41,
  dark_error_Checkbox: n41,
  dark_error_TextArea: n41,
  dark_error_RadioGroupItem: n41,
  dark_error_Button: n42,
  dark_error_Switch: n42,
  dark_error_SliderTrack: n42,
  dark_error_TooltipContent: n42,
  dark_error_Tooltip: n43,
  dark_error_SliderThumb: n43,
  dark_error_SwitchThumb: n43,
  dark_error_ProgressIndicator: n43,
  dark_error_SliderTrackActive: n44,
  dark_warning_Card: n45,
  dark_warning_Progress: n45,
  dark_warning_DrawerFrame: n45,
  dark_warning_TooltipArrow: n45,
  dark_warning_Input: n46,
  dark_warning_Checkbox: n46,
  dark_warning_TextArea: n46,
  dark_warning_RadioGroupItem: n46,
  dark_warning_Button: n47,
  dark_warning_Switch: n47,
  dark_warning_SliderTrack: n47,
  dark_warning_TooltipContent: n47,
  dark_warning_Tooltip: n48,
  dark_warning_SliderThumb: n48,
  dark_warning_SwitchThumb: n48,
  dark_warning_ProgressIndicator: n48,
  dark_warning_SliderTrackActive: n49,
  dark_success_Card: n50,
  dark_success_Progress: n50,
  dark_success_DrawerFrame: n50,
  dark_success_TooltipArrow: n50,
  dark_success_Input: n51,
  dark_success_Checkbox: n51,
  dark_success_TextArea: n51,
  dark_success_RadioGroupItem: n51,
  dark_success_Button: n52,
  dark_success_Switch: n52,
  dark_success_SliderTrack: n52,
  dark_success_TooltipContent: n52,
  dark_success_Tooltip: n53,
  dark_success_SliderThumb: n53,
  dark_success_SwitchThumb: n53,
  dark_success_ProgressIndicator: n53,
  dark_success_SliderTrackActive: n54,
  light_accent_Card: n55,
  light_accent_Progress: n55,
  light_accent_DrawerFrame: n55,
  light_accent_TooltipArrow: n55,
  light_error_accent_Card: n55,
  light_error_accent_Progress: n55,
  light_error_accent_DrawerFrame: n55,
  light_error_accent_TooltipArrow: n55,
  light_warning_accent_Card: n55,
  light_warning_accent_Progress: n55,
  light_warning_accent_DrawerFrame: n55,
  light_warning_accent_TooltipArrow: n55,
  light_success_accent_Card: n55,
  light_success_accent_Progress: n55,
  light_success_accent_DrawerFrame: n55,
  light_success_accent_TooltipArrow: n55,
  light_accent_Input: n56,
  light_accent_Checkbox: n56,
  light_accent_TextArea: n56,
  light_accent_RadioGroupItem: n56,
  light_error_accent_Input: n56,
  light_error_accent_Checkbox: n56,
  light_error_accent_TextArea: n56,
  light_error_accent_RadioGroupItem: n56,
  light_warning_accent_Input: n56,
  light_warning_accent_Checkbox: n56,
  light_warning_accent_TextArea: n56,
  light_warning_accent_RadioGroupItem: n56,
  light_success_accent_Input: n56,
  light_success_accent_Checkbox: n56,
  light_success_accent_TextArea: n56,
  light_success_accent_RadioGroupItem: n56,
  light_accent_Tooltip: n57,
  light_accent_SliderThumb: n57,
  light_accent_SwitchThumb: n57,
  light_accent_ProgressIndicator: n57,
  light_error_accent_Tooltip: n57,
  light_error_accent_SliderThumb: n57,
  light_error_accent_SwitchThumb: n57,
  light_error_accent_ProgressIndicator: n57,
  light_warning_accent_Tooltip: n57,
  light_warning_accent_SliderThumb: n57,
  light_warning_accent_SwitchThumb: n57,
  light_warning_accent_ProgressIndicator: n57,
  light_success_accent_Tooltip: n57,
  light_success_accent_SliderThumb: n57,
  light_success_accent_SwitchThumb: n57,
  light_success_accent_ProgressIndicator: n57,
  light_accent_SliderTrack: n58,
  light_accent_TooltipContent: n58,
  light_error_accent_Button: n58,
  light_error_accent_Switch: n58,
  light_error_accent_SliderTrack: n58,
  light_error_accent_TooltipContent: n58,
  light_warning_accent_Button: n58,
  light_warning_accent_Switch: n58,
  light_warning_accent_SliderTrack: n58,
  light_warning_accent_TooltipContent: n58,
  light_success_accent_Button: n58,
  light_success_accent_Switch: n58,
  light_success_accent_SliderTrack: n58,
  light_success_accent_TooltipContent: n58,
  light_accent_SliderTrackActive: n59,
  light_error_accent_SliderTrackActive: n59,
  light_warning_accent_SliderTrackActive: n59,
  light_success_accent_SliderTrackActive: n59,
  dark_accent_Card: n60,
  dark_accent_Progress: n60,
  dark_accent_DrawerFrame: n60,
  dark_accent_TooltipArrow: n60,
  dark_error_accent_Card: n60,
  dark_error_accent_Progress: n60,
  dark_error_accent_DrawerFrame: n60,
  dark_error_accent_TooltipArrow: n60,
  dark_warning_accent_Card: n60,
  dark_warning_accent_Progress: n60,
  dark_warning_accent_DrawerFrame: n60,
  dark_warning_accent_TooltipArrow: n60,
  dark_success_accent_Card: n60,
  dark_success_accent_Progress: n60,
  dark_success_accent_DrawerFrame: n60,
  dark_success_accent_TooltipArrow: n60,
  dark_accent_Input: n61,
  dark_accent_Checkbox: n61,
  dark_accent_TextArea: n61,
  dark_accent_RadioGroupItem: n61,
  dark_error_accent_Input: n61,
  dark_error_accent_Checkbox: n61,
  dark_error_accent_TextArea: n61,
  dark_error_accent_RadioGroupItem: n61,
  dark_warning_accent_Input: n61,
  dark_warning_accent_Checkbox: n61,
  dark_warning_accent_TextArea: n61,
  dark_warning_accent_RadioGroupItem: n61,
  dark_success_accent_Input: n61,
  dark_success_accent_Checkbox: n61,
  dark_success_accent_TextArea: n61,
  dark_success_accent_RadioGroupItem: n61,
  dark_accent_Tooltip: n62,
  dark_accent_SliderThumb: n62,
  dark_accent_SwitchThumb: n62,
  dark_accent_ProgressIndicator: n62,
  dark_error_accent_Tooltip: n62,
  dark_error_accent_SliderThumb: n62,
  dark_error_accent_SwitchThumb: n62,
  dark_error_accent_ProgressIndicator: n62,
  dark_warning_accent_Tooltip: n62,
  dark_warning_accent_SliderThumb: n62,
  dark_warning_accent_SwitchThumb: n62,
  dark_warning_accent_ProgressIndicator: n62,
  dark_success_accent_Tooltip: n62,
  dark_success_accent_SliderThumb: n62,
  dark_success_accent_SwitchThumb: n62,
  dark_success_accent_ProgressIndicator: n62,
  dark_accent_SliderTrack: n63,
  dark_accent_TooltipContent: n63,
  dark_error_accent_Button: n63,
  dark_error_accent_Switch: n63,
  dark_error_accent_SliderTrack: n63,
  dark_error_accent_TooltipContent: n63,
  dark_warning_accent_Button: n63,
  dark_warning_accent_Switch: n63,
  dark_warning_accent_SliderTrack: n63,
  dark_warning_accent_TooltipContent: n63,
  dark_success_accent_Button: n63,
  dark_success_accent_Switch: n63,
  dark_success_accent_SliderTrack: n63,
  dark_success_accent_TooltipContent: n63,
  dark_accent_SliderTrackActive: n64,
  dark_error_accent_SliderTrackActive: n64,
  dark_warning_accent_SliderTrackActive: n64,
  dark_success_accent_SliderTrackActive: n64,
}
