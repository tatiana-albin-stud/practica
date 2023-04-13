import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

import { Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { PrimaryButton } from 'lib/components/Buttons/buttons';

import Search from 'lib/components/Search/Search';
import { ActionButton } from 'lib/components/Buttons/buttons';
import { OffersAPI, UsersAPI } from 'api_darex';
import { Helmet } from 'react-helmet';
import RefuseOffer from '../Offer/modals/RefuseOffer';
import ConfirmModal from 'lib/components/Modals/ConfirmModal';
import ReOfferOffer from 'pages/Offer/modals/ReOfferOffer';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterOffers from 'pages/Offers/FilterOffers';
import styles from './UserZones.module.scss';

import { CustomTable, PageLayout, Tooltip } from 'lib';
import { useUser } from 'hooks/useUser';

const UserOffers = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const { id } = useParams();
    const [search, setSearch] = useState('');
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userState, setUserState] = useState(null);
    const [rowId, setRowId] = useState(null);
    const [openRefuseModal, setOpenRefuseModal] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openReOffer, setOpenReOffer] = useState(false);
    const [triggerRefetch, setTriggerRefetch] = useState(false);
    const [triggerSearch, setTriggerSearch] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const { can } = useUser();
    const [triggerFilter, setTriggerFilter] = useState(false);
    const { user } = useUser();
    const [filterData, setFilterData] = useState({
        clientBrandsId: '',
        brandId: user.roleId === '3' ? user.UserBrand[0].brandId : '',
        status: '',
        modelId: '',
    });
    const [isFilter, setIsFilter] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);

    const resetSearch = () => {
        setIsSearch(false);
        setSearch('');
    };

    const resetFilter = () => {
        setIsFilter(false);
        setFilterData({
            clientBrandsId: '',
            brandId: user.roleId === '3' ? user.UserBrand[0].brandId : '',
            status: '',
            modelId: '',
        });
    };

    const getUserById = () => {
        UsersAPI.getById(id).then((res) => {
            setUserState(res.data);
        });
    };

    useEffect(() => {
        getUserById(id);
    }, []);

    const labels = [
        {
            id: 'id',
            label: 'ID',
            minWidth: 10,
        },
        {
            id: 'ClientBrands',
            label: 'Client',
            minWidth: 10,
        },
        {
            id: 'brand',
            label: t('Brand'),
            minWidth: 10,
        },
        {
            id: 'OfferModel',
            label: t('Models'),
            minWidth: 10,
        },
        {
            id: 'status',
            label: 'Status',
            minWidth: 10,
        },
        {
            id: 'actions',
            label: t('Actions'),
            minWidth: 10,
        },
        {
            id: 'createdAt',
            label: t('Creation date'),
            minWidth: 10,
        },
        {
            id: 'view',
            minWidth: 10,
        },
    ];

    const cellModifier = (row, column, value) => {
        if (column.id === 'id') {
            return <Typography variant="tableContent">{row.autoincrement}</Typography>;
        }
        if (column.id === 'ClientBrands') {
            if (row.ClientBrands?.Clients.type === 'Juridic') {
                return <Typography variant="tableContent">{row.ClientBrands?.Clients.firmName}</Typography>;
            } else if (row.ClientBrands?.Clients.type === 'Individual') {
                return (
                    <Typography variant="tableContent">
                        {row.ClientBrands?.Clients.lastName} {row.ClientBrands.Clients.firstName}
                    </Typography>
                );
            }
        }
        if (column.id === 'OfferModel') {
            const uniqueValues = row.OfferModel.reduce((item, current) => {
                const value = item.find((item) => item.model.name === current.model.name);
                if (!value) {
                    return item.concat([current]);
                } else return item;
            }, []).map((item) => item.model.name);

            return (
                <Typography variant="tableContent">
                    {uniqueValues.map((item, index) => {
                        if (index === uniqueValues.length - 1) {
                            return <Typography variant="tableContent">{item}</Typography>;
                        } else {
                            return <Typography variant="tableContent">{`${item}, `}</Typography>;
                        }
                    })}
                </Typography>
            );
        }
        if (column.id === 'brand') {
            return (
                <Typography variant="tableContent">
                    {row.OfferModel[0].brandId === '1'
                        ? 'Nio'
                        : row.OfferModel[0].brandId === '2'
                        ? t('Tesla')
                        : row.OfferModel[0].brandId === '3'
                        ? t('Li')
                        : ''}
                </Typography>
            );
        }
        if (column.id === 'status') {
            return (
                <Typography variant="tableContent">
                    {value === 'Open'
                        ? t('Open')
                        : value === 'Refused'
                        ? t('Refused')
                        : value === 'Accepted'
                        ? t('Accepted')
                        : t('Reoffered')}
                </Typography>
            );
        }
        if (column.id === 'actions') {
            return (
                row.status === 'Open' && (
                    <div className={styles.actions}>
                        {can(5) && (
                            <ActionButton
                                onClick={() => {
                                    setRowId(row.id);
                                    setOpenConfirm(true);
                                }}
                                color="green"
                            >
                                {t('Accept')}
                            </ActionButton>
                        )}
                        {can(5) && (
                            <ActionButton
                                onClick={() => {
                                    setRowId(row.id);
                                    setOpenRefuseModal(true);
                                }}
                                color="red"
                            >
                                {t('Refuse')}
                            </ActionButton>
                        )}
                        {can(5) && (
                            <ActionButton
                                onClick={() => {
                                    setRowId(row.id);
                                    setOpenReOffer(true);
                                }}
                                color="blue"
                            >
                                {t('Rebid')}
                            </ActionButton>
                        )}
                    </div>
                )
            );
        }
        if (column.id === 'createdAt') {
            return <Typography variant="tableContent">{dayjs(value).format('DD MMM YYYY')}</Typography>;
        }
        if (column.id === 'view') {
            return (
                can(6) && (
                    <Tooltip position="left" textTip={<text>{t('View more details')}</text>} followCursor>
                        <div className={styles.actionArrow} onClick={() => history.push(`/offers/${row.id}`)}>
                            <ChevronRightIcon />
                        </div>
                    </Tooltip>
                )
            );
        }
        return <Typography variant="tableContent">{value}</Typography>;
    };

    const handleAccept = () => {
        OffersAPI.acceptOffer(rowId).then((res) => {
            if (res.ok) {
                setTriggerRefetch(!triggerRefetch);
                setOpenConfirm(false);
                toast.success(t('Offer was marked as accepted!'));
            } else {
                setOpenConfirm(false);
                toast.error(t('Something went wrong! Offer could not be marked as accepted!'));
            }
        });
    };

    const getDynamicData = () => {
        return {
            filterSearch: (data) => data.filter((item) => item.userId === Number(id)),
            filterFilter: (data) => data.filter((item) => item.userId === Number(id)),
        };
    };

    return (
        <>
            <Helmet>
                <title>RaisisAuto CRM :: {t('User offers')}</title>
            </Helmet>
            <PageLayout
                title={`${t('Offers')} - ${user?.firstName ? user.firstName : ''}`}
                backArrow
                actionArea={
                    <React.Fragment>
                        <Search
                            search={search}
                            setSearch={setSearch}
                            isSearch={isSearch}
                            setIsSearch={setIsSearch}
                            nameToFind={t('Search offer')}
                            triggerRefetch={triggerRefetch}
                            setTriggerRefetch={setTriggerRefetch}
                            triggerSearch={triggerSearch}
                            setTriggerSearch={setTriggerSearch}
                            setterFunction={setOffers}
                            setLoading={setLoading}
                        />
                        <PrimaryButton startIcon={<FilterListIcon />} color="light" onClick={() => setOpenFilter(true)}>
                            {t('FILTER OFFERS')}
                        </PrimaryButton>
                    </React.Fragment>
                }
            >
                <CustomTable
                    labels={labels}
                    loading={loading}
                    setLoading={setLoading}
                    tableData={offers}
                    cellModifier={cellModifier}
                    getterFunction={OffersAPI.getByUserId}
                    setterFunction={setOffers}
                    withPagination={true}
                    additionalId={id}
                    triggerRefetch={triggerRefetch}
                    triggerSearch={triggerSearch}
                    isSearch={isSearch}
                    search={search}
                    searchFunction={OffersAPI.searchOffers}
                    filterSearch={getDynamicData().filterSearch}
                    triggerFilter={triggerFilter}
                    setTriggerFilter={setTriggerFilter}
                    isFilter={isFilter}
                    filterFilter={getDynamicData().filterFilter}
                    filterFunction={OffersAPI.filterOffers}
                    filterData={filterData}
                />
            </PageLayout>
            <RefuseOffer
                open={openRefuseModal}
                setOpen={setOpenRefuseModal}
                rowId={rowId}
                triggerRefetch={triggerRefetch}
                setTriggerRefetch={setTriggerRefetch}
            />
            <ReOfferOffer open={openReOffer} setOpen={setOpenReOffer} rowId={rowId} />
            <ConfirmModal
                open={openConfirm}
                setOpen={setOpenConfirm}
                text={t('Are you sure you want to accept this offer?')}
                onClickButtonYes={() => handleAccept()}
            />
            {user && (
                <FilterOffers
                    open={openFilter}
                    setOpen={setOpenFilter}
                    filterData={filterData}
                    setFilterData={setFilterData}
                    triggerFilter={triggerFilter}
                    setTriggerFilter={setTriggerFilter}
                    triggerRefetch={triggerRefetch}
                    setTriggerRefetch={setTriggerRefetch}
                    setIsFilter={setIsFilter}
                    setLoading={setLoading}
                    setData={setOffers}
                    resetSearch={resetSearch}
                    resetFilter={resetFilter}
                    isFilter={isFilter}
                    userState={userState}
                />
            )}
        </>
    );
};

export default UserOffers;
