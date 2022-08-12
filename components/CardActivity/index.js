import { useRouter } from 'next/router';
import { TrashIcon } from '@heroicons/react/outline';
import { Fragment, useState } from 'react';
import ModalDeleteActivity from '../modal/DeleteActivity';
import ModalInformation from '../modal/Information';

const CardActivity = (props) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  let optionsDate = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const handleSuccessDelete = () => {
    setOpenModal(false);
    setOpenInfo(true);
    router.replace(router.asPath);
  };
  const { index, item, date } = props;
  return (
    <>
      <div
        className="bg-white rounded-xl p-8 h-64 shadow-lg flex flex-col "
        data-cy={`activity-item-${index}`}
      >
        <div
          onClick={() => router.push(`/detail/${item.id}`)}
          className="flex-grow cursor-pointer"
        >
          <h1 className="text-xl font-bold" data-cy="activity-item-title">
            {item.title}
          </h1>
        </div>

        <div className="flex justify-between text-slate-400">
          <p className="text-lg font-medium" data-cy="activity-item-date">
            {date.toLocaleDateString('en-US', optionsDate)}
          </p>
          <button
            data-cy="activity-item-delete-button"
            onClick={() => setOpenModal(true)}
          >
            <TrashIcon className="w-7" />
          </button>
        </div>
      </div>

      <ModalDeleteActivity
        open={openModal}
        close={() => setOpenModal(false)}
        item={item}
        success={handleSuccessDelete}
      />

      {/* <ModalInformation open={openInfo} close={() => setOpenInfo(false)} /> */}
    </>
  );
};

export default CardActivity;
