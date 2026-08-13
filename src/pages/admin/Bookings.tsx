const bookings = [
  {
    id: 1,
    customer: "Rahul Sharma",
    provider: "Aman Verma",
    service: "AC Repair",
    amount: "₹499",
    status: "Pending",
  },
  {
    id: 2,
    customer: "Neha Singh",
    provider: "Ravi Kumar",
    service: "House Cleaning",
    amount: "₹699",
    status: "Completed",
  },
  {
    id: 3,
    customer: "Satyam Gupta",
    provider: "Suresh Singh",
    service: "Electrician",
    amount: "₹399",
    status: "Accepted",
  },
];

const Bookings = () => {
  return (
    <div>

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Bookings
          </h1>

          <p className="mt-2 text-gray-500">
            Manage all customer bookings
          </p>

        </div>

        <input
          type="text"
          placeholder="Search booking..."
          className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-yellow-400"
        />

      </div>
            <div className="overflow-x-auto rounded-xl bg-white shadow">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-6 py-4 text-left">Customer</th>
              <th className="px-6 py-4 text-left">Provider</th>
              <th className="px-6 py-4 text-left">Service</th>
              <th className="px-6 py-4 text-left">Amount</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-center">Action</th>

            </tr>

          </thead>

          <tbody>

            {bookings.map((booking) => (

              <tr
                key={booking.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="px-6 py-4 font-medium">
                  {booking.customer}
                </td>

                <td className="px-6 py-4">
                  {booking.provider}
                </td>

                <td className="px-6 py-4">
                  {booking.service}
                </td>

                <td className="px-6 py-4 font-semibold text-yellow-600">
                  {booking.amount}
                </td>

                <td className="px-6 py-4">

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      booking.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {booking.status}
                  </span>

                </td>

                <td className="px-6 py-4">

                  <button className="rounded-lg bg-yellow-400 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-500">
                    View
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Bookings;