const providers = [
  {
    id: 1,
    name: "Aman Verma",
    service: "Electrician",
    experience: "5 Years",
    status: "Approved",
  },
  {
    id: 2,
    name: "Ravi Kumar",
    service: "Plumber",
    experience: "3 Years",
    status: "Pending",
  },
  {
    id: 3,
    name: "Suresh Singh",
    service: "AC Repair",
    experience: "4 Years",
    status: "Rejected",
  },
];

const Providers = () => {
  return (
    <div>

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Providers
          </h1>

          <p className="mt-2 text-gray-500">
            Manage all service providers
          </p>

        </div>

        <input
          type="text"
          placeholder="Search provider..."
          className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-yellow-400"
        />

      </div>
            <div className="overflow-x-auto rounded-xl bg-white shadow">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Service</th>
              <th className="px-6 py-4 text-left">Experience</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-center">Action</th>

            </tr>

          </thead>

          <tbody>

            {providers.map((provider) => (

              <tr
                key={provider.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="px-6 py-4 font-medium">
                  {provider.name}
                </td>

                <td className="px-6 py-4">
                  {provider.service}
                </td>

                <td className="px-6 py-4">
                  {provider.experience}
                </td>

                <td className="px-6 py-4">

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      provider.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : provider.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {provider.status}
                  </span>

                </td>

                <td className="px-6 py-4">

                  <div className="flex justify-center gap-2">

                    <button className="rounded-lg bg-green-500 px-3 py-2 text-sm font-semibold text-white hover:bg-green-600">
                      Approve
                    </button>

                    <button className="rounded-lg bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-600">
                      Reject
                    </button>

                    <button className="rounded-lg bg-yellow-400 px-3 py-2 text-sm font-semibold text-black hover:bg-yellow-500">
                      View
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Providers;