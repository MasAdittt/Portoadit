// Mock data untuk development
export const mockProjects = [
  {
    id: '1',
    title: "E-Commerce Platform",
    category: "Frontend Development",
    description: "A modern e-commerce platform built with React and Tailwind CSS, featuring responsive design, shopping cart functionality, and payment integration.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb",
    technologies: ["React", "Tailwind CSS", "JavaScript", "API Integration"],
    status: "Completed",
    year: "2024",
    featured: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: "Digital Marketing Dashboard",
    category: "Digital Marketing",
    description: "Analytics dashboard for tracking social media campaigns, SEO performance, and content marketing metrics with real-time data visualization.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb",
    technologies: ["Analytics", "SEO", "Content Strategy", "Data Visualization"],
    status: "In Progress",
    year: "2024",
    featured: true,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10')
  },
  {
    id: '3',
    title: "Mobile Banking App UI",
    category: "UI/UX Design",
    description: "Clean and intuitive mobile banking application interface design with focus on user experience and accessibility.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb",
    technologies: ["Figma", "Prototyping", "User Research", "Accessibility"],
    status: "Completed",
    year: "2024",
    featured: false,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05')
  },
  {
    id: '4',
    title: "REST API Backend",
    category: "Backend Development", 
    description: "Scalable REST API built with Node.js and Express, featuring authentication, database integration, and comprehensive documentation.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb",
    technologies: ["Node.js", "Express", "MongoDB", "JWT"],
    status: "In Progress",
    year: "2024",
    featured: false,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  }
]

export const mockContentItems = [
  {
    id: 1,
    title: "About Me Page",
    type: "Page",
    status: "Published",
    lastModified: "2024-01-15",
    author: "Admin",
    content: "Personal information and professional background...",
    slug: "about"
  },
  {
    id: 2,
    title: "Latest Web Development Trends",
    type: "Blog Post",
    status: "Draft",
    lastModified: "2024-01-20",
    author: "Admin",
    content: "Exploring the latest trends in web development...",
    slug: "web-development-trends-2024"
  },
  {
    id: 3,
    title: "Contact Information",
    type: "Page",
    status: "Published",
    lastModified: "2024-01-10",
    author: "Admin",
    content: "How to get in touch with me...",
    slug: "contact"
  },
  {
    id: 4,
    title: "Portfolio Showcase",
    type: "Page",
    status: "Published",
    lastModified: "2024-01-12",
    author: "Admin",
    content: "Showcase of my best projects...",
    slug: "portfolio"
  },
  {
    id: 5,
    title: "Getting Started with React Hooks",
    type: "Blog Post",
    status: "Published",
    lastModified: "2024-01-18",
    author: "Admin",
    content: "A comprehensive guide to React Hooks...",
    slug: "react-hooks-guide"
  }
]

export const mockCategories = [
  "Frontend Development",
  "Backend Development", 
  "UI/UX Design",
  "Digital Marketing",
  "Mobile Development",
  "DevOps"
]

export const mockStatuses = [
  "Completed",
  "In Progress", 
  "Planned",
  "On Hold",
  "Cancelled"
]

export const mockSettings = {
  siteName: 'My Portfolio',
  siteDescription: 'Personal portfolio showcasing web development and design projects',
  adminName: 'John Doe',
  adminEmail: 'john.doe@example.com',
  theme: 'dark',
  language: 'en',
  colorScheme: 'blue',
  enableComments: true,
  enableAnalytics: true,
  maintenanceMode: false,
  socialMedia: {
    github: 'https://github.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
    twitter: 'https://twitter.com/johndoe',
    instagram: 'https://instagram.com/johndoe'
  },
  contact: {
    email: 'contact@johndoe.com',
    phone: '+1-234-567-8900',
    location: 'San Francisco, CA'
  }
}

// Helper functions
export const getProjectsByStatus = (projects, status) => {
  return projects.filter(project => project.status === status)
}

export const getFeaturedProjects = (projects) => {
  return projects.filter(project => project.featured)
}

export const getProjectsByCategory = (projects, category) => {
  return projects.filter(project => project.category === category)
}

export const getRecentProjects = (projects, limit = 5) => {
  return projects
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, limit)
}

export const searchProjects = (projects, searchTerm) => {
  const term = searchTerm.toLowerCase()
  return projects.filter(project => 
    project.title.toLowerCase().includes(term) ||
    project.description.toLowerCase().includes(term) ||
    project.category.toLowerCase().includes(term) ||
    project.technologies.some(tech => tech.toLowerCase().includes(term))
  )
}