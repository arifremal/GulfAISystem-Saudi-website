/** Build responsive AVIF/WebP srcsets from originals under public/. */

export type ResponsiveKind = 'hero' | 'gallery' | 'card' | 'banner'

const WIDTHS: Record<ResponsiveKind, number[]> = {
  hero: [640, 960, 1280, 1920],
  gallery: [400, 800, 1200],
  card: [480, 800, 1200],
  banner: [768, 1280, 1920],
}

export function responsiveBase(src: string): { dir: string; base: string; ext: string } {
  const cleaned = src.startsWith('/') ? src.slice(1) : src
  const lastSlash = cleaned.lastIndexOf('/')
  const dir = lastSlash >= 0 ? cleaned.slice(0, lastSlash) : ''
  const file = lastSlash >= 0 ? cleaned.slice(lastSlash + 1) : cleaned
  const dot = file.lastIndexOf('.')
  const base = dot >= 0 ? file.slice(0, dot) : file
  const ext = dot >= 0 ? file.slice(dot) : ''
  return { dir, base, ext }
}

export function siblingWebp(src: string): string {
  const { dir, base } = responsiveBase(src)
  return `/${dir ? `${dir}/` : ''}${base}.webp`
}

export function responsiveSrcSet(src: string, kind: ResponsiveKind, format: 'webp' | 'avif'): string {
  const { dir, base } = responsiveBase(src)
  const prefix = `/${dir ? `${dir}/` : ''}responsive/${base}`
  return WIDTHS[kind].map((w) => `${prefix}-${w}.${format} ${w}w`).join(', ')
}

export function defaultSizes(kind: ResponsiveKind): string {
  switch (kind) {
    case 'hero':
    case 'banner':
      return '100vw'
    case 'gallery':
      return '(max-width: 380px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
    case 'card':
      return '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
    default:
      return '100vw'
  }
}
