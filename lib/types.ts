/**
 * Fyra Circular Platform - Type Definitions
 * Centralized TypeScript interfaces for all data structures
 */

// ============================================
// SUPPLIER TYPES
// ============================================

export interface MapLocation {
  name: string;
  address: string;
  lat: number;
  lng: number;
}

export interface B2BReadiness {
  stockAvailable: boolean;
  sourcingService: boolean;
  volumeCapacity: 'small' | 'medium' | 'enterprise';
  slaGuarantee: boolean;
  leadTimeStock?: string;
  leadTimeSourcing?: string;
  hotelProjectCapacity?: string;
}

export interface SupplierCapabilities {
  volume: string;
  leadTime: string;
  inventory: string;
  logistics: string;
}

export interface SupplierContact {
  name?: string;
  phone?: string;
  email?: string;
  website?: string;
}

export interface HospitalityReadiness {
  tier: 'Tier 1' | 'Tier 2' | 'Tier 3';
  score: string;
  strengths: string[];
  gaps: string[];
}

export interface Supplier {
  id: string;
  name: string;
  sourceRefs: string[];
  country?: string;
  regions?: string[];
  stockholmPresence?: boolean;
  fyraRecommended?: boolean;
  b2bReadiness?: B2BReadiness;
  description: string;
  location: string;
  mapLocations?: MapLocation[];
  services: string[];
  capabilities?: SupplierCapabilities;
  contact?: SupplierContact;
  certifications?: string[];
  hospitalityReadiness: HospitalityReadiness;
  businessModel?: string;
}

// ============================================
// CASE STUDY TYPES
// ============================================

export interface CaseStudyContact {
  name: string;
  title?: string;
  note?: string;
}

export interface CaseStudyDetails {
  name?: string;
  category?: string;
  operatør?: string;
  scope?: string;
  contact?: string;
  chain?: string;
  website?: string;
  [key: string]: string | undefined;
}

export interface CaseStudyMetrics {
  co2Impact?: string;
  circularContent?: string;
  materialReuse?: string;
  certification?: string;
  costSavings?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  type: string;
  tier: 'Flagship' | 'Proven' | 'Emerging' | 'Reference';
  fyraRelevance: number;
  details: CaseStudyDetails;
  contacts?: CaseStudyContact[];
  location: string;
  size?: string;
  year?: string;
  category?: string;
  website?: string;
  circularFeatures: string[];
  metrics?: CaseStudyMetrics;
  notes?: string[];
  chain?: string;
  chainPotential?: string;
  year_verified?: number;
  sourceRefs: string[];
  whyIncluded?: string;
}

// ============================================
// CONSULTANT TYPES
// ============================================

export interface ConsultantContact {
  role?: string;
  name?: string;
  phone?: string;
  email?: string;
  note?: string;
}

export interface HospitalityProject {
  name: string;
  year?: number;
  location: string;
  client?: string;
  scope?: string;
  role?: string;
  achievement?: string;
  relevance?: string;
  confidence?: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface ConsultantHospitalityProjects {
  count: string;
  rating: string;
  description?: string;
  featured: HospitalityProject[];
}

export interface ConsultantSustainability {
  circularEconomy: {
    rating: string;
    description: string;
    demonstrated?: string[];
  };
}

export interface Consultant {
  id: string;
  name: string;
  priority: string;
  tagline: string;
  description: string;
  headquarters: string;
  coverage: string;
  size?: string;
  founded?: number | null;
  website: string;
  sourceRefs: string[];
  businessModel?: string;
  keyContacts?: ConsultantContact[];
  certification?: string;
  hospitalityProjects: ConsultantHospitalityProjects;
  sustainability?: ConsultantSustainability;
}

export interface ConsultantEnhanced {
  tier1: Consultant[];
  tier2?: Consultant[];
  tier3?: Consultant[];
}

// ============================================
// SOURCE TYPES
// ============================================

export interface Source {
  id: string;
  name: string;
  type: 'official' | 'company' | 'press' | 'research' | 'standard';
  url: string;
  description?: string;
  verifiedDate?: string;
}

// ============================================
// CERTIFICATION TYPES
// ============================================

export interface Certification {
  id: string;
  name: string;
  type: string;
  scope: string;
  description: string;
  criteria?: string[];
  officialDocs?: {
    title: string;
    url: string;
    type: 'criteria' | 'guide' | 'checklist';
  }[];
  sourceRefs?: string[];
}

// ============================================
// FIRE SAFETY TYPES
// ============================================

export interface FireSafetyTier {
  tier: string;
  icon: string;
  title: string;
  description: string;
  requirements: string[];
  testingCost?: string;
  timeline?: string;
  sourceLinks?: {
    name: string;
    url: string;
  }[];
}

// ============================================
// REGULATORY TYPES
// ============================================

export interface RegulatorySource {
  id: string;
  name: string;
  authority: string;
  category: 'fire' | 'building' | 'environmental' | 'procurement';
  url: string;
  excerpt?: string;
  verifiedDate: string;
}

// ============================================
// TEMPLATE TYPES
// ============================================

export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  downloadUrl?: string;
  fields?: string[];
}

// ============================================
// SCENARIO TYPES
// ============================================

export interface Scenario {
  id: string;
  title: string;
  description: string;
  icon: string;
  timeline: string;
  riskLevel: 'low' | 'medium' | 'high';
  steps: string[];
  regulatoryPathway?: string[];
}

// ============================================
// SEARCH RESULT TYPES
// ============================================

export interface SearchResult {
  type: 'supplier' | 'case-study' | 'consultant' | 'regulation';
  id: string;
  title: string;
  description: string;
  url: string;
  score?: number;
}
