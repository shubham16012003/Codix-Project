const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../model/users");

router.get("/", (req, res, next) => {
    User.find()
      .select("name price _id")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          User: docs.map(doc => {
            return {
              name: doc.name,
              email: doc.email,
              mobile: doc.mobile,
              _id: doc._id,
              
            };
          })
        };
        res.status(200).json(response);
        
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

router.post("/", (req, res, next) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    address:req.body.address
    
  });
 user
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Info Saved Successfully",
        createdUser: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


router.patch("/:userId", (req, res, next) => {
    const id = req.params.userId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    User.update({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

  router.delete("/:userId", (req, res, next) => {
    const id = req.params.userId;
    User.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });


module.exports=router;