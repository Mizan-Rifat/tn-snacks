import ConfirmationDialog from 'components/common/ConfirmationDialog';
import React, { createContext, useRef, useState, useContext } from 'react';

export const ConfirmationContext = createContext();

export const useConfirmation = () => useContext(ConfirmationContext);

const ConfirmationProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const promiseRef = useRef();

  const openDialog = options => {
    setConfirmation(options);
    setOpen(true);
    return new Promise((resolve, reject) => {
      promiseRef.current = { resolve, reject };
    });
  };

  const handleSubmit = () => {
    promiseRef.current.resolve();
    setOpen(false);
  };

  const handleCancel = () => {
    promiseRef.current.reject();
    setOpen(false);
  };
  return (
    <>
      <ConfirmationContext.Provider value={openDialog}>
        {children}
      </ConfirmationContext.Provider>
      <ConfirmationDialog
        open={open}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        {...confirmation}
      />
    </>
  );
};

export default ConfirmationProvider;
