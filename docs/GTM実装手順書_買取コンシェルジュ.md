# GTM実装手順書（買取コンシェルジュ LP）

対象ファイル：`index.html`
作業箇所：合計11箇所（CTA 4箇所 ＋ セクション 5箇所 ＋ GTMスニペット 2箇所）

---

## 作業① GTMスニペットの設置（2箇所）

### 1-A. head内に追加（行3〜4の間）

現在：
```html
<head>
  <meta charset="UTF-8">
```

変更後：
```html
<head>
  <meta charset="UTF-8">
  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-ML88PJXH');</script>
  <!-- End Google Tag Manager -->
```

### 1-B. body直後に追加（行14の直後）

現在：
```html
<body>
  <!-- ========== 0. ヘッダー ========== -->
```

変更後：
```html
<body>
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-ML88PJXH"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->

  <!-- ========== 0. ヘッダー ========== -->
```

- [ ] 1-A 完了
- [ ] 1-B 完了

---

## 作業② CTA の data-gtm 属性を修正（4箇所）

現在のHTMLには既にdata-gtm属性が付与されていますが、**GTM指示一覧の命名規則と一致していません。**
以下の通り値を修正してください。

### 2-A. No.2 ヘッダー電話ボタン（行24）

現在：
```html
<a href="tel:080-7270-6108" class="c-btn c-btn--primary" data-gtm="header-cta-phone">
```

変更後：
```html
<a href="tel:08072706108" class="c-btn c-btn--primary" data-gtm="cta-tel-header">
```

変更点：
- `data-gtm` の値を `header-cta-phone` → `cta-tel-header` に変更
- `href` のハイフンを削除（`080-7270-6108` → `08072706108`）

- [ ] 2-A 完了

### 2-B. No.3 ファーストビュー直下 電話CTA（行83）

現在：
```html
<a href="tel:080-7270-6108" class="c-btn c-btn--primary c-btn--lg" data-gtm="hero-cta-phone">
```

変更後：
```html
<a href="tel:08072706108" class="c-btn c-btn--primary c-btn--lg" data-gtm="cta-tel-fv">
```

変更点：
- `data-gtm` の値を `hero-cta-phone` → `cta-tel-fv` に変更
- `href` のハイフンを削除

- [ ] 2-B 完了

### 2-C. No.6 ファーストビュー直下 LINEボタン（行87）

現在：
```html
<a href="#" class="c-btn c-btn--line c-btn--lg" data-gtm="hero-cta-line">
```

変更後：
```html
<a href="https://line.me/R/ti/p/@813viixe" class="c-btn c-btn--line c-btn--lg" data-gtm="cta-line-fv">
```

変更点：
- `data-gtm` の値を `hero-cta-line` → `cta-line-fv` に変更
- `href` を `#` → 実際のLINE URL に変更

- [ ] 2-C 完了

### 2-D. No.1 固定バナー電話ボタン SP専用（行492）

現在：
```html
<a href="tel:080-7270-6108" class="p-fixed-banner__image-link" data-gtm="fixed-banner">
```

変更後：
```html
<a href="tel:08072706108" class="p-fixed-banner__image-link" data-gtm="cta-tel-floating">
```

変更点：
- `data-gtm` の値を `fixed-banner` → `cta-tel-floating` に変更
- `href` のハイフンを削除

- [ ] 2-D 完了

---

## 作業③ セクションに data-gtm-section 属性を追加（5箇所）

各sectionタグの開始タグに `data-gtm-section` 属性を**追記**します。
既存の属性は一切変更しません。

### 3-A. No.12 ファーストビューセクション（行63）

現在：
```html
<section class="p-hero">
```

変更後：
```html
<section class="p-hero" data-gtm-section="fv">
```

- [ ] 3-A 完了

### 3-B. No.13 買取実績セクション（行142）

現在：
```html
<section class="p-results" id="results">
```

変更後：
```html
<section class="p-results" id="results" data-gtm-section="items">
```

- [ ] 3-B 完了

### 3-C. No.14 選ばれる理由セクション（行223）

現在：
```html
<section class="p-reasons" id="reasons">
```

変更後：
```html
<section class="p-reasons" id="reasons" data-gtm-section="reason">
```

- [ ] 3-C 完了

### 3-D. No.16 ご利用の流れセクション（行317）

現在：
```html
<section class="p-flow" id="flow">
```

変更後：
```html
<section class="p-flow" id="flow" data-gtm-section="flow">
```

- [ ] 3-D 完了

### 3-E. No.17 よくある質問セクション（行359）

現在：
```html
<section class="p-faq" id="faq">
```

変更後：
```html
<section class="p-faq" id="faq" data-gtm-section="faq">
```

- [ ] 3-E 完了

---

## 作業④ 電話番号リンクのハイフン削除（追加対象）

GTM指示一覧に「`href="tel:08072706108"` で統一」と記載されています。
作業②以外にも `tel:080-7270-6108`（ハイフン付き）が存在する箇所をすべて修正してください。

| 行 | 場所 | 現在の href | 変更後の href |
|----|------|-----------|-------------|
| 24 | ヘッダー電話 | `tel:080-7270-6108` | `tel:08072706108` |
| 48 | ハンバーガー内電話 | `tel:080-7270-6108` | `tel:08072706108` |
| 83 | FV直下電話 | `tel:080-7270-6108` | `tel:08072706108` |
| 102 | SP用MV下電話 | `tel:080-7270-6108` | `tel:08072706108` |
| 451 | クロージング電話 | `tel:080-7270-6108` | `tel:08072706108` |
| 492 | 固定バナー電話 | `tel:080-7270-6108` | `tel:08072706108` |

- [ ] 全6箇所のハイフン削除完了

---

## 作業⑤ LINE URLの差し替え

`href="#"` となっているLINEボタンを実際のURLに差し替えてください。

| 行 | 場所 | 現在の href | 変更後の href |
|----|------|-----------|-------------|
| 28 | ヘッダーLINE | `#` | `https://line.me/R/ti/p/@813viixe` |
| 52 | ハンバーガー内LINE | `#` | `https://line.me/R/ti/p/@813viixe` |
| 87 | FV直下LINE | `#` | `https://line.me/R/ti/p/@813viixe` |
| 106 | SP用MV下LINE | `#` | `https://line.me/R/ti/p/@813viixe` |
| 456 | クロージングLINE | `#` | `https://line.me/R/ti/p/@813viixe` |

- [ ] 全5箇所のLINE URL差し替え完了

---

## 最終チェックリスト

### GTMスニペット
- [ ] head内にGTMスクリプトが設置されている
- [ ] body直後にGTM noscriptが設置されている
- [ ] コンテナIDが `GTM-ML88PJXH` になっている

### CTA data-gtm属性（値が指示通りか）
- [ ] ヘッダー電話 → `data-gtm="cta-tel-header"`
- [ ] FV直下電話 → `data-gtm="cta-tel-fv"`
- [ ] FV直下LINE → `data-gtm="cta-line-fv"`
- [ ] 固定バナー電話 → `data-gtm="cta-tel-floating"`

### セクション data-gtm-section属性
- [ ] ファーストビュー → `data-gtm-section="fv"`
- [ ] 買取実績 → `data-gtm-section="items"`
- [ ] 選ばれる理由 → `data-gtm-section="reason"`
- [ ] ご利用の流れ → `data-gtm-section="flow"`
- [ ] よくある質問 → `data-gtm-section="faq"`

### 電話番号リンク
- [ ] 全6箇所が `tel:08072706108`（ハイフンなし）になっている

### LINE URL
- [ ] 全5箇所が `https://line.me/R/ti/p/@813viixe` になっている

### 動作確認
- [ ] GTM Tag Assistantプレビューモードで各CTAクリック時にdata-gtm属性値が送出される
- [ ] 各セクション表示時にdata-gtm-section属性値がElement Visibilityで検出される
- [ ] tel: リンクがSPでタップ発信できる（PCでは非動作でOK）

---

## 注意事項

- `data-gtm` / `data-gtm-section` 属性はBEMのclass属性とは独立。classは一切変更しない
- `dataLayer.push` 等のJavaScript記述は不要（GTM側で属性値をフックして取得する）
- 追従バナーと背面要素のクリック判定が重複しないよう、z-indexの重なり順に注意
- GTMタグの設定・Google広告CVタグの紐付けはVONDS側で実施（こちらの作業範囲外）
