import { createLazyFileRoute } from '@tanstack/react-router';
// import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute('/_layout/about/')({
	component: About,
});

function About() {
	// const { t } = useTranslation();

	return <div></div>;
}
