---
title: 'What is Pitch?'
description: 'Learn the basic concept of pitch that determines how high or low a sound is. Understand the relationship between frequency, note names, and MIDI numbers.'
pubDate: 2025-12-18T13:00:00
tags: ['Tips', 'Theory']
---

## What Makes a Voice High or Low?

We commonly say "high voice" or "low voice." But what exactly is this "highness"?

The pitch of a sound is determined by how fast the air vibrates. Faster vibrations sound higher, slower vibrations sound lower.

## Frequency Determines Pitch

The physical unit for pitch is "frequency," measured in Hz (Hertz).

It represents how many times air vibrates per second. For example, 440Hz means the air vibrates 440 times per second.

### The Reference: A4 = 440Hz

The current international standard defines A4 (the A note near the middle of a piano) as 440Hz.

All other pitches are defined relative to this reference.

### Octaves and Frequency

Going up one octave doubles the frequency.

| Note | Frequency |
|------|-----------|
| A3 | 220 Hz |
| A4 | 440 Hz |
| A5 | 880 Hz |

Conversely, going down one octave halves the frequency.

## Note Names and MIDI Numbers

Frequency isn't the only way to represent pitch.

### Note Names (Do-Re-Mi, A-B-C)

In music, we use note names like "Do-Re-Mi" or "C-D-E" to represent pitch. The same note name at different octaves means different pitches.

That's why we add octave numbers like "C4" or "A4" to distinguish them.

### MIDI Numbers

In computer music, MIDI numbers (0-127) represent pitch.

| Note | MIDI Number | Frequency |
|------|-------------|-----------|
| C4 (Middle C) | 60 | ~262 Hz |
| A4 | 69 | 440 Hz |
| C5 | 72 | ~523 Hz |

Each MIDI number increment is one semitone. 12 increments equal one octave.

## Display in the App

Vocalis Studio shows detected pitch as a note name with cent deviation.

For example, "A4 +5" means you're singing 5 cents higher than A4. We'll explain cents in detail in the next article.

## Summary

- Pitch is determined by frequency
- Frequency is measured in Hz (Hertz)
- A4 = 440Hz is the international standard reference
- One octave up = double the frequency
- MIDI number 60 = C4 (Middle C)

---

Vocalis Studio Developer
