import React, { useEffect, useRef, useState } from 'react';
import chernobylVideo from '../assets/chernobyl-animation.mp4';
import '../App.css';
import './ChernobylPage.css';

// small utility
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

function ChernobylPage() {
				const videoRef = useRef(null);
				const containerRef = useRef(null);
				const textScrollRef = useRef(null);
				const scrollTimeout = useRef(null);
				const [active, setActive] = useState(0);
				const [intra, setIntra] = useState(0); // progress inside current segment (0..1)

			useEffect(() => {
				const textEl = textScrollRef.current;
				const vid = videoRef.current;
				if (!textEl || !vid) return;

				// prevent body scrolling so only the overlay's scroll matters
				const prevOverflow = document.body.style.overflow;
				document.body.style.overflow = 'hidden';

				const onScroll = () => {
					const scrollTop = textEl.scrollTop;
					const clientH = textEl.clientHeight;
					const scrollH = textEl.scrollHeight;
					const total = Math.max(scrollH - clientH, 1);
					let pct = (scrollTop / total) * 100;
					pct = Math.max(0, Math.min(100, pct));

					// scrub video based on scroll percent
					if (vid.duration && Number.isFinite(vid.duration)) {
						vid.currentTime = (pct / 100) * vid.duration;
					}

					const n = blocks.length || 1;
					const raw = (scrollTop / clientH); // 0..n
					const idx = Math.min(Math.floor(raw), n - 1);
					const intraProgress = (scrollTop - idx * clientH) / clientH;

					setActive(idx);
					setIntra(clamp(intraProgress, 0, 1));

					// play while scrolling, then pause shortly after
					try { vid.play().catch(() => {}); } catch (e) {}
					if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
					scrollTimeout.current = setTimeout(() => { try { vid.pause(); } catch (e) {} }, 200);
				};

				textEl.addEventListener('scroll', onScroll, { passive: true });
				// init
				onScroll();

				return () => {
					textEl.removeEventListener('scroll', onScroll);
					document.body.style.overflow = prevOverflow;
				};
			}, []);

	const blocks = [
		{
			number: '1',
			title: 'What is a man-made nuclear disaster?',
			text:
				'A man-made nuclear disaster occurs when radioactive materials are accidentally released from power plants, medical facilities, or during transport, exposing people and the environment to dangerous radiation. These events can have immediate health impacts and long-lasting ecological consequences.'
		},
		{
			number: '2',
			title: 'Global context',
			text:
				'India has maintained strict safety protocols, though globally the Chernobyl disaster of 1986 and the Fukushima Daiichi incident in 2011 stand as stark reminders of the potential scale of nuclear accidents.'
		},
		{
			number: '3',
			title: 'If a nuclear emergency occurs',
			text:
				'Follow official evacuation orders immediately and move to designated shelters or higher ground. Seal windows and doors, avoid consuming local food or water until authorities confirm safety, and keep a battery-powered radio or device to receive updates.'
		}
	];

		return (
			<div ref={containerRef} className="scrollytelling-container" style={{ height: `${blocks.length * 120}vh` }}>
				<div className="full-video-wrapper">
					<video
						ref={videoRef}
						className="full-video"
						src={chernobylVideo}
						muted
						playsInline
						preload="auto"
					/>
				</div>

								<div className="overlay-container" aria-hidden={false}>
									<div ref={textScrollRef} className="text-scroll">
										{blocks.map((b, i) => (
											<div key={i} className="overlay-block" role="note">
												<div className="overlay-inner">
													<div className="badge">{b.number}</div>
													<div className="overlay-text">
														<h3>{b.title}</h3>
														<p>{b.text}</p>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
			</div>
		);
}

export default ChernobylPage;
