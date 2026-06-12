import { PaintingService, Testimonial, FAQItem, ProjectBeforeAfter } from '../../types';

export const PAINTING_SERVICES: PaintingService[] = [
  {
    id: 'undercoating',
    title: 'Professional Undercoating & Priming',
    category: 'Preparation',
    shortDescription: 'Essential deep-penetration adhesion sealer and color blockers for clean, long-lasting final coats.',
    longDescription: 'Undercoating is the foundation of any stunning paint job. We apply advanced moisture-resistant sealers and high-blocking primers to neutralize old wall patterns, control paint absorption, and ensure absolute color uniformity.',
    pricePerSqm: 850,
    estimatedHoursPerSqm: 0.25,
    materialsIncluded: [
      'Moisture-Guard Acrylic Primers',
      'Stain-Blocking Sealers',
      'High-Adhesion Bond Undercoat'
    ],
    steps: [
      { title: 'Substrate Cleaning', desc: 'Removing oils, dust, carbonaceous residues, and old friable coatings.' },
      { title: 'Spot Patching', desc: 'Filling minor nail holes and microscopic hairline cracks with quality compounds.' },
      { title: 'First Undercoat Coat', desc: 'Applying a high-build, breathable undercoat systematically with precision nap rollers.' },
      { title: 'Detail Curing Check', desc: 'Inspecting surface tension and curing profile before top coat routing.' }
    ],
    image: '/src/assets/images/skim_coating_prep_1780668177817.png', // Fallback to prep
    benefits: [
      'Blocks old chemical stains and smoke discoloration.',
      'Prevents uneven patch absorption or roller overlap ghosting.',
      'Reduces subsequent premium color paint consumption by 35%.'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-painter-painting-a-wall-with-a-roller-41398-large.mp4'
  },
  {
    id: 'skimming',
    title: 'Wall Skimming & Leveling (Level 5 Finish)',
    category: 'Preparation',
    shortDescription: 'Masterful ultra-thin plastering application to eliminate drywall grain, bulges, and structural dimples.',
    longDescription: 'Skimming (or plaster skimming) is the pinnacle of decorative wall preparation. Our certified craftsmen apply multiple tissue-thin layers of highly durable compound to create an completely flat, glass-smooth, "Level 5" finish ready for elite coatings.',
    pricePerSqm: 1400,
    estimatedHoursPerSqm: 0.6,
    materialsIncluded: [
      'Ultra-Fine Multi-Finish Compounds',
      'Micro-Fiber Reinforcement Mesh (for stress zones)',
      'Dust-Free Abrasive Screening'
    ],
    steps: [
      { title: 'Base Rectification', desc: 'Grinding down high spots and removing drywall joint irregularities.' },
      { title: 'Mesh Enforcement', desc: 'Detailing joints, sockets, and structural boundaries with alkaline-resistant mesh.' },
      { title: 'Dual Coat Application', desc: 'Applying double-pass, ultra-thin plaster skim coats via dual-handle trowels.' },
      { title: 'Orthogonal Sanding', desc: 'Sanding under 2000-lumen directional scraping lights to guarantee absolute flat planes.' }
    ],
    image: '/src/assets/images/skim_coating_prep_1780668177817.png',
    benefits: [
      'Transforms rough drywall or old plaster into smooth slate.',
      'Maintains structural integrity and blocks surface micro-cracking.',
      'Mandatory for premium high-gloss, satin, or specialty wall finishes.'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hand-with-a-roller-painting-a-wall-white-41397-large.mp4'
  },
  {
    id: 'interior-painting',
    title: 'Premium Interior Finishing',
    category: 'Finishing',
    shortDescription: 'Flawless topcoat painting using high-pigment wash-resistant paints with exquisite matte or satin textures.',
    longDescription: 'Our interior top coating is a luxurious aesthetic upgrade. We utilize professional two-pass fine finish sprayers and micro-fiber rollers to construct deep, velvety color planes with zero visible overlaps, streaks, or micro-bubbles.',
    pricePerSqm: 1200,
    estimatedHoursPerSqm: 0.4,
    materialsIncluded: [
      'Low-VOC Premium High-Pigment Top Coat',
      'Gentle Edge Masking Tapes',
      'Floor and Static Dust Coverings'
    ],
    steps: [
      { title: 'Laser Masking', desc: 'Sealing baseboards, window casings, trim, and fixtures with high-precision masking systems.' },
      { title: 'Precision Cut-In', desc: 'Brush-coating corners, switches, and detail margins with custom sash angled tools.' },
      { title: 'Uniform Double Pass', desc: 'Applying two separate, cross-hatched premium color layers to achieve exact paint depth.' },
      { title: 'Clean-up & Inspection', desc: 'Instant removal of protective films, full vacuuming, and touch-up lighting review.' }
    ],
    image: '/src/assets/images/hero_painting_banner_1780668160976.png',
    benefits: [
      'Stain-resistant, scrub-resilient surfaces (ideal for high-traffic zones).',
      'Odor-free, non-toxic, and hypoallergenic paint options available.',
      'Deep, mesmerizing light scattering properties across different angles.'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-interior-designer-selecting-colors-from-a-palette-41400-large.mp4'
  },
  {
    id: 'exterior-protective',
    title: 'External Elastomeric Coating',
    category: 'Finishing',
    shortDescription: 'Weatherproof elastic membrane formulas to protect home exteriors from heavy UV radiation, biological growth, and moisture.',
    longDescription: 'Extravagant exterior structures demand premium insulation. Our elastomeric painting creates a highly durable, flexible envelope that expands and contracts up to 300% to successfully absorb seasonal shifts, thermal stresses, and rain.',
    pricePerSqm: 1850,
    estimatedHoursPerSqm: 0.8,
    materialsIncluded: [
      'High-Elastic Fungistatic Polymers',
      'Structural Masonry Bonders',
      'Heavy-Duty Weather-Proofing Sealant'
    ],
    steps: [
      { title: 'Hydro-Jet Preparation', desc: 'Deep washing at 3500 PSI to remove old oxidation, moss, chalking, and dirt overlays.' },
      { title: 'Fissure Sealing', desc: 'Injecting customized flexible elastomeric sealant into exterior micro-fissures.' },
      { title: 'Stucco/Masonry Priming', desc: 'Rolling heavy-adhesion block primer designed specifically for outdoor masonry.' },
      { title: 'Dual Airless Coating', desc: 'High-build airless spraying at wet-film thicknesses optimized for maximum weathering life.' }
    ],
    image: 'https://picsum.photos/seed/exterior/800/600',
    benefits: [
      '300% stretchability prevents surface stress fracturing.',
      'Advanced biocidal shield limits moss, mold, or mildew development.',
      'Keeps building cooler through high Solar Reflectance Index (SRI) ratings.'
    ]
  },
  {
    id: 'venetian-specialty',
    title: 'Textured Venetian Plaster & Metallic Finishes',
    category: 'Specialty',
    shortDescription: 'Sophisticated decorative Italian-style finishes, limestone plasters, and metallic glaze accent walls.',
    longDescription: 'Bring classic luxury to your key focus walls. Using imported marble dust lime plasters or real metallic iron/copper oxidation pigments, we custom manufacture high-depth statement walls that shimmer under illumination and last generations.',
    pricePerSqm: 4500,
    estimatedHoursPerSqm: 2.5,
    materialsIncluded: [
      'Imported Aged Slaked Lime Venetian Plaster',
      'Carnauba Wax Polishing Formula',
      'Mica/Metallic Leaf Detailing Slurry'
    ],
    steps: [
      { title: 'Level 5 Substrate Prep', desc: 'Ensuring an unconditionally smooth, non-flexing underlying board skeleton.' },
      { title: 'Base Texturing', desc: 'Applying Slaked Lime plaster with a small custom polishing trowel in cross-hatch striae.' },
      { title: 'Compression Burnishing', desc: 'Rubbing the partially-dry layer with a high-durability trowel at an angle to create natural marble lustre.' },
      { title: 'Organic Waxing Protection', desc: 'Buffing authentic carnauba hot-waxes deep into the marble grain for premium sheen and water resistance.' }
    ],
    image: 'https://picsum.photos/seed/venetian/800/600',
    benefits: [
      'One-of-a-kind statement textures that cannot be emulated by wallpaper.',
      'Naturally breathable, lime-based coating is allergen-free and anti-mold.',
      'Acquires beautiful patina with age, becoming an permanent artistic layout.'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Eleanor Vance',
    role: 'Principal Interior Designer, Atelier Vance',
    text: 'For our boutique showroom project, we required an absolute Level-5 skim coat and custom matte teal finish. Their crew is incredibly precise. The flat walls are completely seamless, even under severe rake illumination.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: 't2',
    name: 'Marcus Sterling',
    role: 'Estate Manager, Sterling Properties',
    text: 'Usually e-commerce quotes are wildly inaccurate, but their customized wall interactive calculator was within 3% of the final physical assessment. They completed 420 sqm of undercoating, skimming, and painting ahead of schedule.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: 't3',
    name: 'Siddharth Patel',
    role: 'Residential Architect',
    text: 'We specified the textured Venetian Slaked Lime for a luxury penthouse project. The technique and trowel work are world-class. Seeing this level of craftsmanship available to be custom ordered online is a game-changer.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150'
  }
];

export const BEFORE_AFTER_GALLERY: ProjectBeforeAfter[] = [
  {
    id: 'g1',
    title: 'Water-Damaged Drywall to Level-5 Slick Finish',
    description: 'A complete rehabilitation involving drywall correction, joint reinforcement, 2-coat troweled skimming, and dual premium matte undercoating.',
    beforeImage: 'https://picsum.photos/seed/wallbefore1/1000/600?blur=4',
    afterImage: 'https://picsum.photos/seed/wallafter1/1000/600',
    tags: ['Skimming', 'Undercoating', 'Matte Topcoat']
  },
  {
    id: 'g2',
    title: 'Old Concrete Brick to Smooth Venetian Luxury',
    description: 'Transforming a dark industrial cold storage brick wall into a warm, light-scattering burnished lime plaster accent column with golden mica wax.',
    beforeImage: 'https://picsum.photos/seed/wallbefore2/1000/600?blur=5',
    afterImage: 'https://picsum.photos/seed/wallafter2/1000/600',
    tags: ['Venetian Plaster', 'Accent Wall', 'Master Craft']
  },
  {
    id: 'g3',
    title: 'Stained Office Boardroom Prep & Finishing',
    description: 'Correction of massive marker and adhesive residue via stain-blocking shellac undercoat, fine sanding, and high-coverage satin acrylic coat.',
    beforeImage: 'https://picsum.photos/seed/wallbefore3/1000/600?blur=4',
    afterImage: 'https://picsum.photos/seed/wallafter3/1000/600',
    tags: ['Undercoating', 'Stain-Blocking', 'Satin Enamel']
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'f1',
    question: 'What is the absolute difference between undercoating and skimming?',
    answer: 'Undercoating is the chemical primer and sealer layer applied to seal porous walls, block stains, and guarantee strong paint adhesion. Skimming is a mechanical leveling process where we spread super-thin sheets of compound plaster to level out uneven drywall, dips, old textures, and micro-cracks. Combining both creates a flawless, premium wall.',
    category: 'process'
  },
  {
    id: 'f2',
    question: 'How accurate is the custom quote calculator?',
    answer: 'Extremely accurate! The custom calculator operates on certified labor hours and square-meter rates. Once checked out, an expert surveyor performs a rapid digital 3D-laser scan of your rooms to verify final dimensions. If there is a discrepancy of over 5%, we automatically adjust the transaction or refund the difference immediately.',
    category: 'pricing'
  },
  {
    id: 'f3',
    question: 'Do I need to vacate my house during skimming or painting operations?',
    answer: 'Generally, no. We use zero-VOC, ultra-low odor paint bases and completely dust-free Festool active vacuum sanders. This means 95% of dust is vacuumed instantly at the plaster tool-face, keeping your air safe and breathable throughout the progress.',
    category: 'care'
  },
  {
    id: 'f4',
    question: 'How long do the coating services take to fully cure?',
    answer: 'Standard undercoats cure in 2-4 hours. Skimming compounds dry in 12-24 hours depending on room ventilation and seasonal humidity. Topcoats are dry to the touch in 2 hours and reach fully washable polymer structural hardness in 14-21 days.',
    category: 'care'
  },
  {
    id: 'f5',
    question: 'How do we schedule the actual physical application after ordering online?',
    answer: 'As soon as your booking is finalized, a coordinator calls to book the 3D-laser verification. You can choose start dates spanning any timeframe from 48 hours to 3 months relative to your check-out date.',
    category: 'booking'
  }
];
