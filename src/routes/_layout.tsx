import { Sidebar } from '@/components/sidebar/sidebar';
import { useSidebarToggle } from '@/hooks/use-sidebar-toggle';
import { useStore } from '@/hooks/use-store';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout')({
	component: LayoutComponent,
});

function LayoutComponent() {
	const authenticated = useAuth();
	const sidebar = useStore(useSidebarToggle, state => state);

	if (!sidebar) return null;
	if (!authenticated) return null;
	return (
		<>
			<Sidebar />
			<main
				className={cn(
					'min-h-full bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300',
					sidebar?.isOpen === false ? 'lg:ml-[90px]' : 'lg:ml-72',
				)}
			>
				<Outlet />
			</main>
		</>
	);
}
