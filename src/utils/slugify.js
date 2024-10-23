const slugify = (text) =>
    text
      .toString()
      .normalize("NFD") // Normalize Unicode characters (e.g., é → e)
      .replace(/[\u0300-\u036f]/g, "") // Remove accents/diacritics
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // Remove invalid characters
      .replace(/\s+/g, "-") // Replace spaces with dashes
      .replace(/-+/g, "-") // Replace multiple dashes with a single dash
      .replace(/^-|-$/g, ""); // Remove leading or trailing dashes
  
  module.exports = slugify;
  