import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { FaEdit } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { HiLink, HiUser } from "react-icons/hi2";
import Swal from "sweetalert2";

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [profile, setProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/admin/profile/${user.email}`)
        .then((res) => setProfile(res.data))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  }, [user, axiosSecure]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.patch(
        `/users/profile/${profile.user.email}`,
        formData
      );
      if (res.data.modifiedCount) {
        setProfile({
          ...profile,
          user: { ...profile.user, ...formData },
        });
        setIsModalOpen(false);
        Swal.fire({
          icon: "success",
          title: "Profile updated",
          text: "Your profile has been updated successfully.",
          confirmButtonColor: "#8B5CF6",
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "No changes",
          text: "No changes were made to your profile.",
          confirmButtonColor: "#8B5CF6",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  if (loading || !profile?.user) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const { user: u } = profile;
  const avatarSrc = u.photo || u.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png";

  return (
    <>
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-base-100 rounded-3xl shadow-xl p-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <img
              src={avatarSrc}
              alt=""
              className="w-32 h-32 rounded-full border-4 border-primary object-cover"
            />
            <div className="flex-1">
              <h1 className="text-4xl font-bold">{u.name}</h1>
              <p className="text-base-content/60 mt-2">{u.email}</p>
              <div className="mt-4">
                <span className="badge badge-primary badge-lg">Administrator</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
          {[
            { label: "Products", value: profile.totalProducts, color: "text-primary" },
            { label: "Users", value: profile.totalUsers, color: "text-success" },
            { label: "Orders", value: profile.totalOrders, color: "text-warning" },
            { label: "Reviews", value: profile.totalReviews, color: "text-info" },
            {
              label: "Revenue",
              value: `৳${profile.totalRevenue?.toLocaleString()}`,
              color: "text-error",
            },
          ].map((stat) => (
            <div key={stat.label} className="bg-base-100 rounded-3xl shadow-xl p-6">
              <p className="text-base-content/60">{stat.label}</p>
              <h2 className={`text-4xl font-bold ${stat.color} mt-2`}>{stat.value}</h2>
            </div>
          ))}
        </div>

        {/* Account Info */}
        <div className="bg-base-100 rounded-3xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Account Information</h2>
            <button
              onClick={() => { setFormData(u); setIsModalOpen(true); }}
              className="btn btn-primary btn-sm"
            >
              <FaEdit /> Edit
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { label: "Name", value: u.name },
              { label: "Email", value: u.email },
              { label: "Phone", value: u.phone || "N/A" },
              { label: "City", value: u.city || "N/A" },
              { label: "Address", value: u.address || "N/A" },
              { label: "Postal Code", value: u.postalCode || "N/A" },
              { label: "Role", value: u.role },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-base-content/60">{item.label}</p>
                <h3 className="font-semibold">{item.value}</h3>
              </div>
            ))}
            <div>
              <p className="text-base-content/60">Status</p>
              <span className="badge badge-success">{u.status}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-base-100 rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            <Link to="/dashboard/admin/add-product" className="btn btn-primary">Add Product</Link>
            <Link to="/dashboard/admin/manage-products" className="btn btn-outline">Manage Products</Link>
            <Link to="/dashboard/admin/manage-users" className="btn btn-outline">Manage Users</Link>
            <Link to="/dashboard/admin/manage-orders" className="btn btn-outline">Manage Orders</Link>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          // style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
        >
          <div
            className="bg-base-100 w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl"
            // style={{ border: "0.5px solid rgba(255,255,255,0.08)" }}
          >
            {/* Modal Header */}
            <div
              className="relative flex items-center gap-4 px-7 py-6 bg-accent"
              // style={{ background: "#1a1a2e" }}
            >
              <div
                className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-base-content text-xl font-semibold overflow-hidden"
                // style={{ border: "2px solid rgba(255,255,255,0.2)", background: "#4f46e5" }}
              >
                {formData.photoURL || formData.photo ? (
                  <img
                    src={formData.photoURL || formData.photo}
                    alt=""
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                ) : (
                  <HiUser size={24} />
                )}
              </div>

              <div>
                <h2 className="text-lg font-semibold text-base-content leading-tight">Edit profile</h2>
                <p className="text-sm mt-0.5" 
                // style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {u.email}
                </p>
              </div>

              <span
                className="ml-auto text-xs px-3 py-1 rounded-full"
                // style={{
                //   background: "rgba(255,255,255,0.1)",
                //   border: "0.5px solid rgba(255,255,255,0.18)",
                //   color: "rgba(255,255,255,0.75)",
                // }}
              >
                Administrator
              </span>

              <button
                onClick={() => setIsModalOpen(false)}
                className="ml-3 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                // style={{
                //   background: "rgba(255,255,255,0.1)",
                //   border: "0.5px solid rgba(255,255,255,0.15)",
                //   color: "rgba(255,255,255,0.65)",
                // }}
              >
                <HiX size={14} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleUpdateProfile} className="px-7 pt-6 pb-0">
              <p className="text-xs font-semibold uppercase tracking-widest text-base-content/40 mb-3">
                Profile image
              </p>
              <div
                className="flex items-center gap-3 rounded-xl px-4 py-3 mb-6"
                // style={{
                //   background: "var(--fallback-b2,oklch(var(--b2)))",
                //   border: "0.5px solid var(--fallback-bc,oklch(var(--bc)/0.15))",
                // }}
              >
                <div
                  className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-base-content overflow-hidden bg-primary"
                  // style={{ background: "#4f46e5" }}
                >
                  {formData.photoURL ? (
                    <img
                      src={formData.photoURL}
                      alt=""
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  ) : (
                    <HiUser size={16} />
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Paste image URL…"
                  value={formData.photoURL || ""}
                  onChange={handleChange("photoURL")}
                  className="flex-1 bg-transparent border-none outline-none text-sm"
                />
                <HiLink size={16} className="text-base-content/30 flex-shrink-0" />
              </div>

              <p className="text-xs font-semibold uppercase tracking-widest text-base-content/40 mb-3">
                Personal information
              </p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {[
                  { label: "Full name", field: "name" },
                  { label: "Phone number", field: "phone" },
                  { label: "City", field: "city" },
                  { label: "Postal code", field: "postalCode" },
                ].map(({ label, field }) => (
                  <div key={field}>
                    <label className="block text-xs font-medium text-base-content/50 mb-1.5">
                      {label}
                    </label>
                    <input
                      type="text"
                      value={formData[field] || ""}
                      onChange={handleChange(field)}
                      className="input input-bordered w-full h-10 rounded-xl text-sm"
                    />
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-xs font-medium text-base-content/50 mb-1.5">
                  Address
                </label>
                <textarea
                  value={formData.address || ""}
                  onChange={handleChange("address")}
                  rows={3}
                  className="textarea textarea-bordered w-full rounded-xl text-sm resize-none"
                />
              </div>
            </form>

            {/* Modal Footer */}
            <div
              className="flex items-center justify-end gap-3 px-7 py-4"
              
            >
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="btn btn-ghost btn-border btn-sm rounded-xl px-5"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleUpdateProfile}
                className="btn btn-primary btn-sm rounded-xl px-6 text-base-content"

              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminProfile;