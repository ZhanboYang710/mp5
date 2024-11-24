"use server";
import { UrlAlias } from "@/types";
import getCollection, { UrlAlias_COLLECTION } from "@/db";

export default async function getAlias(
    input_alias: string
): Promise<UrlAlias | null> {
    const aliasCollection = await getCollection(UrlAlias_COLLECTION);
    const alias_record = await aliasCollection.findOne({ alias: input_alias });

    // handle when the url has not been aliased
    if (!alias_record) {
        console.log("Alias not found:", input_alias);
        return null
    }

    // put the UrlAlias from database into the type structure
    const url_alias: UrlAlias = {
        id: alias_record._id.toHexString(),
        url: alias_record.url,
        alias: alias_record.alias,
        shortened: alias_record.shortened,
    };

    console.log(url_alias);
    return url_alias;
}