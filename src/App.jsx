import { useState, useEffect } from 'react'
import Header from './components/Header'
import VehicleForm from './components/VehicleForm'
import ResultsDisplay from './components/ResultsDisplay'
import InfoPanel from './components/InfoPanel'
import Footer from './components/Footer'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  const [formData, setFormData] = useState({
    vehicleValue: '',
    engineType: '',
    engineDisplacement: '',
    vehicleAge: '',
    exchangeRate: '',
    vehicleCategory: ''
  })
  
  const [results, setResults] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const [errors, setErrors] = useState({})
  const [isCalculating, setIsCalculating] = useState(false)

  // Dark mode effect
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const validateForm = (data) => {
    const newErrors = {}

    if (!data.vehicleValue || parseFloat(data.vehicleValue) <= 0) {
      newErrors.vehicleValue = 'Valeur requise et doit être positive'
    }

    if (!data.engineType) {
      newErrors.engineType = 'Type de moteur requis'
    }

    if (!data.engineDisplacement || parseInt(data.engineDisplacement) <= 0) {
      newErrors.engineDisplacement = 'Cylindrée requise et doit être positive'
    }

    if (data.vehicleAge === '' || parseInt(data.vehicleAge) < 0) {
      newErrors.vehicleAge = 'Âge requis et doit être positif'
    } else if (parseInt(data.vehicleAge) > 36) {
      newErrors.vehicleAge = 'Âge maximum 36 mois'
    }

    if (!data.vehicleCategory) {
      newErrors.vehicleCategory = 'Catégorie requise'
    }

    if (data.exchangeRate && parseFloat(data.exchangeRate) <= 0) {
      newErrors.exchangeRate = 'Taux de change doit être positif'
    }

    return newErrors
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (name === 'engineType' && value === 'diesel') {
      alert('Attention: Les véhicules diesel ne sont pas autorisés à l\'importation pour les particuliers en Algérie.')
    }
  }

  const calculateTaxes = async (e) => {
    e.preventDefault()
    
    // Validate form
    const formErrors = validateForm(formData)
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    setIsCalculating(true)
    setErrors({})

    // Simulate API call delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const vehicleValue = parseFloat(formData.vehicleValue)
    const engineType = formData.engineType
    const engineDisplacement = parseInt(formData.engineDisplacement)
    const vehicleAge = parseInt(formData.vehicleAge)
    const exchangeRate = parseFloat(formData.exchangeRate) || 146.68
    const vehicleCategory = formData.vehicleCategory

    if (vehicleAge > 36) {
      alert('Les véhicules de plus de 36 mois ne sont pas autorisés à l\'importation')
      setIsCalculating(false)
      return
    }

    if (engineType === 'diesel') {
      alert('Les véhicules diesel ne sont pas autorisés à l\'importation pour les particuliers')
      setIsCalculating(false)
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

    const calculationResults = {
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
      valueInDZD,
      vehicleDetails: {
        value: vehicleValue,
        engineType,
        engineDisplacement,
        vehicleAge,
        exchangeRate,
        vehicleCategory
      },
      calculationDate: new Date().toLocaleDateString('fr-FR')
    }

    setResults(calculationResults)
    setShowResults(true)
    setIsCalculating(false)

    // Scroll to results
    setTimeout(() => {
      const resultsElement = document.getElementById('results-section')
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-DZ', {
      style: 'currency',
      currency: 'DZD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const copyResults = async () => {
    if (!results) return

    const text = `
CALCULATEUR DE TAXATION VÉHICULES - ALGÉRIE

═══ DÉTAILS DU VÉHICULE ═══
Valeur CIF: ${results.vehicleDetails.value.toLocaleString('fr-FR')} EUR
Type de moteur: ${results.vehicleDetails.engineType}
Cylindrée: ${results.vehicleDetails.engineDisplacement} cm³
Âge: ${results.vehicleDetails.vehicleAge} mois
Catégorie: ${results.vehicleDetails.vehicleCategory}
Taux de change: ${results.vehicleDetails.exchangeRate} DZD/EUR

═══ CALCUL DES TAXES ═══
Valeur en douane: ${formatCurrency(results.valueInDZD)}
Droits de douane: ${formatCurrency(results.customsDuty)}
TIC: ${formatCurrency(results.tic)}
TVA (19%): ${formatCurrency(results.vat)}
PRCT (2%): ${formatCurrency(results.prct)}
TCS (2%): ${formatCurrency(results.tcs)}

${results.discount > 0 ? `═══ RÉDUCTION ═══
${results.discountText}
Montant de la réduction: -${formatCurrency(results.discount)}

` : ''}═══ TOTAL À PAYER ═══
${formatCurrency(results.totalAfterDiscount)}

Calculé le: ${results.calculationDate}
Source: Calculateur de Taxation Véhicules Algérie
    `.trim()

    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Erreur copie:', err)
    }
  }

  const downloadPDF = () => {
    // For now, we'll create a simple text file download
    // In a real implementation, you'd use a PDF library like jsPDF
    if (!results) return

    const content = `CALCULATEUR DE TAXATION VÉHICULES - ALGÉRIE

DÉTAILS DU VÉHICULE
Valeur CIF: ${results.vehicleDetails.value.toLocaleString('fr-FR')} EUR
Type de moteur: ${results.vehicleDetails.engineType}
Cylindrée: ${results.vehicleDetails.engineDisplacement} cm³
Âge: ${results.vehicleDetails.vehicleAge} mois
Catégorie: ${results.vehicleDetails.vehicleCategory}
Taux de change: ${results.vehicleDetails.exchangeRate} DZD/EUR

CALCUL DES TAXES
Valeur en douane: ${formatCurrency(results.valueInDZD)}
Droits de douane: ${formatCurrency(results.customsDuty)}
TIC: ${formatCurrency(results.tic)}
TVA (19%): ${formatCurrency(results.vat)}
PRCT (2%): ${formatCurrency(results.prct)}
TCS (2%): ${formatCurrency(results.tcs)}

${results.discount > 0 ? `RÉDUCTION
${results.discountText}
Montant de la réduction: -${formatCurrency(results.discount)}

` : ''}TOTAL À PAYER
${formatCurrency(results.totalAfterDiscount)}

Calculé le: ${results.calculationDate}
Source: Calculateur de Taxation Véhicules Algérie`

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `calcul-taxation-vehicule-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <div className="relative z-10">
          <VehicleForm 
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={calculateTaxes}
            errors={errors}
            isCalculating={isCalculating}
            darkMode={darkMode}
          />

          <div id="results-section">
            {showResults && (
              <ResultsDisplay 
                results={results}
                formatCurrency={formatCurrency}
                onCopyResults={copyResults}
                onDownloadPDF={downloadPDF}
                isVisible={showResults}
              />
            )}
          </div>

          <InfoPanel darkMode={darkMode} />
          
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default App