import { useCustomFormProvider } from '../../context/FormContext.jsx';
import { questionTypes } from '../../constants/questionTypes.jsx';
import { useMemo } from 'react';
import Select from '../../components/Form/Select.jsx';

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

  const handleOnChangeType = (value) => {
    setValue(`questions.${activeQuestion}.type`, value);
  };

  return (
    <div className='bg-white p-10 rounded-3xl h-2/5 shadow-md flex flex-col items-center justify-between'>
      <div className='w-full max-w-xs'>
        <Select
          label='Question Type'
          value={options.find((option) => option.value === currentType)}
          onChange={(value) => handleOnChangeType(value)}
          options={options}
        />
      </div>
    </div>
  );
};

export default QuestionOptions;
