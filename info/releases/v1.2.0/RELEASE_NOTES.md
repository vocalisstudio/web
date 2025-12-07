# Vocalis Studio v1.2.0 Release Notes

## Release Date
2025-12-04

## What's New (App Store)

### Japanese (Primary)

```
Vocalis Studio 1.2.0

【新機能】
• 新しいスケールパターンを追加
  - Broken Scale（分散和音パターン）
  - Rossini Scale（1.5オクターブ）
  - 5-Tone Down（下降のみ）
  - Arpeggio Down Triple（アルペジオ3回繰り返し）
• BPM範囲を30〜240に拡大（より遅い/速い練習に対応）

【改善】
• ピッチ検出のオクターブ補正機能を追加
• スケール再生のタイミング精度を向上
• 統計表示UIの改善
• プリセット保存の安定性向上

ご意見・ご要望をお待ちしています！
```

### English

```
Vocalis Studio 1.2.0

NEW FEATURES
• New scale patterns added
  - Broken Scale (arpeggio pattern)
  - Rossini Scale (1.5 octave)
  - 5-Tone Down (descending only)
  - Arpeggio Down Triple (3x repeat pattern)
• BPM range expanded to 30-240 (for slower/faster practice)

IMPROVEMENTS
• Added octave correction for pitch detection
• Improved scale playback timing accuracy
• Enhanced statistics UI layout
• Improved preset save stability

We'd love to hear your feedback and suggestions!
```

---

## Technical Changes Summary

### New Features
1. **New Scale Patterns**
   - `brokenScale`: 1-3-5-8-5-3 arpeggio pattern
   - `rossiniScale`: 1.5 octave (12 semitones up + 7 down)
   - `fiveToneDown`: 1-7-5-4-2-1 descending pattern
   - `arpeggioDownTriple`: 8-5-3-1-3-5 repeated 3 times

2. **BPM Range Expansion**
   - Previous: 60-180 BPM
   - New: 30-240 BPM
   - Default: 140 BPM (center of range)

### Improvements
1. **Octave Correction Service** (Domain Layer)
   - Corrects YIN algorithm octave detection errors
   - Uses playback timeline segments for target note reference
   - Raw data preserved in cache, correction applied on read

2. **Timestamp Strategy Pattern**
   - `TapBasedTimestampStrategy`: Uses audio tap for accurate timing
   - Eliminates ~50ms latency from AVAudioUnitSampler

3. **Single Source of Truth Pattern**
   - `ScalePresetSettings` as the single source for preset data
   - Type-safe Codable persistence

4. **Statistics UI**
   - Improved layout for pitch statistics
   - Better visual hierarchy

### Bug Fixes
- Fixed playback crash on navigation
- Disabled navigation during recording to prevent state corruption

---

## Files Changed

### New Files
- `OctaveCorrectionService.swift` - Octave correction logic
- `ScaleTimestampStrategy.swift` - Timestamp recording strategies
- `ScaleType.swift` - Codable scale type enumeration

### Modified Files
- `NotePattern.swift` - New scale patterns
- `ScalePreset.swift` - Single source of truth pattern
- `RecordingSettingsPanel.swift` - BPM range update
- `AnalyzeRecordingUseCase.swift` - Octave correction integration
- `StatisticsComponents.swift` - UI improvements

---

## Testing Checklist

- [ ] New scale patterns play correctly
- [ ] BPM slider range is 30-240
- [ ] Default BPM is 140
- [ ] Octave correction improves pitch accuracy
- [ ] Preset save/load works correctly
- [ ] Navigation during recording is disabled
- [ ] Statistics display correctly

---

## App Store Submission Checklist

- [ ] Update MARKETING_VERSION to 1.2.0 ✅
- [ ] Update What's New text in App Store Connect
- [ ] Verify all localizations
- [ ] Test on physical device
- [ ] Archive and validate build
- [ ] Submit for review

---

*Last Updated: 2025-12-04*
