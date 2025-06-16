import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoArrowBack, IoArrowForward } from 'react-icons/io5';
import useProjectImages from '../../hooks/useProjectImages';

const ProjectGallery = ({ category, type, onClose }) => {
  const { images } = useProjectImages(category, type.id);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'Escape') onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div 
        className="relative w-full max-w-6xl mx-4 aspect-[16/9]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-white z-10 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-colors"
          onClick={onClose}
        >
          <IoClose size={24} />
        </button>

        {images.length > 1 && (
          <>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white z-10 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-colors"
              onClick={handlePrevious}
            >
              <IoArrowBack size={24} />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white z-10 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-colors"
              onClick={handleNext}
            >
              <IoArrowForward size={24} />
            </button>
          </>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {images.length > 0 ? (
              <img
                src={images[currentIndex].url}
                alt={`${type.title} - фото ${currentIndex + 1}`}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                Нет доступных фотографий
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {images.length > 0 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black bg-opacity-50 px-4 py-2 rounded-full">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectGallery; 