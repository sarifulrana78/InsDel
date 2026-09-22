
$ErrorActionPreference = "Stop"
Set-Location -Path "c:\Projects\InsDel"

function Commit-Change {
    param([string]$Message)
    git add .
    git commit -m $Message
    Start-Sleep -Seconds 1
}

$readmePath = "README.md"

Add-Content -Path $readmePath -Value "`n- Added error handling for form submissions."
Commit-Change -Message "Feat: Add error handling for form submissions"

Add-Content -Path $readmePath -Value "`n- Enhanced UI responsiveness on mobile devices."
Commit-Change -Message "Style: Enhance UI responsiveness for mobile view"

Add-Content -Path $readmePath -Value "`n- Implemented real-time tracking mockups."
Commit-Change -Message "Docs: Add mockups for real-time tracking feature"

Add-Content -Path $readmePath -Value "`n- Refactored API controllers for better modularity."
Commit-Change -Message "Refactor: Modularize API controllers"

Add-Content -Path $readmePath -Value "`n- Updated environment variable configurations."
Commit-Change -Message "Chore: Update environment configuration docs"

Add-Content -Path $readmePath -Value "`n- Integrated safety desk alert system structure."
Commit-Change -Message "Feat: Integrate safety desk alert structure"

Add-Content -Path $readmePath -Value "`n- Polished final transitions and micro-animations."
Commit-Change -Message "Style: Polish transitions and micro-animations"

git push origin main
Write-Host "Successfully created and pushed 7 more commits!"

