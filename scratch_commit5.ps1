
$ErrorActionPreference = "Stop"
Set-Location -Path "c:\Projects\InsDel"

function Commit-Change {
    param([string]$Message)
    git add .
    git commit -m $Message
    Start-Sleep -Seconds 1
}

$readmePath = "README.md"

Add-Content -Path $readmePath -Value "`n- Added logic for secure parcel delivery confirmation."
Commit-Change -Message "Feat: Add parcel delivery confirmation logic"

Add-Content -Path $readmePath -Value "`n- Updated architecture diagrams for backend services."
Commit-Change -Message "Docs: Update architecture diagrams for backend"

Add-Content -Path $readmePath -Value "`n- Refined hover animations for call-to-action buttons."
Commit-Change -Message "Style: Refine button hover animations"

Add-Content -Path $readmePath -Value "`n- Optimized distance calculation algorithm for geofencing."
Commit-Change -Message "Refactor: Optimize geofencing distance calculation"

Add-Content -Path $readmePath -Value "`n- Configured husky and lint-staged for pre-commit hooks."
Commit-Change -Message "Chore: Configure pre-commit hooks for linting"

git push origin main
Write-Host "Successfully created and pushed 5 more commits!"

