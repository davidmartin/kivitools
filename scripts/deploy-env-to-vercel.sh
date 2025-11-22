#!/bin/bash

# Script para añadir todas las variables de entorno a Vercel
# Ejecutar: bash scripts/deploy-env-to-vercel.sh

echo "🚀 Añadiendo variables de entorno a Vercel..."
echo ""

# OpenRouter API Key
echo "📝 Añadiendo OPENROUTER_API_KEY..."
echo "your_openrouter_key_here" | vercel env add OPENROUTER_API_KEY production

# Appwrite Configuration
echo "📝 Añadiendo APPWRITE_ENDPOINT..."
echo "https://fra.cloud.appwrite.io/v1" | vercel env add APPWRITE_ENDPOINT production

echo "📝 Añadiendo APPWRITE_PROJECT_ID..."
echo "691995a40019c6415c84" | vercel env add APPWRITE_PROJECT_ID production

echo "📝 Añadiendo APPWRITE_API_KEY..."
echo "standard_232a00462c7a7aa69879ccd836aff826cb7ff674941f32190df00eb79108dbd0fa6afc84eb2000318dad433a942852ab36e8f51a61f147c321c646fb4d6ee52f691d0baa7a89128b717ad6c15285cdb73bbe9a76f0ee2c8561063e6e82a2c5f5fc82f2c221ab29df346b10d68b8b6acc4de9e19ceee4823b33c7de91699bd5b6" | vercel env add APPWRITE_API_KEY production

echo "📝 Añadiendo APPWRITE_DATABASE_ID..."
echo "691996c100092f2e06cc" | vercel env add APPWRITE_DATABASE_ID production

echo "📝 Añadiendo APPWRITE_COLLECTION_ID..."
echo "69199754001e10f816a5" | vercel env add APPWRITE_COLLECTION_ID production

echo "📝 Añadiendo APPWRITE_CONTACT_COLLECTION_ID..."
echo "contact_messages" | vercel env add APPWRITE_CONTACT_COLLECTION_ID production

echo "📝 Añadiendo APPWRITE_SUGGESTIONS_COLLECTION_ID..."
echo "tool-suggestions" | vercel env add APPWRITE_SUGGESTIONS_COLLECTION_ID production

# Cloudflare Turnstile
echo "📝 Añadiendo NEXT_PUBLIC_TURNSTILE_SITE_KEY..."
echo "0x4AAAAAACBMWVCEjs6FnoUx" | vercel env add NEXT_PUBLIC_TURNSTILE_SITE_KEY production

echo "📝 Añadiendo TURNSTILE_SECRET_KEY..."
echo "0x4AAAAAACBMWVQgcO04Zcj3IQBs-Hi-dlM" | vercel env add TURNSTILE_SECRET_KEY production

echo ""
echo "✅ Todas las variables de entorno han sido añadidas a Vercel (Production)"
echo ""
echo "💡 Para añadir también a Preview y Development, ejecuta:"
echo "   bash scripts/deploy-env-to-vercel-all.sh"
