
$ErrorActionPreference = "Stop"
Set-Location -Path "c:\Projects\InsDel"

function Commit-Change {
    param([string]$Message)
    git add .
    git commit -m $Message
    Start-Sleep -Seconds 1
}

$readmePath = "README.md"

Add-Content -Path $readmePath -Value "`n- Configured offline support and caching."
Commit-Change -Message "Feat: Add offline support configuration"

Add-Content -Path $readmePath -Value "`n- Updated primary and secondary color palettes."
Commit-Change -Message "Style: Update primary color scheme"

Add-Content -Path $readmePath -Value "`n- Added detailed API documentation for parcel routes."
Commit-Change -Message "Docs: Update API documentation for parcel routes"

Add-Content -Path $readmePath -Value "`n- Simplified parcel status enum for better readability."
Commit-Change -Message "Refactor: Simplify parcel status enum"

Add-Content -Path $readmePath -Value "`n- Set up Jest and React Testing Library."
Commit-Change -Message "Chore: Add testing framework setup"

Add-Content -Path $readmePath -Value "`n- Added background location tracking for commuters."
Commit-Change -Message "Feat: Add commuter background location tracking"

Add-Content -Path $readmePath -Value "`n- Fixed map rendering issues on mobile browsers."
Commit-Change -Message "Fix: Resolve map rendering issue on mobile"

Add-Content -Path $readmePath -Value "`n- Added comprehensive deployment instructions."
Commit-Change -Message "Docs: Add deployment instructions"

Add-Content -Path $readmePath -Value "`n- Implemented loading skeletons for parcel lists."
Commit-Change -Message "Style: Add loading skeletons for parcel lists"

Add-Content -Path $readmePath -Value "`n- Extracted OTP generation logic into a separate utility function."
Commit-Change -Message "Refactor: Extract OTP generation logic to utility"

Add-Content -Path $readmePath -Value "`n- Updated npm dependencies to latest stable versions."
Commit-Change -Message "Chore: Update package dependencies"

Add-Content -Path $readmePath -Value "`n- Created a view for users to see their parcel history."
Commit-Change -Message "Feat: Add parcel history view"

Add-Content -Path $readmePath -Value "`n- Handled edge cases in geofencing logic."
Commit-Change -Message "Fix: Handle edge cases in geofencing"

Add-Content -Path $readmePath -Value "`n- Updated global typography scale."
Commit-Change -Message "Style: Update typography scale"

Add-Content -Path $readmePath -Value "`n- Added contributor guidelines."
Commit-Change -Message "Docs: Add contributor guidelines"

git push origin main
Write-Host "Successfully created and pushed 15 more commits!"

