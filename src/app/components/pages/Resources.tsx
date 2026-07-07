import {
  Phone,
  Globe,
  MessageSquare,
  MapPin,
  ExternalLink,
  AlertTriangle,
  HeartHandshake,
  ShieldAlert,
} from "lucide-react";

type Resource = {
  name: string;
  blurb: string;
  url?: string;
  phone?: string;
  text?: string;
  badge?: string;
  location?: string;
};

const LOCAL: Resource[] = [
  {
    name: "The Caring Place",
    blurb:
      "Northwest Indiana's domestic-violence shelter and advocacy program. Confidential emergency shelter, counseling, legal advocacy, and a 24/7 crisis line for survivors and their children.",
    url: "https://www.thecaringplacenwi.org/",
    phone: "219-464-2128",
    location: "Valparaiso, IN — serving Porter County",
    badge: "Local · 24/7",
  },
];

const NATIONAL: Resource[] = [
  {
    name: "National Domestic Violence Hotline",
    blurb:
      "Free, confidential, 24/7 support from trained advocates. Safety planning, local referrals, and crisis intervention in 200+ languages.",
    url: "https://www.thehotline.org/",
    phone: "1-800-799-7233",
    text: "Text START to 88788",
    badge: "24/7 · Confidential",
  },
  {
    name: "loveisrespect",
    blurb:
      "Support for young people experiencing dating abuse — peer advocates available by phone, text, or chat.",
    url: "https://www.loveisrespect.org/",
    phone: "1-866-331-9474",
    text: "Text LOVEIS to 22522",
    badge: "Youth & teens",
  },
  {
    name: "StrongHearts Native Helpline",
    blurb:
      "Culturally-appropriate domestic and sexual violence support for Native Americans and Alaska Natives.",
    url: "https://strongheartshelpline.org/",
    phone: "1-844-762-8483",
    badge: "Native communities",
  },
  {
    name: "RAINN — Sexual Assault Hotline",
    blurb:
      "The nation's largest anti-sexual-violence organization. 24/7 hotline and online chat support.",
    url: "https://www.rainn.org/",
    phone: "1-800-656-4673",
    badge: "24/7",
  },
];

export function Resources() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#F8F1E3]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(900px 600px at 90% -10%, rgba(255, 207, 99, 0.18), transparent 70%), radial-gradient(900px 600px at -10% 110%, rgba(105, 143, 114, 0.14), transparent 70%)",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur border border-[#efe6d2] rounded-full px-4 py-1.5 mb-5">
            <HeartHandshake className="w-4 h-4 text-[#4a6a52]" />
            <span className="text-xs tracking-[0.22em] uppercase text-[#1F3247] font-semibold">
              You are not alone
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl text-[#1F3247] mb-5 leading-[1.05]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Resources & <span className="italic text-[#698F72]">support.</span>
          </h1>
          <p className="text-lg text-[#2D2A26]/80 max-w-2xl mx-auto">
            Sunflower Haven is not a crisis program. If you need immediate help, the
            partners and hotlines below are the right places to start — all are
            confidential and trained to support survivors.
          </p>
        </div>
      </section>

      {/* Emergency banner */}
      <section className="px-4 pt-10">
        <div className="max-w-5xl mx-auto rounded-2xl border border-[#f0c5c5] bg-[#fbe8e8] p-5 flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-[#a83232] shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-semibold text-[#7a2929] mb-1">
              In immediate danger? Call 911.
            </div>
            <p className="text-sm text-[#7a2929]/85">
              If you are being harmed or fear you will be, contact emergency services
              first. Then reach out to one of the support lines below when it is safe.
            </p>
          </div>
        </div>
      </section>

      {/* Local */}
      <Section
        eyebrow="Local Partner"
        title="Northwest Indiana"
        icon={<MapPin className="w-5 h-5" />}
      >
        <div className="grid gap-5">
          {LOCAL.map((r) => (
            <ResourceCard key={r.name} resource={r} featured />
          ))}
        </div>
      </Section>

      {/* National */}
      <Section
        eyebrow="National Hotlines"
        title="24/7 confidential support"
        icon={<ShieldAlert className="w-5 h-5" />}
      >
        <div className="grid md:grid-cols-2 gap-5">
          {NATIONAL.map((r) => (
            <ResourceCard key={r.name} resource={r} />
          ))}
        </div>
      </Section>

      {/* Footer note */}
      <section className="px-4 pb-20">
        <div className="max-w-3xl mx-auto text-center text-sm text-[#2D2A26]/60">
          <p>
            Browsing safely?{" "}
            <button
              onClick={() => window.location.replace("https://www.google.com")}
              className="underline hover:text-[#1F3247]"
            >
              Press ESC at any time to quickly leave this site.
            </button>
          </p>
        </div>
      </section>
    </div>
  );
}

function Section({
  eyebrow,
  title,
  icon,
  children,
}: {
  eyebrow: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-2 text-[#698F72]">
          {icon}
          <span className="text-xs tracking-[0.25em] uppercase font-semibold">
            {eyebrow}
          </span>
        </div>
        <h2
          className="text-3xl md:text-4xl text-[#1F3247] mb-8"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

function ResourceCard({
  resource,
  featured = false,
}: {
  resource: Resource;
  featured?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-7 border ${
        featured
          ? "bg-white border-[#efe6d2] shadow-sm md:p-8"
          : "bg-white border-[#efe6d2]"
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3
          className="text-2xl text-[#1F3247] leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {resource.name}
        </h3>
        {resource.badge && (
          <span className="shrink-0 text-[10px] tracking-[0.2em] uppercase font-bold text-[#1F3247] bg-[#FFCF63] rounded-full px-3 py-1">
            {resource.badge}
          </span>
        )}
      </div>
      <p className="text-[#2D2A26]/80 leading-relaxed mb-5">{resource.blurb}</p>

      <div className="space-y-2 text-sm">
        {resource.phone && (
          <a
            href={`tel:${resource.phone.replace(/[^0-9]/g, "")}`}
            className="flex items-center gap-2 text-[#1F3247] hover:text-[#698F72] transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="font-semibold">{resource.phone}</span>
          </a>
        )}
        {resource.text && (
          <div className="flex items-center gap-2 text-[#2D2A26]/80">
            <MessageSquare className="w-4 h-4 text-[#698F72]" />
            <span>{resource.text}</span>
          </div>
        )}
        {resource.location && (
          <div className="flex items-center gap-2 text-[#2D2A26]/80">
            <MapPin className="w-4 h-4 text-[#698F72]" />
            <span>{resource.location}</span>
          </div>
        )}
      </div>

      {resource.url && (
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
            featured
              ? "bg-[#1F3247] hover:bg-[#162638] text-white"
              : "bg-[#F8F1E3] hover:bg-[#efe6d2] text-[#1F3247] border border-[#efe6d2]"
          }`}
        >
          <Globe className="w-4 h-4" />
          Visit website
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      )}
    </div>
  );
}
