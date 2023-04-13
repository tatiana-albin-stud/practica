import React from 'react';
import styles from './TabsLayout.module.scss';
import { Box, Tabs, Tab } from '@mui/material';
import PropTypes from 'prop-types';
import useWindowDimensions from 'hooks/useWindowDimensions';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

/**
 * Custom table layout
 * @param {array} tabs - used to render different tab names, and components
 * @param {array} utility - used to render different utility components
 * @param {function} setTabName - used to set the tab state for a component higher in the render dom tree
 * @returns a custom header for the table, tables or other components
 */
const TabsLayout = ({
    utility,
    tabs,
    setTabName = () => {},
    withBoxShadow,
    withMarginTop,
    activeTab = 0,
    setActiveTab = () => {},
}) => {
    const { vw } = useWindowDimensions();

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const filteredTabs = tabs.filter((tab) => tab.render === true);

    return (
        <div
            className={`${styles.tabsWrapper} ${withBoxShadow ? styles.withBoxShadow : styles.noBoxShadow} ${
                withMarginTop && styles.withMarginTop
            }`}
        >
            <Box className={styles.boxWrapper}>
                <Tabs
                    value={activeTab}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    sx={{
                        '.css-1aquho2-MuiTabs-indicator': { backgroundColor: '#5B80BA' },
                    }}
                    className={styles.tabs}
                >
                    {filteredTabs?.map((tab, index) => {
                        return (
                            <Tab
                                key={tab.id}
                                onClick={() => setTabName(tab.label)}
                                label={tab.label}
                                disabled={tab.disabled ?? false}
                                {...a11yProps(index)}
                                sx={{
                                    fontFamily: ['Montserrat', 'sans-serif'].join(','),
                                    fontStyle: 'normal',
                                    lineHeight: '17px',
                                    fontWeight: 400,
                                    fontSize: vw > 640 ? '14px' : '12px',
                                    letterSpacing: '0.1px',
                                    color: 'rgba(0, 0, 0, 0.3)',
                                    textTransform: vw <= 640 && 'none',
                                    '&:hover': {
                                        color: '#5B80BA',
                                    },
                                    '&.Mui-selected': {
                                        color: '#5B80BA',
                                        fontWeight: 600,
                                    },
                                }}
                            />
                        );
                    })}
                </Tabs>
                <div className={styles.buttonWrapper}>
                    {utility &&
                        filteredTabs.length > 0 &&
                        filteredTabs[activeTab].hasUtility === true &&
                        utility?.map((item) => {
                            // Default render value is true
                            return (item.render ?? true) && <div key={item.id}>{item.component}</div>;
                        })}
                </div>
            </Box>
            {filteredTabs?.map((item, index) => {
                return (
                    <TabPanel value={activeTab} index={index} key={item.id}>
                        {item.component}
                    </TabPanel>
                );
            })}
        </div>
    );
};

export default TabsLayout;
