import { FaVk, FaTelegram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Metallo Del Service</h3>
            <p className="text-steel">
              Изготовление металлоконструкций любой сложности с гарантией качества и соблюдением сроков.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Контакты</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaPhone className="text-primary" />
                <a href="tel:+79001234567" className="text-steel hover:text-white transition-colors">
                  +7 (900) 123-45-67
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-primary" />
                <a href="mailto:info@metallodelservice.ru" className="text-steel hover:text-white transition-colors">
                  info@metallodelservice.ru
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-primary" />
                <span className="text-steel">
                  г. Москва, ул. Примерная, д. 123
                </span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Мы в соцсетях</h3>
            <div className="flex space-x-4">
              <a 
                href="https://vk.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-steel hover:text-white transition-colors"
              >
                <FaVk size={24} />
              </a>
              <a 
                href="https://t.me" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-steel hover:text-white transition-colors"
              >
                <FaTelegram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-steel/20 mt-8 pt-8 text-center text-steel">
          <p>© {new Date().getFullYear()} Metallo Del Service. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 