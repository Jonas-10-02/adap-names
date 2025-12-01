import { describe, it, expect } from "vitest";

import { Name } from "../../../src/adap-b04/names/Name";
import { StringName } from "../../../src/adap-b04/names/StringName";
import { StringArrayName } from "../../../src/adap-b04/names/StringArrayName";

describe("Basic StringName function tests", () => {
  it("test insert", () => {
    let n: Name = new StringName("oss.fau.de");
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test append", () => {
    let n: Name = new StringName("oss.cs.fau");
    n.append("de");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test remove", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    n.remove(0);
    expect(n.asString()).toBe("cs.fau.de");
  });
});

describe("Basic StringArrayName function tests", () => {
  it("test insert", () => {
    let n: Name = new StringArrayName(["oss", "fau", "de"]);
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test append", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau"]);
    n.append("de");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test remove", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    n.remove(0);
    expect(n.asString()).toBe("cs.fau.de");
  });
});

describe("Delimiter function tests", () => {
  it("test insert", () => {
    let n: Name = new StringName("oss#fau#de", '#');
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss#cs#fau#de");
  });
});

describe("Escape character extravaganza", () => {
  it("test escape and delimiter boundary conditions", () => {
    let n: Name = new StringName("oss.cs.fau.de", '#');

    expect(n.getNoComponents()).toBe(1);
    expect(n.asString()).toBe("oss.cs.fau.de");
    n.append("people");
    expect(n.asString()).toBe("oss.cs.fau.de#people");
  });
});

// describe("DataString format tests", () => {
//   it("StringName - default delimiter tests", () => {
//     let n: Name = new StringName("oss.cs.fau.de");

//     expect(n.getNoComponents()).toBe(4);
//     expect(n.asString()).toBe("oss.cs.fau.de");
//     expect(n.asString("/")).toBe("oss/cs/fau/de");
//     expect(n.asDataString()).toBe("oss.cs.fau.de");
//     expect(() => n.concat(n)).not.toThrowError();
//     expect(n.getNoComponents()).toBe(8);
//     expect(n.asString()).toBe("oss.cs.fau.de.oss.cs.fau.de");
//     expect(n.asString("/")).toBe("oss/cs/fau/de/oss/cs/fau/de");
//     expect(n.asDataString()).toBe("oss.cs.fau.de.oss.cs.fau.de");
//   });
//   it("StringArrayName - default delimiter tests", () => {
//     let n: Name = new StringArrayName(["oss","cs","fau","de"]);

//     expect(n.getNoComponents()).toBe(4);
//     expect(n.asString()).toBe("oss.cs.fau.de");
//     expect(n.asString("/")).toBe("oss/cs/fau/de");
//     expect(n.asDataString()).toBe("oss.cs.fau.de");
//     expect(() => n.concat(n)).not.toThrowError();
//     expect(n.getNoComponents()).toBe(8);
//     expect(n.asString()).toBe("oss.cs.fau.de.oss.cs.fau.de");
//     expect(n.asString("/")).toBe("oss/cs/fau/de/oss/cs/fau/de");
//     expect(n.asDataString()).toBe("oss.cs.fau.de.oss.cs.fau.de");
//   });
//   it("StringName - custom delimiter", () => {
//     let n: Name = new StringName("oss.cs.fau.de", "#");

//     expect(n.getNoComponents()).toBe(1);
//     expect(n.asString()).toBe("oss.cs.fau.de");
//     expect(n.asString("/")).toBe("oss.cs.fau.de");
//     expect(n.asDataString()).toBe("oss\\.cs\\.fau\\.de");
//     expect(() => n.append("test")).not.toThrowError();
//     expect(n.getNoComponents()).toBe(2);
//     expect(n.asString()).toBe("oss.cs.fau.de#test");
//     expect(n.asString("/")).toBe("oss.cs.fau.de/test");
//     expect(n.asDataString()).toBe("oss\\.cs\\.fau\\.de.test");
//     expect(() => n.concat(n)).not.toThrowError();
//     expect(n.getNoComponents()).toBe(4);
//     expect(n.asString()).toBe("oss.cs.fau.de#test#oss.cs.fau.de#test");
//     expect(n.asString("/")).toBe("oss.cs.fau.de/test/oss.cs.fau.de/test");
//     expect(n.asDataString()).toBe("oss\\.cs\\.fau\\.de.test.oss\\.cs\\.fau\\.de.test");
//   });
//   it("StringArrayName - custom delimiter", () => {
//     let n: Name = new StringArrayName(["oss.cs.fau.de"], "#");

//     expect(n.getNoComponents()).toBe(1);
//     expect(n.asString()).toBe("oss.cs.fau.de");
//     expect(n.asString("/")).toBe("oss.cs.fau.de");
//     expect(n.asDataString()).toBe("oss\\.cs\\.fau\\.de");
//     expect(() => n.append("test")).not.toThrowError();
//     expect(n.getNoComponents()).toBe(2);
//     expect(n.asString()).toBe("oss.cs.fau.de#test");
//     expect(n.asString("/")).toBe("oss.cs.fau.de/test");
//     expect(n.asDataString()).toBe("oss\\.cs\\.fau\\.de.test");
//     expect(() => n.concat(n)).not.toThrowError();
//     expect(n.getNoComponents()).toBe(4);
//     expect(n.asString()).toBe("oss.cs.fau.de#test#oss.cs.fau.de#test");
//     expect(n.asString("/")).toBe("oss.cs.fau.de/test/oss.cs.fau.de/test");
//     expect(n.asDataString()).toBe("oss\\.cs\\.fau\\.de.test.oss\\.cs\\.fau\\.de.test");
//   });
// });

describe("Test isEmpty() function", () => {
  it("with zero initialized elements", () => {
    let string_name: Name = new StringName(""); 
    let string_array_name: Name = new StringArrayName([]);

    expect(string_name.isEmpty()).toBe(true); 
    expect(string_array_name.isEmpty()).toBe(true); 
  });
  it("with all elements removed", () => {
    let string_name: Name = new StringName("Test"); 
    let string_array_name: Name = new StringArrayName(["test"]);

    expect(string_name.isEmpty()).toBe(false); 
    expect(string_array_name.isEmpty()).toBe(false); 
    string_name.remove(0);
    string_array_name.remove(0);
    expect(string_name.isEmpty()).toBe(true); 
    expect(string_array_name.isEmpty()).toBe(true); 
  });
  it("with appended elements", () => {
    let string_name: Name = new StringName(""); 
    let string_array_name: Name = new StringArrayName([]);

    expect(string_name.isEmpty()).toBe(true); 
    expect(string_array_name.isEmpty()).toBe(true);
    string_name.append("Test");
    string_array_name.append("Test");
    expect(string_name.isEmpty()).toBe(false); 
    expect(string_array_name.isEmpty()).toBe(false); 
  });
  it("with concatinated name", () => {
    let string_name: Name = new StringName(""); 
    let string_array_name: Name = new StringArrayName([]);
    let test: Name = new StringName("test");

    expect(string_name.isEmpty()).toBe(true); 
    expect(string_array_name.isEmpty()).toBe(true);
    string_name.concat(string_array_name);
    string_array_name.concat(string_name);
    expect(string_name.isEmpty()).toBe(true); 
    expect(string_array_name.isEmpty()).toBe(true);
    string_name.concat(test);
    string_array_name.concat(test);
    expect(string_name.isEmpty()).toBe(false); 
    expect(string_array_name.isEmpty()).toBe(false); 
  });
  it("with inserted component", () => {
    let string_name: Name = new StringName(""); 
    let string_array_name: Name = new StringArrayName([]);

    expect(string_name.isEmpty()).toBe(true); 
    expect(string_array_name.isEmpty()).toBe(true);
    string_array_name.insert(0,"test");
    string_name.insert(0,"test");
    expect(string_name.isEmpty()).toBe(false); 
    expect(string_array_name.isEmpty()).toBe(false);
  });
});

describe("Test getNoComponents() function", () => {
  it("with zero elements initialized", () => {
    let string_name: Name = new StringName(""); 
    let string_array_name: Name = new StringArrayName([]);

    expect(string_name.getNoComponents()).toBe(0);
    expect(string_array_name.getNoComponents()).toBe(0);
  });
  it("with basic manipulation methods used", () => {
    let string_name: Name = new StringName("oss.cs.fau.de"); 
    let string_array_name: Name = new StringArrayName(["oss","cs","fau","de"]);

    expect(string_name.getNoComponents()).toBe(4);
    expect(string_array_name.getNoComponents()).toBe(4);
    string_name.append("test");
    string_array_name.append("test");
    expect(string_name.getNoComponents()).toBe(5);
    expect(string_array_name.getNoComponents()).toBe(5);
    string_name.remove(4);
    string_array_name.remove(4);
    expect(string_name.getNoComponents()).toBe(4);
    expect(string_array_name.getNoComponents()).toBe(4);
  });
  it("with custom delimiter and concatinations", () => {
    let string_name: Name = new StringName("oss.cs.fau.de", "#"); 
    let string_array_name: Name = new StringArrayName(["oss.cs.fau.de"], "#");
    let test: Name = new StringName("test");

    expect(string_name.getNoComponents()).toBe(1);
    expect(string_array_name.getNoComponents()).toBe(1);
    string_name.concat(test);
    string_array_name.concat(test);
    expect(string_name.getNoComponents()).toBe(2);
    expect(string_array_name.getNoComponents()).toBe(2);
  });
});

// describe("Test getComponent() function", () => {
// });

// describe("Test setComponent() function", () => {
//   it("with default delimiter at array borders", () => {
//     let string_name: Name = new StringName("oss.cs.fau.de"); 
//     let string_array_name: Name = new StringArrayName(["oss","cs","fau","de"]);

//     expect(() => string_name.setComponent(0, "test")).not.toThrowError();
//     expect(() => string_array_name.setComponent(0, "test")).not.toThrowError();
//     expect(string_name.asString("test.cs.fau.de"));
//     expect(string_array_name.asString("test.cs.fau.de"));
//     expect(() => string_name.setComponent(3, "test")).not.toThrowError();
//     expect(() => string_array_name.setComponent(3, "test")).not.toThrowError();
//     expect(string_name.asString("test.cs.fau.test"));
//     expect(string_array_name.asString("test.cs.fau.test"));
//   })
//   it("with no elements initialized", () => {
//     let string_name: Name = new StringName("");
//     let string_array_name: Name = new StringArrayName([]);

//     expect(() => string_name.setComponent(0, "test")).toThrowError();
//     expect(() => string_array_name.setComponent(0, "test")).toThrowError();
//     expect(() => string_name.setComponent(-1, "test")).toThrowError();
//     expect(() => string_array_name.setComponent(-1, "test")).toThrowError();
//   })
// });


// describe("escaping chaos", () => {

// });

