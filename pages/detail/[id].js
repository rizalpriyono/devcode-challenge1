import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import {
  PlusIcon,
  ChevronLeftIcon,
  PencilIcon,
} from '@heroicons/react/outline';
import Loader from '../../components/Loader';
import Head from 'next/head';
import axios from 'axios';
import CardListItem from '../../components/CardListItem';
import ModalAddListItem from '../../components/modal/AddListItem';
import Sorting from '../../components/Sorting';
import ModalDeleteListItem from '../../components/modal/DeleteListItem';
import ModalInformation from '../../components/modal/Information';

export default function DetailActivity(props) {
  const router = useRouter();
  const { id } = router.query;

  const [processAdd, setProcessAdd] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState({
    open: false,
    item: {},
    status: '',
  });
  const [openDelete, setOpenDelete] = useState(false);
  const [modalInfo, setModalInfo] = useState(false);
  const [listItem, setListItem] = useState([]);
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState('');
  const [itemSelected, setItemSelected] = useState({});
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
        getData(id);
        break;

      case 'Terlama':
        setListItem([...listItem].reverse());
        break;

      case 'A-Z':
        setListItem(
          [...listItem].sort((a, b) => {
            let textA = a.title.toUpperCase();
            let textB = b.title.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
          })
        );
        break;

      case 'Z-A':
        setListItem(
          [...listItem].sort((a, b) => {
            let textA = a.title.toUpperCase();
            let textB = b.title.toUpperCase();
            return textA > textB ? -1 : textA < textB ? 1 : 0;
          })
        );
        break;

      case 'Belum Selesai':
        setListItem([...listItem].sort((a, b) => b.is_active - a.is_active));
        break;

      default:
        break;
    }
  };

  const getData = async (idActivity) => {
    try {
      const response = await axios.get(
        `https://todo.api.devcode.gethired.id/activity-groups/${idActivity}`
      );
      if (response) {
        setTitle(response.data.title);
        setListItem(response.data.todo_items);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeActive = async (item) => {
    const payload = {
      ...item,
      is_active: !item.is_active,
    };
    try {
      const response = await axios.patch(
        `https://todo.api.devcode.gethired.id/todo-items/${item.id}`,
        payload
      );
      if (response) {
        getData(id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSuccessAdd = () => {
    getData(id);
    handleCloseForm();
  };

  const handleCloseForm = () => {
    setOpenModalAdd({
      open: false,
      item: {
        activity_group_id: id,
        title: '',
        priority: 'very-high',
      },
      status: '',
    });
  };

  const handleOpenForm = (status, item) => {
    setOpenModalAdd({ item: item, status: status, open: true });
  };

  useEffect(() => {
    const { id } = router.query;
    if (id !== undefined) {
      getData(id);
    }
  }, [id]);

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
                <h1
                  className="text-3xl font-bold"
                  data-cy="todo-title"
                  onClick={handleClickEdit}
                >
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
                onClick={() =>
                  handleOpenForm('add', {
                    activity_group_id: id,
                    title: '',
                    priority: 'very-high',
                  })
                }
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

          {listItem.length === 0 ? (
            <div className="flex justify-center mt-10">
              <figure
                data-cy="todo-empty-state"
                className="cursor-pointer"
                onClick={() =>
                  handleOpenForm('add', {
                    activity_group_id: id,
                    title: '',
                    priority: 'very-high',
                  })
                }
              >
                <img src={'/img/todo-empty-state.svg'} alt="img-empty" />
              </figure>
            </div>
          ) : (
            <div className="grid mt-16 gap-5">
              {listItem.map((item, i) => (
                <div key={i}>
                  <CardListItem
                    item={item}
                    index={i}
                    clickDelete={() => {
                      setItemSelected(item);
                      setOpenDelete(true);
                    }}
                    clickCheckbox={() => handleChangeActive(item)}
                    clickEdit={() => handleOpenForm('edit', item)}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <ModalAddListItem
        open={openModalAdd.open}
        close={handleCloseForm}
        item={openModalAdd.item}
        status={openModalAdd.status}
        success={handleSuccessAdd}
      />

      <ModalDeleteListItem
        open={openDelete}
        close={() => setOpenDelete(false)}
        item={itemSelected}
        success={() => {
          getData(id);
          setModalInfo(true);
        }}
      />

      <ModalInformation open={modalInfo} close={() => setModalInfo(false)} />
    </>
  );
}
