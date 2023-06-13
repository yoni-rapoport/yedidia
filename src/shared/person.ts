export class Person {
  name = "";
  info: PersonInfo[] = [new PersonInfo(), new PersonInfo(), new PersonInfo()];
}

export class PersonInfo {
  title = "";
  text = "";
  image = "";
  width = 0;
  height = 0;
}

