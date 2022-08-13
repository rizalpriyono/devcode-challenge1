import { PlusIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CardActivity from '../components/CardActivity';
import Head from 'next/head';
import Header from '../components/Header';
import Loader from '../components/Loader';
import ModalDeleteActivity from '../components/modal/DeleteActivity';
import ModalInformation from '../components/modal/Information';

export default function Home(props) {
  const [processAdd, setProcessAdd] = useState(false);
  const [dataActivity, setDataActivity] = useState([]);
  const [activitySelect, setActivitySelect] = useState({});
  const [modalDelete, setModalDelete] = useState(false);
  const [modalInfo, setModalInfo] = useState(false);

  const handleAddNewActivity = async () => {
    const payload = {
      title: 'New Activity',
      email: 'rizal@skyshi.io',
    };
    setProcessAdd(true);
    try {
      const response = await axios.post(
        'https://todo.api.devcode.gethired.id/activity-groups',
        payload
      );

      if (response) {
        getData();
      }
    } catch (err) {
      console.log(err);
    }
    setProcessAdd(false);
  };

  const getData = async () => {
    try {
      const res = await axios.get(
        'https://todo.api.devcode.gethired.id/activity-groups?email=rizal%40skyshi.io'
      );
      if (res) {
        setDataActivity(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelect = (item) => {
    setActivitySelect(item);
    setModalDelete(true);
  };

  const handleSuccessDelete = () => {
    getData();
    setModalInfo(true);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Head>
        <title>To Do List - Dashboard</title>
      </Head>
      <main>
        <Header />

        <section className="max-w-7xl mx-auto p-10">
          <header className="flex justify-between items-center">
            <h1 className="text-5xl font-bold" data-cy="activity-tittle">
              Activity
            </h1>
            <button
              className="flex justify-center w-48 h-16 px-8 rounded-full bg-sky-500 text-white items-center gap-3 font-semibold text-lg disabled:bg-sky-200"
              data-cy="activity-add-button"
              onClick={handleAddNewActivity}
              disabled={processAdd}
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
          </header>

          {dataActivity.length === 0 ? (
            <div className="flex justify-center mt-10 ">
              <figure
                data-cy="activity-empty-state"
                className="cursor-pointer"
                onClick={handleAddNewActivity}
              >
                <img
                  src={'/img/activity-empty-state.svg'}
                  alt="img-empty"
                  layout="fill"
                />
              </figure>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-6 mt-16">
              {dataActivity.map((item, i) => {
                const date = new Date(item.created_at);
                const month = date.toLocaleString('id', { month: 'long' });

                const newFormat = `${date.getDate()} ${month} ${date.getFullYear()}`;
                return (
                  <div key={i}>
                    <CardActivity
                      item={item}
                      index={i}
                      date={newFormat}
                      selectItem={() => handleSelect(item)}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <ModalDeleteActivity
          open={modalDelete}
          close={() => setModalDelete(false)}
          item={activitySelect}
          success={handleSuccessDelete}
        />

        <ModalInformation open={modalInfo} close={() => setModalInfo(false)} />
      </main>
    </>
  );
}
