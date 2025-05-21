"use client";

const statusStyles = {
  success: "bg-green-100 text-green-800",
  error: "bg-red-100 text-red-800",
  warning: "bg-yellow-100 text-yellow-800",
  info: "bg-blue-100 text-blue-800",
  pending: "bg-gray-100 text-gray-800",
};

const Badge = ({ status, children }) => {
  const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  const statusStyle = statusStyles[status] || statusStyles.info;

  return (
    <span className={`${baseStyles} ${statusStyle}`}>
      {children}
    </span>
  );
};

export default Badge; 