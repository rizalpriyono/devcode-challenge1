import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ModalAddListItem from '../modal/AddListItem';
import ModalDeleteListItem from '../modal/DeleteListItem';

const CardListItem = (props) => {
  const router = useRouter();
  const { item, clickDelete, clickCheckbox, clickEdit } = props;

  const [openEdit, setOpenEdit] = useState(false);
  const [itemSelect, setItemSelect] = useState({});

  const handleClickEdit = () => {
    setItemSelect(item);
    setOpenEdit(true);
  };
  return (
    <>
      <div
        className="w-full p-8 bg-white rounded-xl shadow-lg flex items-center"
        data-cy={`todo-item`}
      >
        <input
          data-cy="todo-item-checkbox"
          type="checkbox"
          checked={!item.is_active}
          className="w-5 h-5"
          onChange={() => clickCheckbox()}
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
          onClick={clickEdit}
        >
          <PencilIcon />
        </button>

        <button
          className="w-5 text-slate-400 ml-auto"
          data-cy="todo-item-delete-button"
          onClick={clickDelete}
        >
          <TrashIcon />
        </button>
      </div>

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
