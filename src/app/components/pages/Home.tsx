import { Link } from "react-router";
import { Heart, Home as HomeIcon, Users, ArrowRight } from "lucide-react";
import { Logo } from "../Logo";
import {
  useCampaignProgress,
  formatCompactDollars,
  clampPercent,
} from "../../lib/useCampaignProgress";

export function Home() {
  const campaign = useCampaignProgress();
  const percent = clampPercent(campaign.raisedCents, campaign.goalCents);

  return (
    <div>
      {/* Hero — slide-4 cover */}
      <section className="relative overflow-hidden bg-[#F8F1E3]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(900px 600px at 90% -10%, rgba(255, 207, 99, 0.18), transparent 70%), radial-gradient(900px 600px at -10% 110%, rgba(105, 143, 114, 0.14), transparent 70%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-12 gap-10 items-center">
          {/* Left — headline */}
          <div className="md:col-span-7">
            <div className="text-xs tracking-[0.3em] uppercase text-[#1F3247] font-semibold mb-5">
              Chesterton, Indiana
            </div>
            <h1
              className="text-5xl md:text-7xl text-[#1F3247] mb-6 leading-[1.02]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              A safe step <span className="italic text-[#698F72]">forward.</span>
            </h1>
            <p className="text-lg text-[#2D2A26]/80 mb-8 max-w-2xl leading-relaxed">
              For adults and children escaping violence, housing insecurity, or crisis,
              a stable place to live is the first step toward rebuilding a life with
              dignity and independence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/donate"
                className="inline-flex items-center gap-2 bg-[#1F3247] hover:bg-[#162638] text-white px-7 py-3.5 rounded-full font-semibold transition-colors shadow-sm"
              >
                Help us buy the house <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/story"
                className="inline-flex items-center gap-2 bg-transparent hover:bg-white/60 text-[#1F3247] px-7 py-3.5 rounded-full font-semibold transition-colors border border-[#1F3247]/30"
              >
                Read our story
              </Link>
            </div>
            <div className="flex items-center gap-3 mt-8 text-xs tracking-wider text-[#2D2A26]/60">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C77B5C]" />
              <span>501(c)(3) charity</span>
            </div>
          </div>

          {/* Right — campaign card */}
          <div className="md:col-span-5">
            <div className="relative bg-white rounded-3xl shadow-xl border border-[#efe6d2] p-8 md:p-10">
              <div className="absolute -top-3 left-8 bg-[#FFCF63] text-[#1F3247] text-[11px] font-bold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full">
                The Campaign
              </div>
              <Logo size={48} className="mb-5" />
              <div className="text-[11px] uppercase tracking-[0.25em] text-[#698F72] font-semibold mb-1">
                Initial Goal
              </div>
              <div
                className="text-6xl md:text-7xl text-[#1F3247] leading-none mb-3"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {formatCompactDollars(campaign.goalCents)}
              </div>
              <p className="text-[#2D2A26]/80 leading-relaxed mb-7">
                to purchase our transitional home outright — and keep it open for the
                families who need it next.
              </p>
              <div className="mb-2 flex items-end justify-between text-sm">
                <div>
                  <div
                    className="text-2xl text-[#698F72]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {campaign.loading ? "…" : formatCompactDollars(campaign.raisedCents)}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-[#2D2A26]/60">
                    raised
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-[#2D2A26]/70">Goal</div>
                  <div
                    className="text-2xl text-[#1F3247]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {formatCompactDollars(campaign.goalCents)}
                  </div>
                </div>
              </div>
              <div className="relative h-3 bg-[#F8F1E3] rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#FFCF63] to-[#C77B5C] transition-[width] duration-700"
                  style={{ width: `${percent}%` }}
                />
              </div>
              {campaign.asOf && (
                <div className="text-[11px] text-[#2D2A26]/55 mt-2 text-right">
                  As of {campaign.asOf}
                </div>
              )}
              <Link
                to="/donate"
                className="mt-7 inline-flex w-full items-center justify-center gap-2 bg-[#FFCF63] hover:bg-[#ffc347] text-[#1F3247] py-3.5 rounded-full font-semibold transition-colors"
              >
                Donate to the campaign <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs tracking-[0.25em] uppercase text-[#698F72] font-semibold mb-3">
              How We Help
            </div>
            <h2
              className="text-3xl md:text-4xl text-[#2c3a30]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              A foundation for the next chapter.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: <HomeIcon className="w-7 h-7" />,
                title: "Safe Housing",
                body: "Secure, confidential transitional housing for adults and children escaping violence, housing insecurity, or crisis.",
                accent: "#FFCF63",
              },
              {
                icon: <Users className="w-7 h-7" />,
                title: "Community",
                body: "A supportive environment where residents connect, heal, and build the stability they need to step into independence.",
                accent: "#698F72",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="group p-8 rounded-2xl bg-[#fbf9f4] border border-[#e7e1d2] hover:shadow-md transition-shadow"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-[#4a6a52]"
                  style={{ background: card.accent === "#FFCF63" ? "#fff4d6" : "#e8efe9" }}
                >
                  {card.icon}
                </div>
                <h3
                  className="text-xl mb-3 text-[#2c3a30]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {card.title}
                </h3>
                <p className="text-[#5b6b5f] leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Need */}
      <section className="bg-[#f8f5ee] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs tracking-[0.25em] uppercase text-[#698F72] font-semibold mb-3">
              The Need
            </div>
            <h2
              className="text-3xl md:text-4xl text-[#2c3a30]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Why this matters in Northwest Indiana.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                stat: "1 in 3",
                label: "Indiana women experience intimate partner violence in their lifetime",
                source: "IN Coalition Against Domestic Violence",
              },
              {
                stat: "7",
                label: "average attempts a survivor makes before leaving for good",
                source: "National Domestic Violence Hotline",
              },
              {
                stat: "~70%",
                label: "of survivors stay or return because they have nowhere safe to go",
                source: "Stronger Together",
              },
            ].map((item) => (
              <div
                key={item.label}
                className={`rounded-2xl py-8 px-5 text-center border ${
                  item.highlight
                    ? "bg-[#1F3247] border-[#1F3247] text-white"
                    : "bg-white border-[#e7e1d2]"
                }`}
              >
                <div
                  className={`text-5xl mb-3 leading-none ${
                    item.highlight ? "text-[#FFCF63]" : "text-[#4a6a52]"
                  }`}
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {item.stat}
                </div>
                <div
                  className={`text-sm leading-snug mb-3 ${
                    item.highlight ? "text-white/90" : "text-[#5b6b5f]"
                  }`}
                >
                  {item.label}
                </div>
                <div
                  className={`text-[10px] tracking-wider uppercase ${
                    item.highlight ? "text-[#FFCF63]/80" : "text-[#9a8f7d]"
                  }`}
                >
                  {item.source}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-[#FFCF63] to-[#ffd97a] p-12 md:p-16 text-center relative overflow-hidden">
          <div
            aria-hidden
            className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-white/30"
          />
          <div className="relative">
            <Heart className="w-12 h-12 mx-auto mb-6 text-[#4a6a52]" />
            <h2
              className="text-3xl md:text-4xl mb-5 text-[#2c3a30]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Make a difference today.
            </h2>
            <p className="text-lg text-[#4a6a52] mb-8 max-w-2xl mx-auto">
              Your support provides safety, hope, and a path to independence for adults
              rebuilding their lives.
            </p>
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 bg-[#4a6a52] hover:bg-[#3b5642] text-white px-8 py-4 rounded-full font-semibold transition-colors"
            >
              Support Our Mission <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
