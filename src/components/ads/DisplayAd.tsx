interface DisplayAdProps {
  label: string;
  size?: 'wide' | 'square';
}

// TODO(PART 2): 승인된 AdSense 사이트의 실제 광고 유닛으로 교체
function DisplayAd({ label, size = 'wide' }: DisplayAdProps) {
  return (
    <div className={`display-ad display-ad--${size}`}>
      <span>{label}</span>
    </div>
  );
}

export default DisplayAd;
