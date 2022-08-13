import { Transition, Dialog } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { XIcon } from '@heroicons/react/outline';
import axios from 'axios';
import Loader from '../../Loader';
import { useRouter } from 'next/router';
import DropdownPriority from '../../Dropdown';

const ModalAddListItem = (props) => {
  const router = useRouter();
  const { open, close, item, status, success } = props;

  const [payloadAdd, setPayloadAdd] = useState({});
  const [priority, setPriority] = useState('very-high');
  const [process, setProcess] = useState(false);

  const handleChangeName = (value) => {
    const newPayload = { ...payloadAdd };

    newPayload.title = value;

    setPayloadAdd(newPayload);
  };

  const handleChangePriority = (value) => {
    const newPayload = { ...payloadAdd };

    newPayload.priority = value.datacy;

    setPayloadAdd(newPayload);
  };

  const handleSubmit = async () => {
    console.log(payloadAdd);
    setProcess(true);
    try {
      let response;
      if (status === 'add') {
        response = await axios.post(
          'https://todo.api.devcode.gethired.id/todo-items',
          payloadAdd
        );
      } else if (status === 'edit') {
        response = await axios.patch(
          `https://todo.api.devcode.gethired.id/todo-items/${item.id}`,
          payloadAdd
        );
      }

      if (response) {
        success();
      }
    } catch (err) {
      console.log(err);
    }
    setProcess(false);
  };

  useEffect(() => {
    setPayloadAdd(item);
    setPriority(item.priority);
  }, [open, item]);

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  data-cy="modal-add"
                  className="w-full max-w-3xl transform rounded-3xl bg-white p-10 text-left align-middle shadow-xl transition-all"
                >
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex items-center"
                  >
                    <p data-cy="modal-add-title">Tambah List Item</p>
                    <button
                      onClick={close}
                      className="ml-auto w-7 h-7 text-slate-500"
                      data-cy="modal-add-close-button"
                    >
                      <XIcon />
                    </button>
                  </Dialog.Title>
                  <hr className="my-4" />
                  <div>
                    <p className="font-semibold" data-cy="modal-add-name-title">
                      Nama List Item
                    </p>

                    <input
                      data-cy="modal-add-name-input"
                      className="w-full p-4 mt-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-200"
                      placeholder="Tambahkan nama list item"
                      value={payloadAdd.title}
                      onChange={(e) => handleChangeName(e.target.value)}
                    />
                  </div>

                  <div className="mt-8">
                    <p
                      className="font-semibold"
                      data-cy="modal-add-priority-title"
                    >
                      Priority
                    </p>

                    <DropdownPriority
                      changePriority={handleChangePriority}
                      itemPriority={priority}
                    />
                  </div>

                  <hr className="my-4" />
                  <button
                    data-cy="modal-add-save-button"
                    disabled={payloadAdd.title === '' || process}
                    className="w-28 h-12 flex justify-center items-center bg-sky-500 text-white rounded-full ml-auto disabled:bg-sky-300"
                    onClick={handleSubmit}
                  >
                    {process ? <Loader /> : 'Simpan'}
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalAddListItem;
