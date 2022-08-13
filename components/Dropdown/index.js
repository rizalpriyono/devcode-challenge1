import { useState, Fragment, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';
const priority = [
  { name: 'Very High', color: '#ED4C5C', datacy: 'very-high' },
  { name: 'High', color: '#F8A541', datacy: 'high' },
  { name: 'Medium', color: '#00A790', datacy: 'normal' },
  { name: 'Low', color: '#428BC1', datacy: 'low' },
  { name: 'Very Low', color: '#8942C1', datacy: 'very-low' },
];

const DropdownPriority = (props) => {
  const [selected, setSelected] = useState(priority[0]);
  const { changePriority, itemPriority } = props;

  const handleChange = (value) => {
    setSelected(value);
    changePriority(value);
  };

  useEffect(() => {
    let x = priority.findIndex((item) => item.datacy === itemPriority);
    setSelected(priority[x]);
  }, [itemPriority]);
  return (
    <>
      <div className="w-72">
        <Listbox value={selected} onChange={handleChange}>
          <div className="relative mt-1">
            <Listbox.Button
              data-cy="modal-add-priority-dropdown"
              className="relative w-full p-4 text-left border-2 border-slate-300 rounded-lg flex items-center"
            >
              <div
                className={`w-4 h-4 rounded-full mr-4`}
                style={{ backgroundColor: selected.color }}
              ></div>
              <span className="block truncate">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {priority.map((priority, priorityIdx) => (
                  <Listbox.Option
                    key={priorityIdx}
                    data-cy={`modal-add-priority-item`}
                    className={({ active }) =>
                      `relative cursor-default select-none py-4 pl-4 pr-4 ${
                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                      }`
                    }
                    value={priority}
                  >
                    {({ selected }) => (
                      <div className="flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full mr-4`}
                          style={{ backgroundColor: priority.color }}
                        ></div>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {priority.name}
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
      </div>
    </>
  );
};

export default DropdownPriority;
