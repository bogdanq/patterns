const ee = new EventEmiter();
const listener = data => {
  console.log("room3 - listener1", data);
};
const listener2 = data => {
  console.log("room3 - listener2", data);
};

ee.on("room1", data => {
  console.log("room1", data);
});

ee.once("room2", data => {
  console.log("room2", data);
});

ee.on("room3", listener);
ee.on("room3", listener2);

// ee.off("room3"); // off all observer for channel
ee.off("room3", listener); // off observer [listener]

ee.filter(() => true)
  .map(data => data)
  .emit("room3", { id: 2 });
