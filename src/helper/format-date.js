export const formatDate = (date) => new Date(date).toLocaleDateString(
  'bg-BG',
  {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    minute: 'numeric',
    hour: 'numeric',
  }
)
