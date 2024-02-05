import { useCallback } from 'react';
import { useMyPresence, useOthers } from '@/liveblocks.config';
import LiveCursors from './cursor/LiveCursors';

const Live = () => {
	const others = useOthers();
	const [{ cursor }, updateMyPresence] = useMyPresence() as any;

	const handlePointerMove = useCallback((event: React.PointerEvent) => {
		event.preventDefault();

		const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
		const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

		updateMyPresence({ cursor: { x, y } });
	}, []);

	const handlePointerLeave = useCallback((event: React.PointerEvent) => {
		event.preventDefault();

		updateMyPresence({ cursor: null, message: null });
	}, []);

	const handlePointerDown = useCallback((event: React.PointerEvent) => {
		const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
		const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

		updateMyPresence({ cursor: { x, y } });
	}, []);

	return (
		<div
			onPointerMove={handlePointerMove}
			onPointerLeave={handlePointerLeave}
			onPointerDown={handlePointerDown}
			className='w-full h-screen flex items-center justify-center border-2 border-purple-400'
		>
			<h1 className='text-5xl text-white'>hello collaborators</h1>
			<LiveCursors others={others} />
		</div>
	);
};

export default Live;
