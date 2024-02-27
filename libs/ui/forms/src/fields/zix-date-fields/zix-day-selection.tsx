import { useMultiLang } from "@zix/i18n"
import { useMemo } from "react"
import ZixSelectField, { ZixSelectFieldProps } from "../zix-select-field/zix-select-field"
import { daysForLocale } from "./utils"

export const ZixDaySelection: React.FC<Partial<ZixSelectFieldProps>> = (props) => {
  const { activeLang } = useMultiLang()

  const options = useMemo(() => {
    return daysForLocale({ localeName: activeLang })
  }, [activeLang])

  return <ZixSelectField  {...props} options={options} />
}

export default ZixDaySelection
