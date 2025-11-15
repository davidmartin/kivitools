"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CoinsResult {
  coins: number;
  totalUSD: number;
  tiktokShare: number;
  creatorShare: number;
}

export default function TikTokCoinsCalculatorPage() {
  const { t } = useLanguage();
  const [coins, setCoins] = useState("");
  const [result, setResult] = useState<CoinsResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCalculate = async () => {
    const coinsNum = parseInt(coins);
    
    if (isNaN(coinsNum) || coinsNum <= 0) {
      setError("Por favor ingresa un número válido de monedas");
      return;
    }

    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      // 1 TikTok Coin = $0.0105 USD (aproximado)
      // TikTok retiene 66%, creador recibe 34%
      const totalUSD = coinsNum * 0.0105;
      const tiktokShare = totalUSD * 0.66;
      const creatorShare = totalUSD * 0.34;

      setResult({
        coins: coinsNum,
        totalUSD,
        tiktokShare,
        creatorShare,
      });
    } catch (err) {
      setError("Algo salió mal");
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            TikTok Coins Calculator
          </h1>
          <p className="text-xl text-muted">
            Convert TikTok coins to USD and see the breakdown between TikTok and creator earnings.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="coins" className="block text-sm font-medium text-foreground mb-2">
                Number of TikTok Coins
              </label>
              <input
                id="coins"
                type="number"
                value={coins}
                onChange={(e) => setCoins(e.target.value)}
                placeholder="Enter number of coins..."
                disabled={isLoading}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-surface text-foreground"
              />
            </div>

            {!result && (
              <Button
                onPress={handleCalculate}
                isDisabled={isLoading}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                {isLoading ? "Calculating..." : "Calculate"}
              </Button>
            )}

            {result && (
              <Button
                onPress={() => setResult(null)}
                variant="ghost"
                size="lg"
                className="w-full"
              >
                Calculate Again
              </Button>
            )}
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {result && (
            <div className="space-y-4">
              {/* Total Value */}
              <div className="bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6 text-center">
                <p className="text-sm text-muted mb-1">Total Value</p>
                <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                  {formatCurrency(result.totalUSD)}
                </p>
                <p className="text-sm text-muted mt-1">{result.coins.toLocaleString()} coins</p>
              </div>

              {/* Breakdown */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background border border-border rounded-lg p-6 text-center">
                  <p className="text-sm text-muted mb-2">TikTok Share (66%)</p>
                  <p className="text-2xl font-bold text-foreground">
                    {formatCurrency(result.tiktokShare)}
                  </p>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
                  <p className="text-sm text-muted mb-2">Creator Share (34%)</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(result.creatorShare)}
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  💡 Note: TikTok coins conversion rate is approximately $0.0105 USD per coin. TikTok retains 66% of the value, while creators receive 34%.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              💰 Instant Conversion
            </h3>
            <p className="text-muted">Convert any amount of TikTok coins to USD instantly.</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              📊 Clear Breakdown
            </h3>
            <p className="text-muted">See exactly how much goes to TikTok vs the creator.</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              🆓 Always Free
            </h3>
            <p className="text-muted">No limits, no registration required.</p>
          </div>
          <div className="bg-surface rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-2">
              ✨ Accurate Rates
            </h3>
            <p className="text-muted">Based on current TikTok coin values and policies.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
