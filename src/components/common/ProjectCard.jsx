import React from 'react';
import useProjectImages from '../../hooks/useProjectImages';

const ProjectCard = ({ category, type, onClick }) => {
  const { previewImage } = useProjectImages(category, type.id);

  return (
    <div 
      className="group cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
      onClick={() => onClick(type)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {previewImage ? (
          <img
            src={previewImage}
            alt={type.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Нет фото</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{type.title}</h3>
        <p className="mt-1 text-sm text-gray-500">{type.description}</p>
      </div>
    </div>
  );
};

export default ProjectCard; 