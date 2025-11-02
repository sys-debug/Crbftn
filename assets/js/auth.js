// Firebase configuration and authentication setup
import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup 
} from 'firebase/auth';
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    query, 
    where, 
    orderBy 
} from 'firebase/firestore';

// Firebase configuration - CRBFTN Project Configuration
const firebaseConfig = {
    apiKey: "AIzaSyARHl5oM9k1baV6TYiaBPzA3o0sxitZJLM",
    authDomain: "crbftn.firebaseapp.com",
    projectId: "crbftn",
    storageBucket: "crbftn.firebasestorage.app",
    messagingSenderId: "63933497433",
    appId: "1:63933497433:web:07021d7c3711c0ca66b148"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Authentication state
let currentUser = null;
let pendingCheckout = null;

// Initialize authentication listener
onAuthStateChanged(auth, (user) => {
    currentUser = user;
    updateAuthUI();
    
    if (user && pendingCheckout) {
        // User just signed in and has items in cart, proceed to checkout
        proceedToCheckout();
        pendingCheckout = null;
    }
});

// Update UI based on authentication state
function updateAuthUI() {
    const authContainer = document.getElementById('auth-container');
    if (!authContainer) return;
    
    if (currentUser) {
        authContainer.innerHTML = `
            <div class="flex items-center gap-4">
                <div class="flex items-center gap-2">
                    <img src="${currentUser.photoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(currentUser.displayName || currentUser.email)}" 
                         alt="Profile" class="w-8 h-8 rounded-full">
                    <span class="text-sm font-medium">${currentUser.displayName || currentUser.email}</span>
                </div>
                <a href="account.html" class="auth-btn">Account</a>
                <button onclick="signOutUser()" class="auth-btn">Sign Out</button>
            </div>
        `;
    } else {
        authContainer.innerHTML = `
            <div class="flex items-center gap-2">
                <button onclick="showAuthModal('signin')" class="auth-btn">Sign In</button>
                <button onclick="showAuthModal('signup')" class="auth-btn primary">Sign Up</button>
            </div>
        `;
    }
}

// Show authentication modal
function showAuthModal(mode = 'signin') {
    const modalHTML = `
        <div id="auth-modal" class="modal active">
            <div class="modal-content max-w-md">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-2xl font-bold">${mode === 'signin' ? 'Sign In' : 'Sign Up'}</h3>
                    <button onclick="closeAuthModal()" class="text-gray-500 hover:text-gray-700">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                
                <form id="auth-form" onsubmit="handleAuth(event, '${mode}')">
                    ${mode === 'signup' ? `
                    <div class="mb-4">
                        <label class="block text-sm font-medium mb-2">Full Name</label>
                        <input type="text" id="auth-name" required class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    </div>
                    ` : ''}
                    
                    <div class="mb-4">
                        <label class="block text-sm font-medium mb-2">Email</label>
                        <input type="email" id="auth-email" required class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    </div>
                    
                    <div class="mb-6">
                        <label class="block text-sm font-medium mb-2">Password</label>
                        <input type="password" id="auth-password" required minlength="6" class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    </div>
                    
                    <button type="submit" class="btn-primary w-full mb-4">
                        ${mode === 'signin' ? 'Sign In' : 'Create Account'}
                    </button>
                </form>
                
                <div class="text-center mb-4">
                    <span class="text-gray-500">or</span>
                </div>
                
                <button onclick="signInWithGoogle()" class="w-full border-2 border-gray-300 rounded-lg px-4 py-2 flex items-center justify-center gap-2 hover:border-gray-400 transition-colors mb-4">
                    <svg class="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                </button>
                
                <div class="text-center">
                    <button onclick="showAuthModal('${mode === 'signin' ? 'signup' : 'signin'}')" class="text-purple-600 hover:text-purple-800">
                        ${mode === 'signin' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Close authentication modal
function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) {
        modal.remove();
    }
}

// Handle authentication form submission
async function handleAuth(event, mode) {
    event.preventDefault();
    
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const name = document.getElementById('auth-name')?.value;
    
    try {
        let user;
        if (mode === 'signup') {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            user = userCredential.user;
            
            // Update display name if provided
            if (name) {
                await updateProfile(user, { displayName: name });
            }
            
            showToast('Account created successfully!');
        } else {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            user = userCredential.user;
            showToast('Signed in successfully!');
        }
        
        closeAuthModal();
    } catch (error) {
        showToast(error.message, 'error');
    }
}

// Sign in with Google
async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        showToast('Signed in with Google successfully!');
        closeAuthModal();
    } catch (error) {
        showToast(error.message, 'error');
    }
}

// Sign out user
async function signOutUser() {
    try {
        await signOut(auth);
        showToast('Signed out successfully!');
    } catch (error) {
        showToast(error.message, 'error');
    }
}

// Modified checkout function to require authentication
function checkout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'error');
        return;
    }
    
    if (!currentUser) {
        // Store cart for after authentication
        pendingCheckout = [...cart];
        showToast('Please sign in to complete your purchase');
        showAuthModal('signin');
        return;
    }
    
    proceedToCheckout();
}

// Proceed to checkout for authenticated users
async function proceedToCheckout() {
    try {
        const orderData = {
            userId: currentUser.uid,
            userEmail: currentUser.email,
            items: cart,
            total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        
        // Save order to Firestore
        await addDoc(collection(db, 'orders'), orderData);
        
        showToast(`Order placed successfully! Total: R${orderData.total.toFixed(2)}`);
        cart = [];
        updateCartDisplay();
        toggleCart();
        
        // Redirect to account page to view order
        setTimeout(() => {
            window.location.href = 'account.html';
        }, 2000);
        
    } catch (error) {
        showToast('Failed to place order. Please try again.', 'error');
        console.error('Checkout error:', error);
    }
}

// Enhanced toast function with error support
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    const bgColor = type === 'error' ? 'bg-red-500' : 'bg-green-500';
    toast.className = `fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Export functions for global use
window.showAuthModal = showAuthModal;
window.closeAuthModal = closeAuthModal;
window.handleAuth = handleAuth;
window.signInWithGoogle = signInWithGoogle;
window.signOutUser = signOutUser;
window.checkout = checkout;