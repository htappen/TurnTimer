const PLAYER_NAMES = [
  'Forrest Gump',
  'Woody','Captain Miller','The Joker','Yoda','Paul Edgecombe','Pumbaa','Chewbacca','The Tramp','Timon',
  'Josh Baskin','T-800 / The Terminator','Andrew Beckett','Bruce Wayne / Batman',
  "Scarlett O'Hara",'Chuck Norris','The Dude','Man with No Name','Atticus Finch','E.T',
  'Mario','Sonic the Hedgehog','Samus Aran','Crash Bandicoot','Master Chief',
  'Hannibal Lecter','Vito Corleone','John Rambo','Gollum','Mufasa','Ellen Ripley','Sirius Black','Superman','Bob the Minion',
  'Sarah Connor','James T. Kirk','Benjamin Buford \"Bubba\" Blue','Norman Bates','Sherlock Holmes','Peter Venkman','Harry Potter',
  'Aragorn','C-3PO','Spock','Wonder Woman','Euphegenia Doubtfire','Thor','Gandalf','Loki','Genie','Dr. Emmett Brown',
  'John McClane','Groot','Professor X','Iron Man','Hulk','Donkey','Ellis Boyd \"Red\" Redding','Hermione Granger',
  'Professor Minerva McGonagall','Obi-Wan Kenobi','Shrek','Rocky Balboa','Alfred Pennyworth','Marty McFly','Wolverine','Beetlejuice',
  'Luke Skywalker','Professor Severus Snape','Mr. Kesuke Miyagi','Legolas','Buzz Lightyear','Rubeus Hagrid','Captain America',
  'Luna Lovegood','Andy Dufresne','Professor Albus Dumbledore','Darth Maul','Jack Torrance','R2-D2','Neo','Minions',
  'Inigo Montoya','Lord Voldemort','Black Widow','Jean-Luc Picard','Wednesday Addams','Leia Organa','Deadpool','Palpatine','Boba Fett',
  'Jason Bourne','Dorothy Gale','Starlord','Robin Hood','Kevin McCallister','Bilbo Baggins','Maximus Decimus Meridius'
  ,'Qui-Gon Jinn','Ferris Bueller','Ronald Weasley','Olaf','Scarecrow','V','Jessica Rabbit','Mr. Bean','Spider-Man','Peregrin Took',
  'Simba','Buddy the Elf','Quint','Oskar Schindler','Jack Skellington','Rocket Raccoon','Wyatt Earp','Tyler Durden','Aslan',
  'Magneto','Clark Griswold','Elizabeth Swann','Elrond','Conan the Barbarian','Wicked Witch of the West','Maleficent','Matilda',
  'King Kong','Mr. Incredible'
]

const COLOR_LIST = [
  'red',
  'blue',
  'green',
  'pink',
  'orange',
  'purple'
]

class PlayerTimer {
  name = ""
  seconds = 0
  _color = ""
  _id = ""
  _parent = null
  _active = false
  constructor(parent, seconds, name, color) {
    this.seconds = seconds
    this._parent = parent
    this._id = Math.random().toString(16).substr(2, 8)

    if (!name) {
      if (PLAYER_NAMES.length > 0) {
        const randNameIndex = Math.floor(Math.random() * PLAYER_NAMES.length)
        this.name = PLAYER_NAMES.splice(randNameIndex, 1)[0]
      } else {
        this.name = "Player"
      }
    }
    if (!color) {
      if (COLOR_LIST.length > 0) {
        this._color = COLOR_LIST.shift()
      } else {
        this._color = 'black'
      }
    }
  }

  get id() {
    return this._id
  }

  tick() {
    if (this.seconds > 0) {
      this.seconds--;
    }
  }

  get active() {
    return this._active
  }

  set active(val) {
    const boolVal = !!val
    if (this._active != boolVal) {
      this._active = boolVal
      if (this._active) {
        this._parent.activePlayerId = this._id
      }
    }
  }

  get color() {
    return `${this._color}`
  }

  set color(val) {
    if (COLOR_LIST.indexOf(this._color) < 0) {
      COLOR_LIST.push(this._color)
    }
    this._color = val
  }
}

export { PlayerTimer }