import getAlias from "@/lib/getAlias";
import { redirect } from "next/navigation";

export default async function showShortUrlSite(
    { params } : {params: {alias: string} }
) {
    console.log("Alias received in route:", params.alias);
    const url_obj = await getAlias(params.alias);

    if (!url_obj) {
        return <p>Something went wrong</p>;
    }

    console.log("Alias Data:", url_obj);
    console.log(url_obj.url);
    redirect(url_obj.url);
    // redirect(`https://www.google.com`);
}