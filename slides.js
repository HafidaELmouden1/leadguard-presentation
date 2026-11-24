/**
 * Contenu des slides. Un fichier pour tout ce qui se lit : durées, sections,
 * titres. Le rendu vit dans deck.js, les notes dans notes.js.
 *
 * Règle de rédaction : une idée par slide, des verbes précis, et pour chaque
 * brique d'architecture ce qu'elle fait *et* ce qu'elle ne fait jamais.
 */

const node = (title, detail, hot = false) =>
  `<div class="step${hot ? " hot" : ""}"><b>${title}</b><span>${detail}</span></div>`;

const arrow = '<div class="arrow">→</div>';

const card = (title, body, soft = true) =>
  `<div class="card${soft ? " soft" : ""}"><h3>${title}</h3><p class="small" style="margin:0">${body}</p></div>`;

const pill = (label, tone) => `<span class="pill ${tone}">${label}</span>`;

export const SLIDES = [
  {
    id: "ouverture",
    tone: "dark",
    section: "Ouverture",
    title: "LeadGuard AI",
    seconds: 25,
    html: () => `
      <div class="brand">
        <div class="mark">LG</div>
        <div class="brand-name">AI Integration &amp; Quality Control Center</div>
      </div>
      <h1>LeadGuard AI</h1>
      <p class="lead" style="font-size:clamp(17px,1.85cqw,28px);max-width:42ch">
        Qualifier chaque demande, la faire valider par un humain, la suivre
        jusqu’au chantier — et prouver chaque étape.
      </p>
      <p class="tiny" style="margin-top:3cqh">
        Hafida El-Mouden · Développeuse Full Stack Python · PoC personnel, données synthétiques
      </p>`,
  },
  {
    id: "probleme",
    section: "Contexte",
    title: "Une demande se perd entre le formulaire, le téléphone et le CRM",
    seconds: 45,
    html: () => `
      <p class="kicker">Le problème</p>
      <h2>Une demande entrante se perd entre le formulaire, le téléphone et le CRM</h2>
      <div class="grid3">
        ${card("Réponse lente", "Un lead de rénovation contacté en 48 h est déjà chez un concurrent. Le SLA promis est de 30 minutes.")}
        ${card("Qualification inégale", "Selon qui répond, le budget, la surface ou l’urgence ne sont pas demandés. La visite technique se planifie parfois sur un dossier vide.")}
        ${card("Aucune preuve", "Quand un lead est perdu, personne ne sait s’il n’a jamais été qualifié, s’il a été oublié, ou si le CRM a échoué.")}
      </div>
      <p class="quote" style="margin-top:3.4cqh">
        « Un CRM dit ce qui s’est passé. Il ne dit pas si la décision était juste,
        ni si l’intégration a tenu. »
      </p>`,
  },
  {
    id: "positionnement",
    section: "Positionnement",
    title: "Ce n’est pas un second CRM",
    seconds: 40,
    html: () => `
      <p class="kicker">Le positionnement</p>
      <h2>Ce n’est pas un second CRM</h2>
      <div class="row">
        <div class="card col" style="flex:.9">
          <h3 style="color:var(--muted)">GoHighLevel garde</h3>
          <ul class="small">
            <li>contacts, champs, tags</li>
            <li>opportunités et pipelines</li>
            <li>notes, tâches, calendriers</li>
            <li>workflows CRM</li>
          </ul>
        </div>
        <div class="card col" style="border-color:#bfdbfe;background:#f8fbff">
          <h3 style="color:var(--blue)">LeadGuard ajoute</h3>
          <ul class="small">
            <li>analyse IA + décision par règles</li>
            <li>idempotence et reprise sur erreur</li>
            <li>revue humaine obligatoire</li>
            <li>parcours visite → estimé → transfert</li>
            <li>Quality Guardian, audit, métriques</li>
          </ul>
        </div>
      </div>
      <p class="tiny" style="margin-top:2cqh">
        L’atelier reste maître de l’exécution des travaux. LeadGuard ne garde que les données d’intégration.
      </p>`,
  },
  {
    id: "architecture",
    section: "Architecture",
    title: "Chaque brique a une frontière",
    seconds: 50,
    html: () => `
      <p class="kicker">Architecture</p>
      <h2>Trois couches, un seul point de décision</h2>
      <div class="flow">
        ${node("Formulaire / appel", "GoHighLevel capture la demande, rien de plus")}
        ${arrow}
        ${node("n8n", "orchestre le flux, ne décide pas")}
        ${arrow}
        ${node("FastAPI", "valide, décide, trace — seule brique qui choisit la route", true)}
        ${arrow}
        ${node("PostgreSQL", "événements, analyses, preuves")}
      </div>
      <div class="grid3" style="margin-top:3cqh">
        ${card("LLM : DeepSeek", "extrait une structure — n’accorde jamais une qualification, ne produit aucun prix")}
        ${card("Secours : GLM", "bascule automatique, la panne est un cas normal et se voit")}
        ${card("Mock-first", "même code et mêmes tests, CRM simulé ou sandbox réelle")}
      </div>
      <p class="quote" style="margin-top:2.6cqh">Le LLM propose une extraction. Le code Python décide.</p>`,
  },
  {
    id: "parcours",
    section: "Parcours",
    title: "De la demande au chantier, en six étapes",
    seconds: 50,
    html: () => `
      <p class="kicker">Le parcours</p>
      <h2>De la demande au chantier, en six étapes suivies</h2>
      <table>
        <tr><th>#</th><th>Étape</th><th>Ce qui est garanti</th></tr>
        <tr><td><strong>1</strong></td><td>Qualification</td><td>règles déterministes : ville, service, consentement, budget déclaré, doublons</td></tr>
        <tr><td><strong>2</strong></td><td>Revue humaine</td><td>aucun lead douteux ne part sans décision nominative tracée</td></tr>
        <tr><td><strong>3</strong></td><td>Visite de site</td><td>un seul créneau actif ; un retard est signalé par le Guardian</td></tr>
        <tr><td><strong>4</strong></td><td>Estimé</td><td>montant saisi par un humain ; envoi impossible sans approbation</td></tr>
        <tr><td><strong>5</strong></td><td>Opportunité acceptée</td><td>réponse client enregistrée, rien n’est supprimé</td></tr>
        <tr><td><strong>6</strong></td><td>Transfert atelier</td><td>seul un estimé accepté part ; échec tracé et rejouable</td></tr>
      </table>
      <p class="tiny" style="margin-top:1.6cqh">
        Chaque transition écrit une ligne d’audit avec son acteur : la démo est reproductible, pas racontée.
      </p>`,
  },
  {
    id: "garde-fous",
    section: "Garde-fous",
    title: "Ce que le système s’interdit",
    seconds: 45,
    html: () => `
      <p class="kicker">Garde-fous</p>
      <h2>Ce que le système s’interdit</h2>
      <div class="grid2">
        ${card("Aucun prix", "Le schéma d’analyse n’a pas de champ pour un prix, une remise ou une taxe. Le montant d’un estimé est tapé par un humain.", false)}
        ${card("Aucun message client", "<span class='mono'>ENABLE_OUTBOUND_MESSAGES=false</span> : l’envoi d’un estimé produit une trace, aucun courriel ne part.", false)}
        ${card("Validation humaine", "Approbation nominative avant tout envoi ou transfert ; le nom du valideur est dans l’audit.", false)}
        ${card("Idempotence", "Clé unique en base : un webhook rejoué ne crée ni doublon ni second contact.", false)}
      </div>
      <p class="quote" style="margin-top:2.6cqh">
        Une injection de prompt ne change pas la décision : elle déclenche une revue de sécurité.
      </p>`,
  },
  {
    id: "preuve",
    section: "Preuve",
    title: "Branché sur un sous-compte réel",
    seconds: 50,
    html: () => `
      <p class="kicker">Preuve · GoHighLevel</p>
      <h2>Branché sur un sous-compte réel, pas sur une maquette</h2>
      <div class="row">
        <div class="col">
          <div class="kpi" style="flex-direction:column;gap:1.2cqh">
            <div><b>14</b><span>étapes dans le pipeline « Construction Sales »</span></div>
            <div><b>19</b><span>champs personnalisés <span class="mono">leadguard_*</span></span></div>
            <div><b>8</b><span>tags posés par l’intégration</span></div>
          </div>
        </div>
        <div class="col">
          <div class="card soft">
            <h3>Un lead réel, vérifié par API</h3>
            <ul class="small" style="margin-top:1cqh">
              <li>contact créé, <strong>10 tags</strong>, <strong>18 champs</strong> remplis</li>
              <li>opportunité placée à <strong>Site Visit To Schedule</strong></li>
              <li>note d’analyse + tâche « [URGENT] qualifier le lead »</li>
              <li>le même code tourne en mode simulé, sans GHL</li>
            </ul>
          </div>
        </div>
      </div>
      <p class="tiny" style="margin-top:2cqh">
        Sandbox GoHighLevel · API v2 · en-tête 2021-07-28 · jeton de sous-compte, jamais commité.
      </p>`,
  },
  {
    id: "console",
    section: "Produit",
    title: "Un poste de pilotage",
    seconds: 40,
    html: () => `
      <p class="kicker">La console</p>
      <h2>Un poste de pilotage, pas un tableau de bord décoratif</h2>
      <div class="row">
        <div class="col">
          <div class="shot"><img src="img/health.png" alt="Bandeau de santé des intégrations"></div>
          <p class="tiny" style="margin-top:1cqh">Chaque tuile interroge réellement le service : GHL, n8n, base, LLM.</p>
        </div>
        <div class="col">
          <div class="shot"><img src="img/projects.png" alt="Parcours des projets"></div>
          <p class="tiny" style="margin-top:1cqh">Parcours : où en est chaque lead, et l’action attendue.</p>
        </div>
      </div>`,
  },
  {
    id: "guardian",
    section: "Qualité",
    title: "Quality Guardian",
    seconds: 35,
    html: () => `
      <p class="kicker">Quality Guardian</p>
      <h2>Ce qui ne se voit pas dans un CRM, et qui coûte cher</h2>
      <div class="grid2">
        ${card("Sur le parcours", "visite en retard · estimé sans validation · estimé sans réponse · contrat signé sans transfert · transfert en échec")}
        ${card("Sur l’intégration", "étape CRM en échec · lead non traité · revue qui traîne · doublon rejoué · analyse incomplète")}
      </div>
      <p class="quote" style="margin-top:3cqh">
        Le Guardian n’envoie rien au client : il alerte en interne, et peut rejouer
        une synchronisation manquée.
      </p>
      <p class="tiny" style="margin-top:1.4cqh">Chaque alerte a un code stable, un message en français et une piste d’audit.</p>`,
  },
  {
    id: "qualite",
    section: "Ingénierie",
    title: "229 tests, et trois bugs réels",
    seconds: 40,
    html: () => `
      <p class="kicker">Qualité</p>
      <h2>229 tests, et des garde-fous qui ont trouvé de vrais bugs</h2>
      <div class="grid3">
        ${card("229 tests", "unitaires, intégration (respx), e2e sur l’API ASGI, pages de la console")}
        ${card("ruff + mypy", "typage strict sur <span class='mono'>app/</span>, format imposé")}
        ${card("SQLite &amp; PostgreSQL", "même suite, deux moteurs, migrations Alembic vérifiées")}
      </div>
      <div class="card soft" style="margin-top:2.4cqh">
        <h3>Trois défauts attrapés avant la production</h3>
        <ul class="small" style="margin-top:.8cqh">
          <li>une colonne <span class="mono">updated_at</span> NOT NULL en migration mais absente du modèle : invisible en SQLite, bloquant en PostgreSQL</li>
          <li>des champs personnalisés envoyés au mauvais format : GHL répondait « succès » et n’enregistrait rien</li>
          <li>un jeton d’agence utilisé pour des contacts : 401 silencieux, la tuile disait « simulation » sans dire pourquoi</li>
        </ul>
      </div>`,
  },
  {
    id: "methode",
    section: "Méthode",
    title: "Ce que j’ai fait",
    seconds: 35,
    html: () => `
      <p class="kicker">Méthode</p>
      <h2>Ce que j’ai fait, concrètement</h2>
      <ul>
        <li>Cahier des charges, choix d’architecture, modèle de données, migrations.</li>
        <li>Client GoHighLevel typé (v2), vérifié contre la documentation 2021-07-28, mode mock et mode réel.</li>
        <li>Moteur de règles déterministe, 14 scénarios métier, réponses attendues automatisées.</li>
        <li>Workflows n8n exportés sans secret, importables par API, auditables.</li>
        <li>Console FastAPI + Jinja2, sans framework front : design system, navigation clavier, impression.</li>
        <li>Documentation d’exploitation : GHL, n8n, déploiement, sécurité, dépannage, plan de test.</li>
      </ul>
      <p class="tiny" style="margin-top:1.6cqh">Un dépôt unique : application, workflows, migrations, tests, docs, captures.</p>`,
  },
  {
    id: "limites",
    section: "Limites",
    title: "Ce que le PoC ne fait pas",
    seconds: 30,
    html: () => `
      <p class="kicker">Limites assumées</p>
      <h2>Ce que le PoC ne fait pas — et pourquoi c’est dit</h2>
      <table>
        <tr><th>Sujet</th><th>État</th><th>Raison</th></tr>
        <tr><td>Prix, remise, conditions</td><td>${pill("absent", "warn")}</td><td>risque commercial : seul un humain chiffre</td></tr>
        <tr><td>Courriels au client</td><td>${pill("désactivé", "warn")}</td><td>PoC : aucun message sortant</td></tr>
        <tr><td>Formulaire GHL natif</td><td>${pill("optionnel", "info")}</td><td>le formulaire de démo est servi par LeadGuard, même payload ; l’automation GHL reste à créer dans l’interface</td></tr>
        <tr><td>Appel manqué, dépôts, satisfaction</td><td>${pill("roadmap", "mock")}</td><td>ne bloque pas les six flux livrés</td></tr>
        <tr><td>Clés LLM réelles</td><td>${pill("offline", "mock")}</td><td>extracteur déterministe en attendant</td></tr>
      </table>`,
  },
  {
    id: "suite",
    section: "Suite",
    title: "Ce que je cherche",
    seconds: 25,
    html: () => `
      <p class="kicker">La suite</p>
      <h2>Ce que je cherche, et ce que ça dit de ma façon de travailler</h2>
      <div class="grid2">
        ${card("Ce que je cherche", "un poste de développeuse Full Stack Python où l’intégration et la fiabilité comptent : CRM, API, automatisation, IA appliquée.")}
        ${card("Ce que ce PoC démontre", "je pars d’un problème métier, je choisis une architecture, je livre, je teste, je documente — et je dis ce qui ne marche pas.")}
      </div>
      <p class="quote" style="margin-top:2.8cqh">
        Le code est lisible, les décisions sont justifiées, et chaque affirmation de ce
        dossier a une preuve à l’écran.
      </p>`,
  },
  {
    id: "merci",
    tone: "dark",
    section: "Merci",
    title: "On en parle ?",
    seconds: 15,
    html: () => `
      <p class="kicker" style="color:#7dd3fc">Merci</p>
      <h1 style="color:#fff;font-size:clamp(30px,3.6cqw,54px);max-width:22ch">On en parle&nbsp;?</h1>
      <p class="lead" style="color:#c7d2e5;font-size:clamp(15px,1.5cqw,21px);max-width:52ch">
        Démonstration en direct, code et documentation sur demande.<br>
        Le PoC tourne, les tests passent, chaque chiffre est vérifiable.
      </p>
      <p class="tiny" style="margin-top:3cqh">Hafida El-Mouden · Berrechid, Maroc · hafida.el-mouden@uit.ac.ma</p>`,
  },
];

export const TOTAL_SECONDS = SLIDES.reduce((total, slide) => total + slide.seconds, 0);

export const CUE_TIMES = SLIDES.reduce((cues, slide, index) => {
  const previous = index === 0 ? 0 : cues[index - 1];
  cues.push(previous + slide.seconds);
  return cues;
}, []);
