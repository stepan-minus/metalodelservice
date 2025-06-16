import React, { useState, useEffect } from 'react';
import useProjectImages from '../hooks/useProjectImages';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectGallery = ({ category = 'all', subcategory = 'all' }) => {
  const { images, loading } = useProjectImages(category, subcategory);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageLoadErrors, setImageLoadErrors] = useState({});

  useEffect(() => {
    console.log('ProjectGallery rendered with images:', images);
  }, [images]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!images.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">В данной категории пока нет изображений</p>
        <p className="text-sm text-gray-500 mt-2">Категория: {category}, Подкатегория: {subcategory}</p>
      </div>
    );
  }

  const handleImageError = (imagePath) => {
    console.error('Error loading image:', imagePath);
    setImageLoadErrors(prev => ({
      ...prev,
      [imagePath]: true
    }));
  };

  const handleImageLoad = (imagePath) => {
    console.log('Image loaded successfully:', imagePath);
    setImageLoadErrors(prev => ({
      ...prev,
      [imagePath]: false
    }));
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-500 px-4">
        <p>Загружено изображений: {images.length}</p>
        <p>Категория: {category}, Подкатегория: {subcategory}</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {images.map((image, index) => (
          <motion.div
            key={image.path}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
            onClick={() => setSelectedImage(image)}
          >
            <div className="aspect-w-4 aspect-h-3">
              <img
                src={image.path}
                alt={image.title}
                className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
                onError={() => handleImageError(image.path)}
                onLoad={() => handleImageLoad(image.path)}
              />
              {imageLoadErrors[image.path] && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="text-center p-4">
                    <p className="text-red-500">Ошибка загрузки изображения</p>
                    <p className="text-xs text-gray-500 break-all mt-2">{image.path}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-lg font-semibold">{image.title}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={selectedImage.path}
                alt={selectedImage.title}
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectGallery; 