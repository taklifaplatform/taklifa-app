import { ImageUp, Trash2, WandSparkles } from '@tamagui/lucide-icons';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@zix/services/auth';
import { MediaTransformer, ProductsService } from '@zix/api';
import { DeleteProduct, ZixAlertActions, ZixButton } from '@zix/ui/common';
import { ZixMediaPickerField } from '@zix/ui/forms';
import { CheckedGif, MagicGif } from '@zix/ui/icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Image, Paragraph, Stack, Text, YStack } from 'tamagui';

export const BatchAddProductComponent = () => {
  const [images, setImages] = useState<MediaTransformer[]>([]);
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const { getUrlPrefix, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState<MediaTransformer | null>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  async function createProducts() {
    setIsOpen(true);
    try {
      const result = await ProductsService.batchCreateProducts({
        requestBody: {
          images,
        },
      });
      setIsOpen(false);
      setIsSuccess(true);

      // TODO reset dstate
      setImages([]);
      setTimeout(() => {
        setIsSuccess(false);
        queryClient.invalidateQueries({
          queryKey: [
            'ProductsService.fetchAllProduct',
            user.active_company?.id,
            true,
          ],
        });
        router.replace(`${getUrlPrefix}/(tabs)/store`);
        // onSuccess?.(result.data as BatchProductTransformer);
      }, 1000);
    } catch (error) {
      setIsOpen(false);
      alert('Oops! Something went wrong');
    }
  }

  const renderMessageDescription = () => (
    <YStack
      width="100%"
      gap="$3"
      theme={'accent'}
      alignItems="center"
      backgroundColor="$color10"
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
        padding="$4"
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
          backgroundColor="#EFFEF6"
          borderRadius="$10"
          padding="$3"
        >
          <ImageUp size={20} color="$color1" />
        </Stack>

        <ZixMediaPickerField
          type="image"
          value={images}
          isMultiple={true}
          onChange={(value) => {
            setImages([...images, ...(value as MediaTransformer[])]);
          }}
          showCustomImagePicker
          trigger={
            <ZixButton
              theme={'accent'}
              width={'$20'}
              height={'$4'}
              borderRadius={'$4'}
              backgroundColor="$color1"
              alignSelf="center"
              margin="$4"
            >
              <Text fontWeight="600" fontSize="$1" color="#FFFFFF">
                {' '}
                اختر الصور
              </Text>
            </ZixButton>
          }
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
    <YStack flex={1} marginTop="$1" gap="$3">
      <FlatList
        ListHeaderComponent={<>{renderMessageDescription()}</>}
        data={images}
        keyExtractor={(item) => item.uuid?.toString() ?? ''}
        contentContainerStyle={{
          gap: 10,
          marginBottom: 80,
        }}
        numColumns={3}
        columnWrapperStyle={{
          gap: 10,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <Stack
              width={SCREEN_WIDTH / 3 - 15}
              height={SCREEN_WIDTH / 3 - 15}
              key={index}
              borderWidth={1}
              borderColor="$color3"
              borderRadius="$4"
              overflow="hidden"
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
                open={openDeleteDialog}
                setIsOpen={setOpenDeleteDialog}
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
                    onPress={() => {
                      console.log('delete', index);
                      setOpenDeleteDialog(true);
                      setSelectedImage(item);
                    }}
                  >
                    <Trash2 size={20} color="red" />
                  </TouchableOpacity>
                }
                onDelete={() => {
                  setImages(images.filter((image) => image.uuid !== selectedImage?.uuid));
                }}
              />
            </Stack>
          );
        }}
        ListFooterComponent={
          <>
            <YStack alignItems="flex-start" borderRadius="$4" padding="$3">
              <Text fontWeight="bold" fontSize="$5">
                ارفع صور المنتج
              </Text>
            </YStack>
            {renderBoxAddImage()}
          </>
        }
      />

      <ZixAlertActions
        title="جاري تحليل الصور وإنشاء المنتجات..."
        description="سيتم إنشاء منتج منفصل لكل صورة"
        icon={<MagicGif width={35} height={35} />}
        closeButton={isOpen}
      >
        <ZixButton
          disabled={images.length === 0}
          onPress={() => {
            // setIsOpen(true);
            createProducts();
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
        description={`تم إنشاء ${images.length} منتج من ${images.length} صورة`}
        icon={<CheckedGif width={35} height={35} />}
        closeButton={isSuccess}
      />
    </YStack>
  );
};

export default BatchAddProductComponent;
