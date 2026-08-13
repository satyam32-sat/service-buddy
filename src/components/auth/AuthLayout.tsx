import type { ReactNode } from "react";
interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

const AuthLayout = ({
  title,
  subtitle,
  children,
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      
      {/* Left Section */}
      <div className="hidden lg:flex flex-col justify-center bg-blue-600 p-16 text-white">
        <h1 className="text-5xl font-bold">
          Service Buddy
        </h1>

        <p className="mt-6 text-lg leading-8 text-blue-100">
          Find trusted professionals for Home Cleaning,
          Electrician, Plumbing, Carpenter and more.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

          <h2 className="text-3xl font-bold text-gray-800">
            {title}
          </h2>

          <p className="mt-2 text-gray-500">
            {subtitle}
          </p>

          <div className="mt-8">
            {children}
          </div>

        </div>
      </div>

    </div>
  );
};

export default AuthLayout;