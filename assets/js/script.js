// Configuration object
const defaultConfig = {
    brand_name: "CRBFTN",
    brand_tagline: "Style Redefined",
    hero_title: "Discover Your Style",
    hero_subtitle: "Premium clothing from Makhado, Limpopo",
    footer_text: "Crafted with love in Makhado, Limpopo, South Africa",
    primary_color: "#667eea",
    secondary_color: "#764ba2",
    background_color: "#f9fafb",
    text_color: "#1f2937",
    accent_color: "#ef4444",
    font_family: "Inter",
    font_size: 16
};

// IMMEDIATE mobile menu function for navigation
window.toggleMobileMenu = function() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
};

// Global variables
let currentPage = 'home';
let cart = [];
let selectedRating = 0;
let currentProduct = null;
let allProducts = [];
let currentFilter = 'all';

// Sample products data
const products = [
    // Hoodies
    {
        id: 1,
        name: "Premium Hoodie",
        category: "hoodies",
        price: 899,
        image: "assets/images/products/premium-hoodie.webp",
        description: "Comfortable premium hoodie perfect for any season. Made with high-quality cotton blend.",
        featured: true
    },
    {
        id: 7,
        name: "Designer Hoodie",
        category: "hoodies",
        price: 1199,
        image: "assets/images/products/designer-hoodie.webp",
        description: "Limited edition designer hoodie with unique patterns and premium finish."
    },
    {
        id: 13,
        name: "Oversized Hoodie",
        category: "hoodies",
        price: 1099,
        image: "assets/images/products/oversized-hoodie.webp",
        description: "Trendy oversized hoodie with relaxed fit and modern styling."
    },
    {
        id: 19,
        name: "Zip-Up Hoodie",
        category: "hoodies",
        price: 949,
        image: "assets/images/products/zip-up-hoodie.webp",
        description: "Versatile zip-up hoodie perfect for layering and active wear."
    },
    {
        id: 25,
        name: "Cropped Hoodie",
        category: "hoodies",
        price: 799,
        image: "assets/images/products/cropped-hoodie.webp",
        description: "Stylish cropped hoodie with contemporary cut and premium materials."
    },

    // T-Shirts
    {
        id: 31,
        name: "Classic Tee",
        category: "tshirts",
        price: 499,
        image: "assets/images/products/classic-tee.webp",
        description: "Premium cotton t-shirt with CRBFTN branding. Essential wardrobe staple.",
        featured: true
    },
    {
        id: 32,
        name: "Graphic Tee",
        category: "tshirts",
        price: 549,
        image: "assets/images/products/graphic-tee.webp",
        description: "Bold graphic t-shirt with unique CRBFTN artwork and premium print quality."
    },
    {
        id: 33,
        name: "Vintage Tee",
        category: "tshirts",
        price: 599,
        image: "assets/images/products/vintage-tee.webp",
        description: "Vintage-inspired t-shirt with distressed details and soft cotton blend."
    },
    {
        id: 34,
        name: "Long Sleeve Tee",
        category: "tshirts",
        price: 649,
        image: "assets/images/products/long-sleeve-tee.webp",
        description: "Comfortable long sleeve t-shirt perfect for layering and casual wear."
    },
    {
        id: 35,
        name: "Polo Shirt",
        category: "tshirts",
        price: 749,
        image: "assets/images/products/polo-shirt.webp",
        description: "Classic polo shirt with modern fit and premium cotton construction."
    },
    
    // Pants
    {
        id: 2,
        name: "Classic Jeans",
        category: "pants",
        price: 1299,
        image: "assets/images/products/classic-crbftn-jeans.webp",
        description: "Timeless denim jeans with perfect fit and durability. A wardrobe essential.",
        featured: true
    },
    {
        id: 8,
        name: "Cargo Pants",
        category: "pants",
        price: 999,
        image: "assets/images/products/cargo-pants.webp",
        description: "Functional cargo pants with multiple pockets and durable fabric."
    },
    {
        id: 14,
        name: "Slim Fit Chinos",
        category: "pants",
        price: 849,
        image: "assets/images/products/slim-chinos.webp",
        description: "Elegant slim fit chinos perfect for casual and semi-formal occasions."
    },
    {
        id: 20,
        name: "Track Pants",
        category: "pants",
        price: 899,
        image: "assets/images/products/track-pants.webp",
        description: "Deep indigo dark wash jeans with CRBFTN signature stitching and premium denim."
    },
    {
        id: 12,
        name: "Distressed CRBFTN Jeans",
        category: "pants",
        price: 1499,
        image: "assets/images/products/distressed-crbftn-jeans.webp",
        description: "Carefully distressed jeans with authentic wear patterns and CRBFTN patches."
    },
    {
        id: 18,
        name: "Slim Black CRBFTN Jeans",
        category: "pants",
        price: 1449,
        image: "assets/images/products/slim-black-crbftn-jeans.webp",
        description: "Sleek black jeans with slim fit and subtle CRBFTN logo embroidery."
    },
    {
        id: 24,
        name: "Vintage Blue CRBFTN Jeans",
        category: "pants",
        price: 1349,
        image: "assets/images/products/vintage-blue-crbftn-jeans.webp",
        description: "Classic vintage blue wash with faded effects and CRBFTN heritage styling."
    },
    {
        id: 30,
        name: "Raw Denim CRBFTN Jeans",
        category: "pants",
        price: 1599,
        image: "assets/images/products/raw-denim-crbftn-jeans.webp",
        description: "Premium raw denim jeans that age beautifully with CRBFTN craftsmanship."
    },
    
    // NEW CREATIVE CRBFTN CLOTHING COLLECTION
    
    // Creative Hoodies
    {
        id: 36,
        name: "Fresh New Sea Hoodie",
        category: "hoodies",
        price: 1299,
        image: "assets/images/products/fresh-new-sea-hoodie.webp",
        description: "Dive into style with our ocean-inspired hoodie featuring wave graphics and marine blue accents.",
        featured: true
    },
    {
        id: 37,
        name: "Hip Hop Hoodie",
        category: "hoodies",
        price: 1199,
        image: "assets/images/products/hip-hop-hoodie.webp",
        description: "Capture the rhythm of the streets with bold typography and urban-inspired design elements."
    },
    {
        id: 38,
        name: "CRBFTN Culture Hoodie",
        category: "hoodies",
        price: 1399,
        image: "assets/images/products/crbftn-culture-hoodie.webp",
        description: "Celebrate South African heritage with traditional patterns reimagined for modern streetwear."
    },
    {
        id: 39,
        name: "Midnight CRBFTN Hoodie",
        category: "hoodies",
        price: 1249,
        image: "assets/images/products/midnight-crbftn-hoodie.webp",
        description: "Sleek black hoodie with glow-in-the-dark CRBFTN logo and constellation print."
    },
    
    // JACKETS COLLECTION
    {
        id: 56,
        name: "CRBFTN Bomber Jacket",
        category: "jackets",
        price: 1799,
        image: "assets/images/products/crbftn-bomber-jacket.webp",
        description: "Premium bomber jacket with CRBFTN embroidered patches and satin lining.",
        featured: true
    },
    {
        id: 57,
        name: "Urban Wind Breaker",
        category: "jackets",
        price: 1299,
        image: "assets/images/products/urban-wind-breaker.webp",
        description: "Lightweight windbreaker perfect for city adventures with CRBFTN branding."
    },
    {
        id: 58,
        name: "Heritage Denim Jacket",
        category: "jackets",
        price: 1699,
        image: "assets/images/products/heritage-denim-jacket.webp",
        description: "Classic denim jacket with South African heritage details and CRBFTN styling."
    },
    {
        id: 59,
        name: "CRBFTN Track Jacket",
        category: "jackets",
        price: 1449,
        image: "assets/images/products/crbftn-track-jacket.webp",
        description: "Athletic track jacket with racing stripes and moisture-wicking technology."
    },
    {
        id: 60,
        name: "Street King Leather Jacket",
        category: "jackets",
        price: 2299,
        image: "assets/images/products/leather-jacket.webp",
        description: "Premium leather jacket with CRBFTN hardware and urban street styling."
    },
    {
        id: 61,
        name: "CRBFTN Varsity Jacket",
        category: "jackets",
        price: 1599,
        image: "assets/images/products/crbftn-varsity-jacket.webp",
        description: "Classic varsity jacket with CRBFTN lettering and contrast sleeves."
    },
    
    // Creative Jeans & Pants
    {
        id: 40,
        name: "Baggy CRBFTN Jeans",
        category: "pants",
        price: 1499,
        image: "assets/images/products/baggy-crbftn-jeans.webp",
        description: "Relaxed fit jeans with embroidered CRBFTN patches and vintage wash finish.",
        featured: true
    },
    {
        id: 41,
        name: "Classic CRBFTN Jeans",
        category: "pants",
        price: 1399,
        image: "assets/images/products/dark-wash-crbftn-jeans.webp",
        description: "Timeless straight-leg jeans with subtle CRBFTN branding and premium denim construction."
    },
    {
        id: 42,
        name: "Street King Cargo Pants",
        category: "pants",
        price: 1199,
        image: "assets/images/products/street-king-cargo-pants.webp",
        description: "Multi-pocket cargo pants inspired by urban exploration and street culture."
    },
    {
        id: 43,
        name: "CRBFTN Track Pants",
        category: "pants",
        price: 899,
        image: "assets/images/products/crbftn-track-pants.webp",
        description: "Athletic track pants with racing stripes and CRBFTN logo down the leg."
    },
    
    // Creative T-Shirts
    {
        id: 44,
        name: "CRBFTN Vintage Tee",
        category: "tshirts",
        price: 649,
        image: "assets/images/products/crbftn-vintage-tee.webp",
        description: "Retro-inspired tee with faded CRBFTN logo and soft vintage wash."
    },
    {
        id: 45,
        name: "Limpopo Pride Tee",
        category: "tshirts",
        price: 599,
        image: "assets/images/products/limpopo-pride-tee.webp",
        description: "Celebrate local heritage with Limpopo province graphics and CRBFTN branding."
    },
    {
        id: 46,
        name: "CRBFTN Artist Tee",
        category: "tshirts",
        price: 699,
        image: "assets/images/products/crbftn-artist-tee.webp",
        description: "Limited edition tee featuring local artist collaboration with unique CRBFTN design."
    },
    {
        id: 47,
        name: "Street Philosophy Tee",
        category: "tshirts",
        price: 549,
        image: "assets/images/products/street-philosophy-tee.webp",
        description: "Thought-provoking graphic tee with inspirational quotes and CRBFTN street wisdom."
    },
    
    // Creative Shoes
    {
        id: 48,
        name: "CRBFTN Air Classics",
        category: "shoes",
        price: 1999,
        image: "assets/images/products/crbftn-air-classics.webp",
        description: "Premium sneakers with CRBFTN colorway and signature comfort technology.",
        featured: true
    },
    {
        id: 49,
        name: "Street Walker CRBFTN",
        category: "shoes",
        price: 1799,
        image: "assets/images/products/urban-sneakers.webp",
        description: "Durable street shoes built for urban adventures with CRBFTN sole design."
    },
    {
        id: 50,
        name: "CRBFTN High Tops",
        category: "shoes",
        price: 1899,
        image: "assets/images/products/crbftn-high-tops.webp",
        description: "Classic high-top silhouette with CRBFTN ankle patches and premium materials."
    },
    
    // Creative Accessories
    {
        id: 51,
        name: "CRBFTN Crown Cap",
        category: "accessories",
        price: 499,
        image: "assets/images/products/snapback-cap.webp",
        description: "Structured cap with embroidered CRBFTN crown logo and premium fit."
    },
    {
        id: 52,
        name: "Heritage CRBFTN Bucket Hat",
        category: "accessories",
        price: 449,
        image: "assets/images/products/heritage-crbftn-bucket-hat.webp",
        description: "Traditional patterns meet modern streetwear in this unique bucket hat design."
    },
    {
        id: 53,
        name: "CRBFTN Signature Socks",
        category: "accessories",
        price: 299,
        image: "assets/images/products/crew-socks.webp",
        description: "Premium crew socks with CRBFTN logo pattern and superior comfort."
    },
    {
        id: 54,
        name: "CRBFTN Explorer Backpack",
        category: "accessories",
        price: 899,
        image: "assets/images/products/crbftn-explorer-backpack.webp",
        description: "Urban exploration backpack with CRBFTN branding and multiple compartments."
    },
    {
        id: 55,
        name: "CRBFTN Street Belt",
        category: "accessories",
        price: 399,
        image: "assets/images/products/crbftn-street-belt.webp",
        description: "Adjustable street belt with custom CRBFTN buckle and durable construction."
    }
];

// Gallery items
const galleryItems = [
    { id: 1, image: "assets/images/gallery/collection-1.webp", title: "Street Style Collection", description: "Urban fashion meets comfort" },
    { id: 2, image: "assets/images/products/baggy-crbftn-jeans.webp", title: "Denim Dreams", description: "Classic meets contemporary" },
    { id: 3, image: "assets/images/products/high-top-sneakers.webp", title: "Sneaker Culture", description: "Step up your game" },
    { id: 4, image: "assets/images/products/dad-hat.webp", title: "Cap Collection", description: "Top off your look" },
    { id: 5, image: "assets/images/products/premium-hoodie.webp", title: "Hoodie Season", description: "Cozy meets cool" },
    { id: 6, image: "assets/images/gallery/lifestyle-1.webp", title: "Perfect Fit", description: "Tailored for you" }
];

// Data SDK handler
const dataHandler = {
    onDataChanged(data) {
        renderReviews(data);
    }
};

// Initialize the application
async function init() {
    allProducts = [...products];
    
    // Initialize Data SDK
    if (window.dataSdk) {
        const initResult = await window.dataSdk.init(dataHandler);
        if (!initResult.isOk) {
            console.error("Failed to initialize data SDK");
        }
    }

    // Initialize Element SDK
    if (window.elementSdk) {
        await window.elementSdk.init({
            defaultConfig,
            onConfigChange: async (config) => {
                // Update brand elements
                const brandName = document.getElementById('brand-name');
                const brandTagline = document.getElementById('brand-tagline');
                const heroTitle = document.getElementById('hero-title');
                const heroSubtitle = document.getElementById('hero-subtitle');
                const footerText = document.getElementById('footer-text');

                if (brandName) brandName.textContent = config.brand_name || defaultConfig.brand_name;
                if (brandTagline) brandTagline.textContent = config.brand_tagline || defaultConfig.brand_tagline;
                if (heroTitle) heroTitle.textContent = config.hero_title || defaultConfig.hero_title;
                if (heroSubtitle) heroSubtitle.textContent = config.hero_subtitle || defaultConfig.hero_subtitle;
                if (footerText) footerText.textContent = config.footer_text || defaultConfig.footer_text;

                // Update colors
                const primaryColor = config.primary_color || defaultConfig.primary_color;
                const secondaryColor = config.secondary_color || defaultConfig.secondary_color;
                const backgroundColor = config.background_color || defaultConfig.background_color;
                const textColor = config.text_color || defaultConfig.text_color;
                const accentColor = config.accent_color || defaultConfig.accent_color;

                document.body.style.backgroundColor = backgroundColor;
                document.body.style.color = textColor;

                // Update font
                const customFont = config.font_family || defaultConfig.font_family;
                const baseFontStack = 'Arial, sans-serif';
                document.body.style.fontFamily = `${customFont}, ${baseFontStack}`;

                // Update font size
                const baseSize = config.font_size || defaultConfig.font_size;
                document.documentElement.style.fontSize = `${baseSize}px`;
            },
            mapToCapabilities: (config) => ({
                recolorables: [
                    {
                        get: () => config.primary_color || defaultConfig.primary_color,
                        set: (value) => {
                            if (window.elementSdk) {
                                window.elementSdk.setConfig({ primary_color: value });
                            }
                        }
                    },
                    {
                        get: () => config.secondary_color || defaultConfig.secondary_color,
                        set: (value) => {
                            if (window.elementSdk) {
                                window.elementSdk.setConfig({ secondary_color: value });
                            }
                        }
                    },
                    {
                        get: () => config.background_color || defaultConfig.background_color,
                        set: (value) => {
                            if (window.elementSdk) {
                                window.elementSdk.setConfig({ background_color: value });
                            }
                        }
                    },
                    {
                        get: () => config.text_color || defaultConfig.text_color,
                        set: (value) => {
                            if (window.elementSdk) {
                                window.elementSdk.setConfig({ text_color: value });
                            }
                        }
                    },
                    {
                        get: () => config.accent_color || defaultConfig.accent_color,
                        set: (value) => {
                            if (window.elementSdk) {
                                window.elementSdk.setConfig({ accent_color: value });
                            }
                        }
                    }
                ],
                borderables: [],
                fontEditable: {
                    get: () => config.font_family || defaultConfig.font_family,
                    set: (value) => {
                        if (window.elementSdk) {
                            window.elementSdk.setConfig({ font_family: value });
                        }
                    }
                },
                fontSizeable: {
                    get: () => config.font_size || defaultConfig.font_size,
                    set: (value) => {
                        if (window.elementSdk) {
                            window.elementSdk.setConfig({ font_size: value });
                        }
                    }
                }
            }),
            mapToEditPanelValues: (config) => new Map([
                ["brand_name", config.brand_name || defaultConfig.brand_name],
                ["brand_tagline", config.brand_tagline || defaultConfig.brand_tagline],
                ["hero_title", config.hero_title || defaultConfig.hero_title],
                ["hero_subtitle", config.hero_subtitle || defaultConfig.hero_subtitle],
                ["footer_text", config.footer_text || defaultConfig.footer_text]
            ])
        });
    }

    renderProducts();
    renderCategorySections();
    renderGallery();
    
    // Initialize cart from localStorage
    const savedCart = localStorage.getItem('crbftn_cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
        } catch (e) {
            console.error('Error loading cart from localStorage:', e);
            cart = [];
        }
    }
    
    updateCartDisplay();
}

// Navigation functions
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        menu.classList.toggle('hidden');
        
        // Add overlay for better mobile UX
        let overlay = document.getElementById('mobile-menu-overlay');
        if (!menu.classList.contains('hidden')) {
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.id = 'mobile-menu-overlay';
                overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 99997;';
                overlay.onclick = () => toggleMobileMenu();
                document.body.appendChild(overlay);
            }
            document.body.style.overflow = 'hidden';
        } else {
            if (overlay) {
                overlay.remove();
            }
            document.body.style.overflow = '';
        }
    }
}

// Enhanced fallback function for mobile menu
function toggleMobileMenuFallback() {
    toggleMobileMenu();
}

// Make sure the function is globally available with enhanced error checking
window.toggleMobileMenu = toggleMobileMenu;
window.toggleMobileMenuFallback = toggleMobileMenuFallback;

// Ensure mobile menu works even with timing issues
window.ensureMobileMenuWorks = function() {
    const button = document.querySelector('button[onclick*="toggleMobileMenu"]');
    if (button && !window.toggleMobileMenu) {
        button.onclick = function() {
            const menu = document.getElementById('mobile-menu');
            if (menu) {
                menu.classList.toggle('hidden');
            }
        };
    }
};

// Call this function immediately and on DOM ready
window.ensureMobileMenuWorks();
document.addEventListener('DOMContentLoaded', window.ensureMobileMenuWorks);

// Product functions
function renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    
    const filteredProducts = currentFilter === 'all' ? allProducts : allProducts.filter(p => p.category === currentFilter);
    
    grid.innerHTML = filteredProducts.map(product => {
        const discountedPrice = Math.round(product.price * 0.65); // 35% off
        return `
        <div class="product-card card-hover bg-white rounded-lg shadow-md overflow-hidden cursor-pointer relative" onclick="openProductModal(${product.id})">
            <!-- Launch Sale Badge -->
            <div class="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-md text-xs font-bold z-10 shadow-lg">
                🔥 LAUNCH SALE
            </div>
            <div class="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
                -35%
            </div>
            <div class="aspect-square overflow-hidden">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover hover:scale-110 transition-transform duration-300">
            </div>
            <div class="p-3">
                <h3 class="font-semibold text-base mb-1">${product.name}</h3>
                <p class="text-gray-600 text-xs mb-2 line-clamp-2">${product.description}</p>
                
                <!-- Size Selection -->
                <div class="mb-2">
                    <p class="text-xs font-medium text-gray-700 mb-1">Size:</p>
                    <div class="flex gap-1 ${product.category === 'shoes' ? 'flex-wrap' : ''}">
                        ${product.category === 'shoes' ? 
                            `<button onclick="event.stopPropagation(); selectSize(this, '7')" class="size-btn px-2 py-1 border border-gray-300 rounded text-xs hover:border-red-600 hover:text-red-600 transition-colors">7</button>
                            <button onclick="event.stopPropagation(); selectSize(this, '8')" class="size-btn px-2 py-1 border border-gray-300 rounded text-xs hover:border-red-600 hover:text-red-600 transition-colors">8</button>
                            <button onclick="event.stopPropagation(); selectSize(this, '9')" class="size-btn px-2 py-1 border border-gray-300 rounded text-xs hover:border-red-600 hover:text-red-600 transition-colors">9</button>
                            <button onclick="event.stopPropagation(); selectSize(this, '10')" class="size-btn px-2 py-1 border border-gray-300 rounded text-xs hover:border-red-600 hover:text-red-600 transition-colors">10</button>
                            <button onclick="event.stopPropagation(); selectSize(this, '11')" class="size-btn px-2 py-1 border border-gray-300 rounded text-xs hover:border-red-600 hover:text-red-600 transition-colors">11</button>` :
                            `<button onclick="event.stopPropagation(); selectSize(this, 'S')" class="size-btn px-2 py-1 border border-gray-300 rounded text-xs hover:border-red-600 hover:text-red-600 transition-colors">S</button>
                            <button onclick="event.stopPropagation(); selectSize(this, 'M')" class="size-btn px-2 py-1 border border-gray-300 rounded text-xs hover:border-red-600 hover:text-red-600 transition-colors">M</button>
                            <button onclick="event.stopPropagation(); selectSize(this, 'L')" class="size-btn px-2 py-1 border border-gray-300 rounded text-xs hover:border-red-600 hover:text-red-600 transition-colors">L</button>`
                        }
                    </div>
                </div>
                
                <div class="flex justify-between items-center">
                    <div class="flex flex-col">
                        <span class="text-xs text-gray-400 line-through">R${product.price}</span>
                        <span class="text-lg font-bold text-red-600">R${discountedPrice}</span>
                    </div>
                    <button onclick="event.stopPropagation(); addToCartWithSize(${product.id}, this)" class="btn-primary text-white px-3 py-1.5 rounded-lg text-xs">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `}).join('');
}

function renderCategorySections() {
    const container = document.getElementById('category-sections');
    if (!container) return;
    
    const categories = ['hoodies', 'pants', 'shoes', 'hats'];
    const categoryNames = {
        'hoodies': 'Hoodies & Sweatshirts',
        'pants': 'Pants & Jeans',
        'shoes': 'Shoes & Sneakers',
        'hats': 'Hats & Caps'
    };
    
    container.innerHTML = categories.map(category => {
        const categoryProducts = allProducts.filter(p => p.category === category);
        
        return `
            <div class="mb-16">
                <div class="flex justify-between items-center mb-8">
                    <h3 class="text-3xl font-bold">${categoryNames[category]}</h3>
                    <a href="products.html?category=${category}" class="text-purple-600 hover:text-purple-800 font-semibold">
                        View All →
                    </a>
                </div>
                <div class="relative">
                    <div class="category-scroll" id="scroll-${category}">
                        ${categoryProducts.map(product => {
                            const discountedPrice = Math.round(product.price * 0.65); // 35% off
                            return `
                            <div class="scroll-product-card card-hover bg-white rounded-lg shadow-md overflow-hidden cursor-pointer relative" onclick="openProductModal(${product.id})">
                                <!-- Launch Sale Badge -->
                                <div class="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-md text-xs font-bold z-10 shadow-lg">
                                    🔥 LAUNCH
                                </div>
                                <div class="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
                                    -35%
                                </div>
                                <div class="aspect-square overflow-hidden">
                                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover hover:scale-110 transition-transform duration-300">
                                </div>
                                <div class="p-3">
                                    <h4 class="font-semibold text-base mb-1">${product.name}</h4>
                                    <p class="text-gray-600 text-xs mb-2 line-clamp-2">${product.description}</p>
                                    
                                    <!-- Size Selection -->
                                    <div class="mb-2">
                                        <p class="text-xs font-medium text-gray-700 mb-1">Size:</p>
                                        <div class="flex gap-1 ${product.category === 'shoes' ? 'flex-wrap' : ''}">
                                            ${product.category === 'shoes' ? 
                                                `<button onclick="event.stopPropagation(); selectSize(this, '7')" class="size-btn px-2 py-1 border border-gray-300 rounded text-xs hover:border-red-600 hover:text-red-600 transition-colors">7</button>
                                                <button onclick="event.stopPropagation(); selectSize(this, '8')" class="size-btn px-2 py-1 border border-gray-300 rounded text-xs hover:border-red-600 hover:text-red-600 transition-colors">8</button>
                                                <button onclick="event.stopPropagation(); selectSize(this, '9')" class="size-btn px-2 py-1 border border-gray-300 rounded text-xs hover:border-red-600 hover:text-red-600 transition-colors">9</button>
                                                <button onclick="event.stopPropagation(); selectSize(this, '10')" class="size-btn px-2 py-1 border border-gray-300 rounded text-xs hover:border-red-600 hover:text-red-600 transition-colors">10</button>
                                                <button onclick="event.stopPropagation(); selectSize(this, '11')" class="size-btn px-2 py-1 border border-gray-300 rounded text-xs hover:border-red-600 hover:text-red-600 transition-colors">11</button>` :
                                                `<button onclick="event.stopPropagation(); selectSize(this, 'S')" class="size-btn px-2 py-1 border border-gray-300 rounded text-xs hover:border-red-600 hover:text-red-600 transition-colors">S</button>
                                                <button onclick="event.stopPropagation(); selectSize(this, 'M')" class="size-btn px-2 py-1 border border-gray-300 rounded text-xs hover:border-red-600 hover:text-red-600 transition-colors">M</button>
                                                <button onclick="event.stopPropagation(); selectSize(this, 'L')" class="size-btn px-2 py-1 border border-gray-300 rounded text-xs hover:border-red-600 hover:text-red-600 transition-colors">L</button>`
                                            }
                                        </div>
                                    </div>
                                    
                                    <div class="flex justify-between items-center">
                                        <div class="flex flex-col">
                                            <span class="text-xs text-gray-400 line-through">R${product.price}</span>
                                            <span class="text-base font-bold text-red-600">R${discountedPrice}</span>
                                        </div>
                                        <button onclick="event.stopPropagation(); addToCartWithSize(${product.id}, this)" class="btn-primary text-white px-2 py-1 rounded text-xs">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `}).join('')}
                    </div>
                    <button class="scroll-nav-btn left" onclick="scrollCategory('${category}', 'left')">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </button>
                    <button class="scroll-nav-btn right" onclick="scrollCategory('${category}', 'right')">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function scrollCategory(category, direction) {
    const container = document.getElementById(`scroll-${category}`);
    const scrollAmount = 300;
    
    if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}

function filterProducts(category) {
    currentFilter = category;
    
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    renderProducts();
}

// Product modal functions
function openProductModal(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    
    currentProduct = product;
    
    document.getElementById('modal-product-name').textContent = product.name;
    document.getElementById('modal-product-description').textContent = product.description;
    document.getElementById('modal-product-price').textContent = `R${product.price}`;
    document.getElementById('modal-product-image').innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover rounded-lg">
    `;
    
    document.getElementById('product-modal').classList.add('active');
}

function closeProductModal() {
    document.getElementById('product-modal').classList.remove('active');
    currentProduct = null;
}

function addToCartFromModal() {
    if (!currentProduct) return;
    
    const size = document.getElementById('size-select').value;
    addToCart(currentProduct.id, size);
    closeProductModal();
}

// Cart functions
function addToCart(productId, size = 'M') {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId && item.size === size);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            size: size,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    
    // Show success message
    showToast(`${product.name} added to cart!`);
}

// Size selection functions
function selectSize(button, size) {
    // Find the product card (either .premium-card or .product-card)
    const productCard = button.closest('.premium-card') || button.closest('.product-card') || button.closest('.scroll-product-card');
    
    if (!productCard) {
        console.error('Could not find product card');
        return;
    }
    
    const sizeButtons = productCard.querySelectorAll('.size-btn');
    
    sizeButtons.forEach(btn => {
        btn.classList.remove('border-red-600', 'text-red-600', 'bg-red-50');
        btn.classList.add('border-gray-300', 'text-gray-700');
    });
    
    // Add active class to clicked button
    button.classList.remove('border-gray-300', 'text-gray-700');
    button.classList.add('border-red-600', 'text-red-600', 'bg-red-50');
    
    // Store selected size on the product card
    productCard.setAttribute('data-selected-size', size);
}

function addToCartWithSize(productId, button) {
    // Find the product card (either .premium-card or .product-card)
    const productCard = button.closest('.premium-card') || button.closest('.product-card') || button.closest('.scroll-product-card');
    
    if (!productCard) {
        console.error('Could not find product card');
        return;
    }
    
    const selectedSize = productCard.getAttribute('data-selected-size');
    
    if (!selectedSize) {
        showToast('Please select a size first!');
        return;
    }
    
    addToCart(productId, selectedSize);
}

function removeFromCart(productId, size) {
    cart = cart.filter(item => !(item.id === productId && item.size === size));
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const mobileCartCount = document.getElementById('mobile-cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Update cart counts
    if (cartCount) cartCount.textContent = totalItems;
    if (mobileCartCount) mobileCartCount.textContent = totalItems;
    if (cartTotal) cartTotal.textContent = `R${totalPrice.toFixed(2)}`;
    
    // Update cart items display
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="text-center text-gray-500 py-8">
                    <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6M7 13l-1.5 6m0 0h9"></path>
                    </svg>
                    <p>Your cart is empty</p>
                    <p class="text-sm">Add some premium CRBFTN items!</p>
                </div>
            `;
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg">
                    <div class="flex-1">
                        <h4 class="font-semibold">${item.name}</h4>
                        <p class="text-sm text-gray-600">Size: ${item.size}</p>
                        <div class="flex items-center space-x-2 mt-1">
                            <button onclick="updateCartQuantity(${item.id}, '${item.size}', ${item.quantity - 1})" class="w-6 h-6 flex items-center justify-center bg-gray-200 rounded text-gray-600 hover:bg-gray-300">-</button>
                            <span class="font-medium">${item.quantity}</span>
                            <button onclick="updateCartQuantity(${item.id}, '${item.size}', ${item.quantity + 1})" class="w-6 h-6 flex items-center justify-center bg-gray-200 rounded text-gray-600 hover:bg-gray-300">+</button>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="font-bold">R${(item.price * item.quantity).toFixed(2)}</p>
                        <button onclick="removeFromCart(${item.id}, '${item.size}')" class="text-red-500 hover:text-red-700 text-sm">
                            Remove
                        </button>
                    </div>
                </div>
            `).join('') + 
            `<div class="border-t border-gray-200 pt-4 mt-4">
                <button onclick="requestQuote()" class="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                    Request Quote
                </button>
            </div>`;
        }
    }
    
    // Save cart to localStorage
    localStorage.setItem('crbftn_cart', JSON.stringify(cart));
}

function updateCartQuantity(productId, size, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId, size);
        return;
    }
    
    const item = cart.find(item => item.id === productId && item.size === size);
    if (item) {
        item.quantity = newQuantity;
        updateCartDisplay();
    }
}

function toggleCart() {
    const overlay = document.getElementById('cart-overlay');
    const sidebar = document.getElementById('cart-sidebar');
    
    if (!overlay || !sidebar) return;
    
    if (overlay.classList.contains('hidden')) {
        // Show cart
        overlay.classList.remove('hidden');
        setTimeout(() => {
            overlay.classList.add('opacity-100');
            sidebar.classList.remove('translate-x-full');
        }, 10);
        document.body.style.overflow = 'hidden';
    } else {
        // Hide cart
        overlay.classList.remove('opacity-100');
        sidebar.classList.add('translate-x-full');
        setTimeout(() => {
            overlay.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    }
}

function requestQuote() {
    console.log('🔥 Request Quote clicked! Cart:', cart);
    if (cart.length === 0) {
        alert('Your cart is empty! Please add items first.');
        showToast('Your cart is empty! Add some items first.');
        return;
    }
    
    console.log('✅ Cart has items, showing modal...');
    // Show the email collection modal
    showQuoteEmailModal();
}

// Show quote email modal
function showQuoteEmailModal() {
    console.log('📧 Showing quote email modal...');
    let modal = document.getElementById('quote-email-modal');
    
    if (!modal) {
        console.error('❌ Quote modal not found in DOM!');
        alert('Error: Quote modal not loaded. Please refresh the page.');
        return;
    }
    
    const itemsList = document.getElementById('quote-items-list');
    const totalDisplay = document.getElementById('quote-total-display');
    
    // Populate items list
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (itemsList) {
        itemsList.innerHTML = cart.map(item => `
            <div class="flex justify-between items-center">
                <span>${item.name} (Size: ${item.size}) × ${item.quantity}</span>
                <span class="font-medium">R${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('');
    }
    
    if (totalDisplay) {
        totalDisplay.textContent = `R${totalAmount.toFixed(2)}`;
    }
    
    // SIMPLE SOLUTION - Just remove hidden class and ensure display is flex with centering
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    
    console.log('🚀 Modal shown by removing hidden class and setting display flex');
    console.log('Modal element:', modal);
    console.log('Modal computed display:', window.getComputedStyle(modal).display);
    console.log('Modal classList:', modal.classList.toString());
    
    // Also close the cart when showing quote modal
    const cartOverlay = document.getElementById('cart-overlay');
    if (cartOverlay) {
        cartOverlay.classList.add('hidden');
    }
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    console.log('✅ Quote modal displayed!');
}

// Create fallback quote modal if component didn't load
function createFallbackQuoteModal() {
    const modalHtml = `
        <div id="quote-email-modal" class="modal fixed inset-0 bg-black bg-opacity-50 z-50 hidden flex items-center justify-center">
            <div class="modal-content bg-white rounded-xl max-w-md w-full mx-4 p-6 relative">
                <button onclick="closeQuoteEmailModal()" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                
                <div class="text-center mb-6">
                    <h3 class="text-2xl font-bold text-gray-900 mb-2">Request Your Quote</h3>
                    <p class="text-gray-600">Enter your details to receive your personalized quote</p>
                </div>
                
                <div class="mb-6">
                    <h4 class="font-semibold mb-3">Your Items:</h4>
                    <div id="quote-items-list" class="space-y-2 text-sm"></div>
                    <div class="border-t pt-3 mt-3">
                        <div class="flex justify-between font-bold">
                            <span>Total:</span>
                            <span id="quote-total-display">R0.00</span>
                        </div>
                    </div>
                </div>
                
                <form id="quote-email-form" onsubmit="submitQuoteRequest(event)">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                            <input type="email" id="quote-email" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                            <input type="text" id="quote-name" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input type="tel" id="quote-phone" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Additional Message</label>
                            <textarea id="quote-message" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"></textarea>
                        </div>
                        <button type="submit" id="submit-quote-btn" class="w-full bg-gradient-to-r from-red-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-red-700 hover:to-blue-700 transition-all duration-200">
                            Request Quote
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    console.log('Fallback quote modal created');
}

// Close quote email modal
function closeQuoteEmailModal() {
    console.log('🚪 Closing quote modal...');
    const modal = document.getElementById('quote-email-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        
        // Reset form
        const form = document.getElementById('quote-email-form');
        if (form) {
            form.reset();
        }
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        console.log('✅ Quote modal closed');
    }
}

// Submit quote request from modal form
function submitQuoteRequest(event) {
    event.preventDefault();
    
    const email = document.getElementById('customer-email').value;
    const name = document.getElementById('customer-name').value;
    const phone = document.getElementById('customer-phone').value;
    const message = document.getElementById('customer-message').value;
    
    if (!email || !name) {
        showToast('Please fill in your email and name.');
        return;
    }
    
    // Call the existing quote handler
    handleQuoteSubmission(email, name, phone, message);
}

// Handle quote form submission
// Handle quote form submission
async function handleQuoteSubmission(customerEmail, customerName, customerPhone, customerMessage) {
    if (cart.length === 0) {
        showToast('Your cart is empty! Add some items first.');
        return;
    }
    
    // Prepare quote data
    const timestamp = new Date().toISOString();
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const quoteId = `CRBFTN-${Date.now()}`;
    
    const quoteData = {
        items: cart.map(item => ({
            name: item.name,
            size: item.size,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity
        })),
        totalAmount: totalAmount,
        itemsCount: itemsCount,
        customerInfo: {
            email: customerEmail,
            name: customerName || 'Not provided',
            phone: customerPhone || 'Not provided',
            message: customerMessage || 'No additional message',
            timestamp: timestamp,
            quoteId: quoteId,
            userAgent: navigator.userAgent
        }
    };
    
    // Show loading state
    const submitBtn = document.getElementById('submit-quote-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
        <svg class="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25"></circle>
            <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" class="opacity-75"></path>
        </svg>
        Sending...
    `;
    submitBtn.disabled = true;
    
    // Submit via SMTP function - CORRECT format matching send-email.js expectations
    const emailData = {
        type: 'quote',
        items: quoteData.items,
        totalAmount: totalAmount,
        customerInfo: {
            email: customerEmail,
            name: customerName || 'Not provided',
            phone: customerPhone || 'Not provided',
            message: customerMessage || 'No additional message',
            timestamp: timestamp,
            quoteId: quoteId
        }
    };
    
    console.log('📤 Sending quote request to Netlify function:', emailData);
    
    // Submit via SMTP function with fallback
    let response, result;
    try {
        response = await fetch('/.netlify/functions/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData)
        });
        result = await response.json();
    } catch (fetchError) {
        console.error('Netlify function error:', fetchError);
        // Fallback to EmailJS
        return handleQuoteEmailJSFallback(emailData.formData, submitBtn, originalText);
    }
    
    if (response.ok && result.success) {
        // Try to save to Firestore if available
        try {
            const firestoreResult = await saveQuoteToFirestore(quoteData);
            if (firestoreResult && firestoreResult.success) {
                console.log('Quote saved to Firestore:', firestoreResult);
            } else if (firestoreResult && !firestoreResult.success) {
                console.warn('Firestore save failed:', firestoreResult.error);
            }
        } catch (firestoreError) {
            console.warn('Firestore error (non-critical):', firestoreError);
        }
        
        // Success - show message and clear cart
        showToast(`Quote request sent to ${customerEmail}! Check your inbox for confirmation. We'll send your quote within 24 hours. 📧`);
        cart = [];
        updateCartDisplay();
        cart = [];
        updateCartDisplay();
        closeQuoteEmailModal();
        toggleCart();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    } else {
        // Try EmailJS fallback
        console.log('Netlify function failed, trying EmailJS fallback...');
        return handleQuoteEmailJSFallback(emailData.formData, submitBtn, originalText);
    }
}

// EmailJS Fallback for Quote Requests
async function handleQuoteEmailJSFallback(formData, submitBtn, originalText) {
    try {
        console.log('Using EmailJS fallback for quote...');
        
        const emailParams = {
            from_name: formData.customerName,
            from_email: formData.customerEmail,
            phone: formData.customerPhone,
            message: formData.customerMessage,
            quote_id: formData.quoteId,
            total_amount: formData.totalAmount,
            items_count: formData.itemsCount,
            items_details: formData.items.map(item => 
                `${item.name} (Size: ${item.size}) x${item.quantity} - R${item.total.toFixed(2)}`
            ).join('\n'),
            timestamp: formData.timestamp
        };
        
        // Try EmailJS (you'll need to configure your service)
        const emailResult = await emailjs.send(
            'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
            'YOUR_QUOTE_TEMPLATE_ID', // Replace with your EmailJS template ID
            emailParams,
            'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
        );
        
        // Success with EmailJS
        showToast(`Quote request sent via backup system to ${formData.customerEmail}! Check your inbox for confirmation. 📧`);
        cart = [];
        updateCartDisplay();
        closeQuoteEmailModal();
        toggleCart();
        
    } catch (emailError) {
        console.error('EmailJS fallback also failed:', emailError);
        
        // Final fallback - show error with direct contact info
        showToast('Unable to send quote automatically. Please email us directly at crabfontain@gmail.com or call +27 68 000 3578 with your cart details.');
    } finally {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Initialize quote email form
document.addEventListener('DOMContentLoaded', function() {
    const quoteForm = document.getElementById('quote-email-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('customer-email').value.trim();
            const name = document.getElementById('customer-name').value.trim();
            const phone = document.getElementById('customer-phone').value.trim();
            const message = document.getElementById('customer-message').value.trim();
            
            if (!email || !name || !phone) {
                showToast('Please fill in all required fields');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast('Please enter a valid email address');
                return;
            }
            
            handleQuoteSubmission(email, name, phone, message);
        });
    }
});

// Gallery functions
function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    
    grid.innerHTML = galleryItems.map(item => `
        <div class="gallery-item card-hover bg-white rounded-lg shadow-md overflow-hidden">
            <img src="${item.image}" alt="${item.title}" class="w-full h-64 object-cover">
            <div class="p-4">
                <h3 class="font-semibold text-lg mb-2">${item.title}</h3>
                <p class="text-gray-600">${item.description}</p>
            </div>
        </div>
    `).join('');
}

// Review functions
function setRating(rating) {
    selectedRating = rating;
    const stars = document.querySelectorAll('.rating-star');
    
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('star-rating');
            star.classList.remove('text-gray-300');
        } else {
            star.classList.remove('star-rating');
            star.classList.add('text-gray-300');
        }
    });
}

async function submitReview(event) {
    event.preventDefault();
    
    if (selectedRating === 0) {
        showToast('Please select a rating!');
        return;
    }
    
    const name = document.getElementById('reviewer-name').value;
    const email = document.getElementById('reviewer-email').value;
    const product = document.getElementById('product-select').value;
    const reviewText = document.getElementById('review-text').value;
    
    const reviewData = {
        id: Date.now().toString(),
        name: name,
        email: email,
        rating: selectedRating,
        review: reviewText,
        product: product,
        date: new Date().toISOString()
    };
    
    if (window.dataSdk) {
        const result = await window.dataSdk.create(reviewData);
        if (result.isOk) {
            showToast('Review submitted successfully!');
            document.getElementById('review-form').reset();
            setRating(0);
        } else {
            showToast('Failed to submit review. Please try again.');
        }
    }
}

function renderReviews(reviews) {
    const reviewsList = document.getElementById('reviews-list');
    if (!reviewsList) return;
    
    if (reviews.length === 0) {
        reviewsList.innerHTML = '<p class="text-gray-500 text-center py-8">No reviews yet. Be the first to leave a review!</p>';
        return;
    }
    
    reviewsList.innerHTML = reviews.map(review => `
        <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h4 class="font-semibold">${review.name}</h4>
                    <p class="text-sm text-gray-600">${review.product}</p>
                </div>
                <div class="flex items-center space-x-1">
                    ${Array.from({length: 5}, (_, i) => 
                        `<span class="${i < review.rating ? 'star-rating' : 'text-gray-300'}">★</span>`
                    ).join('')}
                </div>
            </div>
            <p class="text-gray-700 mb-3">${review.review}</p>
            <p class="text-sm text-gray-500">${new Date(review.date).toLocaleDateString()}</p>
        </div>
    `).join('');
}

// Contact form functions
async function submitContactForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const phone = document.getElementById('contact-phone').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;
    
    // Validate required fields
    if (!name || !email || !message) {
        showToast('Please fill in all required fields.');
        return;
    }
    
    try {
        showToast('Sending message...');
        
        const contactData = {
            type: 'contact',
            formData: {
                name: name,
                email: email,
                phone: phone || 'Not provided',
                subject: subject || 'Contact Form Submission',
                message: message,
                timestamp: new Date().toISOString()
            }
        };
        
        const response = await fetch('/.netlify/functions/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            showToast('Message sent successfully! We\'ll get back to you soon.');
            document.getElementById('contact-form').reset();
        } else {
            console.error('Email sending failed:', result);
            showToast('Failed to send message. Please try again.');
        }
    } catch (error) {
        console.error('Contact form error:', error);
        showToast('Failed to send message. Please try again.');
    }
}

// Utility functions
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// URL parameter handling for filtering products
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check for category filter in URL (for products page)
    const categoryParam = getUrlParameter('category');
    if (categoryParam && window.location.pathname.includes('products.html')) {
        currentFilter = categoryParam;
        
        // Set active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.toLowerCase() === categoryParam) {
                btn.classList.add('active');
            }
        });
    }
    
    // Add click outside handler for cart sidebar
    const cartOverlay = document.getElementById('cart-overlay');
    if (cartOverlay) {
        cartOverlay.addEventListener('click', function(e) {
            if (e.target === cartOverlay) {
                toggleCart();
            }
        });
    }
    
    // Add escape key handler to close cart
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const cartOverlay = document.getElementById('cart-overlay');
            if (cartOverlay && !cartOverlay.classList.contains('hidden')) {
                toggleCart();
            }
        }
    });
    
    init();
});

// Firestore Integration Functions
// Function to save quote data to Firestore
async function saveQuoteToFirestore(quoteData) {
    try {
        // Check if Firebase is available
        if (!window.firestoreDb || !window.firestoreAddDoc || !window.firestoreCollection) {
            console.log('Firebase not available, skipping Firestore save');
            return { success: false, error: 'Firebase not initialized' };
        }

        // Prepare data for Firestore
        const firestoreData = {
            // Customer Information
            customerEmail: quoteData.customerInfo.email,
            customerName: quoteData.customerInfo.name,
            customerPhone: quoteData.customerInfo.phone,
            customerMessage: quoteData.customerInfo.message,
            
            // Cart Information
            items: quoteData.items,
            
            // Order Summary
            totalAmount: quoteData.totalAmount,
            itemsCount: quoteData.itemsCount,
            
            // System Information
            timestamp: window.firestoreServerTimestamp(),
            userAgent: quoteData.customerInfo.userAgent,
            status: 'pending',
            quoteId: quoteData.customerInfo.quoteId,
            
            // Additional tracking
            source: 'website',
            platform: 'web',
            created: new Date().toISOString()
        };

        // Save to Firestore quotes collection
        const docRef = await window.firestoreAddDoc(
            window.firestoreCollection(window.firestoreDb, 'quotes'), 
            firestoreData
        );
        
        console.log('Quote saved to Firestore with ID: ', docRef.id);
        
        // Also save email to mailing list
        await saveEmailToMailingList(
            quoteData.customerInfo.email, 
            quoteData.customerInfo.name, 
            'quote-request'
        );
        
        return {
            success: true,
            id: docRef.id,
            quoteId: firestoreData.quoteId
        };
        
    } catch (error) {
        console.error('Error saving quote to Firestore: ', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Function to save customer email to mailing list
async function saveEmailToMailingList(email, name = null, source = 'quote-request') {
    try {
        // Check if Firebase is available
        if (!window.firestoreDb || !window.firestoreAddDoc || !window.firestoreCollection) {
            console.log('Firebase not available, skipping mailing list save');
            return { success: false, error: 'Firebase not initialized' };
        }

        const emailData = {
            email: email,
            name: name || 'Not provided',
            source: source,
            subscribed: true,
            timestamp: window.firestoreServerTimestamp(),
            created: new Date().toISOString(),
            status: 'active'
        };

        const docRef = await window.firestoreAddDoc(
            window.firestoreCollection(window.firestoreDb, 'mailing-list'), 
            emailData
        );
        
        console.log('Email saved to mailing list with ID: ', docRef.id);
        
        return {
            success: true,
            id: docRef.id
        };
        
    } catch (error) {
        console.error('Error saving email to mailing list: ', error);
        return {
            success: false,
            error: error.message
        };
    }
}
