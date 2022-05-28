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
                Enter room ID:
                <input type='text' placeholder='Room ID....' value={roomId} onChange={e=>setRoomId(e.target.value)}/>
                <span className='text-xs text-neutral-500'>Share it to your friends!</span>
            </label>
            <button type='submit'>Submit</button>
        </form>
    </div>)
};

export default ChooseRoom;
