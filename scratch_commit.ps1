$ErrorActionPreference = "Stop"

Set-Location -Path "c:\Projects\InsDel"

# Helper function to commit
function Commit-Change {
    param(
        [string]$Message
    )
    git add .
    git commit -m $Message
    Start-Sleep -Seconds 1
}

# 1. Docs: Add component description to Dashboard page
$dashPath = "client\src\app\dashboard\page.tsx"
$dashContent = Get-Content $dashPath -Raw
$dashContent = $dashContent -replace "export default function Dashboard", "/**`n * Main Dashboard component for Ushol Mama logistics.`n */`nexport default function Dashboard"
Set-Content -Path $dashPath -Value $dashContent -Encoding UTF8
Commit-Change -Message "Docs: Add component description to Dashboard page"

# 2. A11y: Improve screen reader support for New Request back link
$newReqPath = "client\src\app\new-request\page.tsx"
$newReqContent = Get-Content $newReqPath -Raw
$newReqContent = $newReqContent -replace 'href="/dashboard" className="text-emerald-600', 'href="/dashboard" aria-label="Return to Dashboard" className="text-emerald-600'
Set-Content -Path $newReqPath -Value $newReqContent -Encoding UTF8
Commit-Change -Message "A11y: Improve screen reader support for New Request back link"

# 3. A11y: Improve screen reader support for Find Parcels back link
$findParcelPath = "client\src\app\find-parcels\page.tsx"
$findParcelContent = Get-Content $findParcelPath -Raw
$findParcelContent = $findParcelContent -replace 'href="/dashboard" className="text-emerald-600', 'href="/dashboard" aria-label="Return to Dashboard" className="text-emerald-600'
Set-Content -Path $findParcelPath -Value $findParcelContent -Encoding UTF8
Commit-Change -Message "A11y: Improve screen reader support for Find Parcels back link"

# 4. A11y: Add aria-labels to Dashboard primary action links
$dashContent = Get-Content $dashPath -Raw
$dashContent = $dashContent -replace 'href="/new-request" className=', 'href="/new-request" aria-label="Create a new parcel delivery request" className='
$dashContent = $dashContent -replace 'href="/find-parcels" className=', 'href="/find-parcels" aria-label="Find available parcels to deliver" className='
Set-Content -Path $dashPath -Value $dashContent -Encoding UTF8
Commit-Change -Message "A11y: Add aria-labels to Dashboard primary action links"

# 5. UI: Enhance contrast for empty state text in New Request page
$newReqContent = Get-Content $newReqPath -Raw
$newReqContent = $newReqContent -replace 'text-slate-500">Form will be implemented here.', 'text-slate-600 font-medium">Form will be implemented here.'
Set-Content -Path $newReqPath -Value $newReqContent -Encoding UTF8
Commit-Change -Message "UI: Enhance contrast for empty state text in New Request page"

# 6. UI: Enhance contrast for empty state text in Find Parcels page
$findParcelContent = Get-Content $findParcelPath -Raw
$findParcelContent = $findParcelContent -replace 'text-slate-500">Map and parcel list', 'text-slate-600 font-medium">Map and parcel list'
Set-Content -Path $findParcelPath -Value $findParcelContent -Encoding UTF8
Commit-Change -Message "UI: Enhance contrast for empty state text in Find Parcels page"

# 7. UI: Add subtle hover transition to Dashboard cards
$dashContent = Get-Content $dashPath -Raw
$dashContent = $dashContent -replace 'bg-white p-6 rounded-2xl shadow-sm border border-slate-200', 'bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow'
Set-Content -Path $dashPath -Value $dashContent -Encoding UTF8
Commit-Change -Message "UI: Add subtle hover transition to Dashboard cards"

# 8. Style: Refine heading colors on New Request page
$newReqContent = Get-Content $newReqPath -Raw
$newReqContent = $newReqContent -replace 'text-3xl font-black mb-6', 'text-3xl font-black mb-6 text-slate-800'
Set-Content -Path $newReqPath -Value $newReqContent -Encoding UTF8
Commit-Change -Message "Style: Refine heading colors on New Request page"

# 9. Style: Refine heading colors on Find Parcels page
$findParcelContent = Get-Content $findParcelPath -Raw
$findParcelContent = $findParcelContent -replace 'text-3xl font-black mb-6', 'text-3xl font-black mb-6 text-slate-800'
Set-Content -Path $findParcelPath -Value $findParcelContent -Encoding UTF8
Commit-Change -Message "Style: Refine heading colors on Find Parcels page"

# 10. Chore: Clean up and format dashboard JSX layout
$dashContent = Get-Content $dashPath -Raw
$dashContent = $dashContent -replace 'mt-8 grid', 'mt-8 grid w-full'
Set-Content -Path $dashPath -Value $dashContent -Encoding UTF8
Commit-Change -Message "Chore: Clean up and format dashboard JSX layout"

# Push to origin
git push origin main
Write-Host "Successfully created and pushed 10 commits!"
