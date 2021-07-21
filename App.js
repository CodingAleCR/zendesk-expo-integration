import React, { Component } from "react";
import { WebView } from "react-native-webview";
import { Button, Modal, SafeAreaView, View } from "react-native";

/// This is a basic example showing how to use Zendesk Chat Widget
/// using a webview inside a modal and a html code
/// Currently Zendesk Chat SDK doesn't support React-Native so
/// this is a standalone example using just a HTML code and JS widget.
/// Eventhough this example is applied to a modal shown on a button "click", you could adapt the code to be
/// displayed in a complete screen as long as you take care of the "close" event and styling of it.
class App extends Component {
  state = {
    showChat: false,
  };

  renderChat() {
    const { showChat } = this.state;
    const userAgent = "YourApp";

    return (
      <Modal {...this.props} visible={showChat}>
        {/* This view will work as padding/margin towards the top area. */}
        <View style={{ height: 30, backgroundColor: "#fff" }}></View>
        <WebView
          useWebKit
          style={{ flex: 1 }}
          hideKeyboardAccessoryView
          source={require("./Zendesk/zendesk.html")}
          showsVerticalScrollIndicator={false}
          applicationNameForUserAgent={userAgent}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onMessage={({ nativeEvent }) => {
            nativeEvent.data === "close" && this.setState({ showChat: false });
          }}
          originWhitelist={["*"]}
        />
        {/* This view will work as padding/margin towards the bottom area. */}
        <View style={{ height: 30, backgroundColor: "#fff" }}></View>
      </Modal>
    );
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <Button
          title="Chat with us"
          color="black"
          onPress={() => this.setState({ showChat: true })}
        />
        {this.renderChat()}
      </SafeAreaView>
    );
  }
}

App.defaultProps = {
  title: "Zendesk Chat",
};

export default App;
