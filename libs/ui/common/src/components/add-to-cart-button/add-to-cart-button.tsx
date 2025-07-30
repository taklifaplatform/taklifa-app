import { Check } from '@tamagui/lucide-icons';
import { ProductTransformer } from '@zix/api';
import { useCart } from '@zix/services/auth';
import { useState } from 'react';
import { ZixButton } from '../zix-button/zix-button';

export const AddToCartButton = ({
  product,
  width = '100%',
  height = 40,
  count,
}: {
  product: ProductTransformer;
  width?: number | string;
  height?: number | string;
  count?: number;
}) => {
  const { addItemToCart } = useCart();

  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const [isAddingToCart, setIsAddingToCart] = useState(false);
  async function onAddToCart() {
    setIsAddingToCart(true);
    await addItemToCart(product, count || 1);
    setIsAddingToCart(false);
    setIsAddedToCart(true);
  }
  return (
    <ZixButton
      theme={'accent'}
      height={height}
      width={width}
      justifyContent="center"
      alignItems="center"
      onPress={() => onAddToCart()}
      fontSize={12}
      backgroundColor="$color1"
      fontWeight={'bold'}
      color="$color2"
      loading={isAddingToCart}
    >
      {isAddedToCart ? <Check size={16} color="#FFF" /> : 'أضف لعرض سعر '}
    </ZixButton>
  );
};
