import React from 'react';
import { useTranslation } from 'react-i18next';
import versionsInfo from './versionsInfo';
import styles from './versions.module.scss';
import { Divider, Typography } from '@mui/material';
import LoupeIcon from '@mui/icons-material/Loupe';
import BugReportIcon from '@mui/icons-material/BugReport';

const Versions = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.pageContainer}>
            <div className={styles.componentWrapper}>
                {versionsInfo.map((version, id) => (
                    <section key={version.version}>
                        {id !== 0 && <Divider light />}
                        <div className={styles.headerContainer}>
                            <div className={styles.titleContainer}>
                                <Typography variant="clientContactedTimesBox" backgroundColor="#5b80ba">
                                    {version.typeVersioning}
                                </Typography>
                                <Typography variant="pageTitle">
                                    {t('Version')}:<span className={styles.versionFont}>{version.version}</span>
                                </Typography>
                            </div>
                        </div>
                        <div className={styles.detailsWrapper}>
                            {version.description !== '' && (
                                <Typography variant="userHeader" style={{ padding: '10px' }}>
                                    {t(`${version.description}`)}
                                </Typography>
                            )}
                            {version.features.length > 0 && (
                                <div className={styles.featuresArea}>
                                    <Typography variant="h6">{t('Features')}:</Typography>
                                    <Divider style={{ width: '40%' }} />
                                    <div className={styles.listOfFeatures}>
                                        {version.features.map((feature) => (
                                            <Typography
                                                key={feature}
                                                variant="clientDetailsInfo"
                                                direction="row"
                                                alignItems="center"
                                            >
                                                <LoupeIcon fontSize="inherit" sx={{ marginRight: 1, color: 'green' }} />
                                                {t(`${feature}`)}
                                            </Typography>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {version.hasOwnProperty('bugsFixed') && version.bugsFixed.length > 0 && (
                                <div className={styles.bugsArea}>
                                    <Typography variant="h6">{t('Bugs fixed')}:</Typography>
                                    <Divider style={{ width: '36%' }} />
                                    <div className={styles.listOfBugs}>
                                        {version.bugsFixed.map((bug) => (
                                            <Typography
                                                key={bug}
                                                variant="clientDetailsInfo"
                                                direction="row"
                                                alignItems="center"
                                            >
                                                <BugReportIcon
                                                    fontSize="inherit"
                                                    sx={{ marginRight: 1, color: 'red' }}
                                                />
                                                {t(`${bug}`)}
                                            </Typography>
                                        ))}
                                    </div>
                                </div>
                            )}{' '}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};

export default Versions;
