import LanguageSwitcher from './LanguageSwitcher';
import { useLocale } from '../i18n/LocaleContext';

function Header() {
  const { t } = useLocale();

  return (
    <header className="app-header">
      <LanguageSwitcher />
      <span className="app-badge">{t('badge')}</span>
      <h1>{t('title')}</h1>
      <p className="subtitle">{t('subtitle')}</p>
    </header>
  );
}

export default Header;
