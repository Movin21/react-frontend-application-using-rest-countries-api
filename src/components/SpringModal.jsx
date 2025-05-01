import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle, FiLogOut } from "react-icons/fi";
import { useState } from "react";

const ExampleWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  // Example user data - in a real app, this would come from your auth context/state
  const currentUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    lastLogin: "May 15, 2023 at 10:30 AM",
  };

  const handleLogout = () => {
    // In a real app, this would call your auth logout function
    console.log("User logged out!");
    // You would typically redirect to login page or clear auth state here
  };

  return (
    <div className="px-4 py-64 bg-slate-900 grid place-content-center gap-4">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
      >
        Open Default Modal
      </button>

      <button
        onClick={() => setLogoutModalOpen(true)}
        className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
      >
        Open Logout Modal
      </button>

      {/* Default modal */}
      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Logout confirmation modal with user details */}
      <SpringModal
        isOpen={logoutModalOpen}
        setIsOpen={setLogoutModalOpen}
        modalType="logout"
        user={currentUser}
        onLogout={handleLogout}
      />
    </div>
  );
};

const SpringModal = ({
  isOpen,
  setIsOpen,
  modalType = "default",
  user = null,
  onLogout = null,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            {modalType === "logout" ? (
              <FiLogOut className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            ) : (
              <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            )}
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                {modalType === "logout" ? <FiLogOut /> : <FiAlertCircle />}
              </div>

              {modalType === "logout" ? (
                <>
                  <h3 className="text-3xl font-bold text-center mb-2">
                    Confirm Logout
                  </h3>
                  {user && (
                    <div className="bg-white/10 p-3 rounded-lg mb-4">
                      {user.lastLogin && (
                        <p className="text-xs text-white/70 mt-1">
                          Last login: {user.lastLogin}
                        </p>
                      )}
                    </div>
                  )}
                  <p className="text-center mb-6">
                    Are you sure you want to log out of your account?
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (onLogout) onLogout();
                        setIsOpen(false);
                      }}
                      className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                    >
                      Yes, Log Out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-3xl font-bold text-center mb-2">
                    One more thing!
                  </h3>
                  <p className="text-center mb-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                    aperiam vitae, sapiente ducimus eveniet in velit.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                    >
                      Nah, go back
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                    >
                      Understood!
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { SpringModal, ExampleWrapper };
export default SpringModal;
