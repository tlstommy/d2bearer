import { XCircle } from 'react-bootstrap-icons'


//popup to show messages
export default function PopupModal({ showModal, setShowModal, modalTitle, modalBody }) {

  return (
    <flex>
      <div className="justify-center py-10 px-5 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold w-72">
                {modalTitle}
              </h3>
              <XCircle size={32} onClick={() => setShowModal(false)}/>
            </div>
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-lg leading-relaxed">
                {modalBody}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </flex>
  );
}