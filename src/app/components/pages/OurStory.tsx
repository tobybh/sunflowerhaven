export function OurStory() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-yellow-500 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl mb-6">Our Story</h1>
          <p className="text-xl text-yellow-50">
            Founded by advocates, driven by compassion, supported by our community.
          </p>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-green-50 p-8 rounded-lg mb-12">
            <h2 className="text-2xl mb-6">From Our Cofounder</h2>
            <div className="text-lg text-gray-700 leading-relaxed space-y-4">
              <p>
                I founded Sunflower Haven because of my experiences working with families affected by domestic violence. After college, I spent a year in the Jesuit Volunteer Corps, serving as a child advocate in a domestic violence shelter. I worked with children staying there with their mothers, and several moments from that time stayed with me.
              </p>
              <p>
                I met women who had survived extremely serious injuries caused by their partners, and their strength made a lasting impression on me. I also worked with a woman who had been granted clemency after defending herself from ongoing abuse. She was so gentle and kind that it made me realize how much fear she must have lived with. And I will never forget two very young children who were able to explain, in their own words, that their father hurt their mother. I was struck by how clearly they understood what was happening around them.
              </p>
              <p>
                In my years as a school counselor, I continued to meet students whose mothers had been harmed by domestic violence. Some had witnessed frightening incidents at home, and it was heartbreaking to see how deeply it affected them. My small town had no local resources for families in these situations, and I knew I wanted to do something to help.
              </p>
              <p>
                I talked to my best friends, Kim and Lori, and they immediately agreed. Lori and I met with the CEO of The Caring Place, a shelter in the next town, and learned that transitional housing was one of the greatest unmet needs for survivors. That conversation is what led to the creation of Sunflower Haven, Inc.
              </p>
              <p>
                Many people don't understand why someone might stay in an abusive relationship, but domestic violence often follows a cycle. Things may seem calm, then tension builds, and eventually there is an incident. Afterward, the person causing harm may apologize and promise it will never happen again, and the victim wants to believe them.
              </p>
              <p>
                Sunflower Haven exists to support survivors caught in that cycle and to offer a safe, stable place to begin again.
              </p>
              <footer className="text-gray-600 mt-6 italic">
                — Mimi, Cofounder of Sunflower Haven
              </footer>
            </div>
          </div>

          <div className="bg-yellow-50 p-8 rounded-lg">
            <h3 className="text-2xl mb-4">Join Our Story</h3>
            <p className="text-gray-700 mb-4">
              Every day, we're writing new chapters of hope, healing, and independence.
              Whether through donations, volunteering, or spreading awareness, you can
              be part of the solution.
            </p>
            <p className="text-gray-700">
              Together, we can ensure that every woman in Indiana has a safe place to turn.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
