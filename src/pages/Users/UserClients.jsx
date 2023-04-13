import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import { Typography } from '@mui/material';
// import AddClient from './AddClient';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { PrimaryButton } from 'lib/components/Buttons/buttons';
import FilterListIcon from '@mui/icons-material/FilterList';
import styles from './UserZones.module.scss';

import Search from 'lib/components/Search/Search';
import FilterClients from 'pages/Clients/modals/FilterClients';
import { LoadingSpinner, PageLayout } from 'lib';
import { useUser } from 'hooks/useUser';
import { CustomTable } from 'lib';

import { ClientsAPI, UsersAPI } from 'api_darex';
import { Helmet } from 'react-helmet';
import { useCallback } from 'react';

const UserClients = () => {
    const { t } = useTranslation();
    const navigate = useHistory();
    const { id } = useParams();
    const [search, setSearch] = useState('');
    const [openFilterClients, setOpenFilterClients] = useState(false);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingUser, setLoadingUser] = useState(true);
    const [triggerSearch, setTriggerSearch] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [triggerRefetch, setTriggerRefetch] = useState(false);
    const [triggerFilter, setTriggerFilter] = useState(false);
    const [user, setUser] = useState(null);
    const { can } = useUser();
    const [filterData, setFilterData] = useState({
        brandId: '',
        userId: Number(id),
    });
    const [isFilter, setIsFilter] = useState(false);

    const resetSearch = () => {
        setIsSearch(false);
        setSearch('');
    };

    const resetFilter = () => {
        setIsFilter(false);
        setFilterData({ brandId: '', userId: Number(id) });
    };

    const getUserById = useCallback(() => {
        UsersAPI.getById(id).then((res) => {
            setUser(res.data);
            setLoadingUser(false);
        });
    }, [id]);

    useEffect(() => {
        getUserById();
    }, [getUserById]);

    const labels = [
        {
            id: 'client',
            label: 'Client',
            minWidth: 10,
        },
        {
            id: 'phone',
            label: t('Phone'),
            minWidth: 10,
        },
        {
            id: 'user',
            label: t('Adviser'),
            minWidth: 10,
        },
        {
            id: 'brand',
            label: t('Brands'),
            minWidth: 10,
        },
        {
            id: 'createdAt',
            label: t('Creation date'),
            minWidth: 10,
        },
        {
            id: 'actions',
            minWidth: 10,
        },
    ];

    const cellModifier = (row, column, value) => {
        if (column.id === 'client') {
            if (row.type === 'Individual')
                return (
                    <Typography variant="tableContent">
                        {row.firstName} {row.lastName}
                    </Typography>
                );
            else return <Typography variant="tableContent">{row.firmName}</Typography>;
        }
        if (column.id === 'brand') {
            return <Typography variant="tableContent">{value.name}</Typography>;
        }
        if (column.id === 'createdAt') {
            return <Typography variant="tableContent">{dayjs(value).format('DD MMM YYYY')}</Typography>;
        }
        if (column.id === 'actions') {
            return (
                can(15) && (
                    <div className={styles.actionArrow} onClick={() => navigate.push(`/clients/${row.clientsBrandId}`)}>
                        <ChevronRightIcon />
                    </div>
                )
            );
        }
        if (column.id === 'user') {
            return (
                <Typography variant="tableContent">
                    {row.user.name} {row.user.firstName}
                </Typography>
            );
        }
        if (column.id === 'phone') {
            if (row.type === 'Juridic')
                if (row.Contacts[0]?.phone === null) return <div></div>;
                else return <Typography variant="tableContent">{row?.Contacts[0]?.phone}</Typography>;
            else return <Typography variant="tableContent">{row?.phone}</Typography>;
        }
        return <Typography variant="tableContent">{value}</Typography>;
    };

    const getDynamicData = () => {
        return {
            func: ClientsAPI.getByUserIdBrands,
            additionalId: user.id,
            setState: (data) =>
                data.map((client) => ({
                    ...client.Clients,
                    brandId: client.brandId,
                    userId: client.userId,
                    clientsBrandId: client.id,
                    brand: client.Brand,
                    user: client.User,
                    clientUID: client.id,
                })),
            filterSearch: (data) => data.filter((item) => item.userId === Number(id)),
            filterFilter: null,
        };
    };

    return (
        <>
            <Helmet>
                <title>RaisisAuto CRM :: {t('User clients')}</title>
            </Helmet>

            {loadingUser ? (
                <LoadingSpinner loading={loadingUser} margin="0 auto" />
            ) : (
                <PageLayout
                    title={`${t('Clients')} - ${user?.firstName ? user.firstName : ''}`}
                    backArrow
                    actionArea={
                        <>
                            <Search
                                search={search}
                                setSearch={setSearch}
                                isSearch={isSearch}
                                setIsSearch={setIsSearch}
                                triggerRefetch={triggerRefetch}
                                setTriggerRefetch={setTriggerRefetch}
                                triggerSearch={triggerSearch}
                                setTriggerSearch={setTriggerSearch}
                                setterFunction={setClients}
                                setLoading={setLoading}
                                nameToFind={t('Search client')}
                                setIsFilter={setIsFilter}
                                resetFilter={resetFilter}
                            />
                            <PrimaryButton
                                startIcon={<FilterListIcon />}
                                color="light"
                                onClick={() => setOpenFilterClients(true)}
                            >
                                {t('FILTER CLIENTS')}
                            </PrimaryButton>
                        </>
                    }
                >
                    <CustomTable
                        title={t('Clients')}
                        labels={labels}
                        loading={loading}
                        setLoading={setLoading}
                        tableData={clients}
                        cellModifier={cellModifier}
                        getterFunction={getDynamicData().func}
                        additionalId={getDynamicData().additionalId}
                        setState={getDynamicData().setState}
                        setterFunction={setClients}
                        withPagination={true}
                        triggerRefetch={triggerRefetch}
                        triggerSearch={triggerSearch}
                        triggerFilter={triggerFilter}
                        isSearch={isSearch}
                        search={search}
                        customKey="clientUID"
                        searchFunction={ClientsAPI.searchClients}
                        filterSearch={getDynamicData().filterSearch}
                        setTriggerFilter={setTriggerFilter}
                        isFilter={isFilter}
                        filterFilter={getDynamicData().filterFilter}
                        filterFunction={ClientsAPI.filterClients}
                        filterData={filterData}
                    />
                </PageLayout>
            )}

            <FilterClients
                open={openFilterClients}
                setOpen={setOpenFilterClients}
                filterData={filterData}
                setFilterData={setFilterData}
                triggerFilter={triggerFilter}
                setTriggerFilter={setTriggerFilter}
                triggerRefetch={triggerRefetch}
                setTriggerRefetch={setTriggerRefetch}
                setIsFilter={setIsFilter}
                setLoading={setLoading}
                setData={setClients}
                resetSearch={resetSearch}
                resetFilter={resetFilter}
                isFilter={isFilter}
                noUser={true}
                userState={user}
            />
        </>
    );
};

export default UserClients;
