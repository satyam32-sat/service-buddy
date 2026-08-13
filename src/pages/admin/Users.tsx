const users = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    role: "Client",
    status: "Active",
  },
  {
    id: 2,
    name: "Aman Verma",
    email: "aman@gmail.com",
    role: "Provider",
    status: "Active",
  },
  {
    id: 3,
    name: "Neha Singh",
    email: "neha@gmail.com",
    role: "Client",
    status: "Inactive",
  },
];

const Users = () => {
  return (
    <div>

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Users
          </h1>

          <p className="mt-2 text-gray-500">
            Manage all registered users
          </p>

        </div>

        <input
          type="text"
          placeholder="Search user..."
          className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-yellow-400"
        />

      </div>
            <div className="overflow-x-auto rounded-xl bg-white shadow">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-center">Action</th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="px-6 py-4 font-medium">
                  {user.name}
                </td>

                <td className="px-6 py-4">
                  {user.email}
                </td>

                <td className="px-6 py-4">
                  {user.role}
                </td>

                <td className="px-6 py-4">

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>

                </td>

                <td className="px-6 py-4">

                  <div className="flex justify-center gap-3">

                    <button className="rounded-lg bg-yellow-400 px-4 py-2 font-semibold text-black hover:bg-yellow-500">
                      Edit
                    </button>

                    <button className="rounded-lg bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600">
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

export default Users;