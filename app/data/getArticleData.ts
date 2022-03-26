let MockData = require("./mock/article.json");
const isUndefined = (a: any) => typeof a === "undefined";
type ArticleRequestParams = { offset?: number; count?: number; id?: string };

type ArticleFormatData = {
	title: string;
	author: string;
	cover_image: string;
	description: string;
	url: string;
	source: string;
};
function ArticleDataFormater(e: any) {
	return {
		...e,
		author: e.owner,
		url: !!e.content ? e.id : e.out_url,
		source: e.src_cn,
	};
}

export async function getArticleData({
	offset,
	count,
	id,
}: ArticleRequestParams) {
	const host = "http://127.0.0.1:4000";

	let url = "";
	const isArticleList = !isUndefined(offset) && !isUndefined(count);
	if (!isUndefined(id)) {
		url = `${host}/api/article/get/?id=${id}`;
	}
	if (isArticleList) {
		url = `${host}/api/articlelist/get/?offset=${offset}&count=${count}`;
	}
	if (!url) {
		return null;
	}
	// return MockData
	const response = await fetch(url);
	const data = await response.json();
	if (isArticleList) {
		let formatData: ArticleFormatData[] =
			data.data.map(ArticleDataFormater);
		return { data: formatData };
	}
	return data;
}
