import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import style from './NewForm.module.css';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../../Utils/config';


const NewForm = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitData = async (data) => {
    console.log('Submitting form data:', data);
    try {
      const response = await fetch(`${baseUrl}/form`, {
        // REMEMBER TO UPDATE THE URL WITH REAL ONE FROM BACKEND
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to submit data');
      }
      console.log('Form data submitted successfully');
    } catch (error) {
      console.error('Error submitting form data:', error.message);
    }
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', answer: '' }]);
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = questions.map((q, i) => (i === index ? { ...q, question: value } : q));
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (index, value) => {
    const updatedQuestions = questions.map((q, i) => (i === index ? { ...q, answer: value } : q));
    setQuestions(updatedQuestions);
  };

  const handleCheckboxChange = (index) => {
    if (selectedQuestions.includes(index)) {
      setSelectedQuestions(selectedQuestions.filter((q) => q !== index));
    } else {
      setSelectedQuestions([...selectedQuestions, index]);
    }
  };

  const deleteSelectedQuestions = async () => {
    try {
      const deletedQuestionIds = [];
      for (const index of selectedQuestions) {
        const response = await fetch(`http://localhost:3002/questions/${questions[index].id}`, {
          method: 'DELETE',
        }); // REMEMBER TO UPDATE THE URL WITH REAL ONE FROM BACKEND

        if (!response.ok) {
          throw new Error(`Failed to delete question with index ${index}`);
        }
        deletedQuestionIds.push(questions[index].id);
      }
      console.log('Questions deleted successfully:', deletedQuestionIds);
      const updatedQuestions = questions.filter((_, index) => !selectedQuestions.includes(index));
      setQuestions(updatedQuestions);
      setSelectedQuestions([]);
    } catch (error) {
      console.error('Error deleting questions:', error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching questions');
      try {
        const response = await fetch(`${baseUrl}/form`);
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        console.log('Questions fetched:', data);
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={style.NewForm}>
      <div className={style.fixedHeader}>
        <span>Route / New Form</span>
        <br />
        <span className={style.workspaceText}>Workspace</span>
        <hr />
        <input className={style.inputFormName} type='text' placeholder='Form Name' />
      </div>

      <div className={style.parentContainer}>
        <div className={style.formContainer}>
          <form onSubmit={handleSubmit(submitData)}>
            {questions.map((q, index) => (
              <div key={index} className={style.questionContainer}>
                <input
                  type='text'
                  value={q.question}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                  placeholder={q.questions[0].text}
                />
                <input
                  type='text'
                  value={q.answer}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  placeholder='Write your answer here'
                />
                <input
                  type='checkbox'
                  onChange={() => handleCheckboxChange(index)}
                  checked={selectedQuestions.includes(index)}
                />
              </div>
            ))}

            <button className={style.addQuestion} type='button' onClick={addQuestion}>
              New Question
            </button>
            <button className={style.deleteBtn} type='button' onClick={deleteSelectedQuestions}>
              Delete Question
            </button>
            <input className={style.submit} type='submit' />
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewForm;
