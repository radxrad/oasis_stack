import React from "react";
import { BsBook, BsQuestionCircle, BsCardText } from "react-icons/bs";

export default function QuestionFrontPage(props) {
  const iconMapping = {
    micropub: <BsBook />,
    question: <BsQuestionCircle />,
    answer: <BsCardText />,
  };
  const type = props.type;
  const title = props.title;
  const slug = props.slug;
  const num = props.ansNum;
  let time = props.time? Date.parse(props.time) :  new Date();
  try {
    time = time.toLocaleDateString();
  }

  catch {
    time = new Date().toLocaleDateString();
  }


  return (
      <div className ="questions card">
         <a href={`/question/${slug}`} className={`listitem__${type} listitem`}>
           {iconMapping[type]} {title}
           <p>{num > 1 ? `${num} answers` : `${num} answer`}</p>
             <p>{time}</p>
         </a>
      </div>

  );
}
