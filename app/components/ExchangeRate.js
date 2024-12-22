"use client";
import { useState } from "react";
import "./exchangeRate.module.css";
import "./flagschange.css"

export default function ExchangeRate() {
    const [amount, setAmount] = useState("");
    const [sourceCurrency, setSourceCurrency] = useState("USD");
    const [targetCurrency, setTargetCurrency] = useState("EUR");
    const [convertedAmount, setConvertedAmount] = useState(null);

    const currencies = ["USD", "EUR", "VND", "JPY", "GBP"]; // Available currencies for conversion

    const handleAmountChange = (e) => setAmount(e.target.value);

    const handleSourceCurrencyChange = (e) => setSourceCurrency(e.target.value);

    const handleTargetCurrencyChange = (e) => setTargetCurrency(e.target.value);

    const handleConversion = () => {
        if (!amount || isNaN(amount)) {
            alert("Vui lòng nhập số tiền hợp lệ.");
            return;
        }

        // Mock conversion rates (replace this with API integration as needed)
        const conversionRates = {
            USD: { EUR: 0.93, VND: 23000, JPY: 135, GBP: 0.75, USD: 1 },
            EUR: { USD: 1.07, VND: 24700, JPY: 145, GBP: 0.8, EUR: 1 },
            VND: { USD: 0.000043, EUR: 0.00004, JPY: 0.0059, GBP: 0.000032, VND: 1 },
            JPY: { USD: 0.0074, EUR: 0.0069, VND: 170, GBP: 0.0055, JPY: 1 },
            GBP: { USD: 1.33, EUR: 1.25, VND: 30300, JPY: 181, GBP: 1 },
        };

        const rate = conversionRates[sourceCurrency][targetCurrency];
        const result = (amount * rate).toFixed(2);
        setConvertedAmount(result);
    };

    return (
        <div className="exchange-container">
            <h2 className="exchange-title">Chuyển Đổi Tiền Tệ</h2>

            <div className="input-row">
                {/* Source Amount */}
                <div className="input-group">
                    <input
                        type="number"
                        value={amount}
                        onChange={handleAmountChange}
                        className="input-field"
                        placeholder="Nhập số tiền"
                    />
                </div>

                {/* Source Currency */}
                <div className="input-group">
                    <select
                        id="source-currency"
                        value={sourceCurrency}
                        onChange={handleSourceCurrencyChange}
                        className="input-field"
                    >
                        {currencies.map((cur) => (
                            <option key={cur} value={cur}>
                                {cur}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="input-row">
                {/* Target Currency */}
                <div className="input-group">
                    <select
                        id="target-currency"
                        value={targetCurrency}
                        onChange={handleTargetCurrencyChange}
                        className="input-field"
                    >
                        {currencies.map((cur) => (
                            <option key={cur} value={cur}>
                                {cur}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Convert Button */}
            <button onClick={handleConversion} className="convert-button">
                Chuyển Đổi
            </button>

            {/* Result */}
            {convertedAmount && (
                <div className="result-container">
                    <div className="result-label">Kết quả:</div>
                    <div className="result-value">
                        {convertedAmount} {targetCurrency}
                    </div>
                </div>
            )}
        </div>
    );
}
