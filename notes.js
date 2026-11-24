/**
 * Notes du présentateur — jamais montrées sur la slide, uniquement en mode
 * « speaker ». Elles servent à tenir le temps et à ne pas réciter.
 *
 * guide  : ce qu'il faut montrer ou faire
 * speech : la phrase à dire (elle peut être lue telle quelle)
 * key    : la phrase qui doit rester
 * avoid  : ce qu'il ne faut pas dire
 */

export const NOTES = {
  ouverture: {
    guide: "Rester sur le titre, souris immobile. Afficher le badge MOCK MODE si la console est ouverte.",
    speech:
      "Je m'appelle Hafida El-Mouden, développeuse Full Stack Python. Je vais vous montrer un proof of concept personnel que j'ai conçu et développé seule : une couche de qualification et de contrôle qualité pour GoHighLevel. Les deux marques que vous verrez sont fictives, les données sont synthétiques.",
    key: "PoC personnel, données synthétiques : rien ici n'est un client réel.",
    show: ["le titre", "le badge MOCK MODE en fond si la console est ouverte"],
    avoid: ["dire 'mon entreprise'", "laisser croire à une implantation client"],
    next: "Le problème métier, en une slide.",
  },
  probleme: {
    guide: "Suivre les trois cartes de gauche à droite, sans les lire mot à mot.",
    speech:
      "Une demande de rénovation se perd entre le formulaire, le téléphone et le CRM. Selon qui répond, le budget n'est pas demandé ; la visite technique se planifie sur un dossier vide ; et quand le lead est perdu, personne ne sait si c'est un oubli, un manque de qualification ou une intégration cassée.",
    key: "Le CRM dit ce qui s'est passé ; il ne dit pas si l'intégration a tenu.",
    show: ["les trois cartes", "la citation en bas"],
    avoid: ["inventer des chiffres de marché", "parler de prix"],
    next: "Ce que le système est — et ce qu'il n'est pas.",
  },
  positionnement: {
    guide: "Le positionnement est la question qu'un recruteur pose en premier. Répondre avant qu'il la pose.",
    speech:
      "Je précise tout de suite : ce n'est pas un second CRM. GoHighLevel garde les contacts, les pipelines, les tags, les notes. Ce que j'ajoute, c'est la décision : analyse IA, règles déterministes, idempotence, revue humaine, et la supervision de l'intégration elle-même.",
    key: "GoHighLevel reste la source de vérité business.",
    show: ["les deux colonnes côte à côte"],
    avoid: ["dire 'j'ai remplacé leur CRM'"],
    next: "L'architecture, avec les frontières.",
  },
  architecture: {
    guide: "Insister sur les frontières, pas sur les boîtes : c'est ce qui distingue un schéma utile d'un schéma décoratif.",
    speech:
      "n8n orchestre, il ne décide pas. GoHighLevel capture, il ne décide pas. FastAPI est la seule brique qui choisit la route, et PostgreSQL garde la preuve. Le LLM extrait une structure ; il n'accorde jamais une qualification et il ne produit aucun prix.",
    key: "Le LLM propose, le code décide.",
    show: ["les quatre boîtes", "les trois cartes qui nomment les interdits"],
    avoid: ["détailler les versions de bibliothèques ici"],
    next: "Le parcours métier en six étapes.",
  },
  parcours: {
    guide: "C'est la slide qui vend le projet. Parcourir les six lignes de haut en bas, une phrase chacune.",
    speech:
      "Le parcours complet : qualification, revue humaine si nécessaire, visite de site, estimé validé par un humain, opportunité acceptée, transfert à l'atelier. À chaque étape, ce qui est garanti est écrit en face — pas une promesse, une règle tenue par le code.",
    key: "Six étapes, six garanties, une ligne d'audit par transition.",
    show: ["le tableau", "la ligne de garantie de l'estimé"],
    avoid: ["détailler les 14 étapes du pipeline ici, c'est la slide suivante"],
    next: "Ce que le système s'interdit.",
  },
  "garde-fous": {
    guide: "Slide à dire lentement. Ce sont les interdits qui rassurent, pas les fonctions.",
    speech:
      "Ce que le système s'interdit : aucun prix — le schéma n'a pas de champ pour cela, le montant d'un estimé est tapé par un humain et approuvé par un humain. Aucun message client : en mode démo, l'envoi produit une trace et rien ne part. Et une injection de prompt ne change pas la décision : elle déclenche une revue de sécurité.",
    key: "Aucun prix, aucun message, aucune décision sans humain.",
    show: ["les quatre cartes", "la citation sur l'injection de prompt"],
    avoid: ["dire que c'est 'sécurisé' sans dire contre quoi"],
    next: "La preuve chez GoHighLevel.",
  },
  preuve: {
    guide: "Ouvrir GHL à côté si possible : pipeline, champs, opportunité. Sinon, lire les chiffres.",
    speech:
      "Ce n'est pas une maquette. Le pipeline a 14 étapes, 19 champs personnalisés et 8 tags ont été créés par API, et un lead réel est arrivé dans la sandbox : contact avec 10 tags et 18 champs, opportunité placée à Site Visit To Schedule, une note d'analyse et une tâche pour l'équipe.",
    key: "Le même code tourne en mode simulé et en mode réel.",
    show: ["les trois chiffres", "la carte 'un lead réel'"],
    avoid: ["montrer un jeton ou un identifiant de compte"],
    next: "La console.",
  },
  console: {
    guide: "Cliquer sur /diagnostic ou /projects si la démo est ouverte ; sinon commenter les deux captures.",
    speech:
      "La console n'est pas un tableau de bord décoratif : chaque tuile interroge réellement le service. Et la page Parcours répond à la question du commercial : où en est ce lead, et quelle action est attendue maintenant.",
    key: "Une console qui dit la vérité sur son propre état.",
    show: ["le bandeau de santé", "la liste des parcours"],
    avoid: ["zoomer sur des données personnelles"],
    next: "Le Guardian.",
  },
  guardian: {
    guide: "C'est la partie la plus originale : marteler que personne ne surveille ce trou-là.",
    speech:
      "Le Guardian regarde ce qu'aucun CRM ne regarde : une visite dont l'heure est passée, un estimé qui attend une validation depuis 24 heures, un contrat signé sans transfert à l'atelier, une synchronisation CRM en échec. Il n'envoie rien au client : il alerte en interne et peut rejouer une synchronisation.",
    key: "Le Guardian surveille le processus, pas le client.",
    show: ["les deux cartes", "la citation"],
    avoid: ["promettre des alertes SMS"],
    next: "Les tests, et ce qu'ils ont attrapé.",
  },
  qualite: {
    guide: "Assumer les bugs trouvés : c'est la slide la plus crédible pour une équipe technique.",
    speech:
      "229 tests, ruff et mypy propres, la même suite sur SQLite et PostgreSQL. Et trois vrais défauts attrapés par les garde-fous : une colonne obligatoire absente du modèle — invisible en SQLite, bloquante en PostgreSQL ; des champs personnalisés qui partaient au mauvais format, GHL répondait succès et n'enregistrait rien ; un jeton d'agence utilisé pour des contacts.",
    key: "Les tests n'ont pas validé le code, ils ont trouvé ses erreurs.",
    show: ["les trois cartes", "la liste des trois bugs"],
    avoid: ["dire 'aucun bug'"],
    next: "La méthode.",
  },
  methode: {
    guide: "Rythme rapide, c'est la slide des preuves de travail.",
    speech:
      "Le cahier des charges, l'architecture, le client GoHighLevel typé et vérifié contre la documentation 2021-07-28, le moteur de règles, les workflows n8n exportés sans secret, la console en Jinja2 sans framework front, et la documentation d'exploitation.",
    key: "Un dépôt, une histoire : application, workflows, tests, docs.",
    show: ["la liste"],
    avoid: ["lister des technologies non utilisées"],
    next: "Les limites, dites franchement.",
  },
  limites: {
    guide: "Ne pas s'excuser : annoncer les limites comme des décisions.",
    speech:
      "Ce que le PoC ne fait pas, et pourquoi c'est écrit : pas de prix, pas de courriel client, le formulaire et le workflow GHL restent à configurer dans l'interface, et trois flux du cahier des charges sont au roadmap. Rien de tout cela ne bloque les six flux livrés.",
    key: "Une limite annoncée vaut mieux qu'une promesse floue.",
    show: ["le tableau, colonne État"],
    avoid: ["minimiser", "sur-promettre une date"],
    next: "Ce que je cherche.",
  },
  suite: {
    guide: "Regarder l'interlocuteur, pas l'écran.",
    speech:
      "Ce que je cherche : un poste où l'intégration et la fiabilité comptent. Ce que ce PoC démontre : je pars d'un problème métier, je choisis une architecture, je livre, je teste, je documente, et je dis ce qui ne marche pas.",
    key: "Je livre, et je dis la vérité sur ce que j'ai livré.",
    show: ["les deux cartes"],
    avoid: ["négocier le salaire ici"],
    next: "Merci, et les questions.",
  },
  merci: {
    guide: "Laisser la slide à l'écran pendant les questions.",
    speech: "Merci. Je peux ouvrir le code, la démo, ou détailler n'importe quelle décision.",
    key: "Trois portes d'entrée : la démo, le code, la documentation.",
    show: ["le contact"],
    avoid: ["rester sur la slide du dossier pendant les questions"],
    next: "",
  },
};
