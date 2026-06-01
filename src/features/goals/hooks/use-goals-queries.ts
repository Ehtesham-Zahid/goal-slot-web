import { fetchGoals, fetchGoalStats, goalQueries } from '@/features/goals/utils/queries'
import { Goal, GoalFilters, GoalStats } from '@/features/goals/utils/types'
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'

export function useGoalsQuery(filters?: GoalFilters, options?: UseQueryOptions<Goal[]>) {
  return useQuery<Goal[]>({
    queryKey: goalQueries.list(filters),
    queryFn: () => fetchGoals(filters),
    refetchInterval: 30000,
    ...options,
  })
}

export function useGoalStatsQuery() {
  return useQuery<GoalStats>({
    queryKey: goalQueries.stats(),
    queryFn: fetchGoalStats,
    refetchInterval: 30000,
  })
}
