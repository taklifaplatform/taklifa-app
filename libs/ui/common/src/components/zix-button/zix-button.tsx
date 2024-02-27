
import { Button, ButtonProps, Spinner, TamaguiComponent } from 'tamagui'

import { forwardRef } from 'react'

export type ZixButtonProps = ButtonProps & {
  loading?: boolean
}

export const ZixButton = forwardRef(function ZixButtonFunc(
  { loading, ...props }: ZixButtonProps,
  ref
) {
  return (
    <Button
      {...props}
      ref={ref as TamaguiComponent}
      {...(loading && {
        icon: <Spinner />,
        disabled: true,
      })}
    />
  )
})


export default ZixButton;
