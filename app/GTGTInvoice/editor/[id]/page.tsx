"use client"
import React, { useRef, useEffect } from "react";
import { useState } from "react";
import { useReactToPrint } from 'react-to-print';
import { getCharacterizedMoney } from "@/app/library/moneyConvert";
interface invoiceProps {
    invoiceTitle: string;
    invoiceDate: string;
    taxDepartmentId: string;
    invoiceId: string;
    number: string;
    retailerName: string;
    retailerTaxIdNumber: string;
    retailerAddress: string;
    retailerBankNumber: string;
    reailerBankName: string;
    consumerName: string;
    consumerDepartmentName: string;
    consumerTaxIdNumber: string;
    consumerAddress: string;
    consumerBankNumber: string;
    paymentMethod: string;
    consumerBankName: string;
    itemList: invoiceItemProps[];
    totalItemPrice: number;
    GTGTTaxRate: number;
    GTGTTaxAmount: number;
    totalPriceAfterTax: number;
    totalPriceByText: string;
}
interface invoiceItemProps {
    index: number;
    itemName: string;
    itemUnit: string;
    itemPrice: number;
    itemQuantity: number;
    itemTotalPrice: number;
}
export default function Page() {
    const [backgroundColor, setBackgroundColor] = useState("bg-black");
    const [textColor, setTextColor] = useState("text-white");
    const [fontSize, setFontSize] = useState("text-base");

    // Unified calculation functions
    const calculateItemTotal = (price: number, quantity: number): number => {
        return price * quantity;
    };

    const calculateTotalItemPrice = (itemList: invoiceItemProps[]): number => {
        return itemList.reduce((total, item) => total + item.itemTotalPrice, 0);
    };

    const calculateTaxAmount = (totalItemPrice: number, taxRate: number): number => {
        return totalItemPrice * taxRate;
    };

    const calculateTotalAfterTax = (totalItemPrice: number, taxAmount: number): number => {
        return totalItemPrice + taxAmount;
    };

    const recalculateInvoice = (updatedInvoice: invoiceProps): invoiceProps => {
        // Recalculate item totals
        const updatedItemList = updatedInvoice.itemList.map(item => ({
            ...item,
            itemTotalPrice: calculateItemTotal(item.itemPrice, item.itemQuantity)
        }));

        // Recalculate totals
        const totalItemPrice = calculateTotalItemPrice(updatedItemList);
        const GTGTTaxAmount = calculateTaxAmount(totalItemPrice, updatedInvoice.GTGTTaxRate);
        const totalPriceAfterTax = calculateTotalAfterTax(totalItemPrice, GTGTTaxAmount);
        const totalPriceByText = getCharacterizedMoney(totalPriceAfterTax);

        return {
            ...updatedInvoice,
            itemList: updatedItemList,
            totalItemPrice,
            GTGTTaxAmount,
            totalPriceAfterTax,
            totalPriceByText
        };
    };
    const obtainCurrentDate = () => {
        const now = new Date();
        return ` Ngày ${now.getDate()} tháng ${now.getMonth() + 1} năm ${now.getFullYear()}`;
    }
    const addNewItem = () => {
        const newItem: invoiceItemProps = {
            index: invoice.itemList.length + 1,
            itemName: "new Item",
            itemUnit: "Bao/Túi",
            itemPrice: 0,
            itemQuantity: 0,
            itemTotalPrice: 0
        };
        const updatedInvoice = { ...invoice, itemList: [...invoice.itemList, newItem] };
        setInvoice(recalculateInvoice(updatedInvoice));
    }
    const removeLastItem = () => {
        if (invoice.itemList.length > 0) {
            const newItemList = invoice.itemList.slice(0, -1);
            const updatedInvoice = { ...invoice, itemList: newItemList };
            setInvoice(recalculateInvoice(updatedInvoice));
        }
    }
    const [invoice, setInvoice] = useState<invoiceProps>(() => {
        const initialInvoice: invoiceProps = {
            invoiceTitle: "Hóa đơn GTGT",
            invoiceDate: obtainCurrentDate(),
            taxDepartmentId: "00AEAC8090AF6943A89DD5F1F345EFA07F",
            invoiceId: "1C24TPT",
            number: "00000134",
            retailerName: "DOANH NGHIỆP TƯ NHÂN PHƯỚC THÀNH 2",
            retailerTaxIdNumber: "1200363796",
            retailerAddress: "Ấp An Thiện, Xã An Cư, Huyện Cái Bè, Tỉnh Tiền Giang",
            retailerBankNumber: "...",
            reailerBankName: "...",
            consumerName: "...",
            consumerDepartmentName: "HỘ KINH DOANH BIỂN NGỌC",
            consumerTaxIdNumber: "8597592335-001",
            consumerAddress: "Tổ dân phố Mỹ Lương - Phường Ninh Thủy - Thị xã Ninh Hòa - Khánh Hòa.",
            consumerBankNumber: "...",
            paymentMethod: "Thanh toán tiền mặt",
            consumerBankName: "...",
            itemList: [{
                index: 1,
                itemName: "Gạo dẻo",
                itemUnit: "Bao",
                itemPrice: 375000,
                itemQuantity: 4,
                itemTotalPrice: 0 // Will be calculated
            }],
            totalItemPrice: 0, // Will be calculated
            GTGTTaxRate: 0.05,
            GTGTTaxAmount: 0, // Will be calculated
            totalPriceAfterTax: 0, // Will be calculated
            totalPriceByText: "" // Will be calculated
        };
        return recalculateInvoice(initialInvoice);
    });
    const getBeautifyEmptyCell = () => {

        return invoice.itemList.length < 5 ? 5 - invoice.itemList.length : 0;
    }

    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: `Invoice-${invoice.number}`,
        pageStyle: `
            @page {
                size: A4;
                margin: 10mm;
            }
            @media print {
                body {
                    background: white !important;
                    color: black !important;
                    font-size: 12px !important;
                }
                table {
                    font-size: 11px !important;
                }
                .print-compact {
                    line-height: 1.3 !important;
                }
                .print-header {
                    margin-bottom: 15px !important;
                }
                .print-title {
                    font-size: 18px !important;
                    margin-bottom: 8px !important;
                }
                .print-date {
                    font-size: 12px !important;
                    margin-bottom: 5px !important;
                }
                .print-tax-code {
                    font-size: 11px !important;
                    margin-bottom: 8px !important;
                }
            }
        `
    });
    const toggleBackgroundColor = () => {
        if (backgroundColor === "bg-black") {
            setBackgroundColor("bg-white");
            setTextColor("text-black");
        } else {
            setBackgroundColor("bg-black");
            setTextColor("text-white");
        }
    }
    const toggleFontSize = () => {
        if (fontSize === "text-base") {
            setFontSize("text-xl");
        } else {
            setFontSize("text-base");
        }
    }
    return (

        <div className=" h-full w-full bg-black flex flex-col font-sans">
            <div className="flex flex-row align-middle h-8 gap-4 divided border-gray-700 border-b-1">
                <div className="text-white hover:bg-white hover:text-black px-2 rounded-xl flex items-center">Save</div>
                <div className="text-white hover:bg-white hover:text-black px-2 rounded-xl flex items-center">Save</div>
                <div className="text-white hover:bg-white hover:text-black px-2 rounded-xl flex items-center"
                    onClick={toggleBackgroundColor}>background</div>
                <div className="text-white hover:bg-white hover:text-black px-2 rounded-xl flex items-center" onClick={toggleFontSize}>Text</div>
                <div className="text-white hover:bg-white hover:text-black px-2 rounded-xl flex items-center" onClick={addNewItem}>Add Item</div>
                <div className="text-white hover:bg-white hover:text-black px-2 rounded-xl flex items-center" onClick={removeLastItem}>Remove Last Item</div>
                <div className="text-white hover:bg-white hover:text-black px-2 rounded-xl flex items-center" onClick={handlePrint}>Print</div>            </div>
            <div ref={printRef} className={`w-full h-full ${backgroundColor} ${textColor} ${fontSize} print-compact overflow-hidden`}>
                <div>
                    <div className="grid grid-cols-3 items-start gap-4 p-4 print-header">
                        <div></div>
                        <div className="flex flex-col items-center">
                            <input className="text-center font-bold text-2xl w-full bg-transparent border-0 outline-none print-title mb-2"
                                value={invoice.invoiceTitle}
                                placeholder="Hóa đơn..."
                                onChange={(e) => setInvoice({ ...invoice, invoiceTitle: e.target.value })} />
                            <input className="text-center w-full bg-transparent border-0 outline-none print-date mb-2"
                                value={invoice.invoiceDate}
                                onChange={(e) => { setInvoice({ ...invoice, invoiceDate: e.target.value }) }}
                                placeholder="Ngày ... tháng... năm ..." />
                            <div className="flex flex-col items-center print-tax-code">
                                <div className="font-bold text-sm mb-1">Mã của cơ quan thuế:</div>
                                <input
                                    className="text-center w-full bg-transparent border-0 outline-none text-sm"
                                    value={invoice.taxDepartmentId}
                                    placeholder="Mã số thuế..."
                                    onChange={(e) => setInvoice({ ...invoice, taxDepartmentId: e.target.value })} />
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="flex flex-col items-end gap-1">
                                <div className="flex flex-row whitespace-nowrap gap-2 font-bold text-sm">
                                    <div>Kí Hiệu: </div>
                                    <input
                                        className="bg-transparent border-0 outline-none text-right w-24"
                                        value={invoice.invoiceId}
                                        placeholder="1C24TPT"
                                        onChange={(e) => setInvoice({ ...invoice, invoiceId: e.target.value })}
                                    />
                                </div>
                                <div className="flex flex-row font-bold whitespace-nowrap gap-2 text-sm">
                                    <div>Số: </div>
                                    <input
                                        value={invoice.number}
                                        placeholder="00000134"
                                        className="text-red-600 bg-transparent border-0 outline-none text-right w-24"
                                        onChange={(e) => setInvoice({ ...invoice, number: e.target.value })} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" flex flex-col gap-1">
                        <div className="flex flex-row">
                            <div className="pl-4 w-64 font-bold">Tên đơn vị bán hàng</div>
                            <input className="outline-none w-full font-bold bg-transparent" value={invoice.retailerName} placeholder=".........................................." onChange={(e) => { setInvoice({ ...invoice, retailerName: e.target.value }) }} />
                        </div>
                        <div className="flex flex-row">
                            <div className="pl-4 w-64 font-bold">Mã số thuế</div>
                            <input className="outline-none w-full bg-transparent" value={invoice.retailerTaxIdNumber} placeholder=".........................................." onChange={(e) => { setInvoice({ ...invoice, retailerTaxIdNumber: e.target.value }) }} />
                        </div>
                        <div className="flex flex-row">
                            <div className="pl-4 w-64 font-bold">Địa chỉ</div>
                            <input className="outline-none w-full bg-transparent" value={invoice.retailerAddress} placeholder=".........................................." onChange={(e) => { setInvoice({ ...invoice, retailerAddress: e.target.value }) }} />
                        </div>
                        <div className="flex flex-row">
                            <div className="pl-4 w-64 font-bold">Số tài khoản</div>
                            <input className="outline-none w-full bg-transparent" value={invoice.retailerBankNumber} placeholder=".........................................." onChange={(e) => { setInvoice({ ...invoice, retailerBankNumber: e.target.value }) }} />
                        </div>
                        <div className="flex flex-row">
                            <div className="pl-4 w-64 font-bold">Ngân hàng</div>
                            <input className="outline-none w-full bg-transparent" value={invoice.reailerBankName} placeholder=".........................................." onChange={(e) => { setInvoice({ ...invoice, reailerBankName: e.target.value }) }} />
                        </div>
                        <div className="w-full h-4"></div>
                        <div className="flex flex-row">
                            <div className="pl-4 w-64 font-bold">Họ tên người mua hàng: </div>
                            <input className="outline-none w-full bg-transparent" value={invoice.consumerName} placeholder=".........................................." onChange={(e) => { setInvoice({ ...invoice, consumerName: e.target.value }) }} />
                        </div>
                        <div className="flex flex-row">
                            <div className="pl-4 w-64 font-bold">Tên đơn vị mua hàng</div>
                            <input className="outline-none w-full bg-transparent" value={invoice.consumerDepartmentName} placeholder=".........................................." onChange={(e) => { setInvoice({ ...invoice, consumerDepartmentName: e.target.value }) }} />
                        </div>
                        <div className="flex flex-row">
                            <div className="pl-4 w-64 font-bold">Mã số thuế</div>
                            <input className="outline-none w-full bg-transparent" value={invoice.consumerTaxIdNumber} placeholder=".........................................." onChange={(e) => { setInvoice({ ...invoice, consumerTaxIdNumber: e.target.value }) }} />
                        </div>
                        <div className="flex flex-row">
                            <div className="pl-4 w-64 font-bold">Địa chỉ</div>
                            <input className="outline-none w-full bg-transparent" value={invoice.consumerAddress} placeholder=".........................................." onChange={(e) => { setInvoice({ ...invoice, consumerAddress: e.target.value }) }} />
                        </div>
                        <div className="flex flex-row">
                            <div className="pl-4 w-64 font-bold">Số tài khoản</div>
                            <input className="outline-none w-full bg-transparent" value={invoice.consumerBankNumber} placeholder=".........................................." onChange={(e) => { setInvoice({ ...invoice, consumerBankNumber: e.target.value }) }} />
                        </div>
                        <div className="flex flex-row">
                            <div className="pl-4 w-64 font-bold">Phương thức thanh toán</div>
                            <input className="outline-none w-full bg-transparent" value={invoice.paymentMethod} placeholder=".........................................." onChange={(e) => { setInvoice({ ...invoice, paymentMethod: e.target.value }) }} />
                        </div>
                        <div className="flex flex-row">
                            <div className="pl-4 w-64 font-bold">Ngân hàng</div>
                            <input className="outline-none w-full bg-transparent" value={invoice.consumerBankName} placeholder=".........................................." onChange={(e) => { setInvoice({ ...invoice, consumerBankName: e.target.value }) }} />
                        </div>
                    </div>

                    <div className="mt-2 w-full px-2 pb-2">
                        <table className="w-full border-collapse border border-gray-700">
                            <thead>
                                <tr>
                                    <th className="border border-gray-700 p-1 text-center text-sm">STT</th>
                                    <th className="border border-gray-700 p-1 text-center text-sm">Tên hàng hóa, dịch vụ</th>
                                    <th className="border border-gray-700 p-1 text-center text-sm">Đơn vị tính</th>
                                    <th className="border border-gray-700 p-1 text-center text-sm">Số lượng</th>
                                    <th className="border border-gray-700 p-1 text-center text-sm">Đơn giá</th>
                                    <th className="border border-gray-700 p-1 text-center text-sm">Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-700 p-1 text-center text-xs">1</td>
                                    <td className="border border-gray-700 p-1 text-center text-xs">2</td>
                                    <td className="border border-gray-700 p-1 text-center text-xs">3</td>
                                    <td className="border border-gray-700 p-1 text-center text-xs">5</td>
                                    <td className="border border-gray-700 p-1 text-center text-xs">4</td>
                                    <td className="border border-gray-700 p-1 text-center text-xs">6=4x5</td>
                                </tr>
                                {invoice.itemList.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="border border-gray-700 p-1 text-center">{item.index}</td>
                                            <td className="border border-gray-700 p-1 text-center">
                                                <input className="w-full bg-transparent border-0 outline-none text-center text-sm" value={item.itemName} onChange={(e) => {
                                                    const newItemList = [...invoice.itemList];
                                                    newItemList[index].itemName = e.target.value;
                                                    setInvoice({ ...invoice, itemList: newItemList });
                                                }} />
                                            </td>
                                            <td className="border border-gray-700 p-1 text-center">
                                                <input className="w-full bg-transparent border-0 outline-none text-center text-sm" value={item.itemUnit} onChange={(e) => {
                                                    const newItemList = [...invoice.itemList];
                                                    newItemList[index].itemUnit = e.target.value;
                                                    setInvoice({ ...invoice, itemList: newItemList });
                                                }} />
                                            </td>
                                            <td className="border border-gray-700 p-1 text-center">
                                                <input className="w-full bg-transparent border-0 outline-none text-center text-sm" type="number" value={item.itemQuantity || ''} onChange={(e) => {
                                                    const newItemList = [...invoice.itemList];
                                                    const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
                                                    newItemList[index].itemQuantity = isNaN(value) ? 0 : value;
                                                    const updatedInvoice = { ...invoice, itemList: newItemList };
                                                    setInvoice(recalculateInvoice(updatedInvoice));
                                                }} />
                                            </td>
                                            <td className="border border-gray-700 p-1 text-center">
                                                <input className="w-full bg-transparent border-0 outline-none text-center text-sm" type="number" value={item.itemPrice || ''} onChange={(e) => {
                                                    const newItemList = [...invoice.itemList];
                                                    const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
                                                    newItemList[index].itemPrice = isNaN(value) ? 0 : value;
                                                    const updatedInvoice = { ...invoice, itemList: newItemList };
                                                    setInvoice(recalculateInvoice(updatedInvoice));
                                                }} />
                                            </td>
                                            <td className="border border-gray-700 p-1 text-center">
                                                <input className="w-full bg-transparent border-0 outline-none text-center text-sm" value={item.itemTotalPrice.toLocaleString('de-DE')} readOnly />
                                            </td>
                                        </tr>

                                    )
                                })}
                                {Array.from({ length: getBeautifyEmptyCell() }).map((_, index) => (
                                    <tr key={`empty-${index}`} className="h-6">
                                        <td className="border border-gray-700"></td>
                                        <td className="border border-gray-700"></td>
                                        <td className="border border-gray-700"></td>
                                        <td className="border border-gray-700"></td>
                                        <td className="border border-gray-700"></td>
                                        <td className="border border-gray-700"></td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={6} className="font-bold border border-gray-700 p-1">
                                        <div className="flex flex-row">
                                            <div className="w-64">Cộng tiền hàng:</div>
                                            <div>{invoice.totalItemPrice.toLocaleString('de-DE')}</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={6} className="font-bold border border-gray-700 p-1">
                                        <div className="flex flex-row">
                                            <div className="w-64">Thuế suất GTGT:</div>
                                            <input className="w-8 bg-transparent border-0 outline-none text-right " type="number" min={0} max={1000} value={invoice.GTGTTaxRate * 100 || ''} onChange={(e) => {
                                                const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
                                                const newTaxRate = isNaN(value) ? 0 : value / 100;
                                                const updatedInvoice = { ...invoice, GTGTTaxRate: newTaxRate };
                                                setInvoice(recalculateInvoice(updatedInvoice));
                                            }} />%
                                            <div className="w-64 pl-16">Tiền thuế GTGT:</div>
                                            <div>{invoice.GTGTTaxAmount.toLocaleString('de-DE')}</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={6} className="font-bold border border-gray-700 p-1">
                                        <div className="flex flex-row">
                                            <div className="w-96">Tổng cộng tiền thanh toán:</div>
                                            <div>{invoice.totalPriceAfterTax.toLocaleString('de-DE')}</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={6} className="font-bold border border-gray-700 p-1">
                                        <div className="flex flex-row">
                                            <div className="w-96">Bằng chữ:</div>
                                            <input className="w-full bg-transparent border-0 outline-none" value={invoice.totalPriceByText} onChange={(e) => setInvoice({ ...invoice, totalPriceByText: e.target.value })} />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}