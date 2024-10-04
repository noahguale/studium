'use client'

import React, { useState } from 'react'
import { format } from 'date-fns'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { StickyNote } from 'lucide-react'

interface Note {
	id: string
	content: string
	date: Date
}

export default function StickyNotes() {
	const [notes, setNotes] = useState<Note[]>([])
	const [newNoteContent, setNewNoteContent] = useState('')

	const addNote = () => {
		if (newNoteContent.trim()) {
			const newNote: Note = {
				id: Date.now().toString(),
				content: newNoteContent,
				date: new Date(),
			}
			setNotes([newNote, ...notes]) // Add new note to the beginning of the array
			setNewNoteContent('')
		}
	}

	return (
		<div className="flex flex-col w-full h-full mt-10">
			<div className="space-y-4 mb-8">
				{notes.map((note) => (
					<Card key={note.id} className="bg-yellow-100">
						<CardContent className="p-4">
							<p className="mb-2">{note.content}</p>
							<p className="text-xs text-gray-600">
								{format(note.date, 'MMM d, yyyy HH:mm')}
							</p>
						</CardContent>
					</Card>
				))}
			</div>
			<div className="flex flex-col bottom-0 left-0 right-0 bg-white p-4 shadow-md">
				<Textarea
					value={newNoteContent}
					onChange={(e) => setNewNoteContent(e.target.value)}
					placeholder="Type your message here..."
					className="mb-2"
				/>
				<Button onClick={addNote} className="w-full">
					Add Note
				</Button>
			</div>
		</div>
	)
}
