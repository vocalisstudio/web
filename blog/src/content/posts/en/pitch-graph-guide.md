---
title: 'How to Read the Pitch Graph'
description: 'Learn how to interpret the pitch graph in the analysis screen. Visually track how your voice compares to the target notes.'
pubDate: 2025-12-18T10:00:00
tags: ['Guide', 'Analysis']
---

## What is the Pitch Graph?

It's a visualization of how your pitch changes over time during a recording.

When you open the analysis screen, this graph appears first. The horizontal axis represents time, and the vertical axis represents pitch. You can see at a glance how your voice moved throughout the recording.

![Analysis Screen](/web/blog/images/en/04_analysis_idle.png)

## What You Can Learn

- Whether you're singing sharp or flat relative to the target
- How stable your pitch is
- Which notes are challenging for you

When you record with a scale, target pitch lines are also displayed. Comparing your voice to these targets helps identify areas for improvement.

## Reading the Graph

### Basic Elements

The graph has two main elements.

| Element | Description |
|---------|-------------|
| Blue line | Your detected pitch (your voice) |
| Faint horizontal lines | Target scale pitch lines |

The closer your voice is to the target line, the more accurate your pitch.

![Pitch Graph (Fullscreen)](/web/blog/images/en/04_pitch_graph_fullscreen.png)

### Axes

- **Horizontal axis**: Represents the passage of time. Moves from left to right.
- **Vertical axis**: Represents pitch. Higher notes are at the top, lower notes at the bottom.

### Understanding Deviation

If your line is above the target line, you're singing sharp. If it's below, you're flat.

In my development experience, many users start by figuring out which direction they tend to deviate.

## How to Navigate

You can interact with the graph using touch gestures.

### Moving Through Time

Swipe horizontally to move forward or backward in time. Even with long recordings, you can find the section you want to review.

### Moving Through Pitch Range

While playback is paused, swipe vertically to move the displayed pitch range up or down.

The swipe direction is automatically detected, so even diagonal movements will scroll in the intended direction.

### Auto-Follow Mode

During scale recording playback, the graph automatically follows the currently playing scale note position. You can toggle this on/off using the button within the graph.

This feature is only visible during playback.

![Analysis Screen During Playback](/web/blog/images/en/04_analysis_playback.png)

## Tips for Using the Graph

### Start with the Big Picture

Rather than diving into details right away, first observe the overall pattern. Get a general sense of "where things went off track."

### Review the Same Sections Repeatedly

Once you identify challenging parts, record them multiple times and compare. Seeing your progress can be motivating.

### Use with the Spectrogram

The analysis screen also has a "Spectrogram" tab. Use the pitch graph for pitch accuracy and the spectrogram for voice quality analysis—this gives you a more complete picture.

## Summary

- The pitch graph shows how pitch changes over time
- Compare with target lines to assess accuracy
- Swipe to navigate through time and pitch range
- Start by observing overall trends

Next time, we'll cover the basics of the spectrogram.

---

Vocalis Studio Developer
