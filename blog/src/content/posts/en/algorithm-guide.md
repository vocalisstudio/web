---
title: 'Choosing the Right Pitch Detection Algorithm'
description: 'Learn the differences between YIN, pYIN, and FCPE. Choose the optimal algorithm for your voice and practice goals.'
pubDate: 2025-12-19T06:00:00
tags: ['Tips', 'Settings']
---

## What Are Algorithms?

Vocalis Studio offers multiple algorithms for detecting pitch in your recorded voice.

![Algorithm settings screen](/images/en/06_settings_algorithm.png)

Each has different characteristics, so choosing one that matches your voice and practice style leads to more accurate analysis.

## Available Algorithms

### FCPE (Recommended)

The latest AI-based algorithm.

| Feature | Description |
|---------|-------------|
| Accuracy | Very high |
| Stability | Few octave errors |
| Processing Speed | Slightly slower |

Uses neural networks for high-precision detection. In most cases, this is the best choice.

**Best For**:
- General practice
- When accurate analysis is needed
- Beginners to advanced singers

### pYIN (4 Variations)

A probabilistic approach algorithm.

| Variation | Characteristic |
|-----------|---------------|
| pYIN | Standard balance |
| pYIN-High | Detection rate priority |
| pYIN-Balanced | Balanced approach |
| pYIN-Aggressive | Maximum detection |

**pYIN**: Standard settings. Works with many voice types.

**pYIN-High**: Detects more pitches. Effective for quiet or breathy voices.

**pYIN-Balanced**: Balances detection rate and stability.

**pYIN-Aggressive**: Maximizes detection rate. Note: may pick up more noise.

**Best For**:
- Alternative when FCPE doesn't work well
- Unusual voice characteristics
- When processing speed is a priority

### YIN

A simple, fast algorithm.

| Feature | Description |
|---------|-------------|
| Accuracy | Standard |
| Stability | More prone to octave errors |
| Processing Speed | Fast |

A classic algorithm with fast processing. However, it may incorrectly detect octaves above or below.

**Best For**:
- When fast processing is needed
- Advanced singers with stable voices
- Alternative when FCPE or pYIN has issues

## Algorithm Selection Guide

| Situation | Recommendation |
|-----------|---------------|
| Not sure | FCPE |
| Many missed detections | pYIN-High or pYIN-Aggressive |
| Octave errors are a concern | FCPE or pYIN |
| Processing speed priority | YIN |
| Breathy voice | pYIN-High |

## How to Change Settings

1. Tap "Settings" from the home screen
2. Open the "Algorithm" section
3. Select your preferred algorithm

Settings apply to the next recording analysis. You can also re-analyze past recordings with a different algorithm.

## Frequently Asked Questions

### Which algorithm is most accurate?

Generally, FCPE is the most accurate. It's AI-based, has fewer octave errors, and works with many voice types.

### What if results seem wrong?

Try a different algorithm. Depending on your voice, pYIN might work better.

### What if processing feels slow?

YIN is the fastest. However, there's a trade-off with accuracy.

## Summary

- When in doubt, choose **FCPE**
- For missed detections, try **pYIN-High**
- For speed priority, use **YIN**
- Match the algorithm to your voice and goals for better accuracy

---

Vocalis Studio Developer
