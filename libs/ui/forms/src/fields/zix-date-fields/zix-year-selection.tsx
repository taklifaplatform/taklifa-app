import { useMemo } from "react"
import ZixSelectField, { ZixSelectFieldProps } from "../zix-select-field/zix-select-field"
import { yearsForLocale } from "./utils"

export const ZixYearSelection: React.FC<Partial<ZixSelectFieldProps>> = (props) => {

  const options = useMemo(() => {
    return yearsForLocale()
  }, [])

  return <ZixSelectField {...props} options={options} />
}

export default ZixYearSelection
