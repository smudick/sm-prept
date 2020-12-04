import React from 'react';
import { Button } from 'reactstrap';
import NewCardForm from '../Forms/NewCardForm';
import AppModal from '../AppModal';

export default function QuestionCard({ card, showAnswer, getUpdatedCard }) {
  return (
    <>
    <div className='d-flex flex-column m-3 w-25'>
    <h1>Question:</h1>
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title'>{card.question}</h5>
        <Button className='ml-1' id={card.firebaseKey} onClick={(e) => showAnswer(e)}> Answer</Button>
        <AppModal title={'Edit This Flash Card'} buttonLabel={'Edit This Flash Card'} buttonColor={'primary'}>
          <NewCardForm card={card} onUpdate={getUpdatedCard} />
        </AppModal>
      </div>
    </div>
    </div>
    </>
  );
}
