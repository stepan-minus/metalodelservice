import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useProjectImages from '../../hooks/useProjectImages';
import Modal from '../Modal';

const ProjectGallery = ({ category = 'all', subcategory = 'all' }) => {
  const { images, loading } = useProjectImages(category, subcategory);
  const [selectedImage, setSelectedImage] = useState(null);
  const [failedImages, setFailedImages] = useState(new Set());

  const handleImageError = (imagePath) => {
    setFailedImages(prev => new Set([...prev, imagePath]));
  };

  const getCategoryLabel = (cat) => {
    const categories = {
      stairs: 'Лестницы',
      gates: 'Ворота и ограждения',
      other: 'Другие конструкции'
    };
    return categories[cat] || 'Все проекты';
  };

  const getSubcategoryLabel = (cat, subcat) => {
    const subcategories = {
      stairs: {
        'spiral': 'Винтовые',
        'straight': 'Прямые',
        'modular': 'Модульные',
        'marching': 'Маршевые'
      },
      gates: {
        'sliding': 'Откатные ворота',
        'swing': 'Распашные ворота',
        'fences': 'Ограждения',
        'handrails': 'Перила'
      },
      other: {
        'canopies': 'Навесы',
        'facades': 'Фасадные конструкции',
        'furniture': 'Металлическая мебель',
        'misc': 'Разное'
      }
    };
    return subcategories[cat]?.[subcat] || 'Все';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const validImages = images.filter(img => !failedImages.has(img.path));

  if (validImages.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        <p>В данной категории пока нет проектов</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {validImages.map((image, index) => (
            <motion.div
              key={image.path}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="aspect-square relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.path}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                onError={() => handleImageError(image.path)}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Modal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      >
        {selectedImage && (
          <div className="relative max-w-4xl mx-auto">
            <img
              src={selectedImage.path}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[80vh] object-contain"
              onError={() => handleImageError(selectedImage.path)}
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
              <p className="font-medium">{selectedImage.title}</p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ProjectGallery; 