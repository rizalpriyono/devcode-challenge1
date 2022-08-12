import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import {
  PlusIcon,
  ChevronLeftIcon,
  PencilIcon,
  SwitchVerticalIcon,
} from '@heroicons/react/outline';
import Loader from '../../components/Loader';
import Head from 'next/head';
import axios from 'axios';
import CardListItem from '../../components/CardListItem';
import ModalAddListItem from '../../components/modal/AddListItem';
import Sorting from '../../components/Sorting';

export default function DetailActivity(props) {
  const router = useRouter();
  const { listTodoItem, nameActivity } = props;

  const [processAdd, setProcessAdd] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [listItem, setListItem] = useState([]);
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState(nameActivity);

  const { id } = router.query;

  const handleClickEdit = () => {
    if (editTitle) {
      handleChangeTitle();
      setEditTitle(false);
    } else {
      setEditTitle(true);
    }
  };

  const handleChangeTitle = async () => {
    try {
      const response = await axios.patch(
        `https://todo.api.devcode.gethired.id/activity-groups/${id}`,
        { title: title }
      );

      if (response) {
        setEditTitle(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeSort = (value) => {
    switch (value) {
      case 'Terbaru':
        setListItem([...listTodoItem]);
        break;

      case 'Terlama':
        setListItem([...listTodoItem].reverse());
        break;

      case 'A-Z':
        setListItem(
          [...listTodoItem].sort((a, b) => {
            let textA = a.title.toUpperCase();
            let textB = b.title.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
          })
        );
        break;

      case 'Z-A':
        setListItem(
          [...listTodoItem].sort((a, b) => {
            let textA = a.title.toUpperCase();
            let textB = b.title.toUpperCase();
            return textA > textB ? -1 : textA < textB ? 1 : 0;
          })
        );
        break;

      case 'Belum Selesai':
        setListItem(
          [...listTodoItem].sort((a, b) => b.is_active - a.is_active)
        );
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    setListItem([...listTodoItem]);
  }, [listTodoItem]);
  return (
    <>
      <Head>
        <title>To Do List - Detail</title>
      </Head>

      <main>
        <Header />

        <section className="max-w-7xl mx-auto p-10">
          <header className="flex justify-between items-center">
            <div className="flex items-center">
              <button
                className="w-8 mr-4"
                data-cy="todo-back-button"
                onClick={() => router.push('/')}
              >
                <ChevronLeftIcon />
              </button>

              {editTitle ? (
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-3xl font-bold bg-transparent outline-none border-b-2"
                  autoFocus
                  onBlur={handleChangeTitle}
                />
              ) : (
                <h1 className="text-3xl font-bold" data-cy="todo-title">
                  {title}
                </h1>
              )}

              <button
                className="w-5 ml-5 text-slate-500"
                data-cy="todo-title-edit-button"
                onClick={handleClickEdit}
              >
                <PencilIcon />
              </button>
            </div>

            <div className="flex gap-8">
              <Sorting changeSorting={handleChangeSort} />
              <button
                className="flex justify-center w-48 py-4 px-8 rounded-full bg-sky-500 text-white items-center gap-3 font-semibold text-lg disabled:bg-sky-200"
                data-cy="todo-add-button"
                disabled={processAdd}
                onClick={() => setOpenModalAdd(true)}
              >
                {processAdd ? (
                  <Loader />
                ) : (
                  <>
                    <PlusIcon className="w-5" />
                    Tambah
                  </>
                )}
              </button>
            </div>
          </header>

          {listTodoItem.length === 0 ? (
            <div className="flex justify-center mt-10">
              <figure
                data-cy="todo-empty-state"
                className="cursor-pointer"
                onClick={() => setOpenModalAdd(true)}
              >
                <img src={'/img/todo-empty-state.svg'} alt="img-empty" />
              </figure>
            </div>
          ) : (
            <div className="grid mt-16 gap-5">
              {listItem.map((item, i) => (
                <div key={i}>
                  <CardListItem item={item} index={i} />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <ModalAddListItem
        open={openModalAdd}
        close={() => setOpenModalAdd(false)}
        item={{
          activity_group_id: id,
          title: '',
          priority: 'very-high',
        }}
        status="add"
      />
    </>
  );
}

export async function getServerSideProps({ params }) {
  const response = await axios.get(
    `https://todo.api.devcode.gethired.id/activity-groups/${params.id}`
  );
  const res = response.data;
  return {
    props: {
      nameActivity: res.title,
      listTodoItem: res.todo_items,
    },
  };
}
