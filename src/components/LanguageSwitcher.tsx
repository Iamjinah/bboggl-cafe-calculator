import { Link, useLocation } from 'react-router-dom';
import { useLocale } from '../i18n/LocaleContext';

function LanguageSwitcher() {
  const { locale } = useLocale();
  const location = useLocation();
  const isPrivacyPage = location.pathname.endsWith('/privacy');
  const suffix = isPrivacyPage ? '/privacy' : '';

  return (
    <div className="lang-switcher">
      <Link to={`/ko${suffix}`} className={locale === 'ko' ? 'lang-active' : ''}>
        한국어
      </Link>
      <span className="lang-divider">·</span>
      <Link to={`/en${suffix}`} className={locale === 'en' ? 'lang-active' : ''}>
        English
      </Link>
    </div>
  );
}

export default LanguageSwitcher;
