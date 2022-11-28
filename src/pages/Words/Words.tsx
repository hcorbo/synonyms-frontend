import React, { useCallback, useEffect, useState } from 'react';
import "./words.scss";
import WordsList from "../../components/WordsList/WordsList";
import InputField from "../../components/InputField/InputField";
import { useDebouncedValue } from "rooks";
import { API } from "../../api/api";
import customAxios from "../../api/customAxios";

function Words({}) {
    const [words, setWords] = useState<Array<string>>([]);
    const [search, setSearch] = useState<string>("");
    const [fetchAsync, setFetchAsync] = useState<boolean>(false);

    const [debouncedSearch] = useDebouncedValue(
        search,
        600,
    );

    const fetchWords = useCallback(async function getWords() {
        let url = new URL(`${API.endpoint}/words`);

        if (debouncedSearch != null) {
            url.searchParams.append("search", debouncedSearch);
        }

        setFetchAsync(true);
        const response = await customAxios.get(url.toString());

        if (response) {
            setWords(response.data);
        }

        setFetchAsync(false);
    }, [debouncedSearch]);

    useEffect(() => {
        fetchWords();
    }, [fetchWords]);

    return (
        <div className="words">
            <div className="header">
                <div className="header-background">
                    <div className="title">Synonyms</div>
                    <InputField value={search}
                                onChange={event => setSearch(event.target.value)}
                                placeholder={"Search"}
                                className="search-input"/>
                </div>
            </div>
            <WordsList words={words} fetchWords={fetchWords} async={fetchAsync}/>
        </div>
    );
}

export default Words;
