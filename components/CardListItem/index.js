import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ModalAddListItem from '../modal/AddListItem';
import ModalDeleteListItem from '../modal/DeleteListItem';

const CardListItem = (props) => {
  const router = useRouter();
  const { item, index } = props;

  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [itemSelect, setItemSelect] = useState({});

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
        router.replace(router.asPath);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSuccessDelete = () => {
    setOpenDelete(false);
    router.replace(router.asPath);
  };

  const handleClickEdit = () => {
    setItemSelect(item);
    setOpenEdit(true);
  };
  return (
    <>
      <div
        className="w-full p-8 bg-white rounded-xl shadow-lg flex items-center"
        data-cy={`todo-item-${index}`}
      >
        <input
          data-cy="todo-item-checkbox"
          type="checkbox"
          checked={!item.is_active}
          className="w-5 h-5"
          onChange={() => handleChangeActive(item)}
        />

        <div
          data-cy="todo-item-priority-indicator"
          className={`w-4 h-4 rounded-full mx-5
            ${
              item.priority === 'very-high'
                ? 'bg-[#ED4C5C]'
                : item.priority === 'high'
                ? 'bg-[#F8A541]'
                : item.priority === 'normal'
                ? 'bg-[#00A790]'
                : item.priority === 'low'
                ? 'bg-[#428BC1]'
                : item.priority === 'very-low'
                ? 'bg-[#8942C1]'
                : null
            }
          `}
        ></div>
        <h1
          data-cy="todo-item-title"
          className={`font-semibold text-lg ${
            item.is_active ? '' : 'line-through text-slate-500'
          }`}
        >
          {item.title}
        </h1>
        <button
          className="w-5 text-slate-400 ml-5"
          data-cy="todo-item-edit-button"
          onClick={handleClickEdit}
        >
          <PencilIcon />
        </button>

        <button
          className="w-5 text-slate-400 ml-auto"
          data-cy="todo-item-delete-button"
          onClick={() => setOpenDelete(true)}
        >
          <TrashIcon />
        </button>
      </div>

      <ModalDeleteListItem
        open={openDelete}
        close={() => setOpenDelete(false)}
        item={item}
        success={handleSuccessDelete}
      />

      <ModalAddListItem
        open={openEdit}
        close={() => setOpenEdit(false)}
        item={itemSelect}
        status="edit"
      />
    </>
  );
};

export default CardListItem;
