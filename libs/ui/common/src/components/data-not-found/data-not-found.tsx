import { Image, YStack,Text } from 'tamagui';

export interface DataNotFoundProps {
    message?: string;
    description?: string;
    imageUrl: string;
  }

  export const DataNotFound: React.FC<DataNotFoundProps> = ({message, description, imageUrl}) => {
  return (
    <YStack flex={1}  justifyContent='center' alignItems='center' gap='$3'>
        <Image
        alt="data not found"
        source={{
          uri: imageUrl,
          width: '256px',
          height: '229px',
        }}
        resizeMode="contain"
      />
      <Text fontWeight='800'>{message}</Text>
      <Text>{description}</Text>
    </YStack>
  )
}

export default DataNotFound