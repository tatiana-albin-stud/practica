import React from 'react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { TextField } from 'lib';
import { CustomDialog } from 'lib';
import { toast } from 'react-toastify';

import { UsersAPI } from 'api_darex';
import styles from './Profile.module.scss';

const ChangeName = ({ open, setOpen, userData, getUserById }) => {
    const { t } = useTranslation();
    const formRef = useRef();

    const INITIAL_FORM_STATE = {
        firstName: userData.firstName,
        name: userData.name,
    };

    const FORM_VALIDATION = yup.object().shape({
        firstName: yup
            .string()
            .typeError(t('The first name is not valid!'))
            .trim()
            .min(3, t('The first name must contain at least 3 characters!'))
            .required(t('The first name is mandatory!')),
        name: yup
            .string()
            .typeError(t('This last name is not valid!'))
            .trim()
            .min(3, t('The last name must contain at least 3 characters!'))
            .required(t('The last name is mandatory!')),
    });

    const onSubmitFunc = (values) => {
        const newFormShape = {
            ...values,
            roleId: userData.roleId,
            workingPointId: userData.workingPointId,
            UserBrand: userData.UserBrand,
        };

        UsersAPI.update(newFormShape, userData.id).then((res) => {
            if (res.ok === true) {
                getUserById();
                setOpen(false);
                toast.success(t('User has been updated successfully!'));
            } else {
                toast.error(t('Something went wrong! User could not been updated!'));
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
            title={t('Change last name/first name')}
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
                        <TextField name="name" label={`${t('Last Name')}`} size="medium" />
                        <TextField name="firstName" label={`${t('First Name')}`} size="medium" />
                    </div>
                </Form>
            </Formik>
        </CustomDialog>
    );
};

export default ChangeName;
