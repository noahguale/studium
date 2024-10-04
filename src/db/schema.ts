import {
	integer,
	pgTable,
	serial,
	text,
	timestamp,
	primaryKey,
} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	age: integer('age').notNull(),
	email: text('email').notNull().unique(),
})

export const decks = pgTable('decks', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
})

export const notecards = pgTable('notecards', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	content: text('content').notNull(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const notecard_decks = pgTable(
	'notecard_decks',
	{
		notecardId: integer('notecard_id')
			.notNull()
			.references(() => notecards.id, { onDelete: 'cascade' }),
		deckId: integer('deck_id')
			.notNull()
			.references(() => decks.id, { onDelete: 'cascade' }),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.notecardId, table.deckId] }),
		}
	}
)

export const tags = pgTable('tags', {
	id: serial('id').primaryKey(),
	name: text('name').notNull().unique(),
})

export const notecard_tags = pgTable(
	'notecard_tags',
	{
		notecardId: integer('notecard_id')
			.notNull()
			.references(() => notecards.id, { onDelete: 'cascade' }),
		tagId: integer('tag_id')
			.notNull()
			.references(() => tags.id, { onDelete: 'cascade' }),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.notecardId, table.tagId] }),
		}
	}
)

export type InsertDeck = typeof decks.$inferInsert
export type SelectDeck = typeof decks.$inferSelect

export type InsertNotecard = typeof notecards.$inferInsert
export type SelectNotecard = typeof notecards.$inferSelect

export type InsertUser = typeof users.$inferInsert
export type SelectUser = typeof users.$inferSelect

export type InsertTag = typeof tags.$inferInsert
export type SelectTag = typeof tags.$inferSelect

export type InsertNotecardTag = typeof notecard_tags.$inferInsert
export type SelectNotecardTag = typeof notecard_tags.$inferSelect

export type InsertNotecardDeck = typeof notecard_decks.$inferInsert
export type SelectNotecardDeck = typeof notecard_decks.$inferSelect
