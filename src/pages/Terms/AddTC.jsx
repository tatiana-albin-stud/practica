import React from "react";
import { CustomDialog } from "lib";
import { TextField } from "lib";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { PoliticsAPI } from "api_inbusiness";

import styles from "./Stilizare.module.scss";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
} from "draft-js";

import { Editor } from "react-draft-wysiwyg";

import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";

const AddTC = ({ open, setOpen, dataForEdit }) => {
  const formRef = useRef();

  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );
  const [initialHTML, setInitialHTML] = React.useState(``);

  const INITIAL_FORM_STATE = {
    title: dataForEdit?.name ? dataForEdit.name : "",
    //subtitle: dataForEdit?.name ? dataForEdit.name : "",
  };

  const FORM_VALIDATION = yup.object().shape({
    title: yup.string().trim().required("Titlul articolului este obligatoriu"),
    // subtitle: yup
    //   .string()
    //   .trim()
    //   .required("Subtitlul articolului este obligatoriu"),
  });

  const handleAddTerms = (values) => {
    const objForApi = { ...values };
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const htmlContent = draftToHtml(rawContentState);
    objForApi.description = htmlContent;
    PoliticsAPI.create(objForApi).then((res) => {
      if (res.ok === true) {
        toast.success("Poltica a fost adaugata cu succes");
        setOpen(false);
      } else {
        toast.error("A intervenit o eroare");
      }
    });
    console.log(objForApi);
  };

  const handleSubmitButton = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const handleEditTerms = (values) => {
    console.log(values);
  };

  const htmlToDraftBlocks = (html) => {
    const blocksFromHtml = htmlToDraft(html);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    const editorState = EditorState.createWithContent(contentState);
    return editorState;
  };

  React.useEffect(() => {
    setEditorState(htmlToDraftBlocks(initialHTML));
  }, [initialHTML]);

  return (
    <CustomDialog
      open={open}
      setOpen={setOpen}
      title={dataForEdit ? "Editează formular" : "Adauga Termeni si Conditii"}
      buttonFinish="Finalizeaza"
      onClickButtonFinish={handleSubmitButton}
      buttonClose="Inapoi"
      maxWidth="650px"
      width="100%"
    >
      <Formik
        innerRef={formRef}
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values) => {
          handleAddTerms(values);
        }}
      >
        <Form className={styles.formWrapper}>
          <div className={styles.textFieldsWrapper}>
            <TextField name="title" label="Title*" size="medium" />
            {/* <TextField name="subtitle" label="Subtitle*" size="medium" /> */}

            <Editor
              name="description"
              placeholder="Introduceti articolul"
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editor-class"
              editorState={editorState}
              onEditorStateChange={setEditorState}
              toolbarStyle={{
                borderRadius: 10,
                border: "1px solid #cbcbcb",
              }}
              editorStyle={{
                borderRadius: 10,
                border: "1px solid #cbcbcb",
                padding: "0px 8px",
                overflowY: "auto",
                maxHeight: "30vh",
                minHeight: "30vh",
              }}
              preserveSelectionOnBlur={true}
            />
          </div>
        </Form>
      </Formik>
    </CustomDialog>
  );
};

export default AddTC;
