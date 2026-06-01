'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, Users } from 'lucide-react'

import { useSharedNotesQuery, type SharedNoteSummary } from '@/features/notes/hooks/use-notes'
import { cn } from '@/lib/utils'

interface SharedNotesPanelProps {
  selectedShareId: string | null
  onSelectShared: (summary: SharedNoteSummary) => void
  className?: string
}

// Compact panel that lists notes shared with the current user. Lives
// inside the notes sidebar column, below the regular note tree, so the
// user has one place to look for everything readable. Collapsed by
// default to keep visual weight low; expands once there's at least
// one shared note to surface.
export function SharedNotesPanel({
  selectedShareId,
  onSelectShared,
  className,
}: SharedNotesPanelProps) {
  const { data: shares = [], isLoading } = useSharedNotesQuery()
  const [open, setOpen] = useState(true)

  // Nothing to show and not still loading → render nothing rather than
  // an empty section header that takes up scarce sidebar space.
  if (!isLoading && shares.length === 0) return null

  return (
    <div className={cn('border-t border-zinc-200 bg-white', className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wider text-zinc-500 transition-colors hover:bg-zinc-50"
        aria-expanded={open}
      >
        <span className="flex items-center gap-1.5">
          <Users className="h-3 w-3" />
          Shared with me
          {shares.length > 0 && (
            <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-bold text-zinc-700">
              {shares.length}
            </span>
          )}
        </span>
        {open ? (
          <ChevronDown className="h-3 w-3 text-zinc-400" />
        ) : (
          <ChevronRight className="h-3 w-3 text-zinc-400" />
        )}
      </button>
      {open && (
        <ul className="max-h-64 overflow-y-auto pb-2">
          {isLoading ? (
            <li className="px-3 py-2 text-[11px] text-zinc-400">Loading...</li>
          ) : (
            shares.map((s) => {
              const isSelected = selectedShareId === s.shareId
              return (
                <li key={s.shareId}>
                  <button
                    type="button"
                    onClick={() => onSelectShared(s)}
                    title={`${s.note.title || 'Untitled'} — shared by ${s.owner.name}`}
                    className={cn(
                      'flex w-full items-start gap-2 px-3 py-1.5 text-left text-xs transition-colors',
                      isSelected
                        ? 'bg-[#f2cc0d]/20 text-zinc-900'
                        : 'text-zinc-700 hover:bg-zinc-50',
                    )}
                  >
                    <span aria-hidden className="mt-0.5 text-sm leading-none">
                      {s.note.icon || '📄'}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium">
                        {s.note.title || 'Untitled'}
                      </span>
                      <span className="block truncate text-[10px] text-zinc-500">
                        {s.owner.name}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })
          )}
        </ul>
      )}
    </div>
  )
}
