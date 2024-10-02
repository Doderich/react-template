import { createFileRoute, useRouter } from '@tanstack/react-router';
// import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/_layout/')({
	component: Index,
});

function Index() {
	const router = useRouter();
	return (
		<div>
			<h1>Index</h1>
			{/* <h1>{t('index')}</h1> */}
			<button
				onClick={() =>
					router.navigate({
						to: '/dutyPlaner',
					})
				}
			>
				Go to dashboard
			</button>
		</div>
	);
}
