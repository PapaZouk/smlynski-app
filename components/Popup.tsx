export default function Popup({ children, onClose }) {
    return (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 sm:mt-40 z-50">
            <div className="bg-blue-600 p-4 rounded-lg shadow-lg">
                <button onClick={onClose} className="text-white hover:text-gray-200">
                    {children}
                </button>
            </div>
        </div>
    );
}