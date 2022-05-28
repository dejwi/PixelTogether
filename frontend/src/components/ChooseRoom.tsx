import React, {useState} from 'react';

interface props {
    setRoom: (val: string) => void
}

const ChooseRoom: React.FC<props> = ({setRoom}) => {
    const [roomId, setRoomId] = useState('');

    const submit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!roomId) return;
        setRoom(roomId);
    };

    return (<div>
        <form onSubmit={submit} className='flex flex-col gap-5'>
            <label className='flex flex-col items-center'>
                Enter your room ID:
                <input type='text' placeholder='Room ID....' value={roomId} onChange={e=>setRoomId(e.target.value)}/>
            </label>
            <button type='submit'>Submit</button>
        </form>
    </div>)
};

export default ChooseRoom;
