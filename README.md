# 🖨️ Kopirnica Bezistan - Statički Sajt

Kompletan GitHub i Vercel-ready sajt za Kopirnica Bezistan. Jednostavan, brz i mobilno optimizovan.

## 📂 Struktura Projekta
```
/
├─ index.html
├─ /assets/
│  ├─ styles.css
│  └─ main.js
├─ /public/
│  ├─ slika1.jpg
│  ├─ slika2.jpg
│  ├─ slika3.jpg
│  ├─ slika4.jpg
│  ├─ logo.png
│  ├─ favicon.ico
│  └─ og-image.png
├─ content.json
├─ vercel.json
├─ README.md
└─ .gitignore
```

## 🚀 Deployment (bez CLI-ja)

### 1) GitHub
- Napravi novi **public** repozitorij (`kopirnica-bezistan`) na GitHub-u (web ili mobilna app).
- Uploaduj sve fajlove i foldere iz ovog projekta.

### 2) Vercel
- Otvori **vercel.com** → **New Project** → **Import GitHub Repo** → odaberi repo i **Deploy**.
- Dobićeš URL tipa `https://kopirnica-bezistan.vercel.app`.

### 3) Brze izmjene (bez diranja HTML-a)
- **Tekst i linkovi**: izmijeni `content.json` (naslovi, opisi, kontakt, radno vrijeme).
- **Slike**: zamijeni fajlove u `/public/` istim imenima (`slika1.jpg`, `slika2.jpg`, …, `logo.png`, `og-image.png`, `favicon.ico`).
- **Commit & push** na GitHub → Vercel odradi redeploy automatski.

### 4) Custom domena
- U Vercel dashboardu projekta → **Settings → Domains** → dodaj domen → slijedi DNS upute.

## ℹ️ Napomene
- Ovo je čisto statički sajt (nema backend-a). Kontakt je `mailto:` link.
- `assets/main.js` dinamički učitava `content.json` i popunjava DOM.
- Paleta boja i stilovi su u `assets/styles.css`.
