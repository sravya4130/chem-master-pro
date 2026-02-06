// Basic Concepts of Chemistry Data

export interface FormulaCard {
  term: string;
  formula: string;
}

// Slide 4 & 5: Atomic/Molecular Mass formulas for flashcard game
export const massFormulas: FormulaCard[] = [
  { term: 'Atomic Weight', formula: 'Relative atomic mass compared to 1/12 of C-12' },
  { term: 'Molecular Weight', formula: 'Sum of atomic weights of all atoms in molecule' },
  { term: 'Atomic Mass', formula: 'Mass of one atom in amu (1 amu = 1.66 × 10⁻²⁴ g)' },
  { term: 'Molecular Mass', formula: 'Mass of one molecule in amu' },
  { term: 'Average Atomic Mass', formula: 'Σ(isotope mass × fractional abundance)' },
  { term: 'Gram Atomic Mass', formula: 'Mass of 1 mole of atoms in grams' },
];

// Solution concentration formulas
export const concentrationFormulas: FormulaCard[] = [
  { term: '% w/w', formula: '(Mass of solute / Mass of solution) × 100' },
  { term: '% w/V', formula: '(Mass of solute / Volume of solution) × 100' },
  { term: '% V/V', formula: '(Volume of solute / Volume of solution) × 100' },
  { term: 'Molality (m)', formula: 'Moles of solute / Mass of solvent (kg)' },
  { term: 'Molarity (M)', formula: 'Moles of solute / Volume of solution (L)' },
  { term: 'Molarity of Mixture', formula: 'M = (M₁V₁ + M₂V₂) / (V₁ + V₂)' },
  { term: 'Mole Fraction (χ)', formula: 'χₐ = nₐ / (nₐ + nᵦ)' },
  { term: 'Mole Fraction ↔ Molality', formula: 'm = χₛₒₗᵤₜₑ × 1000 / (χₛₒₗᵥₑₙₜ × Mₛₒₗᵥₑₙₜ)' },
  { term: 'M ↔ m ↔ d Relation', formula: 'M = (m × d × 1000) / (1000 + m × Mₛₒₗᵤₜₑ)' },
];

// Equivalent weight formulas
export const equivalentFormulas: FormulaCard[] = [
  { term: 'Eq. Wt. (Element)', formula: 'Atomic mass / Valency' },
  { term: 'Eq. Wt. (Ion)', formula: 'Ionic mass / Charge on ion' },
  { term: 'Eq. Wt. (Ionic Compound)', formula: 'Formula mass / Total +ve or -ve charge' },
  { term: 'Eq. Wt. (Acid)', formula: 'Molecular mass / Basicity (n-factor)' },
  { term: 'Eq. Wt. (Base)', formula: 'Molecular mass / Acidity (n-factor)' },
  { term: 'Normality (N)', formula: 'Gram equivalents / Volume of solution (L)' },
  { term: 'N ↔ M Relation', formula: 'N = M × n-factor' },
];

// All formulas combined for final recap
export const allChemistryFormulas: FormulaCard[] = [
  ...massFormulas,
  { term: 'Mole', formula: 'n = Given mass / Molar mass' },
  { term: 'Avogadro Number', formula: 'Nₐ = 6.022 × 10²³' },
  { term: 'Mole (Entities)', formula: 'n = Number of entities / Nₐ' },
  { term: 'Mole (Gas at STP)', formula: 'n = Volume / 22.4 L' },
  { term: 'Molar Mass', formula: 'Mass of 1 mole of substance (g/mol)' },
  { term: '% of Element', formula: '(n × Atomic mass / Molecular mass) × 100' },
  { term: 'Empirical Formula', formula: 'Simplest whole number ratio of atoms' },
  { term: 'Molecular Formula', formula: 'n × Empirical formula (n = Molar mass/EF mass)' },
  ...concentrationFormulas,
  ...equivalentFormulas,
];

// Laws of Chemical Combination
export const chemicalLaws = [
  {
    name: 'Law of Conservation of Mass',
    scientist: 'Antoine Lavoisier (1789)',
    definition: 'Mass can neither be created nor destroyed in a chemical reaction. The total mass of reactants equals the total mass of products.',
    example: 'When 12g of carbon burns in 32g of oxygen, it produces exactly 44g of carbon dioxide. (12 + 32 = 44)'
  },
  {
    name: 'Law of Definite Proportions',
    scientist: 'Joseph Proust (1799)',
    definition: 'A chemical compound always contains the same elements combined in the same fixed proportion by mass.',
    example: 'Water (H₂O) always contains hydrogen and oxygen in the ratio 1:8 by mass, regardless of the source.'
  },
  {
    name: 'Law of Multiple Proportions',
    scientist: 'John Dalton (1803)',
    definition: 'When two elements combine to form more than one compound, the different masses of one element that combine with a fixed mass of the other bear a simple whole number ratio.',
    example: 'In CO and CO₂, the ratio of oxygen combining with a fixed mass of carbon is 16:32 or 1:2.'
  },
  {
    name: "Gay-Lussac's Law of Gaseous Volumes",
    scientist: 'Joseph Gay-Lussac (1808)',
    definition: 'When gases react, they do so in volumes which bear a simple whole number ratio to each other and to the volume of products (at same T & P).',
    example: '2 volumes H₂ + 1 volume O₂ → 2 volumes H₂O vapor (ratio 2:1:2)'
  },
  {
    name: "Avogadro's Law",
    scientist: 'Amedeo Avogadro (1811)',
    definition: 'Equal volumes of all gases at the same temperature and pressure contain equal number of molecules.',
    example: '22.4 L of any gas at STP contains 6.022 × 10²³ molecules (1 mole).'
  },
];

// Dalton's Atomic Theory Postulates
export const daltonTheory = {
  about: "John Dalton (1766-1844) was an English chemist, physicist, and meteorologist. He is best known for his pioneering work in the development of modern atomic theory and his research on color blindness (sometimes called Daltonism).",
  postulates: [
    'Matter is made up of extremely small indivisible particles called atoms.',
    'Atoms of the same element are identical in mass, size, and chemical properties.',
    'Atoms of different elements have different masses and chemical properties.',
    'Atoms cannot be created, divided, or destroyed during chemical reactions.',
    'Atoms combine in simple whole number ratios to form compounds.',
    'In a given compound, the relative number and kinds of atoms are constant.',
  ],
  limitations: [
    'Atoms can be divided into subatomic particles (electrons, protons, neutrons).',
    'Isotopes exist - atoms of same element can have different masses.',
    'Atoms can be created/destroyed in nuclear reactions.',
  ]
};

// Solution types
export const solutionTypes = [
  { type: 'Gas in Gas', solute: 'Gas', solvent: 'Gas', example: 'Air (O₂ in N₂)' },
  { type: 'Gas in Liquid', solute: 'Gas', solvent: 'Liquid', example: 'Soda water (CO₂ in water)' },
  { type: 'Gas in Solid', solute: 'Gas', solvent: 'Solid', example: 'H₂ in palladium' },
  { type: 'Liquid in Gas', solute: 'Liquid', solvent: 'Gas', example: 'Humidity (water vapor in air)' },
  { type: 'Liquid in Liquid', solute: 'Liquid', solvent: 'Liquid', example: 'Alcohol in water' },
  { type: 'Liquid in Solid', solute: 'Liquid', solvent: 'Solid', example: 'Mercury in amalgam' },
  { type: 'Solid in Gas', solute: 'Solid', solvent: 'Gas', example: 'Smoke, dust in air' },
  { type: 'Solid in Liquid', solute: 'Solid', solvent: 'Liquid', example: 'Sugar in water' },
  { type: 'Solid in Solid', solute: 'Solid', solvent: 'Solid', example: 'Alloys (brass, bronze)' },
];
