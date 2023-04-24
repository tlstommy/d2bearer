//textbox to show messages
export default function TextBox(props) {
    return (
      <div className="textBox break-normal">
        <p>{props.textboxText}</p>
      </div>
    );
}