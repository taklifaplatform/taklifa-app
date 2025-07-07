import { ImageUp, Trash2, WandSparkles } from '@tamagui/lucide-icons';
import { MediaTransformer } from '@zix/api';
import { ZixMediaPickerField } from '@zix/ui/forms';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Paragraph, Stack, Text, XStack, YStack, Image } from 'tamagui';

export const AddProductComponent = () => {
  const [images, setImages] = useState<MediaTransformer[]>([]);
  const SCREEN_WIDTH = Dimensions.get('window').width;

  const renderMessageDescription = () => (
    <YStack
      width="100%"
      gap="$3"
      theme={'accent'}
      alignItems="center"
      backgroundColor="$color3"
      borderRadius="$4"
      paddingHorizontal="$4"
      paddingVertical="$5"
    >
      <Text fontWeight="bold" fontSize="$1">
        {' '}
        إنشاء منتجات تلقائياً
      </Text>
      <Paragraph fontSize="$1" textAlign="center">
        {' '}
        ارفع عدة صور وسيقوم الذكاء الاصطناعي بتحليل كل صورة وإنشاء منتج منفصل
        بالاسم والوصف المناسب
      </Paragraph>
    </YStack>
  );

  const renderBoxAddImage = () => {
    return (
      <YStack
        alignItems="center"
        justifyContent="center"
        borderRadius="$4"
        padding="$9"
        backgroundColor="$color3"
        borderWidth={1}
        borderColor="$color0"
        borderStyle="dashed"
      >
        <Stack
          theme={'accent'}
          alignItems="center"
          justifyContent="center"
          gap="$3"
          backgroundColor="$color3"
          borderRadius="$10"
          padding="$3"
        >
          <ImageUp size={20} color="$color1" />
        </Stack>

        <ZixMediaPickerField
          type="files"
          value={images}
          isMultiple={true}
          onChange={(value) => {
            setImages([...images, ...(value as MediaTransformer[])]);
          }}
          showCustomImagePicker
        />
        <Text fontSize="$1" color="$color0">
          10 MB حتى PNG, JPG, Webp
        </Text>
      </YStack>
    );
  };

  return (
    <YStack flex={1} marginTop="$3" gap="$3">
      <FlatList
        ListHeaderComponent={
          <>
            {renderMessageDescription()}
            <YStack alignItems="flex-start" borderRadius="$4" padding="$3">
              <Text fontWeight="bold" fontSize="$5">
                ارفع صور المنتج
              </Text>
            </YStack>
            {renderBoxAddImage()}
          </>
        }
        data={images}
        keyExtractor={(item) => item.uuid?.toString() ?? ''}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        style={{
          gap: 10,
          marginBottom: 80,
        }}
        renderItem={({ item }) => {
          return (
            <Stack
              width={SCREEN_WIDTH / 2 - 45}
              height={SCREEN_WIDTH / 2 - 45}
              borderWidth={1}
              borderColor="$color3"
              borderRadius="$4"
              overflow="hidden"
              margin="$2"
              padding="$2"
              alignItems="center"
              justifyContent="center"
            >
              <Image
                source={{ uri: item.original_url }}
                style={{ width: '100%', height: '100%' }}
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  backgroundColor: '#FEECEE',
                  borderRadius: 20,
                  padding: 5,
                }}
                onPress={() => {
                  setImages(images.filter((image) => image.uuid !== item.uuid));
                }}
              >
                <Trash2 size={20} color="red" />
              </TouchableOpacity>
            </Stack>
          );
        }}
      />
      <LinearGradient
        colors={
          images.length > 0 ? ['#0F5837', '#15D278'] : ['#D9D9D9', '#D9D9D9']
        }
        start={[0, 2]}
        style={{
          borderRadius: 10,
          position: 'absolute',
          bottom: 30,
          left: 0,
          right: 0,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            padding: 10,
          }}
        >
          <WandSparkles
            size={20}
            color={images.length > 0 ? '#fff' : '#8590A2'}
          />
          <Text
            fontSize="$1"
            color={images.length > 0 ? '#fff' : '#8590A2'}
            fontWeight="600"
            textAlign="center"
          >
            إنشاء منتج لكل صورة بالذكاء الاصطناعي
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </YStack>
  );
};

export default AddProductComponent;
