describe("Składnia funkcji anonomowej ze strzałką", function() {
  var multiply = (x, y) => x*y;

  it("zmienna multiply jest funkcją", function() {

    expect(typeof multiply).toEqual("function");

  });

  it("multiply mnoży wartości", function() {
    expect(multiply(11, 12)).toEqual(132);
    expect(multiply(0, 1234)).toEqual(0);
    expect(multiply(0.1, 1.3)).toBeLessThan(0.14);
  });

});

describe("Nowości w stringach", function() {
  var str = `W JavaScript string
  nie łamie linii`;
  var imie = "Jan";
  var nazwisko = "Kowalski";
  var format = `Witaj ${imie}ie ${nazwisko}!`;

  it("Napisy wielolinijkowe", function(){
    expect(str).toEqual('W JavaScript string\n  nie łamie linii')
  })

  it("Iniekcja danych do napisu", function() {
    expect(format).toEqual("Witaj Janie Kowalski!");
  });
});

describe("Inicjowanie danych elementami tabel", function() {
  var [x, , , y] = [1, 2, 3, 4];
  var [z = 8] = [];

  it("Przypisanie elementów z tablicy do zmiennych", function(){
    expect(x).toEqual(1);
    expect(y).toEqual(4);
  });
  it("Domyślna wartość przypisania z tablicy", function(){
    expect(z).toEqual(8);
  });
});

describe("const", function(){
  const pi = 3.14;
  it("Const jest dostępna do operacji", function(){
    expect(Math.round(2*pi*10)).toEqual(63);
  });
  it("Nie da się przetestować pi = 3.141  - SyntaxError", function(){
    expect(true).toBe(true);
    //expect(pi = 3.45).toThrow();
  });
});

describe("Argumenty funkcji", function(){
  function system(a, b = 10) {
    var str = "";
    while(a != 0){
      str = (a % b) + str;
      a = Math.floor(a / b);
    }
    return str;
  }
  it("Funkcja może mieć parametr domyślny", function(){
     expect(system(128, 2)).toBe("10000000");
     expect(system(1234)).toBe("1234");
  });
  function tablica(a, ...b) {
    return a +  b.join("-");
  }
  it("Przekaż funkcji szereg elementów stajacych się tablicą", function(){
    expect(tablica("funkcja:","tablico","zmienna")).toEqual("funkcja:tablico-zmienna");
  });
  function szereg(a, b, c) {
    var q = `${a}, ${b} czy ${c}?`;
    q = q[0].toUpperCase() + q.substring(1, q.length);
    return q;
  }
  it("Przekaż zamiast tablicy elementy", function() {
    expect(szereg(...['kawa', 'herbata', 'woda'])).toBe('Kawa, herbata czy woda?');
  });

});

describe("Zmiany w kolekcjach", function(){
  var array = [1, 2, 3, 4];

  it("Wypełnianie tablicy fill", function() {
    array.fill(5);
    expect(array).toEqual([5,5,5,5]);
    array.fill(2,2);
    expect(array).toEqual([5,5,2,2]);
    array.fill(1,1,2);
    expect(array).toEqual([5,1,2,2]);
  });

  it("Tworzenie tablicy z innej kolekcji", function(){
    var napis = "tab";
    array = [1, 2, 3, 4];
    expect(Array.from(napis)).toEqual(["t", "a", "b"]);
    expect(Array.from(array, x => x*10)).toEqual([10, 20, 30, 40]);
  });

  it("Kolakcja Mapa", function(){
    var m = new Map();
    m.set("0", "pierwszy");
    m.set(1, "drugi");
    m.set({}, "trzeci");
    m.set("obj", {cont:"czwarty"});
    var itMap = m.keys();
    expect(itMap.next().value).toEqual("0");
    expect(itMap.next().value).toEqual(1);
    expect(itMap.next().value).toEqual({});
    expect(itMap.next().value).toEqual("obj");
    itMap = m.values();
    expect(itMap.next().value).toEqual("pierwszy");
    expect(itMap.next().value).toEqual("drugi");
    expect(itMap.next().value).toEqual("trzeci");
    expect(itMap.next().value.cont).toEqual("czwarty");

    expect(m.get("obj").cont).toEqual("czwarty");
    expect(m.has(1)).toBe(true);
    var numbers = new Array();
    m.forEach((v, k) => numbers.push(v));
    expect(numbers).toEqual(["pierwszy", "drugi", "trzeci", {cont:"czwarty"}]);
  });

  it("Kolekcja Set", function(){
    var s = new Set();
    s.add(34);
    s.add(34);
    expect(s.size).toBe(1);
    s.add("nowy");
    expect(s.size).toBe(2);
    expect(s.has("nowy")).toBe(true);
    s.delete(34);
    expect(s.size).toBe(1);
    expect(s.has(34)).toBe(false);
    s.clear();
    expect(s.size).toBe(0);
    s.add(10);
    s.add(1);
    s.add(20);
    s.add(5);
    s.add(4);
    s.add(16);
    array = [];
    for(e of s){
      array.push(e);
    }
    expect(array).toEqual([10,1,20,5,4,16]);
  });

  it("Kolekcja WeakSet", function(){
    var ws = new WeakSet();
    var obj1 = {a:1};
    var obj2 = {a:1};
    var obj3 = new Object();
    obj3.a = 8;
    var fun = function(x) {return x*5;}
    ws.add(obj1);
    ws.add(obj2);
    ws.add(obj3);
    ws.add(fun);
    expect(ws.has(obj2)).toBe(true);
    expect(ws.has(obj1)).toBe(true);
    expect(obj1).toEqual(obj2);
    expect(obj1).toEqual({a:1});
    expect(ws.has({a:1})).toBe(false);
    expect(ws.has(fun)).toBe(true);
    ws.delete(obj3);
    expect(ws.has(obj3)).toBe(false);
    var obj5 = {a:67};
    obj5.sub = {b:45};
    ws.add(obj5.sub);
    expect(ws.has(obj5.sub)).toBe(true);
    delete obj5.sub;
    expect(ws.has(obj5.sub)).toBe(false);
  });

});

describe("Różne dodatkowe metody", function(){
  /*
    it("Metoda includes w string", function() {
    var str = 'To be, or not to be, that is the question.';
    expect(str.includes('To be')).toBe(true);
    expect(str.includes('question')).boBe(true);
    expect(str.includes('nonexistent')).boBe(false);
    expect(str.includes('To be', 1)).boBe(false);
    expect(str.includes('TO BE')).boBe(false);
  });
  */
  it("Metoda repeat w String", () => {
    expect('abc'.repeat(2)).toEqual('abcabc');
  });
  it("Generator danych", () => {
    function* idMaker(){
      var index = 0;
      while(index < 3)
      yield index++;
    }
    var gen = idMaker();
    expect(gen.next().value).toBe(0);
    expect(gen.next().value).toBe(1);
    expect(gen.next().value).toBe(2);
    expect(gen.next().value).toBe(undefined);
  });

  it("Typowane tablice: Float32Array", () => {
    var float32 = new Float32Array(2);
    float32[0] = 42;
    expect(float32[0]).toEqual(42);
    expect(float32.length).toBe(2);
    expect(float32.BYTES_PER_ELEMENT).toBe(4);
    var arr = new Float32Array([21,31]);
    expect(arr[1]).toBe(31);
    var x = new Float32Array([21, 31]);
    var y = new Float32Array(x);
    expect(y[0]).toEqual(21); // 21

    var buffer = new ArrayBuffer(16);
    var z = new Float32Array(buffer, 0, 4);
    expect(z.length).toBe(4);
    expect(z[2]).toBe(0);
  });
});
