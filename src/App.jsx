import { useState } from 'react'
import { Calculator, Car, Zap, Shield, TrendingUp, CheckCircle } from 'lucide-react'

function App() {
  const [formData, setFormData] = useState({
    vehicleValue: '',
    engineType: '',
    engineDisplacement: '',
    vehicleAge: '',
    exchangeRate: 146.68,
    vehicleCategory: ''
  })
  
  const [results, setResults] = useState(null)
  const [showResults, setShowResults] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (name === 'engineType' && value === 'diesel') {
      alert('Attention: Les véhicules diesel ne sont pas autorisés à l\'importation pour les particuliers en Algérie.')
    }
  }

  const calculateTaxes = (e) => {
    e.preventDefault()
    
    const vehicleValue = parseFloat(formData.vehicleValue)
    const engineType = formData.engineType
    const engineDisplacement = parseInt(formData.engineDisplacement)
    const vehicleAge = parseInt(formData.vehicleAge)
    const exchangeRate = parseFloat(formData.exchangeRate) || 146.68
    const vehicleCategory = formData.vehicleCategory

    if (!vehicleValue || !engineType || !engineDisplacement || vehicleAge === '' || !vehicleCategory) {
      alert('Veuillez remplir tous les champs obligatoires')
      return
    }

    if (vehicleAge > 36) {
      alert('Les véhicules de plus de 36 mois ne sont pas autorisés à l\'importation')
      return
    }

    if (engineType === 'diesel') {
      alert('Les véhicules diesel ne sont pas autorisés à l\'importation pour les particuliers')
      return
    }

    const valueInDZD = vehicleValue * exchangeRate

    let customsDuty = 0
    let tic = 0

    if (engineType === 'electric') {
      customsDuty = valueInDZD * 0.30
      tic = 0
    } else if (engineType === 'gasoline' || engineType === 'hybrid') {
      if (engineDisplacement < 1800) {
        customsDuty = valueInDZD * 0.15
      } else {
        customsDuty = valueInDZD * 0.30
      }
      
      if (engineDisplacement <= 2000) {
        tic = valueInDZD * 0.30
      } else if (engineDisplacement <= 3000) {
        tic = valueInDZD * 0.60
      } else {
        tic = valueInDZD * 0.90
      }
    }

    const prct = valueInDZD * 0.02
    const tcs = valueInDZD * 0.02
    const vat = (valueInDZD + customsDuty + tic + prct + tcs) * 0.19

    const totalBeforeDiscount = customsDuty + tic + prct + tcs + vat

    let discount = 0
    let discountPercentage = 0
    let discountText = ''

    if (engineType === 'electric') {
      discountPercentage = 80
      discountText = 'Réduction de 80% pour véhicule électrique'
    } else if (engineType === 'gasoline' || engineType === 'hybrid') {
      if (engineDisplacement <= 1800) {
        discountPercentage = 50
        discountText = 'Réduction de 50% pour véhicule ≤ 1800cc'
      } else {
        discountPercentage = 20
        discountText = 'Réduction de 20% pour véhicule > 1800cc'
      }
    }

    discount = totalBeforeDiscount * (discountPercentage / 100)
    const totalAfterDiscount = totalBeforeDiscount - discount

    setResults({
      customsDuty,
      tic,
      prct,
      tcs,
      vat,
      totalBeforeDiscount,
      discount,
      totalAfterDiscount,
      discountPercentage,
      discountText,
      valueInDZD
    })
    setShowResults(true)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-DZ', {
      style: 'currency',
      currency: 'DZD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-32 h-32 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-spin-slow opacity-20"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full shadow-lg">
                <Car className="h-10 w-10 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Calculateur de Taxation
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Véhicules d'Importation
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Calculez instantanément les droits de douane et taxes pour l'importation de véhicules en Algérie avec notre outil moderne et précis
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8 mb-8 transform hover:scale-[1.01] transition-all duration-300">
          <div className="flex items-center mb-6">
            <Calculator className="h-6 w-6 text-blue-600 mr-3" />
            <h3 className="text-xl font-semibold text-gray-800">Informations du Véhicule</h3>
          </div>
          
          <form onSubmit={calculateTaxes} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                  💰 Valeur CIF du véhicule (EUR) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="vehicleValue"
                    step="0.01"
                    placeholder="25000"
                    value={formData.vehicleValue}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white text-lg"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <span className="text-gray-400 text-sm">EUR</span>
                  </div>
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                  ⚡ Type de moteur *
                </label>
                <select
                  name="engineType"
                  value={formData.engineType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white text-lg appearance-none cursor-pointer"
                >
                  <option value="">Sélectionnez le type de moteur</option>
                  <option value="gasoline">🛣️ Essence</option>
                  <option value="hybrid">🔋 Hybride</option>
                  <option value="electric">⚡ Électrique</option>
                  <option value="diesel">⛽ Diesel (Non autorisé)</option>
                </select>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                  🏎️ Cylindrée (cm³) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="engineDisplacement"
                    placeholder="1600"
                    value={formData.engineDisplacement}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white text-lg"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <span className="text-gray-400 text-sm">cm³</span>
                  </div>
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                  📅 Âge du véhicule (mois) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="vehicleAge"
                    min="0"
                    max="36"
                    placeholder="18"
                    value={formData.vehicleAge}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white text-lg"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <span className="text-gray-400 text-sm">mois</span>
                  </div>
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                  💱 Taux de change EUR/DZD
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="exchangeRate"
                    step="0.01"
                    placeholder="146.68"
                    value={formData.exchangeRate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white text-lg"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <span className="text-gray-400 text-sm">DZD</span>
                  </div>
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                  🚗 Catégorie de véhicule *
                </label>
                <select
                  name="vehicleCategory"
                  value={formData.vehicleCategory}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white text-lg appearance-none cursor-pointer"
                >
                  <option value="">Sélectionnez la catégorie</option>
                  <option value="passenger">🚙 Voiture particulière (≤ 9 places)</option>
                  <option value="commercial">🚚 Véhicule commercial (≤ 3.5 tonnes)</option>
                </select>
              </div>
            </div>

            <div className="text-center pt-6">
              <button
                type="submit"
                className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-12 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center mx-auto text-lg"
              >
                <Calculator className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                Calculer les Taxes
                <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        {showResults && results && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Résultats du Calcul</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="text-sm text-gray-600">Valeur en douane</div>
                <div className="text-lg font-semibold text-gray-900">
                  {formatCurrency(results.valueInDZD)}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <div className="text-sm text-gray-600">Droits de douane</div>
                <div className="text-lg font-semibold text-gray-900">
                  {formatCurrency(results.customsDuty)}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <div className="text-sm text-gray-600">Taxe intérieure (TIC)</div>
                <div className="text-lg font-semibold text-gray-900">
                  {formatCurrency(results.tic)}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <div className="text-sm text-gray-600">TVA (19%)</div>
                <div className="text-lg font-semibold text-gray-900">
                  {formatCurrency(results.vat)}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <div className="text-sm text-gray-600">PRCT (2%)</div>
                <div className="text-lg font-semibold text-gray-900">
                  {formatCurrency(results.prct)}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <div className="text-sm text-gray-600">TCS (2%)</div>
                <div className="text-lg font-semibold text-gray-900">
                  {formatCurrency(results.tcs)}
                </div>
              </div>
            </div>

            {results.discount > 0 && (
              <div className="bg-green-50 border border-green-200 p-4 rounded-md mb-4">
                <div className="text-sm text-green-700 font-medium">
                  Réduction ({results.discountPercentage}%): -{formatCurrency(results.discount)}
                </div>
                <div className="text-sm text-green-600">{results.discountText}</div>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 p-6 rounded-md text-center">
              <div className="text-lg font-medium text-blue-900 mb-2">
                Total des taxes et droits à payer
              </div>
              <div className="text-3xl font-bold text-blue-600">
                {formatCurrency(results.totalAfterDiscount)}
              </div>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Informations importantes</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Les résidents algériens peuvent importer 1 véhicule d'occasion tous les 3 ans</p>
            <p>• Le véhicule doit avoir moins de 3 ans d'âge</p>
            <p>• Seuls les véhicules essence, hybrides et électriques sont autorisés</p>
            <p>• Le calcul est basé sur la valeur CIF (Cost, Insurance, Freight)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App