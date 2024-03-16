
export type MainLayoutProps = {
  children?: React.ReactNode
  padded?: boolean
  fullPage?: boolean
  headerFixed?: boolean
}

export const MainLayout = ({ children, fullPage = false, padded = false, headerFixed = false }: MainLayoutProps) => {
  return children
}
