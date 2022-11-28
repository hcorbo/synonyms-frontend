import React, { useCallback, useEffect, useState } from 'react';
import "./add_word_form.scss";
import InputField from "../../InputField/InputField";
import Button, { ButtonStyle } from "../../Button/Button";
import Modal from "../../Modal/Modal";
import customAxios from "../../../api/customAxios";
import { SwalUtils } from "../../../utils/swal_utils";

interface AddWordFormProps {
    fetchWords: () => void;
}

interface Word {
    text: string,
    synonym: string
}

type WordFormErrors = Partial<Record<keyof Word, string>>;

function AddWordForm({ fetchWords }: AddWordFormProps) {
    const [newWord, setNewWord] = useState<Word | null>(null);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [addAsync, setAddAsync] = useState<boolean>(false);
    const [formErrors, setFormErrors] = useState<WordFormErrors>({});

    const isFormValid = useCallback((): boolean => {
        const errors: WordFormErrors = {};
        let regexOnlyLetters = /^[A-Za-z]+$/;

        if (!newWord || !newWord.text) {
            errors.text = "Word is required.";
        } else if (!regexOnlyLetters.test(newWord.text)) {
            errors.text = "Word can contain only letters.";
        }

        if (!newWord?.synonym) {
            errors.synonym = "Synonym is required.";
        } else if (!regexOnlyLetters.test(newWord.synonym)) {
            errors.synonym = "Synonym can contain only letters.";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }, [newWord]);

    const addWord = useCallback(async () => {

        if (!isFormValid()) {
            return;
        }

        setAddAsync(true);
        customAxios.post(`/add_synonyms`, {
            ...newWord,
        }).then(res => {
            if (res) {
                fetchWords();
                setShowForm(false);
                SwalUtils.showSuccessSwalToast("Successfully added.");
            }
        }).finally(() => setAddAsync(false));
    }, [fetchWords, isFormValid, newWord]);

    useEffect(() => {
        //reset form
        if (showForm) {
            setNewWord({ text: "", synonym: "" });
            setFormErrors({});
        }
    }, [showForm]);

    return (
        <div className="add-word-container">
            <div className="add-word-text-btn" onClick={() => setShowForm(true)}>+ Add new word</div>
            <Modal open={showForm} setOpen={setShowForm} childClassName={"add-word-modal"}>
                <div className="modal-header">
                    <div className="title">Adding word</div>
                </div>
                <div className="modal-body">
                    <div className={"add-word-form"}>
                        <InputField value={newWord?.text ?? ""}
                                    onChange={(e) => {
                                        setNewWord({ text: e.target.value, synonym: newWord?.synonym ?? "" });
                                    }}
                                    label={"Word:"}
                                    required={true}
                                    className="word-input"
                                    error={formErrors.text}
                        />
                        <InputField value={newWord?.synonym ?? ""}
                                    onChange={(e) => {
                                        setNewWord({ synonym: e.target.value, text: newWord?.text ?? "" });
                                    }}
                                    label={"Synonym:"}
                                    required={true}
                                    className="synonym-input"
                                    error={formErrors.synonym}
                        />
                    </div>
                </div>
                <div className="modal-footer">
                    <Button buttonStyle={ButtonStyle.Transparent}
                            onClick={() => setShowForm(false)}>
                            <span className="text-medium text-14 text-uppercase">
                                Cancel
                            </span>
                    </Button>
                    <Button buttonStyle={ButtonStyle.Blue}
                            onClick={addWord}
                            loading={addAsync}>
                        <span className="text-medium text-14 text-uppercase">
                            Add
                        </span>
                    </Button>
                </div>
            </Modal>
        </div>
    );
}

export default AddWordForm;
