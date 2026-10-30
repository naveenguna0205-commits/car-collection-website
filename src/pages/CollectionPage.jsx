import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CarGallerySection } from '../components/collection/CarGallerySection';

export const CollectionPage = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  return (
    <div className="pt-8 pb-16">
      <CarGallerySection initialCategory={categoryParam || 'All'} />
    </div>
  );
};

