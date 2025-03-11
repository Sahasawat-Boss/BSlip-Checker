'use client'

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { FaCloudUploadAlt, FaSpinner } from "react-icons/fa"; // Import React Icon
import SlipInfo from './Components/SlipInfo';
import TitleApp from './Components/TitleApp';

// Define the response data type from EasySlip API
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

// Default response data with blank values
const defaultResponseData: EasySlipResponse = {
  status: 200,
  data: {
    data: {
      payload: 'N/A',
      transRef: '',
      date: '',
      countryCode: 'TH',
      amount: {
        amount: 0,
        local: {
          amount: 0,
          currency: 'THB',
        },
      },
      fee: 0,
      ref1: '',
      ref2: '',
      ref3: '',
      sender: {
        bank: { id: '000', name: '', short: 'BANK' },
        account: { name: { th: '', en: '' }, bank: { type: 'BANKAC', account: '' } },
      },
      receiver: {
        bank: { id: '000', name: '', short: 'BANK' },
        account: { name: { th: '', en: '' }, bank: { type: 'BANKAC', account: '' } },
        proxy: { type: 'MSISDN', account: '' },
      },
    },
  },
};

function App() {
  const [image, setImage] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<EasySlipResponse>(defaultResponseData);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setImage(URL.createObjectURL(selectedFile));
    }
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      setFile(selectedFile);
      setImage(URL.createObjectURL(selectedFile));
    }
  }, []);

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeImage = () => {
    setFile(null);
    setImage('');
  };

  async function easyslip() {
    if (!file) {
      alert('No file selected');
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/easyslip', { method: 'POST', body: formData });
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data: EasySlipResponse = await res.json();
      setResponseData(data);
    } catch (error) {
      console.error('Error Occurred:', error);
    } finally {
      setLoading(false);
    }
  }
  //* === Return Section ==========================================================================
  return (
    <main className="p-5 max-w-4xl mx-auto">
      {/* Background Gradient */}
      <div className="gradient-bg"></div>

<TitleApp/>

      <section className="mb-6">
        <label htmlFor="file" className="block text-xl font-semibold mb-3 text-center text-gray-700">อัพโหลดรูป Slip</label>

        <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 bg-white hover:bg-gray-100 transition-all cursor-pointer shadow-md" onDrop={onDrop} onDragOver={onDragOver}>
          <input type="file" id="file" accept="image/*" onChange={onImageChange} className="hidden" />
          <label htmlFor="file" className="flex flex-col items-center cursor-pointer">
            <FaCloudUploadAlt className="text-4xl text-gray-400 mb-2" />
            <p className="text-gray-600 text-sm">📂 ลากไฟล์มาวาง หรือคลิกเพื่ออัพโหลด</p>
          </label>
        </div>

        {image && (
          <div className="relative mt-6 mx-auto">
            <Image src={image} alt="Uploaded Preview" width={360} height={360} className="mx-auto" />
            <button onClick={removeImage} className="absolute top-0 right-0 bg-red-600 text-white px-2 rounded-full">&times;</button>
          </div>
        )}
      </section>

      <section className="text-center mb-10">
        <button onClick={easyslip} className={`bg-blue-500 text-white px-5 py-1.5 rounded-md ${loading ? 'opacity-50' : 'hover:scale-110'}`} disabled={loading}>
          {loading ? <><FaSpinner className="animate-spin" /> Checking... </> : "Check Slip"}
        </button>
      </section>

      {/*//! Slip Info Compoenent Here*/}
      <SlipInfo responseData={responseData} />
    </main>
  );
}

export default App;
