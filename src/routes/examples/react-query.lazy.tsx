import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Daum, TopAnimeResponse } from '@/types/jikan';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/examples/react-query')({
	component: ReactQueryExample,
});

function ReactQueryExample() {
	const { data, isLoading, isFetching, isPending, isStale, refetch } =
		useQuery<Daum[]>({
			queryKey: ['animes'],
			queryFn: async () =>
				await fetch('https://api.jikan.moe/v4/top/anime')
					.then(res => {
						if (!res.ok) {
							throw new Error('Network response was not ok');
						}
						return res.json();
					})
					.then((data: TopAnimeResponse) => data.data),
			refetchInterval: 10000,
			staleTime: 5000,
		});

	return (
		<div className="p-6 flex flex-col gap-4">
			<h3>React Query Example</h3>
			<Card>
				<div className="flex p-6 flex-row gap-2">
					<Badge
						variant={isLoading ? 'default' : 'outline'}
						className=" rounded-md"
					>
						<p>{'Loading'}</p>
					</Badge>
					<Badge
						variant={isFetching ? 'default' : 'outline'}
						className=" rounded-md"
					>
						<p>{'Fetching'}</p>
					</Badge>
					<Badge
						variant={isPending ? 'default' : 'outline'}
						className=" rounded-md"
					>
						<p>{'Pending'}</p>
					</Badge>
					<Badge
						variant={isStale ? 'default' : 'outline'}
						className=" rounded-md"
					>
						<p>{'Stale'}</p>
					</Badge>
				</div>
				<CardContent>
					<ScrollArea className="max-h-52 rounded-md border h-52">
						<ScrollBar />
						<Table>
							<TableCaption>
								A List of the current Top Animes
							</TableCaption>
							<TableHeader>
								<TableRow>
									<TableHead className="">Place</TableHead>
									<TableHead>Name</TableHead>
									<TableHead>Episodes</TableHead>
									<TableHead>Image</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{data?.map((anime, index) => {
									return (
										<TableRow key={anime.mal_id}>
											<TableCell className="">
												{anime.rank}
											</TableCell>
											<TableCell>{anime.title}</TableCell>
											<TableCell>
												{anime.episodes}
											</TableCell>
											<TableCell>
												<img
													src={
														anime.images.webp
															.small_image_url
													}
													alt={anime.title}
												/>
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</ScrollArea>
				</CardContent>
				<CardFooter className="gap-2">
					<Button
						onClick={() => {
							refetch();
						}}
					>
						Refresh
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
