import { TrashGif } from '@zix/ui/icons';
import { XStack, YStack, Text } from 'tamagui';
import { ZixDialog } from '../zix-dialog/zix-dialog';
import { useState } from 'react';
import { Trash2, X } from '@tamagui/lucide-icons';
import { ZixButton } from '../zix-button/zix-button';

interface DeleteProductProps {
  title: string;
  trigger: React.ReactNode;
  onDelete: () => void;
}

export const DeleteProduct: React.FC<DeleteProductProps> = ({
  title,
  trigger,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ZixDialog
      title={title}
      open={isOpen}
      onOpenChange={setIsOpen}
      contentPadding="$1"
      snapPoints={[30, 50]}
      disableRemoveScroll
      trigger={trigger}
      colorHeader="#FFF2F1"
    >
      <YStack flex={1} alignItems="center" gap="$6" marginTop={'$4'} backgroundColor="transparent">
        <YStack alignItems="center" justifyContent="center" gap="$2">
          <TrashGif width={30} height={30} />
          <Text fontWeight="bold" fontSize={'$3'}>
            هل ترغب في حذف هذا المنتج؟
          </Text>
          <Text fontSize={'$2'} >
            سيتم حذف هذا العنصر نهائيًا
          </Text>
        </YStack>

        <XStack gap="$2">
          <ZixButton
            onPress={() => {
              onDelete();
              setIsOpen(false);
            }}
            theme="error"
            backgroundColor={'#FF6369'}
            width={'40%'}
            height={'$3'}
          >
            <Trash2 size={20} color="white" />
            <Text color="white">نعم، حذف</Text>
          </ZixButton>
          <ZixButton
            onPress={() => setIsOpen(false)}
            backgroundColor={'$color11'}
            width={'40%'}
            height={'$3'}
          >
            <X size={20} color="white" />
            <Text color="white">إلغاء</Text>
          </ZixButton>
        </XStack>
      </YStack>
    </ZixDialog>
  );
};

export default DeleteProduct;
