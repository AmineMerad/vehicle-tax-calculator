import { Car, Moon, Sun } from 'lucide-react'

export default function Header({ darkMode, toggleDarkMode }) {
  return (
    <div className="relative overflow-hidden theme-bg-header theme-transition">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-32 h-32 bg-white/15 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-8 w-24 h-24 bg-white/15 rounded-full animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-8 left-20 w-20 h-20 bg-white/15 rounded-full animate-pulse animation-delay-4000"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/15 rounded-full animate-pulse animation-delay-1000"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 px-4 py-12 sm:py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Dark Mode Toggle */}
          <div className="flex justify-end mb-6 sm:mb-8">
            <button
              onClick={toggleDarkMode}
              className="p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 theme-text-inverse hover:bg-white/30 transition-all duration-300 group shadow-lg"
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
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-spin-slow opacity-30"></div>
              <div className="relative bg-white/20 backdrop-blur-sm p-4 sm:p-6 rounded-full border border-white/30 shadow-2xl">
                <Car className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 theme-text-inverse" />
              </div>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold theme-text-inverse mb-4 sm:mb-6 leading-tight">
            Calculateur de Taxation
            <span className="block bg-gradient-to-r from-white/90 to-white/70 bg-clip-text text-transparent">
              Véhicules d'Occasion
            </span>
          </h1>

          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold theme-text-inverse opacity-90 mb-4 sm:mb-6">
            Importation Algérie - Véhicules ≤ 3 ans
          </h2>

          <p className="text-base sm:text-lg md:text-xl theme-text-inverse opacity-80 max-w-3xl mx-auto leading-relaxed px-2">
            Estimez les droits de douane et taxes d'importation pour votre véhicule d'occasion 
            de moins de 3 ans vers l'Algérie. Outil d'estimation basé sur les données publiques disponibles.
          </p>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 120" className="w-full h-auto">
          <path
            fill="var(--bg-secondary)"
            className="theme-transition"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,106.7C960,117,1056,139,1152,133.3C1248,128,1344,96,1392,80L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      </div>
    </div>
  )
}