import type { FieldErrors, FieldValues, Resolver } from "react-hook-form"
import type { ZodType } from "zod"

// Minimal stand-in for @hookform/resolvers (its optional peer deps clash with zod 4 on npm).
export function zodResolver<T extends FieldValues>(schema: ZodType<T>): Resolver<T> {
  return async (values) => {
    const result = schema.safeParse(values)
    if (result.success) return { values: result.data, errors: {} }

    const errors: Record<string, { type: string; message: string }> = {}
    for (const issue of result.error.issues) {
      const key = issue.path.join(".")
      if (!errors[key]) errors[key] = { type: issue.code, message: issue.message }
    }
    return { values: {}, errors: errors as FieldErrors<T> }
  }
}
