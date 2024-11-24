import getAlias from "@/lib/getAlias";
import { redirect } from "next/navigation";

export default async function showShortUrlSite(
    { params } : { params: Promise<{alias: string}> }
) {
    const alia_obj = await params;
    console.log("Alias received in route:", alia_obj.alias);
    const url_obj = await getAlias(alia_obj.alias);

    if (!url_obj) {
        return <p>Something went wrong</p>;
    }

    console.log("Alias Data:", url_obj);
    console.log(url_obj.url);
    redirect(url_obj.url);
    // redirect(`https://www.google.com`);
}