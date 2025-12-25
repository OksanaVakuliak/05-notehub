import axios from 'axios';
import type { Note, CreateNote } from '../types/note';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  page: number;
  perPage: number;
}

const API_URL = 'https://notehub-public.goit.study/api/notes';
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

async function fetchNotes(
  page: number,
  perPage: number,
  search?: string
): Promise<FetchNotesResponse> {
  const params: Record<string, string | number> = { page, perPage };
  if (search) params.search = search;

  const { data } = await instance.get<FetchNotesResponse>('', { params });
  return data;
}

async function createNote(note: CreateNote): Promise<Note> {
  const { data } = await instance.post<Note>('', note);
  return data;
}

async function deleteNote(id: string): Promise<Note> {
  const { data } = await instance.delete<Note>(`/${id}`);
  return data;
}

const noteService = {
  fetchNotes,
  createNote,
  deleteNote,
};

export default noteService;
