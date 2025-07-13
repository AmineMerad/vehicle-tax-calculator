import { Car, Moon, Sun } from 'lucide-react'

export default function Header({ darkMode, toggleDarkMode }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-32 h-32 bg-blue-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-8 w-24 h-24 bg-indigo-400/20 rounded-full animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-8 left-20 w-20 h-20 bg-purple-400/20 rounded-full animate-pulse animation-delay-4000"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-cyan-400/20 rounded-full animate-pulse animation-delay-1000"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 px-4 py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Dark Mode Toggle */}
          <div className="flex justify-end mb-8">
            <button
              onClick={toggleDarkMode}
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 group-hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon className="h-5 w-5 group-hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>
          </div>

          {/* Logo and Title */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-spin-slow opacity-30"></div>
              <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-full border border-white/20 shadow-2xl">
                <Car className="h-12 w-12 md:h-16 md:w-16 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Calculateur de
            <span className="block bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
              Taxation Véhicules
            </span>
          </h1>

          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-blue-100 mb-6">
            Importation en Algérie
          </h2>

          <p className="text-lg md:text-xl text-blue-100/90 max-w-3xl mx-auto leading-relaxed">
            Calculez instantanément et précisément tous les droits de douane, taxes et frais 
            d'importation pour votre véhicule avec notre outil professionnel certifié.
          </p>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 120" className="w-full h-auto">
          <path
            fill="currentColor"
            className="text-gray-50 dark:text-gray-900"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,106.7C960,117,1056,139,1152,133.3C1248,128,1344,96,1392,80L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      </div>
    </div>
  )
}