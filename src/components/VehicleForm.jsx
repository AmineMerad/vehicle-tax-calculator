import { useState } from 'react'
import { Calculator, AlertCircle, Info, Euro, Settings } from 'lucide-react'

export default function VehicleForm({ formData, onInputChange, onSubmit, errors, isCalculating }) {
  const [showTooltip, setShowTooltip] = useState(null)

  const fieldInfo = {
    vehicleValue: {
      title: "Valeur CIF",
      description: "Cost, Insurance, Freight - Valeur totale du véhicule rendu au port algérien",
      example: "Exemple: 25 000 EUR"
    },
    engineType: {
      title: "Type de moteur",
      description: "Type de carburant utilisé par le véhicule",
      example: "Diesel interdit pour particuliers"
    },
    engineDisplacement: {
      title: "Cylindrée",
      description: "Volume total des cylindres du moteur",
      example: "Exemple: 1600 cm³"
    },
    vehicleAge: {
      title: "Âge du véhicule",
      description: "Âge depuis la première mise en circulation",
      example: "Maximum 36 mois autorisé"
    },
    exchangeRate: {
      title: "Taux de change",
      description: "Taux officiel EUR/DZD de la Banque d'Algérie",
      example: "Valeur par défaut: 146.68 DZD"
    },
    vehicleCategory: {
      title: "Catégorie",
      description: "Classification du véhicule selon son usage",
      example: "Particulier ou commercial"
    }
  }

  const Tooltip = ({ field, children }) => (
    <div className="relative group">
      {children}
      <button
        type="button"
        className="ml-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        onMouseEnter={() => setShowTooltip(field)}
        onMouseLeave={() => setShowTooltip(null)}
        onClick={(e) => {
          e.preventDefault()
          setShowTooltip(showTooltip === field ? null : field)
        }}
      >
        <Info className="h-4 w-4 text-gray-400 hover:text-blue-500" />
      </button>
      {showTooltip === field && (
        <div className="absolute z-50 w-72 p-4 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-xl">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{fieldInfo[field].title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{fieldInfo[field].description}</p>
          <p className="text-xs text-blue-600 dark:text-blue-400">{fieldInfo[field].example}</p>
        </div>
      )}
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 px-8 py-6 border-b border-gray-100 dark:border-gray-600">
          <div className="flex items-center">
            <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Informations du Véhicule</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Remplissez tous les champs pour calculer les taxes</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Vehicle Value */}
            <div className="group">
              <div className="flex items-center mb-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <Euro className="inline h-4 w-4 mr-2" />
                  Valeur CIF du véhicule (EUR) *
                </label>
                <Tooltip field="vehicleValue" />
              </div>
              <div className="relative">
                <input
                  type="number"
                  name="vehicleValue"
                  step="0.01"
                  placeholder="Ex: 25000"
                  value={formData.vehicleValue}
                  onChange={onInputChange}
                  required
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4 ${
                    errors.vehicleValue
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 focus:border-blue-500 focus:ring-blue-100 dark:focus:ring-blue-900'
                  }`}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <span className="text-gray-400 text-sm font-medium">EUR</span>
                </div>
                {errors.vehicleValue && (
                  <div className="absolute -bottom-6 left-0 flex items-center text-red-500 text-xs">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.vehicleValue}
                  </div>
                )}
              </div>
            </div>

            {/* Engine Type */}
            <div className="group">
              <div className="flex items-center mb-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <Settings className="inline h-4 w-4 mr-2" />
                  Type de moteur *
                </label>
                <Tooltip field="engineType" />
              </div>
              <div className="relative">
                <select
                  name="engineType"
                  value={formData.engineType}
                  onChange={onInputChange}
                  required
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white appearance-none cursor-pointer focus:outline-none focus:ring-4 ${
                    errors.engineType
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 focus:border-blue-500 focus:ring-blue-100 dark:focus:ring-blue-900'
                  }`}
                >
                  <option value="">Sélectionnez le type de moteur</option>
                  <option value="gasoline">Essence</option>
                  <option value="hybrid">Hybride</option>
                  <option value="electric">Électrique</option>
                  <option value="diesel">Diesel (Non autorisé)</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {errors.engineType && (
                  <div className="absolute -bottom-6 left-0 flex items-center text-red-500 text-xs">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.engineType}
                  </div>
                )}
              </div>
            </div>

            {/* Engine Displacement */}
            <div className="group">
              <div className="flex items-center mb-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Cylindrée (cm³) *
                </label>
                <Tooltip field="engineDisplacement" />
              </div>
              <div className="relative">
                <input
                  type="number"
                  name="engineDisplacement"
                  placeholder="Ex: 1600"
                  value={formData.engineDisplacement}
                  onChange={onInputChange}
                  required
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4 ${
                    errors.engineDisplacement
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 focus:border-blue-500 focus:ring-blue-100 dark:focus:ring-blue-900'
                  }`}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <span className="text-gray-400 text-sm font-medium">cm³</span>
                </div>
                {errors.engineDisplacement && (
                  <div className="absolute -bottom-6 left-0 flex items-center text-red-500 text-xs">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.engineDisplacement}
                  </div>
                )}
              </div>
            </div>

            {/* Vehicle Age */}
            <div className="group">
              <div className="flex items-center mb-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Âge du véhicule (mois) *
                </label>
                <Tooltip field="vehicleAge" />
              </div>
              <div className="relative">
                <input
                  type="number"
                  name="vehicleAge"
                  min="0"
                  max="36"
                  placeholder="Ex: 18"
                  value={formData.vehicleAge}
                  onChange={onInputChange}
                  required
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4 ${
                    errors.vehicleAge
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 focus:border-blue-500 focus:ring-blue-100 dark:focus:ring-blue-900'
                  }`}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <span className="text-gray-400 text-sm font-medium">mois</span>
                </div>
                {errors.vehicleAge && (
                  <div className="absolute -bottom-6 left-0 flex items-center text-red-500 text-xs">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.vehicleAge}
                  </div>
                )}
              </div>
            </div>

            {/* Exchange Rate */}
            <div className="group">
              <div className="flex items-center mb-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Taux de change EUR/DZD
                </label>
                <Tooltip field="exchangeRate" />
              </div>
              <div className="relative">
                <input
                  type="number"
                  name="exchangeRate"
                  step="0.01"
                  placeholder="Défaut: 146.68"
                  value={formData.exchangeRate}
                  onChange={onInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4 ${
                    errors.exchangeRate
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 focus:border-blue-500 focus:ring-blue-100 dark:focus:ring-blue-900'
                  }`}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <span className="text-gray-400 text-sm font-medium">DZD</span>
                </div>
                {errors.exchangeRate && (
                  <div className="absolute -bottom-6 left-0 flex items-center text-red-500 text-xs">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.exchangeRate}
                  </div>
                )}
              </div>
            </div>

            {/* Vehicle Category */}
            <div className="group">
              <div className="flex items-center mb-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Catégorie de véhicule *
                </label>
                <Tooltip field="vehicleCategory" />
              </div>
              <div className="relative">
                <select
                  name="vehicleCategory"
                  value={formData.vehicleCategory}
                  onChange={onInputChange}
                  required
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white appearance-none cursor-pointer focus:outline-none focus:ring-4 ${
                    errors.vehicleCategory
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 focus:border-blue-500 focus:ring-blue-100 dark:focus:ring-blue-900'
                  }`}
                >
                  <option value="">Sélectionnez la catégorie</option>
                  <option value="passenger">Voiture particulière (≤ 9 places)</option>
                  <option value="commercial">Véhicule commercial (≤ 3.5 tonnes)</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {errors.vehicleCategory && (
                  <div className="absolute -bottom-6 left-0 flex items-center text-red-500 text-xs">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.vehicleCategory}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-12 text-center">
            <button
              type="submit"
              disabled={isCalculating}
              className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-12 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100 transition-all duration-300 flex items-center mx-auto text-lg"
            >
              {isCalculating ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Calcul en cours...
                </>
              ) : (
                <>
                  <Calculator className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                  Calculer les Taxes
                </>
              )}
              <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}