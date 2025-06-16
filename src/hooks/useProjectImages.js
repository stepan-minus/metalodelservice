import { useState, useEffect } from 'react';

const useProjectImages = (category, subcategory = null) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      try {
        console.log('Loading images for category:', category, 'subcategory:', subcategory);
        
        // Определяем категории и их пути
        const categories = {
          stairs: {
            path: 'lestnitsy',
            title: 'Лестницы',
            subcategories: {
              'vintovye': 'Винтовые',
              'pryamye': 'Прямые',
              'modulnye': 'Модульные',
              'marshevye': 'Маршевые'
            }
          },
          gates: {
            path: 'vorota_ograzhdeniya',
            title: 'Ворота и ограждения',
            subcategories: {
              'otkatnye': 'Откатные ворота',
              'raspashnye': 'Распашные ворота',
              'ograzhdeniya': 'Ограждения',
              'perila': 'Перила'
            }
          },
          other: {
            path: 'drugie',
            title: 'Другие конструкции',
            subcategories: {
              'navesy': 'Навесы',
              'fasadnye': 'Фасадные конструкции',
              'mebel': 'Металлическая мебель',
              'raznoe': 'Разное'
            }
          }
        };

        let imageList = [];

        // Получаем все файлы изображений
        const imageFiles = import.meta.glob('/public/projects/**/*', {
          eager: true,
          as: 'url'
        });

        console.log('Found image files:', imageFiles);

        // Обрабатываем все найденные изображения
        Object.entries(imageFiles).forEach(([path, url]) => {
          console.log('Processing file:', path);
          
          // Проверяем расширение файла
          if (!/\.(jpg|jpeg|png|webp)$/i.test(path)) {
            console.log('Skipping non-image file:', path);
            return;
          }

          // Получаем относительный путь
          const relativePath = path.split('/projects/')[1];
          if (!relativePath) {
            console.log('Could not extract relative path from:', path);
            return;
          }

          console.log('Relative path:', relativePath);

          // Разбиваем путь на части
          const [categoryDir, subcategoryDir] = relativePath.split('/');

          console.log('Category directory:', categoryDir);
          console.log('Subcategory directory:', subcategoryDir);

          // Находим категорию
          const categoryEntry = Object.entries(categories).find(
            ([_, info]) => info.path === categoryDir
          );

          if (!categoryEntry) {
            console.log('Category not found for directory:', categoryDir);
            return;
          }

          const [categoryKey, categoryInfo] = categoryEntry;

          // Находим подкатегорию
          const subcategoryEntry = Object.entries(categoryInfo.subcategories).find(
            ([key]) => key === subcategoryDir
          );

          if (!subcategoryEntry) {
            console.log('Subcategory not found for directory:', subcategoryDir);
            return;
          }

          const [subcategoryKey, subcategoryTitle] = subcategoryEntry;

          // Проверяем соответствие выбранной категории и подкатегории
          if (
            (category === 'all' || category === categoryKey) &&
            (subcategory === 'all' || !subcategory || subcategory === subcategoryKey)
          ) {
            const imageUrl = url.startsWith('/') ? url : '/' + url;
            console.log('Adding image:', {
              path: imageUrl,
              title: `${categoryInfo.title} - ${subcategoryTitle}`,
              category: categoryKey,
              subcategory: subcategoryKey
            });
            
            imageList.push({
              path: imageUrl,
              title: `${categoryInfo.title} - ${subcategoryTitle}`,
              category: categoryKey,
              subcategory: subcategoryKey
            });
          }
        });

        // Сортируем изображения по имени файла
        imageList.sort((a, b) => a.path.localeCompare(b.path));
        
        console.log('Final image list:', imageList);
        
        setImages(imageList);
      } catch (error) {
        console.error('Error loading images:', error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [category, subcategory]);

  return { images, loading };
};

export default useProjectImages;