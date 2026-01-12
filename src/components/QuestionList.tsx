import React, { useEffect, useState } from 'react';
import { getRandomQuestions } from '../data/mockData';

const QuestionList = ({ category }: { category: string }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await getRandomQuestions(category);
      setQuestions(data);
    };
    fetchQuestions();
  }, [category]);

  return (
    <div>
      {questions.map((question) => (
        <div key={question.id}>
          <h3>{question.text}</h3>
          <ul>
            {question.options.map((option: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal, index: React.Key) => (
              <li key={index}>{option}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;