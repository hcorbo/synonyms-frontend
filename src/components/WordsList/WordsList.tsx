import React from 'react';
import "./words_list.scss";
import WordListItem from "./WordListItem/WordListItem";
import AddWordForm from "./AddWordForm/AddWordForm";
import Spinner from "../Spinner/Spinner";

export interface WordsListProps {
    words: Array<string>;
    fetchWords: () => void;
    async: boolean;
}

function WordsList({ words, fetchWords, async }: WordsListProps) {

    const renderWordsData = () => {

        if (!words.length) {
            return <div className={"p-16 flex-1 flex-center-both"}>No words found.</div>;

        }

        return (
            words.map((word, index) => {
                    return (
                        <WordListItem key={index} word={word} fetchWords={fetchWords}/>
                    );
                },
            )
        );
    };

    return (
        <div className="words-list">
            <AddWordForm fetchWords={fetchWords}/>
            {async ? (
                <Spinner/>
            ) : (
                renderWordsData()
            )}
        </div>
    );
}

export default WordsList;
