// src/services/projectService.js
import { 
  ref as dbRef, 
  push, 
  set, 
  get, 
  remove,
  update
} from 'firebase/database';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { database, storage, auth } from '../firebase';
import { isAdmin } from '../assets/admin/info/Daftar';

const PROJECTS_REF = 'projects';

// Helper function to ensure user is authenticated and admin
const ensureAdminAuth = async () => {
  const user = auth.currentUser;
  
  if (!user) {
    throw new Error('Not authenticated. Please login again.');
  }
  
  if (!isAdmin(user.uid)) {
    throw new Error('Unauthorized. Admin access required.');
  }
  
  try {
    await user.getIdToken(true);
    return user;
  } catch (error) {
    console.error('Token refresh failed:', error);
    throw new Error('Authentication expired. Please login again.');
  }
};



// Upload project image with proper auth and save to project
export const uploadProjectImage = async (file, pathOrProjectId, imageType = 'gallery') => {
  console.log('📤 Starting upload:', file?.name);

  if (!file) {
    throw new Error('No file provided');
  }

  try {
    const user = await ensureAdminAuth();
    console.log('✅ Admin authenticated:', user.email);

    // Validate file
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File size exceeds 5MB limit');
    }

    const allowedTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 
      'application/pdf', 
      'application/vnd.ms-powerpoint', 
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type');
    }

    // Extract projectId from path
    let projectId;
    if (pathOrProjectId.includes('/')) {
      projectId = pathOrProjectId.split('/')[0];
    } else {
      projectId = pathOrProjectId;
    }

    // Create storage path
    const extension = file.name.split('.').pop();
    
    let fileName;
    if (pathOrProjectId.includes('/')) {
      fileName = `projects/${pathOrProjectId}/image_${Date.now()}.${extension}`;
    } else {
      fileName = `projects/${pathOrProjectId}/image_${Date.now()}.${extension}`;
    }
    
    console.log('📁 Upload path:', fileName);

    const storageRef = ref(storage, fileName);

    // Add metadata
    const metadata = {
      contentType: file.type,
      customMetadata: {
        uploadedBy: user.uid,
        uploadedByEmail: user.email,
        uploadedAt: new Date().toISOString(),
        originalPath: pathOrProjectId
      }
    };

    console.log('⬆️ Uploading to Firebase Storage...');
    const uploadResult = await uploadBytes(storageRef, file, metadata);
    console.log('✅ Upload complete');

    console.log('🔗 Getting download URL...');
    const downloadURL = await getDownloadURL(uploadResult.ref);
    console.log('✅ URL obtained');

    const imageData = {
      url: downloadURL,
      path: fileName,
      name: file.name,
      size: file.size,
      type: file.type
    };

   // Tidak perlu save metadata disini, hanya return data
console.log('✅ Upload complete, metadata will be saved with project');

return imageData;

  } catch (error) {
    console.error('❌ Upload failed:', error);

    if (error.code === 'storage/unauthorized') {
      throw new Error('Upload unauthorized. Please check Firebase Storage Rules and ensure you are logged in as admin.');
    } else if (error.code === 'storage/canceled') {
      throw new Error('Upload was canceled');
    } else if (error.code === 'storage/unknown') {
      throw new Error('Upload failed due to server error. Please try again.');
    } else if (error.code === 'auth/invalid-user-token') {
      throw new Error('Session expired. Please login again.');
    } else {
      throw new Error(error.message || 'Upload failed');
    }
  }
};

// Delete project image from both storage and project data
export const deleteProjectImage = async (imagePath, projectId, imageType = 'gallery', imageUrl = null) => {
  if (!imagePath) return;

  try {
    await ensureAdminAuth();

    // Delete from storage
    try {
      const imageRef = ref(storage, imagePath);
      await deleteObject(imageRef);
      console.log('🗑️ Image deleted from storage:', imagePath);
    } catch (storageError) {
      if (storageError.code === 'storage/object-not-found') {
        console.warn('⚠️ Image not found in storage, continuing with database cleanup');
      } else {
        throw storageError;
      }
    }

    // Delete from project data
    if (projectId) {
      const projectRef = dbRef(database, `${PROJECTS_REF}/${projectId}`);
      const snapshot = await get(projectRef);
      
      if (snapshot.exists()) {
        const projectData = snapshot.val();
        let updateData = {};
        
        if (imageType === 'covers') {
          updateData.coverImage = null;
        } else if (imageType === 'gallery') {
          const galleryImages = projectData.galleryImages || [];
          updateData.galleryImages = galleryImages.filter(img => 
            img.path !== imagePath && (!imageUrl || img.url !== imageUrl)
          );
        } else if (imageType === 'files') {
          const files = projectData.files || [];
          updateData.files = files.filter(file => 
            file.path !== imagePath && (!imageUrl || file.url !== imageUrl)
          );
        }
        
        updateData.updatedAt = new Date().toISOString();
        
        await update(projectRef, updateData);
        console.log('🗑️ Image metadata removed from project');
      }
    }
  } catch (error) {
    console.error('Delete image failed:', error);
    throw error;
  }
};

// Delete image from Firebase Storage (legacy support)
export const deleteImage = async (imagePath) => {
  if (!imagePath) return;

  try {
    await ensureAdminAuth();
    const imageRef = ref(storage, imagePath);
    await deleteObject(imageRef);
  } catch (error) {
    console.error('Delete image failed:', error);
  }
};

// Get project images from project data
export const getProjectImages = async (projectId, imageType = null) => {
  try {
    const projectRef = dbRef(database, `${PROJECTS_REF}/${projectId}`);
    const snapshot = await get(projectRef);

    if (snapshot.exists()) {
      const projectData = snapshot.val();
      
      if (imageType === 'covers') {
        return projectData.coverImage || null;
      } else if (imageType === 'gallery') {
        return projectData.galleryImages || [];
      } else if (imageType === 'files') {
        return projectData.files || [];
      } else {
        return {
          coverImage: projectData.coverImage || null,
          galleryImages: projectData.galleryImages || [],
          files: projectData.files || []
        };
      }
    } else {
      return imageType ? [] : { coverImage: null, galleryImages: [], files: [] };
    }
  } catch (error) {
    console.error('Get project images failed:', error);
    throw error;
  }
};

// Get single project
export const getProject = async (id) => {
  try {
    const projectRef = dbRef(database, `${PROJECTS_REF}/${id}`);
    const snapshot = await get(projectRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      return {
        id,
        ...data,
        createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
        updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
      };
    } else {
      throw new Error('Project not found');
    }
  } catch (error) {
    console.error('Get project failed:', error);
    throw error;
  }
};

// Get projects by category
export const getProjectsByCategory = async (category) => {
  try {
    const projects = await getProjects();
    return projects.filter(project => project.category === category);
  } catch (error) {
    console.error('Get projects by category failed:', error);
    throw error;
  }
};

// In projectService.js
export const addProject = async (projectData) => {
  try {
    const user = await ensureAdminAuth();

    // Sanitize data before saving
    const sanitizedData = {
      title: projectData.title || '',
      category: projectData.category || '',
      description: projectData.description || '',
      shortDescription: projectData.shortDescription || '',
      image: projectData.image || '',
      imagePath: projectData.imagePath || '',
      technologies: Array.isArray(projectData.technologies) 
        ? projectData.technologies 
        : projectData.technologies.split(',').map(t => t.trim()).filter(Boolean),
      keywords: Array.isArray(projectData.keywords)
        ? projectData.keywords
        : (projectData.keywords || '').split(',').map(k => k.trim()).filter(Boolean),
      status: projectData.status || 'In Progress',
      year: projectData.year || new Date().getFullYear().toString(),
      featured: Boolean(projectData.featured),
      
      // Add these fields
      coverImage: projectData.coverImage || null,
      coverImagePath: projectData.coverImagePath || null,
      galleryImages: projectData.images || [], // Change images to galleryImages
      files: projectData.files || [],
      
      createdBy: user.uid,
      createdByEmail: user.email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const projectsRef = dbRef(database, PROJECTS_REF);
    const newProjectRef = push(projectsRef);

    await set(newProjectRef, sanitizedData);

    return {
      id: newProjectRef.key,
      ...sanitizedData
    };
  } catch (error) {
    console.error('Add project failed:', error);
    throw error;
  }
};
// Update existing project
export const updateProject = async (id, projectData) => {
  try {
    const user = await ensureAdminAuth();

    const projectRef = dbRef(database, `${PROJECTS_REF}/${id}`);

    const snapshot = await get(projectRef);
    if (!snapshot.exists()) {
      throw new Error('Project not found');
    }

    const existingData = snapshot.val();
    
    // Preserve existing images if not provided in update
    const updatedData = {
      ...existingData,
      ...projectData,
      keywords: Array.isArray(projectData.keywords) 
        ? projectData.keywords 
        : (projectData.keywords || '').split(',').map(k => k.trim()).filter(Boolean),
      coverImage: projectData.coverImage !== undefined ? projectData.coverImage : existingData.coverImage,
      galleryImages: projectData.galleryImages !== undefined ? projectData.galleryImages : existingData.galleryImages,
      files: projectData.files !== undefined ? projectData.files : existingData.files,
      updatedBy: user.uid,
      updatedByEmail: user.email,
      updatedAt: new Date().toISOString(),
    };

    await set(projectRef, updatedData);

    return { id, ...updatedData };
  } catch (error) {
    console.error('Update project failed:', error);
    throw error;
  }
};

// Delete project
export const deleteProject = async (id, imagePath) => {
  try {
    await ensureAdminAuth();

    const projectRef = dbRef(database, `${PROJECTS_REF}/${id}`);

    const snapshot = await get(projectRef);
    if (!snapshot.exists()) {
      throw new Error('Project not found');
    }

    await remove(projectRef);

    if (imagePath) {
      await deleteImage(imagePath);
    }
  } catch (error) {
    console.error('Delete project failed:', error);
    throw error;
  }
};

// Get all projects
export const getProjects = async () => {
  try {
    const projectsRef = dbRef(database, PROJECTS_REF);
    const snapshot = await get(projectsRef);

    if (snapshot.exists()) {
      const projectsData = snapshot.val();

      const projects = Object.entries(projectsData).map(([id, data]) => ({
        id,
        ...data,
        createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
        updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
      }));

      projects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      return projects;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Get projects failed:', error);
    throw error;
  }
};