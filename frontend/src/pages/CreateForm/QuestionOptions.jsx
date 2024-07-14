import { useCustomFormProvider } from '../../context/FormContext.jsx';
import { questionTypes } from '../../constants/questionTypes.jsx';
import { useMemo } from 'react';
import Select from '../../components/Form/Select.jsx';
import MediumButton from '../../components/Buttons/MediumButton.jsx';
import SmallButton from '../../components/Buttons/SmallButton.jsx';

const QuestionOptions = () => {
  const { setValue, activeQuestion, watch } = useCustomFormProvider();

  const currentType = watch(`questions.${activeQuestion}.type`);
  const type = useMemo(() => questionTypes.find((questionType) => questionType.value === currentType), [currentType]);

  const options = questionTypes.map((questionType) => ({
    value: questionType.value,
    label: (
      <div>
        {questionType.icon}
        {questionType.label}
      </div>
    ),
  }));

  return (
    <div className='bg-white p-10 rounded-3xl w-full h-2/5 shadow-md flex flex-col items-center justify-between'>
      <div className='w-full max-w-xs'>
        <Select
          label='Question Type'
          value={options.find((option) => option.value === currentType)}
          onChange={(value) => {
            setValue(`questions.${activeQuestion}.type`, value);
          }}
          options={options}
        />
      </div>
      <SmallButton text='save' />
    </div>
  );
};

export default QuestionOptions;