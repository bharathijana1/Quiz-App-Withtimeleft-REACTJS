import React, { useEffect, useState } from 'react'
import QuizQuestionAndAnswer from './QuizQuestionAndAnswer.jsx'

const QuizApp = () => {
    
    const [ currentQuestion, setCurrentQuestion ] = useState(0);
    const [ score, setScore ] = useState(0);
    const [ showScore, setShowScore ] = useState(false);
    const [ timer, setTimer ] = useState(60);
    const handleAnswerClick = (selectedOption) => {
        if(selectedOption == QuizQuestionAndAnswer[currentQuestion].answer){
            setScore((previousScore) => previousScore + 1)
        }
        if(currentQuestion < QuizQuestionAndAnswer.length -1){
            setCurrentQuestion((previousQuestion) => previousQuestion + 1);
            setTimer(60)
        }else{
            setShowScore(true)
        }

    }
    const handleRestart = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setTimer(60)
    }
    useEffect(()=> {
        let interval;
        if(timer > 0 && !showScore ){
            interval = setInterval(()=> {
                setTimer((prevtimer)=> prevtimer -1)
            },1000);
        }
        else{
            clearInterval(interval);
            setShowScore(true)
        }
        return ()=> clearInterval(interval)
    },[timer, showScore])

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
        {showScore?
        <div className='flex flex-col p-3 py-8 rounded-lg border border-amber-300 bg-amber-200 w-full md:w-3/4 lg:w-1/2 justify-center items-center gap-2'>
        <h1 className='text-2xl font-medium p-5'>Your Score: <strong className='font-2xl'>{score}/{QuizQuestionAndAnswer.length }</strong> </h1>
        <button className='bg-amber-400 hover:bg-amber-500 text-xl font-semibold rounded-md px-4 p-2 capitalize' onClick={handleRestart}>Restart</button>
        </div> :
        <div className='border bg-rose-50 border-rose-300 flex flex-col justify-center items-center w-full md:w-3/4 lg:w-1/2 gap-2 m-3  rounded-lg'>
        <h1 className='text-2xl pt-4 font-semibold text-rose-600'>Question {currentQuestion + 1}</h1>
            <h1 className='text-2xl font-medium py-6 p-2'>{QuizQuestionAndAnswer[currentQuestion].question}</h1>
            <div className='flex gap-5 flex-wrap justify-center items-center m-2'>
            {QuizQuestionAndAnswer[currentQuestion].options.map((opt, index) => (
                <>
                <button onClick={()=> handleAnswerClick(opt)} className='border bg-rose-600 hover:bg-rose-700 font-medium capitalize text-white text-lg md:text-xl p-2 rounded-md px-4' key={index}>
                    {opt}
                </button>
                </>
            ))}
            </div>
            
            <h1 className='text-xl p-3 capitalize'>Time left: <strong className='capitalize'>{timer} sec</strong></h1>
            

        </div>
        }
        
      
    </div>
  )
}

export default QuizApp
