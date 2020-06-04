import React, { Component } from 'react'
import { Platform } from 'react-native'
import { WebView } from 'react-native-webview'

class RTEWebview extends Component {
  static defaultProps = {
    onEditorLoaded: () => {},
    placeholder: 'Compose an epic...',
    source: void 0,
    onTextChange: () => {},
    onSelectionChange: () => {},
    onEditorChange: () => {}
  }

  htmlContent = ''
  contentSelection = void 0
  web_ref: any
  props: any

  updateContentSelection () {
    this.sendJSEvent(`window.getContentSelection()`)
  }

  getContentSelection () {
    this.updateContentSelection()
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.contentSelection)
      }, 100)
    })
  }

  getContentHtml () {
    this.sendJSEvent(`window.getContentHtml()`)
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(this.htmlContent)
        resolve(this.htmlContent)
      }, 100)
    })
  }

  getSelectionIndex () {
    let { contentSelection }: any = this
    return !!contentSelection && !!contentSelection.index
      ? contentSelection.index
      : -1
  }

  insertImage (url) {
    this.sendJSEvent(
      `window.insertImage('${url}', ${this.getSelectionIndex()})`
    )
  }

  insertVideo (url, poster) {
    this.sendJSEvent(
      `window.insertVideo('${url}', '${poster}', ${this.getSelectionIndex()})`
    )
  }

  sendJSEvent = script_str => {
    this.web_ref.injectJavaScript(script_str)
  }

  onMessage = event => {
    let data = JSON.parse(event.nativeEvent.data)
    switch (data.type) {
      case 'onEditorLoaded':
        this.props.onEditorLoaded()
        this.sendJSEvent(`window.setPlaceholder('${this.props.placeholder}')`)
        break
      case 'updateHtmlContent':
        this.htmlContent = data.htmlContent
        break
      case 'updateContentSelection':
        this.contentSelection = data.range
        break
      case 'onTextChange':
      case 'onSelectionChange':
      case 'onEditorChange':
        this.props[data.type](data)
        break
      default:
    }
  }

  resetContent = content => {
    this.sendJSEvent(`window.resetContent('${content}')`)
  }

  componentDidMount () {
    let { initialContentHTML } = this.props
    if (!!initialContentHTML) {
      this.resetContent(initialContentHTML)
    }
  }

  render () {
    let { source } = this.props
    if (!source) {
      source =
        Platform.OS === 'ios'
          ? require('../static/editor.html')
          : { uri: 'file:///android_asset/editor.html' }
    }

    return (
      <WebView
        ref={r => (this.web_ref = r)}
        allowFileAccess={true}
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        originWhitelist={['*']}
        hideKeyboardAccessoryView={true}
        allowsLinkPreview={false}
        bounces={false}
        allowsInlineMediaPlayback={true}
        scrollEnabled={false}
        source={source}
        onMessage={this.onMessage}
      />
    )
  }
}

export default RTEWebview
