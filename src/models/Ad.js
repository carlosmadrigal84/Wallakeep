export default class Ad {
    tags;
     _id;
     name;
     description;
     price;
     type;
     photo;

  
    constructor(value) {
    this.tags = value.tags;
    this._id = value._id;
    this.name = value.name;
    this.description = value.description;
    this.price = value.price;
    this.type = value.type;
    this.photo = value.photo;

    }
}
  
  