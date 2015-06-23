class Vektor2D {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.unit = "";
  }

  len() {
     return Math.sqrt(this.x*this.x + this.y*this.y);
  }
  showLen(){
    document.querySelector('#classInfo').innerHTML = this.len()+ this.unit;
  }
};

class Force extends Vektor2D {
  constructor(x, y){
    super(x, y);
    this.unit = "N";
  }

};

var f = new Force(40, 30);
f.showLen();
