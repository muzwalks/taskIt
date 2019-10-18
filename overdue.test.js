test("Date Test", () => {
  var today = new Date();
  var deadline = new Date("2019-07-11T00:00:00.000Z");

  const result = deadline - today;
  var isOverdue = true;

  if (Number(result) > 0) {
    isOverdue = false;
  } else expect(isOverdue).toBeTruthy();
});
