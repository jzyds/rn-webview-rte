import { Component } from 'react';
declare class RTEWebview extends Component {
    static defaultProps: {
        onEditorLoaded: () => void;
        placeholder: string;
        source: undefined;
        onTextChange: () => void;
        onSelectionChange: () => void;
        onEditorChange: () => void;
    };
    htmlContent: string;
    contentSelection: undefined;
    web_ref: any;
    props: any;
    keyboardWillShowListener: any;
    keyboardDidShowListener: any;
    updateContentSelection(): void;
    getContentSelection(): Promise<unknown>;
    getContentHtml(): Promise<unknown>;
    getSelectionIndex(): any;
    insertImage(url: any): void;
    insertVideo(url: any, poster: any): void;
    sendJSEvent: (script_str: any) => void;
    setPlaceholder: () => void;
    onMessage: (event: any) => void;
    resetContent: (content: any) => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    keyboardWillShow: () => void;
    keyboardDidShow: () => any;
    quillFocus: () => any;
    render(): any;
}
export default RTEWebview;
