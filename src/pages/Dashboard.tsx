const Dashboard = () => {
  const bookings = [
    {
      id: 1,
      service: "Electrician",
      date: "05 Aug 2026",
      status: "Pending",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <div className="mx-auto max-w-7xl px-6">

        <h1 className="mb-8 text-4xl font-bold">
          Welcome Back 👋
        </h1>

        {/* Dashboard Cards */}

        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-lg font-semibold text-gray-600">
              Total Bookings
            </h2>

            <p className="mt-4 text-4xl font-bold text-blue-600">
              {bookings.length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-lg font-semibold text-gray-600">
              Pending
            </h2>

            <p className="mt-4 text-4xl font-bold text-yellow-500">
              {
                bookings.filter(
                  (booking) => booking.status === "Pending"
                ).length
              }
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-lg font-semibold text-gray-600">
              Completed
            </h2>

            <p className="mt-4 text-4xl font-bold text-green-600">
              {
                bookings.filter(
                  (booking) => booking.status === "Completed"
                ).length
              }
            </p>
          </div>

        </div>

        {/* My Bookings */}

        <div className="mt-10 rounded-xl bg-white p-6 shadow">

          <h2 className="mb-6 text-2xl font-bold">
            My Bookings
          </h2>

          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="mb-4 rounded-lg border p-5"
            >
              <h3 className="text-xl font-semibold">
                {booking.service}
              </h3>

              <p className="mt-2 text-gray-600">
                Booking Date : {booking.date}
              </p>

              <span className="mt-3 inline-block rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-700">
                {booking.status}
              </span>
            </div>
          ))}

        </div>

        {/* Profile */}

        <div className="mt-10 rounded-xl bg-white p-6 shadow">

          <h2 className="mb-5 text-2xl font-bold">
            Profile
          </h2>

          <p>
            <strong>Name:</strong> Satyam Pandey
          </p>

          <p className="mt-2">
            <strong>Email:</strong> satyam@gmail.com
          </p>

          <p className="mt-2">
            <strong>Phone:</strong> +91 9876543210
          </p>

          <button className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
            Edit Profile
          </button>

        </div>

      </div>
    </main>
  );
};

export default Dashboard;