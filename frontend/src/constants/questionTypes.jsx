import { TbListLetters } from 'react-icons/tb';
import { MdShortText } from 'react-icons/md';
import { LuCircleSlash2 } from 'react-icons/lu';
import { RiListCheck3 } from 'react-icons/ri';
import React from 'react';

const SquaredIcon = ({ icon, color, number }) => {
  return (
    <span className={`rounded p-1 ${color} text-black flex items-center gap-1 text-sm w-10`}>
      {icon}
      {number}
    </span>
  );
};

export const questionTypes = [
  {
    value: 'TextQuestion',
    label: 'Simple Question',
    icon: <SquaredIcon icon={<MdShortText size={20} />} color='bg-green-200' />,
  },
  {
    value: 'MultipleChoiceQuestion',
    label: 'Multiple Choice Question',
    icon: <SquaredIcon icon={<TbListLetters size={20} />} color='bg-yellow-200' />,
  },
  {
    value: 'SingleChoiceQuestion',
    label: 'Single Choice Question',
    icon: <SquaredIcon icon={<RiListCheck3 size={20} />} color='bg-purple-200' />,
  },
  {
    value: 'YesNoQuestion',
    label: 'Yes/No Question',
    icon: <SquaredIcon icon={<LuCircleSlash2 size={20} />} color='bg-orange-200' />,
  },
];
