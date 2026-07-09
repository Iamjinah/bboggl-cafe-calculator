import { useEffect } from 'react';
import type { Locale } from '../config/locale';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from '../config/locale';

const BASE_URL = 'https://cafe.moneymakerwebsite.com';

interface SeoMetaOptions {
  locale: Locale;
  path: string; // '' for home, '/privacy' for the privacy page
  title: string;
  description: string;
}

function setMetaContent(selector: string, value: string) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(el.tagName === 'LINK' ? 'href' : 'content', value);
}

export function useSeoMeta({ locale, path, title, description }: SeoMetaOptions) {
  useEffect(() => {
    const url = `${BASE_URL}/${locale}${path}`;

    document.documentElement.lang = locale;
    document.title = title;
    setMetaContent('meta[name="description"]', description);
    setMetaContent('link[rel="canonical"]', url);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[property="og:url"]', url);
    setMetaContent('meta[property="og:locale"]', locale === 'ko' ? 'ko_KR' : 'en_US');
    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', description);

    const hreflangLinks = SUPPORTED_LOCALES.map((loc) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = loc;
      link.href = `${BASE_URL}/${loc}${path}`;
      document.head.appendChild(link);
      return link;
    });

    const defaultLink = document.createElement('link');
    defaultLink.rel = 'alternate';
    defaultLink.hreflang = 'x-default';
    defaultLink.href = `${BASE_URL}/${DEFAULT_LOCALE}${path}`;
    document.head.appendChild(defaultLink);
    hreflangLinks.push(defaultLink);

    return () => {
      hreflangLinks.forEach((link) => document.head.removeChild(link));
    };
  }, [locale, path, title, description]);
}
