console.log("3Hello Index.js");
if ("serviceWorker" in navigator) {
  console.log("support Servie Worker");
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").then(
      // serviceWorkerContainer.register("./sw.js").then(
      (registration) => {
        console.log("Register thanh cong :|:", registration);
      },
      (err) => {
        console.error("Register with error : ", err);
      }
    );
  });
} else {
  console.warn("Khoong support Service WOrker !");
}
