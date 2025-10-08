// src/hooks/useImageUpload.js
import { useState, useCallback } from 'react';
import { uploadProjectImage, deleteProjectImage, getProjectImages } from '../services/projectService';
import { auth } from '../firebase';

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  // Generate project-specific folder structure
  const generateProjectPath = useCallback((projectId, type = 'images') => {
    const timestamp = Date.now();
    return `${projectId}/${type}/${timestamp}`;
  }, []);

  // Create auto-generated cover from project data
  const generateCoverImage = useCallback(async (projectData) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = 800;
      canvas.height = 450;
      
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#1f2937');
      gradient.addColorStop(1, '#111827');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.beginPath();
        ctx.arc(x, y, Math.random() * 3, 0, 2 * Math.PI);
        ctx.fill();
      }
      
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 48px Inter, sans-serif';
      ctx.textAlign = 'center';
      const title = projectData.title || 'Untitled Project';
      ctx.fillText(title, canvas.width / 2, canvas.height / 2 - 50);
      
      const category = projectData.category || 'General';
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(canvas.width / 2 - 100, canvas.height / 2, 200, 40);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = '16px Inter, sans-serif';
      ctx.fillText(category, canvas.width / 2, canvas.height / 2 + 25);
      
      ctx.fillStyle = '#9ca3af';
      ctx.font = '24px Inter, sans-serif';
      const year = projectData.year || new Date().getFullYear();
      ctx.fillText(year, canvas.width / 2, canvas.height / 2 + 80);
      
      canvas.toBlob((blob) => {
        const file = new File([blob], `${title.replace(/\s+/g, '_')}_cover.png`, {
          type: 'image/png'
        });
        resolve(file);
      }, 'image/png', 0.9);
    });
  }, []);

  // Enhanced single image upload
  const uploadImage = useCallback(async (file, projectId, type = 'images', onProgress) => {
    if (!file) throw new Error('No file selected');
    
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Authentication required. Please login again.');
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File too large. Maximum size is 5MB');
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only JPG, PNG and WebP are allowed');
    }

    setUploading(true);
    setError(null);

    try {
      await user.getIdToken(true);

      const progressInterval = setInterval(() => {
        if (onProgress) {
          onProgress((prev) => Math.min(prev + 10, 90));
        }
      }, 150);

      const uploadPath = generateProjectPath(projectId, type);
      
      // Upload - sekarang langsung tersimpan ke project data
      const result = await uploadProjectImage(file, uploadPath, type);
      
      clearInterval(progressInterval);
      
      if (onProgress) {
        onProgress(100);
      }
      
      return {
        url: result.url,
        path: result.path,
        fullPath: result.path,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadPath: uploadPath
      };
    } catch (err) {
      setError(err.message);
      console.error('Image upload failed:', err);
      throw err;
    } finally {
      setUploading(false);
    }
  }, [generateProjectPath]);

  // Upload cover image with auto-generation option
  const uploadCoverImage = useCallback(async (file, projectId, projectData, onProgress, autoGenerate = false) => {
    try {
      let coverFile = file;
      
      if (!file || autoGenerate) {
        console.log('Generating auto cover for project:', projectData.title);
        coverFile = await generateCoverImage(projectData);
      }
      
      return await uploadImage(coverFile, projectId, 'covers', onProgress);
    } catch (err) {
      console.error('Cover upload failed:', err);
      throw err;
    }
  }, [uploadImage, generateCoverImage]);

  // Multiple images upload
  const uploadMultipleImages = useCallback(async (files, projectId, onProgress) => {
    if (!files || files.length === 0) throw new Error('No files selected');
    
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Authentication required. Please login again.');
    }

    setUploading(true);
    setError(null);

    try {
      for (const file of files) {
        if (file.size > 5 * 1024 * 1024) {
          throw new Error(`File ${file.name} is too large. Maximum size is 5MB`);
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
        if (!allowedTypes.includes(file.type)) {
          throw new Error(`Invalid file type for ${file.name}. Only JPG, PNG and WebP are allowed`);
        }
      }

      await user.getIdToken(true);

      const uploadPromises = files.map(async (file, index) => {
        const uploadId = `img_${Date.now()}_${index}`;
        
        const progressCallback = (progress) => {
          if (onProgress) {
            onProgress(uploadId, progress);
          }
        };

        const progressInterval = setInterval(() => {
          progressCallback((prev) => Math.min(prev + 8, 85));
        }, 200);

        try {
          const uploadPath = generateProjectPath(projectId, 'gallery');
          const result = await uploadProjectImage(file, uploadPath, 'gallery');
          
          clearInterval(progressInterval);
          progressCallback(100);

          return {
            id: uploadId,
            url: result.url,
            path: result.path,
            fullPath: result.path,
            name: file.name,
            size: file.size,
            type: file.type,
            uploadPath: uploadPath
          };
        } catch (error) {
          clearInterval(progressInterval);
          throw error;
        }
      });

      const results = await Promise.all(uploadPromises);
      return results;

    } catch (err) {
      setError(err.message);
      console.error('Multiple images upload failed:', err);
      throw err;
    } finally {
      setUploading(false);
    }
  }, [generateProjectPath]);

  // File upload
  const uploadFile = useCallback(async (file, projectId, onProgress) => {
    if (!file) throw new Error('No file selected');
    
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Authentication required. Please login again.');
    }

    if (file.size > 10 * 1024 * 1024) {
      throw new Error('File too large. Maximum size is 10MB');
    }

    const allowedTypes = [
      'application/pdf',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only PDF, PPT and PPTX are allowed');
    }

    setUploading(true);
    setError(null);

    try {
      await user.getIdToken(true);

      const progressInterval = setInterval(() => {
        if (onProgress) {
          onProgress((prev) => Math.min(prev + 5, 90));
        }
      }, 300);

      const uploadPath = generateProjectPath(projectId, 'files');
      const result = await uploadProjectImage(file, uploadPath, 'files');
      
      clearInterval(progressInterval);
      
      if (onProgress) {
        onProgress(100);
      }

      return {
        url: result.url,
        path: result.path,
        fullPath: result.path,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadPath: uploadPath
      };

    } catch (err) {
      setError(err.message);
      console.error('File upload failed:', err);
      throw err;
    } finally {
      setUploading(false);
    }
  }, [generateProjectPath]);

  // Multiple files upload
  const uploadMultipleFiles = useCallback(async (files, projectId, onProgress) => {
    if (!files || files.length === 0) throw new Error('No files selected');
    
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Authentication required. Please login again.');
    }

    setUploading(true);
    setError(null);

    try {
      const allowedTypes = [
        'application/pdf',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      ];

      for (const file of files) {
        if (file.size > 10 * 1024 * 1024) {
          throw new Error(`File ${file.name} is too large. Maximum size is 10MB`);
        }

        if (!allowedTypes.includes(file.type)) {
          throw new Error(`Invalid file type for ${file.name}. Only PDF, PPT and PPTX are allowed`);
        }
      }

      await user.getIdToken(true);

      const uploadPromises = files.map(async (file, index) => {
        const uploadId = `file_${Date.now()}_${index}`;
        
        const progressCallback = (progress) => {
          if (onProgress) {
            onProgress(uploadId, progress);
          }
        };

        const progressInterval = setInterval(() => {
          progressCallback((prev) => Math.min(prev + 6, 85));
        }, 250);

        try {
          const uploadPath = generateProjectPath(projectId, 'files');
          const result = await uploadProjectImage(file, uploadPath, 'files');
          
          clearInterval(progressInterval);
          progressCallback(100);

          return {
            id: uploadId,
            url: result.url,
            path: result.path,
            fullPath: result.path,
            name: file.name,
            size: file.size,
            type: file.type,
            uploadPath: uploadPath
          };
        } catch (error) {
          clearInterval(progressInterval);
          throw error;
        }
      });

      const results = await Promise.all(uploadPromises);
      return results;

    } catch (err) {
      setError(err.message);
      console.error('Multiple files upload failed:', err);
      throw err;
    } finally {
      setUploading(false);
    }
  }, [generateProjectPath]);

  // Get project images from project data
  const getImages = useCallback(async (projectId, imageType = null) => {
    try {
      const images = await getProjectImages(projectId, imageType);
      return images;
    } catch (err) {
      console.error('Failed to get images:', err);
      throw err;
    }
  }, []);

  // Remove individual item
  const removeItem = useCallback(async (itemPath, projectId, imageType = 'gallery', imageUrl = null) => {
    if (!itemPath) return { success: true };

    const user = auth.currentUser;
    if (!user) {
      throw new Error('Authentication required');
    }

    try {
      setError(null);
      await user.getIdToken(true);
      
      // Delete from both storage and project data
      await deleteProjectImage(itemPath, projectId, imageType, imageUrl);
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      console.error('Failed to delete item:', err);
      return { success: false, error: err.message };
    }
  }, []);

  // Delete entire project folder
  const deleteProjectFolder = useCallback(async (projectId) => {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Authentication required');
    }

    try {
      setError(null);
      await user.getIdToken(true);
      
      const projectPath = `projects/${projectId}`;
      console.log('Would delete entire folder:', projectPath);
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      console.error('Failed to delete project folder:', err);
      return { success: false, error: err.message };
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Check authentication status
  const checkAuth = useCallback(() => {
    const user = auth.currentUser;
    return !!user;
  }, []);

  return {
    uploadImage,
    uploadCoverImage,
    uploadFile,
    uploadMultipleImages,
    uploadMultipleFiles,
    getImages,
    removeItem,
    deleteProjectFolder,
    generateProjectPath,
    generateCoverImage,
    uploading,
    error,
    clearError,
    checkAuth
  };
};