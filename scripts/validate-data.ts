#!/usr/bin/env npx ts-node

/**
 * Fyra Circular Platform - Data Validation Script
 * Validates data integrity across all JSON files
 *
 * Run: npx ts-node scripts/validate-data.ts
 * Or:  npm run validate (after adding to package.json)
 */

import * as fs from 'fs';
import * as path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

interface ValidationResult {
  file: string;
  valid: boolean;
  errors: string[];
  warnings: string[];
}

interface Source {
  id: string;
  title?: string;
  name?: string;
  url?: string;
}

interface SourcesFile {
  metadata?: unknown;
  sources: Source[];
}

interface Supplier {
  id: string;
  name: string;
  sourceRefs?: string[];
}

interface CaseStudy {
  id: string;
  title: string;
  sourceRefs?: string[];
}

const results: ValidationResult[] = [];

// ANSI colors for terminal output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
};

function log(message: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function loadJson<T>(filename: string): T | null {
  try {
    const filePath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content) as T;
  } catch (error) {
    return null;
  }
}

function validateSourceRefs(
  items: Array<{ id: string; sourceRefs?: string[] }>,
  sources: Source[],
  itemType: string
): { errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];
  const sourceIds = new Set(sources.map(s => s.id));

  for (const item of items) {
    if (!item.sourceRefs || item.sourceRefs.length === 0) {
      warnings.push(`${itemType} "${item.id}" has no sourceRefs`);
      continue;
    }

    for (const ref of item.sourceRefs) {
      if (!sourceIds.has(ref)) {
        errors.push(`${itemType} "${item.id}" references non-existent source: "${ref}"`);
      }
    }
  }

  return { errors, warnings };
}

function validateRequiredFields<T extends Record<string, unknown>>(
  items: T[],
  requiredFields: string[],
  itemType: string,
  idField: string = 'id'
): { errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  for (const item of items) {
    const id = item[idField] as string || 'unknown';

    for (const field of requiredFields) {
      const value = item[field];
      if (value === undefined || value === null) {
        errors.push(`${itemType} "${id}" missing required field: ${field}`);
      } else if (value === '') {
        warnings.push(`${itemType} "${id}" has empty value for: ${field}`);
      }
    }
  }

  return { errors, warnings };
}

function validateUniqueIds<T extends { id: string }>(
  items: T[],
  itemType: string
): { errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];
  const seen = new Set<string>();

  for (const item of items) {
    if (seen.has(item.id)) {
      errors.push(`Duplicate ${itemType} ID: "${item.id}"`);
    }
    seen.add(item.id);
  }

  return { errors, warnings };
}

// ============================================
// VALIDATION FUNCTIONS
// ============================================

function validateSources(): ValidationResult {
  const result: ValidationResult = {
    file: 'sources.json',
    valid: true,
    errors: [],
    warnings: [],
  };

  const sourcesFile = loadJson<SourcesFile>('sources.json');
  if (!sourcesFile || !sourcesFile.sources) {
    result.errors.push('Failed to load sources.json or invalid format');
    result.valid = false;
    return result;
  }

  const sources = sourcesFile.sources;

  // Check for unique IDs
  const idCheck = validateUniqueIds(sources, 'source');
  result.errors.push(...idCheck.errors);
  result.warnings.push(...idCheck.warnings);

  // Check required fields (title or name)
  for (const source of sources) {
    if (!source.id) {
      result.errors.push('Source missing required field: id');
    }
    if (!source.title && !source.name) {
      result.warnings.push(`Source "${source.id}" missing both title and name`);
    }
  }

  // Check for valid URLs
  for (const source of sources) {
    if (source.url && !source.url.startsWith('http')) {
      result.warnings.push(`Source "${source.id}" has invalid URL: ${source.url}`);
    }
  }

  result.valid = result.errors.length === 0;
  return result;
}

function validateSuppliers(): ValidationResult {
  const result: ValidationResult = {
    file: 'suppliers_enhanced.json',
    valid: true,
    errors: [],
    warnings: [],
  };

  const suppliers = loadJson<Supplier[]>('suppliers_enhanced.json');
  const sourcesFile = loadJson<SourcesFile>('sources.json');
  const sources = sourcesFile?.sources || null;

  if (!suppliers) {
    result.errors.push('Failed to load suppliers_enhanced.json');
    result.valid = false;
    return result;
  }

  if (!sources) {
    result.warnings.push('Could not validate sourceRefs - sources.json not found');
  }

  // Check for unique IDs
  const idCheck = validateUniqueIds(suppliers, 'supplier');
  result.errors.push(...idCheck.errors);
  result.warnings.push(...idCheck.warnings);

  // Check required fields (id and name are critical, others are warnings)
  const criticalFieldCheck = validateRequiredFields(
    suppliers,
    ['id', 'name'],
    'supplier'
  );
  result.errors.push(...criticalFieldCheck.errors);
  result.warnings.push(...criticalFieldCheck.warnings);

  // Check recommended fields (warnings only)
  const recommendedFieldCheck = validateRequiredFields(
    suppliers,
    ['description', 'country'],
    'supplier'
  );
  result.warnings.push(...recommendedFieldCheck.errors);
  result.warnings.push(...recommendedFieldCheck.warnings);

  // Validate sourceRefs
  if (sources) {
    const refCheck = validateSourceRefs(suppliers, sources, 'Supplier');
    result.errors.push(...refCheck.errors);
    result.warnings.push(...refCheck.warnings);
  }

  result.valid = result.errors.length === 0;
  return result;
}

function validateCaseStudies(): ValidationResult {
  const result: ValidationResult = {
    file: 'caseStudies_clean.json',
    valid: true,
    errors: [],
    warnings: [],
  };

  const caseStudies = loadJson<CaseStudy[]>('caseStudies_clean.json');
  const sourcesFile = loadJson<SourcesFile>('sources.json');
  const sources = sourcesFile?.sources || null;

  if (!caseStudies) {
    result.errors.push('Failed to load caseStudies_clean.json');
    result.valid = false;
    return result;
  }

  if (!sources) {
    result.warnings.push('Could not validate sourceRefs - sources.json not found');
  }

  // Check for unique IDs
  const idCheck = validateUniqueIds(caseStudies, 'case study');
  result.errors.push(...idCheck.errors);
  result.warnings.push(...idCheck.warnings);

  // Check required fields
  const fieldCheck = validateRequiredFields(
    caseStudies,
    ['id', 'title', 'location'],
    'case study'
  );
  result.errors.push(...fieldCheck.errors);
  result.warnings.push(...fieldCheck.warnings);

  // Validate sourceRefs
  if (sources) {
    const refCheck = validateSourceRefs(caseStudies, sources, 'Case study');
    result.errors.push(...refCheck.errors);
    result.warnings.push(...refCheck.warnings);
  }

  result.valid = result.errors.length === 0;
  return result;
}

function validateJsonFiles(): ValidationResult[] {
  const results: ValidationResult[] = [];

  // List of JSON files to validate for basic JSON syntax
  const jsonFiles = [
    'suppliers_enhanced.json',
    'caseStudies_clean.json',
    'consultants.json',
    'certifications.json',
    'fire_safety.json',
    'regulatory_sources.json',
    'public_procurement.json',
    'specifications.json',
    'scenarios.json',
    'templates.json',
    'sources.json',
  ];

  for (const filename of jsonFiles) {
    const result: ValidationResult = {
      file: filename,
      valid: true,
      errors: [],
      warnings: [],
    };

    const filePath = path.join(DATA_DIR, filename);

    if (!fs.existsSync(filePath)) {
      result.warnings.push(`File not found: ${filename}`);
      results.push(result);
      continue;
    }

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      JSON.parse(content);
    } catch (error) {
      result.errors.push(`Invalid JSON syntax: ${error}`);
      result.valid = false;
    }

    results.push(result);
  }

  return results;
}

// ============================================
// MAIN EXECUTION
// ============================================

function main() {
  log('\n========================================', 'blue');
  log('  FYRA DATA VALIDATION', 'bold');
  log('========================================\n', 'blue');

  // Validate JSON syntax
  log('Checking JSON syntax...', 'blue');
  const syntaxResults = validateJsonFiles();
  results.push(...syntaxResults);

  // Run specific validations
  log('Validating sources.json...', 'blue');
  results.push(validateSources());

  log('Validating suppliers_enhanced.json...', 'blue');
  results.push(validateSuppliers());

  log('Validating caseStudies_clean.json...', 'blue');
  results.push(validateCaseStudies());

  // Summary
  log('\n========================================', 'blue');
  log('  VALIDATION SUMMARY', 'bold');
  log('========================================\n', 'blue');

  let totalErrors = 0;
  let totalWarnings = 0;
  let filesWithErrors = 0;

  for (const result of results) {
    if (result.errors.length > 0 || result.warnings.length > 0) {
      log(`\n${result.file}:`, result.valid ? 'yellow' : 'red');

      for (const error of result.errors) {
        log(`  ❌ ${error}`, 'red');
        totalErrors++;
      }

      for (const warning of result.warnings) {
        log(`  ⚠️  ${warning}`, 'yellow');
        totalWarnings++;
      }

      if (!result.valid) {
        filesWithErrors++;
      }
    }
  }

  log('\n----------------------------------------', 'blue');

  if (totalErrors === 0 && totalWarnings === 0) {
    log('✅ All validations passed!', 'green');
  } else {
    if (totalErrors > 0) {
      log(`❌ ${totalErrors} error(s) found in ${filesWithErrors} file(s)`, 'red');
    }
    if (totalWarnings > 0) {
      log(`⚠️  ${totalWarnings} warning(s) found`, 'yellow');
    }
  }

  log('----------------------------------------\n', 'blue');

  // Exit with error code if there are errors
  if (totalErrors > 0) {
    process.exit(1);
  }
}

main();
