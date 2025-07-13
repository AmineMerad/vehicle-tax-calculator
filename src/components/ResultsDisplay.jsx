import { useState, useEffect } from 'react'
import { CheckCircle, TrendingUp, Copy, Download, BarChart3, DollarSign, Percent } from 'lucide-react'

export default function ResultsDisplay({ results, formatCurrency, onCopyResults, onDownloadPDF, isVisible = false }) {
  const [animatedValues, setAnimatedValues] = useState({})
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (results && isVisible) {
      // Animate values from 0 to final values
      const animationDuration = 1500
      const startTime = Date.now()
      
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / animationDuration, 1)
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        
        setAnimatedValues({
          customsDuty: results.customsDuty * easeOutQuart,
          tic: results.tic * easeOutQuart,
          vat: results.vat * easeOutQuart,
          prct: results.prct * easeOutQuart,
          tcs: results.tcs * easeOutQuart,
          discount: results.discount * easeOutQuart,
          totalAfterDiscount: results.totalAfterDiscount * easeOutQuart,
          valueInDZD: results.valueInDZD * easeOutQuart
        })
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      
      animate()
    }
  }, [results, isVisible])

  const handleCopy = async () => {
    await onCopyResults()
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const ProgressBar = ({ value, max, color = "blue", label }) => (
    <div className="mt-3">
      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
        <span>{label}</span>
        <span>{((value / max) * 100).toFixed(1)}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full bg-gradient-to-r transition-all duration-1000 ease-out ${
            color === 'blue' ? 'from-blue-400 to-blue-600' :
            color === 'green' ? 'from-green-400 to-green-600' :
            color === 'purple' ? 'from-purple-400 to-purple-600' :
            color === 'indigo' ? 'from-indigo-400 to-indigo-600' :
            color === 'cyan' ? 'from-cyan-400 to-cyan-600' :
            'from-teal-400 to-teal-600'
          }`}
          style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
        />
      </div>
    </div>
  )

  const TaxCard = ({ title, value, icon: Icon, color, progress, description }) => (
    <div className={`bg-gradient-to-br ${color} p-6 rounded-xl border border-opacity-20 transform transition-all duration-500 hover:scale-105 hover:shadow-lg`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`p-2 rounded-lg bg-white bg-opacity-20`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <h4 className="text-sm font-semibold text-white ml-3">{title}</h4>
        </div>
      </div>
      <div className="text-2xl font-bold text-white mb-2">
        {formatCurrency(value)}
      </div>
      <p className="text-xs text-white text-opacity-80 mb-3">{description}</p>
      {progress && <ProgressBar {...progress} />}
    </div>
  )

  if (!results || !isVisible) return null

  const maxValue = results.totalAfterDiscount

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 px-8 py-6 border-b border-gray-100 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-3 bg-green-500 rounded-xl shadow-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Résultats du Calcul</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">Détail complet de la taxation</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleCopy}
                className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors duration-200 group"
                title="Copier les résultats"
              >
                <Copy className={`h-5 w-5 ${copied ? 'animate-bounce' : 'group-hover:scale-110'} transition-transform`} />
              </button>
              <button
                onClick={onDownloadPDF}
                className="p-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-colors duration-200 group"
                title="Télécharger PDF"
              >
                <Download className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Value Display */}
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-6 py-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-50 rounded-full mb-4">
              <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Valeur en douane</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {formatCurrency(animatedValues.valueInDZD || 0)}
            </div>
          </div>

          {/* Tax Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <TaxCard
              title="Droits de douane"
              value={animatedValues.customsDuty || 0}
              icon={BarChart3}
              color="from-blue-500 to-blue-600"
              description="Droits d'importation selon le type"
              progress={{
                value: animatedValues.customsDuty || 0,
                max: maxValue,
                color: "blue",
                label: "Part du total"
              }}
            />

            <TaxCard
              title="TIC"
              value={animatedValues.tic || 0}
              icon={Percent}
              color="from-purple-500 to-purple-600"
              description="Taxe intérieure de consommation"
              progress={{
                value: animatedValues.tic || 0,
                max: maxValue,
                color: "purple",
                label: "Part du total"
              }}
            />

            <TaxCard
              title="TVA (19%)"
              value={animatedValues.vat || 0}
              icon={DollarSign}
              color="from-indigo-500 to-indigo-600"
              description="Taxe sur la valeur ajoutée"
              progress={{
                value: animatedValues.vat || 0,
                max: maxValue,
                color: "indigo",
                label: "Part du total"
              }}
            />

            <TaxCard
              title="PRCT (2%)"
              value={animatedValues.prct || 0}
              icon={BarChart3}
              color="from-cyan-500 to-cyan-600"
              description="Prélèvement pour compte du Trésor"
              progress={{
                value: animatedValues.prct || 0,
                max: maxValue,
                color: "cyan",
                label: "Part du total"
              }}
            />

            <TaxCard
              title="TCS (2%)"
              value={animatedValues.tcs || 0}
              icon={Percent}
              color="from-teal-500 to-teal-600"
              description="Taxe complémentaire de soutien"
              progress={{
                value: animatedValues.tcs || 0,
                max: maxValue,
                color: "teal",
                label: "Part du total"
              }}
            />

            {results.discount > 0 && (
              <TaxCard
                title={`Réduction (${results.discountPercentage}%)`}
                value={-(animatedValues.discount || 0)}
                icon={TrendingUp}
                color="from-green-500 to-green-600"
                description={results.discountText}
              />
            )}
          </div>

          {/* Discount Information */}
          {results.discount > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900 dark:from-opacity-20 dark:to-emerald-900 dark:to-opacity-20 border-2 border-green-200 dark:border-green-700 p-6 rounded-xl mb-8">
              <div className="flex items-center mb-3">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400 mr-3" />
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-300">
                  Réduction Appliquée
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-green-700 dark:text-green-400 mb-1">
                    -{formatCurrency(animatedValues.discount || 0)}
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-300">{results.discountText}</p>
                </div>
                <div className="flex items-center">
                  <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-4">
                    <div
                      className="h-4 bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000 ease-out flex items-center justify-center"
                      style={{ width: `${results.discountPercentage}%` }}
                    >
                      <span className="text-xs font-bold text-white">{results.discountPercentage}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Total Amount */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl text-center text-white shadow-2xl">
            <div className="flex items-center justify-center mb-4">
              <DollarSign className="h-8 w-8 mr-3" />
              <span className="text-lg font-medium opacity-90">Total des taxes et droits à payer</span>
            </div>
            <div className="text-4xl md:text-5xl font-bold mb-3">
              {formatCurrency(animatedValues.totalAfterDiscount || 0)}
            </div>
            <p className="text-lg opacity-80">Montant final après toutes déductions</p>
            
            {/* Success Message */}
            {copied && (
              <div className="mt-4 inline-flex items-center px-4 py-2 bg-white bg-opacity-20 rounded-full">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span className="text-sm">Résultats copiés dans le presse-papiers!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}