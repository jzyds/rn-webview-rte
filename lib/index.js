"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_webview_1 = require("react-native-webview");
let RTEWebview = /** @class */ (() => {
    class RTEWebview extends react_1.Component {
        constructor() {
            super(...arguments);
            this.htmlContent = '';
            this.contentSelection = void 0;
            this.sendJSEvent = script_str => {
                this.web_ref.injectJavaScript(script_str);
            };
            this.setPlaceholder = () => {
                this.sendJSEvent(`window.setPlaceholder('${this.props.placeholder}')`);
            };
            this.onMessage = event => {
                let data = JSON.parse(event.nativeEvent.data);
                switch (data.type) {
                    case 'onEditorLoaded':
                        this.props.onEditorLoaded();
                        this.setPlaceholder();
                        break;
                    case 'updateHtmlContent':
                        this.htmlContent = data.htmlContent;
                        break;
                    case 'updateContentSelection':
                        this.contentSelection = data.range;
                        break;
                    case 'onTextChange':
                    case 'onSelectionChange':
                    case 'onEditorChange':
                        this.props[data.type](data);
                        break;
                    default:
                }
            };
            this.resetContent = content => {
                this.sendJSEvent(`window.resetContent('${content}')`);
            };
        }
        updateContentSelection() {
            this.sendJSEvent(`window.getContentSelection()`);
        }
        getContentSelection() {
            this.updateContentSelection();
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(this.contentSelection);
                }, 100);
            });
        }
        getContentHtml() {
            this.sendJSEvent(`window.getContentHtml()`);
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log(this.htmlContent);
                    resolve(this.htmlContent);
                }, 100);
            });
        }
        getSelectionIndex() {
            let { contentSelection } = this;
            return !!contentSelection && !!contentSelection.index
                ? contentSelection.index
                : -1;
        }
        insertImage(url) {
            this.sendJSEvent(`window.insertImage('${url}', ${this.getSelectionIndex()})`);
        }
        insertVideo(url, poster) {
            this.sendJSEvent(`window.insertVideo('${url}', '${poster}', ${this.getSelectionIndex()})`);
        }
        componentDidMount() {
            let { initialContentHTML } = this.props;
            if (!!initialContentHTML) {
                this.resetContent(initialContentHTML);
            }
        }
        render() {
            let { source } = this.props;
            if (!source) {
                source =
                    react_native_1.Platform.OS === 'ios'
                        ? require('../static/editor.html')
                        : { uri: 'file:///android_asset/editor.html' };
            }
            return (react_1.default.createElement(react_native_webview_1.WebView, { ref: r => (this.web_ref = r), allowFileAccess: true, style: { flex: 1 }, javaScriptEnabled: true, domStorageEnabled: true, originWhitelist: ['*'], hideKeyboardAccessoryView: true, allowsLinkPreview: false, bounces: false, allowsInlineMediaPlayback: true, scrollEnabled: false, source: source, onMessage: this.onMessage }));
        }
    }
    RTEWebview.defaultProps = {
        onEditorLoaded: () => { },
        placeholder: 'Compose an epic...',
        source: void 0,
        onTextChange: () => { },
        onSelectionChange: () => { },
        onEditorChange: () => { }
    };
    return RTEWebview;
})();
exports.default = RTEWebview;
