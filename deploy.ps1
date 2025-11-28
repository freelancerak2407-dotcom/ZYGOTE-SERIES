# ZYGOTE SERIES - Deployment Script (Option C)
# Builds frontend for Netlify and backend for Linux VM

param(
    [string]$Environment = "production",
    [switch]$BuildFrontend = $true,
    [switch]$BuildBackend = $true,
    [switch]$BuildAll = $false
)

if ($BuildAll) {
    $BuildFrontend = $true
    $BuildBackend = $true
}

$ErrorActionPreference = "Stop"
$ScriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "ZYGOTE SERIES - Deployment Script" -ForegroundColor Cyan
Write-Host "Environment: $Environment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# FRONTEND BUILD (Next.js Static Export)
if ($BuildFrontend) {
    Write-Host "Building Admin Frontend (Next.js Static Export)..." -ForegroundColor Yellow
    
    Push-Location "$ScriptPath\admin"
    
    try {
        Write-Host "  Installing dependencies..." -ForegroundColor Gray
        npm ci --legacy-peer-deps
        
        Write-Host "  Building Next.js app..." -ForegroundColor Gray
        npm run build
        
        Write-Host "  Frontend build complete: admin/out/" -ForegroundColor Green
        
    } catch {
        Write-Host "  Frontend build failed: $_" -ForegroundColor Red
        Pop-Location
        exit 1
    }
    
    Pop-Location
    Write-Host ""
}

# BACKEND BUILD (Express + TypeScript)
if ($BuildBackend) {
    Write-Host "Building Backend (Express + TypeScript)..." -ForegroundColor Yellow
    
    Push-Location "$ScriptPath\backend"
    
    try {
        Write-Host "  Installing dependencies..." -ForegroundColor Gray
        npm ci --legacy-peer-deps
        
        Write-Host "  Generating Prisma client..." -ForegroundColor Gray
        npm run prisma:generate
        
        Write-Host "  Compiling TypeScript..." -ForegroundColor Gray
        npm run build
        
        Write-Host "  Backend build complete: backend/dist/" -ForegroundColor Green
        
    } catch {
        Write-Host "  Backend build failed: $_" -ForegroundColor Red
        Pop-Location
        exit 1
    }
    
    Pop-Location
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Deployment Ready!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Frontend: admin/out/ ready for Netlify" -ForegroundColor Green
Write-Host "  Backend: backend/dist/ ready for PM2" -ForegroundColor Green
Write-Host "  Config: netlify.toml, pm2.json, nginx.conf" -ForegroundColor Green
Write-Host ""
Write-Host "NEXT STEPS:" -ForegroundColor Yellow
Write-Host "  1. Frontend: https://netlify.com (connect GitHub repo)" -ForegroundColor Gray
Write-Host "  2. Backend: bash deploy-backend.sh (on Linux VM)" -ForegroundColor Gray
Write-Host "  3. Database: npm run prisma:migrate && npm run prisma:seed" -ForegroundColor Gray
Write-Host ""
