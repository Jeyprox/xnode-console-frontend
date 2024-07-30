import ServiceDefinitions from 'utils/service-definitions.json'
import TemplateDefinitions from 'utils/template-definitions.json'

export type DataProvider = {
  id: string
  name?: string
  description?: string
  createdAt?: Date
  updatedAt?: Date
  tags?: string[]
  useCases?: string[]
  live: boolean
  download: boolean
  isThirdParty: boolean
  free: boolean
  dataGithubName?: string
  dataGithubLink?: string
  dataCloudLink?: string
  dataCloudName?: string
  category?: string
  dataSpace?: string
  location?: string
  foundingYear?: string
  addToXnodeMessage?: string
  relevantDocs?: string
  logoURL?: string
  specification?: string
  details?: string
  website?: string
  downloadCSVLink?: string
  type?: string
  liveLink?: string
  company?: string
  popularity?: number
  sql?: string
  linkDevelopersDocs?: string
  linkProducts?: string
  linkCareers?: string
  linkTwitter?: string
  linkContact?: string
  linkAboutUs?: string
  linkMedium?: string
  linkLinkedin?: string
  linkGithub?: string
}

// NOTE: A "template product" is a baremetal offering from a provider.
export type TemplatesProducts = {
  id: string
  providerName?: string
  productName?: string
  location?: string
  cpuCores?: string
  cpuThreads?: string
  cpuGHZ?: string
  hasSGX?: string
  ram?: string
  numberDrives?: string
  avgSizeDrive?: string
  storageTotal?: string
  gpuType?: string
  gpuMemory?: string
  bandwidthNetwork?: string
  network?: string
  priceHour?: string
  priceMonth?: string
  priceSale?: string
  availability?: string
  source?: string
  unit?: string
}

export type IncludedProducts = {
  name?: string
  description?: string
  tags?: string
  infraId?: string
}

export type IncludedIntegrations = {
  name?: string
  description?: string
}

export type OldTemplatesData = {
  id: string
  name?: string
  description?: string
  price?: string
  logoUrl?: string
  tags?: string[]
  systemMinRequirements?: string
  systemRecommendedRequirements?: string
  productsIncluded?: any[]
  techDiagrams?: string
  source?: string
  featured?: boolean
  category?: string
  createdAt?: string
  includedProducts?: IncludedProducts[]
  includedIntegrations?: IncludedIntegrations[]
}

export type DeploymentTemplate = {
  name: string
  description: string
  tags?: string[]
  minSpecs?: Specs
  services?: ServiceData[]
  custom?: boolean
}

export type DeploymentConfiguration = {
  name: string
  desc: string
  location: string
  isUnit: boolean
  provider: string
  // Either the api key or the NFT id.
  deploymentAuth: string

  // An array to all the service ids being looked at.
  services: ServiceData[]
  xnodeConfig : XnodeConfig
}


export type XnodeConfig = {
  "services" : ServiceData[]
  "users.users" : ServiceData[]
  // Can add any other modules available in nix following the Module and Option format.
  // "ModuleType" : ModuleData[]
}




export type ServiceOption = {
  name: string
  desc: string

  // Nix name for the option.
  nixName: string

  // One of: "string", "int", "float", "bool"
  type: string
  value: string

  // Suboptions for nested options.
  suboptions?: ServiceOption[];
}

export type Specs = {
  // cores: number
  ram: number
  storage: number
}

export type ServiceData = {
  name: string
  tags?: string[]
  specs?: Specs
  desc?: string
  website?:string
  // Url to the logo.
  logo?: string
  implmented?: boolean

  nixName: string
  options: ServiceOption[]
}


export type TemplateData = {
  id: string
  name: string
  desc: string
  tags: string[]
  quality?: boolean
  isUnitRunnable?: boolean
  source?: string
  website?: string
  implementation?: boolean
  // Url to image.
  logo: string
  category: string
  dateAdded: string
  // An array to all the service ids being looked at.
  serviceNames: string[]
}

let serviceMap: Map<string, ServiceData> = null
export function ServiceFromName(name: string): ServiceData | undefined {
  if (serviceMap == null) {
    serviceMap = new Map<string, ServiceData>()

    for (let i = 0; i < ServiceDefinitions.length; i++) {
      const service = ServiceDefinitions[i]
      if (service === undefined) continue
      serviceMap.set(ServiceDefinitions[i].nixName, service)
    }
  }

  return serviceMap.get(name)
}

let templateMap: Map<string, TemplateData> = null
export function TemplateFromId(id: string): TemplateData | undefined {
  if (templateMap == null) {
    templateMap = new Map<string, TemplateData>()

    for (let i = 0; i < TemplateDefinitions.length; i++) {
      templateMap.set(TemplateDefinitions[i].id, TemplateDefinitions[i])
    }
  }

  return templateMap.get(id)
}

export function TemplateGetSpecs(template: TemplateData): Specs {
  let specs: Specs = { ram: 0, storage: 0 }

  for (let i = 0; i < template.serviceNames.length; i++) {
    // Get service id from .
    const service = ServiceFromName(template.serviceNames[i])
    if (service) {
      // specs.cores += service.specs.cores
      specs.ram += service.specs.ram
      specs.storage += service.specs.storage
    } else {
      console.log(template.serviceNames[i])
      // XXX: Need a test to quality check all templates ahead of time.
      console.log("This shouldn't run")
    }
  }

  return specs
}

export function TemplateGetTags(template: TemplateData): string[] {
  let ret: string[] = []

  for (let i = 0; i < template.serviceNames.length; i++) {
    // Get service id from .
    const service = ServiceFromName(template.serviceNames[i])
    if (service) {
      // specs.cores += service.specs.cores
      for (let j = 0; j < service.tags.length; j++) {
        ret.push(service.tags[j])
      }
    } else {
      // XXX: Need a test to quality check all templates ahead of time.
      console.log("This shouldn't run")
    }
  }

  return ret
}
