import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Clock, Sparkles, CheckCircle2, AlertCircle, Calendar } from 'lucide-react';
import './Treatments.css';

interface CollapsibleInfo {
  recommendations?: string[];
  process?: string[];
  results?: string[];
  whatToExpect?: string[];
  aftercare?: string[];
  notes?: string;
}

interface Treatment {
  id: string;
  title: string;
  category: 'arc' | 'lezer' | 'szem' | 'szortelenites';
  categoryLabel: string;
  badge: string;
  shortDesc: string;
  details: CollapsibleInfo;
}

const treatmentsData: Treatment[] = [
  {
    id: 'thermage',
    title: 'Hollywood Thermage Kezelés',
    category: 'arc',
    categoryLabel: 'Arc & Anti-aging',
    badge: 'MÁTRIX RF',
    shortDesc: 'A Hollywood Thermage egy prémium kategóriás, noninvazív rádiófrekvenciás eljárás, amely a bőr legmélyebb rétegeiben fejti ki hatását, azonnal feszesítve a kötőszövetet és beindítva a kollagéntermelést.',
    details: {
      recommendations: [
        'Amikor a bőrön már láthatóak az öregedés első jelei: finom ráncok, petyhüdtség, megereszkedés.',
        'Ha a szemkörnyéken sötét karikák, szarkalábak vagy duzzanatok találhatók.',
        'Ha szeretné hatékonyan megelőzni és késleltetni az öregedés jeleit.'
      ],
      whatToExpect: [
        'A kezelés alatt enyhe, kellemes meleg érzést tapasztalhat.',
        'A kezelést követően enyhe bőrpír előfordulhat, de ez gyorsan lecseng.',
        'A beavatkozás teljesen fájdalommentes.',
        'Kúraszerűen ajánlott 3-4 hetente, összesen 4-5 alkalommal (a bőr minőségétől függően).'
      ],
      notes: 'A Hollywood Thermage kezelés egy rendkívül gyors és biztonságos megoldás, amely azonnali, látványos eredményt hoz!'
    }
  },
  {
    id: 'ultrahang',
    title: 'Simogató Ultrahangos Kezelés',
    category: 'arc',
    categoryLabel: 'Arc & Anti-aging',
    badge: 'HIDRATÁLÁS',
    shortDesc: 'A dehidratált, száraz és fáradt bőr tökéletes ellenszere. Rugalmasságot, ragyogást ad az arcbőrnek, visszaállítva annak optimális nedvességtartalmát és bársonyos tapintását.',
    details: {
      process: [
        'Az arcbőr alapos letisztítása a szennyeződésektől.',
        'Az elhalt hámsejtek kíméletes eltávolítása peeling alkalmazásával.',
        'Frissítő és pH-helyreállító tonizálás.',
        'Prémium Hyaluron gélmaszk felvitele az arcra.',
        'Hatóanyagok mélyre juttatása ultrahangos technológia segítségével.',
        'Simogató, kényeztető arc- és dekoltázsmasszázs.',
        'A kezelés lezárása professzionális fényvédő krémmel.'
      ],
      results: [
        'A bőr tapintása azonnal rendkívül puhává és bársonyossá válik.',
        'A szárazság okozta apróbb ráncok kisimulnak, eltűnnek.',
        'A bőr visszanyeri természetes rugalmasságát, egészséges fényét.'
      ],
      aftercare: [
        'A hosszan tartó eredmény érdekében a kezelést ajánlott 3 hetente ismételni.'
      ]
    }
  },
  {
    id: 'elysion',
    title: 'Elysion Pro Dióda Lézeres Szőrtelenítés',
    category: 'szortelenites',
    categoryLabel: 'Szőrtelenítés',
    badge: 'VÉGLEGES LÉZER',
    shortDesc: 'Csúcskategóriás, 2000 wattos dióda lézeres eljárás, amely a szőrtüszőket célzottan hevíti fel és semmisíti meg. Fájdalommentes, biztonságos és egész évben, bármely bőrtípuson alkalmazható.',
    details: {
      process: [
        'A gép 808 nm-es hullámhosszú infravörös lézersugarat bocsát ki Ultra Rövid Pulzus (URP) technológiával.',
        'A lézer 60-70 fok körüli hőmérsékletre melegíti a szőrtüszőt, ami ettől megsemmisül.',
        'Az Elysion Pro kezelőfeje Crystal-Freeze hűtőrendszerrel van felszerelve, amely folyamatosan hűti a bőrt, megelőzve az égő érzést.',
        'A kezelés teljesen biztonságos: nincs hatással a belső szervekre, protézisekre, töltőanyagokra vagy implantátumokra.'
      ],
      results: [
        'Mivel a lézer csak az aktív növekedési fázisban lévő szőrszálakat (alkalmanként kb. 15-20%) tudja elpusztítani, a tartós eredményhez általában 6-8 kezelés szükséges.',
        'A kezelések között testtájéktól függően 6-8-12 hét szünetet kell tartani.'
      ]
    }
  },
  {
    id: 'pilla-lifting',
    title: 'Szempilla Lifting',
    category: 'szem',
    categoryLabel: 'Pilla & Szemöldök',
    badge: 'BEST LASHES',
    shortDesc: 'Dús és természetes hatású szempillák ragasztás nélkül! A pillákat közvetlenül a töveknél emeli meg, így optikailag hosszabbítja, dúsítja és gyönyörűen íveltté teszi őket.',
    details: {
      recommendations: [
        'Ideális megoldás a lelógó szemhéj okozta zárt tekintet optikai nyitásához.',
        'Azoknak, akik kerülik a műszempillát, de szeretnének feltűnőbb, íveltebb pillákat.',
        'Teljesen biztonságos, nem károsítja sem a saját szempillákat, sem a szemet.'
      ],
      results: [
        'Hosszan tartó hatás, amely akár 5-6 hétig is tökéletesen látható marad.'
      ],
      notes: 'A kezeléshez a prémium kategóriás Best Lashes anyagait használom, garantálva a kiemelkedő minőséget és a kíméletes ápolást.'
    }
  },
  {
    id: 'nanosoft',
    title: 'Nanosoft NCTF 135HA Kezelés',
    category: 'arc',
    categoryLabel: 'Arc & Anti-aging',
    badge: 'PRÉMIUM MEZOTERÁPIA',
    shortDesc: 'Innovatív, orvosi tanúsítvánnyal rendelkező eljárás, amely 3 darab mikroszkopikus szilikon kristály pengével, szinte észrevétlenül és fájdalommentesen juttatja az NCTF 135HA koktélt a bőr irharétegébe.',
    details: {
      process: [
        'A kezelendő bőrfelület alapos letisztítása, fertőtlenítése és kíméletes érzéstelenítése.',
        'A Nanosoft kristálytűkkel a hatóanyag precíz bejuttatása a dermiszbe.',
        'A kezelés időtartama körülbelül 30-40 perc.'
      ],
      recommendations: [
        'NCTF 135HA hatóanyag: nagy töménységű lineáris hialuronsavat és 59 revitalizáló összetevőt (12 vitamin, 24 aminosav, 6 koenzim, 5 nukleinsav, 6 ásványi anyag) tartalmaz.',
        'Sejtszintű bőrrejuvenációra, fakó, tónustalan bőrre, és finom ráncok kezelésére.'
      ],
      whatToExpect: [
        'A kezelés után a bőr enyhén pirosas vagy ödémás lehet, apró papulák (kis dudorok) keletkezhetnek a hatóanyag miatt, melyek 24-48 órán belül teljesen felszívódnak.'
      ]
    }
  },
  {
    id: 'hidroabrazio',
    title: 'Hidroabráziós Kezelés / Hydroabrázió',
    category: 'arc',
    categoryLabel: 'Arc & Anti-aging',
    badge: 'MÉLYTISZTÍTÁS',
    shortDesc: 'Kíméletes ultrahangos vízsugaras peeling. A vízcseppek porlasztásával létrejövő mikrorobbanások kíméletesen sodorják el az elhalt hámsejteket és a pórusok mélyén rekedt szennyeződéseket.',
    details: {
      process: [
        'A kezelés során a bőrre permetezett tiszta vizet ultrahangos rezgésekkel elporlasztjuk.',
        'A rezgés és a víz találkozásakor mikroszkopikus robbanások történnek, amelyek fellazítják a szaruréteget és kitisztítják a faggyút.'
      ],
      results: [
        'Egyszerre valósít meg kíméletes hámlasztást, mélytisztítást és hidratálást.',
        'Bármely bőrtípusra, még a legérzékenyebb, rozáceás bőrre is biztonsággal alkalmazható.',
        'Azonnal simábbá, tisztábbá és üdévé teszi az arcbőrt.',
        'Rendkívüli módon megnöveli a bőr hatóanyag-felvevő képességét, így tökéletes alapozója más kezeléseknek.'
      ]
    }
  },
  {
    id: 'laminalas',
    title: 'Szemöldök Laminálás',
    category: 'szem',
    categoryLabel: 'Pilla & Szemöldök',
    badge: 'BEST BROWS PRO',
    shortDesc: 'A legmodernebb háromlépéses szemöldök-formázó technika. Rendezi, megemeli és fixálja a szemöldökszálakat, ezáltal dúsabb, vastagabb és határozottabb formát kölcsönöz az arcnak.',
    details: {
      recommendations: [
        'Különösen ajánlott göndör, rakoncátlan vagy nehezen kezelhető szemöldökszálak esetén.',
        'Bárkinek, aki szeretne rendezett, divatos és tartós szemöldököt.',
        'Szakszerűen elvégezve, a hatóidők pontos betartásával a kezelés nem károsítja a szálakat.'
      ],
      results: [
        'A tartós és látványos eredmény 6-8 héten keresztül megmarad.'
      ],
      aftercare: [
        'A kezelést követő 48 órában kerülni kell, hogy víz, gőz (szauna, forró fürdő, hajmosás) vagy kozmetikai termék érje a területet.',
        'Otthoni utóápolásra javasolt a Best Brows Pro Vitamin Shot használata, ami vitaminokkal táplálja, dúsítja és fényessé teszi a szálakat.'
      ]
    }
  },
  {
    id: 'dermapen',
    title: 'Dermapen Nanotűs Kezelés',
    category: 'arc',
    categoryLabel: 'Arc & Anti-aging',
    badge: 'KOLLAGÉN INDUKCIÓ',
    shortDesc: 'Bőrfiatalító kollagén-indukciós terápia. A bőrbe hatoló nanotűk mikrosérüléseket okozva aktiválják a szervezet természetes sebgyógyulási folyamatait, ezáltal fokozva a kollagén és elasztin termelést.',
    details: {
      recommendations: [
        'Bőrfeszesség növelésére, petyhüdt, megereszkedett bőr kezelésére.',
        'A szem és a száj környéki finomabb és mélyebb ráncok látványos halványítására.',
        'A tűszúrásokon keresztül a steril, koncentrált hatóanyagok mélyen szívódnak fel a bőrben.'
      ],
      process: [
        'A kezelt felület letisztítása és alapos fertőtlenítése.',
        'A készülék tűmélységének egyéni beállítása a bőr érzékenységének megfelelően.',
        'A kezelés fájdalommentes, enyhe irritáció előfordulhat. Időtartama kb. 1 óra.',
        'A kezelés végén bőrnyugtató maszkot és gépi hűtést alkalmazunk.'
      ],
      whatToExpect: [
        'Kúraszerűen ajánlott 3-4 alkalommal, 2 hetente ismételve.',
        'A kezelés után pontszerű vérzés és bőrpír jelentkezhet, amelyek pár óra alatt lecsengenek.',
        'A kezelést követő napokban szigorúan kerülni kell a napozást, szaunát, szoláriumot és a forró fürdőt.'
      ]
    }
  },
  {
    id: 'bb-glow',
    title: 'BB Glow Kezelés',
    category: 'arc',
    categoryLabel: 'Arc & Anti-aging',
    badge: 'RAGYOGÓ TÓNUS',
    shortDesc: 'Különleges és innovatív mezoterápiás eljárás, amely egyenletessé teszi a bőrfelszínt, ragyogást biztosít és egy könnyű BB krémhez hasonló, finom fedést és tónust kölcsönöz az arcbőrnek.',
    details: {
      results: [
        'Azonnal és láthatóan homogenizálja a bőr felszínét.',
        'Ragyogóbbá, üdébbé teszi a fakó arcbőrt.',
        'Csökkenti a pigmentfoltok és elszíneződések intenzitását.',
        'Kíméletes, biztonságos technológia minimális felépülési idővel.'
      ]
    }
  },
  {
    id: 'carbon-peeling',
    title: 'Carbon Peeling Kezelés',
    category: 'lezer',
    categoryLabel: 'Lézeres Kezelések',
    badge: 'PICOSECOND LÉZER',
    shortDesc: 'A legmodernebb PicoSecond lézer és egy speciális aktív szénmaszk kombinációja. A lézer elpárologtatja a szénrészecskéket, magával ragadva a szennyeződéseket, elhalt hámsejteket és faggyút.',
    details: {
      process: [
        'Egy aktív szén alapú maszk felvitele a bőrre, amely megköti a faggyút és a szennyeződéseket.',
        'A PicoSecond lézerrel végigpásztázzuk a bőrt, ami szétporlasztja a szennyezett szénszemcséket.',
        'A lézer termikus hőenergiája mélyen serkenti a kollagén termelődését.'
      ],
      recommendations: [
        'Zsíros, tág pórusú, aknéra hajlamos bőr mélytisztítására.',
        'Pigmentfoltos, heges bőrfelületek textúrájának javítására és ráncok finomítására.'
      ],
      whatToExpect: [
        'A kezelés gyors (30-45 perc), teljesen fájdalommentes és nincs gyógyulási idő.',
        'Nyáron is végezhető fokozott fényvédelem mellett, de szeplős vagy pigmentfoltra fokozottan hajlamos bőr esetén inkább ősztől javasolt.'
      ]
    }
  },
  {
    id: 'tetovalas-eltavolitas',
    title: 'Lézeres Tetoválás Eltávolítás',
    category: 'lezer',
    categoryLabel: 'Lézeres Kezelések',
    badge: 'ND:YAG LÉZER',
    shortDesc: 'Nem kívánt tetoválások biztonságos eltávolítása Q-kapcsolt Nd:YAG lézerrel. A magas energiájú lézersugár a bőr károsítása nélkül, hegesedésmentesen robbantja szét a pigmenteket.',
    details: {
      process: [
        'A lézerfény akadály nélkül hatol át a világos bőrön és elnyelődik a sötét tetoválófestékben.',
        'A pigment tartalmú sejtek felhevülnek és mikroszkopikus darabokra robbannak szét (fragmentálódnak).',
        'Az apró festékdarabkákat a szervezet falósejtjei és a nyirokrendszer természetes úton ürítik ki.'
      ],
      whatToExpect: [
        'A kezelés enyhe, jól tolerálható fájdalommal járhat.',
        'A tetoválás színétől és mélységétől függően általában 3-10 alkalom szükséges a teljes eltávolításhoz.',
        'Két kezelés között kötelezően 4-6 hét gyógyulási szünetet kell tartani.'
      ]
    }
  },
  {
    id: 'koromgomba',
    title: 'Lézeres Körömgomba Kezelés',
    category: 'lezer',
    categoryLabel: 'Lézeres Kezelések',
    badge: 'KÖRÖMÁPOLÁS',
    shortDesc: 'A leghatékonyabb fegyver a makacs körömgomba ellen. Az Nd:YAG lézer fénye átjut a körömlemezen, és a gomba sejtjeit felmelegítve elpusztítja a gombafonalakat és spórákat.',
    details: {
      process: [
        'A lézerfény a gombák sötétebb pigmentjeiben nyelődik el, célzottan felmelegítve azokat.',
        'Az ismétlődő hőhatás megöli a gombát és annak spóráit a körömágyban is.',
        'A kezelőfejet gyors, rövid villanásokkal mozgatjuk a köröm felületén.',
        'A kezelés teljesen fájdalommentes, a vendég csupán enyhe melegséget érez.'
      ],
      results: [
        'A gomba elpusztul, de a látványos változás a köröm természetes növekedésével (az új, egészséges köröm megjelenésével) válik láthatóvá pár hét után.',
        'A köröm teljes megújulása és lenövése akár 6 hónapot is igénybe vehet.'
      ],
      aftercare: [
        'FONTOS! A kezeléssel egy időben kötelező a cipők és zoknik alapos fertőtlenítése, különben a köröm visszafertőződik, és a kezelés hatástalanná válik!'
      ]
    }
  },
  {
    id: 'pigmentfolt',
    title: 'Lézeres Pigmentfolt Eltávolítás',
    category: 'lezer',
    categoryLabel: 'Lézeres Kezelések',
    badge: 'REJUVENÁCIÓ',
    shortDesc: 'Targetált Nd:YAG lézeres kezelés a különböző pigmentációs hibák ellen. Halványítja a foltokat, miközben a hőenergia serkenti a bőr megújulását és feszességét.',
    details: {
      recommendations: [
        'Melasma (májfolt): hormonális változások (pl. terhesség, fogamzásgátlók) okozta barnás foltok kezelésére.',
        'Lentigo solaris (napfolt): az UV-sugárzás hatására kialakuló barnás elszíneződések halványítására.',
        'Időskori lentigo (öregségi folt): az arcon és kézfejen 50 év felett jelentkező jól körülhatárolt foltok ellen.'
      ],
      results: [
        'A foltok fokozatos halványodása és eltűnése.',
        'A lézer termikus hatásának köszönhetően a bőr megújul, kollagént termel, így a kezeléssorozat végére egy feszesebb, egységesebb tónusú és ragyogóbb bőrt kapunk.'
      ]
    }
  },
  {
    id: 'gyantazas',
    title: 'Professzionális Gyantázás',
    category: 'szortelenites',
    categoryLabel: 'Szőrtelenítés',
    badge: 'TARTÓS SIMASÁG',
    shortDesc: 'Hagyományos és rendkívül hatékony szőrtelenítési eljárás. A szőrszálakat gyökerestül távolítja el, ezáltal lényegesen tartósabb eredményt és finomabb szőrnövekedést biztosít.',
    details: {
      results: [
        'A bőr 3-4 hétig tökéletesen sima marad (a teljes szőrmentesség egyéntől és visszanövéstől függően 3-6 hét is lehet).',
        'Rendszeres gyantázással a szőrszálak láthatóan elvékonyodnak és megritkulnak.'
      ],
      aftercare: [
        'A gyantázás utáni 24-48 órában szigorúan kerülni kell a napozást, szoláriumozást és a klóros vízben való strandolást, mert a bőr érzékeny és könnyen leéghet vagy irritálódhat.',
        'Ha napra megy, használjon legalább 30-as faktorszámú (SPF) napvédőt a kezelt területeken.'
      ],
      recommendations: [
        'Nem ajánlott aktív bőrbetegségek, ekcéma vagy visszérproblémák esetén a kezelt felületen.',
        'Nem ajánlott túlságosan érzékeny bőrűeknek. Terhesség alatt a hormonális változások miatt a gyantázás a megszokottnál fájdalmasabb lehet.'
      ]
    }
  },
  {
    id: 'oxigenspray',
    title: 'Oxigénspray Kezelés',
    category: 'arc',
    categoryLabel: 'Arc & Anti-aging',
    badge: 'SEJTSZINTŰ OXIGÉN',
    shortDesc: 'Azonnali bőrfelfrissülés! Nagy tisztaságú oxigénnel és értékes vitaminos hatóanyagokkal tölti fel a bőrt, azonnal eltüntetve a fáradtság jeleit, üdeséget és ragyogást biztosítva.',
    details: {
      recommendations: [
        'Fáradt, fakó, élettelen és dehidratált bőr gyors revitalizálására.',
        'Fontos események (esküvő, fotózás) előtt azonnali ragyogásfokozóként.',
        'Ráncmegelőzésre, finom ráncok simítására és a bőr rugalmasságának fokozására.'
      ],
      results: [
        'Mélyreható, intenzív hidratálás és frissesség.',
        'Serkenti a kollagéntermelést, javítja a sejtanyagcserét.',
        'Bőrnyugtató és gyulladáscsökkentő hatású, irritáció nélkül.'
      ]
    }
  }
];

const Treatments = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'arc' | 'lezer' | 'szem' | 'szortelenites'>('all');
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const categories = [
    { id: 'all', name: 'Összes' },
    { id: 'arc', name: 'Arc & Anti-aging' },
    { id: 'lezer', name: 'Lézeres Kezelések' },
    { id: 'szem', name: 'Pilla & Szemöldök' },
    { id: 'szortelenites', name: 'Szőrtelenítés' },
  ];

  const filteredTreatments = activeCategory === 'all'
    ? treatmentsData
    : treatmentsData.filter(t => t.category === activeCategory);

  const openBooking = () => {
    // Dispatch a custom event to open the booking modal
    const event = new CustomEvent('open-booking-modal');
    window.dispatchEvent(event);
  };

  return (
    <section id="treatments" className="section treatments-section">
      <div className="container">
        <span className="section-subtitle">Szolgáltatásaink</span>
        <h2 className="section-title">Kozmetikai Kezeléseink</h2>
        
        {/* Category Filters */}
        <div className="treatments-filters">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id as any)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Treatments Grid */}
        <motion.div layout className="treatments-grid">
          <AnimatePresence mode="popLayout">
            {filteredTreatments.map((treatment) => {
              const isExpanded = expandedIds.includes(treatment.id);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={treatment.id}
                  className={`treatment-card glass ${isExpanded ? 'expanded' : ''}`}
                >
                  <div className="card-header-block">
                    <span className="treatment-badge">{treatment.badge}</span>
                    <h3 className="treatment-card-title">{treatment.title}</h3>
                    <p className="treatment-short-desc">{treatment.shortDesc}</p>
                  </div>

                  {/* Accordion Toggle */}
                  <button 
                    onClick={() => toggleExpand(treatment.id)} 
                    className="treatment-toggle-btn"
                    aria-expanded={isExpanded}
                  >
                    <span>{isExpanded ? 'Kevesebb információ' : 'Részletek és tudnivalók'}</span>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {/* Collapsible Content */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="treatment-details-drawer"
                      >
                        <div className="drawer-inner-content">
                          
                          {/* Recommendations */}
                          {treatment.details.recommendations && (
                            <div className="detail-section">
                              <h4 className="detail-section-title">
                                <Sparkles size={14} />
                                <span>Mikor javasoljuk / Kinek ajánlott?</span>
                              </h4>
                              <ul className="detail-list">
                                {treatment.details.recommendations.map((item, idx) => (
                                  <li key={idx}>
                                    <CheckCircle2 size={14} className="list-icon" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Treatment Process */}
                          {treatment.details.process && (
                            <div className="detail-section">
                              <h4 className="detail-section-title">
                                <Clock size={14} />
                                <span>A kezelés menete</span>
                              </h4>
                              <ul className="detail-list numbered">
                                {treatment.details.process.map((item, idx) => (
                                  <li key={idx}>
                                    <span className="list-number">{idx + 1}.</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Results */}
                          {treatment.details.results && (
                            <div className="detail-section">
                              <h4 className="detail-section-title">
                                <Sparkles size={14} />
                                <span>Várható eredmények</span>
                              </h4>
                              <ul className="detail-list">
                                {treatment.details.results.map((item, idx) => (
                                  <li key={idx}>
                                    <CheckCircle2 size={14} className="list-icon result" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* What to expect / feeling */}
                          {treatment.details.whatToExpect && (
                            <div className="detail-section">
                              <h4 className="detail-section-title">
                                <AlertCircle size={14} />
                                <span>Mit tapasztalhat a kezelés alatt és után?</span>
                              </h4>
                              <ul className="detail-list">
                                {treatment.details.whatToExpect.map((item, idx) => (
                                  <li key={idx}>
                                    <CheckCircle2 size={14} className="list-icon info" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Aftercare */}
                          {treatment.details.aftercare && (
                            <div className="detail-section warning">
                              <h4 className="detail-section-title">
                                <AlertCircle size={14} />
                                <span>Fontos utóápolási tudnivalók</span>
                              </h4>
                              <ul className="detail-list">
                                {treatment.details.aftercare.map((item, idx) => (
                                  <li key={idx}>
                                    <CheckCircle2 size={14} className="list-icon warning" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Notes */}
                          {treatment.details.notes && (
                            <div className="detail-section notes">
                              <p className="detail-notes-text">{treatment.details.notes}</p>
                            </div>
                          )}

                          {/* Direct Booking CTA */}
                          <div className="drawer-actions">
                            <button onClick={openBooking} className="btn btn-accent btn-drawer-booking">
                              <Calendar size={14} />
                              <span>Időpontot foglalok</span>
                            </button>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default Treatments;
