#!/bin/bash
# Masowa akceptacja wszystkich wpisów
COLLECTION=${1:-"all"}

if [ "$COLLECTION" = "all" ]; then
  FOLDERS="aktualnosci instruktorzy partnerzy program galeria team locations faq media_archive homepage_cards"
else
  FOLDERS=$COLLECTION
fi

COUNT=0
for folder in $FOLDERS; do
  if [ -d "src/content/$folder" ]; then
    while IFS= read -r -d '' f; do
      if grep -q "needs_review: true" "$f"; then
        sed -i 's/needs_review: true/needs_review: false/g' "$f"
        echo "✅ Zaakceptowano: $f"
        COUNT=$((COUNT+1))
      fi
    done < <(find "src/content/$folder" \( -name "*.md" -o -name "*.yml" \) -print0)
  fi
done
echo "Zaakceptowano $COUNT wpisów"
