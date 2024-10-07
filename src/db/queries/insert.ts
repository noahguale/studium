import { db } from '..'
import { InsertUser, InsertAccount, users, accounts } from '../schema'

export async function createUser(userData: InsertUser) {
	const newUser = await db.insert(users).values(userData).returning()
	return newUser
}

export async function createAccount(accountData: InsertAccount) {
	const newAccount = await db.insert(accounts).values(accountData).returning()
	return newAccount
}
