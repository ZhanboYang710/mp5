"use server";
import getCollection, { UrlAlias_COLLECTION } from "@/db";
import { UrlAlias } from "@/types";
import getAlias from "./getAlias";
import checkUrl from "@/components/url-validation";

export default async function createNewAlias( 
    url: string, alias: string 
) : Promise<UrlAlias | null | string> {

    const valid_url = checkUrl(url);
    if (!valid_url) {
        return "Please input VALID url!";
    };

    // if alias is already there
    const url_object = await getAlias(alias);
    if ( url_object != null ) {
        const obj_url =  url_object.url;

        if (obj_url === url) {
            return url_object;
        } else {
            return "This Alias already exist!";
        }
    };
    
    const protocol = process.env.VERCEL_URL ? "https" : "http";
    const host_url = process.env.VERCEL_URL || "localhost:3000";
    const short = `${protocol}://${host_url}/shorturl/${alias}`;

    const urlObject = {
        url: url,
        alias: alias,
        shortened: short,
    };

    const aliasCollection = await getCollection(UrlAlias_COLLECTION);
    const result = await aliasCollection.insertOne(urlObject);

    // should the insert fail, return null
    if (!result.acknowledged) {
        return null;
    }
    
    // return the alias object with mongodb-assigned id
    // return {...urlObject, id: result.insertedId.toString() };
    return {    
        url: urlObject.url,
        alias: urlObject.alias,
        shortened: urlObject.shortened,
        id: result.insertedId.toString(),
    };
}