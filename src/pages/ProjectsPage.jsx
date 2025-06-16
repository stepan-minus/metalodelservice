import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import ProjectGallery from '../components/projects/ProjectGallery';

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');

  const categories = {
    all: {
      label: 'Все проекты',
      subcategories: {}
    },
    stairs: {
      label: 'Лестницы',
      subcategories: {
        'vintovye': 'Винтовые',
        'pryamye': 'Прямые',
        'modulnye': 'Модульные',
        'marshevye': 'Маршевые'
      }
    },
    gates: {
      label: 'Ворота и ограждения',
      subcategories: {
        'otkatnye': 'Откатные ворота',
        'raspashnye': 'Распашные ворота',
        'ograzhdeniya': 'Ограждения',
        'perila': 'Перила'
      }
    },
    other: {
      label: 'Другие конструкции',
      subcategories: {
        'navesy': 'Навесы',
        'fasadnye': 'Фасадные конструкции',
        'mebel': 'Металлическая мебель',
        'raznoe': 'Разное'
      }
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory('all');
  };

  return (
    <>
      <SEO 
        title="Наши проекты - Metallo Del Service"
        description="Галерея наших работ: лестницы, ворота и другие металлоконструкции. Примеры реализованных проектов."
      />
      
      <div className="container mx-auto px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-800 text-center mb-12"
        >
          Наши проекты
        </motion.h1>

        {/* Основные категории */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-4 flex-wrap">
            {Object.entries(categories).map(([id, category]) => (
              <button
                key={id}
                onClick={() => handleCategoryChange(id)}
                className={`px-6 py-2 rounded-full transition-colors duration-200 ${
                  selectedCategory === id
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Подкатегории */}
        <AnimatePresence mode="wait">
          {selectedCategory !== 'all' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex justify-center mb-8"
            >
              <div className="flex gap-3 flex-wrap">
                {Object.entries(categories[selectedCategory].subcategories).map(([id, label]) => (
                  <button
                    key={id}
                    onClick={() => setSelectedSubcategory(id)}
                    className={`px-4 py-1.5 rounded-full text-sm transition-colors duration-200 ${
                      selectedSubcategory === id
                        ? 'bg-gray-800 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <ProjectGallery 
          category={selectedCategory} 
          subcategory={selectedSubcategory}
        />
      </div>
    </>
  );
};

export default ProjectsPage; 