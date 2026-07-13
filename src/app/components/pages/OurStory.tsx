const BOARD = [
  {
    name: "Lori Devereaux",
    role: "Board Member / Founder",
    bio: "Longtime Chesterton resident, Lori is the owner of Sunshine Homes, Inc., a residential home construction company, and has managed rental properties in Porter County, Indiana for 20 years.",
  },
  {
    name: "Mimi Hurst",
    role: "Board Member / Founder",
    bio: "Mimi is a retired school counselor. After college, Mimi did a year of volunteer work through the Jesuit Volunteer Corps, placed as a child advocate at a domestic violence shelter. Before returning to school to become a school counselor, Mimi worked in the investment field in Chicago primarily trading municipal bonds.",
  },
  {
    name: "Kim Parks",
    role: "Board Member",
    bio: "Kim is a retired teacher. Kim currently volunteers her time teaching Sunday school. Kim worked in the investment field in Chicago before returning to school to become a teacher.",
  },
];

export function OurStory() {
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
        <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="text-xs tracking-[0.3em] uppercase text-[#1F3247] font-semibold mb-5">
            Our Story
          </div>
          <h1
            className="text-4xl md:text-5xl text-[#1F3247] leading-[1.05]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Founded by advocates,{" "}
            <span className="italic text-[#698F72]">driven by compassion.</span>
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border border-[#e7e1d2] rounded-2xl p-8 md:p-12 shadow-sm">
            <div className="text-xs tracking-[0.25em] uppercase text-[#698F72] font-semibold mb-5">
              From Our Cofounder
            </div>
            <div className="space-y-5 text-[#2D2A26]/85 leading-relaxed text-[17px]">
              <p>
                Sunflower Haven provides transitional housing for people fleeing
                domestic violence.
              </p>
              <p>
                I worked with a 10-year-old student who came to school in shock and
                visibly shaking. His stepdad had pulled a gun on his mom that morning
                and threatened to kill her. The student did not know if his mom was
                dead or alive. Police were called. Fortunately, the mom had not been
                shot. The man was arrested, an order of protection was issued, and
                Child Protective Services was involved.
              </p>
              <p>
                For the first six months, the system was working for this family.
                The mom and her two children were living in a home free from violence
                and moving forward.
              </p>
              <p>
                The mom then came to me frantic. Her abuser was out of jail, he had
                resources for an attorney, and because their house was only in his
                name, she was being forced to move. I could not believe it. The mom
                had limited resources. There were no good options for housing for
                this mom and her two young children. It was heartbreaking. They ended
                up in a small apartment in a rough apartment complex. For my student,
                this was very challenging and confusing.
              </p>
              <p>
                As a school counselor for 15 years, I had students every year who
                experienced domestic violence in their home. Having worked at a
                domestic violence shelter, I knew about the cycle of violence and
                how hard it can be for someone to leave a violent situation —
                especially when children are involved. I wanted to do something.
              </p>
              <p>
                In November 2025, with the help of two best friends, Sunflower Haven
                was founded.
              </p>
            </div>
            <footer
              className="text-[#4a6a52] mt-8 text-lg"
              style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
            >
              — Mimi Hurst
            </footer>
          </div>
        </div>
      </section>

      {/* Board */}
      <section className="py-16 px-4 bg-[#fbf9f4] border-y border-[#efe6d2]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs tracking-[0.25em] uppercase text-[#698F72] font-semibold mb-3">
              Leadership
            </div>
            <h2
              className="text-3xl md:text-4xl text-[#1F3247]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Meet the board.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {BOARD.map((member) => (
              <div
                key={member.name}
                className="bg-white border border-[#e7e1d2] rounded-2xl p-7 flex flex-col"
              >
                <h3
                  className="text-xl text-[#1F3247] leading-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {member.name}
                </h3>
                <div className="text-[11px] tracking-[0.2em] uppercase text-[#698F72] font-semibold mt-1 mb-4">
                  {member.role}
                </div>
                <p className="text-[15px] text-[#2D2A26]/80 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 max-w-3xl mx-auto text-center">
            <div className="inline-block bg-[#FFCF63]/25 border border-[#f0d98a] text-[#2c3a30] rounded-full px-5 py-2 text-sm">
              All board members and officers are volunteers. No funds are being used
              to pay board members, officers, employees, or directors —{" "}
              <strong>100% of donations go toward our mission.</strong>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
