const ee = new EventEmiter();

ee.on("room1", data => {
  console.log("room1", data);
})
  .filter(() => true)
  .emit("room1", { data: "some data" });

// ee.on("room1", listener)
//   .filter(() => true)
//   .emit("room1", { data: "some data" });

// ee.filter(() => true);

// const foo = data => data;
// const getData = data => ({ ...data, newProps: "new data" });
// ee.pipe(foo, getData).emit("room1", { data: "pipe data" });

// class Second extends EventEmiter {}

// class First extends EventEmiter {
//   init() {
//     const second = new Second();
//     const that = this;
//     second.on("room1", that.olo);

//     second.emit("room1");
//     // second.off("room1");
//     second.emit("room1");
//   }

//   olo() {
//     console.log("room1: trigger", this);
//   }
// }

// new First().init();
