"use client"

import React from 'react';

interface AmountDetails {
    amount: number;
    local: {
        amount: number;
        currency: string;
    };
}

interface BankAccount {
    id: string;
    name: string;
    short?: string;
}

interface AccountDetails {
    name: {
        th: string;
        en: string;
    };
    bank: {
        type: string;
        account: string;
    };
}

interface EasySlipResponse {
    status: number;
    data: {
        data: {
            payload: string;
            transRef: string;
            date: string;
            countryCode: string;
            amount: AmountDetails;
            fee: number;
            ref1: string;
            ref2: string;
            ref3: string;
            sender: {
                bank: BankAccount;
                account: AccountDetails;
            };
            receiver: {
                bank: BankAccount;
                account: AccountDetails;
                proxy: {
                    type: string;
                    account: string;
                };
            };
        };
    };
}

// Define Props for SlipInfo component
interface SlipInfoProps {
    responseData: EasySlipResponse;
}

const SlipInfo: React.FC<SlipInfoProps> = ({ responseData }) => {
    return (
        <section className="bg-white border border-gray-100 p-5 rounded-lg shadow-lg mt-8">
            {/* Section title */}
            <h2 className="text-2xl font-semibold mb-3 border-b border-gray-300">Slip Information</h2>

            {/* Display Transaction Reference */}
            <p><strong>Transaction Reference:</strong> {responseData?.data?.data?.transRef || 'N/A'}</p>

            {/* Display Date */}
            <p><strong>Date:</strong> {responseData?.data?.data?.date ? new Date(responseData.data.data.date).toLocaleString() : 'N/A'}</p>

            {/* Display Transaction Amount */}
            <p><strong>Amount:</strong> {responseData?.data?.data?.amount?.amount} {responseData?.data?.data?.amount?.local?.currency}</p>

            {/* Sender Information */}
            <div>
                <strong>Sender:</strong>
                <ul className="list-disc pl-5">
                    <li><strong>Bank:</strong> {responseData?.data?.data?.sender?.bank?.name || 'N/A'}</li>
                    <li><strong>Account Name (TH):</strong> {responseData?.data?.data?.sender?.account?.name?.th || 'N/A'}</li>
                    <li><strong>Account Name (EN):</strong> {responseData?.data?.data?.sender?.account?.name?.en || 'N/A'}</li>
                    <li><strong>Account Number:</strong> {responseData?.data?.data?.sender?.account?.bank?.account || 'N/A'}</li>
                </ul>
            </div>

            {/* Receiver Information */}
            <div>
                <strong>Receiver:</strong>
                <ul className="list-disc pl-5">
                    <li><strong>Bank:</strong> {responseData?.data?.data?.receiver?.bank?.name || 'N/A'}</li>
                    <li><strong>Account Name (TH):</strong> {responseData?.data?.data?.receiver?.account?.name?.th || 'N/A'}</li>
                    <li><strong>Account Name (EN):</strong> {responseData?.data?.data?.receiver?.account?.name?.en || 'N/A'}</li>
                    <li><strong>Proxy Type:</strong> {responseData?.data?.data?.receiver?.proxy?.type || 'N/A'}</li>
                    <li><strong>Receiver Account (Proxy):</strong> {responseData?.data?.data?.receiver?.proxy?.account || 'N/A'}</li>
                </ul>
            </div>
        </section>
    );
};

export default SlipInfo;
