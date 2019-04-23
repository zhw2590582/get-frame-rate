(function(window, factory) {
  if (typeof exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    window.getFrameRate = factory();
  }
})(this, function() {
  var decimalPlaces = 2;
  var updateEachSecond = 1;
  var decimalPlacesRatio = Math.pow(10, decimalPlaces);
  var timeMeasurements = [];
  var fps = 0;
  return function getFrameRate(callback) {
    timeMeasurements.push(
      window.performance ? window.performance.now() : Date.now()
    );
    var msPassed =
      timeMeasurements[timeMeasurements.length - 1] - timeMeasurements[0];
    if (msPassed >= updateEachSecond * 1000) {
      fps =
        Math.round(
          (timeMeasurements.length / msPassed) * 1000 * decimalPlacesRatio
        ) / decimalPlacesRatio;
      timeMeasurements = [];
    }

    callback(fps);
    window.requestAnimationFrame(getFrameRate.bind(null, callback));
  };
});
