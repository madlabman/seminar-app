export default hideMenuBarInWebView = () => {
    // return `jQuery('.heinz-header, .heinz-sidebar1, .heinz-footer').hide();`
    return "var css = '.heinz-header, .heinz-sidebar1, .heinz-footer { display: none !important }';" +
        "var head = document.head || document.getElementsByTagName('head')[0];" +
        "var style = document.createElement('style');" +
        "style.appendChild(document.createTextNode(css));" +
        "head.appendChild(style);";
}