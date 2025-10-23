#!/usr/bin/env python3
"""
Simple HTTP Server for Typewriting Academy
Serves the production build with proper headers
"""

import http.server
import socketserver
import os
import sys
from pathlib import Path

# Configuration
PORT = 8080
HOST = '0.0.0.0'

class TypewritingAcademyHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add security headers
        self.send_header('X-Frame-Options', 'DENY')
        self.send_header('X-XSS-Protection', '1; mode=block')
        self.send_header('X-Content-Type-Options', 'nosniff')
        super().end_headers()
    
    def do_GET(self):
        # Handle SPA routing - redirect all non-file requests to index.html
        if not os.path.exists(self.translate_path(self.path)) and not self.path.startswith('/assets'):
            self.path = '/index.html'
        return super().do_GET()

def main():
    # Change to dist directory
    dist_path = Path(__file__).parent / 'dist'
    if not dist_path.exists():
        print("❌ dist/ folder not found!")
        print("📍 Please run 'npm run build' first")
        sys.exit(1)
    
    os.chdir(dist_path)
    
    # Start server
    with socketserver.TCPServer((HOST, PORT), TypewritingAcademyHandler) as httpd:
        print(f"🚀 TYPEWRITING ACADEMY IS LIVE!")
        print(f"")
        print(f"📍 Local URL:   http://localhost:{PORT}")
        print(f"🌐 Network URL: http://192.168.8.114:{PORT}")
        print(f"")
        print(f"✅ Features Live:")
        print(f"   🎯 Complete typing curriculum")
        print(f"   💰 Subscription system ($9.99-19.99/month)")
        print(f"   🔐 User authentication & management")
        print(f"   📊 Progress tracking & certificates")
        print(f"   📱 Mobile responsive design")
        print(f"   ⚡ Production optimized")
        print(f"")
        print(f"🏆 Your professional typing academy is ready!")
        print(f"💡 Press Ctrl+C to stop the server")
        print(f"")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print(f"\n🛑 Server stopped")

if __name__ == "__main__":
    main()