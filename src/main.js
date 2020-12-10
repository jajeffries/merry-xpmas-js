class Elf {
    name = null
    constructor(santa){
        this._santa = santa;
    }

    tellSanta(type, child)
    {
        this._santa.madeAToy(this.name, type, child);
    }

    onNaughtyList(child)
    {
        return this._santa.isOnNaughtyList(child);
    }

    makePresent(child) {
        throw new Error("not implemented")
    }
}

class ToyMakingElf extends Elf
  {
      name="Toy Making Elf"
    constructor(santa)
    {
        super(santa)
    }

    makePresent(child)
    {
      if (!super.onNaughtyList(child))
      {
        const toyType = "Train";
        this.tellSanta(toyType, child);
        return new Toy(toyType);
      }
      else
      {
        return new NaughtyChildToy(child);
      }
    }
  }

class WoodenToyMakingElf extends Elf
  {
      name = "Wooden Toy Making Elf"
    constructor(santa)
    {
        super(santa)
    }

    makePresent(child)
    {
      if (!super.onNaughtyList(child))
      {
        const toyType = "Wooden toy";
        this.tellSanta(toyType, child);
        return new Toy(toyType);
      }
      else
      {
        return new NaughtyChildToy(child);
      }
    }
  }


  class GreenWoodenToyMakingElf extends WoodenToyMakingElf
  {
      name = "Green Wooden Toy Making Elf"
    constructor(santa)
    {
        super(santa)
        this._colour = "green";
    }

    makePresent(child)
    {
      const toy = super.makePresent(child);
      if (!super.onNaughtyList(child))
      {
        toy.type = this._colour + " " + toy.type.toLowerCase();
        if (toy.type[0] == 'g')
        {
          toy.type = toy.type[0].toString().toUpperCase() + toy.type.toLowerCase().slice(1);
        }
      }
      else
      {
        return new NaughtyChildToy(child);
      }
      return toy;
    }
  }

  class Toy
  {
    constructor(train, reason = null)
    {
      this.reason = reason;
      this.type = train;
    }
  }

  class NaughtyChildToy extends Toy
  {
    constructor(child)
    {
        super(null)
      this.reason = child + " was on the naughty list";
      this.type = "Coal";
    }
  }

  class PlasticToyMakingElf extends Elf
  {name = "Plastic Toy Making Elf"
    constructor(santa)
    {
        super(santa)
    }

    makePresent(child)
    {
      if (!super.onNaughtyList(child))
      {
        const toyType = "Plastic Spaceship";
        this.tellSanta(toyType, child);
        return new Toy(toyType);
      }
      else
      {
        return new NaughtyChildToy(child);
      }
    }
  }


  class RedWoodenToyMakingElf extends WoodenToyMakingElf
  {

    constructor(santa)
    {
        super(santa)
      this._colour = "Red";
    }

    makePresent(child)
    {
      const toy = super.makePresent(child);
      if (!super.onNaughtyList(child))
      {
        toy.type = this._colour + " " + toy.type.toLowerCase();
        if (toy.type[0] == 'g')
        {
          toy.type = toy.type[0].toString().toUpperCase() + toy.type.toLowerCase().slice(1);
        }
      }
      else
      {
        return new NaughtyChildToy(child);
      }
      return toy;
    }
  }

  class Santa
  {
    naughtList = 
    {
      "Bad Tom": true,
      "Susan": false,
      "John": false,
      "Sarah": false,
      "Good Tom": false
    };

    madeAToy(name, type, child)
    {
      console.log(`A ${type} toy has been made for ${child} by ${name}`);
    }

    isOnNaughtyList(child)
    {
      return this.naughtList[child];
    }

    getPresents()
    {
      return {
        "Susan": new GreenWoodenToyMakingElf(this).makePresent("Susan"),
        "Bad Tom": new GreenWoodenToyMakingElf(this).makePresent("Bad Tom"),
        "John": new WoodenToyMakingElf(this).makePresent("John"),
        "Sarah": new ToyMakingElf(this).makePresent("Sarah"),
        "Andy": new PlasticToyMakingElf(this).makePresent("Sarah"),
        "Good Tom": new RedWoodenToyMakingElf(this).makePresent("Good Tom"),
      };
    }
  }


const santa = new Santa();
const presents = santa.getPresents();

for (let child in presents) {
    console.log("Santa's got " + child + " a " + presents[child].type);
}