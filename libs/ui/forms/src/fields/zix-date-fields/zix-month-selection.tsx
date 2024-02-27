import { useMultiLang } from "@zix/i18n"
import { useMemo } from "react"
import ZixSelectField, { ZixSelectFieldProps } from "../zix-select-field/zix-select-field"
import { monthsForLocale } from "./utils"

export const ZixMonthSelection: React.FC<Partial<ZixSelectFieldProps>> = (props) => {
  const { activeLang } = useMultiLang()

  const options = useMemo(() => {
    return monthsForLocale({ localeName: activeLang, })
  }, [activeLang])

  return <ZixSelectField {...props} options={options} />
}

export default ZixMonthSelection
