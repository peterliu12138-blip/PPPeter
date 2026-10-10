import { useEffect, useRef } from 'react';

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4';

// Fraction of the video's duration scrubbed by moving across the full window width.
const SENSITIVITY = 0.8;

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevX = useRef<number | null>(null);
  const targetTime = useRef(0);
  // Time of the seek currently in flight, or null when the video is idle.
  const pendingSeek = useRef<number | null>(null);

  const seekTo = (time: number) => {
    const video = videoRef.current;
    if (!video) return;
    pendingSeek.current = time;
    video.currentTime = time;
  };

  // Once a seek lands, chase the latest target instead of queueing every mouse event.
  const handleSeeked = () => {
    const settledAt = pendingSeek.current;
    pendingSeek.current = null;
    if (settledAt !== null && settledAt !== targetTime.current) {
      seekTo(targetTime.current);
    }
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const video = videoRef.current;
      const currentX = event.clientX;

      if (prevX.current === null) {
        prevX.current = currentX;
        return;
      }

      const delta = currentX - prevX.current;
      prevX.current = currentX;

      if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;

      const offset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      const nextTime = Math.min(Math.max(targetTime.current + offset, 0), video.duration);
      if (nextTime === targetTime.current) return;
      targetTime.current = nextTime;

      if (pendingSeek.current === null) {
        seekTo(targetTime.current);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <video
      ref={videoRef}
      src={VIDEO_SRC}
      muted
      playsInline
      preload="auto"
      onSeeked={handleSeeked}
      aria-hidden="true"
      className="fixed inset-0 z-0 h-full w-full object-cover"
      style={{ objectPosition: '70% center' }}
    />
  );
}
