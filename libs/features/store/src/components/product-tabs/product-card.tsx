import { SquarePen, Trash2 } from '@tamagui/lucide-icons';
import { DeleteProduct, ZixButton } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { View, Text, YStack, Stack, XStack, Image } from 'tamagui';
import { useRouter } from 'expo-router';

interface ProductCardProps {
  product: any;
  mode: 'grid' | 'list';
  onDelete: (id: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  mode,
  onDelete,
}) => {
  const router = useRouter();
  return (
    <YStack
      flex={1}
      gap="$2"
      padding="$4"
      borderRadius="$4"
      backgroundColor="$color2"
    >
      <Stack
        flex={1}
        flexDirection={mode === 'grid' ? 'column' : 'row'}
        gap="$4"
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <Image
          source={product.image}
          style={{
            width: mode === 'grid' ? '100%' : 130,
            height: mode === 'grid' ? 200 : 130,
            borderRadius: 10,
          }}
        />
        <YStack flex={1} gap="$2" alignItems="flex-start">
          <Text
            fontWeight="bold"
            fontSize={'$4'}
            color="$color0"
            textAlign="left"
            numberOfLines={2}
          >
            {product.title}
          </Text>
          <Text
            fontWeight="500"
            fontSize={'$2'}
            color="$color0"
            textAlign="left"
            numberOfLines={4}
          >
            {product.description}
          </Text>
          <XStack alignItems="center" gap="$2" marginTop={'$2'}>
            <Text
              fontWeight="bold"
              fontSize={'$4'}
              color="$color0"
              textAlign="left"
            >
              {product.price}
            </Text>
            <CustomIcon name="riyal" size={20} color="#000000" />
          </XStack>
        </YStack>
      </Stack>
      <XStack
        alignItems="center"
        justifyContent="space-between"
        marginTop={'$2'}
      >
        <ZixButton
          theme={'accent'}
          width={'65%'}
          height={'$3'}
          backgroundColor="$color1"
          icon={<SquarePen size={20} color="white" />}
          onPress={() => router.push(`/app/products/${product.id}/edit`)}
        >
          <Text fontWeight="500" fontSize={'$3'} color="white">
            تعديل
          </Text>
        </ZixButton>
        <DeleteProduct
          title="تأكيد الحذف"
          trigger={
            <ZixButton
              theme={'error'}
              width={'30%'}
              height={'$3'}
              backgroundColor="$color1"
              icon={<Trash2 size={20} color="$color0" />}
              borderWidth={1}
              borderColor="$color0"
            >
              <Text fontWeight="500" fontSize={'$3'} color="$color0">
                حذف
              </Text>
            </ZixButton>
          }
          onDelete={() => onDelete(product.id)}
        />
      </XStack>
    </YStack>
  );
};

export default ProductCard;
