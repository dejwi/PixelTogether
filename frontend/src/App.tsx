import React, {useState, useEffect} from 'react';
import ChooseRoom from "./components/ChooseRoom";
import {io} from 'socket.io-client';

interface cell {
  x: number,
  y: number,
  color: string
}

const App: React.FC = () => {
  const [board, setBoard] = useState<cell[]>([]);
  const [color, setColor] = useState('#000000');
  const [roomId, setRoomId] = useState('');
  const [socket, setSocket] = useState<any>();
  const [userCount, setUserCount] = useState(1);


  const rows = 40;
  const columns = 40;
  useEffect(()=> {
    const tempBoard: cell[] = [];

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        tempBoard.push({x: j, y: i, color: '#ffffff'});
      }
    }
    setBoard(tempBoard);
  },[]);

  useEffect(()=> {
    if(!roomId) return;
    // CHANGE TO LOCALHOST WHEN TESTING
    const _socket = io('http://localhost:4000', {query: {roomId} });
    _socket.on('draw', (data: {index: number, color: string}) => {
      const _board = [...board];
      _board[data.index].color = data.color;
      setBoard(_board);
    });
    _socket.on('userChange',(data: {count: number}) =>{
      setUserCount(data.count);
    });
    setSocket(_socket);
  },[roomId])

  const click = (data: cell) => {
    const index = data.x+data.y*columns;
    socket.emit('draw', {index, color});
  };

  return ( <div className='flex flex-col items-center justify-center h-screen bg-neutral-200'>
        <h1 className='text-5xl absolute top-2'>PixelTogether</h1>
        {!!roomId && <span>Users connect in room: {userCount}</span>}
        {!roomId ? <ChooseRoom setRoom={(val: string)=>setRoomId(val)}/> :
            <div className='flex flex-col items-center'>
              <input type='color' onChange={e=>setColor(e.target.value)}/>
              <div className={`grid w-[22rem] h-[22rem]`} style={{gridTemplateColumns: `repeat(${columns},1fr)`}}>
                {board.map(e => <div onClick={()=>click(e)} key={`x${e.x}y${e.y}${e.color}`} style={{background: e.color}} ></div>)}
              </div>
            </div> }

      </div>
  );
};

export default App;
