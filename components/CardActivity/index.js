import { useRouter } from 'next/router';
import { TrashIcon } from '@heroicons/react/outline';

const CardActivity = (props) => {
  const router = useRouter();

  const { item, date, selectItem } = props;
  return (
    <>
      <div
        className="bg-white rounded-xl p-8 h-64 shadow-lg flex flex-col "
        data-cy={`activity-item`}
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
            {date}
          </p>
          <button data-cy="activity-item-delete-button" onClick={selectItem}>
            <TrashIcon className="w-7" />
          </button>
        </div>
      </div>
    </>
  );
};

export default CardActivity;
