import type { ImgHTMLAttributes } from 'react'
import {
  defaultSizes,
  responsiveSrcSet,
  type ResponsiveKind,
} from '../lib/responsive-image'

type OptimizedImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'srcSet' | 'sizes'> & {
  src: string
  alt: string
  kind?: ResponsiveKind
  /** Prefer original src as <img> fallback (PNG/JPG). */
  sizes?: string
}

/**
 * Serves AVIF/WebP responsive sources when variants exist; falls back to original.
 * Does not change layout — width/height/className remain caller-controlled.
 */
export function OptimizedImage({
  src,
  alt,
  kind = 'card',
  sizes,
  loading = 'lazy',
  decoding = 'async',
  ...imgProps
}: OptimizedImageProps) {
  const resolvedSizes = sizes ?? defaultSizes(kind)
  const webpSet = responsiveSrcSet(src, kind, 'webp')
  const avifSet = responsiveSrcSet(src, kind, 'avif')

  return (
    <picture className="contents">
      <source type="image/avif" srcSet={avifSet} sizes={resolvedSizes} />
      <source type="image/webp" srcSet={webpSet} sizes={resolvedSizes} />
      <img src={src} alt={alt} loading={loading} decoding={decoding} {...imgProps} />
    </picture>
  )
}
