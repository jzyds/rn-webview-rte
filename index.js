import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import {Platform} from 'react-native';

class RTEWebview extends Component {
  static defaultProps = {
    onEditorLoaded: () => {},
    placeholder: 'Compose an epic...',
  };

  htmlContent = '';
  contentSelection = void 0;

  updateContentSelection () {
    this.sendJSEvent (`window.getContentSelection()`);
  }

  getContentSelection () {
    this.updateContentSelection ();
    return new Promise (resolve => {
      setTimeout (() => {
        resolve (this.contentSelection);
      }, 100);
    });
  }

  getContentHtml () {
    this.sendJSEvent (`window.getContentHtml()`);
    return new Promise ((resolve, reject) => {
      setTimeout (() => {
        console.log (this.htmlContent);
        resolve (this.htmlContent);
      }, 100);
    });
  }

  getSelectionIndex () {
    let {contentSelection} = this;
    return !!contentSelection && !!contentSelection.index
      ? contentSelection.index
      : -1;
  }

  insertImage (url) {
    this.sendJSEvent (
      `window.insertImage('${url}', ${this.getSelectionIndex ()})`
    );
  }

  insertVideo (url) {
    this.sendJSEvent (
      `window.insertVideo('${url}', ${this.getSelectionIndex ()})`
    );
  }

  sendJSEvent = script_str => {
    this.web_ref.injectJavaScript (script_str);
  };

  onMessage = event => {
    let data = JSON.parse (event.nativeEvent.data);
    switch (data.type) {
      case 'onEditorLoaded':
        this.props.onEditorLoaded ();
        this.sendJSEvent (`window.setPlaceholder('${this.props.placeholder}')`);
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

  resetContent = content => {
    this.sendJSEvent (`window.resetContent('${content}')`);
  };

  componentDidMount () {
    let {initialContentHTML} = this.props;
    if (!!initialContentHTML) {
      this.resetContent (initialContentHTML);
    }
  }

  render () {
    return (
      <WebView
        ref={r => (this.web_ref = r)}
        allowFileAccess={true}
        style={{flex: 1}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        originWhitelist={['*']}
        source={
          Platform.OS === 'ios'
            ? require ('./static/editor.html')
            : {uri: 'file:///android_asset/editor.html'}
        }
        onMessage={this.onMessage}
      />
    );
  }
}

export default RTEWebview;
