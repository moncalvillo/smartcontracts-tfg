import TextArea from "antd/lib/input/TextArea";


const TextAreaInput = ({setState, state="", placeholder }) => {

    return (
        <TextArea
        defaultValue={state}
        onChange={e => setState(e.target.value)}
        placeholder={placeholder}
        autoSize={{ minRows: 7, maxRows: 7}}
      />
    );

}

export default TextAreaInput;