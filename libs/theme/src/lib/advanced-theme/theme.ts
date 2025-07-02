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
    res[ks[ki] as string] = vs[vi] as string
  }
  return res as Theme
}
const vs = [
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
  'hsla(153, 70%, 99%, 1)',
  'hsla(153, 70%, 93%, 1)',
  'hsla(153, 70%, 88%, 1)',
  'hsla(153, 70%, 82%, 1)',
  'hsla(153, 70%, 77%, 1)',
  'hsla(153, 70%, 72%, 1)',
  'hsla(153, 70%, 66%, 1)',
  'hsla(153, 70%, 61%, 1)',
  'hsla(153, 70%, 55%, 1)',
  'hsla(153, 71%, 20%, 0.5)',
  'hsla(153, 70%, 10%, 1)',
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
  'hsla(142, 70%, 49%, 1)',
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
  'hsla(153, 70%, 95%, 1)',
  'hsla(153, 70%, 14%, 1)',
  'hsla(153, 70%, 19%, 1)',
  'hsla(153, 70%, 23%, 1)',
  'hsla(153, 70%, 28%, 1)',
  'hsla(153, 70%, 32%, 1)',
  'hsla(153, 70%, 37%, 1)',
  'hsla(153, 70%, 41%, 1)',
  'hsla(153, 70%, 46%, 1)',
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
  'hsla(148, 88%, 97%, 1)',
  // 'hsla(47, 99%, 74%, 1)',
  // 'hsla(47, 99%, 55%, 1)',
  // 'hsla(0, 0%, 0%, 0.5)',
  // 'hsla(0, 0%, 0%, 0.75)',
  // 'hsla(0, 0%, 0%, 0.25)',
  // 'hsla(47, 99%, 54%, 0.25)',
  // 'hsla(47, 99%, 54%, 0.75)',
  // 'hsla(47, 99%, 54%, 0.5)',
  // 'hsla(47, 98%, 74%, 1)',
  // 'hsla(47, 99%, 53%, 1)',
  // 'hsla(47, 99%, 52%, 1)',
  // 'hsla(47, 99%, 51%, 1)',
  // 'hsla(201, 76%, 8%, 0.5)',
  'hsla(47, 99%, 50%, 1)',
  'hsla(201, 76%, 8%, 0.75)',
  'hsla(201, 76%, 8%, 0.25)',
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
  'hsla(47, 99%, 54%, 0)',
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

export const light = n1
const n2 = t([[0, 3],[1, 20],[2, 1],[3, 21],[4, 22],[5, 23],[6, 24],[7, 25],[8, 26],[9, 27],[10, 28],[11, 29],[12, 12],[13, 3],[14, 20],[15, 30],[16, 31],[17, 1],[18, 12],[19, 12],[20, 3],[21, 32],[22, 14],[23, 23],[24, 13],[25, 11],[26, 1],[27, 23],[28, 21],[29, 22],[30, 19],[31, 25],[32, 24],[33, 24],[34, 12]])

export const dark = n2
const n3 = t([[0, 33],[1, 34],[2, 35],[3, 36],[4, 37],[5, 38],[6, 39],[7, 40],[8, 41],[9, 42],[10, 43],[11, 44],[12, 45],[13, 33],[14, 34],[15, 46],[16, 47],[17, 35],[18, 45],[19, 45],[20, 33],[21, 15],[22, 48],[23, 38],[24, 49],[25, 50],[26, 35],[27, 38],[28, 36],[29, 37],[30, 19],[31, 40],[32, 39],[33, 39],[34, 45]])

export const light_error = n3
const n4 = t([[0, 51],[1, 52],[2, 53],[3, 54],[4, 55],[5, 56],[6, 57],[7, 58],[8, 59],[9, 60],[10, 61],[11, 62],[12, 63],[13, 51],[14, 52],[15, 64],[16, 65],[17, 53],[18, 63],[19, 63],[20, 51],[21, 15],[22, 66],[23, 56],[24, 67],[25, 68],[26, 53],[27, 56],[28, 54],[29, 55],[30, 19],[31, 58],[32, 57],[33, 57],[34, 63]])

export const light_warning = n4
const n5 = t([[0, 69],[1, 70],[2, 71],[3, 72],[4, 73],[5, 74],[6, 75],[7, 76],[8, 77],[9, 78],[10, 79],[11, 80],[12, 81],[13, 69],[14, 70],[15, 82],[16, 83],[17, 71],[18, 81],[19, 81],[20, 69],[21, 15],[22, 84],[23, 74],[24, 85],[25, 86],[26, 71],[27, 74],[28, 72],[29, 73],[30, 19],[31, 76],[32, 75],[33, 75],[34, 81]])

export const light_success = n5
const n6 = t([[0, 36],[1, 87],[2, 34],[3, 88],[4, 89],[5, 90],[6, 91],[7, 92],[8, 93],[9, 94],[10, 95],[11, 96],[12, 45],[13, 36],[14, 87],[15, 97],[16, 98],[17, 34],[18, 45],[19, 45],[20, 36],[21, 32],[22, 47],[23, 90],[24, 46],[25, 44],[26, 34],[27, 90],[28, 88],[29, 89],[30, 19],[31, 92],[32, 91],[33, 91],[34, 45]])

export const dark_error = n6
const n7 = t([[0, 54],[1, 99],[2, 52],[3, 100],[4, 101],[5, 102],[6, 103],[7, 104],[8, 105],[9, 106],[10, 107],[11, 108],[12, 63],[13, 54],[14, 99],[15, 109],[16, 110],[17, 52],[18, 63],[19, 63],[20, 54],[21, 32],[22, 65],[23, 102],[24, 64],[25, 62],[26, 52],[27, 102],[28, 100],[29, 101],[30, 19],[31, 104],[32, 103],[33, 103],[34, 63]])

export const dark_warning = n7
const n8 = t([[0, 72],[1, 111],[2, 70],[3, 112],[4, 113],[5, 114],[6, 115],[7, 116],[8, 117],[9, 118],[10, 119],[11, 120],[12, 81],[13, 72],[14, 111],[15, 121],[16, 122],[17, 70],[18, 81],[19, 81],[20, 72],[21, 32],[22, 83],[23, 114],[24, 82],[25, 80],[26, 70],[27, 114],[28, 112],[29, 113],[30, 19],[31, 116],[32, 115],[33, 115],[34, 81]])

export const dark_success = n8
const n9 = t([[0, 123],[1, 15],[2, 19],[3, 32],[4, 124],[5, 19],[6, 125],[7, 19],[8, 19],[9, 126],[10, 126],[11, 127],[12, 126],[13, 123],[14, 15],[15, 128],[16, 129],[17, 19],[18, 126],[19, 126],[20, 123],[21, 15],[22, 130],[23, 19],[24, 131],[25, 132],[26, 19],[27, 19],[28, 32],[29, 124],[30, 19],[31, 19],[32, 125],[33, 125],[34, 126]])

export const light_accent = n9
export const light_error_accent = n9
export const light_warning_accent = n9
export const light_success_accent = n9
const n10 = t([[0, 15],[1, 32],[2, 19],[3, 32],[4, 124],[5, 19],[6, 133],[7, 19],[8, 134],[9, 135],[10, 136],[11, 137],[12, 138],[13, 15],[14, 32],[15, 139],[16, 140],[17, 19],[18, 138],[19, 138],[20, 15],[21, 32],[22, 130],[23, 19],[24, 131],[25, 132],[26, 19],[27, 19],[28, 32],[29, 124],[30, 19],[31, 19],[32, 133],[33, 133],[34, 138]])

export const dark_accent = n10
export const dark_error_accent = n10
export const dark_warning_accent = n10
export const dark_success_accent = n10
const n11 = t([[17, 141]])

export const light_ModalOverlay = n11
export const light_SheetOverlay = n11
export const light_DialogOverlay = n11
export const light_error_ModalOverlay = n11
export const light_error_SheetOverlay = n11
export const light_error_DialogOverlay = n11
export const light_warning_ModalOverlay = n11
export const light_warning_SheetOverlay = n11
export const light_warning_DialogOverlay = n11
export const light_success_ModalOverlay = n11
export const light_success_SheetOverlay = n11
export const light_success_DialogOverlay = n11
export const light_accent_ModalOverlay = n11
export const light_accent_SheetOverlay = n11
export const light_accent_DialogOverlay = n11
export const light_error_accent_ModalOverlay = n11
export const light_error_accent_SheetOverlay = n11
export const light_error_accent_DialogOverlay = n11
export const light_warning_accent_ModalOverlay = n11
export const light_warning_accent_SheetOverlay = n11
export const light_warning_accent_DialogOverlay = n11
export const light_success_accent_ModalOverlay = n11
export const light_success_accent_SheetOverlay = n11
export const light_success_accent_DialogOverlay = n11
const n12 = t([[17, 142]])

export const dark_ModalOverlay = n12
export const dark_SheetOverlay = n12
export const dark_DialogOverlay = n12
export const dark_error_ModalOverlay = n12
export const dark_error_SheetOverlay = n12
export const dark_error_DialogOverlay = n12
export const dark_warning_ModalOverlay = n12
export const dark_warning_SheetOverlay = n12
export const dark_warning_DialogOverlay = n12
export const dark_success_ModalOverlay = n12
export const dark_success_SheetOverlay = n12
export const dark_success_DialogOverlay = n12
export const dark_accent_ModalOverlay = n12
export const dark_accent_SheetOverlay = n12
export const dark_accent_DialogOverlay = n12
export const dark_error_accent_ModalOverlay = n12
export const dark_error_accent_SheetOverlay = n12
export const dark_error_accent_DialogOverlay = n12
export const dark_warning_accent_ModalOverlay = n12
export const dark_warning_accent_SheetOverlay = n12
export const dark_warning_accent_DialogOverlay = n12
export const dark_success_accent_ModalOverlay = n12
export const dark_success_accent_SheetOverlay = n12
export const dark_success_accent_DialogOverlay = n12
const n13 = t([[0, 123],[1, 15],[2, 19],[3, 32],[4, 124],[5, 19],[6, 125],[7, 19],[8, 19],[9, 126],[10, 126],[11, 127],[12, 126],[13, 123],[14, 15],[15, 128],[16, 129],[17, 19],[18, 126],[19, 126],[20, 123],[21, 15],[22, 130],[23, 19],[24, 131],[25, 132],[26, 19],[27, 19],[28, 125],[29, 19],[30, 19],[31, 126],[32, 126],[33, 126],[34, 126]])

export const light_accent_Button = n13
export const light_accent_Switch = n13
const n14 = t([[0, 15],[1, 32],[2, 19],[3, 32],[4, 124],[5, 19],[6, 133],[7, 19],[8, 134],[9, 135],[10, 136],[11, 137],[12, 138],[13, 15],[14, 32],[15, 139],[16, 140],[17, 19],[18, 138],[19, 138],[20, 15],[21, 32],[22, 130],[23, 134],[24, 131],[25, 132],[26, 19],[27, 134],[28, 133],[29, 19],[30, 19],[31, 136],[32, 135],[33, 135],[34, 138]])

export const dark_accent_Button = n14
export const dark_accent_Switch = n14
const n15 = t([[0, 0],[1, 0],[11, 13],[15, 1],[16, 11],[17, 3],[18, 12],[19, 12],[20, 0],[22, 18],[23, 6],[24, 2],[25, 17],[26, 3],[27, 6],[28, 4],[29, 5],[31, 8],[32, 7],[33, 7],[34, 10]])

export const light_Card = n15
export const light_Progress = n15
export const light_DrawerFrame = n15
export const light_TooltipArrow = n15
const n16 = t([[0, 0],[1, 1],[11, 11],[15, 13],[16, 14],[17, 2],[18, 12],[19, 12],[20, 0],[21, 143],[22, 16],[23, 7],[24, 17],[25, 18],[26, 2],[27, 5],[28, 3],[29, 4],[30, 143],[31, 9],[32, 8],[33, 8],[34, 12]])

export const light_Input = n16
export const light_Checkbox = n16
export const light_TextArea = n16
export const light_RadioGroupItem = n16
const n17 = t([[0, 0],[1, 12],[11, 1],[15, 0],[16, 13],[17, 4],[18, 12],[19, 12],[20, 0],[22, 17],[23, 7],[24, 3],[25, 2],[26, 4],[27, 7],[28, 5],[29, 6],[31, 9],[32, 8],[33, 8],[34, 9]])

export const light_Button = n17
export const light_Switch = n17
export const light_SliderTrack = n17
export const light_TooltipContent = n17
const n18 = t([[0, 3],[1, 2],[11, 18],[15, 17],[16, 16],[17, 1],[18, 4],[19, 4],[20, 3],[21, 143],[22, 14],[23, 10],[24, 13],[25, 11],[26, 1],[27, 10],[28, 0],[29, 12],[30, 143],[31, 8],[32, 9],[33, 9],[34, 4]])

export const light_Tooltip = n18
export const light_SliderThumb = n18
export const light_SwitchThumb = n18
export const light_ProgressIndicator = n18
const n19 = t([[0, 3],[1, 4],[11, 2],[15, 3],[16, 17],[17, 12],[18, 4],[19, 4],[20, 3],[21, 143],[22, 13],[23, 8],[24, 0],[25, 1],[26, 12],[27, 8],[28, 10],[29, 9],[30, 143],[31, 6],[32, 7],[33, 7],[34, 6]])

export const light_SliderTrackActive = n19
const n20 = t([[0, 3],[1, 3],[11, 30],[15, 20],[16, 29],[17, 21],[18, 12],[19, 12],[20, 3],[22, 11],[23, 24],[24, 1],[25, 13],[26, 21],[27, 24],[28, 22],[29, 23],[31, 26],[32, 25],[33, 25],[34, 28]])

export const dark_Card = n20
export const dark_Progress = n20
export const dark_DrawerFrame = n20
export const dark_TooltipArrow = n20
const n21 = t([[0, 3],[1, 20],[11, 29],[15, 30],[16, 31],[17, 1],[18, 12],[19, 12],[20, 3],[21, 144],[22, 14],[23, 25],[24, 13],[25, 11],[26, 1],[27, 23],[28, 21],[29, 22],[30, 144],[31, 27],[32, 26],[33, 26],[34, 12]])

export const dark_Input = n21
export const dark_Checkbox = n21
export const dark_TextArea = n21
export const dark_RadioGroupItem = n21
const n22 = t([[0, 3],[1, 12],[11, 20],[15, 3],[16, 30],[17, 22],[18, 12],[19, 12],[20, 3],[22, 13],[23, 25],[24, 21],[25, 1],[26, 22],[27, 25],[28, 23],[29, 24],[31, 27],[32, 26],[33, 26],[34, 27]])

export const dark_Button = n22
export const dark_Switch = n22
export const dark_SliderTrack = n22
export const dark_TooltipContent = n22
const n23 = t([[0, 21],[1, 1],[11, 11],[15, 13],[16, 14],[17, 20],[18, 22],[19, 22],[20, 21],[21, 144],[22, 31],[23, 28],[24, 30],[25, 29],[26, 20],[27, 28],[28, 3],[29, 12],[30, 144],[31, 26],[32, 27],[33, 27],[34, 22]])

export const dark_Tooltip = n23
export const dark_SliderThumb = n23
export const dark_SwitchThumb = n23
export const dark_ProgressIndicator = n23
const n24 = t([[0, 21],[1, 22],[11, 1],[15, 21],[16, 13],[17, 12],[18, 22],[19, 22],[20, 21],[21, 144],[22, 30],[23, 26],[24, 3],[25, 20],[26, 12],[27, 26],[28, 28],[29, 27],[30, 144],[31, 24],[32, 25],[33, 25],[34, 24]])

export const dark_SliderTrackActive = n24
const n25 = t([[0, 33],[1, 33],[11, 46],[15, 34],[16, 44],[17, 36],[18, 45],[19, 45],[20, 33],[22, 50],[23, 39],[24, 35],[25, 49],[26, 36],[27, 39],[28, 37],[29, 38],[31, 41],[32, 40],[33, 40],[34, 43]])

export const light_error_Card = n25
export const light_error_Progress = n25
export const light_error_DrawerFrame = n25
export const light_error_TooltipArrow = n25
const n26 = t([[0, 33],[1, 34],[11, 44],[15, 46],[16, 47],[17, 35],[18, 45],[19, 45],[20, 33],[21, 145],[22, 48],[23, 40],[24, 49],[25, 50],[26, 35],[27, 38],[28, 36],[29, 37],[30, 145],[31, 42],[32, 41],[33, 41],[34, 45]])

export const light_error_Input = n26
export const light_error_Checkbox = n26
export const light_error_TextArea = n26
export const light_error_RadioGroupItem = n26
const n27 = t([[0, 33],[1, 45],[11, 34],[15, 33],[16, 46],[17, 37],[18, 45],[19, 45],[20, 33],[22, 49],[23, 40],[24, 36],[25, 35],[26, 37],[27, 40],[28, 38],[29, 39],[31, 42],[32, 41],[33, 41],[34, 42]])

export const light_error_Button = n27
export const light_error_Switch = n27
export const light_error_SliderTrack = n27
export const light_error_TooltipContent = n27
const n28 = t([[0, 36],[1, 35],[11, 50],[15, 49],[16, 48],[17, 34],[18, 37],[19, 37],[20, 36],[21, 145],[22, 47],[23, 43],[24, 46],[25, 44],[26, 34],[27, 43],[28, 33],[29, 45],[30, 145],[31, 41],[32, 42],[33, 42],[34, 37]])

export const light_error_Tooltip = n28
export const light_error_SliderThumb = n28
export const light_error_SwitchThumb = n28
export const light_error_ProgressIndicator = n28
const n29 = t([[0, 36],[1, 37],[11, 35],[15, 36],[16, 49],[17, 45],[18, 37],[19, 37],[20, 36],[21, 145],[22, 46],[23, 41],[24, 33],[25, 34],[26, 45],[27, 41],[28, 43],[29, 42],[30, 145],[31, 39],[32, 40],[33, 40],[34, 39]])

export const light_error_SliderTrackActive = n29
const n30 = t([[0, 51],[1, 51],[11, 64],[15, 52],[16, 62],[17, 54],[18, 63],[19, 63],[20, 51],[22, 68],[23, 57],[24, 53],[25, 67],[26, 54],[27, 57],[28, 55],[29, 56],[31, 59],[32, 58],[33, 58],[34, 61]])

export const light_warning_Card = n30
export const light_warning_Progress = n30
export const light_warning_DrawerFrame = n30
export const light_warning_TooltipArrow = n30
const n31 = t([[0, 51],[1, 52],[11, 62],[15, 64],[16, 65],[17, 53],[18, 63],[19, 63],[20, 51],[21, 146],[22, 66],[23, 58],[24, 67],[25, 68],[26, 53],[27, 56],[28, 54],[29, 55],[30, 146],[31, 60],[32, 59],[33, 59],[34, 63]])

export const light_warning_Input = n31
export const light_warning_Checkbox = n31
export const light_warning_TextArea = n31
export const light_warning_RadioGroupItem = n31
const n32 = t([[0, 51],[1, 63],[11, 52],[15, 51],[16, 64],[17, 55],[18, 63],[19, 63],[20, 51],[22, 67],[23, 58],[24, 54],[25, 53],[26, 55],[27, 58],[28, 56],[29, 57],[31, 60],[32, 59],[33, 59],[34, 60]])

export const light_warning_Button = n32
export const light_warning_Switch = n32
export const light_warning_SliderTrack = n32
export const light_warning_TooltipContent = n32
const n33 = t([[0, 54],[1, 53],[11, 68],[15, 67],[16, 66],[17, 52],[18, 55],[19, 55],[20, 54],[21, 146],[22, 65],[23, 61],[24, 64],[25, 62],[26, 52],[27, 61],[28, 51],[29, 63],[30, 146],[31, 59],[32, 60],[33, 60],[34, 55]])

export const light_warning_Tooltip = n33
export const light_warning_SliderThumb = n33
export const light_warning_SwitchThumb = n33
export const light_warning_ProgressIndicator = n33
const n34 = t([[0, 54],[1, 55],[11, 53],[15, 54],[16, 67],[17, 63],[18, 55],[19, 55],[20, 54],[21, 146],[22, 64],[23, 59],[24, 51],[25, 52],[26, 63],[27, 59],[28, 61],[29, 60],[30, 146],[31, 57],[32, 58],[33, 58],[34, 57]])

export const light_warning_SliderTrackActive = n34
const n35 = t([[0, 69],[1, 69],[11, 82],[15, 70],[16, 80],[17, 72],[18, 81],[19, 81],[20, 69],[22, 86],[23, 75],[24, 71],[25, 85],[26, 72],[27, 75],[28, 73],[29, 74],[31, 77],[32, 76],[33, 76],[34, 79]])

export const light_success_Card = n35
export const light_success_Progress = n35
export const light_success_DrawerFrame = n35
export const light_success_TooltipArrow = n35
const n36 = t([[0, 69],[1, 70],[11, 80],[15, 82],[16, 83],[17, 71],[18, 81],[19, 81],[20, 69],[21, 147],[22, 84],[23, 76],[24, 85],[25, 86],[26, 71],[27, 74],[28, 72],[29, 73],[30, 147],[31, 78],[32, 77],[33, 77],[34, 81]])

export const light_success_Input = n36
export const light_success_Checkbox = n36
export const light_success_TextArea = n36
export const light_success_RadioGroupItem = n36
const n37 = t([[0, 69],[1, 81],[11, 70],[15, 69],[16, 82],[17, 73],[18, 81],[19, 81],[20, 69],[22, 85],[23, 76],[24, 72],[25, 71],[26, 73],[27, 76],[28, 74],[29, 75],[31, 78],[32, 77],[33, 77],[34, 78]])

export const light_success_Button = n37
export const light_success_Switch = n37
export const light_success_SliderTrack = n37
export const light_success_TooltipContent = n37
const n38 = t([[0, 72],[1, 71],[11, 86],[15, 85],[16, 84],[17, 70],[18, 73],[19, 73],[20, 72],[21, 147],[22, 83],[23, 79],[24, 82],[25, 80],[26, 70],[27, 79],[28, 69],[29, 81],[30, 147],[31, 77],[32, 78],[33, 78],[34, 73]])

export const light_success_Tooltip = n38
export const light_success_SliderThumb = n38
export const light_success_SwitchThumb = n38
export const light_success_ProgressIndicator = n38
const n39 = t([[0, 72],[1, 73],[11, 71],[15, 72],[16, 85],[17, 81],[18, 73],[19, 73],[20, 72],[21, 147],[22, 82],[23, 77],[24, 69],[25, 70],[26, 81],[27, 77],[28, 79],[29, 78],[30, 147],[31, 75],[32, 76],[33, 76],[34, 75]])

export const light_success_SliderTrackActive = n39
const n40 = t([[0, 36],[1, 36],[11, 97],[15, 87],[16, 96],[17, 88],[18, 45],[19, 45],[20, 36],[22, 44],[23, 91],[24, 34],[25, 46],[26, 88],[27, 91],[28, 89],[29, 90],[31, 93],[32, 92],[33, 92],[34, 95]])

export const dark_error_Card = n40
export const dark_error_Progress = n40
export const dark_error_DrawerFrame = n40
export const dark_error_TooltipArrow = n40
const n41 = t([[0, 36],[1, 87],[11, 96],[15, 97],[16, 98],[17, 34],[18, 45],[19, 45],[20, 36],[21, 148],[22, 47],[23, 92],[24, 46],[25, 44],[26, 34],[27, 90],[28, 88],[29, 89],[30, 148],[31, 94],[32, 93],[33, 93],[34, 45]])

export const dark_error_Input = n41
export const dark_error_Checkbox = n41
export const dark_error_TextArea = n41
export const dark_error_RadioGroupItem = n41
const n42 = t([[0, 36],[1, 45],[11, 87],[15, 36],[16, 97],[17, 89],[18, 45],[19, 45],[20, 36],[22, 46],[23, 92],[24, 88],[25, 34],[26, 89],[27, 92],[28, 90],[29, 91],[31, 94],[32, 93],[33, 93],[34, 94]])

export const dark_error_Button = n42
export const dark_error_Switch = n42
export const dark_error_SliderTrack = n42
export const dark_error_TooltipContent = n42
const n43 = t([[0, 88],[1, 34],[11, 44],[15, 46],[16, 47],[17, 87],[18, 89],[19, 89],[20, 88],[21, 148],[22, 98],[23, 95],[24, 97],[25, 96],[26, 87],[27, 95],[28, 36],[29, 45],[30, 148],[31, 93],[32, 94],[33, 94],[34, 89]])

export const dark_error_Tooltip = n43
export const dark_error_SliderThumb = n43
export const dark_error_SwitchThumb = n43
export const dark_error_ProgressIndicator = n43
const n44 = t([[0, 88],[1, 89],[11, 34],[15, 88],[16, 46],[17, 45],[18, 89],[19, 89],[20, 88],[21, 148],[22, 97],[23, 93],[24, 36],[25, 87],[26, 45],[27, 93],[28, 95],[29, 94],[30, 148],[31, 91],[32, 92],[33, 92],[34, 91]])

export const dark_error_SliderTrackActive = n44
const n45 = t([[0, 54],[1, 54],[11, 109],[15, 99],[16, 108],[17, 100],[18, 63],[19, 63],[20, 54],[22, 62],[23, 103],[24, 52],[25, 64],[26, 100],[27, 103],[28, 101],[29, 102],[31, 105],[32, 104],[33, 104],[34, 107]])

export const dark_warning_Card = n45
export const dark_warning_Progress = n45
export const dark_warning_DrawerFrame = n45
export const dark_warning_TooltipArrow = n45
const n46 = t([[0, 54],[1, 99],[11, 108],[15, 109],[16, 110],[17, 52],[18, 63],[19, 63],[20, 54],[21, 149],[22, 65],[23, 104],[24, 64],[25, 62],[26, 52],[27, 102],[28, 100],[29, 101],[30, 149],[31, 106],[32, 105],[33, 105],[34, 63]])

export const dark_warning_Input = n46
export const dark_warning_Checkbox = n46
export const dark_warning_TextArea = n46
export const dark_warning_RadioGroupItem = n46
const n47 = t([[0, 54],[1, 63],[11, 99],[15, 54],[16, 109],[17, 101],[18, 63],[19, 63],[20, 54],[22, 64],[23, 104],[24, 100],[25, 52],[26, 101],[27, 104],[28, 102],[29, 103],[31, 106],[32, 105],[33, 105],[34, 106]])

export const dark_warning_Button = n47
export const dark_warning_Switch = n47
export const dark_warning_SliderTrack = n47
export const dark_warning_TooltipContent = n47
const n48 = t([[0, 100],[1, 52],[11, 62],[15, 64],[16, 65],[17, 99],[18, 101],[19, 101],[20, 100],[21, 149],[22, 110],[23, 107],[24, 109],[25, 108],[26, 99],[27, 107],[28, 54],[29, 63],[30, 149],[31, 105],[32, 106],[33, 106],[34, 101]])

export const dark_warning_Tooltip = n48
export const dark_warning_SliderThumb = n48
export const dark_warning_SwitchThumb = n48
export const dark_warning_ProgressIndicator = n48
const n49 = t([[0, 100],[1, 101],[11, 52],[15, 100],[16, 64],[17, 63],[18, 101],[19, 101],[20, 100],[21, 149],[22, 109],[23, 105],[24, 54],[25, 99],[26, 63],[27, 105],[28, 107],[29, 106],[30, 149],[31, 103],[32, 104],[33, 104],[34, 103]])

export const dark_warning_SliderTrackActive = n49
const n50 = t([[0, 72],[1, 72],[11, 121],[15, 111],[16, 120],[17, 112],[18, 81],[19, 81],[20, 72],[22, 80],[23, 115],[24, 70],[25, 82],[26, 112],[27, 115],[28, 113],[29, 114],[31, 117],[32, 116],[33, 116],[34, 119]])

export const dark_success_Card = n50
export const dark_success_Progress = n50
export const dark_success_DrawerFrame = n50
export const dark_success_TooltipArrow = n50
const n51 = t([[0, 72],[1, 111],[11, 120],[15, 121],[16, 122],[17, 70],[18, 81],[19, 81],[20, 72],[21, 150],[22, 83],[23, 116],[24, 82],[25, 80],[26, 70],[27, 114],[28, 112],[29, 113],[30, 150],[31, 118],[32, 117],[33, 117],[34, 81]])

export const dark_success_Input = n51
export const dark_success_Checkbox = n51
export const dark_success_TextArea = n51
export const dark_success_RadioGroupItem = n51
const n52 = t([[0, 72],[1, 81],[11, 111],[15, 72],[16, 121],[17, 113],[18, 81],[19, 81],[20, 72],[22, 82],[23, 116],[24, 112],[25, 70],[26, 113],[27, 116],[28, 114],[29, 115],[31, 118],[32, 117],[33, 117],[34, 118]])

export const dark_success_Button = n52
export const dark_success_Switch = n52
export const dark_success_SliderTrack = n52
export const dark_success_TooltipContent = n52
const n53 = t([[0, 112],[1, 70],[11, 80],[15, 82],[16, 83],[17, 111],[18, 113],[19, 113],[20, 112],[21, 150],[22, 122],[23, 119],[24, 121],[25, 120],[26, 111],[27, 119],[28, 72],[29, 81],[30, 150],[31, 117],[32, 118],[33, 118],[34, 113]])

export const dark_success_Tooltip = n53
export const dark_success_SliderThumb = n53
export const dark_success_SwitchThumb = n53
export const dark_success_ProgressIndicator = n53
const n54 = t([[0, 112],[1, 113],[11, 70],[15, 112],[16, 82],[17, 81],[18, 113],[19, 113],[20, 112],[21, 150],[22, 121],[23, 117],[24, 72],[25, 111],[26, 81],[27, 117],[28, 119],[29, 118],[30, 150],[31, 115],[32, 116],[33, 116],[34, 115]])

export const dark_success_SliderTrackActive = n54
const n55 = t([[0, 123],[1, 123],[11, 128],[15, 15],[16, 127],[17, 32],[18, 126],[19, 126],[20, 123],[22, 132],[23, 125],[24, 19],[25, 131],[26, 32],[27, 125],[28, 124],[29, 19],[31, 19],[32, 19],[33, 19],[34, 126]])

export const light_accent_Card = n55
export const light_accent_Progress = n55
export const light_accent_DrawerFrame = n55
export const light_accent_TooltipArrow = n55
export const light_error_accent_Card = n55
export const light_error_accent_Progress = n55
export const light_error_accent_DrawerFrame = n55
export const light_error_accent_TooltipArrow = n55
export const light_warning_accent_Card = n55
export const light_warning_accent_Progress = n55
export const light_warning_accent_DrawerFrame = n55
export const light_warning_accent_TooltipArrow = n55
export const light_success_accent_Card = n55
export const light_success_accent_Progress = n55
export const light_success_accent_DrawerFrame = n55
export const light_success_accent_TooltipArrow = n55
const n56 = t([[0, 123],[1, 15],[11, 127],[15, 128],[16, 129],[17, 19],[18, 126],[19, 126],[20, 123],[21, 151],[22, 130],[23, 19],[24, 131],[25, 132],[26, 19],[27, 19],[28, 32],[29, 124],[30, 151],[31, 126],[32, 19],[33, 19],[34, 126]])

export const light_accent_Input = n56
export const light_accent_Checkbox = n56
export const light_accent_TextArea = n56
export const light_accent_RadioGroupItem = n56
export const light_error_accent_Input = n56
export const light_error_accent_Checkbox = n56
export const light_error_accent_TextArea = n56
export const light_error_accent_RadioGroupItem = n56
export const light_warning_accent_Input = n56
export const light_warning_accent_Checkbox = n56
export const light_warning_accent_TextArea = n56
export const light_warning_accent_RadioGroupItem = n56
export const light_success_accent_Input = n56
export const light_success_accent_Checkbox = n56
export const light_success_accent_TextArea = n56
export const light_success_accent_RadioGroupItem = n56
const n57 = t([[0, 32],[1, 19],[11, 132],[15, 131],[16, 130],[17, 15],[18, 124],[19, 124],[20, 32],[21, 151],[22, 129],[23, 126],[24, 128],[25, 127],[26, 15],[27, 126],[28, 123],[29, 126],[30, 151],[31, 19],[32, 126],[33, 126],[34, 124]])

export const light_accent_Tooltip = n57
export const light_accent_SliderThumb = n57
export const light_accent_SwitchThumb = n57
export const light_accent_ProgressIndicator = n57
export const light_error_accent_Tooltip = n57
export const light_error_accent_SliderThumb = n57
export const light_error_accent_SwitchThumb = n57
export const light_error_accent_ProgressIndicator = n57
export const light_warning_accent_Tooltip = n57
export const light_warning_accent_SliderThumb = n57
export const light_warning_accent_SwitchThumb = n57
export const light_warning_accent_ProgressIndicator = n57
export const light_success_accent_Tooltip = n57
export const light_success_accent_SliderThumb = n57
export const light_success_accent_SwitchThumb = n57
export const light_success_accent_ProgressIndicator = n57
const n58 = t([[0, 123],[1, 126],[11, 15],[15, 123],[16, 128],[17, 124],[18, 126],[19, 126],[20, 123],[22, 131],[23, 19],[24, 32],[25, 19],[26, 124],[27, 19],[28, 19],[29, 125],[31, 126],[32, 19],[33, 19],[34, 126]])

export const light_accent_SliderTrack = n58
export const light_accent_TooltipContent = n58
export const light_error_accent_Button = n58
export const light_error_accent_Switch = n58
export const light_error_accent_SliderTrack = n58
export const light_error_accent_TooltipContent = n58
export const light_warning_accent_Button = n58
export const light_warning_accent_Switch = n58
export const light_warning_accent_SliderTrack = n58
export const light_warning_accent_TooltipContent = n58
export const light_success_accent_Button = n58
export const light_success_accent_Switch = n58
export const light_success_accent_SliderTrack = n58
export const light_success_accent_TooltipContent = n58
const n59 = t([[0, 32],[1, 124],[11, 19],[15, 32],[16, 131],[17, 126],[18, 124],[19, 124],[20, 32],[21, 151],[22, 128],[23, 19],[24, 123],[25, 15],[26, 126],[27, 19],[28, 126],[29, 126],[30, 151],[31, 125],[32, 19],[33, 19],[34, 125]])

export const light_accent_SliderTrackActive = n59
export const light_error_accent_SliderTrackActive = n59
export const light_warning_accent_SliderTrackActive = n59
export const light_success_accent_SliderTrackActive = n59
const n60 = t([[0, 15],[1, 15],[11, 139],[15, 32],[16, 137],[17, 32],[18, 138],[19, 138],[20, 15],[22, 132],[23, 133],[24, 19],[25, 131],[26, 32],[27, 133],[28, 124],[29, 19],[31, 134],[32, 19],[33, 19],[34, 136]])

export const dark_accent_Card = n60
export const dark_accent_Progress = n60
export const dark_accent_DrawerFrame = n60
export const dark_accent_TooltipArrow = n60
export const dark_error_accent_Card = n60
export const dark_error_accent_Progress = n60
export const dark_error_accent_DrawerFrame = n60
export const dark_error_accent_TooltipArrow = n60
export const dark_warning_accent_Card = n60
export const dark_warning_accent_Progress = n60
export const dark_warning_accent_DrawerFrame = n60
export const dark_warning_accent_TooltipArrow = n60
export const dark_success_accent_Card = n60
export const dark_success_accent_Progress = n60
export const dark_success_accent_DrawerFrame = n60
export const dark_success_accent_TooltipArrow = n60
const n61 = t([[0, 15],[1, 32],[11, 137],[15, 139],[16, 140],[17, 19],[18, 138],[19, 138],[20, 15],[21, 151],[22, 130],[23, 19],[24, 131],[25, 132],[26, 19],[27, 19],[28, 32],[29, 124],[30, 151],[31, 135],[32, 134],[33, 134],[34, 138]])

export const dark_accent_Input = n61
export const dark_accent_Checkbox = n61
export const dark_accent_TextArea = n61
export const dark_accent_RadioGroupItem = n61
export const dark_error_accent_Input = n61
export const dark_error_accent_Checkbox = n61
export const dark_error_accent_TextArea = n61
export const dark_error_accent_RadioGroupItem = n61
export const dark_warning_accent_Input = n61
export const dark_warning_accent_Checkbox = n61
export const dark_warning_accent_TextArea = n61
export const dark_warning_accent_RadioGroupItem = n61
export const dark_success_accent_Input = n61
export const dark_success_accent_Checkbox = n61
export const dark_success_accent_TextArea = n61
export const dark_success_accent_RadioGroupItem = n61
const n62 = t([[0, 32],[1, 19],[11, 132],[15, 131],[16, 130],[17, 32],[18, 124],[19, 124],[20, 32],[21, 151],[22, 140],[23, 136],[24, 139],[25, 137],[26, 32],[27, 136],[28, 15],[29, 138],[30, 151],[31, 134],[32, 135],[33, 135],[34, 124]])

export const dark_accent_Tooltip = n62
export const dark_accent_SliderThumb = n62
export const dark_accent_SwitchThumb = n62
export const dark_accent_ProgressIndicator = n62
export const dark_error_accent_Tooltip = n62
export const dark_error_accent_SliderThumb = n62
export const dark_error_accent_SwitchThumb = n62
export const dark_error_accent_ProgressIndicator = n62
export const dark_warning_accent_Tooltip = n62
export const dark_warning_accent_SliderThumb = n62
export const dark_warning_accent_SwitchThumb = n62
export const dark_warning_accent_ProgressIndicator = n62
export const dark_success_accent_Tooltip = n62
export const dark_success_accent_SliderThumb = n62
export const dark_success_accent_SwitchThumb = n62
export const dark_success_accent_ProgressIndicator = n62
const n63 = t([[0, 15],[1, 138],[11, 32],[15, 15],[16, 139],[17, 124],[18, 138],[19, 138],[20, 15],[22, 131],[23, 19],[24, 32],[25, 19],[26, 124],[27, 19],[28, 19],[29, 133],[31, 135],[32, 134],[33, 134],[34, 135]])

export const dark_accent_SliderTrack = n63
export const dark_accent_TooltipContent = n63
export const dark_error_accent_Button = n63
export const dark_error_accent_Switch = n63
export const dark_error_accent_SliderTrack = n63
export const dark_error_accent_TooltipContent = n63
export const dark_warning_accent_Button = n63
export const dark_warning_accent_Switch = n63
export const dark_warning_accent_SliderTrack = n63
export const dark_warning_accent_TooltipContent = n63
export const dark_success_accent_Button = n63
export const dark_success_accent_Switch = n63
export const dark_success_accent_SliderTrack = n63
export const dark_success_accent_TooltipContent = n63
const n64 = t([[0, 32],[1, 124],[11, 19],[15, 32],[16, 131],[17, 138],[18, 124],[19, 124],[20, 32],[21, 151],[22, 139],[23, 134],[24, 15],[25, 32],[26, 138],[27, 134],[28, 136],[29, 135],[30, 151],[31, 133],[32, 19],[33, 19],[34, 133]])

export const dark_accent_SliderTrackActive = n64
export const dark_error_accent_SliderTrackActive = n64
export const dark_warning_accent_SliderTrackActive = n64
export const dark_success_accent_SliderTrackActive = n64