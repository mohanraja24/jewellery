export const INITIAL_CATEGORIES = [
  {
    id: 'gold',
    name: 'Gold Jewellery',
    slug: 'gold',
    description: 'Timeless 22K & 18K hallmarked yellow and rose gold jewellery.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    itemCount: 48,
  },
  {
    id: 'diamond',
    name: 'Diamond Solitaires',
    slug: 'diamond',
    description: 'Certified VVS-EF brilliant cut diamonds set in 18K gold and platinum.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    itemCount: 36,
  },
  {
    id: 'bridal',
    name: 'Bridal Heritage',
    slug: 'bridal',
    description: 'Opulent wedding sets, rani haars, and chokers for the royal bride.',
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80',
    itemCount: 24,
  },
  {
    id: 'silver',
    name: 'Sterling Silver 925',
    slug: 'silver',
    description: 'Contemporary sterling silver jewellery, anklets, and handcrafted silverware.',
    image: 'https://images.unsplash.com/photo-1611591475879-11449d0fc7f4?auto=format&fit=crop&w=800&q=80',
    itemCount: 32,
  },
  {
    id: 'traditional',
    name: 'Traditional & Temple',
    slug: 'traditional',
    description: 'Intricate nakshi, kundan and deity motifs carved by master artisans.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    itemCount: 28,
  },
  {
    id: 'platinum',
    name: 'Platinum Elegance',
    slug: 'platinum',
    description: 'Rare 950 purity platinum love bands and minimalist everyday wear.',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80',
    itemCount: 18,
  },
  {
    id: 'gemstone',
    name: 'Precious Gemstones',
    slug: 'gemstone',
    description: 'Burmese rubies, Zambian emeralds, and sapphire statement adornments.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
    itemCount: 22,
  },
  {
    id: 'antique',
    name: 'Antique Polki',
    slug: 'antique',
    description: 'Uncut polki diamonds, meenakari reverse enamelling and heritage patina.',
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80',
    itemCount: 16,
  },
  {
    id: 'artificial',
    name: 'Artisanal Fashion & CZ',
    slug: 'artificial',
    description: 'Premium gold-plated brass, cubic zirconia and destination wedding sets.',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
    itemCount: 40,
  },
  {
    id: 'dailywear',
    name: 'Daily Wear Modern',
    slug: 'dailywear',
    description: 'Featherlight 14K & 18K gold designs engineered for everyday effortless grace.',
    image: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=800&q=80',
    itemCount: 30,
  }
];

export const INITIAL_PRODUCTS = [
  {
    id: 'PROD-001',
    sku: 'AUR-GLD-NK-001',
    name: 'The Maharani Kasu Mala Necklace',
    category: 'gold',
    subcategory: 'necklaces',
    metalType: 'GOLD',
    purity: '22K',
    pricingType: 'RATE_BASED',
    grossWeight: 42.500,
    netMetalWeight: 42.500,
    stoneWeight: 0,
    stoneValue: 0,
    makingChargeType: 'PERCENT',
    makingCharge: 12, // 12% making charges
    wastagePercentage: 2.0, // 2% wastage
    sizes: ['16 inches', '18 inches', '20 inches'],
    stock: 4,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An iconic South Indian Kasu Mala handcrafted in solid 22K hallmarked yellow gold. Adorned with intricately embossed Goddess Lakshmi coins linked with beaded gold filigree.',
    certification: 'BIS Hallmarked 916 with unique 6-digit HUID',
    deliveryTime: '2-4 business days (Fully Insured)',
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    rating: 4.9,
    reviewCount: 38
  },
  {
    id: 'PROD-002',
    sku: 'AUR-DIA-RG-002',
    name: 'Celestial Empress Solitaire Diamond Ring',
    category: 'diamond',
    subcategory: 'rings',
    metalType: 'GOLD',
    purity: '18K',
    pricingType: 'RATE_BASED',
    grossWeight: 4.850,
    netMetalWeight: 4.600,
    stoneWeight: 1.25, // carats
    diamondDetails: {
      carat: 1.25,
      cut: 'Brilliant Round',
      clarity: 'VVS1',
      color: 'E-F',
      certificationAgency: 'IGI Certified'
    },
    stoneValue: 125000, // Fixed diamond component value
    makingChargeType: 'FIXED',
    makingCharge: 6500,
    wastagePercentage: 0,
    sizes: ['12', '14', '16', '18', '20'],
    stock: 6,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A showstopping 1.25 ct solitaire diamond ring cradled in a cathedral setting of 18K white gold with micropavé diamond halo accents.',
    certification: 'IGI Diamond Authenticity Certificate & BIS Hallmark 750',
    deliveryTime: '3-5 business days (Insured)',
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    rating: 5.0,
    reviewCount: 42
  },
  {
    id: 'PROD-003',
    sku: 'AUR-BRI-CH-003',
    name: 'Royal Rajputana Jadau Bridal Choker Set',
    category: 'bridal',
    subcategory: 'sets',
    metalType: 'GOLD',
    purity: '22K',
    pricingType: 'RATE_BASED',
    grossWeight: 88.200,
    netMetalWeight: 76.500,
    stoneWeight: 11.700,
    gemstoneDetails: {
      gemstones: 'Zambian Emeralds & Natural Basra Seed Pearls',
      stoneValue: 65000
    },
    stoneValue: 65000,
    makingChargeType: 'PERCENT',
    makingCharge: 16,
    wastagePercentage: 3.0,
    sizes: ['Adjustable Dori'],
    stock: 2,
    images: [
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Masterpiece wedding choker set accompanied by matching chandelier earrings and maang tikka. Handcrafted using traditional jadau techniques with uncut polki and vivid emerald drops.',
    certification: 'BIS Hallmark 916 & Gemological Institute Certificate',
    deliveryTime: '5-7 business days (White Glove Secure Escort)',
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    rating: 4.9,
    reviewCount: 19
  },
  {
    id: 'PROD-004',
    sku: 'AUR-SLV-KD-004',
    name: 'Heritage Filigree Sterling Silver Kada (Pair)',
    category: 'silver',
    subcategory: 'bangles',
    metalType: 'SILVER',
    purity: '925',
    pricingType: 'RATE_BASED',
    grossWeight: 65.000,
    netMetalWeight: 65.000,
    stoneWeight: 0,
    stoneValue: 0,
    makingChargeType: 'PER_GRAM',
    makingCharge: 35, // ₹35 per gram making charge
    wastagePercentage: 1.5,
    sizes: ['2.4', '2.6', '2.8'],
    stock: 12,
    images: [
      'https://images.unsplash.com/photo-1611591475879-11449d0fc7f4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Heavy 925 hallmarked sterling silver antique finish kadas featuring intricate jali filigree and screw-lock closures.',
    certification: '925 Sterling Silver Hallmark Stamp',
    deliveryTime: '2-3 business days',
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    rating: 4.8,
    reviewCount: 29
  },
  {
    id: 'PROD-005',
    sku: 'AUR-TEM-JH-005',
    name: 'Nandi Temple Antique Gold Jhumkas',
    category: 'traditional',
    subcategory: 'earrings',
    metalType: 'GOLD',
    purity: '22K',
    pricingType: 'RATE_BASED',
    grossWeight: 26.400,
    netMetalWeight: 25.100,
    stoneWeight: 1.300,
    gemstoneDetails: {
      gemstones: 'Cabochon Rubies',
      stoneValue: 9500
    },
    stoneValue: 9500,
    makingChargeType: 'PERCENT',
    makingCharge: 14,
    wastagePercentage: 2.5,
    sizes: ['Standard Drop (5.5 cm)'],
    stock: 5,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Authentic South Indian temple earrings featuring intricately sculpted dancing peacock and floral motifs with dangling gold pearls.',
    certification: 'BIS Hallmark 916 HUID',
    deliveryTime: '2-4 business days',
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    rating: 4.9,
    reviewCount: 31
  },
  {
    id: 'PROD-006',
    sku: 'AUR-PLT-BD-006',
    name: 'Eternal Bonds Platinum Couple Rings',
    category: 'platinum',
    subcategory: 'rings',
    metalType: 'PLATINUM',
    purity: '950',
    pricingType: 'RATE_BASED',
    grossWeight: 11.200,
    netMetalWeight: 11.000,
    stoneWeight: 0.20,
    diamondDetails: {
      carat: 0.20,
      cut: 'Round Brilliant',
      clarity: 'VVS2',
      color: 'F',
      certificationAgency: 'Pt Guild International'
    },
    stoneValue: 18000,
    makingChargeType: 'FIXED',
    makingCharge: 7200,
    wastagePercentage: 0,
    sizes: ['Men 18 / Women 12', 'Men 20 / Women 14', 'Men 22 / Women 16'],
    stock: 7,
    images: [
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Crafted from rare 95% pure platinum with satin-brushed dual texture and flush-set natural solitaire diamond accent.',
    certification: 'PGI (Platinum Guild International) Certificate of Authenticity',
    deliveryTime: '3-5 business days',
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    rating: 4.7,
    reviewCount: 14
  },
  {
    id: 'PROD-007',
    sku: 'AUR-GEM-PD-007',
    name: 'Royal Colombian Emerald & Diamond Pendant',
    category: 'gemstone',
    subcategory: 'pendants',
    metalType: 'GOLD',
    purity: '18K',
    pricingType: 'RATE_BASED',
    grossWeight: 7.800,
    netMetalWeight: 6.200,
    stoneWeight: 1.600,
    gemstoneDetails: {
      gemstones: 'Natural Colombian Emerald (2.4 ct) & Brilliant Diamond Halo',
      stoneValue: 74000
    },
    stoneValue: 74000,
    makingChargeType: 'PERCENT',
    makingCharge: 11,
    wastagePercentage: 1.5,
    sizes: ['Standard with 18K Chain Loop'],
    stock: 3,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An alluring octagonal-cut natural Colombian emerald encircled by a scintillating halo of micro-prong set natural diamonds.',
    certification: 'Gubelin / IGI Gemstone Origin Certificate',
    deliveryTime: '2-4 business days',
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    rating: 5.0,
    reviewCount: 11
  },
  {
    id: 'PROD-008',
    sku: 'AUR-ART-CH-008',
    name: 'Kundan Meenakari Handcrafted Choker (Artisanal)',
    category: 'artificial',
    subcategory: 'necklaces',
    metalType: 'BRASS_GOLD_PLATED',
    purity: 'ARTIFICIAL_24K_MICRON',
    pricingType: 'FIXED', // Artificial jewellery with fixed pricing
    fixedPrice: 6499,
    grossWeight: 95.0,
    netMetalWeight: 0,
    stoneWeight: 0,
    makingCharge: 0,
    wastagePercentage: 0,
    sizes: ['Free Size Adjustable'],
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'High-fashion brass alloy choker micro-plated with 24K real gold plating, studded with precision glass polki and hand-painted meenakari.',
    certification: 'Aurelia Artisan Fashion Authenticity Seal',
    deliveryTime: '2-3 business days',
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    rating: 4.6,
    reviewCount: 56
  },
  {
    id: 'PROD-009',
    sku: 'AUR-DLW-CH-009',
    name: 'Aria Minimalist Paperclip 14K Gold Chain',
    category: 'dailywear',
    subcategory: 'chains',
    metalType: 'GOLD',
    purity: '14K',
    pricingType: 'RATE_BASED',
    grossWeight: 6.800,
    netMetalWeight: 6.800,
    stoneWeight: 0,
    stoneValue: 0,
    makingChargeType: 'PERCENT',
    makingCharge: 9,
    wastagePercentage: 1.0,
    sizes: ['16 inches', '18 inches'],
    stock: 15,
    images: [
      'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Ultra-chic lightweight 14K Italian yellow gold chain featuring sleek geometric paperclip links. Engineered for everyday durability and high sheen.',
    certification: 'BIS Hallmark 585 with HUID',
    deliveryTime: '2-3 business days',
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    rating: 4.8,
    reviewCount: 37
  }
];

export const INITIAL_TESTIMONIALS = [
  {
    id: 1,
    name: 'Sunita & Vikram Malhotra',
    city: 'Bengaluru',
    rating: 5,
    text: 'We bought my daughter’s complete bridal wedding jewellery from Aurelia. What impressed us most was the complete transparency with the live gold rate billing and zero hidden charges.',
    productBought: 'Royal Rajputana Jadau Bridal Choker',
    date: 'October 2026'
  },
  {
    id: 2,
    name: 'Ananya Deshmukh',
    city: 'Mumbai',
    rating: 5,
    text: 'The solitaire diamond ring arrived in an exquisite tamper-proof vault box with full IGI certification. The craftsmanship is flawless and sparkles brilliantly!',
    productBought: 'Celestial Empress Solitaire Diamond Ring',
    date: 'November 2026'
  },
  {
    id: 3,
    name: 'Raghavan Iyer',
    city: 'Chennai',
    rating: 5,
    text: 'Aurelia’s 916 hallmarked traditional Kasu Mala is unmatched. Beautiful finish, exact weight certificate, and prompt insured home delivery.',
    productBought: 'The Maharani Kasu Mala Necklace',
    date: 'September 2026'
  }
];

export const STORE_LOCATIONS = [
  {
    id: 'store-blr',
    city: 'Bengaluru (Flagship Palace)',
    address: '42, Heritage Palace Lane, Commercial Street, MG Road',
    phone: '+91 80 4123 4567',
    hours: 'Mon - Sun: 10:30 AM - 9:00 PM',
    mapUrl: 'https://maps.google.com',
    image: 'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'store-mum',
    city: 'Mumbai (Boutique)',
    address: '108, Turner Road, Bandra West, Mumbai - 400050',
    phone: '+91 22 2640 8899',
    hours: 'Mon - Sun: 11:00 AM - 8:30 PM',
    mapUrl: 'https://maps.google.com',
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'store-del',
    city: 'New Delhi (South Extension)',
    address: 'E-14, South Extension Part II, New Delhi - 110049',
    phone: '+91 11 4164 1234',
    hours: 'Mon - Sun: 10:30 AM - 8:00 PM',
    mapUrl: 'https://maps.google.com',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80'
  }
];

export const FAQS = [
  {
    q: 'How does the Live Gold & Silver Rate system work?',
    a: 'Our prices for precious metal jewellery are directly computed in real-time from verified bullion market rates. When you browse or add an item to your cart, the metal value is calculated using the exact weight and purity (e.g. 24K, 22K, 18K) against the live per-gram rate. During checkout, the price is locked for 15 minutes to safeguard you from intraday fluctuations.'
  },
  {
    q: 'Is all gold jewellery BIS Hallmarked?',
    a: 'Yes, 100% of our gold jewellery is certified with BIS Hallmark bearing the mandatory 6-digit alphanumeric HUID (Hallmark Unique Identification) stamped in accordance with Bureau of Indian Standards regulations.'
  },
  {
    q: 'Are your diamonds certified by independent gemological laboratories?',
    a: 'Every solitaire diamond above 0.30 carat is accompanied by an authentic certificate from internationally accredited gemological laboratories like IGI (International Gemological Institute) or GIA (Gemological Institute of America).'
  },
  {
    q: 'What is your Lifetime Exchange and Buyback Policy?',
    a: 'We offer a transparent lifetime exchange and buyback guarantee across all our stores and online platform. Gold is valued at 100% of the prevailing gold rate, and diamond jewellery carries up to 90% exchange value.'
  },
  {
    q: 'How is high-value jewellery safely shipped?',
    a: 'All orders are shipped in tamper-evident, sealed luxury vault packaging via dedicated high-value courier partners (such as Sequel Logistics and Blue Dart Apex). Every transit is 100% insured until it is safely handed over to you with OTP verification.'
  }
];
