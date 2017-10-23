var points = [
  [1, 0.75 * 1 + 0.1 * (Math.random() - 0.5)],
  [2, 0.75 * 2 + 0.2 * (Math.random() - 0.5)],
  [3, 0.75 * 3 + 0.3 * (Math.random() - 0.5)],
  [4, 0.75 * 4 + 0.4 * (Math.random() - 0.5)],
  [5, 0.75 * 5 + 0.5 * (Math.random() - 0.5)],
  [6, 0.75 * 6 + 0.6 * (Math.random() - 0.5)],
  [7, 0.75 * 7 + 0.7 * (Math.random() - 0.5)],
  [8, 0.75 * 8 + 0.8 * (Math.random() - 0.5)],
  [9, 0.75 * 9 + 0.9 * (Math.random() - 0.5)]
];

function Observer() {
  this.callbacks = [];
}

Observer.prototype.watch = function (callback) {
  this.callbacks.push(callback);
};

Observer.prototype.notify = function () {
  for (var i = 0; i < this.callbacks.length; i++) {
    this.callbacks[i].apply(this, arguments);
  };
};

function LinearRegressionModel(trainingSet) {
  this.trainingSet = trainingSet;
  this.intercept = 0;
  this.gradient = 1;
  this.observer = new Observer();
}

LinearRegressionModel.prototype.update = function (gradient, intercept) {
  this.gradient = gradient;
  this.intercept = intercept;
  this.observer.notify();
}

LinearRegressionModel.prototype.predict = function (x, gradient) {
  var gradient = gradient || this.gradient;
  return gradient * x + this.intercept;
};

LinearRegressionModel.prototype.functionString = function () {
  return this.gradient + " * x + " + this.intercept;
};

LinearRegressionModel.prototype.yRange = function () {
  var yValues = $.map(this.trainingSet, function (point) { return point[1]; });
  var yMin = Math.min.apply(Math, [0, this.intercept].concat(yValues));
  var yMax = Math.max.apply(Math, [yMin + 11].concat(yValues));
  return [yMin, yMax];
};

LinearRegressionModel.prototype.trainingPredictions = function (gradient) {
  var model = this;

  return $.map(this.trainingSet, function (point) {
    return {
      x: point[0],
      y: point[1],
      pred: model.predict(point[0], gradient),
    };
  });
};

LinearRegressionModel.prototype.trainingError = function (gradient) {
  var sumSqErr = 0;
  $.each(this.trainingPredictions(gradient), function () {
    sumSqErr += Math.pow(this.pred - this.y, 2);
  });
  var j = sumSqErr / (2 * this.trainingSet.length);
  return j;
};

function ModelRenderer(model) {
  this.model = model;
}

ModelRenderer.prototype.plot = function (options) {
  var container = $(options.selector);

  functionPlot({
    target: options.selector,
    disableZoom: true,
    width: container.width(),
    height: container.height(),
    xAxis: {
      label: "Drop height",
      domain: [0, 10]
    },
    yAxis: {
      label: "Bounce height",
      domain: this.model.yRange(),
    },
    data: this.data(options),
    tip: {
      xLine: true,
      yLine: true
    }
  });

  container.find("path").attr("stroke-width", "5");
  container.find("circle").each(function () { this.setAttribute("r", "5"); });
};

ModelRenderer.prototype.data = function (options) {
  var data = [];
  if (options.trainingSet) { data = data.concat(this.trainingSetData()); }
  if (options.trendLine) { data = data.concat(this.trendLineData()); }
  if (options.errors) { data = data.concat(this.errorData()); }
  return data;
};

ModelRenderer.prototype.trainingSetData = function () {
  return [
    {
      points: this.model.trainingSet,
      fnType: "points",
      graphType: "scatter",
      color: "blue"
    }
  ];
};

ModelRenderer.prototype.trendLineData = function () {
  var model = this.model;

  return [
    {
      fn: model.functionString(),
      color: "green"
    }
  ];
};

ModelRenderer.prototype.errorData = function () {
  return $.map(model.trainingPredictions(), function (point) {
    return {
      points: [
        [point.x, point.y],
        [point.x, point.pred]
      ],
      fnType: "points",
      graphType: "polyline",
      color: "red"
    };
  });
};

function ErrorRenderer(model) {
  this.model = model;
}

ErrorRenderer.prototype.plot = function (options) {
  var container = $(options.selector);

  functionPlot({
    target: options.selector,
    disableZoom: true,
    width: container.width(),
    height: container.height(),
    xAxis: {
      label: "Gradient",
      domain: [0.3, 1.2],
    },
    yAxis: {
      label: "Error",
      domain: [0, 3],
    },
    data: this.data(options),
    tip: {
      xLine: true,
      yLine: true
    }
  });

  container.find("path").attr("stroke-width", "5");
  container.find("circle").each(function () { this.setAttribute("r", "5"); });
};

ErrorRenderer.prototype.data = function () {
  return [
    {
      fn: function (scope) {
        return model.trainingError(scope.x);
      },
      graphType: "polyline",
      skipTip: true,
    }
  ];
};

var model = new LinearRegressionModel(points);
var renderer = new ModelRenderer(model);
var errorRenderer = new ErrorRenderer(model);

$(document).ready(function () {
  $("body").bind("displayed", ".slide", function () {
    var plot = $(this).find(".plot");
    plot.css({
      width: (0.9 * $(window).width()) + "px",
      height: (0.9 * $(window).height()) + "px",
    });

    model.observer.notify();

    $(this).find("[data-bind=error-plot]").each(function () {
      errorRenderer.plot({selector: "#" + $(this).attr("id")});
    });
  });

  $("[data-bind=error-plot]").each(function () {
    errorRenderer.plot({selector: "#" + $(this).attr("id")});
  });
});

model.observer.watch(function () {
  $("[data-bind=plot]").each(function () {
    renderer.plot($.extend(
      {selector: "#" + $(this).attr("id")},
      JSON.parse($(this).attr("data-plot"))
    ));
  });
});

model.observer.watch(function () {
  $("[data-bind=gradient]").val(model.gradient.toPrecision(2));

  var angle = Math.atan(1 / model.gradient) / (2 * Math.PI) * 360;
  $("[data-bind=angle]").val(angle);
});

model.observer.watch(function () {
  $("[data-bind=intercept]").val(model.intercept.toPrecision(2));
});

model.observer.watch(function () {
  $("[data-bind=error]").val(model.trainingError().toPrecision(2));
});

$("input[data-bind=angle]").bind("input", function () {
  var angle = parseFloat($(this).val());
  var gradient = 1 / Math.tan((angle / 360) * 2 * Math.PI);

  model.update(gradient, model.intercept);
});

$("input[data-bind=intercept]").bind("input", function () {
  var intercept = parseFloat($(this).val());

  model.update(model.gradient, intercept);
});

model.observer.notify();
