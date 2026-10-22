import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Play, Pause, Sparkles, ChevronRight } from 'lucide-react';
import { LiquidMetalButton } from './LiquidMetalButton';

interface HeroVideoProps {
  onMeetTeam: () => void;
  onSeeHowItWorks: () => void;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({
  onMeetTeam,
  onSeeHowItWorks
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure muted autoplay
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsLoaded(true);
        })
        .catch(() => {
          // Autoplay blocked by browser policy
          setIsPlaying(false);
        });
    }
  }, []);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="hero-viewport-section" aria-label="Hero Introduction">
      {/* Edge-to-edge Video Container */}
      <div className="hero-media-container" aria-hidden="true">
        <video
          ref={videoRef}
          src="/assets/hero-office.mp4"
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setIsLoaded(true)}
          onError={() => setVideoError(true)}
          className={`hero-video-element ${isLoaded ? 'is-visible' : ''}`}
        />

        {/* Fallback poster or gradient if video has an issue */}
        {videoError && (
          <div className="hero-video-fallback">
            <div className="hero-fallback-glow" />
            <span className="hero-fallback-notice">
              Office Visual Environment Initialized
            </span>
          </div>
        )}

        {/* Sophisticated Readability Scrims (never obscure the characters or office depth) */}
        <div className="hero-gradient-overlay hero-gradient-top" />
        <div className="hero-gradient-overlay hero-gradient-bottom" />
        <div className="hero-gradient-overlay hero-gradient-center" />
      </div>

      {/* Floating Accessibility Control */}
      <button
        onClick={togglePlayPause}
        className="hero-video-control-pill"
        aria-label={isPlaying ? 'Pause background office video' : 'Play background office video'}
        title={isPlaying ? 'Pause video' : 'Play video'}
      >
        {isPlaying ? <Pause size={13} /> : <Play size={13} />}
        <span>{isPlaying ? 'Ambient Loop' : 'Paused'}</span>
      </button>

      {/* Hero Foreground Content */}
      <div className="hero-content-container">
        <motion.div
          className="hero-copy-block"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Refined Eyebrow Pill */}
          <div className="hero-badge-pill">
            <span className="hero-badge-dot" aria-hidden="true" />
            <span className="hero-badge-text">One Manager • Four Specialists</span>
            <span className="hero-badge-tag">Synchronized</span>
          </div>

          {/* Locked Headline */}
          <h1 className="hero-main-headline">
            A team that works as one.
          </h1>

          {/* Locked Supporting Text */}
          <p className="hero-supporting-text">
            One Manager. Four specialists. A coordinated team built to move work forward.
          </p>

          {/* Refined Actions */}
          <div className="hero-actions-row">
            {/* Primary Action with Liquid Metal Treatment */}
            <LiquidMetalButton
              size="lg"
              onClick={onMeetTeam}
              glowColor="gold"
              icon={<ChevronRight size={18} />}
              ariaLabel="Meet the five agents in the team"
            >
              Meet the Team
            </LiquidMetalButton>

            {/* Secondary Understated Action */}
            <button
              onClick={onSeeHowItWorks}
              className="hero-secondary-btn"
              aria-label="See how the agents coordinate work"
            >
              <span>See How It Works</span>
              <Sparkles size={16} className="hero-sec-icon" aria-hidden="true" />
            </button>
          </div>
        </motion.div>

        {/* Scroll Indicator Prompt */}
        <div className="hero-scroll-cue" onClick={onMeetTeam} role="button" tabIndex={0} aria-label="Scroll down to the team section">
          <span className="hero-scroll-cue-text">Explore the Workspace</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="hero-scroll-cue-icon"
          >
            <ArrowDown size={14} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
