# SKRYPT: Masowa akceptacja wszystkich wpisów oczekujących na review
# Uruchom: .\scripts\accept-all.ps1
# Lub z parametrem kolekcji: .\scripts\accept-all.ps1 -Collection aktualnosci

param(
  [string]$Collection = "all"
)

$folders = if ($Collection -eq "all") {
  @("aktualnosci", "instruktorzy", "partnerzy", "program", "galeria", 
    "team", "locations", "faq", "media_archive", "homepage_cards")
} else {
  @($Collection)
}

$count = 0
foreach ($folder in $folders) {
  $path = "src/content/$folder"
  if (Test-Path $path) {
    Get-ChildItem -Path $path -Filter "*.md" -Recurse | ForEach-Object {
      $content = Get-Content $_.FullName -Raw
      if ($content -match "needs_review: true") {
        $content = $content -replace "needs_review: true", "needs_review: false"
        Set-Content -Path $_.FullName -Value $content -NoNewline
        Write-Host "✅ Zaakceptowano: $($_.Name)" -ForegroundColor Green
        $count++
      }
    }
    Get-ChildItem -Path $path -Filter "*.yml" -Recurse | ForEach-Object {
      $content = Get-Content $_.FullName -Raw
      if ($content -match "needs_review: true") {
        $content = $content -replace "needs_review: true", "needs_review: false"
        Set-Content -Path $_.FullName -Value $content -NoNewline
        Write-Host "✅ Zaakceptowano: $($_.Name)" -ForegroundColor Green
        $count++
      }
    }
  }
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "Zaakceptowano $count wpisów" -ForegroundColor Cyan
Write-Host "Następny krok: git add . && git commit -m 'review: accept all' && git push" -ForegroundColor Yellow
