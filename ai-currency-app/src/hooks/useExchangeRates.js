// src/hooks/useExchangeRates.js
import { useState, useEffect } from "react";

// ExchangeRate-API free open endpoint (no key required)
const API_URL = "https://open.er-api.com/v6/latest/USD";

export function useExchangeRates() {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchRates() {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch rates");
        const data = await res.json();
        
        if (!cancelled) {
          // data.rates is in the format { USD: 1, EUR: 0.92, GBP: 0.78, ... }
          setRates(data.rates);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          // If API fails, fall back to rates from mockData to avoid blank screen
          import("../data/mockData").then((mod) => {
            const fallback = {};
            mod.currencies.forEach((c) => {
              fallback[c.code.toUpperCase()] = c.rate;
            });
            setRates(fallback);
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRates();
    return () => { cancelled = true; };
  }, []);

  return { rates, loading, error };
}