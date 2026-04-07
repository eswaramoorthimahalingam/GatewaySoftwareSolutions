(function (win) {
  function getStoredApiBase() {
    try {
      return win.localStorage.getItem("gatewayApiBase") || "";
    } catch (error) {
      return "";
    }
  }

  function normalizePath(path) {
    if (!path) return "";
    return path.startsWith("/") ? path : `/${path}`;
  }

  const storedApiBase = getStoredApiBase();
  const defaultApiBase = /^https?:$/.test(win.location.protocol)
    ? win.location.origin
    : "http://localhost:5000";

  win.gatewayApiBase = (storedApiBase || defaultApiBase).replace(/\/$/, "");

  win.gatewayApi = function gatewayApi(path) {
    return `${win.gatewayApiBase}${normalizePath(path)}`;
  };

  win.gatewayAsset = function gatewayAsset(path) {
    if (!path) return win.gatewayApiBase;
    if (/^https?:\/\//i.test(path)) return path;
    return `${win.gatewayApiBase}${normalizePath(path)}`;
  };
})(window);
