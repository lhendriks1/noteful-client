
export const findFolder = (folders=[], folder_id) =>
  folders.find(folder => folder.id === Number(folder_id))

export const findNote = (notes=[], noteId) =>
  notes.find(note => note.id === Number(noteId))

export const getNotesForFolder = (notes=[], folder_id) => {
  if (!folder_id) {
     return notes
  }
   return notes.filter(note => note.folder_id === Number(folder_id))
}

export const countNotesForFolder = (notes=[], folder_id) =>
  notes.filter(note => note.folder_id === Number(folder_id)).length
