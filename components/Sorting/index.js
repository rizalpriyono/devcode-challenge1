import { useState, Fragment, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SwitchVerticalIcon } from '@heroicons/react/solid';

const sort = [
  { name: 'Terbaru', icon: '/sort-terbaru.svg' },
  { name: 'Terlama', icon: '/sort-terlama.svg' },
  { name: 'A-Z', icon: '/sort-az.svg' },
  { name: 'Z-A', icon: '/sort-za.svg' },
  {
    name: 'Belum Selesai',
    icon: '/sort-unfinish.svg',
  },
];

const Sorting = (props) => {
  const [selected, setSelected] = useState(sort[0]);

  const handleChange = (value) => {
    setSelected(value);
    props.changeSorting(value.name);
  };
  return (
    <>
      <Listbox value={selected} onChange={handleChange}>
        <div className="relative">
          <Listbox.Button
            data-cy="todo-sort-button"
            className="w-16 h-16 rounded-full border-2 border-slate-300 flex"
          >
            <SwitchVerticalIcon className="w-6 h-6 m-auto text-slate-500" />
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 w-64 overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {sort.map((sort, sortIdx) => (
                <Listbox.Option
                  key={sortIdx}
                  data-cy={`sort-selection`}
                  className={({ active }) =>
                    `relative cursor-default select-none py-4 pl-4 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={sort}
                >
                  {({ selected }) => (
                    <div className="flex items-center">
                      <img src={sort.icon} alt="icon" />
                      <span
                        className={`block truncate ml-4  text-lg ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {sort.name}
                      </span>
                      {selected ? (
                        <span className="flex items-center pl-3 text-amber-600 ml-auto">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </>
  );
};

export default Sorting;
