import { SignupFormSchema, FormState } from '@/lib/definitions'
import { createUser } from '@/data-access/users'
import { createAccount } from '@/data-access/accounts'

export async function signup(state: FormState, formData: FormData) {
	const validatedFields = SignupFormSchema.safeParse({
		name: formData.get('name'),
		email: formData.get('email'),
		password: formData.get('password'),
	})

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		}
	}

	const { email, password } = validatedFields.data

	const user = await createUser(email)
	const account = await createAccount(user.id, password) // Create account

	if (!user || !account) {
		return {
			message: 'An error occurred while creating your account.',
		}
	}
}
