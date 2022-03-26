import { useParams, json, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { getArticleData } from "~/data/getArticleData";
import {
	Container,
	Center,
	Loader,
	Space,
	Title,
	Text,
	Image,
	Paper,
} from "@mantine/core";
import showdown from "showdown";
export const loader: LoaderFunction = async ({ params }) => {
	if (!params.blogId) {
		throw new Response(`No blog ID provided`, {
			status: 404,
		});
	}
	let data = await getArticleData({ id: params.blogId });
	if (!data) {
		throw new Response(`No data found by ID ${params.blogId}`, {
			status: 404,
		});
	}
	const converter = new showdown.Converter();
	return json({
		...data.data,
		content: converter.makeHtml(
			data.data.content
		),
	});
};
export default function blog() {
	const params = useParams();
	const { id, title, description, content, update_time, tag } =
		useLoaderData();
	return (
		<>
			<Image
				src="https://image-1300030499.cos.ap-beijing.myqcloud.com/dalinome.jpeg"
				height="300px"
			/>
			<Container padding="xs">
				<Paper shadow="xs" radius="md" withBorder>
					<Title
						order={1}
						align="center"
						style={{ color: "blue", height: 70 }}
					>
						<Text
							sx={{
								"@media (max-width: 500px)": {
									fontSize: "25px",
								},
								"@media (min-width: 500px)": {
									fontSize: "35px",
								},
							}}
							component="span"
							align="center"
							variant="gradient"
							gradient={{ from: "cyan", to: "lime", deg: 45 }}
							size="xl"
							weight={700}
							style={{
								fontFamily: "Greycliff CF, sans-serif",
								margin: "auto",
							}}
						>
							{title}
						</Text>
					</Title>
					<Text>
						<div dangerouslySetInnerHTML={{ __html: content }} />
					</Text>
				</Paper>
			</Container>
		</>
	);
}
