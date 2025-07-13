import { Heart, Code, Globe } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center">
          {/* Main Credit */}
          <div className="flex items-center justify-center mb-4">
            <Code className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Développé avec 
              
              par <span className="font-semibold text-blue-600 dark:text-blue-400">Amine Merad</span>
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 max-w-2xl mx-auto">
            Outil professionnel de calcul des taxes d'importation véhicules - Algérie {currentYear}
            <br />
            Conforme aux réglementations douanières en vigueur
          </p>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Globe className="h-3 w-3 mr-1" />
              <span>République Algérienne Démocratique et Populaire</span>
            </div>
            <span>•</span>
            <span>Direction Générale des Douanes</span>
            <span>•</span>
            <span>Loi de Finances {currentYear}</span>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 italic">
              Les résultats de ce calculateur sont donnés à titre indicatif uniquement. 
              Consultez toujours les services douaniers officiels pour les calculs définitifs.
            </p>
          </div>

          {/* Copyright */}
          <div className="mt-4">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              © {currentYear} - Calculateur de Taxation Véhicules. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}