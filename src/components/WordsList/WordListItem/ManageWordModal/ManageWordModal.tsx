import React, { useEffect, useState } from 'react';
import "./manage_word_modal.scss";
import Modal from "../../../Modal/Modal";
import Chip from "../../../Chip/Chip";
import { API } from "../../../../api/api";
import customAxios from "../../../../api/customAxios";
import ConfirmationModal from "../../../ConfirmationModal/ConfirmationModal";
import Spinner from "../../../Spinner/Spinner";

export interface ManageWordModalProps {
    word: string,
}

function ManageWordModal({ word }: ManageWordModalProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [synonyms, setSynonyms] = useState<Array<string>>([]);
    const [lengthOfNotTransitiveSynonyms, setLengthOfNotTransitiveSynonyms] = useState<number>(0);
    const [openDangerAlertModal, setOpenDangerAlertModal] = useState<boolean>(false);
    const [selectedSynonym, setSelectedSynonym] = useState<string>("");
    const [fetchAsync, setFetchAsync] = useState<boolean>(false);


    const fetchSynonyms = async (word: string) => {
        setFetchAsync(true);
        const response = await customAxios.get(`${API.endpoint}/synonyms/${word}`);

        if (response) {
            setSynonyms(response.data.synonyms);
            setLengthOfNotTransitiveSynonyms(response.data.lengthOfNotTransitiveSynonyms);
        }

        setFetchAsync(false);
    };

    const deleteSynonym = async (synonym: string) => {
        const response = await customAxios.delete(`${API.endpoint}/synonyms/${word}/${synonym}`);

        if (response) {
            await fetchSynonyms(word);
        }
    };

    useEffect(() => {
        if (open) {
            fetchSynonyms(word);
        }
    }, [open, word]);

    return (
        <>
            <div className="preview-text-btn" onClick={() => setOpen(true)}>
                Preview
            </div>

            <Modal open={open} setOpen={setOpen} childClassName={"manage-word-modal"}>
                <div className="modal-header">
                    <div className="flex-column">
                        <div className="synonyms-subtitle">Synonyms & Similar Words</div>
                    </div>
                    <i className="material-icons-outlined close-icon"
                       onClick={() => {
                           setOpen(false);
                       }}>
                        close
                    </i>
                </div>
                <div className="modal-body">
                    <div className="synonyms-list-container">
                        <div className="flex-column">
                            <div className="word-title">{word}</div>
                            {fetchAsync ? (
                                <Spinner size={14}/>
                            ) : (
                                !synonyms.length ? (
                                    <div className="no-synonyms-message">No synonyms found for selected word.</div>
                                ) : (
                                    <div className="synonyms-list">
                                        {synonyms.map((synonym, index) =>
                                            <Chip key={index}>
                                                <div className="synonym-text">{synonym}</div>
                                                {index < lengthOfNotTransitiveSynonyms && (
                                                    <i className="material-icons-outlined remove-synonym-icon"
                                                       onClick={async () => {
                                                           setSelectedSynonym(synonym);
                                                           setOpenDangerAlertModal(true);
                                                       }}>
                                                        close
                                                    </i>
                                                )}
                                            </Chip>,
                                        )}
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>

                <ConfirmationModal open={openDangerAlertModal}
                                   setOpen={setOpenDangerAlertModal}
                                   title={"Deletion"}
                                   text={"Are you sure you want to remove selected synonym?"}
                                   onConfirm={async () => {
                                       await deleteSynonym(selectedSynonym);
                                       setOpenDangerAlertModal(false);
                                       setSelectedSynonym("");
                                   }}/>
            </Modal>
        </>
    );
}

export default ManageWordModal;
