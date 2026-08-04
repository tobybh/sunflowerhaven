import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import {
  CreditCard,
  Mail,
  Heart,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const PRESETS = [
  { value: 100 },
  { value: 250 },
  { value: 500 },
  { value: 1000 },
];

type Selection = number | "custom";

export function HowToDonate() {
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status");

  const [selected, setSelected] = useState<Selection>(100);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [recurring, setRecurring] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "success" || status === "cancelled") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [status]);

  const amount =
    selected === "custom" ? Number.parseFloat(customAmount) : Number(selected);
  const amountValid = Number.isFinite(amount) && amount >= 1 && amount <= 100000;

  const handleDonate = async () => {
    setError(null);
    if (!amountValid) {
      setError("Please enter a donation amount between $1 and $100,000.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ amount, recurring }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Could not start checkout. Please try again.");
      }
      window.location.href = data.url as string;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  };

  const clearStatus = () => {
    searchParams.delete("status");
    searchParams.delete("session_id");
    setSearchParams(searchParams, { replace: true });
  };

  const formattedAmount = amountValid
    ? `$${amount.toFixed(amount % 1 ? 2 : 0)}`
    : "";

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#FFCF63] to-[#ffd97a] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-4xl md:text-5xl mb-4 text-[#2c3a30]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            How to Donate
          </h1>
          <p className="text-lg text-[#4a6a52]">
            Your generosity makes our life-saving work possible. Thank you for standing with survivors.
          </p>
        </div>
      </section>

      {/* Status banners */}
      {status === "success" && (
        <div className="max-w-5xl mx-auto mt-8 px-4">
          <div className="flex items-start gap-3 rounded-2xl border border-[#cfe1d1] bg-[#e8efe9] p-5">
            <CheckCircle2 className="w-6 h-6 text-[#4a6a52] shrink-0 mt-0.5" />
            <div className="flex-1">
              <div
                className="text-lg text-[#2c3a30]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Thank you for your generosity.
              </div>
              <p className="text-sm text-[#4a6a52] mt-1">
                Your donation is being processed by Stripe. A receipt will arrive by email shortly.
              </p>
            </div>
            <button
              onClick={clearStatus}
              className="text-xs uppercase tracking-wider text-[#4a6a52] hover:text-[#2c3a30]"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
      {status === "cancelled" && (
        <div className="max-w-5xl mx-auto mt-8 px-4">
          <div className="flex items-start gap-3 rounded-2xl border border-[#e7e1d2] bg-[#fff4d6] p-5">
            <AlertCircle className="w-6 h-6 text-[#8a6c22] shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-[#2c3a30] font-semibold">Donation was not completed.</div>
              <p className="text-sm text-[#5b6b5f] mt-1">
                No charge was made. You're welcome to try again whenever you're ready.
              </p>
            </div>
            <button
              onClick={clearStatus}
              className="text-xs uppercase tracking-wider text-[#8a6c22] hover:text-[#5c4716]"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Donation Options */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-3xl mb-12 text-center text-[#2c3a30]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ways to Give
          </h2>

          {/* Online Donation */}
          <div className="bg-white border border-[#e7e1d2] rounded-2xl p-8 mb-8 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-[#4a6a52] text-white w-12 h-12 rounded-full flex items-center justify-center">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3
                className="text-2xl text-[#2c3a30]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Online Donation
              </h3>
            </div>
            <p className="text-[#5b6b5f] mb-6">
              The fastest and most secure way to support our mission. Pick a tier — or
              enter your own amount — and you'll be taken to Stripe's secure checkout with
              your gift already filled in.
            </p>

            <div className="bg-[#fbf9f4] p-6 rounded-xl border border-[#e7e1d2]">
              <h4 className="font-semibold mb-4 text-[#2c3a30]">Choose an amount</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PRESETS.map((p) => {
                  const active = selected === p.value;
                  return (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setSelected(p.value)}
                      className={`py-4 px-3 rounded-xl text-center transition-all border-2 ${
                        active
                          ? "border-[#4a6a52] bg-white shadow-sm"
                          : "border-[#e7e1d2] bg-white hover:border-[#a4bca8]"
                      }`}
                    >
                      <div
                        className="text-2xl text-[#1F3247]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        ${p.value}
                      </div>
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => setSelected("custom")}
                className={`w-full mt-3 py-4 px-4 rounded-xl text-center transition-all border-2 ${
                  selected === "custom"
                    ? "border-[#4a6a52] bg-white shadow-sm"
                    : "border-[#e7e1d2] bg-white hover:border-[#a4bca8]"
                }`}
              >
                <div
                  className="text-lg text-[#1F3247]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Custom amount
                </div>
              </button>

              {selected === "custom" && (
                <div className="mt-5">
                  <label className="block text-sm font-semibold text-[#2c3a30] mb-2">
                    Donation amount (USD)
                  </label>
                  <div className="relative max-w-xs">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5b6b5f]">$</span>
                    <input
                      type="number"
                      min={1}
                      max={100000}
                      step="1"
                      inputMode="decimal"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="75"
                      className="w-full pl-8 pr-4 py-3 rounded-xl border-2 border-[#e7e1d2] focus:border-[#4a6a52] outline-none bg-white text-[#2c3a30]"
                    />
                  </div>
                </div>
              )}

              <label className="flex items-center gap-3 text-[#2c3a30] mt-6 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={recurring}
                  onChange={(e) => setRecurring(e.target.checked)}
                  className="w-4 h-4 accent-[#4a6a52]"
                />
                <span className="text-sm">Make this a monthly recurring donation</span>
              </label>

              {error && (
                <div className="mt-5 flex items-start gap-2 text-sm text-[#8a2929] bg-[#fbe8e8] border border-[#f0c5c5] rounded-lg p-3">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                onClick={handleDonate}
                disabled={submitting || !amountValid}
                className="w-full bg-[#4a6a52] hover:bg-[#3b5642] disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-full text-lg mt-6 transition-colors flex items-center justify-center gap-2 font-semibold"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Redirecting to secure checkout…
                  </>
                ) : (
                  <>
                    Donate{formattedAmount && ` ${formattedAmount}`}
                    {recurring && amountValid ? " / month" : ""}
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-[#6b6457]">
                <ShieldCheck className="w-4 h-4 text-[#698F72]" />
                Secured by Stripe · We never see or store your card details
              </div>
            </div>

            <p className="text-sm text-[#5b6b5f] mt-6">
              <strong className="text-[#2c3a30]">Tax Deductible:</strong> Sunflower Haven is a
              501(c)(3) charity. Your donation is tax-deductible to the extent allowed by law,
              and Stripe will email you a receipt.
            </p>

            <div className="mt-5 rounded-xl border border-[#f0d98a] bg-[#FFCF63]/25 text-[#2c3a30] px-5 py-4 text-sm">
              All board members and officers are volunteers. No funds are being used to pay
              board members, officers, employees, or directors —{" "}
              <strong>100% of donations go toward our mission.</strong>
            </div>
          </div>

          {/* Check/Mail */}
          <div className="bg-white border border-[#e7e1d2] rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-[#FFCF63] text-[#4a6a52] w-12 h-12 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <h3
                className="text-2xl text-[#2c3a30]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Mail a Check
              </h3>
            </div>
            <p className="text-[#5b6b5f] mb-5">
              Prefer to donate by mail? Checks should be made payable to{" "}
              <strong className="text-[#2c3a30]">Sunflower Haven</strong>. Please email us
              below and we'll send our mailing address to you directly.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#4a6a52] hover:bg-[#3b5642] text-white px-6 py-3 rounded-full font-semibold transition-colors"
            >
              Email us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Other Ways */}
          <div className="bg-[#fff4d6] p-8 rounded-2xl border border-[#f0d98a]">
            <div className="flex items-center gap-4 mb-6">
              <Heart className="w-8 h-8 text-[#8a6c22]" />
              <h3
                className="text-2xl text-[#2c3a30]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Other Ways to Support
              </h3>
            </div>
            <div className="space-y-4 text-[#5b6b5f]">
              <div>
                <h4 className="font-semibold mb-1 text-[#2c3a30]">Employer Matching Gifts</h4>
                <p>Double your impact! Many employers match charitable contributions. Check with your HR department.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1 text-[#2c3a30]">Planned Giving</h4>
                <p>Leave a lasting legacy through bequests, trusts, or beneficiary designations.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1 text-[#2c3a30]">Host a Fundraiser</h4>
                <p>Organize a community event or workplace campaign to raise awareness and funds.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
