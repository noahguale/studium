import {
	integer,
	pgTable,
	serial,
	text,
	timestamp,
	primaryKey,
	pgEnum,
} from 'drizzle-orm/pg-core'

export const roleEnum = pgEnum('role', ['member', 'admin'])
export const accountTypeEnum = pgEnum('type', ['email', 'google', 'github'])

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	age: integer('age').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: timestamp('email_verified', { mode: 'date' }),
})

export const accounts = pgTable('accounts', {
	id: serial('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	accountType: accountTypeEnum('account_type').notNull(),
	githubId: text('github_id').unique(),
	googleId: text('google_id').unique(),
	password: text('password'),
	salt: text('salt'),
})

export const profiles = pgTable('profiles', {
	id: serial('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' })
		.unique(),
	displayName: text('display_name'),
	imageId: text('image_id'),
	image: text('image'),
	bio: text('bio').notNull().default(''),
})

export const sessions = pgTable('sessions', {
	id: text('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date',
	}).notNull(),
})

export const magicLinks = pgTable('magic_links', {
	id: serial('id').primaryKey(),
	email: text('email').notNull().unique(),
	token: text('token'),
	tokenExpiresAt: timestamp('token_expires_at', { mode: 'date' }),
})

export const resetTokens = pgTable('reset_tokens', {
	id: serial('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' })
		.unique(),
	token: text('token'),
	tokenExpiresAt: timestamp('token_expires_at', { mode: 'date' }),
})

export const verifyEmailTokens = pgTable('verify_email_tokens', {
	id: serial('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' })
		.unique(),
	token: text('token'),
	tokenExpiresAt: timestamp('token_expires_at', { mode: 'date' }),
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

export type InsertUser = typeof users.$inferInsert
export type User = typeof users.$inferSelect

export type InsertAccount = typeof accounts.$inferInsert
export type Account = typeof accounts.$inferSelect

export type InsertProfile = typeof profiles.$inferInsert
export type Profile = typeof profiles.$inferSelect

export type InsertSession = typeof sessions.$inferInsert
export type Session = typeof sessions.$inferSelect

export type InsertDeck = typeof decks.$inferInsert
export type Deck = typeof decks.$inferSelect

export type InsertNotecard = typeof notecards.$inferInsert
export type Notecard = typeof notecards.$inferSelect

export type InsertTag = typeof tags.$inferInsert
export type Tag = typeof tags.$inferSelect

export type InsertNotecardTag = typeof notecard_tags.$inferInsert
export type NotecardTag = typeof notecard_tags.$inferSelect

export type InsertNotecardDeck = typeof notecard_decks.$inferInsert
export type NotecardDeck = typeof notecard_decks.$inferSelect
