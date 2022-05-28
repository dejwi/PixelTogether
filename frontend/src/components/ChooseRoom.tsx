import React, {useState} from 'react';
import {motion} from "framer-motion";

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

    return (<motion.div initial={{y: -40, opacity: 0}} animate={{y:0, opacity:1}} exit={{y: 20, opacity:0, transition:{ type: 'spring', duration:0.3}}}
            transition={{type:'tween', duration: 0.4, ease:'easeOut'}}>
        <form onSubmit={submit} className='flex flex-col gap-5'>
            <label className='flex flex-col items-center'>
                Enter room ID:
                <input type='text' placeholder='Room ID....' value={roomId} onChange={e=>setRoomId(e.target.value)}/>
                <span className='text-xs text-neutral-500'>Share it to your friends!</span>
            </label>
            <button type='submit'>Submit</button>
        </form>
    </motion.div>)
};

export default ChooseRoom;
