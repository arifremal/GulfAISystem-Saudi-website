import { useEffect, useMemo } from 'react'
import {
  applyPageMeta,
  removeJsonLd,
  upsertJsonLd,
  type PageMetaInput,
} from '../lib/seo'

type PageSeoProps = PageMetaInput & {
  /** JSON-LD graphs keyed by stable DOM ids (unique per page). */
  schemas?: Record<string, object>
}

/**
 * Applies document metadata and optional JSON-LD for the current route.
 * Restores prior meta and removes injected schemas on unmount.
 */
export function PageSeo({ schemas, title, description, path, type, imageUrl, noindex }: PageSeoProps) {
  const schemaJson = useMemo(
    () => (schemas ? JSON.stringify(schemas) : ''),
    [schemas],
  )

  useEffect(() => {
    const restore = applyPageMeta({ title, description, path, type, imageUrl, noindex })
    const parsed = schemaJson ? (JSON.parse(schemaJson) as Record<string, object>) : null
    const ids = parsed ? Object.keys(parsed) : []

    if (parsed) {
      for (const [id, data] of Object.entries(parsed)) {
        upsertJsonLd(id, data)
      }
    }

    return () => {
      restore()
      for (const id of ids) removeJsonLd(id)
    }
  }, [title, description, path, type, imageUrl, noindex, schemaJson])

  return null
}
