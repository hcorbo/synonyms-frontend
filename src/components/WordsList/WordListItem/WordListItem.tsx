import React, { useState } from 'react';
import "./word_list_item.scss";
import ManageWordModal from "./ManageWordModal/ManageWordModal";
import { API } from "../../../api/api";
import customAxios from "../../../api/customAxios";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";
import ReactTooltip from "react-tooltip";

export interface WordListItemProps {
    word: string;
    fetchWords: () => void;
}

function WordListItem({ word, fetchWords }: WordListItemProps) {
    const [openDangerAlertModal, setOpenDangerAlertModal] = useState<boolean>(false);

    const deleteWord = async () => {
        const response = await customAxios.delete(`${API.endpoint}/words/${word}`);

        if (response) {
            fetchWords();
        }
    };

    return (
        <div className={"word-list-item"}>

            <div className="flex-row flex-1">
                <div>
                    {word}
                </div>
                <ManageWordModal word={word}/>
                <i className="material-icons-outlined delete-icon"
                   onClick={(event) => {
                       event.stopPropagation();
                       setOpenDangerAlertModal(true);
                   }}
                   data-tip={"Delete word"}>
                    delete
                </i>
            </div>

            <ConfirmationModal open={openDangerAlertModal}
                               setOpen={setOpenDangerAlertModal}
                               title={"Deletion"}
                               text={"Are you sure you want to delete selected word?"}
                               onConfirm={async () => {
                                   await deleteWord();
                                   setOpenDangerAlertModal(false);
                               }}/>

            <ReactTooltip place={"bottom"} backgroundColor={"#484b6a"}/>
        </div>
    );
}

export default WordListItem;
