const express = require('express')

const app = express()

const ExpressError = require('./expressError')

app.get('/mean', function (req, res, next) {
  try {
    if (req.query["nums"] === undefined || req.query["nums"].length === 0) {
      throw new ExpressError('Bad Request: Please enter some numbers', 400)
    }
    let inputArray = req.query["nums"].split(",");
    let nums = [];
    for (let num of inputArray) {
      nums.push(parseInt(num));
      if (!(parseInt(num))) {
        throw new ExpressError(`Bad Request: ${num} is not a number`, 400)
      }
    }

    let sum = 0;

    for (let num of nums) {
      sum += num;
    }

    let avg = sum / nums.length
    return res.json({
      "response": {
        "operation": "mean",
        "value": avg
      }
    })
  }
  catch (err) {
    return next(err);
  }
});

app.get('/median', function (req, res, next) {
  try{
    if (req.query["nums"] === undefined || req.query["nums"].length === 0) {
      throw new ExpressError('Bad Request: Please enter some numbers', 400)
    }
    let inputArray = req.query["nums"].split(",");
    let nums = [];
    let median;
    for (let num of inputArray) {
      nums.push(parseInt(num));
      if (!(parseInt(num))) {
        throw new ExpressError(`Bad Request: ${num} is not a number`, 400)
      }
    }
    nums.sort(function (a, b) { return a - b });
    console.log(nums);
    if (nums.length % 2) {
      let index = Math.floor(nums.length / 2)
      console.log(index)
      median = nums[index];
      console.log(median)
    }
    else {
      let index = Math.floor(nums.length / 2)
      median = (nums[index] + nums[index - 1]) / 2;
    }
    return res.json({
      "response": {
        "operation": "median",
        "value": median
      }
    })
    }

  catch (err) {
    return next(err)
  }
});

app.get('/mode', function (req, res, next) {
  try{
    if (req.query["nums"] === undefined || req.query["nums"].length === 0) {
      throw new ExpressError('Bad Request: Please enter some numbers', 400)
    }
    let inputArray = req.query["nums"].split(",");
    let nums = [];
    let counter = {};

    for (let num of inputArray) {
      nums.push(parseInt(num));
      if (!(parseInt(num))) {
        throw new ExpressError(`Bad Request: ${num} is not a number`, 400)
      }
    }
    //create frequency counter
    for (let num of nums) {
      counter[num] = counter[num] + 1 || 1;
    }
    //find highest count
    let highestCount = 0;
    for (let num in counter) {
      if (counter[num] > highestCount) {
        highestCount = counter[num];
      }
    }
    //find nums that occur highestCount times and push to modes
    let modes = []
    for (let num in counter) {
      if (counter[num] === highestCount) {
        modes.push(num)
      }
    }

    return res.json({
      "response": {
        "operation": "mode",
        "value": modes
      }
    })
    }
  catch (err) {
    return next(err);
  }
  
});


app.use(function (err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;
  let message = err.message;

  // set the status and alert the user
  return res.status(status).json({
    error: { message, status }
  });
});


app.listen(3000, function () {
  console.log('App is on port 3000');
})