import { Navigate, Outlet, useParams } from 'react-router-dom';
import { LocaleProvider } from '../i18n/LocaleContext';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, type Locale } from '../config/locale';

function LocaleLayout() {
  const { locale } = useParams<{ locale: string }>();

  if (!locale || !SUPPORTED_LOCALES.includes(locale as Locale)) {
    return <Navigate to={`/${DEFAULT_LOCALE}`} replace />;
  }

  // key={locale}: 언어가 바뀌면 하위 페이지를 완전히 새로 마운트해서
  // 이전 언어의 상태(입력값 등)가 남아있지 않도록 함
  return (
    <LocaleProvider key={locale} locale={locale as Locale}>
      <Outlet />
    </LocaleProvider>
  );
}

export default LocaleLayout;
