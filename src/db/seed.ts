import { db } from './index.js'
import {
	users,
	decks,
	notecards,
	notecard_decks,
	tags,
	notecard_tags,
} from './schema.js'
import { sql } from '@vercel/postgres'

async function seed() {
	console.log('Seeding database...')

	try {
		// Seed users
		const userIds = await db
			.insert(users)
			.values([
				{ name: 'Alice Johnson', age: 28, email: 'alice@example.com' },
				{ name: 'Bob Smith', age: 35, email: 'bob@example.com' },
			])
			.returning({ id: users.id })

		console.log('Users seeded')

		// Seed decks
		const deckIds = await db
			.insert(decks)
			.values([
				{
					name: 'JavaScript Basics',
					description: 'Fundamental concepts of JavaScript',
				},
				{ name: 'React Hooks', description: 'Understanding React Hooks' },
			])
			.returning({ id: decks.id })

		console.log('Decks seeded')

		// Seed notecards
		const notecardIds = await db
			.insert(notecards)
			.values([
				{
					title: 'Variables',
					content: 'Variables are used to store data values.',
					userId: userIds[0].id,
				},
				{
					title: 'Functions',
					content: 'Functions are reusable blocks of code.',
					userId: userIds[0].id,
				},
				{
					title: 'useState',
					content:
						'useState is a Hook that lets you add state to functional components.',
					userId: userIds[1].id,
				},
			])
			.returning({ id: notecards.id })

		console.log('Notecards seeded')

		// Seed notecard_decks
		await db.insert(notecard_decks).values([
			{ notecardId: notecardIds[0].id, deckId: deckIds[0].id },
			{ notecardId: notecardIds[1].id, deckId: deckIds[0].id },
			{ notecardId: notecardIds[2].id, deckId: deckIds[1].id },
		])

		console.log('Notecard_decks seeded')

		// Seed tags
		const tagIds = await db
			.insert(tags)
			.values([
				{ name: 'JavaScript' },
				{ name: 'React' },
				{ name: 'Programming' },
			])
			.returning({ id: tags.id })

		console.log('Tags seeded')

		// Seed notecard_tags
		await db.insert(notecard_tags).values([
			{ notecardId: notecardIds[0].id, tagId: tagIds[0].id },
			{ notecardId: notecardIds[1].id, tagId: tagIds[0].id },
			{ notecardId: notecardIds[2].id, tagId: tagIds[1].id },
			{ notecardId: notecardIds[0].id, tagId: tagIds[2].id },
			{ notecardId: notecardIds[1].id, tagId: tagIds[2].id },
			{ notecardId: notecardIds[2].id, tagId: tagIds[2].id },
		])

		console.log('Notecard_tags seeded')

		console.log('Database seeding completed')
	} catch (error) {
		console.error('Error seeding database:', error)
		throw error
	}
}

seed()
	.catch((e) => {
		console.error('Error seeding database:', e)
		process.exit(1)
	})
	.finally(async () => {
		await sql.end()
	})
