
const RetryToast = ({ message, retry, label }: { message: string; retry: () => void; label: string;}) => (
    <div>
      <p>{message}</p>
      <button onClick={retry} className="cursor-pointer mt-2 px-4 py-2 bg-[#004CFF] text-white rounded-lg hover:bg-blue-600">
        {label}
      </button>
    </div>
  )
  

export default RetryToast