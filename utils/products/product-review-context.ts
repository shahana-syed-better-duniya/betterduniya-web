import {createContext, useContext} from 'react';
import {ProductReviewSummary} from "@/interfaces/products/productReviewSummary";

export interface ProductReviewContextType {
  summary?: ProductReviewSummary;
  setProductReviewContext: (data: Partial<ProductReviewContextType>) => void;
}

export const ProductReviewContext = createContext<ProductReviewContextType | null>(null);

export const useProductReviewContext = (): ProductReviewContextType => {
  const context = useContext(ProductReviewContext);

  if (!context) {
    throw new Error('useProductContext must be used within a ProductContextProvider');
  }

  return context;
};
