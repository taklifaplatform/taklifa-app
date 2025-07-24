import { CartService, CartTransformer, ProductTransformer, CartItemTransformer, SimpleCompanyTransformer } from '@zix/api';
import * as Crypto from 'expo-crypto';
import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { storage } from './auth-atoms';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMemo, useCallback } from 'react';

const CART_CODE_KEY = 'CART_CODE_KEY';

// Define proper interfaces for grouped cart data
export interface GroupedCompanyItems {
  company: SimpleCompanyTransformer;
  items: CartItemTransformer[];
  totalCost: number;
  totalItems: number;
}

export interface CartState {
  cart: CartTransformer | undefined;
  isLoading: boolean;
  error: string | null;
}

export const cartCodeStorage = atomWithStorage<string | undefined>(
  CART_CODE_KEY,
  undefined,
  storage as any, // Fix for storage typing issue
);

const cartStateAtom = atom<CartState>({
  cart: undefined,
  isLoading: false,
  error: null,
});

export function useCart() {
  const [cartState, setCartState] = useAtom(cartStateAtom);
  const { cart, isLoading, error } = cartState;

  // Group cart items by company with proper typing and calculations
  const groupedCompanyItems = useMemo((): GroupedCompanyItems[] => {
    if (!cart?.items || cart.items.length === 0) {
      return [];
    }

    const companiesMap = new Map<string, GroupedCompanyItems>();
    
    cart.items.forEach((item) => {
      if (!item.company?.id) {
        console.warn('Cart item missing company information:', item);
        return;
      }

      const companyId = item.company.id;
      
      if (!companiesMap.has(companyId)) {
        companiesMap.set(companyId, {
          company: item.company,
          items: [],
          totalCost: 0,
          totalItems: 0,
        });
      }

      const groupedCompany = companiesMap.get(companyId)!;
      groupedCompany.items.push(item);
      groupedCompany.totalCost += item.total_price || 0;
      groupedCompany.totalItems += item.quantity || 0;
    });

    return Array.from(companiesMap.values());
  }, [cart?.items]);

  const addItemToCart = useCallback(async (item: ProductTransformer, quantity: number): Promise<void> => {
    try {
      setCartState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const code = await getCartCode();
      await CartService.addItem({
        code,
        requestBody: {
          product_id: item.id,
          variant_id: item.variant?.id,
          quantity,
        },
      });
      
      await getCart();
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      setCartState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: 'Failed to add item to cart' 
      }));
      throw error;
    }
  }, []);

  const getCart = useCallback(async (): Promise<void> => {
    try {
      setCartState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const result = await CartService.getCart({
        code: await getCartCode(),
      });
      
      setCartState(prev => ({
        ...prev,
        cart: result.data,
        isLoading: false,
        error: null,
      }));
      
      console.log('Cart loaded successfully:', result.data);
    } catch (error) {
      console.error('Failed to load cart:', error);
      setCartState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: 'Failed to load cart' 
      }));
      throw error;
    }
  }, []);

  const updateItemQuantity = useCallback(async (item: CartItemTransformer, quantity: number): Promise<void> => {
    try {
      setCartState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // This would need to be implemented based on your API
      // await CartService.updateItem({ itemId, quantity });
      await CartService.addItem({
        code: await getCartCode(),
        requestBody: {
          product_id: item.product_id,
          variant_id: item.variant_id,
          quantity,
        },
      });
      
      await getCart();
    } catch (error) {
      console.error('Failed to update item quantity:', error);
      setCartState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: 'Failed to update item quantity' 
      }));
      throw error;
    }
  }, [getCart]);

  const removeItem = useCallback(async (itemId: string): Promise<void> => {
    try {
      setCartState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // This would need to be implemented based on your API
      // await CartService.removeItem({ itemId });
      
      await getCart();
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
      setCartState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: 'Failed to remove item from cart' 
      }));
      throw error;
    }
  }, [getCart]);

  const clearCart = useCallback(async (): Promise<void> => {
    try {
      setCartState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // This would need to be implemented based on your API
      // await CartService.clearCart({ code: await getCartCode() });
      
      setCartState(prev => ({
        ...prev,
        cart: undefined,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      console.error('Failed to clear cart:', error);
      setCartState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: 'Failed to clear cart' 
      }));
      throw error;
    }
  }, []);

  async function getCartCode(): Promise<string> {
    const code = await AsyncStorage.getItem(CART_CODE_KEY);
    if (code) {
      return code;
    }

    const newCode = Crypto.randomUUID();
    await AsyncStorage.setItem(CART_CODE_KEY, newCode);
    return newCode;
  }

  // Calculate total items across all companies
  const totalItems = useMemo(() => {
    return groupedCompanyItems.reduce((sum, company) => sum + company.totalItems, 0);
  }, [groupedCompanyItems]);

  // Calculate total cost across all companies
  const totalCost = useMemo(() => {
    return groupedCompanyItems.reduce((sum, company) => sum + company.totalCost, 0);
  }, [groupedCompanyItems]);

  const hasItems = groupedCompanyItems.length > 0;

  const formatCurrency = useCallback((amount: number) => {
    return Number(amount).toLocaleString('en-US', {
      style: 'currency',
      currency: 'SAR',
    }).replace('SAR', '').replace('SR', '').replace('ر.س', '');
  }, []);

  return {
    // Data
    cart,
    groupedCompanyItems,
    totalItems,
    totalCost,
    hasItems,
    formatCurrency,
    // State
    isLoading,
    error,
    
    // Actions
    getCart,
    addItemToCart,
    updateItemQuantity,
    removeItem,
    clearCart,
    getCartCode,
  };
}

export default useCart;
