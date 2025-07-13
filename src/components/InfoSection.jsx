import { Shield, AlertCircle } from 'lucide-react'

export default function InfoSection() {
  const infoItems = [
    'Les résidents algériens peuvent importer 1 véhicule d\'occasion tous les 3 ans',
    'Le véhicule doit avoir moins de 3 ans d\'âge',
    'Seuls les véhicules essence, hybrides et électriques sont autorisés',
    'Le calcul est basé sur la valeur CIF (Cost, Insurance, Freight)',
    'Les taxes peuvent varier selon les réglementations en vigueur'
  ]

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 md:p-8">
      <div className="flex items-center mb-4 md:mb-6">
        <Shield className="h-5 w-5 md:h-6 md:w-6 text-blue-600 mr-3" />
        <h3 className="text-lg md:text-xl font-bold text-gray-900">Informations importantes</h3>
      </div>
      
      <div className="space-y-3 md:space-y-4">
        {infoItems.map((item, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">{item}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 md:mt-8 p-4 md:p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm md:text-base font-semibold text-amber-800 mb-2">
              Avertissement Important
            </h4>
            <p className="text-xs md:text-sm text-amber-700 leading-relaxed">
              Ce calculateur est fourni à titre informatif uniquement. Les taxes et droits réels peuvent varier 
              selon les réglementations douanières en vigueur. Consultez toujours les autorités douanières 
              compétentes pour obtenir des informations officielles et à jour.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}