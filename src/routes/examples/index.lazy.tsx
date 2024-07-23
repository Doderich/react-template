import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/examples/')({
	component: () => <div>Hello /examples/!</div>,
});
