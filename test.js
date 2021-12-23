function test1(arg1) {
  console.log("hello");
}

function test2(arg2) {
  console.log("hello from test2");

  function test3(arg3) {
    console.log("hello from test3");
  }
}

console.log("stop");