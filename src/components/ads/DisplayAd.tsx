import AdUnit from './AdUnit';

interface DisplayAdProps {
  size?: 'wide' | 'square';
}

function DisplayAd({ size = 'wide' }: DisplayAdProps) {
  return (
    <div className={`display-ad display-ad--${size}`}>
      <AdUnit />
    </div>
  );
}

export default DisplayAd;
