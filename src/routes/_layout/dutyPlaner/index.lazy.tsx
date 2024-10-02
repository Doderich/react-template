import { createLazyFileRoute } from '@tanstack/react-router';
// import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute('/_layout/dutyPlaner/')({
	component: DutyPlaner,
});

function DutyPlaner() {
	// const { t } = useTranslation();

	return <div>DutyPlaner</div>;
}
