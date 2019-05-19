#react-native 0.59.8版本

封装了一些常用库，直接上手开发


## 问题

react-native-syan-image-picker库

compile 改 implementation

-------------------------------------------------------------------------------------------------------------------

react-native-webview库 RCTWebViewManager.java文件修改（暂时用5.8.0 新版本有bug等修复）

- export.put(ScrollEventType.SCROLL.getJSEventName(), MapBuilder.of("registrationName", "onScroll"));

+ export.put(ScrollEventType.getJSEventName(ScrollEventType.SCROLL), MapBuilder.of("registrationName", "onScroll"));