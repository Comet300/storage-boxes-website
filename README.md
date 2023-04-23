# storage-boxes-website

This project is meant to create an online presence for a local client, [boxe-depozitare.ro](https://boxe-depozitare.ro/) _<- live website_
Built with vanilla HTML, CSS, JS along with the [EJS](https://ejs.co/) template engine and a Node.js server.
One of my first projects written after learning the basics of web development.

#### Strenghts:
- Was fun to build :)
- Good UX and overall design.
- Solid web perfromances, though the addition of GTAG and GTM put a merk on it's lighthouse score.
![Lighthouse score - no GTM, GTag](https://raw.githubusercontent.com/Comet300/storage-boxes-website/media/performance.png)
#### Shortcomings:
- No bundler
- The design is responsive, but poorly implemented (sepparate files for mobile and desktop versions of the website. code is not DRY)
- The project expects little traffic. In scenarios of heavy load it would likely fail given the hard-wiring to the node server, single instance.
#### Potential improvements:
- add a bundler such as vite on the front-end to authomatize cache busting and minifying.
- add a bundler such as esbuild on the back-end to reduce server-side code size.
- refactor CSS to make code more DRY.
- merge desktop and mobile pages, same reason as above.

If I'd have to rewrite this project from the ground up, I would either opt for Qwik.js for writing it as a multi-page application or react.js/solid.js to make it a SPA.
