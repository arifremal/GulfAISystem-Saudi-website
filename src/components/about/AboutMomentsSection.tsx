import { useId, useRef, useState } from 'react'
import { Play } from 'lucide-react'
import { useLanguage } from '../../i18n'
import { Reveal } from './Reveal'

const MEDIA = {
  /* Left Top Team Image */
  leftTop: {
    src: '/assets/about/P1141317-Edit.jpg',
    altKey: 'about.moments.leftTopAlt',
  },
  /* Left Bottom Event Image */
  leftBottom: {
    src: '/assets/about/DSC_0132.jpg',
    altKey: 'about.moments.leftBottomAlt',
  },
  /* Centre Company Video */
  video: {
    src: '/assets/about/about-us-video.mp4',
    poster: '/assets/about/20260622_190159.png',
  },
  /* Right Top Partnership Image */
  rightTop: {
    src: '/assets/about/20260622_190159.png',
    altKey: 'about.moments.rightTopAlt',
  },
  /* Right Bottom Team Moment Image */
  rightBottom: {
    src: '/assets/about/group.jpg',
    altKey: 'about.moments.rightBottomAlt',
  },
} as const

function MomentImage({
  src,
  alt,
  className = '',
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <div
      className={`group relative min-h-0 overflow-hidden rounded-[1.15rem] bg-brand-secondary/40 ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover object-center transition duration-700 ease-out group-hover:scale-[1.04]"
      />
    </div>
  )
}

function CompanyVideo({
  title,
  playLabel,
  className = '',
}: {
  title: string
  playLabel: string
  className?: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const titleId = useId()
  const [playing, setPlaying] = useState(false)

  function handlePlay() {
    setPlaying(true)
    window.requestAnimationFrame(() => {
      void videoRef.current?.play()
    })
  }

  return (
    <div
      className={`relative overflow-hidden rounded-[1.15rem] bg-[#020b1d] ${className}`}
    >
      {/* Centre Company Video — full frame, original proportions */}
      <div className="relative aspect-video w-full">
        <video
          ref={videoRef}
          id={titleId}
          className="absolute inset-0 h-full w-full object-contain object-center"
          poster={MEDIA.video.poster}
          preload="metadata"
          playsInline
          controls={playing}
          controlsList="nodownload"
          title={title}
          aria-label={title}
          onPlay={() => setPlaying(true)}
          onEnded={() => setPlaying(false)}
        >
          <source src={MEDIA.video.src} type="video/mp4" />
        </video>

        {!playing && (
          <button
            type="button"
            onClick={handlePlay}
            className="group/play absolute inset-0 z-10 flex items-center justify-center bg-[#020b1d]/20 transition hover:bg-[#020b1d]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label={playLabel}
            aria-controls={titleId}
          >
            <span className="grid h-16 w-16 place-items-center rounded-full bg-white text-[#1447E6] shadow-[0_16px_40px_-12px_rgba(2,11,29,0.65)] transition duration-300 group-hover/play:scale-110 group-hover/play:bg-[#f4f8ff] sm:h-[4.5rem] sm:w-[4.5rem]">
              <Play className="ms-0.5 h-7 w-7 fill-current sm:h-8 sm:w-8" aria-hidden="true" />
            </span>
          </button>
        )}
      </div>
    </div>
  )
}

export function AboutMomentsSection() {
  const { t } = useLanguage()

  return (
    <section className="section-y section-bg-soft relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
      <div className="section-shell relative">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
          <p className="section-eyebrow">{t('about.moments.eyebrow')}</p>
          <h2 className="section-title mx-auto text-center">
            {t('about.moments.title')}
          </h2>
          <p className="section-subtitle mx-auto text-center">
            {t('about.moments.subtitle')}
          </p>
        </Reveal>

        <Reveal>
          <div className="rounded-[1.75rem] border border-[#1447E6]/10 bg-white p-3 shadow-[0_24px_60px_-28px_rgba(8,25,56,0.35)] sm:p-4 md:rounded-[2rem] md:p-5">
            {/* Desktop: narrower side images, dominant centre video */}
            <div className="hidden gap-3 lg:grid lg:grid-cols-[minmax(0,0.62fr)_minmax(0,2.1fr)_minmax(0,0.62fr)] lg:items-stretch lg:gap-4">
              <div className="grid min-h-0 grid-rows-2 gap-3 lg:gap-4">
                <MomentImage
                  src={MEDIA.leftTop.src}
                  alt={t(MEDIA.leftTop.altKey)}
                  className="h-full"
                />
                <MomentImage
                  src={MEDIA.leftBottom.src}
                  alt={t(MEDIA.leftBottom.altKey)}
                  className="h-full"
                />
              </div>

              <CompanyVideo
                title={t('about.moments.videoTitle')}
                playLabel={t('about.moments.playVideo')}
                className="w-full"
              />

              <div className="grid min-h-0 grid-rows-2 gap-3 lg:gap-4">
                <MomentImage
                  src={MEDIA.rightTop.src}
                  alt={t(MEDIA.rightTop.altKey)}
                  className="h-full"
                />
                <MomentImage
                  src={MEDIA.rightBottom.src}
                  alt={t(MEDIA.rightBottom.altKey)}
                  className="h-full"
                />
              </div>
            </div>

            {/* Tablet: video on top, 2x2 images below */}
            <div className="hidden gap-4 md:grid md:grid-cols-2 lg:hidden">
              <div className="col-span-2">
                <CompanyVideo
                  title={t('about.moments.videoTitle')}
                  playLabel={t('about.moments.playVideo')}
                />
              </div>
              <MomentImage
                src={MEDIA.leftTop.src}
                alt={t(MEDIA.leftTop.altKey)}
                className="aspect-[4/3]"
              />
              <MomentImage
                src={MEDIA.rightTop.src}
                alt={t(MEDIA.rightTop.altKey)}
                className="aspect-[4/3]"
              />
              <MomentImage
                src={MEDIA.leftBottom.src}
                alt={t(MEDIA.leftBottom.altKey)}
                className="aspect-[4/3]"
              />
              <MomentImage
                src={MEDIA.rightBottom.src}
                alt={t(MEDIA.rightBottom.altKey)}
                className="aspect-[4/3]"
              />
            </div>

            {/* Mobile: video then 2-col image grid */}
            <div className="grid gap-3 md:hidden">
              <CompanyVideo
                title={t('about.moments.videoTitle')}
                playLabel={t('about.moments.playVideo')}
              />
              <div className="grid grid-cols-2 gap-3 max-[380px]:grid-cols-1">
                <MomentImage
                  src={MEDIA.leftTop.src}
                  alt={t(MEDIA.leftTop.altKey)}
                  className="aspect-[4/3]"
                />
                <MomentImage
                  src={MEDIA.rightTop.src}
                  alt={t(MEDIA.rightTop.altKey)}
                  className="aspect-[4/3]"
                />
                <MomentImage
                  src={MEDIA.leftBottom.src}
                  alt={t(MEDIA.leftBottom.altKey)}
                  className="aspect-[4/3]"
                />
                <MomentImage
                  src={MEDIA.rightBottom.src}
                  alt={t(MEDIA.rightBottom.altKey)}
                  className="aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
