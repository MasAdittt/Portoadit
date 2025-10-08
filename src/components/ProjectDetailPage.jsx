// import React from 'react'
// import { ExternalLink, Github, Eye, Calendar, Tag, Star, ArrowLeft, X, Check, Users, Clock } from 'lucide-react'
// import { useParams, useNavigate } from 'react-router-dom'
// import { projects } from './projectsData'

// export const ProjectDetailPage = () => {
//   const { id } = useParams()
//   const navigate = useNavigate()
//   const selectedProject = projects.find(p => p.id === parseInt(id))

//   if (!selectedProject) {
//     return <div>Project not found</div>
//   }

//   const handleBackToList = () => {
//     navigate('/')
//   }
//   const [selectedGalleryImage, setSelectedGalleryImage] = React.useState(null)

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
//     <section className="py-24 relative overflow-hidden bg-black text-white min-h-screen">
//       <div className="absolute inset-0 bg-gradient-to-b from-blue-800/20 via-black to-blue-900/15"></div>

//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <button
//           onClick={handleBackToList}
//           className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8 group"
//         >
//           <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
//           <span>Back to Projects</span>
//         </button>

//         <div className="mb-12">
//           <div className="flex items-center gap-3 mb-4">
//             {selectedProject.featured && (
//               <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-400 px-3 py-1 rounded-full text-sm border border-yellow-600/30">
//                 <Star size={14} fill="currentColor" />
//                 Featured
//               </div>
//             )}
//             <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full border ${getStatusColor(selectedProject.status)}`}>
//               <div className="w-2 h-2 rounded-full bg-current"></div>
//               {selectedProject.status}
//             </span>
//           </div>

//           <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
//             {selectedProject.title}
//           </h1>
//           <p className="text-xl text-gray-400 mb-6">
//             {selectedProject.description}
//           </p>

//           <div className="flex flex-wrap gap-4 text-sm text-gray-400">
//             <div className="flex items-center gap-2">
//               <Calendar size={16} className="text-blue-400" />
//               <span>{selectedProject.year}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <Clock size={16} className="text-blue-400" />
//               <span>{selectedProject.duration}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <Users size={16} className="text-blue-400" />
//               <span>{selectedProject.role}</span>
//             </div>
//           </div>
//         </div>

//         <div className="mb-12 rounded-xl overflow-hidden">
//           <img 
//             src={selectedProject.image} 
//             alt={selectedProject.title}
//             className="w-full h-96 object-cover"
//           />
//         </div>

//         <div className="flex flex-wrap gap-4 mb-12">
//           <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
//             <ExternalLink size={18} />
//             Visit Live Site
//           </button>
//           <button className="flex items-center gap-2 border border-gray-700 hover:border-blue-400 text-gray-300 hover:text-blue-400 px-6 py-3 rounded-lg font-medium transition-all duration-300">
//             <Github size={18} />
//             View Source Code
//           </button>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8 mb-12">
//           <div className="lg:col-span-2 space-y-8">
//             <div className="bg-gradient-to-b from-gray-900/50 to-gray-800/30 rounded-xl p-6 border border-gray-700/30">
//               <h2 className="text-2xl font-bold text-white mb-4">Project Overview</h2>
//               <p className="text-gray-400 leading-relaxed">
//                 {selectedProject.fullDescription}
//               </p>
//             </div>

//             <div className="bg-gradient-to-b from-gray-900/50 to-gray-800/30 rounded-xl p-6 border border-gray-700/30">
//               <h2 className="text-2xl font-bold text-white mb-4">Key Features</h2>
//               <ul className="space-y-3">
//                 {selectedProject.features.map((feature, index) => (
//                   <li key={index} className="flex items-start gap-3 text-gray-400">
//                     <div className="mt-1">
//                       <Check size={18} className="text-green-400" />
//                     </div>
//                     <span>{feature}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="bg-gradient-to-b from-gray-900/50 to-gray-800/30 rounded-xl p-6 border border-gray-700/30">
//               <h2 className="text-2xl font-bold text-white mb-4">Gallery</h2>
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                 {selectedProject.gallery.map((img, index) => (
//                   <div 
//                     key={index}
//                     onClick={() => setSelectedGalleryImage(img)}
//                     className="relative h-40 rounded-lg overflow-hidden cursor-pointer group"
//                   >
//                     <img 
//                       src={img} 
//                       alt={`Gallery ${index + 1}`}
//                       className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//                     />
//                     <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                       <Eye size={24} className="text-white" />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="bg-gradient-to-b from-gray-900/50 to-gray-800/30 rounded-xl p-6 border border-gray-700/30">
//                 <h3 className="text-xl font-bold text-white mb-3">Challenges</h3>
//                 <p className="text-gray-400 text-sm leading-relaxed">
//                   {selectedProject.challenges}
//                 </p>
//               </div>
//               <div className="bg-gradient-to-b from-gray-900/50 to-gray-800/30 rounded-xl p-6 border border-gray-700/30">
//                 <h3 className="text-xl font-bold text-white mb-3">Outcome</h3>
//                 <p className="text-gray-400 text-sm leading-relaxed">
//                   {selectedProject.outcome}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-6">
//             <div className="bg-gradient-to-b from-gray-900/50 to-gray-800/30 rounded-xl p-6 border border-gray-700/30">
//               <h3 className="text-xl font-bold text-white mb-4">Project Info</h3>
//               <div className="space-y-4">
//                 <div>
//                   <p className="text-gray-500 text-sm mb-1">Client</p>
//                   <p className="text-white font-medium">{selectedProject.client}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500 text-sm mb-1">Category</p>
//                   <p className="text-white font-medium">{selectedProject.category}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500 text-sm mb-1">Duration</p>
//                   <p className="text-white font-medium">{selectedProject.duration}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500 text-sm mb-1">Year</p>
//                   <p className="text-white font-medium">{selectedProject.year}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-gradient-to-b from-gray-900/50 to-gray-800/30 rounded-xl p-6 border border-gray-700/30">
//               <h3 className="text-xl font-bold text-white mb-4">Technologies</h3>
//               <div className="flex flex-wrap gap-2">
//                 {selectedProject.technologies.map((tech, index) => (
//                   <span 
//                     key={index}
//                     className="px-3 py-2 text-sm bg-blue-900/30 text-blue-300 rounded-lg border border-blue-700/30"
//                   >
//                     {tech}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {selectedGalleryImage && (
//         <div 
//           className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
//           onClick={() => setSelectedGalleryImage(null)}
//         >
//           <button 
//             className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
//             onClick={() => setSelectedGalleryImage(null)}
//           >
//             <X size={32} />
//           </button>
//           <img 
//             src={selectedGalleryImage} 
//             alt="Gallery"
//             className="max-w-full max-h-full object-contain rounded-lg"
//           />
//         </div>
//       )}
//     </section>
//   )
// }