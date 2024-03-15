import QRCode, { QRCodeProps } from 'react-native-qrcode-svg';

export const CustomQRCode: React.FC<QRCodeProps> = (props) => {
  return <QRCode {...props} />;
};
