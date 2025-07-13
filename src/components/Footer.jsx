import { Heart, Code, Globe } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="theme-bg-accent border-t theme-border-primary py-6 sm:py-8 theme-transition">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          {/* Main Credit */}
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <Code className="h-5 w-5 theme-border-accent mr-2" />
            <p className="theme-text-primary text-sm">
              Développé avec 
              
              par <a 
                href="https://aminemerad.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-semibold theme-border-accent hover:underline transition-all duration-200 hover:opacity-80"
              >
                Amine Merad
              </a>
            </p>
          </div>

          {/* Description */}
          <p className="theme-text-secondary text-xs sm:text-sm mb-3 sm:mb-4 max-w-2xl mx-auto text-center">
            Calculateur de taxes d'importation véhicules - Algérie {currentYear}
            <br />
            Outil d'estimation basé sur les informations publiques disponibles
          </p>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs theme-text-muted">
            <div className="flex items-center">
              <Globe className="h-3 w-3 mr-1" />
              <span>Estimation informative</span>
            </div>
            <span>•</span>
            <span>Non officiel</span>
            <span>•</span>
            <span>Données publiques {currentYear}</span>
          </div>

          {/* Disclaimer */}
          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t theme-border-primary">
            <p className="text-xs theme-text-muted italic">
              Résultats à titre indicatif seulement. 
              Consultez les services douaniers officiels pour des informations précises et à jour.
            </p>
          </div>

          {/* Copyright */}
          <div className="mt-3 sm:mt-4">
            <p className="text-xs theme-text-muted">
              © {currentYear} - Calculateur de Taxation Véhicules. Outil d'estimation indépendant.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}