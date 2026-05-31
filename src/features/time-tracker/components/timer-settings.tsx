import { useMemo } from 'react'
import { useCategoriesQuery } from '@/features/categories'
import { Goal } from '@/features/time-tracker/utils/types'
import { useTimerStore } from '@/lib/use-timer-store'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SearchableSelect } from '@/components/ui/searchable-select'
import { X, Clock } from 'lucide-react'

interface TimerSettingsProps {
  goals: Goal[]
  currentCategory: string
  currentGoalId: string
  timerState: 'STOPPED' | 'RUNNING' | 'PAUSED'
  isTaskSelected?: boolean
  onCategoryChange: (category: string) => void
  onGoalIdChange: (goalId: string) => void
}

const LABEL_CLASS = 'block text-[10px] font-semibold uppercase tracking-wider text-zinc-500'
const SELECT_TRIGGER_CLASS =
  'h-9 w-full rounded-lg border border-zinc-200 bg-white px-2.5 text-xs text-zinc-900 transition-colors hover:border-zinc-300 focus:border-[#f2cc0d] focus:outline-none focus:ring-1 focus:ring-[#f2cc0d] disabled:cursor-not-allowed disabled:opacity-50 data-[state=open]:border-[#f2cc0d]'

export function TimerSettings({
  goals,
  currentCategory,
  currentGoalId,
  timerState,
  isTaskSelected = false,
  onCategoryChange,
  onGoalIdChange,
}: TimerSettingsProps) {
  const { data: categories = [] } = useCategoriesQuery()

  const categoryOptions = useMemo(() => [
    { value: 'no_category', label: 'No Category' },
    ...categories.map((cat) => ({
      value: cat.value,
      label: cat.name,
      color: cat.color,
    }))
  ], [categories])

  const goalOptions = useMemo(() => [
    { value: 'no_goal', label: 'No Goal' },
    ...goals.map((goal) => ({
      value: goal.id,
      label: goal.title,
      color: goal.color,
    }))
  ], [goals])

  const REMINDER_OPTIONS = [5, 10, 15, 20, 30, 45, 60]
  const { reminderInterval, setReminderInterval } = useTimerStore((state) => ({
    reminderInterval: state.reminderInterval || 15,
    setReminderInterval: state.setReminderInterval,
  }))

  const canClearAll = timerState === 'STOPPED' && (!!currentGoalId || !!currentCategory)

  return (
    <div className="mx-auto mb-4 max-w-lg space-y-3 text-left">
      <div>
        <label className={`${LABEL_CLASS} mb-1`}>Reminder</label>
        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={reminderInterval.toString()}
            onValueChange={(val) => setReminderInterval(Number(val))}
            disabled={timerState === 'RUNNING'}
          >
            <SelectTrigger className={`${SELECT_TRIGGER_CLASS} sm:w-56`}>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-zinc-500" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              {REMINDER_OPTIONS.map((min) => (
                <SelectItem key={min} value={min.toString()}>
                  Every {min} minutes
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {canClearAll && (
            <button
              type="button"
              onClick={() => {
                onGoalIdChange('')
                onCategoryChange('')
              }}
              className="inline-flex h-9 items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2.5 text-xs font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-900"
            >
              <X className="h-3.5 w-3.5" />
              Clear goal & category
            </button>
          )}
        </div>
      </div>

      {/* Category sits above Goal — categorise first ("what kind of work
          is this?"), then drill into the specific goal. Stacked single
          column so the eye reads top-to-bottom instead of left-to-right. */}
      <div className="space-y-3">
        <div>
          <div className="mb-1.5 flex items-baseline justify-between gap-2">
            <label className={LABEL_CLASS}>
              Category
              {isTaskSelected && (
                <span className="ml-1 text-[10px] font-normal normal-case text-zinc-400">(from task)</span>
              )}
            </label>
          </div>
          <div className="relative">
            {currentCategory && timerState === 'STOPPED' && (
              <button
                type="button"
                onClick={() => onCategoryChange('')}
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
                aria-label="Clear category"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
            <SearchableSelect
              value={currentCategory || 'no_category'}
              onChange={(val) => onCategoryChange(val === 'no_category' ? '' : val)}
              disabled={timerState !== 'STOPPED'}
              options={categoryOptions}
              placeholder="Select category"
              triggerClassName="pr-8"
            />
          </div>
        </div>

        <div>
          <div className="mb-1.5 flex items-baseline justify-between gap-2">
            <label className={LABEL_CLASS}>
              Link to goal
              {isTaskSelected && currentGoalId && (
                <span className="ml-1 text-[10px] font-normal normal-case text-zinc-400">(from task)</span>
              )}
            </label>
          </div>
          <div className="relative">
            {currentGoalId && timerState === 'STOPPED' && (
              <button
                type="button"
                onClick={() => onGoalIdChange('')}
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
                aria-label="Clear goal"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
            <SearchableSelect
              value={currentGoalId || 'no_goal'}
              onChange={(val) => onGoalIdChange(val === 'no_goal' ? '' : val)}
              disabled={timerState !== 'STOPPED'}
              options={goalOptions}
              placeholder="Select goal"
              triggerClassName="pr-8"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
