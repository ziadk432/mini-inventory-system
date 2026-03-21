import type { Path, FieldValues, UseFormSetError } from 'react-hook-form';

export function getServerError<T extends FieldValues>(
  error: any,
  setError: UseFormSetError<T>
): string {
  const message = error?.message || 'Something went wrong';
  const errors: Record<string, string[]> = error?.errors || {};

  Object.entries(errors).forEach(([field, messages]) => {
    if (Array.isArray(messages) && messages.length > 0) {
      setError(field as Path<T>, { type: 'server', message: messages[0] });
    }
  });

  return message;
}
