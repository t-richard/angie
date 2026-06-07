# PORTFOLIO ORAL — Product Requirements

## Objectif du site
Site portfolio personnel destiné à un oral d'examen / entretien d'embauche.
Non accessible publiquement après l'oral.

Le site doit être :
- simple à naviguer pendant un oral
- professionnel et créatif maîtrisé (pas "IA design")
- orienté professionnalisation et relation client
- fluide, rapide, et lisible en présentation

---

## Design
- Fond clair
- Texte noir ou bleu-gris foncé
- Accent jaune moutarde
- Typographie mixte : sans-serif (corps) + serif (titres)
- Style sobre, sans effets "IA design"

---

## Structure générale

### 1. Splash screen
- Affichage plein écran au chargement avec le texte "Bienvenue sur mon portfolio"
- Disparaît automatiquement après 2,5 secondes (ou au clic)
- Le texte persiste en plus petit en haut de la page principale après la transition

### 2. Navigation
- Barre fixe en haut de page, toujours visible
- 5 onglets : Marketing · Vente · Communication · Business Développement · Management de la Relation Client

### 3. Page d'accueil
- Photo de profil
- Nom + prénom
- Titre / rôle
- Mini description professionnelle
- Liste de centres d'intérêt
- QR code LinkedIn (cliquable et scannable en oral)

### 4. Pages catégories (×5)
Chaque page contient une grille de **6 compétences** en **2 colonnes**.

Chaque carte affiche :
- Image principale
- Titre
- Texte résumé

Au clic sur une carte → **modale** affichant :
- Titre
- Image en grand
- Texte complet
- Fermeture au clic sur le fond, bouton ×, ou touche Echap

---

## UX

### Site presentation-ready par défaut
Pas de mode présentateur séparé. L'intégralité du site est conçu pour la navigation fluide en oral :
- Aucun bouton inutile
- Navigation orientée contenu
- Lecture rapide des compétences

### Animations
- Splash : fondu sortant, le texte se réduit en élément de header
- Carte : légère élévation au survol
- Modale : fondu + légère mise à l'échelle à l'ouverture et la fermeture

---

## Compatibilité
- Desktop et mobile
- Grille 2 colonnes sur desktop, 1 colonne sur mobile
