import ArticleCard from "~/comps/ArticleCard";
import { Container, Center, Loader, Space, Title, Text, Image } from "@mantine/core";
import { getArticleData } from "../../data/getArticleData";
import type { LoaderFunction } from "remix";
import { json,useLoaderData } from "remix";

export const loader: LoaderFunction = async ({ params }) => {
	const data = await getArticleData({offset:0,count:10 });
	if (!data) {
	  throw new Response(`No client found by ID ${params.clientId}`, {
		status: 404,
	  });
	}
  
	return json(data);
  };
  
export default function Index() {
	const { data } = useLoaderData();
	return (
		<>
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
					Have fun for yourself!
				</Text>
			</Title>
			{data && data.map((item: any, idx: number) => (
				<Container padding="xs" key={idx}>
					<Center style={{ margin: "auto" }}>
						<ArticleCard article={item} />
					</Center>
					{idx !== data.length - 1 && <Space h="xl" />}
				</Container>
			))}
			<Container padding="xs">
				<Center style={{ width: 315, height: 80, margin: "auto" }}>
					<Loader variant="dots" />
				</Center>
			</Container>
		</>
	);
}
