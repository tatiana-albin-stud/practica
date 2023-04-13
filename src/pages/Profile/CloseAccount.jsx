import React from 'react';

import { useTranslation } from 'react-i18next';
import { CustomDialog } from 'lib';
import { Typography } from '@mui/material';
import styles from './Profile.module.scss';

const CloseAccount = ({ open, setOpen, userData }) => {
    const { t } = useTranslation();

    return (
        <CustomDialog
            open={open}
            setOpen={setOpen}
            title={t('Close the account')}
            buttonClose={t('BACK')}
            buttonFinish={t('COMPLETE')}
            onClickButtonFinish={() => {}}
            width="580px"
            styles={{
                textAlign: 'center',
                '& .MuiDialogContent-root': {
                    padding: '6px 0 14px 0',
                },
            }}
        >
            <Typography variant="profileAlertMessage">{t('This action is irreversible!')}</Typography>
        </CustomDialog>
    );
};

export default CloseAccount;
