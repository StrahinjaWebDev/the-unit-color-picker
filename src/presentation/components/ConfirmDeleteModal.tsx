import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal: FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm"
          >
            <h2 className="text-xl font-semibold text-gray-900 text-center">
              Are you sure you want to delete it?
            </h2>
            <div className="flex justify-center gap-4 mt-6">
              <button
                className="bg-red-600 hover:bg-red-500 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition-all"
                onClick={() => {
                  onConfirm();
                }}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded-lg transition-all"
                onClick={() => {
                  onCancel();
                }}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDeleteModal;
