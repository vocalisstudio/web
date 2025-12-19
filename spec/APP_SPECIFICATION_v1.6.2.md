# Vocalis Studio アプリ仕様書 v1.6.2

## 概要

Vocalis Studioは、ボイストレーニング向けのiOSアプリです。スケール（音階）再生と同時録音機能を提供し、リアルタイムのピッチ検出と録音分析により、ユーザーの歌唱練習をサポートします。

### 対応プラットフォーム
- **iOS**: 15.0以上
- **言語**: Swift 5.9+
- **UIフレームワーク**: SwiftUI

---

## 画面構成

### 1. ホーム画面 (HomeView)

アプリ起動時のメイン画面。

**主要ナビゲーション**:
| ボタン | 遷移先 | 説明 |
|--------|--------|------|
| 録音開始 | RecordingView | 録音画面へ |
| 録音一覧 | RecordingListView | 保存済み録音の管理 |
| 設定 | SettingsView | アプリ設定 |

**その他の要素**:
- **アップグレードバナー**: 無料ユーザー向けプレミアム誘導
- **デバッグメニュー**: DEBUGビルドのみ表示

---

### 2. 録音画面 (RecordingView)

スケール付き/なしの録音を行う主要画面。

#### 2.1 レイアウト
- **横向き**: 左側に設定パネル(240pt幅)、右側にリアルタイム表示
- **縦向き**: 折りたたみ可能な設定パネル + 表示エリア(350pt高)
- 録音開始時に設定パネルは自動的に非表示

#### 2.2 スケール設定

**スケールタイプ** (ScaleType - 9種類):

| タイプ | rawValue | 構成 | 説明 |
|--------|----------|------|------|
| fiveTone | five_tone | [0, 2, 4, 5, 7, 5, 4, 2, 0] | ドレミファソファミレド（上昇→下降）9音 |
| fiveToneDown | five_tone_down | [7, 5, 4, 2, 0] | ソファミレド（下降のみ）5音 |
| octaveRepeat | octave_repeat | [0, 4, 7, 12, 12, 12, 12, 7, 4, 0] | トップノート4回リピート 10音 |
| octaveLongTone | octave_long_tone | [0, 4, 7, 12, nil, nil, nil, 7, 4, 0] | オクターブを4拍ホールド |
| brokenScale | broken_scale | [0, 7, 4, 12, 7, 4, 0] | 1→5→3→8→5→3→1 7音 |
| brokenScaleDouble | broken_scale_double | [0, 7, 4, 12, 7, 4, 0, ...] | 上記を2回繰り返し 13音 |
| rossiniScale | rossini_scale | [0, 4, 7, 12, 16, 19, 17, 14, 11, 7, 5, 2, 0] | 1.5オクターブスケール 13音 |
| arpeggioDownTriple | arpeggio_down_triple | [12, 7, 4, 0, ...] | 16音のアルペジオ |
| off | off | [] | スケールなし（フリー録音） |

**ピッチ設定**:
- **開始ピッチ**: MIDI 48-84 (C3-C6、バリデーション範囲)
- スケールの開始音を設定
- デフォルト: C4 (MIDI 60) = `MIDINote.middleC`

**テンポ設定** (Tempo):
- **1音あたりの秒数**: 1.0〜3.0秒 (バリデーション範囲)
- デフォルト: 1.0秒 (`Tempo.standard`)

**キー進行パターン** (KeyProgressionPattern):
| パターン | displayNameKey | 説明 |
|----------|----------------|------|
| ascendingOnly | key_progression.ascending_only | 上昇のみ |
| descendingOnly | key_progression.descending_only | 下降のみ |
| ascendingThenDescending | key_progression.ascending_then_descending | 上昇→下降 (デフォルト) |
| descendingThenAscending | key_progression.descending_then_ascending | 下降→上昇 |

**キー変更パラメータ**:
| 設定項目 | 範囲 | デフォルト |
|----------|------|-----------|
| ascendingKeyCount | 0〜24回 | 3 |
| descendingKeyCount | 0〜24回 | 0 |
| ascendingKeyStepInterval | 1〜12半音 | 1 (半音) |
| descendingKeyStepInterval | 1〜12半音 | 1 (半音) |

#### 2.3 スケールプリセット

**SavePresetDialog**: プリセット保存ダイアログ
**PresetListView**: プリセット一覧・管理画面

詳細は「ドメインモデル > ScalePreset」参照。

#### 2.4 スケール再生メカニズム

**ScaleElement (5種類)**:
| タイプ | 説明 | デフォルト時間 | beats |
|--------|------|---------------|-------|
| chordShort([MIDINote]) | 「ダン」短コード（前のキー） | 0.3秒 | 1 |
| chordLong([MIDINote]) | 「ダーン」長コード（現在のキー） | 1.0秒 | 2 |
| scaleNote(MIDINote) | 単一スケール音 | 0.5秒 (tempoで上書き) | 1 |
| longNote(MIDINote, beats) | 延長音（複数拍） | 0.5秒 × beats | beats |
| silence(TimeInterval) | 無音区間 | 指定秒数 | 1 |

**再生フロー**:
1. 最初のキー: `chordLong`（ダーン）→ スケール音
2. 以降のキー: `chordShort`（ダン）→ `chordLong`（ダーン）→ スケール音
3. コードは常にメジャートライアド (root + M3 + P5)

#### 2.5 録音コントロール
- **録音開始**: カウントダウン後に録音開始
- **録音停止**: 録音を停止しファイル保存
- **最後の録音再生**: 直前の録音を再生
- **分析画面へ**: 最後の録音の分析画面へ遷移

#### 2.6 MIDIRangeWarningView
MIDI範囲が推奨範囲外の場合に警告を表示するコンポーネント。

---

### 3. リアルタイム表示エリア (RealtimeDisplayArea)

録音中・再生中のリアルタイム情報を表示。

**表示コンポーネント**:
| コンポーネント | 内容 |
|---------------|------|
| FrequencySpectrumView | 周波数スペクトルのリアルタイム可視化（対数スケール、100-2500Hz） |
| IndicatorView | 目標ピッチ、検出ピッチ、正確度(セント)、音量メーター、経過時間 |

#### 3.1 FrequencySpectrumView仕様

| パラメータ | 値 | 説明 |
|----------|---|------|
| minFreq | 100 Hz | 最小表示周波数 |
| maxFreq | 2500 Hz | 最大表示周波数（母音フォルマント対応拡張）|
| スケール | 対数 | `log(freq)` による対数変換 |
| ラベル周波数 | [100, 250, 500, 1000, 2500] Hz | 表示ラベル位置 |

**色グラデーション**:
| 振幅範囲 | 色遷移 |
|---------|--------|
| 0-33% | 青 → 青緑 |
| 33-66% | 青緑 → 緑 |
| 66-100% | 緑 → 赤 |

#### 3.2 IndicatorView仕様

3行構成のインジケーター表示。

**オーディオレベル行**:
| 表示要素 | 説明 |
|----------|------|
| ラベル | "recording.audio_level".localized |
| メーター | AudioLevelMeterView |
| 数値 | "+X dB" フォーマット |

**ピッチ行**:
| 表示要素 | 説明 |
|----------|------|
| ラベル | "recording.pitch_label".localized |
| 目標ノート | ターゲット音名（例: "C4"）|
| 矢印 | "→" |
| 検出ノート | 検出音名 + 精度インジケーター |
| セント偏差 | "+X¢" または "-X¢" |

**経過時間行** (録音中のみ表示):
| 表示要素 | 説明 |
|----------|------|
| ラベル | "recording.elapsed_time".localized |
| プログレスバー | ElapsedTimeMeterView |
| 時間表示 | "0:15/0:30" フォーマット |

#### 3.3 AudioLevelMeterView仕様

| パラメータ | 値 | 説明 |
|----------|---|------|
| 入力範囲 | -160dB〜0dB | dBFS |
| 正規化範囲 | -60dB〜0dB → 0.0〜1.0 | 表示用変換 |

**色変化**:
| 正規化レベル | dB範囲 | 色 |
|-------------|--------|---|
| > 90% | -6dB〜0dB | 赤（クリップ危険）|
| > 80% | -12dB〜-6dB | 黄色（注意）|
| ≤ 80% | -60dB〜-12dB | 緑（正常）|

#### 3.4 ElapsedTimeMeterView仕様 (v1.6.2)

| パラメータ | 値 | 説明 |
|----------|---|------|
| 時間フォーマット | "0:00/0:30" | コンパクト表示 |
| 更新間隔 | 100ms | 滑らかな表示 |
| 表示条件 | 録音中のみ | isRecording == true |

**色変化**:
| 進捗 | 色 |
|------|---|
| < 75% | プライマリカラー |
| 75-90% | オレンジ（注意）|
| > 90% | 赤（警告）|

---

### 4. 録音一覧画面 (RecordingListView)

保存された録音を管理する画面。

**機能**:
- 録音リスト表示
- **ソート機能**: 6種類のソートオプション
- **フィルター機能**: RecordingFilterSheetによる詳細フィルター
- 再生コントロール (前/次/再生/一時停止)
- 名前変更
- 削除 (確認ダイアログ付き)
- 分析画面への遷移

#### 4.1 ソート機能 (RecordingSortOption)

| オプション | rawValue | 説明 |
|-----------|----------|------|
| createdAtDescending | created_at_desc | 作成日時降順（デフォルト）|
| createdAtAscending | created_at_asc | 作成日時昇順 |
| titleAscending | title_asc | タイトル昇順 |
| titleDescending | title_desc | タイトル降順 |
| durationAscending | duration_asc | 長さ昇順 |
| durationDescending | duration_desc | 長さ降順 |

#### 4.2 フィルター機能 (RecordingFilterSheet)

**RecordingFilterOption構造**:

| フィルター | 型 | オプション |
|-----------|---|----------|
| dateFilter | DateFilter | all, today, thisWeek, thisMonth |
| scaleTypeFilter | ScaleTypeFilter | all, fiveTone, fiveToneDown, rossiniScale, octaveRepeat, octaveLongTone, brokenScale, brokenScaleDouble, arpeggioDownTriple, freeRecording |
| pitchRange | PitchRange | minPitch (MIDI 36=C2) 〜 maxPitch (MIDI 84=C6) |
| tempoRange | TempoRange | minBPM (30) 〜 maxBPM (240) |
| searchText | String | 録音タイトル・設定での検索 |

**DateFilter詳細**:
| ケース | displayNameKey | 説明 |
|--------|----------------|------|
| all | filter.date_all | すべて |
| today | filter.date_today | 今日 |
| thisWeek | filter.date_this_week | 今週 |
| thisMonth | filter.date_this_month | 今月 |

**PitchRange詳細**:
| プロパティ | デフォルト | 説明 |
|----------|-----------|------|
| minPitch | 36 (C2) | 最小MIDIノート番号 |
| maxPitch | 84 (C6) | 最大MIDIノート番号 |

**TempoRange詳細**:
| プロパティ | デフォルト | 説明 |
|----------|-----------|------|
| minBPM | 30 | 最小BPM |
| maxBPM | 240 | 最大BPM |

---

### 5. 分析画面 (AnalysisView)

録音の詳細分析を表示する画面。

**タブ切り替え**:
| タブ | 説明 |
|------|------|
| pitchAnalysis | ピッチグラフ表示 |
| spectrogram | スペクトログラム表示 |

#### 5.1 PitchAnalysisView

**機能**:
| 機能 | 説明 |
|------|------|
| ピッチグラフ | 検出ピッチの時間推移表示 |
| 目標スケール表示 | スケール設定時の目標音程ライン |
| 横スワイプ | 時間軸スクロール |
| 縦スワイプ | ピッチ軸スクロール（一時停止中のみ）|
| 方向ロック | スワイプ方向を自動判定してロック |
| 自動追従 | 再生中にスケールノート位置を自動追跡 |

**自動追従機能（Auto-Follow）**:
- 再生中にスケールノートの位置を自動追跡
- トグルボタンでオン/オフ切替（グラフ内に配置）
- 再生中のみ表示される

#### 5.2 SpectrogramView

| 機能 | 説明 |
|------|------|
| 2Dスクロール | 横（時間）+ 縦（周波数）|
| ビューポートカリング | 表示領域のみ描画（パフォーマンス最適化）|
| 色マッピング | 振幅に基づくグラデーション |

#### 5.3 PlaybackComponents

**CompactPlaybackControl**: コンパクト版再生コントロール
- 再生/一時停止ボタン
- シークバー
- 時間表示

**PlaybackControl**: フル機能版再生コントロール
- 再生/一時停止ボタン
- 前へ/次へボタン
- シークバー
- 時間表示
- 再生速度選択

#### 5.4 StatisticsSheetView（統計情報シート）

**PitchAnalysisSection（ピッチ分析セクション）**:

| サブセクション | 項目 | 説明 |
|--------------|------|------|
| Overall | accuracy | 全体の正確度 (%) |
| | medianCents | 中央セント偏差 |
| | range | ピッチ範囲 |
| Position | accuracyScore | ポジション正確度スコア |
| | inTuneRate | 合っている率 (%) |
| | sharpRate | シャープ率 (%) |
| | flatRate | フラット率 (%) |
| | averageDeviation | 平均偏差 (cents) |
| Pitch | noteOnsetAccuracyScore | 音の立ち上がり正確度 |
| | pitchStabilityScore | ピッチ安定度 |
| | intervalAccuracyScore | 音程正確度 |
| Vibrato | averageRate | 平均レート (Hz) |
| | averageExtent | 平均振幅 (cents) |
| | averageRegularity | 平均規則性 (%) |

**SpectrumAnalysisSection（スペクトル分析セクション）**:

| サブセクション | 項目 | 周波数範囲 | 説明 |
|--------------|------|----------|------|
| High Frequency Resonance | SF (Singer's Formant) | 2.5-3.5 kHz | シンガーズフォルマント |
| | Brightness | 4-6 kHz | 明るさ |
| | Airiness | 6-9 kHz | 空気感 |

---

### 6. 設定画面 (SettingsView)

アプリの各種設定を行う画面。

**セクション構成**:

| セクション | 内容 |
|-----------|------|
| サブスクリプション | SubscriptionManagementViewへのリンク |
| オーディオ | AudioInputSettingsView, AudioOutputSettingsView |
| アルゴリズム | AlgorithmSettingsView |
| 言語 | 8言語から選択 |
| 情報 | バージョン表示 (v1.6.2) |
| 規約 | 利用規約、プライバシーポリシー |

#### 6.1 AudioInputSettingsView（入力設定）

| 設定項目 | 説明 |
|----------|------|
| 検出感度 | DetectionSensitivity選択（low/normal/high）|
| 信頼度閾値 | スライダー (0.1〜1.0) |

**DetectionSensitivity詳細**:
| レベル | RMS閾値 | 説明 |
|--------|--------|------|
| low | 0.05 | 低感度（ノイズ耐性高）|
| normal | 0.02 | 標準（デフォルト）|
| high | 0.005 | 高感度（微小音検出）|

#### 6.2 AudioOutputSettingsView（出力設定）

| 設定項目 | 範囲 | デフォルト | 説明 |
|----------|------|----------|------|
| スケール再生音量 | 0.0〜1.0 | 0.8 | scalePlaybackVolume |
| 録音再生音量 | 0.0〜1.0 | 0.8 | recordingPlaybackVolume |
| スケール音源 | ScaleSoundType | grandPiano | 音源タイプ選択 |

#### 6.3 AlgorithmSettingsView（アルゴリズム設定）

| 設定項目 | 説明 |
|----------|------|
| ピッチ検出アルゴリズム | PitchDetectionAlgorithm選択 |

詳細は「技術仕様 > ピッチ検出アルゴリズム」参照。

---

### 7. ペイウォール画面 (PaywallView)

サブスクリプション購入画面。

**表示内容**:
- Free/Premiumの機能比較
- 商品名 (StoreKitから取得)
- 価格と期間 (例: ¥480/月, ¥4,800/年)
- 自動更新の説明文
- 利用規約・プライバシーポリシーへのリンク

**アクション**:
- 購入ボタン
- 購入復元ボタン

---

### 8. サブスクリプション管理画面 (SubscriptionManagementView)

現在のサブスクリプション状態を確認・管理。

**表示内容**:
- 現在のティア
- 購入日・有効期限
- 利用可能な機能一覧

**アクション**:
- 購入復元
- サブスクリプション解約 (App Store設定へ)

---

## ドメインモデル

### エンティティ

#### Recording

| プロパティ | 型 | 説明 |
|------------|---|------|
| id | RecordingId | 一意識別子 |
| fileURL | URL | 録音ファイルパス |
| createdAt | Date | 作成日時 |
| duration | Duration | 録音時間 |
| scaleSettings | ScaleSettings? | スケール設定（nil時はスケールなし録音）|
| playbackTimeline | ScalePlaybackTimeline? | ピッチバーUI用タイムライン |
| analysisAlgorithm | PitchDetectionAlgorithm? | 分析に使用したアルゴリズム |
| name | String? | ユーザー設定の名前 |
| title | String? | 表示用タイトル（nameのエイリアス）|

#### ScalePreset

スケール設定を保存するプリセット機能。

| プロパティ | 型 | 説明 |
|------------|---|------|
| id | UUID | 一意識別子 |
| name | String | プリセット名 |
| settings | ScalePresetSettings | スケール設定 |
| createdAt | Date | 作成日時 |
| updatedAt | Date | 更新日時 |

**ScalePresetSettings**:

| プロパティ | 型 | 説明 |
|------------|---|------|
| scaleType | ScaleType | スケールタイプ |
| startPitchIndex | Int | 開始ピッチインデックス |
| tempo | Int | テンポ (BPM) |
| keyProgressionPattern | KeyProgressionPattern | キー進行パターン |
| ascendingKeyCount | Int | 上昇キー回数 |
| descendingKeyCount | Int | 下降キー回数 |
| ascendingKeyStepInterval | Int | 上昇キーステップ間隔 |
| descendingKeyStepInterval | Int | 下降キーステップ間隔 |

**プリセットソート (PresetSortOption)**:

| オプション | 説明 |
|-----------|------|
| updatedAtDescending | 更新日時降順（デフォルト）|
| nameAscending | 名前昇順 |
| pitchAscending | 開始ピッチ昇順 |

#### User

| プロパティ | 型 | 説明 |
|------------|---|------|
| subscriptionStatus | SubscriptionStatus | サブスクリプション状態 |
| dailyRecordingCount | Int | 当日の録音回数 |

### 値オブジェクト

#### MIDINote
- 範囲: 0〜127
- 定数: `.middleC` (60), `.hiC` (72)

#### Duration
- 秒数を保持する値オブジェクト
- 0以上の値のみ許可

#### Tempo
- 1音あたりの秒数
- 範囲: > 0
- 定数: `.standard` (1.0秒)

#### RecordingId
- UUID形式の一意識別子

#### DetectedPitch

| プロパティ | 型 | 説明 |
|------------|---|------|
| frequency | Double | 検出周波数 (Hz) |
| midiNote | MIDINote | 最近接MIDI音 |
| noteName | String | 音名 (例: "C4") |
| cents | Int? | セント偏差 (-50〜+50) |
| confidence | Double | 信頼度 (0.0〜1.0) |

#### PitchAccuracy

| ケース | 説明 |
|--------|------|
| accurate | 正確（セント偏差 ≤ 閾値）|
| slightlyOff | わずかにずれ |
| off | 大きくずれ |
| none | ピッチ未検出 |

#### AudioDetectionSettings

オーディオ検出に関する全設定を保持。

| プロパティ | 型 | 範囲 | デフォルト | 説明 |
|----------|---|------|----------|------|
| scalePlaybackVolume | Float | 0.0〜1.0 | 0.8 | スケール再生音量 |
| recordingPlaybackVolume | Float | 0.0〜1.0 | 0.8 | 録音再生音量 |
| rmsSilenceThreshold | Float | 0.001〜0.1 | 0.02 | 無音判定閾値 |
| confidenceThreshold | Float | 0.1〜1.0 | 0.4 | 信頼度閾値 |
| scaleSoundType | ScaleSoundType | enum | grandPiano | スケール音源タイプ |
| pitchAlgorithm | PitchDetectionAlgorithm | enum | pyin | ピッチ検出アルゴリズム |

---

## サブスクリプション

### ティア構成 (SubscriptionTier)

| ティア | productId | monthlyPrice | yearlyPrice |
|--------|-----------|--------------|-------------|
| free | (空文字) | ¥0 | ¥0 |
| premium | com.vocalisstudio.premium.monthly | ¥480 | ¥4,800 |
| premiumPlus | com.vocalisstudio.premiumplus.monthly | ¥980 | ¥9,800 |

### 録音制限 (RecordingLimit)

| ティア | dailyCount | maxDuration | 説明 |
|--------|-----------|-------------|------|
| Free | 5回/日 | 30秒 | 基本制限 |
| Premium | 無制限 (nil) | 300秒 (5分) | 時間制限あり |
| Premium Plus | 無制限 (nil) | 無制限 (nil) | 完全無制限 |

**RecordingLimit Configuration**:

| 設定 | Free | Premium | PremiumPlus |
|------|------|---------|-------------|
| freeDailyCount | 5 | - | - |
| freeMaxDuration | 30秒 | - | - |
| premiumDailyCount | - | ∞ | ∞ |
| premiumMaxDuration | - | 300秒 | ∞ |

### 機能制限

**Free ティア**:
- 基本録音
- リアルタイムピッチ検出
- 全スケールパターン

**Premium ティア** (追加機能):
- スペクトル可視化
- ピッチ正確度分析
- ピッチ推移グラフ
- 無制限ローカル保存

**Premium Plus ティア** (将来実装予定):
- WAVエクスポート
- 練習履歴・統計
- カスタムスケール（自由な音階設定）
- AI音程改善提案
- クラウドバックアップ

---

## ローカライゼーション

### 対応言語 (8言語)

| 言語 | コード | Localizable.stringsパス |
|------|--------|------------------------|
| 日本語 | ja | Resources/ja.lproj/ |
| English | en | Resources/en.lproj/ |
| 简体中文 | zh-Hans | Resources/zh-Hans.lproj/ |
| 繁體中文 | zh-Hant | Resources/zh-Hant.lproj/ |
| 한국어 | ko | Resources/ko.lproj/ |
| Español | es | Resources/es.lproj/ |
| Français | fr | Resources/fr.lproj/ |
| Deutsch | de | Resources/de.lproj/ |

---

## 技術仕様

### オーディオ録音 (AVAudioRecorderWrapper)

| 設定項目 | 値 |
|----------|---|
| フォーマット | M4A (AAC) - `kAudioFormatMPEG4AAC` |
| サンプルレート | 44100 Hz |
| チャンネル | モノラル (1ch) |
| 品質 | AVAudioQuality.high |
| メータリング | 有効 (100ms間隔) |

**ファイル命名規則**:
- パターン: `recording_yyyyMMdd_HHmmss_SSS.m4a`
- 保存先: Documents/

### リアルタイムピッチ検出 (RealtimePitchDetector)

**FFT設定**:
| パラメータ | 値 | 説明 |
|------------|---|------|
| bufferSize | 8192 | FFTサイズ (5.39Hz/bin解像度) |
| hopSize | 8192 | ホップサイズ |
| sampleRate | 44100Hz (実行時検出) | 実際のサンプルレート |
| minFreq | 100Hz | 最小検出周波数 |
| maxFreq | 2500Hz | 最大検出周波数 |
| 更新頻度 | 約5.4Hz | 44100 / 8192 |

**アルゴリズム**:
- FFTベース + HPS (Harmonic Product Spectrum)
- ハーモニクス数: 7
- 窓関数: Blackman-Harris
- サブビン精度: Quinn's first estimator

**信頼度計算** (Multi-Factor):
| ファクター | 重み | 説明 |
|------------|-----|------|
| peakProminence | 30% | ピーク突出度 |
| harmonicConsistency | 50% | ハーモニック一貫性（最重要）|
| spectralClarity | 20% | スペクトル明瞭度 |

**閾値**:
| 閾値 | デフォルト値 | 説明 |
|------|-------------|------|
| rmsSilenceThreshold | 0.02 | 無音判定RMS閾値 |
| confidenceThreshold | 0.4 | 信頼度閾値 |

### ピッチ検出アルゴリズム (PitchDetectionAlgorithm)

ファイル分析時に使用するアルゴリズムを選択可能。

| アルゴリズム | rawValue | 説明 | オクターブ補正 |
|-------------|----------|------|--------------|
| yin | "YIN" | 高速・安定 | 必要 |
| pyinDefault | "pYIN" | デフォルトpYIN | 不要 |
| pyinHighDetection | "pYIN-High" | 高検出率 | 不要 |
| pyinBalanced | "pYIN-Balanced" | バランス型 | 不要 |
| pyinAggressive | "pYIN-Aggressive" | アグレッシブ | 不要 |
| fcpe | "FCPE" | CoreMLモデル（推奨）| 不要 |

#### YINStrategy詳細

基本的なYINアルゴリズム実装。

| パラメータ | デフォルト値 | 説明 |
|----------|-----------|------|
| bufferSize | 2048 | FFTバッファサイズ |
| hopSize | 2205 | 50ms at 44100Hz |
| threshold | 0.25 | CMNDF閾値 |
| minFrequency | 80.0 Hz | 最低検出周波数 |
| maxFrequency | 1200.0 Hz | 最高検出周波数 |
| silenceThreshold | 0.0001 | 無音閾値 |

**特徴**:
- オクターブエラーが発生しやすい → OctaveCorrectionService適用推奨
- `requiresOctaveCorrection = true`

#### pYINStrategy詳細

確率的YIN実装。Hidden Markov Modelによる時間軸平滑化。

**デフォルト設定**:
| パラメータ | デフォルト値 | 説明 |
|----------|-----------|------|
| bufferSize | 2048 | FFTバッファサイズ |
| hopSize | 2205 | 50ms at 44100Hz |
| minFrequency | 80.0 Hz | 最低検出周波数 |
| maxFrequency | 1200.0 Hz | 最高検出周波数 |
| silenceThreshold | 0.0001 | 無音閾値 |
| thresholdDistribution | [0.01, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35, 0.40] | 複数閾値候補 |
| hmmTransitionWidth | 12.0 | HMM遷移幅（半音単位）|
| voicedBias | 0.0 | 有声検出バイアス |

**設定プリセット**:

| プリセット | voicedBias | hmmTransitionWidth | 用途 |
|-----------|------------|-------------------|------|
| default | 0.0 | 12.0 | 標準設定 |
| highDetection | 1.5 | 18.0 | 検出率優先 |
| aggressive | 3.0 | 24.0 | 最大検出 |
| balanced | 1.0 | 15.0 | バランス型 |

**特徴**:
- HMMによる時間軸平滑化でオクターブエラー低減
- `requiresOctaveCorrection = false`

#### FCPEStrategy詳細

CoreMLニューラルネットワークによる高精度ピッチ検出。

| パラメータ | 値 | 説明 |
|----------|---|------|
| targetSampleRate | 16000 Hz | リサンプリング先 |
| nMels | 128 | メルバンド数 |
| nFFT | 1024 | FFTサイズ |
| winSize | 1024 | 窓サイズ |
| hopLength | 160 | 10ms at 16kHz |
| f0Min | 32.7 Hz | 最低F0 |
| f0Max | 1975.5 Hz | 最高F0 |
| outDims | 360 | 出力次元数 |
| voicedThreshold | 0.006 | 有声判定閾値 |
| clipVal | 1e-5 | ログ圧縮クリップ値 |
| maxChunkDurationSeconds | 15.0 | チャンク処理最大長 |
| chunkOverlapSeconds | 0.5 | チャンクオーバーラップ |

**処理フロー**:
1. リサンプリング (44100Hz → 16000Hz)
2. メルスペクトログラム計算
3. CoreML推論
4. ロジットデコード（Viterbiベース）
5. PitchFrame生成

**長音声処理**:
- 15秒超の音声は自動的にチャンク処理
- 500msオーバーラップで連続性確保
- 進捗コールバック対応

**特徴**:
- 高精度、オクターブ安定
- `requiresOctaveCorrection = false`
- モデルウォームアップ実行（初回推論精度確保）

### ビブラート分析 (VibratoAnalyzer)

| パラメータ | 値 | 説明 |
|----------|---|------|
| minVibratoRate | 4.0 Hz | ビブラート最低レート |
| maxVibratoRate | 9.0 Hz | ビブラート最高レート |
| minimumExtentCents | 15.0 | 最小ビブラート幅 (cents) |
| maximumExtentCents | 200.0 | 最大ビブラート幅 (cents) |
| minimumRegularity | 0.15 | 最小規則性（デフォルト）|

**分析メソッド**:
| メソッド | 説明 |
|---------|------|
| analyze() | 基本分析 |
| analyzeWithStableRegion() | 安定領域分析 |
| analyzeWithSlidingWindow() | スライディングウィンドウ分析 |
| analyzeAllWindows() | 全ウィンドウ分析 |

### オーディオセッション (AudioSessionManager)

**録音モード (configureForRecording)**:
| 設定 | 値 |
|------|---|
| カテゴリ | .playAndRecord |
| モード | 動的選択（ヘッドフォン時: .measurement、ビルトイン時: .videoRecording）|
| オプション | .defaultToSpeaker, .allowBluetooth, .allowBluetoothA2DP |
| サンプルレート | 44100Hz |
| 入力ゲイン | 1.0 (最大) |

**モード選択ロジック**:
- ヘッドフォン（有線/Bluetooth）接続時: `.measurement`（精度優先）
- ビルトインスピーカー/マイク時: `.videoRecording`（音量優先、オートゲイン）

**参照カウント管理**:
- `registerActiveComponent()` / `unregisterActiveComponent()` でコンポーネント管理
- 最後のコンポーネントがunregisterされた時のみdeactivate

### MIDI/音源 (ScaleSoundType)

| 音源 | displayNameKey | GM Program | 説明 |
|------|----------------|------------|------|
| acousticGrandPiano | scale_sound.acoustic_grand_piano | 0 | ピアノ（デフォルト）|
| electricPiano | scale_sound.electric_piano | 4 | エレクトリックピアノ |
| acousticGuitar | scale_sound.acoustic_guitar | 24 | アコースティックギター |
| vibraphone | scale_sound.vibraphone | 11 | ビブラフォン |
| marimba | scale_sound.marimba | 12 | マリンバ |
| flute | scale_sound.flute | 73 | フルート |
| clarinet | scale_sound.clarinet | 71 | クラリネット |
| sineWave | scale_sound.sine_wave | (プログラム生成) | サイン波 |

---

## ユースケース

### 録音関連

**StartRecordingUseCase**:
- スケールなし録音開始
- RecordingPolicyServiceで権限チェック
- audioRecorder.prepareRecording() → startRecording()

**StartRecordingWithScaleUseCase**:
- スケール付き録音開始
- 処理フロー:
  1. 権限チェック (RecordingPolicyService)
  2. スケール要素生成 (`settings.generateScaleWithKeyChange()`)
  3. 録音準備 (prepareRecording)
  4. スケールロード (loadScaleElements)
  5. 録音開始
  6. タイムスタンプ記録開始
  7. スケール再生開始 (非ブロッキング)

**StopRecordingUseCase**:
- 録音停止・保存
- 処理フロー:
  1. スケール停止
  2. 録音停止
  3. PlaybackTimeline取得
  4. Recording保存
  5. AudioSession mode cache リセット

### 分析関連

**AnalyzeRecordingUseCase**:
- キャッシュ階層:
  1. In-memory cache (AnalysisCache) - 完全な分析結果
  2. File cache (FilePitchDataCache) - ピッチデータのみ（永続化）
  3. Full analysis - キャッシュミス時またはアルゴリズム変更時
- OctaveCorrectionService適用
- アルゴリズム変更時はキャッシュ無効化

---

## リポジトリ

### RecordingRepository (FileRecordingRepository)

| メソッド | 説明 |
|---------|------|
| findAll() | 全録音取得 |
| findById(RecordingId) | ID指定で取得 |
| save(Recording) | 録音保存 |
| delete(RecordingId) | 録音削除 |
| update(Recording) | 録音更新 |

**ファイル保存**:
- 保存先: Documents/
- メタデータ: Documents/recordings_metadata.json

### ScalePresetRepository (UserDefaultsScalePresetRepository)

| メソッド | 説明 |
|---------|------|
| findAll() | 全プリセット取得 |
| findById(UUID) | ID指定で取得 |
| save(ScalePreset) | プリセット保存 |
| delete(UUID) | プリセット削除 |
| update(ScalePreset) | プリセット更新 |

**保存先**: UserDefaults

### AudioSettingsRepository (UserDefaultsAudioSettingsRepository)

| メソッド | 説明 |
|---------|------|
| load() | 設定読み込み |
| save(AudioDetectionSettings) | 設定保存 |

**保存先**: UserDefaults

---

## デザインシステム

### カラーパレット (ColorPalette)

| 色名 | Light Mode | Dark Mode | 用途 |
|------|------------|-----------|------|
| primary | #4A9FD8 | #5CA9DD | メインアクション、選択状態 |
| secondary | #E8F1F8 | #1A2633 | カード背景、セクション区切り |
| background | #FFFFFF | #0A0F14 | 画面背景 |
| text | #1E3A5F | #D8E6F2 | 本文テキスト |
| accent | #3A8EC5 | #6DB8E8 | ピッチグラフ、データ可視化 |
| alertActive | #F2B705 | #FFD60A | 録音中インジケーター、警告 |

---

## データ永続化

### ローカルストレージ

| データ | 保存先 | キー/パターン |
|--------|--------|--------------|
| 録音ファイル | Documents/ | recording_*.m4a |
| 録音メタデータ | Documents/ | recordings_metadata.json |
| スケールプリセット | UserDefaults | scalePresets |
| オーディオ設定 | UserDefaults | audioDetectionSettings |
| フィルター設定 | UserDefaults | recordingFilterOption |
| ソート設定 | UserDefaults | recordingSortOption |
| ピッチデータキャッシュ | Caches/ | FilePitchDataCache |
| 分析キャッシュ | メモリ | AnalysisCache |

### StoreKit
- サブスクリプション状態はApp Store経由で管理
- トランザクション履歴の自動更新監視

---

## アーキテクチャ

### レイヤー構成
```
App/              # エントリーポイント、DI (DependencyContainer)
Domain/           # エンティティ、値オブジェクト、リポジトリIF
  └── Packages/VocalisDomain/
  └── Packages/SubscriptionDomain/
Application/      # ユースケース、サービス
Infrastructure/   # リポジトリ実装、AVFoundationラッパー
  └── Analysis/   # ピッチ検出戦略 (YIN, pYIN, FCPE)
  └── Audio/      # オーディオ関連
  └── Repositories/ # リポジトリ実装
  └── Logging/    # ロギング (FileLogger, OSLog)
Presentation/     # View、ViewModel (MVVM)
  └── Views/
  └── ViewModels/
  └── Theme/
```

### 主要フレームワーク

| フレームワーク | 用途 |
|---------------|------|
| SwiftUI | UI |
| Combine | リアクティブプログラミング |
| AVFoundation | オーディオ録音・再生・分析 |
| Accelerate | FFT処理 (vDSP) |
| CoreML | FCPEピッチ検出モデル |
| StoreKit 2 | アプリ内課金 |
| OSLog | ロギング |

---

## バージョン履歴

### v1.6.2 (現行)
- 録音中の経過時間表示を追加
- プログレスバーで残り時間を視覚的に確認
- 75%でオレンジ、90%で赤に色変化
- 更新間隔を100msに設定（滑らかな表示）

### v1.6.1
- オクターブロングトーンスケールパターン追加
- リアルタイムピッチ検出の更新頻度を2倍に向上
- スペクトル表示を対数スケールに変更
- スペクトル周波数範囲を2500Hzまで拡張

### v1.6.0
- ピッチグラフのスワイプ操作対応
- 自動追従モードの追加

### v1.5.x
- 分析画面の改善

### v1.4.0
- ロッシーニスケール追加

### v1.3.x
- 録音一覧フィルター機能
- パフォーマンス改善

### v1.2.0
- サブスクリプション機能

### v1.1.0
- StoreKitからの動的サブスクリプション情報表示
- App Store Guideline 3.1.2対応
- 8言語ローカライゼーション完備

### v1.0.0
- 初回リリース
- 基本録音機能
- スケール再生
- リアルタイムピッチ検出
- 分析機能
- サブスクリプション

---

## 関連ドキュメント

- [画面設計 v2](./SCREEN_DESIGN_V2.md)
- [分析画面仕様](./ANALYSIS_VIEW_SPECIFICATION.md)
- [ピッチ検出改善](./PITCH_DETECTION_IMPROVEMENT.md)
- [サブスクリプション設計](./SUBSCRIPTION_DESIGN.md)
- [調査チェックリスト](./SPEC_INVESTIGATION_CHECKLIST.md)

---

*作成日: 2025-12-15*
*最終更新: 2025-12-15*
*調査に基づく包括的仕様書*
