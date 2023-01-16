//textbox to show messages
export default function TextBox(props) {
    return (
      <div className="textBox break-normal w-3/4">
        <p defaultValue={props.defaultValue}>{props.textboxText}</p>
      </div>
    );
}