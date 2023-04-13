import React from 'react';
import styles from './DocumentRow.module.scss';
import { IconButton, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const DocumentRow = ({ doc }) => {
    return (
        <div className={styles.document}>
            <Typography variant="clientListMember">{doc.name}</Typography>
            <Typography variant="clientListMember">{doc.imgName}</Typography>
            <a
                href="https://cdn.pixabay.com/photo/2016/02/28/12/55/boy-1226964_960_720.jpg"
                download
                style={{ textAlign: 'right' }}
            >
                <IconButton sx={{ '&:hover': { color: '#5B80BA' } }}>
                    <FileDownloadIcon />
                </IconButton>
            </a>
        </div>
    );
};

DocumentRow.propTypes = {
    doc: PropTypes.object.isRequired,
};

export default DocumentRow;
