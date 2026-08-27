# Design System Master File

**Project:** 기상도 (Weather Atlas)  
**Revised:** 2026-08-27

Cyanotype bureau (teal + brass + Fraunces) was rejected as generic dark dashboard. Database default sky-blue weather chrome was also rejected.

Replacement: **수묵 산수 야경** — the peninsula as a living ink painting. Sparse 단청 cinnabar, celadon wash, moon gold coastline.

## Color Palette

| Role | Name | Hex | CSS Variable |
|------|------|-----|----------------|
| Canvas | Sumi | `#110E0C` | `--sumi` |
| Surface | Night | `#1C1814` | `--night` |
| Primary | Celadon | `#7A9A86` | `--celadon` |
| Accent | Cinnabar | `#C45C48` | `--cinnabar` |
| Light | Moon | `#E8D5A3` | `--moon` |
| Paper | Hanji | `#F4EAD7` | `--hanji` |
| Muted | Mist | `#B7AEA0` | `--mist` |

Hanji paper is reserved for Practice Archive live homework and the region detail dock.

## Typography

- **Display:** Song Myung
- **Body / UI:** Noto Sans KR

No Fraunces, Sora, IBM Plex, Inter, or kickers/eyebrows.

## Signature

1. Brief 「기상도」 title stamp (SVG mask reveal of Song Myung glyphs — not fluid ink simulation).
2. Real brush: Anime.js coastline `strokeDashoffset` draw, then ink-fill 강원→제주.

Title intro is a short handoff; the peninsula stroke remains the signature motion.

## Navigation

지도 · 코드 챌린지 · 실습 아카이브. Hands On is folded into the archive. Simulator / API Explorer / Animation Lab are not in the product.
