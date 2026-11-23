import React, { useEffect } from 'react';
import { ArrowLeft, CalendarCheck, AlertTriangle, HeartPulse, CheckCircle2 } from 'lucide-react';
import logoFektetett from '../assets/logo_fektetett.svg';
import './LegalPages.css';

export const BookingPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page-wrapper">
      <div className="legal-container">
        
        {/* Felső navigációs sáv */}
        <div className="legal-top-nav">
          <a href="/" className="back-btn" title="Vissza a főoldalra">
            <ArrowLeft size={16} />
            <span>Vissza a főoldalra</span>
          </a>
          <a href="/" className="legal-nav-logo">
            <img src={logoFektetett} alt="Százszorszép Kozmetika" className="legal-logo-img" />
          </a>
        </div>

        {/* Fő fejléc */}
        <header className="legal-header text-center">
          <div className="legal-badge">
            <CalendarCheck size={14} />
            <span>Szalon Házirend</span>
          </div>
          <h1 className="legal-title">Foglalási és Szolgáltatási Szabályzat</h1>
          <p className="legal-subtitle">
            Kedves Vendégeim! Kérlek, időpontfoglalás előtt olvasd el az alábbi szabályokat, hogy mindkettőnk számára gördülékenyen és nyugalomban teljen az együtt töltött idő!
          </p>
        </header>

        {/* Tartalmi szekciók */}
        <div className="legal-sections-grid">
          
          {/* 01 */}
          <div className="legal-card glass">
            <div className="legal-card-num">01</div>
            <h2 className="legal-card-title">Időpontfoglalás</h2>
            <p className="legal-card-text">
              Időpontot online tudsz foglalni, a foglalási linket a Facebookon, Instagramon és a weboldalunkon is megtalálod.
            </p>
            <ul className="legal-bullet-list">
              <li>
                <strong>Kezelés kiválasztása:</strong> Foglaláskor kérlek, mindig a kívánt kezelést válaszd ki.
              </li>
              <li>
                <strong>Személyes segítség:</strong> Amennyiben bizonytalan vagy abban, hogy melyik kezelés lenne számodra a legmegfelelőbb, foglalás előtt vedd fel velem a kapcsolatot, és készséggel segítek a választásban.
              </li>
            </ul>
            <div className="legal-highlight-box">
              <CheckCircle2 size={16} />
              <span>Kérlek, vedd figyelembe, hogy az időpontodra elsősorban a lefoglalt szolgáltatást tudom biztosítani, így az utólagos módosításra nem minden esetben van lehetőség.</span>
            </div>
          </div>

          {/* 02 */}
          <div className="legal-card glass">
            <div className="legal-card-num">02</div>
            <h2 className="legal-card-title">Időpont lemondása és módosítása</h2>
            <p className="legal-card-text">
              Mindenkinek értékes az ideje, ezért kérlek, az esetleges lemondást vagy módosítást <strong>lehetőség szerint legalább 24–48 órával</strong> a lefoglalt időpont előtt jelezd!
            </p>
            <p className="legal-card-text">
              Természetesen bármikor közbejöhet valami váratlan, és igyekszem rugalmasan alkalmazkodni az ilyen helyzetekhez.
            </p>
            
            <div className="legal-warning-box">
              <AlertTriangle size={18} />
              <div>
                <strong>24 órán belüli lemondás:</strong> A 24 órán belüli lemondás vagy módosítás esetén a lefoglalt szolgáltatás teljes ára fizetendő. Új időpontot a fennálló díj rendezését követően tudok biztosítani. Ugyanez vonatkozik arra az esetre is, ha előzetes lemondás nélkül nem jelensz meg az időponton.
              </div>
            </div>

            <div className="legal-health-box">
              <HeartPulse size={18} />
              <div>
                <strong>Betegség esetén kivétel:</strong> Kérlek, ilyenkor is jelezd, amint tudod, ha nem tudsz eljönni, akár az utolsó pillanatban is. Betegen kérlek, a többiek és magad védelmében se érkezz a szalonba!
              </div>
            </div>
          </div>

          {/* 03 */}
          <div className="legal-card glass">
            <div className="legal-card-num">03</div>
            <h2 className="legal-card-title">Érkezés az időpontra</h2>
            <p className="legal-card-text">
              Kérlek, <strong>érkezz legalább 5 perccel az időpontod előtt</strong>. Ha korábban érkezel, előfordulhat, hogy még az előző vendéggel foglalkozom, ezért kérlek, várj türelemmel.
            </p>
            <p className="legal-card-text">
              Érkezésedet követően az előtérben át tudod venni a kényelmes vendégpapucsot, helyet tudsz foglalni és kicsit hangolódni a kezelésre.
            </p>
            
            <ul className="legal-bullet-list">
              <li>
                <strong>Késés esetén értesítés:</strong> Kérlek, mindenképpen jelezd, ha késel. Késés esetén a kezelés időtartama rövidülhet, amennyiben az időkeret és a kezelés jellege ezt lehetővé teszi.
              </li>
              <li>
                <strong>15 percet meghaladó késés:</strong> Fenntartom a jogot az időpont törlésére, amely esetben a lefoglalt szolgáltatás árának 50%-a fizetendő.
              </li>
            </ul>

            <p className="legal-card-text" style={{ fontStyle: 'italic', color: '#714921', marginTop: '10px' }}>
              Kérlek, vedd figyelembe, hogy a kezelések megfelelő és biztonságos elvégzéséhez szükséges időt nem minden esetben lehet lerövidíteni.
            </p>
          </div>

        </div>

        {/* Hatálybalépés lábléc */}
        <div className="legal-footer-box glass">
          <div>
            <strong>Hatálybalépés:</strong> 2026. november
          </div>
          <p>
            Az időpontfoglalással elfogadod a foglalási és szolgáltatási szabályzatban foglaltakat.
          </p>
        </div>

      </div>
    </div>
  );
};

export default BookingPolicy;