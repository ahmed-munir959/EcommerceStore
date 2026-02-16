import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

dotenv.config();

// Image URL mapping
const imageMapping = {
    bestSelling1: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996569/bestSelling1_vkc13p.png',
    bestSelling2: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996616/bestSelling2_nee8fl.png',
    bestSelling3: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996752/bestSelling3_weskrz.png',
    bestSelling4: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996866/bestSelling4_xbqk2b.png',
    camera1: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996866/camera1_zlrrtd.webp',
    camera2: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996866/camera2_g3d4pk.webp',
    computer1: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996866/computer1_mbwe7v.webp',
    computer2: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996866/computer2_kpyh6t.webp',
    exploreProducts1: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996866/exploreProducts1_wmaln5.jpg',
    exploreProducts2: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996867/exploreProducts2_zlkxw4.png',
    exploreProducts3: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996867/exploreProducts3_dun3yu.png',
    exploreProducts4: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996867/exploreProducts4_msizqd.png',
    exploreProducts5: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996868/exploreProducts5_r9qsfy.png',
    exploreProducts6: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996867/exploreProducts6_t7xft6.png',
    exploreProducts7: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996867/exploreProducts7_loelir.png',
    exploreProducts8: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996868/exploreProducts8_url86y.png',
    fitnessTracker1: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996868/fitnessTracker1_ckjxyr.webp',
    fitnessTracker2: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996868/fitnessTracker2_nngv1o.webp',
    flashSale1: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996868/flashSale1_rg1oza.png',
    flashSale2: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996868/flashSale2_cnpx8s.png',
    flashSale3: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996869/flashSale3_i7ap4r.png',
    flashSale4: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996869/flashSale4_grh7rd.png',
    gaming1: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996869/gaming1_uels9j.webp',
    gaming2: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996869/gaming2_dedkp4.webp',
    headphone1: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996869/headphones1_xxvnip.webp',
    headphone2: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996870/headphones2_qnll7t.webp',
    miniProjector1: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996869/miniProjector1_j1puyj.webp',
    miniProjector2: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996870/miniProjector2_bjzbfj.webp',
    postureCorrector1: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996870/postureCorrector1_wid088.jpg',
    postureCorrector2: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996870/postureCorrector2_ldfw1a.jpg',
    powerBank1: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996870/powerBank1_xmhs3x.webp',
    powerBank2: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996871/powerBank2_wbb9qz.webp',
    phone1: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996871/phone1_nb7rf9.png',
    phone2: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996871/phone2_sktwcd.png',
    watch1: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996871/smartwatch1_nijqix.webp',
    watch2: 'https://res.cloudinary.com/da52uzyjk/image/upload/v1770996872/smartwatch2_u8wiyv.webp',
};

// Raw product data arrays with tags
const bestSellingProducts = [
    {
        image: 'bestSelling1',
        name: 'The north coat',
        currentPrice: 260,
        originalPrice: 360,
        discount: 0,
        rating: 5,
        reviewCount: 65,
        description: 'Stay warm and stylish with The North Coat. Premium insulation, water-resistant fabric, and modern design make it perfect for cold weather adventures. Features multiple pockets and adjustable hood.',
        tags: ['best-selling']
    },
    {
        image: 'bestSelling2',
        name: 'Gucci duffle bag',
        currentPrice: 960,
        originalPrice: 1160,
        discount: 0,
        rating: 4,
        reviewCount: 65,
        description: 'Luxury meets functionality with this Gucci duffle bag. Crafted from premium leather with signature GG pattern, spacious interior, and durable construction. Perfect for travel or gym.',
        tags: ['best-selling']
    },
    {
        image: 'bestSelling3',
        name: 'RGB liquid CPU Cooler',
        currentPrice: 160,
        originalPrice: 170,
        discount: 0,
        rating: 4,
        reviewCount: 65,
        description: 'High-performance liquid cooling system with vibrant RGB lighting. Keep your CPU running cool and quiet with advanced pump technology and 240mm radiator. Compatible with most modern processors.',
        tags: ['best-selling']
    },
    {
        image: 'bestSelling4',
        name: 'Small BookSelf',
        currentPrice: 360,
        originalPrice: 0,
        discount: 0,
        rating: 5,
        reviewCount: 65,
        description: 'Elegant and compact bookshelf crafted from solid wood. Features 4 adjustable shelves, modern minimalist design, and sturdy construction. Perfect for organizing books, decorations, and collectibles.',
        tags: ['best-selling']
    }
];

const flashSalesProducts = [
    {
        image: 'flashSale1',
        name: 'HAVIT HV-G92 Gamepad',
        currentPrice: 120,
        originalPrice: 160,
        discount: 40,
        rating: 5,
        reviewCount: 88,
        description: 'Experience ultimate gaming control with the HAVIT HV-G92 Gamepad. Featuring ergonomic design, responsive buttons, and dual vibration motors for immersive gameplay. Compatible with PC, PS3, and Android devices.',
        tags: ['flash-sale']
    },
    {
        image: 'flashSale2',
        name: 'AK-900 Wired Keyboard',
        currentPrice: 960,
        originalPrice: 1160,
        discount: 35,
        rating: 4,
        reviewCount: 75,
        description: 'Premium mechanical gaming keyboard with customizable RGB backlighting, anti-ghosting technology, and durable switches rated for 50 million keystrokes. Perfect for gamers and professionals alike.',
        tags: ['flash-sale']
    },
    {
        image: 'flashSale3',
        name: 'IPS LCD Gaming Monitor',
        currentPrice: 370,
        originalPrice: 400,
        discount: 30,
        rating: 5,
        reviewCount: 99,
        description: '27-inch Full HD IPS display with 144Hz refresh rate and 1ms response time. Enjoy vibrant colors, wide viewing angles, and smooth gameplay with AMD FreeSync technology.',
        tags: ['flash-sale']
    },
    {
        image: 'flashSale4',
        name: 'S-Series Comfort Chair',
        currentPrice: 375,
        originalPrice: 400,
        discount: 25,
        rating: 4,
        reviewCount: 99,
        description: 'Ergonomic gaming chair with adjustable lumbar support, 4D armrests, and premium PU leather. Designed for extended gaming sessions with maximum comfort and style.',
        tags: ['flash-sale']
    }
];

const exploreProducts = [
    {
        image: 'exploreProducts1',
        name: 'Breed Dry Dog Food',
        currentPrice: 100,
        originalPrice: 0,
        discount: 0,
        rating: 3,
        reviewCount: 35,
        description: 'Premium nutrition for your canine companion. Made with real chicken, wholesome grains, and essential vitamins. Supports healthy digestion, strong bones, and a shiny coat.',
        tags: ['explore']
    },
    {
        image: 'exploreProducts2',
        name: 'CANON EOS DSLR Camera',
        currentPrice: 360,
        originalPrice: 0,
        discount: 0,
        rating: 4,
        reviewCount: 95,
        description: 'Capture stunning photos with this professional DSLR camera. 24.1MP sensor, Full HD video recording, WiFi connectivity, and versatile lens compatibility. Perfect for photography enthusiasts.',
        tags: ['explore']
    },
    {
        image: 'exploreProducts3',
        name: 'ASUS FHD Gaming Laptop',
        currentPrice: 700,
        originalPrice: 0,
        discount: 0,
        rating: 5,
        reviewCount: 325,
        description: 'Powerful gaming laptop featuring Intel Core i7 processor, NVIDIA RTX graphics, 16GB RAM, and 512GB SSD. 15.6-inch FHD display with 144Hz refresh rate for smooth gaming experience.',
        tags: ['explore']
    },
    {
        image: 'exploreProducts4',
        name: 'Curology Product Set',
        currentPrice: 500,
        originalPrice: 0,
        discount: 0,
        rating: 4,
        reviewCount: 145,
        description: 'Complete skincare solution with personalized formulations. Includes cleanser, treatment cream, and moisturizer. Dermatologist-designed to target your specific skin concerns.',
        tags: ['explore']
    },
    {
        image: 'exploreProducts5',
        name: 'Kids Electric Car',
        currentPrice: 960,
        originalPrice: 0,
        discount: 0,
        rating: 5,
        reviewCount: 65,
        description: 'Safe and fun electric ride-on car for kids. Features realistic design, working headlights, music player, and remote control for parents. Rechargeable battery provides hours of entertainment.',
        tags: ['explore']
    },
    {
        image: 'exploreProducts6',
        name: 'Jr. Zoom Soccer Cleats',
        currentPrice: 1160,
        originalPrice: 0,
        discount: 0,
        rating: 5,
        reviewCount: 35,
        description: 'High-performance soccer cleats designed for young athletes. Lightweight construction, superior traction, and comfortable fit. Durable synthetic upper with reinforced toe box.',
        tags: ['explore']
    },
    {
        image: 'exploreProducts7',
        name: 'GP11 Shooter USB Gamepad',
        currentPrice: 660,
        originalPrice: 0,
        discount: 0,
        rating: 4,
        reviewCount: 55,
        description: 'Precision gaming controller with ergonomic design and responsive buttons. Plug-and-play USB connectivity, vibration feedback, and compatible with PC and console gaming.',
        tags: ['explore']
    },
    {
        image: 'exploreProducts8',
        name: 'Quilted Satin Jacket',
        currentPrice: 660,
        originalPrice: 0,
        discount: 0,
        rating: 4,
        reviewCount: 55,
        description: 'Trendy quilted satin jacket with luxurious finish. Lightweight yet warm, featuring side pockets and ribbed cuffs. Perfect layering piece for transitional weather.',
        tags: ['explore']
    }
];

const categoryProducts = [
    // Phones
    {
        image: 'phone1',
        category: 'phones',
        name: 'iPhone 14 Pro Max',
        currentPrice: 1099,
        originalPrice: 1299,
        discount: 0,
        rating: 5,
        reviewCount: 245,
        description: 'Latest iPhone with advanced camera system, A16 Bionic chip, and stunning Super Retina XDR display. Features Dynamic Island, Always-On display, and all-day battery life.',
        tags: []
    },
    {
        image: 'phone2',
        category: 'phones',
        name: 'Samsung Galaxy S23 Ultra',
        currentPrice: 999,
        originalPrice: 0,
        discount: 0,
        rating: 5,
        reviewCount: 189,
        description: 'Premium Android smartphone with 200MP camera, S Pen, and powerful Snapdragon processor. Features stunning AMOLED display and exceptional battery life.',
        tags: []
    },

    // Computers
    {
        image: 'computer1',
        category: 'computers',
        name: 'MacBook Pro 16"',
        currentPrice: 2399,
        originalPrice: 2599,
        discount: 0,
        rating: 5,
        reviewCount: 432,
        description: 'Professional laptop with M2 Pro chip, stunning Liquid Retina XDR display, and all-day battery life. Perfect for creative professionals and developers.',
        tags: []
    },
    {
        image: 'computer2',
        category: 'computers',
        name: 'Dell XPS 15 Laptop',
        currentPrice: 1799,
        originalPrice: 0,
        discount: 0,
        rating: 4,
        reviewCount: 298,
        description: 'Premium Windows laptop with Intel Core i7, NVIDIA graphics, and InfinityEdge display. Ideal for productivity and creative work.',
        tags: []
    },

    // SmartWatch
    {
        image: 'watch1',
        category: 'smartwatch',
        name: 'Apple Watch Series 9',
        currentPrice: 399,
        originalPrice: 449,
        discount: 0,
        rating: 5,
        reviewCount: 567,
        description: 'Advanced health and fitness tracking with ECG, blood oxygen monitoring, and always-on Retina display. Features new S9 chip for enhanced performance.',
        tags: []
    },
    {
        image: 'watch2',
        category: 'smartwatch',
        name: 'Samsung Galaxy Watch 6',
        currentPrice: 299,
        originalPrice: 0,
        discount: 0,
        rating: 4,
        reviewCount: 423,
        description: 'Comprehensive health monitoring with advanced sleep tracking, heart rate monitoring, and body composition analysis. Compatible with Android devices.',
        tags: []
    },

    // Camera
    {
        image: 'camera1',
        category: 'camera',
        name: 'Canon EOS R5',
        currentPrice: 3899,
        originalPrice: 0,
        discount: 0,
        rating: 5,
        reviewCount: 156,
        description: 'Professional mirrorless camera with 45MP full-frame sensor, 8K video recording, and advanced autofocus system. Perfect for professional photographers.',
        tags: []
    },
    {
        image: 'camera2',
        category: 'camera',
        name: 'Sony Alpha A7 IV',
        currentPrice: 2498,
        originalPrice: 2698,
        discount: 0,
        rating: 5,
        reviewCount: 203,
        description: 'Versatile full-frame mirrorless camera with 33MP sensor, 4K 60p video, and exceptional autofocus. Ideal for hybrid photo and video work.',
        tags: []
    },

    // HeadPhones
    {
        image: 'headphone1',
        category: 'headphones',
        name: 'Sony WH-1000XM5',
        currentPrice: 398,
        originalPrice: 0,
        discount: 0,
        rating: 5,
        reviewCount: 892,
        description: 'Industry-leading noise cancellation with exceptional sound quality. Features 30-hour battery life, multipoint connection, and premium comfort.',
        tags: []
    },
    {
        image: 'headphone2',
        category: 'headphones',
        name: 'AirPods Pro 2nd Gen',
        currentPrice: 249,
        originalPrice: 0,
        discount: 0,
        rating: 5,
        reviewCount: 1024,
        description: 'Premium wireless earbuds with active noise cancellation, spatial audio, and adaptive transparency. Features H2 chip for enhanced performance.',
        tags: []
    },

    // Gaming
    {
        image: 'gaming1',
        category: 'gaming',
        name: 'PlayStation 5',
        currentPrice: 499,
        originalPrice: 0,
        discount: 0,
        rating: 5,
        reviewCount: 2341,
        description: 'Next-gen gaming console with ultra-high-speed SSD, ray tracing, and 4K gaming. Features DualSense controller with haptic feedback.',
        tags: []
    },
    {
        image: 'gaming2',
        category: 'gaming',
        name: 'Xbox Series X',
        currentPrice: 499,
        originalPrice: 0,
        discount: 0,
        rating: 5,
        reviewCount: 1876,
        description: 'Powerful gaming console with 4K gaming at 120fps, quick resume, and Game Pass compatibility. Features 1TB custom SSD.',
        tags: []
    },

    // Power Banks (subcategory of Portable Gadgets)
    {
        image: 'powerBank1',
        category: 'power-banks',
        parentCategory: 'portable-gadgets',
        name: 'Anker PowerCore 20000mAh',
        currentPrice: 45,
        originalPrice: 60,
        discount: 0,
        rating: 5,
        reviewCount: 1256,
        description: 'High-capacity portable charger with fast charging technology. Charges phones multiple times and features dual USB ports.',
        tags: []
    },
    {
        image: 'powerBank2',
        category: 'power-banks',
        parentCategory: 'portable-gadgets',
        name: 'RAVPower 26800mAh Power Bank',
        currentPrice: 55,
        originalPrice: 0,
        discount: 0,
        rating: 4,
        reviewCount: 892,
        description: 'Ultra-high capacity power bank with three USB ports. Features iSmart technology for optimal charging speed.',
        tags: []
    },

    // Mini Projectors (subcategory of Portable Gadgets)
    {
        image: 'miniProjector1',
        category: 'mini-projectors',
        parentCategory: 'portable-gadgets',
        name: 'XGIMI MoGo Pro Portable Projector',
        currentPrice: 499,
        originalPrice: 599,
        discount: 0,
        rating: 5,
        reviewCount: 456,
        description: 'Compact portable projector with 1080p resolution, Android TV, and built-in battery. Perfect for entertainment anywhere.',
        tags: []
    },
    {
        image: 'miniProjector2',
        category: 'mini-projectors',
        parentCategory: 'portable-gadgets',
        name: 'Anker Nebula Capsule II',
        currentPrice: 579,
        originalPrice: 0,
        discount: 0,
        rating: 4,
        reviewCount: 678,
        description: 'Palm-sized smart projector with 720p resolution and Android TV. Features 2.5-hour battery life and 360° speaker.',
        tags: []
    },

    // Fitness Trackers (subcategory of Wearable Tech)
    {
        image: 'fitnessTracker1',
        category: 'fitness-trackers',
        parentCategory: 'wearable-tech',
        name: 'Fitbit Charge 6',
        currentPrice: 159,
        originalPrice: 179,
        discount: 0,
        rating: 5,
        reviewCount: 2341,
        description: 'Advanced fitness tracker with built-in GPS, heart rate monitoring, and stress management tools. Features 7-day battery life.',
        tags: []
    },
    {
        image: 'fitnessTracker2',
        category: 'fitness-trackers',
        parentCategory: 'wearable-tech',
        name: 'Garmin Vivosmart 5',
        currentPrice: 149,
        originalPrice: 0,
        discount: 0,
        rating: 4,
        reviewCount: 1567,
        description: 'Slim fitness tracker with advanced health monitoring, sleep tracking, and stress tracking. Features bright OLED display.',
        tags: []
    },

    // Posture Correctors (subcategory of Wearable Tech)
    {
        image: 'postureCorrector1',
        category: 'posture-correctors',
        parentCategory: 'wearable-tech',
        name: 'UPRIGHT GO 2 Posture Trainer',
        currentPrice: 79,
        originalPrice: 99,
        discount: 0,
        rating: 4,
        reviewCount: 892,
        description: 'Smart posture trainer with gentle vibration reminders. Tracks posture habits and provides personalized training programs.',
        tags: []
    },
    {
        image: 'postureCorrector2',
        category: 'posture-correctors',
        parentCategory: 'wearable-tech',
        name: 'Lumo Lift Posture Coach',
        currentPrice: 89,
        originalPrice: 0,
        discount: 0,
        rating: 4,
        reviewCount: 654,
        description: 'Wearable posture coach with real-time feedback. Helps develop better posture habits through gentle vibration alerts.',
        tags: []
    }
];

// Consolidate all products and handle duplicates
const consolidateProducts = () => {
    const productMap = new Map();

    const allProducts = [
        ...bestSellingProducts,
        ...flashSalesProducts,
        ...exploreProducts,
        ...categoryProducts
    ];

    allProducts.forEach(product => {
        const key = product.name.toLowerCase().trim();

        if (productMap.has(key)) {
            // Product already exists, merge tags
            const existing = productMap.get(key);
            existing.tags = [...new Set([...existing.tags, ...product.tags])];
        } else {
            // New product, add to map
            // Convert image variable name to actual URL
            const imageUrl = imageMapping[product.image] || product.image;

            productMap.set(key, {
                image: imageUrl,
                name: product.name,
                currentPrice: product.currentPrice,
                originalPrice: product.originalPrice,
                discount: product.discount,
                rating: product.rating,
                reviewCount: product.reviewCount,
                description: product.description,
                category: product.category,
                parentCategory: product.parentCategory,
                tags: product.tags
            });
        }
    });

    return Array.from(productMap.values());
};

// Seed function
const seedProducts = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });

        console.log('✅ Connected to MongoDB');

        // Optional: Clear existing products (uncomment if you want to reset)
        // await Product.deleteMany({});
        // console.log('🗑️  Cleared existing products');

        // Consolidate products
        const uniqueProducts = consolidateProducts();

        console.log(`📦 Preparing to seed ${uniqueProducts.length} unique products...`);

        // Insert products
        const insertedProducts = await Product.insertMany(uniqueProducts);

        console.log(`✅ Successfully seeded ${insertedProducts.length} products!`);

        // Display some stats
        const tagStats = {};
        insertedProducts.forEach(product => {
            product.tags.forEach(tag => {
                tagStats[tag] = (tagStats[tag] || 0) + 1;
            });
        });

        console.log('\n📊 Product Statistics:');
        console.log('Tag Distribution:', tagStats);

        const categoryStats = {};
        insertedProducts.forEach(product => {
            if (product.category) {
                categoryStats[product.category] = (categoryStats[product.category] || 0) + 1;
            }
        });
        console.log('Category Distribution:', categoryStats);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding products:', error);
        process.exit(1);
    }
};

// Run the seed function
seedProducts();
