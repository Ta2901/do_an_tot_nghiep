"use client";
import { useState } from "react";
import './exchangeRate.module.css';

export default function ExchangeRate() {
    const [amount, setAmount] = useState("");
    const [currency, setCurrency] = useState("EUR");
    const [convertedAmount, setConvertedAmount] = useState(null);

    const currencies = ["EUR", "VND", "JPY", "GBP"];  // List of currencies for conversion

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value);
    };

    const handleConversion = () => {
        if (!amount || isNaN(amount)) {
            alert("Vui lòng nhập một số hợp lệ.");
            return;
        }

        // Simulate API request
        const conversionRates = {
            EUR: 0.93,
            VND: 23000,
            JPY: 135,
            GBP: 0.75,
        };

        const rate = conversionRates[currency];
        const result = (amount * rate).toFixed(2);
        setConvertedAmount(result);
    };

    return (
        <div className="exchange-container">
            <h2 className="exchange-title">Chuyển Đổi Tiền Tệ</h2>

            <div className="input-container">
                <input
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    className="input-field"
                    placeholder="Nhập số tiền"
                />
                <div>
                    <select
                        value={currency}
                        onChange={handleCurrencyChange}
                        className="input-field input-currency"
                    >
                        {currencies.map((cur) => (
                            <option key={cur} value={cur}>
                                {cur}
                            </option>
                        ))}
                    </select>
                </div>
                <button onClick={handleConversion} className="convert-button">
                    Chuyển Đổi
                </button>
            </div>

            {convertedAmount !== null && (
                <div className="result-container">
                    <div className="result-label">Kết quả:</div>
                    <div className="result-value">{convertedAmount} {currency}</div>
                </div>
            )}
        </div>
    );
}
