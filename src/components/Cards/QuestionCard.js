import React from 'react';
import { Button } from 'reactstrap';
import NewCardForm from '../Forms/NewCardForm';
import AppModal from '../AppModal';

export default function QuestionCard({
  card,
  showAnswer,
  getUpdatedCard,
  removeCard,
}) {
  return (
    <>
      <div className='d-flex flex-column m-3 w-25'>
        <h1>Question:</h1>
        <div className='card'>
          <div className='card-body'>
            <h5 className='card-title'>{card.question}</h5>
            <div className='d-flex flex-column align-items-center'>
              <Button
                className='mb-1'
                id={card.firebaseKey}
                onClick={(e) => showAnswer(e)}
              >
                {' '}
                Answer
              </Button>
              <AppModal
                title={'Edit This Flash Card'}
                buttonLabel={'Edit This Flash Card'}
                buttonColor={'primary'}
              >
                <NewCardForm card={card} onUpdate={getUpdatedCard} />
              </AppModal>
              <Button
                className='mt-1 btn-danger'
                id={card.firebaseKey}
                onClick={(e) => removeCard(e)}
              >
                Delete Card
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
