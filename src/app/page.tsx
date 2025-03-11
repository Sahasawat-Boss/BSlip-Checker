'use client'

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { FaFileUpload, FaSpinner } from "react-icons/fa"; // Import React Icon
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
      console.error('API EasySlip Response:', data);
      setResponseData(data);
    } catch (error) {
      console.error('Error Occurred:', error);
    } finally {
      setLoading(false);
    }
  }
  //* === Return Section ==========================================================================
  return (
    <main className="p-5 mx-auto lg:grid grid-cols-2 ">
      {/* Background Gradient */}
      <div className="gradient-bg"></div>

      <div className='lg:py-4'>
        <TitleApp />

        {/* Upload and Button Section */}
        <section className="mb-6 z-10 animate-fade-in flex flex-col justify-center items-center">
          <label htmlFor="file" className="hidden text-xl font-bold mb-2 text-center bg-gradient-to-r from-[#23335c] to-[#3051d6] text-transparent bg-clip-text drop-shadow-lg">อัพโหลด Slip</label>

          <div className="border-2 border-dashed border-gray-400 rounded-lg py-6 px-12 flex flex-col items-center justify-center text-gray-500 bg-white hover:bg-gray-100 transition-all cursor-pointer shadow-md w-fit"
            onDrop={onDrop} onDragOver={onDragOver}>
            <input type="file" id="file" accept="image/*" onChange={onImageChange} className="hidden w-full h-fill" />
            <label htmlFor="file" className="flex flex-col items-center cursor-pointer">
              <FaFileUpload className="text-4xl text-gray-400 mb-2" />
              <p className="text-gray-600 text-sm">📂 ลากไฟล์มาวาง หรือคลิกเพื่ออัพโหลด</p>
            </label>
          </div>

          {image && (
            <div className="relative mt-6 mx-auto">
              <Image src={image} alt="Uploaded Preview" width={360} height={360} className="mx-auto" />
              <button onClick={removeImage} className="absolute -top-2 -right-10 cursor-pointer bg-red-700 text-white text-xl px-2 rounded-full hover:bg-red-400">&times;</button>
            </div>
          )}
        </section>

        <section className="mb-2 flex justify-center animate-fade-in-up">
          <button
            onClick={easyslip}
            className={`relative flex items-center justify-center gap-2 px-10 py-1.5 font-semibold text-lg 
        border-2 border-transparent bg-gradient-to-r from-[#3c4f7e] to-[#4e67ce] 
        text-white rounded-lg shadow-md transition-all duration-300 ease-in-out 
        ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:opacity-85 hover:shadow-lg hover:cursor-pointer'}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin text-white text-lg" />
                Checking...
              </>
            ) : (
              "Check Slip"
            )}
          </button>
        </section>

      </div>
      {/* Upload and Button Section */}

      {/*//! Slip Info Compoenent Here*/}
      <div className='lg:px-12'>
        <SlipInfo responseData={responseData} />
      </div>
    </main>
  );
}

export default App;
