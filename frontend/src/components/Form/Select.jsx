import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { HiCheck, HiChevronDown } from 'react-icons/hi';
import { classNames } from '../../utils/utils.js';

const Select = ({ options, onChange, value, label }) => {
  return (
    <Listbox value={value} onChange={onChange}>
      <Label className='block '>{label}</Label>
      <div className='relative mt-2 '>
        <ListboxButton className='relative w-full cursor-default rounded-xl py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-neutral-600 sm:text-sm sm:leading-6'>
          <span className='flex truncate items-center gap-2'>{value?.label}</span>
          <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 rounded-xl '>
            <HiChevronDown className='h-5 w-5' aria-hidden='true' />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm'
        >
          {options.map((option) => (
            <ListboxOption
              key={option.value}
              className='text-gray-900 relative cursor-default select-none py-1 pl-3 pr-9 focus:bg-neutral-600 focus:text-white hover:bg-azure transition-all
              duration-500'
              // className={({ focus }) =>
              //   classNames(
              //     focus ? 'bg-neutral-600 text-white' : '',
              //     !focus ? 'text-gray-900' : '',
              //     'relative cursor-default select-none py-2 pl-3 pr-9',
              //   )
              // }
              value={option.value}
            >
              <>
                <span
                  className={classNames(
                    option?.value === value ? 'font-semibold' : 'font-normal',
                    'flex truncate items-center gap-2',
                  )}
                >
                  {option.label}
                </span>

                {option?.value === value?.value ? (
                  <span className={classNames('absolute inset-y-0 right-0 flex items-center pr-4')}>
                    <HiCheck />
                  </span>
                ) : null}
              </>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox >
  );
};

export default Select;
