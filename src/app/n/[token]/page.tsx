'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Eye } from 'lucide-react'

import { publicNotesApi } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Loading } from '@/components/ui/loading'
import { TiptapEditor } from '@/components/tiptap-editor'

interface PublicNote {
  id: string
  title: string
  content: string
  icon: string | null
  color: string | null
  updatedAt: string
  user: { name: string }
}

// Convert legacy block-JSON content to HTML, matching the same logic
// the in-app editor uses so public viewers see exactly what the owner
// sees. Falls through to plain text if the content is unrecognised.
function toHtml(content: string): string {
  if (!content) return '<p></p>'
  const trimmed = content.trim()
  if (trimmed.startsWith('<')) return content
  try {
    const blocks = JSON.parse(content)
    if (!Array.isArray(blocks)) return `<p>${content}</p>`
    return blocks
      .map((block: any) => {
        const c = block.content || ''
        switch (block.type) {
          case 'heading1': return `<h1>${c}</h1>`
          case 'heading2': return `<h2>${c}</h2>`
          case 'heading3': return `<h3>${c}</h3>`
          case 'bulletList': return `<ul><li>${c}</li></ul>`
          case 'numberedList': return `<ol><li>${c}</li></ol>`
          case 'quote':
          case 'blockquote': return `<blockquote>${c}</blockquote>`
          case 'code':
          case 'codeBlock': return `<pre><code>${c}</code></pre>`
          case 'divider': return '<hr>'
          case 'image': return block.url ? `<img src="${block.url}" alt="${block.alt || ''}" />` : ''
          case 'paragraph':
          default: return c ? `<p>${c}</p>` : '<p></p>'
        }
      })
      .join('')
  } catch {
    return `<p>${content}</p>`
  }
}

export default function PublicNotePage({ params }: { params: Promise<{ token: string }> }) {
  const [token, setToken] = useState<string | null>(null)
  const [note, setNote] = useState<PublicNote | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    params.then((p) => setToken(p.token))
  }, [params])

  useEffect(() => {
    if (!token) return
    let cancelled = false
    setLoading(true)
    setError(null)
    publicNotesApi
      .getByToken(token)
      .then((res) => {
        if (cancelled) return
        setNote(res.data as PublicNote)
      })
      .catch((err) => {
        if (cancelled) return
        const status = err?.response?.status
        if (status === 404) {
          setError('This shared note is no longer available, or the link has been turned off.')
        } else {
          setError('Could not load this note. Try again in a moment.')
        }
      })
      .finally(() => {
        if (cancelled) return
        setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [token])

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-md px-1.5 py-1 text-xs font-semibold text-zinc-700 hover:bg-zinc-100"
            title="Go to Goal Slot"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Goal Slot
          </Link>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-zinc-100 px-2 py-1 text-[11px] font-medium text-zinc-600">
            <Eye className="h-3 w-3" />
            Public note (view only)
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        {loading && (
          <div className="flex h-64 items-center justify-center">
            <Loading size="md" />
          </div>
        )}

        {!loading && error && (
          <div className="mx-auto max-w-md rounded-xl border border-zinc-200 bg-white p-6 text-center">
            <h1 className="text-lg font-semibold text-zinc-900">Note unavailable</h1>
            <p className="mt-2 text-sm text-zinc-600">{error}</p>
            <Button asChild variant="brand" size="sm" className="mt-4">
              <Link href="/">Go to Goal Slot</Link>
            </Button>
          </div>
        )}

        {!loading && note && (
          <article className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-4 flex items-center gap-3">
              {note.icon && (
                <span aria-hidden className="text-3xl leading-none">
                  {note.icon}
                </span>
              )}
              <h1 className="min-w-0 flex-1 text-2xl font-bold text-zinc-900 sm:text-3xl">
                {note.title || 'Untitled'}
              </h1>
            </div>
            <div className="mb-6 text-[11px] text-zinc-500">
              Shared by {note.user.name} · Updated {new Date(note.updatedAt).toLocaleString()}
            </div>
            <TiptapEditor
              content={toHtml(note.content || '')}
              editable={false}
              className="min-h-[40vh]"
            />
          </article>
        )}
      </main>
    </div>
  )
}
