// src/hooks/useProjects.js
import { useState, useEffect, useCallback } from 'react';
import { 
  getProjects, 
  getProject, 
  addProject, 
  updateProject, 
  deleteProject,
  getProjectsByCategory 
} from '../services/projectService';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all projects
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const projectsData = await getProjects();
      setProjects(projectsData);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new project
  const createProject = useCallback(async (projectData) => {
    try {
      setError(null);
      const newProject = await addProject(projectData);
      
      // Add to local state
      setProjects(prevProjects => [newProject, ...prevProjects]);
      
      return newProject;
    } catch (err) {
      console.error('Error creating project:', err);
      setError(err.message || 'Failed to create project');
      throw err;
    }
  }, []);

  // Update existing project
  const editProject = useCallback(async (id, projectData) => {
    try {
      setError(null);
      const updatedProject = await updateProject(id, projectData);
      
      // Update local state
      setProjects(prevProjects => 
        prevProjects.map(project => 
          project.id === id 
            ? { id, ...updatedProject }
            : project
        )
      );
      
      return updatedProject;
    } catch (err) {
      console.error('Error updating project:', err);
      setError(err.message || 'Failed to update project');
      throw err;
    }
  }, []);

  // Delete project
  const removeProject = useCallback(async (id, imagePath) => {
    try {
      setError(null);
      await deleteProject(id, imagePath);
      
      // Remove from local state
      setProjects(prevProjects => 
        prevProjects.filter(project => project.id !== id)
      );
      
      return { success: true };
    } catch (err) {
      console.error('Error deleting project:', err);
      setError(err.message || 'Failed to delete project');
      throw err;
    }
  }, []);

  // Get single project
  const getProjectById = useCallback(async (id) => {
    try {
      setError(null);
      const project = await getProject(id);
      return project;
    } catch (err) {
      console.error('Error getting project:', err);
      setError(err.message || 'Failed to get project');
      throw err;
    }
  }, []);

  // Get projects by category
  const getProjectsByFilter = useCallback(async (category) => {
    try {
      setError(null);
      const filteredProjects = await getProjectsByCategory(category);
      return filteredProjects;
    } catch (err) {
      console.error('Error getting projects by category:', err);
      setError(err.message || 'Failed to get projects by category');
      throw err;
    }
  }, []);

  // Refresh projects (force reload)
  const refreshProjects = useCallback(async () => {
    await fetchProjects();
  }, [fetchProjects]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Stats helper functions
  const getProjectStats = useCallback(() => {
    const totalProjects = projects.length;
    const completedProjects = projects.filter(p => p.status === 'Completed').length;
    const inProgressProjects = projects.filter(p => p.status === 'In Progress').length;
    const featuredProjects = projects.filter(p => p.featured).length;
    
    // Get categories
    const categories = [...new Set(projects.map(p => p.category))];
    
    // Get years
    const years = [...new Set(projects.map(p => p.year))].sort((a, b) => b - a);
    
    return {
      total: totalProjects,
      completed: completedProjects,
      inProgress: inProgressProjects,
      featured: featuredProjects,
      categories: categories.length,
      years,
      categoryList: categories
    };
  }, [projects]);

  // Filter projects by various criteria
  const filterProjects = useCallback((filters) => {
    return projects.filter(project => {
      // Filter by category
      if (filters.category && project.category !== filters.category) {
        return false;
      }
      
      // Filter by status
      if (filters.status && project.status !== filters.status) {
        return false;
      }
      
      // Filter by year
      if (filters.year && project.year !== filters.year) {
        return false;
      }
      
      // Filter by featured
      if (filters.featured !== undefined && project.featured !== filters.featured) {
        return false;
      }
      
      // Search by title or description
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const title = (project.title || '').toLowerCase();
        const description = (project.description || '').toLowerCase();
        const technologies = (project.technologies || []).join(' ').toLowerCase();
        
        if (!title.includes(searchTerm) && 
            !description.includes(searchTerm) && 
            !technologies.includes(searchTerm)) {
          return false;
        }
      }
      
      return true;
    });
  }, [projects]);

  // Sort projects
  const sortProjects = useCallback((sortBy, sortOrder = 'desc') => {
    return [...projects].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      // Handle dates
      if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      // Handle strings
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [projects]);

  // Load projects on mount
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    // Data
    projects,
    loading,
    error,
    
    // Actions
    createProject,
    editProject,
    removeProject,
    refreshProjects,
    clearError,
    
    // Helpers
    getProjectById,
    getProjectsByFilter,
    getProjectStats,
    filterProjects,
    sortProjects,
    
    // Additional data
    stats: getProjectStats()
  };
};