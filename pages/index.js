import { PlusIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import CardActivity from '../components/CardActivity';
import Head from 'next/head';
import Header from '../components/Header';
import Loader from '../components/Loader';

export default function Home(props) {
  const router = useRouter();
  const { dataActivy } = props;
  const [processAdd, setProcessAdd] = useState(false);

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

      if (response.data) {
        router.replace(router.asPath);
      }
    } catch (err) {
      console.log(err);
    }
    setProcessAdd(false);
  };

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

          {dataActivy.length === 0 ? (
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
              {dataActivy.map((item, i) => {
                const date = new Date(item.created_at);

                return (
                  <div key={i}>
                    <CardActivity item={item} index={i} date={date} />
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const res = await axios.get(
    'https://todo.api.devcode.gethired.id/activity-groups?email=rizal%40skyshi.io'
  );
  const dataActivy = res.data;
  return {
    props: {
      dataActivy: dataActivy.data,
    },
  };
}
