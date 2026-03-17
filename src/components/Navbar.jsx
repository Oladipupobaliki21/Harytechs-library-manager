import profileImage from '../assets/Profile.png';
function Navbar() {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">

      <input
        type="text"
        placeholder="Search books..."
        className="border rounded-lg px-4 py-2 w-full md:w-80 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex items-center gap-3">
        <img
            src={profileImage}
            alt="Profile"
            loading="lazy"
          className="rounded-full h-10 w-10 object-cover"
        />
        <span className="font-semibold">Balqees Oladipupo</span>
      </div>

    </div>
  );
}

export default Navbar;