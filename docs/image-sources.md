# Image sources

Stock photos under `public/stock/` stand in for products the shop has no photo of
its own yet. Every one is CC0 or Public Domain, found through the Openverse API
(`license=cc0,pdm`), checked by eye for watermarks, logos, text, brand names and
identifiable faces, then converted to WebP (max 1600 px, quality 78, metadata
stripped). Alt texts live in `data/stock-images.ts` and describe what each photo
shows; the product page labels them "صورة توضيحية". They are not the shop's own
work and must not be described as its projects or installations.

Replace them with the shop's own photos when the owner sends some, and remove the
entry here and in `data/stock-images.ts`.

| File | Product | Source page | Creator | Licence | Host |
|---|---|---|---|---|---|
| `public/stock/parket/light-oak-bedroom.webp` | parket | https://wordpress.org/photos/photo/24689419ca/ | Rubel Miah | CC0 1.0 (public domain dedication) | WordPress.org Photo Directory |
| `public/stock/parket/herringbone-close-up.webp` | parket | https://www.rawpixel.com/image/6130355/photo-image-background-texture-abstract | Teddy | CC0 1.0 (public domain dedication) | rawpixel (public domain collection) |
| `public/stock/parket/parquet-blocks-room.webp` | parket | https://commons.wikimedia.org/w/index.php?curid=88145537 | Kurt Kaiser | CC0 1.0 (public domain dedication) | Wikimedia Commons |
| `public/stock/parket/hardwood-room.webp` | parket | https://www.rawpixel.com/image/6032921/photo-image-public-domain-wooden-house | not stated | CC0 1.0 (public domain dedication) | rawpixel (public domain collection) |
| `public/stock/water-resistant-carpet/wood-look-kitchen-nook.webp` | water-resistant-carpet | https://stocksnap.io/photo/kitchen-interior-3ZX53UFU8B | Matt Bango | CC0 1.0 (public domain dedication) | StockSnap.io |
| `public/stock/water-resistant-carpet/light-oak-planks-hallway.webp` | water-resistant-carpet | https://www.rawpixel.com/image/6042996/minimal-interior-free-public-domain-cc0-photo | not stated | CC0 1.0 (public domain dedication) | rawpixel (public domain collection) |
| `public/stock/artificial-grass/turf-close-up.webp` | artificial-grass | https://wordpress.org/photos/photo/56765a6a2a/ | Jonathan Desrosiers | CC0 1.0 (public domain dedication) | WordPress.org Photo Directory |
| `public/stock/artificial-grass/balcony-turf.webp` | artificial-grass | https://wordpress.org/photos/photo/24168f4752/ | Fatin Ehsan | CC0 1.0 (public domain dedication) | WordPress.org Photo Directory |
| `public/stock/mokite/carpeted-sitting-room.webp` | mokite | https://www.rawpixel.com/image/5941964/free-public-domain-cc0-photo | not stated | CC0 1.0 (public domain dedication) | rawpixel (public domain collection) |
| `public/stock/mokite/carpeted-living-room.webp` | mokite | https://www.rawpixel.com/image/5941940/free-public-domain-cc0-photo | not stated | CC0 1.0 (public domain dedication) | rawpixel (public domain collection) |
| `public/stock/mokite/grey-carpet-close-up.webp` | mokite | https://www.rawpixel.com/image/5906025/black-floor-texture-free-public-domain-cc0-photo | not stated | CC0 1.0 (public domain dedication) | rawpixel (public domain collection) |
| `public/stock/turky-mshager/patterned-carpets-close-up.webp` | turky-mshager | https://commons.wikimedia.org/w/index.php?curid=159441986 | Robert-brook | CC0 1.0 (public domain dedication) | Wikimedia Commons |
| `public/stock/turky-mshager/patterned-carpet-floor.webp` | turky-mshager | https://wordpress.org/photos/photo/799684664e/ | Yam B Chhetri | CC0 1.0 (public domain dedication) | WordPress.org Photo Directory |
| `public/stock/turky-mshager/floral-carpet-corridor.webp` | turky-mshager | https://wordpress.org/photos/photo/635695b957/ | Manjil Aryal | CC0 1.0 (public domain dedication) | WordPress.org Photo Directory |
| `public/stock/office-flooring/grey-office-hallway.webp` | office-flooring | https://www.rawpixel.com/image/6024318/office-hallway-free-public-domain-cc0-photo | not stated | CC0 1.0 (public domain dedication) | rawpixel (public domain collection) |
| `public/stock/office-flooring/meeting-room-floor.webp` | office-flooring | https://stocksnap.io/photo/interior-design-N3DP51WC97 | Breather | CC0 1.0 (public domain dedication) | StockSnap.io |
| `public/stock/office-flooring/dark-floor-meeting-area.webp` | office-flooring | https://stocksnap.io/photo/interior-design-7RTY13MUYV | Breather | CC0 1.0 (public domain dedication) | StockSnap.io |
| `public/stock/hospital-flooring/exam-room-coved-vinyl.webp` | hospital-flooring | https://www.rawpixel.com/image/5969371/hospital-room | not stated | CC0 1.0 (public domain dedication) | rawpixel (public domain collection) |
| `public/stock/hospital-flooring/hospital-corridor.webp` | hospital-flooring | https://commons.wikimedia.org/w/index.php?curid=68058664 | W.carter | CC0 1.0 (public domain dedication) | Wikimedia Commons |
| `public/stock/hospital-flooring/exam-room-plank-vinyl.webp` | hospital-flooring | https://www.rawpixel.com/image/9657895/image-public-domain-hospital-door | not stated | CC0 1.0 (public domain dedication) | rawpixel (public domain collection) |

## Removed in the same change

- 54 photos that were byte-identical (SHA-1) to photos on two other businesses' sites:
  `public/3shb/`, `public/braqiee/`, `public/makteb/`, 13 files in `public/msaged/`,
  `public/turky mshager/`, 12 files in `public/images/catg/`, and `public/home/`
  `Heroimage.png`, `hero-moket-alsurye-riyadh.jpg`, `mokite.png`, `staar.png`.
- 6 photos in `public/Rabal-GEM/` that carried another account's TikTok watermark.
