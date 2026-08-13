const services = [
  {
    id: 1,
    name: "AC Repair",
    category: "Home",
    price: "₹499",
    status: "Active",
  },
  {
    id: 2,
    name: "Plumbing",
    category: "Home",
    price: "₹299",
    status: "Active",
  },
  {
    id: 3,
    name: "House Cleaning",
    category: "Cleaning",
    price: "₹699",
    status: "Inactive",
  },
];

const Services = () => {
  return (
    <div>

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Services
          </h1>

          <p className="mt-2 text-gray-500">
            Manage all available services
          </p>

        </div>

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Search service..."
            className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-yellow-400"
          />

          <button className="rounded-lg bg-yellow-400 px-5 py-2 font-semibold text-black hover:bg-yellow-500">
            + Add Service
          </button>

        </div>

      </div>
            <div className="overflow-x-auto rounded-xl bg-white shadow">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-6 py-4 text-left">Service</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Price</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-center">Action</th>

            </tr>

          </thead>

          <tbody>

            {services.map((service) => (

              <tr
                key={service.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="px-6 py-4 font-medium">
                  {service.name}
                </td>

                <td className="px-6 py-4">
                  {service.category}
                </td>

                <td className="px-6 py-4 font-semibold text-yellow-600">
                  {service.price}
                </td>

                <td className="px-6 py-4">

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      service.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {service.status}
                  </span>

                </td>

                <td className="px-6 py-4">

                  <div className="flex justify-center gap-3">

                    <button className="rounded-lg bg-yellow-400 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-500">
                      Edit
                    </button>

                    <button className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600">
                      Delete
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

export default Services;