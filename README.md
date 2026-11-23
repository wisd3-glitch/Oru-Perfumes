# Oru Perfumes — storefront prototype

## Open the prototype
Open `index.html` in a modern browser (keep all files in the same folder; `product.html` needs `shared.js` and `product.js`). Internet access is required for Bootstrap, Google Fonts, Swiper/Isotope CDNs and the remote Unsplash image URLs.

Open `admin.html` for the seller dashboard demo.

## Included
- Responsive storefront and mobile navigation
- Bootstrap 5, HTML5, CSS3 and Google Fonts (Playfair Display for titles, Bodoni Moda for product names and the wordmark, Jost for body)
- Isotope-powered fragrance family filters, search and price sorting\n- Swiper-powered responsive journal carousel\n- Demo contact/enquiry form
- Product quick-view modal, saved wishlist (with header count and a saved-only view) and localStorage bag with quantity controls
- Contact/newsletter interaction (demo response only)
- Seller dashboard with sample metrics, product add/remove and order status selectors

## Important prototype limitations
This is a front-end case-study prototype. It does not include a backend, secure admin login, real inventory, real checkout, payment gateway, shipping integration, live email subscription, or verified stock/authenticity claims. Product names, houses, prices, inventory, orders and customer names are fictional sample data. Replace them with verified business information before launch.

## Image sourcing
The product/editorial images are remote Unsplash CDN images. They are visual placeholders, not product photography and not evidence that Oru stocks any pictured product. Check each image's current Unsplash page and license/attribution requirements before production use. Replace with authentic product photography when available.

## Files
- `index.html` + `app.js`: home page, shop grid, filters, quick view.
- `product.html` + `product.js`: product detail page, opened as `product.html?id=santal-no-04` (links come from the shop cards and quick view).
- `cart.html` + `cart.js`: full bag page with quantities, coupon, delivery choice and order summary.
- `checkout.html` + `checkout.js`: contact and delivery form (all 36 states and the FCT), payment choice (demo), order summary, validation.
- `order-received.html` + `order.js`: confirmation for the latest order.
- `brands.html` + `brands.js`: fragrance houses, each with its fragrances.
- `about.html`, `faq.html` + `page.js`: the Oru standard, how ordering works, and a four-group help centre.
- `contact.html` + `contact.js`: enquiry form with validation (demo, nothing is sent). All contact details are placeholders.
- `privacy.html`, `returns.html`, `terms.html` (use `page.js`): sample policy pages linked from the footer, checkout and FAQ. They are templates with [bracketed] placeholders and must be reviewed by a lawyer before launch.
- `journal.html`, `article.html` + `articles.js`, `journal.js`, `article.js`: six sample stories with a category filter, article pages (`article.html?slug=...`), mentioned fragrances and previous/next links.
- `login.html`, `account.html` + `login.js`, `account.js`: demo sign-up, login and account (dashboard, orders, addresses, account details, wishlist, log out). Nothing is verified and passwords are never stored or checked. A saved address pre-fills checkout.
- `shared.js`: product data, safe storage, bag, wishlist, delivery, coupon and order logic, used by every page.
- `Oru_Perfumes_Preview.html`: single-file preview of the home page only. Product links need the full folder.
- Product gallery thumbnails are crops of one placeholder image, not separate photos. Reviews are empty on purpose: no invented reviews.

## Script notes
- Bag and wishlist are saved by product id, and old saves that used list positions are converted automatically.
- Saved data that is corrupted or storage that is blocked no longer stops the page from loading.
- Family filter, search text and the saved-only view work together. Search matches product and house names only, ignoring accents.
- Not done yet: delivery costs, a real checkout, and a link between the seller dashboard and the storefront.

## Checkout notes (demo)
- Sample delivery rates: standard ₦5,000 (free above ₦250,000, matching the announcement bar) and express ₦12,000. Replace with real rates.
- Demo coupon: `DEMO10` gives 10% off. Remove before launch.
- Payment options are placeholders. No payment is taken. A real launch needs a payment provider (for example Paystack) and server-side payment verification.
- Only the latest order is kept, in this browser's storage, so the confirmation page can show it. A real shop needs a server and a database for orders.
- The seller dashboard (`admin.html`) is still separate and does not see these orders.

## Demo account notes
- There is no server. One demo profile (name, email, phone, address) is kept in this browser; signing up again replaces it.
- A real shop needs real authentication (hashed passwords or a login provider), email verification, password reset and a database. Do not collect real passwords with this demo.
- Customer reviews are intentionally not built yet.

## Deploying to GitHub and Vercel
This is a plain static site: no build step, no npm install, no environment variables.
1. Put every file from this folder at the **root** of a GitHub repository (so `index.html` sits at the top level, not inside a sub-folder).
2. In Vercel choose **Add New > Project**, import the repository, set **Framework Preset** to **Other**, leave Build Command and Output Directory empty, and click **Deploy**.
3. `vercel.json` adds basic security headers. `404.html` is shown for unknown URLs. `robots.txt` keeps the cart, checkout, account, login and seller demo pages out of search results.

Notes:
- The pages load Bootstrap, Swiper, Isotope and Google Fonts from CDNs, and the product photos from Unsplash. They need an internet connection and are placeholders. Replace the photos before launch and consider hosting the libraries yourself.
- `admin.html` is a public demo page with no login. Delete it, or its footer link, if you do not want visitors to see it.
- After you have a domain, add a `sitemap.xml` and an Open Graph image if you want better link previews.

## Quick-view popup
The product popup on the home page now fits every screen size: it scrolls inside itself on short screens, the close button stays in place, and the image scales with the screen.
