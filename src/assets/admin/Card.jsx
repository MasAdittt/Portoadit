import React from 'react'
import { Edit2, Trash2, Star } from 'lucide-react'

const ProjectCard = ({ project, onEdit, onDelete }) => {
  return (
    <div className="bg-gray-700/50 rounded-lg overflow-hidden border border-gray-600">
      <div className="relative">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-48 object-cover"
        />
        {project.featured && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <Star size={12} />
            Featured
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-blue-400 font-medium">{project.category}</span>
          <span className="text-xs text-gray-400">{project.year}</span>
        </div>
        
        <h4 className="font-semibold mb-2 line-clamp-1">{project.title}</h4>
        <p className="text-sm text-gray-400 mb-3 line-clamp-2">{project.description}</p>
        
        <div className="flex items-center justify-between">
          <span className={`px-2 py-1 rounded text-xs ${
            project.status === 'Completed' 
              ? 'bg-green-900/30 text-green-400 border border-green-700/30'
              : 'bg-yellow-900/30 text-yellow-400 border border-yellow-700/30'
          }`}>
            {project.status}
          </span>
          
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(project)}
              className="p-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
            >
              <Edit2 size={14} />
            </button>
            <button
              onClick={() => onDelete(project.id)}
              className="p-2 bg-red-600 hover:bg-red-700 rounded transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard  