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
      <>
        {questionType.icon}
        {questionType.label}
      </>
    ),
  }));

  return (
    <div className="dropdown dropdown-end scale-150 absolute top-10 right-12">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img id={profileIconId} alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        {/* <li>
        <Link to={'/profile'} className="justify-between">
          Profile
          <span className="badge">New</span>
        </Link>
      </li> */}
        <li>
          <Link to={`/user/${userId}/account`} id={accountSettingsId}>
            Settings
          </Link>
        </li>
        <li>
          <button onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
    < div className = 'w-full max-w-xs' >
      <Select
        label='Question Type'
        value={options.find((option) => option.value === currentType)}
        onChange={(value) => setValue(`questions.${activeQuestion}.type`, value)}
        options={options}
      />
      <SmallButton text='save' />
    </div >
  );
};

export default QuestionOptions;
