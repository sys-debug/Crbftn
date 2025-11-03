# 🖼️ CRBFTN Website Image Requirements - WebP Migration Guide

**Total Image References Found: 94 instances across 8 files**
**Total Unique Images Needed: 75 (48 original + 26 creative items + 1 logo)**
**Target Format: WebP (.webp) for products/gallery, PNG for logo**
**Status: Ready for custom image creation and WebP conversion**
**Updates: Removed underwear, added more jeans and jackets collection, integrated custom logo**

---

## 🏷️ **BRAND LOGO** (1 image needed)

### **CRBFTN Custom Logo**
- **Current:** `assets/images/logo.png`
- **Format:** PNG (to maintain transparency and crisp edges)
- **Usage:** Navigation headers, footers, email templates
- **Files Using Logo:** 
  - components/navigation.html
  - components/navigation-inline.html
  - cart.html (header & footer)
  - All main pages through navigation components
- **Specifications:** High resolution, transparent background, works on both light and dark backgrounds
- **Footer Version:** Inverted/white version for dark backgrounds (using CSS filter)

---

## 📋 **HERO SECTION BACKGROUNDS** (5 images needed)

### 1. **About Page Hero**
- **Current:** `assets/images/hero/hero-about.jpg`
- **New WebP:** `assets/images/hero/hero-about.webp`
- **Page:** about.html (line 29)
- **Purpose:** Main hero background for About page
- **Content Needed:** CRBFTN brand story, Makhado heritage scene
- **Style:** Professional, heritage-focused, South African landscape

### 2. **Homepage Hero**
- **Current:** `assets/images/hero/hero-main.jpg`
- **New WebP:** `assets/images/hero/hero-main.webp`
- **Page:** Index.html (line 29)
- **Purpose:** Main homepage hero background
- **Content Needed:** Premium streetwear lifestyle, urban South African setting
- **Style:** Dynamic, modern, aspirational

### 3. **Contact Page Hero Background**
- **Current:** `assets/images/products/hoodie-classic.jpg` (reused)
- **New WebP:** `assets/images/hero/contact-hero.webp`
- **Page:** contact.html (line 29)
- **Purpose:** Contact page hero background
- **Content Needed:** Approachable team/studio environment, Makhado location
- **Style:** Welcoming, professional, community-focused

### 4. **Products Page Hero Background**
- **Current:** `assets/images/products/sneakers-limited.jpg` (reused)
- **New WebP:** `assets/images/hero/products-hero.webp`
- **Page:** products.html (line 29)
- **Purpose:** Products page hero background
- **Content Needed:** Premium product showcase, multiple CRBFTN items
- **Style:** Clean, product-focused, premium quality

### 5. **Gallery Page Hero Background**
- **Current:** `assets/images/products/jeans-premium.jpg` (reused)
- **New WebP:** `assets/images/hero/gallery-hero.webp`
- **Page:** gallery.html (line 29)
- **Purpose:** Gallery page hero background
- **Content Needed:** Visual storytelling, behind-the-scenes CRBFTN
- **Style:** Creative, artistic, brand narrative

### 6. **Reviews Page Hero Background**
- **Current:** `assets/images/products/t-shirt-premium.jpg` (reused)
- **New WebP:** `assets/images/hero/reviews-hero.webp`
- **Page:** reviews.html (line 29)
- **Purpose:** Reviews page hero background
- **Content Needed:** Happy customers wearing CRBFTN, testimonial scene
- **Style:** Authentic, customer-focused, social proof

---

## 👕 **PRODUCT IMAGES** (35 unique products need individual images)

### **HOODIES (5 products)**
1. **Premium Hoodie** - `assets/images/products/premium-hoodie.webp`
   - Current: `hoodie-classic.jpg` (Used 6x)
   - Product: Classic premium hoodie, R899
   - Style: Professional product shot, CRBFTN branding visible

2. **Designer Hoodie** - `assets/images/products/designer-hoodie.webp`
   - Current: `sweatshirt-cozy.jpg` (Used 3x)
   - Product: Limited edition designer hoodie, R1199
   - Style: High-end fashion shot, unique patterns

3. **Oversized Hoodie** - `assets/images/products/oversized-hoodie.webp`
   - Current: `hoodie-classic.jpg` (reused)
   - Product: Trendy oversized hoodie, R1099
   - Style: Modern fit showcase, relaxed styling

4. **Zip-Up Hoodie** - `assets/images/products/zip-up-hoodie.webp`
   - Current: `jacket-streetwear.jpg` (Used 4x)
   - Product: Versatile zip-up hoodie, R949
   - Style: Active wear focused, layering demonstration

5. **Cropped Hoodie** - `assets/images/products/cropped-hoodie.webp`
   - Current: `sweatshirt-cozy.jpg` (reused)
   - Product: Stylish cropped hoodie, R799
   - Style: Contemporary cut, fashion-forward

### **T-SHIRTS (5 products)**
6. **Classic Tee** - `assets/images/products/classic-tee.webp`
   - Current: `t-shirt-premium.jpg` (Used 8x)
   - Product: Premium cotton t-shirt, R499
   - Style: Essential wardrobe staple, CRBFTN logo

7. **Graphic Tee** - `assets/images/products/graphic-tee.webp`
   - Current: `polo-classic.jpg` (reused)
   - Product: Bold graphic t-shirt, R549
   - Style: Unique CRBFTN artwork showcase

8. **Vintage Tee** - `assets/images/products/vintage-tee.webp`
   - Current: `t-shirt-premium.jpg` (reused)
   - Product: Vintage-inspired t-shirt, R599
   - Style: Distressed details, soft cotton blend

9. **Long Sleeve Tee** - `assets/images/products/long-sleeve-tee.webp`
   - Current: `tank-top-athletic.jpg` (reused)
   - Product: Comfortable long sleeve tee, R649
   - Style: Layering piece, casual wear

10. **Polo Shirt** - `assets/images/products/polo-shirt.webp`
    - Current: `polo-classic.jpg` (Used 4x)
    - Product: Classic polo shirt, R749
    - Style: Modern fit, premium cotton

### **PANTS (5 products)**
11. **Classic Jeans** - `assets/images/products/classic-jeans.webp`
    - Current: `jeans-premium.jpg` (Used 6x)
    - Product: Timeless denim jeans, R1299
    - Style: Perfect fit showcase, durability focus

12. **Cargo Pants** - `assets/images/products/cargo-pants.webp`
    - Current: `jeans-premium.jpg` (reused)
    - Product: Functional cargo pants, R999
    - Style: Multiple pockets, durable fabric

13. **Slim Fit Chinos** - `assets/images/products/slim-chinos.webp`
    - Current: `jeans-premium.jpg` (reused)
    - Product: Elegant slim fit chinos, R849
    - Style: Semi-formal occasions, versatile

14. **Track Pants** - `assets/images/products/track-pants.webp`
    - Current: `shorts-summer.jpg` (Used 2x)
    - Product: Comfortable track pants, R699
    - Style: Sports and leisure focused

15. **Wide Leg Jeans** - `assets/images/products/wide-leg-jeans.webp`
    - Current: `jeans-premium.jpg` (reused)
    - Product: Trendy wide leg jeans, R1199
    - Style: Vintage-inspired, modern comfort

### **SHOES (5 products)**
16. **Urban Sneakers** - `assets/images/products/urban-sneakers.webp`
    - Current: `sneakers-limited.jpg` (Used 7x)
    - Product: Stylish urban sneakers, R1599
    - Style: Street style, comfort focus

17. **High-Top Sneakers** - `assets/images/products/high-top-sneakers.webp`
    - Current: `sneakers-limited.jpg` (reused)
    - Product: Classic high-top sneakers, R1799
    - Style: Premium leather, superior support

18. **Running Shoes** - `assets/images/products/running-shoes.webp`
    - Current: `sneakers-limited.jpg` (reused)
    - Product: Performance running shoes, R1899
    - Style: Advanced cushioning, breathable

19. **Canvas Sneakers** - `assets/images/products/canvas-sneakers.webp`
    - Current: `sneakers-limited.jpg` (reused)
    - Product: Lightweight canvas sneakers, R899
    - Style: Everyday casual wear

20. **Slip-On Shoes** - `assets/images/products/slip-on-shoes.webp`
    - Current: `sneakers-limited.jpg` (reused)
    - Product: Convenient slip-on shoes, R1299
    - Style: Elastic panels, comfortable sole

### **ACCESSORIES (15 products)**

#### **Hats (5 items)**
21. **Street Cap** - `assets/images/products/street-cap.webp`
    - Current: `cap-urban.jpg` (Used 8x)
    - Product: Classic street cap, R399
    - Style: Adjustable fit, premium materials

22. **Snapback Cap** - `assets/images/products/snapback-cap.webp`
    - Current: `cap-urban.jpg` (reused)
    - Product: Trendy snapback cap, R449
    - Style: Flat brim, adjustable closure

23. **Bucket Hat** - `assets/images/products/bucket-hat.webp`
    - Current: `cap-urban.jpg` (reused)
    - Product: Stylish bucket hat, R349
    - Style: Sun protection, street fashion

24. **Beanie** - `assets/images/products/beanie.webp`
    - Current: `cap-urban.jpg` (reused)
    - Product: Warm knitted beanie, R299
    - Style: Cold weather, casual styling

25. **Dad Hat** - `assets/images/products/dad-hat.webp`
    - Current: `cap-urban.jpg` (reused)
    - Product: Relaxed dad hat, R379
    - Style: Curved brim, unstructured fit

#### **Socks (5 items)**
26. **Comfort Socks** - `assets/images/products/comfort-socks.webp`
    - Current: `accessories-combo.jpg` (Used 8x)
    - Product: Ultra-comfortable socks, R199
    - Style: Moisture-wicking technology

27. **Athletic Socks** - `assets/images/products/athletic-socks.webp`
    - Current: `accessories-combo.jpg` (reused)
    - Product: Performance athletic socks, R249
    - Style: Cushioned sole, arch support

28. **Crew Socks** - `assets/images/products/crew-socks.webp`
    - Current: `accessories-combo.jpg` (reused)
    - Product: Classic crew socks, R179
    - Style: Premium cotton blend

29. **Ankle Socks** - `assets/images/products/ankle-socks.webp`
    - Current: `accessories-combo.jpg` (reused)
    - Product: Low-cut ankle socks, R159
    - Style: Perfect for sneakers

30. **Wool Socks** - `assets/images/products/wool-socks.webp`
    - Current: `accessories-combo.jpg` (reused)
    - Product: Premium wool socks, R299
    - Style: Warmth, odor resistance

#### **Additional Jeans Collection (5 items)**
31. **Dark Wash CRBFTN Jeans** - `assets/images/products/dark-wash-crbftn-jeans.webp`
    - Current: `jeans-premium.jpg` (reused)
    - Product: Deep indigo dark wash jeans, R1399
    - Style: CRBFTN signature stitching, premium denim

32. **Distressed CRBFTN Jeans** - `assets/images/products/distressed-crbftn-jeans.webp`
    - Current: `jeans-premium.jpg` (reused)
    - Product: Carefully distressed jeans, R1499
    - Style: Authentic wear patterns, CRBFTN patches

33. **Slim Black CRBFTN Jeans** - `assets/images/products/slim-black-crbftn-jeans.webp`
    - Current: `jeans-premium.jpg` (reused)
    - Product: Sleek black jeans, R1449
    - Style: Slim fit, subtle CRBFTN logo embroidery

34. **Vintage Blue CRBFTN Jeans** - `assets/images/products/vintage-blue-crbftn-jeans.webp`
    - Current: `jeans-premium.jpg` (reused)
    - Product: Classic vintage blue wash, R1349
    - Style: Faded effects, CRBFTN heritage styling

35. **Raw Denim CRBFTN Jeans** - `assets/images/products/raw-denim-crbftn-jeans.webp`
    - Current: `jeans-premium.jpg` (reused)
    - Product: Premium raw denim jeans, R1599
    - Style: Ages beautifully, CRBFTN craftsmanship

---

## 🆕 **NEW CREATIVE CRBFTN CLOTHING COLLECTION** (26 new items needed)

### **Creative Hoodies (4 new items)**
36. **Fresh New Sea Hoodie** - `assets/images/products/fresh-new-sea-hoodie.webp`
    - Current: `hoodie-classic.jpg` (reused)
    - Product: Ocean-inspired hoodie, R1299 (Featured)
    - Style: Wave graphics, marine blue accents, premium ocean theme

37. **Hip Hop Hoodie** - `assets/images/products/hip-hop-hoodie.webp`
    - Current: `sweatshirt-cozy.jpg` (reused)
    - Product: Street rhythm hoodie, R1199
    - Style: Bold typography, urban-inspired design elements

38. **CRBFTN Culture Hoodie** - `assets/images/products/crbftn-culture-hoodie.webp`
    - Current: `hoodie-classic.jpg` (reused)
    - Product: Heritage celebration hoodie, R1399
    - Style: Traditional patterns reimagined, South African heritage

39. **Midnight CRBFTN Hoodie** - `assets/images/products/midnight-crbftn-hoodie.webp`
    - Current: `jacket-streetwear.jpg` (reused)
    - Product: Sleek black hoodie, R1249
    - Style: Glow-in-the-dark logo, constellation print

### **Creative Jackets (6 new items)**
40. **CRBFTN Bomber Jacket** - `assets/images/products/crbftn-bomber-jacket.webp`
    - Current: `jacket-streetwear.jpg` (reused)
    - Product: Premium bomber jacket, R1799 (Featured)
    - Style: CRBFTN embroidered patches, satin lining

41. **Urban Wind Breaker** - `assets/images/products/urban-wind-breaker.webp`
    - Current: `jacket-streetwear.jpg` (reused)
    - Product: Lightweight windbreaker, R1299
    - Style: City adventures ready, CRBFTN branding

42. **Heritage Denim Jacket** - `assets/images/products/heritage-denim-jacket.webp`
    - Current: `jeans-premium.jpg` (reused)
    - Product: Classic denim jacket, R1699
    - Style: South African heritage details, CRBFTN styling

43. **CRBFTN Track Jacket** - `assets/images/products/crbftn-track-jacket.webp`
    - Current: `jacket-streetwear.jpg` (reused)
    - Product: Athletic track jacket, R1449
    - Style: Racing stripes, moisture-wicking technology

44. **Street King Leather Jacket** - `assets/images/products/street-king-leather-jacket.webp`
    - Current: `jacket-streetwear.jpg` (reused)
    - Product: Premium leather jacket, R2299
    - Style: CRBFTN hardware, urban street styling

45. **CRBFTN Varsity Jacket** - `assets/images/products/crbftn-varsity-jacket.webp`
    - Current: `jacket-streetwear.jpg` (reused)
    - Product: Classic varsity jacket, R1599
    - Style: CRBFTN lettering, contrast sleeves

### **Creative Jeans & Pants (4 new items)**
46. **Baggy CRBFTN Jeans** - `assets/images/products/baggy-crbftn-jeans.webp`
    - Current: `jeans-premium.jpg` (reused)
    - Product: Relaxed fit jeans, R1499 (Featured)
    - Style: Embroidered CRBFTN patches, vintage wash finish

47. **Classic CRBFTN Jeans** - `assets/images/products/classic-crbftn-jeans.webp`
    - Current: `jeans-premium.jpg` (reused)
    - Product: Timeless straight-leg jeans, R1399
    - Style: Subtle CRBFTN branding, premium denim construction

48. **Street King Cargo Pants** - `assets/images/products/street-king-cargo-pants.webp`
    - Current: `shorts-summer.jpg` (reused)
    - Product: Multi-pocket cargo pants, R1199
    - Style: Urban exploration inspired, street culture vibes

49. **CRBFTN Track Pants** - `assets/images/products/crbftn-track-pants.webp`
    - Current: `jeans-premium.jpg` (reused)
    - Product: Athletic track pants, R899
    - Style: Racing stripes, CRBFTN logo down the leg

### **Creative T-Shirts (4 new items)**
50. **CRBFTN Vintage Tee** - `assets/images/products/crbftn-vintage-tee.webp`
    - Current: `t-shirt-premium.jpg` (reused)
    - Product: Retro-inspired tee, R649
    - Style: Faded CRBFTN logo, soft vintage wash

51. **Limpopo Pride Tee** - `assets/images/products/limpopo-pride-tee.webp`
    - Current: `polo-classic.jpg` (reused)
    - Product: Heritage celebration tee, R599
    - Style: Limpopo province graphics, CRBFTN branding

52. **CRBFTN Artist Tee** - `assets/images/products/crbftn-artist-tee.webp`
    - Current: `t-shirt-premium.jpg` (reused)
    - Product: Limited edition artist collaboration, R699
    - Style: Unique CRBFTN design, local artist partnership

53. **Street Philosophy Tee** - `assets/images/products/street-philosophy-tee.webp`
    - Current: `tank-top-athletic.jpg` (reused)
    - Product: Thought-provoking graphic tee, R549
    - Style: Inspirational quotes, CRBFTN street wisdom

### **Creative Shoes (3 new items)**
54. **CRBFTN Air Classics** - `assets/images/products/crbftn-air-classics.webp`
    - Current: `sneakers-limited.jpg` (reused)
    - Product: Premium sneakers, R1999 (Featured)
    - Style: CRBFTN colorway, signature comfort technology

55. **Street Walker CRBFTN** - `assets/images/products/street-walker-crbftn.webp`
    - Current: `sneakers-limited.jpg` (reused)
    - Product: Durable street shoes, R1799
    - Style: Urban adventures ready, CRBFTN sole design

56. **CRBFTN High Tops** - `assets/images/products/crbftn-high-tops.webp`
    - Current: `sneakers-limited.jpg` (reused)
    - Product: Classic high-top silhouette, R1899
    - Style: CRBFTN ankle patches, premium materials

### **Creative Accessories (5 new items)**
57. **CRBFTN Crown Cap** - `assets/images/products/crbftn-crown-cap.webp`
    - Current: `cap-urban.jpg` (reused)
    - Product: Structured cap, R499
    - Style: Embroidered CRBFTN crown logo, premium fit

58. **Heritage CRBFTN Bucket Hat** - `assets/images/products/heritage-crbftn-bucket-hat.webp`
    - Current: `cap-urban.jpg` (reused)
### **Creative Accessories (5 new items)**
57. **CRBFTN Crown Cap** - `assets/images/products/crbftn-crown-cap.webp`
    - Current: `cap-urban.jpg` (reused)
    - Product: Structured cap, R499
    - Style: Embroidered CRBFTN crown logo, premium fit

58. **Heritage CRBFTN Bucket Hat** - `assets/images/products/heritage-crbftn-bucket-hat.webp`
    - Current: `cap-urban.jpg` (reused)
    - Product: Traditional patterns bucket hat, R449
    - Style: Traditional patterns meet modern streetwear

59. **CRBFTN Signature Socks** - `assets/images/products/crbftn-signature-socks.webp`
    - Current: `accessories-combo.jpg` (reused)
    - Product: Premium crew socks, R299
    - Style: CRBFTN logo pattern, superior comfort

60. **CRBFTN Explorer Backpack** - `assets/images/products/crbftn-explorer-backpack.webp`
    - Current: `accessories-combo.jpg` (reused)
    - Product: Urban exploration backpack, R899
    - Style: CRBFTN branding, multiple compartments

61. **CRBFTN Street Belt** - `assets/images/products/crbftn-street-belt.webp`
    - Current: `accessories-combo.jpg` (reused)
    - Product: Adjustable street belt, R399
    - Style: Custom CRBFTN buckle, durable construction

---

## 🖼️ **GALLERY IMAGES** (7 images needed)

36. **Collection Showcase 1** - `assets/images/gallery/collection-1.webp`
    - Current: `collection-1.jpg` (Used 2x)
    - Purpose: "Autumn Collection 2024" / "Street Style Collection"
    - Style: Product collection showcase

37. **Collection Showcase 2** - `assets/images/gallery/collection-2.webp`
    - Current: `collection-2.jpg` (Used 1x)
    - Purpose: "Summer Essentials"
    - Style: Seasonal product display

38. **Lifestyle Photo 1** - `assets/images/gallery/lifestyle-1.webp`
    - Current: `lifestyle-1.jpg` (Used 4x)
    - Purpose: "Urban Lifestyle" / "Perfect Fit" / Mountains / Heritage
    - Style: Lifestyle and brand content

39. **Lifestyle Photo 2** - `assets/images/gallery/lifestyle-2.webp`
    - Current: `lifestyle-2.jpg` (Used 2x)
    - Purpose: "Launch Event" / Community
    - Style: Event and community focus

40. **Lifestyle Photo 3** - `assets/images/gallery/lifestyle-3.webp`
    - Current: `lifestyle-3.jpg` (Used 2x)
    - Purpose: "Street Culture" / Community
    - Style: Street culture and community

41. **Behind Scenes 1** - `assets/images/gallery/behind-scenes-1.webp`
    - Current: `behind-scenes-1.jpg` (Used 1x)
    - Purpose: "Design Process"
    - Style: Behind-the-scenes content

42. **Behind Scenes 2** - `assets/images/gallery/behind-scenes-2.webp`
    - Current: `behind-scenes-2.jpg` (Used 1x)
    - Purpose: "Production Flow"
    - Style: Production and workflow

---

## 📱 **ADDITIONAL CONTEXT IMAGES** (4 images)

43. **Hero About Secondary** - `assets/images/hero/hero-secondary.webp`
    - Current: `hero-secondary.jpg` (Not currently used)
    - Purpose: Available for secondary pages
    - Style: Flexible hero background

44. **Model Photo 1** - `assets/images/lifestyle/model-1.webp`
    - Current: `model-1.jpg` (Not currently used)
    - Purpose: Model/lifestyle photography
    - Style: Professional model shots

45. **Model Photo 2** - `assets/images/lifestyle/model-2.webp`
    - Current: `model-2.jpg` (Not currently used)
    - Purpose: Model/lifestyle photography
    - Style: Professional model shots

46. **Street Style 1** - `assets/images/lifestyle/street-style-1.webp`
    - Current: `street-style-1.jpg` (Not currently used)
    - Purpose: Street style photography
    - Style: Authentic street fashion

47. **Street Style 2** - `assets/images/lifestyle/street-style-2.webp`
    - Current: `street-style-2.jpg` (Not currently used)
    - Purpose: Street style photography
    - Style: Authentic street fashion

---

## 🔧 **MODAL/COMPONENT IMAGES** (1 image)

48. **Product Modal Default** - `assets/images/products/product-modal-default.webp`
    - Current: `t-shirt-premium.jpg` (Used in modals.html)
    - Purpose: Default product modal image
    - Style: Generic product placeholder

---

## 📊 **SUMMARY STATISTICS**

- **Total Images Needed:** 48 unique WebP files
- **Hero Backgrounds:** 6 images
- **Product Images:** 35 unique product photos
- **Gallery Images:** 7 lifestyle/brand images
- **Additional Context:** 4 model/street style images
- **Component Images:** 1 modal default

**Current Reuse Issues:**
- `hoodie-classic.jpg` used 6 times for different products
- `t-shirt-premium.jpg` used 8 times for different products
- `sneakers-limited.jpg` used 7 times for different products
- `cap-urban.jpg` used 8 times for different products
- `accessories-combo.jpg` used 8 times for different products

**WebP Benefits:**
- ~25-35% smaller file sizes
- Better compression quality
- Faster page load times
- Modern web standard support

---

## 🎯 **NEXT STEPS**

1. **Create/Source 75 unique images** in original format:
   - 48 original website images (JPG/PNG converted to WebP)
   - 26 new creative CRBFTN-branded clothing items (WebP)
   - 1 CRBFTN logo (PNG format with transparency)
2. **Upload your custom logo** as `assets/images/logo.png`
3. **Convert product/gallery images to WebP format** using tools like:
   - Online converters (Convertio, CloudConvert)
   - Command line tools (cwebp)
   - Image editing software (Photoshop, GIMP)
4. **Update all file references** from `.jpg` to `.webp` in:
   - contact.html (1 reference)
   - products.html (5 references)
   - gallery.html (10 references)
   - reviews.html (1 reference)
   - cart.html (1 reference)
   - about.html (5 references)
   - Index.html (23 references)
   - assets/js/script.js (73 references - 47 original + 26 new)
   - components/modals.html (1 reference)

5. **Test all pages** to ensure images and logo load correctly
6. **Update alt text** to be more specific for each unique image
7. **Implement lazy loading** for performance optimization

**Ready for professional image creation, custom logo integration, and WebP migration! 🚀**