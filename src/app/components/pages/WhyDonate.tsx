import { Link } from "react-router";
import {
  useCampaignProgress,
  formatCompactDollars,
  clampPercent,
} from "../../lib/useCampaignProgress";

export function WhyDonate() {
  const campaign = useCampaignProgress();
  const percent = clampPercent(campaign.raisedCents, campaign.goalCents);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#4a6a52] to-[#3b5642] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-4xl md:text-5xl mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Why Donate
          </h1>
          <p className="text-lg text-[#e8efe9]">
            Your contribution directly transforms lives and provides hope to adults
            rebuilding their futures.
          </p>
        </div>
      </section>

      {/* The Need */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl mb-8 text-center">The Reality of Domestic Violence</h2>

          {/* The Crisis */}
          <div className="prose max-w-none mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Every year, over 12 million Americans endure the devastating reality of intimate partner violence.
              Here in Indiana, the crisis is staggering: nearly 43% of adults will be targeted
              in their lifetimes.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Leaving is never as simple as just walking out the door. On average, a survivor must make seven
              terrifying attempts to leave before finally escaping. They are trapped by fear and systematic
              control, as abusers deliberately sever their access to money, transportation, and even their own
              children.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              When survivors of domestic violence finally summon the immense courage to reach out, they desperately need a safe place
              to land. Tragically, local programs are overwhelmed. On any given day in Indiana, hundreds of
              desperate pleas for help go unanswered simply because the resources do not exist—and year after
              year, the need only grows.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>Sunflower Haven is working to change that, but we need your help.</strong>
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              We provide confidential, transitional housing—a secure sanctuary where survivors can break free
              from their abusers and safely rebuild their lives. By donating to our cause, you are doing more
              than just writing a check; you are giving a terrified person a genuine, lasting escape from violence.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Every single dollar you donate goes directly to supporting survivors of domestic violence. Join us in
              fighting this invisible epidemic. Give today, and be the lifeline someone desperately needs.
            </p>
            <p className="text-sm text-gray-600">
              For more domestic violence statistics visit{" "}
              <a
                href="https://www.thehotline.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4a6a52] hover:underline"
              >
                https://www.thehotline.org/
              </a>
            </p>
          </div>

          {/* The Campaign — slide 4 inspired */}
          <div className="relative bg-[#F8F1E3] rounded-3xl border border-[#efe6d2] p-8 md:p-12 mb-12 overflow-hidden">
            <div
              aria-hidden
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-40"
              style={{ background: "radial-gradient(circle, #FFCF63 0%, transparent 65%)" }}
            />
            <div className="relative grid md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-7">
                <div className="inline-flex items-center gap-2 bg-[#FFCF63] text-[#1F3247] text-[11px] font-bold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full mb-5">
                  The Campaign
                </div>
                <h2
                  className="text-4xl md:text-5xl text-[#1F3247] mb-4 leading-[1.05]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  A safe step <span className="italic text-[#698F72]">forward.</span>
                </h2>
                <p className="text-[#2D2A26]/80 leading-relaxed max-w-xl mb-6">
                  We're raising <strong className="text-[#1F3247]">$300,000</strong> to purchase
                  our transitional home outright — and keep its doors open for the families who
                  need it next. Every gift moves us closer to permanent sanctuary.
                </p>
                <Link
                  to="/donate"
                  className="inline-flex items-center gap-2 bg-[#1F3247] hover:bg-[#162638] text-white px-7 py-3.5 rounded-full font-semibold transition-colors"
                >
                  Help us buy the house →
                </Link>
                <div className="flex items-center gap-3 mt-6 text-xs tracking-wider text-[#2D2A26]/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C77B5C]" />
                  <span>501(c)(3) charity</span>
                </div>
              </div>

              <div className="md:col-span-5">
                <div className="bg-white rounded-2xl shadow-md border border-[#efe6d2] p-7">
                  <div
                    className="text-6xl text-[#1F3247] leading-none mb-2"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {formatCompactDollars(campaign.goalCents)}
                  </div>
                  <div className="text-xs uppercase tracking-[0.25em] text-[#698F72] font-semibold mb-6">
                    Initial Goal
                  </div>
                  <div className="flex items-end justify-between mb-2">
                    <div>
                      <div
                        className="text-2xl text-[#698F72]"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {campaign.loading ? "…" : formatCompactDollars(campaign.raisedCents)}
                      </div>
                      <div className="text-[11px] uppercase tracking-wider text-[#2D2A26]/60">
                        raised
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] uppercase tracking-wider text-[#2D2A26]/60">
                        of goal
                      </div>
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
                  <p className="text-[11px] text-[#2D2A26]/60 mt-3 text-center">
                    {campaign.asOf
                      ? `As of ${campaign.asOf} · all gifts tax-deductible`
                      : "Updated regularly · all gifts tax-deductible"}
                  </p>
                </div>
              </div>
            </div>
          </div>


          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl mb-4">Every Gift Matters</h2>
            <p className="text-gray-700 mb-6 text-lg">
              Whether you give $25 or $2,500, you're providing safety, hope, and a
              path to independence for adults in crisis.
            </p>
            <Link
              to="/donate"
              className="bg-[#4a6a52] hover:bg-[#3b5642] text-white px-8 py-4 rounded-full text-lg inline-block transition-colors font-semibold"
            >
              Make a Donation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
