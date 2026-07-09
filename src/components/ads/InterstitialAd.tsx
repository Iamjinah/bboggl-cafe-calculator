import { useEffect, useState } from 'react';
import AdUnit from './AdUnit';
import { useLocale } from '../../i18n/LocaleContext';

interface InterstitialAdProps {
  onClose: () => void;
}

// 광고 노출을 보장하기 위해 일정 시간 후에만 닫기 버튼 활성화 (강제 클릭 유도 아님, 단순 노출 시간 확보)
const AD_WAIT_SECONDS = 3;

function InterstitialAd({ onClose }: InterstitialAdProps) {
  const { t } = useLocale();
  const [remaining, setRemaining] = useState(AD_WAIT_SECONDS);

  useEffect(() => {
    if (remaining <= 0) return;
    const timer = setTimeout(() => setRemaining((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [remaining]);

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
        <div className="ad-placeholder">
          <AdUnit />
        </div>
      </div>
    </div>
  );
}

export default InterstitialAd;
