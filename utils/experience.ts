export function calculateExperienceYears(startYear: number = 2005): number {
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth() + 1 // January is 0
  
  // Calculate years from start year to current year
  const years = currentYear - startYear
  
  return Math.max(years, 0) // Ensure we don't return negative years
}

export function getExperienceText(startYear: number = 2005): string {
  const years = calculateExperienceYears(startYear)
  return `${years}+ years`
} 