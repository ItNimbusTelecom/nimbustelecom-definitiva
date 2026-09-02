"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { useI18n } from "@/lib/i18n";

const VIDEO_URL = "https://youtu.be/pSWT-rQv4Ws";
const IS_VERTICAL_VIDEO = true;

export function VideoSection() {
  const { dictionary } = useI18n();
  const [placeholderMessage, setPlaceholderMessage] = useState("");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoType = getVideoType(VIDEO_URL);
  const isVerticalVideo = IS_VERTICAL_VIDEO || isYoutubeShort(VIDEO_URL);
  const youtubeVideoId = getYoutubeVideoId(VIDEO_URL);
  const thumbnailUrl = youtubeVideoId ? `https://i.ytimg.com/vi/${youtubeVideoId}/hqdefault.jpg` : "";

  function handlePlaceholderClick() {
    trackEvent("video_play_clicked", { status: "placeholder" });
    setPlaceholderMessage(dictionary.video.message);
  }

  function handleAvailableClick() {
    trackEvent("video_play_clicked", { status: "available" });
    setIsVideoPlaying(true);
  }

  return (
    <section id="video" className="scroll-mt-24 bg-nimbus-soft py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">{dictionary.video.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
            {dictionary.video.title}
          </h2>
          <p className="mt-4 text-lg font-bold leading-8 text-nimbus-ink">{dictionary.video.subtitle}</p>
          <div className="mt-5 space-y-4 text-lg leading-8 text-nimbus-muted">
            {dictionary.video.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#formulari"
              className="rounded-full bg-nimbus-orange px-5 py-3 text-center text-sm font-black text-white transition hover:bg-nimbus-orangeDark"
            >
              {dictionary.video.studyCta}
            </a>
            <a
              href="#tarifes"
              className="rounded-full border border-nimbus-line bg-white px-5 py-3 text-center text-sm font-black text-nimbus-ink transition hover:border-nimbus-orange hover:text-nimbus-orange"
            >
              {dictionary.video.plansCta}
            </a>
          </div>
        </div>

        <div>
          <div className="overflow-hidden">
            {videoType === "empty" ? (
              <button
                type="button"
                onClick={handlePlaceholderClick}
                aria-label={dictionary.video.aria}
                className="group grid aspect-video w-full place-items-center bg-white p-6 text-center transition hover:bg-orange-50"
              >
                <span className="grid size-20 place-items-center rounded-full bg-nimbus-orange text-white shadow-soft transition group-hover:bg-nimbus-orangeDark">
                  <span className="ml-1 h-0 w-0 border-y-[13px] border-l-[20px] border-y-transparent border-l-white" />
                </span>
                <span className="mt-5 block text-lg font-black text-nimbus-ink">{dictionary.video.pending}</span>
                <span className="mt-2 block text-sm font-bold text-nimbus-muted">{dictionary.video.pendingText}</span>
              </button>
            ) : null}

            {videoType === "iframe" ? (
              <div>
                {isVideoPlaying ? (
                  <iframe
                    src={toEmbedUrl(VIDEO_URL, true)}
                    title={dictionary.video.aria}
                    className={
                      isVerticalVideo
                        ? "mx-auto aspect-[9/16] max-h-[680px] w-full max-w-sm rounded-md bg-black"
                        : "aspect-video w-full"
                    }
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={handleAvailableClick}
                    aria-label={dictionary.video.aria}
                    className={
                      isVerticalVideo
                        ? "group relative mx-auto grid aspect-[9/16] max-h-[680px] w-full max-w-sm place-items-center overflow-hidden rounded-md bg-cover bg-center text-center"
                        : "group relative grid aspect-video w-full place-items-center overflow-hidden bg-cover bg-center text-center"
                    }
                    style={{
                      backgroundImage: `linear-gradient(rgba(17, 24, 39, 0.18), rgba(17, 24, 39, 0.56)), url(${thumbnailUrl})`,
                    }}
                  >
                    <span className="grid size-20 place-items-center rounded-full bg-nimbus-orange text-white shadow-soft transition group-hover:bg-nimbus-orangeDark">
                      <span className="ml-1 h-0 w-0 border-y-[13px] border-l-[20px] border-y-transparent border-l-white" />
                    </span>
                    <span className="absolute inset-x-4 bottom-4 rounded-full bg-white/92 px-4 py-2 text-sm font-black text-nimbus-ink shadow-sm">
                      {dictionary.video.play}
                    </span>
                  </button>
                )}
              </div>
            ) : null}

            {videoType === "mp4" ? (
              <video
                className="aspect-video w-full bg-black"
                controls
                onPlay={handleAvailableClick}
                aria-label={dictionary.video.aria}
              >
                <source src={VIDEO_URL} type="video/mp4" />
              </video>
            ) : null}
          </div>

          {placeholderMessage ? (
            <p className="mt-3 rounded-lg bg-white p-3 text-sm font-bold text-nimbus-muted">{placeholderMessage}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function getVideoType(url: string) {
  if (!url) {
    return "empty";
  }

  if (url.endsWith(".mp4")) {
    return "mp4";
  }

  if (url.includes("youtube.com") || url.includes("youtu.be") || url.includes("vimeo.com")) {
    return "iframe";
  }

  return "empty";
}

function toEmbedUrl(url: string, autoplay = false) {
  const youtubeVideoId = getYoutubeVideoId(url);
  if (youtubeVideoId) {
    const params = new URLSearchParams({
      rel: "0",
      playsinline: "1",
    });

    if (autoplay) {
      params.set("autoplay", "1");
    }

    return `https://www.youtube.com/embed/${youtubeVideoId}?${params.toString()}`;
  }

  if (url.includes("vimeo.com/")) {
    const videoId = url.split("vimeo.com/")[1]?.split(/[?&]/)[0];
    return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
  }

  return url;
}

function isYoutubeShort(url: string) {
  return url.includes("youtube.com/shorts/");
}

function getYoutubeVideoId(url: string) {
  if (url.includes("youtu.be/")) {
    return url.split("youtu.be/")[1]?.split(/[?&]/)[0] || "";
  }

  if (url.includes("youtube.com/shorts/")) {
    return url.split("youtube.com/shorts/")[1]?.split(/[?&]/)[0] || "";
  }

  if (url.includes("youtube.com/watch")) {
    return new URL(url).searchParams.get("v") || "";
  }

  return "";
}
