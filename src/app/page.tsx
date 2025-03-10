'use client'

import React, { useState, useCallback } from 'react'
import Image from 'next/image'

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
        bank: {
          id: '000',
          name: '',
          short: 'BANK',
        },
        account: {
          name: {
            th: '',
            en: '',
          },
          bank: {
            type: 'BANKAC',
            account: '',
          },
        },
      },
      receiver: {
        bank: {
          id: '000',
          name: '',
          short: 'BANK',
        },
        account: {
          name: {
            th: '',
            en: '',
          },
          bank: {
            type: 'BANKAC',
            account: '',
          },
        },
        proxy: {
          type: 'MSISDN',
          account: '',
        },
      },
    },
  },
};

function App() {
  const [image, setImage] = useState<string>(''); // State for the image URL after upload
  const [file, setFile] = useState<File | null>(null); // State to store the uploaded file
  const [loading, setLoading] = useState<boolean>(false); // Loading state for button
  const [responseData, setResponseData] = useState<EasySlipResponse>(defaultResponseData); // State to hold the API response

  // Handle file selection from the input field
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile); // Store the selected file
      setImage(URL.createObjectURL(selectedFile)); // Create an object URL to display the image
    }
  };

  // Drag and Drop event handlers
  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();  // Prevent the default action
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      setFile(selectedFile); // Store the selected file
      setImage(URL.createObjectURL(selectedFile)); // Create an object URL for the image preview
    }
  }, []);

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();  // Allow drop by preventing default behavior
  };

  // Function to remove the selected image
  const removeImage = () => {
    setFile(null);  // Clear the file
    setImage('');   // Clear the image preview
  };

  // API request function to process the uploaded slip
  async function easyslip() {
    if (!file) {
      alert('No file selected');  // Alert if no file is selected
      return;
    }

    setLoading(true); // Set loading state to true while processing

    const formData = new FormData();
    formData.append('file', file); // Append the file to the form data

    try {
      // Send a POST request to the API with the file
      const res = await fetch('/api/easyslip', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);  // Throw error if the response is not ok
      }

      const data: EasySlipResponse = await res.json(); // Parse the response JSON
      console.log('API EasySlip Response:', data); // Log the response for debugging

      // Update state with the correct response data
      setResponseData(data); // We set the response data here
    } catch (error) {
      console.error('Error Occurred:', error);  // Log error if something goes wrong
    } finally {
      setLoading(false); // Stop loading
    }
  }

  return (
    <main className="p-5 max-w-4xl mx-auto">
      <section className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-blue-600 ">Bslip-Checker</h1> {/* Title of the page */}
      </section>


      <section className="mb-8">
        <label htmlFor="file" className="block text-xl font-medium mb-2 text-center">อัพโหลดรูป Slip</label> {/* Label for file input */}
        {/* File Upload Section */}
        <div
          className=" border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-100 transition-all"
          onDrop={onDrop}  // Trigger onDrop when files are dropped
          onDragOver={onDragOver}  // Allow drag over
        >
          <input
            type="file"
            id="file"
            name="file"
            onChange={onImageChange}  // Trigger onImageChange when file is selected
            className="w-full cursor-pointer opacity-50"  // Hide file input
          />
        </div>
        {/* File Upload Section */}

        {/* Display image preview if an image is selected */}
        {image && (
          <div className="relative mt-6 mx-auto">
            <Image
              src={image}
              alt="Uploaded Preview"
              width={360}
              height={360}
              className="mx-auto"
            />
            {/* Button to remove the uploaded image */}
            <button
              onClick={removeImage}
              className="absolute top-0 right-0 text-white bg-red-600 cursor-pointer hover:scale-110 hover:bg-red-400 px-2 rounded-full"
            >
              &times;
            </button>
          </div>
        )}
      </section>

      {/* Checking Slip Button */}
      <section className="text-center mb-10">
        <button
          onClick={easyslip}
          className={`bg-blue-700 text-white px-6 py-3 rounded-md mt-3 ${loading ? 'bg-blue-300 cursor-not-allowed' : 'hover:bg-blue-400'}`}
          disabled={loading}
        >
          {loading ? 'Checking...' : 'Check'}  {/* Button text based on loading state */}
        </button>
      </section>

      {/* Info Display Section */}
      <section className="bg-white border p-5 rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-semibold mb-3">Slip Information</h2>
        {/* Display Transaction Reference */}
        <p><strong>Transaction Reference:</strong> {responseData?.data?.data?.transRef || 'N/A'}</p>
        {/* Display Date */}
        <p><strong>Date:</strong> {responseData?.data?.data?.date ? new Date(responseData.data.data.date).toLocaleString() : 'N/A'}</p>
        {/* Display Amount */}
        <p><strong>Amount:</strong> {responseData?.data?.data?.amount?.amount} {responseData?.data?.data?.amount?.local?.currency}</p>
        <div>
          <strong>Sender:</strong>
          <ul className="list-disc pl-5">
            {/* Display sender bank and account details */}
            <li><strong>Bank:</strong> {responseData?.data?.data?.sender?.bank?.name || 'N/A'}</li>
            <li><strong>Account Name (TH):</strong> {responseData?.data?.data?.sender?.account?.name?.th || 'N/A'}</li>
            <li><strong>Account Name (EN):</strong> {responseData?.data?.data?.sender?.account?.name?.en || 'N/A'}</li>
            <li><strong>Account Number:</strong> {responseData?.data?.data?.sender?.account?.bank?.account || 'N/A'}</li>
          </ul>
        </div>
        <div>
          <strong>Receiver:</strong>
          <ul className="list-disc pl-5">
            {/* Display receiver bank and account details */}
            <li><strong>Bank:</strong> {responseData?.data?.data?.receiver?.bank?.name || 'N/A'}</li>
            <li><strong>Account Name (TH):</strong> {responseData?.data?.data?.receiver?.account?.name?.th || 'N/A'}</li>
            <li><strong>Account Name (EN):</strong> {responseData?.data?.data?.receiver?.account?.name?.en || 'N/A'}</li>
            <li><strong>Proxy Type:</strong> {responseData?.data?.data?.receiver?.proxy?.type || 'N/A'}</li>
            <li><strong>Receiver Account (Proxy):</strong> {responseData?.data?.data?.receiver?.proxy?.account || 'N/A'}</li>
          </ul>
        </div>
      </section>
    </main>
  )
}

export default App;
