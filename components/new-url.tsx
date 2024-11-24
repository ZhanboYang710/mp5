"use client";

import { Button, FormHelperText, TextField } from "@mui/material";
import { useState } from "react";
import createNewAlias from "@/lib/createNewAlias";

export default function NewAlias() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [error, setError] = useState("");
    const [short, setShort] = useState("");

    async function submitNewUrlAlias() {
        const create_res = await createNewAlias(url, alias);

        if (typeof create_res === "string") {
            setError(create_res);
            setShort("")
        } else if (typeof create_res === null ) {
            setError("generation failed");
            setShort("")
        } else {
            setUrl("");
            setAlias("");
            setError("Approved");
            if (create_res) {
                console.log(create_res);
                setShort(`here is your url: ${create_res.shortened}` );
            };
        }
    }

    return (
        <form
            className="w-96 rounded-xl p-4 bg-sky-300"
            onSubmit={(e) => {e.preventDefault(); submitNewUrlAlias();}}
        >
            <p className="text-lime-700">
                {error}
            </p>
            <TextField
                variant="filled"
                sx={{ backgroundColor: "grey", width: "100%"}}
                label = "URL"
                value = {url}
                onChange={(e) => setUrl(e.target.value)}
            />

            <TextField
                variant="filled"
                sx={{ backgroundColor: "white", width: "100%"}}
                label = "Alias"
                value = {alias}
                onChange={(e) => setAlias(e.target.value)}
            />

                {/* <FormHelperText>What&apos;s this monsterous url?</FormHelperText> */}
                <div className="w_full flex justify-center">
                    <Button
                        sx={{width:"80px"}}
                        variant="contained"
                        type="submit"
                        disabled={url.length === 0 || alias.length === 0}
                    >
                        Submit
                    </Button>
                </div>

                <div className="p-4 m-2 bg-sky-100 flex flex-col">
                    <p className="text-1g text-orange-500"> {short} </p>
                </div>
        </form>
    )
}