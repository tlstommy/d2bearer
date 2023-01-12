//textbox to show messages
export default function TextBox(props) {
    return (
      <div className="textBox transition-all break-normal w-2/3">
        <p>{props.textboxText}</p>
      </div>
    );
}