// import React, { useState, useEffect, useRef } from 'react'
// import { ExternalLink, Github, Eye, Calendar, Star } from 'lucide-react'
// import { useNavigate } from 'react-router-dom'
// import { projects } from './projectsData'

// function ProjectListPage() {
//   const categories = ["All", "Frontend Development", "Digital Marketing", "UI/UX Design"]
//   const [activeCategory, setActiveCategory] = useState("All")
//   const [filteredProjects, setFilteredProjects] = useState(projects)
//   const [hasAnimated, setHasAnimated] = useState(false)
//   const projectsRef = useRef(null)
//   const navigate = useNavigate()

//   useEffect(() => {
//     if (activeCategory === "All") {
//       setFilteredProjects(projects)
//     } else {
//       setFilteredProjects(projects.filter(project => project.category === activeCategory))
//     }
//   }, [activeCategory])

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting && !hasAnimated) {
//             setHasAnimated(true)
//           }
//         })
//       },
//       { threshold: 0.3 }
//     )

//     if (projectsRef.current) {
//       observer.observe(projectsRef.current)
//     }

//     return () => {
//       if (projectsRef.current) {
//         observer.unobserve(projectsRef.current)
//       }
//     }
//   }, [hasAnimated])

//   const handleProjectClick = (projectId) => {
//     navigate(`/project/${projectId}`)
//   }

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Completed":
//         return "text-green-400 bg-green-900/30 border-green-700/30"
//       case "In Progress":
//         return "text-yellow-400 bg-yellow-900/30 border-yellow-700/30"
//       default:
//         return "text-gray-400 bg-gray-900/30 border-gray-700/30"
//     }
//   }

//   return (
//     <section id="projects" className="py-24 relative overflow-hidden bg-black text-white">
//       <div className="absolute inset-0 bg-gradient-to-b from-blue-800/20 via-black to-blue-900/15"></div>
      
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
//         <div className="absolute bottom-10 right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute top-1/3 right-10 w-72 h-72 bg-blue-400/8 rounded-full blur-3xl animate-pulse delay-300"></div>
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-sm sm:text-base text-blue-400 font-medium tracking-wider uppercase mb-4">
//             My Work
//           </h2>
//           <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
//             Featured{' '}
//             <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
//               Projects
//             </span>
//           </h1>
//           <p className="text-lg text-gray-400 max-w-2xl mx-auto">
//             Explore my portfolio of creative solutions that blend functionality with aesthetic appeal
//           </p>
//         </div>

//         <div className="flex flex-wrap justify-center gap-4 mb-12">
//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => setActiveCategory(category)}
//               className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
//                 activeCategory === category
//                   ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25"
//                   : "bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 border border-gray-700/30"
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>

//         <div ref={projectsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredProjects.map((project) => (
//             <div
//               key={project.id}
//               onClick={() => handleProjectClick(project.id)}
//               className="group relative bg-gradient-to-b from-gray-900/50 to-gray-800/30 rounded-xl overflow-hidden border border-gray-700/30 hover:border-blue-600/40 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer"
//             >
//               {project.featured && (
//                 <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-400 px-3 py-1 rounded-full text-sm border border-yellow-600/30">
//                   <Star size={12} fill="currentColor" />
//                   Featured
//                 </div>
//               )}

//               <div className="relative h-48 overflow-hidden">
//                 <img 
//                   src={project.image} 
//                   alt={project.title}
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
//                 <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
//                   <div className="p-3 bg-blue-600/90 text-white rounded-full">
//                     <Eye size={18} />
//                   </div>
//                 </div>
//               </div>

//               <div className="p-6">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-sm text-blue-400 font-medium">{project.category}</span>
//                   <span className="flex items-center gap-1 text-sm text-gray-500">
//                     <Calendar size={12} />
//                     {project.year}
//                   </span>
//                 </div>

//                 <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
//                   {project.title}
//                 </h3>

//                 <p className="text-gray-400 text-sm leading-relaxed mb-4">
//                   {project.description}
//                 </p>

//                 <div className="mb-4">
//                   <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full border ${getStatusColor(project.status)}`}>
//                     <div className="w-2 h-2 rounded-full bg-current"></div>
//                     {project.status}
//                   </span>
//                 </div>

//                 <div className="flex flex-wrap gap-2">
//                   {project.technologies.slice(0, 3).map((tech, techIndex) => (
//                     <span 
//                       key={techIndex}
//                       className="px-2 py-1 text-xs bg-blue-900/30 text-blue-300 rounded border border-blue-700/30"
//                     >
//                       {tech}
//                     </span>
//                   ))}
//                   {project.technologies.length > 3 && (
//                     <span className="px-2 py-1 text-xs bg-gray-700/30 text-gray-400 rounded border border-gray-600/30">
//                       +{project.technologies.length - 3} more
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="text-center mt-16">
//           <p className="text-lg text-gray-300 mb-8">
//             Interested in seeing more of my work?
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//             <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 group">
//               <span className="flex items-center gap-2">
//                 <Github size={16} />
//                 View All Projects
//               </span>
//             </button>
//             <button className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 relative overflow-hidden group">
//               <span className="relative z-10 flex items-center gap-2">
//                 <ExternalLink size={16} />
//                 Visit GitHub
//               </span>
//               <div className="absolute inset-0 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default ProjectListPage