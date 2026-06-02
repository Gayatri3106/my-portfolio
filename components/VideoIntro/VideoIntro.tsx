'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './VideoIntro.module.css';

const CinematicLayer = dynamic(() => import('../CinematicLayer/CinematicLayer'), { ssr: false });

export default function VideoIntro() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);
  const firstNameRef = useRef<HTMLHeadingElement>(null);
  const lastNameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const soundBadgeRef = useRef<HTMLDivElement>(null);

  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [showSoundHint, setShowSoundHint] = useState(true);

  useEffect(() => {
    // Auto-hide sound hint after 4 seconds
    const timer = setTimeout(() => setShowSoundHint(false), 4000);

    // GSAP entrance animations
    const initGSAP = async () => {
      const { gsap } = await import('gsap');

      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(taglineRef.current,
        { opacity: 0, y: 30, letterSpacing: '0.8em' },
        { opacity: 1, y: 0, letterSpacing: '0.3em', duration: 1.2, ease: 'power3.out' }
      )
      .fromTo(firstNameRef.current,
        { opacity: 0, y: 80, skewY: 4 },
        { opacity: 1, y: 0, skewY: 0, duration: 1.0, ease: 'power4.out' },
        '-=0.6'
      )
      .fromTo(lastNameRef.current,
        { opacity: 0, y: 80, skewY: 4 },
        { opacity: 1, y: 0, skewY: 0, duration: 1.0, ease: 'power4.out' },
        '-=0.75'
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' },
        '-=0.5'
      );
    };

    initGSAP();
    return () => clearTimeout(timer);
  }, []);

  const toggleMute = () => {
    if (videoRef.current && bgVideoRef.current) {
      const newMuted = !muted;
      videoRef.current.muted = newMuted;
      setMuted(newMuted);
      setShowSoundHint(false);
    }
  };

  const togglePlay = () => {
    if (videoRef.current && bgVideoRef.current) {
      if (playing) {
        videoRef.current.pause();
        bgVideoRef.current.pause();
      } else {
        videoRef.current.play();
        bgVideoRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className={styles.hero}>

      {/* Ambient blurred background video */}
      <video
        ref={bgVideoRef}
        className={styles.bgVideo}
        src="/hero-video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Main foreground video */}
      <video
        ref={videoRef}
        className={styles.fgVideo}
        src="/hero-video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Cinematic gradient overlays */}
      <div className={styles.overlayBottom} />
      <div className={styles.overlayLeft} />
      <div className={styles.overlayTop} />
      <div className={styles.overlayVignette} />

      {/* Three.js particle bokeh layer */}
      <CinematicLayer />

      {/* Sound hint badge */}
      <div
        ref={soundBadgeRef}
        className={`${styles.soundBadge} ${showSoundHint ? styles.soundBadgeVisible : ''}`}
        onClick={toggleMute}
      >
        <span className={styles.soundDot} />
        <span>Tap for sound</span>
      </div>

      {/* Portfolio content */}
      <div ref={contentRef} className={styles.content}>
        <span ref={taglineRef} className={styles.tagline}>
  Software Engineer
</span>
<div className={styles.nameBlock}>
  <h1 ref={firstNameRef} className={styles.firstName}>GAYATRI</h1>
</div>
<p ref={subtitleRef} className={styles.subtitle}>
  Passionate about building elegant solutions & solving complex problems
  <br />
  <span className={styles.subtitleAccent}>Java · DSA · OOP · Python</span>
</p>
      </div>

      {/* Glassmorphism controls */}
      <div className={styles.controls}>
        <button
          onClick={togglePlay}
          className={styles.controlBtn}
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1"/>
              <rect x="14" y="4" width="4" height="16" rx="1"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
        <button
          onClick={toggleMute}
          className={styles.controlBtn}
          aria-label={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0017.73 18l1.54 1.54L20.54 18 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          )}
        </button>
      </div>

      {/* Scroll indicator */}
      <button className={styles.scrollIndicator} onClick={scrollToNext} aria-label="Scroll down">
        <span className={styles.scrollLabel}>Scroll</span>
        <div className={styles.scrollLine} />
      </button>

    </section>
  );
}
