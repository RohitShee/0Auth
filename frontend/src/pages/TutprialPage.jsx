import { Link } from "react-router-dom";
import {
  Code2,
  LayoutDashboard,
  KeyRound,
  ShieldCheck,
  Settings2,
  UsersRound,
} from "lucide-react";

const TutorialPage = () => {
  return (
    <div className="min-h-screen bg-[#0D0D2B] text-white p-6 md:p-12">
      <h1 className="text-3xl font-bold mb-4">How to Integrate Authentication in Your App</h1>
      <p className="text-gray-300 mb-8 text-lg">
        Follow this step-by-step tutorial to set up and use Auth-as-a-Service in your project.
      </p>

      {/* Core Steps */}
      <StepCard
        icon={<LayoutDashboard className="text-indigo-400" />}
        title="Step 1: Create a Project"
        description="From your dashboard, click on 'Create Project'. You'll get a unique API key after naming your project.copy the api key for use it in your project"
      />

      <StepCard
        icon={<KeyRound className="text-green-400" />}
        title="Step 2: Use the API Key"
        description="You need to include the X-API-KEY header in every request to authenticate your project."
        codeSnippet={`Headers:
X-API-KEY: <your_project_api_key>`}
      />

      <StepCard
        icon={<ShieldCheck className="text-yellow-400" />}
        title="Step 3: Signup & Login with Extra Fields"
        description="User data must conatin email and password for basic authentication purpose. One can also use other Properties like name,avatar_url,role.
        This field must have same json key as they are name here.One can add also extra field in custom_field. here is an example :"
        codeSnippet={`
{
  "email": "user@example.com",
  "password": "securePass123",
  "name": "John Doe",
  "avatar_url": "https://cdn.com/pic.png",
  "role": "developer",
  "custom_field": {
      "phone": "+91-1234567890",
      "country": "India"
    }
}`}
      />

      <StepCard
        icon={<Code2 className="text-pink-400" />}
        title="Step 4: Get Authenticated User Info"
        description="Use the JWT token to call secure endpoints."
        codeSnippet={`GET /user/me
Headers:
Authorization: Bearer <token>`}
      />

      <StepCard
        icon={<UsersRound className="text-blue-400" />}
        title="View All Users in a Project"
        description="From your dashboard → click a project to see all users, their profile data, and activity."
      />

      <StepCard
        icon={<Settings2 className="text-orange-400" />}
        title="Update a User’s Profile"
        description="Client can Update a user profiile and also delete one User using the edit and delete button on the project details"
      />

      {/* CTA */}
      <div className="mt-10">
        <Link to="/dashboard">
          <button className="bg-white text-black px-6 py-2 rounded hover:bg-gray-300 transition">
            Go to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

const StepCard = ({ icon, title, description, codeSnippet }) => (
  <div className="mb-8 bg-[#1A1A40] p-6 rounded-lg border border-gray-700">
    <div className="flex items-center gap-4 mb-3">
      <div className="p-2 rounded bg-[#1f1f4a]">{icon}</div>
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
    <p className="text-gray-300 mb-3">{description}</p>
    {codeSnippet && (
      <pre className="bg-[#121230] text-green-300 p-4 rounded text-sm overflow-x-auto whitespace-pre-wrap">
        <code>{codeSnippet}</code>
      </pre>
    )}
  </div>
);

export default TutorialPage;
