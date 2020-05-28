import { Component } from 'react';
declare class RTEWebview extends Component {
    static defaultProps: {
        onEditorLoaded: () => void;
        placeholder: string;
    };
    htmlContent: string;
    contentSelection: undefined;
    web_ref: any;
    props: any;
    updateContentSelection(): void;
    getContentSelection(): Promise<unknown>;
    getContentHtml(): Promise<unknown>;
    getSelectionIndex(): any;
    insertImage(url: any): void;
    insertVideo(url: any, poster: any): void;
    sendJSEvent: (script_str: any) => void;
    onMessage: (event: any) => void;
    resetContent: (content: any) => void;
    componentDidMount(): void;
    render(): any;
}
export default RTEWebview;
