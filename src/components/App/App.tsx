import css from './App.module.css'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchNotes } from '../../services/noteService'
import NoteList from '../NoteList/NoteList'
import Pagination from '../Pagination/Pagination'
import Modal from '../Modal/Modal'
import NoteForm from '../NoteForm/NoteForm'
import { useDebouncedCallback } from 'use-debounce';
import SearchBox from '../SearchBox/SearchBox'

function App() {

  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data } = useQuery({
    queryKey: ['notes', query, page],
    queryFn: () => fetchNotes({ query, page }),
  });

  const OpenModal = () => {
    setIsModalOpen(true);
  }

  const handleSearch = useDebouncedCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, 300);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onSearch={handleSearch} />
          {(data?.totalPages ?? 1) > 1 && (
            <Pagination
              currentPage={page}
              totalPages={data?.totalPages ?? 1}
              onPageChange={setPage}
            />
          )}
          <button onClick={OpenModal} className={css.button}>Create note +</button>
        </header>
        <NoteList notes={data?.notes ?? []} />
      </div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </>
  )
}

export default App