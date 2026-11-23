import React, { useEffect } from 'react';
import { ArrowLeft, ShieldCheck, Mail, Phone, MapPin, Building, CheckCircle2 } from 'lucide-react';
import logoFektetett from '../assets/logo_fektetett.svg';
import './LegalPages.css';

export const PrivacyPolicy: React.FC = () => {
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
            <ShieldCheck size={14} />
            <span>GDPR & Adatvédelem</span>
          </div>
          <h1 className="legal-title">Adatkezelési Tájékoztató</h1>
          <p className="legal-subtitle">
            A Százszorszép Kozmetika tiszteletben tartja a személyes adatok védelmét, és azokat az Európai Parlament és a Tanács (EU) 2016/679 rendelete (GDPR), valamint a 2011. évi CXII. törvény rendelkezéseivel összhangban kezeli.
          </p>
        </header>

        {/* Tartalmi szekciók */}
        <div className="legal-sections-grid">
          
          {/* 01 */}
          <div className="legal-card glass">
            <div className="legal-card-num">01</div>
            <h2 className="legal-card-title">Adatkezelő és elérhetősége</h2>
            <div className="legal-info-list">
              <div className="legal-info-item">
                <Building size={16} className="info-icon" />
                <div>
                  <strong>Adatkezelő:</strong> Sikó Réka egyéni vállalkozó
                </div>
              </div>
              <div className="legal-info-item">
                <Building size={16} className="info-icon" />
                <div>
                  <strong>Üzlet:</strong> Százszorszép Kozmetika
                </div>
              </div>
              <div className="legal-info-item">
                <MapPin size={16} className="info-icon" />
                <div>
                  <strong>Cím:</strong> 6782 Mórahalom, Kisvasút utca 9.
                </div>
              </div>
              <div className="legal-info-item">
                <Phone size={16} className="info-icon" />
                <div>
                  <strong>Telefon:</strong> <a href="tel:+36203912199">+36 20 391 2199</a>
                </div>
              </div>
              <div className="legal-info-item">
                <Mail size={16} className="info-icon" />
                <div>
                  <strong>Email:</strong> <a href="mailto:reka@szazszorszep-kozmetika.hu">reka@szazszorszep-kozmetika.hu</a>
                </div>
              </div>
            </div>
          </div>

          {/* 02 */}
          <div className="legal-card glass">
            <div className="legal-card-num">02</div>
            <h2 className="legal-card-title">Kezelt adatok és célok</h2>
            <p className="legal-card-text">
              A vendégek neve, telefonszáma, szükség esetén e-mail-címe és számlázási adatai. Időpont-egyeztetéshez, kapcsolattartáshoz, a szolgáltatás teljesítéséhez és a számlázáshoz szükségesek.
            </p>
            <p className="legal-card-text">
              A kozmetikai kezeléshez indokolt esetben bőrtípusra, bőrérzékenységre, allergiára vagy egyéb releváns bőrállapotra vonatkozó adatokat is rögzíthetünk.
            </p>
          </div>

          {/* 03 */}
          <div className="legal-card glass">
            <div className="legal-card-num">03</div>
            <h2 className="legal-card-title">Adatkezelés jogalapja</h2>
            <p className="legal-card-text">
              A szolgáltatáshoz szükséges adatok kezelése a GDPR 6. cikk (1) bekezdés b) pontján (szerződés teljesítése), a kötelező számlázási adatoké a c) pontján (jogi kötelezettség) alapul.
            </p>
            <p className="legal-card-text">
              Az egészségi állapotra utaló különleges adatok kezelése – ha ilyen adatok rögzítése szükséges – a vendég kifejezett hozzájárulásán alapul (GDPR 9. cikk (2) bekezdés a) pont).
            </p>
          </div>

          {/* 04 */}
          <div className="legal-card glass">
            <div className="legal-card-num">04</div>
            <h2 className="legal-card-title">Fényképek és Facebook</h2>
            <p className="legal-card-text">
              A kozmetikai kezelések során fényképek készülhetnek, kizárólag a vendég előzetes, önkéntes hozzájárulásával. A vendégről készült, őt azonosíthatóvá tevő fényképeket a kozmetika Facebook-oldalán vagy más reklámfelületen csak külön, kifejezett hozzájárulással teszi közzé.
            </p>
            <p className="legal-card-text">
              A hozzájárulás megtagadása a szolgáltatást nem befolyásolja. A Facebook használatával az ott közzétett tartalmakat a platform üzemeltetője is kezelheti a saját szabályai szerint.
            </p>
          </div>

          {/* 05 */}
          <div className="legal-card glass">
            <div className="legal-card-num">05</div>
            <h2 className="legal-card-title">Megőrzés és adatbiztonság</h2>
            <ul className="legal-bullet-list">
              <li>
                <strong>Vendégnyilvántartás és kezelési dokumentáció:</strong> Tervezett megőrzési ideje az utolsó kezeléstől számított 2 év.
              </li>
              <li>
                <strong>Fényképek és videók tárolása:</strong> 5 év.
              </li>
              <li>
                <strong>Számviteli bizonylatok:</strong> A 2000. évi C. törvény 169. § (2) bekezdése szerint legalább 8 évig megőrzendő.
              </li>
            </ul>
            <p className="legal-card-text" style={{ marginTop: '12px' }}>
              Az adatokhoz kizárólag az arra jogosultak férhetnek hozzá; szükséges esetben könyvelő és technikai szolgáltató is részt vehet az adatkezelésben.
            </p>
          </div>

          {/* 06 */}
          <div className="legal-card glass">
            <div className="legal-card-num">06</div>
            <h2 className="legal-card-title">Vendégjogok és jogorvoslat</h2>
            <p className="legal-card-text">
              A vendég tájékoztatást, hozzáférést, helyesbítést, a jogszabályi feltételek szerint törlést és korlátozást kérhet; továbbá megillethetik a tiltakozáshoz és adathordozhatósághoz kapcsolódó jogok.
            </p>
            <p className="legal-card-text">
              A hozzájárulás bármikor indoklás nélkül visszavonható.
            </p>
            <div className="legal-authority-box">
              <CheckCircle2 size={16} />
              <span>Panasztétel: Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH) • <a href="https://www.naih.hu" target="_blank" rel="noopener noreferrer">www.naih.hu</a> • Bírósági jogorvoslat is igénybe vehető.</span>
            </div>
          </div>

        </div>

        {/* Hatálybalépés lábléc */}
        <div className="legal-footer-box glass">
          <div>
            <strong>Hatálybalépés:</strong> 2026. november
          </div>
          <p>
            A részletes adatkezelési kérdésekkel kérjük, forduljon az adatkezelőhöz a fenti elérhetőségeken.
          </p>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;