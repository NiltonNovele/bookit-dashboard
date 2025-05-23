const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="w-5 h-5 text-orange-500" />
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-3 py-2 bg-white bg-opacity-90 rounded-lg border border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 text-gray-900 placeholder-orange-400 transition duration-200"
      />
    </div>
  );
};
export default Input;
