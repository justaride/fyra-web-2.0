/**
 * Fyra Circular Platform - Data Loading Utilities
 * Safe JSON parsing with error handling and type safety
 */

import { promises as fs } from 'fs';
import path from 'path';
import type {
  Supplier,
  CaseStudy,
  ConsultantEnhanced,
  Consultant,
  Source,
  Certification,
  FireSafetyTier,
  RegulatorySource,
  Template,
  Scenario,
} from './types';

// ============================================
// SAFE JSON LOADING
// ============================================

/**
 * Safely loads and parses a JSON file with error handling
 * @param filename - Name of the file in the data directory
 * @param fallback - Default value to return on error
 * @returns Parsed JSON data or fallback value
 */
export async function loadJsonFile<T>(filename: string, fallback: T): Promise<T> {
  try {
    const filePath = path.join(process.cwd(), 'data', filename);
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents) as T;
  } catch (error) {
    console.error(`[Fyra] Failed to load ${filename}:`, error);
    return fallback;
  }
}

// ============================================
// TYPED DATA LOADERS
// ============================================

/**
 * Load all suppliers with hospitality readiness data
 */
export async function getSuppliers(): Promise<Supplier[]> {
  return loadJsonFile<Supplier[]>('suppliers_enhanced.json', []);
}

/**
 * Load a single supplier by ID
 */
export async function getSupplierById(id: string): Promise<Supplier | null> {
  const suppliers = await getSuppliers();
  return suppliers.find(s => s.id === id) || null;
}

/**
 * Load all case studies
 */
export async function getCaseStudies(): Promise<CaseStudy[]> {
  return loadJsonFile<CaseStudy[]>('caseStudies_clean.json', []);
}

/**
 * Load a single case study by ID
 */
export async function getCaseStudyById(id: string): Promise<CaseStudy | null> {
  const caseStudies = await getCaseStudies();
  return caseStudies.find(cs => cs.id === id) || null;
}

/**
 * Load consultants (Tier 1 PM specialists)
 * Note: consultants.json contains enhanced data with tier1 array
 */
export async function getConsultantsEnhanced(): Promise<ConsultantEnhanced> {
  return loadJsonFile<ConsultantEnhanced>('consultants.json', { tier1: [] });
}

/**
 * Load consultants as flat array (extracts tier1 from consultants.json)
 */
export async function getConsultants(): Promise<Consultant[]> {
  const data = await getConsultantsEnhanced();
  return data.tier1 || [];
}

/**
 * Load all sources for reference
 */
export async function getSources(): Promise<Source[]> {
  return loadJsonFile<Source[]>('sources.json', []);
}

/**
 * Load certifications data
 */
export async function getCertifications(): Promise<Certification[]> {
  return loadJsonFile<Certification[]>('certifications.json', []);
}

/**
 * Load fire safety tiers
 */
export async function getFireSafety(): Promise<{ tiers: FireSafetyTier[] }> {
  return loadJsonFile<{ tiers: FireSafetyTier[] }>('fire_safety.json', { tiers: [] });
}

/**
 * Load regulatory sources
 */
export async function getRegulatorySources(): Promise<RegulatorySource[]> {
  return loadJsonFile<RegulatorySource[]>('regulatory_sources.json', []);
}

/**
 * Load templates
 */
export async function getTemplates(): Promise<Template[]> {
  return loadJsonFile<Template[]>('templates.json', []);
}

/**
 * Load a single template by ID
 */
export async function getTemplateById(id: string): Promise<Template | null> {
  const templates = await getTemplates();
  return templates.find(t => t.id === id) || null;
}

/**
 * Load scenarios
 */
export async function getScenarios(): Promise<Scenario[]> {
  return loadJsonFile<Scenario[]>('scenarios.json', []);
}

/**
 * Load public procurement data
 */
export async function getPublicProcurement(): Promise<Record<string, unknown>> {
  return loadJsonFile<Record<string, unknown>>('public_procurement.json', {});
}

/**
 * Load specifications data
 */
export async function getSpecifications(): Promise<Record<string, unknown>> {
  return loadJsonFile<Record<string, unknown>>('specifications.json', {});
}

/**
 * Load regulatory practice data
 */
export async function getRegulatoryPractice(): Promise<Record<string, unknown>> {
  return loadJsonFile<Record<string, unknown>>('regulatory_practice.json', {});
}

/**
 * Load Fyra profile data
 */
export async function getFyraProfile(): Promise<Record<string, unknown>> {
  return loadJsonFile<Record<string, unknown>>('fyra-profile.json', {});
}

// ============================================
// AGGREGATED DATA LOADERS
// ============================================

/**
 * Load all data needed for the landing page
 */
export async function getLandingPageData() {
  const [suppliers, caseStudies, consultantsEnhanced] = await Promise.all([
    getSuppliers(),
    getCaseStudies(),
    getConsultantsEnhanced(),
  ]);

  return {
    suppliers,
    caseStudies,
    consultants: consultantsEnhanced.tier1 || [],
  };
}

/**
 * Load all data needed for the report page
 */
export async function getReportData() {
  const [
    suppliers,
    caseStudies,
    consultantsEnhanced,
    certifications,
    fireSafety,
    specifications,
    fyraProfile,
  ] = await Promise.all([
    getSuppliers(),
    getCaseStudies(),
    getConsultantsEnhanced(),
    getCertifications(),
    getFireSafety(),
    getSpecifications(),
    getFyraProfile(),
  ]);

  return {
    suppliers,
    caseStudies,
    consultants: consultantsEnhanced.tier1 || [],
    certifications,
    fireSafety,
    specifications,
    fyraProfile,
  };
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get tier number from tier string
 */
export function getTierNumber(tier: string): number {
  const match = tier.match(/\d/);
  return match ? parseInt(match[0], 10) : 3;
}

/**
 * Filter suppliers by tier
 */
export function filterSuppliersByTier(suppliers: Supplier[], tier: number): Supplier[] {
  return suppliers.filter(s => getTierNumber(s.hospitalityReadiness.tier) === tier);
}

/**
 * Get hospitality-ready suppliers (Tier 1 and 2)
 */
export function getHospitalityReadySuppliers(suppliers: Supplier[]): Supplier[] {
  return suppliers.filter(s => {
    const tierNum = getTierNumber(s.hospitalityReadiness.tier);
    return tierNum <= 2;
  });
}
