# Magento 1 Gulpfile Boilerplate
A gulpfile boilerplate for Magento 1.x projects

## Getting Started

**Setting the correct routes**
- magento.name : Define the project name
- magento.pkg : Define your package
- magento.theme : Define your theme
- magento.domain : Define your domain
- magento.skin : Define the skin route
- magento.src : Define de SASS route folder
- magento.dest : Define the destination CSS folder
- magento.js : Define the JS route folder

## Gulp Tasks

1. Default: "gulp"
Compile and minify all the SASS files
2. Build: "gulp build"
Compile, minify all de SASS files and minify the JS using requireJS Optimizer
3. SASS compilation: "gulp sass"
Compile the SASS files
4. SASS compile and sync "gulp watch"
Compile and reload browser styles using browserSync. Pay attention to the magento.domain var.
5. SASS minify "gulp minify"
Minify all de CSS
6. JS minify "gulp scripts"
Minify all the .js scripts using requireJS Optimizer
