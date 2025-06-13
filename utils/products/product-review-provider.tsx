import React, {ReactNode, useCallback, useMemo, useState} from 'react';
import {ProductReviewContext, ProductReviewContextType} from "@/utils/products/product-review-context";

interface ProductReviewProviderProps {
  children: ReactNode;
}

export const ProductReviewProvider: React.FC<ProductReviewProviderProps> = ({children}) => {
  const [contextValue, setContextValue] = useState<Omit<ProductReviewContextType, 'setProductReviewContext'>>({
    summary: undefined,
  });

  const setProductReviewContext = useCallback((data: Partial<ProductReviewContextType>) => {
    if (data) {
      setContextValue((prev) => ({...prev, ...data}));
    }
  }, []);

  const value = useMemo(
    () => ({...contextValue, setProductReviewContext}),
    [contextValue, setProductReviewContext]
  );

  return <ProductReviewContext.Provider value={value}>{children}</ProductReviewContext.Provider>;
};
