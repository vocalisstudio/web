# Vocalis Studio Web

Vocalis Studio の Web サイトおよび関連ドキュメントのリポジトリです。

## ディレクトリ構成

```
web/
├── docs/              # 公開ページ (GitHub Pages)
│   ├── index.html     # 日本語製品ページ
│   ├── en/            # 英語版ページ
│   │   ├── index.html
│   │   ├── privacy.html
│   │   ├── terms.html
│   │   └── support.html
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

## App Store

- **日本**: https://apps.apple.com/jp/app/vocalis-studio/id6755569862
- **US**: https://apps.apple.com/us/app/vocalis-studio/id6755569862

## SNS

- **X (Twitter)**: [準備中]
- **Instagram**: [準備中]

## 開発

### ローカルプレビュー

```bash
cd docs
python -m http.server 8000
# http://localhost:8000 でプレビュー
```

### デプロイ

`main` ブランチへの push で GitHub Pages に自動デプロイされます。

## ライセンス

© 2025 Kazu Asato. All rights reserved.
