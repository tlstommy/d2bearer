//textbox to show messages
export default function TextBox(props) {
    return (
      <div className="textBox break-normal">
        <span id="textBoxSpan">{props.textboxText}</span>
      </div>
    );
}