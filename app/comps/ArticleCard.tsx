import {
	Card,
	Image,
	Text,
	Badge,
	Button,
	Group,
	useMantineTheme,
} from "@mantine/core";

export default function ArticleCard(props: { article: any }) {
	const theme = useMantineTheme();
	const { article = {} } = props;
	const {
		title = "",
		author = "",
		source = "",
		cover_image: coverImage = "",
		url = "",
		description = "",
	} = article;
	const secondaryColor =
		theme.colorScheme === "dark"
			? theme.colors.dark[1]
			: theme.colors.gray[7];
	return (
		<Card
			sx={{
				"&:hover": {
					backgroundColor: "#eee",
				},

				"@media (max-width: 500px)": {
					width: 315,
				},
				"@media (min-width: 500px)": {
					width: 800,
				},
			}}
			shadow="xl"
			padding="lg"
			component="a"
			target="_blank"
			href={url}
		>
			{coverImage && (
				<Card.Section>
					<Image src={coverImage} height={180} alt="Norway" />
				</Card.Section>
			)}

			<Group
				position="apart"
				style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
			>
				<Text
					lineClamp={1}
					weight={500}
				>
					{title}
				</Text>
				<Badge color="lime" variant="light">
					{source}
				</Badge>
			</Group>

			<Text
				size="sm"
				lineClamp={3}
				style={{ color: secondaryColor, lineHeight: 1.5 }}
			>
				{description}
			</Text>

			<Button
				variant="light"
				color="blue"
				fullWidth
				style={{ marginTop: 14 }}
			>
				查看更多内容
			</Button>
		</Card>
	);
}
