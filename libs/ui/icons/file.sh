#!/bin/bash

dir="./libs/ui/icons/src/assets/icons"
output_dir="./libs/ui/icons/src/assets/"
content_array=()
idx=0

# TODO: need logic to force icons naming to be kebab case


# Check if the file exists, and if so, delete it
if [ -f "$output_dir/icon-names.ts" ]; then
    rm "$output_dir"/icon-names.ts
    echo "Existing file 'icon-names.ts' has been deleted"
fi
if [ -f "$output_dir/index.ts" ]; then
    rm "$output_dir"/index.ts
    echo "Existing file 'index.ts' has been deleted"
fi

# Write the content to a file named "icon-names.ts"
start_file_icon_name="export const iconNames = ["
end_file_icon_name="];"
echo "$start_file_icon_name" > "$output_dir"/icon-names.ts

# Write the content to a file named "index.ts"
start_file_index="// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck"
echo "$start_file_index" > "$output_dir"/index.ts

for f in "$dir"/*; do
filename=$(basename "$f")
file="${filename%.*}"

# convert fileName '-' to '_'
file_to_icon_name=$(echo "$file" | sed 's/-\([a-zA-Z]\)/\_\1/g')
# Write the content to a file named "icon-names.ts"
echo "  '$file_to_icon_name'," >> "$output_dir"/icon-names.ts


# Change the first letter after a hyphen '-' to uppercase
for (( i=0; i<${#file}; i++ )); do
    letter="${file:i:1}"
    if [[ $letter = "-" ]]; then
       file=${file:0:$i}"$(tr '[:lower:]' '[:upper:]' <<< ${file:$i+1:1})${file:$i+2}"
    fi
done

#Change the first letter to uppercase
foo="$(tr '[:lower:]' '[:upper:]' <<< ${file:0:1})${file:1}"
# Write the content to a file named "index.ts"
echo "import $foo from './icons/$filename'; " >> "$output_dir"/index.ts

# Save each word of the content in an array
content_array[idx]="$foo"
idx=$((idx+1))

done
# Print the array elements

echo "

export {" >> "$output_dir"/index.ts
for element in "${content_array[@]}"; do
    echo "  $element," >> "$output_dir"/index.ts
done
echo "}" >> "$output_dir"/index.ts


echo "$end_file_icon_name" >> "$output_dir"/icon-names.ts
echo "Data has been written to icon-names.ts"
echo "Data has been written to index.ts"
