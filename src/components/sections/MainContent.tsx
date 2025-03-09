// filepath: b:\Sonder\react-website\src\components\MainContent.tsx
import React from 'react'

const MainContent: React.FC = () => {
  return (
    <main className="flex-grow flex flex-col items-center justify-center p-4">
      <p className="text-gray-700 text-lg mb-4">
        This is a simple homepage built with React and TailwindCSS v4.
      </p>
      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Get Started
      </button>
    </main>
  )
}

export default MainContent