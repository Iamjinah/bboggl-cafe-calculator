import { useEffect, useRef, useState } from 'react';
import AdUnit from './AdUnit';
import { useLocale } from '../../i18n/LocaleContext';

interface InterstitialAdProps {
  onClose: () => void;
}

// 광고 노출을 보장하기 위해 일정 시간 후에만 닫기 버튼 활성화 (강제 클릭 유도 아님, 단순 노출 시간 확보)
const AD_WAIT_SECONDS = 3;
// 이 시간 안에 애드센스가 채움/미채움 판정을 못 내리면 빈 모달을 계속 붙잡지 않고 결과로 보냄
const AD_FILL_TIMEOUT_MS = 4000;

function InterstitialAd({ onClose }: InterstitialAdProps) {
  const { t } = useLocale();
  const [remaining, setRemaining] = useState(AD_WAIT_SECONDS);
  const adWrapRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (remaining <= 0) return;
    const timer = setTimeout(() => setRemaining((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [remaining]);

  // 광고가 채워지지 않으면(미채움/판정 지연) 빈 화면만 보여주는 셈이므로 모달을 건너뜀
  useEffect(() => {
    const ins = adWrapRef.current?.querySelector('ins.adsbygoogle');
    if (!ins) return;

    const skipIfUnfilled = () => {
      if (ins.getAttribute('data-ad-status') === 'unfilled') {
        onCloseRef.current();
        return true;
      }
      return false;
    };

    if (skipIfUnfilled()) return;

    const observer = new MutationObserver(skipIfUnfilled);
    observer.observe(ins, { attributes: true, attributeFilter: ['data-ad-status'] });

    const fallbackTimer = setTimeout(() => {
      if (ins.getAttribute('data-ad-status') !== 'filled') {
        onCloseRef.current();
      }
    }, AD_FILL_TIMEOUT_MS);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div className="ad-overlay" role="dialog" aria-modal="true" aria-label={t('adDialogLabel')}>
      <div className="ad-modal">
        <button
          type="button"
          className="ad-close"
          onClick={onClose}
          disabled={remaining > 0}
          aria-label={t('adCloseLabel')}
        >
          {remaining > 0 ? remaining : '✕'}
        </button>
        <div className="ad-placeholder" ref={adWrapRef}>
          <AdUnit />
        </div>
      </div>
    </div>
  );
}

export default InterstitialAd;
