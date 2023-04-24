export default function Button(props) {
    return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-1 rounded-full">
        {props.buttonText}
    </button>
    );
}