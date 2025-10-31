
export const PaymentOption = ({ icon, label, selected, onClick }) => (
  <div
    className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition ${
      selected ? "border-blue-500 bg-blue-50" : "border-gray-200"
    }`}
    onClick={onClick}
  >
    <div className="flex items-center space-x-3">
      <span className={`text-xl ${selected ? "text-blue-600" : "text-gray-400"}`}>
        {icon}
      </span>
      <span className="font-medium text-gray-700">{label}</span>
    </div>
    <input type="radio" checked={selected} onChange={onClick} />
  </div>
);
