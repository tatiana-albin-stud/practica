import * as React from 'react';

//mui imports
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { UtilityButton } from 'lib/components/Buttons/buttons';
import { Stack } from '@mui/system';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useWindowDimensions from 'hooks/useWindowDimensions';

const ConfirmModal = (props) => {
    const { t } = useTranslation();
    const { vw } = useWindowDimensions();

    const {
        text,
        setOpen,
        handleClose = () => {
            setOpen(false);
        },
        open = false,
        buttonYes = t('YES'),
        buttonYesLoading = false,
        buttonYesDisabled = false,
        onClickButtonYes = () => handleClose(),
        buttonNo = t('NO'),
        buttonNoLoading = false,
        buttonNoDisabled = false,
        onClickButtonNo = () => handleClose(),
        maxWidth = '600px',
    } = props;

    return (
        <Dialog
            onClose={handleClose}
            open={open}
            sx={{
                '& .MuiDialogContent-root': {
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    paddingTop: '2rem',
                },
                '& .MuiPaper-root': {
                    maxWidth: maxWidth,
                    borderRadius: '15px',
                },
                '& .MuiTypography-root': {
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    paddingBottom: '8px',
                    paddingTop: '0',
                    fontSize: '18.7px',
                    fontWeight: '600',
                    color: 'black',
                    opacity: '62%',
                },
                '& .MuiDialogActions-root': {
                    paddingTop: '0',
                },
            }}
        >
            <DialogContent sx={{ padding: vw >= 640 ? '1rem' : '0.5rem' }}>
                <Typography variant="logoutPopover" sx={{ pb: vw >= 640 ? '1rem' : '0.5rem' }}>
                    {text}
                </Typography>
            </DialogContent>

            {(Boolean(buttonYes) !== null || Boolean(buttonNo) !== null) && (
                <DialogActions sx={{ justifyContent: 'center', paddingBottom: '2rem' }}>
                    <Stack direction="row" spacing={2}>
                        {Boolean(buttonYes) && (
                            <UtilityButton
                                autoFocus
                                color="red"
                                variant="outlined"
                                onClick={onClickButtonYes}
                                disabled={buttonYesDisabled}
                                loading={buttonYesLoading}
                            >
                                {buttonYes}
                            </UtilityButton>
                        )}

                        {Boolean(buttonNo) && (
                            <UtilityButton
                                autoFocus
                                color="blue"
                                variant="outlined"
                                onClick={onClickButtonNo}
                                disabled={buttonNoDisabled}
                                loading={buttonNoLoading}
                            >
                                {buttonNo}
                            </UtilityButton>
                        )}
                    </Stack>
                </DialogActions>
            )}
        </Dialog>
    );
};

export default ConfirmModal;
