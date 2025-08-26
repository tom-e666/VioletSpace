export interface InvoiceItem {
    index: number;
    itemName: string;
    itemUnit: string;
    itemPrice: number;
    itemQuantity: number;
    itemTotalPrice: number;
}

export interface InvoiceProfile {
    id: string;
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
    itemList: InvoiceItem[];
    totalItemPrice: number;
    GTGTTaxRate: number;
    GTGTTaxAmount: number;
    totalPriceAfterTax: number;
    totalPriceByText: string;
}
const now = new Date();
const pad2 = (n: number) => n.toString().padStart(2, '0');
const date = `Ngày ${now.getDate()} tháng ${pad2(now.getMonth() + 1)} năm ${now.getFullYear()}`;
const mockProfiles: InvoiceProfile[] = [
    {
        id: "ngoc-huong",
        invoiceTitle: "HÓA ĐƠN BÁN HÀNG",
        invoiceDate: date,
        taxDepartmentId: "M2-25-7IWNW-00100000094",
        invoiceId: "2C25MDT",
        number: "00000094",
        retailerName: "NGUYỄN DUY TÂN",
        retailerTaxIdNumber: "8499806405 - 001",
        retailerAddress: "Cụm Công Nghiệp 2,tổ 4, ấp An Thạnh, Xã Cái Bè, Tỉnh Đồng Tháp",
        retailerBankNumber: "",
        reailerBankName: "",
        consumerName: "",
        consumerDepartmentName: "HỘ KINH DOANH NGUYỄN THỊ NGỌC HƯƠNG",
        consumerTaxIdNumber: "056177009920",
        consumerAddress: "TDP Phú Thạnh - Phường Đông Ninh Hòa - Tỉnh Khánh Hòa - Việt Nam",
        consumerBankNumber: "",
        paymentMethod: "Chuyển khoản",
        consumerBankName: "",
        itemList: [
            {
                index: 1,
                itemName: "Gạo dẻo thơm",
                itemUnit: "Kg",
                itemPrice: 15200,
                itemQuantity: 4300,
                itemTotalPrice: 0
            },
        ],
        totalItemPrice: 0,
        GTGTTaxRate: 0.05,
        GTGTTaxAmount: 0,
        totalPriceAfterTax: 0,
        totalPriceByText: ""
    },
    {
        id: "bien-ngoc",
        invoiceTitle: "HÓA ĐƠN BÁN HÀNG",
        invoiceDate: date,
        taxDepartmentId: "M2-25-7IWNW-00100000094",
        invoiceId: "2C25MDT",
        number: "00000094",
        retailerName: "NGUYỄN DUY TÂN",
        retailerTaxIdNumber: "8499806405 - 001",
        retailerAddress: "Cụm Công Nghiệp 2,tổ 4, ấp An Thạnh, Xã Cái Bè, Tỉnh Đồng Tháp",
        retailerBankNumber: "",
        reailerBankName: "",
        consumerName: "",
        consumerDepartmentName: "HỘ KINH DOANH BIỂN NGỌC",
        consumerTaxIdNumber: "056187006829",
        consumerAddress: "TDP Mỹ Lương - Phường Đông Ninh Hòa - Tỉnh Khánh Hòa - Việt Nam",
        consumerBankNumber: "",
        paymentMethod: "Tiền mặt",
        consumerBankName: "",
        itemList: [
            {
                index: 1,
                itemName: "Gạo dẻo",
                itemUnit: "Kg",
                itemPrice: 14000,
                itemQuantity: 150,
                itemTotalPrice: 0
            },
        ],
        totalItemPrice: 0,
        GTGTTaxRate: 0.05,
        GTGTTaxAmount: 0,
        totalPriceAfterTax: 0,
        totalPriceByText: ""
    },
];

export default mockProfiles;