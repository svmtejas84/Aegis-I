import React, { useEffect, useMemo, useRef, useState } from 'react';
import './Scrollytelling.css';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

const normalize = (chapters) => {
  if (!Array.isArray(chapters) || chapters.length === 0) return [];
  const step = 100 / chapters.length;
  return chapters.map((c, i) => ({ ...c, start: i * step, end: i === chapters.length - 1 ? 100 : (i + 1) * step }));
};

export default function Scrollytelling({ videoSrc, chapters = [] }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [active, setActive] = useState(0);

  const ranges = useMemo(() => normalize(chapters), [chapters]);

  useEffect(() => {
    const el = containerRef.current;
    const vid = videoRef.current;
    if (!el || !vid || ranges.length === 0) return;

    const onScroll = () => {
      const top = el.offsetTop;
      const h = el.offsetHeight;
      const vh = window.innerHeight;
      const sc = window.scrollY - (top - vh / 2);
      const total = Math.max(h - vh, 1);
      let pct = (sc / total) * 100;
      pct = clamp(pct, 0, 100);

      if (vid.duration) {
        vid.currentTime = (pct / 100) * vid.duration;
      }

      const next = ranges.findIndex(r => pct >= r.start && pct <= r.end);
      setActive(next === -1 ? ranges.length - 1 : next);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [ranges]);

  const heightVh = Math.max(ranges.length * 140, 140);

  return (
    <div ref={containerRef} className="scrollytelling-container" style={{ height: `${heightVh}vh` }}>
      <div className="scrollytelling-video-wrapper">
        <video ref={videoRef} src={videoSrc} preload="auto" muted playsInline />
      </div>

      <div className="scrollytelling-chapter-overlay">
        {ranges[active] ? (
          <div className="chapter-text fade-in">
            <h2>{ranges[active].title}</h2>
            <p>{ranges[active].description}</p>
          </div>
        ) : (
          <div className="chapter-text fade-out">Scroll to begin</div>
        )}
      </div>
    </div>
  );
}
