import React, {useState, useEffect} from 'react';

interface cell {
  x: number,
  y: number,
  color: string
}

const App: React.FC = () => {
  const [board, setBoard] = useState<cell[]>([]);
  const [color, setColor] = useState('#000000');

  const rows = 30;
  const columns = 30;
  useEffect(()=> {
    const tempBoard: cell[] = [];

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        tempBoard.push({x: j, y: i, color: '#ffffff'});
      }
    }
    setBoard(tempBoard);
  },[]);

  const click = (data: cell) => {
    const index = data.x+data.y*columns;
    const _board = [...board];
    _board[index].color = color;
    setBoard(_board);
  };

  return ( <div className='flex flex-col items-center justify-center h-screen bg-neutral-200'>
        <input type='color' onChange={e=>setColor(e.target.value)}/>
    <div className={`grid w-[30rem] h-[30rem] `} style={{gridTemplateColumns: `repeat(${columns},1fr)`}}>
      {board.map(e => <div onClick={()=>click(e)} key={`x${e.x}y${e.y}${e.color}`} style={{background: e.color}} ></div>)}
    </div>
      </div>
  );
};

export default App;
