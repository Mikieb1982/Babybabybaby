# The Stork Name Drop - Baby Name Generator & Blog

## Description

The Stork Name Drop is a web application designed to help expectant parents and name enthusiasts find baby names. It features a name generator with various filtering options (gender, language/origin, length, style) and a blog section offering articles on naming trends, tips, and ideas.

## Features

* **Name Generator:**
    * Filter names by gender (Any, Boy, Girl, Neutral).
    * Filter names by language/origin (dynamically populated from data).
    * Filter names by starting letter.
    * Filter names by length category (Short, Medium, Long).
    * Filter names by style (Traditional to Unique) using a slider.
    * Displays name, meaning, origin notes, pronunciation, and popularity category.
* **Favorites:**
    * Save generated names to a favorites list (uses browser `localStorage`).
    * View, copy details of, and remove names from the favorites panel.
    * Clear all favorites.
* **Featured Name:** Displays a randomly selected name on the main page load.
* **Blog:**
    * Blog index page listing available articles with image teasers.
    * Search functionality to filter blog posts by title, summary, or tags.
    * Individual blog post pages with formatted content and images.
* **Responsive Design:** Uses Tailwind CSS for adaptability across different screen sizes.
* **Navigation:** Consistent header with logo and pinned hamburger menu for navigation.

## File Structure


.
├── index.html             # Main name generator page
├── blog.html              # Blog index page
├── aboutus.html           # About Us page
├── names.json             # (CRITICAL) Data file for names (needs population)
├── assets/
│   ├── logo.png           # Main site logo (large)
│   ├── stork.png          # Watermark logo for menu
│   ├── blog.png           # Blog title image
│   ├── middle.png         # Image for Middle Names blog post
│   ├── german2025.png     # Image for German Names blog post
│   ├── uniqueeng.png      # Image for Unique English Names blog post
│   ├── nickname.png       # Image for Nicknames blog post
│   └── song.png           # Image for Song Names blog post
└── blog/
├── middle.html        # Blog post: Choosing the Perfect Middle Name
├── german2025.html    # Blog post: Popular German Baby Names in 2025
├── uniqueeng.html     # Blog post: Unique & Uncommon English Name Ideas
├── nickname.html      # Blog post: Nicknames: Fun, Affectionate & Practical
└── song.html          # Blog post: What's in a Song Name? Musical Monikers

## Setup & Usage

1.  **Populate `names.json`:** This is the most crucial step. The `names.json` file needs to be filled with a large dataset of names following the established JSON structure (see `index.html` script for the expected fields: `id`, `name`, `language`, `gender`, `meaning`, `originNotes`, `pronunciation`, `popularity`, `lengthCategory`, `styleScore`).
2.  **File Placement:** Ensure all files and folders are placed according to the structure above. The `blog` folder and `assets` folder should be at the same root level as `index.html` and `blog.html`.
3.  **Web Server:** To enable the `fetch` request for `names.json` and avoid potential CORS issues, run these files from a local web server or deploy them to a web hosting provider. Simply opening `index.html` directly from your file system might prevent the data from loading.
4.  **Open `index.html`:** Access the `index.html` file through your web server in a browser.

## Technologies Used

* HTML5
* CSS3
    * Tailwind CSS Framework
* JavaScript (Vanilla)
    * DOM Manipulation
    * Event Handling
    * `localStorage` for Favorites
    * `fetch` API (for loading `names.json` - *currently using embedded sample data for preview*)

## Blog Posts

* Choosing the Perfect Middle Name (`blog/middle.html`)
* Popular German Baby Names in 2025 (`blog/german2025.html`)
* Unique & Uncommon English Name Ideas (`blog/uniqueeng.html`)
* Nicknames: Fun, Affectionate & Practical (`blog/nickname.html`)
* What's in a Song Name? Musical Monikers (`blog/song.html`)

## Potential Future Enhancements

* Implement "Related Names" and "Famous Namesakes" sections in results.
* Add more advanced filtering options (e.g., by meaning, syllables).
* Implement actual ad code in placeholders.
* Add social sharing buttons to blog posts.
* Create functional "Data Sources" page.
* Add sorting options to the Favorites panel.
* Improve accessibility further.
* Optimize performance for very large datasets.


