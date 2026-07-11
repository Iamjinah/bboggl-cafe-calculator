import { Link } from 'react-router-dom';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Footer from '../components/Footer';
import { useLocale } from '../i18n/LocaleContext';
import { useSeoMeta } from '../hooks/useSeoMeta';
import { CALCULATORS, CATEGORY_LABELS, CATEGORY_ORDER } from '../config/calculators';

function HubPage() {
  const { locale, t } = useLocale();

  useSeoMeta({ locale, path: '', title: t('hubMetaTitle'), description: t('hubMetaDescription') });

  return (
    <div className="app-shell">
      <header className="app-header">
        <LanguageSwitcher />
        <span className="app-badge">{t('hubBadge')}</span>
        <h1>{t('hubTitle')}</h1>
        <p className="subtitle">{t('hubSubtitle')}</p>
      </header>

      {CATEGORY_ORDER.map((category) => {
        const items = CALCULATORS.filter((c) => c.category === category);
        if (items.length === 0) return null;

        return (
          <section key={category} className="hub-cat">
            <h2 className="hub-cat-title">{CATEGORY_LABELS[category][locale]}</h2>
            <div className="calc-grid">
              {items.map((calc) => {
                const inner = (
                  <>
                    <span className="calc-icon" aria-hidden="true">
                      {calc.icon}
                    </span>
                    <span className="calc-text">
                      <span className="calc-name">{calc.name[locale]}</span>
                      <span className="calc-desc">{calc.description[locale]}</span>
                    </span>
                    {calc.status === 'coming' && (
                      <span className="coming-badge">{t('hubComingBadge')}</span>
                    )}
                  </>
                );

                return calc.status === 'live' ? (
                  <Link key={calc.slug} to={`/${locale}/${calc.slug}`} className="calc-card">
                    {inner}
                  </Link>
                ) : (
                  <div key={calc.slug} className="calc-card calc-card--coming" aria-disabled="true">
                    {inner}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      <Footer />
    </div>
  );
}

export default HubPage;
