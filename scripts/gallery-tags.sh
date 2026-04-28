#!/bin/bash
# Użycie:
#   ./scripts/gallery-tags.sh add hardest_hit_2026
#   ./scripts/gallery-tags.sh remove stary_tag
#   ./scripts/gallery-tags.sh rename stary_tag nowy_tag
#   ./scripts/gallery-tags.sh list
#   ./scripts/gallery-tags.sh set-field edition 2026
#   ./scripts/gallery-tags.sh list-fields edition

ACTION=$1
GALLERY="src/content/galeria"

case "$ACTION" in
  list)
    grep -rh "  - " "$GALLERY"/*.md 2>/dev/null | sed 's/  - //' | sort | uniq -c | sort -rn
    ;;
  list-fields)
    FIELD=$2
    grep -rh "^$FIELD:" "$GALLERY"/*.md 2>/dev/null | sed "s/$FIELD: //" | sort | uniq -c | sort -rn
    ;;
  add)
    TAG=$2
    find "$GALLERY" -name "*.md" | while read f; do
      if ! grep -q "  - $TAG" "$f"; then
        if grep -q "^tags:" "$f"; then
          sed -i "/^tags:/a\\  - $TAG" "$f"
        else
          printf "\ntags:\n  - $TAG\n" >> "$f"
        fi
        echo "✅ $f"
      fi
    done
    ;;
  remove)
    TAG=$2
    find "$GALLERY" -name "*.md" | while read f; do
      sed -i "/  - $TAG$/d" "$f" && echo "🗑️ $f"
    done
    ;;
  rename)
    OLD=$2; NEW=$3
    find "$GALLERY" -name "*.md" | while read f; do
      sed -i "s/  - $OLD$/  - $NEW/" "$f" && echo "✏️ $f"
    done
    ;;
  set-field)
    FIELD=$2; VALUE=$3
    find "$GALLERY" -name "*.md" | while read f; do
      if grep -q "^$FIELD:" "$f"; then
        sed -i "s/^$FIELD:.*/$FIELD: '$VALUE'/" "$f"
        echo "✏️ $FIELD → $VALUE: $f"
      fi
    done
    ;;
esac
echo "git add . && git commit -m 'gallery: bulk update' && git push"
