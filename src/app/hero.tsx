"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const slides = [
  { label: "TikTok Sellers", image: "/tiktok.png", floatingCard: "Digital Marketing Solution", cardTop: 30, cardSide: "right" as const },
  { label: "Salon Owners", image: "/small-biz.png", floatingCard: "Unifi Air Biz", cardTop: 300, cardSide: "right" as const },
  { label: "Managers", image: "/leader.png", floatingCard: "UNI5G Business Mobile", cardTop: 480, cardSide: "left" as const },
  { label: "Freelancers", image: "/female-founders.png", floatingCard: "Unifi Air Biz", cardTop: 443, cardSide: "right" as const },
  { label: "C-Suites", image: "/medium-large-biz.png", floatingCard: "UNI5G Business Mobile", cardTop: 250, cardSide: "left" as const },
  { label: "Solo Hustlers", image: "/solo.png", floatingCard: "UNI5G Business Mobile", cardTop: 443, cardSide: "right" as const },
  { label: "F&B Operators", image: "/fnb-operators.png", floatingCard: "Unifi Air Biz", cardTop: 160, cardSide: "left" as const },
];

type PromoItem = {
  tag: string;
  title: string;
  description: string;
  image: string;
  imageBg?: string;
  imageFit?: "cover" | "contain";
};

type MarqueeGroup = {
  stat: { title: string; subtitle: string; largeTitle?: boolean };
  imageCard: { label: string; image: string };
  promo: PromoItem;
  promoAlign: "top" | "bottom" | "center";
  stackReversed?: boolean;
};

const marqueeGroups: MarqueeGroup[] = [
  {
    stat: { title: "Best Fixed\nBusiness Service\nProvider", subtitle: "PC.com Readers'\nChoice Awards" },
    imageCard: { label: "For Mid-Size\nBusinesses", image: "/small-biz.png" },
    promo: {
      tag: "Business Protection",
      title: "24/7 protection with Unifi Business Shield",
      description: "Pair with Unifi Business Broadband starting as low as RM199/month.",
      image: "/biz-shield.png",
    },
    promoAlign: "top",
    stackReversed: true,
  },
  {
    stat: { title: "400,000\nMSMEs", subtitle: "Malaysian\nMSMEs served", largeTitle: true },
    imageCard: { label: "For Small\nBusinesses", image: "/self-employed.png" },
    promo: {
      tag: "FIFA",
      title: "Get Full Access to the FIFA World Cup 2026!",
      description: "Don’t miss out on the action and excitement of the world’s biggest football tournament!",
      image: "/fifa-trophy.png",
      imageBg: "#E6E6E6",
      imageFit: "contain",
    },
    promoAlign: "bottom",
  },
  {
    stat: { title: "Best SME\nConnectivity\nProvider", subtitle: "Business Today\nIndustry Choice Awards" },
    imageCard: { label: "For Large\nBusinesses", image: "/medium-large-biz.png" },
    promo: {
      tag: "Broadband",
      title: "Ultra-Fast Internet For Your Business!",
      description: "Subscribe to Unifi Business Ultra and get a FREE TV! Special promo for Biz Fun Pack with 20 premium channels from only RM2.30/day!",
      image: "/promo-ultra.png",
    },
    promoAlign: "center",
  },
];

const DISPLAY_MS = 7000;
const TRANSITION_MS = 600;
// Mobile: dwell on a column for this long, then flick to the next.
const MOBILE_PAGE_MS = 7000;
// Number of repeated marquee sets (must be odd so one sits dead-center).
const COPIES = 5;

type Theme = 1 | 2;

// Theme 1 = dark navy (secondary/blue/extradark). Theme 2 = light (Figma node 2108-15763).
const themeStyles: Record<
  Theme,
  {
    main: string;
    section: string;
    heading: string;
    body: string;
    labelBg: string;
    labelText: string;
  }
> = {
  1: {
    main: "#0D0D1A",
    section: "#06013A",
    heading: "text-white",
    body: "text-content-revert-secondary",
    labelBg: "bg-white",
    labelText: "text-content-default",
  },
  2: {
    main: "#F1F1F1",
    section: "#F1F1F1",
    heading: "text-black",
    body: "text-content-secondary",
    labelBg: "bg-white",
    labelText: "text-content-default",
  },
};

function controlButtonClass(theme: Theme) {
  return theme === 1
    ? "bg-white/80 border-white/30 text-content-default hover:bg-white"
    : "bg-black/80 border-black/30 text-white hover:bg-black";
}

function ControlButton({
  label,
  onClick,
  theme,
}: {
  label: string;
  onClick: () => void;
  theme: Theme;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-colors border ${controlButtonClass(theme)}`}
    >
      {label}
    </button>
  );
}


function ImageCard({
  label,
  image,
  height,
  onHoverStart,
  onHoverEnd,
}: {
  label: string;
  image: string;
  height: string;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}) {
  return (
    <div
      className={`w-80 ${height} relative rounded-[12px] overflow-hidden group/card cursor-pointer`}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <Image
        src={image}
        alt={label}
        fill
        sizes="320px"
        className="object-cover"
        quality={90}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/50 transition-opacity duration-300 group-hover/card:opacity-0" />
      <div className="absolute bottom-6 left-6 w-44 text-white text-xl font-bold leading-7 whitespace-pre-line transition-opacity duration-300 group-hover/card:opacity-0">
        {label}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 flex flex-col justify-center items-center gap-2.5 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
        <div className="w-48 px-5 py-3 rounded-full outline outline-[1.5px] outline-offset-[-1.5px] outline-neutral-ultralight flex justify-center items-center gap-2">
          <span className="text-center text-white text-base font-normal uppercase leading-6" style={{ fontFamily: "'HK Grotesk Wide', sans-serif" }}>
            EXPLORE
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="shrink-0 text-white">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m12 19.5l5-5m-5 5l-5-5m5 5v-10c0-1.667-1-5-5-5"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  subtitle,
  largeTitle,
  theme,
}: {
  title: string;
  subtitle: string;
  largeTitle?: boolean;
  theme: Theme;
}) {
  return (
    <div
      className="w-80 h-80 p-6 rounded-[12px] overflow-hidden flex flex-col justify-between"
      style={{
        background:
          theme === 2
            ? "linear-gradient(53deg, #FF5E00 15%, #FEE6D6 155%)"
            : "linear-gradient(287deg, var(--color-secondary-blue-light) 0%, var(--color-secondary-blue-base) 45%)",
      }}
    >
      <div
        className={`text-white font-bold whitespace-pre-line ${largeTitle ? "text-5xl leading-[57.6px]" : "text-3xl leading-10"}`}
        style={{ fontFamily: "'HK Grotesk Wide', sans-serif" }}
      >
        {title}
      </div>
      <div className="text-white text-xl font-normal leading-7 whitespace-pre-line">
        {subtitle}
      </div>
    </div>
  );
}

function PromoCard({
  promo,
  theme,
  onHoverStart,
  onHoverEnd,
}: {
  promo: PromoItem;
  theme: Theme;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}) {
  const imageBg = theme === 2 ? "#CECECE" : promo.imageBg;
  return (
    <div
      className="w-80 bg-neutral-ultralight rounded-[12px] overflow-hidden flex flex-col shrink-0 snap-start group/promo cursor-pointer"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <div className="w-full h-48 relative overflow-hidden" style={imageBg ? { backgroundColor: imageBg } : undefined}>
        <Image
          src={promo.image}
          alt={promo.title}
          fill
          sizes="320px"
          className={promo.imageFit === "contain" ? "object-contain" : "object-cover"}
        />
      </div>
      <div className="px-6 pt-4 pb-6 bg-white flex flex-col">
        {/* Tag: takes space by default, collapses on hover so the text rises */}
        <div className="grid grid-rows-[1fr] transition-all duration-300 group-hover/promo:grid-rows-[0fr] group-hover/promo:opacity-0">
          <div className="overflow-hidden">
            <div className="pb-5">
              <div className="px-4 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-content-secondary/20 inline-flex">
                <span className="text-content-default text-sm font-medium leading-5">{promo.tag}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-content-default text-2xl font-bold leading-8 line-clamp-3">{promo.title}</h3>
          <p className="text-content-secondary text-base font-normal leading-6 line-clamp-3">{promo.description}</p>
        </div>
        {/* Button: collapsed by default, expands into the freed space on hover */}
        <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-300 group-hover/promo:grid-rows-[1fr] group-hover/promo:opacity-100">
          <div className="overflow-hidden">
            <div className="pt-5">
              <button className="min-w-24 px-4 py-2 rounded-full outline outline-[1.5px] outline-offset-[-1.5px] outline-secondary-blue-base inline-flex justify-center items-center gap-2 cursor-pointer">
                <span className="text-secondary-blue-base text-sm font-bold leading-5">Learn more</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                  <path d="M3.33 8h9.34M8.67 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-secondary-blue-base" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarqueeGroupCard({
  group,
  theme,
  onHoverStart,
  onHoverEnd,
}: {
  group: MarqueeGroup;
  theme: Theme;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}) {
  return (
    <div className={`flex gap-6 shrink-0 ${group.promoAlign === "bottom" ? "items-end" : group.promoAlign === "center" ? "items-center" : "items-start"}`}>
      <div className="flex flex-col gap-6 shrink-0 snap-start">
        {group.stackReversed ? (
          <>
            <ImageCard label={group.imageCard.label} image={group.imageCard.image} height="h-60" onHoverStart={onHoverStart} onHoverEnd={onHoverEnd} />
            <StatCard title={group.stat.title} subtitle={group.stat.subtitle} largeTitle={group.stat.largeTitle} theme={theme} />
          </>
        ) : (
          <>
            <StatCard title={group.stat.title} subtitle={group.stat.subtitle} largeTitle={group.stat.largeTitle} theme={theme} />
            <ImageCard label={group.imageCard.label} image={group.imageCard.image} height="h-60" onHoverStart={onHoverStart} onHoverEnd={onHoverEnd} />
          </>
        )}
      </div>
      <PromoCard promo={group.promo} theme={theme} onHoverStart={onHoverStart} onHoverEnd={onHoverEnd} />
    </div>
  );
}

function MarqueePauseButton({
  paused,
  onToggle,
  theme,
}: {
  paused: boolean;
  onToggle: () => void;
  theme: Theme;
}) {
  const color = theme === 2 ? "#ACACAC" : "rgba(255, 255, 255, 0.6)";
  const circle =
    "M20.0006 3.33398C24.4191 3.3395 28.6551 5.09729 31.7795 8.22168C34.9039 11.3461 36.6617 15.5821 36.6672 20.0007C36.6672 23.297 35.6893 26.5193 33.858 29.2601C32.0267 32.0008 29.4244 34.138 26.3791 35.3994C23.3337 36.6609 19.9816 36.9898 16.7486 36.3467C13.5158 35.7035 10.5458 34.1169 8.21508 31.7861C5.88435 29.4554 4.29768 26.4854 3.65453 23.2526C3.01145 20.0196 3.34035 16.6675 4.6018 13.6221C5.86324 10.5768 8.00045 7.97454 10.7411 6.14323C13.4819 4.31189 16.7042 3.334 20.0006 3.33398Z";
  const pauseBars =
    "M14.5139 13.334C14.201 13.3341 13.9002 13.4578 13.6789 13.679C13.4577 13.9003 13.334 14.2011 13.3339 14.514V26.3206C13.334 26.6335 13.4577 26.9343 13.6789 27.1556C13.9002 27.3769 14.201 27.5005 14.5139 27.5007H17.4664C17.7789 27.5005 18.0785 27.3764 18.2997 27.1556C18.521 26.9343 18.6463 26.6335 18.6464 26.3206V14.514C18.6463 14.2011 18.521 13.9003 18.2997 13.679C18.0785 13.4583 17.7789 13.3342 17.4664 13.334H14.5139ZM22.1881 13.334C21.8751 13.334 21.5745 13.4578 21.3531 13.679C21.1318 13.9003 21.0082 14.2011 21.008 14.514V26.3206C21.0082 26.6335 21.1318 26.9343 21.3531 27.1556C21.5745 27.3768 21.8751 27.5007 22.1881 27.5007H25.1389C25.4518 27.5007 25.7525 27.3767 25.9739 27.1556C26.1951 26.9343 26.3204 26.6335 26.3205 26.3206V14.514C26.3204 14.2011 26.1951 13.9003 25.9739 13.679C25.7525 13.4579 25.4518 13.334 25.1389 13.334H22.1881Z";
  const playTriangle = "M16.5 13L27 20L16.5 27V13Z";
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={paused ? "Play marquee" : "Pause marquee"}
      className="flex justify-center items-center cursor-pointer"
    >
      <div className="size-10 relative overflow-hidden">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d={`${circle} ${paused ? playTriangle : pauseBars}`} fill={color} />
        </svg>
      </div>
    </button>
  );
}

function HeroV3({
  activeIndex,
  nextIndex,
  isTransitioning,
  theme,
}: {
  activeIndex: number;
  nextIndex: number;
  isTransitioning: boolean;
  theme: Theme;
}) {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileActive, setMobileActive] = useState(0);
  const t = themeStyles[theme];

  // Each group is two equal-width columns (stacked cards + promo). Mobile pages
  // one column at a time; desktop pagination tracks the 3 groups continuously.
  const totalCols = marqueeGroups.length * 2;
  const indTrack = theme === 2 ? "rgba(33,36,39,0.1)" : "rgba(255,255,255,0.2)";
  const indFill = theme === 2 ? "#212427" : "#FFFFFF";

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef(0);
  const loopRef = useRef(0);
  const drag = useRef({ active: false, lastX: 0 });
  const recenterTimer = useRef(0);

  const numGroups = marqueeGroups.length;
  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fillRefs = useRef<(HTMLDivElement | null)[]>([]);

  const autoScroll = !isCardHovered && !isPaused;

  // Map any scroll position back into the center copy's window — seamless
  // because every copy is identical.
  const normalize = (x: number) => {
    const loop = loopRef.current;
    const base = baseRef.current;
    if (!loop) return x;
    return base + ((((x - base) % loop) + loop) % loop);
  };

  // Measure one loop (width of a single set of groups) and start in the
  // center copy, leaving a full loop of runway on each side so manual
  // scrolling flows infinitely both ways without ever revealing empty space.
  useEffect(() => {
    const track = trackRef.current;
    const el = scrollRef.current;
    if (!track || !el || track.children.length < COPIES) return;
    const c0 = track.children[0] as HTMLElement;
    const c1 = track.children[1] as HTMLElement;
    loopRef.current = c1.offsetLeft - c0.offsetLeft;
    baseRef.current = (track.children[(COPIES - 1) / 2] as HTMLElement).offsetLeft;
    el.scrollLeft = baseRef.current;
  }, []);

  // While dragging there's no momentum, so recenter instantly (seamless).
  // For native flicks, leave the scroll untouched so inertia carries across
  // the copies, and recenter only once it settles — otherwise touching
  // scrollLeft mid-flick cancels the momentum and it stops dead.
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el || !loopRef.current) return;
    // Mobile: snap the active page to the column nearest the left edge while the
    // user flicks (paused), then recenter once it settles. Auto paging drives
    // mobileActive itself, so don't fight it here.
    if (isMobile) {
      if (!isPaused) return;
      const pitch = loopRef.current / totalCols;
      const rel = ((((el.scrollLeft - baseRef.current) % loopRef.current) + loopRef.current) % loopRef.current);
      setMobileActive(Math.round(rel / pitch) % totalCols);
      window.clearTimeout(recenterTimer.current);
      recenterTimer.current = window.setTimeout(() => {
        const e = scrollRef.current;
        if (e) e.scrollLeft = normalize(e.scrollLeft);
      }, 140);
      return;
    }
    if (drag.current.active) {
      el.scrollLeft = normalize(el.scrollLeft);
      return;
    }
    if (!isPaused) return; // auto-scroll wraps itself in the rAF loop
    window.clearTimeout(recenterTimer.current);
    recenterTimer.current = window.setTimeout(() => {
      const e = scrollRef.current;
      if (e) e.scrollLeft = normalize(e.scrollLeft);
    }, 120);
  };

  // Desktop only: continuous auto-scroll. Manual scrolling takes over when paused.
  useEffect(() => {
    if (isMobile || !autoScroll) return;
    const el = scrollRef.current;
    if (!el) return;
    const SPEED = 52; // px/s — matches the previous 2064px / 40s marquee
    let raf = 0;
    let last = 0;
    const step = (now: number) => {
      if (last) {
        el.scrollLeft += (SPEED * (now - last)) / 1000;
        if (el.scrollLeft >= baseRef.current + loopRef.current) {
          el.scrollLeft -= loopRef.current;
        }
      }
      last = now;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [autoScroll, isMobile]);

  // Entering mobile: start from a clean column boundary.
  useEffect(() => {
    if (!isMobile) return;
    const el = scrollRef.current;
    if (el && loopRef.current) el.scrollLeft = baseRef.current;
    setMobileActive(0);
  }, [isMobile]);

  // Mobile only: dwell on a column for 7s, then flick to the next one. Pausing
  // stops the timer and hands scrolling to the user (native swipe).
  useEffect(() => {
    if (!isMobile || isPaused) return;
    const el = scrollRef.current;
    if (!el) return;
    const id = window.setInterval(() => {
      const loop = loopRef.current;
      if (!el || !loop) return;
      el.scrollTo({ left: el.scrollLeft + loop / totalCols, behavior: "smooth" });
      setMobileActive((a) => (a + 1) % totalCols);
      window.setTimeout(() => {
        if (el.scrollLeft >= baseRef.current + loop - 2) el.scrollLeft -= loop;
      }, 650);
    }, MOBILE_PAGE_MS);
    return () => window.clearInterval(id);
  }, [isMobile, isPaused, totalCols]);

  // Desktop only: drive the pagination indicator from the live scroll position
  // so it stays in sync during both auto-scroll and manual dragging. Imperative
  // DOM writes keep the marquee from re-rendering 60x/s.
  useEffect(() => {
    if (isMobile) return;
    let raf = 0;
    const tick = () => {
      const el = scrollRef.current;
      const loop = loopRef.current;
      if (el && loop) {
        const pitch = loop / numGroups;
        const rel = ((((el.scrollLeft - baseRef.current) % loop) + loop) % loop);
        const p = rel / pitch;
        const active = Math.floor(p) % numGroups;
        const progress = p - Math.floor(p);
        for (let i = 0; i < numGroups; i++) {
          const pill = pillRefs.current[i];
          const fill = fillRefs.current[i];
          if (pill) pill.style.width = i === active ? "64px" : "6px";
          if (fill) fill.style.width = i === active ? `${progress * 100}%` : "0%";
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [numGroups, isMobile]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    // On mobile, paused scrolling is native touch; the pointer-drag is desktop only.
    if (!isPaused || !el || isMobile) return;
    drag.current = { active: true, lastX: e.clientX };
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!drag.current.active || !el) return;
    el.scrollLeft -= e.clientX - drag.current.lastX;
    drag.current.lastX = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    drag.current.active = false;
    if (el?.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
  };

  return (
    <section
      className="w-full md:min-h-[calc(100vh-40px)] rounded-b-[21px] overflow-hidden"
      style={{ backgroundColor: t.section }}
    >
      <div className="w-full h-full max-w-[1280px] mx-auto px-4 pt-6 pb-10 md:px-[140px] md:pt-10 md:pb-20 flex flex-col gap-6 md:gap-10">
        <div className="flex-1 relative flex flex-col">
          <div className="py-0 md:py-10 flex justify-end items-end gap-2.5">
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 md:gap-4">
                  <span className={`${t.heading} text-[26px] leading-[34px] md:text-5xl md:leading-[56px] font-bold`}>
                    Helping
                  </span>
                  <AnimatedLabel
                    activeIndex={activeIndex}
                    nextIndex={nextIndex}
                    isTransitioning={isTransitioning}
                    bgClass={t.labelBg}
                    textClass={t.labelText}
                  />
                </div>
                <h1 className={`${t.heading} text-[26px] leading-[34px] md:text-5xl md:leading-[56px] font-bold`}>
                  stay connected to every opportunity.
                </h1>
              </div>
              <p className={`${t.body} text-base font-normal leading-6`}>
                More than internet, Unifi Business offers everything you need to
                start, run, and grow your company no matter the size.
              </p>
            </div>
            {/* Desktop: pause anchored bottom-right, aligned with the description */}
            <div className="hidden md:block">
              <MarqueePauseButton
                paused={isPaused}
                onToggle={() => setIsPaused((p) => !p)}
                theme={theme}
              />
            </div>
          </div>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className={`relative mt-6 md:mt-auto md:-mx-[402px] overflow-y-hidden no-scrollbar ${
              isPaused ? "overflow-x-auto cursor-grab active:cursor-grabbing" : "overflow-x-hidden"
            } ${isMobile && isPaused ? "snap-x snap-mandatory" : ""}`}
          >
            <div ref={trackRef} className="flex gap-6 w-max">
              {Array.from({ length: COPIES }, (_, copy) => (
                <div key={copy} className="flex gap-6 shrink-0">
                  {marqueeGroups.map((group, i) => (
                    <MarqueeGroupCard
                      key={`${copy}-${i}`}
                      group={group}
                      theme={theme}
                      onHoverStart={() => setIsCardHovered(true)}
                      onHoverEnd={() => setIsCardHovered(false)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Carousel indicator: pagination centered, pause anchored right */}
          <div className="relative mt-4 md:mt-6 flex h-8 items-center justify-center">
            {/* Desktop: one item per group, fill tracks the live scroll position */}
            <div className="hidden md:flex gap-2 items-center">
              {marqueeGroups.map((_, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    pillRefs.current[i] = el;
                  }}
                  className="h-1.5 rounded-full overflow-hidden transition-[width] duration-500 ease-out"
                  style={{ width: i === 0 ? "64px" : "6px", backgroundColor: indTrack }}
                >
                  <div
                    ref={(el) => {
                      fillRefs.current[i] = el;
                    }}
                    className="h-full rounded-full"
                    style={{ width: "0%", backgroundColor: indFill }}
                  />
                </div>
              ))}
            </div>
            {/* Mobile: one item per column; the active fill runs a 7s timer */}
            <div className="flex md:hidden gap-2 items-center">
              {Array.from({ length: totalCols }, (_, i) => {
                const active = i === mobileActive;
                return (
                  <div
                    key={i}
                    className="h-1.5 rounded-full overflow-hidden transition-[width] duration-500 ease-out"
                    style={{ width: active ? "64px" : "6px", backgroundColor: indTrack }}
                  >
                    {active && !isPaused && (
                      <div
                        key={mobileActive}
                        className="h-full rounded-full"
                        style={{
                          width: "0%",
                          backgroundColor: indFill,
                          animation: `pag-fill ${MOBILE_PAGE_MS}ms linear forwards`,
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 md:hidden">
              <MarqueePauseButton
                paused={isPaused}
                onToggle={() => setIsPaused((p) => !p)}
                theme={theme}
              />
            </div>
          </div>

          <div className="mt-8 md:mt-12 flex flex-col items-center justify-center">
            <p className={`${t.body} text-base md:text-lg font-medium leading-6 md:leading-[26px] text-center`}>
              Learn what Unifi Business can do for you.
            </p>
            <div className="mt-5 md:mt-6 flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <button className="w-full md:w-auto md:min-w-24 px-5 py-3 md:px-8 md:py-4 bg-primary-orange-base rounded-full flex items-center justify-center gap-3 cursor-pointer hover:bg-[#e65500] transition-colors">
                <span className="text-white text-base font-bold leading-6 whitespace-nowrap">
                  Get started
                </span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                  <path d="M10 4.17v11.66M4.17 10 10 15.83 15.83 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white" />
                </svg>
              </button>
              <button className={`w-full md:w-auto md:min-w-24 px-5 py-3 md:px-8 md:py-4 rounded-full flex items-center justify-center cursor-pointer transition-colors ${theme === 1 ? "hover:bg-white/10" : "hover:bg-black/10"}`}>
                <span className={`${t.heading} text-base font-bold leading-6 whitespace-nowrap`}>
                  Talk to our experts
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const businessSizes = [
  {
    label: "Micro",
    description: "1-4 Employees",
    icon: (
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M16.4262 53.0851H55.5754V49.6419C42.5257 49.6419 29.4768 49.6419 16.4271 49.6419V53.0851H16.4262ZM15.2006 24.4022H28.1991L29.412 19.2002H19.9104L15.2006 24.4022ZM29.3147 24.4022L30.5276 19.2002H41.474L42.6869 24.4022H29.3147ZM43.8025 24.4022H56.801L52.0921 19.2002H42.5896L43.8025 24.4022ZM57.3239 25.4896H44.1599C44.8857 26.8901 46.1642 27.865 47.6594 28.4143C48.6258 28.7691 49.6825 28.9465 50.7419 28.9465C51.8012 28.9465 52.8588 28.7691 53.8243 28.4143C55.3195 27.865 56.598 26.8893 57.3239 25.4896ZM42.5828 25.4896H29.4188C30.1446 26.8901 31.4232 27.865 32.9183 28.4143C33.8847 28.7691 34.9415 28.9465 36.0008 28.9465C37.061 28.9465 38.1178 28.7691 39.0833 28.4143C40.5784 27.865 41.857 26.8893 42.5828 25.4896ZM27.8417 25.4896H14.6777C15.4036 26.8901 16.6821 27.865 18.1773 28.4143C19.1436 28.7691 20.2004 28.9465 21.2597 28.9465C22.3199 28.9465 23.3767 28.7691 24.3422 28.4143C25.8374 27.865 27.1159 26.8893 27.8417 25.4896ZM20.2158 29.982C20.5621 30.017 20.9109 30.034 21.2597 30.034C22.4419 30.034 23.6266 29.8336 24.7166 29.4336C26.3423 28.8365 27.753 27.7942 28.6307 26.3076C29.5084 27.7951 30.9191 28.8365 32.5448 29.4336C33.6339 29.8336 34.8195 30.034 36.0017 30.034C37.1838 30.034 38.3685 29.8336 39.4586 29.4336C41.0842 28.8365 42.495 27.7942 43.3726 26.3076C44.2503 27.7951 45.661 28.8365 47.2867 29.4336C48.3759 29.8336 49.5614 30.034 50.7436 30.034C51.0924 30.034 51.4404 30.017 51.7876 29.982V48.5535H33.0685V32.5527C33.0685 32.2525 32.8254 32.0085 32.5251 32.0085H22.9997C22.6995 32.0085 22.4555 32.2516 22.4555 32.5527V48.5535H20.2158V29.982ZM36.1833 32.0094C35.8831 32.0094 35.64 32.2525 35.64 32.5536V38.4899C35.64 38.7901 35.8831 39.0341 36.1833 39.0341H48.7085C49.0087 39.0341 49.2518 38.791 49.2518 38.4899V32.5536C49.2518 32.2533 49.0087 32.0094 48.7085 32.0094H36.1833Z" fill="white" fillOpacity="0.8"/>
      </svg>
    ),
  },
  {
    label: "Small",
    description: "5-30 Employees",
    icon: (
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M19.1375 49.5267H15.8218C15.4317 49.5267 15.1152 49.8439 15.1152 50.2357C15.1152 50.6259 15.4325 50.9423 15.8218 50.9423H55.8204C56.2106 50.9423 56.527 50.625 56.527 50.2357C56.527 49.8439 56.2097 49.5267 55.8204 49.5267H50.8795V43.6357C52.3821 43.5371 53.7364 42.9035 54.7436 41.9285C55.8445 40.8625 56.5278 39.3881 56.5278 37.7588C56.5278 36.1295 55.8445 34.6551 54.7436 33.5865C53.6453 32.5255 52.1328 31.8678 50.4662 31.8678C48.7971 31.8678 47.2846 32.5255 46.1863 33.5865C45.0854 34.6551 44.4021 36.1295 44.4021 37.7588C44.4021 39.3881 45.0854 40.8625 46.1863 41.9285C47.0593 42.7734 48.1958 43.3632 49.4639 43.5669V49.5259H25.3027H20.5507H19.1375V49.5267ZM25.2414 48.4888H18.595V31.0146H25.2414V48.4888ZM30.8152 19.8721H26.6057V48.4888H30.5849V41.0232C30.5849 40.633 30.8997 40.3166 31.2915 40.3166H38.2733C38.6635 40.3166 38.9799 40.6339 38.9799 41.0232V48.4888H42.9567V19.8721H39.0785H30.8152ZM31.998 48.4888V41.7297H37.5668V48.4888H31.998ZM40.2182 23.877C40.61 23.877 40.9273 23.5597 40.9273 23.1704C40.9273 22.7803 40.61 22.4639 40.2182 22.4639H38.8283C38.4365 22.4639 38.1193 22.7811 38.1193 23.1704C38.1193 23.5597 38.4365 23.877 38.8283 23.877H40.2182ZM40.2182 28.0327C40.61 28.0327 40.9273 27.7154 40.9273 27.3261C40.9273 26.9343 40.61 26.6171 40.2182 26.6171H38.8283C38.4365 26.6171 38.1193 26.9343 38.1193 27.3261C38.1193 27.7162 38.4365 28.0327 38.8283 28.0327H40.2182ZM40.2182 32.1858C40.61 32.1858 40.9273 31.8711 40.9273 31.4793C40.9273 31.0892 40.61 30.7727 40.2182 30.7727H38.8283C38.4365 30.7727 38.1193 31.09 38.1193 31.4793C38.1193 31.8711 38.4365 32.1858 38.8283 32.1858H40.2182ZM40.2182 36.3415C40.61 36.3415 40.9273 36.0243 40.9273 35.635C40.9273 35.2432 40.61 34.9259 40.2182 34.9259H38.8283C38.4365 34.9259 38.1193 35.2432 38.1193 35.635C38.1193 36.0251 38.4365 36.3415 38.8283 36.3415H40.2182ZM35.4778 23.877C35.8696 23.877 36.1868 23.5597 36.1868 23.1704C36.1868 22.7803 35.8696 22.4639 35.4778 22.4639H34.0854C33.6952 22.4639 33.3788 22.7811 33.3788 23.1704C33.3788 23.5597 33.6961 23.877 34.0854 23.877H35.4778ZM35.4778 28.0327C35.8696 28.0327 36.1868 27.7154 36.1868 27.3261C36.1868 26.9343 35.8696 26.6171 35.4778 26.6171H34.0854C33.6952 26.6171 33.3788 26.9343 33.3788 27.3261C33.3788 27.7162 33.6961 28.0327 34.0854 28.0327H35.4778ZM35.4778 32.1858C35.8696 32.1858 36.1868 31.8711 36.1868 31.4793C36.1868 31.0892 35.8696 30.7727 35.4778 30.7727H34.0854C33.6952 30.7727 33.3788 31.09 33.3788 31.4793C33.3788 31.8711 33.6961 32.1858 34.0854 32.1858H35.4778ZM35.4778 36.3415C35.8696 36.3415 36.1868 36.0243 36.1868 35.635C36.1868 35.2432 35.8696 34.9259 35.4778 34.9259H34.0854C33.6952 34.9259 33.3788 35.2432 33.3788 35.635C33.3788 36.0251 33.6961 36.3415 34.0854 36.3415H35.4778ZM30.7373 23.877C31.1291 23.877 31.4439 23.5597 31.4439 23.1704C31.4439 22.7803 31.1291 22.4639 30.7373 22.4639H29.3449C28.9548 22.4639 28.6384 22.7811 28.6384 23.1704C28.6384 23.5597 28.9556 23.877 29.3449 23.877H30.7373ZM30.7373 28.0327C31.1291 28.0327 31.4439 27.7154 31.4439 27.3261C31.4439 26.9343 31.1291 26.6171 30.7373 26.6171H29.3449C28.9548 26.6171 28.6384 26.9343 28.6384 27.3261C28.6384 27.7162 28.9556 28.0327 29.3449 28.0327H30.7373ZM30.7373 32.1858C31.1291 32.1858 31.4439 31.8711 31.4439 31.4793C31.4439 31.0892 31.1291 30.7727 30.7373 30.7727H29.3449C28.9548 30.7727 28.6384 31.09 28.6384 31.4793C28.6384 31.8711 28.9556 32.1858 29.3449 32.1858H30.7373ZM30.7373 36.3415C31.1291 36.3415 31.4439 36.0243 31.4439 35.635C31.4439 35.2432 31.1291 34.9259 30.7373 34.9259H29.3449C28.9548 34.9259 28.6384 35.2432 28.6384 35.635C28.6384 36.0251 28.9556 36.3415 29.3449 36.3415H30.7373Z" fill="white" fillOpacity="0.8"/>
      </svg>
    ),
  },
  {
    label: "Mid to Large",
    description: "30+ Employees",
    icon: (
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M31.3526 38.704C30.5798 38.704 30.5798 37.5332 31.3526 37.5332H32.5819C33.3547 37.5332 33.3547 38.704 32.5819 38.704H31.3526ZM35.3919 29.2555C34.6191 29.2555 34.6191 28.0847 35.3919 28.0847H36.6212C37.394 28.0847 37.394 29.2555 36.6212 29.2555H35.3919ZM35.3919 32.405C34.6191 32.405 34.6191 31.2342 35.3919 31.2342H36.6212C37.394 31.2342 37.394 32.405 36.6212 32.405H35.3919ZM35.3919 35.5545C34.6191 35.5545 34.6191 34.3837 35.3919 34.3837H36.6212C37.394 34.3837 37.394 35.5545 36.6212 35.5545H35.3919ZM35.3919 38.704C34.6191 38.704 34.6191 37.5332 35.3919 37.5332H36.6212C37.394 37.5332 37.394 38.704 36.6212 38.704H35.3919ZM31.3526 29.2555C30.5798 29.2555 30.5798 28.0847 31.3526 28.0847H32.5819C33.3547 28.0847 33.3547 29.2555 32.5819 29.2555H31.3526ZM31.3526 32.405C30.5798 32.405 30.5798 31.2342 31.3526 31.2342H32.5819C33.3547 31.2342 33.3547 32.405 32.5819 32.405H31.3526ZM39.4195 29.2555C38.6467 29.2555 38.6467 28.0847 39.4195 28.0847H40.6488C41.4215 28.0847 41.4215 29.2555 40.6488 29.2555H39.4195ZM39.4195 32.405C38.6467 32.405 38.6467 31.2342 39.4195 31.2342H40.6488C41.4215 31.2342 41.4215 32.405 40.6488 32.405H39.4195ZM39.4195 35.5545C38.6467 35.5545 38.6467 34.3837 39.4195 34.3837H40.6488C41.4215 34.3837 41.4215 35.5545 40.6488 35.5545H39.4195ZM39.4195 38.704C38.6467 38.704 38.6467 37.5332 39.4195 37.5332H40.6488C41.4215 37.5332 41.4215 38.704 40.6488 38.704H39.4195ZM31.3526 35.5545C30.5798 35.5545 30.5798 34.3837 31.3526 34.3837H32.5819C33.3547 34.3837 33.3547 35.5545 32.5819 35.5545H31.3526ZM36.7851 20.6267C36.7851 19.8539 37.9559 19.8539 37.9559 20.6267V24.3264H39.4077V18.8353L35.989 14.96L32.5702 18.8353V24.3264H34.0454V21.9965C34.0454 21.2238 35.2163 21.2238 35.2163 21.9965V24.3264H36.7851V20.6267ZM13.1699 55.0133V57.1325H58.8315V55.0133H13.1699ZM52.7433 43.1647C50.7178 43.1647 49.6992 45.6234 51.1392 47.0518C52.5676 48.4802 55.0263 47.4616 55.0263 45.4478C55.0263 44.1833 54.0077 43.1647 52.7433 43.1647ZM19.2581 43.1647C17.2326 43.1647 16.2257 45.6234 17.6541 47.0518C19.0825 48.4802 21.5412 47.4616 21.5412 45.4478C21.5295 44.1833 20.5109 43.1647 19.2581 43.1647ZM27.0674 42.2515C24.8546 42.2515 23.7306 44.9444 25.2995 46.5133C26.8684 48.0821 29.5612 46.9699 29.5612 44.7453C29.5612 43.3755 28.449 42.2515 27.0674 42.2515ZM22.6183 48.1758C23.2038 47.8011 23.8594 47.5436 24.5736 47.4382C23.0515 46.0215 23.0047 43.6331 24.4682 42.1578C25.1005 41.5256 25.9434 41.1275 26.8918 41.0807V32.405H19.8318V42.0408C22.5832 42.5091 23.6721 45.9396 21.6466 47.9065C21.9861 47.9651 22.3139 48.0587 22.6183 48.1758ZM20.2767 53.8425V52.4375C20.2767 51.1497 20.7685 49.9788 21.5529 49.0773C21.3305 49.0305 21.108 49.0188 20.8738 49.0188H17.6424C15.6872 49.0188 14.0832 50.6228 14.0832 52.578V53.8425H20.2767ZM44.934 42.2515C42.7211 42.2515 41.5972 44.9444 43.166 46.5133C44.7349 48.0821 47.4278 46.9699 47.4278 44.7453C47.4278 43.3755 46.3155 42.2515 44.934 42.2515ZM50.4485 49.0773C51.2446 49.9671 51.7247 51.1497 51.7247 52.4375V53.8425H57.9299V52.578C57.9299 50.6228 56.3259 49.0188 54.3707 49.0188H51.1392C50.8934 49.0188 50.6709 49.0422 50.4485 49.0773ZM47.4278 47.4382C48.142 47.5436 48.8093 47.8011 49.3947 48.1758C49.6992 48.0587 50.0153 47.9651 50.3431 47.9065C48.3176 45.9396 49.4182 42.5091 52.1696 42.0408V32.405H45.1096V41.0807C48.3293 41.2329 49.8162 45.2254 47.4278 47.4382ZM36.0007 40.8582C33.4835 40.8582 32.219 43.9141 33.9986 45.6937C35.7782 47.4733 38.834 46.2088 38.834 43.6916C38.834 42.1227 37.5696 40.8582 36.0007 40.8582ZM28.5309 53.8425V52.2151C28.5309 50.8687 29.011 49.6393 29.8071 48.6792C29.491 48.5973 29.1515 48.5505 28.8002 48.5505H25.3229C23.192 48.5505 21.4358 50.295 21.4358 52.4375V53.8425H28.5309ZM42.1943 48.6792C42.9904 49.6393 43.4705 50.8687 43.4705 52.2151V53.8425H50.5538V52.4375C50.5538 50.3067 48.8093 48.5505 46.6785 48.5505H43.2012C42.8499 48.5505 42.5104 48.5973 42.1943 48.6792ZM38.6233 46.724C39.5951 46.8411 40.4966 47.2274 41.2459 47.7777C41.6323 47.6138 42.0304 47.4967 42.4401 47.4382C40.3444 45.4829 41.1991 41.9939 43.9271 41.2212V25.4972H28.0743V41.2212C30.8023 41.9939 31.6687 45.4829 29.5612 47.4382C29.971 47.4967 30.3808 47.6138 30.7672 47.7777C31.5165 47.2157 32.418 46.8411 33.3781 46.724C31.6219 45.2019 31.5282 42.5091 33.1673 40.87C34.7362 39.3011 37.2652 39.3011 38.834 40.87C40.4732 42.5091 40.3795 45.2019 38.6233 46.724ZM37.9325 47.848H34.0689C31.6687 47.848 29.7017 49.8149 29.7017 52.2151V53.8425H42.2996V52.2151C42.2996 49.8149 40.3327 47.848 37.9325 47.848ZM22.7823 35.2384C22.0095 35.2384 22.0095 34.0676 22.7823 34.0676H24.0116C24.7843 34.0676 24.7843 35.2384 24.0116 35.2384H22.7823ZM22.7823 37.9429C22.0095 37.9429 22.0095 36.7721 22.7823 36.7721H24.0116C24.7843 36.7721 24.7843 37.9429 24.0116 37.9429H22.7823ZM47.9898 35.2384C47.217 35.2384 47.217 34.0676 47.9898 34.0676H49.2191C49.9919 34.0676 49.9919 35.2384 49.2191 35.2384H47.9898ZM47.9898 37.9429C47.217 37.9429 47.217 36.7721 47.9898 36.7721H49.2191C49.9919 36.7721 49.9919 37.9429 49.2191 37.9429H47.9898ZM47.9898 40.6592C47.217 40.6592 47.217 39.4884 47.9898 39.4884H49.2191C49.9919 39.4884 49.9919 40.6592 49.2191 40.6592H47.9898ZM22.7823 40.6592C22.0095 40.6592 22.0095 39.4884 22.7823 39.4884H24.0116C24.7843 39.4884 24.7843 40.6592 24.0116 40.6592H22.7823Z" fill="white" fillOpacity="0.8"/>
      </svg>
    ),
  },
];

function HeroV4({
  activeIndex,
  nextIndex,
  isTransitioning,
  theme,
  recommenderOn,
}: {
  activeIndex: number;
  nextIndex: number;
  isTransitioning: boolean;
  theme: Theme;
  recommenderOn: boolean;
}) {
  const t = themeStyles[theme];

  return (
    <section className="relative w-full min-h-[calc(100vh-104px)] overflow-hidden rounded-b-3xl">
      <div className="absolute inset-0" style={{ backgroundColor: t.section }}>
        {theme === 1 && (
          <div className="absolute left-0 bottom-0 w-full h-64 bg-gradient-to-t from-black/60 from-25% to-transparent" />
        )}
      </div>

      <div className="relative z-10 w-full h-full max-w-[1280px] mx-auto px-10 pt-10 pb-20 flex gap-24">
        <div className={`flex-1 py-6 flex flex-col gap-10 ${recommenderOn ? "" : "justify-center"}`}>
          <div className="w-full max-w-[996px] min-w-72 flex flex-col gap-8">
            <div className="flex flex-col">
              <div className="flex items-center gap-4">
                <span className={`${t.heading} text-5xl font-bold leading-[56px]`}>
                  Helping
                </span>
                <AnimatedLabel
                  activeIndex={activeIndex}
                  nextIndex={nextIndex}
                  isTransitioning={isTransitioning}
                  bgClass={t.labelBg}
                  textClass={t.labelText}
                />
              </div>
              <h1 className={`${t.heading} text-5xl font-bold leading-[56px]`}>
                stay connected to every opportunity.
              </h1>
            </div>

            <p className={`${t.body} text-base font-normal leading-6`}>
              More than internet, Unifi Business offers everything you need to
              start, run, and grow your company no matter the size. Learn what
              Unifi Business can do for you.
            </p>

            {recommenderOn && (
              <>
                <div className="flex flex-col gap-2">
                  <p className={`${t.heading} text-sm font-normal leading-5`}>
                    Let us help you find what you need by answering 3 questions.
                  </p>
                  <div className="flex items-center gap-3">
                    <div className={`p-1 rounded-full outline outline-[2.5px] outline-offset-[-2.5px] flex items-center justify-center ${theme === 1 ? "outline-white/90" : "outline-black/90"}`}>
                      <span className={`size-6 text-center ${t.heading} text-lg font-semibold leading-6`}>1</span>
                    </div>
                    <span className={`${t.heading} text-xl font-normal leading-7`}>
                      What is the size of your business?
                    </span>
                  </div>
                </div>

                <div className="flex gap-6">
                  {businessSizes.map((size) => (
                    <button
                      key={size.label}
                      className={`w-36 px-1 py-3 rounded-lg flex flex-col items-center gap-2 cursor-pointer transition-colors ${theme === 1 ? "bg-neutral-50/30 hover:bg-neutral-50/40" : "bg-black/5 hover:bg-black/10"}`}
                    >
                      <div
                        className="size-16 rounded-[2.87px] flex items-center justify-center"
                        style={theme === 2 ? { filter: "invert(1)" } : undefined}
                      >
                        {size.icon}
                      </div>
                      <div className="w-full flex flex-col gap-1">
                        <span className={`text-center ${t.heading} text-base font-bold leading-6`}>
                          {size.label}
                        </span>
                        <span className={`text-center ${t.body} text-sm font-normal leading-5`}>
                          {size.description}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="flex gap-3">
            <button className="min-w-24 px-8 py-4 bg-primary-orange-base rounded-full flex items-center justify-center gap-3 cursor-pointer hover:bg-[#e65500] transition-colors">
              <span className="text-white text-base font-bold leading-6 whitespace-nowrap">
                Get started
              </span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <path d="M10 4.17v11.66M4.17 10 10 15.83 15.83 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white" />
              </svg>
            </button>
            <button className={`min-w-24 px-8 py-4 rounded-full flex items-center justify-center cursor-pointer transition-colors ${theme === 1 ? "hover:bg-white/10" : "hover:bg-black/10"}`}>
              <span className={`${t.heading} text-base font-bold leading-6 whitespace-nowrap`}>
                Talk to our experts
              </span>
            </button>
          </div>
        </div>

        <div className="w-[611px] shrink-0 relative -ml-12">
          <div className="w-[611px] h-[542px] rounded-xl overflow-hidden relative">
            {slides.map((slide, i) => (
              <Image
                key={slide.image}
                src={slide.image}
                alt={slide.label}
                fill
                sizes="611px"
                className="object-cover"
                quality={100}
                priority={i === 0}
                style={{
                  transition: `opacity ${TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                  transform: slide.image === "/fnb-operators.png" ? "scale(1.2)" : undefined,
                  opacity:
                    i === activeIndex
                      ? isTransitioning
                        ? 0
                        : 1
                      : isTransitioning && i === nextIndex
                        ? 1
                        : 0,
                }}
              />
            ))}
          </div>

          {slides.map((slide, i) => {
            const isActive = i === activeIndex;
            const isNext = i === nextIndex;
            const isDrift = isActive && !isTransitioning;
            const isExit = isActive && isTransitioning;
            const isEnter = isNext && isTransitioning;
            const visible = isActive || isEnter;

            let transform = "translateY(20px)";
            let opacity = 0;
            let transition = "none";

            if (isDrift) {
              transform = "translateY(-48px)";
              opacity = 1;
              transition = `transform ${DISPLAY_MS}ms linear, opacity 400ms ease`;
            } else if (isExit) {
              transform = "translateY(-96px)";
              opacity = 0;
              transition = `transform ${TRANSITION_MS}ms cubic-bezier(0.4, 0, 1, 1), opacity ${TRANSITION_MS * 0.5}ms cubic-bezier(0.4, 0, 1, 1)`;
            } else if (isEnter) {
              transform = "translateY(0)";
              opacity = 1;
              transition = `transform ${TRANSITION_MS}ms cubic-bezier(0, 0, 0.2, 1), opacity ${TRANSITION_MS}ms cubic-bezier(0, 0, 0.2, 1)`;
            }

            return (
              <div
                key={slide.label}
                className={`absolute h-14 bg-neutral-ultralight rounded-sm shadow-[0px_4px_20px_0px_rgba(33,36,39,0.30)] flex items-center gap-4 px-4 whitespace-nowrap ${!visible ? "float-card-hidden" : ""}`}
                style={{ top: slide.cardTop, transform, opacity, transition, ...(slide.cardSide === "right" ? { right: -35 } : { left: -35 }) }}
              >
                <div className="size-10 p-2 bg-primary-orange-ultralight rounded-full flex items-center justify-center shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="5" y="1" width="14" height="22" rx="2" stroke="#FF5E00" strokeWidth="2" />
                    <line x1="9" y1="19" x2="15" y2="19" stroke="#FF5E00" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-content-default text-base font-medium leading-6">
                  {slide.floatingCard}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---- Desktop mega-menu (Figma node 40-1592) ----

const NAV_ITEMS = [
  "Connectivity",
  "Solutions",
  "Devices",
  "Promotion",
  "IMPAK BIZ",
  "Unifi Exclusive",
  "Support",
] as const;

function CardArrow() {
  return (
    <span className="shrink-0 size-8 -translate-x-3 opacity-0 transition-all duration-300 group-hover/navcard:translate-x-0 group-hover/navcard:opacity-100">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M7 17 17 7M9 7h8v8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function NavImageCard({
  image,
  title,
  subtitle,
  className = "",
  sizes = "424px",
  titleClassName = "truncate",
  subtitleClassName = "truncate",
}: {
  image: string;
  title: string;
  subtitle?: string;
  className?: string;
  sizes?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}) {
  return (
    <a
      href="#"
      className={`group/navcard relative block rounded-3xl overflow-hidden bg-secondary-blue-extradark ${className}`}
    >
      <Image src={image} alt={title} fill sizes={sizes} className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/90" />
      <div className="absolute inset-0 p-5 flex items-end">
        <div className="flex-1 flex items-center gap-5 min-w-0">
          <div className="flex-1 flex flex-col gap-1 min-w-0">
            <p className={`text-white text-lg font-bold leading-[26px] ${titleClassName}`}>{title}</p>
            {subtitle && <p className={`text-white/80 text-base font-normal leading-6 ${subtitleClassName}`}>{subtitle}</p>}
          </div>
          <CardArrow />
        </div>
      </div>
    </a>
  );
}

function MenuHeading({ children }: { children: string }) {
  return (
    <p className="text-[#2f2e2e] text-xs font-normal uppercase leading-[18px]">{children}</p>
  );
}

// --- Solutions: three columns of text links ---

type MenuLinkItem = { title: string; subtitle?: string };
type MenuCategory = { heading: string; items: MenuLinkItem[] };

const solutionsColumns: MenuCategory[][] = [
  [
    { heading: "Productivity", items: [{ title: "Go Bookit", subtitle: "Customer booking system" }, { title: "Cloud Storage" }] },
    { heading: "Entertainment", items: [{ title: "Unifi Business TV" }, { title: "Unifi Hospitality TV" }] },
  ],
  [
    { heading: "Cybersecurity", items: [{ title: "NetShield", subtitle: "Network-level security solution" }, { title: "Kaspersky Small Office Security" }] },
    { heading: "Healthcare", items: [{ title: "e-Pharmacy" }] },
  ],
  [
    { heading: "Sales & Marketing", items: [{ title: "eCommerce Hub", subtitle: "Set up your business online" }, { title: "CariCari" }, { title: "Digital Marketing Solution", subtitle: "Promote your business" }] },
  ],
];

const connectivityColumns: MenuCategory[][] = [
  [
    { heading: "Internet", items: [{ title: "Unifi Business Broadband" }, { title: "Unifi Air Biz" }, { title: "SMART Internet", subtitle: "Secure and manage internet access" }, { title: "Fibre-To-The-Room" }] },
  ],
  [
    { heading: "Mobile", items: [{ title: "UNI5G Business Mobile" }] },
  ],
  [
    { heading: "Voice", items: [{ title: "Business Voice / Phone Line" }, { title: "IP Centrex", subtitle: "Cloud-based business phone" }, { title: "Multi-line SIP", subtitle: "For high volume business calls" }] },
  ],
];

function MenuTextLink({ title, subtitle }: MenuLinkItem) {
  return (
    <a href="#" className="group/link flex flex-col gap-0.5">
      <span className="text-content-default text-base font-medium leading-6 transition-colors group-hover/link:text-primary-orange-base">{title}</span>
      {subtitle && <span className="text-content-secondary text-sm font-normal leading-5">{subtitle}</span>}
    </a>
  );
}

function TextColumnsMenu({ columns }: { columns: MenuCategory[][] }) {
  return (
    <div className="grid grid-cols-3 gap-8">
      {columns.map((column, i) => (
        <div key={i} className="flex flex-col gap-8">
          {column.map((cat) => (
            <div key={cat.heading} className="flex flex-col gap-4">
              <MenuHeading>{cat.heading}</MenuHeading>
              <div className="flex flex-col gap-4">
                {cat.items.map((item) => (
                  <MenuTextLink key={item.title} {...item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function ConnectivityMenu() {
  return <TextColumnsMenu columns={connectivityColumns} />;
}

function SolutionsMenu() {
  return <TextColumnsMenu columns={solutionsColumns} />;
}

// --- Devices: card grid + limited-time cross-sell ---

const deviceCards = [
  { image: "/nav/dev-smartzone.png", title: "Smart Zone", subtitle: "xxx" },
  { image: "/nav/dev-ipad.png", title: "iPad for Business", subtitle: "xxx" },
  { image: "/nav/dev-gobookit.png", title: "Go Bookit", subtitle: "xxx" },
  { image: "/nav/dev-fmc.png", title: "Fixed Mobile Convergence", subtitle: "xxx" },
  { image: "/nav/dev-ultra.png", title: "Unifi Business Ultra", subtitle: "xxx" },
];

function DevicesMenu() {
  return (
    <div className="flex gap-10 items-start">
      <div className="flex-1 grid grid-cols-3 gap-5">
        {deviceCards.map((card) => (
          <NavImageCard key={card.title} {...card} className="h-[188px]" sizes="280px" />
        ))}
      </div>
      <div className="self-stretch w-px bg-[#d2d2dd]" />
      <div className="w-[252px] shrink-0 flex flex-col gap-4">
        <MenuHeading>Limited Time Only</MenuHeading>
        <a href="#" className="block rounded-3xl overflow-hidden bg-white border border-[#d2d2dd]">
          <div className="relative h-[189px] w-full">
            <Image src="/nav/dev-5g.png" alt="Premium 5G Smartphones" fill sizes="252px" className="object-cover" />
          </div>
          <div className="p-4 flex flex-col gap-2">
            <p className="text-content-default text-base font-bold leading-6">Premium 5G Smartphones with Easy Installments</p>
            <p className="text-content-default text-sm font-normal leading-5">No credit card, 0% interest and Unlimited Data.</p>
          </div>
        </a>
      </div>
    </div>
  );
}

// --- Unifi Exclusive: two wide cards ---

function ExclusiveMenu() {
  return (
    <div className="flex gap-5">
      <NavImageCard
        className="w-[424px] h-[188px]"
        image="/nav/exc-partnership.png"
        title="Unifi Business Partnership: Success Stories"
        subtitle="Discover how our digital solutions are designed to elevate Malaysian businesses."
        titleClassName="line-clamp-2"
        subtitleClassName="line-clamp-2"
      />
      <NavImageCard
        className="w-[424px] h-[188px]"
        image="/nav/exc-club.png"
        title="Unifi Business Club"
        subtitle="Join a like-minded community, share stories and seek advice from successful mSMEs!"
        titleClassName="line-clamp-2"
        subtitleClassName="line-clamp-2"
      />
    </div>
  );
}

// --- Support: coverage card + help centre + explore / call ---

const helpCentreColumns = [
  ["Elite Crew", "Easy Fix", "Easy e-Invoice"],
  ["Find TM Point", "Contact Us", "FAQs"],
];

function BillIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path d="M6 3h8l5 5v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" stroke="#1800E7" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M14 3v5h5" stroke="#1800E7" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M13.4 12.1c-.36-.43-.92-.6-1.5-.6-.78 0-1.4.45-1.4 1.05 0 1.5 3 .7 3 2.25 0 .65-.6 1.1-1.45 1.1-.66 0-1.26-.27-1.6-.75M12 10.5v6" stroke="#FF5E00" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path d="M5 4h2.7l1.4 3.6-2 1.4a11 11 0 0 0 4.9 4.9l1.4-2 3.6 1.4V18a2 2 0 0 1-2 2A13 13 0 0 1 3 7a2 2 0 0 1 2-3Z" stroke="#1800E7" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="17.5" cy="6" r="2.5" fill="#FF5E00" />
    </svg>
  );
}

function CallCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 py-3 rounded-2xl bg-primary-orange-ultralight/30 border border-primary-orange-ultralight flex flex-col gap-1">
      <span className="text-content-secondary text-xs font-normal uppercase leading-[18px]">{label}</span>
      <span className="text-content-default text-lg font-bold leading-[26px]">{value}</span>
    </div>
  );
}

function SupportMenu() {
  return (
    <div className="flex gap-10 items-stretch">
      <NavImageCard
        className="w-[360px] self-stretch min-h-[200px]"
        image="/nav/sup-coverage.png"
        title="Coverage Availability"
        subtitle="Check My Coverage"
        sizes="360px"
      />
      <div className="flex-1 flex flex-col gap-4">
        <MenuHeading>Help Centre</MenuHeading>
        <div className="flex gap-16">
          {helpCentreColumns.map((col, i) => (
            <div key={i} className="flex flex-col gap-5">
              {col.map((label) => (
                <a key={label} href="#" className="text-content-default text-base font-medium leading-6 transition-colors hover:text-primary-orange-base">
                  {label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="self-stretch w-px bg-[#d2d2dd]" />
      <div className="w-[252px] shrink-0 flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <MenuHeading>Explore More</MenuHeading>
          <a href="#" className="group/exp flex items-center gap-3">
            <BillIcon />
            <span className="text-content-default text-base font-medium leading-6 transition-colors group-hover/exp:text-primary-orange-base">Bill Payment</span>
          </a>
          <a href="#" className="group/exp flex items-center gap-3">
            <ChatIcon />
            <span className="text-content-default text-base font-medium leading-6 transition-colors group-hover/exp:text-primary-orange-base">Live Chat</span>
          </a>
        </div>
        <div className="flex flex-col gap-3">
          <MenuHeading>Need Urgent Help? Call Us</MenuHeading>
          <CallCard label="Local" value="Dial 100" />
          <CallCard label="International" value="Dial +603 2106 3001" />
        </div>
      </div>
    </div>
  );
}

const MENU_PANELS: Record<string, React.ReactNode> = {
  Connectivity: <ConnectivityMenu />,
  Solutions: <SolutionsMenu />,
  Devices: <DevicesMenu />,
  "Unifi Exclusive": <ExclusiveMenu />,
  Support: <SupportMenu />,
};

function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className="w-full relative z-40 flex flex-col"
      onMouseLeave={() => setActive(null)}
    >
      <div className="w-full h-10 bg-[#2B2B2B]">
       <div className="max-w-[1280px] mx-auto h-full px-4 md:px-10 flex items-center gap-5">
        <div className="self-stretch hidden md:flex items-end">
          <button className="px-4 py-2 rounded-tl-lg rounded-tr-lg flex items-center">
            <span className="text-white/70 text-xs font-medium">Personal</span>
          </button>
          <button className="px-4 py-2 bg-white rounded-tl-lg rounded-tr-lg flex items-center">
            <span className="text-[#1a1a1a] text-xs font-medium">Business</span>
          </button>
        </div>
        <div className="h-4 w-px bg-white/20 hidden md:block" />
        <div className="flex-1 flex items-center gap-3">
          <div className="flex flex-col gap-[2px]">
            <div className="w-1 h-1 bg-white rounded-full" />
            <div className="w-1 h-1 bg-white/20 rounded-full" />
            <div className="w-1 h-1 bg-white/20 rounded-full" />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-white/50 text-xs">Announcement:</span>
            <span className="text-white text-xs">We are upgrading to serve you better!</span>
          </div>
        </div>
       </div>
      </div>
      <div className="w-full bg-white shadow-[0px_4px_20px_0px_rgba(24,0,146,0.08)]">
       <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-3 flex items-center gap-5">
        <div className="flex-1 flex items-center gap-8">
          <svg width="81" height="36" viewBox="0 0 81 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            <g clipPath="url(#clip0_1_7389)">
              <path d="M14.5581 10.7902C14.5581 12.5123 13.1572 13.8854 11.4496 13.8854C9.74207 13.8854 8.34094 12.4905 8.34094 10.7902C8.34094 9.06814 9.74207 7.69479 11.4496 7.69479C13.1572 7.69479 14.5581 9.06814 14.5581 10.7902Z" fill="#FF5E00" />
              <path d="M6.21738 10.7902C6.21738 12.5123 4.81626 13.8854 3.10869 13.8854C1.37923 13.8854 0 12.4905 0 10.7902C0 9.06814 1.40112 7.69479 3.10869 7.69479C4.83815 7.69479 6.21738 9.06814 6.21738 10.7902Z" fill="#FF5E00" />
              <path d="M0.262749 17.0028C0.262749 20.8611 3.41531 24 7.29017 24C11.165 24 14.3174 20.8611 14.3174 17.0028V15.9999H0.262749V17.0028Z" fill="#FF5E00" />
              <path d="M81 8.02179H76.5342V23.7384H81V8.02179Z" fill="#1800E7" />
              <path d="M32.5753 15.9999C32.5753 17.9618 30.999 19.5312 29.0288 19.553C27.0585 19.553 25.4823 17.9837 25.4604 16.0219C25.4604 16.0219 25.4604 16.0217 25.4604 15.9999V8.02179H20.9944V15.9999C20.9944 20.4032 24.5846 23.9783 29.0068 23.9783C33.4289 23.9783 37.0193 20.4032 37.0193 15.9999V8.02179H32.5533L32.5753 15.9999Z" fill="#1800E7" />
              <path d="M62.8736 8.02179H58.4077V23.7384H62.8736V8.02179Z" fill="#1800E7" />
              <path d="M47.4836 7.76016C43.0614 7.76016 39.4713 11.335 39.4713 15.7383V23.7167H43.9371V15.7383C43.9371 13.7764 45.5133 12.207 47.4836 12.1852C49.4539 12.1852 51.03 13.7547 51.0519 15.7166C51.0519 15.7166 51.0519 15.7165 51.0519 15.7383V23.7167H55.518V15.7383C55.4961 11.335 51.9058 7.76016 47.4836 7.76016Z" fill="#1800E7" />
              <path d="M25.7177 33.4739V33.1375C25.7177 32.8925 25.6346 32.7016 25.4644 32.5604C25.2941 32.4192 25.0451 32.3487 24.7211 32.3487H22.8982V34.2669H24.7211C25.0366 34.2669 25.2858 34.2005 25.456 34.0676C25.6305 33.9307 25.7177 33.7355 25.7177 33.4739ZM25.5226 30.364V30.1231C25.5226 29.8988 25.4436 29.7245 25.2901 29.5998C25.1363 29.4711 24.9121 29.4089 24.6214 29.4089H22.8982V31.132H24.6214C24.9121 31.132 25.1363 31.0656 25.2901 30.9328C25.4436 30.7999 25.5226 30.609 25.5226 30.364ZM21.0339 28.0969H25.1239C25.8505 28.0969 26.4195 28.2504 26.818 28.5535C27.2208 28.8568 27.4201 29.3134 27.4201 29.9196C27.4201 30.2892 27.3287 30.6297 27.1501 30.9452C26.9675 31.2566 26.6478 31.4891 26.1826 31.6303C26.6892 31.7715 27.0546 31.9915 27.2748 32.2947C27.4948 32.5978 27.6069 32.9632 27.6069 33.3867C27.6069 34.0884 27.4075 34.6283 27.013 35.0102C26.6185 35.388 26.025 35.5791 25.2318 35.5791H21.0339V28.0969Z" fill="#1800E7" />
              <path d="M29.2178 32.6728V28.0971H31.1154V32.6521C31.1154 33.2791 31.2482 33.7024 31.5056 33.9143C31.7672 34.1302 32.1575 34.234 32.6766 34.234C33.1997 34.234 33.5899 34.1302 33.8558 33.9143C34.1174 33.7024 34.2503 33.2791 34.2503 32.6521V28.0971H35.9651V32.6728C35.9651 33.7524 35.6951 34.5289 35.1554 35.0106C34.6155 35.4922 33.7894 35.7329 32.6766 35.7329C31.5556 35.7329 30.7002 35.4922 30.1063 35.0106C29.5168 34.5289 29.2178 33.7524 29.2178 32.6728Z" fill="#1800E7" />
              <path d="M37.5264 33.2913H39.4573C39.4945 33.6941 39.6399 33.9598 39.8973 34.0886C40.1546 34.2131 40.5201 34.2795 40.9976 34.2795C41.4752 34.2795 41.8406 34.2174 42.098 34.0927C42.3553 33.9724 42.4841 33.7398 42.4841 33.3992C42.4841 32.9964 42.2308 32.7557 41.7242 32.685C41.2176 32.6103 40.6655 32.5314 40.0632 32.4443C39.4654 32.3571 38.9133 32.1743 38.4065 31.8962C37.9001 31.618 37.6468 31.074 37.6468 30.2645C37.6468 29.4506 37.9332 28.8568 38.5103 28.4914C39.0835 28.126 39.8766 27.9434 40.8897 27.9434C41.8944 27.9434 42.6875 28.126 43.2731 28.4831C43.8585 28.8402 44.1656 29.4256 44.1947 30.2436H42.2639C42.2351 29.8989 42.098 29.6706 41.853 29.5627C41.608 29.4506 41.2842 29.3965 40.8897 29.3965C40.4329 29.3965 40.084 29.4546 39.8473 29.571C39.6107 29.6872 39.4904 29.9115 39.4904 30.2436C39.4904 30.6257 39.7435 30.8581 40.2501 30.9328C40.7567 31.0076 41.309 31.0906 41.9068 31.182C42.5089 31.2733 43.0612 31.452 43.5678 31.726C44.0744 31.996 44.3277 32.5148 44.3277 33.2789C44.3277 34.1633 44.0413 34.7902 43.4681 35.1682C42.8993 35.542 42.073 35.7329 40.9976 35.7329C39.8973 35.7329 39.0584 35.546 38.4772 35.1723C37.8959 34.7985 37.5763 34.1715 37.5264 33.2913Z" fill="#1800E7" />
              <path d="M45.9636 28.0969H47.8612V35.5791H45.9636V28.0969Z" fill="#1800E7" />
              <path d="M54.3554 35.5791L51.6108 30.2768V35.5791H49.8545V28.0969H52.4578L55.1901 33.3867V28.0969H56.9463V35.5791H54.3554Z" fill="#1800E7" />
              <path d="M58.9517 28.0969H64.7522V29.6248H60.8493V31.0034H63.8844V32.4773H60.8493V34.051H64.7979V35.5791H58.9517V28.0969Z" fill="#1800E7" />
              <path d="M66.1309 33.2913H68.0618C68.099 33.6941 68.2444 33.9598 68.5018 34.0886C68.7591 34.2131 69.1246 34.2795 69.6021 34.2795C70.0797 34.2795 70.4451 34.2174 70.7025 34.0927C70.9598 33.9724 71.0886 33.7398 71.0886 33.3992C71.0886 32.9964 70.8353 32.7557 70.3287 32.685C69.8221 32.6103 69.27 32.5314 68.6677 32.4443C68.0699 32.3571 67.5178 32.1743 67.011 31.8962C66.5046 31.618 66.2511 31.074 66.2511 30.2645C66.2511 29.4506 66.5377 28.8568 67.1148 28.4914C67.688 28.126 68.481 27.9434 69.4942 27.9434C70.4989 27.9434 71.292 28.126 71.8775 28.4831C72.463 28.8402 72.7701 29.4256 72.7993 30.2436H70.8684C70.8396 29.8989 70.7025 29.6706 70.4575 29.5627C70.2125 29.4506 69.8887 29.3965 69.4942 29.3965C69.0374 29.3965 68.6886 29.4546 68.4518 29.571C68.2152 29.6872 68.0949 29.9115 68.0949 30.2436C68.0949 30.6257 68.348 30.8581 68.8546 30.9328C69.3612 31.0076 69.9135 31.0906 70.5113 31.182C71.1134 31.2733 71.6657 31.452 72.1723 31.726C72.6789 31.996 72.9322 32.5148 72.9322 33.2789C72.9322 34.1633 72.6456 34.7902 72.0726 35.1682C71.5038 35.542 70.6775 35.7329 69.6021 35.7329C68.5018 35.7329 67.6629 35.546 67.0817 35.1723C66.5004 34.7985 66.1808 34.1715 66.1309 33.2913Z" fill="#1800E7" />
              <path d="M74.1987 33.2913H76.1296C76.1668 33.6941 76.3123 33.9598 76.5696 34.0886C76.827 34.2131 77.1924 34.2795 77.67 34.2795C78.1475 34.2795 78.513 34.2174 78.7703 34.0927C79.0277 33.9724 79.1565 33.7398 79.1565 33.3992C79.1565 32.9964 78.9032 32.7557 78.3966 32.685C77.89 32.6103 77.3379 32.5314 76.7356 32.4443C76.1378 32.3571 75.5857 32.1743 75.0789 31.8962C74.5725 31.618 74.319 31.074 74.319 30.2645C74.319 29.4506 74.6056 28.8568 75.1827 28.4914C75.7559 28.126 76.5489 27.9434 77.5621 27.9434C78.5668 27.9434 79.3598 28.126 79.9454 28.4831C80.5308 28.8402 80.838 29.4256 80.8672 30.2436H78.9363C78.9074 29.8989 78.7703 29.6706 78.5254 29.5627C78.2804 29.4506 77.9566 29.3965 77.5621 29.3965C77.1053 29.3965 76.7565 29.4546 76.5197 29.571C76.283 29.6872 76.1628 29.9115 76.1628 30.2436C76.1628 30.6257 76.4159 30.8581 76.9225 30.9328C77.4291 31.0076 77.9814 31.0906 78.5792 31.182C79.1813 31.2733 79.7336 31.452 80.2402 31.726C80.7468 31.996 81.0001 32.5148 81.0001 33.2789C81.0001 34.1633 80.7135 34.7902 80.1404 35.1682C79.5717 35.542 78.7454 35.7329 77.67 35.7329C76.5696 35.7329 75.7307 35.546 75.1496 35.1723C74.5682 34.7985 74.2487 34.1715 74.1987 33.2913Z" fill="#1800E7" />
              <path d="M70.3606 7.99987C70.3606 6.03801 71.9588 4.4687 73.9072 4.4687V0.0217285C69.485 0.0217285 65.8946 3.59659 65.8946 7.99987V23.7384H70.3606V12.4686H73.9072V8.0218L70.3606 7.99987Z" fill="#1800E7" />
            </g>
            <defs>
              <clipPath id="clip0_1_7389">
                <rect width="81.0001" height="36" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <nav className="flex-1 hidden md:flex items-center">
            {NAV_ITEMS.map((item) => {
              const hasPanel = item in MENU_PANELS;
              const isActive = active === item && hasPanel;
              return (
                <button
                  key={item}
                  type="button"
                  onMouseEnter={() => setActive(hasPanel ? item : null)}
                  className={`grid place-items-center px-4 py-2 rounded-full text-base leading-6 whitespace-nowrap border transition-colors cursor-pointer ${
                    isActive
                      ? "border-primary-orange-base text-primary-orange-base"
                      : "border-transparent text-[#1a1a1a] hover:text-primary-orange-base"
                  }`}
                >
                  {/* invisible medium-weight copy reserves the active width so the bar doesn't shift on hover */}
                  <span aria-hidden className="col-start-1 row-start-1 font-medium invisible">{item}</span>
                  <span className={`col-start-1 row-start-1 ${isActive ? "font-medium" : "font-normal"}`}>{item}</span>
                </button>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-3 md:gap-6">
          <div className="hidden md:flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="8.5" stroke="#1a1a1a" strokeWidth="1.5" />
              <ellipse cx="10" cy="10" rx="3.5" ry="8.5" stroke="#1a1a1a" strokeWidth="1.5" />
              <path d="M2 10h16M3 6h14M3 14h14" stroke="#1a1a1a" strokeWidth="1.5" />
            </svg>
            <span className="text-[#1a1a1a] text-base font-normal leading-6">EN</span>
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="8" r="4" stroke="#1a1a1a" strokeWidth="1.5" />
            <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10.5" cy="10.5" r="6" stroke="#1a1a1a" strokeWidth="1.5" />
            <path d="M15 15l5 5" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {/* Hamburger — mobile only */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:hidden">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
       </div>
      </div>

      {/* Desktop mega-menu — expands on L1 hover */}
      {active && MENU_PANELS[active] && (
        <div className="hidden md:block absolute left-0 right-0 top-full z-30">
          <div className="w-full bg-white shadow-[0px_16px_24px_0px_rgba(24,0,146,0.10)]">
            <div className="max-w-[1280px] mx-auto px-10 py-10">
              {MENU_PANELS[active]}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AnimatedLabel({
  activeIndex,
  nextIndex,
  isTransitioning,
  bgClass,
  textClass,
}: {
  activeIndex: number;
  nextIndex: number;
  isTransitioning: boolean;
  bgClass: string;
  textClass: string;
}) {
  return (
    <span
      className={`py-0.5 ${bgClass} rounded-sm overflow-hidden inline-flex items-center`}
    >
      <span className="relative h-[34px] md:h-[56px] overflow-hidden flex items-center">
        <span
          className="text-[26px] leading-[34px] md:text-5xl md:leading-[56px] font-bold whitespace-nowrap px-2 md:px-3 invisible"
          aria-hidden="true"
          style={{
            transition: `width ${TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          }}
        >
          {slides[isTransitioning ? nextIndex : activeIndex].label}
        </span>
        {slides.map((slide, i) => (
          <span
            key={slide.label}
            className={`${textClass} text-[26px] leading-[34px] md:text-5xl md:leading-[56px] font-bold whitespace-nowrap px-2 md:px-3 absolute left-0 top-0`}
            style={{
              transition: `transform ${TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
              transform:
                i === activeIndex
                  ? isTransitioning
                    ? "translateY(-100%)"
                    : "translateY(0)"
                  : isTransitioning && i === nextIndex
                    ? "translateY(0)"
                    : "translateY(100%)",
              opacity:
                i === activeIndex
                  ? isTransitioning
                    ? 0
                    : 1
                  : isTransitioning && i === nextIndex
                    ? 1
                    : 0,
            }}
          >
            {slide.label}
          </span>
        ))}
      </span>
    </span>
  );
}

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [version, setVersion] = useState<3 | 4>(4);
  const [theme, setTheme] = useState<Theme>(1);
  const [recommenderOn, setRecommenderOn] = useState(true);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(true);
    }, DISPLAY_MS);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  useEffect(() => {
    if (!isTransitioning) return;
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
      setIsTransitioning(false);
    }, TRANSITION_MS);
    return () => clearTimeout(timer);
  }, [isTransitioning]);

  const nextIndex = (activeIndex + 1) % slides.length;

  return (
    <main
      className="relative w-full min-h-screen"
      style={{ backgroundColor: themeStyles[theme].main }}
    >
      <div className="fixed top-4 right-4 z-50 flex items-start gap-2">
        <div className="flex flex-col items-end gap-2">
          <ControlButton
            theme={theme}
            label={showExplanation ? "Hide explanation" : "Turn on explanation"}
            onClick={() => setShowExplanation((v) => !v)}
          />
          {showExplanation && (
            <div className="w-[480px] p-5 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white text-sm leading-relaxed">
              {version === 3 ? (
                <>The scrolling marquee cards can be grouped into sets of 3: two stacked vertically and one placed beside them. Each group surfaces a relevant promotion tied to its audience — for example, a &ldquo;For the self-employed&rdquo; stat card paired with a campaign card next to it. This way, every card group tells a focused story: who it&rsquo;s for, a key stat, and a related promotion.</>
              ) : (
                <>The left side features a guided recommender that helps visitors find the right solution through a simple questionnaire. The right side showcases hero imagery that rotates in sync with the animated headline — each persona (TikTok Sellers, Managers, Freelancers, etc.) is paired with a relevant product and visual, creating a cohesive story between the text, image, and floating product label.</>
              )}
            </div>
          )}
        </div>
        {version === 4 && (
          <ControlButton
            theme={theme}
            label={`Recommender: ${recommenderOn ? "On" : "Off"}`}
            onClick={() => setRecommenderOn((r) => !r)}
          />
        )}
        <ControlButton
          theme={theme}
          label={`Theme ${theme}`}
          onClick={() => setTheme((t) => (t === 1 ? 2 : 1))}
        />
        <ControlButton
          theme={theme}
          label={`V${version === 3 ? 1 : 2}`}
          onClick={() => setVersion((v) => (v === 3 ? 4 : 3))}
        />
      </div>
      <Navbar />

      {version === 3 ? (
        <HeroV3
          activeIndex={activeIndex}
          nextIndex={nextIndex}
          isTransitioning={isTransitioning}
          theme={theme}
        />
      ) : (
        <HeroV4
          activeIndex={activeIndex}
          nextIndex={nextIndex}
          isTransitioning={isTransitioning}
          theme={theme}
          recommenderOn={recommenderOn}
        />
      )}
    </main>
  );
}
