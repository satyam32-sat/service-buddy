const stats = [
  {
    title: "Total Users",
    value: 124,
  },
  {
    title: "Providers",
    value: 38,
  },
  {
    title: "Services",
    value: 52,
  },
  {
    title: "Bookings",
    value: 289,
  },
];

const Dashboard = () => {
  return (
    <div>

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-600">
          Welcome back, Administrator 👋
        </p>

      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        {stats.map((item) => (

          <div
            key={item.title}
            className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg"
          >

            <p className="text-gray-500">
              {item.title}
            </p>

            <h2 className="mt-3 text-4xl font-bold text-yellow-500">
              {item.value}
            </h2>

          </div>

        ))}

      </div>
            <div className="mt-10 grid gap-8 lg:grid-cols-3">

        {/* Recent Bookings */}

        <div className="rounded-xl bg-white p-6 shadow lg:col-span-2">

          <h2 className="mb-5 text-xl font-bold">
            Recent Bookings
          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="py-3 text-left">Customer</th>
                <th className="py-3 text-left">Service</th>
                <th className="py-3 text-left">Status</th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-b">

                <td className="py-4">Rahul</td>
                <td>AC Repair</td>

                <td>
                  <span className="rounded bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                    Pending
                  </span>
                </td>

              </tr>

              <tr className="border-b">

                <td className="py-4">Neha</td>
                <td>House Cleaning</td>

                <td>
                  <span className="rounded bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                    Completed
                  </span>
                </td>

              </tr>

              <tr>

                <td className="py-4">Aman</td>
                <td>Electrician</td>

                <td>
                  <span className="rounded bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                    Accepted
                  </span>
                </td>

              </tr>

            </tbody>

          </table>

        </div>

        {/* Quick Actions */}

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="mb-5 text-xl font-bold">
            Quick Actions
          </h2>

          <div className="space-y-4">

            <button className="w-full rounded-lg bg-yellow-400 py-3 font-semibold text-black transition hover:bg-yellow-500">
              Add Service
            </button>

            <button className="w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-gray-900">
              Manage Users
            </button>

            <button className="w-full rounded-lg border border-yellow-400 py-3 font-semibold text-yellow-500 transition hover:bg-yellow-400 hover:text-black">
              View Reports
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;