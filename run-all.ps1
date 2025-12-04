<#
run-all.ps1

Finds folders with a `package.json` and starts their dev/start script
in new PowerShell windows. Skips folders under `node_modules`.

Usage:
  Open PowerShell as needed and run:
    .\run-all.ps1

Notes:
  - Each folder without `node_modules` will run `npm install` automatically.
  - If a package.json has a `dev` script it runs `npm run dev`; otherwise
    it will run `npm start` if present.
#>

$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
Write-Host "Launching services from: $root`n"

# Find package.json files but ignore node_modules
$pkgFiles = Get-ChildItem -Path $root -Recurse -Filter package.json -ErrorAction SilentlyContinue |
    Where-Object { $_.FullName -notmatch "\\node_modules\\" }

if (-not $pkgFiles) {
    Write-Host "No package.json files found." -ForegroundColor Yellow
    exit 1
}

foreach ($pkg in $pkgFiles) {
    try {
        $folder = Split-Path -Parent $pkg.FullName
        $json = Get-Content -Raw -Path $pkg.FullName | ConvertFrom-Json

        # Determine script to run
        $scriptToRun = $null
        if ($json.scripts -and $json.scripts.dev) { $scriptToRun = 'npm run dev' }
        elseif ($json.scripts -and $json.scripts.start) { $scriptToRun = 'npm start' }
        else { Write-Host "Skipping $folder - no dev/start script." -ForegroundColor Gray; continue }

        $label = Split-Path -Leaf $folder
        Write-Host "Preparing: $label -> $scriptToRun"

        # Build command to run inside new PowerShell window (single-line to avoid quoting issues)
        $innerCmd = "Set-Location -LiteralPath '$folder'; if (-not (Test-Path 'node_modules')) { npm install }; $scriptToRun"

        # Launch new PowerShell window and run the command (keeps window open on exit)
        Start-Process -FilePath 'powershell.exe' -ArgumentList "-NoExit", "-Command", $innerCmd
        Start-Sleep -Milliseconds 200
    }
    catch {
        Write-Host "Failed to process $($pkg.FullName): $_" -ForegroundColor Red
    }
}

Write-Host "Done starting all detected services." -ForegroundColor Green
