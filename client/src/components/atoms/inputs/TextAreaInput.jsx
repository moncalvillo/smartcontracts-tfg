import TextArea from "antd/lib/input/TextArea";


const TextAreaInput = ({setState, placeholder }) => {

    return (
        <TextArea
        onBlur={e => setState(e.target.value)}
        placeholder={placeholder}
        autoSize={{ minRows: 8, maxRows: 8 }}
      />
    );

}

export default TextAreaInput;