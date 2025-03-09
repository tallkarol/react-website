// filepath: b:\Sonder\react-website\src\App.tsx

import Header from './components/Header'
import MainContent from './components/MainContent'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <MainContent />
      <Footer />
    </div>
  )
}

export default App