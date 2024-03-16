import { AppHeader, AppHeaderProps } from "@zix/ui/layouts";


// TODO:: need to implement channel header if this component gonna be used for web
export const ChannelHeader: React.FC<AppHeaderProps> = (props) => {
  return (
    <AppHeader {...props} />
  );
}

export default ChannelHeader;
