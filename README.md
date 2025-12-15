# Vocalis Studio Web

Vocalis Studio の Web サイトおよび関連ドキュメントのリポジトリです。

## ディレクトリ構成

```
web/
├── blog/              # ブログ（Astro）
│   ├── src/
│   │   ├── content/   # ブログ記事（Markdown）
│   │   │   └── posts/
│   │   ├── layouts/   # レイアウトテンプレート
│   │   ├── pages/     # ページルーティング
│   │   ├── components/# UIコンポーネント
│   │   └── styles/    # スタイル
│   ├── content-management/  # AI記事作成用（管理）
│   │   ├── AGENT_INSTRUCTIONS.md  # AI向け指示書
│   │   ├── guidelines/      # 執筆ガイドライン
│   │   ├── templates/       # 記事テンプレート
│   │   └── drafts/          # 下書き保存場所
│   ├── public/        # 静的アセット
│   ├── astro.config.mjs
│   └── package.json
│
├── docs/              # 公開ページ (GitHub Pages)
│   ├── index.html     # 日本語製品ページ
│   ├── en/            # 英語版ページ
│   │   ├── index.html
│   │   ├── privacy.html
│   │   ├── terms.html
│   │   └── support.html
│   ├── blog/          # ブログ出力先（Astroビルド）
│   ├── privacy.html   # プライバシーポリシー
│   ├── terms.html     # 利用規約
│   ├── support.html   # サポートページ
│   ├── images/        # 画像アセット
│   │   ├── jp/        # 日本語スクリーンショット
│   │   └── en/        # 英語スクリーンショット
│   ├── sitemap.xml    # サイトマップ
│   └── robots.txt     # クローラー設定
│
├── sns/               # SNS運用（非公開）
│   ├── strategy.md    # 運用方針
│   ├── calendar.md    # 投稿スケジュール
│   ├── templates/     # 共通テンプレート
│   ├── x/             # X（Twitter）
│   │   ├── posts/YYYY/MM/
│   │   │   ├── ja/    # 日本語投稿
│   │   │   └── en/    # 英語投稿
│   │   └── assets/images/
│   │       ├── ja/    # 日本語用画像
│   │       └── en/    # 英語用画像
│   ├── instagram/     # Instagram
│   │   ├── posts/YYYY/MM/
│   │   │   ├── ja/    # 日本語投稿
│   │   │   └── en/    # 英語投稿
│   │   └── assets/images/
│   │       ├── ja/    # 日本語用画像
│   │       └── en/    # 英語用画像
│   └── shared/images/ # 共通素材（ロゴ等）
│       ├── ja/
│       └── en/
│
└── spec/              # アプリ仕様書
```

## 公開URL

- **日本語**: https://vocalisstudio.github.io/web/
- **English**: https://vocalisstudio.github.io/web/en/
- **ブログ**: https://vocalisstudio.github.io/web/blog/

## App Store

- **日本**: https://apps.apple.com/jp/app/vocalis-studio/id6755569862
- **US**: https://apps.apple.com/us/app/vocalis-studio/id6755569862

## SNS

- **X (Twitter)**: [準備中]
- **Instagram**: [準備中]

## 開発

### ブログ開発

```bash
cd blog
npm install
npm run dev
# http://localhost:4321/web/blog/ でプレビュー
```

### ブログビルド

```bash
cd blog
npm run build
# docs/blog/ に出力される
```

### 製品ページのローカルプレビュー

```bash
cd docs
python -m http.server 8000
# http://localhost:8000 でプレビュー
```

### デプロイ

`main` ブランチへの push で GitHub Pages に自動デプロイされます。

**ブログの更新フロー:**
1. `blog/src/content/posts/` に記事を追加
2. `cd blog && npm run build` でビルド
3. `docs/blog/` の変更をコミット・プッシュ

### AIエージェントによる記事作成

詳細は `blog/content-management/AGENT_INSTRUCTIONS.md` を参照。

```bash
# AIへの指示例
@blog/content-management/guidelines/BLOG_STYLE_GUIDE.md
「ピッチ分析の基礎」について記事を作成してください。
```

**フロー:**
1. AIが `blog/content-management/drafts/` に下書きを作成
2. 人間がレビュー・修正
3. `blog/src/content/posts/` に移動
4. ビルド＆デプロイ

## ライセンス

© 2025 Kazu Asato. All rights reserved.
