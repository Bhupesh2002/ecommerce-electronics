

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-100">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin">
      </div>
      <p className="mt-3 text-gray-500 mx-3 ">Fetching latest gadgets....</p>
    </div>
  );
};

export default Loader;