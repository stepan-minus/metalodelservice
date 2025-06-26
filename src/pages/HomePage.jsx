import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { FaTools, FaClock, FaCheckCircle, FaUserTie } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Modal from '../components/common/Modal';
import ContactForm from '../components/common/ContactForm';
import ReviewsSection from '../components/common/ReviewsSection';
import SEO from '../components/SEO';
import { projectCategories } from '../data/projectData';

const HomePage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const features = [
    {
      icon: <FaTools className="text-4xl text-orange-600" />,
      title: 'Собственное производство',
      description: 'Полный цикл производства на современном оборудовании'
    },
    {
      icon: <FaClock className="text-4xl text-orange-600" />,
      title: 'Точные сроки',
      description: 'Гарантированное соблюдение сроков изготовления'
    },
    {
      icon: <FaCheckCircle className="text-4xl text-orange-600" />,
      title: 'Контроль качества',
      description: 'Многоступенчатая проверка на всех этапах производства'
    },
    {
      icon: <FaUserTie className="text-4xl text-orange-600" />,
      title: 'Индивидуальный подход',
      description: 'Разработка проекта под ваши требования'
    }
  ];

  // Выбираем несколько проектов для показа на главной
  const featuredProjects = [
    {
      category: 'stairs',
      type: projectCategories.stairs.types[2], // Винтовая лестница
      image: '/projects/stairs/vintovaya/1.jpg'
    },
    {
      category: 'gates_fences',
      type: projectCategories.gates_fences.types[0], // Откатные ворота
      image: '/projects/gates_fences/otkatnye-vorota/1.jpg'
    },
    {
      category: 'other',
      type: projectCategories.other.types[0], // Модульные металлокаркасы
      image: '/projects/other/modulnye-metallokarkas/1.jpg'
    }
  ];

  return (
    <>
      <SEO 
        title="Metallo Del Service - Металлоконструкции в Москве"
        description="Изготовление металлоконструкций любой сложности: лестницы, ворота, навесы. Качественные решения для вашего дома и бизнеса."
      />
      
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Качественные металлоконструкции <br />
              для вашего дома
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Мы создаем надежные и элегантные металлоконструкции: 
              от простых решений до сложных архитектурных элементов
            </p>
            <Link to="/projects">
              <Button>Смотреть наши работы</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Наши преимущества
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center p-6 bg-white rounded-lg shadow-lg"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Наши работы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative aspect-[4/3]">
                  <img
                    src={project.image}
                    alt={project.type.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {project.type.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.type.description}</p>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/projects')}
                    fullWidth
                  >
                    Подробнее
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsSection />

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">О компании</h2>
            <p className="text-lg text-gray-600 mb-8">
              Metallo Del Service - это команда профессионалов с многолетним опытом в производстве металлоконструкций. 
              Мы специализируемся на изготовлении лестниц, ворот, ограждений и других металлических изделий любой сложности. 
              Наша миссия - создавать качественные и долговечные конструкции, которые будут радовать наших клиентов долгие годы.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Остались вопросы?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Оставьте заявку, и мы свяжемся с вами в течение 15 минут!
            </p>
            <Button onClick={() => setIsModalOpen(true)}>
              Оставить заявку
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Оставить заявку"
      >
        <ContactForm onSubmit={(data) => {
          console.log('Form submitted:', data);
          setIsModalOpen(false);
        }} />
      </Modal>
    </>
  );
};

export default HomePage; 