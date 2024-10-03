import { FC, useState } from 'react';
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { TrashIcon } from 'lucide-react';

export const DeleteDialog: FC<{
	onDelete: () => Promise<any>;
}> = ({ onDelete }) => {
	const [open, setOpen] = useState(false);
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button size={'icon'}>
					<TrashIcon />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you sure you want to delete this semester?
					</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogDescription>
					This action is irreversible. You will lose all data
					associated with this semester.
				</AlertDialogDescription>
				<AlertDialogFooter>
					<AlertDialogCancel asChild>
						<Button variant={'secondary'}>Cancel</Button>
					</AlertDialogCancel>
					<Button
						variant={'destructive'}
						onClick={async () => {
							await onDelete();
							setOpen(false);
						}}
					>
						Yes
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
