// Firebase Configuration for CRBFTN Website
// Replace these values with your actual Firebase project configuration

const firebaseConfig = {
    apiKey: "your-api-key-here",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};

// Initialize Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Function to save customer email and quote data to Firestore
async function saveQuoteToFirestore(customerData, cartItems) {
    try {
        // Prepare data for Firestore
        const quoteData = {
            // Customer Information
            customerEmail: customerData.email,
            customerName: customerData.name || 'Not provided',
            customerMessage: customerData.message || 'No message provided',
            
            // Cart Information
            items: cartItems.map(item => ({
                name: item.name,
                size: item.size,
                quantity: item.quantity,
                price: item.price,
                total: item.price * item.quantity
            })),
            
            // Order Summary
            totalAmount: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            itemsCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
            
            // System Information
            timestamp: serverTimestamp(),
            userAgent: navigator.userAgent,
            status: 'pending',
            quoteId: `CRBFTN-${Date.now()}`,
            
            // Additional tracking
            source: 'website',
            platform: 'web',
            created: new Date().toISOString()
        };

        // Save to Firestore
        const docRef = await addDoc(collection(db, 'quotes'), quoteData);
        console.log('Quote saved to Firestore with ID: ', docRef.id);
        
        return {
            success: true,
            id: docRef.id,
            quoteId: quoteData.quoteId
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
        const emailData = {
            email: email,
            name: name || 'Not provided',
            source: source,
            subscribed: true,
            timestamp: serverTimestamp(),
            created: new Date().toISOString(),
            status: 'active'
        };

        const docRef = await addDoc(collection(db, 'mailing-list'), emailData);
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

// Export functions for use in main script
window.saveQuoteToFirestore = saveQuoteToFirestore;
window.saveEmailToMailingList = saveEmailToMailingList;
window.db = db;

// SETUP INSTRUCTIONS:
/*
1. Go to https://console.firebase.google.com/
2. Create a new project or select existing project
3. Enable Firestore Database
4. Go to Project Settings > General > Your apps
5. Create a web app if you haven't already
6. Copy the configuration object and replace the values above
7. Set up Firestore Security Rules (see firestore-rules.txt)
8. Include this script in your HTML after the Firebase SDK
*/