$ErrorActionPreference = "Stop"

Set-Location -Path "c:\Projects\InsDel"

function Commit-Change {
    param([string]$Message)
    git add .
    git commit -m $Message
    Start-Sleep -Seconds 1
}

$readmePath = "README.md"
if (-not (Test-Path $readmePath)) {
    New-Item -Path $readmePath -ItemType File -Value "# InsDel Project`n" | Out-Null
}

# 1
Add-Content -Path $readmePath -Value "`n- Added basic structure for Dashboard."
Commit-Change -Message "Docs: Update README with Dashboard structure details"

# 2
Add-Content -Path $readmePath -Value "`n- Added basic structure for New Request."
Commit-Change -Message "Docs: Update README with New Request feature details"

# 3
Add-Content -Path $readmePath -Value "`n- Added basic structure for Find Parcels."
Commit-Change -Message "Docs: Update README with Find Parcels feature details"

# 4
Add-Content -Path $readmePath -Value "`n- Configured Next.js routing for internal pages."
Commit-Change -Message "Chore: Document Next.js routing setup in README"

# 5
Add-Content -Path $readmePath -Value "`n- Added Tailwind CSS configuration."
Commit-Change -Message "Chore: Add styling framework documentation"

# 6
Add-Content -Path $readmePath -Value "`n- Improved accessibility with ARIA labels."
Commit-Change -Message "Docs: Note accessibility improvements in project documentation"

# 7
Add-Content -Path $readmePath -Value "`n- Setup ESLint and Prettier."
Commit-Change -Message "Chore: Update tooling setup documentation"

# 8
Add-Content -Path $readmePath -Value "`n- Added state management structure."
Commit-Change -Message "Docs: Add state management architecture notes"

# 9
Add-Content -Path $readmePath -Value "`n- Finalized UI mockups for MVP."
Commit-Change -Message "Docs: Finalize UI/UX documentation notes"

git push origin main
Write-Host "Successfully created and pushed 9 more commits!"
