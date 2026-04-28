# SKRYPT: Masowa edycja tagów, edycji i lokalizacji zdjęć galerii
# Użycie:
#   Dodaj tag:        .\scripts\gallery-tags.ps1 -Action add -Tag "hardest_hit_2026" -Category "HARDEST_HIT"
#   Usuń tag:         .\scripts\gallery-tags.ps1 -Action remove -Tag "stary_tag"
#   Zmień tag:        .\scripts\gallery-tags.ps1 -Action rename -Tag "nowy" -OldTag "stary"
#   Lista tagów:      .\scripts\gallery-tags.ps1 -Action list
#   Ustaw pole:       .\scripts\gallery-tags.ps1 -Action set-field -Field edition -Value "2026"
#   Ustaw z filtrem:  .\scripts\gallery-tags.ps1 -Action set-field -Field edition -Value "2026" -OldValue "2025"
#   Lista wartości:   .\scripts\gallery-tags.ps1 -Action list-fields -Field edition

param(
  [Parameter(Mandatory=$true)]
  [ValidateSet("add","remove","rename","list","set-field","list-fields")]
  [string]$Action,
  [string]$Tag = "",
  [string]$OldTag = "",
  [string]$Category = "",
  [string]$Edition = "",
  [string]$Field = "",
  [string]$Value = "",
  [string]$OldValue = ""
)

$galleryPath = "src/content/galeria"
$files = Get-ChildItem -Path $galleryPath -Filter "*.md" -Recurse
$count = 0

if ($Action -eq "list") {
  Write-Host "=== Wszystkie tagi w galerii ===" -ForegroundColor Cyan
  $allTags = @{}
  foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $tagMatches = [regex]::Matches($content, '  - ([^\n\r]+)')
    foreach ($m in $tagMatches) {
      $t = $m.Groups[1].Value.Trim()
      if ($allTags.ContainsKey($t)) { $allTags[$t]++ } else { $allTags[$t] = 1 }
    }
  }
  $allTags.GetEnumerator() | Sort-Object Value -Descending |
    ForEach-Object { Write-Host "  $($_.Value)x  $($_.Key)" }
  exit 0
}

if ($Action -eq "list-fields") {
  if (-not $Field) { Write-Host "❌ Podaj: -Field edition" -ForegroundColor Red; exit 1 }
  Write-Host "=== Wartości pola '$Field' ===" -ForegroundColor Cyan
  $allValues = @{}
  foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    if ($content -match "(?m)^$Field`: ['\`"]?([^'\`"\r\n]+)") {
      $val = $matches[1].Trim()
      if ($allValues.ContainsKey($val)) { $allValues[$val]++ } else { $allValues[$val] = 1 }
    }
  }
  $allValues.GetEnumerator() | Sort-Object Value -Descending |
    ForEach-Object { Write-Host "  $($_.Value)x  $($_.Key)" }
  exit 0
}

foreach ($file in $files) {
  $content = Get-Content $file.FullName -Raw
  if ($Category -and $content -notmatch "category: ['\`"]?$Category") { continue }
  if ($Edition -and $content -notmatch "edition: ['\`"]?$Edition") { continue }
  $changed = $false

  switch ($Action) {
    "add" {
      if ($content -notmatch "  - $Tag") {
        if ($content -match "tags:") {
          $content = $content -replace "(tags:\s*\r?\n)", "`$1  - $Tag`n"
        } else {
          $content = $content -replace "(---\s*$)", "tags:`n  - $Tag`n`$1"
        }
        $changed = $true
        Write-Host "✅ Dodano '$Tag': $($file.Name)" -ForegroundColor Green
      }
    }
    "remove" {
      if ($content -match "  - $Tag") {
        $content = $content -replace "  - $Tag\r?\n", ""
        $changed = $true
        Write-Host "🗑️ Usunięto '$Tag': $($file.Name)" -ForegroundColor Yellow
      }
    }
    "rename" {
      if ($content -match "  - $OldTag") {
        $content = $content -replace "  - $OldTag", "  - $Tag"
        $changed = $true
        Write-Host "✏️ '$OldTag' → '$Tag': $($file.Name)" -ForegroundColor Cyan
      }
    }
    "set-field" {
      if (-not $Field -or -not $Value) {
        Write-Host "❌ Podaj -Field i -Value" -ForegroundColor Red; exit 1
      }
      if ($OldValue -and $content -notmatch "(?m)^$Field`: ['\`"]?$OldValue") { continue }
      if ($content -match "(?m)^$Field`:") {
        $content = $content -replace "(?m)^($Field`: )['\`"]?[^'\`"\r\n]*['\`"]?", "`$1'$Value'"
        $changed = $true
        Write-Host "✏️ $Field → '$Value': $($file.Name)" -ForegroundColor Cyan
      } else {
        Write-Host "⚠️ Brak pola '$Field': $($file.Name)" -ForegroundColor Yellow
      }
    }
  }

  if ($changed) {
    Set-Content -Path $file.FullName -Value $content -NoNewline
    $count++
  }
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "Przetworzono: $count plików" -ForegroundColor Cyan
if ($count -gt 0) {
  Write-Host "Następny krok:" -ForegroundColor Yellow
  Write-Host "  git add . && git commit -m 'gallery: bulk update $Field' && git push"
}
