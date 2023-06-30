import React from 'react';

const ConfirmationModal = ({ title, message, closeModal, DeleteSucessModal, deleteDoctorData, sucessButtonName }) => {
    return (
        <div>
            {/* The button to open modal */}


            {/* Put this part before </body> tag */}
            <input type="checkbox" id="confirm-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <label onClick={closeModal} htmlFor="confirm-modal" className="btn btn-outline">Cencel</label>
                        <label onClick={()=>DeleteSucessModal(deleteDoctorData)} htmlFor="confirm-modal" className="btn btn-error">{sucessButtonName}</label>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;