import { useState } from 'react'
import { Shield, AlertCircle, ChevronDown, ChevronUp, Info, Clock, FileText, Globe, Calculator } from 'lucide-react'

export default function InfoPanel() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState('general')

  const infoSections = {
    general: {
      title: "Informations Générales",
      icon: Info,
      items: [
        {
          title: "Éligibilité d'importation véhicules d'occasion",
          description: "Les résidents algériens peuvent importer 1 véhicule d'occasion tous les 3 ans",
          detail: "Cette règle s'applique uniquement aux véhicules d'occasion pour les particuliers résidents en Algérie depuis au moins 3 ans consécutifs."
        },
        {
          title: "Âge maximum autorisé pour véhicules d'occasion",
          description: "Le véhicule d'occasion doit avoir moins de 3 ans d'âge (36 mois)",
          detail: "L'âge est calculé depuis la date de première mise en circulation du véhicule d'occasion. Les véhicules neufs ont une réglementation différente."
        },
        {
          title: "Types de motorisation autorisés",
          description: "Seuls les véhicules d'occasion essence, hybrides et électriques sont autorisés",
          detail: "Les véhicules d'occasion diesel sont interdits à l'importation pour les particuliers depuis 2020."
        },
        {
          title: "Valeur CIF en EUR",
          description: "Le calcul est basé sur la valeur CIF en euros (Cost, Insurance, Freight)",
          detail: "Inclut le prix d'achat du véhicule d'occasion, l'assurance transport et le fret jusqu'au port algérien. Conversion EUR/DZD selon le taux officiel."
        },
        {
          title: "Véhicules neufs - Prochainement",
          description: "Le calcul des taxes pour véhicules neufs sera ajouté ultérieurement",
          detail: "Ce calculateur est actuellement spécialisé pour les véhicules d'occasion de moins de 3 ans. Les règles pour véhicules neufs sont différentes."
        }
      ]
    },
    taxes: {
      title: "Détail des Taxes",
      icon: Calculator,
      items: [
        {
          title: "Droits de douane véhicules d'occasion",
          description: "15% pour véhicules ≤1800cc, 30% pour >1800cc (essence/hybride), 30% (électrique)",
          detail: "Taux préférentiels pour encourager l'importation de véhicules d'occasion moins polluants."
        },
        {
          title: "TIC (Taxe Intérieure de Consommation)",
          description: "0% électrique, 30% ≤2000cc, 60% 2001-3000cc, 90% >3000cc",
          detail: "Taxe écologique progressive selon la cylindrée pour limiter la pollution."
        },
        {
          title: "TVA (Taxe sur la Valeur Ajoutée)",
          description: "19% sur la valeur douanière + droits + TIC + PRCT + TCS",
          detail: "Appliquée sur la base taxable totale incluant toutes les autres taxes."
        },
        {
          title: "PRCT + TCS",
          description: "2% + 2% = 4% au total sur la valeur douanière",
          detail: "Prélèvement pour compte du Trésor et Taxe complémentaire de soutien."
        }
      ]
    },
    reductions: {
      title: "Réductions Applicables",
      icon: FileText,
      items: [
        {
          title: "Véhicules électriques",
          description: "Réduction de 80% sur le total des taxes",
          detail: "Mesure incitative pour promouvoir la mobilité électrique en Algérie."
        },
        {
          title: "Véhicules ≤ 1800cc",
          description: "Réduction de 50% pour essence et hybride",
          detail: "Encourage l'importation de véhicules moins gourmands en carburant."
        },
        {
          title: "Véhicules > 1800cc",
          description: "Réduction de 20% pour essence et hybride",
          detail: "Réduction moindre pour les véhicules de plus grosse cylindrée."
        }
      ]
    },
    legal: {
      title: "Aspects Légaux",
      icon: Shield,
      items: [
        {
          title: "Réglementation en vigueur",
          description: "Loi de finances 2025 et instructions douanières",
          detail: "Ces taux sont basés sur la réglementation actuelle et peuvent évoluer."
        },
        {
          title: "Procédures douanières",
          description: "Dossier complet requis avec justificatifs",
          detail: "Facture, certificat de conformité, assurance, etc. requis pour l'importation."
        },
        {
          title: "Contrôle technique",
          description: "Visite technique obligatoire après dédouanement",
          detail: "Le véhicule doit passer un contrôle technique algérien avant immatriculation."
        }
      ]
    }
  }

  const tabs = [
    { id: 'general', label: 'Général', icon: Info },
    { id: 'taxes', label: 'Taxes', icon: Calculator },
    { id: 'reductions', label: 'Réductions', icon: FileText },
    { id: 'legal', label: 'Légal', icon: Shield }
  ]

  const InfoItem = ({ item }) => {
    const [showDetail, setShowDetail] = useState(false)

    return (
      <div className="border-b theme-border-primary last:border-b-0 py-4 theme-transition">
        <button
          onClick={() => setShowDetail(!showDetail)}
          className="w-full text-left group focus:outline-none"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-semibold theme-text-primary group-hover:text-blue-600 transition-colors">
                {item.title}
              </h4>
              <p className="text-sm theme-text-secondary mt-1">
                {item.description}
              </p>
            </div>
            <div className="ml-4 pt-1">
              {showDetail ? (
                <ChevronUp className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
              )}
            </div>
          </div>
        </button>
        {showDetail && (
          <div className="mt-3 pl-4 border-l-2 theme-border-accent">
            <p className="text-sm theme-text-secondary italic">
              {item.detail}
            </p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
      <div className="theme-bg-card rounded-2xl theme-shadow-xl theme-border-primary border overflow-hidden theme-transition">
        {/* Header */}
        <div className="theme-bg-accent px-4 sm:px-6 md:px-8 py-4 sm:py-6 border-b theme-border-primary theme-transition">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between group focus:outline-none"
          >
            <div className="flex items-center">
              <div className="p-3 bg-amber-500 rounded-xl shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4 text-left">
                <h3 className="text-xl font-bold theme-text-primary group-hover:text-amber-600 transition-colors">
                  Informations Véhicules d'Occasion
                </h3>
                <p className="text-sm theme-text-secondary">
                  {isExpanded ? 'Masquer' : 'Afficher'} les détails pour véhicules d'occasion
                </p>
              </div>
            </div>
            <div className="ml-4">
              {isExpanded ? (
                <ChevronUp className="h-6 w-6 text-gray-400 group-hover:text-amber-500 transition-all duration-300" />
              ) : (
                <ChevronDown className="h-6 w-6 text-gray-400 group-hover:text-amber-500 transition-all duration-300" />
              )}
            </div>
          </button>
        </div>

        {/* Expandable Content */}
        <div className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          {/* Tabs */}
          <div className="flex flex-wrap border-b theme-border-primary theme-bg-accent theme-transition">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800'
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-gray-600'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Tab Content */}
          <div className="p-4 sm:p-6 md:p-8">
            <div className="mb-6">
              <h4 className="text-lg font-bold theme-text-primary mb-2 flex items-center">
                {(() => {
                  const Icon = infoSections[activeTab].icon
                  return <Icon className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                })()}
                {infoSections[activeTab].title}
              </h4>
            </div>

            <div className="space-y-0">
              {infoSections[activeTab].items.map((item, index) => (
                <InfoItem key={index} item={item} />
              ))}
            </div>
          </div>

          {/* Warning Footer */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border-t-2 border-red-200 p-6 theme-transition">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h4 className="text-base font-semibold text-red-800 mb-2">
                  Note Importante
                </h4>
                <p className="text-sm text-red-700 leading-relaxed mb-3">
                  Cet outil d'estimation est basé sur des informations publiques et est fourni à titre indicatif uniquement. 
                  Les montants réels peuvent différer selon votre situation spécifique.
                </p>
                <p className="text-sm text-red-700 leading-relaxed">
                  <strong>Consultez toujours les services douaniers officiels</strong> 
                  pour obtenir des informations précises et à jour avant toute démarche d'importation.
                </p>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="theme-bg-accent px-6 py-4 border-t theme-border-primary theme-transition">
            <div className="flex items-center justify-between text-xs theme-text-muted">
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                Dernière mise à jour: Janvier 2025
              </div>
              <div className="flex items-center">
                <Globe className="h-3 w-3 mr-1" />
                Réglementation algérienne
              </div>
            </div>
          </div>
        </div>

        {/* Always Visible Quick Tips */}
        {!isExpanded && (
          <div className="p-4 sm:p-6 theme-bg-accent theme-transition">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
              <div className="p-2 sm:p-3 theme-bg-card rounded-lg theme-shadow-sm theme-transition">
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">⚡</div>
                <div className="text-xs sm:text-sm font-medium theme-text-primary">Véhicules électriques</div>
                <div className="text-xs theme-text-muted">-80% de taxes</div>
              </div>
              <div className="p-2 sm:p-3 theme-bg-card rounded-lg theme-shadow-sm theme-transition">
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🚗</div>
                <div className="text-xs sm:text-sm font-medium theme-text-primary">≤ 1800cc</div>
                <div className="text-xs theme-text-muted">-50% de taxes</div>
              </div>
              <div className="p-2 sm:p-3 theme-bg-card rounded-lg theme-shadow-sm theme-transition">
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">📅</div>
                <div className="text-xs sm:text-sm font-medium theme-text-primary">Âge maximum</div>
                <div className="text-xs theme-text-muted">36 mois</div>
              </div>
              <div className="p-2 sm:p-3 theme-bg-card rounded-lg theme-shadow-sm theme-transition">
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">⛽</div>
                <div className="text-xs sm:text-sm font-medium theme-text-primary">Diesel</div>
                <div className="text-xs theme-text-muted">Interdit</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}