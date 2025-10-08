import React from 'react'

const DashboardStats = ({ projects }) => {
  const stats = [
    {
      title: 'Total Projects',
      value: projects.length,
      color: 'text-blue-400'
    },
    {
      title: 'Completed',
      value: projects.filter(p => p.status === 'Completed').length,
      color: 'text-green-400'
    },
    {
      title: 'In Progress',
      value: projects.filter(p => p.status === 'In Progress').length,
      color: 'text-yellow-400'
    },
    {
      title: 'Featured',
      value: projects.filter(p => p.featured).length,
      color: 'text-purple-400'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-sm text-gray-400 mb-2">{stat.title}</h3>
          <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  )
}

export default DashboardStats