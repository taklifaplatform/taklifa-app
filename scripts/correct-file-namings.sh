dir="$1"

to_kebab_case() {
    # Convert string to lowercase
    local lowercase=$(echo "$1" | sed 's/\(.\)\([A-Z]\)/\1-\2/g' | tr '[:upper:]' '[:lower:]')

    # Replace spaces with dashes
    local kebab_case=$(echo "$lowercase" | tr '[:space:]' '-')

    # Remove non-alphanumeric characters except dashes
    kebab_case=$(echo "$kebab_case" | sed 's/[^a-z0-9-]//g')

    # Remove leading and trailing dashes
    kebab_case=$(echo "$kebab_case" | sed 's/^-//;s/-$//')

    echo "$kebab_case"
}

for f in "$dir"/*; do
  filename=$(basename "$f")
  file="${filename%.*}"
  extension=$(basename "$filename" | cut -d. -f2-)
  if [[ "$file" =~ ^[A-Z] ]]; then
    file=$(to_kebab_case "$file")
    mv "$dir"/$filename "$dir"/$file.$extension
  fi
done


