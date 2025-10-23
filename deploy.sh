#!/bin/bash

# Typewriting Academy - Quick Deployment Script
# This script prepares your app for deployment

echo "🚀 Preparing Typewriting Academy for Global Launch..."

# Ensure we're in the right directory
cd "/home/oem/Desktop/Information Processing App"

# Build the production version
echo "📦 Building production version..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "📊 Build Output:"
    ls -la dist/
    echo ""
    echo "🌐 Your app is ready for deployment!"
    echo ""
    echo "🎯 Quick Deployment Options:"
    echo ""
    echo "1. 📱 Netlify (Drag & Drop):"
    echo "   - Go to https://app.netlify.com/drop"
    echo "   - Drag the 'dist' folder"
    echo "   - Get instant live URL!"
    echo ""
    echo "2. ⚡ Vercel:"
    echo "   - Go to https://vercel.com/new"
    echo "   - Upload 'dist' folder"
    echo "   - Configure custom domain"
    echo ""
    echo "3. 🌍 Firebase Hosting:"
    echo "   - npm install -g firebase-tools"
    echo "   - firebase login"
    echo "   - firebase init hosting"
    echo "   - firebase deploy"
    echo ""
    echo "📁 Production files ready in: $(pwd)/dist/"
    echo "🎉 Your Typewriting Academy is ready to dominate the global market!"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi