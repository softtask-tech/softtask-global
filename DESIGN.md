---
name: Soft Task global
description: Engineering with a human point of view
colors:
  forest: "#14382d"
  deep: "#0b241d"
  ink: "#183c30"
  paper: "#f5f6ef"
  lime: "#d3ed9c"
  orange: "#ed7040"
  muted: "#54665c"
  line: "#d2d9cd"
typography:
  display:
    fontFamily: "Manrope Variable, sans-serif"
    fontSize: "clamp(50px, 5.6vw, 86px)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Manrope Variable, sans-serif"
    fontSize: "16px"
    lineHeight: 1.65
rounded:
  control: "2px"
spacing:
  section: "104px"
  section-mobile: "60px"
components:
  button-primary:
    backgroundColor: "{colors.forest}"
    textColor: "#ffffff"
    rounded: "{rounded.control}"
    padding: "16px 23px"
---

# Soft Task global design system

## Overview
Engineering with a human point of view. Preserve the owner-selected green world and mark. Mix generous display typography with quiet technical reading. Use a few meaningful photographs, not image-heavy filler.

## Colors
Forest and paper establish the principal surfaces. Lime highlights primary calls to action and an occasional display phrase. Orange belongs to the mark and focus outline; light-surface navigation uses a darker orange for contrast. The CSS variables are the implementation source of truth.

## Typography
Self-hosted Manrope provides headings and UI. Newsreader italic supplies an expressive phrase. Body copy stays in Manrope. Breakpoints reduce the desktop display size to fit real mobile text without overflow. Article text uses a maximum-width reading column.

## Layout
Content containers use a 1360px maximum and fluid gutters. Main responsive transitions occur at 1150, 900 and 620px. Mobile navigation collapses at 900px; editorial and portfolio sections stack at 620px. Desktop section separation is generally 104px, mobile 60px.

## Elevation & Depth
Tonal surfaces separate editorial sections. Shadows are limited to floating navigation and dialogs/preferences. Content sections remain flat.

## Shapes
Photographs and portfolio panels use rectangular frames. Controls use small corner radii. The final enquiry link uses a circle. Icons share a consistent 1.5px stroke.

## Components
The header has native expandable capability navigation, search and a project action. The service explorer is keyboard-operable and becomes a horizontal selector on mobile. Native dialogs contain search and cookie preferences. Forms retain input on failure and announce result messages. Motion is one small hero-image reveal, disabled when reduced motion is requested.

## Do's and Don'ts
Do preserve the green brand and focus on specific content. Do keep image provenance and responsive crops. Do confirm contrast on both light and dark surfaces. Do distinguish illustrative photos from company evidence. Do not apply this page design automatically to the independent country websites. Do not manufacture client proof, metrics or employee photographs.
