//popup to show messages
export default function PopupModal(props) {
    //bool to show modal
    const [showModal, setShowModal] = React.useState(false);
    return (
      <div className="textBox break-normal">
        <span id="textBoxSpan">{props.textboxText}</span>
      </div>
    );
}