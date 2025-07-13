import { useState } from 'react'
import './App.css'

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
      alert('Attention: Les vehicules diesel ne sont pas autorises a l\'importation pour les particuliers en Algerie.')
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
      alert('Les vehicules de plus de 36 mois ne sont pas autorises a l\'importation')
      return
    }

    if (engineType === 'diesel') {
      alert('Les vehicules diesel ne sont pas autorises a l\'importation pour les particuliers')
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
      discountText = 'Reduction de 80% pour vehicule electrique'
    } else if (engineType === 'gasoline' || engineType === 'hybrid') {
      if (engineDisplacement <= 1800) {
        discountPercentage = 50
        discountText = 'Reduction de 50% pour vehicule <= 1800cc'
      } else {
        discountPercentage = 20
        discountText = 'Reduction de 20% pour vehicule > 1800cc'
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
    <div className="app-container">
      <div className="header">
        <div className="header-content">
          <h1>Calculateur de Taxation Vehicules Algerie</h1>
          <p>Voitures d'occasion de moins de 3 ans - Calcul des droits de douane et taxes</p>
        </div>
      </div>

      <div className="main-content">
        <div className="calculator-card">
          <form onSubmit={calculateTaxes} className="calculator-form">
            <div className="form-grid">
              <div className="form-section">
                <div className="form-group">
                  <label htmlFor="vehicleValue">Valeur CIF du vehicule (EUR) *</label>
                  <input
                    type="number"
                    id="vehicleValue"
                    name="vehicleValue"
                    required
                    step="0.01"
                    placeholder="Ex: 25000"
                    value={formData.vehicleValue}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="engineType">Type de moteur *</label>
                  <select
                    id="engineType"
                    name="engineType"
                    required
                    value={formData.engineType}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">Selectionnez le type de moteur</option>
                    <option value="gasoline">Essence</option>
                    <option value="hybrid">Hybride</option>
                    <option value="electric">Electrique</option>
                    <option value="diesel">Diesel (Non autorise)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="engineDisplacement">Cylindree (cm³) *</label>
                  <input
                    type="number"
                    id="engineDisplacement"
                    name="engineDisplacement"
                    required
                    placeholder="Ex: 1600"
                    value={formData.engineDisplacement}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-section">
                <div className="form-group">
                  <label htmlFor="vehicleAge">Age du vehicule (mois) *</label>
                  <input
                    type="number"
                    id="vehicleAge"
                    name="vehicleAge"
                    required
                    min="0"
                    max="36"
                    placeholder="Ex: 18"
                    value={formData.vehicleAge}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="exchangeRate">Taux de change EUR/DZD</label>
                  <input
                    type="number"
                    id="exchangeRate"
                    name="exchangeRate"
                    step="0.01"
                    placeholder="146.68"
                    value={formData.exchangeRate}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="vehicleCategory">Categorie de vehicule *</label>
                  <select
                    id="vehicleCategory"
                    name="vehicleCategory"
                    required
                    value={formData.vehicleCategory}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">Selectionnez la categorie</option>
                    <option value="passenger">Voiture particuliere (≤ 9 places)</option>
                    <option value="commercial">Vehicule commercial (≤ 3.5 tonnes)</option>
                  </select>
                </div>
              </div>
            </div>

            <button type="submit" className="calculate-button">
              Calculer les Taxes
            </button>
          </form>

          {showResults && results && (
            <div className="results-card">
              <h3>Detail des Taxes et Droits</h3>
              
              <div className="tax-breakdown">
                <div className="tax-item">
                  <span className="tax-label">Valeur en douane (DZD)</span>
                  <span className="tax-value">{formatCurrency(results.valueInDZD)}</span>
                </div>
                <div className="tax-item">
                  <span className="tax-label">Droits de douane (DD)</span>
                  <span className="tax-value">{formatCurrency(results.customsDuty)}</span>
                </div>
                <div className="tax-item">
                  <span className="tax-label">Taxe interieure (TIC)</span>
                  <span className="tax-value">{formatCurrency(results.tic)}</span>
                </div>
                <div className="tax-item">
                  <span className="tax-label">PRCT (2%)</span>
                  <span className="tax-value">{formatCurrency(results.prct)}</span>
                </div>
                <div className="tax-item">
                  <span className="tax-label">TCS (2%)</span>
                  <span className="tax-value">{formatCurrency(results.tcs)}</span>
                </div>
                <div className="tax-item">
                  <span className="tax-label">TVA (19%)</span>
                  <span className="tax-value">{formatCurrency(results.vat)}</span>
                </div>
                {results.discount > 0 && (
                  <div className="tax-item discount-item">
                    <span className="tax-label">Reduction (-{results.discountPercentage}%)</span>
                    <span className="tax-value discount-value">-{formatCurrency(results.discount)}</span>
                  </div>
                )}
              </div>

              <div className="total-section">
                <h4>Total des taxes et droits a payer</h4>
                <div className="total-amount">{formatCurrency(results.totalAfterDiscount)}</div>
              </div>

              {results.discount > 0 && (
                <div className="discount-info">
                  <h4>Reduction appliquee</h4>
                  <p>{results.discountText}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="info-card">
          <h4>Informations importantes (2025)</h4>
          <ul>
            <li>Les residents algeriens peuvent importer 1 vehicule d'occasion tous les 3 ans</li>
            <li>Le vehicule doit avoir moins de 3 ans d'age</li>
            <li>Seuls les vehicules essence, hybrides et electriques sont autorises (pas de diesel)</li>
            <li>Paiement obligatoire via une banque algerienne</li>
            <li>Le calcul est base sur la valeur CIF (Cost, Insurance, Freight)</li>
          </ul>
        </div>

        <div className="warning-card">
          <strong>Nouvelles regles de revente (2025)</strong>
          <p>Si vous vendez votre vehicule importe avant 36 mois, vous devez rembourser une partie des avantages fiscaux :</p>
          <ul>
            <li>0-12 mois : 100% du credit fiscal</li>
            <li>12-24 mois : 66% du credit fiscal</li>
            <li>24-36 mois : 33% du credit fiscal</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App