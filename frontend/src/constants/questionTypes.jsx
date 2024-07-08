import { TbListLetters } from 'react-icons/tb';
import { MdShortText } from 'react-icons/md';
import { LuCircleSlash2 } from 'react-icons/lu';
import { RiListCheck3 } from 'react-icons/ri';
import React from 'react';

const SquaredIcon = ({ icon, color, number }) => {
  return (
    <span className={`rounded p-1 ${color} text-gray-900 flex items-center gap-2 text-xs`}>
      {icon}
      {number}
    </span>
  );
};

export const questionTypes = [
  {
    value: 'TextQuestion',
    label: 'Simple Question',
    icon: <SquaredIcon icon={<MdShortText size={16} />} color='bg-green-300' />,
  },
  {
    value: 'MultipleChoiceQuestion',
    label: 'Multiple Choice Question',
    icon: <SquaredIcon icon={<TbListLetters size={16} />} color='bg-yellow-300' />,
  },
  {
    value: 'SingleChoiceQuestion',
    label: 'Single Choice Question',
    icon: <SquaredIcon icon={<RiListCheck3 size={16} />} color='bg-purple-300' />,
  },
  {
    value: 'YesNoQuestion',
    label: 'Yes/No Question',
    icon: <SquaredIcon icon={<LuCircleSlash2 size={16} />} color='bg-orange-300' />,
  },
];
