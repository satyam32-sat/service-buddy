const analytics = [
  {
    title: "Total Revenue",
    value: "₹1,25,000",
  },
  {
    title: "Total Bookings",
    value: "289",
  },
  {
    title: "Total Users",
    value: "124",
  },
  {
    title: "Total Services",
    value: "52",
  },
];

const Analytics = () => {
  return (
    <div>

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Analytics
        </h1>

        <p className="mt-2 text-gray-500">
          Business performance overview
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {analytics.map((item) => (

          <div
            key={item.title}
            className="rounded-xl bg-white p-6 shadow hover:shadow-lg transition"
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

        {/* Performance Summary */}

        <div className="rounded-xl bg-white p-6 shadow lg:col-span-2">

          <h2 className="mb-5 text-xl font-bold">
            Performance Summary
          </h2>

          <div className="space-y-5">

            <div>

              <div className="mb-2 flex justify-between">

                <span>Total Revenue Growth</span>
                <span className="font-semibold text-green-600">
                  82%
                </span>

              </div>

              <div className="h-3 rounded-full bg-gray-200">

                <div className="h-3 w-4/5 rounded-full bg-yellow-400"></div>

              </div>

            </div>

            <div>

              <div className="mb-2 flex justify-between">

                <span>Customer Satisfaction</span>
                <span className="font-semibold text-green-600">
                  94%
                </span>

              </div>

              <div className="h-3 rounded-full bg-gray-200">

                <div className="h-3 w-[94%] rounded-full bg-green-500"></div>

              </div>

            </div>

            <div>

              <div className="mb-2 flex justify-between">

                <span>Completed Bookings</span>
                <span className="font-semibold text-blue-600">
                  76%
                </span>

              </div>

              <div className="h-3 rounded-full bg-gray-200">

                <div className="h-3 w-3/4 rounded-full bg-blue-500"></div>

              </div>

            </div>

          </div>

        </div>

        {/* Report Card */}

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="mb-5 text-xl font-bold">
            Reports
          </h2>

          <p className="mb-6 text-gray-500">
            Download business reports and analytics.
          </p>

          <button className="w-full rounded-lg bg-yellow-400 py-3 font-semibold text-black transition hover:bg-yellow-500">
            Export Report
          </button>

        </div>

      </div>

    </div>
  );
};

export default Analytics;