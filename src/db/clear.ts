import { db } from './index.js'
import {
	users,
	decks,
	notecards,
	notecard_decks,
	tags,
	notecard_tags,
} from './schema.js'

async function clear() {
	console.log('Clearing database...')

	try {
		// Clear notecard_tags
		await db.delete(notecard_tags).execute()
		console.log('Notecard_tags cleared')

		// Clear notecard_decks
		await db.delete(notecard_decks).execute()
		console.log('Notecard_decks cleared')

		// Clear notecards
		await db.delete(notecards).execute()
		console.log('Notecards cleared')

		// Clear tags
		await db.delete(tags).execute()
		console.log('Tags cleared')

		// Clear decks
		await db.delete(decks).execute()
		console.log('Decks cleared')

		// Clear users
		await db.delete(users).execute()
		console.log('Users cleared')

		console.log('Database clearing completed')
	} catch (error) {
		console.error('Error clearing database:', error)
		throw error
	}
}

clear().catch((e) => {
	console.error('Error clearing database:', e)
	process.exit(1)
})
