import { Link } from 'react-router-dom';
import { useLocale } from '../i18n/LocaleContext';

function Footer() {
  const { locale, t } = useLocale();

  return (
    <footer className="app-footer">
      <p>{t('footerDisclaimer')}</p>
      <Link to={`/${locale}/privacy`} className="footer-link">
        {t('footerPrivacyLink')}
      </Link>
    </footer>
  );
}

export default Footer;
