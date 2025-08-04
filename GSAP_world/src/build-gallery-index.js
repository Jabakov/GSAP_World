// build-gallery-index.js
const fs = require('fs');
const path = require('path');

// Define the countries you want to scan
const countries = ['USA', 'Brazil', 'Europe', 'Japan', 'Korea'];
const galleryImages = {};

// Get the correct path to the public directory (one level up from src)
const publicDir = path.join(__dirname, '..', 'public');

countries.forEach(country => {
  const folderPath = path.join(publicDir, 'images', country);
  
  try {
    // Check if directory exists before trying to read it
    if (fs.existsSync(folderPath)) {
      const files = fs.readdirSync(folderPath);
      // Filter for image files only and ignore hidden files that start with .
      const imageFiles = files.filter(file => 
        /\.(jpg|jpeg|png|gif)$/i.test(file) && !file.startsWith('.')
      );
      
      // Create array of paths to the images
      galleryImages[country] = imageFiles.map(file => 
        `/images/${country}/${file}`
      );
      console.log(`Found ${galleryImages[country].length} images for ${country}`);
    } else {
      console.warn(`Directory not found: ${folderPath}`);
      // Create the directory for future use
      try {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log(`Created directory: ${folderPath}`);
      } catch (mkdirError) {
        console.error(`Failed to create directory: ${folderPath}`, mkdirError);
      }
      galleryImages[country] = [];
    }
  } catch (error) {
    console.error(`Error reading ${country} folder:`, error);
    galleryImages[country] = [];
  }
});

// Write the result to a JSON file in the public directory
const outputPath = path.join(publicDir, 'gallery-index.json');
fs.writeFileSync(
  outputPath,
  JSON.stringify(galleryImages, null, 2)
);

console.log(`Gallery index generated successfully at ${outputPath}`);