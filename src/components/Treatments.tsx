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
  category: 'orvosi' | 'intim' | 'arc' | 'lezer' | 'szem' | 'szortelenites' | 'sminktetovalas';
  categoryLabel: string;
  badge: string;
  shortDesc: string;
  details: CollapsibleInfo;
}

const treatmentsData: Treatment[] = [
  {
    id: 'thermage',
    title: 'Hollywood Thermage 3D Bőrfeszesítés',
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
    title: 'Százszorszép Rituálé',
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
    title: 'NCTF 135HA Skinbooster Bőrfiatalítás',
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
    title: 'Frissítő Vízsugaras Bőrmegújítás',
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
    title: 'Dermapen Kollagén-Boost Bőrújjáépítés',
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
    title: 'BB Glow Porcelánbőr Kezelés',
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
    title: 'Oxigén-Infúziós Sejtszintű Revitalizálás',
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
  },
  {
    id: 'botox_3regio',
    title: 'Prémium Botox - Dysport Ránctalanítás (3 régió)',
    category: 'orvosi',
    categoryLabel: 'Orvosi Esztétika',
    badge: 'ORVOSI BOTOX',
    shortDesc: 'Ránctalanítás az arc felső harmadában: homlok ráncai, szemöldökök közötti mérgesránc (glabella) és a szem körüli szarkalábak egyidejű, professzionális orvosi botox kezelése.',
    details: {
      process: [
        'Személyes orvosi konzultáció és az arcizomzat működésének felmérése.',
        'A kezelendő pontok precíz kijelölése és fertőtlenítése.',
        'A botulinum toxin mikrotűvel történő precíz bejuttatása a célizmokba.',
        'A kezelés gyors, minimális kellemetlenséggel jár, és kb. 15-20 percet vesz igénybe.'
      ],
      results: [
        'Az arc felső részének mimikai ráncai kisimulnak, a bőr feszes és sima lesz.',
        'A hatás fokozatosan, 4-10 nap alatt alakul ki.',
        'Természetes, kipihent arckifejezés anélkül, hogy az arc „lefagyna”.',
        'Az eredmény egyéntől függően 3-6 hónapig tart.'
      ],
      recommendations: [
        'Homlok és szemkörnyéki mimikai ráncok halványítására és megelőzésére.',
        'Kifejezetten ajánlott mérgesráncok és szarkalábak finomítására.'
      ],
      aftercare: [
        'A kezelés után 4 óráig tilos lefeküdni, hajolgatni vagy az arcot dörzsölni.',
        '48 óráig kerülni kell az intenzív edzést, a szaunát, a szoláriumot és a forró fürdőt.'
      ],
      notes: 'A kezelést Dr. Dézsi Csilla esztétikai szakorvos végzi a legmagasabb szakmai protokollok szerint.'
    }
  },
  {
    id: 'botox_honalj',
    title: 'Botox Kezelés - Hónalj Izzadásgátlás',
    category: 'orvosi',
    categoryLabel: 'Orvosi Esztétika',
    badge: 'HYPERHIDROSIS BOTOX',
    shortDesc: 'A fokozott hónalji izzadás (hyperhidrosis) leghatékonyabb, FDA által jóváhagyott botulinum toxinos kezelése, amely 80-95%-os izzadáscsökkenést és tartós szárazságot nyújt 6-12 hónapig.',
    details: {
      recommendations: [
        'Kinek ajánlott: fokozott hónalji izzadás (hyperhidrosis) esetén, amikor a hagyományos dezodorok hatástalanok.',
        'Ruhák rendszeres izzadságfoltjainak megelőzésére és a kellemetlen szagok megszüntetésére.',
        'Szociális feszélyezettség és önbizalomhiány enyhítésére, valamint fontos események (esküvő, előadás, interjú) előtt.'
      ],
      process: [
        'Személyes orvosi konzultáció, a hyperhidrosis felmérése és az ellenjavallatok kizárása.',
        'Érzéstelenítő krém felvitele a hónalj érzékeny területére (30-40 perc hatóidő).',
        '20-25 apró felületi mikroinjekciós pont kijelölése rácsmintázatban mindkét hónaljon (kb. 20-30 perc).',
        'A hatás 2-4 nap alatt indul meg, és 1-2 hét múlva éri el a maximális eredményt.'
      ],
      results: [
        '80-95%-os izzadáscsökkenés vagy a hónalji izzadás teljes megszűnése.',
        'Az izzadság és a kellemetlen szagok drasztikus csökkenése.',
        'Rendkívül tartós hatás: 6-12 hónapig tartó szárazság (a leghosszabb hatástartam a botox kezelések között).'
      ],
      whatToExpect: [
        'A kezelés minimális kellemetlenséggel jár az előzetes érzéstelenítésnek köszönhetően.',
        'Normális reakciók: enyhe duzzanat vagy bőrpír az injekciós pontokon (néhány órán belül elmúlik).'
      ],
      aftercare: [
        'Ellenjavallatok: terhesség, szoptatás, neuromuszkuláris betegségek (pl. myasthenia gravis), aktív hónalji bőrfertőzés vagy botulinum toxin allergia.',
        'A kezelés utáni 24 órában kerülni kell az dörzsölést, az intenzív edzést, a szaunát és a forró fürdőt.'
      ],
      notes: 'A kezelést Dr. Dézsi Csilla esztétikai szakorvos végzi. Az FDA által hivatalosan jóváhagyott, biztonságos és kiemelkedően hatékony eljárás.'
    }
  },
  {
    id: 'botox_migren',
    title: 'Botox Kezelés - Krónikus Migrén Terápia',
    category: 'orvosi',
    categoryLabel: 'Orvosi Esztétika',
    badge: 'MIGRÉN BOTOX',
    shortDesc: 'A krónikus migrén FDA és EMA által jóváhagyott, hatékony orvosi megelőző botox kezelése, amely a fájdalomjelek gátlásával átlagosan felére csökkenti a havi fejfájásos napok számát.',
    details: {
      recommendations: [
        'Kinek ajánlott: krónikus migrénben szenvedőknek, akiknél havonta 15 vagy több fejfájásos nap fordul elő legalább 3 hónapja.',
        'Azoknak, akiknél a hagyományos gyógyszeres megelőző kezelések nem hoztak elegendő eredményt vagy mellékhatásokat okoztak.',
        'A havi migrénes napok számának, a rohamok intenzitásának és a fájdalomcsillapító-igénynek a jelentős mérséklésére.'
      ],
      process: [
        'Orvosi konzultáció, a krónikus migrén típusának felmérése és az ellenjavallatok kizárása.',
        'Injektálás a standard nemzetközi protokoll szerint 31-39 ponton (homlok, halánték, tarkó, nyak és váll izmai).',
        'A beavatkozás mindössze 20-30 percet vesz igénybe, enyhe tűszúrásszerű érzéssel jár.',
        'A hatás 4-6 hét alatt indul meg, és 2-3 egymást követő ciklus (3 havonta ismételve) után éri el a maximális eredményt.'
      ],
      results: [
        'A havi fejfájásos napok száma átlagosan 8-9 nappal csökken (a migrénes napok száma akár felére mérséklődik).',
        'A rohamok intenzitásának és időtartamának kifejezett csökkenése.',
        'A szükséges fájdalomcsillapítók mennyiségének és az életminőségnek a látható javulása.'
      ],
      whatToExpect: [
        'Enyhe bőrpír, duzzanat az injekciós pontokon (24-48 órán belül spontán elmúlik).',
        'Átmenetileg nyak- vagy vállmerevség előfordulhat az első 1-2 hétben.'
      ],
      aftercare: [
        'Ellenjavallatok: terhesség, szoptatás, neuromuszkuláris betegségek (pl. myasthenia gravis) vagy aktív fertőzés a kezelendő pontokon.',
        'Ajánlott ismétlési időköz: 12 hét (3 havonta) a tartós és kiegyensúlyozott hatásért.'
      ],
      notes: 'A kezelést Dr. Dézsi Csilla esztétikai szakorvos végzi a nemzetközi neurológiai protokollok szerint.'
    }
  },
  {
    id: 'hialuronsav',
    title: 'Hialuronsavas Arckontúrozás & Ajaktöltés',
    category: 'orvosi',
    categoryLabel: 'Orvosi Esztétika',
    badge: 'HIALURONSAV',
    shortDesc: 'Ajak-, orca- vagy állvonal-töltés prémium minőségű hialuronsavas töltőanyagokkal a volumenpótlásra, a kontúrok kiemelésére és a ráncok azonnali kisimítására.',
    details: {
      process: [
        'Személyes konzultáció, az egyéni anatómiai adottságok és igények megbeszélése.',
        'A kezelendő terület érzéstelenítése érzéstelenítő krémmel vagy injekcióval.',
        'A prémium hialuronsav bevitele vékony tűvel vagy kanüllel a bőr megfelelő rétegeibe.',
        'A terület finom masszírozása a tökéletes eloszlásért.'
      ],
      results: [
        'Azonnali, látványos volumen és megfiatalodott arckontúrok.',
        'Természetes hatású, telt és hidratált ajkak.',
        'Az eredmény azonnal látható, és egyéntől függően 9-14 hónapig tart.'
      ],
      recommendations: [
        'Vékony, aszimmetrikus ajkak formázására és dúsítására.',
        'Az orr-száj barázda (nasolabialis redő) és a szomorú szájszéli ráncok feltöltésére.',
        'Az orca és az állvonal kontúrjainak hangsúlyozására.'
      ],
      aftercare: [
        'A kezelést követő napokban kerülni kell az arcmasszázst és az erős nyomást a kezelt területen.',
        'Ajaktöltés után pár napig javasolt kerülni a nagyon forró, fűszeres ételeket és a sminkelést.'
      ],
      notes: 'A kezelést Dr. Dézsi Csilla esztétikai szakorvos végzi. Kizárólag prémium kategóriás, biztonságos, felszívódó hialuronsavas töltőanyagokkal dolgozunk.'
    }
  },
  {
    id: 'prp_vampire',
    title: 'PRP Sajátvér Terápia (Vampire Lift)',
    category: 'orvosi',
    categoryLabel: 'Orvosi Esztétika',
    badge: 'PRP SAJÁTVÉR',
    shortDesc: 'A legtermészetesebb bőrrejuvenáció! Saját vérből kinyert, vérlemezkékben gazdag plazma (PRP) mikrotűs vagy injekciós bejuttatása a sejtszintű megújulásért és kollagéntermelésért.',
    details: {
      process: [
        'Konzultáció és a kezelendő területek (arc, nyak, dekoltázs vagy fejbőr) felmérése.',
        'Kis mennyiségű (10-20 ml) vénás vér levétele.',
        'A vér speciális centrifugálása a vérlemezke-gazdag plazma (PRP) kinyeréséhez.',
        'A kezelt terület érzéstelenítése után a plazma apró tűszúrásokkal történő bejuttatása.'
      ],
      results: [
        'A bőr feszessége és rugalmassága jelentősen javul, a pórusok összehúzódnak.',
        'Finom ráncok és hegek látványos halványulása.',
        'A hajas fejbőrön alkalmazva serkenti a hajhagymákat és csökkenti a hajhullást.',
        'A maximális hatás 2-3 hónap alatt alakul ki, kúraszerűen 3 alkalom ajánlott.'
      ],
      recommendations: [
        'Fáradt, fakó, tónustalan bőr intenzív revitalizálására.',
        'Acne utáni hegek, tág pórusok és finom ráncok kezelésére.',
        'Hajhullás megállítására és a hajszálak megerősítésére.'
      ],
      aftercare: [
        'A kezelés után 24 óráig ne érje víz és kozmetikum a kezelt területet.',
        'A bőrpír és az enyhe duzzanat 1-3 nap alatt teljesen elmúlik.',
        'Szigorú fényvédelem és a közvetlen napfény kerülése javasolt a kezelést követő héten.'
      ],
      notes: 'A kezelést Dr. Dézsi Csilla esztétikai szakorvos végzi. Mivel a saját véredet használjuk, a kezelés 100%-ban természetes, nem okoz allergiás reakciókat.'
    }
  },
  {
    id: 'morpheus8',
    title: 'Morpheus 8 Mikrotűs RF Kezelés',
    category: 'orvosi',
    categoryLabel: 'Orvosi Esztétika',
    badge: 'FRAKCIONÁLT RF',
    shortDesc: 'A legmodernebb frakcionált rádiófrekvenciás és mikrotűs technológia kombinációja, amely mélyen újjáépíti a bőr szerkezetét, feszesít és csökkenti a zsírszövetet az arc alsó részén.',
    details: {
      process: [
        'A kezelendő felület alapos tisztítása és helyi érzéstelenítése krémmel (30-40 perc hatóidő).',
        'A Morpheus 8 kezelőfej mikrotűinek behatolása a bőrbe (akár 4 mm mélyen).',
        'Rádiófrekvenciás energia leadása a tűk hegyén keresztül a mélyebb rétegekben.',
        'Bőrnyugtató és regeneráló gél alkalmazása.'
      ],
      results: [
        'A toka és az állvonal látványos kontúrozása, a megereszkedett bőr megemelése.',
        'A kollagén- és elasztinrostok azonnali és hosszú távú képződése.',
        'Egyenletesebb bőrfelszín, tág pórusok és hegek csökkenése.',
        'A teljes eredmény 2-3 hónap alatt érik be, kúraszerűen 2-3 alkalom javasolt.'
      ],
      recommendations: [
        'Megereszkedett toka, elmosódott állvonal feszesítésére és kontúrozására.',
        'Mélyebb aknés hegek, egyenetlen bőrfelszín javítására.',
        'Arc, nyak és dekoltázs intenzív anti-aging megújítására.'
      ],
      aftercare: [
        'A kezelés után enyhe vörösség és rácsmintás nyomok láthatók 2-4 napig.',
        'Kerülni kell a közvetlen napfényt és szigorú 50+ SPF fényvédelem szükséges legalább 2 hétig.',
        'A sminkelés a kezelést követő 48 órában nem ajánlott.'
      ],
      notes: 'A kezelést Dr. Dézsi Csilla esztétikai szakorvos végzi. A Morpheus 8 jelenleg a világ egyik legelismertebb és leghatékonyabb nem sebészeti bőrfiatalító eljárása.'
    }
  },
  {
    id: 'emsella',
    title: 'EMSella Medencefenék-Rehabilitáció',
    category: 'intim',
    categoryLabel: 'Test Kezelés',
    badge: 'HIFEM INTIM',
    shortDesc: 'Forradalmi, nem invazív medencefenék-erősítő kezelés inkontinencia ellen, a szexuális egészség javítására és a kismedencei izmok regenerálására, teljesen felöltözve.',
    details: {
      process: [
        'Személyes konzultáció és az egyéni panaszok átbeszélése.',
        'A vendég teljesen felöltözve helyet foglal a speciális EMSella székben.',
        'A kezelőfej intenzív, fókuszált elektromágneses hullámokat (HIFEM) bocsát ki.',
        'A kezelés mindössze 28 percet vesz igénybe, amely alatt több ezer szupramaximális izomösszehúzódás történik.'
      ],
      results: [
        'A medencefenék izmai jelentősen megerősödnek, visszaáll az intim területek tónusa.',
        'Az inkontinenciás panaszok (vizeletszivárgás) drasztikus csökkenése vagy teljes megszűnése.',
        'Javuló szexuális egészség és fokozott vérkeringés a kismedencei régióban.',
        'Ajánlott kúra: 6 alkalom, heti 2 alkalommal ismételve.'
      ],
      recommendations: [
        'Stressz-, sürgősségi vagy kevert típusú inkontinencia kezelésére.',
        'Szülés utáni regenerációra a gátizmok gyors megerősítésére.',
        'Az intim területek izomtónusának és a szexuális elégedettségnek a fokozására.'
      ],
      aftercare: [
        'A kezelés nem igényel felépülési időt, azonnal visszatérhet a napi tevékenységeihez.',
        'Ellenjavallatok: terhesség, pacemaker, fém implantátum a kismedencei területen.'
      ],
      notes: 'Kényelmes, diszkrét és fájdalommentes kezelés – a vendégnek csak ülnie kell és olvashat a kezelés alatt.'
    }
  },
  {
    id: 'emsculpt',
    title: 'EMSculpt Izomépítő & Zsírégető Kezelés',
    category: 'intim',
    categoryLabel: 'Test Kezelés',
    badge: 'HIFEM ALAKFORMÁLÁS',
    shortDesc: 'Az EMSculpt egy forradalmi, nem invazív testformáló eljárás, amely nagy intenzitású fókuszált elektromágneses (HIFEM) technológiával egyszerre épít izomtömeget és csökkenti a zsírréteget.',
    details: {
      recommendations: [
        'Kinek ajánlott: normális testsúly (BMI < 30) mellett a csekély zsírfelesleg ("utolsó 3-5 kg") célzott eltüntetésére.',
        'Izomtónus fokozására, definiáltabb testkontúrra (pl. "six-pack" has, kerekebb fenék).',
        'Szülés utáni szétnyílt hasizom (diastasis recti) és tónustalanság hatékony regenerálására.',
        'Sérülés vagy tartós fekvés utáni izomvesztés rehabilitációjára.'
      ],
      process: [
        'A kezelendő felület (has, fenék, comb) kiválasztása és a HIFEM kezelőfejek felhelyezése.',
        'Egy 30 perces kezelés során 20.000 szupramaximális izomösszehúzódás történik, ami 20.000 felüléssel vagy guggolással egyenértékű.',
        'Alapprotokoll: 4 kezelés 2 hetes kúra alatt (2-3 naponta, minimum 48 óra pihenővel az izomregenerációért).',
        'Fenntartás: 1-3 havonta 1 alkalom az elért látványos eredmények hosszas megőrzésére.'
      ],
      results: [
        'Izomtömeg növekedés: átlagosan 15-20%-os izomnövekedés 3 hónap alatt, definiáltabb izomzattal.',
        'Zsírcsökkentés: átlagosan 19%-os zsírcsökkenés a kezelt területen (hasnál 3-5 cm derékbőség-csökkenés).',
        'Fenék és comb területeken 20-30%-os javulás a cellulitisz megjelenésében.'
      ],
      whatToExpect: [
        'A kezelés teljesen fájdalommentes, intenzív izom-összehúzódási érzéssel jár.',
        'Normális reakciók: edzés utáni érzésre hasonlító izomláz (24-72 óráig), izomfáradtság és múló bőrpír.'
      ],
      aftercare: [
        'Ellenjavallatok: terhesség, szoptatás, sérv, pacemaker, fém implantátum vagy fém spirál a kezelt terület 10 cm-es körzetében.',
        'Az elért eredmények megőrzéséhez kifejezetten javasolt a rendszeres mozgás és az egészséges életmód folytatása.'
      ],
      notes: 'Az EMSculpt az egyetlen FDA által jóváhagyott technológia, amely sebészeti beavatkozás nélkül képes egyszerre izmot építeni és zsírt csökkenteni.'
    }
  }
,
  {
    id: 'hydrascan',
    title: 'HydraScan Pro+ & AI Hydrofacial',
    category: 'arc',
    categoryLabel: 'Arc & Anti-aging',
    badge: 'AI MÉLYTISZTÍTÁS',
    shortDesc: 'A legújabb generációs, mesterséges intelligenciával támogatott mélytisztító és bőrmegújító komplex arckezelés. Eltávolítja a mitesszereket és sejtszinten hidratálja a bőrt.',
    details: {
      recommendations: [
        'Mitesszeres, eltömődött pórusok és tág pórusú arcbőr esetén.',
        'Fakó, dehidratált, fáradt arcbőr azonnali felfrissítésére.',
        'Egyenetlen bőrfelszín és finom ráncok simítására.'
      ],
      process: [
        'Precíz AI bőrelemzés a bőr állapotának felmérésére.',
        'Vákuumos hidrodermabráziós mélytisztítás szalicilsavas és glikolsavas peelinggel.',
        'Hatóanyag-infúzió (hialuronsav, peptid szérumok) bevitele.',
        'Nyugtató és sejtregeneráló LED fényterápia.'
      ],
      results: [
        'Azonnal tisztább, selymesebb és élettel telibb arcbőr.',
        'Láthatóan szűkebb pórusok és csökkent faggyútermelés.',
        'Mélyrétegű hidratáltság és természetes ragyogás.'
      ],
      whatToExpect: [
        'A kezelés teljesen fájdalommentes, kellemes hűsítő érzéssel jár.',
        'Nincs felépülési idő, a kezelés után azonnal folytatható a napi rutin.'
      ],
      notes: 'A HydraScan Pro+ a legmodernebb arctisztító technológia, amely egyesíti a vákuumos hidradermabráziót és a célzott hatóanyag-bevitelt.'
    }
  },
    {
    id: 'sminktetovalas',
    title: 'Prémium Sminktetoválás (Ajak, Szemöldök & Szemhéj)',
    category: 'sminktetovalas',
    categoryLabel: 'Sminktetoválás & Smink',
    badge: 'TARTÓS SMINK',
    shortDesc: 'Egyénre szabott formatervezésű, természetes hatású ajak- (félsatír, teljes akvarell satír), szemöldök- (soft powder / púderes) és szemhéj sminktetoválás.',
    details: {
      recommendations: [
        'Ha szeretne minden nap tökéletes, mégis természetes hatású sminkkel ébredni.',
        'Ajakaszimmetria, fakó ajakszín vagy hiányos szemöldök korrekciójára.',
        'Sportos, aktív életmódot folytatóknak.'
      ],
      process: [
        'Részletes konzultáció és precíz, egyéni forma- és színtervezés.',
        'Helyi érzéstelenítés a maximális kényelemért.',
        'Prémium, minősített pigmentek bevitele mikrotűs technológiával.',
        'Ingyenes korrekció 4-6 héttel a kezelés után.'
      ],
      results: [
        'Tartós, 1.5 - 3 évig tartó esztétikus végeredmény.',
        'Tökéletesen szimmetrikus és harmonikus arcvonások.'
      ],
      aftercare: [
        'A tetovált területet utóápoló krémmel kell kenni, óvni kell a víztől és a naptól az első napokban.',
        'A pörköst szigorúan tilos kapargatni!'
      ],
      notes: 'A sminktetoválás célja az arc természetes szépségének finom kiemelése és az esztétikai aszimmetriák észrevétlen korrigálása.'
    }
  },
  {
    id: 'henna_eyebrow',
    title: 'Mina Henna Szemöldök Tervezés & Festés',
    category: 'szem',
    categoryLabel: 'Pilla & Szemöldök',
    badge: 'MINA HENNA',
    shortDesc: '100%-ban természetes alapú henna festés, amely nemcsak a szőrszálakat, hanem a bőr felszínét is gyengéden szinezi, telt és formás szemöldököt biztosítva hetekre.',
    details: {
      recommendations: [
        'Ritkás, hiányos vagy egyenetlen szemöldök dúsítására és formázására.',
        'Ha a hagyományos szemöldökfestésnél tartósabb, púderes hatást szeretne.',
        'Természetes, vegyszermentes összetevőket preferálóknak.'
      ],
      process: [
        'Szemöldök környékének letisztítása és radírozása.',
        'Archarányokhoz igazított precíz szemöldök kartografálás / tervezés.',
        'Mina Henna paszta felvitele és hatóideje.',
        'Szemöldök szedés és ápoló olajos lezárás.'
      ],
      results: [
        'A bőrön 1-2 hétig, a szőrszálakon akár 6 hétig tartó intenzív szín.',
        'Karakteres, mégis természetes megjelenés.'
      ],
      notes: 'A Mina Henna táplálja és erősíti a szőrszálak szerkezetét, elősegítve azok egészséges növekedését.'
    }
  },
    {
    id: 'tini_facial',
    title: 'Tini Mélytisztító Arckezelés',
    category: 'arc',
    categoryLabel: 'Arc & Anti-aging',
    badge: 'TINI KEZELÉS',
    shortDesc: 'Kifejezetten a fiatal, hormonális változások miatti hajlamos problémás, pattanásos bőr alapos mélytisztítása és faggyútermelésének egyensúlyba hozása.',
    details: {
      recommendations: [
        'Kamaszkori mitesszeres, aknés, gyulladt bőr tisztítására.',
        'Túlzott faggyútermelés és zsíros fényű arcbőr kezelésére.',
        'A helyes otthoni arcápolási rutin elsajátítására.'
      ],
      process: [
        'Bőrtípusnak megfelelő kíméletes tisztítás.',
        'Gőzölés vagy puhító gél alkalmazása a pórusok megnyitásához.',
        'Kíméletes, szakszerű manuális mélytisztítás.',
        'Fertőtlenítő VIO / összehúzó pakolás és faggyúszabályozó krém.'
      ],
      results: [
        'Megtisztított, kevesebb mitesszert és gyulladást mutató arcbőr.',
        'Matírozott, friss bőrérzet.'
      ],
      notes: 'A kezelés során megtanítjuk a fiataloknak a helyes arctisztítási lépéseket is az aknék megelőzésére.'
    }
  },
    {
    id: 'studex_ear',
    title: 'Studex System75 Steril Fülbelövés',
    category: 'arc',
    categoryLabel: 'Arc & Anti-aging',
    badge: 'STUDEX SYSTEM75',
    shortDesc: 'Teljesen fájdalommentes, halk, szövetkímélő és 100%-ban steril fülbelövő rendszer felnőtteknek és kisgyermekeknek egyaránt.',
    details: {
      recommendations: [
        'Felnőttek és gyermekek / csecsemők első vagy újabb fülbevalójának behelyezésére.',
        'Allergiamentes, prémium orvosi fém fülbevalót keresőknek.'
      ],
      process: [
        'Célzott fertőtlenítés és a kívánt pont pontos bejelölése.',
        'Steril, egyedileg csomagolt Studex System75 kapszula behelyezése.',
        'Egyetlen halk és gyors mozdulattal történő beszúrás.'
      ],
      results: [
        'Azonnali, tökéletesen elhelyezett fülbevaló gyulladásmentes gyógyulással.'
      ],
      notes: 'A System75 eszköz nem csattan, így nem ijeszti meg a kisgyermekeket sem. Orvosi minőségű, hipoallergén fülbevalókkal dolgozunk.'
    }
  }
];

interface TreatmentsProps {
  onOpenBooking: () => void;
}

const Treatments = ({ onOpenBooking }: TreatmentsProps) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'orvosi' | 'intim' | 'arc' | 'lezer' | 'szem' | 'szortelenites' | 'sminktetovalas'>('all');
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => 
      prev.includes(id) 
        ? []
        : [id]
    );
  };

  const categories = [
    { id: 'all', name: 'Összes' },
    { id: 'orvosi', name: 'Orvosi Esztétika' },
    { id: 'intim', name: 'Test Kezelések' },
    { id: 'arc', name: 'Arc & Anti-aging' },
    { id: 'lezer', name: 'Lézeres Kezelések' },
    { id: 'sminktetovalas', name: 'Sminktetoválás & Smink' },
    { id: 'szem', name: 'Pilla & Szemöldök' },
    { id: 'szortelenites', name: 'Szőrtelenítés' },
  ];

  const filteredTreatments = activeCategory === 'all'
    ? treatmentsData
    : treatmentsData.filter(t => t.category === activeCategory);


  return (
    <section id="treatments" className="section treatments-section">
      <div className="container">
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
        <motion.div layout className={`treatments-grid ${expandedIds.length > 0 ? 'has-expanded' : ''}`}>
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
                            <button onClick={onOpenBooking} className="btn btn-accent btn-drawer-booking">
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
