import styles from './DocumentRow.module.scss';
import React, { useState } from 'react';
import { Typography } from '@mui/material';
import ConfirmModal from '../Modals/ConfirmModal';
import PropTypes from 'prop-types';
import { RemoveButton, DownloadButton } from '../Buttons/buttons';
import { useUser } from 'hooks/useUser';
import { useTranslation } from 'react-i18next';

const DocumentRow = ({ doc, onDeleteFunc, permission, onDownloadFunction, canDelete }) => {
    const [openConfirm, setOpenConfirm] = useState(false);
    const { can } = useUser();
    const { t } = useTranslation();

    return (
        <>
            <div className={styles.document}>
                <div className={styles.textWrapper}>
                    <div className={styles.cellWrapperOne}>
                        <Typography variant="clientListMember">{doc.file.fileName}</Typography>
                    </div>
                    <div className={styles.cellWrapperTwo}>
                        <Typography variant="clientListMember" sx={{ wordBreak: 'break-all' }}>
                            {doc.file.name}
                        </Typography>
                    </div>
                </div>
                <div className={styles.bigCellWrapper}>
                    <DownloadButton onClick={() => onDownloadFunction(doc.file.path)} />
                    {can(permission) && (canDelete ?? true) && <RemoveButton onClick={() => setOpenConfirm(true)} />}
                </div>
            </div>

            <ConfirmModal
                text={t('Are you sure you want to delete this document?')}
                buttonYes={t('YES')}
                buttonNo={t('NO')}
                onClickButtonYes={() => {
                    onDeleteFunc({ doc });
                    setOpenConfirm(false);
                }}
                open={openConfirm}
                setOpen={setOpenConfirm}
            />
        </>
    );
};

DocumentRow.propTypes = {
    doc: PropTypes.object,
    onDeleteFunc: PropTypes.func,
};

DocumentRow.defaultProps = {
    doc: {},
    onDeleteFunc: () => {},
};

export default DocumentRow;
