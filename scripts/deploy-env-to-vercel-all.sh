#!/bin/bash

# Script para añadir todas las variables de entorno a Vercel (Production, Preview y Development)
# Ejecutar: bash scripts/deploy-env-to-vercel-all.sh

echo "🚀 Añadiendo variables de entorno a Vercel (Production, Preview, Development)..."
echo ""

# Array de environments
ENVIRONMENTS=("production" "preview" "development")

# DeepSeek API Key
echo "📝 Añadiendo DEEPSEEK_API_KEY a todos los entornos..."
for ENV in "${ENVIRONMENTS[@]}"; do
    echo "sk-eaea2704768645d7aa56a2e49d9e4809" | vercel env add DEEPSEEK_API_KEY "$ENV"
done

# Appwrite Configuration
echo "📝 Añadiendo APPWRITE_ENDPOINT a todos los entornos..."
for ENV in "${ENVIRONMENTS[@]}"; do
    echo "https://fra.cloud.appwrite.io/v1" | vercel env add APPWRITE_ENDPOINT "$ENV"
done

echo "📝 Añadiendo APPWRITE_PROJECT_ID a todos los entornos..."
for ENV in "${ENVIRONMENTS[@]}"; do
    echo "691995a40019c6415c84" | vercel env add APPWRITE_PROJECT_ID "$ENV"
done

echo "📝 Añadiendo APPWRITE_API_KEY a todos los entornos..."
for ENV in "${ENVIRONMENTS[@]}"; do
    echo "standard_232a00462c7a7aa69879ccd836aff826cb7ff674941f32190df00eb79108dbd0fa6afc84eb2000318dad433a942852ab36e8f51a61f147c321c646fb4d6ee52f691d0baa7a89128b717ad6c15285cdb73bbe9a76f0ee2c8561063e6e82a2c5f5fc82f2c221ab29df346b10d68b8b6acc4de9e19ceee4823b33c7de91699bd5b6" | vercel env add APPWRITE_API_KEY "$ENV"
done

echo "📝 Añadiendo APPWRITE_DATABASE_ID a todos los entornos..."
for ENV in "${ENVIRONMENTS[@]}"; do
    echo "691996c100092f2e06cc" | vercel env add APPWRITE_DATABASE_ID "$ENV"
done

echo "📝 Añadiendo APPWRITE_COLLECTION_ID a todos los entornos..."
for ENV in "${ENVIRONMENTS[@]}"; do
    echo "69199754001e10f816a5" | vercel env add APPWRITE_COLLECTION_ID "$ENV"
done

# Cloudflare Turnstile
echo "📝 Añadiendo NEXT_PUBLIC_TURNSTILE_SITE_KEY a todos los entornos..."
for ENV in "${ENVIRONMENTS[@]}"; do
    echo "0x4AAAAAACBMWVCEjs6FnoUx" | vercel env add NEXT_PUBLIC_TURNSTILE_SITE_KEY "$ENV"
done

echo "📝 Añadiendo TURNSTILE_SECRET_KEY a todos los entornos..."
for ENV in "${ENVIRONMENTS[@]}"; do
    echo "0x4AAAAAACBMWVQgcO04Zcj3IQBs-Hi-dlM" | vercel env add TURNSTILE_SECRET_KEY "$ENV"
done

echo ""
echo "✅ Todas las variables de entorno han sido añadidas a Vercel"
echo "   - Production ✅"
echo "   - Preview ✅"
echo "   - Development ✅"
echo ""
echo "🚀 Ahora puedes hacer deploy con: vercel --prod"
