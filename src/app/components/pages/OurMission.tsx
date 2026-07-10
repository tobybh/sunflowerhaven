import { Target, Heart, Home, Users } from "lucide-react";

export function OurMission() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-green-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl mb-6">Our Mission</h1>
          <p className="text-xl text-green-100">
            To provide safe housing, support services, and resources that empower people
            to escape domestic violence and rebuild their lives with dignity and independence.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-50 p-8 rounded-lg mb-12">
            <h2 className="text-2xl mb-4">What We Believe</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Every person deserves to live free from fear and violence. At Sunflower Haven,
              we believe that with the right support, resources, and community, survivors can
              not only escape their abusers but thrive in their new independence.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              We are committed to providing more than just shelter—we are providing a home
              and a step towards a life free from violence.
            </p>
          </div>

          {/* Core Values */}
          <h2 className="text-3xl mb-8 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="flex gap-4">
              <div className="bg-green-700 text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl mb-2">Compassion</h3>
                <p className="text-gray-600">
                  We approach every survivor with empathy, understanding, and non-judgment,
                  recognizing the courage it takes to seek help.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-yellow-500 text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                <Home className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl mb-2">Safety First</h3>
                <p className="text-gray-600">
                  We maintain strict confidentiality and security protocols to ensure
                  the physical and emotional safety of all residents.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-green-700 text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl mb-2">Empowerment</h3>
                <p className="text-gray-600">
                  We help survivors reclaim their independence through education,
                  job training, and life skills development.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-yellow-500 text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl mb-2">Long-Term Success</h3>
                <p className="text-gray-600">
                  We focus on sustainable solutions that help people achieve lasting
                  independence and break the cycle of violence.
                </p>
              </div>
            </div>
          </div>

          {/* What We Provide */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl mb-6">What We Provide</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-green-700">•</span>
                <span>Emergency and transitional housing in a secure, confidential location</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-700">•</span>
                <span>Assistance with housing, transportation, and other essential needs</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
