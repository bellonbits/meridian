/** aria-describedby value for a field: its error message if present, else its hint. */
export const describedBy = (id: string, error?: string, hint?: boolean) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined
