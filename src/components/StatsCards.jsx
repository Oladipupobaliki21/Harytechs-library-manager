const COLOR_MAP = {
  blue: "bg-blue-50 text-blue-600 border-blue-100",
  indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
  green: "bg-green-50 text-green-600 border-green-100",
  yellow: "bg-yellow-50 text-yellow-600 border-yellow-100",
  red: "bg-red-50 text-red-600 border-red-100",
};

const VALUE_COLOR = {
  blue: "text-blue-700",
  indigo: "text-indigo-700",
  green: "text-green-700",
  yellow: "text-yellow-700",
  red: "text-red-700",
};

function StatsCards({ title, value, icon, color = "blue" }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow hover:shadow-md transition border border-gray-100">
      {icon && (
        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3 border ${COLOR_MAP[color] || COLOR_MAP.blue}`}>
          <span className="text-lg">{icon}</span>
        </div>
      )}
      <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">{title}</p>
      <h2 className={`text-3xl font-bold mt-1 ${VALUE_COLOR[color] || VALUE_COLOR.blue}`}>
        {value}
      </h2>
    </div>
  );
}

export default StatsCards;