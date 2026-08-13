import { Link } from "react-router-dom";

const BookingSuccess = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
        <div className="mb-4 text-6xl">✅</div>

        <h1 className="mb-3 text-3xl font-bold">
          Booking Confirmed
        </h1>

        <p className="mb-6 text-gray-600">
          Your service has been booked successfully.
        </p>

        <Link
          to="/"
          className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default BookingSuccess;