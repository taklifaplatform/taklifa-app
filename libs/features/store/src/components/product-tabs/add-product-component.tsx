import {
  CheckCircle,
  ImageUp,
  Trash2,
  WandSparkles,
} from '@tamagui/lucide-icons';
import { MediaTransformer } from '@zix/api';
import { ZixAlertActions, ZixButton, DeleteProduct } from '@zix/ui/common';
import { ZixMediaPickerField } from '@zix/ui/forms';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Image, Paragraph, Stack, Text, YStack } from 'tamagui';
import { useRouter } from 'expo-router';
import { CheckedGif, MagicGif } from '@zix/ui/icons';

export const AddProductComponent = () => {
  const [images, setImages] = useState<MediaTransformer[]>([]);
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
        setIsSuccess(true);
      }, 3000);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setIsSuccess(false);
        router.push('/app/products/list-products');
      }, 3000);
    }
  }, [isSuccess]);

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

  function sendImagesForProcessing() {
    setIsOpen(true);
  }

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
              <DeleteProduct
                title="تأكيد الحذف"
                trigger={
                  <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    backgroundColor: '#FEECEE',
                    borderRadius: 20,
                    padding: 5,
                  }}
                  >
                    <Trash2 size={20} color="red" />
                  </TouchableOpacity>
                }
                onDelete={() => {
                  setImages(images.filter((image) => image.uuid !== item.uuid));
                }}
              />
            </Stack>
          );
        }}
      />

      <ZixAlertActions
        title="جاري تحليل الصور وإنشاء المنتجات..."
        description="سيتم إنشاء منتج منفصل لكل صورة"
        icon={
          <MagicGif width={35} height={35} />
        }
        closeButton={isOpen}
      >
        <ZixButton
          // disabled={images.length === 0}
          onPress={() => {
            setIsOpen(true);
          }}
          unstyled
        >
          <LinearGradient
            colors={
              images.length > 0
                ? ['#0F5837', '#15D278']
                : ['#D9D9D9', '#D9D9D9']
            }
            start={[0, 2]}
            style={{
              borderRadius: 10,
              position: 'absolute',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              padding: 10,
              bottom: 30,
              left: 0,
              right: 0,
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
          </LinearGradient>
        </ZixButton>
      </ZixAlertActions>
      <ZixAlertActions
        title="تم إنشاء المنتجات بنجاح!"
        description="تم إنشاء 4 منتج من 4 صورة"
        icon={<CheckedGif width={35} height={35} />}
        closeButton={isSuccess}
      />
    </YStack>
  );
};

export default AddProductComponent;
