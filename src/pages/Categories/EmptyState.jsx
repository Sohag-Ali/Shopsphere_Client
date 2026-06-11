const EmptyState = ({
  message,
}) => {
  return (
    <div className="flex justify-center items-center h-64">

      <p className="text-xl text-base-content/60">
        {message}
      </p>

    </div>
  );
};

export default EmptyState;