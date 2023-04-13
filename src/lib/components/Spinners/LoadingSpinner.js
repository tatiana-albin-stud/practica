import React from 'react';
import styles from './loadingSpinner.module.scss';

const LoadingSpinner = ({ loading, margin }) => {
    if (loading) {
        return (
            <div
                style={{
                    margin,
                }}
                className={styles.loader}
            ></div>
        );
    }
};

export default LoadingSpinner;
