import React from 'react';
/*Importaciones del editor */
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

// escribe el 'html' en el editor
import { stateFromHTML } from 'draft-js-import-html';

const TextEditor = ({onEditorStateChange,onContentStateChange,editorChange,param }) => {
   
    return (
        <div className='editorContainer'>
            <Editor
                editorState={param}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
                onContentStateChange={onContentStateChange}
                onChange={editorChange}
            />

        </div>
    )
};

export default TextEditor;