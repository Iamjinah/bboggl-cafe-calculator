import { useEffect } from 'react';

const AD_CLIENT = 'ca-pub-4244092615984804';
const AD_SLOT = '6828213909';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

function AdUnit() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // 애드블록 등으로 스크립트가 없을 때도 페이지가 깨지지 않도록 무시
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={AD_CLIENT}
      data-ad-slot={AD_SLOT}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}

export default AdUnit;
