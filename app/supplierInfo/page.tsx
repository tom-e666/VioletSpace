'use client';

interface SupplierInfo {
    key: string;
    vendorId: string;
    vendorName: string;
    SupplyType: string;
    DueQtyASN: boolean;
    LateShipment: boolean;
}


import { Select, Table, Tag } from 'antd';
import { useMemo, useState, useEffect } from 'react';
const columns = [
    {
        title: 'Vendor ID',
        dataIndex: 'vendorId',
        key: 'vendorId',
    },
    {
        title: 'Vendor Name',
        dataIndex: 'vendorName',
        key: 'vendorName',
    },
    {
        title: 'Supply Type',
        dataIndex: 'SupplyType',
        key: 'SupplyType',
    },
    {
        title: 'Due Qty ASN',
        dataIndex: 'DueQtyASN',
        key: 'DueQtyASN',
        render: (isDueQtyASN: boolean) => {
            if (isDueQtyASN) {
                return (
                    <Tag color="green">Yes</Tag>
                )
            } else {
                return <Tag color="red">No</Tag>;
            }
        },

    },
    {
        title: 'Late Shipment',
        dataIndex: 'LateShipment',
        key: 'LateShipment',
        render: (text: boolean) => (text ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>),
    },
];
export default function supplierInfoPage() {

    const supplierInfo = useMemo(() => Array(20).fill(null).map((_, index) => ({
        key: `${index + 1}`,
        vendorId: `VD00${index + 1}`,
        vendorName: `Internal Supplier ${index + 1}`,
        SupplyType: ['Domestic', 'Foreign'][Math.floor(Math.random() * 2)],
        DueQtyASN: Math.random() > 0.5,
        LateShipment: Math.random() > 0.5,
    })), []);
    const [vendorIdFilter, setVendorIdFilter] = useState<string[]>(supplierInfo.map(info => info.vendorId));
    const [supplyTypeFilter, setSupplyTypeFilter] = useState<string[]>(supplierInfo.map(info => info.SupplyType));
    const [dueQtyASNFilter, setDueQtyASNFilter] = useState<boolean | null>(null);
    const [lateShipmentFilter, setLateShipmentFilter] = useState<boolean | null>(null);
    const [supplierInfoData, setSupplierInfoData] = useState<SupplierInfo[]>(supplierInfo);

    useEffect(() => {
        setSupplierInfoData(
            supplierInfo.filter(info =>
                vendorIdFilter.includes(info.vendorId) &&
                supplyTypeFilter.includes(info.SupplyType) &&
                (dueQtyASNFilter === null || info.DueQtyASN === dueQtyASNFilter) &&
                (lateShipmentFilter === null || info.LateShipment === lateShipmentFilter)
            )
        );
    }, [vendorIdFilter, supplyTypeFilter, dueQtyASNFilter, lateShipmentFilter, supplierInfo]);

    return (
        <div className="w-full h-full flex flex-col items-center p-2 m-2 bg-amber-50">
            <div
                id="filters"
                className="w-full flex flex-row gap-4 justify-center items-center mb-4"
            >
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '300px' }}
                    placeholder="Filter by Vendor ID"
                    value={vendorIdFilter}
                    onChange={setVendorIdFilter}
                    options={[...new Set(supplierInfo.map(info => info.vendorId))].map(vendorId => ({ label: vendorId, value: vendorId }))}
                    maxTagCount={1}
                    maxTagPlaceholder={omittedValues => `+${omittedValues.length} more`}
                />
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '300px' }}
                    placeholder="Filter by Supply Type"
                    value={supplyTypeFilter}
                    onChange={setSupplyTypeFilter}
                    options={[...new Set(supplierInfo.map(info => info.SupplyType))].map(supplyType => ({ label: supplyType, value: supplyType }))}
                    maxTagCount={1}
                    maxTagPlaceholder={omittedValues => `+${omittedValues.length} more`}
                />
                <Select
                    style={{ width: '150px' }}
                    placeholder="Due Qty ASN"
                    allowClear
                    onChange={value => setDueQtyASNFilter(value === undefined ? null : value)}
                    options={[
                        { label: 'Yes', value: true },
                        { label: 'No', value: false },
                    ]}
                    value={dueQtyASNFilter === null ? undefined : dueQtyASNFilter}
                />
                <Select
                    style={{ width: '150px' }}
                    placeholder="Late Shipment"
                    allowClear
                    onChange={value => setLateShipmentFilter(value === undefined ? null : value)}
                    options={[
                        { label: 'Yes', value: true },
                        { label: 'No', value: false },

                    ]}
                    value={lateShipmentFilter === null ? undefined : lateShipmentFilter}
                />
            </div>
            <Table dataSource={supplierInfoData} columns={columns} className={`w-full h-min-2/3 `} />
        </div>
    );
}

