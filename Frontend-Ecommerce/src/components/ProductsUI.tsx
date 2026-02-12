// ============================================
// components/ProductsUI.tsx - Products Listing Page with Multi-Select Filter
// ============================================
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from './shared/ProductCard';
import '../styles/scss/_ProductsUI.scss';

// Import product images
//phones
import phone1 from '../assets/icons/phone1.png';
import phone2 from '../assets/icons/phone2.png';
//computers
import computer1 from '../assets/icons/computer1.webp';
import computer2 from '../assets/icons/computer2.webp';
// watch
import watch1 from '../assets/icons/smartwatch1.webp';
import watch2 from '../assets/icons/smartwatch2.webp';
// camera
import camera1 from '../assets/icons/camera1.webp';
import camera2 from '../assets/icons/camera2.webp';
// headphones
import headphone1 from '../assets/icons/headphones1.webp';
import headphone2 from '../assets/icons/headphones2.webp';
// gaming
import gaming1 from '../assets/icons/gaming1.webp';
import gaming2 from '../assets/icons/gaming2.webp';
// power bank
import powerBank1 from '../assets/icons/powerBank1.webp';
import powerBank2 from '../assets/icons/powerBank2.webp';
// mini projector
import miniProjector1 from '../assets/icons/miniProjector1.webp';
import miniProjector2 from '../assets/icons/miniProjector2.webp';
// postureCorrector
import postureCorrector1 from '../assets/icons/postureCorrector1.jpeg';
import postureCorrector2 from '../assets/icons/postureCorrector2.jpeg';
// fitnessTracker
import fitnessTracker1 from '../assets/icons/fitnessTracker1.webp';
import fitnessTracker2 from '../assets/icons/fitnessTracker2.webp';

// All Products Data with Categories
const allProducts = [
  // Phones
  {
    id: 'prod-phone-1',
    category: 'phones',
    image: phone1,
    name: 'iPhone 14 Pro Max',
    currentPrice: 1099,
    originalPrice: 1299,
    discount: 0,
    rating: 5,
    reviewCount: 245
  },
  {
    id: 'prod-phone-2',
    category: 'phones',
    image: phone2,
    name: 'Samsung Galaxy S23 Ultra',
    currentPrice: 999,
    originalPrice: 0,
    discount: 0,
    rating: 5,
    reviewCount: 189
  },
  
  // Computers
  {
    id: 'prod-computer-1',
    category: 'computers',
    image: computer1,
    name: 'MacBook Pro 16"',
    currentPrice: 2399,
    originalPrice: 2599,
    discount: 0,
    rating: 5,
    reviewCount: 432
  },
  {
    id: 'prod-computer-2',
    category: 'computers',
    image: computer2,
    name: 'Dell XPS 15 Laptop',
    currentPrice: 1799,
    originalPrice: 0,
    discount: 0,
    rating: 4,
    reviewCount: 298
  },
  
  // SmartWatch
  {
    id: 'prod-watch-1',
    category: 'smartwatch',
    image: watch1,
    name: 'Apple Watch Series 9',
    currentPrice: 399,
    originalPrice: 449,
    discount: 0,
    rating: 5,
    reviewCount: 567
  },
  {
    id: 'prod-watch-2',
    category: 'smartwatch',
    image: watch2,
    name: 'Samsung Galaxy Watch 6',
    currentPrice: 299,
    originalPrice: 0,
    discount: 0,
    rating: 4,
    reviewCount: 423
  },
  
  // Camera
  {
    id: 'prod-camera-1',
    category: 'camera',
    image: camera1,
    name: 'Canon EOS R5',
    currentPrice: 3899,
    originalPrice: 0,
    discount: 0,
    rating: 5,
    reviewCount: 156
  },
  {
    id: 'prod-camera-2',
    category: 'camera',
    image: camera2,
    name: 'Sony Alpha A7 IV',
    currentPrice: 2498,
    originalPrice: 2698,
    discount: 0,
    rating: 5,
    reviewCount: 203
  },
  
  // HeadPhones
  {
    id: 'prod-headphone-1',
    category: 'headphones',
    image: headphone1,
    name: 'Sony WH-1000XM5',
    currentPrice: 398,
    originalPrice: 0,
    discount: 0,
    rating: 5,
    reviewCount: 892
  },
  {
    id: 'prod-headphone-2',
    category: 'headphones',
    image: headphone2,
    name: 'AirPods Pro 2nd Gen',
    currentPrice: 249,
    originalPrice: 0,
    discount: 0,
    rating: 5,
    reviewCount: 1024
  },
  
  // Gaming
  {
    id: 'prod-gaming-1',
    category: 'gaming',
    image: gaming1,
    name: 'PlayStation 5',
    currentPrice: 499,
    originalPrice: 0,
    discount: 0,
    rating: 5,
    reviewCount: 2341
  },
  {
    id: 'prod-gaming-2',
    category: 'gaming',
    image: gaming2,
    name: 'Xbox Series X',
    currentPrice: 499,
    originalPrice: 0,
    discount: 0,
    rating: 5,
    reviewCount: 1876
  },
  
  // Power Banks (subcategory of Portable Gadgets)
  {
    id: 'prod-powerbank-1',
    category: 'power-banks',
    parentCategory: 'portable-gadgets',
    image: powerBank1,
    name: 'Anker PowerCore 20000mAh',
    currentPrice: 45,
    originalPrice: 60,
    discount: 0,
    rating: 5,
    reviewCount: 1256
  },
  {
    id: 'prod-powerbank-2',
    category: 'power-banks',
    parentCategory: 'portable-gadgets',
    image: powerBank2,
    name: 'RAVPower 26800mAh Power Bank',
    currentPrice: 55,
    originalPrice: 0,
    discount: 0,
    rating: 4,
    reviewCount: 892
  },
  
  // Mini Projectors (subcategory of Portable Gadgets)
  {
    id: 'prod-projector-1',
    category: 'mini-projectors',
    parentCategory: 'portable-gadgets',
    image: miniProjector1,
    name: 'XGIMI MoGo Pro Portable Projector',
    currentPrice: 499,
    originalPrice: 599,
    discount: 0,
    rating: 5,
    reviewCount: 456
  },
  {
    id: 'prod-projector-2',
    category: 'mini-projectors',
    parentCategory: 'portable-gadgets',
    image: miniProjector2,
    name: 'Anker Nebula Capsule II',
    currentPrice: 579,
    originalPrice: 0,
    discount: 0,
    rating: 4,
    reviewCount: 678
  },
  
  // Fitness Trackers (subcategory of Wearable Tech)
  {
    id: 'prod-fitness-1',
    category: 'fitness-trackers',
    parentCategory: 'wearable-tech',
    image: fitnessTracker1,
    name: 'Fitbit Charge 6',
    currentPrice: 159,
    originalPrice: 179,
    discount: 0,
    rating: 5,
    reviewCount: 2341
  },
  {
    id: 'prod-fitness-2',
    category: 'fitness-trackers',
    parentCategory: 'wearable-tech',
    image: fitnessTracker2,
    name: 'Garmin Vivosmart 5',
    currentPrice: 149,
    originalPrice: 0,
    discount: 0,
    rating: 4,
    reviewCount: 1567
  },
  
  // Posture Correctors (subcategory of Wearable Tech)
  {
    id: 'prod-posture-1',
    category: 'posture-correctors',
    parentCategory: 'wearable-tech',
    image: postureCorrector1,
    name: 'UPRIGHT GO 2 Posture Trainer',
    currentPrice: 79,
    originalPrice: 99,
    discount: 0,
    rating: 4,
    reviewCount: 892
  },
  {
    id: 'prod-posture-2',
    category: 'posture-correctors',
    parentCategory: 'wearable-tech',
    image: postureCorrector2,
    name: 'Lumo Lift Posture Coach',
    currentPrice: 89,
    originalPrice: 0,
    discount: 0,
    rating: 4,
    reviewCount: 654
  }
];

// Category mapping including new categories and subcategories
const categoryNames: { [key: string]: string } = {
  // Main categories
  'phones': 'Phones',
  'computers': 'Computers',
  'smartwatch': 'SmartWatch',
  'camera': 'Camera',
  'headphones': 'HeadPhones',
  'gaming': 'Gaming',
  
  // New main categories (will show "All Products" until products are added)
  'portable-gadgets': 'Portable Gadgets',
  'wearable-tech': 'Wearable Tech',
  
  // Subcategories (will show "All Products" until products are added)
  'power-banks': 'Power Banks',
  'mini-projectors': 'Mini Projectors',
  'fitness-trackers': 'Fitness Trackers',
  'posture-correctors': 'Posture Correctors'
};

// Parent category mapping
const parentCategoryMap: { [key: string]: string[] } = {
  'portable-gadgets': ['power-banks', 'mini-projectors'],
  'wearable-tech': ['fitness-trackers', 'posture-correctors']
};

const ProductsUI: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize selected categories from URL params (only runs once on mount)
  useEffect(() => {
    // Handle both 'category' (singular from home page) and 'categories' (plural from multi-select)
    const singleCategory = searchParams.get('category');
    const multipleCategories = searchParams.get('categories');
    
    if (multipleCategories) {
      setSelectedCategories(multipleCategories.split(','));
    } else if (singleCategory) {
      let categoriesToSet: string[] = [];
      
      // Handle parent categories - if it's a parent, add all its children
      if (parentCategoryMap[singleCategory]) {
        const childCategories = parentCategoryMap[singleCategory];
        categoriesToSet = [singleCategory, ...childCategories];
      } else {
        // Check if this is a child category, and if so, add its parent too
        let parentFound = false;
        for (const [parent, children] of Object.entries(parentCategoryMap)) {
          if (children.includes(singleCategory)) {
            categoriesToSet = [parent, singleCategory];
            parentFound = true;
            break;
          }
        }
        
        if (!parentFound) {
          categoriesToSet = [singleCategory];
        }
      }
      
      setSelectedCategories(categoriesToSet);
      
      // Update URL to use consistent 'categories' format with replace: true
      // This ensures browser back button goes to /home instead of ?category=X
      setSearchParams({ categories: categoriesToSet.join(',') }, { replace: true });
    } else {
      setSelectedCategories([]);
    }
  }, []); // Empty dependency array - only run on mount

  // Filter products based on selected categories
  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter(product => {
        // Only show products whose actual category (not parent) is selected
        return selectedCategories.includes(product.category);
      });
      setFilteredProducts(filtered);
    }
  }, [selectedCategories]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCategoryToggle = (category: string) => {
    let newSelectedCategories: string[];
    
    if (selectedCategories.includes(category)) {
      // Removing category
      newSelectedCategories = selectedCategories.filter(c => c !== category);
      
      // If removing a parent category, also remove its children
      if (parentCategoryMap[category]) {
        const childrenToRemove = parentCategoryMap[category];
        newSelectedCategories = newSelectedCategories.filter(
          c => !childrenToRemove.includes(c)
        );
      } else {
        // If removing a child category, check if we should remove parent
        for (const [parent, children] of Object.entries(parentCategoryMap)) {
          if (children.includes(category)) {
            // Check if any other children will remain selected
            const remainingChildren = children.filter(child => 
              newSelectedCategories.includes(child) && child !== category
            );
            if (remainingChildren.length === 0) {
              // Remove parent if no children remain
              newSelectedCategories = newSelectedCategories.filter(c => c !== parent);
            }
          }
        }
      }
    } else {
      // Adding category
      newSelectedCategories = [...selectedCategories, category];
      
      // If adding a parent category, also add its children
      if (parentCategoryMap[category]) {
        const childrenToAdd = parentCategoryMap[category];
        childrenToAdd.forEach(child => {
          if (!newSelectedCategories.includes(child)) {
            newSelectedCategories.push(child);
          }
        });
      } else {
        // If adding a child category, also add its parent if not already added
        for (const [parent, children] of Object.entries(parentCategoryMap)) {
          if (children.includes(category) && !newSelectedCategories.includes(parent)) {
            newSelectedCategories.push(parent);
          }
        }
      }
    }
    
    setSelectedCategories(newSelectedCategories);
    
    // Update URL params with replace: true to avoid creating history entries
    if (newSelectedCategories.length > 0) {
      setSearchParams({ categories: newSelectedCategories.join(',') }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
    
    // Close dropdown after selection
    setIsDropdownOpen(false);
  };

  const handleRemoveCategory = (category: string) => {
    let newSelectedCategories = selectedCategories.filter(c => c !== category);
    
    // If removing a parent category, also remove its children
    if (parentCategoryMap[category]) {
      const childrenToRemove = parentCategoryMap[category];
      newSelectedCategories = newSelectedCategories.filter(
        c => !childrenToRemove.includes(c)
      );
    } else {
      // If removing a child category, check if parent should also be removed
      for (const [parent, children] of Object.entries(parentCategoryMap)) {
        if (children.includes(category)) {
          // Check if all children will be removed
          const remainingChildren = children.filter(child => 
            newSelectedCategories.includes(child) && child !== category
          );
          if (remainingChildren.length === 0 && newSelectedCategories.includes(parent)) {
            // Remove parent if no children remain
            newSelectedCategories = newSelectedCategories.filter(c => c !== parent);
          }
        }
      }
    }
    
    setSelectedCategories(newSelectedCategories);
    
    // Update URL params with replace: true to avoid creating history entries
    if (newSelectedCategories.length > 0) {
      setSearchParams({ categories: newSelectedCategories.join(',') }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
    setSearchParams({}, { replace: true });
  };

  // Helper function to check if parent should be checked (when any child is checked)
  const isParentChecked = (parentCategory: string): boolean => {
    const children = parentCategoryMap[parentCategory];
    if (!children) return selectedCategories.includes(parentCategory);
    
    // Parent is checked if it's explicitly in the array OR any of its children are selected
    return selectedCategories.includes(parentCategory) || 
           children.some(child => selectedCategories.includes(child));
  };

  // Helper function to check if parent is indeterminate (some but not all children checked)
  const isParentIndeterminate = (parentCategory: string): boolean => {
    const children = parentCategoryMap[parentCategory];
    if (!children) return false;
    
    const selectedChildren = children.filter(child => selectedCategories.includes(child));
    return selectedChildren.length > 0 && selectedChildren.length < children.length;
  };

  // Get products to display - show all when filtered, limit to 8 when showing all products
  const productsToDisplay = selectedCategories.length > 0 
    ? filteredProducts 
    : filteredProducts.slice(0, 8);

  return (
    <div className="products-page w-full">
      {/* Breadcrumb */}
      <div className="breadcrumb mb-6 sm:mb-8 lg:mb-12">
        <span className="font-poppins text-sm text-gray-500">
          Home / <span className="text-black">Products</span>
        </span>
      </div>

      {/* Page Header with Filter */}
      <div className="page-header mb-8 sm:mb-10 lg:mb-12">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <h1 className="font-inter font-semibold text-2xl sm:text-3xl lg:text-4xl text-app-black">
            All Products
          </h1>

          {/* Filter Section with Pills and Dropdown */}
          <div className="filter-section">
            {/* Filter Dropdown Row - Independent */}
            <div className="filter-dropdown-row">
              <div className="filter-dropdown-wrapper">
                {/* Clear All Button */}
                <button
                  onClick={handleClearAll}
                  disabled={selectedCategories.length === 0}
                  className={`
                    clear-all-btn
                    ${selectedCategories.length > 0 
                      ? 'active' 
                      : 'disabled'
                    }
                  `}
                  title="Clear all filters"
                  aria-label="Clear all filters"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </button>

                <label htmlFor="category-filter" className="font-poppins text-sm text-gray-600">
                  Filter:
                </label>

                {/* Custom Multi-Select Dropdown */}
                <div className="custom-select-wrapper" ref={dropdownRef}>
                  <button
                    className="custom-select-button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    aria-haspopup="listbox"
                    aria-expanded={isDropdownOpen}
                  >
                    <span className="select-placeholder">
                      {selectedCategories.length === 0 
                        ? 'Select Categories' 
                        : `${selectedCategories.length} selected`
                      }
                    </span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`select-arrow ${isDropdownOpen ? 'rotate' : ''}`}
                      width="16" 
                      height="16" 
                      viewBox="0 0 16 16"
                    >
                      <path fill="#666" d="M4 6l4 4 4-4"/>
                    </svg>
                  </button>

                  {isDropdownOpen && (
                    <div className="custom-select-dropdown">
                      {/* Main Categories Group */}
                      <div className="select-group">
                        <div className="select-group-header">Main Categories</div>
                        <label className="select-option">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes('phones')}
                            onChange={() => handleCategoryToggle('phones')}
                          />
                          <span className="option-label">Phones</span>
                        </label>
                        <label className="select-option">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes('computers')}
                            onChange={() => handleCategoryToggle('computers')}
                          />
                          <span className="option-label">Computers</span>
                        </label>
                        <label className="select-option">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes('smartwatch')}
                            onChange={() => handleCategoryToggle('smartwatch')}
                          />
                          <span className="option-label">SmartWatch</span>
                        </label>
                        <label className="select-option">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes('camera')}
                            onChange={() => handleCategoryToggle('camera')}
                          />
                          <span className="option-label">Camera</span>
                        </label>
                        <label className="select-option">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes('headphones')}
                            onChange={() => handleCategoryToggle('headphones')}
                          />
                          <span className="option-label">HeadPhones</span>
                        </label>
                        <label className="select-option">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes('gaming')}
                            onChange={() => handleCategoryToggle('gaming')}
                          />
                          <span className="option-label">Gaming</span>
                        </label>
                      </div>

                      {/* Portable Gadgets Group */}
                      <div className="select-group">
                        <div className="select-group-header">Portable Gadgets</div>
                        <label className="select-option">
                          <input
                            type="checkbox"
                            checked={isParentChecked('portable-gadgets')}
                            ref={(el) => {
                              if (el) el.indeterminate = isParentIndeterminate('portable-gadgets');
                            }}
                            onChange={() => handleCategoryToggle('portable-gadgets')}
                          />
                          <span className="option-label">All Portable Gadgets</span>
                        </label>
                        <label className="select-option select-option--sub">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes('power-banks')}
                            onChange={() => handleCategoryToggle('power-banks')}
                          />
                          <span className="option-label">Power Banks</span>
                        </label>
                        <label className="select-option select-option--sub">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes('mini-projectors')}
                            onChange={() => handleCategoryToggle('mini-projectors')}
                          />
                          <span className="option-label">Mini Projectors</span>
                        </label>
                      </div>

                      {/* Wearable Tech Group */}
                      <div className="select-group">
                        <div className="select-group-header">Wearable Tech</div>
                        <label className="select-option">
                          <input
                            type="checkbox"
                            checked={isParentChecked('wearable-tech')}
                            ref={(el) => {
                              if (el) el.indeterminate = isParentIndeterminate('wearable-tech');
                            }}
                            onChange={() => handleCategoryToggle('wearable-tech')}
                          />
                          <span className="option-label">All Wearable Tech</span>
                        </label>
                        <label className="select-option select-option--sub">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes('fitness-trackers')}
                            onChange={() => handleCategoryToggle('fitness-trackers')}
                          />
                          <span className="option-label">Fitness Trackers</span>
                        </label>
                        <label className="select-option select-option--sub">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes('posture-correctors')}
                            onChange={() => handleCategoryToggle('posture-correctors')}
                          />
                          <span className="option-label">Posture Correctors</span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Selected Category Pills Row - Independent and Below */}
            {selectedCategories.length > 0 && (
              <div className="filter-pills-row">
                <div className="filter-pills">
                  {selectedCategories.map(category => (
                    <div key={category} className="filter-pill">
                      <span className="pill-text">{categoryNames[category]}</span>
                      <button
                        onClick={() => handleRemoveCategory(category)}
                        className="pill-remove"
                        aria-label={`Remove ${categoryNames[category]} filter`}
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-3 w-3" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path 
                            fillRule="evenodd" 
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {productsToDisplay.length > 0 ? (
        <div className="products-grid mb-12 sm:mb-16 lg:mb-20">
          {productsToDisplay.map((product) => (
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
            />
          ))}
        </div>
      ) : (
        <div className="no-products text-center py-12 sm:py-16 lg:py-20">
          <p className="font-poppins text-lg text-gray-500">
            No products found in the selected categories.
          </p>
        </div>
      )}

      {/* Info Message */}
      <div className="info-message text-center m-10 sm:m-12 lg:m-16">
        <p className="font-poppins text-sm text-gray-600">
          Browse products by selecting categories from the filter above
        </p>
      </div>
    </div>
  );
};

export default ProductsUI;

