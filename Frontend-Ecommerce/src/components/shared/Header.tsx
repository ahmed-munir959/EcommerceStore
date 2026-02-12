import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Heart,
  ShoppingCart,
  User
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext.tsx";
import "../../styles/scss/_Header.scss";

interface HeaderProps {
  onCategoriesToggle?: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ onCategoriesToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const headerRef = useRef<HTMLElement>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, wishlistItems } = useCart();

  // Calculate total number of items in cart
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate total number of items in wishlist
  const wishlistItemCount = wishlistItems.length;

  // Determine if current route is an auth page (login/signup)
  const pathname = location.pathname || "";
  const isAuthPage =
    pathname === "/signup" ||
    pathname === "/" ||
    pathname.toLowerCase().includes("login") ||
    pathname.toLowerCase().includes("signup");

  // Set header height as CSS variable
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, []);

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);

    // Toggle body scroll lock
    if (newState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('menu-open');
      setIsCategoriesOpen(false);
      setExpandedCategories([]);
    }
  };

  const toggleCategories = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = !isCategoriesOpen;
    setIsCategoriesOpen(newState);
    if (!newState) {
      setExpandedCategories([]);
    }
  };

  const handleCartClick = () => {
    navigate('/cart/all');
  };

  const handleWishlistClick = () => {
    navigate('/wishlist');
  };

  const handleCategoryClick = (e: React.MouseEvent, categoryId: string, categoryName: string, hasSubcategories: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (hasSubcategories) {
      // Toggle subcategories - allow multiple to be open
      setExpandedCategories(prev => 
        prev.includes(categoryId) 
          ? prev.filter(id => id !== categoryId) 
          : [...prev, categoryId]
      );
    } else {
      // Navigate to products page with category filter
      console.log('Category clicked:', categoryName, 'ID:', categoryId);
      navigate(`/products?category=${categoryId}`);
      
      // Close the mobile menu after selection
      setIsMenuOpen(false);
      setIsCategoriesOpen(false);
      setExpandedCategories([]);
      document.body.style.overflow = 'unset';
    }
  };

  const handleSubcategoryClick = (e: React.MouseEvent, subcategoryId: string, subcategoryName: string) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Subcategory clicked:', subcategoryName, 'ID:', subcategoryId);
    
    // Navigate to products page with subcategory filter
    navigate(`/products?category=${subcategoryId}`);
    
    // Close the mobile menu after selection
    setIsMenuOpen(false);
    setIsCategoriesOpen(false);
    setExpandedCategories([]);
    document.body.style.overflow = 'unset';
  };

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    navigate(path);
    setIsMenuOpen(false);
    setIsCategoriesOpen(false);
    setExpandedCategories([]);
    document.body.style.overflow = 'unset';
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsCategoriesOpen(false);
    setExpandedCategories([]);
    document.body.style.overflow = 'unset';
  }, [location.pathname]);

  // Close mobile menu when user tries to scroll outside the menu
  useEffect(() => {
    if (!isMenuOpen) return;

    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const isInsideMenu = target.closest('.mobile-menu-container');
      
      if (!isInsideMenu) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const isInsideMenu = target.closest('.mobile-menu-container');
      
      if (!isInsideMenu) {
        const touchMoveY = e.touches[0].clientY;
        const touchDiff = Math.abs(touchMoveY - touchStartY);
        
        if (touchDiff > 10) {
          setIsMenuOpen(false);
          setIsCategoriesOpen(false);
          setExpandedCategories([]);
          document.body.style.overflow = 'unset';
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      const isInsideMenu = target.closest('.mobile-menu-container');
      
      if (!isInsideMenu) {
        setIsMenuOpen(false);
        setIsCategoriesOpen(false);
        setExpandedCategories([]);
        document.body.style.overflow = 'unset';
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('wheel', handleWheel);
    };
  }, [isMenuOpen]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setIsMenuOpen(false);
      setIsCategoriesOpen(false);
      setExpandedCategories([]);
      document.body.style.overflow = 'unset';
    };
  }, []);

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

  // Profile dropdown state + refs
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const desktopProfileRef = useRef<HTMLDivElement | null>(null);
  const mobileProfileRef = useRef<HTMLDivElement | null>(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const clickedInsideDesktop = desktopProfileRef.current && desktopProfileRef.current.contains(target);
      const clickedInsideMobile = mobileProfileRef.current && mobileProfileRef.current.contains(target);

      if (!clickedInsideDesktop && !clickedInsideMobile) {
        setIsProfileOpen(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reusable dropdown JSX
  const ProfileDropdown = () => (
    <div className="profile-dropdown" role="menu" aria-label="Profile menu">
      <div className="profile-dropdown-inner">
        <button
          className="profile-item primary"
          // onClick={() => {
          //   navigate('/account');
          //   setIsProfileOpen(false);
          // }}
        >
          <User className="icon-lg" />
          <span>Manage My Account</span>
        </button>

        <button
          className="profile-item"
          onClick={() => {
            navigate('/cart/all');
            setIsProfileOpen(false);
          }}
        >
          <ShoppingCart className="icon-sm" />
          <span>My Order</span>
        </button>

        <button
          className="profile-item"
          // onClick={() => {
          //   navigate('/cancellations');
          //   setIsProfileOpen(false);
          // }}
        >
          <X className="icon-sm" />
          <span>My Cancellations</span>
        </button>

        <button
          className="profile-item"
          // onClick={() => {
          //   navigate('/reviews');
          //   setIsProfileOpen(false);
          // }}
        >
          <Heart className="icon-sm" />
          <span>My Reviews</span>
        </button>

        <button
          className="profile-item logout"
          onClick={() => {
            navigate('/');
            setIsProfileOpen(false);
          }}
        >
          <ChevronRight className="icon-sm" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <header ref={headerRef} className="w-full md:min-h-[142px] relative z-50 bg-white">
        {/* Top Banner */}
        <div className="bg-app-black h-header-top flex items-center justify-center relative -mx-4 sm:-mx-8 md:-mx-16 lg:-mx-[155px]">
          {/* Desktop Banner */}
          <div className="hidden md:flex items-center gap-2">
            <p className="text-app-white font-poppins text-sm-token whitespace-nowrap">
              Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
            </p>
            <a href="#" className="text-app-white font-poppins font-semibold text-sm-token underline">
              ShopNow
            </a>
          </div>

          {/* Mobile Banner */}
          <div className="hidden min-[460px]:flex md:hidden items-center gap-2">
            <p className="text-app-white font-poppins text-sm-token whitespace-nowrap">
              Summer Sale - OFF 50%!
            </p>
            <a href="#" className="text-app-white font-poppins font-semibold text-sm-token underline">
              ShopNow
            </a>
          </div>

          {/* Language Selector */}
          <div className="absolute right-4 lg:right-[var(--header-x-padding)] flex items-center gap-1 cursor-pointer">
            <span className="text-app-white font-poppins text-xs md:text-sm-token">English</span>
            <ChevronDown className="w-3 h-3 text-app-white" />
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between pt-6 md:pt-10 pb-3 md:pb-4">
          {/* Logo */}
          <h1 
            className="font-inter font-bold text-xl md:text-2xl tracking-[0.72px] text-app-black cursor-pointer z-50 relative"
            onClick={() => navigate('/home')}
          >
            Exclusive
          </h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-12 lg:gap-8 md:gap-4">
            <a 
              href="#" 
              onClick={(e) => handleNavClick(e, '/home')}
              className={`header-nav-link font-poppins text-base-token lg:text-sm md:text-xs whitespace-nowrap text-app-black hover:underline ${
                location.pathname === '/home' ? 'underline' : ''
              }`}
            >
              Home
            </a>
            <a 
              href="#" 
              onClick={(e) => e.preventDefault()}
              className={`header-nav-link font-poppins text-base-token lg:text-sm md:text-xs whitespace-nowrap text-app-black hover:underline ${
                location.pathname === '/contact' ? 'underline' : ''
              }`}
            >
              Contact
            </a>
            <a 
              href="#" 
              onClick={(e) => e.preventDefault()}
              className={`header-nav-link font-poppins text-base-token lg:text-sm md:text-xs whitespace-nowrap text-app-black hover:underline ${
                location.pathname === '/about' ? 'underline' : ''
              }`}
            >
              About
            </a>
            <a 
              href="#" 
              onClick={(e) => handleNavClick(e, '/signup')}
              className={`header-nav-link font-poppins text-base-token lg:text-sm md:text-xs whitespace-nowrap text-app-black hover:underline ${
                location.pathname === '/signup' ? 'underline' : ''
              }`}
            >
              Sign Up
            </a>
          </nav>

          {/* Desktop Search and Icons */}
          <div className="flex items-center">
            {/* Search Bar */}
            <div className="hidden md:flex md:w-[10rem] lg:w-[14.5rem] xl:w-[16.5rem] h-[2.375rem] md:h-[2rem] bg-app-gray-light rounded items-center py-[0.4375rem] md:py-[0.3rem] pr-3 md:pr-2 pl-5 md:pl-3 gap-3 md:gap-2">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="header-search-input header-search-full lg:flex hidden flex-1 bg-transparent font-poppins text-xs-token outline-none"
              />
              <input
                type="text"
                placeholder="Search!"
                className="header-search-input header-search-compact md:flex lg:hidden hidden flex-1 bg-transparent font-poppins text-[0.625rem] outline-none"
              />
              <Search className="w-5 h-5 md:w-4 md:h-4 flex-shrink-0" />
            </div>

            {/* Icons - shown only when NOT on Login/Signup */}
            {!isAuthPage && (
              <div className="hidden md:flex items-center gap-3 md:gap-2 ml-3 md:ml-2">
                <button
                  aria-label="Wishlist"
                  onClick={handleWishlistClick}
                  className="header-icon-btn w-9 h-9 md:w-7 md:h-7 flex items-center justify-center rounded-md hover:bg-gray-100 transition relative"
                >
                  <Heart className="w-5 h-5 md:w-4 md:h-4" />
                  {wishlistItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-auth-primary text-white text-xs md:text-[0.625rem] font-semibold rounded-full w-5 h-5 md:w-4 md:h-4 flex items-center justify-center">
                      {wishlistItemCount > 99 ? '99+' : wishlistItemCount}
                    </span>
                  )}
                </button>

                <button
                  aria-label="Cart"
                  onClick={handleCartClick}
                  className="header-icon-btn w-9 h-9 md:w-7 md:h-7 flex items-center justify-center rounded-md hover:bg-gray-100 transition relative"
                >
                  <ShoppingCart className="w-5 h-5 md:w-4 md:h-4" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-auth-primary text-white text-xs md:text-[0.625rem] font-semibold rounded-full w-5 h-5 md:w-4 md:h-4 flex items-center justify-center">
                      {cartItemCount > 99 ? '99+' : cartItemCount}
                    </span>
                  )}
                </button>

                <div ref={desktopProfileRef} className="relative">
                  <button
                    aria-label="Profile"
                    onClick={() => setIsProfileOpen((prev) => !prev)}
                    className="header-icon-btn w-9 h-9 md:w-7 md:h-7 flex items-center justify-center rounded-md hover:bg-gray-100 transition"
                  >
                    <User className="w-5 h-5 md:w-4 md:h-4" />
                  </button>

                  {isProfileOpen && <ProfileDropdown />}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden relative w-8 h-8 flex items-center justify-center z-50"
            aria-label="Toggle menu"
          >
            <Menu className={`absolute w-6 h-6 transition-all duration-300 ${isMenuOpen ? "opacity-0 scale-50 rotate-45" : "opacity-100 scale-100"}`} />
            <X className={`absolute w-6 h-6 transition-all duration-300 ${isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-50 -rotate-45"}`} />
          </button>
        </div>
        
      </header>
      <div className="border-t border-black opacity-30" />

      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed left-0 right-0 md:hidden mobile-menu-overlay"
          onClick={() => {
            setIsMenuOpen(false);
            setIsCategoriesOpen(false);
            setExpandedCategories([]);
            document.body.style.overflow = 'unset';
          }}
          style={{ top: 0 }}
        />
      )}

      {/* Mobile Menu */}
      <div 
        className={`fixed left-0 right-0 md:hidden bg-white shadow-2xl z-50 transition-all duration-300 ease-in-out mobile-menu-container ${
          isMenuOpen 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
        style={{
          top: 'var(--header-height, 142px)',
          maxHeight: 'calc(100vh - var(--header-height, 142px))',
          overflowY: 'auto'
        }}
      >
        <div className="mobile-menu-dropdown">
          <nav className="flex flex-col">
            {/* Navigation Links */}
            <a 
              href="#" 
              onClick={(e) => handleNavClick(e, '/home')}
              className={`px-6 py-4 border-b hover:bg-gray-50 font-poppins text-base transition-colors ${
                location.pathname === '/home' ? 'bg-gray-100 font-semibold' : ''
              }`}
            >
              Home
            </a>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(false);
                document.body.style.overflow = 'unset';
              }}
              className={`px-6 py-4 border-b hover:bg-gray-50 font-poppins text-base transition-colors ${
                location.pathname === '/contact' ? 'bg-gray-100 font-semibold' : ''
              }`}
            >
              Contact
            </a>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(false);
                document.body.style.overflow = 'unset';
              }}
              className={`px-6 py-4 border-b hover:bg-gray-50 font-poppins text-base transition-colors ${
                location.pathname === '/about' ? 'bg-gray-100 font-semibold' : ''
              }`}
            >
              About
            </a>
            <a 
              href="#" 
              onClick={(e) => handleNavClick(e, '/signup')}
              className={`px-6 py-4 border-b hover:bg-gray-50 font-poppins text-base transition-colors ${
                location.pathname === '/signup' ? 'bg-gray-100 font-semibold' : ''
              }`}
            >
              Sign Up
            </a>

            {/* Categories Dropdown Button */}
            <button 
              onClick={toggleCategories} 
              className="flex justify-between items-center px-6 py-4 border-b hover:bg-gray-50 text-left w-full font-poppins text-base transition-colors"
            >
              <span>Categories</span>
              <ChevronDown 
                className={`w-5 h-5 transition-transform duration-300 ${isCategoriesOpen ? "rotate-180" : "rotate-0"}`} 
              />
            </button>

            {/* Categories List */}
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isCategoriesOpen 
                ? 'max-h-[800px] opacity-100' 
                : 'max-h-0 opacity-0'
            }`}>
              <div className="categories-submenu bg-gray-50">
                {categories.map((cat, index) => (
                  <React.Fragment key={cat.id}>
                    {/* Main Category - Always Show */}
                    <button 
                      onClick={(e) => handleCategoryClick(e, cat.id, cat.name, cat.hasSubcategories)}
                      className="w-full px-8 py-3 flex justify-between items-center border-t border-gray-200 hover:bg-gray-100 transition-colors text-left"
                      style={{ 
                        transitionDelay: isCategoriesOpen ? `${index * 30}ms` : '0ms' 
                      }}
                    >
                      <span className="font-poppins text-sm text-gray-700">{cat.name}</span>
                      {cat.hasSubcategories && (
                        expandedCategories.includes(cat.id) ? (
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-500" />
                        )
                      )}
                    </button>
                    
                    {/* Subcategories */}
                    {cat.hasSubcategories && expandedCategories.includes(cat.id) && cat.subcategories && (
                      <div className="bg-gray-100">
                        {cat.subcategories.map((subcat) => (
                          <button
                            key={subcat.id}
                            onClick={(e) => handleSubcategoryClick(e, subcat.id, subcat.name)}
                            className="w-full px-12 py-3 flex items-center border-t border-gray-200 hover:bg-gray-200 transition-colors text-left"
                          >
                            <span className="font-poppins text-sm text-gray-600">{subcat.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Mobile Icons */}
            {!isAuthPage && (
              <div className="flex items-center gap-6 px-6 py-4 border-t">
                <button 
                  aria-label="Wishlist" 
                  onClick={() => {
                    handleWishlistClick();
                    setIsMenuOpen(false);
                    document.body.style.overflow = 'unset';
                  }}
                  className="relative flex items-center justify-center hover:text-auth-primary transition-colors"
                >
                  <Heart className="w-6 h-6" />
                  {wishlistItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-auth-primary text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                      {wishlistItemCount > 99 ? '99+' : wishlistItemCount}
                    </span>
                  )}
                </button>
                <button 
                  aria-label="Cart" 
                  onClick={() => {
                    handleCartClick();
                    setIsMenuOpen(false);
                    document.body.style.overflow = 'unset';
                  }} 
                  className="relative flex items-center justify-center hover:text-auth-primary transition-colors"
                >
                  <ShoppingCart className="w-6 h-6" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-auth-primary text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemCount > 99 ? '99+' : cartItemCount}
                    </span>
                  )}
                </button>

                <div ref={mobileProfileRef} className="relative">
                  <button
                    aria-label="Profile"
                    onClick={() => setIsProfileOpen((prev) => !prev)}
                    className="flex items-center justify-center hover:text-auth-primary transition-colors"
                  >
                    <User className="w-6 h-6" />
                  </button>

                  {isProfileOpen && <ProfileDropdown />}
                </div>
              </div>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;