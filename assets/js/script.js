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
        image: "👕",
        description: "Comfortable premium hoodie perfect for any season. Made with high-quality cotton blend.",
        featured: true
    },
    {
        id: 7,
        name: "Designer Hoodie",
        category: "hoodies",
        price: 1199,
        image: "👕",
        description: "Limited edition designer hoodie with unique patterns and premium finish."
    },
    {
        id: 13,
        name: "Oversized Hoodie",
        category: "hoodies",
        price: 1099,
        image: "👕",
        description: "Trendy oversized hoodie with relaxed fit and modern styling."
    },
    {
        id: 19,
        name: "Zip-Up Hoodie",
        category: "hoodies",
        price: 949,
        image: "👕",
        description: "Versatile zip-up hoodie perfect for layering and active wear."
    },
    {
        id: 25,
        name: "Cropped Hoodie",
        category: "hoodies",
        price: 799,
        image: "👕",
        description: "Stylish cropped hoodie with contemporary cut and premium materials."
    },
    
    // Pants
    {
        id: 2,
        name: "Classic Jeans",
        category: "pants",
        price: 1299,
        image: "👖",
        description: "Timeless denim jeans with perfect fit and durability. A wardrobe essential.",
        featured: true
    },
    {
        id: 8,
        name: "Cargo Pants",
        category: "pants",
        price: 999,
        image: "👖",
        description: "Functional cargo pants with multiple pockets and durable fabric."
    },
    {
        id: 14,
        name: "Slim Fit Chinos",
        category: "pants",
        price: 849,
        image: "👖",
        description: "Elegant slim fit chinos perfect for casual and semi-formal occasions."
    },
    {
        id: 20,
        name: "Track Pants",
        category: "pants",
        price: 699,
        image: "👖",
        description: "Comfortable track pants ideal for sports and leisure activities."
    },
    {
        id: 26,
        name: "Wide Leg Jeans",
        category: "pants",
        price: 1199,
        image: "👖",
        description: "Trendy wide leg jeans with vintage-inspired styling and modern comfort."
    },
    
    // Shoes
    {
        id: 3,
        name: "Urban Sneakers",
        category: "shoes",
        price: 1599,
        image: "👟",
        description: "Stylish urban sneakers combining comfort and street style.",
        featured: true
    },
    {
        id: 9,
        name: "High-Top Sneakers",
        category: "shoes",
        price: 1799,
        image: "👟",
        description: "Classic high-top sneakers with premium leather and superior support."
    },
    {
        id: 15,
        name: "Running Shoes",
        category: "shoes",
        price: 1899,
        image: "👟",
        description: "Performance running shoes with advanced cushioning and breathable design."
    },
    {
        id: 21,
        name: "Canvas Sneakers",
        category: "shoes",
        price: 899,
        image: "👟",
        description: "Lightweight canvas sneakers perfect for everyday casual wear."
    },
    {
        id: 27,
        name: "Slip-On Shoes",
        category: "shoes",
        price: 1299,
        image: "👟",
        description: "Convenient slip-on shoes with elastic panels and comfortable sole."
    },
    
    // Hats
    {
        id: 4,
        name: "Street Cap",
        category: "hats",
        price: 399,
        image: "🧢",
        description: "Classic street cap with adjustable fit and premium materials.",
        featured: true
    },
    {
        id: 10,
        name: "Snapback Cap",
        category: "hats",
        price: 449,
        image: "🧢",
        description: "Trendy snapback cap with flat brim and adjustable closure."
    },
    {
        id: 16,
        name: "Bucket Hat",
        category: "hats",
        price: 349,
        image: "🧢",
        description: "Stylish bucket hat perfect for sun protection and street fashion."
    },
    {
        id: 22,
        name: "Beanie",
        category: "hats",
        price: 299,
        image: "🧢",
        description: "Warm knitted beanie ideal for cold weather and casual styling."
    },
    {
        id: 28,
        name: "Dad Hat",
        category: "hats",
        price: 379,
        image: "🧢",
        description: "Relaxed dad hat with curved brim and comfortable unstructured fit."
    },
    
    // Socks
    {
        id: 5,
        name: "Comfort Socks",
        category: "socks",
        price: 199,
        image: "🧦",
        description: "Ultra-comfortable socks with moisture-wicking technology."
    },
    {
        id: 11,
        name: "Athletic Socks",
        category: "socks",
        price: 249,
        image: "🧦",
        description: "Performance athletic socks with cushioned sole and arch support."
    },
    {
        id: 17,
        name: "Crew Socks",
        category: "socks",
        price: 179,
        image: "🧦",
        description: "Classic crew socks in premium cotton blend for everyday wear."
    },
    {
        id: 23,
        name: "Ankle Socks",
        category: "socks",
        price: 159,
        image: "🧦",
        description: "Low-cut ankle socks perfect for sneakers and casual shoes."
    },
    {
        id: 29,
        name: "Wool Socks",
        category: "socks",
        price: 299,
        image: "🧦",
        description: "Premium wool socks providing warmth and natural odor resistance."
    },
    
    // Underwear
    {
        id: 6,
        name: "Essential Underwear",
        category: "underwear",
        price: 299,
        image: "🩲",
        description: "Premium underwear with superior comfort and fit."
    },
    {
        id: 12,
        name: "Boxer Briefs",
        category: "underwear",
        price: 349,
        image: "🩲",
        description: "Supportive boxer briefs with moisture-wicking fabric and comfortable waistband."
    },
    {
        id: 18,
        name: "Cotton Briefs",
        category: "underwear",
        price: 249,
        image: "🩲",
        description: "Classic cotton briefs offering comfort and breathability for daily wear."
    },
    {
        id: 24,
        name: "Performance Underwear",
        category: "underwear",
        price: 399,
        image: "🩲",
        description: "High-performance underwear with advanced fabric technology for active lifestyles."
    },
    {
        id: 30,
        name: "Bamboo Underwear",
        category: "underwear",
        price: 449,
        image: "🩲",
        description: "Eco-friendly bamboo underwear with natural antibacterial properties."
    }
];

// Gallery items
const galleryItems = [
    { id: 1, image: "👕", title: "Street Style Collection", description: "Urban fashion meets comfort" },
    { id: 2, image: "👖", title: "Denim Dreams", description: "Classic meets contemporary" },
    { id: 3, image: "👟", title: "Sneaker Culture", description: "Step up your game" },
    { id: 4, image: "🧢", title: "Cap Collection", description: "Top off your look" },
    { id: 5, image: "👕", title: "Hoodie Season", description: "Cozy meets cool" },
    { id: 6, image: "👖", title: "Perfect Fit", description: "Tailored for you" }
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
    updateCartDisplay();
}

// Navigation functions
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// Product functions
function renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    
    const filteredProducts = currentFilter === 'all' ? allProducts : allProducts.filter(p => p.category === currentFilter);
    
    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card card-hover bg-white rounded-lg shadow-md overflow-hidden cursor-pointer" onclick="openProductModal(${product.id})">
            <div class="bg-gray-200 h-48 flex items-center justify-center text-6xl">
                ${product.image}
            </div>
            <div class="p-4">
                <h3 class="font-semibold text-lg mb-2">${product.name}</h3>
                <p class="text-gray-600 text-sm mb-3">${product.description}</p>
                <div class="flex justify-between items-center">
                    <span class="text-xl font-bold text-purple-600">R${product.price}</span>
                    <button onclick="event.stopPropagation(); addToCart(${product.id})" class="btn-primary text-white px-4 py-2 rounded-lg text-sm">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
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
                        ${categoryProducts.map(product => `
                            <div class="scroll-product-card card-hover bg-white rounded-lg shadow-md overflow-hidden cursor-pointer" onclick="openProductModal(${product.id})">
                                <div class="bg-gray-200 h-48 flex items-center justify-center text-6xl">
                                    ${product.image}
                                </div>
                                <div class="p-4">
                                    <h4 class="font-semibold text-lg mb-2">${product.name}</h4>
                                    <p class="text-gray-600 text-sm mb-3 line-clamp-2">${product.description}</p>
                                    <div class="flex justify-between items-center">
                                        <span class="text-xl font-bold text-purple-600">R${product.price}</span>
                                        <button onclick="event.stopPropagation(); addToCart(${product.id})" class="btn-primary text-white px-3 py-1 rounded text-sm">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
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
        <div class="text-8xl">${product.image}</div>
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

function removeFromCart(productId, size) {
    cart = cart.filter(item => !(item.id === productId && item.size === size));
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (cartCount) cartCount.textContent = totalItems;
    if (cartTotal) cartTotal.textContent = `R${totalPrice.toFixed(2)}`;
    
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="text-gray-500 text-center py-4">Your cart is empty</p>';
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div class="flex items-center space-x-3">
                        <span class="text-2xl">${item.image}</span>
                        <div>
                            <h4 class="font-medium">${item.name}</h4>
                            <p class="text-sm text-gray-600">Size: ${item.size} | Qty: ${item.quantity}</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="font-semibold">R${(item.price * item.quantity).toFixed(2)}</span>
                        <button onclick="removeFromCart(${item.id}, '${item.size}')" class="text-red-500 hover:text-red-700">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('active');
}

function checkout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    showToast(`Thank you for your order! Total: R${total.toFixed(2)}`);
    cart = [];
    updateCartDisplay();
    toggleCart();
}

// Gallery functions
function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    
    grid.innerHTML = galleryItems.map(item => `
        <div class="gallery-item card-hover bg-white rounded-lg shadow-md overflow-hidden">
            <div class="bg-gray-200 h-64 flex items-center justify-center text-8xl">
                ${item.image}
            </div>
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
    
    const contactData = {
        id: Date.now().toString(),
        name: name,
        email: email,
        phone: phone || 'Not provided',
        subject: subject,
        message: message,
        date: new Date().toISOString(),
        type: 'contact'
    };
    
    if (window.dataSdk) {
        const result = await window.dataSdk.create(contactData);
        if (result.isOk) {
            showToast('Message sent successfully! We\'ll get back to you soon.');
            document.getElementById('contact-form').reset();
        } else {
            showToast('Failed to send message. Please try again.');
        }
    } else {
        showToast('Message sent successfully! We\'ll get back to you soon.');
        document.getElementById('contact-form').reset();
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
    
    init();
});