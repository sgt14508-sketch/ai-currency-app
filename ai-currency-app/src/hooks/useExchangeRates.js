import { useState, useEffect } from "react";

export function useExchangeRates() {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRates() {
      try {
        setLoading(true);
        
        // Get the key securely from the .env file
        const API_KEY = import.meta.env.VITE_EXCHANGE_API_KEY;
        
        if (!API_KEY) {
          throw new Error("API Key missing. Please check your .env file.");
        }

        // Call the real API
        const res = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`);
        
        if (!res.ok) throw new Error("Failed to fetch rates from API");
        
        const data = await res.json();
        
        if (data.result === "success") {
          // The API returns an object like { USD: 1, EUR: 0.92, ... }
          setRates(data.conversion_rates);
          setError(null);
        } else {
          throw new Error(data["error-type"] || "API Error");
        }
        
      } catch (err) {
        console.error("API Error:", err.message);
        setError(err.message);
        
        // Fallback rates just in case the internet goes out
        setRates({ 
          USD: 1, EUR: 0.92, GBP: 0.78, INR: 83.12, 
          JPY: 149.5, AUD: 1.52, CAD: 1.36, CNY: 7.24 
        });
      } finally {
        setLoading(false);
      }
    }
    
    fetchRates();
  }, []);

  return { rates, loading, error };
}