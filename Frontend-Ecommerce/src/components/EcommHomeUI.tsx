// ============================================
// components/EcommHomeUI.tsx - Updated with Navigation, Subcategories, and Product Descriptions
// ============================================
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  Smartphone,
  Monitor,
  Watch,
  Camera,
  Headphones,
  Gamepad2,
  Truck,
  ShieldCheck
} from 'lucide-react';
import ProductCard from './shared/ProductCard';
import appleImage from '../assets/icons/appleImage.png';
import musicImage from '../assets/icons/musicImage.png';
import PlayStation from '../assets/icons/PlayStation.png';
import womenCollection from '../assets/icons/womenCollection.png';
import speakers from '../assets/icons/speakers.png';
import Perfume from '../assets/icons/Perfume.png';

// import images for Flash Sales
import flashSales1 from '../assets/icons/flashSale1.png';
import flashSales2 from '../assets/icons/flashSale2.png';
import flashSales3 from '../assets/icons/flashSale3.png';
import flashSales4 from '../assets/icons/flashSale4.png';

// import images for Best Selling Product
import bestSelling1 from '../assets/icons/bestSelling1.png';
import bestSelling2 from '../assets/icons/bestSelling2.png';
import bestSelling3 from '../assets/icons/bestSelling3.png';
import bestSelling4 from '../assets/icons/bestSelling4.png';

// import images for Explore Products
import exploreProducts1 from '../assets/icons/exploreProducts1.jpg';
import exploreProducts2 from '../assets/icons/exploreProducts2.png';
import exploreProducts3 from '../assets/icons/exploreProducts3.png';
import exploreProducts4 from '../assets/icons/exploreProducts4.png';
import exploreProducts5 from '../assets/icons/exploreProducts5.png';
import exploreProducts6 from '../assets/icons/exploreProducts6.png';
import exploreProducts7 from '../assets/icons/exploreProducts7.png';
import exploreProducts8 from '../assets/icons/exploreProducts8.png';

// Flash Sales Products Data with Descriptions
const flashSalesProducts = [
  {
    id: 'flash-1',
    image: flashSales1,
    name: 'HAVIT HV-G92 Gamepad',
    currentPrice: 120,
    originalPrice: 160,
    discount: 40,
    rating: 5,
    reviewCount: 88,
    description: 'Experience ultimate gaming control with the HAVIT HV-G92 Gamepad. Featuring ergonomic design, responsive buttons, and dual vibration motors for immersive gameplay. Compatible with PC, PS3, and Android devices.'
  },
  {
    id: 'flash-2',
    image: flashSales2,
    name: 'AK-900 Wired Keyboard',
    currentPrice: 960,
    originalPrice: 1160,
    discount: 35,
    rating: 4,
    reviewCount: 75,
    description: 'Premium mechanical gaming keyboard with customizable RGB backlighting, anti-ghosting technology, and durable switches rated for 50 million keystrokes. Perfect for gamers and professionals alike.'
  },
  {
    id: 'flash-3',
    image: flashSales3,
    name: 'IPS LCD Gaming Monitor',
    currentPrice: 370,
    originalPrice: 400,
    discount: 30,
    rating: 5,
    reviewCount: 99,
    description: '27-inch Full HD IPS display with 144Hz refresh rate and 1ms response time. Enjoy vibrant colors, wide viewing angles, and smooth gameplay with AMD FreeSync technology.'
  },
  {
    id: 'flash-4',
    image: flashSales4,
    name: 'S-Series Comfort Chair',
    currentPrice: 375,
    originalPrice: 400,
    discount: 25,
    rating: 4,
    reviewCount: 99,
    description: 'Ergonomic gaming chair with adjustable lumbar support, 4D armrests, and premium PU leather. Designed for extended gaming sessions with maximum comfort and style.'
  },
  {
    id: 'flash-5',
    image: flashSales1,
    name: 'HAVIT HV-G92 Gamepad',
    currentPrice: 120,
    originalPrice: 160,
    discount: 40,
    rating: 5,
    reviewCount: 88,
    description: 'Experience ultimate gaming control with the HAVIT HV-G92 Gamepad. Featuring ergonomic design, responsive buttons, and dual vibration motors for immersive gameplay. Compatible with PC, PS3, and Android devices.'
  },
  {
    id: 'flash-6',
    image: flashSales2,
    name: 'AK-900 Wired Keyboard',
    currentPrice: 960,
    originalPrice: 1160,
    discount: 35,
    rating: 4,
    reviewCount: 75,
    description: 'Premium mechanical gaming keyboard with customizable RGB backlighting, anti-ghosting technology, and durable switches rated for 50 million keystrokes. Perfect for gamers and professionals alike.'
  },
  {
    id: 'flash-7',
    image: flashSales3,
    name: 'IPS LCD Gaming Monitor',
    currentPrice: 370,
    originalPrice: 400,
    discount: 30,
    rating: 5,
    reviewCount: 99,
    description: '27-inch Full HD IPS display with 144Hz refresh rate and 1ms response time. Enjoy vibrant colors, wide viewing angles, and smooth gameplay with AMD FreeSync technology.'
  },
  {
    id: 'flash-8',
    image: flashSales4,
    name: 'S-Series Comfort Chair',
    currentPrice: 375,
    originalPrice: 400,
    discount: 25,
    rating: 4,
    reviewCount: 99,
    description: 'Ergonomic gaming chair with adjustable lumbar support, 4D armrests, and premium PU leather. Designed for extended gaming sessions with maximum comfort and style.'
  }
];

// Best Selling Products Data with Descriptions
const bestSellingProducts = [
  {
    id: 'best-1',
    image: bestSelling1,
    name: 'The north coat',
    currentPrice: 260,
    originalPrice: 360,
    discount: 0,
    rating: 5,
    reviewCount: 65,
    description: 'Stay warm and stylish with The North Coat. Premium insulation, water-resistant fabric, and modern design make it perfect for cold weather adventures. Features multiple pockets and adjustable hood.'
  },
  {
    id: 'best-2',
    image: bestSelling2,
    name: 'Gucci duffle bag',
    currentPrice: 960,
    originalPrice: 1160,
    discount: 0,
    rating: 4,
    reviewCount: 65,
    description: 'Luxury meets functionality with this Gucci duffle bag. Crafted from premium leather with signature GG pattern, spacious interior, and durable construction. Perfect for travel or gym.'
  },
  {
    id: 'best-3',
    image: bestSelling3,
    name: 'RGB liquid CPU Cooler',
    currentPrice: 160,
    originalPrice: 170,
    discount: 0,
    rating: 4,
    reviewCount: 65,
    description: 'High-performance liquid cooling system with vibrant RGB lighting. Keep your CPU running cool and quiet with advanced pump technology and 240mm radiator. Compatible with most modern processors.'
  },
  {
    id: 'best-4',
    image: bestSelling4,
    name: 'Small BookSelf',
    currentPrice: 360,
    originalPrice: 0,
    discount: 0,
    rating: 5,
    reviewCount: 65,
    description: 'Elegant and compact bookshelf crafted from solid wood. Features 4 adjustable shelves, modern minimalist design, and sturdy construction. Perfect for organizing books, decorations, and collectibles.'
  }
];

// Explore Products Data with Descriptions
const exploreProductsData = [
  {
    id: 'explore-1',
    image: exploreProducts1,
    name: 'Breed Dry Dog Food',
    currentPrice: 100,
    originalPrice: 0,
    discount: 0,
    rating: 3,
    reviewCount: 35,
    description: 'Premium nutrition for your canine companion. Made with real chicken, wholesome grains, and essential vitamins. Supports healthy digestion, strong bones, and a shiny coat.'
  },
  {
    id: 'explore-2',
    image: exploreProducts2,
    name: 'CANON EOS DSLR Camera',
    currentPrice: 360,
    originalPrice: 0,
    discount: 0,
    rating: 4,
    reviewCount: 95,
    description: 'Capture stunning photos with this professional DSLR camera. 24.1MP sensor, Full HD video recording, WiFi connectivity, and versatile lens compatibility. Perfect for photography enthusiasts.'
  },
  {
    id: 'explore-3',
    image: exploreProducts3,
    name: 'ASUS FHD Gaming Laptop',
    currentPrice: 700,
    originalPrice: 0,
    discount: 0,
    rating: 5,
    reviewCount: 325,
    description: 'Powerful gaming laptop featuring Intel Core i7 processor, NVIDIA RTX graphics, 16GB RAM, and 512GB SSD. 15.6-inch FHD display with 144Hz refresh rate for smooth gaming experience.'
  },
  {
    id: 'explore-4',
    image: exploreProducts4,
    name: 'Curology Product Set',
    currentPrice: 500,
    originalPrice: 0,
    discount: 0,
    rating: 4,
    reviewCount: 145,
    description: 'Complete skincare solution with personalized formulations. Includes cleanser, treatment cream, and moisturizer. Dermatologist-designed to target your specific skin concerns.'
  },
  {
    id: 'explore-5',
    image: exploreProducts5,
    name: 'Kids Electric Car',
    currentPrice: 960,
    originalPrice: 0,
    discount: 0,
    rating: 5,
    reviewCount: 65,
    description: 'Safe and fun electric ride-on car for kids. Features realistic design, working headlights, music player, and remote control for parents. Rechargeable battery provides hours of entertainment.'
  },
  {
    id: 'explore-6',
    image: exploreProducts6,
    name: 'Jr. Zoom Soccer Cleats',
    currentPrice: 1160,
    originalPrice: 0,
    discount: 0,
    rating: 5,
    reviewCount: 35,
    description: 'High-performance soccer cleats designed for young athletes. Lightweight construction, superior traction, and comfortable fit. Durable synthetic upper with reinforced toe box.'
  },
  {
    id: 'explore-7',
    image: exploreProducts7,
    name: 'GP11 Shooter USB Gamepad',
    currentPrice: 660,
    originalPrice: 0,
    discount: 0,
    rating: 4,
    reviewCount: 55,
    description: 'Precision gaming controller with ergonomic design and responsive buttons. Plug-and-play USB connectivity, vibration feedback, and compatible with PC and console gaming.'
  },
  {
    id: 'explore-8',
    image: exploreProducts8,
    name: 'Quilted Satin Jacket',
    currentPrice: 660,
    originalPrice: 0,
    discount: 0,
    rating: 4,
    reviewCount: 55,
    description: 'Trendy quilted satin jacket with luxurious finish. Lightweight yet warm, featuring side pockets and ribbed cuffs. Perfect layering piece for transitional weather.'
  }
];

// Countdown Timer Component    
const CountdownTimer: React.FC<{ targetDate: Date }> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 font-inter">
      {['Days', 'Hours', 'Minutes', 'Seconds'].map((label, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center">
            <span className="text-[8px] sm:text-[10px] md:text-xs font-medium">{label}</span>
            <span className="text-lg sm:text-2xl md:text-[32px] font-bold leading-tight md:leading-[30px] tracking-wide">
              {String(Object.values(timeLeft)[i]).padStart(2, '0')}
            </span>
          </div>
          {i < 3 && <span className="text-lg sm:text-2xl md:text-[32px] font-bold text-[#E07575] mt-3 sm:mt-4">:</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

const EcommHomeUI: React.FC = () => {
  const navigate = useNavigate();
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 3);
  targetDate.setHours(23, 59, 59);

  // State for expanded categories in sidebar (allow multiple)
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  // Ref for Flash Sales scrollable container
  const flashSalesScrollRef = React.useRef<HTMLDivElement>(null);

  // State to track window width for responsive card limiting
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll Flash Sales left/right
  const scrollFlashSales = (direction: 'left' | 'right') => {
    if (flashSalesScrollRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = direction === 'left' 
        ? flashSalesScrollRef.current.scrollLeft - scrollAmount
        : flashSalesScrollRef.current.scrollLeft + scrollAmount;
      
      flashSalesScrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  // Helper function to get products to display based on screen size
  const getProductsToDisplay = (products: typeof bestSellingProducts) => {
    if (windowWidth < 768) {
      return products.slice(0, 4);
    }
    if (windowWidth >= 768 && windowWidth < 1024) {
      return products.slice(0, 4);
    }
    return products;
  };

  // Navigation handlers
  const handleCategoryClick = (categoryId: string, hasSubcategories: boolean) => {
    if (hasSubcategories) {
      // Toggle subcategories in sidebar - allow multiple to be open
      setExpandedCategories(prev => 
        prev.includes(categoryId) 
          ? prev.filter(id => id !== categoryId) 
          : [...prev, categoryId]
      );
    } else {
      // Navigate to products page
      navigate(`/products?category=${categoryId}`);
    }
  };

  const handleSubcategoryClick = (subcategoryId: string) => {
    navigate(`/products?category=${subcategoryId}`);
  };

  const handleViewAllProducts = () => {
    navigate('/products');
  };

  const categories = [
    { 
      id: "portable-gadgets",
      name: "Portable Gadgets", 
      hasSubcategories: true,
      subcategories: [
        { id: "power-banks", name: "Power Banks" },
        { id: "mini-projectors", name: "Mini Projectors" }
      ]
    },
    { 
      id: "wearable-tech",
      name: "Wearable Tech", 
      hasSubcategories: true,
      subcategories: [
        { id: "fitness-trackers", name: "Fitness Trackers" },
        { id: "posture-correctors", name: "Posture Correctors" }
      ]
    },
    { id: "phones", name: "Phones", hasSubcategories: false },
    { id: "computers", name: "Computers", hasSubcategories: false },
    { id: "smartwatch", name: "SmartWatch", hasSubcategories: false },
    { id: "camera", name: "Camera", hasSubcategories: false },
    { id: "headphones", name: "HeadPhones", hasSubcategories: false },
    { id: "gaming", name: "Gaming", hasSubcategories: false },
  ];

  // Browse by category items with IDs
  const browseCategories = [
    { id: 'phones', name: 'Phones', icon: Smartphone },
    { id: 'computers', name: 'Computers', icon: Monitor },
    { id: 'smartwatch', name: 'SmartWatch', icon: Watch },
    { id: 'camera', name: 'Camera', icon: Camera },
    { id: 'headphones', name: 'HeadPhones', icon: Headphones },
    { id: 'gaming', name: 'Gaming', icon: Gamepad2 }
  ];

  return (
    <div className="w-full ecomm-home-container">
      {/* Hero Section */}
      <div className="hero-section pb-12 sm:pb-20 lg:pb-[140px]">
        <div className="flex flex-col md:flex-row gap-6 md:gap-[45px]">
          {/* Categories Sidebar - Desktop Only */}
          <div className="categories-sidebar hidden md:flex md:w-[217px] pt-10 flex-col gap-4">
            {categories.map((category, index) => (
              <React.Fragment key={category.id}>
                {/* Main Category - Always Show */}
                <button
                  onClick={() => handleCategoryClick(category.id, category.hasSubcategories)}
                  className="flex items-center justify-between h-5 sm:h-6 text-app-black hover:text-auth-primary transition-colors cursor-pointer text-left w-full"
                >
                  <span className="font-poppins text-base font-normal leading-6">
                    {category.name}
                  </span>
                  {category.hasSubcategories && (
                    expandedCategories.includes(category.id) ? (
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                    ) : (
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                    )
                  )}
                </button>
                
                {/* Subcategories */}
                {category.hasSubcategories && expandedCategories.includes(category.id) && category.subcategories && (
                  <div className="flex flex-col gap-2 pl-4">
                    {category.subcategories.map((subcat) => (
                      <button
                        key={subcat.id}
                        onClick={() => handleSubcategoryClick(subcat.id)}
                        className="flex items-center h-5 text-gray-600 hover:text-auth-primary transition-colors cursor-pointer text-left"
                      >
                        <span className="font-poppins text-sm font-normal leading-5">
                          {subcat.name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          
          <div className="hidden md:block w-px h-[384px] bg-gray-400 opacity-50" />
          <div className="banner-image w-full md:flex-1 pt-6 lg:pt-10">
            <img src={appleImage} alt="iPhone 14 Series Banner" className="safe-image" loading="eager" />
          </div>
        </div>
      </div>

      {/* Flash Sales Section */}
      <div className="flash-sales-section w-full mb-12 sm:mb-20 lg:mb-[140px]">
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <div className="flex items-end justify-between">
            <div className="flex items-end gap-4 sm:gap-8 md:gap-12 lg:gap-[87px]">
              <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6">
                <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                  <div className="w-3 h-6 sm:w-4 sm:h-8 lg:w-5 lg:h-10 bg-auth-primary rounded" />
                  <span className="font-poppins font-semibold text-xs sm:text-sm lg:text-base leading-4 sm:leading-5 text-auth-primary">
                    Today's
                  </span>
                </div>
                <h2 className="font-inter font-semibold text-xl sm:text-2xl md:text-3xl lg:text-[36px] leading-7 sm:leading-9 lg:leading-[48px] tracking-[0.04em] text-app-black">
                  Flash Sales
                </h2>
              </div>
              <div className="hidden md:flex">
                <CountdownTimer targetDate={targetDate} />
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => scrollFlashSales('left')}
                className="w-9 h-9 md:w-10 md:h-10 lg:w-[46px] lg:h-[46px] rounded-full bg-app-gray-light flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6" />
              </button>
              <button 
                onClick={() => scrollFlashSales('right')}
                className="w-9 h-9 md:w-10 md:h-10 lg:w-[46px] lg:h-[46px] rounded-full bg-app-gray-light flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6" />
              </button>
            </div>
          </div>
        </div>
        <div className="relative -mr-4 sm:-mr-6 md:-mr-16 lg:-mr-[calc((100vw-1280px)/2+64px)]">
        <div 
          ref={flashSalesScrollRef}
          className="products-scrollable overflow-x-auto scrollbar-hide flex gap-4 sm:gap-5 md:gap-6 lg:gap-[30px] pr-4 sm:pr-6 md:pr-16"
        >
          {flashSalesProducts.map((product) => (
            <ProductCard 
              key={product.id}
              productId={product.id}
              scrollable
              productImage={product.image}
              productName={product.name}
              currentPrice={product.currentPrice}
              originalPrice={product.originalPrice}
              discount={product.discount}
              rating={product.rating}
              reviewCount={product.reviewCount}
              showDiscount={true}
              productDescription={product.description}
            />
          ))}
        </div>
        </div>
        <div className="m-8 sm:m-12 lg:m-[70px]">
          <div className="w-full h-px bg-gray-400 opacity-50" />
        </div>
      </div>

      {/* Browse By Category Section */}
      <div className="browse-category-section mb-8 sm:mb-12 lg:mb-[70px]">
        <div className="flex items-end justify-between mb-8 sm:mb-10 lg:mb-[60px]">
          <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6">
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              <div className="w-3 h-6 sm:w-4 sm:h-8 lg:w-5 lg:h-10 bg-auth-primary rounded" />
              <span className="font-poppins font-semibold text-xs sm:text-sm lg:text-base leading-4 sm:leading-5 text-auth-primary">
                Categories
              </span>
            </div>
            <h2 className="font-inter font-semibold text-xl sm:text-2xl md:text-3xl lg:text-[36px] leading-7 sm:leading-9 lg:leading-[48px] tracking-[0.04em] text-app-black">
              Browse By Category
            </h2>
          </div>
        </div>
        <div className="categories-flex flex flex-wrap justify-center md:justify-between gap-2.5 sm:gap-2.5 md:gap-3 lg:gap-[15px]">
          {browseCategories.map((category, index) => (
            <div
              key={index}
              onClick={() => navigate(`/products?category=${category.id}`)}
              className="category-card w-[calc(33.333%-11px)] sm:w-[calc(33.333%-14px)] md:w-[calc(33.333%-16px)] lg:w-[170px] h-[145px] sm:h-[130px] md:h-[135px] lg:h-[145px] 
                         border border-[#0000004D] rounded flex flex-col items-center justify-center gap-2 sm:gap-3 lg:gap-4 cursor-pointer 
                         transition-all duration-300 ease-in-out
                         hover:bg-[#DB4444] group"
            >
              <category.icon
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-14 lg:h-14 text-black group-hover:text-white transition-colors duration-300"
              />
              <span className="font-poppins font-normal text-xs sm:text-sm md:text-sm lg:text-base leading-4 sm:leading-5 lg:leading-6 text-center px-1 text-black group-hover:text-white transition-colors duration-300">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full">
        <div className="h-px bg-gray-400 opacity-50 m-8 sm:m-12 lg:m-[70px]" />
      </div>

      {/* Best Selling Products */}
      <div className="best-selling-products mb-12 sm:mb-20 lg:mb-[140px]">
        <div className="flex items-end justify-between mb-6 sm:mb-8 lg:mb-10">
          <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6">
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              <div className="w-3 h-6 sm:w-4 sm:h-8 lg:w-5 lg:h-10 bg-auth-primary rounded" />
              <span className="font-poppins font-semibold text-xs sm:text-sm lg:text-base leading-4 sm:leading-5 text-auth-primary">
                This Month
              </span>
            </div>
            <h2 className="font-inter font-semibold text-xl sm:text-2xl md:text-3xl lg:text-[36px] leading-7 sm:leading-9 lg:leading-[48px] text-app-black">
              Best Selling Products
            </h2>
          </div>
        </div>
        <div
          className="
            products-grid
            grid
            grid-cols-2
            md:grid-cols-2
            lg:grid-cols-4
            gap-4 sm:gap-5 md:gap-6 lg:gap-[30px]
            justify-items-center
          "
        >
          {getProductsToDisplay(bestSellingProducts).map((product) => (
            <ProductCard
              key={product.id}
              productId={product.id}
              productImage={product.image}
              productName={product.name}
              currentPrice={product.currentPrice}
              originalPrice={product.originalPrice}
              discount={product.discount}
              rating={product.rating}
              reviewCount={product.reviewCount}
              showDiscount={false}
              productDescription={product.description}
            />
          ))}
        </div>
      </div>

      {/* Music Banner */}
      <div className="music-banner w-full mb-12 sm:mb-20 lg:mb-[140px]">
        <img
          src={musicImage}
          alt="Music Banner"
          className="safe-image w-full h-auto object-contain"
        />
      </div>

      {/* Explore Products */}
      <div className="explore-products mb-12 sm:mb-20 lg:mb-[140px]">
        <div className="flex items-end justify-between mb-6 sm:mb-8 lg:mb-10">
          <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6">
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              <div className="w-3 h-6 sm:w-4 sm:h-8 lg:w-5 lg:h-10 bg-auth-primary rounded" />
              <span className="font-poppins font-semibold text-xs sm:text-sm lg:text-base leading-4 sm:leading-5 text-auth-primary">
                Our Products
              </span>
            </div>
            <h2 className="font-inter font-semibold text-xl sm:text-2xl md:text-3xl lg:text-[36px] leading-7 sm:leading-9 lg:leading-[48px] text-app-black">
              Explore Products
            </h2>
          </div>
        </div>
        <div
          className="
            products-grid
            grid
            grid-cols-2
            md:grid-cols-2
            lg:grid-cols-4
            gap-4 sm:gap-5 md:gap-6 lg:gap-[30px]
            justify-items-center
            mb-8 sm:mb-10 lg:mb-[60px]
          "
        >
          {getProductsToDisplay(exploreProductsData).map((product) => (
            <ProductCard
              key={product.id}
              productId={product.id}
              productImage={product.image}
              productName={product.name}
              currentPrice={product.currentPrice}
              originalPrice={product.originalPrice}
              discount={product.discount}
              rating={product.rating}
              reviewCount={product.reviewCount}
              showDiscount={false}
              productDescription={product.description}
            />
          ))}
        </div>
        
        {/* View All Products Button */}
        <div className="flex justify-center items-center w-full">
          <button
            onClick={handleViewAllProducts}
            className="view-all-products-btn font-poppins font-medium text-white bg-[#DB4444] hover:bg-[#E85555] transition-colors duration-300 rounded"
            style={{
              width: '180px',
              height: '64px',
              paddingTop: '12px',
              paddingRight: '36px',
              paddingBottom: '12px',
              paddingLeft: '36px',
              marginTop: '28px'
            }}
          >
            View All Products
          </button>
        </div>
      </div>

      {/* New Arrival Section */}
      <div className="new-arrival-section mb-12 sm:mb-20 lg:mb-[140px]">
        <div className="flex flex-col gap-8 sm:gap-10 lg:gap-[60px]">
          <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6">
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              <div className="w-3 h-6 sm:w-4 sm:h-8 lg:w-5 lg:h-10 bg-auth-primary rounded" />
              <span className="font-poppins font-semibold text-xs sm:text-sm lg:text-base leading-4 sm:leading-5 text-auth-primary">
                Featured
              </span>
            </div>
            <h2 className="font-inter font-semibold text-xl sm:text-2xl md:text-3xl lg:text-[36px] leading-7 sm:leading-9 lg:leading-[48px] tracking-[0.04em] text-app-black">
              New Arrival
            </h2>
          </div>

          



          <div className="new-arrival-grid flex flex-col lg:flex-row gap-6 lg:gap-[30px] bg-black">
            <div className="playstation-image w-full lg:w-[570px] h-[200px] sm:h-[300px] lg:h-[612px] overflow-hidden">
              <img src={PlayStation} alt="PlayStation" className="w-full h-full object-cover object-bottom lg:object-left-bottom bg-black" />
            </div>
            <div className="arrival-images flex flex-col gap-4 lg:gap-8 w-full lg:flex-1">
              <div className="women-collection w-full h-[200px] sm:h-[280px] lg:h-[290px] overflow-hidden">
                <img src={womenCollection} alt="Women Collection" className="w-full h-full object-cover object-left sm:object-left md:object-left lg:object-left-bottom" />
              </div>
              <div className="bottom-row flex gap-4 sm:gap-6 lg:gap-[30px] w-full">
                <div className="perfume-image flex-1 h-[140px] sm:h-[200px] lg:h-[290px] overflow-hidden">
                  <img src={Perfume} alt="Perfume" className="w-full h-full object-cover object-bottom lg:object-left-bottom" />
                </div>
                <div className="speakers-image flex-1 h-[140px] sm:h-[200px] lg:h-[290px] overflow-hidden">
                  <img src={speakers} alt="Speakers" className="w-full h-full object-cover object-bottom lg:object-left-bottom" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="services-section mb-12 sm:mb-20 lg:mb-[140px]">
        <div className="flex flex-col sm:flex-row justify-between flex-wrap gap-4 sm:gap-6 md:gap-8 lg:gap-[24px]">
          {[
            {
              name: 'Free and Fast Delivery',
              icon: Truck,
              desc: 'Free delivery for all orders over $140'
            },
            {
              name: '24/7 Customer Service',
              icon: Headphones,
              desc: 'Friendly 24/7 customer support'
            },
            {
              name: 'Money Back Guarantee',
              icon: ShieldCheck,
              desc: "We return money within 30 days"
            }
          ].map((service, index) => (
            <div
              key={index}
              className="service-item min-w-0 flex flex-col items-center justify-center gap-2 sm:gap-2 md:gap-3 w-full sm:w-[calc(33.333%-8px)] md:w-[calc(33.333%-12px)] lg:w-[calc(33.333%-16px)] text-center"
            >
              <service.icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-app-primary" />
              <span className="font-poppins font-medium text-sm sm:text-base md:text-lg lg:text-xl text-app-black text-center whitespace-normal break-words">
                {service.name}
              </span>
              <p className="font-poppins font-normal text-sm leading-normal tracking-normal text-center whitespace-normal break-words mt-1 text-app-black">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        
        
        .ecomm-home-container {
          
          max-width: 100vw;
        }

        .flash-sales-section {
          overflow-x: visible;
        }
        
        .ecomm-home-container > * {
          max-width: 100%;
        }
        
        .view-all-products-btn {
          cursor: pointer;
          font-size: 14px;
          whitespace: nowrap;
          color: #ffffff !important;
        }
        
        @media (min-width: 768px) {
          .view-all-products-btn {
            width: 234px !important;
            height: 56px !important;
            padding-top: 16px !important;
            padding-right: 48px !important;
            padding-bottom: 16px !important;
            padding-left: 48px !important;
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default EcommHomeUI;