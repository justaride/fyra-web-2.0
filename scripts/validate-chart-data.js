/**
 * Data Validation Script for Fyra Circular Platform
 * Sprint 9 - Validates that all chart data points have source references
 *
 * Run with: node scripts/validate-chart-data.js
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');

// Load JSON files
function loadJson(filename) {
  const filePath = path.join(DATA_DIR, filename);
  const content = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(content);
}

// Validation results
const errors = [];
const warnings = [];
const stats = {
  suppliersTotal: 0,
  suppliersWithSources: 0,
  sourcesTotal: 0,
  sourcesValid: 0,
  fireSafetyTiers: 0,
  enforcementLevels: 0
};

console.log('\\n=== Fyra Data Validation Script ===\\n');
console.log('Validating chart data sources...\\n');

// Load all data files
let suppliers, sources, fireSafety, regulatoryPractice, caseStudies;

try {
  suppliers = loadJson('suppliers_enhanced.json');
  sources = loadJson('sources.json');
  fireSafety = loadJson('fire_safety.json');
  regulatoryPractice = loadJson('regulatory_practice.json');
  caseStudies = loadJson('caseStudies_clean.json');
  console.log('✓ All data files loaded successfully\\n');
} catch (err) {
  console.error('✗ Error loading data files:', err.message);
  process.exit(1);
}

// Build source ID lookup
const sourceIds = new Set(sources.sources.map(s => s.id));
stats.sourcesTotal = sourceIds.size;
console.log(`Found ${sourceIds.size} registered sources\\n`);

// === Validate Suppliers ===
console.log('--- Validating Suppliers (SupplierRadar data) ---');
stats.suppliersTotal = suppliers.length;

suppliers.forEach(supplier => {
  // Check if supplier has sourceRefs
  if (!supplier.sourceRefs || supplier.sourceRefs.length === 0) {
    warnings.push(`Supplier "${supplier.name}" (${supplier.id}) has no sourceRefs`);
  } else {
    stats.suppliersWithSources++;

    // Verify each sourceRef exists
    supplier.sourceRefs.forEach(ref => {
      if (!sourceIds.has(ref)) {
        errors.push(`Supplier "${supplier.name}" references non-existent source: "${ref}"`);
      } else {
        stats.sourcesValid++;
      }
    });
  }

  // Check required fields for radar chart
  const radarFields = ['b2bReadiness', 'hospitalityReadiness', 'services'];
  radarFields.forEach(field => {
    if (!supplier[field]) {
      warnings.push(`Supplier "${supplier.name}" missing field: ${field}`);
    }
  });
});

console.log(`  Total suppliers: ${stats.suppliersTotal}`);
console.log(`  With source refs: ${stats.suppliersWithSources}`);
console.log(`  Coverage: ${Math.round(stats.suppliersWithSources / stats.suppliersTotal * 100)}%\\n`);

// === Validate Fire Safety (CostTimelineScatter data) ===
console.log('--- Validating Fire Safety Tiers (CostTimelineScatter data) ---');
stats.fireSafetyTiers = fireSafety.tiers.length;

fireSafety.tiers.forEach(tier => {
  // Check required fields for scatter chart
  const requiredFields = ['tier', 'name', 'costRange', 'timeline', 'riskLevel'];
  requiredFields.forEach(field => {
    if (!tier[field]) {
      errors.push(`Fire safety tier ${tier.tier} missing required field: ${field}`);
    }
  });
});

// Check if fire_safety.json has sourceRefs
if (!fireSafety.sourceRefs || fireSafety.sourceRefs.length === 0) {
  warnings.push('fire_safety.json has no sourceRefs array at root level');
} else {
  fireSafety.sourceRefs.forEach(ref => {
    if (!sourceIds.has(ref)) {
      errors.push(`fire_safety.json references non-existent source: "${ref}"`);
    }
  });
}

console.log(`  Total tiers: ${stats.fireSafetyTiers}`);
console.log(`  All tiers have required fields: ${errors.filter(e => e.includes('Fire safety')).length === 0 ? '✓' : '✗'}\\n`);

// === Validate Regulatory Practice (EnforcementHeatmap data) ===
console.log('--- Validating Regulatory Practice (EnforcementHeatmap data) ---');
const enforcementLevels = regulatoryPractice.regulatoryPractice?.enforcementLevels || [];
stats.enforcementLevels = enforcementLevels.length;

enforcementLevels.forEach((item, idx) => {
  const requiredFields = ['category', 'regulation', 'enforcementLevel', 'enforcementDescription'];
  requiredFields.forEach(field => {
    if (!item[field]) {
      errors.push(`Enforcement level ${idx + 1} missing required field: ${field}`);
    }
  });

  // Validate enforcement level values
  const validLevels = ['high', 'medium', 'low', 'future'];
  if (item.enforcementLevel && !validLevels.includes(item.enforcementLevel)) {
    errors.push(`Enforcement level "${item.category}" has invalid level: ${item.enforcementLevel}`);
  }
});

console.log(`  Total enforcement categories: ${stats.enforcementLevels}`);
console.log(`  All categories have required fields: ${errors.filter(e => e.includes('Enforcement')).length === 0 ? '✓' : '✗'}\\n`);

// === Validate Case Studies ===
console.log('--- Validating Case Studies ---');
const caseStudiesCount = caseStudies.length;
let caseStudiesWithSources = 0;

caseStudies.forEach(study => {
  if (!study.sourceRefs || study.sourceRefs.length === 0) {
    warnings.push(`Case study "${study.name}" (${study.id}) has no sourceRefs`);
  } else {
    caseStudiesWithSources++;
    study.sourceRefs.forEach(ref => {
      if (!sourceIds.has(ref)) {
        errors.push(`Case study "${study.name}" references non-existent source: "${ref}"`);
      }
    });
  }
});

console.log(`  Total case studies: ${caseStudiesCount}`);
console.log(`  With source refs: ${caseStudiesWithSources}`);
console.log(`  Coverage: ${Math.round(caseStudiesWithSources / caseStudiesCount * 100)}%\\n`);

// === Summary ===
console.log('\\n=== Validation Summary ===\\n');

if (errors.length === 0) {
  console.log('✓ No errors found!\\n');
} else {
  console.log(`✗ Found ${errors.length} error(s):\\n`);
  errors.forEach((err, idx) => {
    console.log(`  ${idx + 1}. ${err}`);
  });
  console.log('');
}

if (warnings.length > 0) {
  console.log(`⚠ Found ${warnings.length} warning(s):\\n`);
  warnings.slice(0, 10).forEach((warn, idx) => {
    console.log(`  ${idx + 1}. ${warn}`);
  });
  if (warnings.length > 10) {
    console.log(`  ... and ${warnings.length - 10} more warnings`);
  }
  console.log('');
}

// Final stats
console.log('Data Coverage Statistics:');
console.log(`  - Suppliers with sources: ${stats.suppliersWithSources}/${stats.suppliersTotal} (${Math.round(stats.suppliersWithSources / stats.suppliersTotal * 100)}%)`);
console.log(`  - Registered sources: ${stats.sourcesTotal}`);
console.log(`  - Fire safety tiers: ${stats.fireSafetyTiers}`);
console.log(`  - Enforcement levels: ${stats.enforcementLevels}`);
console.log('');

// Exit with error code if there are errors
if (errors.length > 0) {
  console.log('Validation FAILED - fix errors before deploying\\n');
  process.exit(1);
} else {
  console.log('Validation PASSED - all chart data is properly sourced\\n');
  process.exit(0);
}
