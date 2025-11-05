#!/bin/bash

# Netlify Build Script for Firebase Environment Variables
# This script replaces placeholders with actual environment variables during build

echo "🔥 Injecting Firebase environment variables..."

# Replace placeholders in Index.html with actual environment variables
sed -i "s/%%FIREBASE_API_KEY%%/$FIREBASE_API_KEY/g" Index.html
sed -i "s/%%FIREBASE_AUTH_DOMAIN%%/$FIREBASE_AUTH_DOMAIN/g" Index.html
sed -i "s/%%FIREBASE_PROJECT_ID%%/$FIREBASE_PROJECT_ID/g" Index.html
sed -i "s/%%FIREBASE_STORAGE_BUCKET%%/$FIREBASE_STORAGE_BUCKET/g" Index.html
sed -i "s/%%FIREBASE_MESSAGING_SENDER_ID%%/$FIREBASE_MESSAGING_SENDER_ID/g" Index.html
sed -i "s/%%FIREBASE_APP_ID%%/$FIREBASE_APP_ID/g" Index.html

echo "✅ Firebase configuration injected successfully"