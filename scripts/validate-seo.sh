#!/bin/bash

# Script de validación SEO para KiviTools
# Ejecutar: chmod +x scripts/validate-seo.sh && ./scripts/validate-seo.sh

echo "🔍 Validando SEO de KiviTools..."
echo ""

BASE_URL="http://localhost:3000"

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para verificar HTTP status
check_url() {
    local url=$1
    local description=$2
    local status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$status" = "200" ]; then
        echo -e "${GREEN}✓${NC} $description ($url) - Status: $status"
        return 0
    else
        echo -e "${RED}✗${NC} $description ($url) - Status: $status"
        return 1
    fi
}

# Contador de tests
PASSED=0
FAILED=0

echo "📄 1. Verificando archivos SEO esenciales..."
echo "--------------------------------------------"

# Sitemap
if check_url "$BASE_URL/sitemap.xml" "Sitemap XML"; then
    ((PASSED++))
else
    ((FAILED++))
fi

# Robots
if check_url "$BASE_URL/robots.txt" "Robots.txt"; then
    ((PASSED++))
else
    ((FAILED++))
fi

# Manifest
if check_url "$BASE_URL/manifest.json" "Manifest.json (PWA)"; then
    ((PASSED++))
else
    ((FAILED++))
fi

echo ""
echo "🌍 2. Verificando rutas alias (inglés/español)..."
echo "--------------------------------------------"

# TikTok Script Writer
if check_url "$BASE_URL/tiktok/script-writer" "TikTok Script Writer (EN)"; then
    ((PASSED++))
else
    ((FAILED++))
fi

if check_url "$BASE_URL/tiktok/escritor-de-guiones" "TikTok Script Writer (ES)"; then
    ((PASSED++))
else
    ((FAILED++))
fi

# Instagram Bio Generator
if check_url "$BASE_URL/instagram/bio-generator" "Instagram Bio Generator (EN)"; then
    ((PASSED++))
else
    ((FAILED++))
fi

if check_url "$BASE_URL/instagram/generador-bio" "Instagram Bio Generator (ES)"; then
    ((PASSED++))
else
    ((FAILED++))
fi

# Twitter Thread Maker
if check_url "$BASE_URL/twitter/thread-maker" "Twitter Thread Maker (EN)"; then
    ((PASSED++))
else
    ((FAILED++))
fi

if check_url "$BASE_URL/twitter/creador-hilos" "Twitter Thread Maker (ES)"; then
    ((PASSED++))
else
    ((FAILED++))
fi

echo ""
echo "📊 3. Verificando metadata en homepage..."
echo "--------------------------------------------"

HOME_HTML=$(curl -s "$BASE_URL")

# Verificar title
if echo "$HOME_HTML" | grep -q "<title>KiviTools"; then
    echo -e "${GREEN}✓${NC} Title tag presente"
    ((PASSED++))
else
    echo -e "${RED}✗${NC} Title tag no encontrado"
    ((FAILED++))
fi

# Verificar meta description
if echo "$HOME_HTML" | grep -q 'name="description"'; then
    echo -e "${GREEN}✓${NC} Meta description presente"
    ((PASSED++))
else
    echo -e "${RED}✗${NC} Meta description no encontrada"
    ((FAILED++))
fi

# Verificar Open Graph
if echo "$HOME_HTML" | grep -q 'property="og:title"'; then
    echo -e "${GREEN}✓${NC} OpenGraph tags presentes"
    ((PASSED++))
else
    echo -e "${RED}✗${NC} OpenGraph tags no encontrados"
    ((FAILED++))
fi

# Verificar Twitter Card
if echo "$HOME_HTML" | grep -q 'name="twitter:card"'; then
    echo -e "${GREEN}✓${NC} Twitter Card tags presentes"
    ((PASSED++))
else
    echo -e "${RED}✗${NC} Twitter Card tags no encontrados"
    ((FAILED++))
fi

# Verificar hreflang
if echo "$HOME_HTML" | grep -q 'hreflang="es"'; then
    echo -e "${GREEN}✓${NC} hreflang tags presentes"
    ((PASSED++))
else
    echo -e "${RED}✗${NC} hreflang tags no encontrados"
    ((FAILED++))
fi

# Verificar JSON-LD
if echo "$HOME_HTML" | grep -q 'application/ld+json'; then
    echo -e "${GREEN}✓${NC} JSON-LD structured data presente"
    ((PASSED++))
else
    echo -e "${RED}✗${NC} JSON-LD structured data no encontrado"
    ((FAILED++))
fi

echo ""
echo "🔗 4. Verificando canonical URLs..."
echo "--------------------------------------------"

# Verificar canonical en homepage
if echo "$HOME_HTML" | grep -q '<link rel="canonical"'; then
    echo -e "${GREEN}✓${NC} Canonical URL configurado"
    ((PASSED++))
else
    echo -e "${YELLOW}!${NC} Canonical URL no encontrado (puede estar en metadata)"
    ((FAILED++))
fi

echo ""
echo "📱 5. Verificando PWA manifest..."
echo "--------------------------------------------"

MANIFEST=$(curl -s "$BASE_URL/manifest.json")

if echo "$MANIFEST" | grep -q '"name"'; then
    echo -e "${GREEN}✓${NC} Manifest tiene nombre"
    ((PASSED++))
else
    echo -e "${RED}✗${NC} Manifest sin nombre"
    ((FAILED++))
fi

if echo "$MANIFEST" | grep -q '"icons"'; then
    echo -e "${GREEN}✓${NC} Manifest tiene iconos"
    ((PASSED++))
else
    echo -e "${RED}✗${NC} Manifest sin iconos"
    ((FAILED++))
fi

echo ""
echo "🗺️  6. Verificando sitemap..."
echo "--------------------------------------------"

SITEMAP=$(curl -s "$BASE_URL/sitemap.xml")

# Contar URLs en sitemap
URL_COUNT=$(echo "$SITEMAP" | grep -c "<loc>")

if [ "$URL_COUNT" -gt 50 ]; then
    echo -e "${GREEN}✓${NC} Sitemap contiene $URL_COUNT URLs"
    ((PASSED++))
else
    echo -e "${YELLOW}!${NC} Sitemap contiene solo $URL_COUNT URLs (esperado: 60+)"
    ((FAILED++))
fi

# Verificar que contiene rutas en español
if echo "$SITEMAP" | grep -q "escritor-de-guiones"; then
    echo -e "${GREEN}✓${NC} Sitemap incluye rutas en español"
    ((PASSED++))
else
    echo -e "${RED}✗${NC} Sitemap no incluye rutas en español"
    ((FAILED++))
fi

# Verificar que contiene rutas en inglés
if echo "$SITEMAP" | grep -q "script-writer"; then
    echo -e "${GREEN}✓${NC} Sitemap incluye rutas en inglés"
    ((PASSED++))
else
    echo -e "${RED}✗${NC} Sitemap no incluye rutas en inglés"
    ((FAILED++))
fi

echo ""
echo "🤖 7. Verificando robots.txt..."
echo "--------------------------------------------"

ROBOTS=$(curl -s "$BASE_URL/robots.txt")

if echo "$ROBOTS" | grep -q "Sitemap:"; then
    echo -e "${GREEN}✓${NC} Robots.txt referencia al sitemap"
    ((PASSED++))
else
    echo -e "${RED}✗${NC} Robots.txt no referencia al sitemap"
    ((FAILED++))
fi

if echo "$ROBOTS" | grep -q "Allow: /"; then
    echo -e "${GREEN}✓${NC} Robots.txt permite indexación"
    ((PASSED++))
else
    echo -e "${RED}✗${NC} Robots.txt no permite indexación"
    ((FAILED++))
fi

if echo "$ROBOTS" | grep -q "Disallow: /api/"; then
    echo -e "${GREEN}✓${NC} Robots.txt bloquea rutas API"
    ((PASSED++))
else
    echo -e "${RED}✗${NC} Robots.txt no bloquea rutas API"
    ((FAILED++))
fi

echo ""
echo "================================================"
echo "📊 RESUMEN DE VALIDACIÓN"
echo "================================================"
echo -e "${GREEN}Tests pasados:${NC} $PASSED"
echo -e "${RED}Tests fallidos:${NC} $FAILED"
echo ""

TOTAL=$((PASSED + FAILED))
PERCENTAGE=$((PASSED * 100 / TOTAL))

if [ $PERCENTAGE -ge 90 ]; then
    echo -e "${GREEN}✓ Excelente! ($PERCENTAGE%) - SEO está bien configurado${NC}"
    exit 0
elif [ $PERCENTAGE -ge 70 ]; then
    echo -e "${YELLOW}! Bien ($PERCENTAGE%) - Algunas mejoras necesarias${NC}"
    exit 0
else
    echo -e "${RED}✗ Necesita atención ($PERCENTAGE%) - Revisar configuración SEO${NC}"
    exit 1
fi
