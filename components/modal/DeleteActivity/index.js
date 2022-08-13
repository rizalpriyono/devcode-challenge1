import { Transition, Dialog } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { ExclamationIcon } from '@heroicons/react/outline';
import axios from 'axios';
import Loader from '../../Loader';

const ModalDeleteActivity = (props) => {
  const { open, close, item, success } = props;
  const [deleting, setDeleting] = useState(false);

  const handleClick = async () => {
    setDeleting(true);
    try {
      const response = await axios.delete(
        `https://todo.api.devcode.gethired.id/activity-groups/${item.id}`
      );

      if (response) {
        close();
        success();
      }
    } catch (err) {
      console.log(err);
    }

    setDeleting(false);
  };
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
            <div
              className="flex min-h-full items-center justify-center p-4 text-center"
              data-cy="modal-delete"
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-white p-10 text-left align-middle shadow-xl transition-all">
                  <ExclamationIcon
                    data-cy="modal-delete-icon"
                    className="text-red-500 w-16 mx-auto"
                  />
                  <h1
                    data-cy="modal-delete-title"
                    className="whitespace-pre-line text-center mt-5 font-medium"
                  >
                    Apakah anda ingin menghapus activity {'\n'}{' '}
                    <b>{`"${item.title}"`}</b>?
                  </h1>

                  <div className="flex justify-center mt-10 font-medium gap-8">
                    <button
                      data-cy="modal-delete-cancel-button"
                      className="bg-slate-200 py-3 px-10 rounded-full w-32 flex justify-center"
                      onClick={close}
                    >
                      Batal
                    </button>
                    <button
                      data-cy="modal-delete-confirm-button"
                      className="disabled:bg-red-300 bg-red-500 text-white py-3 px-10 rounded-full w-32 flex justify-center"
                      onClick={handleClick}
                      disabled={deleting}
                    >
                      {deleting ? <Loader /> : 'Hapus'}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalDeleteActivity;
