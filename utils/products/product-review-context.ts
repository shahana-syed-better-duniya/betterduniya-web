import { ProductReviewSummary } from "@/interfaces/products/productReviewSummary";
import React, { createContext, ReactNode, useContext, useState } from 'react';

export interface ProductReviewContextType {
  summary?: ProductReviewSummary;
  previousSearchValue: string;
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

// Provider component for testing
export const ProductReviewContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [summary, setSummary] = useState<ProductReviewSummary | undefined>();
  const [previousSearchValue, setPreviousSearchValue] = useState<string>('');

  const setProductReviewContext = (data: Partial<ProductReviewContextType>) => {
    if (data.summary !== undefined) {
      setSummary(data.summary);
    }
    if (data.previousSearchValue !== undefined) {
      setPreviousSearchValue(data.previousSearchValue);
    }
  };

  const value: ProductReviewContextType = {
    summary,
    previousSearchValue,
    setProductReviewContext,
  };

  return React.createElement(
    ProductReviewContext.Provider,
    { value },
    children
  );
};
