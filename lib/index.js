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
            this.onMessage = event => {
                let data = JSON.parse(event.nativeEvent.data);
                switch (data.type) {
                    case 'onEditorLoaded':
                        this.props.onEditorLoaded();
                        this.sendJSEvent(`window.setPlaceholder('${this.props.placeholder}')`);
                        break;
                    case 'updateHtmlContent':
                        this.htmlContent = data.htmlContent;
                        break;
                    case 'updateContentSelection':
                        this.contentSelection = data.range;
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
            return new Promise((resolve, reject) => {
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
            return (react_1.default.createElement(react_native_webview_1.WebView, { ref: r => (this.web_ref = r), allowFileAccess: true, style: { flex: 1 }, javaScriptEnabled: true, domStorageEnabled: true, originWhitelist: ['*'], hideKeyboardAccessoryView: true, allowsLinkPreview: false, bounces: false, allowsInlineMediaPlayback: true, source: react_native_1.Platform.OS === 'ios'
                    ? require('./static/editor.html')
                    : { uri: 'file:///android_asset/editor.html' }, onMessage: this.onMessage }));
        }
    }
    RTEWebview.defaultProps = {
        onEditorLoaded: () => { },
        placeholder: 'Compose an epic...'
    };
    return RTEWebview;
})();
exports.default = RTEWebview;