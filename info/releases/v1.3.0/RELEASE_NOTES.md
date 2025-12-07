# Vocalis Studio v1.3.0 Release Notes

## Release Date
2025-12-06

## What's New (App Store)

### Japanese (Primary)

```
Vocalis Studio 1.3.0

【新機能】
• 統計分析機能を大幅に強化
  - ビブラート分析: 速度・深さ・安定性を可視化
  - シンガーズフォルマント分析: プロ歌手の倍音成分を検出
  - ブライトネス・エアリネス分析: 声の明るさと抜け感を測定

【改善】
• 分析画面の再生レスポンスを向上

ご意見・ご要望をお待ちしています！
```

### English

```
Vocalis Studio 1.3.0

NEW FEATURES
• Enhanced statistics analysis
  - Vibrato analysis: Visualize speed, depth, and stability
  - Singer's Formant analysis: Detect professional vocal overtones
  - Brightness & Airiness analysis: Measure vocal clarity and openness

IMPROVEMENTS
• Improved playback response in analysis view

We'd love to hear your feedback and suggestions!
```

---

## Technical Changes Summary

### New Features
1. **Vibrato Analysis**
   - Speed: Measures vibrato rate (Hz)
   - Depth: Measures pitch variation (cents)
   - Stability: Measures consistency of vibrato pattern

2. **Singer's Formant Analysis**
   - Detects 2-4kHz frequency cluster
   - Characteristic of trained singers
   - Higher values indicate better projection

3. **High Frequency Analysis**
   - Brightness: Overall high-frequency energy
   - Airiness: Ultra-high frequency presence (>8kHz)

### Improvements
1. **Analysis View Playback**
   - Removed unnecessary pitch detection during playback
   - Reduced AudioSession configuration overhead
   - Faster response to play button press

2. **Playback State Management**
   - Fixed playback continuing after navigation
   - Fixed microphone indicator staying on
   - Proper AudioSession cleanup on screen exit

3. **Localization**
   - Unified scale name localization keys

### Bug Fixes
- Fixed audio continuing when navigating away from list/analysis pages
- Fixed orange microphone indicator persisting after leaving recording screen
- Fixed same recording not playable after returning from analysis

---

## Files Changed

### New Files
- `VibratoAnalyzer.swift` - Vibrato analysis logic
- `SingersFormantAnalyzer.swift` - Formant detection
- `HighFrequencyAnalyzer.swift` - Brightness/Airiness analysis
- `VibratoStatisticsSection.swift` - UI for vibrato stats
- `FormantStatisticsSection.swift` - UI for formant stats

### Modified Files
- `AnalysisViewModel.swift` - Disabled pitch detection for playback
- `RecordingStateViewModel.swift` - AudioSession cleanup
- `RecordingView.swift` - Cleanup on disappear
- `RecordingListView.swift` - Stop playback on navigation
- `AnalysisView.swift` - Stop playback on navigation
- `StatisticsSheet.swift` - New analysis sections

---

## Testing Checklist

- [ ] Vibrato analysis displays correctly
- [ ] Singer's Formant analysis shows values
- [ ] Brightness/Airiness metrics work
- [ ] Playback in analysis view starts quickly
- [ ] Audio stops when navigating away from list
- [ ] Audio stops when navigating away from analysis
- [ ] Microphone indicator disappears after leaving recording screen
- [ ] Same recording can be played multiple times in list

---

## App Store Submission Checklist

- [ ] Update MARKETING_VERSION to 1.3.0
- [ ] Update What's New text in App Store Connect
- [ ] Verify all localizations
- [ ] Test on physical device
- [ ] Archive and validate build
- [ ] Submit for review

---

*Last Updated: 2025-12-06*
