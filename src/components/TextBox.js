//textbox to show messages
export default function TextBox(props) {
    return (
      <div className="textBox break-normal">
        <p defaultValue={props.defaultValue}>{props.textboxText}</p>
      </div>
    );
}