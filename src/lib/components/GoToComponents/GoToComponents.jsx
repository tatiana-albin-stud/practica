import React from 'react';
import styles from './GoToComponents.module.scss';
import { useHistory } from 'react-router-dom';
import { UtilityButton } from '../Buttons/buttons';

const GoToComponents = ({ children }) => {
    const history = useHistory();

    return !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? (
        <React.Fragment>
            <div className={styles['go-to-components']}>
                <span>&#8592;</span>
                <div className={styles.controlsWrapper}>
                    <UtilityButton variant="outlined" onClick={() => history.push('/components-overview')}>
                        Componente
                    </UtilityButton>
                    <UtilityButton variant="outlined" onClick={() => history.push('/form-test')}>
                        Componente form
                    </UtilityButton>
                </div>
            </div>
            {children}
        </React.Fragment>
    ) : (
        children
    );
};

export default GoToComponents;
