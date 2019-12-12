// const ee = new EventEmiter();

// ee.on("room1", data => {
//   console.log("room1", data);
// });

// ee.filter(() => true)
//   .map(data => data)
//   .emit("room1", { data: "some data" });

// const foo = data => data;
// const getData = data => ({ ...data, newProps: "new data" });
// ee.pipe(foo, getData).emit("room1", { data: "pipe data" });

class Second extends EventEmiter {}

class First extends EventEmiter {
  init() {
    const second = new Second();
    second.on("room1", function() {
      console.log("room1: trigger", this);
    });

    second.emit("room1");
    // second.off("room1");
    second.emit("room1");
  }
}

new First().init();
