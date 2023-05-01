//popup to show messages
export default function PopupModal({showModal,setShowModal}) {
  
    return (
      <div>
        <p>hi</p> 
        <button onClick={()=>setShowModal(false)}>click</button>
      </div>
    );
}