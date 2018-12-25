const connection = require('../db').connection;
const Sequilize = require('sequelize');

exports.all = function (params, cb) {

  let filterObj = JSON.parse(params.filterObj);

  selectAutosQuery = 'SELECT auto.id_auto, auto.number, p.name `personName`, p.secondName, p.thirdName, \n' +
    'p.address, ch.id_checkup, ch.dateEnd, m.id_model,m.name `modelName`, br.id_brand,\n' +
    'br.name `brandName`, oil.id_oil, oil.name `oilName`, category.id_category, category.name `categoryName` \n' +
    'FROM auto\n' +
    'Inner join person p on p.id_person = auto.id_person\n' +
    'left join checkup ch on ch.id_checkup = auto.id_checkup\n' +
    'inner join model m on m.id_model = auto.id_model\n' +
    'inner join brand br on br.id_brand = m.id_brand\n' +
    'inner join oil on oil.id_oil = auto.id_oil\n' +
    'inner join category on category.id_category = m.id_category\n';
  console.log(params);
  if (filterObj && filterObj.person && filterObj.person.name) {
    selectAutosQuery += 'where (p.name like \'%' + filterObj.person.name + '%\' or ' +
      'p.secondName like \'%' + filterObj.person.name + '%\') ';
  }
  if (filterObj && filterObj.number) {
    selectAutosQuery += 'where (auto.number like \'%' + filterObj.number + '%\') ';
  }
  if (filterObj && filterObj.model && filterObj.model.name) {
    selectAutosQuery += 'where (m.name like \'%' + filterObj.model.name + '%\' or br.name like \'%' + filterObj.model.name + '%\') ';
  }
  selectAutosQuery += 'Limit ' + params.limit + ' Offset ' + ((params.offset) * params.limit) + ' ';

  connection.query(selectAutosQuery, {type: Sequilize.QueryTypes.SELECT}).then(data => {
    cb(data);
  });
};

exports.create = async function (auto, cb) {

  if (!auto.person.id_person) {
    let addPersonQuery = 'insert into person (`name`,`secondName`,`thirdName`, `address`, `phone`) ' +
      'values (?,?,?,?,?);';
    let promiseAddPerson = new Promise((res, rej) => {
      connection.query(addPersonQuery, {
        replacements:
          [auto.person.name, auto.person.secondName, auto.person.thirdName, auto.person.address, auto.person.phone],
        type: Sequilize.QueryTypes.INSERT
      }).then(() => {
        res();
      });
    });
    await promiseAddPerson;
    let getIdPersonQuery = 'select id_person from person where person.name =? AND person.secondName=? AND person.thirdName=?';
    let promiseGetIdPerson = new Promise((res, rej) => {
      connection.query(getIdPersonQuery, {
        replacements: [auto.person.name, auto.person.secondName, auto.person.thirdName],
        type: Sequilize.QueryTypes.SELECT
      }).then(results => {
        auto.person.id_person = results[0].id_person;
        res();
      });
    });
    await promiseGetIdPerson;
  }
  if (auto.checkup && !auto.checkup.id_checkup) {
    let addCheckUpQuery = 'insert into checkup (`dateStart`,`dateEnd`) values (?,?);';
    let promiseAddCheckUp = new Promise((res, rej) => {
      connection.query(addCheckUpQuery, {
        replacements:
          [auto.checkup.dateStart, auto.checkup.dateEnd],
        type: Sequilize.QueryTypes.INSERT
      }).then(() => {
        res();
      });
    });
    await promiseAddCheckUp;
    let getIdCheckUp = 'select id_checkup from checkup where checkup.dateStart =? AND checkup.dateEnd=?;';
    let promiseGetIdCheckUp = new Promise((res, rej) => {
      connection.query(getIdCheckUp, {
        replacements: [auto.checkup.dateStart, auto.checkup.dateEnd],
        type: Sequilize.QueryTypes.SELECT
      }).then(results => {
        auto.checkup.id_checkup = results[0].id_checkup;
        res();
      });
    });
    await promiseGetIdCheckUp;
  } else {
    auto.checkup = {
      id_checkup: null,
      dateStart: null,
      dateEnd: null
    }
  }

  let addAutoQuery = 'INSERT INTO auto (`number`, `id_person`, `id_checkup`, `id_model`, `id_oil`) VALUES (?,?,?, ' +
    '(select model.id_model from model inner join brand on brand.id_brand = model.id_brand where model.name = ? and brand.name = ?)\n' +
    ', (select id_oil from oil where oil.name = ?));';

  let promiseAddAuto = new Promise((res, rej) => {
    connection.query(addAutoQuery,
      {replacements: [auto.number, auto.person.id_person, auto.checkup.id_checkup, auto.model.name, auto.model.brand.name, auto.oil.name]}
    ).then(() => {
      res();
    });
  });

  await promiseAddAuto;
  cb();
};
exports.common = function (cb) {
  let data = {
    models: [],
    oils: []
  };
  let promises = [];
  let getAllBrandsQuery = 'select model.id_model, model.name `modelName`,brand.id_brand, brand.name `brandName`, category.id_category, category.name `categoryName` ' +
    'from brand ' +
    'left outer join model on model.id_brand = brand.id_brand ' +
    'left outer join category on category.id_category = model.id_category;';
  let promiseGetModels = new Promise((res, rej) => {
    connection.query(getAllBrandsQuery, {type: Sequilize.QueryTypes.SELECT}).then((results) => {
      data.models = results;
      res();
    });
  });
  promises.push(promiseGetModels);
  let getAllOilsQuery = 'select oil.id_oil, oil.name from oil;';
  let promiseGetAllOils = new Promise((res, rej) => {
    connection.query(getAllOilsQuery, {type: Sequilize.QueryTypes.SELECT}).then(results => {
      data.oils = results;
      res();
    });
  });
  promises.push(promiseGetAllOils);

  Promise.all(promises).then(() => {
    cb(data);
  });
};

exports.addBrand = function (brand, cb) {
  let addBrandQuery = 'INSERT INTO brand (`name`) VALUES (?);';
  let promiseAddBrand = new Promise((res, rej) => {
    connection.query(addBrandQuery, {replacements: [brand.name]}).then(() => {
      res();
    });
  });
  promiseAddBrand.then(() => {
    cb();
  });
};
exports.addModel = function (model, cb) {
  let addModelQuery = 'insert into model (model.id_brand, model.id_category, model.name)\n' +
    'values ((select id_brand from brand where brand.name = ?),\n' +
    '(select id_category from category where category.name = ?), ?)';
  connection.query(addModelQuery, {
    replacements: [model.brand.name, model.category.name, model.name],
    type: Sequilize.QueryTypes.INSERT
  })
    .then(() => {
      cb();
    });
};

exports.getById = function (id, cb) {
  console.log('im here and id= ' + id);
  let auto = {
    model: {}
  };
  let promises = [];
  let getPersonQuery = 'select person.id_person, person.name, person.secondName, person.thirdName, person.address, person.phone from person inner join auto on auto.id_person = person.id_person ' +
    'where auto.id_auto=? ;';
  let promiseGetPerson = new Promise((res, rej) => {
    connection.query(getPersonQuery, {replacements: [id], type: Sequilize.QueryTypes.SELECT})
      .then(results => {
        auto.person = results[0];
        res();
      })
  });
  promises.push(promiseGetPerson);

  let getOilQuery = 'select oil.id_oil, oil.name from oil inner join auto on auto.id_oil = oil.id_oil ' +
    'where auto.id_auto=? ;';
  let promiseGetOil = new Promise((res, rej) => {
    connection.query(getOilQuery, {replacements: [id], type: Sequilize.QueryTypes.SELECT})
      .then(results => {
        auto.oil = results[0];
        res();
      })
  });
  promises.push(promiseGetOil);

  let getCheckUpQuery = 'select checkup.id_checkup, checkup.dateStart, checkup.dateEnd from checkup inner join auto on auto.id_checkup = checkup.id_checkup ' +
    'where auto.id_auto=? ;';
  let promiseGetCheckUp = new Promise((res, rej) => {
    connection.query(getCheckUpQuery, {replacements: [id], type: Sequilize.QueryTypes.SELECT})
      .then(results => {
        if (results[0]) {
          auto.checkup = results[0];
        }
        res();
      })
  });
  promises.push(promiseGetCheckUp);

  let getModelQuery = 'select model.id_model, model.name from model inner join auto on auto.id_model = model.id_model ' +
    'where auto.id_auto=? ;';
  let promiseGetModel = new Promise((res, rej) => {
    connection.query(getModelQuery, {replacements: [id], type: Sequilize.QueryTypes.SELECT})
      .then(results => {
        Object.assign(auto.model, results[0]);
        res();
      })
  });
  promises.push(promiseGetModel);

  let getBrandQuery = 'select brand.id_brand, brand.name from brand ' +
    'inner join model on model.id_brand= brand.id_brand inner join auto on auto.id_model = model.id_model ' +
    'where auto.id_auto=? ;';
  let promiseGetBrand = new Promise((res, rej) => {
    connection.query(getBrandQuery, {replacements: [id], type: Sequilize.QueryTypes.SELECT})
      .then(results => {
        auto.model.brand = results[0];
        res();
      })
  });
  promises.push(promiseGetBrand);

  let getCategoryQuery = 'select category.id_category, category.name from category ' +
    'inner join model on model.id_category= category.id_category inner join auto on auto.id_model = model.id_model ' +
    'where auto.id_auto=? ;';
  let promiseGetCategory = new Promise((res, rej) => {
    connection.query(getCategoryQuery, {replacements: [id], type: Sequilize.QueryTypes.SELECT})
      .then(results => {
        auto.model.category = results[0];
        res();
      })
  });
  promises.push(promiseGetCategory);

  let getAutoQuery = 'select auto.id_auto, auto.number from auto ' +
    'where auto.id_auto=? ;';
  let promiseGetAuto = new Promise((res, rej) => {
    connection.query(getAutoQuery, {replacements: [id], type: Sequilize.QueryTypes.SELECT})
      .then(results => {
        Object.assign(auto, results[0]);
        res();
      })
  });
  promises.push(promiseGetAuto);

  Promise.all(promises).then(() => {
    console.log(auto);
    cb(auto);
  });
};

exports.updateAuto = async function (newAuto, cb) {

  let promises = [];
  if (newAuto.person.name && newAuto.person.secondName) {
    let updatePersonQuery = 'UPDATE person ' +
      'inner join auto on auto.id_person = person.id_person ' +
      'SET `name`=?, `secondName`=?, `thirdName`=?, `address`=?, `phone`=? ' +
      'WHERE auto.id_auto=? ;';
    let promiseUpdatePerson = new Promise((res, rej) => {
      connection.query(updatePersonQuery,
        {
          replacements: [
            newAuto.person.name,
            newAuto.person.secondName,
            newAuto.person.thirdName,
            newAuto.person.address,
            newAuto.person.phone,
            newAuto.id_auto
          ], type: Sequilize.QueryTypes.UPDATE
        })
        .then(() => {
          res();
        });
    });
    promises.push(promiseUpdatePerson);
  }

  if (newAuto.checkup && newAuto.checkup.dateStart && newAuto.checkup.dateEnd) {
    let addCheckUpQuery = 'INSERT INTO checkup (`dateStart`, `dateEnd`) VALUES (?, ?);';
    let promiseAddCheckUp = new Promise((res, rej) => {
      connection.query(addCheckUpQuery, {
        replacements: [newAuto.checkup.dateStart, newAuto.checkup.dateEnd],
        type: Sequilize.QueryTypes.INSERT
      }).then(() => {
        res();
      });
    });
    await promiseAddCheckUp;
  } else {
    newAuto.checkup = {
      dateStart: null,
      dateEnd: null
    }
  }
  let updateModelQuery = 'update auto set auto.id_model = (select model.id_model from model \n' +
    'inner join brand on brand.id_brand = model.id_brand where brand.name =? AND model.name =? limit 1), ' +
    'auto.number =?, ' +
    'auto.id_oil = (select oil.id_oil from oil where oil.name =?), ' +
    'auto.id_checkup = (select checkup.id_checkup from checkup where checkup.dateStart=? AND checkup.dateEnd=? limit 1) ' +
    'where auto.id_auto =?';
  let promiseUpdateModel = new Promise((res, rej) => {
    connection.query(updateModelQuery, {
      replacements: [
        newAuto.model.brand.name,
        newAuto.model.name,
        newAuto.number,
        newAuto.oil.name,
        newAuto.checkup.dateStart,
        newAuto.checkup.dateEnd,
        newAuto.id_auto
      ], type: Sequilize.QueryTypes.UPDATE
    }).then(() => {
      res();
    });
  });
  promises.push(promiseUpdateModel);

  Promise.all(promises).then(() => {
    cb();
  });

};
