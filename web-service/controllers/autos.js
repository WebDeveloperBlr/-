var Autos = require('../models/autos');

exports.all = function (req, res) {
  Autos.all(req.query, function (data) {
    res.send(data);
  })
};

exports.create = function (req, res) {
  let auto = req.body;
  Autos.create(auto, function (data) {
    res.send(data);
  })
};

exports.common = function (req, res) {
  Autos.common(function (data) {
    res.send(data);
  });
};

exports.addBrand = function (req, res) {
  Autos.addBrand(req.body, function () {
    res.send();
  });
};
exports.addModel = function (req, res) {
  Autos.addModel(req.body, function () {
    res.send();
  });
};
exports.getById = function (req, res) {
  Autos.getById(req.param('id'), function (data) {
    res.send(data);
  })
};
exports.updateAuto = function (req, res) {
  Autos.updateAuto(req.body, function () {
    res.send();
  });
};

exports.deleteAuto = function (req, res) {
  Autos.deleteAuto(req.param('id'), function () {
    res.send();
  });
};

