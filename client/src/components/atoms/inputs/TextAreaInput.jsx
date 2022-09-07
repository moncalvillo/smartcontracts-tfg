import TextArea from "antd/lib/input/TextArea";


const TextAreaInput = ({setState, placeholder }) => {


    return (
        <TextArea
        onBlur={e => setState(e.target.value)}
        placeholder={placeholder}
        autoSize={{ minRows: 3, maxRows: 5 }}
      />
    );

}

export default TextAreaInput;