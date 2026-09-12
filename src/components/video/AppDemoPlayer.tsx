import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Maximize,
  Minimize,
  Sparkles,
  PieChart,
  Trash2,
  Zap,
  CheckCircle2,
} from "lucide-react";

export interface DemoVideoItem {
  id: string;
  title: string;
  shortTitle: string;
  badge: string;
  duration: string;
  videoSrc: string;
  poster: string;
  headline: string;
  description: string;
  bullets: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const demoVideos: DemoVideoItem[] = [
  {
    id: "deep-clean",
    title: "Deep Cleanup & Project Artifacts",
    shortTitle: "Deep Clean",
    badge: "1-Click Scan",
    duration: "1:38",
    videoSrc: "/assets/videos/deep_clean.mp4",
    poster: "/assets/screenshots/01_deep_cleanup.png",
    headline: "Reclaim multi-gigabyte build artifacts & caches safely.",
    description:
      "Watch MacMint discover deeply nested node_modules directories across your development workspaces, Swift DerivedData caches, browser service workers, and system junk — with granular item review before deletion.",
    bullets: [
      "Auto-expands node_modules projects with path details",
      "Calculates exact disk reclamation prior to deletion",
      "Preserves protected user data & custom exclusion lists",
      "Instant real-time scan with zero background lag",
    ],
    icon: Sparkles,
  },
  {
    id: "disk-space",
    title: "Smart Disk Space & Radial Sunburst",
    shortTitle: "Disk Space",
    badge: "Interactive Map",
    duration: "0:44",
    videoSrc: "/assets/videos/disk_space.mp4",
    poster: "/assets/screenshots/05_disk_space.png",
    headline: "Visualize every gigabyte with fluid interactive radar navigation.",
    description:
      "Drill down through your storage visually. The multi-layered Sunburst map surfaces forgotten massive folders, virtual machine disks, and media libraries that macOS Storage leaves hidden.",
    bullets: [
      "Dynamic nested rings with smooth zooming",
      "Color-coded storage rings with instant size metrics",
      "Integrated macOS Quick Look preview for immediate confirmation",
      "Zero guesswork — see true disk footprint at a glance",
    ],
    icon: PieChart,
  },
  {
    id: "uninstall-apps",
    title: "App Uninstaller & Leftover Removal",
    shortTitle: "App Uninstaller",
    badge: "Zero Leftovers",
    duration: "1:00",
    videoSrc: "/assets/videos/uninstall_apps.mp4",
    poster: "/assets/screenshots/06_app_uninstaller.png",
    headline: "Complete removal beyond simply dragging to Trash.",
    description:
      "Dragging an app to Trash leaves gigabytes in Application Support, Caches, Preferences, and active LaunchAgents. MacMint hunts down every connected file for spotless 100% removal.",
    bullets: [
      "Aggregates total footprint across ~/Library domains",
      "Unlinks associated LaunchAgents & background daemons",
      "Displays itemized breakdown before user confirmation",
      "Restores locked permissions and sandboxed containers",
    ],
    icon: Trash2,
  },
  {
    id: "system-optimizer",
    title: "System Optimizer & Maintenance Routines",
    shortTitle: "System Optimizer",
    badge: "One-Click Boost",
    duration: "0:59",
    videoSrc: "/assets/videos/system_optimizer.mp4",
    poster: "/assets/screenshots/08_system_optimization.png",
    headline: "Maintain peak macOS responsiveness without Terminal scripts.",
    description:
      "Safely execute essential macOS maintenance tasks: flush stale DNS caches, purge inactive RAM memory back to the macOS pool, re-index sluggish Spotlight databases, and audit startup daemons.",
    bullets: [
      "Purge inactive RAM back into free system memory",
      "Flush stale DNS lookups and restart mDNSResponder cleanly",
      "Re-index Spotlight search via native mdutil integration",
      "Audit and toggle login daemons without sudo terminal commands",
    ],
    icon: Zap,
  },
];

interface AppDemoPlayerProps {
  onNavigate?: (path: string) => void;
  initialVideoId?: string;
}

export const AppDemoPlayer: React.FC<AppDemoPlayerProps> = ({
  initialVideoId = "deep-clean",
}) => {
  const [activeTabId, setActiveTabId] = useState<string>(initialVideoId);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeVideo =
    demoVideos.find((v) => v.id === activeTabId) || demoVideos[0];

  // Handle Tab Switch
  const handleTabChange = (videoId: string) => {
    if (videoId === activeTabId) return;
    setActiveTabId(videoId);
    setIsPlaying(false);
    setCurrentTime(0);

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  // Video Event Handlers
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true));
    }
  };

  const cycleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const nextIdx = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    const newSpeed = speeds[nextIdx];
    setPlaybackRate(newSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = newSpeed;
    }
  };

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {});
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(() => {});
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Listen for top navigation trigger to start video playback
  useEffect(() => {
    const handlePlayEvent = () => {
      if (videoRef.current) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    };
    window.addEventListener("play-demo-video", handlePlayEvent);
    return () => window.removeEventListener("play-demo-video", handlePlayEvent);
  }, []);

  // Auto-hide controls during playback
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "00:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section id="demo-player" className="scroll-mt-16 sm:scroll-mt-20 py-16 md:py-24 bg-surface-light dark:bg-surface-dark transition-colors border-t border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint-50 dark:bg-surface-darkCard border border-mint-200 dark:border-mint-800/60 text-mint-700 dark:text-mint-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-mint-600 dark:text-mint-400" />
            <span>DIRECT APP DEMO · LIVE SCREEN RECORDINGS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 dark:text-white">
            See MacMint in action.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-4 leading-relaxed font-normal">
            Direct screen recordings of MacMint running on macOS Sequoia. No mockups, no simulated animations — see the exact speed and clean native workflow.
          </p>
        </div>

        {/* 4 Interactive Video Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {demoVideos.map((video) => {
            const Icon = video.icon;
            const isActive = video.id === activeTabId;
            return (
              <button
                key={video.id}
                onClick={() => handleTabChange(video.id)}
                className={`group relative flex items-center gap-2.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-slate-900 dark:bg-mint-500 text-white shadow-lg shadow-mint-500/10 dark:shadow-mint-500/20 scale-[1.02]"
                    : "bg-slate-100 dark:bg-surface-darkCard text-slate-700 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-800 border border-transparent hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-white dark:bg-surface-dark text-slate-600 dark:text-slate-400 group-hover:text-mint-600 dark:group-hover:text-mint-400"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-xs sm:text-sm leading-tight flex items-center gap-1.5">
                    {video.shortTitle}
                  </div>
                  <div
                    className={`text-[11px] leading-none mt-0.5 ${
                      isActive
                        ? "text-white/80"
                        : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {video.duration}
                  </div>
                </div>

                {isActive && (
                  <span className="hidden sm:inline-flex items-center ml-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-white/20 text-white">
                    Playing
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* macOS Window Video Frame Container */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            if (isPlaying) setShowControls(false);
          }}
          onMouseMove={handleMouseMove}
          className={`relative max-w-5xl mx-auto rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 shadow-2xl shadow-slate-900/20 transition-all ${
            isFullscreen ? "rounded-none max-w-none h-screen flex flex-col" : ""
          }`}
        >
          {/* macOS Titlebar */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900/95 backdrop-blur-md border-b border-slate-800/80 select-none z-20">
            {/* Traffic Light Buttons */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50 inline-block shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50 inline-block shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50 inline-block shadow-sm" />
            </div>

            {/* Window Title & Live Status */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <span className="w-2 h-2 rounded-full bg-mint-400 animate-pulse" />
              <span>MacMint · {activeVideo.title}</span>
              <span className="text-slate-500 hidden sm:inline">
                ({formatTime(currentTime)} / {formatTime(duration || 0)})
              </span>
            </div>

            {/* Top Right Mini Actions */}
            <div className="flex items-center gap-1.5 text-slate-400">
              <button
                onClick={cycleSpeed}
                title="Playback Speed"
                className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                {playbackRate}x
              </button>
              <button
                onClick={toggleFullscreen}
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                className="p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
              >
                {isFullscreen ? (
                  <Minimize className="w-3.5 h-3.5" />
                ) : (
                  <Maximize className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Video Player Canvas */}
          <div
            className={`relative w-full bg-black flex items-center justify-center cursor-pointer group select-none ${
              isFullscreen ? "flex-grow overflow-hidden" : "aspect-[1952/1510] max-h-[640px]"
            }`}
            onClick={togglePlay}
          >
            <video
              ref={videoRef}
              key={activeVideo.videoSrc}
              src={activeVideo.videoSrc}
              poster={activeVideo.poster}
              preload="metadata"
              playsInline
              webkit-playsinline="true"
              muted
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
              className="w-full h-full object-contain"
            />

            {/* Big Central Play Button Overlay (when paused) */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-mint-500/90 hover:bg-mint-500 text-white flex items-center justify-center shadow-2xl shadow-mint-500/40 transform group-hover:scale-110 transition-all duration-200">
                  <Play className="w-9 h-9 sm:w-11 sm:h-11 ml-1 fill-white" />
                </div>
              </div>
            )}

            {/* Bottom Floating Scrubber & Controls Bar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className={`absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-opacity duration-300 z-30 ${
                showControls || !isPlaying || isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              {/* Timeline Progress Bar */}
              <div className="relative group/timeline w-full mb-3 flex items-center">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  step={0.1}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-slate-700/80 hover:h-2 rounded-lg appearance-none cursor-pointer accent-mint-400 transition-all"
                  style={{
                    background: `linear-gradient(to right, #23B99C ${progressPercent}%, rgba(51, 65, 85, 0.8) ${progressPercent}%)`,
                  }}
                />
              </div>

              {/* Control Buttons Row */}
              <div className="flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-3">
                  {/* Play / Pause */}
                  <button
                    onClick={togglePlay}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 fill-white" />
                    ) : (
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                    )}
                  </button>

                  {/* Replay */}
                  <button
                    onClick={handleRestart}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                    title="Replay from start"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  {/* Time Indicator */}
                  <div className="font-mono text-slate-300 text-xs select-none">
                    <span>{formatTime(currentTime)}</span>
                    <span className="text-slate-500 mx-1">/</span>
                    <span className="text-slate-400">{formatTime(duration)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Speed Indicator */}
                  <button
                    onClick={cycleSpeed}
                    className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-[11px] font-semibold tracking-wide transition-colors"
                    title="Cycle speed"
                  >
                    {playbackRate}x
                  </button>

                  {/* Fullscreen Button */}
                  <button
                    onClick={toggleFullscreen}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                    title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                  >
                    {isFullscreen ? (
                      <Minimize className="w-4 h-4" />
                    ) : (
                      <Maximize className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Detail Callout Below the Player */}
        <div className="mt-8 max-w-4xl mx-auto p-6 rounded-2xl bg-white dark:bg-surface-darkCard border border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-colors">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-2 flex-grow">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-mint-600 dark:text-mint-400">
                <span>{activeVideo.badge}</span>
                <span>•</span>
                <span>Runtime: {activeVideo.duration}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {activeVideo.headline}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {activeVideo.description}
              </p>
            </div>

            {/* Bullet Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:w-96 flex-shrink-0">
              {activeVideo.bullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 dark:bg-surface-dark text-xs text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-mint-500 flex-shrink-0 mt-0.5" />
                  <span className="leading-snug">{bullet}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
