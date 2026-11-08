import { Product } from '../types';

import heroSneaker from '../assets/images/stride_hero_sneaker_1790825406786.jpg';
import lifestyleSneaker from '../assets/images/stride_shoe_lifestyle_1790825431584.jpg';
import runningSneaker from '../assets/images/stride_shoe_running_1790825444966.jpg';
import basketballSneaker from '../assets/images/stride_shoe_basketball_1790825456365.jpg';
import trailSneaker from '../assets/images/stride_shoe_trail_1790825470925.jpg';
import sandalShoe from '../assets/images/stride_shoe_sandal_1790825480465.jpg';
import aeroRushShoe from '../assets/images/stride_shoe_aerorush_1790825491738.jpg';
import campaignLifestyle from '../assets/images/stride_campaign_lifestyle_1790825503125.jpg';

// WebP Optimized Shoe Images
import jordanObsidianShoe from '../assets/images/jordan_obsidian_high.webp';
import dunkArizonaShoe from '../assets/images/dunk_arizona_state.webp';
import nikeZoomBbShoe from '../assets/images/nike_zoom_bb.webp';
import minimalWhiteShoe from '../assets/images/minimal_white_shoe.webp';
import patentBlackShoe from '../assets/images/patent_black_sneaker.webp';
import jordanRetroShoe from '../assets/images/jordan_retro_shoe.webp';
import casualRunnerShoe from '../assets/images/casual_runner_shoe.webp';
import molecularRunnerShoe from '../assets/images/molecular_runner.webp';

export const HERO_ASSETS = {
  hero: heroSneaker,
  campaign: campaignLifestyle,
};

export const PRODUCTS: Product[] = [
  {
    id: 'stride-aero-speed-1',
    name: 'STRIDE Aero Kinetic',
    tagline: 'Proprietary carbon-plate propulsion for sub-3 marathoners',
    price: 185,
    originalPrice: 220,
    category: 'Running',
    gender: 'Unisex',
    colors: [
      { name: 'Volt Lime & Onyx', hex: '#C6F432', image: runningSneaker },
      { name: 'Triple Chalk', hex: '#EBEBE8', image: lifestyleSneaker },
      { name: 'Phantom Black', hex: '#1C1C1E', image: aeroRushShoe },
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    images: [runningSneaker, heroSneaker, aeroRushShoe],
    rating: 4.9,
    reviewCount: 142,
    description: 'Designed for relentless pace. The Aero Kinetic features dual-density supercritical foam paired with a spoon-curved full-length carbon fiber propulsion plate, delivering 38% superior energy return with zero joint fatigue.',
    features: [
      'Proprietary STRIDE KineticFoam™ 2.0 Midsole',
      'Spoon-contoured 100% woven carbon propulsion plate',
      'Micro-filament mono-mesh upper with laser-cut ventilation',
      'Strategic zonal Continental-grade rubber traction pad'
    ],
    specs: {
      weight: '185g (US M9)',
      drop: '8mm offset',
      cushioning: 'Max Responsive',
      terrain: 'Road & Track Racing'
    },
    tags: ['bestseller', 'sale'],
    isBestSeller: true,
    isNewArrival: false,
    inStock: true
  },
  {
    id: 'stride-mono-studio',
    name: 'STRIDE Mono Studio',
    tagline: 'Architectural minimalism crafted with vegetable-tanned leather',
    price: 160,
    category: 'Lifestyle',
    gender: 'Unisex',
    colors: [
      { name: 'Alabaster White', hex: '#F0EFEA', image: lifestyleSneaker },
      { name: 'Slate Concrete', hex: '#8A8D8F', image: aeroRushShoe },
      { name: 'Pitch Black', hex: '#171717', image: basketballSneaker }
    ],
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    images: [lifestyleSneaker, aeroRushShoe, heroSneaker],
    rating: 4.8,
    reviewCount: 96,
    description: 'A timeless silhouette engineered for metropolitan movement. Handcrafted with certified Italian low-impact calfskin and an ergonomic cork-lined memory insole that forms to your foot shape over time.',
    features: [
      'Gold-certified Italian eco-tanned nappa leather',
      'Removable contoured antimicrobial cork footbed',
      'Reinforced cupsole with stitched perimeter welt',
      'Subtle debossed blind serial numbering on heel'
    ],
    specs: {
      weight: '310g (US M9)',
      drop: '4mm offset',
      cushioning: 'Medium Balanced',
      terrain: 'City & Daily Casual'
    },
    tags: ['new'],
    isBestSeller: false,
    isNewArrival: true,
    inStock: true
  },
  {
    id: 'stride-apex-hyper-high',
    name: 'STRIDE Apex Gravity High',
    tagline: 'Sculpted stability and rebound for explosive court transitions',
    price: 210,
    category: 'Basketball',
    gender: 'Men',
    colors: [
      { name: 'Stealth & Electric', hex: '#111111', image: basketballSneaker },
      { name: 'Volt Lime Tint', hex: '#C6F432', image: runningSneaker },
      { name: 'Glacier Silver', hex: '#D1D5DB', image: aeroRushShoe }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
    images: [basketballSneaker, heroSneaker, runningSneaker],
    rating: 4.9,
    reviewCount: 78,
    description: 'Command the paint. The Apex Gravity combines a reinforced TPU torsion cage with dual-layer responsive gas airpods for supreme lockdown and explosive vertical lift without sacrificing lateral ankle agility.',
    features: [
      'Dual STRIDE Air-Cell chambers under forefoot & heel',
      'Anatomical memory foam collar wraps the Achilles tendon',
      'Multi-directional herringbone outrigger for sharp cuts',
      'Dynamic speed-lacing webbing with ballistic nylon cables'
    ],
    specs: {
      weight: '365g (US M10)',
      drop: '10mm offset',
      cushioning: 'Impact Absorption Max',
      terrain: 'Hardwood & Indoor Courts'
    },
    tags: ['new', 'bestseller'],
    isBestSeller: true,
    isNewArrival: true,
    inStock: true
  },
  {
    id: 'stride-cloud-recovery-slide',
    name: 'STRIDE Cloud Recovery Slide',
    tagline: 'Dual-density bio-foam for post-run foot decompression',
    price: 65,
    originalPrice: 80,
    category: 'Recovery',
    gender: 'Unisex',
    colors: [
      { name: 'Oatmeal Bone', hex: '#DDD7CD', image: sandalShoe },
      { name: 'Charcoal Night', hex: '#262626', image: aeroRushShoe },
      { name: 'Lime Acid', hex: '#C6F432', image: runningSneaker }
    ],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    images: [sandalShoe, lifestyleSneaker, sandalShoe],
    rating: 4.7,
    reviewCount: 210,
    description: 'The ultimate cooldown luxury. Molded from 100% algae-blended BLOOM™ EVA foam, the Cloud Recovery Slide cradles tired arches, redistributes plantar pressure, and relieves tendon fatigue.',
    features: [
      'Anatomically contoured deep heel cup and metatarsal bar',
      'Eco-conscious BLOOM™ algae-infused flexible foam',
      'Hydrophobic waterproof build cleans with a quick rinse',
      'Textured footbed channels micro-stimulation while walking'
    ],
    specs: {
      weight: '140g (US M9)',
      drop: '0mm Zero Drop',
      cushioning: 'Plush Cloudform',
      terrain: 'Post-Workout, Pool & Home'
    },
    tags: ['sale'],
    isBestSeller: false,
    isNewArrival: false,
    inStock: true
  },
  {
    id: 'stride-terra-vanguard',
    name: 'STRIDE Terra Vanguard',
    tagline: 'Aggressive 5mm multi-lug grip built for alpine scrambles',
    price: 195,
    category: 'Running',
    gender: 'Men',
    colors: [
      { name: 'Olive Basalt', hex: '#4A5043', image: trailSneaker },
      { name: 'Granite & Lime', hex: '#2E3236', image: heroSneaker },
      { name: 'Stone Grey', hex: '#9E9D89', image: lifestyleSneaker }
    ],
    sizes: [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    images: [trailSneaker, aeroRushShoe, runningSneaker],
    rating: 4.9,
    reviewCount: 84,
    description: 'Conquer loose scree, mud, and alpine ascents. Featuring a breathable waterproof ShieldDry™ inner membrane and an ultra-sticky Vibram-inspired Megagrip rubber compound with multidirectional self-cleaning lugs.',
    features: [
      'Ripstop Cordura® ballistic textile upper with rubber toe cap',
      'ShieldDry™ waterproof yet breathable interior membrane',
      'Flexible rock-protection plate safeguards against sharp stones',
      'Integrated gaiter collar keeps trail debris and mud out'
    ],
    specs: {
      weight: '295g (US M9)',
      drop: '6mm offset',
      cushioning: 'Firm Responsive Trail',
      terrain: 'Technical Trails & Mud'
    },
    tags: ['bestseller'],
    isBestSeller: true,
    isNewArrival: false,
    inStock: true
  },
  {
    id: 'stride-velox-daily-trainer',
    name: 'STRIDE Velox Road Runner',
    tagline: 'The plush, high-mileage daily workhorse you will lace up every day',
    price: 155,
    category: 'Running',
    gender: 'Women',
    colors: [
      { name: 'Pure Chalk & Volt', hex: '#E2E8F0', image: heroSneaker },
      { name: 'Cloud White', hex: '#FFFFFF', image: lifestyleSneaker },
      { name: 'Shadow Charcoal', hex: '#1F2937', image: aeroRushShoe }
    ],
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
    images: [heroSneaker, runningSneaker, aeroRushShoe],
    rating: 4.8,
    reviewCount: 165,
    description: 'Engineered for everything from recovery jogs to Sunday long runs. The Velox provides deep, springy cushioning that protects joints while offering an effortless rocker geometry that propels you smoothly through toe-off.',
    features: [
      'Full-bed STRIDE SuperFoam with rocker transition bevel',
      'Engineered seamless knit upper adapting to foot expansion',
      'Padded tongue and plush heel counter preventing friction blisters',
      'Long-wearing high-abrasion carbon rubber at strike zones'
    ],
    specs: {
      weight: '235g (US W8)',
      drop: '10mm offset',
      cushioning: 'Max Plush',
      terrain: 'Pavement & Treadmill'
    },
    tags: ['bestseller'],
    isBestSeller: true,
    isNewArrival: false,
    inStock: true
  },
  {
    id: 'stride-street-matrix-low',
    name: 'STRIDE Matrix Low Suede',
    tagline: 'Deconstructed skate culture meets Japanese design rigor',
    price: 145,
    category: 'Lifestyle',
    gender: 'Men',
    colors: [
      { name: 'Ash Suede & Bone', hex: '#A3A299', image: lifestyleSneaker },
      { name: 'Core Black', hex: '#18181B', image: aeroRushShoe },
      { name: 'Electric Accent', hex: '#C6F432', image: runningSneaker }
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    images: [lifestyleSneaker, aeroRushShoe, heroSneaker],
    rating: 4.6,
    reviewCount: 52,
    description: 'Low profile, wide-stance tooling, and tactile hairy suede accents. Built with a vulcanized natural rubber sole that guarantees grip and durability whether pushing on concrete or strolling downtown.',
    features: [
      'Silky premium long-nap hairy suede overlays',
      'Reinforced double-stitch toe box for extended skate life',
      'Ultra-dense polyurethane drop-in insole',
      'Raw cotton laces with brushed metal tips'
    ],
    specs: {
      weight: '340g (US M9)',
      drop: '2mm offset',
      cushioning: 'Low-to-ground Boardfeel',
      terrain: 'Urban & Everyday'
    },
    tags: ['new'],
    isBestSeller: false,
    isNewArrival: true,
    inStock: true
  },
  {
    id: 'stride-phantom-flight',
    name: 'STRIDE Phantom Flight Mid',
    tagline: 'Hyper-responsive court sneaker with carbon lateral wing',
    price: 195,
    originalPrice: 230,
    category: 'Basketball',
    gender: 'Unisex',
    colors: [
      { name: 'Matte Jet & Lime', hex: '#0F172A', image: basketballSneaker },
      { name: 'Optic White', hex: '#F8FAFC', image: lifestyleSneaker },
      { name: 'Slate Steel', hex: '#64748B', image: aeroRushShoe }
    ],
    sizes: [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    images: [basketballSneaker, aeroRushShoe, heroSneaker],
    rating: 4.9,
    reviewCount: 67,
    description: 'Designed for guards who rely on rapid acceleration and razor-sharp deceleration. The lateral carbon fiber outrigger wing prevents rollover during crossover moves while the zoned mesh keeps feet dry under intense heat.',
    features: [
      'Carbon-fiber lateral stability wing',
      'Pressure-mapped multi-zone traction rubber outsole',
      'Molded collar with neoprene bootie construction',
      'Lightweight Kevlar-reinforced eyelet channels'
    ],
    specs: {
      weight: '350g (US M9)',
      drop: '8mm offset',
      cushioning: 'High Response',
      terrain: 'Indoor & Street Courts'
    },
    tags: ['sale'],
    isBestSeller: false,
    isNewArrival: false,
    inStock: true
  },
  {
    id: 'stride-orbit-knit-runner',
    name: 'STRIDE Orbit Flyknit',
    tagline: 'Featherlight 3D sock-fit upper with kinetic rebound',
    price: 170,
    category: 'Running',
    gender: 'Women',
    colors: [
      { name: 'Electric Lime Fade', hex: '#C6F432', image: runningSneaker },
      { name: 'Pearl Mist', hex: '#E5E7EB', image: lifestyleSneaker },
      { name: 'Midnight Onyx', hex: '#111827', image: aeroRushShoe }
    ],
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
    images: [runningSneaker, heroSneaker, lifestyleSneaker],
    rating: 4.9,
    reviewCount: 112,
    description: 'Feel like you are running on nothing. Spun from 100% recycled ocean plastic yarns, the Orbit seamless knit hugs your foot like a custom sock, eliminating any pressure points or tongue slippage.',
    features: [
      'Single-piece continuous 3D woven yarn structure',
      'Zero-waste circular knitting manufacturing process',
      'Responsive energy foam with hollow core pods',
      'Glow-in-the-dark 3M reflective heel accents'
    ],
    specs: {
      weight: '175g (US W7)',
      drop: '6mm offset',
      cushioning: 'Springy Light',
      terrain: 'Road, Gym & Sprint'
    },
    tags: ['new', 'bestseller'],
    isBestSeller: true,
    isNewArrival: true,
    inStock: true
  },
  {
    id: 'stride-zenith-oasis-mule',
    name: 'STRIDE Oasis Recovery Mule',
    tagline: 'Slip-on luxury with architectural cutouts and arch support',
    price: 75,
    category: 'Recovery',
    gender: 'Women',
    colors: [
      { name: 'Cream Sand', hex: '#E8E1D5', image: sandalShoe },
      { name: 'Moss Lichen', hex: '#58624E', image: trailSneaker },
      { name: 'Ink Black', hex: '#18181B', image: aeroRushShoe }
    ],
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
    images: [sandalShoe, lifestyleSneaker, heroSneaker],
    rating: 4.7,
    reviewCount: 49,
    description: 'Effortless transition footwear for recovery days and relaxed studio weekends. Designed with an open heel, supportive high-rise arch structure, and breathable side vents.',
    features: [
      'One-piece injection-molded soft polymer chassis',
      'Ventilated side intake channels for continuous airflow',
      'High-friction wet-surface anti-slip sole pattern',
      'Machine washable and quick drying'
    ],
    specs: {
      weight: '160g (US W8)',
      drop: '4mm offset',
      cushioning: 'Soft Cloud',
      terrain: 'Home, Studio & Travel'
    },
    tags: ['new'],
    isBestSeller: false,
    isNewArrival: true,
    inStock: true
  },
  {
    id: 'stride-apex-shift-cross',
    name: 'STRIDE Shift Cross-Trainer',
    tagline: 'Heavy squat stability with explosive box-jump responsiveness',
    price: 165,
    category: 'Lifestyle',
    gender: 'Men',
    colors: [
      { name: 'Carbon & Chrome', hex: '#27272A', image: aeroRushShoe },
      { name: 'Chalk White', hex: '#F4F4F5', image: lifestyleSneaker },
      { name: 'Neon Pulse', hex: '#C6F432', image: runningSneaker }
    ],
    sizes: [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    images: [aeroRushShoe, heroSneaker, runningSneaker],
    rating: 4.8,
    reviewCount: 88,
    description: 'From barbell cleans to high-intensity intervals. A rigid TPU heel cup provides an immovable foundation under heavy loads, while the flexible forefoot grooves allow natural push-off during sprints and burpees.',
    features: [
      'Firm TPU heel clip prevents rearfoot compression under weight',
      'Abrasion-resistant textured side wraps for rope climbs',
      'Dual-density forefoot with sprint propulsion channels',
      'Flat wide platform for maximum base of support'
    ],
    specs: {
      weight: '290g (US M9)',
      drop: '4mm low drop',
      cushioning: 'Firm / Ground Contact',
      terrain: 'CrossFit, Gym & Strength'
    },
    tags: ['bestseller'],
    isBestSeller: true,
    isNewArrival: false,
    inStock: true
  },
  {
    id: 'stride-summit-gtx-trail',
    name: 'STRIDE Summit GTX Waterproof',
    tagline: 'Sub-zero insulation and waterproof barrier for harsh winters',
    price: 225,
    originalPrice: 250,
    category: 'Running',
    gender: 'Unisex',
    colors: [
      { name: 'Earth Slate', hex: '#3F443E', image: trailSneaker },
      { name: 'Stealth Black', hex: '#18181B', image: aeroRushShoe },
      { name: 'Hazard Lime', hex: '#C6F432', image: heroSneaker }
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    images: [trailSneaker, heroSneaker, aeroRushShoe],
    rating: 4.9,
    reviewCount: 63,
    description: 'Engineered for sub-zero temperatures, freezing slush, and ice. Outfitted with GORE-TEX Invisible Fit membrane, tungsten carbide-tipped grip pods, and thermal heat-reflective insole barrier.',
    features: [
      'GORE-TEX® Invisible Fit directly bonded waterproof membrane',
      'Arctic Grip™ wet-ice rubber compound lugs',
      'Thermal reflective aluminum strobel board keeps warmth in',
      'Quick-cinch speed lacing with lace garage pouch'
    ],
    specs: {
      weight: '315g (US M9)',
      drop: '8mm offset',
      cushioning: 'Weather-Tuned Dual Density',
      terrain: 'Snow, Ice, Winter Trails'
    },
    tags: ['sale'],
    isBestSeller: false,
    isNewArrival: false,
    inStock: true
  },
  {
    id: 'jordan-obsidian-high-og',
    name: "Air Jordan 1 High OG 'Obsidian UNC'",
    tagline: 'Iconic 1985 silhouette in premium tumbled leather and University Blue',
    price: 220,
    category: 'Lifestyle',
    gender: 'Unisex',
    colors: [
      { name: 'Obsidian Navy & University Blue', hex: '#1C2938', image: jordanObsidianShoe },
      { name: 'Sail White', hex: '#F0EFEA', image: minimalWhiteShoe },
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    images: [jordanObsidianShoe, minimalWhiteShoe],
    rating: 5.0,
    reviewCount: 312,
    description: "A timeless collector holy grail. The Air Jordan 1 High OG Obsidian pays homage to Michael Jordan's legendary college career at UNC. Built with a sail leather base, obsidian navy leather overlays, and varsity University Blue collar panels crafted from supple tumbled calfskin.",
    features: [
      'Genuine full-grain tumbled leather and soft aniline overlays',
      'Encapsulated Air-Sole unit embedded in lightweight rubber cupsole',
      'Padded high-cut collar provides ankle lock and classic silhouette',
      'Solid rubber outsole with deep flex grooves and concentric traction rings'
    ],
    specs: {
      weight: '390g (US M9)',
      drop: '10mm offset',
      cushioning: 'Encapsulated Air-Sole',
      terrain: 'Court, Street & Daily Wear'
    },
    tags: ['bestseller', 'new'],
    isBestSeller: true,
    isNewArrival: true,
    inStock: true
  },
  {
    id: 'nike-dunk-low-arizona-state',
    name: "Nike Dunk Low 'Arizona State'",
    tagline: 'Collegiate retro color-blocking in Sun Devil gold and deep maroon',
    price: 135,
    category: 'Lifestyle',
    gender: 'Unisex',
    colors: [
      { name: 'Deep Maroon & University Gold', hex: '#7A1C30', image: dunkArizonaShoe },
      { name: 'Triple White', hex: '#FFFFFF', image: minimalWhiteShoe },
    ],
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    images: [dunkArizonaShoe, minimalWhiteShoe],
    rating: 4.9,
    reviewCount: 184,
    description: 'Throw it back to 1985 college basketball heritage. Featuring rich burgundy-maroon leather underlays contrast-paneled with vibrant university gold overlays and a crisp white midsole, finished with a plush padded low-cut collar for all-day comfort.',
    features: [
      'Durable smooth leather upper softens to perfection over time',
      'Low-cut padded collar looks sleek and feels plush around ankle',
      'Foam midsole offers lightweight, responsive cushioning',
      'Classic pivot-circle rubber tread delivers durable grip and retro style'
    ],
    specs: {
      weight: '345g (US M9)',
      drop: '8mm offset',
      cushioning: 'Resilient EVA Foam',
      terrain: 'Street, Skateboard & Casual'
    },
    tags: ['new', 'bestseller'],
    isBestSeller: true,
    isNewArrival: true,
    inStock: true
  },
  {
    id: 'nike-air-zoom-bb-nxt-hyper',
    name: "Nike Air Zoom BB NXT 'Hyper Energy'",
    tagline: 'Triple-layer React foam with dual Zoom Air pods for explosive vertical lift',
    price: 195,
    category: 'Basketball',
    gender: 'Men',
    colors: [
      { name: 'Hyper Violet & Electric Volt', hex: '#6320EE', image: nikeZoomBbShoe },
      { name: 'Stealth Onyx', hex: '#18181B', image: patentBlackShoe },
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
    images: [nikeZoomBbShoe, basketballSneaker],
    rating: 4.8,
    reviewCount: 94,
    description: 'Designed to keep hoopers explosive until the final buzzer. Features three full layers of Nike React foam with two Zoom Air units directly under the forefoot ball, delivering relentless energy return, supreme lateral stabilization, and sudden stopping power.',
    features: [
      'Two responsive Zoom Air pods positioned directly beneath the ball of the foot',
      'Three stacked layers of React foam inside a rigid supportive carrier',
      'Engineered mesh upper with textured 3D print for zoned lockdown',
      'Circular rubber tread pattern generates multidirectional hardwood bite'
    ],
    specs: {
      weight: '385g (US M10)',
      drop: '10mm offset',
      cushioning: 'Dual Zoom Air + Triple React',
      terrain: 'Indoor Hardwood & Pro Courts'
    },
    tags: ['new'],
    isBestSeller: false,
    isNewArrival: true,
    inStock: true
  },
  {
    id: 'stride-minimalist-white-court88',
    name: "STRIDE Minimalist White 'Court 88'",
    tagline: 'Timeless luxury casual sneaker crafted with pristine white Italian nappa leather',
    price: 145,
    originalPrice: 165,
    category: 'Lifestyle',
    gender: 'Unisex',
    colors: [
      { name: 'Pristine White Nappa', hex: '#FFFFFF', image: minimalWhiteShoe },
      { name: 'Oatmeal & Bone', hex: '#DDD7CD', image: lifestyleSneaker },
    ],
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    images: [minimalWhiteShoe, lifestyleSneaker],
    rating: 4.9,
    reviewCount: 268,
    description: 'The definitive daily essential. Inspired by classic American court style, this pristine white low-top is hand-built with silky-smooth full-grain nappa leather, a 360-degree stitched rubber cupsole, and an anatomical cork memory insole that molds to your unique footbed.',
    features: [
      'Grade-A Italian full-grain nappa leather with water-repellent coating',
      'Reinforced perimeter lockstitch attaching upper directly to cupsole',
      'Antimicrobial memory foam footbed with natural cork topcover',
      'Minimalist zero-clutter silhouette pairs effortlessly with denim or tailoring'
    ],
    specs: {
      weight: '310g (US M9)',
      drop: '4mm offset',
      cushioning: 'Ergonomic Cork-Memory',
      terrain: 'Metropolitan Daily & Travel'
    },
    tags: ['bestseller', 'sale'],
    isBestSeller: true,
    isNewArrival: false,
    inStock: true
  },
  {
    id: 'stride-noir-patent-leather',
    name: 'STRIDE Noir Gloss Patent Sneaker',
    tagline: 'High-shine mirror patent leather engineered for luxury streetwear statements',
    price: 175,
    category: 'Lifestyle',
    gender: 'Men',
    colors: [
      { name: 'Mirror Black Gloss', hex: '#0A0A0A', image: patentBlackShoe },
      { name: 'Shadow Obsidian', hex: '#1C2938', image: jordanObsidianShoe },
    ],
    sizes: [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    images: [patentBlackShoe, jordanObsidianShoe],
    rating: 4.8,
    reviewCount: 82,
    description: 'A striking blend of high-fashion formal wear and contemporary sneaker culture. Boasts a lustrous mirror-gloss patent leather exterior, tonal waxed laces with gunmetal aglets, and a sculpted shock-absorbing rubber outsole built for evening galas and street style.',
    features: [
      'High-gloss mirror patent calfskin resistant to scuffs and moisture',
      'Tonal waxed tubular laces with heavy metal aglets',
      'Breathable calf-lining prevents heat buildup during long wear',
      'Reinforced heel counter keeps shoe pristine without creasing'
    ],
    specs: {
      weight: '360g (US M9)',
      drop: '6mm offset',
      cushioning: 'High-Rebound Latex Cushion',
      terrain: 'Fashion, Events & Urban Street'
    },
    tags: ['new'],
    isBestSeller: false,
    isNewArrival: true,
    inStock: true
  },
  {
    id: 'air-jordan-retro-flight-classic',
    name: 'Air Jordan Retro Flight Classic',
    tagline: 'The immortal varsity red, white & black hardwood icon with visible Air',
    price: 215,
    category: 'Basketball',
    gender: 'Men',
    colors: [
      { name: 'Varsity Red & Black Bred', hex: '#D0142C', image: jordanRetroShoe },
      { name: 'Obsidian Blue', hex: '#1C2938', image: jordanObsidianShoe },
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
    images: [jordanRetroShoe, jordanObsidianShoe],
    rating: 5.0,
    reviewCount: 420,
    description: 'An immortal legend reborn. Built with structured leather and synthetic panels in the iconic red, white, and black championship color palette. Featuring molded lateral support wings, breathable side mesh inserts, and a pressurized visible Air-Sole unit in the heel.',
    features: [
      'Genuine full-grain leather and supportive TPU quarter wings',
      'Pressurized visible Air-Sole cushioning in heel for impact dampening',
      'Sculpted foam midsole with herringbone rubber traction outsole',
      'Iconic padded collar and tongue for supreme lockdown fit'
    ],
    specs: {
      weight: '415g (US M10)',
      drop: '11mm offset',
      cushioning: 'Visible Max Air-Sole',
      terrain: 'Basketball Court & Streetwear'
    },
    tags: ['bestseller'],
    isBestSeller: true,
    isNewArrival: false,
    inStock: true
  },
  {
    id: 'stride-breeze-casual-runner',
    name: 'STRIDE Breeze Casual Runner',
    tagline: 'Featherweight 3D-knit daily runner with cloudstep rebound for 10K efforts',
    price: 125,
    originalPrice: 145,
    category: 'Running',
    gender: 'Unisex',
    colors: [
      { name: 'Cyan & Slate Teal', hex: '#00D1FF', image: casualRunnerShoe },
      { name: 'Volt Lime', hex: '#C6F432', image: runningSneaker },
      { name: 'Pure White', hex: '#FFFFFF', image: minimalWhiteShoe },
    ],
    sizes: [6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    images: [casualRunnerShoe, runningSneaker, minimalWhiteShoe],
    rating: 4.8,
    reviewCount: 175,
    description: 'Effortless lightness on every stride. Engineered with an ultralight seamless 3D knit upper that moves dynamically with your foot, paired with a resilient supercritical CloudStep™ foam midsole that turns road shock into easy forward momentum.',
    features: [
      'Seamless breathable 3D engineered knit upper adapts to foot swelling',
      'Kinetic CloudStep™ bio-foam midsole delivers plush road protection',
      'Zonal rubber contact pads in high-wear heel and forefoot zones',
      'Removable contoured orthotic insole for customized support'
    ],
    specs: {
      weight: '205g (US M9)',
      drop: '8mm offset',
      cushioning: 'Plush Responsive Cloud',
      terrain: 'Road Running, Gym & Daily Jogging'
    },
    tags: ['new', 'sale'],
    isBestSeller: false,
    isNewArrival: true,
    inStock: true
  },
  {
    id: 'stride-molecular-kinetic-runner',
    name: "STRIDE Molecular Kinetic 'Cellular Spec'",
    tagline: 'Biomimetic molecular pods and parametric lattice sole for zero-gravity propulsion',
    price: 210,
    category: 'Lifestyle',
    gender: 'Unisex',
    colors: [
      { name: 'Bone Cream & Cyan Molecular', hex: '#EAE6DF', image: molecularRunnerShoe },
      { name: 'Mirror Black Gloss', hex: '#0A0A0A', image: patentBlackShoe },
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    images: [molecularRunnerShoe, patentBlackShoe],
    rating: 4.9,
    reviewCount: 118,
    description: 'Inspired by biomolecular structures and future architecture. The Molecular Kinetic features independent energy-absorption hollow pods along the midsole that compress and spring back individually, creating an unprecedented floating sensation across urban pavement.',
    features: [
      'Parametrically engineered hollow cellular pods for multi-axis compression',
      'Sculptural technical mesh upper with hot-melt synthetic reinforcements',
      'Torsion-resistant internal shank stabilizes midfoot transition',
      'Aerodynamic speed-lacing system with hidden cable channels'
    ],
    specs: {
      weight: '280g (US M9)',
      drop: '6mm offset',
      cushioning: 'Independent Pod Dampening',
      terrain: 'Futuristic Streetwear & Urban Walk'
    },
    tags: ['new', 'bestseller'],
    isBestSeller: true,
    isNewArrival: true,
    inStock: true
  }
];

export const CATEGORIES = [
  {
    id: 'Running',
    title: 'Running',
    subtitle: 'Propulsion & Marathon Speed',
    itemCount: '7 Models',
    image: runningSneaker,
  },
  {
    id: 'Lifestyle',
    title: 'Lifestyle',
    subtitle: 'Minimal Luxury & Architecture',
    itemCount: '7 Models',
    image: minimalWhiteShoe,
  },
  {
    id: 'Basketball',
    title: 'Basketball',
    subtitle: 'Lockdown & Explosive Vertical',
    itemCount: '4 Models',
    image: jordanRetroShoe,
  },
  {
    id: 'Recovery',
    title: 'Recovery',
    subtitle: 'Decompression & Ergonomics',
    itemCount: '2 Models',
    image: sandalShoe,
  },
];

export const TESTIMONIALS = [
  {
    id: 't1',
    author: 'Marcus Vance',
    role: '2:14 Marathon Finisher & Running Coach',
    location: 'Boulder, CO',
    quote: 'The Aero Kinetic gave me back 8 seconds per mile on my long tempo runs. The supercritical foam is noticeably snappier than traditional PEBA shoes, and the heel lock is surgical.',
    rating: 5,
    product: 'STRIDE Aero Kinetic',
    verified: true
  },
  {
    id: 't2',
    author: 'Elena Rostova',
    role: 'Industrial Designer & Urban Walker',
    location: 'Berlin, Germany',
    quote: 'The Mono Studio is the cleanest pair of sneakers I have owned. No obnoxious billboard branding, just phenomenal leather craftsmanship and all-day comfort for 15,000 steps through the city.',
    rating: 5,
    product: 'STRIDE Mono Studio',
    verified: true
  },
  {
    id: 't3',
    author: 'Darnell Hayes',
    role: 'Division 1 Point Guard',
    location: 'Chicago, IL',
    quote: 'Lateral stability on the Apex Gravity is unparalleled. Hard plants and crossover cuts feel locked to the floor with zero heel roll. Best court feel I have played in this year.',
    rating: 5,
    product: 'STRIDE Apex Gravity High',
    verified: true
  }
];
