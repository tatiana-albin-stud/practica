import React, { useState, useEffect, useRef } from 'react';

const FileUploadWrapper = (props) => {
    const { children, onUpload } = props;

    const inputRef = useRef();

    const [inputName, setInputName] = useState(null);

    useEffect(() => {
        const name = Math.random();
        setInputName(name);
    }, []);

    return (
        <div>
            {inputName != null && (
                <>
                    <span
                        onClick={() => {
                            if (inputRef?.current) {
                                inputRef.current.click();
                            }
                        }}
                    >
                        {children}
                    </span>

                    <input
                        id={`${inputName}-file-input`}
                        name={`${inputName}-file-input`}
                        type="file"
                        onChange={(e) => {
                            onUpload(e);
                            e.target.value = '';
                        }}
                        ref={inputRef}
                        multiple
                        accept=".jpg, .jpeg, .png, .pdf"
                        style={{
                            display: 'none',
                            visibility: 'hidden',
                            opacity: 0,
                            pointerEvents: 'none',
                        }}
                    />
                </>
            )}
        </div>
    );
};

export default FileUploadWrapper;
