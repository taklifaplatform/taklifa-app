import { useMultiLang } from "@zix/i18n"
import { useMemo } from "react"
import ZixSelectField, { ZixSelectFieldProps } from "../zix-select-field/zix-select-field"
import { monthsForLocale } from "./utils"
import { Dimensions, Platform } from "react-native"

export const ZixMonthSelection: React.FC<Partial<ZixSelectFieldProps>> = (props) => {
  const { activeLang } = useMultiLang()

  const SCREEN_WIDTH = Dimensions.get('window').width

  const options = useMemo(() => {
    return monthsForLocale({ localeName: activeLang, })
  }, [activeLang])

  return <ZixSelectField {...props} options={options} width={Platform.OS === 'web' ? 180 : SCREEN_WIDTH / 2} />
}

export default ZixMonthSelection
