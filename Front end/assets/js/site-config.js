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
  const localHosts = ["localhost", "127.0.0.1", "::1"];
  const defaultApiBase = localHosts.includes(win.location.hostname)
    ? "http://localhost:5000"
    : "https://gateway-backend-wiup.onrender.com";

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
