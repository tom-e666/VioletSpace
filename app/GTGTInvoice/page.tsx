"use client"
import React from "react";
import { useAuthContext } from "../component/AuthContext";
import toast from "react-hot-toast";
interface InvoiceMask {
    id: string;
    name: string;
    amount: number;
    date: string;
}
interface InvoiceList {
    invoices: InvoiceMask[];
}
interface StarredInvoices {
    invoices: InvoiceMask[];
}

export default function Page() {
    const { id, authenticated } = useAuthContext();
    const [invoiceList, setInvoiceList] = React.useState<InvoiceList>({ invoices: [] });
    const [starredInvoices, setStarredInvoices] = React.useState<StarredInvoices>({ invoices: [] });
    const selectedInvoice = React.useRef<InvoiceMask | null>(null);
    const loadInvoices = async () => {
        if (!authenticated) {
            toast.error('You must be logged in to view invoices');
            return;
        }
    }

    return (
        <div className="w-full h-full flex flex-col gap-4 p-4">
            <div className=" w-full h-24 border-gray-700 border-2 border-dashed rounded-2xl flex flex-col">
                <div className="px-4 pt-1 text-gray-300">
                    Navigation
                </div>
                <div className="flex flex-row justify-center gap-2">
                    <button
                        className="border-2 border-white border-dotted rounded-2xl hover:bg-white hover:text-gray-700 px-4 py-2 transition-colors duration-300"
                    >
                        New Invoice
                    </button>
                    <button
                        className="border-2 border-white border-dotted rounded-2xl hover:bg-white hover:text-gray-700 px-4 py-2 transition-colors duration-300"
                    >
                        Duplicate Invoice
                    </button>
                    <button
                        className="border-2 border-white border-dotted rounded-2xl hover:bg-white hover:text-gray-700 px-4 py-2 transition-colors duration-300"
                    >
                        Delete Invoice
                    </button>
                    <button
                        className="border-2 border-white border-dotted rounded-2xl hover:bg-white hover:text-gray-700 px-4 py-2 transition-colors duration-300"
                        onClick={loadInvoices}
                    >
                        Reload Invoices
                    </button>
                    <button
                        className="border-2 border-white border-dotted rounded-2xl hover:bg-white hover:text-gray-700 px-4 py-2 transition-colors duration-300"
                    >
                        Guidance
                    </button>
                </div>
            </div>
            <div className=" w-full h-24 border-gray-700 border-2 border-dashed rounded-2xl flex flex-col">
                <div className="px-4 pt-1 text-gray-300">
                    Invoice List
                </div>
                <div className="flex flex-row justify-center gap-2">
                    <button
                        className="border-2 border-white border-dotted rounded-2xl hover:bg-white hover:text-gray-700 px-4 py-2 transition-colors duration-300"
                    >
                        Invoice 1
                    </button>
                    <button
                        className="border-2 border-white border-dotted rounded-2xl hover:bg-white hover:text-gray-700 px-4 py-2 transition-colors duration-300"
                    >
                        Invoice 2
                    </button>
                    <button
                        className="border-2 border-white border-dotted rounded-2xl hover:bg-white hover:text-gray-700 px-4 py-2 transition-colors duration-300"
                    >
                        Invoice 3
                    </button>
                </div>

            </div>
            <div className=" w-full h-24 border-gray-700 border-2 border-dashed rounded-2xl flex flex-col">
                <div className="px-4 pt-1 text-gray-300">
                    Starred
                </div>
                <div className="flex flex-row justify-center gap-2">
                    <button
                        className="border-2 border-white border-dotted rounded-2xl hover:bg-white hover:text-gray-700 px-4 py-2 transition-colors duration-300"
                    >
                        Invoice 1
                    </button>
                    <button
                        className="border-2 border-white border-dotted rounded-2xl hover:bg-white hover:text-gray-700 px-4 py-2 transition-colors duration-300"
                    >
                        Invoice 2
                    </button>
                    <button
                        className="border-2 border-white border-dotted rounded-2xl hover:bg-white hover:text-gray-700 px-4 py-2 transition-colors duration-300"
                    >
                        Invoice 3
                    </button>
                </div>

            </div>
        </div>
    )
}