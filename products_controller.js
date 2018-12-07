//We modularize code for srtucture and organization 
//Inside this file we don't have access to app (defined in index.js)
//But we do have access to REQ (request)
//This is a controller file that needs to be connnected to endpoints in index.js
//THIS CONTROLLER WILL EXECUTE THE SQL.

module.exports = {

     create: (req, res, next) => {
          const dbInstance = req.app.get('db');
          const { name, description, price, image_url } = req.body;          
          
          dbInstance.create_product([ name, description, price, image_url ])
               .then( () => res.sendStatus(200) )
               .catch( error => {
                    res.status(500).send({errorMessage: "Error in create method"});
                    console.log(error);
               });
     },
     getOne: (req, res, next) => {
          const dbInstance = req.app.get('db');
          dbInstance.read_product(req.params.id) 
               .then( product => res.status(200).send(product))
               .catch( error => {
                    res.status(500).send({errorMessage: "Error in getOne method"});
                    console.log(error);
               });
     },
     getAll: (req, res, next) => {
          const dbInstance = req.app.get('db');
          dbInstance.read_products() 
               .then( products => res.status(200).send(products) )
               .catch( error => {
                    res.status(500).send({errorMessage: "Error in getAll method"})
                    console.log(error);
               });
     },
     update: (req, res, next) => {
          const dbInstance = req.app.get('db');
          dbInstance.update_product([req.params.id, req.query.desc]) 
               .then( () => res.sendStatus(200) )
               .catch (error => {
                    res.status(500).send({errorMessage: "Error in update method"})
                    console.log(error);
               });
     },
     delete: (req, res, next) => {
          const dbInstance = req.app.get('db');
          dbInstance.delete_product(req.params.id)
               .then( () => res.sendStatus(200) )
               .catch (error => {
                    res.status(500).send({errorMessage: "Error in update method"})
                    console.log(error);
               });
     }

}