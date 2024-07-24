import React, { useEffect, useState } from 'react';
import assets from '../assets/assest'; // Ensure this path is correct
import './Home.css';

const Home = () => {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [first, setFirst] = useState(null);
    const [second, setSecond] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [matched,Setmatched]=useState(false)
    const[restart,setRestart] =useState(false)


    const datas = [
        { image: assets.iron, matched: false },
        { image: assets.bat, matched: false },
        { image: assets.superman, matched: false },
        { image: assets.spider, matched: false },
        { image: assets.hulk, matched: false },
        { image: assets.dp, matched: false }
    ];

    const shuffleDatas = () => {
        const shufflecards = [...datas, ...datas]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }));
        setCards(shufflecards);
        setTurns(0);
        setFirst(null);
        setSecond(null);
        Setmatched(false)
        setRestart(false)
    };

    const handleClick = (card) => {
        if (!disabled) {
            if (!first) {
                setFirst(card);
                setRestart(true)
            } else if (!second && card.id !== first.id) {
                setSecond(card);
            }
        }
    };
    useEffect(()=>{
        if(cards.length >0 && cards.every((card)=>card.matched)){
           setTimeout(() => {
            Setmatched(true)

           }, 1000) 
        }
  

        if(matched){
            console.log('completed');
        }

    },[matched,cards])

    

    useEffect(() => {
        if (first && second) {
            setDisabled(true);
            if (first.image === second.image) {
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.image === first.image) {
                            return { ...card, matched: true };
                        } else {
                            return card;
                        }
                    });
                });
                resetTurn();
            } else {
                setTimeout(() => resetTurn(), 1000);
            }
        }
    }, [first, second]);


  

    useEffect(()=>{
        shuffleDatas()

    },[])

    const resetTurn = () => {
        setFirst(null);
        setSecond(null);
        setTurns(prevTurns => prevTurns + 1);
        setDisabled(false);
    };

    return (
        <div className='main'>
          {!matched ? <div className='whole'>
               
                <h1>Super Cards</h1>
             
                <div className='card-main'>
             
                    {cards.map((card) => (
                        <div 
                            key={card.id} 
                            className='card'
                            onClick={() => handleClick(card)}
                        >
                            <img 
                                src={card.matched || card === first || card === second ? card.image : assets.back} 
                                alt="card" 
                            />
                        </div>
                    ))}
                    
                </div>
                <div className='function'>
                <h2>Turns: {turns}</h2>
                {restart ?  <button  onClick={shuffleDatas}>Restart</button >: ""}
                </div>

            </div>:
            <div className='complete'>
                <div className='main'>
                <h1>"Completed"</h1>
                <h2>you took {turns} turns  to finish this!</h2>

                <button onClick={shuffleDatas}>New Game</button>
                </div>
                <p>This game is developed by <a  target='_blank' href="https://www.linkedin.com/in/mano-bharathi-bkp123/">Mano Bharathi</a></p>
            </div>}
        </div>
    );
};

export default Home;
