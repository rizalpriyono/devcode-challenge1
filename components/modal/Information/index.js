import { Transition, Dialog } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/outline';
import axios from 'axios';
import Loader from '../../Loader';

const ModalInformation = (props) => {
  const { open, close } = props;
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
                  data-cy="modal-information"
                  className="w-full max-w-md transform overflow-hidden rounded-3xl bg-white p-5 text-left align-middle shadow-xl transition-all"
                >
                  <div className="flex items-center">
                    <InformationCircleIcon
                      data-cy="modal-information-icon"
                      className="w-7 h-7 text-green-500 mr-4"
                    />
                    <p data-cy="modal-information-title">
                      Activity berhasil dihapus
                    </p>
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

export default ModalInformation;
