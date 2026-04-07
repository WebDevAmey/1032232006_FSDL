require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');
const Artisan = require('../models/Artisan');
const Product = require('../models/Product');
const Haat = require('../models/Haat');

const IMAGE_SEED_MAP = {
  'potter-aryan': '/images/artisan/artisan-sewing.jpg',
  'pottery-studio': '/images/pottery/terracotta-pots.jpg',
  'bowl-blue': '/images/pottery/blue-pottery.jpg',
  'bowl-side': '/images/pottery/painted-pots.jpg',
  'teaset-green': '/images/pottery/blue-pottery.jpg',
  'planter-wall': '/images/pottery/terracotta-pots.jpg',
  'mugs-two': '/images/pottery/painted-pots.jpg',
  'weaver-priya': '/images/artisan/artisan-sewing.jpg',
  'loom-textile': '/images/textile/loom-weaving.jpg',
  'cushion-ikat': '/images/textile/colorful-weaving.jpg',
  'tablerunner-indigo': '/images/textile/fabric-closeup.jpg',
  'warli-hanging': '/images/textile/loom-weaving.jpg',
  'baker-anika': '/images/artisan/artisan-sewing.jpg',
  'bakery-bread': '/images/pottery/terracotta-pots.jpg',
  'sourdough-loaf': '/images/pottery/terracotta-pots.jpg',
  'focaccia-herb': '/images/pottery/painted-pots.jpg',
  'cinnamonrolls': '/images/pottery/painted-pots.jpg',
  'jeweler-rohan': '/images/artisan/artisan-sewing.jpg',
  'jewelry-craft': '/images/jewelry/jewelry-hands.jpg',
  'ring-silver': '/images/jewelry/gold-necklace.jpg',
  'earrings-brass': '/images/jewelry/gold-jewelry-set.jpg',
  'pendant-terra': '/images/jewelry/jewelry-hands.jpg',
  'leather-sandals': '/images/pottery/terracotta-pots.jpg',
  'ganesh-idol': '/images/festival/diya-tray.jpg',
  'market-haat': '/images/textile/colorful-weaving.jpg',
};

const p = (seed) => IMAGE_SEED_MAP[seed] || '/images/potter-wheel.jpg';

async function seed() {
  await mongoose.connect(process.env.MONGO_URI ||
    'mongodb://127.0.0.1:27017/karagiriv2');
  console.log('Connected. Seeding...');

  await Promise.all([
    User.deleteMany({}), Artisan.deleteMany({}),
    Product.deleteMany({}), Haat.deleteMany({}),
  ]);

  const users = await User.create([
    { name: 'Aryan Desai', email: 'aryan@kg.in', password: 'pass1234', role: 'artisan' },
    { name: 'Priya Patil', email: 'priya@kg.in', password: 'pass1234', role: 'artisan' },
    { name: 'Anika Sharma', email: 'anika@kg.in', password: 'pass1234', role: 'artisan' },
    { name: 'Rohan Mehta', email: 'rohan@kg.in', password: 'pass1234', role: 'artisan' },
    { name: 'Test Buyer', email: 'buyer@kg.in', password: 'pass1234', role: 'buyer' },
  ]);

  const artisans = await Artisan.create([
    {
      userId: users[0]._id, shopName: 'Mitti Studio', slug: 'mitti-studio',
      tagline: 'Earth shaped with intention.',
      bio: 'Wheel-thrown stoneware from a Pune terrace studio. Aryan revives traditional Deccan clay forms.',
      story: 'What started as a weekend hobby in 2019 became a full studio by 2022, blending wabi-sabi with Maharashtrian folk motifs.',
      craft: 'Pottery', neighborhood: 'Koregaon Park', city: 'Pune',
      profileImage: p('potter-aryan', 400, 400), coverImage: '/images/pottery/terracotta-pots.jpg',
      isVerified: true,
      process: [
        { step: 'Source', description: 'Local Deccan clay from Wai, Maharashtra' },
        { step: 'Throw', description: 'Wheel-thrown on a kick wheel over 2–3 sessions' },
        { step: 'Fire', description: 'Bisque at 1000°C, glaze-fired at 1260°C gas kiln' },
      ],
    },
    {
      userId: users[1]._id, shopName: 'The Thread House', slug: 'the-thread-house',
      tagline: 'Heritage looms, contemporary forms.',
      bio: 'Three sisters weaving Paithani-inspired textiles on century-old pit looms.',
      story: 'Priya and her sisters returned from design colleges to save their ancestral loom from Yeola.',
      craft: 'Textiles', neighborhood: 'Baner', city: 'Pune',
      profileImage: p('weaver-priya', 400, 400), coverImage: '/images/textile/loom-weaving.jpg',
      isVerified: true,
      process: [
        { step: 'Warp', description: 'Pure silk warp set on pit loom, two days per piece' },
        { step: 'Weave', description: 'Traditional interlocking tapestry technique' },
        { step: 'Finish', description: 'Hand-washed in neem water, sun-dried, pressed' },
      ],
    },
    {
      userId: users[2]._id, shopName: "Anika's Bakehouse", slug: 'anikas-bakehouse',
      tagline: 'Slow ferment. Real flour. No shortcuts.',
      bio: '72-hour cold-ferment sourdough and seasonal pastries from a Viman Nagar home kitchen.',
      story: 'After a decade in finance, Anika apprenticed in Lyon and brought sourdough culture back to Pune.',
      craft: 'Bakery', neighborhood: 'Viman Nagar', city: 'Pune',
      profileImage: p('baker-anika', 400, 400), coverImage: '/images/textile/fabric-closeup.jpg',
      isVerified: false,
    },
    {
      userId: users[3]._id, shopName: 'Amber & Ore', slug: 'amber-and-ore',
      tagline: 'Metal as memory.',
      bio: 'Hand-fabricated silver and brass jewelry using repoussé and granulation techniques.',
      story: 'Trained at NIFT Mumbai, Rohan forges each piece in his Kothrud studio using lost-wax casting.',
      craft: 'Jewelry', neighborhood: 'Kothrud', city: 'Pune',
      profileImage: p('jeweler-rohan', 400, 400), coverImage: '/images/jewelry/gold-jewelry-set.jpg',
      isVerified: true,
    },
  ]);

  await Product.create([
    { artisanId: artisans[0]._id, name: 'Blue Ash Glaze Bowl', slug: 'blue-ash-glaze-bowl', description: 'Wheel-thrown stoneware bowl with hand-applied blue ash glaze. Each piece unique.', price: 850, comparePrice: 1100, category: 'Pottery', images: [p('bowl-blue', 600, 600), p('bowl-side', 600, 600)], stock: 8, isFeatured: true, tags: ['bowl', 'stoneware', 'handmade'] },
    { artisanId: artisans[0]._id, name: 'Matcha Tea Set', slug: 'matcha-tea-set', description: 'Teapot + 2 cups. Celadon glaze, 1260°C gas-fired.', price: 2200, category: 'Pottery', images: [p('teaset-green', 600, 600)], stock: 3, isFeatured: true, tags: ['tea', 'celadon'] },
    { artisanId: artisans[0]._id, name: 'Wall Planter', slug: 'wall-planter', description: 'Terracotta planter with jute rope hanger.', price: 640, category: 'Pottery', images: [p('planter-wall', 600, 600)], stock: 15, tags: ['planter', 'terracotta'] },
    { artisanId: artisans[0]._id, name: 'Mug Set of Two', slug: 'mug-set-two', description: 'Matched pair of 300ml stoneware mugs with speckled glaze.', price: 1100, category: 'Pottery', images: [p('mugs-two', 600, 600)], stock: 6, tags: ['mug', 'stoneware'] },
    { artisanId: artisans[0]._id, name: 'Eco-friendly Ganesh Idol', slug: 'eco-ganesh-idol', description: 'Hand-sculpted clay idol finished with natural pigments. Immersion-safe and biodegradable.', price: 1600, category: 'Ceramics', images: [p('ganesh-idol')], stock: 10, isFeatured: true, tags: ['ganesh', 'festival', 'eco-friendly'] },
    { artisanId: artisans[1]._id, name: 'Ikat Silk Cushion', slug: 'ikat-silk-cushion', description: 'Hand-woven ikat pattern cushion cover, 45×45cm.', price: 1800, comparePrice: 2400, category: 'Textiles', images: [p('cushion-ikat', 600, 600)], stock: 7, isFeatured: true, tags: ['cushion', 'ikat', 'silk'] },
    { artisanId: artisans[1]._id, name: 'Natural Dye Table Runner', slug: 'natural-dye-table-runner', description: '6-seater runner dyed with pomegranate rind and indigo.', price: 950, category: 'Textiles', images: [p('tablerunner-indigo', 600, 600)], stock: 4, tags: ['table', 'indigo'] },
    { artisanId: artisans[1]._id, name: 'Warli Wall Hanging', slug: 'warli-wall-hanging', description: 'Large format 60×90cm woven wall art. Warli motif in natural cotton.', price: 3200, category: 'Textiles', images: [p('warli-hanging', 600, 600)], stock: 2, isFeatured: true, tags: ['wall', 'warli', 'handwoven'] },
    { artisanId: artisans[3]._id, name: 'Handcrafted Leather Sandals', slug: 'handcrafted-leather-sandals', description: 'Soft leather sandals with hand-braided detailing and a cushioned sole.', price: 1400, category: 'Leather', images: [p('leather-sandals')], stock: 14, tags: ['leather', 'footwear', 'handmade'] },
    { artisanId: artisans[2]._id, name: 'Country Sourdough Loaf', slug: 'country-sourdough-loaf', description: '72-hour cold ferment, 80% hydration. Scored wheat ear motif.', price: 220, category: 'Bakery', images: [p('sourdough-loaf', 600, 600)], stock: 12, tags: ['bread', 'sourdough'] },
    { artisanId: artisans[2]._id, name: 'Rosemary Focaccia', slug: 'rosemary-focaccia', description: 'Same-day focaccia with Sicilian olive oil and fresh rosemary.', price: 180, category: 'Bakery', images: [p('focaccia-herb', 600, 600)], stock: 10, tags: ['bread', 'focaccia'] },
    { artisanId: artisans[2]._id, name: 'Cinnamon Rolls 6-pack', slug: 'cinnamon-rolls-6pack', description: 'Enriched dough, brown butter filling, cream cheese glaze.', price: 350, category: 'Bakery', images: [p('cinnamonrolls', 600, 600)], stock: 5, tags: ['pastry', 'sweet'] },
    { artisanId: artisans[3]._id, name: 'Silver Stack Ring', slug: 'silver-stack-ring', description: 'Hammered 92.5 sterling silver. Adjustable sizing.', price: 1200, comparePrice: 1500, category: 'Jewelry', images: [p('ring-silver', 600, 600)], stock: 9, isFeatured: true, tags: ['ring', 'silver'] },
    { artisanId: artisans[3]._id, name: 'Brass Tribal Earrings', slug: 'brass-tribal-earrings', description: 'Lost-wax cast brass earrings with tribal geometric pattern.', price: 890, category: 'Jewelry', images: [p('earrings-brass', 600, 600)], stock: 11, tags: ['earrings', 'brass'] },
    { artisanId: artisans[3]._id, name: 'Terracotta Pendant', slug: 'terracotta-pendant', description: 'Hand-sculpted pendant on brass chain. Inspired by Indus Valley seals.', price: 650, category: 'Jewelry', images: [p('pendant-terra', 600, 600)], stock: 7, tags: ['pendant', 'terracotta'] },
  ]);

  const sat = new Date();
  sat.setDate(sat.getDate() + ((6 - sat.getDay() + 7) % 7) || 7);
  sat.setHours(10, 0, 0, 0);
  const sun = new Date(sat);
  sun.setDate(sun.getDate() + 1); sun.setHours(18, 0, 0, 0);

  await Haat.create({
    title: 'Pune Winter Haat 2025', slug: 'pune-winter-haat-2025',
    description: 'Four artisan studios come together for one weekend of craft, chai, and community. Live pottery demos, weaving workshops, and baked goods.',
    coverImage: '/images/textile/colorful-weaving.jpg',
    startDate: sat, endDate: sun,
    location: 'Amanora Town Centre, Hadapsar, Pune',
    isOnline: false, hostArtisan: artisans[0]._id,
    participants: [
      { artisanId: artisans[0]._id, boothName: 'Mitti Studio Booth', status: 'approved' },
      { artisanId: artisans[1]._id, boothName: 'Thread House Stall', status: 'approved' },
      { artisanId: artisans[2]._id, boothName: "Anika's Popup Kitchen", status: 'approved' },
      { artisanId: artisans[3]._id, boothName: 'Amber & Ore Table', status: 'approved' },
    ],
    maxParticipants: 20, category: 'Winter Market',
    tags: ['craft', 'community', 'popup'], isPublished: true, rsvpCount: 34,
  });

  console.log('\n✅ Seed complete');
  console.log('   Buyer:   buyer@kg.in  / pass1234');
  console.log('   Artisan: aryan@kg.in  / pass1234\n');
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
