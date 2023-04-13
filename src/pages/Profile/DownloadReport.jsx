import React from 'react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { DatePicker } from 'lib';
import { CustomDialog } from 'lib';
import { toast } from 'react-toastify';

import { UsersAPI } from 'api_darex';
import styles from './Profile.module.scss';

const ChangeName = ({ open, setOpen }) => {
    const { t } = useTranslation();
    const formRef = useRef();

    const INITIAL_FORM_STATE = {
        startDate: new Date(),
        endDate: new Date(),
    };

    const FORM_VALIDATION = yup.object().shape({
        startDate: yup.date().required(t('Start date is required!')),
        endDate: yup
            .date()
            .test({
                name: 'greaterThen',
                exclusive: false,
                params: {},
                message: t('End date should be greater then start date!'),
                test: (value, context) => value >= context.parent.startDate,
            })
            .required(t('End date is required!')),
    });

    const onSubmitFunc = (values) => {
        UsersAPI.getReport(values).then((res) => {
            if (res.ok) {
                const id = res.data;
                UsersAPI.downloadReport(id).then((res) => {
                    if (res.ok) {
                        const url = window.URL.createObjectURL(new Blob([res.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', id);
                        document.body.appendChild(link);
                        link.click();
                        link.parentNode.removeChild(link);
                        setOpen(false);
                        toast.success(t(`Report downloaded successfully!`));
                    } else {
                        toast.error(t(`Report could't be downloaded!`));
                    }
                });
            } else {
                toast.error(t(`Report could't be downloaded!`));
            }
        });
    };

    const handleSubmit = () => {
        if (formRef.current) {
            formRef.current.handleSubmit();
        }
    };

    return (
        <CustomDialog
            open={open}
            setOpen={setOpen}
            title={t('Download report')}
            buttonClose={t('BACK')}
            buttonFinish={t('COMPLETE')}
            onClickButtonFinish={handleSubmit}
            width="580px"
        >
            <Formik
                innerRef={formRef}
                initialValues={{
                    ...INITIAL_FORM_STATE,
                }}
                validationSchema={FORM_VALIDATION}
                onSubmit={(values) => onSubmitFunc(values)}
            >
                <Form>
                    <div className={styles.changeWrapper}>
                        <DatePicker name="startDate" label={`${t('Start date')}`} />
                        <DatePicker name="endDate" label={`${t('End date')}`} />
                    </div>
                </Form>
            </Formik>
        </CustomDialog>
    );
};

export default ChangeName;
