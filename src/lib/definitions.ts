import { z } from 'zod'

export const SignupFormSchema = z.object({
	name: z
		.string()
		.min(2, { message: 'Name must be at least 2 characters long.' })
		.trim(),
	email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
	age: z
		.number()
		.int({ message: 'Age must be an integer.' })
		.min(0, { message: 'Age must be a positive number.' }),
	password: z
		.string()
		.min(8, { message: 'Be at least 8 characters long' })
		.regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
		.regex(/[0-9]/, { message: 'Contain at least one number.' })
		.regex(/[^a-zA-Z0-9]/, {
			message: 'Contain at least one special character.',
		})
		.trim(),
})

export type FormState =
	| {
			errors?: {
				name?: string[]
				email?: string[]
				password?: string[]
				age?: string[] // Added error handling for age
			}
			message?: string
	  }
	| undefined
